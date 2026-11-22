'use client';
import { useEffect, useRef } from 'react';

// Feedback: tell the teem.fit build story step by step as you scroll:
// idea → design → build → launch. Each step lights up as it reaches the middle of the screen.

const STEPS = [
  {
    k: 'Idea',
    t: 'Designers were doing the same hard work for every company.',
    d: 'As a host talking to hiring managers, and as a designer, I kept seeing the same thing: a new assignment for every application, seen by only a handful of companies.',
  },
  {
    k: 'Design',
    t: 'One assessment, seen by every team.',
    d: 'I designed both sides: designers prove their skills once, and hiring managers get a ranked shortlist of pre-assessed talent.',
  },
  {
    k: 'Build',
    t: 'Built with a small extended team, in 8 months.',
    d: 'I was the product manager and the designer, working with a developer and tech support from an external team. From the first screen to production took nearly 8 months.',
  },
  {
    k: 'Launch',
    t: '1,000+ designers and 20+ active clients.',
    d: 'Within 1.3 years of launch, 1,000+ designers had joined and 20+ companies were actively hiring on the platform.',
  },
];

export default function TeemStory() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = [...(ref.current?.querySelectorAll<HTMLElement>('.ts-step') ?? [])];
    const io = new IntersectionObserver(
      // a step lights up at the middle of the screen and stays lit once you've passed it
      (es) => es.forEach((e) => e.target.classList.toggle('on', e.isIntersecting || e.boundingClientRect.top < window.innerHeight * 0.35)),
      { rootMargin: '-35% 0px -35% 0px' }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ts">
      <p className="ts-k">How I built it</p>
      <ol className="ts-steps" ref={ref}>
        {STEPS.map((s, i) => (
          <li className="ts-step" key={s.k}>
            <span className="ts-num">0{i + 1}</span>
            <div>
              <span className="ts-label">{s.k}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
