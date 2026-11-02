import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Observation is one-shot (io.disconnect() after first hit),
  // so freeze options on mount — changing them later would be a no-op anyway.
  const optionsRef = useRef(options);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px', ...optionsRef.current }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}