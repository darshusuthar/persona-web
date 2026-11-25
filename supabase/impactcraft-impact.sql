-- ImpactCraft case study, two changes. Run both statements together, in Supabase → SQL Editor.
--  1. Rewrites "How we validated it" so it builds up to the result in the header:
--     the share of signals acted on within 24 hours, 18% on the old dashboard → 74% with the priority feed.
--  2. Adds an Impact heading and two stat tiles (74% now, 18% before), just before the founder's quote.
-- Safe to run more than once. If it warns about Row Level Security, choose "Run without RLS".

-- 1. Validation copy
update public.case_studies c
set blocks = (
  select jsonb_agg(
    case when e->>'id' = 'a6e3349a-a2c6-454d-9ea0-a7cdb6681bc5'
      then jsonb_set(e, '{markdown}', to_jsonb($v$## How we validated it

- **Against the research, at every step.** Each direction was tested against the five findings before we committed to it, and the final feed is a blend of the two that answered them best.
- **Through shared principles.** Internal debates resolved into principles rather than opinions: the page optimises for the next action, signals are grouped by category and role, and control comes through **filters and views**, not a blank canvas. When a call was contested, we went back to a finding.
- **Against one number that mattered.** Instead of tracking everything, we measured what the feed was built to change: **the share of signals acted on within 24 hours** of reaching the team. On the old dashboard, that was only **18%**.

**The verdict:** with the priority feed as the default Priorities view, **74% of signals** from across the product were acted on within 24 hours, up from 18%. Reporting-style depth moved into dedicated tabs, so the daily screen stayed about the next action.$v$::text))
      else e end
    order by o)
  from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
)
where c.slug = 'impactcraft';

-- 2. Impact section
update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    -- the existing blocks, in their current order
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    union all
    -- the new blocks, placed just before the founder's quote
    select n, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = 'e81b76c0-6ab3-4ae6-8021-419496977664'
    ), k - 10
    from jsonb_array_elements($b$[
      {
        "id": "7e69e3a1-db63-4035-8ddb-b5715515137e",
        "type": "text",
        "markdown": "### Impact"
      },
      {
        "id": "9f108c28-634f-4a3d-9b64-e0441e69891c",
        "type": "stats",
        "items": [
          { "value": "74%", "label": "of signals from across the product acted on within 24 hours", "bad": false },
          { "value": "18%", "label": "acted on within 24 hours with the old dashboard", "bad": false }
        ],
        "source": ""
      }
    ]$b$::jsonb) with ordinality as nb(n, k)
  ) s
)
where c.slug = 'impactcraft'
  and not c.blocks @> '[{"id": "7e69e3a1-db63-4035-8ddb-b5715515137e"}]'::jsonb
  and c.blocks @> '[{"id": "e81b76c0-6ab3-4ae6-8021-419496977664"}]'::jsonb;
