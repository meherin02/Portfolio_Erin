import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {profile, projects} from './content.js';
import './style.css';

const navigation = [['Home', '/'], ['Work', '/#work'], ['About', '/#about'], ['Skills', '/#skills'], ['Contact', '/#contact']];

function SkillList({skills}) {
  return <ul className="tags">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>;
}

function Footer() {
  return <footer className="footer-wrap"><div className="shell footer">
    <div><a className="brand" href="/">{profile.name}</a><p>{profile.role} · Fourth-year CSE student</p></div>
    <div className="actions" aria-label="Portfolio links">
      <a href="/#work">Projects</a>
      {profile.github && <a href={profile.github}>GitHub</a>}
      {profile.linkedin && <a href={profile.linkedin}>LinkedIn</a>}
      {profile.email && <a href={'mailto:' + profile.email}>Email</a>}
      <a href="#top">Back to top &uarr;</a>
    </div>
  </div></footer>;
}

function ProjectVisual({project}) {
  return project.image
    ? <img className="project-image" src={project.image} alt={project.imageAlt || project.title} loading="lazy" />
    : <div className="visual" aria-hidden="true"><span>{project.title}</span><div>{project.visual.map(label => <i key={label}>{label}<b /><b /><b /></i>)}</div></div>;
}

function Contact() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage('Sending your message...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset();
      setMessage('Your message was received.');
    } catch {
      setMessage('Your message could not be sent. Please try again or use the email link if available.');
    } finally {
      setSending(false);
    }
  }
  return <section id="contact" className="section"><p className="eyebrow">04 / CONTACT</p><h2>Let's talk.</h2>
    {profile.email && <div className="actions"><a href={'mailto:' + profile.email}>{profile.email}</a><button onClick={async () => {
      try { await navigator.clipboard.writeText(profile.email); setMessage('Email copied.'); }
      catch { setMessage('Copy unavailable. You can select the email address above.'); }
    }}>Copy email</button></div>}
    {profile.contactForm && <form onSubmit={submit}>
      <label>Name<input name="name" required maxLength="100" autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength="254" autoComplete="email" /></label>
      <label>Message<textarea name="message" required maxLength="4000" rows="5" /></label>
      <button className="primary" disabled={sending}>Send message</button>
    </form>}
    {!profile.email && !profile.contactForm && <p>Contact details coming soon.</p>}
    <p role="status">{message}</p>
    <div className="actions">{profile.github && <a href={profile.github}>GitHub</a>}{profile.linkedin && <a href={profile.linkedin}>LinkedIn</a>}</div>
  </section>;
}

function Home() {
  return <>
    <section className="hero" aria-labelledby="headline">
      <div className="intro"><p className="eyebrow">{profile.role}</p><h1 id="headline">{profile.headline}</h1><p>{profile.intro}</p></div>
      <figure className="portrait">{profile.portrait.src
        ? <img src={profile.portrait.src} alt={profile.portrait.alt} style={{objectPosition: profile.portrait.position}} />
        : <div className="placeholder"><span aria-hidden="true">+</span><strong>Professional photo</strong><small>Headshot placeholder</small></div>}</figure>
      <div className="actions hero-actions"><a className="primary" href="#work">Explore my work <span aria-hidden="true">&darr;</span></a><a className="button" href="#contact">Get in touch</a></div>
    </section>
    <section id="work" className="section"><p className="eyebrow">01 / PORTFOLIO</p><h2>Selected work</h2>
      <div className="projects">{projects.map((project, index) => <article id={project.slug} key={project.slug}>
        <ProjectVisual project={project} />
        <div className="card-copy"><p className="eyebrow">{String(index+1).padStart(2,'0')} / {project.sample ? 'Sample project' : project.role}</p>
        <h3>{project.title}</h3><p>{project.summary}</p>
        <SkillList skills={project.stack} /></div>
      </article>)}</div>
    </section>
    <section id="about" className="section"><p className="eyebrow">02 / INTRODUCTION</p><h2>About me</h2><p>{profile.about || 'My background and development interests will appear here.'}</p></section>
    <section id="skills" className="section"><p className="eyebrow">03 / TOOLKIT</p><h2>Skills &amp; technologies</h2>
      <div className="skill-grid">
        <div className="panel"><h3>Frontend</h3><SkillList skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']} /></div>
        <div className="panel"><h3>Backend &amp; auth</h3><SkillList skills={['Node.js', 'Express', 'BetterAuth']} /></div>
        <div className="panel"><h3>Data</h3><SkillList skills={['MongoDB', 'Supabase']} /></div>
      </div>
    </section>
    <Contact />
  </>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'; }
    catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const showHome = path === '/' || projects.some(project => path === '/projects/' + project.slug);
  const title = showHome ? profile.name + ' | ' + profile.role : 'Page not found';
  useEffect(() => {
    document.title = title;
    for (const [selector, value] of [
      ['[name="description"]', profile.intro],
      ['[property="og:description"]', profile.intro],
      ['[property="og:title"]', title],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    const sectionId = location.hash.slice(1) || (path.startsWith('/projects/') ? path.slice('/projects/'.length) : '');
    if (sectionId) document.getElementById(sectionId)?.scrollIntoView({behavior: 'instant'});
  }, [title, path]);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <div id="top" /><div className="header-wrap"><header className="shell header" onKeyDown={event => {
      if (event.key === 'Escape' && menu) {
        setMenu(false);
        document.getElementById('menu-toggle')?.focus();
      }
    }}>
      <a className="brand" href="/"><span aria-hidden="true">[+]</span> {profile.name}</a>
      <button id="menu-toggle" className="menu-toggle" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={menu ? 'open' : ''} aria-label="Primary">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}{profile.resume && <a href={profile.resume}>Resume</a>}</nav>
      <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
    </header></div>
    <main id="main" className="shell">{showHome ? <Home /> : <section className="section"><h1>Page not found</h1><a href="/">Back to homepage</a></section>}</main>
    <Footer />
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
