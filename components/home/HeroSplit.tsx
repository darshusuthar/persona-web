import HeroGrid from '@/components/home/HeroGrid';
import HeroStats from '@/components/home/HeroStats';

type Stat = { id: string | number; value: string; suffix: string | null; label: string };

// Original hero: text/stats on the left, 2x2 photo grid on the right.
export default function HeroSplit({ stats }: { stats: Stat[] }) {
  return (
    <section className="ap hero-ap" data-nav="light">
      <div className="wrap hero-split">
        <div className="hero-left">
          <h1 className="hero-name">Darshan Suthar</h1>
          <p className="k">Designer. Founder. Host.</p>
          <HeroStats stats={stats} />
        </div>
        <HeroGrid />
      </div>
    </section>
  );
}
