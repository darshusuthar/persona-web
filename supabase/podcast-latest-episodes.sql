-- Podcast: add the two newest episodes from youtube.com/@Darshans_Diary.
--  1. Hardik Pandya, Design Lead at Pocket FM (Aug 2026)
--  2. Mayur Chaudhary, VP of Experience Design at Publicis Sapient (Jul 2026)
-- They go to the top of the list (sort order -2 and -1, ahead of Sugam Anand at 0).
-- Safe to run more than once: an episode that is already there is skipped.
-- Run in Supabase → SQL Editor.

insert into public.podcast_episodes (guest_name, guest_title, company, thumb_url, youtube_url, status, sort_order)
select v.guest_name, v.guest_title, v.company, v.thumb_url, v.youtube_url, 'published', v.sort_order
from (values
  ('Hardik Pandya', 'Design Lead', 'Pocket FM',
   'https://i.ytimg.com/vi/0CLDHYJc6nI/maxresdefault.jpg',
   'https://www.youtube.com/watch?v=0CLDHYJc6nI', -2),
  ('Mayur Chaudhary', 'VP of Experience Design', 'Publicis Sapient',
   'https://i.ytimg.com/vi/h1m7z0U4_LE/maxresdefault.jpg',
   'https://www.youtube.com/watch?v=h1m7z0U4_LE', -1)
) as v(guest_name, guest_title, company, thumb_url, youtube_url, sort_order)
where not exists (
  select 1 from public.podcast_episodes e where e.youtube_url = v.youtube_url
);
