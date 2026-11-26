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
