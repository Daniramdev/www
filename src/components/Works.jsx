import { useSectionLoad } from '../hooks/useSectionLoad';
import SectionLoader from './SectionLoader';
import { PROJECTS } from '../data/projects';
import { NovaMockup, AtlasMockup, LumenMockup, OrbitMockup } from './Mockups';

const MOCKUPS = {
  nova: NovaMockup,
  atlas: AtlasMockup,
  lumen: LumenMockup,
  orbit: OrbitMockup,
};

const EXHIBIT_ORDER = ['nova', 'atlas', 'lumen', 'orbit'];

export default function Works({ onOpenCase }) {
  const { ref, loaderDone, revealed, loaderRemoved } = useSectionLoad();
  const inCls = revealed ? 'in' : '';

  return (
    <section ref={ref} className="works" id="works" data-section="works">
      {!loaderRemoved && (
        <SectionLoader
          variant="works"
          done={loaderDone}
          index="Section · 02"
          kanji="作"
          label="Karya · Works"
          sublabel="Loading"
        />
      )}

      <div className="works-head">
        <h2 className={`reveal ${inCls}`}>
          Selected<br /><em>作品。</em>
        </h2>
        <div className={`meta kanji reveal d1 ${inCls}`}>弐 · 四件</div>
      </div>

      <div className="exhibits">
        {EXHIBIT_ORDER.map((key, i) => {
          const p = PROJECTS[key];
          const Mockup = MOCKUPS[key];
          const year = p.eyebrow[p.eyebrow.length - 1];
          return (
            <article key={key} className={`exhibit reveal d${i + 1} ${inCls}`}>
              <button
                className="exhibit-link"
                onClick={() => onOpenCase(key)}
                aria-haspopup="dialog"
              >
                <div className="exhibit-frame">
                  <span className="proof-badge">Bukti · {p.proof.length}</span>
                  <Mockup />
                </div>
                <div className="exhibit-caption">
                  <span className="ex-kanji">{p.kanji}</span>
                  <span className="ex-title" dangerouslySetInnerHTML={{ __html: p.title }} />
                  <span className="ex-year">{year}</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}