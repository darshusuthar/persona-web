'use client';
import { img } from '@/lib/media';
import { useRef } from 'react';
import { useFadeCells } from './useFadeCells';

// The hero's row of four photos. Every cell stays in place and, at its own random
// moment, cross-fades to another photo from the pool (never one already showing).
// Hovering a photo shows its two-line caption at the bottom, on a dark see-through band.
//
// DUMMY CAPTIONS: line 1 roughly describes each photo, line 2 (place · year) is a
// placeholder. Replace both with the real details.
const CAPTIONS: Record<number, [string, string]> = {
  1: ['Catching up with founders', 'Bengaluru · 2024'],
  2: ['Design team offsite', 'Bengaluru · 2023'],
  3: ['Produx team day out', 'Pune · 2023'],
  4: ['Speaking at a design meetup', 'Bengaluru · 2024'],
  5: ['With the Produx designers', 'Pune · 2022'],
  6: ['Design review with Produx', 'Pune · 2023'],
  7: ['Hosting a design meetup', 'Bengaluru · 2024'],
  8: ['Running a portfolio workshop', 'Mumbai · 2024'],
  9: ['With a podcast guest', 'Bengaluru · 2024'],
  10: ['Q&A at a design meetup', 'Bengaluru · 2024'],
  11: ['Client visit with the team', 'Bengaluru · 2023'],
  12: ['Design community session', 'Bengaluru · 2024'],
  13: ['Teaching product design', 'Pune · 2023'],
  14: ['With design leaders', 'Bengaluru · 2024'],
  15: ['After a talk on product design', 'Pune · 2024'],
  16: ['Celebrating with the team', 'Pune · 2023'],
  17: ["Visiting a client's office", 'Bengaluru · 2024'],
  18: ['With a guest at a design event', 'Bengaluru · 2024'],
  19: ['Strategy session with founders', 'Mumbai · 2024'],
  20: ['Workshop with client leaders', 'Bengaluru · 2023'],
  21: ['Podcast set, ready to record', 'Bengaluru · 2025'],
  22: ['Behind the podcast scenes', 'Bengaluru · 2025'],
  23: ['Panel on design careers', 'Bengaluru · 2024'],
  24: ['With a guest at a book launch', 'Bengaluru · 2024'],
};

const url = (n: number) => img(`media/hero-${n}.jpg`);
const CAPTION_BY_URL = Object.fromEntries(Object.entries(CAPTIONS).map(([n, c]) => [url(Number(n)), c]));

// start with the team photos, then the rest of the pool
const START = [6, 4, 2, 1];
const ORDERED = [...START, ...Array.from({ length: 24 }, (_, i) => i + 1).filter((n) => !START.includes(n))].map(url);

export default function HeroPhotos() {
  // a hovered photo holds still until the pointer leaves
  const held = useRef<Set<number>>(new Set());
  const cells = useFadeCells(ORDERED, 4, held);
  return (
    <div className="hi-photos">
      {cells.map((c, i) => {
        const showing = c.showB ? c.b : c.a;
        const cap = CAPTION_BY_URL[showing];
        return (
          <figure
            className="hi-ph"
            key={i}
            onPointerEnter={() => held.current.add(i)}
            onPointerLeave={() => held.current.delete(i)}
          >
            <span className="hi-layer" style={{ backgroundImage: `url(${c.a})`, opacity: c.showB ? 0 : 1 }} />
            <span className="hi-layer" style={{ backgroundImage: `url(${c.b})`, opacity: c.showB ? 1 : 0 }} />
            {cap ? (
              <figcaption className="hi-cap">
                <b>{cap[0]}</b>
                <span>{cap[1]}</span>
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
