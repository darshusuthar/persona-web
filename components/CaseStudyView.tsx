import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import MdImage from '@/components/MdImage';
import CaseStudyBlocks, { Banner, sectionNav } from '@/components/CaseStudyBlocks';
import CaseStudyEnhancer from '@/components/CaseStudyEnhancer';
import type { Block, GalleryBlock } from '@/lib/blocks';
import { OVERVIEW, COPY_FIXES } from '@/lib/caseOverview';
import '@/app/work/case-study.css';
import '@/app/feedback.css';

// Feedback version: simplify dense lines in the CMS text without touching the database.
function fix<T>(v: T): T {
  if (typeof v === 'string') return COPY_FIXES.reduce((t, [a, b]) => t.split(a).join(b), v as string) as T;
  if (Array.isArray(v)) return v.map(fix) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fix(x)])) as T;
  return v;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaseStudyView({ c: raw }: { c: Record<string, any> }) {
  const c = fix(raw);
  const o = OVERVIEW[c.slug as string];
  const allBlocks: Block[] = Array.isArray(c.blocks) ? c.blocks : [];
  // A "banner" gallery is shown in the header, in place of the cover image.
  const banner = allBlocks.find(
    (b): b is GalleryBlock => b?.type === 'gallery' && b.layout === 'banner'
  );
  const blocks = allBlocks.filter((b) => b !== banner);
  const useBlocks = blocks.length > 0;
  const nav = useBlocks ? sectionNav(blocks) : [];

  return (
    <>
      <Nav back />
      <header className="cs-hero">
        <div className="wrap">
          {c.eyebrow ? <p className="cs-eyebrow">{c.eyebrow}</p> : null}
          <h1>{c.title}</h1>
          {c.lead ? <p className="lead">{c.lead}</p> : null}
          <div className="cs-meta">
            {c.year ? <div className="m"><b>Date</b><span>{c.year}</span></div> : null}
            {o?.role || c.role ? <div className="m"><b>Role</b><span>{o?.role || c.role}</span></div> : null}
            {c.tools ? <div className="m"><b>{c.tools_label || 'Tools'}</b><span>{c.tools}</span></div> : null}
            {o?.site ? (
              <div className="m">
                <b>Company</b>
                <span>
                  <a className="cs-site" href={o.site.href} target="_blank" rel="noopener noreferrer">
                    {o.site.label} <span aria-hidden="true">↗</span>
                  </a>
                </span>
              </div>
            ) : null}
          </div>
          {o ? (
            // Fixed overview, same fields in the same order on every case study.
            <div className="cs-brief">
              <div><b>My role</b><span>{o.role}</span></div>
              <div><b>Worked with</b><span>{o.team}</span></div>
              <div><b>Where the problem came from</b><span>{o.source}</span></div>
              <div><b>The biggest challenge</b><span>{o.challenge}</span></div>
              <div><b>What I did differently</b><span>{o.different}</span></div>
              <div><b>Impact</b><span>{o.impact}</span></div>
            </div>
          ) : null}
        </div>
        {banner ? (
          <Banner block={banner} />
        ) : c.cover_url ? (
          <div className="cs-banner">
            <img src={c.cover_url} alt={c.title} />
          </div>
        ) : null}
      </header>
      <article className={`cs-body${useBlocks ? ' csb-on' : ''}`}>
        {useBlocks ? (
          <CaseStudyBlocks blocks={blocks} />
        ) : (
          <ReactMarkdown components={{ img: MdImage }}>{c.body || ''}</ReactMarkdown>
        )}
        <div className="cs-links"><a href="/">← Back to home</a></div>
      </article>
      {useBlocks ? <CaseStudyEnhancer nav={nav} /> : null}
      <Footer />
    </>
  );
}
