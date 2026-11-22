import { BRANDS, BrandLogo } from '@/lib/brands';
import { OVERVIEW, CARD_ORDER } from '@/lib/caseOverview';

type Row = { slug: string; cover_url: string | null };

// Feedback cards: a real screenshot, the logo in colour, the sector, and an
// impact-story title with the result underneath.
export default function WorkCards({ rows }: { rows: Row[] }) {
  const cover = Object.fromEntries(rows.map((r) => [r.slug, r.cover_url]));
  return (
    <div className="wk-grid">
      {CARD_ORDER.map((slug) => {
        const o = OVERVIEW[slug];
        const src = o.cover ?? cover[slug];
        return (
          <a className="wk-card" href={`/work/${slug}`} key={slug}>
            <span
              className={`wk-shot${o.shot ? ' fit' : ''}${o.shot?.multiply ? ' mul' : ''}`}
              style={o.shot ? ({ background: o.shot.bg, padding: o.shot.pad } as React.CSSProperties) : undefined}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src as string} alt="" loading="lazy" />
              ) : null}
            </span>
            <span className="wk-body">
              <span className="wk-head">
                <BrandLogo b={BRANDS[o.brand]} scale={1.1} />
                <span className="wk-meta">
                  {o.sector}
                  <i aria-hidden="true">|</i>
                  {o.when}
                </span>
              </span>
              <span className="wk-title">{o.card}</span>
              <span className="wk-impact">{o.cardImpact}</span>
              <span className="wk-go">
                Read case study <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
