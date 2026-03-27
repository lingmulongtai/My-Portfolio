import React from 'react';

function useReveal(ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

function RevealEl({ tag: Tag = 'div', delay = 0, children, className = '', ...rest }) {
  const ref = React.useRef(null);
  useReveal(ref);
  return (
    <Tag ref={ref} className={`rvl${delay ? ` rvl-delay-${delay}` : ''}${className ? ' ' + className : ''}`} {...rest}>
      {children}
    </Tag>
  );
}

export default function Hero({ setPage }) {
  return (
    <section className="hero section" id="home" aria-label="Hero section">
      <RevealEl tag="p" className="hero-eyebrow">Tokyo-Based Photographer</RevealEl>
      <RevealEl tag="h1" delay={1}>
        Capturing the <em>Unseen</em><br />Light of Tokyo
      </RevealEl>
      <RevealEl className="hero-rule" delay={2} aria-hidden="true" />
      <RevealEl tag="p" className="hero-sub" delay={2}>
        Street. Portrait. Architecture.<br />
        Documenting the poetry between shadow and light.
      </RevealEl>
      <RevealEl className="hero-ctas" delay={3}>
        <button className="btn-primary" onClick={() => setPage('works')}>
          View Works
        </button>
        <button className="btn-outline" onClick={() => setPage('presets')}>
          Free Presets
        </button>
      </RevealEl>
      <RevealEl className="hero-stats" delay={4}>
        {[
          { num: '9+', label: 'Photos' },
          { num: '3', label: 'Presets' },
          { num: '5+', label: 'Years' },
          { num: '∞', label: 'Passion' },
        ].map(s => (
          <div className="hero-stat" key={s.label}>
            <div className="hero-stat-num">{s.num}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </RevealEl>
    </section>
  );
}
