-- Sensibull (Strategy Builder) case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy and images come from the existing page. The old markdown
-- body is kept untouched as a backup.
-- Run once in Supabase → SQL Editor. If it warns about Row Level Security, choose "Run without RLS".

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
