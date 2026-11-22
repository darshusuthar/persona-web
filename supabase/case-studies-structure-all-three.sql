-- Restructure ImpactCraft, Meesho and Sensibull case studies into the fixed case study format (one run).
-- Same content as impactcraft-, meesho- and sensibull-case-study-structure.sql in this folder.
-- Run once in Supabase → SQL Editor. If it warns about Row Level Security, choose "Run without RLS".

-- ImpactCraft case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy comes from the existing page; the emotional journey and
-- the findings-to-design table are rebuilt as tables; the client's quote from the testimonial video is added
-- under Validation. The old markdown body is kept untouched as a backup. Also sets the date to Apr 2025.

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

-- Meesho (multi-supplier checkout) case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy and images come from the existing page. The old markdown
-- body is kept untouched as a backup.

alter table public.case_studies add column if not exists blocks jsonb;

update public.case_studies
set blocks = $cs$[
 {
  "id": "fbb2528c-a29f-49c9-89f6-791d10b3f906",
  "type": "text",
  "markdown": "## Overview\n\nMeesho is an Indian reselling platform on a mission to make online reselling and shopping hassle-free and affordable — with secure, timely transactions and low-cost returns. It's trusted by more than 4 million entrepreneurs across India.\n\nThis is how we let people order from many suppliers in one checkout, without losing the speed they were used to.",
  "anchor": "overview",
  "nav": "Overview",
  "navHideMobile": true
 },
 {
  "id": "8d4187ef-1bd4-4ccc-b50d-4606635c6ade",
  "type": "text",
  "markdown": "## The problem — one supplier per order\n\nEarly on, Meesho focused on suppliers and users could only order from a single supplier at a time. To deliver a seamless, transparent shopping experience, we set out to let users order from multiple suppliers in one quick checkout.\n\n**Who the user is.** **Entrepreneurs** launch their own online business without much investment, earning by reselling products and setting a margin on every transaction. **Consumers** simply buy products for their own use. Two personas covered most of the user base and framed the insights we needed.",
  "anchor": "problem",
  "nav": "Problem"
 },
 {
  "id": "f3cf5c7c-1896-4953-9d41-14f38f025fd7",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Persona-1.jpg",
  "caption": "Persona 1",
  "style": ""
 },
 {
  "id": "744eb7a9-4b4a-4443-bfaf-a9eaac8c133e",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Persona-2.jpg",
  "caption": "Persona 2",
  "style": ""
 },
 {
  "id": "e534dc86-6c39-4b86-8ecf-e5ec9ab9bf50",
  "type": "text",
  "markdown": "## User research\n\nThe pain points came from our users and our own order data. Then we studied how Flipkart and Amazon handle the same problem.\n\n### Consumers\n\n* **Retaining quick-checkout behaviour** — users want to buy fast despite the multi-supplier option\u003b B2C checkout converted 30% higher than the cart icon.\n* **Comprehension of a multi-supplier cart** — optimisations so shipping charges read clearly when unbundled, and a way to de-prioritise products.\n* **Partial cart serviceability** — guiding users with the right information to move forward.\n* **Discovering offers** — clear grouping so supplier- and cart-level offers and charges are easy to understand.\n\n### Entrepreneurs\n\n* **Margin addition across products** — the logic for adding and distributing margin had to be conveyed simply.\n* **Sharing from anywhere** — they rely on real images and reviews before sharing, so that had to stay accessible.",
  "anchor": "research",
  "nav": "Research"
 },
 {
  "id": "4b2d206e-b676-4e17-a6ca-b9be81c46772",
  "type": "text",
  "markdown": "### Competitive analysis\n\nStudying Flipkart and Amazon surfaced patterns — both let users add to cart or check out directly with buy-now."
 },
 {
  "id": "56d9c535-8d66-4ad7-9b98-dd21b08d39ae",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Competitive-Benchmarking-1.png",
  "caption": "Benchmarking Flipkart and Amazon.",
  "style": ""
 },
 {
  "id": "ad94b028-7694-41b0-96fa-2c83bf7c7c15",
  "type": "text",
  "markdown": "### Key learnings\n\n* Users want to buy quickly despite the multi-supplier option.\n* Emphasise the CTA for better order conversion.\n* Keep product images, ratings and reviews accessible for entrepreneurs.\n* Group at supplier level for offers and promotions.\n* Treat cart and wishlist as parallel concepts.\n* Chunk price info for easier comprehension."
 },
 {
  "id": "2eb0e2ef-5f99-459b-8b15-ed8974b59ec8",
  "type": "text",
  "markdown": "## Current state — the old flow\n\nThe existing flow was built for one supplier per order: you picked a product and went straight to checkout, with no cart that could hold products from different suppliers.",
  "anchor": "current-state",
  "nav": "Current state",
  "navHideMobile": true
 },
 {
  "id": "cb900b54-db81-454f-ba1a-efe59e7740b9",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Old-Design-1.png",
  "caption": "The old flow, part 1.",
  "style": ""
 },
 {
  "id": "31c9a850-2321-4429-b98d-264c33091538",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Old-Design-2.png",
  "caption": "The old flow, part 2.",
  "style": ""
 },
 {
  "id": "ff80fc7d-d5b1-490c-b2da-b3863f6d895c",
  "type": "text",
  "markdown": "**The analysis:** adding a multi-supplier cart risked slowing down the fast, single-product checkout that already converted 30% better, and it raised new questions about shipping charges, offers, serviceability and margins across suppliers."
 },
 {
  "id": "ea62a409-68ba-4dd0-9d05-6b0ff930f359",
  "type": "text",
  "markdown": "## Process — mapping the flows, then exploring each step\n\n### Add to cart\n\nMultiple solutions were explored and compared at each step of the journey to build the best experience for Meesho's customers.",
  "anchor": "process",
  "nav": "Process"
 },
 {
  "id": "a384c9c9-0d59-4b2d-9043-00aac36c5847",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Add-to-cart.png",
  "caption": "Add to cart: the user flow.",
  "style": ""
 },
 {
  "id": "6a6edc7b-f839-4fab-8753-2a72f7f39b60",
  "type": "text",
  "markdown": "### Buy Now\n\nIntroduced to retain B2C checkout behaviour — a 30% higher conversion than the header cart. 'Buy Now' also carries the right connotation for an immediate, single-product purchase."
 },
 {
  "id": "c6d23a11-3b2d-4d07-8d93-937aebdbe6ed",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Buy-now.png",
  "caption": "Buy Now: the user flow.",
  "style": ""
 },
 {
  "id": "4a12ba1e-8d09-45d6-a979-d9664d077eb4",
  "type": "text",
  "markdown": "### Exploring the product detail page\n\n* Introduced 'Buy Now' so users can purchase quickly.\n* Regrouped CTAs by intent — pre-decision actions (Wishlist, Share) vs order actions (Add to Cart, Buy Now).\n* Surfaced 'Share' upfront for entrepreneurs."
 },
 {
  "id": "959d548c-2a44-464f-8dd9-01ec7c95339b",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/PDP-Explorations-1-1.png",
  "caption": "Product detail page explorations.",
  "style": ""
 },
 {
  "id": "1d6f6a85-a299-435e-965a-8fb375213807",
  "type": "text",
  "markdown": "### Exploring the cart\n\n* Supplier-level grouping for offers and delivery comms.\n* Cart and wishlist as parallel concepts for delayed decisions.\n* Price-info chunking into positives (discounts) and negatives (charges) to reduce cognitive load."
 },
 {
  "id": "f42176d4-8580-4e18-b6b0-b8f2851ec401",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Cart-Ideas.png",
  "caption": "Cart explorations.",
  "style": ""
 },
 {
  "id": "b1d506c7-53ee-4451-8218-8b3dc9717324",
  "type": "text",
  "markdown": "### Exploring the address step\n\n* Delivery date shown at address level (it can't be reliably estimated across products).\n* Handled partial serviceability — move on without a product, choose a different address, or return to the PDP."
 },
 {
  "id": "ce41460e-6a17-473e-beee-a19168ccf3df",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Address-Selection-Edge-Cases.png",
  "caption": "Address selection and its edge cases.",
  "style": ""
 },
 {
  "id": "5ac0e236-3a76-4e74-b258-02f265cd73ae",
  "type": "text",
  "markdown": "### Exploring payment with margin\n\n* Kept it simple — a single action to add order-level margin, avoiding MRP error cases.\n* Made margin distribution across products visible to reduce support queries."
 },
 {
  "id": "ef47630f-88f1-47b4-ba84-ca6162ac4c34",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Payment-Margin-Ideas.png",
  "caption": "Payment and margin explorations.",
  "style": ""
 },
 {
  "id": "f73f1608-116e-4865-a849-1bb34b47cd75",
  "type": "text",
  "markdown": "## How we arrived at the solution\n\nAt every step we kept the option that protected fast checkout while making a multi-supplier cart easy to understand. These are the final screens.\n\n### Product detail page\n\nAdd to cart or place an order seamlessly via Buy Now, with education for existing users landing after an update.",
  "anchor": "solution",
  "nav": "Solution"
 },
 {
  "id": "8d37125e-8b45-4b71-bd81-6630305be8e3",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/VD-PDP.png",
  "caption": "Final product detail page.",
  "style": ""
 },
 {
  "id": "caa76c94-14e0-4829-b203-dce7c7ce3712",
  "type": "text",
  "markdown": "### Cart\n\nA wishlist lets users quickly park products for later. 'Remove' sits outside so removing from cart flows naturally into the wishlist."
 },
 {
  "id": "f953e491-0a84-4fcb-a48c-585b449c3d50",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/VD-Cart-1.png",
  "caption": "Final cart.",
  "style": ""
 },
 {
  "id": "72982626-ca5c-41ae-beae-5e4ea85d27c8",
  "type": "text",
  "markdown": "### Address\n\nEvery case is covered — fully serviceable, partially serviceable and unserviceable — so users always know what to do."
 },
 {
  "id": "a672dddd-5fdd-40a6-b54b-26ade1d8e45b",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/VD-Address.png",
  "caption": "Final address step.",
  "style": ""
 },
 {
  "id": "0286bb36-42fd-4382-8b5e-58ff5458d596",
  "type": "text",
  "markdown": "### Payment\n\nPayment leaves no room for ambiguity, so margin was simplified to a single, clear add for the order total."
 },
 {
  "id": "61437d45-e728-4848-a6be-509c91f0a7a2",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/VD-Payment.png",
  "caption": "Final payment step.",
  "style": ""
 },
 {
  "id": "ea697b26-fe30-4b84-bdaf-5597ac748d73",
  "type": "text",
  "markdown": "## How we validated it\n\nWe ran usability tests on the new flow before launch, then tracked orders after it went live.",
  "anchor": "validation",
  "nav": "Validation"
 },
 {
  "id": "c653ae75-1ff5-42a7-ac43-cf35bb72ddf4",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/UT-Insights-1.png",
  "caption": "Usability testing insights.",
  "style": ""
 },
 {
  "id": "51b11db4-b425-49fc-93a6-11d8d67e8af0",
  "type": "text",
  "markdown": "### Impact\n\n**11% growth in orders placed per day**, measured three months after launch."
 },
 {
  "id": "933cc103-ef35-4c5d-a84a-97e2e2bca92e",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/meesho/Meesho-Impact-1.png",
  "caption": "Impact: 11% growth in orders placed per day, three months after launch.",
  "style": ""
 },
 {
  "id": "251c170a-7688-49e1-b0b4-e6d81b25f608",
  "type": "text",
  "markdown": "## Takeaways\n\n* Simplicity wins when it serves the same purpose.\n* Data gives you the power to make hard calls.\n* Use visuals to communicate complex, educational steps.\n* Be uncompromisingly clear when it comes to payment.\n* Every edge case matters."
 }
]$cs$::jsonb,
    updated_at = now()
