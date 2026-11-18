'use client';
import { useEffect, useRef } from 'react';
import { img } from '@/lib/media';

// "Craft stories" cards. Each card plays a quiet canvas motif of its own story:
// Aspora — weekly gold drops beading a compounding curve
// Sensibull — an option payoff diagram morphing between strategies
// Meesho — orders from many sellers merging into one checkout
// ImpactCraft — a loose network settling into a new pattern
// One rAF loop drives all four, it pauses off-screen, DPR is capped at 2, and
// prefers-reduced-motion gets a single still frame.

type Brand = { base: string; g1: string; g2: string; acc: string; pop: string; ink: string }; // ink = accent for lines and dots
type Key = 'aspora' | 'sensibull' | 'meesho' | 'impact';
type Mouse = { x: number; y: number; nx: number; ny: number; in: boolean };
type Canvas = { ctx: CanvasRenderingContext2D; w: number; h: number };
type Scene = (t: number) => void;

const CARDS: {
  key: Key;
  cls: string;
  href: string;
  title: string;
  logo?: { src: string; alt: string };
  wordmark?: string;
  brand: Brand;
}[] = [
  {
    key: 'aspora',
    cls: 'cs-aspora',
    href: '/work/gold-sip',
    title: 'Turning gold into a weekly habit',
    logo: { src: img('case-studies/aspora-logo%20(1).png'), alt: 'Aspora' },
    brand: { base: '#8a6220', g1: '#d9ae5f', g2: '#5a3d10', acc: '#ffe2a1', pop: '#fff3cf', ink: '#e3b45a' },
  },
  {
    key: 'impact',
    cls: 'cs-impact',
    href: '/work/impactcraft',
    title: 'Story of redefining patterns',
    logo: { src: img('case-studies/IC%20Logo.png'), alt: 'ImpactCraft' },
    brand: { base: '#4ba0d8', g1: '#96d4f7', g2: '#2a72af', acc: '#e3f6ff', pop: '#b9f0ff', ink: '#4fb2ff' },
  },
  {
    key: 'meesho',
    cls: 'cs-meesho',
    href: '/work/checkout',
    title: 'Multi-supplier checkout story',
    logo: { src: img('case-studies/MS%20Logo.png'), alt: 'Meesho' },
    brand: { base: '#48102c', g1: '#8e2059', g2: '#280716', acc: '#ff6fb5', pop: '#ffc2e1', ink: '#ff4fa3' },
  },
  {
    key: 'sensibull',
    cls: 'cs-sensibull',
    href: '/work/builder',
    title: 'Story of building a builder',
    logo: { src: img('case-studies/SB%20Logo.png'), alt: 'Sensibull' },
    brand: { base: '#e4531f', g1: '#f89a5c', g2: '#be370f', acc: '#ffd2ad', pop: '#ffe7a8', ink: '#ff6a2c' },
  },
];

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const TAU = Math.PI * 2;

// Dark grey behind each story motif; the motif itself is drawn in the brand accent.
const WIN_BG = '#1e1e21';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fill(ctx: CanvasRenderingContext2D, w: number, h: number, _b: Brand) {
  ctx.fillStyle = WIN_BG;
  ctx.fillRect(0, 0, w, h);
}

