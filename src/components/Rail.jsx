import AnchorLink from './AnchorLink';

const NAV = [
  { href: '#works', label: 'Karya' },
  { href: '#about', label: 'Tentang' },
  { href: '#contact', label: 'Kontak' },
];

export default function Rail() {
  return (
    <aside className="rail">
      <div className="rail-mark">
        <span>暖</span>
        <small>Dani Ramdani</small>
      </div>
      <nav className="rail-nav" aria-label="Section navigation">
        {NAV.map((item) => (
          <AnchorLink key={item.href} href={item.href}>
            {item.label}
          </AnchorLink>
        ))}
      </nav>
      <div className="rail-foot">MMXXVI</div>
    </aside>
  );
}