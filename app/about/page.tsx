import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { img } from '@/lib/media';

export const revalidate = 60;

export const metadata = {
  title: 'About — Darshan Suthar',
  description: 'A builder who thinks in systems — the story of Darshan Suthar.',
};

export default async function AboutPage() {
  const supabase = createClient();
  const { data: chapters } = await supabase
    .from('about_chapters')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <>
      <Nav />
      <main className="ab-main">
        <section className="ab-hero">
          <div className="ab-hero-glow" aria-hidden="true">
            <span className="ab-glow-blob ab-glow-a" />
            <span className="ab-glow-blob ab-glow-b" />
            <span className="ab-glow-blob ab-glow-c" />
            <span className="ab-glow-blob ab-glow-d" />
            <span className="ab-glow-blob ab-glow-e" />
          </div>
          <div className="ab-hero-inner">
            <div className="ab-hero-text">
              <h1 className="ab-title">
                A builder who <br />
                loves art
              </h1>
              <p className="ab-sub">
                A designer by training, a builder by instinct. I think in systems more than screens,
                and care more about why something exists than how it looks.
              </p>
            </div>
            <div className="ab-hero-art">
              <img src={img('darshan-avtar.svg')} alt="Darshan Suthar" />
            </div>
          </div>
        </section>

        <div className="wrap">
          <section className="ab-versions">
            <p className="ab-eyebrow">A few versions of me</p>
            <div className="ab-chapters">
              {(chapters ?? []).map((c) => (
                <article className="ab-chapter" key={c.id}>
                  <div className="ab-idx">
                    <span className="ab-num">{c.idx}</span>
                    <span className="ab-era">{c.era}</span>
                  </div>
                  <div className="ab-ch-body">
                    <h2 className="ab-ch-title">{c.title}</h2>
                    <p>{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
