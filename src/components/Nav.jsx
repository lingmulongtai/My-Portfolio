import React from 'react';
import { IconFrame, IconMenu, IconClose } from './Icons.jsx';

const LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Works', page: 'works' },
  { label: 'Presets', page: 'presets' },
  { label: 'Journal', page: 'journal' },
  { label: 'About', page: 'about' },
];

export default function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav-inner">
          <button
            type="button"
            className="nav-brand"
            onClick={() => navigate('home')}
            aria-label="Ryuta Suzuki home"
          >
            <IconFrame />
            <span>Ryuta Suzuki</span>
          </button>

          <ul className="nav-links" role="list">
            {LINKS.map((item) => (
              <li key={item.page}>
                <button
                  type="button"
                  className={`nav-link-btn${page === item.page ? ' active' : ''}`}
                  onClick={() => navigate(item.page)}
                  aria-current={page === item.page ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`nav-cta${page === 'contact' ? ' active' : ''}`}
            onClick={() => navigate('contact')}
            aria-current={page === 'contact' ? 'page' : undefined}
          >
            Contact
          </button>

          <button
            type="button"
            className="nav-menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} role="menu">
        {[...LINKS, { label: 'Contact', page: 'contact' }].map((item) => (
          <button
            type="button"
            key={item.page}
            className={`nav-drawer-btn${page === item.page ? ' active' : ''}`}
            onClick={() => navigate(item.page)}
            role="menuitem"
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
