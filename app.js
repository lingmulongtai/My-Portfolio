const navButtons = Array.from(document.querySelectorAll('.nav-item'));
const panels = Array.from(document.querySelectorAll('.panel'));

const showPanel = (targetId) => {
  panels.forEach((panel) => {
    if (panel.id === targetId) {
      panel.classList.add('is-visible');
      panel.setAttribute('aria-hidden', 'false');
    } else {
      panel.classList.remove('is-visible');
      panel.setAttribute('aria-hidden', 'true');
    }
  });
};

const activateNav = (button) => {
  navButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
  });
};

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    activateNav(button);
    showPanel(targetId);
  });

  button.addEventListener('keydown', (event) => {
    const currentIndex = navButtons.indexOf(button);

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const next = navButtons[(currentIndex + 1) % navButtons.length];
      next.focus();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = navButtons[(currentIndex - 1 + navButtons.length) % navButtons.length];
      prev.focus();
    }
  });
});

// 初期状態
showPanel('home');
activateNav(navButtons[0]);
