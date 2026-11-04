// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  const close = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  // Close when tapping outside the menu
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); }
  });
}

// Phone Call/Message bar: tuck it away while a page's own call/request buttons or
// the contact form is on screen, and while someone is typing (keyboard open).
const bar = document.querySelector('.mobile-bar');
if (bar && 'IntersectionObserver' in window) {
  const visible = new Set();
  const update = () => document.body.classList.toggle('bar-hidden', visible.size > 0);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    update();
  });
  document.querySelectorAll('.hero-actions, #contact-form').forEach((el) => io.observe(el));
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('input, textarea')) { visible.add('typing'); update(); }
  });
  document.addEventListener('focusout', () => { visible.delete('typing'); update(); });
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Contact form: validate, then submit to Formspree without leaving the page
const form = document.querySelector('[data-contact-form]');
if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  const messages = {
    first_name: 'Please enter your first name.',
    last_name: 'Please enter your last name.',
    email: 'Please enter a valid email address, like name@example.com.',
    phone: 'Please enter a valid phone number.',
    message: 'Please enter a short message.',
  };
  const showError = (field) => {
    const slot = document.getElementById(field.id + '-error');
    const invalid = !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    if (slot) slot.textContent = invalid ? messages[field.name] || 'Please check this field.' : '';
    return invalid;
  };
  const fields = [...form.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), textarea')];
  // Re-check a field as soon as the person fixes it
  fields.forEach((field) => {
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') showError(field); });
    field.addEventListener('blur', () => { if (field.value) showError(field); });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const invalid = fields.filter(showError);
    if (invalid.length) {
      status.classList.add('error');
      status.textContent = invalid.length === 1 ? 'Please fix the highlighted field.' : `Please fix the ${invalid.length} highlighted fields.`;
      invalid[0].focus();
      return;
    }

    if (form.action.includes('YOUR_FORM_ID')) {
      status.classList.add('error');
      status.textContent = 'This form is not connected yet. Add a Formspree form ID in contact.html.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      status.classList.add('success');
      status.textContent = "Thank you! Your message has been sent. I'll be in touch soon.";
    } catch (err) {
      status.classList.add('error');
      status.textContent = 'Sorry, something went wrong. Please call (570) 734-7798 or email elisa@renewcounselingpa.com.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
}
