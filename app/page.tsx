import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HeroCentered from '@/components/home/HeroCentered';
import HeroSplit from '@/components/home/HeroSplit';
import HeroWheel from '@/components/home/HeroWheel';
import Testimonials from '@/components/home/Testimonials';
import CraftCards from '@/components/home/CraftCards';
import HomeLoader from '@/components/home/HomeLoader';
import FounderSection from '@/components/home/FounderSection';
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
      <HomeLoader />
      <Nav />

      {/* HERO — active: <HeroWheel/>. Set false→true below to switch back. */}
      <HeroWheel />
      {false && <HeroCentered stats={stats ?? []} />}
      {false && <HeroSplit stats={stats ?? []} />}

      {/* CRAFT STORIES */}
      <section className="ap dark ap-left" id="designer" data-nav="dark">
        <div className="wrap">
          <h2>Craft stories</h2>
          <p className="k">A decade shaping products across fintech, commerce and SaaS.</p>
          <CraftCards />
          <Testimonials items={testi ?? []} />
        </div>
      </section>

      {/* FOUNDER — "Built what I believed in." (teem.fit). Produx is not shown. */}
      <FounderSection />

      {/* COMMUNITY — grid wall of leaders (replaces the podcast rows) */}
      <section className="leaders-hero" id="host" data-nav="dark">
        <div className="lh-inner">
          <h1 className="lh-title">
            Hosting tech titans
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
