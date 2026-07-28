'use client';
import { useEffect, useRef } from 'react';

// Full-width hero image that drifts slower than the page as you scroll.
export default function ParallaxBanner({ src, alt = '' }: { src: string; alt?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const im = imgRef.current;
    if (!box || !im) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 as the box enters from the bottom, 1 as it leaves past the top
      let p = (vh - r.top) / (vh + r.height);
      p = Math.max(0, Math.min(1, p));
      const shift = -p * 260; // starts top-aligned, drifts down toward the bottom
      im.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
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

  return (
    <div className="ab-parallax" ref={boxRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
}
