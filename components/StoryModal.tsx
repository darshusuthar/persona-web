'use client';
import { useEffect, useState } from 'react';

const SECTIONS = [
  {
    title: 'How I wanted it to feel',
    body: (
      <>
        <p>I wanted something small and clearly mine, not a big website. Four places, nothing extra, each with one job:</p>
        <ul>
          <li>Home: who I am, fast. It leads with my name, the three hats, and the work</li>
          <li>Thoughts: a running log, not essays. Short and casual, the way I&apos;d say it to a friend</li>
          <li>Podcast: just the guests and where to listen. The people are the pitch</li>
          <li>About: how I got here, told in chapters, because a career is a story, not a resume</li>
        </ul>
        <p>Navigation stays a tiny glass pill up top, and an app-style bar at the bottom on mobile that slides away as you scroll.</p>
        <p>If you can&apos;t hold the whole map in your head, it&apos;s too much.</p>
      </>
    ),
  },
  {
    title: 'The tech I leaned on',
    body: (
      <>
        <p>Honest bit: I&apos;m a designer, not an engineer. I built this by talking it through with an AI (Claude), step by step.</p>
        <p>It didn&apos;t start fancy. First it was plain hand-built HTML and CSS, just to nail the look. Once the design felt right, I rebuilt it on Next.js so it could actually grow.</p>
        <p>Then three tools, each with one clear job:</p>
        <ul>
          <li>GitHub holds the code</li>
          <li>Vercel hosts the site and redeploys automatically on every push</li>
          <li>Supabase holds the content, the media, and the login</li>
        </ul>
        <p>The workflow stays simple:</p>
        <ul>
          <li>Design and feature changes happen in code, then a push to GitHub, and Vercel puts it live in a minute or two</li>
          <li>Content changes happen in a login-protected admin panel and show up instantly, no code, no deploy</li>
        </ul>
        <p>No overlap, so I always know where a thing lives.</p>
      </>
    ),
  },
  {
    title: 'Media, and keeping it alive',
    body: (
      <>
        <p>This is the part I cared about most. I host a podcast and I write often, so new episodes, new thoughts and new photos show up all the time. I didn&apos;t want to touch code every time that happens.</p>
        <p>So the content lives in a database, one table per kind of thing:</p>
        <ul>
          <li>Thoughts, case studies, podcast episodes</li>
          <li>Custom pages, so I can spin up a new page anytime</li>
          <li>Hero stats, About chapters, testimonials, and my links</li>
        </ul>
        <p>Each item has a draft or published switch and its own SEO fields.</p>
        <p>The media sits in one place in Supabase, kept in tidy folders:</p>
        <ul>
          <li>Podcast guest photos in one folder</li>
          <li>Case-study images in their own</li>
          <li>Thought icons in another</li>
        </ul>
        <p>The site just points at those URLs, so swapping an image is a drop-in, not a code change. Add it all up and the site grows with me instead of freezing the day it launched.</p>
      </>
    ),
  },
];

export default function StoryModal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button className="foot-story-btn" onClick={() => setOpen(true)}>
        Behind this build
      </button>

      <div className={`story-modal${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="sm-backdrop" onClick={() => setOpen(false)} />
        <div className="sm-panel" role="dialog" aria-modal="true" aria-label="Behind the build">
          <button className="sm-close" onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
          <div className="sm-content">
            <h2 className="sm-title">How this artefact came to life?</h2>
            <p>This site is small on purpose. Here is the whole thinking, in three parts.</p>

            <div className="sm-acc">
              {SECTIONS.map((s, i) => (
                <div className={`sm-acc-item${active === i ? ' open' : ''}`} key={i}>
                  <button
                    className="sm-acc-head"
                    onClick={() => setActive(active === i ? -1 : i)}
                    aria-expanded={active === i}
                  >
                    <span>{s.title}</span>
                    <span className="sm-acc-ic" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div className="sm-acc-body">
                    <div className="sm-acc-inner">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
