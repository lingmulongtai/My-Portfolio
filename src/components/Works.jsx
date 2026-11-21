import React from 'react';
import Lightbox from './Lightbox.jsx';
import { IconPencil } from './Icons.jsx';

export default function Works({ photos, filter, setFilter, curatorMode, onEdit }) {
  const [sort, setSort] = React.useState('newest');
  const [lbIndex, setLbIndex] = React.useState(null);

  const categories = React.useMemo(
    () => ['All', ...new Set(photos.map((p) => p.category))],
    [photos]
  );

  const filtered = React.useMemo(() => {
    let arr = filter === 'All' ? [...photos] : photos.filter((p) => p.category === filter);
    if (sort === 'curated') arr = [...arr].reverse();
    return arr;
  }, [photos, filter, sort]);

  const countFor = (cat) =>
    cat === 'All' ? photos.length : photos.filter((p) => p.category === cat).length;

  const spanClass = (index) => {
    if (filtered.length <= 2) return 'medium';
    if (index === 0) return 'wide';
    if (index === 4 || index === 5) return 'medium';
    return '';
  };

  return (
    <section className="page-section" id="works" aria-label="Selected works">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">Selected works</h1>
          <p className="page-lead">
            Street, portrait, and architectural frames captured across Tokyo, indexed with camera exposure notes
          </p>
        </header>

        <div className="works-toolbar">
          <div className="filter-group" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`seg-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                <span>{cat}</span>
                <span className="seg-count">{countFor(cat)}</span>
              </button>
            ))}
          </div>

          <div className="sort-group" role="group" aria-label="Sort frames">
            {[
              { key: 'newest', label: 'Chronological' },
              { key: 'curated', label: 'Reverse order' },
            ].map((item) => (
              <button
                type="button"
                key={item.key}
                className={`seg-btn${sort === item.key ? ' active' : ''}`}
                onClick={() => setSort(item.key)}
                aria-pressed={sort === item.key}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="works-grid" role="list">
          {filtered.map((photo, idx) => (
            <article
              key={photo.id}
              className={`work-card ${spanClass(idx)}`}
              role="listitem"
              onClick={() => setLbIndex(idx)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLbIndex(idx);
                }
              }}
              aria-label={`Open ${photo.title}`}
            >
              <div className="work-card-media">
                <img src={photo.url || photo.thumb} alt={photo.alt} loading="lazy" />
              </div>

              <div className="work-card-body">
                <div className="work-card-top">
                  <div className="work-card-title">
                    <span className="frame-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span>{photo.title}</span>
                  </div>
                  <span className="work-card-cat">{photo.category}</span>
                </div>
                <div className="work-card-meta">
                  <span className="exif-mono">{photo.exif || 'EXIF unavailable'}</span>
                  <span className={`license-text ${photo.license}`}>
                    {photo.license === 'free' ? 'Free use' : 'Licensed'}
                  </span>
                </div>
              </div>

              {curatorMode && (
                <button
                  type="button"
                  className="work-card-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(photo);
                  }}
                  aria-label={`Edit ${photo.title}`}
                  title="Edit frame"
                >
                  <IconPencil />
                </button>
              )}
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No frames match this category</p>
          </div>
        )}
      </div>

      {lbIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLbIndex((i) => Math.min(filtered.length - 1, i + 1))}
        />
      )}
    </section>
  );
}
