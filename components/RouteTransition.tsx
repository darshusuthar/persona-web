'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Intercepts clicks on internal links and fades the current page out before
// navigating, then fades the new page in once the URL has changed. Renders nothing.
//
// The fade-in can't rely on app/template.tsx alone: Next.js only re-mounts the
// root template when the top-level segment changes, so /thoughts → /thoughts/x
// kept the page invisible. Watching the pathname covers every depth.
const LEAVING = 'route-leaving';
let safety = 0;

export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();

  // New URL is in place: clear the fade-out and replay the fade-in.
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains(LEAVING)) return;
    window.clearTimeout(safety);
    html.classList.remove(LEAVING);
    const wrap = document.querySelector<HTMLElement>('.route-fade');
    if (wrap) {
      wrap.style.animation = 'none';
      void wrap.offsetWidth; // restart the CSS animation
      wrap.style.animation = '';
    }
  }, [pathname]);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');
      if (!href || anchor.hasAttribute('download')) return;
      if (target && target !== '_self') return;
      if (
        /^(https?:)?\/\//i.test(href) ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      )
        return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same page (incl. hash-only change) — let it behave normally.
      if (url.pathname === window.location.pathname && url.search === window.location.search)
        return;

      // Take over navigation so we can fade out first.
      e.preventDefault();
      e.stopImmediatePropagation();

      const go = () => router.push(url.pathname + url.search + url.hash);
      if (reduce) {
        go();
        return;
      }
      document.documentElement.classList.add(LEAVING);
      window.setTimeout(go, 180);
      // Never leave the page invisible if navigation stalls or only the query changes.
      window.clearTimeout(safety);
      safety = window.setTimeout(() => document.documentElement.classList.remove(LEAVING), 2500);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}
