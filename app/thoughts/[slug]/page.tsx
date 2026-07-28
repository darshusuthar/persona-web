import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ShareBar from '@/components/ShareBar';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data } = await supabase.from('thoughts').select('slug').eq('status', 'published');
  return (data ?? []).map((r) => ({ slug: r.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();
  const { data: p } = await supabase.from('thoughts').select('*').eq('slug', slug).single();
  if (!p) return {};
  // SEO/social image: use the explicit OG image, else the thought's cover (widget icon).
  const ogImage = p.seo_og_image || p.cover_url || undefined;
  return {
    title: p.seo_title || `${p.title} — Darshan Suthar`,
    description: p.seo_description || p.excerpt || undefined,
    alternates: p.canonical_url ? { canonical: p.canonical_url } : undefined,
    openGraph: { images: ogImage ? [ogImage] : [] },
    twitter: ogImage ? { card: 'summary_large_image', images: [ogImage] } : undefined,
  };
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: p } = await supabase
    .from('thoughts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!p) notFound();

  const { data: others } = await supabase
    .from('thoughts')
    .select('slug,title')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(2);

  const dateStr = p.published_at
    ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  return (
    <>
      <Nav />
      <article className="article">
        <a href="/thoughts" className="article-back">
          ← Thoughts
        </a>
        <div className="article-head">
          {p.category ? <span className="note-cat">{p.category}</span> : null}
          <h1>{p.title}</h1>
          <div className="article-meta">
            <span>Darshan Suthar</span>
            {/* timestamp + read-time hidden from front-end (data kept) */}
            {false && dateStr ? (
              <>
                <span className="am-dot" />
                <span>{dateStr}</span>
              </>
            ) : null}
            {false && p.read_minutes ? (
              <>
                <span className="am-dot" />
                <span>{p.read_minutes} min read</span>
              </>
            ) : null}
          </div>
        </div>

        <ShareBar />

        <div className="prose">
          <ReactMarkdown>{p.body || ''}</ReactMarkdown>
        </div>
      </article>

      {others && others.length > 0 ? (
        <div className="article-foot">
          <div className="more-notes">
            <h4>Keep reading</h4>
            <div className="more-reading">
              {others.map((o) => (
                <a key={o.slug} href={`/thoughts/${o.slug}`}>
                  {o.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  );
}
