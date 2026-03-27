import React from 'react';
import { PHOTOS, CATEGORIES } from '../data/photos.js';
import Lightbox from './Lightbox.jsx';

export default function Works({ filter, setFilter, adminMode, onEdit }) {
  const [sort, setSort] = React.useState('newest');
  const [lbIndex, setLbIndex] = React.useState(null);

  const filtered = React.useMemo(() => {
    let arr = filter === 'All' ? [...PHOTOS] : PHOTOS.filter(p => p.category === filter);
    if (sort === 'popular') arr = [...arr].reverse();
    return arr;
  }, [filter, sort]);

  const countFor = (cat) => cat === 'All' ? PHOTOS.length : PHOTOS.filter(p => p.category === cat).length;

  const openLb = (photo) => {
    const idx = filtered.indexOf(photo);
    setLbIndex(idx);
  };

  return (
    <section className="section" id="works" aria-label="Photography works">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Portfolio</p>
          <h2>Selected Works</h2>
          <p>A curated selection of street, portrait, and architectural photography from Tokyo.</p>
        </div>

        <div className="works-controls">
          <div className="filter-bar" role="group" aria-label="Filter by category">
            <span className="filter-bar-label">Filter</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                {cat} ({countFor(cat)})
              </button>
            ))}
          </div>
          <div className="sort-bar" role="group" aria-label="Sort photos">
            <span className="filter-bar-label">Sort</span>
            {['newest', 'popular'].map(s => (
              <button
                key={s}
                className={`sort-btn${sort === s ? ' active' : ''}`}
                onClick={() => setSort(s)}
                aria-pressed={sort === s}
              >
                {s === 'newest' ? 'Newest' : 'Popular'}
              </button>
            ))}
          </div>
        </div>

        <div className="photo-grid" role="list">
          {filtered.map((photo) => (
            <article
              key={photo.id}
              className="photo-card"
              role="listitem"
              onClick={() => openLb(photo)}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openLb(photo)}
              aria-label={`Open ${photo.title}`}
            >
              {photo.featured && <span className="featured-dot" aria-hidden="true" />}
              <img
                className="photo-card-img"
                src={photo.thumb}
                alt={photo.alt}
                loading="lazy"
              />
              <div className="photo-card-body">
                <div className="photo-card-title">{photo.title}</div>
                <div className="photo-card-meta">
                  <span className="tag-category">{photo.category}</span>
                  <span className={`badge badge-${photo.license}`}>
                    {photo.license === 'free' ? 'Free' : 'Paid'}
                  </span>
                </div>
              </div>
              {adminMode && (
                <button
                  className="photo-card-edit"
                  onClick={e => { e.stopPropagation(); onEdit(photo); }}
                  aria-label={`Edit ${photo.title}`}
                  title="Edit photo"
                >
                  ✏️
                </button>
              )}
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No photos found for this filter.</p>
          </div>
        )}
      </div>

      {lbIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex(i => Math.max(0, i - 1))}
          onNext={() => setLbIndex(i => Math.min(filtered.length - 1, i + 1))}
        />
      )}
    </section>
  );
}
