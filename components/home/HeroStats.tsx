'use client';
import { useEffect, useState } from 'react';

type Stat = { id: string | number; value: string; suffix: string | null; label: string };

export default function HeroStats({ stats }: { stats: Stat[] }) {
  const [display, setDisplay] = useState<string[]>(stats.map(() => '0'));
  const [showPlus, setShowPlus] = useState(false);

  useEffect(() => {
    const targets = stats.map((s) => parseInt(String(s.value).replace(/[^0-9]/g, ''), 10) || 0);
    const fmt = (n: number) => n.toLocaleString('en-US');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(stats.map((s) => s.value));
      setShowPlus(true);
      return;
    }
    const DUR = 1600;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / DUR);
      const e = 1 - Math.pow(1 - t, 3);
      setDisplay(targets.map((v) => fmt(Math.round(v * e))));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setDisplay(stats.map((s) => s.value));
        setShowPlus(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stats]);

  return (
    <div className="hero-stats">
      {stats.map((s, i) => (
        <div className="s" key={s.id}>
          <b>
            {display[i]}
            <em style={{ opacity: showPlus ? 1 : 0, transition: 'opacity .4s ease' }}>
              {s.suffix ?? '+'}
            </em>
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
