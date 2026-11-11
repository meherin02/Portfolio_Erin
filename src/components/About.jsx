import { profile } from '../data/content.js';
import { Icon } from './icons.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHead index="01" label="About" title="A problem-solver who ships" />
        <div className="about-grid">
          <div className="about-copy">
            {profile.about.map((paragraph, index) => (
              <Reveal as="p" key={index} className={index === 0 ? 'lead' : ''} delay={index * 90}>
                {paragraph}
              </Reveal>
            ))}
          </div>
          <Reveal as="aside" className="card about-facts" delay={180}>
            <h3>Quick facts</h3>
            <dl>
              <div>
                <dt><Icon name="graduation" size={15} /> Education</dt>
                <dd>{profile.education.field} · {profile.education.detail}</dd>
              </div>
              <div>
                <dt><Icon name="braces" size={15} /> Focus</dt>
                <dd>Full-stack web development with the MERN stack</dd>
              </div>
              <div>
                <dt><Icon name="mapPin" size={15} /> Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt><Icon name="send" size={15} /> Status</dt>
                <dd>{profile.status}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
