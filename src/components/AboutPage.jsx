import React from 'react';

const TIMELINE = [
  { year: '2024', title: 'Solo Exhibition', place: 'Gallery Shibuya, Tokyo' },
  { year: '2023', title: 'Commercial Work', place: 'Fashion Week Tokyo Campaign' },
  { year: '2022', title: 'Featured Artist', place: 'Tokyo Photography Festival' },
  { year: '2021', title: 'Graduated', place: 'Tokyo University of the Arts' },
  { year: '2019', title: 'First Published Work', place: 'JAPAN SNAP Magazine' },
];

const SKILLS = ['Sony α7 IV', 'Lightroom', 'Capture One', 'Street Photography', 'Long Exposure', 'Portrait', 'Architecture', 'Adobe Suite'];

export default function AboutPage() {
  return (
    <section className="section" id="about" aria-label="About">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">About the Artist</p>
          <h2>Ryuta Suzuki</h2>
        </div>

        <div className="about-layout">
          <div className="about-photo-wrap">
            <img
              className="about-photo"
              src="photos/icon.jpg"
              alt="Ryuta Suzuki, photographer"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600'; }}
            />
            <p className="about-photo-caption">© Ryuta Suzuki · Tokyo, 2024</p>
          </div>

          <div className="about-content">
            <p className="about-lead">
              東京を拠点に活動するフォトグラファー、鈴木隆太。<br />
              ストリート・ポートレート・建築を横断しながら、「光と影の詩」を追い求めています。
            </p>
            <p style={{ fontSize: '0.95rem' }}>
              Born and raised in Tokyo, I have spent the last five years documenting the city's endless contrasts—
              neon-lit alleys and silent temples, fleeting faces and enduring concrete. My work explores the space
              between the planned and the accidental.
            </p>

            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Timeline</h4>
              <ul className="about-timeline">
                {TIMELINE.map(t => (
                  <li key={t.year}>
                    <strong>{t.title}</strong>
                    {t.place}
                    <br />
                    <span>{t.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Tools & Skills</h4>
              <div className="skills-row">
                {SKILLS.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
