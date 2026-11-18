import CaseStudyView from '@/components/CaseStudyView';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data } = await supabase.from('case_studies').select('slug').eq('status', 'published');
  return (data ?? []).map((r) => ({ slug: r.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();
  const { data: c } = await supabase.from('case_studies').select('*').eq('slug', slug).single();
  if (!c) return {};
  return {
    title: c.seo_title || `${c.title} — Darshan Suthar`,
    description: c.seo_description || c.lead || undefined,
    alternates: c.canonical_url ? { canonical: c.canonical_url } : undefined,
    openGraph: { images: c.seo_og_image ? [c.seo_og_image] : [] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient();
  const { data: c } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!c) notFound();

  return <CaseStudyView c={c} />;
}
