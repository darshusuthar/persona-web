'use client';
import { useEffect, useRef } from 'react';

type Ep = { id: string | number; thumb_url: string | null; youtube_url: string | null };

export default function PodcastRows({ episodes }: { episodes: Ep[] }) {
  const secRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rows: Ep[][] = [[], [], []];
  episodes.forEach((e, i) => rows[i % 3].push(e));
  const dirs = [-1, 1, -1];

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const AMP = 620;
    const bases: number[] = [];

    const setBases = () => {
      trackRefs.current.forEach((t, i) => {
        if (t) bases[i] = -(t.scrollWidth - (t.parentElement?.clientWidth || 0)) / 2;
      });
    };
    const onScroll = () => {
      const sec = secRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh - r.top) / (vh + r.height);
      p = Math.max(0, Math.min(1, p));
      const shift = (p - 0.5) * AMP;
      trackRefs.current.forEach((t, i) => {
        if (!t) return;
        const x = (bases[i] || 0) + (reduce ? 0 : dirs[i] * shift);
        t.style.transform = `translate3d(${x}px,0,0)`;
      });
    };

    setBases();
    onScroll();
    const onResize = () => {
      setBases();
      onScroll();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodes]);

  return (
    <div className="pod-rows" ref={secRef}>
      {rows.map((row, ri) => (
        <div className="pod-row" key={ri}>
          <div
            className="pod-track"
            data-dir={dirs[ri]}
            ref={(el) => {
              trackRefs.current[ri] = el;
            }}
          >
            {row.map((e) => (
              <a
                key={e.id}
                className="ep-tile"
                href={e.youtube_url || '#'}
                target="_blank"
                rel="noopener"
                style={{ backgroundImage: e.thumb_url ? `url(${e.thumb_url})` : undefined }}
              >
                <span className="ep-play">▶</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
