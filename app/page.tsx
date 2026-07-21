import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();
  const [{ data: stats }, { data: cases }] = await Promise.all([
    supabase.from('hero_stats').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true }),
  ]);

  const heroImgs = ['/images/media/hero-1.jpg', '/images/media/hero-2.jpg', '/images/media/hero-3.jpg', '/images/media/hero-4.jpg'];

  return (
    <>
      <Nav />
      <section className="ap hero-ap" data-nav="light">
        <div className="wrap hero-split">
          <div className="hero-left">
            <h1 className="hero-name">Darshan Suthar</h1>
            <p className="k">Designer. Founder. Host.</p>
            <div className="hero-stats">
              {(stats ?? []).map((s) => (
                <div className="s" key={s.id}>
                  <b>
                    {s.value}
                    <em>{s.suffix ?? '+'}</em>
                  </b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-grid" id="heroGrid">
            {heroImgs.map((src) => (
              <div
                key={src}
                className="hbox"
                style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            ))}
          </div>
        </div>
      </section>

      {cases && cases.length > 0 ? (
        <section className="ap">
          <div className="wrap">
            <div className="work-cards">
              {cases.map((c) => (
                <Link key={c.id} className="wcard" href={`/work/${c.slug}`}>
                  <span className="wc-title">{c.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </>
  );
}
