import { useSectionLoad } from '../hooks/useSectionLoad';
import SectionLoader from './SectionLoader';

export default function About() {
  const { ref, loaderDone, revealed, loaderRemoved } = useSectionLoad();
  const inCls = revealed ? 'in' : '';

  return (
    <section ref={ref} className="about" id="about" data-section="about">
      {!loaderRemoved && (
        <SectionLoader
          variant="about"
          done={loaderDone}
          index="Section · 01"
          kanji="私"
          label="Tentang · About"
          sublabel="Loading"
        />
      )}

      <div className="about-side">
        <div className={`meta kanji reveal ${inCls}`}>壱 · 私について</div>
        <div className={`about-num reveal d1 ${inCls}`}>壱</div>
        <div className={`about-kana reveal d2 ${inCls}`}>自己紹介</div>
      </div>

      <div className="about-main">
        <p className={`reveal d1 ${inCls}`}>
          Desain terbaik bukan yang paling ramai — tapi yang paling <strong>jelas</strong>.
          Konsep <em>Ma</em> (間): ruang kosong di antara objek setara bobotnya dengan objek itu sendiri.
        </p>
        <p className={`reveal d2 ${inCls}`}>
          Dua tahun membangun produk web end-to-end untuk startup Bandung.
          Satu tujuan: sistem yang bisa diandalkan, interface yang tenang.
        </p>
        <div className={`facts reveal d3 ${inCls}`}>
          <div className="fact"><b>2<em>+</em></b><span>Tahun</span></div>
          <div className="fact"><b>5</b><span>Proyek</span></div>
          <div className="fact"><b>4</b><span>Klien</span></div>
        </div>
      </div>
    </section>
  );
}