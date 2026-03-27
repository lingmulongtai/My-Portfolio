import React from 'react';
import { PRESETS } from '../data/presets.js';

export default function PresetPage() {
  const handleDownload = (preset) => {
    if (preset.file) {
      const a = document.createElement('a');
      a.href = preset.file;
      a.download = preset.name.replace(/\s+/g, '-') + preset.ext;
      a.click();
    }
  };

  return (
    <section className="section" id="presets" aria-label="Presets">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Lightroom Presets</p>
          <h2>My Presets</h2>
          <p>Signature Lightroom presets crafted from years of shooting Tokyo's streets. Free and premium options available.</p>
        </div>

        <div className="presets-grid">
          {PRESETS.map(preset => (
            <article
              key={preset.id}
              className={`preset-card${preset.tier === 'premium' ? ' premium' : ''}`}
              aria-label={preset.name}
            >
              <div>
                <span className={`preset-badge ${preset.tier}`}>
                  {preset.tier === 'free' ? 'Free Download' : '✦ Premium'}
                </span>
              </div>
              <h3 className="preset-name">{preset.name}</h3>
              <p className="preset-desc">{preset.desc}</p>
              <ul className="preset-features">
                {preset.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="preset-footer">
                <span className="preset-meta">
                  {preset.fileSize} · {preset.ext}
                </span>
                {preset.tier === 'free' ? (
                  <button className="btn-primary" onClick={() => handleDownload(preset)}>
                    Download
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="preset-price">{preset.price}</span>
                    <button className="btn-accent">Purchase</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
