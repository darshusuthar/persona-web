'use client';
import { useEffect, useRef, useState } from 'react';

const LIGHT = [188, 188, 194]; // muted gray
const DARK = [29, 29, 31]; // ink

// Big text that darkens word-by-word as the block scrolls up through the viewport.
export default function TeemReveal({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const mid = r.top + r.height / 2; // center of the text block
      const start = vh * 0.62; // begins as the block's center nears the middle
      const end = vh * 0.32; // fully dark once its center rises above the middle
      const prog = (start - mid) / (start - end);
      setP(Math.max(0, Math.min(1, prog)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = paragraphs.map((par) => par.split(' '));
  const total = words.reduce((n, w) => n + w.length, 0);
  const active = p * total;
  const mix = (t: number) =>
    `rgb(${LIGHT.map((c, k) => Math.round(c + (DARK[k] - c) * t)).join(',')})`;

  let idx = 0;
  return (
    <div className="tf-reveal" ref={ref}>
      {words.map((w, pi) => (
        <p className="tf-reveal-p" key={pi}>
          {w.map((word, wi) => {
            const local = Math.max(0, Math.min(1, active - idx));
            idx += 1;
            return (
              <span key={wi} style={{ color: mix(local) }}>
                {word}
                {wi < w.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
