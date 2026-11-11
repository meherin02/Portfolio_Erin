import Reveal from './Reveal.jsx';

/** Consistent numbered eyebrow + heading used at the top of every section. */
export default function SectionHead({ index, label, title, lede }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {label}
      </p>
      <h2>{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  );
}
