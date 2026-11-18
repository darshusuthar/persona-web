-- Thoughts 8 and 9.
-- Run once in Supabase → SQL Editor. Each thought is inserted only if its slug doesn't exist yet.
-- They use the new images media/thoughts/thought-08.png and thought-09.png, and sit at the top of /thoughts.

-- The art of composition is a new bar. You can't automate it.  (290 words)
insert into public.thoughts (slug, title, category, excerpt, body, blocks, cover_url, read_minutes, status, sort_order, published_at)
select 'composition-new-bar', 'The art of composition is a new bar. You can''t automate it.', 'Craft', 'AI can now hand you every part of a screen in seconds. What it can''t hand you is the whole.',
  $t$AI can now hand you every part of a screen in seconds. Buttons, cards, charts, copy, even full layouts.

What it can't hand you is the whole.

### Parts are free, the whole is not

When a design system and a prompt can produce any component, having the parts stops being the skill. The skill is composition: what goes together, in what order, at what weight, and what stays out.

Two designers get the same ten components. One ships a screen that feels obvious. The other ships a pile.

### What composition actually is

- Hierarchy. One thing leads, everything else supports it
- Grouping. Things that belong together look like they belong together
- Rhythm. Space, size and repetition that let the eye move without effort
- Sequence. What the user meets first, second and last, across screens, not just on one
- Restraint. Knowing which good idea doesn't belong here

### Why it resists automation

- A model optimises each part. Composition lives in the relationships between parts
- It depends on context the prompt never sees: this user, this moment, this business goal
- The right move is often a removal, and tools are built to add

You can generate ten layouts in a minute. Picking the right one, and knowing why, is still judgment.

### How to train your eye

- Rebuild a screen you admire from blocks, then remove one element at a time until it breaks
- Squint at your work. If nothing leads, nothing is composed
- Design the journey as one composition, not a stack of screens
- Before adding anything, ask what it pushes down

### The new bar

Making components is getting automated. Arranging them into something that feels inevitable is becoming the craft.

That's the bar now. And it's a human one.$t$,
  $t$[{"id": "39c7c037-c162-45b6-b145-1a3e013b0cb8", "type": "text", "markdown": "AI can now hand you every part of a screen in seconds. Buttons, cards, charts, copy, even full layouts.\n\nWhat it can't hand you is the whole.\n\n### Parts are free, the whole is not\n\nWhen a design system and a prompt can produce any component, having the parts stops being the skill. The skill is composition: what goes together, in what order, at what weight, and what stays out.\n\nTwo designers get the same ten components. One ships a screen that feels obvious. The other ships a pile.\n\n### What composition actually is\n\n- Hierarchy. One thing leads, everything else supports it\n- Grouping. Things that belong together look like they belong together\n- Rhythm. Space, size and repetition that let the eye move without effort\n- Sequence. What the user meets first, second and last, across screens, not just on one\n- Restraint. Knowing which good idea doesn't belong here\n\n### Why it resists automation\n\n- A model optimises each part. Composition lives in the relationships between parts\n- It depends on context the prompt never sees: this user, this moment, this business goal\n- The right move is often a removal, and tools are built to add\n\nYou can generate ten layouts in a minute. Picking the right one, and knowing why, is still judgment.\n\n### How to train your eye\n\n- Rebuild a screen you admire from blocks, then remove one element at a time until it breaks\n- Squint at your work. If nothing leads, nothing is composed\n- Design the journey as one composition, not a stack of screens\n- Before adding anything, ask what it pushes down\n\n### The new bar\n\nMaking components is getting automated. Arranging them into something that feels inevitable is becoming the craft.\n\nThat's the bar now. And it's a human one."}]$t$::jsonb,
  'https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/thoughts/thought-08.png', 2, 'published', -1, '2026-11-18T00:00:00+00:00'
where not exists (select 1 from public.thoughts where slug = 'composition-new-bar');

-- Intent-anchored journey pays long-term dividend.  (301 words)
insert into public.thoughts (slug, title, category, excerpt, body, blocks, cover_url, read_minutes, status, sort_order, published_at)
select 'intent-anchored-journeys', 'Intent-anchored journey pays long-term dividend.', 'Design', 'Most journeys are built around what the business wants the user to do next. The ones that last are built around why the user showed up.',
  $t$Most product journeys are built around what the business wants the user to do next. Upgrade, add, refer, buy one more.

The journeys that last are built around something else: why the user showed up in the first place.

### What intent-anchored means

Every journey starts with an intent. "I want to save for my sister's wedding." "I need to pay rent before the 5th." "I just want to try this once."

An intent-anchored journey keeps that reason at the centre of every screen:

- The first screen confirms they're in the right place for their goal
- Every step moves them closer to it, or it goes
- Success is the intent met, not the button tapped

### Where we usually drift

- Nudges that serve the funnel, not the person
- Extra choices added "for flexibility" that nobody asked for
- Numbers that impress but don't answer the user's question

On a recent gold savings product, research kept telling us the same thing. People start with a goal, then plan the habit around it. Every nudge that didn't serve that goal, they skipped. Every screen that spoke to it, they trusted.

### Why the dividend is long term

- Trust compounds. A journey that keeps its promise earns the next visit
- Fewer people drop off from confusion, because every step has a reason
- Retention stops depending on tricks you have to keep renewing
- The product gets simpler as it grows, not heavier

Short-term hacks can lift this month's number. Intent pays you back for years.

### A simple check

For any screen, ask three things:

- What did the user come here to do?
- Does this screen move them closer to it?
- If I removed it, would they miss it?

If the answers are fuzzy, the journey has drifted. Anchor it again.$t$,
  $t$[{"id": "0802bd37-c5dc-4879-b67d-f89b7c8dad8c", "type": "text", "markdown": "Most product journeys are built around what the business wants the user to do next. Upgrade, add, refer, buy one more.\n\nThe journeys that last are built around something else: why the user showed up in the first place.\n\n### What intent-anchored means\n\nEvery journey starts with an intent. \"I want to save for my sister's wedding.\" \"I need to pay rent before the 5th.\" \"I just want to try this once.\"\n\nAn intent-anchored journey keeps that reason at the centre of every screen:\n\n- The first screen confirms they're in the right place for their goal\n- Every step moves them closer to it, or it goes\n- Success is the intent met, not the button tapped\n\n### Where we usually drift\n\n- Nudges that serve the funnel, not the person\n- Extra choices added \"for flexibility\" that nobody asked for\n- Numbers that impress but don't answer the user's question\n\nOn a recent gold savings product, research kept telling us the same thing. People start with a goal, then plan the habit around it. Every nudge that didn't serve that goal, they skipped. Every screen that spoke to it, they trusted.\n\n### Why the dividend is long term\n\n- Trust compounds. A journey that keeps its promise earns the next visit\n- Fewer people drop off from confusion, because every step has a reason\n- Retention stops depending on tricks you have to keep renewing\n- The product gets simpler as it grows, not heavier\n\nShort-term hacks can lift this month's number. Intent pays you back for years.\n\n### A simple check\n\nFor any screen, ask three things:\n\n- What did the user come here to do?\n- Does this screen move them closer to it?\n- If I removed it, would they miss it?\n\nIf the answers are fuzzy, the journey has drifted. Anchor it again."}]$t$::jsonb,
  'https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/thoughts/thought-09.png', 2, 'published', -2, '2026-11-19T00:00:00+00:00'
where not exists (select 1 from public.thoughts where slug = 'intent-anchored-journeys');
