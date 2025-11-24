const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const quickLinks = Array.from(document.querySelectorAll('.sidebar-right a'));
const sections = Array.from(document.querySelectorAll('main .section'));

const setActiveLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  quickLinks.forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('is-active', href === sectionId);
    link.setAttribute('aria-current', href === sectionId ? 'true' : 'false');
  });
};

const smoothScrollTo = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleClick = (event, sectionId) => {
  event.preventDefault();
  smoothScrollTo(sectionId);
  setActiveLink(sectionId);
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => handleClick(event, link.dataset.section));
});

quickLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const sectionId = link.getAttribute('href').replace('#', '');
    handleClick(event, sectionId);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));

// 初期状態
setActiveLink('home');
