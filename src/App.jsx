import { useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import ResumeSection from './components/ResumeSection.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import NotFound from './components/NotFound.jsx';
import useActiveSection from './hooks/useActiveSection.js';
import { profile, projects, site } from './data/content.js';

function Home({ initialSlug }) {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects initialSlug={initialSlug} />
      <ResumeSection />
      <Contact />
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const projectSlug = path.startsWith('/projects/') ? path.slice('/projects/'.length).replace(/\/+$/, '') : null;
  const isHome = path === '/' || (projectSlug && projects.some(project => project.slug === projectSlug));
  const active = useActiveSection(isHome ? ['home', 'about', 'skills', 'projects', 'contact'] : []);

  useEffect(() => {
    document.title = isHome ? site.title : `Page not found | ${profile.name}`;
    // Legacy anchor from the previous design: /#work pointed at the projects.
    if (window.location.hash === '#work') {
      window.history.replaceState(null, '', window.location.pathname + '#projects');
    }
  }, [isHome]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav active={isHome ? active : ''} />
      <main id="main">
        {isHome ? <Home initialSlug={projectSlug} /> : <NotFound />}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
