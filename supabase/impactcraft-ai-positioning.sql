-- ImpactCraft case study: positions it as a generative AI customer intelligence platform, explains how
-- the 18% → 74% result was measured, and adds a "how ImpactCraft works" diagram to the Overview.
--   Header:      new eyebrow, title and lead
--   Overview:    rewritten text, then the how-it-works diagram (extra-wide)
--   Validation:  rebuilt around the North Star metric and how it was measured
--   Impact tiles: labels name critical risks and opportunities
-- The diagram ships with the site (public/images/case-studies/ic-how-it-works.webp), so push the code first.
-- Safe to run more than once. Run in Supabase → SQL Editor ("Run without RLS" if asked).

-- 1. Header
update public.case_studies
set eyebrow = 'B2B SaaS · Generative AI · ImpactCraft',
    title   = 'Turning AI signals into a daily priority feed.',
    lead    = 'ImpactCraft is a generative AI customer intelligence platform for B2B customer success teams. This redesign turned its one-size-fits-all dashboard into a priority feed each role could act on.'
where slug = 'impactcraft';

-- 2. Overview and validation text, and the Impact tile labels
update public.case_studies c
set blocks = (
  select jsonb_agg(
    case
      when e->>'id' = '656a54be-c56e-4f9c-951d-4ca49325bd1d' then jsonb_set(e, '{markdown}', to_jsonb($t$## Overview

ImpactCraft is a **generative AI customer intelligence platform** for B2B customer success teams, built from scratch. It reads every place a customer leaves a trace (email, Slack, support tickets, product usage, accounting, finance and CRM) and turns that activity into signals: risks, opportunities and patterns for every account.

The **Priorities** page is where those signals land, and the first screen every customer success manager opens each morning. This is how research turned it from one dense dashboard into a priority feed each role could act on.$t$::text))
      when e->>'id' = 'a6e3349a-a2c6-454d-9ea0-a7cdb6681bc5' then jsonb_set(e, '{markdown}', to_jsonb($t$## How we validated it

- **One North Star metric.** Every account a CSM manages keeps raising critical risks and new opportunities. On the old Priorities page they were scattered across the screen, with nothing segmented or ranked. So we tracked one thing: the share of these signals acted on **within 24 hours**, whether a critical risk handled or the first call taken on an opportunity.
- **Measured from real activity, not surveys.** The same sources that create a signal also show when someone acts on it: the account's email, Slack, accounting team and CRM. That let us measure follow-up directly, before and after the redesign.
- **Against the research, at every step.** Each direction was tested against the five findings before we committed to it, and the final feed is a blend of the two that answered them best.

**The verdict:** with the priority feed as the default Priorities view, **74% of signals** were acted on within 24 hours, up from **18%** on the old dashboard. Reporting-style depth moved into dedicated tabs, so the daily screen stayed about the next action.$t$::text))
      when e->>'id' = '9f108c28-634f-4a3d-9b64-e0441e69891c' then replace(replace(e::text,
        'of signals from across the product acted on within 24 hours', 'of critical risk and opportunity signals acted on within 24 hours'),
        'acted on within 24 hours with the old dashboard', 'acted on within 24 hours on the old dashboard')::jsonb
      else e end
    order by o)
  from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
)
where c.slug = 'impactcraft';

-- 3. The how-it-works diagram, right after the Overview text
update public.case_studies c
set blocks = (
  select jsonb_agg(s.x order by s.pos, s.sub)
  from (
    select e as x, o::numeric as pos, 0 as sub
    from jsonb_array_elements(c.blocks) with ordinality as t(e, o)
    where e->>'id' <> '83540066-a976-4b8b-a244-5135e2822443'
    union all
    select $b${
  "id": "83540066-a976-4b8b-a244-5135e2822443",
  "type": "image",
  "url": "/images/case-studies/ic-how-it-works.webp",
  "style": "xboard",
  "caption": "How ImpactCraft works: data from every corner of a customer's business becomes signals, the AI builds risks, opportunities and patterns from them, and each role gets its next step."
}$b$::jsonb, (
      select o::numeric from jsonb_array_elements(c.blocks) with ordinality as q(e, o)
      where e->>'id' = '656a54be-c56e-4f9c-951d-4ca49325bd1d'
    ), 1
  ) s
)
where c.slug = 'impactcraft'
  and c.blocks @> '[{"id": "656a54be-c56e-4f9c-951d-4ca49325bd1d"}]'::jsonb;
