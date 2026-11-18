'use client';
import { useEffect, useRef, useState } from 'react';
import { Caveat } from 'next/font/google';
import { img } from '@/lib/media';

// "Built what I believed in." — the founder section (teem.fit).
// The right-hand window is a live mini teem.fit page: interview rounds bounce
// around chaotically on the left; one calm assessment round on the right, with
// the visibility counter climbing 5 → 100 when the card scrolls into view.

const caveat = Caveat({ subsets: ['latin'], weight: ['600'], display: 'swap' });

const ROUND_COLORS = ['#7c8a3a', '#5f7c95', '#8a6a3a', '#7a5a6a', '#56757a', '#4f5f95', '#6f7f6f', '#8a5a4a'];
const ROUNDS = [
  'Portfolio round',
  'Screening round',
  'Take-home task',
  'HR round',
  'Portfolio round',
  'Culture fit',
  'Screening round',
  'Design task',
];

const Mark = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.5c1.4-2.2 3.3-3.2 5.5-3.2s4.1 1 5.5 3.2" />
  </svg>
);

export default function FounderSection() {
  const pitRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5);

  // Interview rounds bouncing around the left box.
  useEffect(() => {
    const pit = pitRef.current;
    if (!pit) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pills = Array.from(pit.querySelectorAll<HTMLSpanElement>('.fd-pill'));
    let seed = 11;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const P = pills.map((e) => ({
      e,
      x: rnd() * Math.max(1, pit.clientWidth - 90),
      y: rnd() * Math.max(1, pit.clientHeight - 20),
      vx: (rnd() < 0.5 ? -1 : 1) * (18 + rnd() * 22),
      vy: (rnd() < 0.5 ? -1 : 1) * (14 + rnd() * 18),
      r: rnd() * 40 - 20,
      vr: (rnd() - 0.5) * 30,
    }));
    const place = () =>
      P.forEach((p) => (p.e.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.r}deg)`));
    if (reduce) {
      place();
      return;
    }
    let raf = 0;
    let lt = 0;
    let running = false;
    const step = (ms: number) => {
      const t = ms / 1000;
      const dt = Math.min(0.05, t - (lt || t));
      lt = t;
      const W = pit.clientWidth, H = pit.clientHeight;
      P.forEach((p) => {
        const w = p.e.offsetWidth, h = p.e.offsetHeight;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        if (p.x < -w * 0.3) { p.x = -w * 0.3; p.vx *= -1; }
        if (p.x > W - w * 0.7) { p.x = W - w * 0.7; p.vx *= -1; }
        if (p.y < -4) { p.y = -4; p.vy *= -1; }
        if (p.y > H - h + 4) { p.y = H - h + 4; p.vy *= -1; }
        if (p.r > 28 || p.r < -28) p.vr *= -1;
      });
      place();
      raf = requestAnimationFrame(step);
    };
    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        lt = 0;
        raf = requestAnimationFrame(step);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(pit);
    place();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Visibility counter 5 → 100 each time the window comes into view.
  useEffect(() => {
    const win = winRef.current;
    if (!win) return;
    let raf = 0;
    const run = () => {
      const s = performance.now();
      const f = (n: number) => {
        const k = Math.min(1, (n - s) / 1600);
        const e = 1 - Math.pow(1 - k, 3);
        setCount(Math.round(5 + 95 * e));
        if (k < 1) raf = requestAnimationFrame(f);
      };
      raf = requestAnimationFrame(f);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && run()), { threshold: 0.5 });
    io.observe(win);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="fd" id="founder" data-nav="light">
      <div className="wrap">
        <div className="fd-head">
          <h2 className="fd-h2">Built what I believed in.</h2>
          <p className="fd-sub">
            A venture that started from a problem I kept running into, both as a designer and as the host talking to
            people who hire them.
          </p>
        </div>

        <article className="fd-venture">
          <div className="fd-copy">
            <div className="fd-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="fd-logo" src={img('teem-fit/teem-fit%20logo.png')} alt="teem.fit" />
            </div>
            <h3 className="fd-h3">
              Prove it once.
              <br />
              Get seen by every team.
            </h3>
            <p className="fd-desc">
              India&apos;s biggest home for pre-assessed designers. Teams hire from a ranked shortlist of proven talent,
              so no one repeats the work.
            </p>
            <div className="fd-compare">
              <div className="old">
                <small>The usual way</small>
                <b>4 rounds before anyone trusts you</b>
              </div>
              <div className="new">
                <small>With teem.fit</small>
                <b>One assessment, searchable by every hiring team</b>
              </div>
            </div>
            <div className="fd-cta">
              <a className="fd-btn pri" href="/teem-fit">
                The origin story <span className="ar">→</span>
              </a>
              <a className="fd-btn ghost" href="https://www.teem.fit" target="_blank" rel="noopener">
                Visit teem.fit ↗
              </a>
            </div>
          </div>

          <div className="fd-stage" aria-hidden="true">
            <div className="fd-win" ref={winRef}>
              <div className="fd-bar">
                <span />
                <span />
                <span />
                <em>teem.fit</em>
              </div>
              <div className="fd-nav">
                <div className="fd-lg">
                  <Mark size={16} />
                  teem.fit
                </div>
                {/* audience toggle: always set to Designer */}
                <div className="fd-tog d">
                  <span>Hiring manager</span>
                  <span className="sw" />
                  <span className="on">Designer</span>
                </div>
                <span className="fd-join">Join Now</span>
              </div>
              <div className="fd-hero">
                <div className="q">Are you still doing</div>
                <div className="big">HARD WORK</div>
                <div className={`fd-labels ${caveat.className}`}>
                  <span>↙ here?</span>
                  <span>instead of here ↘</span>
                </div>
                <div className="fd-boxes">
                  <div className="fd-box">
                    <div className="fd-pit" ref={pitRef}>
                      {ROUNDS.map((r, i) => (
                        <span className="fd-pill" key={i} style={{ background: ROUND_COLORS[i] }}>
                          {r}
                        </span>
                      ))}
                    </div>
                    <div className="fd-vis">
                      <small>Only visible to</small>
                      <b>5 companies</b>
                    </div>
                  </div>
                  <div className="fd-box good">
                    <div className="fd-calm">
                      <span className="ar">
                        <i />
                        Assessment round
                      </span>
                      <span className={`sig ${caveat.className}`}>teem.fit</span>
                    </div>
                    <div className="fd-vis">
                      <small>Get visible to</small>
                      <b>{count} companies</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </article>
      </div>
    </section>
  );
}
