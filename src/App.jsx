import { useEffect, useState } from 'react';
import { initLenis } from './lib/lenis';
import { PROJECTS } from './data/projects';

import PageLoader from './components/PageLoader';
import Fold from './components/Fold';
import Rail from './components/Rail';
import Hero from './components/Hero';
import About from './components/About';
import Pause from './components/Pause';
import Works from './components/Works';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseOverlay from './components/CaseOverlay';
import Lightbox from './components/Lightbox';

const LOADER_MIN = 3400;
const LOADER_EXIT = 1500;

export default function App() {
  const [loaderPhase, setLoaderPhase] = useState('loading'); // loading | dismissing | done
  const [activeCaseKey, setActiveCaseKey] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  // Init Lenis once
  useEffect(() => {
    initLenis();
  }, []);

  // Loader timing
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase('dismissing'), LOADER_MIN);
    const t2 = setTimeout(() => setLoaderPhase('done'), LOADER_MIN + LOADER_EXIT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Lock scroll during loader
  useEffect(() => {
    if (loaderPhase === 'done') {
      document.documentElement.classList.remove('loading');
    } else {
      document.documentElement.classList.add('loading');
    }
  }, [loaderPhase]);

  const heroRevealed = loaderPhase === 'done';

  return (
    <>
      {/* Reusable ink-rough filter (used by .contact-seal) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="ink-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>
      </svg>

      {loaderPhase !== 'done' && <PageLoader dismissing={loaderPhase === 'dismissing'} />}

      <Fold />
      <Rail />

      <main>
        <Hero revealed={heroRevealed} />
        <About />
        <Pause />
        <Works onOpenCase={setActiveCaseKey} />
        <Quote />
        <Contact />
      </main>

      <Footer />

      {activeCaseKey && (
        <CaseOverlay
          key={activeCaseKey}
          project={PROJECTS[activeCaseKey]}
          onClose={() => setActiveCaseKey(null)}
          onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
          isLightboxOpen={!!lightbox}
        />
      )}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}