// src/lib/lenis.js
// Pakai Lenis dari CDN (window.Lenis) — fallback ke custom kalau CDN gagal
let instance = null;

export function initLenis() {
  if (instance) return instance;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  if (typeof window.Lenis !== 'function') {
    console.warn('[lenis] CDN tidak ter-load, fallback ke native scroll');
    return null;
  }

  instance = new window.Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    syncTouch: false,
    touchInertiaMultiplier: 18,
    infinite: false,
    autoRaf: true,
    anchors: false,
    autoToggle: false,
    allowNestedScroll: true,
  });

  window.__lenis = instance;
  return instance;
}

export function getLenis() {
  return instance;
}

export function scrollTo(target, offset = 0) {
  if (!target) return;
  if (typeof target === 'string') target = document.querySelector(target);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 });
  } else {
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - offset;
    try { window.scrollTo({ top, behavior: 'smooth' }); }
    catch { window.scrollTo(0, top); }
  }
}