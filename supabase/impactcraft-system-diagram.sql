-- ImpactCraft case study: adds the "system view of the problem" diagram at the end of Current state,
-- right after "The analysis: …" and before "Process — three directions, tested against the findings".
-- Signals from many sources → one Priorities page (a dump in buckets) → every role gets the same view.
-- The image ships with the site (public/images/case-studies/ic-system-problem.webp), so push the code first.
-- Safe to run more than once: any earlier copy of the diagram is removed before it is placed.
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    -- the existing blocks, minus any earlier copy of the diagram
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    where e->>'id' <> 'fd568dc9-7d07-4cb8-83f0-f3e13034d6d1'
    union all
    -- placed just after "The analysis" paragraph
    select $b${
      "id": "fd568dc9-7d07-4cb8-83f0-f3e13034d6d1",
      "type": "image",
      "url": "/images/case-studies/ic-system-problem.webp",
      "style": "board",
      "caption": "The system before: signals from every corner of the product landed on one Priorities page, and every role got the same dump to sort through."
    }$b$::jsonb, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = '22521413-2c8c-4519-be8b-591b4d25653d'
    ), 1
  ) s
)
where c.slug = 'impactcraft'
  and c.blocks @> '[{"id": "22521413-2c8c-4519-be8b-591b4d25653d"}]'::jsonb;
