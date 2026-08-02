'use client';
import { useEffect } from 'react';

// Runs on every navigation (template remounts per route). It clears the
// "leaving" state set on click, then the .route-fade wrapper fades the freshly
// loaded page in. Net effect: old page fades out on click, new page fades in
// once its content is actually ready.
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('route-leaving');
  }, []);

  return <div className="route-fade">{children}</div>;
}
