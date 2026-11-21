import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './Icons.jsx';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasPrev, hasNext, onClose, onPrev, onNext]);

  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(null);

  React.useEffect(() => {
    closeRef.current?.focus();
    const el = dialogRef.current;
    if (!el) return;
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = el.querySelectorAll('button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener('keydown', trap);
    return () => el.removeEventListener('keydown', trap);
  }, [index]);

  React.useEffect(() => {
    if (hasNext) {
      const img = new Image();
      img.src = photos[index + 1].url;
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
      aria-label={`Photograph: ${photo.title}`}
      ref={dialogRef}
    >
      <div className="lightbox-topbar">
        <span className="lightbox-counter">
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <CloseIcon width={18} height={18} />
        </button>
      </div>

      <div className="lightbox-stage">
        <button
          type="button"
          className="lightbox-nav"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous photograph"
        >
          <ArrowLeftIcon width={20} height={20} />
        </button>

        <figure className="lightbox-figure">
          <img className="lightbox-img" src={photo.url} alt={photo.alt || photo.title} />
          <figcaption className="lightbox-info">
            <div>
              <div className="lightbox-title">{photo.title}</div>
              <div className="lightbox-meta">
                <span>{photo.category}</span>
                {photo.exif && <span className="lightbox-exif">{photo.exif}</span>}
              </div>
            </div>
            <span className={`license-tag ${photo.license === 'free' ? 'free' : 'paid'}`}>
              {photo.license === 'free' ? 'Free Use' : 'Licensed'}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="lightbox-nav"
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next photograph"
        >
          <ArrowRightIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
