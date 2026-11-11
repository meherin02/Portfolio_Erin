import { useRef, useState } from 'react';
import { profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > 254 || !emailPattern.test(email)) errors.email = 'Enter a valid email address.';

  if (!subject) errors.subject = 'Please add a subject.';
  else if (subject.length < 3) errors.subject = 'Subject must be at least 3 characters.';
  else if (subject.length > 150) errors.subject = 'Subject must be under 150 characters.';

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.length > 4000) errors.message = 'Message must be under 4000 characters.';

  return errors;
}

function CopyEmailButton({ onStatus }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-outline btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          onStatus({ type: 'success', text: 'Email address copied to clipboard.' });
          window.setTimeout(() => setCopied(false), 2500);
        } catch {
          onStatus({ type: 'error', text: 'Copy is unavailable — select the address and copy it manually.' });
        }
      }}
    >
      {copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy email</>}
    </button>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const setField = field => event => {
    setValues(current => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors(current => ({ ...current, [field]: undefined }));
  };

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const invalid = Object.keys(nextErrors);
    if (invalid.length) {
      formRef.current?.querySelector(`[name="${invalid[0]}"]`)?.focus();
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    if (!profile.contactForm) {
      // No backend is configured for this deployment, so hand the message to
      // the visitor's own email client instead of pretending it was sent.
      const subject = `Portfolio contact: ${values.subject.trim()}`;
      const body = `Hi Meherin,\n\n${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({
        type: 'info',
        text: 'Opening your email app with your message pre-filled. If nothing opens, copy the email address on the left.',
      });
      return;
    }

    setSending(true);
    setStatus({ type: 'info', text: 'Sending your message…' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Message could not be sent.');
      formRef.current?.reset();
      setValues({ name: '', email: '', subject: '', message: '' });
      setStatus({ type: 'success', text: 'Thanks — your message was received. I will get back to you soon.' });
    } catch {
      setStatus({
        type: 'error',
        text: 'Your message could not be sent. Please try again, or email me directly using the address on the left.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHead
          index="05"
          label="Contact"
          title="Let's talk."
          lede="The fastest way to reach me is email — about a role, a project, or feedback on my work."
        />

        <div className="contact-grid">
          <Reveal as="div" className="card contact-info">
            <h3>Reach me directly</h3>
            <div className="contact-email">
              <Icon name="mail" size={16} />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <CopyEmailButton onStatus={setStatus} />
            <ul className="contact-links">
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name="github" size={18} /> <span>GitHub</span> <Icon name="external" size={13} />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name="linkedin" size={18} /> <span>LinkedIn</span> <Icon name="external" size={13} />
                </a>
              </li>
            </ul>
            <p className="contact-note">
              I'm based in {profile.location} and {profile.status.toLowerCase()} — happy to chat about full-stack roles and internships.
            </p>
          </Reveal>

          <Reveal as="div" className="card contact-form-card" delay={100}>
            <form ref={formRef} onSubmit={submit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    value={values.name}
                    onChange={setField('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={values.email}
                    onChange={setField('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  maxLength={150}
                  value={values.subject}
                  onChange={setField('subject')}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                />
                {errors.subject && <p id="contact-subject-error" className="field-error">{errors.subject}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  maxLength={4000}
                  value={values.message}
                  onChange={setField('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && <p id="contact-message-error" className="field-error">{errors.message}</p>}
              </div>
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : <>Send message <Icon name="send" size={15} /></>}
              </button>
              <p className="form-note">
                {profile.contactForm
                  ? 'Messages go straight to my inbox.'
                  : 'This opens your email app with the message ready to send.'}
              </p>
            </form>
          </Reveal>
        </div>

        <p className={`form-status ${status?.type ?? ''}`} role="status" aria-live="polite">
          {status?.text}
        </p>
      </div>
    </section>
  );
}
