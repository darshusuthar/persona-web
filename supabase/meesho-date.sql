-- Meesho (checkout) case study: the date shown in the case study header is March 2022, not August 2021.
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies
set year = 'March 2022'
where slug = 'checkout';
