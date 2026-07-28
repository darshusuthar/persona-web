import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export const metadata = {
  title: 'Podcast — Darshan\'s Diary',
  description: 'Conversations with leaders who\'ve made an impact.',
};

export default async function PodcastPage() {
  const supabase = createClient();
  const { data: eps } = await supabase
    .from('podcast_episodes')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  return (
    <>
      <Nav />
      <section className="th-main pcast-page" style={{ paddingTop: 104 }}>
        <div className="wrap">
          <header className="th-hero pod-hero-c">
            <h1 className="pod-hero-title">
              Conversations with leaders who&apos;ve made an impact.
            </h1>
            <p className="th-hero-sub">
              Candid talks with product, design, research and growth leaders — the real lessons
              behind building great products.
            </p>
            <div className="pod-btns">
              <a className="pod-btn yt" href="https://www.youtube.com/@Darshans_Diary/videos" target="_blank" rel="noopener">YouTube</a>
              <a className="pod-btn sp" href="https://open.spotify.com/show/6sD0uCJJ0P1SV2KIOyr9ii" target="_blank" rel="noopener">Spotify</a>
              <a className="pod-btn ap" href="https://podcasts.apple.com/in/podcast/darshans-diary/id1785403439" target="_blank" rel="noopener">Apple Podcasts</a>
            </div>
          </header>
          <div className="pcast-grid">
            {(eps ?? []).map((e) => (
              <a
                key={e.id}
                className="pcast-card"
                href={e.youtube_url || '#'}
                target="_blank"
                rel="noopener"
              >
                <div
                  className="pcast-thumb"
                  style={{ backgroundImage: e.thumb_url ? `url(${e.thumb_url})` : undefined }}
                >
                  <span className="pcast-play">Listen now</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
