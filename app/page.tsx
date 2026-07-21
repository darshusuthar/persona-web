import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HeroGrid from '@/components/home/HeroGrid';
import HeroStats from '@/components/home/HeroStats';
import Testimonials from '@/components/home/Testimonials';
import PodcastRows from '@/components/home/PodcastRows';
import { createClient } from '@/lib/supabase/server';
import { img } from '@/lib/media';

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();
  const [{ data: stats }, { data: testi }, { data: eps }] = await Promise.all([
    supabase.from('hero_stats').select('*').order('sort_order', { ascending: true }),
    supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('podcast_episodes')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true }),
  ]);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="ap hero-ap" data-nav="light">
        <div className="wrap hero-split">
          <div className="hero-left">
            <h1 className="hero-name">Darshan Suthar</h1>
            <p className="k">Designer. Founder. Host.</p>
            <HeroStats stats={stats ?? []} />
          </div>
          <HeroGrid />
        </div>
      </section>

      {/* CRAFT STORIES */}
      <section className="ap dark ap-left" id="designer" data-nav="dark">
        <div className="wrap">
          <h2>Craft stories</h2>
          <p className="k">A decade shaping products across fintech, commerce and SaaS.</p>
          <div className="work-cards">
            <a className="wcard cs-sensibull" href="/work/builder">
              <img className="wc-logo" src={img('sensibull-logo.png')} alt="Sensibull" />
              <span className="wc-title">Story of building a builder</span>
              <span className="wc-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="wcard cs-meesho" href="/work/checkout">
              <img className="wc-logo" src={img('meesho-logo.png')} alt="Meesho" />
              <span className="wc-title">Multi-Supplier Checkout Story</span>
              <span className="wc-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="wcard cs-impact" href="/work/impactcraft">
              <img className="wc-logo" src={img('impactcraft-logo.png')} alt="ImpactCraft" />
              <span className="wc-title">Story of Redefining Patterns</span>
              <span className="wc-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <Testimonials items={testi ?? []} />
        </div>
      </section>

      {/* FOUNDER */}
      <section className="ap" id="founder" data-nav="light">
        <div className="wrap">
          <div className="apps-head">
            <h2>
              Built what I <span className="serif">believed in</span>.
            </h2>
            <p className="apps-sub">Two ventures, one direction — solve the core problem.</p>
          </div>
          <div className="apps-slider" id="appsSlider">
            <div className="apps-card">
              <div className="ac-name">teem.fit</div>
              <p className="ac-desc">
                India&apos;s biggest home for pre-assessed designers. Teams hire from a ranked
                shortlist of proven talent — no one repeats the work.
              </p>
              <div className="ac-cta">
                <a href="https://www.teem.fit" target="_blank" rel="noopener">
                  Visit teem.fit ↗
                </a>
              </div>
              <img className="ac-img" src={img('media/Teem.fit%20Banner.png')} alt="teem.fit" />
            </div>
            <div className="apps-card">
              <div className="ac-name">PRODUX Studio</div>
              <p className="ac-desc">
                The B2B SaaS design studio behind it — research-led, speed-obsessed, built to help
                early and mid-stage products scale.
              </p>
              <div className="ac-cta">
                <a href="https://www.produxdesign.studio" target="_blank" rel="noopener">
                  Explore PRODUX ↗
                </a>
              </div>
              <img className="ac-img" src={img('media/Produx%20Banner.png')} alt="PRODUX Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* HOST */}
      <section className="pod-sec" id="host" data-nav="dark">
        <div className="wrap">
          <div className="pod-intro">
            <h2 className="studio-title">
              Conversations with the people who <span className="serif">build</span>.
            </h2>
            <p className="studio-lead">
              Candid talks with leaders in product, design, research and growth.
            </p>
            <a
              className="pod-watch"
              href="https://www.youtube.com/@Darshans_Diary/videos"
              target="_blank"
              rel="noopener"
            >
              Watch on Darshan&apos;s Diary ↗
            </a>
          </div>
        </div>
        <PodcastRows episodes={eps ?? []} />
      </section>

      <Footer />
    </>
  );
}
