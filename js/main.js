// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  const close = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); }
  });
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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      status.classList.add('error');
      status.textContent = 'Please fill in your first name, last name, a valid email, and a message.';
      if (firstInvalid) firstInvalid.focus();
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
      status.textContent = 'Sorry, something went wrong. Please try again, or call or email directly.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
}
