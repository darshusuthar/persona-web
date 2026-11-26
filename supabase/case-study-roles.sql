-- Case study roles, kept in step with the home page cards (lib/caseOverview.tsx is the source).
-- The site now shows the role from code everywhere, so this only tidies what the admin panel shows.
-- Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies set role = 'Lead Designer'     where slug = 'gold-sip';
update public.case_studies set role = 'Lead Designer'     where slug = 'impactcraft';
update public.case_studies set role = 'Product Designer'  where slug = 'checkout';
update public.case_studies set role = 'Founding Designer' where slug = 'builder';
