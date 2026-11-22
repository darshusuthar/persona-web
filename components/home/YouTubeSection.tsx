// Podcast section: one photo of a real episode set (host and guest across the table),
// with the pitch sitting on the empty wall between them, and two clear ways in.
const YT = 'https://www.youtube.com/@Darshans_Diary/videos';

export default function YouTubeSection() {
  return (
    <section className="yt2" id="youtube" data-nav="light">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="yt2-bg" src="/images/media/podcast-set.jpg" alt="A Darshan's Diary episode being recorded: host and guest at a long wooden table" />
      <div className="yt2-copy">
        <p className="yt2-eyebrow">Darshan&apos;s Diary · on YouTube</p>
        <h2 className="yt2-h2">
          Conversations with design
          <br />
          and product leaders.
        </h2>
        <p className="yt2-sub">
          Since September 2024, I&apos;ve sat down with 35+ leaders from teams like Razorpay, Pocket FM, smallcase
          and Reliance Retail.
        </p>
        <div className="yt2-cta">
          <a className="yt2-btn pri" href={YT} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
            </svg>
            Watch on YouTube
          </a>
          <a className="yt2-btn" href="/podcast">
            All episodes →
          </a>
        </div>
      </div>
    </section>
  );
}
