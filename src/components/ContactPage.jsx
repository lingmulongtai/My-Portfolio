import React from 'react';
import { IconCheck, IconClock, IconMail, IconMapPin } from './Icons.jsx';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
  { label: 'VSCO', href: 'https://vsco.co' },
  { label: 'Behance', href: 'https://behance.net' },
];

export default function ContactPage({ initialSubject = '' }) {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (initialSubject) {
      setForm((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) nextErrors.message = 'Include a brief note about your project';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="page-section" id="contact" aria-label="Contact">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">Contact</h1>
          <p className="page-lead">
            Available for portrait sessions, architectural commissions, and editorial assignments in Tokyo
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="contact-heading">Project inquiries</h2>
            <p className="about-copy">
              Share your timeline, location, and intended usage. Commercial licensing and print inquiries are also welcome.
            </p>

            <div className="contact-list">
              <div className="contact-row">
                <IconMapPin />
                <div>
                  <div className="contact-row-label">Location</div>
                  <div className="contact-row-val">Shibuya, Tokyo, Japan</div>
                </div>
              </div>
              <div className="contact-row">
                <IconMail />
                <div>
                  <div className="contact-row-label">Email</div>
                  <div className="contact-row-val">hello@ryutasuzuki.jp</div>
                </div>
              </div>
              <div className="contact-row">
                <IconClock />
                <div>
                  <div className="contact-row-label">Response time</div>
                  <div className="contact-row-val">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div>
              <div className="sub-heading">Elsewhere</div>
              <div className="contact-socials">
                {SOCIALS.map((item) => (
                  <a
                    key={item.label}
                    className="social-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {sent ? (
              <div className="notice-box" role="status">
                <IconCheck />
                <span>Message received — Ryuta responds within 24 hours</span>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Kenji Sato"
                      required
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Portrait session or licensing inquiry"
                  />
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Dates, location, and project scope"
                    required
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Send message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
