import React from 'react';
import { PRESETS } from '../data/presets.js';
import { IconCheck, IconDownload, IconArrowRight } from './Icons.jsx';

const TONE_PROFILES = {
  original: {
    label: 'Original',
    filter: 'none',
    temp: '0',
    contrast: '0',
    grain: '0%',
  },
  'Tokyo Chrome': {
    label: 'Tokyo Chrome',
    filter: 'contrast(1.12) saturate(1.14) hue-rotate(-8deg) brightness(0.98)',
    temp: '-14',
    contrast: '+18',
    grain: '12%',
  },
  'Harajuku Pastel': {
    label: 'Harajuku Pastel',
    filter: 'contrast(0.92) saturate(0.9) brightness(1.08) sepia(0.08)',
    temp: '+8',
    contrast: '-10',
    grain: '6%',
  },
  'Nocturne Grain': {
    label: 'Nocturne Grain',
    filter: 'contrast(1.2) saturate(0.86) brightness(0.92) sepia(0.14)',
    temp: '+4',
    contrast: '+24',
    grain: '28%',
  },
};

export default function PresetPage({ photos, onInquire }) {
  const sampleFrames = React.useMemo(() => photos.slice(0, 3), [photos]);
  const [frameIdx, setFrameIdx] = React.useState(0);
  const [activeProfile, setActiveProfile] = React.useState('Tokyo Chrome');

  const profile = TONE_PROFILES[activeProfile] || TONE_PROFILES.original;
  const activeFrame = sampleFrames[frameIdx] || sampleFrames[0];

  const handleDownload = (preset) => {
    if (!preset.file) return;
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}${preset.file.replace(/^\/+/, '')}`;
    link.download = preset.name.toLowerCase().replace(/\s+/g, '-') + preset.ext;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section className="page-section" id="presets" aria-label="Lightroom presets">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">Lightroom presets</h1>
          <p className="page-lead">
            Color profiles developed across five years of shooting Tokyo at dusk and night. Preview each look before downloading the XMP profile
          </p>
        </header>

        {activeFrame && (
          <div className="tone-studio" aria-label="Interactive preset tone preview">
            <div className="tone-preview-box">
              <img
                className="tone-preview-img"
                src={activeFrame.url}
                alt={activeFrame.alt}
                style={{ filter: profile.filter }}
              />
            </div>

            <div className="tone-controls">
              <div className="tone-group">
                <span className="tone-label">Preset look</span>
                <div className="tone-pills" role="group" aria-label="Select preset look">
                  {Object.keys(TONE_PROFILES).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={`seg-btn${activeProfile === key ? ' active' : ''}`}
                      onClick={() => setActiveProfile(key)}
                      aria-pressed={activeProfile === key}
                    >
                      {TONE_PROFILES[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tone-group">
                <span className="tone-label">Reference frame</span>
                <div className="tone-pills" role="group" aria-label="Select reference frame">
                  {sampleFrames.map((frame, i) => (
                    <button
                      type="button"
                      key={frame.id}
                      className={`seg-btn${frameIdx === i ? ' active' : ''}`}
                      onClick={() => setFrameIdx(i)}
                      aria-pressed={frameIdx === i}
                    >
                      <span className="seg-count">{String(i + 1).padStart(2, '0')}</span>
                      <span>{frame.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="tone-readout">
                <div>
                  <div className="tone-stat-val">{profile.temp}</div>
                  <div className="tone-stat-name">Temperature</div>
                </div>
                <div>
                  <div className="tone-stat-val">{profile.contrast}</div>
                  <div className="tone-stat-name">Contrast</div>
                </div>
                <div>
                  <div className="tone-stat-val">{profile.grain}</div>
                  <div className="tone-stat-name">Grain</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="presets-grid">
          {PRESETS.map((preset) => (
            <article
              key={preset.id}
              className={`preset-card${preset.tier === 'premium' ? ' featured' : ''}`}
              aria-label={preset.name}
            >
              <div className="preset-head">
                <span className={`preset-tier${preset.tier === 'premium' ? ' accent' : ''}`}>
                  {preset.tier === 'free' ? 'Free download' : 'Complete bundle'}
                </span>
                <span className="exif-mono">
                  {preset.fileSize} · {preset.ext}
                </span>
              </div>

              <h2 className="preset-name">{preset.name}</h2>
              <p className="preset-desc">{preset.desc}</p>

              <ul className="preset-list">
                {preset.features.map((feature, i) => (
                  <li key={i}>
                    <IconCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="preset-foot">
                <span className="preset-price">
                  {preset.tier === 'free' ? 'Free' : preset.price}
                </span>

                {preset.tier === 'free' ? (
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => handleDownload(preset)}
                  >
                    <IconDownload />
                    <span>Download</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => onInquire(preset.name)}
                  >
                    <span>Inquire</span>
                    <IconArrowRight />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
