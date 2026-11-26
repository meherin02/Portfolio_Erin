import { profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';

const sections = [
  ['Projects', 'projects'], ['About', 'about'], ['Skills', 'skills'],
  ['Background', 'background'], ['Contact', 'contact'],
];

export default function Footer() {
  const names = profile.name.split(' ');
  const surname = names.pop();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <a className="footer-signature" href="/#home">{names.join(' ')} <em>{surname}</em></a>
            <p className="footer-role">{profile.role} · {profile.location}</p>
            <a className="footer-email" href={'mailto:' + profile.email}>
              <Icon name="mail" size={17} /> {profile.email}
            </a>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <h2>Explore</h2>
            {sections.map(([label, id]) => <a key={id} href={'/#' + id}>{label}</a>)}
          </nav>
          <div className="footer-links">
            <h2>Connect</h2>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><BrandIcon name="github" size={16} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><BrandIcon name="linkedin" size={16} /> LinkedIn</a>
            {profile.resume && <a href={profile.resume} target="_blank" rel="noopener noreferrer">View résumé ↗</a>}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with React, Vite &amp; Express</p>
        </div>
      </div>
    </footer>
  );
}
