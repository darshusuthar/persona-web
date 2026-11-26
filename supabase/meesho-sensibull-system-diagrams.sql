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
