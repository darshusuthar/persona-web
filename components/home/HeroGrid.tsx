'use client';
import { useEffect, useRef, useState } from 'react';
import { img } from '@/lib/media';

const HERO = Array.from({ length: 26 }, (_, i) => img(`media/hero-${i + 1}.jpg`));

export default function HeroGrid() {
  const [imgs, setImgs] = useState<string[]>(HERO.slice(0, 4));
  const [op, setOp] = useState<number[]>([1, 1, 1, 1]);
  const [modal, setModal] = useState<string | null>(null);
  const shownRef = useRef<string[]>([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    const pool = [...HERO].sort(() => Math.random() - 0.5);
    const init = pool.slice(0, 4);
    setImgs(init);
    shownRef.current = init;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timers: number[] = [];
    for (let i = 0; i < 4; i++) {
      const schedule = () => {
        timers.push(window.setTimeout(swap, 2600 + Math.random() * 4600));
      };
      const swap = () => {
        if (!pausedRef.current) {
          // fade out, swap the image, fade back in
          setOp((prev) => {
            const n = [...prev];
            n[i] = 0;
            return n;
          });
          timers.push(
            window.setTimeout(() => {
              setImgs((prev) => {
                const avail = HERO.filter((u) => !shownRef.current.includes(u));
                const pick = avail.length
                  ? avail[Math.floor(Math.random() * avail.length)]
                  : HERO[Math.floor(Math.random() * HERO.length)];
                const next = [...prev];
                next[i] = pick;
                shownRef.current = next;
                return next;
              });
              setOp((prev) => {
                const n = [...prev];
                n[i] = 1;
                return n;
              });
            }, 430)
          );
        }
        schedule();
      };
      timers.push(window.setTimeout(schedule, Math.random() * 2600));
    }
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    pausedRef.current = modal !== null;
    document.body.style.overflow = modal ? 'hidden' : '';
  }, [modal]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  return (
    <>
      <div className="hero-grid" id="heroGrid">
        {imgs.map((src, i) => (
          <div
            key={i}
            className="hbox"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: op[i],
              transition: 'opacity 0.43s ease',
            }}
            onClick={() => setModal(src)}
          />
        ))}
      </div>

      <div className={`vid-modal img-modal${modal ? ' open' : ''}`} aria-hidden={!modal}>
        <div className="vid-backdrop" onClick={() => setModal(null)} />
        <div className="img-frame">
          <button className="vid-close" onClick={() => setModal(null)} aria-label="Close">
            ✕
          </button>
          {modal && <img id="imgModalPic" src={modal} alt="" />}
        </div>
      </div>
    </>
  );
}
