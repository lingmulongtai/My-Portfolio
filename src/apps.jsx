import React from 'react';
import { PHOTOS } from './data/photos.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Works from './components/Works.jsx';
import PresetPage from './components/PresetPage.jsx';
import JournalPage from './components/JournalPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Footer from './components/Footer.jsx';
import AdminModal from './components/AdminModal.jsx';
import { IconArrowUp } from './components/Icons.jsx';

const CUSTOM_PHOTOS_KEY = 'portfolio_custom_photos';

function loadCustomPhotos() {
  try {
    const raw = JSON.parse(localStorage.getItem(CUSTOM_PHOTOS_KEY));
    return Array.isArray(raw) ? raw : [];
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
  const [customPhotos, setCustomPhotos] = React.useState(loadCustomPhotos);
  const [curatorMode, setCuratorMode] = React.useState(() => {
    try {
      return localStorage.getItem('portfolio_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [editingPhoto, setEditingPhoto] = React.useState(null);
  const [contactSubject, setContactSubject] = React.useState('');
  const [activeEssayId, setActiveEssayId] = React.useState(null);
  const [scrollTop, setScrollTop] = React.useState(false);

  const allPhotos = React.useMemo(() => [...PHOTOS, ...customPhotos], [customPhotos]);

  React.useEffect(() => {
    try {
      localStorage.setItem('portfolio_admin', String(curatorMode));
    } catch {}
  }, [curatorMode]);

  React.useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PHOTOS_KEY, JSON.stringify(customPhotos));
    } catch {}
  }, [customPhotos]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  React.useEffect(() => {
    const handler = () => setScrollTop(window.scrollY > 420);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSetPage = (nextPage) => {
    if (nextPage !== 'journal') setActiveEssayId(null);
    setPage(nextPage);
  };

  const handleOpenEssay = (id) => {
    setActiveEssayId(id);
    setPage('journal');
  };

  const handlePresetInquiry = (presetName) => {
    setContactSubject(`${presetName} preset bundle`);
    setPage('contact');
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setShowAdmin(true);
  };

  const handleSaveCustomPhoto = (photo) => {
    setCustomPhotos((prev) => {
      const exists = prev.some((item) => item.id === photo.id);
      if (exists) return prev.map((item) => (item.id === photo.id ? photo : item));
      return [...prev, photo];
    });
  };

  const handleDeleteCustomPhoto = (id) => {
    setCustomPhotos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Nav page={page} setPage={handleSetPage} />

      <main id="main-content">
        {page === 'home' && (
          <Hero
            photos={allPhotos}
            setPage={handleSetPage}
            onOpenEssay={handleOpenEssay}
          />
        )}
        {page === 'works' && (
          <Works
            photos={allPhotos}
            filter={filter}
            setFilter={setFilter}
            curatorMode={curatorMode}
            onEdit={handleEditPhoto}
          />
        )}
        {page === 'presets' && (
          <PresetPage
            photos={allPhotos}
            onInquire={handlePresetInquiry}
          />
        )}
        {page === 'journal' && (
          <JournalPage
            activeEssayId={activeEssayId}
            setActiveEssayId={setActiveEssayId}
          />
        )}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && (
          <ContactPage initialSubject={contactSubject} />
        )}
      </main>

      <Footer
        setPage={handleSetPage}
        curatorMode={curatorMode}
        setCuratorMode={setCuratorMode}
        setShowAdmin={setShowAdmin}
      />

      {scrollTop && (
        <button
          type="button"
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <IconArrowUp />
        </button>
      )}

      {showAdmin && (
        <AdminModal
          builtInPhotos={PHOTOS}
          customPhotos={customPhotos}
          editingPhoto={editingPhoto}
          onSavePhoto={handleSaveCustomPhoto}
          onDeletePhoto={handleDeleteCustomPhoto}
          onClose={() => {
            setShowAdmin(false);
            setEditingPhoto(null);
          }}
        />
      )}
    </>
  );
}