// ---------- scenes ----------
const SCENES: Record<Key, (b: Brand, o: Canvas, m: Mouse) => Scene> = {
  // Identical drops land on a steady weekly rhythm, beading a fixed compounding curve.
  aspora(b, o, m) {
    return (t) => {
      const { ctx, w, h } = o;
      fill(ctx, w, h, b);
      const N = Math.max(12, Math.round(w / 22));
      const K = 2.2;
      const X = (i: number) => -w * 0.02 + (i / (N - 1)) * w * 1.04; // edge to edge
      const Y = (i: number) => {
        const u = i / (N - 1);
        return h * (0.6 - (0.38 * (Math.exp(K * u) - 1)) / (Math.exp(K) - 1));
      };
      const IV = 0.42, FALL = 0.9, TOTAL = (N - 1) * IV + FALL, HOLD = 1.8, FT = 0.9, CYC = TOTAL + HOLD + FT;
      const tc = t % CYC;
      const fade = tc > TOTAL + HOLD ? 1 - (tc - TOTAL - HOLD) / FT : 1;
      ctx.beginPath();
      for (let i = 0; i < N; i++) (i ? ctx.lineTo(X(i), Y(i)) : ctx.moveTo(X(i), Y(i)));
      ctx.strokeStyle = rgba(b.ink, 0.22);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = rgba(b.ink, 0.16);
      for (let i = 0; i < N; i++) ctx.fillRect(X(i) - 0.5, h - 14, 1, 5);
      let hov = -1;
      if (m.in) {
        let best = 1e9;
        for (let i = 0; i < N; i++) {
          const d = Math.abs(X(i) - m.x);
          if (d < best) {
            best = d;
            hov = i;
          }
        }
      }
      for (let i = 0; i < N; i++) {
        const age = tc - i * IV;
        if (age < 0) continue;
        const x = X(i), y = Y(i);
        if (age < FALL) {
          const f = age / FALL;
          ctx.fillStyle = rgba(b.ink, 0.9);
          ctx.beginPath();
          ctx.arc(x, -6 + (y + 6) * f * f, 2, 0, TAU);
          ctx.fill();
          continue;
        }
        const on = i === hov;
        const cg = ctx.createLinearGradient(0, y, 0, h);
        cg.addColorStop(0, rgba(b.ink, (on ? 0.4 : 0.16) * fade));
        cg.addColorStop(1, rgba(b.ink, 0));
        ctx.strokeStyle = cg;
        ctx.beginPath();
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x, h - 16);
        ctx.stroke();
        ctx.fillStyle = rgba(b.ink, 0.85 * fade);
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, TAU);
        ctx.fill();
        const r = age - FALL;
        if (r < 0.6) {
          ctx.strokeStyle = rgba(b.ink, 0.45 * (1 - r / 0.6));
          ctx.beginPath();
          ctx.arc(x, y, 3 + r * 18, 0, TAU);
          ctx.stroke();
        }
        if (on) {
          ctx.strokeStyle = rgba(b.ink, 0.75);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, TAU);
          ctx.stroke();
        }
      }
    };
  },

  // A hairline payoff diagram morphing between option strategies.
  sensibull(b, o, m) {
    const STR: ((x: number) => number)[] = [
      (x) => clamp(x * 1.6, -0.3, 0.45), // bull call spread
      (x) => Math.abs(x) * 1.25 - 0.42, // long straddle
      (x) => clamp(0.32 - Math.max(0, Math.abs(x) - 0.22) * 1.6, -0.38, 0.32), // iron condor
      (x) => Math.max(-0.22, 0.5 - Math.abs(x) * 2.1), // butterfly
      (x) => Math.max(-0.25, (x - 0.05) * 1.5), // long call
    ];
    const sx = { v: 0.3 };
    return (t) => {
      const { ctx, w, h } = o;
      fill(ctx, w, h, b);
      const per = 4.5, idx = Math.floor(t / per), loc = (t % per) / per;
      const e = loc < 0.25 ? ((s: number) => s * s * (3 - 2 * s))(loc / 0.25) : 1;
      const A = STR[(idx + STR.length - 1) % STR.length], B = STR[idx % STR.length];
      const f = (x: number) => A(x) * (1 - e) + B(x) * e;
      const x0 = -w * 0.01, x1 = w * 1.01, yc = h * 0.5, amp = h * 0.3; // edge to edge
      const X = (u: number) => x0 + ((u + 1) / 2) * (x1 - x0);
      const Y = (v: number) => yc - v * amp;
      ctx.strokeStyle = rgba(b.ink, 0.18);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(x0, yc);
      ctx.lineTo(x1, yc);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = rgba(b.ink, 0.18);
      for (let u = -1; u <= 1.001; u += 0.1) ctx.fillRect(X(u) - 0.5, yc - 3, 1, 6);
      const pts: [number, number][] = [];
      for (let u = -1; u <= 1.0001; u += 0.01) pts.push([X(u), Y(f(u))]);
      const area = (clipY: number, clipH: number, fill: string) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, clipY, w, clipH);
        ctx.clip();
        ctx.beginPath();
        ctx.moveTo(x0, yc);
        pts.forEach((p) => ctx.lineTo(p[0], p[1]));
        ctx.lineTo(x1, yc);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
      };
      area(0, yc, rgba(b.ink, 0.10));
      area(yc, h, rgba(b.ink, 0.05));
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.strokeStyle = rgba(b.ink, 0.7);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1][1] - yc, c = pts[i][1] - yc;
        if (a * c < 0) {
          ctx.strokeStyle = rgba(b.ink, 0.7);
          ctx.beginPath();
          ctx.arc(pts[i][0], yc, 3, 0, TAU);
          ctx.stroke();
        }
      }
      const target = m.in ? clamp(((m.x - x0) / (x1 - x0)) * 2 - 1, -1, 1) : Math.sin(t * 0.35) * 0.6;
      sx.v = lerp(sx.v, target, m.in ? 0.2 : 0.04);
      const px = X(sx.v), py = Y(f(sx.v));
      ctx.strokeStyle = rgba(b.ink, 0.22);
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(px, h * 0.12);
      ctx.lineTo(px, h * 0.88);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = b.ink;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, TAU);
      ctx.fill();
    };
  },

  // Hairline routes from many sellers merging into one checkout line.
  meesho(b, o, m) {
    type Item = { s: number; u: number; sp: number; pink: boolean; hit?: boolean };
    const P: Item[] = [];
    const hits: number[] = [];
    let last = 0, lt = 0;
    const SRC = [[-0.02, 0.18], [-0.02, 0.52], [-0.02, 0.86], [0.28, -0.03], [0.55, -0.03], [0.42, 1.03]];
    const pos = (s: number, u: number, w: number, h: number): [number, number] => {
      const M = [w * 0.74, h * 0.44];
      const S = [SRC[s][0] * w, SRC[s][1] * h];
      const C = SRC[s][0] < 0 ? [w * 0.42, S[1]] : [S[0], M[1]];
      const v = 1 - u;
      return [v * v * S[0] + 2 * v * u * C[0] + u * u * M[0], v * v * S[1] + 2 * v * u * C[1] + u * u * M[1]];
    };
    return (t) => {
      const { ctx, w, h } = o;
      const dt = Math.min(0.05, t - (lt || t));
      lt = t;
      const M = [w * 0.74, h * 0.44];
      fill(ctx, w, h, b);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(b.ink, 0.13);
      SRC.forEach((_, s) => {
        ctx.beginPath();
        for (let u = 0; u <= 1.001; u += 0.04) {
          const [x, y] = pos(s, u, w, h);
          if (u) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.stroke();
      });
      ctx.strokeStyle = rgba(b.ink, 0.28);
      ctx.beginPath();
      ctx.moveTo(M[0], M[1]);
      ctx.lineTo(w + 10, M[1]);
      ctx.stroke();
      if (t - last > (m.in ? 0.14 : 0.34)) {
        last = t;
        P.push({ s: Math.floor(Math.random() * SRC.length), u: 0, sp: 0.28 + Math.random() * 0.12, pink: Math.random() < 0.35 });
      }
      for (let i = P.length - 1; i >= 0; i--) {
        const q = P[i];
        q.u += q.sp * dt * (m.in ? 1.6 : 1);
        let x: number, y: number;
        if (q.u < 1) {
          [x, y] = pos(q.s, q.u * q.u * (3 - 2 * q.u), w, h);
        } else {
          if (!q.hit) {
            q.hit = true;
            hits.push(t);
          }
          const k = (q.u - 1) * 1.4;
          x = M[0] + k * (w - M[0] + 20);
          y = M[1];
          if (x > w + 10) {
            P.splice(i, 1);
            continue;
          }
        }
        ctx.fillStyle = q.pink ? rgba(b.acc, 0.95) : rgba(b.ink, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, q.u < 1 ? 2 : 2.4, 0, TAU);
        ctx.fill();
      }
      for (let i = hits.length - 1; i >= 0; i--) {
        const a = t - hits[i];
        if (a > 0.9) {
          hits.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = rgba(b.ink, 0.35 * (1 - a / 0.9));
        ctx.beginPath();
        ctx.arc(M[0], M[1], 5 + a * 18, 0, TAU);
        ctx.stroke();
      }
      ctx.strokeStyle = rgba(b.ink, 0.7);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(M[0], M[1], 5, 0, TAU);
      ctx.stroke();
      ctx.lineWidth = 1;
    };
  },

  // A loose network that periodically settles into a new pattern.
  impact(b, o, m) {
    const N = 36;
    // deterministic start so SSR/first paint is stable
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const nodes = Array.from({ length: N }, () => ({
      x: rnd(),
      y: rnd(),
      vx: (rnd() - 0.5) * 0.04,
      vy: (rnd() - 0.5) * 0.04,
    }));
    let lt = 0;
    return (t) => {
      const { ctx, w, h } = o;
      const dt = Math.min(0.05, t - (lt || t));
      lt = t;
      fill(ctx, w, h, b);
      const ph = t % 9, pattern = ph > 5 && ph < 8.2, cols = 9, rows = 4;
      nodes.forEach((n, i) => {
        if (pattern) {
          const cx = i % cols, cy = Math.floor(i / cols) % rows;
          // pattern runs edge to edge (outer nodes sit just past the frame)
          n.x = lerp(n.x, -0.04 + (cx + (cy % 2) * 0.5) * 0.135, 0.06);
          n.y = lerp(n.y, 0.1 + cy * 0.27, 0.06);
        } else {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -0.04 || n.x > 1.04) n.vx *= -1;
          if (n.y < -0.04 || n.y > 1.04) n.vy *= -1;
        }
        if (m.in) {
          const dx = m.x - n.x * w, dy = m.y - n.y * h, d = Math.hypot(dx, dy);
          if (d < 140 && d > 1) {
            n.x += (dx / d) * 0.0015;
            n.y += (dy / d) * 0.0015;
          }
        }
      });
      const D = pattern ? Math.max(70, 0.135 * w * 1.15) : 105;
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], c = nodes[j];
          const d = Math.hypot((a.x - c.x) * w, (a.y - c.y) * h);
          if (d < D) {
            ctx.strokeStyle = rgba(b.ink, (1 - d / D) * 0.5);
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(c.x * w, c.y * h);
            ctx.stroke();
          }
        }
      if (m.in)
        nodes.forEach((n) => {
          const d = Math.hypot(n.x * w - m.x, n.y * h - m.y);
          if (d < 130) {
            ctx.strokeStyle = rgba(b.ink, (1 - d / 130) * 0.6);
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(n.x * w, n.y * h);
            ctx.stroke();
          }
        });
      nodes.forEach((n, i) => {
        ctx.fillStyle = i % 5 === 0 ? b.ink : rgba(b.ink, 0.9);
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 2.2 + (i % 5 === 0 ? 1.6 : 0), 0, TAU);
        ctx.fill();
      });
    };
  },
};

