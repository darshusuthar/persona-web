@AGENTS.md

# Project notes: Darshan Suthar's portfolio (darshansuthar.me)

Next.js 16 (App Router, Turbopack) with a Supabase CMS. These notes are the working knowledge from earlier sessions, so any Claude account or machine can pick up from here.

## Where content lives

Some copy is **in code**, and the rest is **in Supabase**. Check both before saying something "isn't on the site".

In code:
- Home hero copy and logo row: `components/home/HeroIntro.tsx` (logos in `lib/brands.tsx`; four flipping photos in `HeroPhotos.tsx`, whose captions are hidden dummies)
- Home order (`app/page.tsx`): HeroIntro → Shipped work (`#work`, `WorkCards.tsx`) → `FounderSection.tsx` (teem.fit) → `ProduxSection.tsx` (studio and testimonials) → `YouTubeSection.tsx` (podcast) → Footer
- Testimonial names, roles and quotes: `components/home/TestimonialQuotes.tsx` (`PEOPLE` map, transcribed from the videos)
- Case study overview boxes (role, team, source, challenge, what was different, impact) and copy fixes: `lib/caseOverview.tsx` (`OVERVIEW`, `COPY_FIXES`), rendered by `components/CaseStudyView.tsx`
- Nav items: `components/Nav.tsx` (Home, Case studies → `/#work`, Darshan's Diary → `/podcast`, About; Thoughts is hidden, commented out)
- Share card: `app/opengraph-image.tsx` (photo `assets/og/portrait.jpg`, Poppins fonts in `assets/og`); metadata in `app/layout.tsx`
- Redesign styles: `app/feedback.css`. Case study page styles: `app/work/case-study.css`

In Supabase:
- Case study bodies, as block lists (`lib/blocks.ts`): `text` {markdown, tag, tone, anchor, nav, navHideMobile}, `image`, `gallery`, `stats`, `quote`, `decision`, `insight`. The case study section menu is built from text blocks that have both `nav` and `anchor`.
- Podcast episodes, About chapters and Thoughts posts.

## Changing the database

The app's anon key is **read-only**. Database changes are delivered as SQL files in `supabase/`, and Darshan runs them in the Supabase SQL editor.
- Put JSON in dollar-quoted strings, and escape semicolons inside it as `;`. Otherwise Supabase shows a false "UPDATE without WHERE" warning.
- To hand over a file, copy it to the clipboard with `LANG=en_US.UTF-8 pbcopy < supabase/<file>.sql`.
- After Darshan runs it, verify against the live data, not just the file.

## Running and checking

- Dev server: preview config `dev` in `.claude/launch.json` (port 3000). `next dev` writes to `.next/dev`, so `npm run build` can run alongside it.
- Run `npm run build` before shipping; it must pass, including `/admin`.
- Check at phone width as well: no page may scroll sideways.
- The in-app browser pane sometimes doesn't repaint. Measure with JS, or scroll, rather than trusting a stale screenshot.

## Shipping

- Commit only when Darshan asks. Work on `main`.
- This shell has **no GitHub credentials** (an HTTPS push fails and there is no `gh`). Darshan pushes from **GitHub Desktop**, so never promise a push.
- The old `feedback` branch and its worktree at `../persona-web-feedback` were merged into main (commit 55349d7) and can be removed.

## Facts and copy rules

- 11 years in product design (started as a UI and front-end developer, 2015).
- Produx: design studio, Feb 2022 to now; team of 8 designers; 17 products (clients); 6 sectors.
- teem.fit: **1,000+** designers (not 2,000+); 20+ hiring teams; built from idea to launch with an extended tech team.
- Darshan's Diary podcast: 35+ episodes since September 2024.
- Sensibull: founding designer; Strategy Builder rebuilt around bullish, bearish and neutral; 350% paid-user growth in six months.
- Meesho: multi-supplier checkout with wishlist; daily orders up 11%. Case study date is **March 2022** (not August 2021).
- Aspora: Gold (buy flow, rewards, Gold SIP, delivery); gold users grew 3.8x.
- **Unconfirmed:** Meesho's 11% came "within three months" (used for now) or three weeks. Produx is "Present" on the resume but "Ran… for 5 years" on the site.

## Files outside git

`exports/` is gitignored on purpose, because the resume has Darshan's phone number:
- `exports/resume/Darshan_Suthar_Resume.pdf`, rebuilt from `exports/resume/source/` (`resume.template.html` and `photo.png`) with `zsh exports/resume/source/build.sh`. It must stay one A4 page.
- `exports/sensibull-wireframes/`: clean redraws of the Sensibull wireframes. They aren't on the site yet; they'd need uploading to Supabase Storage first.

## Open ideas (not agreed yet)

- A "Resume" link in the footer
- Moving the copy that's in code into the CMS
- Swapping the new Sensibull wireframes into that case study
