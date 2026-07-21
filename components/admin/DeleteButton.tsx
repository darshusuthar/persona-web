'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/browserClient';

export default function DeleteButton({
  table,
  pk,
  id,
  label,
}: {
  table: string;
  pk: string;
  id: string | number;
  label: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    setBusy(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.from(table).delete().eq(pk, id);
    if (error) {
      alert(error.message);
      setBusy(false);
      return;
    }
    await fetch('/api/revalidate', { method: 'POST' });
    router.refresh();
  }

  return (
    <button className="adm-del" onClick={del} disabled={busy}>
      {busy ? '…' : 'Delete'}
    </button>
  );
}
