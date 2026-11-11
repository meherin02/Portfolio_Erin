import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './icons.jsx';

function trapTab(event, container) {
  const focusable = container.querySelectorAll('a[href], button:not([disabled])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    last.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === last) {
    first.focus();
    event.preventDefault();
  }
}

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const container = dialogRef.current;
    const previouslyFocused = document.activeElement;
    container?.querySelector('button, a')?.focus();

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = event => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && container) trapTab(event, container);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" ref={dialogRef}>
        <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close project details">
          <Icon name="close" />
        </button>

        <img className="modal-image" src={project.image} alt={project.imageAlt} width="1440" height="900" />

        <div className="modal-body">
          <p className="eyebrow">{project.role} · {project.category}</p>
          <h3 id="project-modal-title" className="modal-title">{project.title}</h3>
          <p className="modal-summary">{project.summary}</p>

          <div className="modal-section">
            <h4>The problem</h4>
            <p>{project.problem}</p>
          </div>
          <div className="modal-section">
            <h4>The approach</h4>
            <p>{project.approach}</p>
          </div>
          <div className="modal-section">
            <h4>Key features</h4>
            <ul className="modal-features">
              {project.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          <div className="modal-section">
            <h4>Built with</h4>
            <ul className="tag-list">
              {project.stack.map(tech => <li key={tech}>{tech}</li>)}
            </ul>
          </div>

          <div className="modal-actions">
            <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">
              Visit live site <Icon name="external" size={15} />
            </a>
            <a className="btn btn-outline" href={project.source} target="_blank" rel="noopener noreferrer">
              View source <Icon name="external" size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
