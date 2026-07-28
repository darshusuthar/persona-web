import Link from 'next/link';
import { COLLECTIONS } from '@/lib/admin/collections';
import { createSupabaseServer } from '@/lib/supabase/serverClient';
import { AdminIcon } from '@/components/admin/AdminIcons';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const supabase = await createSupabaseServer();
  const cards = await Promise.all(
    COLLECTIONS.map(async (c) => {
      const { count } = await supabase
        .from(c.table)
        .select('*', { count: 'exact', head: true });
      return { ...c, count: count ?? 0 };
    })
  );

  return (
    <div>
      <header className="adm-pagehead">
        <div>
          <h1 className="adm-h1">Overview</h1>
          <p className="adm-sub">Everything that powers the site. Pick a collection to manage.</p>
        </div>
      </header>

      <div className="adm-grid">
        {cards.map((c) => (
          <Link key={c.key} href={`/admin/${c.key}`} className="adm-card">
            <span className="adm-card-ic">
              <AdminIcon name={c.key} />
            </span>
            <span className="adm-card-count">{c.count}</span>
            <span className="adm-card-label">{c.label}</span>
            <span className="adm-card-cta">Manage →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
