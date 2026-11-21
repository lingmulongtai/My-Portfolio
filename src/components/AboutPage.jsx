import React from 'react';

const TIMELINE = [
  { year: '2024', title: 'Solo Exhibition', place: 'Gallery Shibuya, Tokyo' },
  { year: '2023', title: 'Commercial Work', place: 'Fashion Week Tokyo Campaign' },
  { year: '2022', title: 'Featured Artist', place: 'Tokyo Photography Festival' },
  { year: '2021', title: 'Graduated', place: 'Tokyo University of the Arts' },
  { year: '2019', title: 'First Published Work', place: 'JAPAN SNAP Magazine' },
];

const TOOLS = [
  'Sony α7 IV',
  'Lightroom',
  'Capture One',
  'Street Photography',
  'Long Exposure',
  'Portrait',
  'Architecture',
  'Adobe Suite',
];

export default function AboutPage() {
  const base = import.meta.env.BASE_URL || '/';
  const portraitSrc = `${base.replace(/\/$/, '')}/photos/icon.jpg`;

  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 id="about-heading">Ryuta Suzuki</h1>
            <p className="page-lead">
              Tokyo-based photographer exploring urban silence, twilight reflections, and architectural form.
            </p>
          </div>
          <span className="page-counter">Tokyo, Japan</span>
        </header>

        <div className="about-layout">
          <figure className="about-photo-wrap">
            <img
              className="about-photo"
              src={portraitSrc}
              alt="Ryuta Suzuki portrait artwork"
              width={640}
              height={640}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600';
              }}
            />
            <figcaption className="about-photo-caption">
              © Ryuta Suzuki · Tokyo
            </figcaption>
          </figure>

          <div className="about-content">
            <div className="about-bio">
              <p className="about-lead">
                東京を拠点に、ストリート・ポートレート・建築を横断しながら「光と影の詩」を記録しています。
              </p>
              <p>
                Born and raised in Tokyo, I spend nights and early mornings documenting the city’s
                contrasts—neon-lit alleys and silent temples, fleeting faces and enduring concrete.
                My work lives in the space between the planned and the accidental.
              </p>
            </div>

            <div className="about-block">
              <h2>Selected Milestones</h2>
              <ol className="milestone-list">
                {TIMELINE.map((item) => (
                  <li key={item.year} className="milestone-row">
                    <span className="milestone-year">{item.year}</span>
                    <span className="milestone-title">{item.title}</span>
                    <span className="milestone-place">{item.place}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="about-block">
              <h2>Camera & Disciplines</h2>
              <ul className="tools-list">
                {TOOLS.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
