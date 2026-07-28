'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminIcon } from './AdminIcons';

type Item = { key: string; label: string; count: number | null };

export default function AdminNav({ items }: { items: Item[] }) {
  const path = usePathname() || '';
  const overviewActive = path === '/admin';

  return (
    <nav className="adm-nav">
      <Link href="/admin" className={`adm-nav-item${overviewActive ? ' active' : ''}`}>
        <span className="adm-nav-ic">
          <AdminIcon name="overview" />
        </span>
        <span className="adm-nav-label">Overview</span>
      </Link>

      <p className="adm-nav-section">Collections</p>

      {items.map((c) => {
        const href = `/admin/${c.key}`;
        const active = path === href || path.startsWith(href + '/');
        return (
          <Link key={c.key} href={href} className={`adm-nav-item${active ? ' active' : ''}`}>
            <span className="adm-nav-ic">
              <AdminIcon name={c.key} />
            </span>
            <span className="adm-nav-label">{c.label}</span>
            {c.count != null && <span className="adm-nav-count">{c.count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
