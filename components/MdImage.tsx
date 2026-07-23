'use client';
import { useState } from 'react';

type Props = { src?: string | Blob; alt?: string };

// Renders a markdown image; if it fails to load (or has no src),
// shows a 400px skeleton labeled with the filename/alt so it's easy to spot.
export default function MdImage({ src, alt }: Props) {
  const [err, setErr] = useState(false);
  const url = typeof src === 'string' ? src : '';
  const name = url ? decodeURIComponent(url.split('/').pop() || '') : '';

  if (!url || err) {
    return (
      <span className="md-skel" role="img" aria-label="missing image">
        Image needed{alt ? `: ${alt}` : ''}
        {name ? ` (${name})` : ''}
      </span>
    );
  }

  return <img src={url} alt={alt || ''} onError={() => setErr(true)} />;
}
