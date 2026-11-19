'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// First-load screen for the home page.
//
// "Darshan Suthar" in pure white over the hero's drifting colour pools, while
// the page loads. Scrolling is locked. It waits
// for the full page load (window "load": fonts, images) AND at least MIN_MS,
// then the white text turns into the solid heading and the loading layer
// fades away,
// revealing the hero, whose heading sits exactly under the loader's text.
//
// Shown only when the browser loads the home page itself, once per visit:
// arriving at home from any other page on the site skips it.

const MIN_MS = 4000; // minimum time on the loading screen
const MAX_MS = 10000; // never hold visitors longer than this, even if a slow image is still loading
const FILL_MS = 1300; // glass outline → solid text
const FADE_MS = 1200; // loading layer fades away once the colours match the hero
const FADE_DELAY = 1100;
const NAME = 'Darshan Suthar';

let shownThisVisit = false;

// Only show on a real page load of the home page — never when arriving at home from
// another page on the site (e.g. the case study back button), even if the visit
// started elsewhere. On the server this is always a real load of "/".
function isFreshHomeLoad(): boolean {
  if (typeof window === 'undefined') return true;
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (!nav) return true;
  try {
    return new URL(nav.name).pathname === '/';
  } catch {
    return true;
  }
}

type Box = { cx: number; cy: number; size: number; spacing: number };

// Where the real hero heading is, so the loader text lines up with it exactly.
function measureHeading(): Box | null {
  const h = [...document.querySelectorAll<HTMLElement>('.hw-head .hero-name, .hwm-head .hero-name')].find(
    (el) => el.offsetParent !== null
  );
  if (!h) return null;
  const r = h.getBoundingClientRect();
  if (!r.height) return null;
  const cs = getComputedStyle(h);
  const scale = h.offsetHeight ? r.height / h.offsetHeight : 1; // the hero scales its heading on load
  const size = parseFloat(cs.fontSize) * scale;
  const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) * scale;
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, size, spacing: ls };
}

export default function HomeLoader() {
  const [phase, setPhase] = useState<'loading' | 'filling' | 'done'>(() =>
    shownThisVisit || !isFreshHomeLoad() ? 'done' : 'loading'
  );
  const [box, setBox] = useState<Box | null>(null);
  const started = useRef(performance.now());

  // Lock scrolling and start at the top while the loader is up.
  useLayoutEffect(() => {
    if (phase === 'done') return;
    const html = document.documentElement;
    html.classList.add('hl-lock');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => html.classList.remove('hl-lock');
  }, [phase]);

  // Keep the loader text aligned with the real heading (fonts/layout can shift).
  useEffect(() => {
    if (phase === 'done') return;
    let raf = 0;
    const update = () => {
      const b = measureHeading();
      if (b) setBox(b);
    };
    update();
    const t = window.setInterval(update, 250);
    window.addEventListener('resize', update);
    document.fonts?.ready.then(update);
    return () => {
      window.clearInterval(t);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  // Wait for full load + the minimum time, then hand off to the hero.
  useEffect(() => {
    if (phase !== 'loading') return;
    shownThisVisit = true;
    let cancelled = false;
    const loaded = new Promise<void>((res) => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', () => res(), { once: true });
      window.setTimeout(res, Math.max(0, MAX_MS - (performance.now() - started.current)));
    });
    const minTime = new Promise<void>((res) =>
      window.setTimeout(res, Math.max(0, MIN_MS - (performance.now() - started.current)))
    );
    Promise.all([loaded, minTime]).then(() => {
      if (cancelled) return;
      const b = measureHeading();
      if (b) setBox(b);
      setPhase('filling');
    });
    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Once the fill + fade have played, remove the loader and unlock scrolling.
  useEffect(() => {
    if (phase !== 'filling') return;
    const t = window.setTimeout(() => setPhase('done'), FADE_DELAY + FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'done') return null;

  // Before the heading has been measured (very first paint), centre the text.
  const style = box
    ? { left: box.cx, top: box.cy, fontSize: box.size, letterSpacing: box.spacing }
    : undefined;

  return (
    <div
      className={`hl${phase === 'filling' ? ' hl-out' : ''}`}
      style={{ ['--hl-fill' as string]: `${FILL_MS}ms`, ['--hl-fade' as string]: `${FADE_MS}ms`, ['--hl-fade-delay' as string]: `${FADE_DELAY}ms` }}
      aria-live="polite"
      aria-busy={phase === 'loading'}
    >
      <span className="hl-sr">Loading</span>
      {/* the hero's drifting colour pools, exactly as in the hero */}
      <div className="hw-glow hl-glow" aria-hidden="true">
        <span className="hw-glow-blob hw-glow-a" />
        <span className="hw-glow-blob hw-glow-b" />
        <span className="hw-glow-blob hw-glow-c" />
        <span className="hw-glow-blob hw-glow-d" />
        <span className="hw-glow-blob hw-glow-e" />
      </div>
      <svg className={`hl-word${box ? ' ready' : ''}`} style={style} aria-hidden="true">
        <defs>
          {/* a very faint grey shimmer that streams across the white letters without
              stopping: a repeating pattern of wide soft bands (one every 1200px)
              sliding at a steady ~720px/s, so the next band is always on its way in */}
          <linearGradient id="hl-shimmer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0" spreadMethod="repeat">
            <stop offset="0" stopColor="#8a8a94" stopOpacity="0" />
            <stop offset="0.15" stopColor="#8a8a94" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8a8a94" stopOpacity="0.14" />
            <stop offset="0.85" stopColor="#8a8a94" stopOpacity="0" />
            <stop offset="1" stopColor="#8a8a94" stopOpacity="0" />
            <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="1200 0" dur="1.65s" repeatCount="indefinite" />
          </linearGradient>
        </defs>
        <text className="hl-line" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
          {NAME}
        </text>
        <text className="hl-shimmer" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
          {NAME}
        </text>
      </svg>
    </div>
  );
}
