-- ImpactCraft case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy comes from the existing page; the emotional journey and
-- the findings-to-design table are rebuilt as tables; the client's quote from the testimonial video is added
-- under Validation. The old markdown body is kept untouched as a backup. Also sets the date to Apr 2025.
-- Run once in Supabase → SQL Editor. If it warns about Row Level Security, choose "Run without RLS".

alter table public.case_studies add column if not exists blocks jsonb;

update public.case_studies
set blocks = $cs$[
 {
  "id": "656a54be-c56e-4f9c-951d-4ca49325bd1d",
  "type": "text",
  "markdown": "## Overview\n\nImpactCraft is a customer success platform for teams managing dozens of accounts at once. The **Priorities** page is the team's daily home — the first screen everyone opens each morning.\n\nThis is how research turned one dense dashboard into a priority feed that each role could act on.",
  "anchor": "overview",
  "nav": "Overview",
  "navHideMobile": true
 },
 {
  "id": "7ba75387-f5c5-45f8-bd0e-b0ef3e540acb",
  "type": "text",
  "markdown": "## The problem — one screen, a whole hierarchy\n\n“Everyone” is where it got hard: one screen had to serve an entire hierarchy at once — individual CSMs, senior CSMs, managers and executives — each of whom cares about very different things. Every role got the same undifferentiated information, with no obvious place to start.\n\n**Who the user is.** Customer success teams at B2B SaaS companies: CSMs juggling many accounts at different stages, and the managers and executives who oversee them. For all of them, the Priorities page is the first screen of the day.",
  "anchor": "problem",
  "nav": "Problem"
 },
 {
  "id": "36bb50ec-fc52-4393-a953-97447b0c56e9",
  "type": "text",
  "markdown": "## User research\n\nThis redesign was led by fieldwork, not assumption. We ran interviews and workflow shadowing with an enterprise customer-success team, mapping their entire day — from the sales handover through requirement gathering, documentation, implementation, testing and go-live, into hypercare and the eventual handover to account managers. At each stage we captured the tools in play and, crucially, the **emotion** the CSM felt.\n\nMethod: role and responsibility mapping, KPI review (time-to-go-live, adoption rate, change-request resolution, CSAT in hypercare), a stage-by-stage workflow audit with mediums and emotions, and a pains-vs-opportunities synthesis.",
  "anchor": "research",
  "nav": "Research"
 },
 {
  "id": "743c6e27-d926-4a5e-b8c2-d351d8424a34",
  "type": "text",
  "markdown": "### The emotional journey\n\nPlotting emotion across the workflow made the problem impossible to ignore. The day is a long climb through friction that only releases right at the end — and then resets to overwhelm the moment they look across all their accounts.\n\n| Stage | What the CSM felt |\n|---|---|\n| Sales handover | Neutral |\n| Requirement gathering | Frustration |\n| Documentation (BRD) | Overload |\n| Scope sign-off | Stress |\n| Custom builds | Uncertainty |\n| Internal collaboration | Overload |\n| Testing & go-live | Anxiety |\n| Hypercare | Relief |\n| Tracking many accounts | **Overwhelm** |"
 },
 {
  "id": "ba724cf6-1a63-4740-b76c-007ead20cb43",
  "type": "text",
  "markdown": "### What we heard, again and again\n\nFive findings surfaced across every conversation:\n\n* **Overwhelm from breadth.** CSMs manage many clients at different phases and track them across scattered tools — the most-named feeling in the study.\n* **Blind spots surface late.** Missed cases became change requests and timeline slips\u003b problems were caught too far downstream.\n* **Everything is scattered.** Context lived across separate systems, so nothing important was in one place.\n* **Low control, high interpretation.** Clients were often vague or unresponsive — “you figure it out” — leaving the CSM to carry the load.\n* **Relevance is role-specific.** Leadership wanted risks, updates and the high-level read\u003b the people doing the work wanted the concrete next action."
 },
 {
  "id": "56e401c5-5d76-45aa-9168-139e49940919",
  "type": "quote",
  "text": "“You figure it out.”",
  "note": "What vague clients often left CSMs with, and the load the design had to take off them."
 },
 {
  "id": "d354dc7a-50fe-4829-93e4-f8dc0d11bbc1",
  "type": "text",
  "markdown": "## Current state — one dump for everyone\n\nThe first version tried to show everything: a wide metric strip, an insights table, today's checklist, a customer-health table and a live events feed. It handed the **same undifferentiated information** to every role.\n\nNothing was segmented by category or relevance, so there was no obvious starting point — just a lot to scan and interpret. A format that tried to satisfy everyone ended up serving no one particularly well.",
  "anchor": "current-state",
  "nav": "Current state",
  "navHideMobile": true
 },
 {
  "id": "0c60b7b4-80f9-4554-8e7f-f885a0c24b4e",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/ic-old.png",
  "caption": "The original screen: the same dense dump for every role.",
  "style": ""
 },
 {
  "id": "22521413-2c8c-4519-be8b-591b4d25653d",
  "type": "text",
  "markdown": "**The analysis:** with nothing segmented by category or role, every user had to do the sorting themselves. That is exactly the overwhelm the research described."
 },
 {
  "id": "8e2de9c2-8cdd-4af3-b453-294520ba52a3",
  "type": "text",
  "markdown": "## Process — three directions, tested against the findings\n\nWith the findings as the brief, we built three genuinely different directions and tested each against them.",
  "anchor": "process",
  "nav": "Process"
 },
 {
  "id": "a48945c2-49e8-4b81-a951-08e9d09e650e",
  "type": "text",
  "markdown": "### One calm stream\n\nStrip everything to a single simplified insight feed. It answered “reduce the noise,” but over-corrected: with no value, no action and no role relevance, every insight looked equally (un)important.",
  "tag": "Direction 1 · Dropped",
  "tone": "dropped"
 },
 {
  "id": "860d23c0-d1bb-41c9-80ad-7d5730791e33",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/ic-iteration-1.png",
  "caption": "Direction 1: a single stripped-back insight feed.",
  "style": ""
 },
 {
  "id": "d291f8bf-c783-449d-a0f1-113fb604a0d9",
  "type": "text",
  "markdown": "### A personal monitor + activity\n\nA compact “accounts monitor” for the numbers beside a categorised activity feed. This answered the “scattered tools” finding — but signal types still mixed into one stream.",
  "tag": "Direction 2 · Partly kept",
  "tone": "partly"
 },
 {
  "id": "94c9dc06-628a-4318-8f09-f01bff0953a7",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/ic-iterations-1.png",
  "caption": "Direction 2: an accounts monitor beside a categorised activity feed.",
  "style": ""
 },
 {
  "id": "d5c299c4-e1d0-4c4b-85e6-820d21cd32fd",
  "type": "text",
  "markdown": "### Patterns and signals\n\nGroup the raw dump into clusters — signal patterns, high-revenue-at-risk, opportunities and risks — directly answering the “blind spots surface late” and “overwhelm” findings by letting people scan categories, not rows.",
  "tag": "Direction 3 · Partly kept",
  "tone": "partly"
 },
 {
  "id": "e98a8919-b976-415f-9e0e-d3c42147023c",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/ic-iteration-3.png",
  "caption": "Direction 3: grouping the dump into signal patterns and categories.",
  "style": ""
 },
 {
  "id": "34a9fbe4-ba30-4165-b683-ec2d16200a02",
  "type": "text",
  "markdown": "## How we arrived at the solution\n\nNo single direction satisfied every finding. The final design was a deliberate **blend of two** — the category and signal segmentation of Direction 3 with the ranked, action-first structure of Direction 2 — which became the **priority feed**.\n\nIt gives every role a version of the same screen: leadership can stay on risks, updates and patterns\u003b a CSM can drop into just their tasks\u003b and everyone sees information **segmented by category, ranked by relevance and value, and light enough to read without the mental tax** the research had flagged.",
  "anchor": "solution",
  "nav": "Solution"
 },
 {
  "id": "c070d249-7037-42c5-aa3c-89b39e7f5685",
  "type": "text",
  "markdown": "## The proposed solution — a priority feed\n\nEvery item is now a decision card, not a data point — and each choice maps back to a finding:\n\n* **Leads with the action** — answering the “low control, high interpretation” pain: “Schedule executive check-in with Meesho,” not just “payment success dropped.”\n* **Typed by signal** — At risk, Pattern, Renewal, Relationship or Expansion, so problems surface early instead of late.\n* **Ranked by value at stake** — ARR on every card, sortable by time or value, so overwhelm becomes an ordered list.\n* **Shows its evidence** — a signal count tells the CSM how much is feeding each recommendation.\n* **Personalised by filters** — Customers at risk, Signal patterns, Expansion and more, so each role gets a relevant screen.\n* **One tap to act** — “Add task” turns a priority into work without leaving the page."
 },
 {
  "id": "7fd884ab-f8a7-4953-ae25-4e5366709c40",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/ic-final.png",
  "caption": "The final priority feed: segmented, ranked, personalisable and action-first.",
  "style": ""
 },
 {
  "id": "c31fef86-c72d-4656-8ec1-c23432e7b033",
  "type": "text",
  "markdown": "Notably, the research also told us what **not** to touch: the integrations, tracking and BRD-drafting the team already relied on were working well, so the redesign preserved them and moved reporting-style depth into dedicated tabs."
 },
 {
  "id": "19727e5a-bd9b-44a9-ac40-d79ac410900b",
  "type": "text",
  "markdown": "### From findings to design\n\nEach pain from the research is answered by a specific decision:\n\n| What we heard | What we built |\n|---|---|\n| CSMs juggle many accounts at different stages, tracked across three or four separate tools. The word they used most was **overwhelm**. | A single **priority feed** that ranks accounts and actions, so the day opens on what matters, not a scan. |\n| Blind spots surfaced **late** and turned into change requests and delays. | **Signal-typed cards** (At risk, Pattern) surface problems early, with the evidence attached. |\n| Information lived in scattered tools\u003b nothing important was in one place. | The key context is pulled **onto the Priorities page itself**, with no digging. |\n| Leadership and the people doing the work wanted very different things from the same screen. | **Filters and views** let each role slice the same feed down to their own relevance. |\n| High cognitive load: clients were often vague, so the CSM carried the interpretation. | Every card leads with a **clear recommended action** and a one-tap way to act on it. |"
 },
 {
  "id": "a6e3349a-a2c6-454d-9ea0-a7cdb6681bc5",
  "type": "text",
  "markdown": "## How we validated it\n\n- **Against the research, at every step.** Each direction was tested against the five findings before we committed to it, and the final feed is a blend of the two that answered them best.\n- **Through shared principles.** Because the direction came out of research, internal debates resolved into shared principles rather than opinions: the page optimises for the next action\u003b information is segmented by category and role-relevance\u003b and control is offered through **filters and views**, not a blank canvas. When a call was contested, we went back to a finding.\n- **Against the team's own metrics.** We anchored success to the metrics this team already lived by, drawn straight from the research: **time-to-go-live, adoption rate, change-request resolution time, and CSAT in hypercare**.\n\n**The verdict:** the priority feed became the default Priorities view, reporting-style depth moved into dedicated tabs, and the team committed to one shared success metric — insights acted on per session. The busiest screen in the product went from something every role had to interpret to one each role could act on immediately.",
  "anchor": "validation",
  "nav": "Validation"
 },
 {
  "id": "e81b76c0-6ab3-4ae6-8021-419496977664",
  "type": "quote",
  "text": "“The product has come out really well, and we’re getting lots of appreciation when we go and demo this product to customers.”",
  "note": "Girish Phansalkar, Co-founder & CEO, ImpactCraft"
 },
 {
  "id": "b7f4c885-bb86-4893-96b3-052f56d1f325",
  "type": "text",
  "markdown": "## Takeaways\n\n* Let research name the problem — “overwhelm” wasn't a guess, it was the word users kept using.\n* One screen, many roles — design for relevance, not just density.\n* Segment the dump — raw events become useful once grouped into categories and signals.\n* Surface problems early — the design's job was to move blind spots upstream.\n* The best direction was a blend — the strongest solution combined two explorations, each validated against the findings."
 }
]$cs$::jsonb,
    year = 'Apr 2025',
    updated_at = now()
where slug = 'impactcraft';
