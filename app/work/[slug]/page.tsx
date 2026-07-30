import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import MdImage from '@/components/MdImage';
import ThoughtBlocks from '@/components/ThoughtBlocks';
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

  return (
    <>
      <Nav />
      <div className="cs-top">
        <div className="wrap">
          <a className="cs-back" href="/">← Back to home</a>
        </div>
      </div>
      <header className="cs-hero">
        <div className="wrap">
          {c.eyebrow ? <p className="cs-eyebrow">{c.eyebrow}</p> : null}
          <h1>{c.title}</h1>
          {c.lead ? <p className="lead">{c.lead}</p> : null}
          <div className="cs-meta">
            {c.year ? <div className="m"><b>Date</b><span>{c.year}</span></div> : null}
            {c.role ? <div className="m"><b>Role</b><span>{c.role}</span></div> : null}
            {c.tools ? <div className="m"><b>Tools</b><span>{c.tools}</span></div> : null}
          </div>
        </div>
        {c.cover_url ? (
          <div className="cs-banner">
            <img src={c.cover_url} alt={c.title} />
          </div>
        ) : null}
      </header>
      <article className="cs-body">
        {Array.isArray(c.blocks) && c.blocks.length > 0 ? (
          <ThoughtBlocks blocks={c.blocks} className="tb" />
        ) : (
          <ReactMarkdown components={{ img: MdImage }}>{c.body || ''}</ReactMarkdown>
        )}
        <div className="cs-links"><a href="/">← Back to home</a></div>
      </article>
      <Footer />
    </>
  );
}
