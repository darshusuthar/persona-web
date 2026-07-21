'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items: [string, string][] = [
  ['/', 'Home'],
  ['/thoughts', 'Thoughts'],
  ['/podcast', 'Podcast'],
  ['/about', 'About'],
];

export default function Nav() {
  const path = usePathname();
  return (
    <div className="ap-nav" id="apNav">
      <div className="wrap">
        <div className="ap-right">
          {items.map(([href, label]) => {
            const active = href === '/' ? path === '/' : path.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? 'active' : ''}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
