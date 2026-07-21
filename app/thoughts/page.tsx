import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export const metadata = {
  title: 'Thoughts — Darshan Suthar',
  description: 'Observations, reflections and discoveries on product, design, research and growth.',
};

export default async function ThoughtsPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from('thoughts')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false });

  return (
    <>
      <Nav />
      <section className="th-main" style={{ paddingTop: 104 }}>
        <div className="wrap">
          <header className="th-hero">
            <h1 className="th-hero-title">Observations, reflections &amp; discoveries.</h1>
            <p className="th-hero-sub">A running log of things that I feel worth sharing online.</p>
          </header>
          <div className="th-list">
            {(posts ?? []).map((p) => (
              <Link key={p.id} className="th-row" href={`/thoughts/${p.slug}`}>
                <div className="th-row-body">
                  <span className="th-cat">{p.category}</span>
                  <h2 className="th-row-title">{p.title}</h2>
                  <div className="th-row-meta">
                    {p.read_minutes ? `${p.read_minutes} min read` : ''}
                  </div>
                  <span className="th-row-cta">Read thought ›</span>
                </div>
                <div className="th-row-media">
                  <span
                    className="th-thumb"
                    style={{ backgroundImage: p.cover_url ? `url(${p.cover_url})` : undefined }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
