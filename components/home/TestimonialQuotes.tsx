'use client';
import { useEffect, useState } from 'react';

type T = {
  id: string | number;
  avatar_url: string | null;
  video_url: string | null;
  person_name?: string | null;
  company?: string | null;
  quote?: string | null;
};

// Feedback testimonials: the quote first, then who said it, then an optional video.

// Names, roles and the one line from each video (transcribed from the testimonial videos;
// the CMS has older names/roles and no quotes yet); keyed by the CMS name.
const PEOPLE: Record<string, { name?: string; role: string; quote: string }> = {
  'Girish Phansalkar': {
    role: 'Co-founder',
    quote: 'It never felt like we were working with an extended team. It felt like we were working with our own team members.',
  },
  'Arun Amudhan': {
    role: 'Founder',
    quote: 'More than technical discussions, we had a lot of business discussions, and they were able to incorporate all of that into a great UX.',
  },
  Pradeep: {
    role: 'Founder',
    quote: 'Any mother who sees the app today loves it, and it stands out among the competition.',
  },
  Pashang: {
    role: 'Co-founder',
    quote: 'They went above and beyond simply creating an appealing design. Their designs make complex processes easy to navigate.',
  },
  'Madhura Bhattad': {
    name: 'Madhur Bhattad',
    role: 'Product Head',
    quote: 'They often went through multiple iterations to help balance business and user needs.',
  },
};
export default function TestimonialQuotes({ items }: { items: T[] }) {
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = video ? 'hidden' : '';
  }, [video]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(null);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  if (!items?.length) return null;

  return (
    <div className="tq">
      <h3 className="tq-h">What the teams I worked with say</h3>
      <div className="tq-row">
        {items.map((t) => (
          <figure className="tq-card" key={t.id}>
            {/* quote from the CMS, else the line taken from the video; no placeholder on the live site */}
            {t.quote || PEOPLE[t.person_name ?? '']?.quote ? (
              <blockquote>{`“${t.quote || PEOPLE[t.person_name ?? '']?.quote}”`}</blockquote>
            ) : null}
            <figcaption>
              <span
                className="tq-av"
                style={{ backgroundImage: t.avatar_url ? `url(${t.avatar_url})` : undefined }}
                aria-hidden="true"
              />
              <span className="tq-who">
                <b>{PEOPLE[t.person_name ?? '']?.name ?? t.person_name}</b>
                <span>
                  {[PEOPLE[t.person_name ?? '']?.role, t.company === 'ImpacrCraft' ? 'ImpactCraft' : t.company].filter(Boolean).join(', ')}
                </span>
              </span>
            </figcaption>
            {t.video_url ? (
              <button className="tq-watch" onClick={() => setVideo(t.video_url)}>
                ▶ Watch
              </button>
            ) : null}
          </figure>
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
    </div>
  );
}
