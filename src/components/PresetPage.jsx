import React from 'react';
import { PRESETS } from '../data/presets.js';
import { PHOTOS } from '../data/photos.js';
import { ArrowRightIcon, CheckIcon, DownloadIcon } from './Icons.jsx';

const GRADE_STYLES = {
  original: { label: 'Original RAW', filter: 'none', note: 'Unprocessed reference frame' },
  'Tokyo Chrome': {
    label: 'Tokyo Chrome',
    filter: 'contrast(1.12) saturate(1.14) hue-rotate(-6deg) brightness(0.98)',
    note: 'Crisp highlights, cool slate shadows, preserved skin tones',
  },
  'Harajuku Pastel': {
    label: 'Harajuku Pastel',
    filter: 'contrast(0.92) saturate(0.94) brightness(1.08) sepia(0.08)',
    note: 'Lifted shadows and soft daylight saturation for portraits',
  },
  'Nocturne Grain': {
    label: 'Nocturne Grain',
    filter: 'contrast(1.18) saturate(0.86) brightness(0.92) sepia(0.14)',
    note: 'Deep night blacks with subtle amber fade for urban scenes',
  },
};

export default function PresetPage({ onInquire }) {
  const [activeGrade, setActiveGrade] = React.useState('Tokyo Chrome');
  const [downloadedId, setDownloadedId] = React.useState(null);
  const samplePhoto = PHOTOS[0];

  const handleDownload = (preset) => {
    if (!preset.file) return;
    const base = import.meta.env.BASE_URL || '/';
    const href = `${base.replace(/\/$/, '')}/${preset.file.replace(/^\//, '')}`;
    const a = document.createElement('a');
    a.href = href;
    a.download = `${preset.name.replace(/\s+/g, '-')}${preset.ext}`;
    a.click();
    setDownloadedId(preset.id);
    setTimeout(() => setDownloadedId(null), 2600);
  };

  const currentGrade = GRADE_STYLES[activeGrade] || GRADE_STYLES.original;

  return (
    <section className="section" id="presets" aria-labelledby="presets-heading">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 id="presets-heading">Lightroom Presets</h1>
            <p className="page-lead">
              Color profiles calibrated from Tokyo street and night frames. Compare each look before downloading the XMP profile.
            </p>
          </div>
          <span className="page-counter">{PRESETS.length} profiles</span>
        </header>

        <div className="grade-studio">
          <figure className="grade-preview">
            <img
              src={samplePhoto.url}
              alt={`${samplePhoto.title} previewed with ${currentGrade.label}`}
              width={960}
              height={600}
              style={{ filter: currentGrade.filter }}
            />
            <figcaption className="grade-caption">
              <span>{currentGrade.label}</span>
              <span className="grade-note">{currentGrade.note}</span>
            </figcaption>
          </figure>

          <div className="grade-controls" role="tablist" aria-label="Preview color grade">
            {Object.entries(GRADE_STYLES).map(([key, spec]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeGrade === key}
                className={`grade-tab${activeGrade === key ? ' active' : ''}`}
                onClick={() => setActiveGrade(key)}
              >
                <span className="grade-tab-name">{spec.label}</span>
                <span className="grade-tab-note">{spec.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="presets-grid">
          {PRESETS.map((preset) => (
            <article
              key={preset.id}
              className={`preset-card${preset.tier === 'premium' ? ' premium' : ''}`}
            >
              <div className="preset-top">
                <span className={`license-tag ${preset.tier === 'free' ? 'free' : 'paid'}`}>
                  {preset.tier === 'free' ? 'Free XMP' : 'Bundle'}
                </span>
                <span className="preset-meta">
                  {preset.fileSize} · {preset.ext}
                </span>
              </div>

              <h2 className="preset-name">{preset.name}</h2>
              <p className="preset-desc">{preset.desc}</p>

              <ul className="preset-features">
                {preset.features.map((feat) => (
                  <li key={feat}>
                    <CheckIcon width={14} height={14} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="preset-footer">
                {preset.tier === 'free' ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleDownload(preset)}
                  >
                    <DownloadIcon />
                    <span>{downloadedId === preset.id ? 'Downloaded' : 'Download XMP'}</span>
                  </button>
                ) : (
                  <>
                    <span className="preset-price">{preset.price}</span>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => onInquire?.(preset.name)}
                    >
                      <span>Inquire</span>
                      <ArrowRightIcon />
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
