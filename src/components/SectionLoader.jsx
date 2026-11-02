export default function SectionLoader({ variant, done, index, kanji, label, sublabel }) {
  return (
    <div className={`section-loader sl-${variant}${done ? ' done' : ''}`} aria-hidden="true">
      <div className="sl-index">{index}</div>
      <div className="sl-stage">
        {variant === 'works' && (
          <div className="sl-strokes">
            <div className="sl-stroke" />
            <div className="sl-stroke" />
            <div className="sl-stroke" />
          </div>
        )}
        <div className="sl-kanji">{kanji}</div>
      </div>
      <div className="sl-label">
        {label}
        <span>{sublabel}</span>
      </div>
    </div>
  );
}