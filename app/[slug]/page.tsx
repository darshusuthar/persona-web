import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data } = await supabase.from('pages').select('slug').eq('status', 'published');
  return (data ?? []).map((r) => ({ slug: r.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();
  const { data: p } = await supabase.from('pages').select('*').eq('slug', slug).single();
  if (!p) return {};
  return {
    title: p.seo_title || `${p.title} — Darshan Suthar`,
    description: p.seo_description || undefined,
    alternates: p.canonical_url ? { canonical: p.canonical_url } : undefined,
    openGraph: { images: p.seo_og_image ? [p.seo_og_image] : [] },
  };
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient();
  const { data: p } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!p) notFound();

  const fullWidth = p.template === 'fullwidth';

  return (
    <>
      <Nav />
      <main className={fullWidth ? 'ab-main' : 'article'} style={{ paddingTop: 104 }}>
        {fullWidth ? (
          <>
            {p.hero_image_url ? (
              <div className="ab-banner">
                <img src={p.hero_image_url} alt={p.title} />
              </div>
            ) : null}
            <div className="wrap">
              <h1 className="ab-title">{p.title}</h1>
              <div className="prose">
                <ReactMarkdown>{p.body || ''}</ReactMarkdown>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="article-title">{p.title}</h1>
            {p.hero_image_url ? (
              <img className="article-hero img-l" src={p.hero_image_url} alt={p.title} />
            ) : null}
            <div className="prose">
              <ReactMarkdown>{p.body || ''}</ReactMarkdown>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
