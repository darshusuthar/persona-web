'use client';
import { useEffect, useRef, useState } from 'react';
import { img } from '@/lib/media';

// --- sheet geometry (tweak to reshape) ---
const COLS = 4;
const ROWS = 6;
const CARD_W = 264; // sized so 4 cols fill the ~1112px container width
const CARD_H = 264; // square
const GAP_X = 18;

// A card's "slot" u = row - scrollOffset. u = 0 is the flat reading band.
//  u < 0  -> above the band: flat, real scale, breathing space, then fades out.
//  u > 0  -> below the band: curls into perspective (tilts + grows + spreads).
const BAND_Y = 150; // px: vertical position of the flat reading band (+ve = below centre, less empty tail)
const FLAT_PITCH = 296; // real-scale row spacing in the flat/top region (square cards)
const BREATHE = 1.5; // slots of real-scale breathing room above the band before fading
const FADE_SPAN = 1.1; // slots over which the top rows fade out

const START_OFFSET = -1.05; // first row peeks a bit higher on load
const END_OFFSET = ROWS - 1; // last row flattens to proper ratio
const SETTLE_AT = 0.82; // fraction of scroll by which the grid is fully settled (then it dwells flat)
const HEAD_BIG = 1.15; // name scale on load
const HEAD_SMALL = 0.72; // name scale once it has shrunk
const HEAD_SHRINK = 0.16; // fraction of scroll over which the name shrinks
const HEAD_LEAVE = 0.3; // fraction of scroll by which the name has risen up and out

const SPREAD = 25; // how much the row spacing widens per slot deeper (gradual elastify)
const ROT_PER = 26; // deg of curl added per slot below the band
const MAX_ROT = 60; // max tilt at the very bottom
const Z_PER = 90; // px toward the camera per slot below the band (perspective enlarge)
const Z_CAP = 3.0; // cap how far cards come toward the camera (prevents runaway scaling/overlap)
const BOT_FADE_AT = 5.0; // slots below the band where incoming rows fade in from nothing

const IMAGES = Array.from({ length: COLS * ROWS }, (_, i) => img(`media/hero-${i + 1}.jpg`));
const colX = (col: number) => (col - (COLS - 1) / 2) * (CARD_W + GAP_X);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function HeroWheel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // decide mobile vs desktop in JS (no dependence on CSS media queries)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width:860px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // mobile 2×2 grid: four photos that fade + shuffle
  const [mobImgs, setMobImgs] = useState<string[]>(IMAGES.slice(0, 4));
  const [mobOp, setMobOp] = useState<number[]>([1, 1, 1, 1]);
  useEffect(() => {
    if (!window.matchMedia('(max-width:860px)').matches) return;
    let slot = 0;
    const id = window.setInterval(() => {
      const s = slot % 4;
      slot++;
      setMobOp((o) => o.map((v, i) => (i === s ? 0 : v)));
      window.setTimeout(() => {
        setMobImgs((prev) => {
          const used = new Set(prev);
          const avail = IMAGES.filter((u) => !used.has(u));
          const pick = avail.length
            ? avail[Math.floor(Math.random() * avail.length)]
            : IMAGES[Math.floor(Math.random() * IMAGES.length)];
          return prev.map((v, i) => (i === s ? pick : v));
        });
        setMobOp((o) => o.map((v, i) => (i === s ? 1 : v)));
      }, 420);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const isMobile = () => window.matchMedia('(max-width:860px)').matches;

    const apply = (p: number) => {
      // name: centred (via CSS top:50% + translateY(-50%)) + large on load,
      // shrinks then rises up and out of view (not sticky)
      const head = headRef.current;
      if (head) {
        const shrink = clamp01(p / HEAD_SHRINK);
        const rise = clamp01(p / HEAD_LEAVE);
        const s = HEAD_BIG - (HEAD_BIG - HEAD_SMALL) * shrink;
        const up = rise * window.innerHeight * 0.62; // rises up and out
        head.style.transform = `translateY(${-up}px) scale(${s})`;
        head.style.opacity = String(Math.max(0, 1 - clamp01((p - HEAD_SHRINK) / 0.12)));
      }

      // reach the settled state by SETTLE_AT, then hold it flat for the remaining scroll
      const prog = clamp01(p / SETTLE_AT);
      const offset = START_OFFSET + prog * (END_OFFSET - START_OFFSET);
      for (let i = 0; i < IMAGES.length; i++) {
        const el = cardsRef.current[i];
        if (!el) continue;
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const u = row - offset;

        let y: number;
        let z = 0;
        let rot = 0;
        let op = 1;

        if (u <= 0) {
          // flat / real-scale region above the band, then fade out toward the top
          y = BAND_Y + u * FLAT_PITCH;
          const above = -u; // how far above the band
          if (above > BREATHE) op = clamp01(1 - (above - BREATHE) / FADE_SPAN);
        } else {
          // perspective region below the band: curl, enlarge and spread out
          rot = Math.min(MAX_ROT, u * ROT_PER);
          z = Math.min(u, Z_CAP) * Z_PER;
          // spacing starts at the flat pitch near the band and widens gradually
          y = BAND_Y + u * FLAT_PITCH + SPREAD * u * u;
          if (u > BOT_FADE_AT) op = clamp01(1 - (u - BOT_FADE_AT) / 1.3);
        }

        el.style.transform = `translate(-50%,-50%) translate3d(${colX(col)}px, ${y}px, ${z}px) rotateX(${rot}deg)`;
        el.style.opacity = String(op);
        el.style.zIndex = String(2000 + Math.round(y)); // nearer/lower rows draw on top
      }
    };

    const clear = () => {
      if (headRef.current) {
        headRef.current.style.transform = '';
        headRef.current.style.opacity = '';
      }
      for (const el of cardsRef.current)
        if (el) {
          el.style.transform = '';
          el.style.opacity = '';
          el.style.zIndex = '';
        }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const track = trackRef.current;
        if (!track) return;
        if (isMobile()) {
          clear();
          return;
        }
        const rect = track.getBoundingClientRect();
        const dist = track.offsetHeight - window.innerHeight;
        const p = dist > 0 ? Math.min(1, Math.max(0, -rect.top / dist)) : 0;
        apply(p);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // MOBILE: simple stacked layout — animated 2×2 grid, then name + subtitle.
  // Rendered as its own DOM (no pin / no media queries) so nothing can hide it.
  if (isMobile) {
    return (
      <section className="hero-wheel-m" data-nav="light">
        <div className="hwm-grid">
          {mobImgs.map((src, i) => (
            <div
              key={i}
              className="hwm-cell"
              style={{ backgroundImage: `url(${src})`, opacity: mobOp[i] }}
            />
          ))}
        </div>
        <div className="hwm-head">
          <h1 className="hero-name">Darshan Suthar</h1>
          <p className="k">Designer. Founder. Host.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-wheel-track" ref={trackRef}>
      <div className="hero-wheel-pin" data-nav="light">
        <div className="hw-headwrap">
          <div className="hw-head" ref={headRef}>
            <h1 className="hero-name">Darshan Suthar</h1>
            <p className="k">Designer. Founder. Host.</p>
          </div>
        </div>
        <div className="hw-stage">
          <div className="hw-wheel">
            {IMAGES.map((src, i) => (
              <div
                key={i}
                className="hw-card"
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{ width: CARD_W, height: CARD_H, backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
