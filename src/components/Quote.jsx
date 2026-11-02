import { useSectionLoad } from '../hooks/useSectionLoad';
import SectionLoader from './SectionLoader';

export default function Quote() {
  const { ref, loaderDone, revealed, loaderRemoved } = useSectionLoad();
  const inCls = revealed ? 'in' : '';

  return (
    <section ref={ref} className="quote" data-section="quote">
      {!loaderRemoved && (
        <SectionLoader
          variant="quote"
          done={loaderDone}
          index="Section · 03"
          kanji="静"
          label="静寂 · Quiet"
          sublabel="Loading"
        />
      )}
      <p className={`quote-text reveal ${inCls}`}>引き算の美学。足すより、引くほうが難しい。</p>
      <div className={`quote-by reveal d1 ${inCls}`}>— Estetika pengurangan</div>
    </section>
  );
}