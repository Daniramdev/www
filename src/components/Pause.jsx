import { useInView } from '../hooks/useInView';

export default function Pause() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`pause reveal ${inView ? 'in' : ''}`} aria-hidden="true">
      <div className="pause-mark">間</div>
      <div className="pause-quiet">Rest · 静寂</div>
    </div>
  );
}