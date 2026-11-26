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
