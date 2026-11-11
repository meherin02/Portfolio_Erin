import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content.js';
import { BrandIcon, Icon } from './icons.jsx';

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0b0e12' : '#f6f8fa');
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? <Icon name="sun" /> : <Icon name="moon" />}
    </button>
  );
}

const links = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when clicking anywhere outside of it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = event => {
      if (event.target.closest('.site-header')) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const close = () => {
    if (!open) return;
    setOpen(false);
    toggleRef.current?.focus();
  };

  const onKeyDown = event => {
    if (event.key === 'Escape') close();
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} onKeyDown={onKeyDown}>
      <div className="shell nav-inner">
        <a className="brand" href="#home" onClick={close}>
          <svg className="brand-mark" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
            <rect x="1.5" y="1.5" width="41" height="41" rx="11" className="brand-box" />
            <text x="22" y="29" textAnchor="middle" className="brand-glyph">&lt;/&gt;</text>
          </svg>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav id="site-nav" className={`site-nav ${open ? 'open' : ''}`} aria-label="Primary">
          <div className="nav-links">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                aria-current={active === href.slice(1) ? 'true' : undefined}
                onClick={close}
              >
                {label}
              </a>
            ))}
            {profile.resume && (
              <a className="btn btn-outline btn-sm nav-resume" href={profile.resume} download onClick={close}>
                <Icon name="download" size={15} /> Resume
              </a>
            )}
            <div className="nav-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
                <BrandIcon name="github" size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                <BrandIcon name="linkedin" size={18} />
              </a>
            </div>
          </div>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
