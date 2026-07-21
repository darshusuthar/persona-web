import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '@/lib/supabase/serverClient';

export async function POST() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // Refresh every page under the root layout so edits show immediately.
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true });
}
