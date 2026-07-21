import Link from 'next/link';
import { COLLECTIONS } from '@/lib/admin/collections';
import { createSupabaseServer } from '@/lib/supabase/serverClient';
import LogoutButton from '@/components/admin/LogoutButton';

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

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          Content
        </Link>
        <nav className="adm-nav">
          {COLLECTIONS.map((c) => (
            <Link key={c.key} href={`/admin/${c.key}`}>
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          <LogoutButton />
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
