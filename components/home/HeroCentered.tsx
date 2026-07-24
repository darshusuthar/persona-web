import HeroGrid from '@/components/home/HeroGrid';
import HeroStats from '@/components/home/HeroStats';

type Stat = { id: string | number; value: string; suffix: string | null; label: string };

// Alternative hero: centered title / subtitle / stats, then a single row of 4 photos.
export default function HeroCentered({ stats }: { stats: Stat[] }) {
  return (
    <section className="ap hero-ap hero-center" data-nav="light">
      <div className="wrap">
        <div className="hc-head">
          <h1 className="hero-name">Darshan Suthar</h1>
          <p className="k">Designer. Founder. Host.</p>
          {false && <HeroStats stats={stats} />}
        </div>
        <HeroGrid />
      </div>
    </section>
  );
}
