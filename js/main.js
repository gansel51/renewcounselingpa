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
  // JavaScript handles validation messages; without it, the browser's built-in checks still apply
  form.noValidate = true;
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

    // Until a Formspree form ID is added, offer ways to email the message instead. Many desktop
    // browsers have no email app set up, so a mailto: link can silently do nothing; let the
    // visitor pick their email service or copy the message.
    if (form.action.includes('YOUR_FORM_ID')) {
      const to = 'elisa@renewcounselingpa.com';
      const v = (name) => (form.elements[name] ? form.elements[name].value.trim() : '');
      const subject = `Consultation request from ${v('first_name')} ${v('last_name')}`;
      const body = [
        `Name: ${v('first_name')} ${v('last_name')}`,
        `Email: ${v('email')}`,
        `Phone: ${v('phone') || '(not given)'}`,
        '',
        v('message'),
      ].join('\n');
      const q = encodeURIComponent;
      const options = [
        ['Email app', `mailto:${to}?subject=${q(subject)}&body=${q(body)}`],
        ['Gmail', `https://mail.google.com/mail/?view=cm&fs=1&to=${q(to)}&su=${q(subject)}&body=${q(body)}`],
        ['Outlook', `https://outlook.live.com/mail/0/deeplink/compose?to=${q(to)}&subject=${q(subject)}&body=${q(body)}`],
      ];

      let choices = form.querySelector('.email-choices');
      if (!choices) {
        choices = document.createElement('div');
        choices.className = 'email-choices';
        status.after(choices);
      }
      choices.replaceChildren();
      options.forEach(([label, href]) => {
        const a = document.createElement('a');
        a.className = 'btn btn-outline';
        a.href = href;
        a.textContent = label;
        if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
        choices.append(a);
      });
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-outline';
      copy.textContent = 'Copy message';
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(`To: ${to}\nSubject: ${subject}\n\n${body}`);
          copy.textContent = 'Copied!';
        } catch (err) {
          copy.textContent = 'Copy failed';
        }
      });
      choices.append(copy);

      status.classList.add('success');
      status.textContent = `Almost done: choose how to send your message to ${to}, or call (570) 734-7798.`;
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
