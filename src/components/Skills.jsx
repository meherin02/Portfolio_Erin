import { skillGroups } from '../data/content.js';
import { BrandIcon, skillIcon } from './icons.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHead
          index="02"
          label="Skills"
          title="Technologies I work with"
          lede="The tools I use to design, build, and ship web applications — grouped by where they fit in the stack."
        />
        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <Reveal as="div" key={group.title} className="card card-hover skill-group" delay={groupIndex * 70}>
              <h3>{group.title}</h3>
              <ul className="skill-list">
                {group.skills.map(skill => (
                  <li key={skill} className="skill-chip" title={skill}>
                    <BrandIcon name={skillIcon(skill)} size={15} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
