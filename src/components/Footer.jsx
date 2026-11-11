import { profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';

const quickLinks = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Background', '#background'],
  ['Contact', '#contact'],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <svg className="brand-mark" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
              <rect x="1.5" y="1.5" width="41" height="41" rx="11" className="brand-box" />
              <text x="22" y="29" textAnchor="middle" className="brand-glyph">&lt;/&gt;</text>
            </svg>
            <span className="brand-name">{profile.name}</span>
          </a>
          <p className="footer-role">{profile.role} · {profile.location}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {quickLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
            <BrandIcon name="github" size={19} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
            <BrandIcon name="linkedin" size={19} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Send an email" title="Email">
            <Icon name="mail" size={19} />
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p className="footer-built">Designed & built with React, Vite & Express.</p>
      </div>
    </footer>
  );
}
