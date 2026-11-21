import React from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Works from './components/Works.jsx';
import PresetPage from './components/PresetPage.jsx';
import JournalPage from './components/JournalPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Footer from './components/Footer.jsx';
import AdminModal from './components/AdminModal.jsx';
import { ArrowUpIcon } from './components/Icons.jsx';

const LS_PHOTOS_KEY = 'portfolio_custom_photos';

function loadCustomPhotos() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LS_PHOTOS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function useQueryState(key, defaultVal) {
  const get = () => new URLSearchParams(window.location.search).get(key) ?? defaultVal;
  const [val, setVal] = React.useState(get);

  React.useEffect(() => {
    const handler = () => setVal(get());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const set = (v) => {
    const sp = new URLSearchParams(window.location.search);
    if (v === defaultVal) sp.delete(key);
    else sp.set(key, v);
    const q = sp.toString();
    window.history.pushState({}, '', q ? `?${q}` : window.location.pathname);
    setVal(v);
  };

  return [val, set];
}

export default function App() {
  const [page, setPage] = useQueryState('page', 'home');
  const [filter, setFilter] = useQueryState('filter', 'All');
  const [contactSubject, setContactSubject] = React.useState('');
  const [customPhotos, setCustomPhotos] = React.useState(loadCustomPhotos);
  const [adminMode, setAdminMode] = React.useState(() => {
    try {
      return localStorage.getItem('portfolio_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [editingPhoto, setEditingPhoto] = React.useState(null);
  const [scrollTop, setScrollTop] = React.useState(false);

  React.useEffect(() => {
    try {
      localStorage.setItem('portfolio_admin', String(adminMode));
    } catch {}
  }, [adminMode]);

  React.useEffect(() => {
    try {
      localStorage.setItem(LS_PHOTOS_KEY, JSON.stringify(customPhotos));
    } catch {}
  }, [customPhotos]);

  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, [page]);

  React.useEffect(() => {
    const handler = () => setScrollTop(window.scrollY > 480);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSetPage = (nextPage) => {
    setPage(nextPage);
  };

  const handleInquirePreset = (presetName) => {
    setContactSubject(`Preset Inquiry: ${presetName}`);
    setPage('contact');
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setShowAdmin(true);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Nav page={page} setPage={handleSetPage} />

      <main id="main-content" tabIndex={-1}>
        {page === 'home' && <Hero setPage={handleSetPage} customPhotos={customPhotos} />}
        {page === 'works' && (
          <Works
            filter={filter}
            setFilter={setFilter}
            adminMode={adminMode}
            onEdit={handleEditPhoto}
            customPhotos={customPhotos}
          />
        )}
        {page === 'presets' && <PresetPage onInquire={handleInquirePreset} />}
        {page === 'journal' && <JournalPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage initialSubject={contactSubject} />}
      </main>

      <Footer
        setPage={handleSetPage}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
        setShowAdmin={setShowAdmin}
      />

      {scrollTop && (
        <button
          type="button"
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      )}

      {showAdmin && (
        <AdminModal
          editingPhoto={editingPhoto}
          customPhotos={customPhotos}
          setCustomPhotos={setCustomPhotos}
          onClose={() => {
            setShowAdmin(false);
            setEditingPhoto(null);
          }}
        />
      )}
    </>
  );
}
