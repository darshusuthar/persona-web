import { img } from '@/lib/media';

// Company logos. The files we have are white, so they are tinted with each brand's
// colour (CSS mask). Swap in the original colour logo files when available.
//
// Sizes are optically balanced, not equal heights: `vh` is each logo's height in px
// so that all of them carry about the same visual weight. It comes from the drawn
// area of each file (its trimmed aspect ratio and how much of that box is ink):
// wide or bold marks get a little less height, thin or compact ones a little more.
export type Brand = {
  key: string;
  name: string;
  src: string;
  color: string;
  ratio: number; // width / height of the drawn logo (padding trimmed)
  vh: number; // balanced height in px at the reference size
  crop?: { size: string; pos: string }; // for files with built-in padding
  nudge?: string; // optical vertical shift, e.g. for a wordmark whose descender makes it sit high
};

export const BRANDS: Record<string, Brand> = {
  aspora: { key: 'aspora', name: 'Aspora', src: img('case-studies/aspora-logo%20(1).png'), color: '#5b3df5', ratio: 4.69, vh: 16, nudge: '16%' }, // the 'p' descender makes the box taller than the letters
  sensibull: { key: 'sensibull', name: 'Sensibull', src: img('case-studies/SB%20Logo.png'), color: '#f26722', ratio: 5.5, vh: 19 },
  meesho: { key: 'meesho', name: 'Meesho', src: img('case-studies/MS%20Logo.png'), color: '#9f2089', ratio: 4.76, vh: 18 },
  impactcraft: { key: 'impactcraft', name: 'ImpactCraft', src: img('case-studies/IC%20Logo.png'), color: '#2f8fd0', ratio: 4.14, vh: 25 },
  teemfit: {
    key: 'teemfit',
    name: 'teem.fit',
    src: img('teem-fit/teem-fit%20logo.png'),
    color: '#1d1d1f',
    ratio: 4.8,
    vh: 21,
    // the file has empty space around the mark: show only the drawn part (x 78–677, y 60–184 of 762×254)
    crop: { size: '127% 203.2%', pos: '48.1% 46.5%' },
  },
};

export function BrandLogo({ b, scale = 1 }: { b: Brand; scale?: number }) {
  return (
    <span
      className="brand-logo"
      role="img"
      aria-label={b.name}
      style={
        {
          aspectRatio: String(b.ratio),
          ...(b.nudge ? { transform: `translateY(${b.nudge})` } : {}),
          ['--h' as string]: String(b.vh * scale),
          ['--src' as string]: `url("${b.src}")`,
          ['--c' as string]: b.color,
          ...(b.crop ? { ['--ms' as string]: b.crop.size, ['--mp' as string]: b.crop.pos } : {}),
        } as React.CSSProperties
      }
    />
  );
}
