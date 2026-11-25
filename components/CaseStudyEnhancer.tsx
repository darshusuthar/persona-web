'use client';
import { useEffect, useRef, useState } from 'react';

type NavItem = { id: string; label: string; hideMobile: boolean };

// Progress bar, section nav with scroll-spy, click-to-zoom lightbox
// and reveal-on-scroll for case studies rendered with <CaseStudyBlocks/>.
//
// Section nav, two styles:
//  'rail' (default): the site nav stays put, and a sticky timeline sits on the left on desktop:
//         a line that fills as you read, a dot and label per section, the current one highlighted.
//  'pill': the earlier idea, where a pill bar replaces the site nav while reading.
// Phones always get the pill bar. Add ?nav=pill to a case study URL to compare.
type NavStyle = 'rail' | 'pill';

export default function CaseStudyEnhancer({ nav }: { nav: NavItem[] }) {
  const [active, setActive] = useState(-1);
  const [showNav, setShowNav] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fill, setFill] = useState(0); // how far along the rail line, 0–100
  const [style, setStyle] = useState<NavStyle>('rail');
  const [covered, setCovered] = useState(false); // wide content is passing under the rail
  const railRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('nav') === 'pill') setStyle('pill');
  }, []);
  const [zoom, setZoom] = useState<{ src: string; cap: string; board: boolean } | null>(null);

  // Reveal on scroll. Content stays visible if JS never runs.
  useEffect(() => {
    const root = document.querySelector('.csb');
    if (!root) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.csb-reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    // Only hide what is still below the fold, so nothing flashes.
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > vh) el.classList.add('pending');
    });
    const io = new IntersectionObserver(
      (es) => {
        // blocks that arrive in the same moment follow each other by a beat
        let k = 0;
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(k++, 4) * 90}ms`;
          el.classList.remove('pending');
          io.unobserve(el);
          setTimeout(() => (el.style.transitionDelay = ''), 1600);
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Progress, section-nav visibility and scroll-spy.
  useEffect(() => {
    const secs = nav.map((n) => document.getElementById(n.id));
    const body = document.querySelector<HTMLElement>('.cs-body');
    let raf = 0;
    // The blocks that extend into the rail's column. Only their left/right edges matter, and
    // those change with the window width, not with scrolling, so measure them on resize only.
    let wide: Element[] = [];
    const measureWide = () => {
      const rail = railRef.current;
      const rr = rail?.getBoundingClientRect();
      wide = [];
      if (!rail || !rr || !rr.width) return;
      const lab = Array.from(rail.querySelectorAll('.lab')).reduce((m, l) => Math.max(m, l.getBoundingClientRect().right), rr.right);
      const right = Math.max(rr.right, lab) + 16;
      document.querySelectorAll('.csb *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && r.height && r.left < right && !wide.some((w) => w.contains(el))) wide.push(el);
      });
    };
    measureWide();
    const onResize = () => {
      measureWide();
      onScroll();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (y / h) * 100 : 0);
        const start = body ? body.getBoundingClientRect().top + y - 140 : 600;
        setShowNav(nav.length > 0 && y > start);
        // Wide blocks (galleries, boards) reach into the left margin. While one passes behind
        // the rail, the content wins: the rail fades out, and comes back once it has gone by.
        const rr = railRef.current?.getBoundingClientRect();
        setCovered(
          !!rr && rr.width > 0 &&
            wide.some((el) => {
              const r = el.getBoundingClientRect();
              return r.bottom > rr.top - 24 && r.top < rr.bottom + 24;
            })
        );
        const tops = secs.map((s) => (s ? s.getBoundingClientRect().top + y : Infinity));
        const line = y + 120;
        let idx = -1;
        tops.forEach((t, i) => {
          if (t <= line) idx = i;
        });
        setActive(idx);
        // the rail line fills continuously: whole sections passed, plus how far into the current one
        if (idx < 0 || tops.length < 2) setFill(0);
        else if (idx >= tops.length - 1) setFill(100);
        else {
          const frac = Math.min(1, Math.max(0, (line - tops[idx]) / (tops[idx + 1] - tops[idx])));
          setFill(((idx + frac) / (tops.length - 1)) * 100);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      cancelAnimationFrame(raf);
    };
  }, [nav]);

  // Pill style: on desktop the section nav takes the site nav's place while reading.
  // Rail style: the site nav stays, so section headings stop below it.
  useEffect(() => {
    document.body.classList.toggle('csb-secnav', style === 'pill' && showNav);
    document.body.classList.toggle('csb-rail-on', style === 'rail');
    return () => document.body.classList.remove('csb-secnav', 'csb-rail-on');
  }, [showNav, style]);

  // Rail clicks: scroll so the heading sits just below the site nav. Lazy images above the
  // target can load mid-scroll and push it down, so check again once scrolling stops.
  const goTo = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = () => el.getBoundingClientRect().top - 96;
    window.scrollTo({ top: window.scrollY + offset(), behavior: smooth ? 'smooth' : 'auto' });
    history.replaceState(null, '', `#${id}`);
    let tries = 0;
    const settle = () => {
      if (Math.abs(offset()) > 4 && tries++ < 4) {
        window.scrollTo({ top: window.scrollY + offset(), behavior: 'auto' });
        setTimeout(settle, 250);
      }
    };
    if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true });
    else setTimeout(settle, 900);
  };

  // Lightbox for phones and boards.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest('.csb-phone img, .csb-board img') as HTMLImageElement | null;
      if (!img || img.closest('.csb-banner')) return;
      const fig = img.closest('figure');
      const cap = fig?.querySelector('figcaption')?.textContent || img.alt || '';
      setZoom({ src: img.currentSrc || img.src, cap, board: !!img.closest('.csb-board') });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom]);

  return (
    <>
      <div className="csb-progress" style={{ width: `${progress}%` }} />
      {nav.length > 0 ? (
        <nav className={`csb-pillnav${style === 'rail' ? ' sm-only' : ''}${showNav ? ' show' : ''}`} aria-label="Sections">
          {nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`${i === active ? 'on' : ''}${n.hideMobile ? ' hide-sm' : ''}`.trim() || undefined}
              style={{ ['--i' as string]: i } as React.CSSProperties}
            >
              {n.label}
            </a>
          ))}
        </nav>
      ) : null}
      {nav.length > 0 && style === 'rail' ? (
        <nav
          ref={railRef}
          className={`csb-rail${showNav ? ' show' : ''}${covered ? ' covered' : ''}`}
          aria-label="Case study sections"
        >
          <ol>
            {nav.map((n, i) => {
              const state = i === active ? 'on' : i < active ? 'done' : 'next';
              // how much of the line below this step is filled, 0–1
              const seg = Math.min(1, Math.max(0, (fill / 100) * (nav.length - 1) - i));
              return (
                <li
                  key={n.id}
                  className={state}
                  style={{ ['--i' as string]: i, ['--seg' as string]: seg } as React.CSSProperties}
                >
                  <a href={`#${n.id}`} onClick={(e) => goTo(e, n.id)} aria-current={state === 'on' ? 'location' : undefined}>
                    <span className="mark" aria-hidden="true">
                      {state === 'on' ? (
                        // reading now: an open book whose page turns from left to right, with a fading trail
                        <svg className="read" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                          <g className="flip">
                            <path className="pg t3" d="M11 12.4h5.6" />
                            <path className="pg t2" d="M11 12.4h5.6" />
                            <path className="pg t1" d="M11 12.4h5.6" />
                            <path className="pg t0" d="M11 12.4h5.6" />
                          </g>
                          <path d="M2.6 14.6h5.9l1.5 1.7 1.5-1.7h5.9" />
                        </svg>
                      ) : state === 'done' ? (
                        <span className="pip" />
                      ) : null}
                    </span>
                    <span className="lab">{n.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
      {zoom ? (
        <div className="csb-lb" onClick={() => setZoom(null)} role="dialog" aria-label="Image preview">
          <button className="x" aria-label="Close">
            ×
          </button>
          <div className="tip">Click anywhere to close · Esc</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom.src} alt="" className={zoom.board ? '' : 'fit'} />
          {zoom.cap ? <div className="cap">{zoom.cap}</div> : null}
        </div>
      ) : null}
    </>
  );
}
