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

  const { data: bannerRow } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'about_banner_url')
    .maybeSingle();
  const banner = bannerRow?.value || img('about%20hero.jpeg');

  return (
    <>
      <Nav />
      <main className="ab-main">
        <div className="wrap">
          <header className="ab-intro">
            <h1 className="ab-title">A builder who&apos;s obsessed with craft.</h1>
            <div className="ab-lead">
              <p>
                I&apos;m Darshan. A designer by training, a builder by instinct. I think in systems
                more than screens, and care more about why something exists than how it looks.
                Designer, founder, host are just different rooms I do the same thing in.
              </p>
              <p>
                Craft gets you in the room; taste, judgment, and business sense keep you there. Good
                design isn&apos;t the prettiest screen, it&apos;s the one that moves what matters.
                Underneath it all sits one belief: build.
              </p>
            </div>
          </header>

          <div className="ab-banner">
            <img src={banner} alt="Darshan Suthar" />
          </div>

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
