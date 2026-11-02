import { useEffect, useState } from 'react';

export default function Lightbox({ src, caption, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`lightbox${visible ? ' open' : ''}`}
      role="dialog"
      aria-label="Pratinjau gambar"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <button className="lightbox-close" onClick={handleClose} aria-label="Tutup pratinjau">
        ✕
      </button>
      <img src={src} alt={caption} />
      <div className="lightbox-caption">{caption}</div>
    </div>
  );
}