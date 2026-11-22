import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HomeLoader from '@/components/home/HomeLoader';
import HeroIntro from '@/components/home/HeroIntro';
import WorkCards from '@/components/home/WorkCards';
import TestimonialQuotes from '@/components/home/TestimonialQuotes';
import ProduxSection from '@/components/home/ProduxSection';
import FounderSection from '@/components/home/FounderSection';
import YouTubeSection from '@/components/home/YouTubeSection';
import { createClient } from '@/lib/supabase/server';
import './feedback.css';

export const revalidate = 60;

// FEEDBACK VERSION of the home page.
// Order: Hero (who I am: designer, founder, host) → Case studies → teem.fit → Produx (with testimonials) → YouTube.
export default async function Home() {
  const supabase = createClient();
  const [{ data: testi }, { data: cases }] = await Promise.all([
    supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
    supabase.from('case_studies').select('slug, cover_url').eq('status', 'published'),
  ]);

  return (
    <>
      <HomeLoader />
      <Nav />

      <HeroIntro />

      {/* CASE STUDIES (cards only) */}
      <section className="wk" id="work" data-nav="light">
        <div className="wrap">
          <h2 className="px-h2 wk-title-h">Shipped work</h2>
          <p className="px-sub">A few products from fintech, commerce and SaaS, and the difference they made.</p>
          <WorkCards rows={cases ?? []} />
        </div>
      </section>

      <FounderSection />
      <div className="wrap" aria-hidden="true">
        <hr className="sec-sep" />
      </div>
      {/* Produx, then what its clients said */}
      <ProduxSection testimonials={<TestimonialQuotes items={testi ?? []} />} />
      <YouTubeSection />

      <Footer />
    </>
  );
}
