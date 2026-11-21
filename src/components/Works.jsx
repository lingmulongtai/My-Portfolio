import React from 'react';
import { PHOTOS } from '../data/photos.js';
import Lightbox from './Lightbox.jsx';
import { EditIcon } from './Icons.jsx';

export default function Works({ filter, setFilter, adminMode, onEdit, customPhotos = [] }) {
  const [sort, setSort] = React.useState('curated');
  const [lbIndex, setLbIndex] = React.useState(null);

  const allPhotos = React.useMemo(() => [...PHOTOS, ...customPhotos], [customPhotos]);
  const categories = React.useMemo(
    () => ['All', ...new Set(allPhotos.map((p) => p.category).filter(Boolean))],
    [allPhotos]
  );

  const filtered = React.useMemo(() => {
    const list = filter === 'All' ? [...allPhotos] : allPhotos.filter((p) => p.category === filter);
    if (sort === 'featured') {
      return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return list;
  }, [allPhotos, filter, sort]);

  const countFor = (cat) =>
    cat === 'All' ? allPhotos.length : allPhotos.filter((p) => p.category === cat).length;

  const openLb = (photo) => {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    if (idx >= 0) setLbIndex(idx);
  };

  return (
    <section className="section" id="works" aria-labelledby="works-heading">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 id="works-heading">Selected Works</h1>
            <p className="page-lead">
              Street, portrait, and architectural frames photographed across Tokyo.
            </p>
          </div>
          <span className="page-counter">
            {String(filtered.length).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')} frames
          </span>
        </header>

        <div className="works-toolbar">
          <div className="filter-bar" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                <span>{cat}</span>
                <span className="filter-count">{countFor(cat)}</span>
              </button>
            ))}
          </div>

          <div className="sort-bar" role="group" aria-label="Sort photographs">
            {[
              { key: 'curated', label: 'Curated order' },
              { key: 'featured', label: 'Featured first' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                className={`sort-btn${sort === item.key ? ' active' : ''}`}
                onClick={() => setSort(item.key)}
                aria-pressed={sort === item.key}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="photo-grid" role="list">
            {filtered.map((photo, idx) => (
              <figure
                key={photo.id}
                className={`photo-card${photo.featured && filter === 'All' && idx === 0 ? ' photo-card-wide' : ''}`}
                role="listitem"
              >
                <div className="photo-card-media">
                  <button
                    type="button"
                    className="photo-card-trigger"
                    onClick={() => openLb(photo)}
                    aria-label={`Open ${photo.title} in lightbox`}
                  >
                    <img
                      className="photo-card-img"
                      src={photo.url || photo.thumb}
                      alt={photo.alt || photo.title}
                      width={800}
                      height={600}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                    />
                  </button>
                  {adminMode && (
                    <button
                      type="button"
                      className="photo-card-edit"
                      onClick={() => onEdit(photo)}
                      aria-label={`Manage ${photo.title}`}
                    >
                      <EditIcon />
                    </button>
                  )}
                </div>
                <figcaption className="photo-card-body">
                  <div className="photo-card-head">
                    <span className="photo-card-title">{photo.title}</span>
                    <span className={`license-tag ${photo.license === 'free' ? 'free' : 'paid'}`}>
                      {photo.license === 'free' ? 'Free Use' : 'Licensed'}
                    </span>
                  </div>
                  <div className="photo-card-meta">
                    <span>{photo.category}</span>
                    {photo.exif && <span className="photo-card-exif">{photo.exif}</span>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No photographs match this category yet.</p>
            <button type="button" className="btn-secondary" onClick={() => setFilter('All')}>
              Show all frames
            </button>
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
