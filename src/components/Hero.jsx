// src/components/Hero.jsx
import AnchorLink from './AnchorLink';

const META = [
  { label: 'Role',   value: 'Fullstack'  },
  { label: 'Based',  value: 'bandung'    },
  { label: 'Since',  value: '2020'       },
  { label: 'Status', value: 'Open · 2026'},
];

const LINKS = [
  { href: '#works',   label: 'Karya'   },
  { href: '#about',   label: 'Tentang' },
  { href: '#contact', label: 'Kontak'  },
];

export default function Hero({ revealed }) {
  const inCls = revealed ? 'in' : '';

  return (
    <section className="hero" id="top">
      {/* ── LEFT ── */}
      <div className="hero-left">
        <div className={`meta hero-tag reveal ${inCls}`}>
          Portfolio · 二〇二六
        </div>

        <div className={`hero-meta-stack reveal d2 ${inCls}`}>
          {META.map((m) => (
            <div className="item" key={m.label}>
              <span>{m.label}</span>
              <span>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="hero-right">
        <div className="hero-main">
          <h1 className={`hero-title reveal d1 ${inCls}`}>
            空っぽの場所に、<br />
            <em>意味</em>を置く。<span className="seal-mark">。</span>
          </h1>

          <p className={`hero-lede reveal d2 ${inCls}`}>
            <strong>Dani Ramdani</strong> — fullstack engineer &amp; designer.
            Kode yang rapi, ruang yang bernapas.
          </p>
         

          <div className={`hero-bottom reveal d3 ${inCls}`}>
            <div className="hero-links">
              {LINKS.map((l) => (
                <AnchorLink key={l.href} href={l.href}>
                  {l.label}
                </AnchorLink>
              ))}
            </div>
            <div className="hero-year">二〇二六 · 春</div>
          </div>
        </div>
      </div>
    </section>
  );
}