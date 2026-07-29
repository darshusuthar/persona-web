'use client';
import { useState } from 'react';
import { img } from '@/lib/media';

const TABS = [
  {
    key: 'ad',
    label: 'Performance ad',
    src: img('teem-fit/Ad-teem-fit.mp4'),
    sub: 'The story we scripted and produced, about the loop we are trying to end.',
  },
  {
    key: 'designers',
    label: 'Community nudge',
    src: img('teem-fit/announcement-video.mp4'),
    sub: 'A nudge to designers: get assessed once, and join the community.',
  },
];

export default function TeemVideos() {
  const [active, setActive] = useState('ad');
  const cur = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section className="tf-dark tf-videos">
      <h2 className="tf-dark-title">Distribution for database</h2>
      <div className="tf-videos-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tf-vtab${active === t.key ? ' active' : ''}`}
            onClick={() => setActive(t.key)}
            role="tab"
            aria-selected={active === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="tf-dark-sub">{cur.sub}</p>
      <div className="tf-videofeature-media">
        <video
          key={cur.key}
          className="tf-video"
          src={cur.src}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
