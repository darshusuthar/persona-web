import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { img } from '@/lib/media';
import './teem.css';

export const metadata = {
  title: 'teem.fit — the founder story | Darshan Suthar',
  description:
    'Why I built teem.fit: a centralised, pre-assessed database of designers that saves both designers and hiring managers from repeating the same work.',
};

// Rounded image / placeholder. Drop an <img> in place of the label later.
function Shot({ label, src, alt = '' }: { label: string; src?: string; alt?: string }) {
  return (
    <div className="tf-shot">
      {src ? <img src={src} alt={alt} /> : <div className="tf-shot-ph">{label}</div>}
    </div>
  );
}

export default function TeemFitPage() {
  return (
    <div className="tf-page">
      <Nav />
      <main className="tf-main">
        <div className="tf-wrap">
          <a href="/" className="tf-back">
            ← Back
          </a>

          {/* HERO — break */}
          <header className="tf-hero">
            <p className="tf-eyebrow">Founder story</p>
            <h1 className="tf-title">teem.fit</h1>
            <p className="tf-tagline">
              India&apos;s home for pre-assessed designers. This is why I built it, and how it
              actually works underneath.
            </p>
          </header>
          <div className="tf-hero-shot">
            <Shot label="Hero / product shot" src={img('media/Teem.fit%20Banner.png')} alt="teem.fit" />
          </div>

          {/* PROBLEM — image left, content right */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <Shot label="The old way: 4 rounds, every time" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">Great designers keep re-explaining themselves.</h2>
                <p className="tf-p">
                  More than a decade in design, working inside big multidisciplinary teams and, along
                  the way, hosting conversations with design leaders on my podcast, kept surfacing
                  the same quiet waste. Designers pour enormous time and energy into repeating their
                  story, walking through their portfolio, and re-proving how they think, again and
                  again, for every new process.
                </p>
                <p className="tf-p">
                  The mirror image is just as painful for the hiring manager. To trust a single
                  designer, they run the same gauntlet every time:
                </p>
                <div className="tf-rounds">
                  <span className="tf-round">Screening</span>
                  <span className="tf-round">Portfolio</span>
                  <span className="tf-round">Case</span>
                  <span className="tf-round">Whiteboarding</span>
                </div>
              </div>
            </div>
          </section>

          {/* PULL QUOTE — break */}
          <p className="tf-quote">
            The same thinking, re-proven over and over. <span>Assess once. Trust everywhere.</span>
          </p>

          {/* INSIGHT — image left, content right */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <Shot label="One profile, many teams" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">One assessment, trusted once, usable by everyone.</h2>
                <p className="tf-p">
                  If a designer&apos;s thinking is captured properly one time, neither side should
                  have to repeat it. That is the gap I kept seeing: a centralised, pre-assessed
                  database of designers. One rigorous evaluation that both parties can rely on, so a
                  lot of money and a lot of time simply stop being wasted.
                </p>
                <p className="tf-p">
                  It is an effective solution for both ends of the table at the same time, which is
                  rare, and exactly why it felt worth building.
                </p>
              </div>
            </div>
          </section>

          {/* APPROACH — image left, content right */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <Shot label="Process map / operating flow" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">Foundation first. Automate what should be automated.</h2>
                <p className="tf-p">
                  As a young startup I did not want to burn money, time, or people on work a good
                  system can carry on its own. So with a small, lean team we mapped the whole thing
                  end to end: how the process should run, where we can leverage software, and what
                  the real touchpoints are, with plenty of back and forth on the operational side.
                </p>
                <p className="tf-p">
                  All of that came before the fun part on purpose. A weak foundation always shows up
                  later, so I wanted ours built strong first.
                </p>
              </div>
            </div>
          </section>

          {/* IMAGE BAND — break */}
          <div className="tf-band">Full-width image / behind the scenes</div>

          {/* ASSESSMENT — break (full width, sub-sections) */}
          <section className="tf-section">
            <h2 className="tf-h2">Every designer is assessed across three moments.</h2>
            <p className="tf-p" style={{ maxWidth: '60ch' }}>
              To build a foundation worth trusting, one assessment has to cover who a designer is,
              the work they have done, and how they actually think on their feet.
            </p>
            <div className="tf-steps">
              <div className="tf-step">
                <p className="tf-step-num">01</p>
                <h3 className="tf-step-title">The introduction</h3>
                <p className="tf-step-desc">
                  Who they are and how they frame themselves and their work, in their own words.
                </p>
              </div>
              <div className="tf-step">
                <p className="tf-step-num">02</p>
                <h3 className="tf-step-title">Case-study walkthrough</h3>
                <p className="tf-step-desc">
                  The real decisions behind real work, not just the polished final screens.
                </p>
              </div>
              <div className="tf-step">
                <p className="tf-step-num">03</p>
                <h3 className="tf-step-title">On-prompt whiteboarding</h3>
                <p className="tf-step-desc">
                  A live, unseen prompt, so we can see how they actually think and move in the
                  moment.
                </p>
              </div>
            </div>
          </section>

          {/* ENGINE — image left, content right */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <Shot label="Searchable, filterable talent database" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">From a transcript to a searchable signal.</h2>
                <p className="tf-p">
                  The assessment is only half of it. Our algorithm reads the transcript itself and
                  turns it into structured data points: where a designer was strong, where a gap
                  showed, and where a little more evidence would have made the case. A rigorous,
                  repeatable scoring line, not a gut call.
                </p>
                <p className="tf-p">
                  Those points become a database a hiring manager can genuinely search and filter,
                  so they land on the right shortlist instead of screening from scratch.
                </p>
              </div>
            </div>
          </section>

          {/* FIRST VERSION — image left, content right */}
          <section className="tf-section">
            <div className="tf-row">
              <div className="tf-row-media">
                <Shot label="Hiring-manager view" />
              </div>
              <div className="tf-row-text">
                <h2 className="tf-h2">Built for the hiring manager first.</h2>
                <p className="tf-p">
                  In v1 we deliberately did not let designers manage their own profiles. Not yet.
                  The confidence in this system has to come from the enabler, and that is the hiring
                  manager, the one who ultimately makes it work.
                </p>
                <p className="tf-p">
                  So we own the quality end to end: we reach out to designers, find the right slots,
                  and run the three-part assessment ourselves. Earn that trust first, and the rest of
                  the platform can open up from there.
                </p>
              </div>
            </div>
          </section>

          {/* IMPACT — break (full width) */}
          <section className="tf-section">
            <h2 className="tf-h2">Early, but the gap is real.</h2>
            <p className="tf-p" style={{ maxWidth: '62ch' }}>
              teem.fit is young, and I am building it the way I build everything: foundation first,
              honestly. What I already see is that the problem is real on both sides, and a trusted,
              pre-assessed shortlist changes the math for everyone. Less repetition for designers,
              less screening for teams, more signal and less theatre.
            </p>
            <div className="tf-metrics">
              <div>
                <div className="tf-metric-num">—</div>
                <div className="tf-metric-cap">Designers assessed</div>
              </div>
              <div>
                <div className="tf-metric-num">—</div>
                <div className="tf-metric-cap">Hiring rounds replaced</div>
              </div>
              <div>
                <div className="tf-metric-num">—%</div>
                <div className="tf-metric-cap">Screening time saved</div>
              </div>
              <div>
                <div className="tf-metric-num">—</div>
                <div className="tf-metric-cap">Teams onboarded</div>
              </div>
            </div>
            <p className="tf-metric-note">Numbers to be filled in as we grow.</p>
          </section>

          {/* CLOSE — break */}
          <section className="tf-close">
            <h2 className="tf-h2">This one is personal.</h2>
            <p className="tf-close-line">
              It is the product I most want to get right, built slowly and on purpose. If it sounds
              like something your team needs, come take a look.
            </p>
            <a className="tf-cta-btn" href="https://www.teem.fit" target="_blank" rel="noopener">
              Visit teem.fit ↗
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
