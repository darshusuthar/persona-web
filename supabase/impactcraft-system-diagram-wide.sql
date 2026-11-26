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
