import { useSectionLoad } from '../hooks/useSectionLoad';
import SectionLoader from './SectionLoader';

export default function Contact() {
  const { ref, loaderDone, revealed, loaderRemoved } = useSectionLoad();
  const inCls = revealed ? 'in' : '';

  return (
    <section ref={ref} className="contact" id="contact" data-section="contact">
      {!loaderRemoved && (
        <SectionLoader
          variant="contact"
          done={loaderDone}
          index="Section · 04"
          kanji="連"
          label="Kontak · Contact"
          sublabel="Loading"
        />
      )}

      <div className="contact-side">
        <div className={`meta kanji reveal ${inCls}`}>参 · 連絡</div>
        <div className={`contact-num reveal d1 ${inCls}`}>参</div>
        <div className={`contact-kana reveal d2 ${inCls}`}>お問い合わせ</div>
      </div>

      <div className="contact-main">
        <h2 className={`contact-title reveal d1 ${inCls}`}>
          静かに<br /><em>話しましょう。</em>
        </h2>

        <a
          href="mailto:danird1240@gmail.com"
          className={`contact-email reveal d2 ${inCls}`}
        >
          @danird1240@gmail.com
        </a>

        {/* ⬇️ TAMBAHAN: nomor telepon */}
        <a
          href="tel:+6281234567890"
          className={`contact-phone reveal d2 ${inCls}`}
        >
          +62 881 012 804 615
        </a>

        <div className={`contact-links reveal d3 ${inCls}`}>
          <a href="https://github.com/Daniramdev">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/danird/">LinkedIn ↗</a>
          <a href="https://read.cv/danird">Read.cv ↗</a>
          <a href="https://www.instagram.com/_danird8/">Instagram ↗</a>
        </div>
        <div className={`contact-seal reveal d3 ${inCls}`}>暖</div>
      </div>
    </section>
  );
}