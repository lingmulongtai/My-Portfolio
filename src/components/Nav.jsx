import React from 'react';
import { CloseIcon, MenuIcon } from './Icons.jsx';

const LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Works', page: 'works' },
  { label: 'Presets', page: 'presets' },
  { label: 'Journal', page: 'journal' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navigate = (target) => {
    setPage(target);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-inner">
        <button
          type="button"
          className="nav-brand"
          onClick={() => navigate('home')}
          aria-label="Ryuta Suzuki Photography — Home"
        >
          <span className="nav-mark" aria-hidden="true">RS</span>
          <span className="nav-name">Ryuta Suzuki</span>
        </button>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {LINKS.map((item) => (
              <li key={item.page}>
                <button
                  type="button"
                  className={page === item.page ? 'active' : ''}
                  onClick={() => navigate(item.page)}
                  aria-current={page === item.page ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <CloseIcon width={20} height={20} /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav-drawer" className="nav-mobile-menu" aria-label="Mobile navigation">
          {LINKS.map((item) => (
            <button
              key={item.page}
              type="button"
              className={page === item.page ? 'active' : ''}
              onClick={() => navigate(item.page)}
              aria-current={page === item.page ? 'page' : undefined}
            >
              <span>{item.label}</span>
              <span className="nav-mobile-dot" aria-hidden="true" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
