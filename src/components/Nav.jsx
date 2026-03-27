import React from 'react';

const LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Works', page: 'works' },
  { label: 'Presets', page: 'presets' },
  { label: 'Journal', page: 'journal' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Nav({ page, setPage, adminMode, setAdminMode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const nav = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => nav('home')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && nav('home')} aria-label="Go to home">
            <div className="nav-monogram">RS</div>
            <span className="nav-name">Ryuta Suzuki</span>
          </div>
          <ul className="nav-links" role="list">
            {LINKS.map(l => (
              <li key={l.page}>
                <button
                  className={page === l.page ? 'active' : ''}
                  onClick={() => nav(l.page)}
                  aria-current={page === l.page ? 'page' : undefined}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`nav-admin-btn${adminMode ? ' active' : ''}`}
            onClick={() => setAdminMode(v => !v)}
            aria-pressed={adminMode}
          >
            🔧 {adminMode ? 'Dev: ON' : 'Dev: OFF'}
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="menu">
        {LINKS.map(l => (
          <button
            key={l.page}
            className={page === l.page ? 'active' : ''}
            onClick={() => nav(l.page)}
            role="menuitem"
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}
