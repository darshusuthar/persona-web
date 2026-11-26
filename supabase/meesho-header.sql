-- Meesho (checkout) case study header: two fixes in one go.
--   Tools: drop "Analytics"  →  Figma, Lookback, After Effects
--   Date:  March 2022 (was August 2021; same as supabase/meesho-date.sql, so running both is fine)
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies
set tools = 'Figma, Lookback, After Effects',
    year  = 'March 2022'
where slug = 'checkout';
