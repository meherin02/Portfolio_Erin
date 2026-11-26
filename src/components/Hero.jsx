import { profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';

export default function Hero() {
  const names = profile.name.split(' ');
  const surname = names.pop();
  return (
    <section id="home" className="hero editorial-hero" aria-labelledby="hero-title">
      <div className="shell introduction">
        <div className="intro-heading">
          <p className="occupation">{profile.role}</p>
          <h1 id="hero-title">{names.join(' ')} <em>{surname}</em></h1>
        </div>
        <figure className="portrait-panel">
          <img src={profile.portrait.src} alt={profile.portrait.alt}
            width="1024" height="1024" fetchPriority="high"
            style={{ objectPosition: profile.portrait.position }} />
          <figcaption><span className="availability-dot" />{profile.status}<span>{profile.location}</span></figcaption>
        </figure>
        <div className="intro-details">
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Explore my projects <Icon name="arrowDown" size={16} /></a>
            {profile.resume
              ? <a className="btn btn-outline" href={profile.resume} target="_blank" rel="noopener noreferrer">View résumé</a>
              : <a className="btn btn-outline" href="#contact">Get in touch</a>}
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><BrandIcon name="github" size={17} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><BrandIcon name="linkedin" size={17} /> LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
