import { COLLECTIONS } from '@/lib/admin/collections';
import { createSupabaseServer } from '@/lib/supabase/serverClient';
import LogoutButton from '@/components/admin/LogoutButton';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated: only the login page renders (middleware guards the rest).
  if (!user) {
    return <div className="adm-auth-wrap">{children}</div>;
  }

  // Row counts per collection, for the sidebar badges.
  const items = await Promise.all(
    COLLECTIONS.map(async (c) => {
      const { count } = await supabase
        .from(c.table)
        .select('*', { count: 'exact', head: true });
      return { key: c.key, label: c.label, count: count ?? 0 };
    })
  );

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          <span className="adm-brand-mark">DS</span>
          <span className="adm-brand-text">
            Studio
            <small>Content manager</small>
          </span>
        </div>

        <AdminNav items={items} />

        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          <LogoutButton />
        </div>
      </aside>
      <main className="adm-main">
        <div className="adm-main-inner">{children}</div>
      </main>
    </div>
  );
}
