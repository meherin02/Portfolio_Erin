import { profile } from '../data/content.js';
import { Icon } from './icons.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function ResumeSection() {
  return (
    <section id="background" className="section section-tight">
      <div className="shell">
        <SectionHead index="04" label="Background" title="Education & resume" />
        <div className="background-grid">
          <Reveal as="div" className="card background-card">
            <h3><Icon name="graduation" size={17} /> Education</h3>
            <p className="background-main">{profile.education.field}</p>
            <p className="background-sub">{profile.education.detail}</p>
            <p className="background-sub muted">
              Coursework and projects centered on software engineering, algorithms, and web development.
            </p>
          </Reveal>

          <Reveal as="div" className="card background-card" delay={90}>
            <h3><Icon name="download" size={17} /> Resume</h3>
            {profile.resume ? (
              <>
                <p className="background-main">My résumé</p>
                <p className="background-sub">Education, projects, and technical skills at a glance.</p>
                <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noopener noreferrer">
                  View résumé
                </a>
              </>
            ) : (
              <>
                <p className="background-main">Request a copy</p>
                <p className="background-sub">
                  A one-page PDF covering my education, projects, and technical skills.
                </p>
                <a className="btn btn-outline" href={`mailto:${profile.email}?subject=${encodeURIComponent('Resume request — via portfolio')}`}>
                  <Icon name="mail" size={15} /> Request by email
                </a>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
