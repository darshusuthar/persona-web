'use client';
import { useEffect, useState } from 'react';

type T = {
  id: string | number;
  avatar_url: string | null;
  video_url: string | null;
  person_name?: string | null;
};

export default function Testimonials({ items }: { items: T[] }) {
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = video ? 'hidden' : '';
  }, [video]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideo(null);
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <>
      <p className="testi-cap">Words from the teams I&apos;ve recently partnered with</p>
      <div className="testi-row" aria-label="Client testimonials">
        {items.map((t) => (
          <button
            key={t.id}
            className="testi"
            style={{ backgroundImage: t.avatar_url ? `url(${t.avatar_url})` : undefined }}
            onClick={() => t.video_url && setVideo(t.video_url)}
            aria-label="Play testimonial"
          >
            {t.video_url ? <span className="testi-play">▶</span> : null}
          </button>
        ))}
      </div>

      <div className={`vid-modal${video ? ' open' : ''}`} aria-hidden={!video}>
        <div className="vid-backdrop" onClick={() => setVideo(null)} />
        <div className="vid-frame">
          <button className="vid-close" onClick={() => setVideo(null)} aria-label="Close video">
            ✕
          </button>
          <div className="vid-embed">
            {video && <video src={video} controls autoPlay playsInline preload="metadata" />}
          </div>
        </div>
      </div>
    </>
  );
}
