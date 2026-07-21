import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Public, read-only Supabase client for server components.
// Uses the anon key and respects Row Level Security (published content only).
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  return createSupabaseClient(url, key, { auth: { persistSession: false } });
}
