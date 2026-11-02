import { useEffect, useRef, useState } from 'react';

/**
 * Manages the section-loader lifecycle for a section.
 *
 * Phases:
 *   started        → section entered view, loader mounted
 *   loaderDone     → loader starts clip-path exit (+700ms)
 *   revealed       → content clip-path reveal starts (+1100ms)
 *   loaderRemoved  → loader fully unmounted (+2300ms)
 *
 * With `prefers-reduced-motion: reduce`, reveal happens immediately
 * (the CSS already hides `.section-loader` under that media query).
 */
export function useSectionLoad({ threshold = 0 } = {}) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      setLoaderRemoved(true);
      return;
    }

    const timers = [
      setTimeout(() => setLoaderDone(true), 700),
      setTimeout(() => setRevealed(true), 1100),
      setTimeout(() => setLoaderRemoved(true), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return { ref, started, loaderDone, revealed, loaderRemoved };
}