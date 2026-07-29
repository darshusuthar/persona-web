import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TeemReveal from '@/components/teem/TeemReveal';
import TeemStack from '@/components/teem/TeemStack';
import TeemVideos from '@/components/teem/TeemVideos';
import { img } from '@/lib/media';
import './teem.css';

export const metadata = {
  title: 'teem.fit — a central repository for designers & hiring managers | Darshan Suthar',
  description:
    'teem.fit is a central, pre-assessed repository of designers. Assess once, hire from a ranked shortlist. The founder story of why and how I built it.',
};

const HEADER_BG = img('teem-fit/teem-fit-header%20banner.png');

// Rounded image / placeholder.
function Shot({ label, src, alt = '' }: { label: string; src?: string; alt?: string }) {
  return (
    <div className="tf-shot">
      {src ? <img src={src} alt={alt} /> : <div className="tf-shot-ph">{label}</div>}
    </div>
  );
}

// Video placeholder — swap for <video controls src="…" /> when the file is ready.
function VideoSlot({ label, ratio = '16 / 9' }: { label: string; ratio?: string }) {
  return (
    <div className="tf-videoslot" style={{ aspectRatio: ratio }}>
      <span className="tf-play" aria-hidden="true">
        ▶
      </span>
      <span className="tf-videoslot-label">{label}</span>
    </div>
  );
}

