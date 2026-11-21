import React from 'react';
import { SlidersIcon } from './Icons.jsx';

export default function Footer({ setPage, adminMode, setAdminMode, setShowAdmin }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Ryuta Suzuki · Tokyo Photography</span>

        <nav className="footer-links" aria-label="Footer navigation">
          <button type="button" className="footer-link" onClick={() => setPage('works')}>
            Works
          </button>
          <button type="button" className="footer-link" onClick={() => setPage('presets')}>
            Presets
          </button>
          <button type="button" className="footer-link" onClick={() => setPage('journal')}>
            Journal
          </button>
          <button type="button" className="footer-link" onClick={() => setPage('contact')}>
            Contact
          </button>
        </nav>

        <button
          type="button"
          className={`footer-curator${adminMode ? ' active' : ''}`}
          onClick={() => {
            if (!adminMode) {
              setAdminMode(true);
              setShowAdmin(true);
            } else {
              setShowAdmin(true);
            }
          }}
          aria-label="Open curator photo manager"
        >
          <SlidersIcon width={14} height={14} />
          <span>Curator</span>
        </button>
      </div>
    </footer>
  );
}
