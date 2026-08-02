'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Intercepts clicks on internal links and fades the current page out before
// navigating. The fade-in of the next page is handled by app/template.tsx once
// its content has loaded. Renders nothing.
export default function RouteTransition() {
  const router = useRouter();

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
      document.documentElement.classList.add('route-leaving');
      window.setTimeout(go, 180);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}
