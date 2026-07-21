'use client';
import { useEffect, useState } from 'react';

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState({ li: '#', x: '#', wa: '#' });

  useEffect(() => {
    const url = encodeURIComponent(window.location.href);
    const t = encodeURIComponent(document.title);
    setLinks({
      li: `https://www.linkedin.com/shareArticle?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${t}`,
      wa: `https://wa.me/?text=${t}%20${url}`,
    });
  }, []);

  const copy = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="share">
      <span>Share</span>
      <a href={links.li} target="_blank" rel="noopener" aria-label="Share on LinkedIn">
        in
      </a>
      <a href={links.x} target="_blank" rel="noopener" aria-label="Share on X">
        X
      </a>
      <a href={links.wa} target="_blank" rel="noopener" aria-label="Share on WhatsApp">
        wa
      </a>
      <button type="button" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
