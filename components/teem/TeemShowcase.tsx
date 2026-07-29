'use client';
import { useState } from 'react';

// "Inside teem.fit" — accordion list on the left, media panel on the right.
const ITEMS: { t: string; d: string; media: string }[] = [
  {
    t: 'The introduction',
    d: 'Who they are and how they frame themselves and their work, in their own words.',
    media: 'Introduction — screen / clip',
  },
  {
    t: 'Case-study walkthrough',
    d: 'The real decisions behind real work, not just the polished final screens.',
    media: 'Case-study walkthrough — screen',
  },
  {
    t: 'On-prompt whiteboarding',
    d: 'A live, unseen prompt, so we see how they actually think and move in the moment.',
    media: 'Whiteboarding — screen / clip',
  },
  {
    t: 'Transcript scoring',
    d: 'The algorithm reads the transcript and turns it into strengths, gaps and evidence.',
    media: 'Scoring / assessment report — screen',
  },
  {
    t: 'Search & filter',
    d: 'It all becomes a ranked repository a hiring manager can search and filter.',
    media: 'Ranked repository — screen',
  },
];

export default function TeemShowcase() {
  const [i, setI] = useState(0);
  return (
    <div className="tf-show">
      <div className="tf-show-list">
        {ITEMS.map((it, idx) => (
          <button
            key={idx}
            className={`tf-show-item${i === idx ? ' active' : ''}`}
            onClick={() => setI(idx)}
            aria-expanded={i === idx}
          >
            <span className="tf-show-t">{it.t}</span>
            {i === idx && <span className="tf-show-d">{it.d}</span>}
          </button>
        ))}
      </div>
      <div className="tf-show-media">
        <div className="tf-shot">
          <div className="tf-shot-ph">{ITEMS[i].media}</div>
        </div>
      </div>
    </div>
  );
}
