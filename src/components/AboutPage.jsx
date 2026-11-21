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
  'Street photography',
  'Long exposure',
  'Portrait',
  'Architecture',
  'Adobe Suite',
];

export default function AboutPage() {
  const portraitSrc = `${import.meta.env.BASE_URL}photos/icon.jpg`;

  return (
    <section className="page-section" id="about" aria-label="About">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">Ryuta Suzuki</h1>
          <p className="page-lead">
            Tokyo-based photographer working across street, portrait, and architectural commissions
          </p>
        </header>

        <div className="about-grid">
          <figure className="about-portrait-frame">
            <img
              className="about-portrait"
              src={portraitSrc}
              alt="Ryuta Suzuki"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600';
              }}
            />
            <figcaption className="about-caption">Tokyo · Sony α7 IV</figcaption>
          </figure>

          <div className="about-body">
            <p className="about-lead">
              東京を拠点に活動するフォトグラファー、鈴木隆太。ストリート・ポートレート・建築を横断しながら、光と影の境界を記録しています。
            </p>
            <p className="about-copy">
              Born and raised in Tokyo, I have spent the last five years documenting the city&apos;s contrasts — rain-lit alleys and quiet residential streets, fleeting expressions and enduring concrete. My work looks for the seam between the planned and the accidental.
            </p>

            <div>
              <h2 className="sub-heading">Selected timeline</h2>
              <ul className="timeline-table">
                {TIMELINE.map((item) => (
                  <li className="timeline-row" key={item.year}>
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-event">{item.title}</span>
                    <span className="timeline-place">{item.place}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="sub-heading">Equipment and disciplines</h2>
              <div className="tools-grid">
                {TOOLS.map((tool) => (
                  <span key={tool} className="tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
