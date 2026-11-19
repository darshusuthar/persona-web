import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import MdImage from '@/components/MdImage';
import CaseStudyBlocks, { Banner, sectionNav } from '@/components/CaseStudyBlocks';
import CaseStudyEnhancer from '@/components/CaseStudyEnhancer';
import type { Block, GalleryBlock } from '@/lib/blocks';
import '@/app/work/case-study.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaseStudyView({ c }: { c: Record<string, any> }) {
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
            {c.role ? <div className="m"><b>Role</b><span>{c.role}</span></div> : null}
            {c.tools ? <div className="m"><b>{c.tools_label || 'Tools'}</b><span>{c.tools}</span></div> : null}
          </div>
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
