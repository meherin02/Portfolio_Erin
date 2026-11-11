import { useEffect, useState } from 'react';
import { profile, projects, projectCategories } from '../data/content.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Projects({ initialSlug }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  // Support legacy deep links like /projects/fitlog by opening that project.
  useEffect(() => {
    if (!initialSlug) return;
    const project = projects.find(item => item.slug === initialSlug);
    if (project) setSelected(project);
  }, [initialSlug]);

  const close = () => {
    setSelected(null);
    if (window.location.pathname.startsWith('/projects/')) {
      window.history.replaceState(null, '', '/');
    }
  };

  const visible = projects.filter(project => filter === 'All' || project.category === filter);

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHead
          index="03"
          label="Projects"
          title="Selected work"
          lede="A selection of things I've built — from a volunteering platform to a climate data explorer. Open a project for the problem it solves, how it's built, and where to try it."
        />

        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {projectCategories.map(category => {
            const count = category === 'All'
              ? projects.length
              : projects.filter(project => project.category === category).length;
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                className={`filter-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setFilter(category)}
              >
                {category} <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="projects-grid">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>

        <p className="projects-note">
          More on <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a> — including the Express API behind Community Events.
        </p>
      </div>

      {selected && <ProjectModal project={selected} onClose={close} />}
    </section>
  );
}
