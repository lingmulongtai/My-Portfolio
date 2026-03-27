import React from 'react';
import { PHOTOS } from '../data/photos.js';

const LS_KEY = 'portfolio_custom_photos';

function getCustomPhotos() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
}
function saveCustomPhotos(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

const EMPTY_FORM = { title: '', category: 'Street', url: '', thumb: '', alt: '', exif: '', license: 'free' };

export default function AdminModal({ onClose }) {
  const [tab, setTab] = React.useState('add');
  const [customPhotos, setCustomPhotos] = React.useState(getCustomPhotos);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [saved, setSaved] = React.useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = (e) => {
    e.preventDefault();
    const newPhoto = { ...form, id: Date.now(), featured: false, tags: [] };
    const updated = [...customPhotos, newPhoto];
    setCustomPhotos(updated);
    saveCustomPhotos(updated);
    setForm(EMPTY_FORM);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    const updated = customPhotos.filter(p => p.id !== id);
    setCustomPhotos(updated);
    saveCustomPhotos(updated);
  };

  const allPhotos = [...PHOTOS, ...customPhotos];

  // Trap focus
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current?.querySelector('button')?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Scroll lock
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Admin panel">
      <div className="modal" ref={ref}>
        <div className="modal-header">
          <h2 className="modal-title">🔧 Admin Panel</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <div className="modal-tabs" role="tablist">
          {['add', 'manage'].map(t => (
            <button
              key={t}
              className={`modal-tab${tab === t ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
            >
              {t === 'add' ? '➕ Add Photo' : '🗂 Manage'}
            </button>
          ))}
        </div>

        <div className="modal-body">
          {tab === 'add' && (
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'title', label: 'Title', type: 'text', placeholder: 'Photo title' },
                { name: 'url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'thumb', label: 'Thumbnail URL', type: 'text', placeholder: 'https://...' },
                { name: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Describe the image' },
                { name: 'exif', label: 'EXIF', type: 'text', placeholder: '1/100s · f/2.8 · ISO 400' },
              ].map(f => (
                <div className="form-group" key={f.name}>
                  <label htmlFor={`admin-${f.name}`}>{f.label}</label>
                  <input id={`admin-${f.name}`} name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
                </div>
              ))}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="admin-category">Category</label>
                  <select id="admin-category" name="category" value={form.category} onChange={handleChange}>
                    {['Street','Portrait','Urban','Architecture','Landscape'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="admin-license">License</label>
                  <select id="admin-license" name="license" value={form.license} onChange={handleChange}>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              {saved && <div className="form-success">✓ Photo added to local storage!</div>}
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Add Photo</button>
            </form>
          )}

          {tab === 'manage' && (
            <div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: '12px' }}>
                Showing {allPhotos.length} photos · {customPhotos.length} custom (in localStorage)
              </p>
              <div className="photo-list">
                {allPhotos.map(p => (
                  <div className="photo-list-item" key={p.id}>
                    <img src={p.thumb || p.url} alt={p.alt} />
                    <span className="photo-list-item-title">{p.title}</span>
                    <span className="badge badge-" style={{ fontSize: '0.68rem', color: 'var(--text-3)' }}>{p.category}</span>
                    {customPhotos.find(c => c.id === p.id) && (
                      <button className="photo-list-item-del" onClick={() => handleDelete(p.id)}>Delete</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
