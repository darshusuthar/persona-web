-- Everything still pending, in one go. Every part is safe to run more than once.
-- Push the code from GitHub Desktop first (the diagram images ship with the site).
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

-- ===== meesho-header.sql =====
-- Meesho (checkout) case study header: two fixes in one go.
--   Tools: drop "Analytics"  →  Figma, Lookback, After Effects
--   Date:  March 2022 (was August 2021; same as supabase/meesho-date.sql, so running both is fine)
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies
set tools = 'Figma, Lookback, After Effects',
    year  = 'March 2022'
where slug = 'checkout';

-- ===== case-study-roles.sql =====
-- Case study roles, kept in step with the home page cards (lib/caseOverview.tsx is the source).
-- The site now shows the role from code everywhere, so this only tidies what the admin panel shows.
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies set role = 'Lead Designer'     where slug = 'gold-sip';
update public.case_studies set role = 'Lead Designer'     where slug = 'impactcraft';
update public.case_studies set role = 'Product Designer'  where slug = 'checkout';
update public.case_studies set role = 'Founding Designer' where slug = 'builder';

-- ===== impactcraft-system-diagram-wide.sql =====
-- ImpactCraft case study: shows the system diagram at the extra-wide size (1112px, the same width as
-- the phone trays in the Aspora case study), centred. Needs the code that adds the "xboard" style.
-- Safe to run more than once. Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies c
set blocks = (
  select jsonb_agg(
    case when e->>'id' = 'fd568dc9-7d07-4cb8-83f0-f3e13034d6d1'
      then jsonb_set(e, '{style}', '"xboard"')
      else e end
    order by o)
  from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
)
where c.slug = 'impactcraft';

-- ===== gold-sip-system-diagram.sql =====
-- Gold SIP case study: adds the "system view of the problem" diagram at the end of Current state,
-- just before "Process — six directions, tested as we went" (as in the ImpactCraft case study).
-- A monthly habit users already had (remittance) | gold as a one-time decision that dead-ends | what it caused.
-- Shown extra-wide (1112px, same as the phone trays). The image ships with the site
-- (public/images/case-studies/gold-sip-system-problem.webp), so push the code first.
-- Safe to run more than once. Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    where e->>'id' <> '64cec65c-c388-4ffd-bbec-826be1a0462e'
    union all
    select $b${
      "id": "64cec65c-c388-4ffd-bbec-826be1a0462e",
      "type": "image",
      "url": "/images/case-studies/gold-sip-system-problem.webp",
      "style": "xboard",
      "caption": "The system before: users already moved money home every month, but gold sat outside that habit. Every buy was a one-off, and most buyers never came back."
    }$b$::jsonb, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = '64ac6c55-4e75-4776-9adc-b788c8698ed6'
    ), -1
  ) s
)
where c.slug = 'gold-sip'
  and c.blocks @> '[{"id": "64ac6c55-4e75-4776-9adc-b788c8698ed6"}]'::jsonb;

-- ===== meesho-sensibull-system-diagrams.sql =====
-- Meesho and Sensibull case studies: adds the "system view of the problem" diagram at the end of
-- Current state, just before the Process section, as in ImpactCraft and Gold SIP.
-- Shown extra-wide (1112px). The images ship with the site
-- (public/images/case-studies/meesho-system-problem.webp, sensibull-system-problem.webp), so push the code first.
-- Safe to run more than once. Run both statements together in Supabase → SQL Editor ("Run without RLS" if asked).

-- Meesho: real baskets span suppliers, but the order flow handled one supplier per order
update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    where e->>'id' <> '568fe676-6128-41a6-9c76-4cc8339fcde7'
    union all
    select $b${
      "id": "568fe676-6128-41a6-9c76-4cc8339fcde7",
      "type": "image",
      "url": "/images/case-studies/meesho-system-problem.webp",
      "style": "xboard",
      "caption": "The system before: a basket from three suppliers meant three separate orders, and the fix had to add a cart without slowing the fast Buy now checkout."
    }$b$::jsonb, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = 'ea62a409-68ba-4dd0-9d05-6b0ff930f359'
    ), -1
  ) s
)
where c.slug = 'checkout'
  and c.blocks @> '[{"id": "ea62a409-68ba-4dd0-9d05-6b0ff930f359"}]'::jsonb;

-- Sensibull: legs, key data, graph and sliders fought for one screen
update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    where e->>'id' <> '5f13c585-1793-4788-af5a-1b238a5c71a6'
    union all
    select $b${
      "id": "5f13c585-1793-4788-af5a-1b238a5c71a6",
      "type": "image",
      "url": "/images/case-studies/sensibull-system-problem.webp",
      "style": "xboard",
      "caption": "The system before: legs, key data, graph and sliders fought for one screen, so pros were slowed down and new traders never started."
    }$b$::jsonb, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = 'e065b87c-bd19-4850-8fef-da548ec6dd33'
    ), -1
  ) s
)
where c.slug = 'builder'
  and c.blocks @> '[{"id": "e065b87c-bd19-4850-8fef-da548ec6dd33"}]'::jsonb;

-- ===== old-state-rename.sql =====
-- All four case studies: "Current state" becomes "Old state" — the section title, the side timeline
-- item and the pill bar item. The section link changes from #current-state to #old-state.
--   Gold SIP:    Old state — a transaction, not a relationship
--   ImpactCraft: Old state — one dump for everyone
--   Meesho:      Old state — built for one supplier   (was "Current state — the old flow")
--   Sensibull:   Old state — the builder before       (was "Current state — the old builder")
-- Safe to run more than once. Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies
set blocks = replace(replace(replace(replace(replace(
      blocks::text,
      '## Current state — the old flow', '## Old state — built for one supplier'),
      '## Current state — the old builder', '## Old state — the builder before'),
      '## Current state — ', '## Old state — '),
      '"nav": "Current state"', '"nav": "Old state"'),
      '"anchor": "current-state"', '"anchor": "old-state"')::jsonb
where blocks::text like '%Current state%' or blocks::text like '%current-state%';
