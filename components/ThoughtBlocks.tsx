import ReactMarkdown from 'react-markdown';

type Block =
  | { id?: string; type: 'text'; markdown?: string }
  | { id?: string; type: 'image'; url?: string; caption?: string }
  | { id?: string; type: 'video'; url?: string }
  | { id?: string; type: 'embed'; url?: string; html?: string };

// Turn a normal share URL into an embeddable iframe src. Returns null if unknown.
function toEmbedSrc(raw: string): string | null {
  const url = (raw || '').trim();
  if (!url) return null;

  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;

  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;

  m = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/);
  if (m) return `https://www.loom.com/embed/${m[1]}`;

  m = url.match(/open\.spotify\.com\/(track|album|playlist|episode|show)\/([\w]+)/);
  if (m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;

  if (/figma\.com\/(file|proto|design|board)\//.test(url)) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }

  return null;
}

function Embed({ src, title }: { src: string; title: string }) {
  return (
    <div className="tb-embed">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}

export default function ThoughtBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose tb">
      {blocks.map((b, i) => {
        const key = b.id ?? i;

        if (b.type === 'text') {
          return (
            <div className="tb-text" key={key}>
              <ReactMarkdown>{b.markdown || ''}</ReactMarkdown>
            </div>
          );
        }

        if (b.type === 'image') {
          if (!b.url) return null;
          return (
            <figure className="tb-figure" key={key}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.url} alt={b.caption || ''} loading="lazy" />
              {b.caption ? <figcaption>{b.caption}</figcaption> : null}
            </figure>
          );
        }

        if (b.type === 'video') {
          const src = toEmbedSrc(b.url || '');
          if (src) return <Embed src={src} title="Video" key={key} />;
          if (b.url)
            return (
              <p className="tb-fallback" key={key}>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  Watch video ↗
                </a>
              </p>
            );
          return null;
        }

        if (b.type === 'embed') {
          if (b.html && /<iframe|<blockquote|<div|<script/i.test(b.html)) {
            return (
              <div
                className="tb-embed-raw"
                key={key}
                dangerouslySetInnerHTML={{ __html: b.html }}
              />
            );
          }
          const src = toEmbedSrc(b.url || '');
          if (src) return <Embed src={src} title="Embedded content" key={key} />;
          if (b.url) return <Embed src={b.url} title="Embedded content" key={key} />;
          return null;
        }

        return null;
      })}
    </div>
  );
}
