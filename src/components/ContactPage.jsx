import React from 'react';

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = React.useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Get in Touch</p>
          <h2>Contact</h2>
          <p>Available for commissions, collaborations, and editorial work.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <h3>Let's work together.</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Whether you need a portrait session, commercial photography, or want to discuss a creative project—I'd love to hear from you.
            </p>
            <div className="contact-items">
              {[
                { icon: '📍', label: 'Location', val: 'Shibuya, Tokyo, Japan' },
                { icon: '📧', label: 'Email', val: 'hello@ryutasuzuki.jp' },
                { icon: '��', label: 'Response Time', val: 'Within 24 hours' },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-item-label">{c.label}</div>
                    <div className="contact-item-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="contact-item-label" style={{ marginBottom: '10px' }}>Social</p>
              <div className="contact-socials">
                {['Instagram', 'Twitter/X', 'VSCO', 'Behance'].map(s => (
                  <button key={s} className="social-btn">{s}</button>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {sent ? (
              <div className="form-success">
                ✓ Message sent! I'll get back to you within 24 hours.
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="e.g. Portrait Session Inquiry" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
