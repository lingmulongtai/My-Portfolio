import React from 'react';
import { PHOTOS } from '../data/photos.js';
import { PRESETS } from '../data/presets.js';
import Lightbox from './Lightbox.jsx';
import { ArrowRightIcon } from './Icons.jsx';

export default function Hero({ setPage, customPhotos = [] }) {
  const featured = React.useMemo(() => PHOTOS.filter((p) => p.featured), []);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [lbIndex, setLbIndex] = React.useState(null);

  const allPhotos = React.useMemo(() => [...PHOTOS, ...customPhotos], [customPhotos]);
  const showcase = React.useMemo(() => allPhotos.slice(0, 6), [allPhotos]);
  const activePhoto = featured[activeIdx] || PHOTOS[0];

  const openPhoto = (photo) => {
    const idx = allPhotos.findIndex((p) => p.id === photo.id);
    if (idx >= 0) setLbIndex(idx);
  };

  return (
    <>
      <section className="hero" id="home" aria-label="Featured photography">
        <div className="hero-grid">
          <div className="hero-editorial">
            <h1 className="hero-title">
              Capturing the <em>Unseen</em> Light of Tokyo
            </h1>
            <p className="hero-lead">
              Street, portrait, and architectural photography made between dusk and first light.
              Shot on Sony α7 IV across Tokyo, paired with Lightroom presets crafted from the same frames.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={() => setPage('works')}>
                <span>Explore Works</span>
                <ArrowRightIcon />
              </button>
              <button type="button" className="btn-secondary" onClick={() => setPage('presets')}>
                Lightroom Presets
              </button>
            </div>

            <div className="hero-plate-nav" role="tablist" aria-label="Featured plates">
              {featured.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIdx}
                  className={`plate-tab${idx === activeIdx ? ' active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className="plate-num">0{idx + 1}</span>
                  <span className="plate-meta">
                    <span className="plate-title">{photo.title}</span>
                    <span className="plate-exif">{photo.exif}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <figure className="hero-frame">
            <button
              type="button"
              className="hero-photo-trigger"
              onClick={() => openPhoto(activePhoto)}
              aria-label={`Inspect ${activePhoto.title} in lightbox`}
            >
              <img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={activePhoto.alt}
                width={1200}
                height={900}
                fetchPriority="high"
                className="hero-photo"
              />
            </button>
            <figcaption className="hero-caption">
              <span className="hero-caption-title">{activePhoto.title}</span>
              <span className="hero-caption-exif">{activePhoto.category} · {activePhoto.exif}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="home-sheet" aria-labelledby="contact-sheet-heading">
        <div className="container">
          <div className="band-head">
            <div>
              <h2 id="contact-sheet-heading">Selected Contact Sheet</h2>
              <p>Six recent frames from Tokyo streets, bay horizons, and concrete corridors.</p>
            </div>
            <button type="button" className="text-link" onClick={() => setPage('works')}>
              <span>All {allPhotos.length} photographs</span>
              <ArrowRightIcon />
            </button>
          </div>

          <div className="sheet-grid">
            {showcase.map((photo, idx) => (
              <figure
                key={photo.id}
                className={`sheet-cell${idx === 0 || idx === 3 ? ' sheet-wide' : ''}`}
              >
                <button
                  type="button"
                  className="sheet-trigger"
                  onClick={() => openPhoto(photo)}
                  aria-label={`Open ${photo.title}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </button>
                <figcaption className="sheet-meta">
                  <span className="sheet-title">{photo.title}</span>
                  <span className="sheet-exif">{photo.exif}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-presets-band" aria-labelledby="home-presets-heading">
        <div className="container">
          <div className="presets-teaser">
            <div className="presets-teaser-copy">
              <h2 id="home-presets-heading">Color Profiles from the Same Rolls</h2>
              <p>
                Download free Lightroom XMP profiles built directly from Tokyo night and daylight frames,
                or preview each grade before importing.
              </p>
              <button type="button" className="btn-secondary" onClick={() => setPage('presets')}>
                <span>Preview {PRESETS.length} Presets</span>
                <ArrowRightIcon />
              </button>
            </div>
            <ul className="presets-index">
              {PRESETS.map((preset) => (
                <li key={preset.id}>
                  <button
                    type="button"
                    className="presets-index-row"
                    onClick={() => setPage('presets')}
                  >
                    <span className="presets-index-name">{preset.name}</span>
                    <span className="presets-index-spec">
                      {preset.tier === 'free' ? `Free · ${preset.ext}` : preset.price}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {lbIndex !== null && (
        <Lightbox
          photos={allPhotos}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLbIndex((i) => Math.min(allPhotos.length - 1, i + 1))}
        />
      )}
    </>
  );
}
