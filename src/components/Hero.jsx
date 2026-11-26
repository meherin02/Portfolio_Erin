import { useEffect, useState } from 'react';
import { heroPhrases, profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';

// Horizontal position, vertical position, and size of each background star.
const sparkles = [[4,18,10],[16,7,8],[43,12,12],[55,32,9],[61,72,15],[94,15,14],[97,67,9],[84,91,12],[7,85,11],[35,94,7]];

function CodeCard() {
  return (
    <div className="code-card" aria-hidden="true">
      <div className="code-titlebar">
        <span className="code-dots"><i /><i /><i /></span>
        <span className="code-filename">developer.js</span>
      </div>
      <pre className="code-body"><code>
        <span className="tok-key">const</span> <span className="tok-var">developer</span> ={' {\n'}
        {'  name: '}<span className="tok-str">"{profile.name}"</span>,{'\n'}
        {'  role: '}<span className="tok-str">"{profile.role}"</span>,{'\n'}
        {'  stack: ['}<span className="tok-str">"React"</span>, <span className="tok-str">"Next.js"</span>, <span className="tok-str">"Node"</span>,{'\n'}
        {'          '}<span className="tok-str">"Express"</span>, <span className="tok-str">"MongoDB"</span>],{'\n'}
        {'  interests: ['}<span className="tok-str">"usable web apps"</span>,{'\n'}
        {'               '}<span className="tok-str">"clean interfaces"</span>],{'\n'}
        {'};'}
      </code></pre>
    </div>
  );
}

function BuildLine() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    function sync() {
      window.clearInterval(timer);
      if (!motion.matches) {
        timer = window.setInterval(() => setIndex(i => (i + 1) % heroPhrases.length), 3800);
      }
    }
    sync();
    motion.addEventListener('change', sync);
    return () => {
      window.clearInterval(timer);
      motion.removeEventListener('change', sync);
    };
  }, []);
  return <p className="hero-line">I build <span className="rotate-phrase" key={index}>{heroPhrases[index]}</span>.</p>;
}

export default function Hero() {
  const names = profile.name.split(' ');
  const surname = names.pop();
  return (
    <section id="home" className="hero editorial-hero" aria-labelledby="hero-title">
      <div className="hero-sparkles" aria-hidden="true">
        {sparkles.map(([x, y, size], index) => (
          <i key={x} style={{ '--x': x + '%', '--y': y + '%', '--size': size + 'px', '--delay': -index * 0.7 + 's' }} />
        ))}
      </div>
      <div className="shell introduction">
        <div className="intro-heading">
          <p className="occupation">{profile.role}</p>
          <h1 id="hero-title">{names.join(' ')} <em>{surname}</em></h1>
          <BuildLine />
        </div>
        <div className="portrait-group">
          <figure className="portrait-panel">
            <img src={profile.portrait.src} alt={profile.portrait.alt}
              width="1024" height="1024" fetchPriority="high"
              style={{ objectPosition: profile.portrait.position }} />
            <CodeCard />
            <figcaption><span className="availability-dot" />{profile.status}<span>{profile.location}</span></figcaption>
          </figure>

        </div>
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
