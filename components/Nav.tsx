'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const IHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);
const IThoughts = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8 8 0 0 1-11.6 7.1L3 20.5l1.9-6.3A8 8 0 1 1 21 11.5Z" />
  </svg>
);
const IPodcast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4" />
  </svg>
);
const IAbout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c0-4 3.5-6 7.5-6s7.5 2 7.5 6" />
  </svg>
);

const items = [
  { href: '/', label: 'Home', Icon: IHome },
  { href: '/thoughts', label: 'Thoughts', Icon: IThoughts },
  { href: '/podcast', label: 'Podcast', Icon: IPodcast },
  { href: '/about', label: 'About', Icon: IAbout },
];

export default function Nav() {
  const path = usePathname() || '/';
  // Home is the default selection; it deselects only when another page matches.
  const current = ['/thoughts', '/podcast', '/about'].find(
    (h) => path === h || path.startsWith(h + '/')
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y <= 80) setHidden(false); // first fold: always visible
        else if (y > lastY + 5) setHidden(true); // scrolling down → hide
        else if (y < lastY - 5) setHidden(false); // scrolling up → show
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`ap-nav${hidden ? ' nav-hidden' : ''}`} id="apNav">
      <div className="wrap">
        <div className="ap-right">
          {items.map(({ href, label, Icon }) => {
            const active = href === '/' ? !current : href === current;
            return (
              <Link key={href} href={href} className={active ? 'active' : ''}>
                <span className="ap-ic">
                  <Icon />
                </span>
                <span className="ap-label">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
