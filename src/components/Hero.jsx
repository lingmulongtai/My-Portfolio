import React from 'react';
import { PRESETS } from '../data/presets.js';
import { JOURNAL } from '../data/journal.js';
import Lightbox from './Lightbox.jsx';
import { IconArrowRight } from './Icons.jsx';

export default function Hero({ photos, setPage, onOpenEssay }) {
  const [previewIndex, setPreviewIndex] = React.useState(null);
  const featured = React.useMemo(() => photos.slice(0, 3), [photos]);
  const heroImage = `${import.meta.env.BASE_URL}photos/hero-scene.webp`;

  return (
    <>
      <section className="hero-stage" id="home" aria-label="Hero">
        <div className="hero-backdrop" aria-hidden="true">
          <img
            className="hero-backdrop-img"
            src={heroImage}
            alt=""
            fetchpriority="high"
            decoding="async"
          />
          <div className="hero-backdrop-veil" />
        </div>

        <div className="hero-shell">
          <div className="hero-copy">
            <h1 className="hero-title">
              Capturing the unseen light of Tokyo
            </h1>
            <p className="hero-sub">
              Street, portrait, and architectural photography by Ryuta Suzuki — documented across rain-slick alleys, transit corridors, and quiet dawn light
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setPage('works')}
              >
                View works
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPage('presets')}
              >
                Lightroom presets
              </button>
            </div>
          </div>

          <div className="sheet-window" aria-label="Featured contact sheet">
            <div className="sheet-bar">
              <div className="sheet-bar-left">
                <span className="sheet-dot" aria-hidden="true" />
                <span>Contact sheet · Tokyo</span>
              </div>
              <span className="sheet-bar-meta">
                {String(photos.length).padStart(2, '0')} frames · Sony α7 IV
              </span>
            </div>

            <div className="sheet-grid">
              {featured.map((photo, idx) => (
                <button
                  type="button"
                  key={photo.id}
                  className="sheet-frame"
                  onClick={() => setPreviewIndex(idx)}
                  aria-label={`Inspect ${photo.title}`}
                >
                  <div className="sheet-frame-media">
                    <img src={photo.url} alt={photo.alt} loading="eager" />
                  </div>
                  <div className="sheet-frame-foot">
                    <span className="sheet-frame-title">
                      <span className="frame-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="sheet-frame-name">{photo.title}</span>
                    </span>
                    <span className="exif-mono">{photo.exif}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-band" aria-label="Portfolio overview">
        <div className="wrap">
          <div className="metrics-row">
            <div className="metric-cell">
              <span className="metric-value">{photos.length}</span>
              <span className="metric-label">Cataloged Tokyo frames</span>
            </div>
            <div className="metric-cell">
              <span className="metric-value">{PRESETS.length}</span>
              <span className="metric-label">Lightroom presets</span>
            </div>
            <div className="metric-cell">
              <span className="metric-value">5</span>
              <span className="metric-label">Years documenting Tokyo</span>
            </div>
          </div>

          <div className="home-split">
            <div>
              <div className="band-head">
                <h2 className="band-title">Recent journal notes</h2>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => setPage('journal')}
                >
                  <span>All entries</span>
                  <IconArrowRight />
                </button>
              </div>
              <div className="index-list">
                {JOURNAL.map((post) => (
                  <button
                    type="button"
                    key={post.id}
                    className="index-row"
                    onClick={() => onOpenEssay(post.id)}
                  >
                    <span className="index-row-date">{post.date}</span>
                    <span className="index-row-title">{post.title}</span>
                    <span className="index-row-meta">{post.readMin} min</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="band-head">
                <h2 className="band-title">Lightroom presets</h2>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => setPage('presets')}
                >
                  <span>Tone studio</span>
                  <IconArrowRight />
                </button>
              </div>
              <div className="preset-mini-list">
                {PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset.id}
                    className="preset-mini-card"
                    onClick={() => setPage('presets')}
                  >
                    <div>
                      <div className="preset-mini-name">{preset.name}</div>
                      <div className="preset-mini-sub">
                        {preset.fileSize} · {preset.ext}
                      </div>
                    </div>
                    <span className="preset-mini-price">
                      {preset.tier === 'free' ? 'Free' : preset.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {previewIndex !== null && (
        <Lightbox
          photos={featured}
          index={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onPrev={() => setPreviewIndex((i) => Math.max(0, i - 1))}
          onNext={() => setPreviewIndex((i) => Math.min(featured.length - 1, i + 1))}
        />
      )}
    </>
  );
}
