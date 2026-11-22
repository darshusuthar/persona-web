import { BRANDS, BrandLogo } from '@/lib/brands';
import HeroPhotos from './HeroPhotos';

// Feedback hero, centred: name, one paragraph (designer, founder, host), the products
// I've designed, then a single row of four photos at the bottom that flip at random.

const LOGOS = ['aspora', 'meesho', 'impactcraft', 'sensibull', 'teemfit'];

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
          <p className="hi-p">
            A design leader, founder and host with a decade in fintech and consumer tech. At Produx, my{' '}
            <strong>8 designers managed 17 products</strong> in its lifetime. I built <strong>teem.fit</strong> to{' '}
            <strong>1,000+ designers</strong> and hosted <strong>35+ design and product leaders</strong> on my podcast.
          </p>
          <div className="hi-logos">
            <div className="hi-logos-row">
              {LOGOS.map((k) => (
                <BrandLogo key={k} b={BRANDS[k]} />
              ))}
            </div>
          </div>
        </div>
        <HeroPhotos />
      </div>
    </section>
  );
}
