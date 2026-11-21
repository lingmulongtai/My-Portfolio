import React from 'react';
import { IconSliders } from './Icons.jsx';

export default function Footer({ setPage, curatorMode, setCuratorMode, setShowAdmin }) {
  const handleCurator = () => {
    if (!curatorMode) {
      setCuratorMode(true);
      setShowAdmin(true);
    } else {
      setShowAdmin(true);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <span className="footer-copy">© 2024 Ryuta Suzuki · Tokyo</span>

        <div className="footer-links">
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
        </div>

        <button
          type="button"
          className={`footer-curator${curatorMode ? ' active' : ''}`}
          onClick={handleCurator}
          aria-label="Open curator library panel"
        >
          <IconSliders />
          <span>{curatorMode ? 'Curator active' : 'Curator'}</span>
        </button>
      </div>
    </footer>
  );
}
