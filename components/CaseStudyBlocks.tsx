import type { CSSProperties, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MdImage from '@/components/MdImage';
import type {
  Block,
  DecisionBlock,
  GalleryBlock,
  InsightBlock,
  GalleryItem,
  TextBlock,
} from '@/lib/blocks';

// Renders case-study blocks with the long-form case study layout:
// a 712px reading column, 860px boards, 1112px phone trays.
//
// Blocks are grouped into <section>s the same way a hand-written page would be:
// every Text block opens a new section (unless it directly follows Stats or
// Cards, which belong to the text above them). Wide trays, boards and quotes
// sit between sections. Spacing then falls out of normal margin collapsing.

const md = (s: string) => (
  <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]} components={{ img: MdImage }}>
    {s || ''}
  </ReactMarkdown>
);

// Inline-only markdown (bold, italic, links) for captions and short fields.
export const inline = (s: string) => (
  <ReactMarkdown
    allowedElements={['strong', 'em', 'a', 'code', 'del', 'br']}
    unwrapDisallowed
  >
    {s || ''}
  </ReactMarkdown>
);

const plain = (s: string) => (s || '').replace(/[*_`~]/g, '').trim();

const cols = (n: number) => `g${Math.min(5, Math.max(1, Number(n) || 1))}`;

function Phone({ item }: { item: GalleryItem }) {
  if (!item?.url) return null;
  return (
    <figure className="csb-phone">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.url} alt={plain(item.caption)} loading="lazy" />
      {item.caption ? <figcaption>{inline(item.caption)}</figcaption> : null}
    </figure>
  );
}

function Gallery({ items, columns, className = '' }: { items: GalleryItem[]; columns: number; className?: string }) {
  return (
    <div className={`csb-gallery ${cols(columns)} ${className}`.trim()}>
      {(items || []).map((it, i) => (
        <Phone item={it} key={i} />
      ))}
    </div>
  );
}

export function Banner({ block }: { block: GalleryBlock }) {
  return (
    <div className="csb-banner">
      {(block.items || []).map((it, i) =>
        it?.url ? (
          <figure className="csb-phone" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={plain(it.caption)} />
          </figure>
        ) : null
      )}
    </div>
  );
}

function Text({ b }: { b: TextBlock }) {
  return (
    <div
      className={`csb-text${b.style === 'intro' ? ' csb-intro' : ''}${b.tag ? ' has-tag' : ''}`}
    >
      {b.tag ? <span className={`csb-tag ${b.tone || ''}`.trim()}>{b.tag}</span> : null}
      <div className="csb-md">{md(b.markdown)}</div>
    </div>
  );
}

function Decision({ b, first }: { b: DecisionBlock; first: boolean }) {
  const hasDuo = !!(b.aBody || b.bBody);
  const items = (b.items || []).filter((x) => x?.url);
  const n = Number(b.columns) || 1;
  return (
    <div className={`csb-decision${first ? ' first' : ''}`}>
      {b.kicker ? <span className="csb-kicker">{b.kicker}</span> : null}
      {b.title ? <h3>{b.title}</h3> : null}
      {hasDuo ? (
        <div className="csb-duo">
          <div>
            {b.aLabel ? <b>{b.aLabel}</b> : null}
            {inline(b.aBody)}
          </div>
          <div>
            {b.bLabel ? <b>{b.bLabel}</b> : null}
            {inline(b.bBody)}
          </div>
        </div>
      ) : null}
      {b.call ? <div className="csb-call">{inline(b.call)}</div> : null}
      {b.markdown ? <div className="csb-md">{md(b.markdown)}</div> : null}
      {items.length > 0 ? (
        n <= 1 ? (
          <Gallery items={items} columns={1} />
        ) : (
          <Gallery items={items} columns={n} className="csb-tray csb-breakout" />
        )
      ) : null}
    </div>
  );
}

function Insight({ b }: { b: InsightBlock }) {
  return (
    <aside className="csb-insight" aria-label="User research insight">
      <div className="csb-insight-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8 8 0 0 1-11.6 7.1L3 20.5l1.9-6.3A8 8 0 1 1 21 11.5Z" />
        </svg>
        <span>User research</span>
        {b.label ? <em>{b.label}</em> : null}
      </div>
      {b.heard ? <p className="csb-insight-heard">{inline(b.heard)}</p> : null}
      {b.quote ? <blockquote className="csb-insight-quote">{b.quote}</blockquote> : null}
      {b.changed ? (
        <p className="csb-insight-changed">
          <b>What it changed</b>
          {inline(b.changed)}
        </p>
      ) : null}
    </aside>
  );
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

function toEmbedSrc(raw: string): string | null {
  const url = (raw || '').trim();
  if (!url) return null;
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  m = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/);
  if (m) return `https://www.loom.com/embed/${m[1]}`;
  if (/figma\.com\/(file|proto|design|board)\//.test(url)) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }
  return null;
}

// Blocks that sit between sections rather than inside the text column.
function isBreakout(b: Block) {
  return (
    (b.type === 'gallery' && b.layout !== 'plain') ||
    (b.type === 'image' && (b.style === 'board' || b.style === 'xboard')) ||
    b.type === 'quote'
  );
}

function renderInSection(b: Block, prev: Block | undefined, key: string | number): ReactNode {
  switch (b.type) {
    case 'text':
      return <Text b={b} key={key} />;
    case 'stats':
      return (
        <div key={key}>
          <div className="csb-stats">
            {(b.items || []).map((s, i) => (
              <div className="csb-stat" key={i}>
                <div className={`n${s.bad ? ' bad' : ''}`}>{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
          {b.source ? <p className="csb-src">{b.source}</p> : null}
        </div>
      );
    case 'cards':
      return (
        <div className="csb-waves" key={key}>
          {(b.items || []).map((c, i) => (
            <div key={i}>
              <b>{c.title}</b>
              {inline(c.body)}
            </div>
          ))}
        </div>
      );
    case 'decision':
      return (
        <Decision b={b} first={prev?.type !== 'decision' && prev?.type !== 'insight'} key={key} />
      );
    case 'insight':
      return <Insight b={b} key={key} />;
    case 'gallery':
      return <Gallery items={b.items} columns={b.columns} key={key} />;
    case 'image':
      if (!b.url) return null;
      return (
        <figure className="csb-figure" key={key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.url} alt={plain(b.caption)} loading="lazy" />
          {b.caption ? <figcaption>{inline(b.caption)}</figcaption> : null}
        </figure>
      );
    case 'video': {
      const src = toEmbedSrc(b.url);
      return src ? <Embed src={src} title="Video" key={key} /> : null;
    }
    case 'embed': {
      if (b.html && /<iframe|<blockquote|<div/i.test(b.html)) {
        return <div className="tb-embed-raw" key={key} dangerouslySetInnerHTML={{ __html: b.html }} />;
      }
      const src = toEmbedSrc(b.url) || b.url;
      return src ? <Embed src={src} title="Embedded content" key={key} /> : null;
    }
    default:
      return null;
  }
}

function renderBreakout(b: Block, key: string | number, style?: CSSProperties): ReactNode {
  if (b.type === 'gallery') {
    if (b.layout === 'banner') return <Banner block={b} key={key} />;
    return (
      <div className="csb-xwide csb-reveal" key={key} style={style}>
        <Gallery items={b.items} columns={b.columns} className="csb-tray" />
      </div>
    );
  }
  if (b.type === 'image') {
    return (
      <figure className={`${b.style === 'xboard' ? 'csb-xwide' : 'csb-wide'} csb-reveal`} key={key} style={style}>
        <div className="csb-board">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.url} alt={plain(b.caption)} loading="lazy" />
        </div>
        {b.caption ? <figcaption>{inline(b.caption)}</figcaption> : null}
      </figure>
    );
  }
  if (b.type === 'quote') {
    return (
      <div className="csb-quote csb-reveal" key={key} style={style}>
        <p>{b.text}</p>
        {b.note ? <span>{b.note}</span> : null}
      </div>
    );
  }
  return null;
}

type Group =
  | { kind: 'section'; id?: string; blocks: Block[] }
  | { kind: 'breakout'; block: Block };

function group(blocks: Block[]): Group[] {
  const out: Group[] = [];
  let cur: Extract<Group, { kind: 'section' }> | null = null;
  blocks.forEach((b, i) => {
    if (!b) return;
    if (isBreakout(b)) {
      out.push({ kind: 'breakout', block: b });
      cur = null;
      return;
    }
    const prev = blocks[i - 1];
    const continues = prev && (prev.type === 'stats' || prev.type === 'cards');
    if (!cur || (b.type === 'text' && !continues)) {
      cur = { kind: 'section', blocks: [], id: b.type === 'text' ? b.anchor || undefined : undefined };
      out.push(cur);
    }
    cur.blocks.push(b);
  });
  return out;
}

export function sectionNav(blocks: Block[]) {
  return blocks
    .filter((b): b is TextBlock => b?.type === 'text' && !!b.nav && !!b.anchor)
    .map((b) => ({ id: b.anchor as string, label: b.nav as string, hideMobile: !!b.navHideMobile }));
}

// Space between neighbouring groups, decided by what they are:
//  - a new chapter (## heading) gets the big break,
//  - screens, boards and research notes sit close to the text they belong to,
//  - sub-sections inside a chapter get a medium gap.
const GAP = { chapter: 110, quote: 72, attach: 32, stack: 24, sub: 64 };

const isChapter = (g?: Group) =>
  g?.kind === 'section' && g.blocks[0]?.type === 'text' && /^##\s/.test(g.blocks[0].markdown || '');
const isInsightOnly = (g?: Group) =>
  g?.kind === 'section' && g.blocks.every((b) => b.type === 'insight');
const isQuote = (g?: Group) => g?.kind === 'breakout' && g.block.type === 'quote';

function gapBefore(prev: Group | undefined, cur: Group): number {
  if (!prev) return 0;
  if (isChapter(cur)) return GAP.chapter;
  if (isQuote(cur) || isQuote(prev)) return GAP.quote;
  if (cur.kind === 'breakout') return prev.kind === 'breakout' ? GAP.stack : GAP.attach;
  if (isInsightOnly(cur)) return GAP.attach; // a research note belongs to the work above it
  return GAP.sub;
}

export default function CaseStudyBlocks({ blocks }: { blocks: Block[] }) {
  const groups = group(blocks || []);
  return (
    <div className="csb">
      {groups.map((g, gi) => {
        const style = { marginTop: gapBefore(groups[gi - 1], g) };
        if (g.kind === 'breakout') return renderBreakout(g.block, gi, style);
        return (
          <section className="csb-sec csb-reveal" id={g.id} key={gi} style={style}>
            {g.blocks.map((b, i) => renderInSection(b, g.blocks[i - 1], b.id || i))}
          </section>
        );
      })}
    </div>
  );
}
