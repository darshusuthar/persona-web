'use client';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase/browserClient';

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }
  return (
    <button className="adm-logout" onClick={logout}>
      Sign out
    </button>
  );
}
