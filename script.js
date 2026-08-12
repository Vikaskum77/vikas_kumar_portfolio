const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const copyButton = document.querySelector('[data-copy-email]');
const copyFeedback = document.querySelector('[data-copy-feedback]');

const setMenu = (isOpen) => {
  nav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close navigation' : 'Open navigation';
};

menuToggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });

document.querySelectorAll('[data-case-toggle]').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const notes = toggle.nextElementSibling;
    const isOpen = notes.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
const emptyState = document.querySelector('[data-empty-state]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    let visibleCount = 0;
    projects.forEach((project) => {
      const isVisible = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('is-hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });
    emptyState.classList.toggle('is-visible', visibleCount === 0);
  });
});

const credentialFilterButtons = document.querySelectorAll('[data-credential-filter]');
const credentials = document.querySelectorAll('[data-credential-category]');
credentialFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.credentialFilter;
    credentialFilterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    credentials.forEach((credential) => {
      const isVisible = filter === 'all' || credential.dataset.credentialCategory === filter;
      credential.classList.toggle('is-hidden', !isVisible);
    });
  });
});

copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'Email copied';
  } catch {
    copyFeedback.textContent = email;
  }
  window.setTimeout(() => { copyFeedback.textContent = ''; }, 2500);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
