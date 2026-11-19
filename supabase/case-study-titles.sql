-- Case study page titles: match the new titles on the home page cards.
-- Run once in Supabase → SQL Editor. Changes only the title of these four case studies.

update public.case_studies set title = 'From one-time gold buys to a weekly habit.', updated_at = now() where slug = 'gold-sip';
update public.case_studies set title = 'Turning a data dump into a daily priority feed.', updated_at = now() where slug = 'impactcraft';
update public.case_studies set title = 'Multiple supplier SKUs checkout.', updated_at = now() where slug = 'checkout';
update public.case_studies set title = 'Redesigning the heart of options trading.', updated_at = now() where slug = 'builder';
