-- Gold SIP case study: the Impact table states SIP sign-ups as a share of the user base
-- instead of an absolute number.
--   before: | SIPs signed up | 0 | ~3,500 in 3 months |
--   after:  | SIP adoption | 0 | 6% of monthly transacting users in 3 months |
-- Safe to run more than once. Run in Supabase → SQL Editor ("Run without RLS" if asked).

update public.case_studies
set blocks = replace(
  blocks::text,
  '| SIPs signed up | 0 | ~3,500 in 3 months |',
  '| SIP adoption | 0 | 6% of monthly transacting users in 3 months |'
)::jsonb
where slug = 'gold-sip'
  and blocks::text like '%| SIPs signed up | 0 | ~3,500 in 3 months |%';
