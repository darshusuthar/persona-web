import Link from 'next/link';
import { COLLECTIONS } from '@/lib/admin/collections';

export const dynamic = 'force-dynamic';

export default function AdminHome() {
  return (
    <div>
      <h1 className="adm-h1">Content</h1>
      <p className="adm-sub">Choose what you&apos;d like to manage.</p>
      <div className="adm-grid">
        {COLLECTIONS.map((c) => (
          <Link key={c.key} href={`/admin/${c.key}`} className="adm-card">
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
