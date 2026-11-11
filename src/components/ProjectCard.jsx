import { Icon } from './icons.jsx';
import Reveal from './Reveal.jsx';

export default function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal as="article" className="card project-card" delay={(index % 2) * 90}>
      <button type="button" className="project-media" onClick={onOpen} aria-label={`View details of ${project.title}`}>
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1440"
          height="900"
          loading="lazy"
          decoding="async"
        />
        <span className="project-media-overlay">
          <span className="project-view-pill">View details <Icon name="arrowRight" size={14} /></span>
        </span>
      </button>

      <div className="project-body">
        <p className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </p>
        <h3 className="project-title">
          <button type="button" className="project-title-link" onClick={onOpen}>
            {project.title}
          </button>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="tag-list">
          {project.stack.map(tech => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="project-links">
          <a className="btn btn-outline btn-sm" href={project.live} target="_blank" rel="noopener noreferrer">
            Live demo <Icon name="external" size={13} />
          </a>
          <a className="btn btn-ghost btn-sm" href={project.source} target="_blank" rel="noopener noreferrer">
            Source <Icon name="external" size={13} />
          </a>
          <button type="button" className="btn btn-ghost btn-sm project-details-btn" onClick={onOpen}>
            Details <Icon name="arrowRight" size={13} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