export default function TeemFitPage() {
  return (
    <div className="tf-page">
      <Nav back />

      {/* ===== HEADER (announcement) ===== */}
      <header className="tf-announce" style={{ backgroundImage: `url("${HEADER_BG}")` }}>
        <div className="tf-announce-inner">
          <img className="tf-logo" src={img('teem-fit/teem-fit%20logo.png')} alt="teem.fit" />
          <h1 className="tf-announce-title">A source of truth for designer and hiring manager</h1>
          <div className="tf-announce-cta">
            <a className="tf-cta-btn" href="https://www.teem.fit" target="_blank" rel="noopener">
              Visit teem.fit ↗
            </a>
          </div>
        </div>
      </header>

      <main className="tf-main" id="story">
        {/* ===== ACT 1 — THE GAP ===== */}
        <div className="tf-wrap">
          {/* mobile-only: title + CTA moved out of the header */}
          <div className="tf-m-intro">
            <h2 className="tf-m-title">A source of truth for designer and hiring manager</h2>
            <a className="tf-cta-btn" href="https://www.teem.fit" target="_blank" rel="noopener">
              Visit teem.fit ↗
            </a>
          </div>

          <section className="tf-section tf-reveal-sec">
            <TeemReveal
              paragraphs={[
                'For over a decade I have designed inside big teams and hosted the leaders who hire designers. From both seats I kept seeing the same quiet waste: everyone re-proving the same thing, over and over.',
                'Designers repeat their story for every role. Hiring managers re-screen from scratch every time. The same effort, spent again and again, just to reach the same trust from zero.',
                'So I set out to build one central repository. One place that ends the repeating for designers, and the assessment guesswork for hiring managers.',
              ]}
            />
          </section>

        </div>

        {/* approach — pinned card stack (full-bleed) */}
        <TeemStack />

        {/* ===== ACT 3 — THE PRODUCT (full-bleed dark) ===== */}
        <section className="tf-inside">
          <div className="tf-inside-inner">
              <div className="tf-inside-head">
                <h2 className="tf-inside-title">Inside teem.fit.</h2>
                <p className="tf-inside-sub">
                  One assessment captures who a designer is, the work they have done, and how they
                  think, then turns it into something searchable.
                </p>
              </div>
              <div className="tf-inside-art">
                <img src={img('teem-fit/teem-fit-web-ui.png')} alt="teem.fit interface" />
              </div>

              <div className="tf-inside-grid">
                <div className="tf-inside-item">
                  <span className="tf-inside-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4.5 20c0-4 3.5-6 7.5-6s7.5 2 7.5 6" />
                    </svg>
                  </span>
                  <h3>The introduction</h3>
                  <p>Who they are and how they frame themselves and their work, in their own words.</p>
                </div>
                <div className="tf-inside-item">
                  <span className="tf-inside-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3v5h5" />
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" />
                    </svg>
                  </span>
                  <h3>Case-study walkthrough</h3>
                  <p>The real decisions behind real work, not just the polished final screens.</p>
                </div>
                <div className="tf-inside-item">
                  <span className="tf-inside-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </span>
                  <h3>On-prompt whiteboarding</h3>
                  <p>A live, unseen prompt, so we see how they actually think and move in the moment.</p>
                </div>
                <div className="tf-inside-item">
                  <span className="tf-inside-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  <h3>Search &amp; filter</h3>
                  <p>It all becomes a ranked repository a hiring manager can search and filter.</p>
                </div>
              </div>

              <div className="tf-ai">
                <p className="tf-ai-eyebrow">Leverage of AI</p>
                <div className="tf-ai-grid">
                  <div className="tf-ai-card">
                    <div className="tf-ai-vis tf-ai-vis-a">
                      <span className="tf-ai-pill">Intro clip</span>
                      <span className="tf-ai-pill">Case study</span>
                      <span className="tf-ai-pill">Whiteboarding</span>
                      <span className="tf-ai-pill">Transcript</span>
                    </div>
                    <div className="tf-ai-text">
                      <h3>Content automation</h3>
                      <p>
                        Every assessment produces raw media. AI shapes it into exactly what our
                        system understands and needs, per designer and per assessment, so nothing
                        gets prepped by hand.
                      </p>
                    </div>
                  </div>

                  <div className="tf-ai-card">
                    <div className="tf-ai-vis tf-ai-vis-b">
                      <span className="tf-ai-ver">v0.1</span>
                      <span className="tf-ai-arrow">→</span>
                      <span className="tf-ai-ver">v0.2</span>
                      <span className="tf-ai-arrow">→</span>
                      <span className="tf-ai-ver">v0.3</span>
                      <span className="tf-ai-arrow">→</span>
                      <span className="tf-ai-ver is-live">v1.0</span>
                    </div>
                    <div className="tf-ai-text">
                      <h3>Product iterations</h3>
                      <p>
                        Early on we changed the UI relentlessly, shipping and discarding, until the
                        offering felt clear and seamless. AI let us prototype and iterate far faster
                        than a small team otherwise could.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>

        <div className="tf-wrap">
          {/* comparison */}
          <section className="tf-section tf-cmp-sec">
            <div className="tf-cmp-head">
              <h2 className="tf-h2 tf-center">Real comparison</h2>
              <p className="tf-cmp-sub">The same goal, a very different path. Here they are side by side.</p>
            </div>
            <div className="tf-compare">
              <div className="tf-cmp-card tf-cmp-old">
                <p className="tf-cmp-tag">Traditional way</p>
                <ul className="tf-cmp-list">
                  <li>Re-pitch yourself for every role</li>
                  <li>4 rounds before anyone trusts you</li>
                  <li>Hiring managers screen from scratch, every time</li>
                  <li>Great designers slip through on a bad day</li>
                </ul>
              </div>
              <div className="tf-cmp-card tf-cmp-new">
                <p className="tf-cmp-tag">Teem.fit way</p>
                <ul className="tf-cmp-list">
                  <li>Assessed once, discoverable forever</li>
                  <li>One rigorous evaluation both sides trust</li>
                  <li>Hire from a ranked, pre-vetted shortlist</li>
                  <li>Signal over a single-interview gamble</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* ===== VIDEOS (ad + designer announcement, tabbed) ===== */}
        <TeemVideos />

        {/* ===== HOW WE BUILT IT ===== */}
        <div className="tf-wrap">
          <section className="tf-section">
            <h2 className="tf-h2 tf-center">Solved for both</h2>
            <div className="tf-both2">
              <div className="tf-both2-card">
                <div className="tf-both2-text">
                  <h3>
                    Shortlisting for <br />
                    hiring managers
                  </h3>
                  <p>Find the right designer fast, from a ranked, pre-vetted repository.</p>
                  <p className="tf-both2-stat">
                    <b>20+</b> teams onboarded
                  </p>
                </div>
                <div className="tf-both2-img">
                  <img src={img('teem-fit/hiring%20manager.png?v=2')} alt="Hiring manager" />
                </div>
              </div>
              <div className="tf-both2-card alt">
                <div className="tf-both2-text">
                  <h3>Clarity &amp; opportunity for designers</h3>
                  <p>
                    An AI feedback report after each assessment: strengths, gaps, and what would
                    help, in 2 to 3 days.
                  </p>
                  <p className="tf-both2-stat">
                    <b>1,000+</b> designers onboarded
                  </p>
                </div>
                <div className="tf-both2-img">
                  <img src={img('teem-fit/designer.png?v=2')} alt="Designer" />
                </div>
              </div>
            </div>
          </section>

          {false && (
            <>
          {/* ===== PROOF ===== */}
          <section className="tf-section">
            <h2 className="tf-h2">Voices from both sides.</h2>
            <div className="tf-proof">
              <figure className="tf-testi">
                <blockquote>“Quote from a designer who got assessed goes here.”</blockquote>
                <figcaption>
                  <span className="tf-testi-name">Designer name</span>
                  <span className="tf-testi-role">Product Designer</span>
                </figcaption>
              </figure>
              <figure className="tf-testi">
                <blockquote>“Quote from a hiring manager who used the shortlist goes here.”</blockquote>
                <figcaption>
                  <span className="tf-testi-name">Hiring manager name</span>
                  <span className="tf-testi-role">Head of Design, Company</span>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ===== PODCAST TIE-IN ===== */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <VideoSlot label="Podcast clip — a leader on hiring pain" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">Leaders say it too.</h2>
                <p className="tf-p">
                  I did not arrive at this in a vacuum. Across dozens of conversations on the podcast,
                  design and product leaders described the exact same hiring pain, in their own
                  words.
                </p>
                <p className="tf-p">
                  <a className="tf-inline-link" href="/podcast">
                    Hear the conversations →
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* ===== FOUNDER NOTE ===== */}
          <section className="tf-section">
            <div className="tf-founder">
              <Shot label="Photo of Darshan" />
              <div className="tf-founder-text">
                <h2 className="tf-h2">Why this one is personal.</h2>
                <p className="tf-p">
                  A decade of design and years of hosting leaders taught me the same lesson from
                  every angle: the way we vet designers wastes everyone. teem.fit is the product I
                  most want to get right, built slowly and on purpose.
                </p>
                <p className="tf-founder-sign">Darshan</p>
              </div>
            </div>
          </section>
            </>
          )}

          {/* ===== CLOSE — dual CTA ===== */}
          {false && (
          <section className="tf-section tf-paths-sec">
            <h2 className="tf-h2 tf-center">Pick your side of the table.</h2>
            <div className="tf-paths">
              <a className="tf-path" href="https://www.teem.fit" target="_blank" rel="noopener">
                <span className="tf-path-tag">For designers</span>
                <span className="tf-path-title">Get assessed once.</span>
                <span className="tf-path-cta">Join teem.fit →</span>
              </a>
              <a className="tf-path" href="https://www.teem.fit" target="_blank" rel="noopener">
                <span className="tf-path-tag">For hiring teams</span>
                <span className="tf-path-title">Hire from a ranked shortlist.</span>
                <span className="tf-path-cta">Request access →</span>
              </a>
            </div>
          </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
