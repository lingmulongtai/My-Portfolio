import React from 'react';
import { PHOTOS } from '../data/photos.js';
import { CheckIcon, CloseIcon, GridIcon, PlusIcon } from './Icons.jsx';

const EMPTY_FORM = {
  title: '',
  category: 'Street',
  url: '',
  thumb: '',
  alt: '',
  exif: '',
  license: 'free',
};

export default function AdminModal({ customPhotos = [], setCustomPhotos, onClose }) {
  const [tab, setTab] = React.useState('add');
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [saved, setSaved] = React.useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    const newPhoto = {
      ...form,
      thumb: form.thumb.trim() || form.url.trim(),
      alt: form.alt.trim() || form.title.trim(),
      id: Date.now(),
      featured: false,
      tags: [],
    };
    setCustomPhotos((prev) => [...prev, newPhoto]);
    setForm(EMPTY_FORM);
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  const handleDelete = (id) => {
    setCustomPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const allPhotos = [...PHOTOS, ...customPhotos];
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current?.querySelector('button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="curator-modal-title"
      ref={ref}
    >
      <div className="modal">
        <div className="modal-header">
          <h2 id="curator-modal-title" className="modal-title">Curator Library</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close curator library"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="modal-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'add'}
            className={`modal-tab${tab === 'add' ? ' active' : ''}`}
            onClick={() => setTab('add')}
          >
            <PlusIcon width={14} height={14} />
            <span>Add Frame</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'manage'}
            className={`modal-tab${tab === 'manage' ? ' active' : ''}`}
            onClick={() => setTab('manage')}
          >
            <GridIcon width={14} height={14} />
            <span>Manage ({allPhotos.length})</span>
          </button>
        </div>

        <div className="modal-body">
          {tab === 'add' && (
            <form onSubmit={handleAdd} className="modal-form">
              {[
                { name: 'title', label: 'Title', type: 'text', placeholder: 'Shibuya Twilight…', required: true },
                { name: 'url', label: 'Image URL', type: 'url', placeholder: 'https://…', required: true },
                { name: 'thumb', label: 'Thumbnail URL (optional)', type: 'url', placeholder: 'https://…' },
                { name: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Describe the frame…' },
                { name: 'exif', label: 'EXIF Telemetry', type: 'text', placeholder: '1/100s · f/2.8 · ISO 400' },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label htmlFor={`admin-${field.name}`}>{field.label}</label>
                  <input
                    id={`admin-${field.name}`}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="admin-category">Category</label>
                  <select id="admin-category" name="category" value={form.category} onChange={handleChange}>
                    {['Street', 'Portrait', 'Urban', 'Architecture', 'Landscape'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="admin-license">License</label>
                  <select id="admin-license" name="license" value={form.license} onChange={handleChange}>
                    <option value="free">Free Use</option>
                    <option value="paid">Licensed</option>
                  </select>
                </div>
              </div>
              {saved && (
                <div className="form-success" role="status" aria-live="polite">
                  <CheckIcon />
                  <span>Frame saved to local gallery.</span>
                </div>
              )}
              <button type="submit" className="btn-primary">
                Add Frame
              </button>
            </form>
          )}

          {tab === 'manage' && (
            <div className="manage-wrap">
              <p className="manage-meta">
                {allPhotos.length} total frames · {customPhotos.length} saved locally
              </p>
              <div className="photo-list">
                {allPhotos.map((p) => {
                  const isCustom = customPhotos.some((c) => c.id === p.id);
                  return (
                    <div className="photo-list-item" key={p.id}>
                      <img src={p.thumb || p.url} alt={p.alt || p.title} width={48} height={36} />
                      <span className="photo-list-item-title">{p.title}</span>
                      <span className="photo-list-cat">{p.category}</span>
                      {isCustom && (
                        <button
                          type="button"
                          className="photo-list-item-del"
                          onClick={() => handleDelete(p.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
