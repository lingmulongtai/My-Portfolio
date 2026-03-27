import React from 'react';

export default function Footer({ adminMode, setAdminMode, setShowAdmin }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <span className="footer-copy">© 2024 Ryuta Suzuki · All rights reserved</span>
        <div className="footer-links">
          <span className="footer-link">Privacy</span>
          <span className="footer-link">Instagram</span>
          <span className="footer-link">Twitter/X</span>
        </div>
        <button
          className={`footer-dev${adminMode ? ' active' : ''}`}
          onClick={() => { setAdminMode(v => !v); if (!adminMode) setShowAdmin(true); }}
          aria-label="Toggle developer mode"
        >
          🔧 Dev Mode: {adminMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </footer>
  );
}