export default function CraftCards() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    const running = Array.from(grid.querySelectorAll<HTMLAnchorElement>('.wcard')).map((a, i) => {
      const card = CARDS[i];
      const cv = a.querySelector('canvas') as HTMLCanvasElement;
      const ctx = cv.getContext('2d')!;
      const o: Canvas = { ctx, w: 1, h: 1 };
      const m: Mouse = { x: 0, y: 0, nx: 0.5, ny: 0.5, in: false };
      const fit = () => {
        const r = cv.getBoundingClientRect();
        const d = Math.min(2, window.devicePixelRatio || 1);
        o.w = r.width;
        o.h = r.height;
        cv.width = Math.max(1, (r.width * d) | 0);
        cv.height = Math.max(1, (r.height * d) | 0);
        ctx.setTransform(d, 0, 0, d, 0, 0);
      };
      fit();
      const ro = new ResizeObserver(() => {
        fit();
        if (reduce) scene(4);
      });
      ro.observe(cv);
      const move = (e: PointerEvent) => {
        // coordinates relative to the animation window, not the whole card
        const r = cv.getBoundingClientRect();
        m.x = e.clientX - r.left;
        m.y = e.clientY - r.top;
        m.nx = m.x / r.width;
        m.ny = m.y / r.height;
      };
      const enter = (e: PointerEvent) => {
        m.in = true;
        move(e);
      };
      const leave = () => {
        m.in = false;
      };
      a.addEventListener('pointermove', move);
      a.addEventListener('pointerenter', enter);
      a.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        ro.disconnect();
        a.removeEventListener('pointermove', move);
        a.removeEventListener('pointerenter', enter);
        a.removeEventListener('pointerleave', leave);
      });
      const scene = SCENES[card.key](card.brand, o, m);
      return scene;
    });

    grid.classList.add('live');

    if (reduce) {
      // One still frame, part-way through each story.
      running.forEach((s) => s(4));
      return () => cleanups.forEach((c) => c());
    }

    let raf = 0;
    let visible = false;
    const loop = (ms: number) => {
      const t = ms / 1000;
      running.forEach((s) => s(t));
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: '100px' }
    );
    io.observe(grid);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="work-cards" ref={gridRef}>
      {CARDS.map((c) => (
        <a className={`wcard wc2 ${c.cls}`} href={c.href} key={c.key}>
          {/* top: the story animation in its own window */}
          <span className="wc-win" aria-hidden="true">
            <canvas />
          </span>
          {/* bottom: logo row (with hover arrow), then the title */}
          <span className="wc-body">
            {/* logo row: logo left, arrow right (shown on hover) */}
            <span className="wc-head">
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="wc-logo" src={c.logo.src} alt={c.logo.alt} />
              ) : (
                <span className="wc-logo wc-wordmark">{c.wordmark}</span>
              )}
              <span className="wc-go" aria-hidden="true">
                ↗
              </span>
            </span>
            <span className="wc-title">{c.title}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
