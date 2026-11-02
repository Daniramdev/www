import { useCallback, useEffect, useRef, useState } from 'react';
import { getLenis } from '../lib/lenis';

const LINK_ICONS = { repo: '⌥', docs: '▤', demo: '↗' };

export default function CaseOverlay({ project, onClose, onOpenLightbox, isLightboxOpen }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeBtnRef = useRef(null);

  // Trigger enter transition on a fresh frame
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal content (loader exit) after 1.6s
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // Focus close button after reveal
  useEffect(() => {
    if (revealed && closeBtnRef.current) closeBtnRef.current.focus();
  }, [revealed]);

  // Lock body + Lenis on mount, release on unmount
  useEffect(() => {
    document.body.classList.add('overlay-open');
    const lenis = getLenis();
    if (lenis) lenis.stop();
    return () => {
      document.body.classList.remove('overlay-open');
      if (lenis) lenis.start();
    };
  }, []);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose(), 1900);
  }, [closing, onClose]);

  // ESC key handler
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !closing && !isLightboxOpen) handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closing, isLightboxOpen, handleClose]);

  const p = project;

  return (
    <div
      className={`case-overlay${open ? ' open' : ''}${revealed ? ' revealed' : ''}${closing ? ' closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="caseTitle"
      aria-hidden="false"
    >
      {/* Case loader */}
      <div className="case-loader" aria-hidden="true">
        <div className="case-loader-stage">
          <div className="case-loader-kanji">{p.kanji}</div>
          <div className="case-loader-name" dangerouslySetInnerHTML={{ __html: p.title }} />
          <div className="case-loader-label">Case Study · {p.eyebrow[1]}</div>
          <div className="case-loader-bar" />
        </div>
      </div>

      {/* Exit screen */}
      <div className="case-exit" aria-hidden="true">
        <div className="case-exit-stage">
          <div className="case-exit-kanji">間</div>
          <div className="case-exit-name">間 · Ma</div>
          <div className="case-exit-label">Kembali · Back</div>
          <div className="case-exit-bar" />
        </div>
      </div>

      <button
        ref={closeBtnRef}
        className="case-close"
        onClick={handleClose}
        aria-label="Tutup case study"
      >
        ✕
      </button>

      <div className="case-overlay-content">
        <section className="case-hero">
          <div className="case-kanji" aria-hidden="true">{p.kanji}</div>
          <div className="case-hero-inner">
            <div className="case-eyebrow">
              {p.eyebrow.map((x, i) => <span key={i}>{x}</span>)}
            </div>
            <h1 className="case-title" id="caseTitle" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="case-tagline">{p.tagline}</p>
            <div className="case-meta">
              {p.role && (
                <div className="case-meta-item">
                  <strong>Peran</strong>
                  <span>{p.role}</span>
                </div>
              )}
              {p.period && (
                <div className="case-meta-item">
                  <strong>Periode</strong>
                  <span>{p.period}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="case-body">
          <div className="case-metrics">
            {p.metrics.map((m, i) => (
              <div key={i} className="case-metric">
                <div className="case-metric-val" dangerouslySetInnerHTML={{ __html: m.val }} />
                <div className="case-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {p.proof && p.proof.length > 0 && (
            <section className="case-section">
              <div className="case-section-label">Bukti · Visual proof</div>
              <div className="case-proof-grid">
                {p.proof.map((it, i) => (
                  <figure
                    key={i}
                    className="case-proof-item"
                    role="button"
                    tabIndex={0}
                    aria-label={`Perbesar: ${it.caption}`}
                    onClick={() => onOpenLightbox(it.src, it.caption)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenLightbox(it.src, it.caption);
                      }
                    }}
                  >
                    <img className="case-proof-img" src={it.src} alt={it.caption} loading="lazy" />
                    <span className="case-proof-zoom" aria-hidden="true">⤢</span>
                    <figcaption className="case-proof-caption">
                      <span className="cap-num">{it.tag}</span>
                      <span className="cap-label">{it.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="case-section">
            <div className="case-section-label">Masalah · Problem</div>
            <p>{p.problem}</p>
          </section>

          <section className="case-section">
            <div className="case-section-label">Solusi · Solution</div>
            <ul className="case-solutions">
              {p.solutions.map((s, i) => (
                <li key={i} data-num={s.n}>
                  <span dangerouslySetInnerHTML={{ __html: s.t }} />
                </li>
              ))}
            </ul>
          </section>

          <section className="case-section">
            <div className="case-section-label">Stack</div>
            <div className="case-stack">
              {p.stack.map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </section>

          {p.reflection && (
            <section className="case-section case-reflection">
              <div className="case-section-label">Refleksi · What I'd do differently</div>
              <p dangerouslySetInnerHTML={{ __html: p.reflection }} />
            </section>
          )}

          <div className="case-footer">
            <div className="case-footer-links">
              {(p.links || []).map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  className={`case-link case-link--${l.type || 'demo'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="case-link-icon">{LINK_ICONS[l.type] || '↗'}</span>
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="#works"
              className="case-close-bottom"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              ← Kembali ke karya
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}