-- About page, chapter 04: designer throughout, building on the side.
-- Run once in Supabase → SQL Editor. Updates only this one chapter (101 words, like chapters 01–03).
update public.about_chapters
set era = 'Designer, all along',
    title = 'I never stopped designing. I just kept building on the side.',
    body = 'Design has been the day job through every chapter since. On the side, I kept building: first an agency, then teem.fit. Neither went quite the way I planned, and that''s what made them worth it — they taught me what never shows up in a portfolio: distribution, hiring, the business behind every screen. Most recently, that thinking went into Aspora''s Gold SIP. Alongside the work, I mentor designers finding their footing and host Darshan''s Diary. What I''m looking for next is simple: hard product problems, real users close by, and a team that cares about craft as much as I do.'
where id = 'fe0ef02a-4374-4a64-b0c2-fbe5b038f217';
