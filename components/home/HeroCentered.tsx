import HeroStats from '@/components/home/HeroStats';
import { img } from '@/lib/media';

type Stat = { id: string | number; value: string; suffix: string | null; label: string };

// Centered hero: full-bleed background banner with title / subtitle on top.
// The photo grid now lives in its own "Memories" section below (see page.tsx).
export default function HeroCentered({ stats }: { stats: Stat[] }) {
  return (
    <section
      className="ap hero-ap hero-center hero-banner"
      data-nav="light"
      style={{ backgroundImage: `url(${img('hero-banner.png')})` }}
    >
      <div className="hero-banner-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="hc-head">
          <h1 className="hero-name">Darshan Suthar</h1>
          <p className="k">Designer. Founder. Host.</p>
          {false && <HeroStats stats={stats} />}
        </div>
      </div>
    </section>
  );
}
