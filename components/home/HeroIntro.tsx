import { BRANDS, BrandLogo } from '@/lib/brands';
import HeroPhotos from './HeroPhotos';

// Feedback hero, centred: name, the products I've designed,
// a row of four photos that flip at random, then four columns that spell out the story
// (designer, design leader, founder, host), each with its proof number.

const LOGOS = ['aspora', 'meesho', 'impactcraft', 'sensibull', 'teemfit'];

const FACTS = [
  {
    k: 'Product designer',
    n: '11+ years',
    d: 'Crafting AI-powered B2B tools and consumer fintech for Sensibull, ImpactCraft, Meesho and Aspora.',
  },
  {
    k: 'Design leader · Produx',
    n: '8 designers led',
    d: "Hired, mentored and reviewed my studio's designers, who shipped 17 products across 6 sectors.",
  },
  {
    k: 'Founder · teem.fit',
    n: '1,000+ designers',
    d: 'Took a hiring platform for designers from idea to launch, with 20+ hiring teams on board.',
  },
  {
    k: "Host · Darshan's Diary",
    n: '35+ leaders',
    d: 'Conversations with design and product leaders from teams like Razorpay, Pocket FM and smallcase, since 2024.',
  },
];

export default function HeroIntro() {
  return (
    <section className="hi" data-nav="light">
      <div className="hw-glow" aria-hidden="true">
        <span className="hw-glow-blob hw-glow-a" />
        <span className="hw-glow-blob hw-glow-b" />
        <span className="hw-glow-blob hw-glow-c" />
        <span className="hw-glow-blob hw-glow-d" />
        <span className="hw-glow-blob hw-glow-e" />
      </div>
      <div className="wrap">
        <div className="hi-text">
          <h1 className="hi-name">Darshan Suthar</h1>
          <div className="hi-logos">
            <div className="hi-logos-row">
              {LOGOS.map((k) => (
                <BrandLogo key={k} b={BRANDS[k]} />
              ))}
            </div>
          </div>
        </div>
        <HeroPhotos />
        <ul className="hi-facts">
          {FACTS.map((f) => (
            <li key={f.k}>
              <span className="hi-fk">{f.k}</span>
              <b className="hi-fn">{f.n}</b>
              <p className="hi-fd">{f.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
