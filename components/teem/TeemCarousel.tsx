'use client';
import { useRef } from 'react';

type Card =
  | { kind: 'stat'; big: string; cap: string }
  | { kind: 'quote'; text: string; cap: string }
  | { kind: 'image'; label: string; cap: string };

// "What you get" — horizontal, mixed feature cards (stat / quote / screenshot).
const CARDS: Card[] = [
  { kind: 'stat', big: 'Once', cap: 'Assessed a single time, discoverable forever.' },
  { kind: 'image', label: 'Designer profile — screen', cap: 'A profile that shows how you actually think.' },
  { kind: 'quote', text: '“No more repeating your portfolio in every process.”', cap: 'Your story, told once, told well.' },
  { kind: 'image', label: 'Ranked shortlist — screen', cap: 'Hiring managers hire from a ranked, pre-vetted shortlist.' },
  { kind: 'stat', big: '0', cap: 'Screening rounds from scratch.' },
];

export default function TeemCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 372, behavior: 'smooth' });

  return (
    <div className="tf-caro">
      <div className="tf-caro-track" ref={ref}>
        {CARDS.map((c, idx) => (
          <div className="tf-caro-item" key={idx}>
            <div className={`tf-caro-card tf-caro-${c.kind}`}>
              {c.kind === 'stat' && <span className="tf-caro-big">{c.big}</span>}
              {c.kind === 'quote' && <span className="tf-caro-qt">{c.text}</span>}
              {c.kind === 'image' && (
                <div className="tf-shot">
                  <div className="tf-shot-ph">{c.label}</div>
                </div>
              )}
            </div>
            <p className="tf-caro-cap">{c.cap}</p>
          </div>
        ))}
      </div>
      <div className="tf-caro-nav">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous">
          ‹
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}