where slug = 'checkout';

-- Sensibull (Strategy Builder) case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy and images come from the existing page. The old markdown
-- body is kept untouched as a backup.

alter table public.case_studies add column if not exists blocks jsonb;

update public.case_studies
set blocks = $cs$[
 {
  "id": "2a792b17-8986-40a7-aa5c-68920bad08e1",
  "type": "text",
  "markdown": "## Overview\n\nSensibull is the biggest Futures & Options trading platform in India. This project rethinks its single most important feature — the Strategy Builder — the place traders analyse and place option strategies.\n\n### First, the basics\n\nCombinations of options make a **strategy**. A **call** makes money if the price goes up\u003b a **put** if it goes down. **Expiry** is the contract's end date, and a **lot** is a fixed multiple of stock set by SEBI. The builder is where a trader assembles and analyses these strategies.",
  "anchor": "overview",
  "nav": "Overview",
  "navHideMobile": true
 },
 {
  "id": "91418674-fb3a-49c6-b1e1-b6efb2f2695e",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Understand-call-and-put-Fianl.jpg",
  "caption": "How calls and puts work.",
  "style": ""
 },
 {
  "id": "75bd6897-cd8f-4003-b19a-4a6fe47cbfff",
  "type": "text",
  "markdown": "## The problem — the most important feature was the hardest to use\n\nBuilding a strategy took too many clicks during fast market hours. Analysing it meant scrolling back and forth between the graph, key data and sliders. And for traders coming from equity, it was too complex to even try.\n\n**Who the user is.** Pro F&O traders who build and adjust strategies during market hours, and simple equity traders the business wanted to bring into options for the first time.",
  "anchor": "problem",
  "nav": "Problem"
 },
 {
  "id": "9ee148f8-ac1f-4929-9361-7c5dc353d287",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/User-Persona.png",
  "caption": "The two personas: pro F&O traders and simple equity traders.",
  "style": ""
 },
 {
  "id": "93932ac8-2dcd-4c31-863f-ed9eabb262a7",
  "type": "text",
  "markdown": "## User research\n\n### Stakeholder interviews\n\nWith experienced F&O traders as stakeholders, you're halfway to a user test — they carry both empathy and business context. Three things stood out:\n\n* The builder should be the most intuitive feature.\n* Clarity while trading comes first.\n* The mobile experience should be simplified too.",
  "anchor": "research",
  "nav": "Research"
 },
 {
  "id": "06f57a1c-8325-483a-ac2a-e967c1117670",
  "type": "text",
  "markdown": "### Users & pain points\n\nWe interviewed 8 users — 6 pro traders and 2 non-pros, since stakeholders wanted new users to adopt the builder too.\n\n**Pro F&O traders**\n\n* Selecting and editing a leg is difficult and time-consuming.\n* Constant scrolling between the graph, key data and sliders.\n* The graph and the strategy are the primary focus.\n* Clarity on max profit and max loss matters before hitting trade.\n* Reading data in a table is hard\u003b mobile is a no-go for building.\n\n**Simple equity traders**\n\n* Legs and options terminology are confusing coming from equity.\n* They understand cost, potential earnings and clear max loss.\n* Reassurance about small max losses would get them to try once.\n* They'd need to learn first before trading F&O."
 },
 {
  "id": "6a41e716-361a-4c1a-b7e9-6e35cd42476f",
  "type": "text",
  "markdown": "### Competitive analysis\n\nOpstra offers a similar strategy-builder flow. Interestingly, users were happy to edit a single leg in a completely new window — the focused attention on the in-process action made it acceptable."
 },
 {
  "id": "443a64da-2894-4726-9846-dfc2fec54016",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Opstra-1.png",
  "caption": "Opstra’s strategy builder.",
  "style": ""
 },
 {
  "id": "219b4c06-7901-49af-9f4d-59a676f2cb90",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Opstra-2.png",
  "caption": "Opstra: editing a single leg in its own window.",
  "style": ""
 },
 {
  "id": "c7e5fcca-98ca-4a72-850a-fdb9edbd8116",
  "type": "text",
  "markdown": "### Key insights\n\n* High mental burden and hard-to-read, complex data.\n* The graph is the most important part.\n* A steep learning curve even for a simple trade.\n* Clarity in live data is essential.\n* Fear of bi-directional trades\u003b non-pros will try once if it's clearer.\n* All major aspects should be visible at a single glance."
 },
 {
  "id": "99526979-abad-4b68-a3fe-b3ca6b206198",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Builder-user-flow-v2-1.jpg",
  "caption": "The builder’s user flow.",
  "style": ""
 },
 {
  "id": "ded40a16-0844-46ff-a72b-9aabc5a3e38c",
  "type": "text",
  "markdown": "## Current state — the old builder",
  "anchor": "current-state",
  "nav": "Current state",
  "navHideMobile": true
 },
 {
  "id": "e1bff096-fec2-41ca-9165-fddd1cc0cc93",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Old-Sensibull-Builder-v2.png",
  "caption": "The old Strategy Builder.",
  "style": ""
 },
 {
  "id": "e1ca0e31-88bb-4b03-b8bb-633f636fd013",
  "type": "text",
  "markdown": "**The analysis:** strategy, data and graph competed for the same space. Legs were edited inside a dense table, key numbers were hard to read, and the graph and sliders sat far apart, so every adjustment meant scrolling, exactly the pains traders described."
 },
 {
  "id": "e065b87c-bd19-4850-8fef-da548ec6dd33",
  "type": "text",
  "markdown": "## Process — two problems, wireframed\n\n### 1. Create & edit a strategy\n\nNew traders won't learn F&O first and then build a strategy — so the goal was to make manual creation intuitive enough to trade without deep knowledge.\n\n**Ready-made strategies:** known F&O patterns, each with a name and a graph showing how it performs. Users pick one and the system builds the rest — helping newcomers learn and giving pros a fast start.",
  "anchor": "process",
  "nav": "Process"
 },
 {
  "id": "07211691-3791-4250-99e9-b3268224eb2d",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Readymade-strategies-wireframing-1.png",
  "caption": "Wireframing ready-made strategies.",
  "style": ""
 },
 {
  "id": "f1c3ca8f-08f5-4c4f-9845-c437b5a62d20",
  "type": "text",
  "markdown": "**Adding & editing legs** is the heart of the feature. A leg needs underlying, strike, expiry, call/put, buy/sell and lots. During market hours that's too many clicks — so the flow was reduced to a **single click** to add a buy/sell leg, and kept reviewable so users can build and check at once."
 },
 {
  "id": "53ba9d2b-4de5-4caa-a234-77b97c7dde64",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Wireframing-legs-add-and-edit-scaled.jpg",
  "caption": "Wireframing how legs are added and edited.",
  "style": ""
 },
 {
  "id": "eb8491d0-40ff-4c18-9516-4486a21080b5",
  "type": "text",
  "markdown": "### 2. Analysis with different targets\n\nOnce a strategy is set, its legs don't need much space — but the graph and sliders do. So the layout gives ⅓ to strategy and summary, and ⅔ to the graph and target sliders."
 },
 {
  "id": "68a9a6fe-7455-4933-886c-e23f6aff686f",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Old-builder-sliders.png",
  "caption": "Graph and target sliders.",
  "style": ""
 },
 {
  "id": "022b0e29-aeaa-4998-b5a0-cfb05a6cbb9d",
  "type": "text",
  "markdown": "### Wireframing the layout"
 },
 {
  "id": "12f64c03-1c6b-4329-aec8-0a73ff24e6e6",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Desktop-wireframingjpg.jpg",
  "caption": "Desktop layout wireframes.",
  "style": ""
 },
 {
  "id": "0c66a248-2f28-488b-aed2-d884ae107895",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Mobile-wireframe.jpg",
  "caption": "Mobile layout wireframes.",
  "style": ""
 },
 {
  "id": "54d42525-6e92-44ce-90e1-36f5f09c0178",
  "type": "text",
  "markdown": "### UI components\n\nA grey background with white widgets helps users focus on one thing at a time and reduces cognitive load — the old flat visual made it hard to find relatable actions and information."
 },
 {
  "id": "132e79c3-0afa-4331-a45e-6b21fe9f550c",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/UI-Components-1.jpg",
  "caption": "UI components.",
  "style": ""
 },
 {
  "id": "927af1c4-77b7-4eb7-86c5-75ecd2131e22",
  "type": "text",
  "markdown": "## How we arrived at the solution\n\nUsers were used to building on the left and analysing on the right, so the desktop and mobile layouts were frozen around that familiar model after stakeholder discussion. Within that layout, the two problems became two features: a one-click leg drawer and ready-made strategies.",
  "anchor": "solution",
  "nav": "Solution"
 },
 {
  "id": "12934730-beb4-4217-85f4-59f9e5cd6763",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Final-version-v3.jpg",
  "caption": "The final Strategy Builder.",
  "style": ""
 },
 {
  "id": "9832746b-8454-45e1-b080-063c62045dc6",
  "type": "text",
  "markdown": "### Easy add / edit legs\n\nA drawer slides up from the bottom to manage all legs at a single glance — appearing in-context and leaving without breaking the flow. Adding a buy/sell leg is a single click."
 },
 {
  "id": "2493a8b7-8dc5-4cdd-b032-b769383d7db1",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Builder-leg-picker-drawer-v2.png",
  "caption": "The leg picker drawer.",
  "style": ""
 },
 {
  "id": "af11b319-3f8b-4f71-81c3-fcbbd59d400d",
  "type": "text",
  "markdown": "### Ready-made strategies\n\nThree categories — bullish, bearish and neutral — let users pick a direction and the system generates a strategy. A collapse interaction removes the prominence once selected."
 },
 {
  "id": "6557f27c-7f36-4931-88fe-a634b1a77d58",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Ready-made-strategy-1.png",
  "caption": "Ready-made strategies.",
  "style": ""
 },
 {
  "id": "33a7c93f-1f8d-4b88-875e-5325497265c4",
  "type": "text",
  "markdown": "## How we validated it\n\n- **With expert stakeholders.** The stakeholders were experienced F&O traders themselves, so reviews with them worked almost like user tests. The layout was frozen only after that discussion.\n- **Against the research.** Every major decision traces back to the eight user interviews, from the one-click legs to keeping the graph and sliders together at a single glance.\n- **After launch.** Paid users grew **350% in the six months after launch**, alongside a few smaller feature revamps.",
  "anchor": "validation",
  "nav": "Validation"
 },
 {
  "id": "563821d1-b623-4fdb-a11d-0b8ad44f98b7",
  "type": "image",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/sensibull/Sensibull-Impact-1.png",
  "caption": "Impact: 350% growth in paid users, six months after launch.",
  "style": ""
 },
 {
  "id": "1d4e3b8d-549d-467e-8ac3-e0f9eff267ea",
  "type": "text",
  "markdown": "Iteration is a never-ending game."
 },
 {
  "id": "edd7e932-0c63-4aba-8f5c-731ad2e1d59c",
  "type": "text",
  "markdown": "## Takeaways\n\n* Users happily adopt an unusual experience if it does the job.\n* Don't make users scroll if it can fit into a single glance.\n* Take advantage of system-oriented automation.\n* Keeping users at the centre reduces repeat work.\n* Never break habituated behaviour."
 }
]$cs$::jsonb,
    updated_at = now()
where slug = 'builder';

