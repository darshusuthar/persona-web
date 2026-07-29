import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HeroCentered from '@/components/home/HeroCentered';
import HeroSplit from '@/components/home/HeroSplit';
import Testimonials from '@/components/home/Testimonials';
import { createClient } from '@/lib/supabase/server';
import { img } from '@/lib/media';
import './leaders.css';

export const revalidate = 60;

// Guest photos from Supabase (media/pod/guest)
const guestFile = (f: string) => img('pod/guest/' + encodeURIComponent(f));
const GUESTS = [
  'P001 Thumbnail Youtube 1.png', 'P002 Thumbnail Youtube 1.png', 'P003 Thumbnail Youtube 1.png',
  'P004 Thumbnail Youtube 1.png', 'P005 Thumbnail Youtube 1.png', 'P006 Thumbnail Youtube 1.png',
  'P007 Thumbnail Youtube 1.png', 'P008 Thumbnail Youtube 1.png', 'P009 Thumbnail Youtube 1.png',
  'P010 Thumbnail Youtube 1.png', 'P011 Thumbnail Youtube 1.png', 'P012 Thumbnail Youtube 1.png',
  'P013 Thumbnail Youtube 1.png', 'P014 Thumbnail Youtube 1.png', 'P015 Thumbnail Youtube 1.png',
  'P015 Thumbnail Youtube-1 1.png', 'P017 Thumbnail Youtube 1.png', 'P018 Thumbnail Youtube 1.png',
  'P019 Thumbnail Youtube 1.png', 'P020 Thumbnail Youtube Small 1.png', 'P022 Thumbnail Youtube 1.png',
  'P023 Thumbnail Youtube 1.png', 'P024 Thumbnail Youtube 1.png', 'P024 Thumbnail Youtube-1 1.png',
  'P025 Thumbnail Youtube 1.png', 'P026 Thumbnail Youtube Small 1.png', 'P027 Thumbnail Youtube 1.png',
  'P028 Thumbnail Youtube Small 1.png', 'P029 Thumbnail Youtube Small 1.png', 'P030 Thumbnail Youtube 1.png',
  'P031 Thumbnail Youtube 1.png', 'P032 Thumbnail Youtube Small 1.png', 'P033 Thumbnail Youtube Small 1.png',
];

// deterministic pseudo-random so SSR and client match
const rnd = (s: number) => {
  const x = Math.sin(s * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export default async function Home() {
  const supabase = createClient();
  const [{ data: stats }, { data: testi }] = await Promise.all([
    supabase.from('hero_stats').select('*').order('sort_order', { ascending: true }),
    supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
  ]);

  return (
    <>
      <Nav />

      {/* HERO — swap <HeroCentered/> ↔ <HeroSplit/> to change the layout */}
      <HeroCentered stats={stats ?? []} />
      {false && <HeroSplit stats={stats ?? []} />}

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
              Built what I believed in.
            </h2>
            <p className="apps-sub">Two ventures, with goal to addressed the core problem.</p>
          </div>
          <div className="apps-slider" id="appsSlider">
            <div className="apps-card">
              <div className="ac-name">teem.fit</div>
              <p className="ac-desc">
                India&apos;s biggest home for pre-assessed designers. Teams hire from a ranked
                shortlist of proven talent — no one repeats the work.
              </p>
              <div className="ac-cta">
                <a className="ac-story-btn" href="/teem-fit">
                  The origin story →
                </a>
                <a href="https://www.teem.fit" target="_blank" rel="noopener">
                  Visit teem.fit ↗
                </a>
              </div>
              <img className="ac-img" src={img('media/Teem.fit%20Banner.png')} alt="teem.fit" />
            </div>
            <div className="apps-card">
              <div className="ac-name">Produx Design Studio</div>
              <p className="ac-desc">
                Early and mid stage B2B SaaS faced challenge in finding a right design partner who
                can solve the complex problem. That led me to build research-led, speed-obsessed,
                early and mid-stage product design service.
              </p>
              <div className="ac-cta">
                <a href="https://www.produxdesign.studio" target="_blank" rel="noopener">
                  Explore PRODUX ↗
                </a>
              </div>
              <img className="ac-img" src={img('media/Produx%20Banner.png')} alt="Produx Design Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY — grid wall of leaders (replaces the podcast rows) */}
      <section className="leaders-hero" id="host" data-nav="dark">
        <div className="lh-inner">
          <h1 className="lh-title">
            Hosting Tech Titans
          </h1>
          <div className="lh-faces" aria-hidden="true">
            {GUESTS.map((f, i) => (
              <span
                key={i}
                className="lh-face"
                style={
                  {
                    ['--d' as string]: `${(rnd(i * 11 + 4) * 3).toFixed(2)}s`,
                    ['--dur' as string]: `${(6 + rnd(i * 13 + 5) * 3.5).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                <img src={guestFile(f)} alt="" />
              </span>
            ))}
          </div>
          <p className="lh-desc">
            A library designed for mid-level professionals in product, design, research, and growth
            to learn from leaders and elevate their careers.
          </p>
          <a className="lh-cta" href="/podcast">
            Explore the library →
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
