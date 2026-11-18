'use client';
import { useEffect, useState } from 'react';

type NavItem = { id: string; label: string; hideMobile: boolean };

// Progress bar, floating section nav with scroll-spy, click-to-zoom lightbox
// and reveal-on-scroll for case studies rendered with <CaseStudyBlocks/>.
export default function CaseStudyEnhancer({ nav }: { nav: NavItem[] }) {
  const [active, setActive] = useState(-1);
  const [showNav, setShowNav] = useState(false);
  const [progress, setProgress] = useState(0);
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
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('pending');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Progress, section-nav visibility and scroll-spy.
  useEffect(() => {
    const secs = nav.map((n) => document.getElementById(n.id));
    const body = document.querySelector<HTMLElement>('.cs-body');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (y / h) * 100 : 0);
        const start = body ? body.getBoundingClientRect().top + y - 140 : 600;
        setShowNav(nav.length > 0 && y > start);
        let idx = -1;
        secs.forEach((s, i) => {
          if (s && s.getBoundingClientRect().top + y <= y + 120) idx = i;
        });
        setActive(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [nav]);

  // On desktop the section nav takes the site nav's place while reading.
  useEffect(() => {
    document.body.classList.toggle('csb-secnav', showNav);
    return () => document.body.classList.remove('csb-secnav');
  }, [showNav]);

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
        <nav className={`csb-pillnav${showNav ? ' show' : ''}`} aria-label="Sections">
          {nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`${i === active ? 'on' : ''}${n.hideMobile ? ' hide-sm' : ''}`.trim() || undefined}
            >
              {n.label}
            </a>
          ))}
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
