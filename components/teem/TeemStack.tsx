'use client';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    t: 'Start with the assessment itself.',
    d: 'The real unit of value was never a platform, it was a good assessment. So we began there: what does it take to understand a designer properly in one sitting?',
  },
  {
    t: 'Set the process up by hand.',
    d: 'We ran the first assessments manually, end to end. Doing it by hand taught us the real touchpoints and exactly what was worth keeping, before automating a thing.',
  },
  {
    t: 'Bring AI in where it earns its place.',
    d: 'Once the process was solid, we leaned on AI for the parts a system does better than a person: structuring sessions and turning long conversations into something usable.',
  },
  {
    t: 'Define the criteria on the transcript.',
    d: 'We built a rigorous, repeatable scoring line that reads the transcript itself and names strengths, gaps, and where more evidence would have helped. Judgement, made consistent.',
  },
  {
    t: 'Store the media, structured.',
    d: 'Every assessment produces media and data points. We keep them in a tidy, structured repository so a profile is searchable and ready for a hiring manager.',
  },
  {
    t: 'Build on a foundation that scales.',
    d: 'A scalable backend in Java and a React front end, so the product can grow without buckling under its own weight later on.',
  },
  {
    t: 'Open access, carefully.',
    d: 'Hiring teams request access and fill a short form to get in. Consent and access control stayed the top priority, so every other door stayed shut until that was right.',
  },
  {
    t: 'Payments and a CMS to run it.',
    d: 'A payment flow and a content system to manage everything across the product, so it keeps running and updating without a code change each time.',
  },
];

const ROT = [-6, 4, -3.5, 5, -1.5, 3.5, -4.5, 2.5];

export default function TeemStack() {
  const outer = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [appr, setAppr] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const el = outer.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = el.offsetHeight - vh;
      const prog = total > 0 ? -r.top / total : 0;
      const a = (vh - r.top) / vh;
      setP(Math.max(0, Math.min(1, prog)));
      setAppr(Math.max(0, Math.min(1, a)));
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

  const head = (
    <div className="tf-stack-head">
      <h2 className="tf-h2">Zero to one journey</h2>
      <p className="tf-stack-sub">
        The gap was clear. The harder question was how to close it without cutting corners.
      </p>
    </div>
  );

  if (reduced) {
    return (
      <section className="tf-section">
        {head}
        <div className="tf-stack-static">
          {STEPS.map((s, i) => (
            <article className="tf-stack-card tf-stack-card--static" key={i}>
              <h3 className="tf-stack-title">{s.t}</h3>
              <p className="tf-stack-desc">{s.d}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const n = STEPS.length;
  const dur = 0.18; // entrance length per card
  const step = (1 - dur) / (n - 1); // stagger for cards after the first
  const glowOp = Math.max(0, Math.min(1, appr));

  return (
    <div className="tf-stack" ref={outer} style={{ height: `${(n - 1) * 60 + 70}vh` }}>
      <div className="tf-stack-vp">
        <div className="tf-stack-glow" style={{ opacity: glowOp }} aria-hidden="true">
          <span className="tf-glow-blob tf-glow-a" />
          <span className="tf-glow-blob tf-glow-b" />
          <span className="tf-glow-blob tf-glow-c" />
          <span className="tf-glow-blob tf-glow-d" />
          <span className="tf-glow-blob tf-glow-e" />
        </div>
        {head}
        <div className="tf-stack-cards">
          {STEPS.map((s, i) => {
            let ty: number, op: number, rot: number;
            if (i === 0) {
              // first card enters with the title as the section arrives, a touch faster
              ty = (1 - appr) * 120;
              op = Math.min(1, appr * 1.6);
              rot = appr * ROT[0];
            } else {
              const start = (i - 1) * step;
              const local = Math.max(0, Math.min(1, (p - start) / dur));
              ty = (1 - local) * 460;
              op = Math.min(1, local * 1.9);
              rot = local * ROT[i % ROT.length];
            }
            return (
              <article
                className="tf-stack-card"
                key={i}
                style={{
                  transform: `translate(-50%, calc(-50% + ${ty.toFixed(1)}px)) rotate(${rot.toFixed(2)}deg)`,
                  opacity: op,
                  zIndex: i + 2,
                }}
              >
                <h3 className="tf-stack-title">{s.t}</h3>
                <p className="tf-stack-desc">{s.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
