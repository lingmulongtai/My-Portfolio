import React from 'react';
import { IconArrowLeft, IconArrowRight, IconClose } from './Icons.jsx';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;
  const closeRef = React.useRef(null);

  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  React.useEffect(() => {
    closeRef.current?.focus();
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasPrev, hasNext, onClose, onPrev, onNext]);

  React.useEffect(() => {
    if (hasNext) {
      const preload = new Image();
      preload.src = photos[index + 1].url;
    }
  }, [index, hasNext, photos]);

  if (!photo) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <div className="lightbox-shell" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-bar">
          <span className="lightbox-counter">
            Frame {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <div className="lightbox-controls">
            <button
              type="button"
              className="icon-btn"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous frame"
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next frame"
            >
              <IconArrowRight />
            </button>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <IconClose />
            </button>
          </div>
        </div>

        <div className="lightbox-frame">
          <img className="lightbox-img" src={photo.url || photo.thumb} alt={photo.alt} />
        </div>

        <div className="lightbox-foot">
          <div className="lightbox-meta-left">
            <div className="lightbox-title">{photo.title}</div>
            <div className="lightbox-sub">
              {photo.exif && <span className="exif-mono">{photo.exif}</span>}
              <span className="work-card-cat">{photo.category}</span>
              <span className={`license-text ${photo.license}`}>
                {photo.license === 'free' ? 'Free use' : 'Licensed'}
              </span>
            </div>
          </div>

          <div className="kbd-hints" aria-hidden="true">
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span>Navigate</span>
            <span className="kbd">Esc</span>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
