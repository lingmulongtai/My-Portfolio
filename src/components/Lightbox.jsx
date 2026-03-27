import React from 'react';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  // Scroll lock
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard nav
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasPrev, hasNext, onClose, onPrev, onNext]);

  // Focus trap
  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    closeRef.current?.focus();
    const el = dialogRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll('button, [tabindex="0"]');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    el.addEventListener('keydown', trap);
    return () => el.removeEventListener('keydown', trap);
  }, [index]);

  // Preload next image
  React.useEffect(() => {
    if (hasNext) {
      const img = new Image();
      img.src = photos[index + 1].url;
    }
  }, [index, hasNext, photos]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!photo) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.title}`}
      ref={dialogRef}
    >
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img
          className="lightbox-img"
          src={photo.url}
          alt={photo.alt}
        />
        <div className="lightbox-info">
          <div className="lightbox-title">{photo.title}</div>
          {photo.exif && <div className="lightbox-exif">{photo.exif}</div>}
          <div className="lightbox-badges">
            <span className={`badge badge-${photo.license}`}>
              {photo.license === 'free' ? 'Free Use' : 'Licensed'}
            </span>
            {photo.category && <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{photo.category}</span>}
          </div>
          <div className="lightbox-counter">{index + 1} / {photos.length}</div>
        </div>
      </div>

      <button
        ref={closeRef}
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
        tabIndex={0}
      >
        ✕
      </button>

      {hasPrev && (
        <button className="lightbox-prev" onClick={onPrev} aria-label="Previous photo" tabIndex={0}>
          ‹
        </button>
      )}
      {hasNext && (
        <button className="lightbox-next" onClick={onNext} aria-label="Next photo" tabIndex={0}>
          ›
        </button>
      )}

      <div className="lightbox-kbd" aria-hidden="true">
        ← → navigate · Esc close
      </div>
    </div>
  );
}
