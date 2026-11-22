'use client';
import { useEffect, useState, type RefObject } from 'react';

// Each cell holds two stacked layers. At its own random moment, a cell loads a
// new photo into the hidden layer and cross-fades to it, so the grid never
// changes in a visible rhythm. A photo is never shown in two cells at once.
export type FadeCell = { a: string; b: string; showB: boolean };

const MIN_WAIT = 2600; // ms between changes for one cell (random in [MIN, MAX])
const MAX_WAIT = 7800;
// Let people take in the grid first: no cell changes before FIRST_MIN, and the
// first changes are spread out until FIRST_MAX.
const FIRST_MIN = 6000;
const FIRST_MAX = 14000;

// `paused` (optional): indexes of cells that must hold their photo for now (e.g. while hovered).
export function useFadeCells(pool: string[], count: number, paused?: RefObject<Set<number>>): FadeCell[] {
  const [cells, setCells] = useState<FadeCell[]>(() =>
    Array.from({ length: count }, (_, i) => ({ a: pool[i % pool.length], b: pool[i % pool.length], showB: false }))
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let alive = true;
    const timers: number[] = [];
    // What each cell currently shows, kept outside React state for picking.
    const showing = cells.map((c) => (c.showB ? c.b : c.a));

    const schedule = (i: number, first = false) => {
      const wait = first
        ? FIRST_MIN + Math.random() * (FIRST_MAX - FIRST_MIN)
        : MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT);
      timers[i] = window.setTimeout(() => swap(i), wait);
    };

    const swap = (i: number) => {
      if (!alive) return;
      if (paused?.current?.has(i)) return schedule(i); // held: try again later
      const used = new Set(showing);
      const avail = pool.filter((u) => !used.has(u));
      if (!avail.length) return schedule(i);
      const next = avail[Math.floor(Math.random() * avail.length)];
      const prev = showing[i];
      showing[i] = next; // reserve it so no other cell picks it meanwhile
      const im = new Image();
      const go = () => {
        if (!alive) return;
        if (paused?.current?.has(i)) {
          // hovered while the next photo was loading: keep the current one
          showing[i] = prev;
          return schedule(i);
        }
        setCells((prev) =>
          prev.map((c, j) => (j !== i ? c : c.showB ? { a: next, b: c.b, showB: false } : { a: c.a, b: next, showB: true }))
        );
        schedule(i);
      };
      im.onload = go;
      im.onerror = go;
      im.src = next;
    };

    for (let i = 0; i < count; i++) schedule(i, true);
    return () => {
      alive = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, count]);

  return cells;
}
