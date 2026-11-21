import React from 'react';
import { CheckIcon, ClockIcon, MailIcon, MapPinIcon } from './Icons.jsx';

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
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) nextErrors.message = 'Share a few details about your project.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setErrors({});
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 id="contact-heading">Contact</h1>
            <p className="page-lead">
              Available for commissions, editorial assignments, and preset licensing inquiries.
            </p>
          </div>
          <span className="page-counter">Shibuya, Tokyo</span>
        </header>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Start a Conversation</h2>
            <p>
              Whether you are commissioning a portrait series, an architectural story, or a commercial campaign, include dates and location so I can respond with availability.
            </p>

            <dl className="contact-details">
              <div className="contact-detail-row">
                <dt>
                  <MapPinIcon />
                  <span>Location</span>
                </dt>
                <dd>Shibuya, Tokyo, Japan</dd>
              </div>
              <div className="contact-detail-row">
                <dt>
                  <MailIcon />
                  <span>Email</span>
                </dt>
                <dd>
                  <a href="mailto:hello@ryutasuzuki.jp">hello@ryutasuzuki.jp</a>
                </dd>
              </div>
              <div className="contact-detail-row">
                <dt>
                  <ClockIcon />
                  <span>Response</span>
                </dt>
                <dd>Within 24 hours</dd>
              </div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {sent ? (
              <div className="form-success" role="status" aria-live="polite">
                <CheckIcon />
                <div>
                  <strong>Inquiry recorded</strong>
                  <p>Thank you for reaching out. Expect a reply within 24 hours.</p>
                  <button type="button" className="text-link" onClick={() => setSent(false)}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Kenji Sato…"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      required
                    />
                    {errors.name && (
                      <span id="err-name" className="field-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@studio.jp…"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      required
                    />
                    {errors.email && (
                      <span id="err-email" className="field-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Portrait session, editorial brief, or preset inquiry…"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Share project scope, dates, and location…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    required
                  />
                  {errors.message && (
                    <span id="err-message" className="field-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn-primary">
                  Send Inquiry
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
