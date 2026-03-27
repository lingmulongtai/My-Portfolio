import React from 'react';
import { JOURNAL } from '../data/journal.js';

export default function JournalPage() {
  const formatDate = (d) => {
    const [y, m] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };

  return (
    <section className="section" id="journal" aria-label="Journal">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Thoughts & Process</p>
          <h2>Journal</h2>
          <p>Essays on photography, design, and the craft behind the lens.</p>
        </div>

        <div className="journal-grid">
          {JOURNAL.map(post => (
            <article key={post.id} className="journal-card" tabIndex={0} aria-label={post.title}>
              <img
                className="journal-cover"
                src={post.cover}
                alt={post.title}
                loading="lazy"
              />
              <div className="journal-body">
                <div className="journal-meta">
                  <span className="journal-cat">{post.category}</span>
                  <span className="journal-date">{formatDate(post.date)}</span>
                  <span className="journal-read">{post.readMin} min read</span>
                </div>
                <h3 className="journal-title">{post.title}</h3>
                <p className="journal-excerpt">{post.excerpt}</p>
                <span className="journal-link">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
