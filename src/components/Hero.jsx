import { useEffect, useState } from 'react';
import { profile, heroPhrases } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';
import Reveal from './Reveal.jsx';

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

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setPhraseIndex(index => (index + 1) % heroPhrases.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <Reveal as="p" className="status-pill" delay={0}>
            <span className="status-dot" aria-hidden="true" />
            {profile.status}
          </Reveal>
          <Reveal as="h1" id="hero-title" className="hero-title" delay={70}>
            {profile.name}
          </Reveal>
          <Reveal as="p" className="hero-role" delay={140}>
            {profile.role}
          </Reveal>
          <Reveal as="p" className="hero-line" delay={210}>
            I build <span key={phraseIndex} className="rotate-phrase">{heroPhrases[phraseIndex]}</span>.
          </Reveal>
          <Reveal as="p" className="hero-intro" delay={280}>
            {profile.intro}
          </Reveal>
          <Reveal as="div" className="hero-actions" delay={350}>
            <a className="btn btn-primary" href="#projects">
              Explore my projects <Icon name="arrowDown" size={16} />
            </a>
            {profile.resume ? (
              <a className="btn btn-outline" href={profile.resume} download>
                <Icon name="download" size={16} /> Download resume
              </a>
            ) : (
              <a className="btn btn-outline" href="#contact">Get in touch</a>
            )}
          </Reveal>
          <Reveal as="div" className="hero-socials" delay={420}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="github" size={19} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="linkedin" size={19} /> LinkedIn
            </a>
          </Reveal>
        </div>

        <div className="hero-visual">
          <figure className="portrait">
            <img
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width="1024"
              height="1024"
              fetchPriority="high"
              style={{ objectPosition: profile.portrait.position }}
            />
          </figure>
          <CodeCard />
        </div>
      </div>
    </section>
  );
}
