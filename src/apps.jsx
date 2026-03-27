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
    if (v === defaultVal) sp.delete(key); else sp.set(key, v);
    const q = sp.toString();
    window.history.pushState({}, '', q ? `?${q}` : window.location.pathname);
    setVal(v);
  };
  return [val, set];
}

export default function App() {
  const [page, setPage] = useQueryState('page', 'home');
  const [filter, setFilter] = useQueryState('filter', 'All');
  const [adminMode, setAdminMode] = React.useState(() => {
    try { return localStorage.getItem('portfolio_admin') === 'true'; } catch { return false; }
  });
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [editingPhoto, setEditingPhoto] = React.useState(null);
  const [scrollTop, setScrollTop] = React.useState(false);

  // Persist admin mode
  React.useEffect(() => {
    try { localStorage.setItem('portfolio_admin', String(adminMode)); } catch {}
  }, [adminMode]);

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Scroll-to-top button
  React.useEffect(() => {
    const handler = () => setScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSetPage = (p) => {
    setPage(p);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setShowAdmin(true);
  };

  return (
    <>
      <Nav
        page={page}
        setPage={handleSetPage}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
      />

      <main id="main-content">
        {page === 'home' && <Hero setPage={handleSetPage} />}
        {page === 'works' && (
          <Works
            filter={filter}
            setFilter={setFilter}
            adminMode={adminMode}
            onEdit={handleEditPhoto}
          />
        )}
        {page === 'presets' && <PresetPage />}
        {page === 'journal' && <JournalPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer
        adminMode={adminMode}
        setAdminMode={setAdminMode}
        setShowAdmin={setShowAdmin}
      />

      {scrollTop && (
        <button
          className="scroll-top visible"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {showAdmin && (
        <AdminModal
          editingPhoto={editingPhoto}
          onClose={() => { setShowAdmin(false); setEditingPhoto(null); }}
        />
      )}
    </>
  );
}
