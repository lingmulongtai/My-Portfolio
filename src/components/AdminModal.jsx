import React from 'react';
import { IconCheck, IconClose, IconLayers, IconPlus, IconSliders, IconTrash } from './Icons.jsx';

const EMPTY_FORM = {
  title: '',
  category: 'Street',
  url: '',
  thumb: '',
  alt: '',
  exif: '',
  license: 'free',
};

export default function AdminModal({
  builtInPhotos,
  customPhotos,
  editingPhoto,
  onSavePhoto,
  onDeletePhoto,
  onClose,
}) {
  const [tab, setTab] = React.useState('add');
  const [form, setForm] = React.useState(() =>
    editingPhoto
      ? {
          title: editingPhoto.title || '',
          category: editingPhoto.category || 'Street',
          url: editingPhoto.url || '',
          thumb: editingPhoto.thumb || '',
          alt: editingPhoto.alt || '',
          exif: editingPhoto.exif || '',
          license: editingPhoto.license || 'free',
        }
      : EMPTY_FORM
  );
  const [saved, setSaved] = React.useState(false);

  const isCustomEdit = Boolean(
    editingPhoto && customPhotos.some((p) => p.id === editingPhoto.id)
  );

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    const nextPhoto = {
      id: isCustomEdit ? editingPhoto.id : Date.now(),
      title: form.title.trim(),
      category: form.category,
      url: form.url.trim(),
      thumb: form.thumb.trim() || form.url.trim(),
      alt: form.alt.trim() || form.title.trim(),
      exif: form.exif.trim(),
      license: form.license,
      featured: false,
      tags: [],
    };
    onSavePhoto(nextPhoto);
    if (!isCustomEdit) setForm(EMPTY_FORM);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const allPhotos = [...builtInPhotos, ...customPhotos];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Curator library"
    >
      <div className="modal-panel">
        <div className="modal-header">
          <h2 className="modal-title">
            <IconSliders />
            <span>Curator library</span>
          </h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close curator library"
          >
            <IconClose />
          </button>
        </div>

        <div className="modal-tabs" role="tablist">
          <button
            type="button"
            className={`modal-tab${tab === 'add' ? ' active' : ''}`}
            role="tab"
            aria-selected={tab === 'add'}
            onClick={() => setTab('add')}
          >
            <IconPlus />
            <span>{isCustomEdit ? 'Edit frame' : 'Add frame'}</span>
          </button>
          <button
            type="button"
            className={`modal-tab${tab === 'manage' ? ' active' : ''}`}
            role="tab"
            aria-selected={tab === 'manage'}
            onClick={() => setTab('manage')}
          >
            <IconLayers />
            <span>Catalog ({allPhotos.length})</span>
          </button>
        </div>

        {tab === 'add' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field">
              <label htmlFor="admin-title">Title</label>
              <input
                id="admin-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Ginza Rain Crossing"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="admin-url">Image URL</label>
              <input
                id="admin-url"
                name="url"
                type="text"
                value={form.url}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="admin-exif">EXIF</label>
                <input
                  id="admin-exif"
                  name="exif"
                  type="text"
                  value={form.exif}
                  onChange={handleChange}
                  placeholder="1/100s · f/2.8 · ISO 400"
                />
              </div>

              <div className="field">
                <label htmlFor="admin-alt">Alt text</label>
                <input
                  id="admin-alt"
                  name="alt"
                  type="text"
                  value={form.alt}
                  onChange={handleChange}
                  placeholder="Describe the frame"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="admin-category">Category</label>
                <select
                  id="admin-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {['Street', 'Portrait', 'Urban', 'Architecture', 'Landscape'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="admin-license">License</label>
                <select
                  id="admin-license"
                  name="license"
                  value={form.license}
                  onChange={handleChange}
                >
                  <option value="free">Free use</option>
                  <option value="paid">Licensed</option>
                </select>
              </div>
            </div>

            {saved && (
              <div className="notice-box" role="status">
                <IconCheck />
                <span>Frame saved to local browser library</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              {isCustomEdit ? 'Update frame' : 'Save frame'}
            </button>
          </form>
        )}

        {tab === 'manage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="exif-mono">
              {allPhotos.length} total · {customPhotos.length} stored locally
            </span>
            <div className="photo-list">
              {allPhotos.map((p) => {
                const isCustom = customPhotos.some((c) => c.id === p.id);
                return (
                  <div className="photo-list-item" key={p.id}>
                    <img src={p.thumb || p.url} alt={p.alt} />
                    <span className="photo-list-name">{p.title}</span>
                    <span className="photo-list-cat">{p.category}</span>
                    {isCustom && (
                      <button
                        type="button"
                        className="btn-danger-sm"
                        onClick={() => onDeletePhoto(p.id)}
                      >
                        <IconTrash />
                        <span>Remove</span>
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
  );
}
