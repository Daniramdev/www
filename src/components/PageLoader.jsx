// self-contained PageLoader — no external CSS dependencies
import { useEffect, useMemo, useState } from 'react';

const KANJI = ['一','二','三','四','五','六','七','八','九','十'];

const CSS = `
  .ldr{position:fixed;inset:0;z-index:99999;background:#EFE9DC;display:grid;place-items:center;overflow:hidden;clip-path:inset(0 0 0 0);transition:clip-path 1.4s cubic-bezier(.65,.05,.36,1);touch-action:none}
  .ldr.done{clip-path:inset(0 0 100% 0)}
  .ldr-stage{position:relative;width:clamp(150px,20vw,210px);aspect-ratio:1;display:grid;place-items:center;color:#A62F24}
  .ldr-svg{position:absolute;inset:0;width:100%;height:100%;display:block;transform:rotate(-90deg)}
  .ldr-svg circle{fill:none;stroke:#A62F24;stroke-width:1;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000;animation:ldr-circle 1.8s cubic-bezier(.65,.05,.36,1) .2s forwards}
  .ldr-svg .inner{stroke-width:.5;opacity:.4;animation-delay:.5s;animation-duration:2s}
  @keyframes ldr-circle{to{stroke-dashoffset:0}}
  .ldr-name{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;color:#A62F24;font-weight:300;text-align:center;z-index:1;font-family:'Noto Serif JP',serif}
  .ldr-line{display:flex;font-size:clamp(.85rem,1.8vw,1.1rem);letter-spacing:.08em;line-height:1}
  .ldr-ch{display:inline-block;opacity:0;transform:translateY(6px);filter:blur(6px);animation:ldr-ch-in .6s cubic-bezier(.65,.05,.36,1) forwards}
  .ldr-ch.sep{animation:ldr-ch-sep .4s cubic-bezier(.65,.05,.36,1) forwards}
  @keyframes ldr-ch-in{to{opacity:1;transform:translateY(0);filter:blur(0)}}
  @keyframes ldr-ch-sep{to{opacity:.4}}
  .ldr-mark{margin-top:10px;width:18px;height:1px;background:#A62F24;opacity:0;transform:scaleX(0);animation:ldr-mark-in .8s cubic-bezier(.65,.05,.36,1) 1.8s forwards}
  @keyframes ldr-mark-in{to{opacity:.6;transform:scaleX(1)}}
  .ldr-count{position:absolute;bottom:clamp(20px,4vh,44px);left:clamp(20px,3vw,40px);color:#171612;font-size:.95rem;letter-spacing:.15em;opacity:0;animation:ldr-fade .6s ease 2s forwards;font-family:'Noto Serif JP',serif}
  @keyframes ldr-fade{to{opacity:1}}
  .ldr-status{position:absolute;bottom:clamp(20px,4vh,44px);left:50%;transform:translateX(-50%) translateY(10px);color:#6A6458;font-size:.6rem;letter-spacing:.45em;text-align:center;opacity:0;animation:ldr-fade-up 1s cubic-bezier(.65,.05,.36,1) 2.2s forwards;font-family:'Noto Serif JP',serif}
  .ldr-status span{display:block;font-family:'Inter',sans-serif;font-size:.46rem;letter-spacing:.35em;text-transform:uppercase;margin-top:8px;color:#A69E8F}
  @keyframes ldr-fade-up{to{opacity:1;transform:translateX(-50%) translateY(0)}}
  .ldr-hanko{position:absolute;bottom:clamp(20px,4vh,44px);right:clamp(20px,3vw,40px);width:34px;height:34px;background:#A62F24;color:#EFE9DC;display:grid;place-items:center;font-size:.9rem;font-weight:500;border-radius:1px;transform:rotate(-3deg) scale(0);opacity:0;animation:ldr-hanko 0.8s cubic-bezier(.65,.05,.36,1) 2.5s forwards;font-family:'Noto Serif JP',serif}
  @keyframes ldr-hanko{from{opacity:0;transform:rotate(-3deg) scale(1.5)}to{opacity:1;transform:rotate(-3deg) scale(1)}}
`;

function LoaderCount() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % KANJI.length), 180);
    return () => clearInterval(t);
  }, []);
  return <div className="ldr-count">{KANJI[idx]}</div>;
}

export default function PageLoader({ dismissing }) {
  const parts = useMemo(() => {
    const arr = [];
    let d = 0.8;
    ['ダ', 'ニ'].forEach((ch) => { arr.push({ ch, delay: d, line: 1 }); d += 0.09; });
    arr.push({ ch: '・', delay: d, line: 1, sep: true });
    d += 0.12;
    ['ラ', 'ム', 'ダ', 'ニ'].forEach((ch) => { arr.push({ ch, delay: d, line: 2 }); d += 0.09; });
    return arr;
  }, []);

  const line1 = parts.filter((p) => p.line === 1);
  const line2 = parts.filter((p) => p.line === 2);

  return (
    <>
      <style>{CSS}</style>
      <div className={`ldr ${dismissing ? 'done' : ''}`} aria-hidden="true">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="ink-rough-loader">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="1.6" />
            </filter>
          </defs>
        </svg>

        <div className="ldr-stage">
          <svg className="ldr-svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="94" />
            <circle cx="100" cy="100" r="88" className="inner" />
          </svg>
          <div className="ldr-name">
            <div className="ldr-line" aria-label="ダニ・ラムダニ">
              {line1.map((c, i) => (
                <span key={i} className={`ldr-ch${c.sep ? ' sep' : ''}`} style={{ animationDelay: `${c.delay}s` }}>
                  {c.ch}
                </span>
              ))}
            </div>
            <div className="ldr-line" aria-label="ダニ・ラムダニ">
              {line2.map((c, i) => (
                <span key={i} className="ldr-ch" style={{ animationDelay: `${c.delay}s` }}>
                  {c.ch}
                </span>
              ))}
            </div>
            <div className="ldr-mark" />
          </div>
        </div>

        <LoaderCount />
        <div className="ldr-status">
          読み込み中<span>Loading</span>
        </div>
        <div className="ldr-hanko">間</div>
      </div>
    </>
  );
}