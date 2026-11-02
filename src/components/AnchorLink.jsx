import { scrollTo } from '../lib/lenis';

export default function AnchorLink({ href, children, ...rest }) {
  const handleClick = (e) => {
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) scrollTo(target, 0);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}