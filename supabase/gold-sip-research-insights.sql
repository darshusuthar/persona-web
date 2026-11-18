-- Gold SIP case study: add the user-research insights.
-- Run once in Supabase → SQL Editor. It replaces this case study's content blocks with the
-- current version plus 7 "User research" notes and two small copy edits.
-- If Supabase warns about a table without Row Level Security, choose "Run without RLS":
-- nothing new is created; the warning is triggered by words inside the case study text.

update public.case_studies
set blocks = $cs$[
 {
  "id": "6a2a3bdf-cc71-450d-bc07-2a8543d5a4a3",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/vault__gold-home-sip-active.webp",
    "caption": "Gold home with an active Gold SIP"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_sip_weekly.webp",
    "caption": "Buy page with SIP selected, Đ100 every Monday"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-gift-next.webp",
    "caption": "Gold SIP detail with the instalment tracker"
   }
  ],
  "layout": "banner",
  "columns": 3
 },
 {
  "id": "d6d9644c-84b9-4b3c-9960-4740767d1872",
  "type": "text",
  "style": "intro",
  "anchor": "overview",
  "markdown": "## Overview\n\nAspora is a fintech for the Indian diaspora, built on Shivalik Small Finance Bank's rails — remittance, NRI banking and gold. Digital gold in the UAE worked as a **product**: people trusted the insured vault and bought from it. It didn't work as a **habit**."
 },
 {
  "id": "ceb69d3a-232b-4e5c-9636-d2ca0378b4c0",
  "nav": "Problem",
  "type": "text",
  "anchor": "problem",
  "markdown": "## The problem — people bought once, then left\n\nAcross 3,248 gold transactions from 1,126 users, most people bought exactly once. The ones who came back weren't returning monthly — they were topping up in the same session. From June to August, money started leaving faster than it came in. Every month we were re-acquiring most of our buyers from scratch.",
  "navHideMobile": false
 },
 {
  "id": "15d6608f-1d5b-488b-98d3-20a1b73b05f1",
  "type": "stats",
  "items": [
   {
    "bad": true,
    "label": "of UAE gold buyers bought exactly once",
    "value": "54%"
   },
   {
    "bad": true,
    "label": "month-1 transacting retention (39% → 31% → 27%, May–Jul cohorts)",
    "value": "~30%"
   },
   {
    "bad": true,
    "label": "sell value as a share of buy value in August, up from 15% in June",
    "value": "76%"
   },
   {
    "bad": false,
    "label": "of repeat gaps fell in a 25–35 day window. Almost nobody had a monthly rhythm.",
    "value": "4.9%"
   }
  ],
  "source": "Source: Gold SIP PRD, internal UAE gold data, Jun–Aug 2026."
 },
 {
  "id": "ba6b971c-b235-490b-ae2f-eeb99e5a910d",
  "type": "text",
  "markdown": "### The opportunity\n\nIn funnel tests, a SIP proposition drew **2× the intent** of plain gold (44% vs 22%). Gold icon → funnel conversion was a healthy 52%, but the funnel itself converted at ~3%. The bet: make SIP the primary job on the gold page, keep one-time buying as a guardrail, and scale Digital Gold from 10–15% of traffic to 100%."
 },
 {
  "id": "016b367f-ef4e-4118-b800-3a9872819551",
  "note": "The thesis we rallied around — turn retention into a mandate-uptime problem.",
  "text": "“Today a repeat purchase needs intent, a session and a decision. After SIP it needs a working card.”",
  "type": "quote"
 },
 {
  "id": "88e3d3f1-e17a-4898-a2ad-859d15d8d8d0",
  "type": "text",
  "anchor": "start",
  "markdown": "## Where it started — a transaction, not a relationship\n\nBefore SIP, gold on Aspora was a careful three-step purchase: order form, review & pay, confirmation. It handled price locks, limits, gateway failures and refunds well. But nothing in it brought you back."
 },
 {
  "id": "6af98ae4-1ae3-4123-90f9-78088816da2d",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_1.webp",
    "caption": "**Buy, default state**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_2.webp",
    "caption": "**Price couldn't update**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_3.webp",
    "caption": "**First-time payment review**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_4.webp",
    "caption": "**Select a payment method**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_5.webp",
    "caption": "**Confirming payment**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_6.webp",
    "caption": "**Certificate of ownership**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_7.webp",
    "caption": "**Transaction details**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/ob_8.webp",
    "caption": "**Vault, first month after buying**"
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "b39ee53f-cd8d-4ced-b712-af111d5716fe",
  "type": "insight",
  "label": "The old buy flow",
  "heard": "Users kept coming back to two things: how **simple** the three-step buy felt, and the **certificate of ownership** at the end of a one-time buy. Nobody had to be asked about the certificate. They brought it up themselves.",
  "quote": "",
  "changed": "Both were non-negotiable. SIP had to fit inside that simplicity, and the certificate stayed as the payoff of every buy."
 },
 {
  "id": "66daf216-cb5f-4cc9-b588-907e251f71dc",
  "type": "text",
  "anchor": "landscape",
  "markdown": "## The research — apps our users already know\n\nOur users are Indian. Most have used Jar, Gullak or Paytm Gold back home, and fintechs like CRED and Jupiter have shaped what “rewarding” and “premium” feel like. So rather than benchmarking global brokers, I recorded the Indian gold-savings apps on device and mapped them end to end — onboarding, setup, the first buy and, especially, what happens *after* setup. For each, one question: **what does it anchor the user on?**\n\n| App | Anchors on | What we took |\n|---|---|---|\n| **Jar** | A tiny daily habit; playful retention storytelling | Emotional reasons to stay; daily as a real cadence |\n| **Gullak** | The future value — “what this becomes” | Projection as the hook |\n| **Paytm Gold** | Utility: start from ₹51, a long plain ledger | Very low minimums; a trustworthy ledger |\n| **CRED · Jupiter** | Rewards and premium polish | Reward moments that feel earned |"
 },
 {
  "id": "a56598f0-0abb-4208-8049-49383340d9b9",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/b_bench.webp",
  "type": "image",
  "style": "board",
  "caption": "Benchmark board — Jar (top), Gullak (middle), Paytm Gold (bottom), recorded and mapped step by step."
 },
 {
  "id": "064faabb-28d0-4673-a767-a623d379228e",
  "type": "text",
  "markdown": "### SIP detail page\n\nOnce setup was settled, the harder question was the page people return to. I benchmarked the SIP detail pages of CRED, Paytm and Jar side by side.\n\n| App | Leads with | What we took / left |\n|---|---|---|\n| **CRED** | Total holdings, then a grid of every instalment as a ticked “gold journey” | Took the journey of ticks. Left total holdings — on Aspora, vault gold can be sold anytime, so holdings don't map to a SIP. |\n| **Paytm** | Plan facts, autopay status, Upgrade and Pause | Took the plain, scannable SIP facts. Left Upgrade and Pause for v1. |\n| **Jar** | Emotion: “Great start”, a future-value climb, a step-up nudge, social proof | Took the emotional register and the forward look. Left step-up and testimonials. |"
 },
 {
  "id": "55d0c2ba-94e1-4d04-845a-b73131940466",
  "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/n_detail_bench.webp",
  "type": "image",
  "style": "board",
  "caption": "SIP detail benchmark — CRED, Paytm and Jar."
 },
 {
  "id": "b5a7324a-f61a-4518-8747-33bbb15e29c8",
  "type": "text",
  "markdown": "### What we heard, again and again\n\n- **Everyone front-loads the decision.** Amount, frequency, date and reward — all before you've committed to anything.\n- **The best ones sell the outcome.** Gullak doesn't sell a SIP; it sells what your gold could be worth in five years.\n- **Almost nobody designs month four.** Setup gets the polish; the weeks where people actually quit get a list of transactions."
 },
 {
  "id": "64ac6c55-4e75-4776-9adc-b788c8698ed6",
  "nav": "Directions",
  "type": "text",
  "anchor": "directions",
  "markdown": "## Six directions, four waves\n\nThe work moved in four waves. Each answered one question and opened the next. I've kept the dead ends in, because the reasons we killed them are the reasons the final design looks the way it does.\n\nWe put every wave in front of users as we went, not in one study at the end. What they told us is called out in the purple **User research** notes, right next to the work it changed.",
  "navHideMobile": true
 },
 {
  "id": "6087cee7-4706-4e10-8ebc-ff4122f1ca1b",
  "type": "cards",
  "items": [
   {
    "body": "A separate product, or a way of buying?",
    "title": "Wave 1 · Early Sep"
   },
   {
    "body": "IA reset in black and white. How much do we ask before paying?",
    "title": "Wave 2 · Mid Sep"
   },
   {
    "body": "One buy page. Cadence, rewards, honest projections.",
    "title": "Wave 3 · Late Sep–Oct"
   },
   {
    "body": "Life after setup: tracker, rewards, the exit (covered in the decisions).",
    "title": "Wave 4 · Oct–Nov"
   }
  ]
 },
 {
  "id": "6cc98c08-b355-43f8-98c4-e6e3dabc2667",
  "tag": "Wave 1 · Dropped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### SIP as its own product\n\nA separate “Gold plan” flow from the vault: amount, SIP day, **how many payments**, authorise the collection, then a manage area and lock-screen notifications. A clear model — but two doors to the same gold, and a fixed-term question nobody needed (later struck from the PRD)."
 },
 {
  "id": "a1958898-7e59-40cb-8054-d5e5edbbf11f",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_1.webp",
    "caption": "**Amount, weekly**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_2.webp",
    "caption": "**How many payments?**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_3.webp",
    "caption": "**Authorise the collection**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_4.webp",
    "caption": "**Your gold plan is live**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_5.webp",
    "caption": "**SIP detail**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dA_6.webp",
    "caption": "**Cancel this plan?**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "1762dddf-665d-466f-873e-a60b06801769",
  "type": "insight",
  "label": "Wave 1 · How many payments?",
  "heard": "When we asked how many payments they wanted, users pushed back on the question itself. To them a SIP is something that **keeps going for as long as they are happy with it**. They did not want a cap sitting on the calculator.",
  "quote": "",
  "changed": "The payment-count step was cut, and the fixed term was struck from the PRD. A Gold SIP runs until you stop it."
 },
 {
  "id": "205b320f-290d-4156-b02b-82ca17044f3a",
  "tag": "Wave 1 · The PM's push · Partly kept",
  "tone": "partly",
  "type": "text",
  "markdown": "### Educate, then reward, then commit\n\nA long first-time page (“Invest in 24K Gold”, a returns calculator, delivery, FAQs), a **“Pick your reward”** step inside setup, multiple SIPs, home-page nudges and a “Grow it as you go” step-up. Rewards and education are real levers, and nudges for lapsed savers survived. But every extra choice sat *before* the commitment — the start of our first real disagreement (see “Rewards” below)."
 },
 {
  "id": "bd05ac35-0a6d-4538-9c34-bb6e9e2025de",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_1.webp",
    "caption": "**Invest in 24K Gold**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_2.webp",
    "caption": "**Start a Gold SIP**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_3.webp",
    "caption": "**Pick your reward**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_4.webp",
    "caption": "**A regular gold investor now**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_5.webp",
    "caption": "**SIP detail**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dB_6.webp",
    "caption": "**Stop this Gold SIP?**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "6e97fe40-7d62-491a-a2c2-e84a494b0b00",
  "type": "insight",
  "label": "Wave 1 · Nudges and education",
  "heard": "We were biased toward the prospectus side: a long first-time page, education and nudges at several steps. Users were not sold. None of it felt like it made **buying** any better, and that told us where to stop adding.",
  "quote": "",
  "changed": "Most of the nudges came out of the buy journey. Only the ones for lapsed savers survived, outside the purchase."
 },
 {
  "id": "29392640-0787-45c2-a985-b7e6617af9f5",
  "type": "insight",
  "label": "Wave 1 · Pick your reward",
  "heard": "Choosing between **1%, 3%, 6% or 12% back**, right after picking an amount and a frequency, confused people. Every option came with its own condition: stay for 9 payments to earn 6%, and so on. Users could not hold the rules in their head long enough to choose.",
  "quote": "",
  "changed": "Rewards stopped being a choice. Offers apply automatically, and the SIP’s own reward became one dated milestone on the tracker (see “Rewards” below)."
 },
 {
  "id": "17c21f0f-99e4-4b2e-a711-6fa630a27bbd",
  "tag": "Wave 1 · Dropped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### Celebrate the plan, not the gold\n\nA review screen titled “Thank you for investing with us” and a “Congratulations on choosing disciplined investing” success page. The review thanked people before anything was charged; the success page talked about the user rather than what had just happened. Both were rewritten around **state honesty**."
 },
 {
  "id": "10c003df-4ce0-4d9b-bab8-397562d1e64a",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_1.webp",
    "caption": "**SIP, with projected value**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_2.webp",
    "caption": "**Review and confirm**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_3.webp",
    "caption": "**A step away from discipline**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_4.webp",
    "caption": "**Congratulations**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_5.webp",
    "caption": "**SIP detail**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dC_6.webp",
    "caption": "**Stop this Gold SIP?**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "43e6535f-c103-4a84-8402-92c91e193d80",
  "type": "insight",
  "label": "Wave 1 · Projected value",
  "heard": "Users liked seeing what their SIP could grow into, but **two different numbers on one screen** confused them. What they needed to be sure of was the amount leaving their bank on each date. In the Gullak-style iteration, the projection took over the whole screen.",
  "quote": "",
  "changed": "The instalment amount became the hero of the buy page. The projection moved into a supporting, tap-to-open breakdown."
 },
 {
  "id": "cb2d929b-56ff-4dc0-af41-1e6f01302db5",
  "tag": "Wave 2 · IA reset",
  "tone": "partly",
  "type": "text",
  "markdown": "### Black and white, one question per screen\n\nWe stripped colour and re-cut the IA: amount first, one “Choose your SIP day” sheet, payment, review, and a **weekly SIP tracker** on the detail page. The schedule-as-a-sheet and the tracker survived. Three stacked controls (SIP/One-time, Weekly/Monthly, SIP-day dropdown) were still too much — the dense decision screen became our main open problem."
 },
 {
  "id": "988f02d0-b5a4-485a-9a7f-97bdb834b1d2",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_1.webp",
    "caption": "**Amount, monthly**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_2.webp",
    "caption": "**Choose your SIP day**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_3.webp",
    "caption": "**Review: 5% every 4th instalment**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_4.webp",
    "caption": "**Your gold SIP is active**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_5.webp",
    "caption": "**Weekly SIP tracker**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dD_6.webp",
    "caption": "**Stop this Gold SIP?**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "01117f3b-a413-4b6c-8827-f2d77d4963a1",
  "tag": "Wave 2 · Partly kept",
  "tone": "partly",
  "type": "text",
  "markdown": "### Processing everything\n\nA processing state for every instalment, a “Keep your Gold SIP going?” nudge and a gauge-style yearly tracker. A processing state on every instalment over-promised what the system knew in real time, so we cut it and let the backend own retries — keeping one only where someone is actually waiting: the first payment (see the final design)."
 },
 {
  "id": "63f41a3d-89a2-499c-89e7-679d9875c522",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_1.webp",
    "caption": "**Amount, 5-year value**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_2.webp",
    "caption": "**Processing your SIP**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_3.webp",
    "caption": "**Processing payment**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_4.webp",
    "caption": "**Your gold SIP is active**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_5.webp",
    "caption": "**2026 Gold SIP tracker**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dE_6.webp",
    "caption": "**Keep your Gold SIP going?**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "573d4f4a-0500-49ad-be15-54b9d6300c18",
  "tag": "Wave 3 · Became the spine",
  "tone": "kept",
  "type": "text",
  "markdown": "### One buy page, two intents\n\nOne-time and SIP on the **same page**, a short first-time intro, a projection breakdown and a 5-year exit-intent sheet. This became the spine of the final design. What changed: a big “3% EXTRA GOLD GUARANTEED” sheet read like a discount on the purchase, when it's really a leasing yield (see “Leasing” below)."
 },
 {
  "id": "1f76afc2-fad4-4145-8d93-e98c439e3645",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_1.webp",
    "caption": "**Setting up: earn 3% extra**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_2.webp",
    "caption": "**One-time**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_3.webp",
    "caption": "**Daily SIP**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_4.webp",
    "caption": "**Monthly SIP: pay and start**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_5.webp",
    "caption": "**3% extra gold, guaranteed**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/dF_6.webp",
    "caption": "**Exit intent: 5-year value**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "9adacb9c-eee8-4492-88e0-b0578579c7b0",
  "type": "insight",
  "label": "Wave 3 · Exit-intent sheet",
  "heard": "The 5-year exit sheet, with its purple header, three list items and a Leave anyway / Continue choice, **frustrated** users. They had just set an amount, tapped back, and were suddenly asked to read numbers and copy before they could leave.",
  "quote": "",
  "changed": "Leaving the buy page now offers one light thing, a price alert, once per session. The heavier “are you sure?” moment was saved for stopping a SIP, and rewritten (see “The final exit nudge”)."
 },
 {
  "id": "b4a00d9e-3d30-4726-bbd2-7a829b0ac817",
  "nav": "Decisions",
  "type": "text",
  "anchor": "decisions",
  "markdown": "## The decisions that shaped it\n\nMost of the value in this project came from a handful of contested calls. For each: the tension, what I recommended, and what we gave up.",
  "navHideMobile": false
 },
 {
  "id": "cd47fcc3-f426-4c8c-8ffa-fe1386a2b0f8",
  "call": "**The call:** Option B. The PRD made SIP the primary job and one-time buying an activation guardrail — the page structure should say the same thing.",
  "type": "decision",
  "aBody": "A separate “Start Gold SIP” flow next to Buy. Clear — but two doors to the same gold, and SIP stays something you go looking for.",
  "bBody": "One buy page with One-time and SIP tabs. SIP opens by default; one-time is a tap or a swipe away.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_sip_weekly.webp",
    "caption": "**Final:** the buy page opens on SIP, set to weekly."
   }
  ],
  "title": "SIP is the default, not a second product.",
  "aLabel": "Option A",
  "bLabel": "Option B",
  "kicker": "Product shape",
  "columns": 1,
  "markdown": "The cheapest way to change behaviour is to change the default. Amounts carry across tabs (Đ500 one-time stays Đ500 a week); an amount too small for SIP resets to the SIP default instead of throwing an error. **Trade-off:** we had to watch one-time activation in case the default cannibalised it."
 },
 {
  "id": "fe46034a-c641-4f0a-a71f-8dc5d76eb097",
  "call": "**The call:** default to Weekly. Daily, Weekly and Monthly live in one “How often?” sheet opened from the schedule line, so the page carries one control instead of three.",
  "type": "decision",
  "aBody": "Indian users know SIPs as monthly, salary-day instalments. Monthly is the obvious default, and what most competitors lead with.",
  "bBody": "45% of repeat gaps were under 24 hours; only 4.9% sat in a monthly window. Our heaviest users buy in short bursts.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_howoften_weekly.webp",
    "caption": "**“How often?”** A looping day slider; first buy today, next on your day."
   }
  ],
  "title": "Weekly by default — even though “SIP” means monthly.",
  "aLabel": "Instinct",
  "bLabel": "Evidence",
  "kicker": "Cadence",
  "columns": 1,
  "markdown": "Design to observed behaviour, not to the category's vocabulary — and collapsing cadence into a sheet fixed the three-stacked-controls problem. **Open conflict:** the PRD scoped Daily out of v1. I kept it designed so turning it on is configuration, not a redesign."
 },
 {
  "id": "eeebea98-328e-4e1a-b3ff-656716b79f9c",
  "call": "**The call:** offers apply automatically and show in the grams line (+2% one-time, +5% on SIPs, each capped). The SIP's own reward is one dated milestone on the tracker: “5% extra gold on your 5th buy”.",
  "type": "decision",
  "aBody": "Let people pick a reward during setup, and lock them in with progressive cashback — 1% on the 3rd instalment rising to 12% on the 12th, forfeited if you miss a payment.",
  "bBody": "A picker adds a decision before the commitment. Forfeiture punishes exactly the users we most need to keep — the ones who miss a week.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-gift-next.webp",
    "caption": "**Reward as a milestone**, where the habit lives."
   }
  ],
  "title": "Rewards are applied, never chosen.",
  "aLabel": "PM's position",
  "bLabel": "My position",
  "kicker": "Rewards",
  "columns": 1,
  "markdown": "The first reward arrives in weeks, not a year, and missing a payment never wipes out progress. **Trade-off:** we gave up the lock-in of an escalating scheme for trust and simpler offer maths."
 },
 {
  "id": "4fe52cf8-a349-4963-b0e1-c7488a4ceb10",
  "type": "insight",
  "label": "Why people start a SIP",
  "heard": "When we asked what they think about while setting up a SIP, users talked about **goals** first. Our hunch held up: they want to know what the money adds up to, and then plan the SIP around that.",
  "quote": "“I have this goal, I have that goal, and because of that I want to start the SIP.”",
  "changed": "We kept the future number, but made it a plan people can read rather than a promise. That is the decision below."
 },
 {
  "id": "ac13380a-b8a9-47f9-9791-082c88a9ec76",
  "call": "**The call:** keep the future number, but break it into Invested, Price growth and leasing earned at 1, 3 and 5 years — with “Assumes 12% growth a year. Not guaranteed.” printed under it.",
  "type": "decision",
  "aBody": "Gullak anchors on one big future number. It's the most persuasive thing on the screen.",
  "bBody": "Gold returns aren't guaranteed. One big number on a money screen reads as a promise.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_growth_tap.webp",
    "caption": "**Growth sheet.** Tap a bar to see the split."
   }
  ],
  "title": "Sell the outcome — and show your working.",
  "aLabel": "Founder's reference",
  "bLabel": "Trust",
  "kicker": "Honest projections",
  "columns": 1,
  "markdown": "The projection ends on a total, not a percentage, because people plan in dirhams. Splitting price growth (uncertain) from leasing (contractual) let us be persuasive and honest in one chart. **Trade-off:** a smaller headline effect."
 },
 {
  "id": "f989077c-0ffa-4f63-b98a-259fbb202255",
  "call": "**The call:** remove the claim from the purchase. Say it with a quiet strip that rises once from under the keypad and stays: “Your gold earns 3% extra gold, every year”.",
  "type": "decision",
  "aBody": "A loud “3% EXTRA GOLD GUARANTEED” sheet and a footer link inside the purchase. People read it as 3% more gold on this buy.",
  "bBody": "It's the Gold Leasing yield — 3% a year, paid in gold over time. It is never added to a purchase.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/offers__3-2c-up-and-it-stays.webp",
    "caption": "**Leasing strip.** Rises once, stays."
   }
  ],
  "title": "“3% extra gold” is a yield, not a discount.",
  "aLabel": "Before",
  "bLabel": "Reality",
  "kicker": "Leasing",
  "columns": 1,
  "markdown": "Offers (which change *this* purchase) and leasing (which changes your holdings over time) needed different visual grammar, or neither could be trusted. **Trade-off:** on very short phones the strip is dropped — leasing is still on, just not said here."
 },
 {
  "id": "09d80bf1-8e50-46db-bc74-5d806dff9c2c",
  "call": "**The call:** ship with Stop only. Keep the rest designed and parked so v1.1 is configuration, not a redesign.",
  "type": "decision",
  "aBody": "Step-up, pause, skip-next-buy, resume, edit amount, cadence and card — the full lifecycle.",
  "bBody": "One mandate per plan, idempotent instalments, retries on day +1 and +3. Every extra lever is a new mandate state.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sipdetails__stopped-overview.webp",
    "caption": "**Stopped.** History kept; a fresh start offered."
   }
  ],
  "title": "Stop is the only lever in v1.",
  "aLabel": "What I'd designed",
  "bLabel": "What we could ship safely",
  "kicker": "Scope",
  "columns": 1,
  "markdown": "A pause we can't honour perfectly is worse than no pause, and fewer states meant fewer ways for the tracker to lie. **Trade-off:** the exit nudge lost its best alternative, “take a break” — which shaped the final exit nudge."
 },
 {
  "id": "978c5ffa-bfa8-4926-9fff-1094cd3fd027",
  "call": "",
  "type": "decision",
  "aBody": "",
  "bBody": "",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/s_e7_exit.webp",
    "caption": "**Loss framing**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nx_1.webp",
    "caption": "**Take a break**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nx_2.webp",
    "caption": "**Stop vs keep**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/n_exit_b.webp",
    "caption": "**A short pause**"
   }
  ],
  "title": "Four ways to ask “are you sure?”",
  "aLabel": "",
  "bLabel": "",
  "kicker": "Exploring the exit",
  "columns": 4,
  "markdown": "Stopping is the most important moment in a recurring product, so the exit nudge went through more rounds than any other sheet. Each exploration answered the question differently — and each ran into a constraint.\n\n- **Loss framing.** A table of what you give up — penalty none, gold stays yours, history kept, “Your 12% reward: **Lost**”. Effective on paper, corrosive to trust, and built on a reward model we later dropped.\n- **Take a break without stopping.** Skip just the next instalment, pause for a month, or lower the amount (“could still be worth Đ19,000 in 5 years”). The kindest option — but pause, skip and step-down weren't in v1.\n- **Stop vs keep, in numbers.** Đ1,000 invested so far against Đ17,936 it could add in five years. Persuasive — but accumulated value and projections weren't allowed here, because vault holdings don't map one-to-one to a SIP.\n- **A short pause.** 1 or 2 months, “instead of stopping wealth growth”. Simpler, but still a lever the engine couldn't honour in v1."
 },
 {
  "id": "84f17b24-96cd-4089-bd94-e16f4329b425",
  "call": "**The call:** remind people what the SIP does for them — Zero effort · Averaged price · Steady growth — with “Keep my Gold SIP” as primary and a guilt-free “Stop anyway”.",
  "type": "decision",
  "aBody": "“Your 12% reward: Lost.” Classic retention copy — and the kind that makes people screenshot your app for the wrong reasons.",
  "bBody": "No pause to offer, and no accumulated value or projection allowed here — holdings don't map to a SIP, since users can sell vault gold anytime.",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/skipstop__idea-14b-on-autopilot-simplified-copy.webp",
    "caption": "**The final exit nudge.**"
   }
  ],
  "title": "From “you'll lose” to “here's what it's been doing”.",
  "aLabel": "Loss framing",
  "bLabel": "Constraints",
  "kicker": "The final exit nudge",
  "columns": 1,
  "markdown": "Gain framing keeps the decision with the user. The four explorations above each depended on something v1 couldn't honour; this is what survived — the emotional core, without the levers. **Trade-off:** possibly a lower save rate than a loss-framed sheet — worth measuring, not worth the trust."
 },
 {
  "id": "c7a9d650-fdb6-410b-8a3f-433bd9a49ce7",
  "nav": "Descoped",
  "type": "text",
  "anchor": "cut",
  "markdown": "## Other nudges — and what we cut\n\nA SIP lives or dies on what happens around setup: the weeks after setup, the moment they come back, and the moment they consider doing more. Beyond the exit nudge (covered above, with the decisions), I explored four more. All four were descoped so v1 could ship the core loop well.",
  "navHideMobile": true
 },
 {
  "id": "399e4241-2dd7-42da-8dda-aaa913ac34a1",
  "tag": "Descoped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### Step-up — “Grow it as you go”\n\nAfter the first few instalments, offer to raise the SIP automatically — 10% every six months by default, user-editable, with the next three amounts previewed before you turn it on. Offered after setup, never inside it, so it couldn't slow the first commitment.\n\n**Why it was cut:** step-up was an explicit PRD non-goal for v1, and every raise needs re-authorising the card mandate above its registered ceiling. It's designed and parked for when the base habit is proven."
 },
 {
  "id": "42f707c4-e6da-46b7-be10-0aa7614392b3",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/s_e8_stepup.webp",
    "caption": "**Grow it as you go.** Raise every 6 months."
   }
  ],
  "layout": "plain",
  "columns": 1
 },
 {
  "id": "f7b343e9-b0de-4338-a6af-125278178091",
  "tag": "Descoped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### A reward that greets you when you come back\n\nWhen the 5% gold cashback lands and the user hasn't opened the app for a couple of days, the next visit opens on a gifting-style moment — “Reward credited · 5% Gold Cashback · on your last Đ200 SIP instalment” — as a modal or a full-screen takeover over the Aspora home.\n\n**Why it was cut:** it lives on the shared Aspora home, outside the gold surface, and the PRD deferred reward-led moments to a central reward engine. For v1 the reward shows up where the habit lives — on the tracker and in the ledger."
 },
 {
  "id": "8a1549f3-0ea4-4a31-a495-82086d166317",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nc_1.webp",
    "caption": "**On the Aspora home**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nc_2.webp",
    "caption": "**Reward modal**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nc_3.webp",
    "caption": "**Full-screen celebration**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "ce6aaaad-8622-4d79-a7b7-b72c147ca968",
  "tag": "Descoped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### A goal-led SIP nudge on the Gold home\n\nFor people who own gold but haven't started a SIP, the Gold home would carry a goal widget instead of a plain banner: “Regularly invest in gold” with swipeable monthly amounts, “Plan your gold goal” (wedding gold, a child's future, a home in India), and a tola version — “6.65 tola in 5 years” — built on the existing ruler slider. Tola, not grams, because that's how our users talk about gold.\n\n**Why it was cut:** v1 already made SIP the default on the buy page, which covered the same intent with less surface. Goal-based plans were also an explicit PRD non-goal, so the widget would have promised something the product didn't do yet."
 },
 {
  "id": "1e5d01d2-a61b-462d-9629-2912d0f37f49",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_1.webp",
    "caption": "**Swipe monthly amounts**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_2.webp",
    "caption": "**Plan your gold goal**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_3.webp",
    "caption": "**6.65 tola in 5 years**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_4.webp",
    "caption": "**Tola, with the ruler slider**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_5.webp",
    "caption": "**Tola, with a reward badge**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nh_6.webp",
    "caption": "**Own 6.65 tola**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "c84b3735-a7be-40f1-8a48-1350949f6a2c",
  "tag": "Descoped",
  "tone": "dropped",
  "type": "text",
  "markdown": "### Long-term gratification on the SIP detail page\n\nThe most ambitious idea: a detail page that changes over time. A **Gold SIP Album** of collectible cards — “Your moments” (Day one, and milestones every saver reaches at the same pace) and “Then and now” (“you now hold about as much gold as… a Vijayanagara fanam”, from the 0.03 g in a smartphone to a 1 kg bar) — plus “Watch your gold stack up” at today, 3 and 5 years. Day one, three months in and a daily SIP each get a different page.\n\n**Why it was cut:** the album needed a content system (copy, illustration and trigger rules for 25 cards) and backend milestones that v1 didn't have. The detail page shipped with the tracker and the growth carousel; the album is designed and parked for v1.1."
 },
 {
  "id": "a818250a-6b44-4e9b-bc9b-146535cda664",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nl_1.webp",
    "caption": "**Day one**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nl_2.webp",
    "caption": "**Three months in**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/nl_3.webp",
    "caption": "**A daily SIP**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "503f2dc5-617a-46e3-8305-807c717b86d3",
  "type": "text",
  "style": "intro",
  "markdown": "Each of these was weighed against one test — **does v1 need this to form the habit?** — and the answer was “not yet”. They're the v1.1 backlog, already designed."
 },
 {
  "id": "91bbdf8f-2cc2-40c2-bbbe-7ef76afbb249",
  "nav": "Final",
  "type": "text",
  "anchor": "final",
  "markdown": "## The final design — six moments\n\nDiscover, set up, pay, celebrate, live with it — and sell. Each moment had its own job, and its own definition of honest.\n\n### Discover: a Gold home that changes with you\n\nThree states — no SIP yet, SIP active, past SIPs only. A new user sees Start SIP marked as new; an active saver gets a “Your SIP” tile with its live count; a lapsed saver is invited to create a new one. Home transactions show only *successful* instalments with a SIP pill; skipped or retrying buys live in the SIP's own ledger, where they have context.",
  "navHideMobile": false
 },
 {
  "id": "1f91678d-1e6b-4f20-9cc3-49766ac456e8",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/vault__gold-home-no-sip-yet.webp",
    "caption": "**No SIP yet.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/vault__gold-home-sip-active.webp",
    "caption": "**SIP active.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/vault__gold-home-past-sips-only.webp",
    "caption": "**Past SIPs only.**"
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "effd0568-068a-460f-abf0-c8d905f515c0",
  "type": "text",
  "markdown": "### Set up: one page, one decision at a time\n\nThe buy page carries exactly what you need to commit: the locked price, One-time / SIP tabs, the amount with quick-pick chips, one schedule line — “Every week on Monday” — and a button that states the commitment in plain words: **“Start Đ100 a week”**. Grams update on every keypress; minimum errors wait until you stop typing so nobody is scolded mid-number. Pick the 31st and the sheet tells you shorter months buy on their last day."
 },
 {
  "id": "bc06373c-1d13-47ea-b433-9a90340dd38b",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_sip_weekly.webp",
    "caption": "**SIP, weekly.** The default."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_howoften_weekly.webp",
    "caption": "**How often?**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_monthly_31.webp",
    "caption": "**The 31st,** said out loud."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_growth.webp",
    "caption": "**Growth.** 1, 3, 5 years."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_order_summary.webp",
    "caption": "**Order summary.**"
   }
  ],
  "layout": "tray",
  "columns": 5
 },
 {
  "id": "168829a7-3379-4799-aba0-ec8fc64ddfb5",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_onetime.webp",
    "caption": "**One-time.** A tap or swipe away."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/f_festive.webp",
    "caption": "**Festive price.** Combines with offers."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/exit__5-1a-exit-price-alert.webp",
    "caption": "**Leaving?** Set a price alert — once per session."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/offers__3-2c-up-and-it-stays.webp",
    "caption": "**Leasing strip.**"
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "b79aad63-22c8-4de3-95aa-3cb3399ab219",
  "type": "text",
  "markdown": "### Pay: when the first payment is still processing, or fails\n\nMost first payments confirm in seconds. When one doesn't, the worst thing we could do is hold someone on a spinner — or celebrate a plan that might not exist. So the flow says exactly what the system knows:\n\n- **Still processing.** “We're setting up your SIP — setup is running safely in the background. Go to your vault anytime.” No certificate, no celebration yet; View details and Go to vault are both safe exits.\n- **The SIP page while it's processing.** The header reads *Processing*, the calendar shows a sync mark, and the summary is honest: Buys 0, next buy Mon 19 Oct. No tracker until the first buy is confirmed — nothing to tick yet.\n- **If it fails.** The header turns to *Failed* and the calendar carries a cross. The schedule and next-buy line disappear, because there is no schedule to keep; only the SIP details stay, so the user can see exactly what was attempted.\n\nThis is the one place I kept a processing state after cutting it everywhere else — because it's the one moment someone is actually waiting."
 },
 {
  "id": "d56087c6-6521-4606-be7e-7984a16d2fc2",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/fp_setting_up.webp",
    "caption": "**Setting up.** Running safely in the background."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/fp_processing.webp",
    "caption": "**Processing.** Buys 0; no tracker yet."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/fp_failed.webp",
    "caption": "**Failed.** No schedule promised."
   }
  ],
  "layout": "tray",
  "columns": 3
 },
 {
  "id": "1d45c0d0-433e-4b74-9d23-e0bcdc9967dd",
  "type": "text",
  "markdown": "### Celebrate: a certificate, not confetti\n\nGold is physical and personal, and users had singled out the certificate in research, so the success moment is a **Certificate of ownership** with your name and the exact grams — shareable and quietly premium. SIPs land on “Your weekly saving is on” with today's grams, the next buy and the card; then one sheet rises with exactly one next step. Names never shrink or wrap — they step down from full name to initials to first name. Buttons fade in only after the sheet lands, and Reduce Motion cross-fades everything."
 },
 {
  "id": "dd46a4e3-1551-40dd-94e2-0fe38d42a959",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-1a-gold-added-the-certificate-lands.webp",
    "caption": "**The certificate lands.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-1b-the-cross-sell-reward-sheet.webp",
    "caption": "**One next step.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-2a-weekly-saving-is-on-lands.webp",
    "caption": "**Your weekly saving is on.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-5d-still-too-long-first-name-only.webp",
    "caption": "**Long names** never wrap."
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "76bb0449-dffe-4b27-8320-728395b2b392",
  "type": "text",
  "markdown": "### Live with it: a page worth opening in week nine\n\nThe SIP detail page is built around a **tracker** — a swipeable strip of dates, each a past buy, today or a future buy, with the next reward pinned to its date. It has honest states for every situation: starting, building, gift next, gift earned, retrying, missed, skipped, cap reached, stopped. Below it, a carousel argues for the habit: where Đ100 a week could take you, and your average buy price against today's."
 },
 {
  "id": "927e33ef-d97d-4d6a-b1ee-d90d4e9f3889",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-starting.webp",
    "caption": "**Starting.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-building.webp",
    "caption": "**Building.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-gift-earned.webp",
    "caption": "**Gift earned.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-retrying.webp",
    "caption": "**Retrying.** No action needed."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__tracker-missed.webp",
    "caption": "**Missed.** Said plainly."
   }
  ],
  "layout": "tray",
  "columns": 5
 },
 {
  "id": "8f84b022-a7c2-40b8-a2de-d676b907d170",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/states__carousel-power-average-below-today.webp",
    "caption": "**The power of SIP.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sipdetails__weekly-overview.webp",
    "caption": "**Full overview.**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/txns__6-3-reward-just-landed-new-row.webp",
    "caption": "**Rewards** land in the ledger."
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/siplist__l1-next-buy-first-stopped-last.webp",
    "caption": "**Your SIPs.** Next buy first."
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "b47c9457-60c4-4f8d-b0b6-c11ef68e8300",
  "type": "text",
  "markdown": "### Sell: the same calm, in reverse\n\nSelling got the same grammar as buying, so nothing has to be relearned: one page, the locked sell price at the top, your holding under the amount, and quick picks for 25%, 50%, 75% or all of it. You can sell by amount or by weight; ask for more than you own and the page says so before you can continue.\n\nThe confirm sheet is transparent about what you get — sell price per gram, grams, processing fee and the amount that reaches your bank within 24 hours. When you're selling below your average buy price, it says so plainly instead of hiding it. First-time sellers without a bank account are asked to add one before they can sell, not after."
 },
 {
  "id": "a28d3e32-617f-4117-a8ae-fe561cc5c28f",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sl_1.webp",
    "caption": "**Sell by amount**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sl_2.webp",
    "caption": "**Sell by weight**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sl_3.webp",
    "caption": "**Sell all**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sl_4.webp",
    "caption": "**More than you own**"
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "69603390-50c6-487e-8634-ca57e3f64429",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sp_1.webp",
    "caption": "**Confirm your sale**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sp_2.webp",
    "caption": "**Confirm, at a loss**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sp_3.webp",
    "caption": "**Choose where the money goes**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/sp_4.webp",
    "caption": "**First sale, no bank account**"
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "b677b78c-90ce-455e-9e8e-2ffdb599f241",
  "type": "text",
  "anchor": "craft",
  "markdown": "## The unglamorous half\n\n### One certificate, every screen height\n\nThe certificate is the emotional payoff of the first buy, and many of our users are on older, smaller phones. Rather than let it scroll or crop, the layout adapts to the height available. On a **874 pt** screen it shows in full, with the large seal, name, grams and purity above the “Start small. Grow big” projection. At **812 pt** the seal shrinks and the spacing tightens, so the projection still starts in the first view. **Never removed:** the name, the grams, the purity line, and the View details and Share actions."
 },
 {
  "id": "4a37d437-70a7-492d-84f7-2f860250afa9",
  "type": "text",
  "markdown": "### Limits without dead ends\n\nUAE gold has a Đ55,000 lifetime buy limit before extra verification. Instead of failing at payment, the page explains it in context — what you've bought, what's left, and what to do: buy what's left now, or unlock higher limits with a call-back within a working day. A weekly plan that will hit the limit only warns when **three or fewer buys remain**, so nobody is nagged a year in advance."
 },
 {
  "id": "a1d13932-dd8d-43e1-8cee-3e223ffe969c",
  "type": "gallery",
  "items": [
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-4a-874-pt-full.webp",
    "caption": "**874 pt · Full**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/afterpay__7-4b-812-pt-smaller-seal.webp",
    "caption": "**812 pt · Smaller seal**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/edge__6-4f-weekly-a-plan-that-will-reach-the-limit.webp",
    "caption": "**Plan will reach the limit**"
   },
   {
    "url": "https://iirjcxslhdclsxfzixes.supabase.co/storage/v1/object/public/media/case-studies/aspora/edge__6-4a-over-the-limit.webp",
    "caption": "**Over the limit**"
   }
  ],
  "layout": "tray",
  "columns": 4
 },
 {
  "id": "62d52c9e-3d61-44d7-b1de-6f65865b17bd",
  "type": "text",
  "markdown": "### A system, not a set of screens\n\n- **Components with every state.** Price title, frequency tabs, schedule line, keypad, payment row, leasing and offer strips, sheets and certificate parts — built once; screens use only instances.\n- **Motion with timing tables.** Every animation plays once, sits beside its flow with a timing table, and cross-fades under Reduce Motion.\n- **Specs that answer questions.** Screen-reader order, number formatting (grams rounded *down* so we never show more gold than was bought), and analytics events with a shared prefix."
 },
 {
  "id": "a7b912ba-5b04-4eaf-b457-e85cad99addd",
  "nav": "Impact",
  "type": "text",
  "anchor": "impact",
  "markdown": "## Impact\n\nWe anchored success to the numbers the business already lived by, drawn straight from the PRD.\n\n| Metric | Baseline | Target |\n|---|---|---|\n| SIP funnel conversion | ~3% | 7% in 3 months |\n| M1 retention (UAE) | ~30% | 60% · ~80% SIP |\n| M+3 SIP retention | 17% | 60% |\n| Sell-to-buy ratio | 76% | < 40% |\n| SIPs signed up | 0 | ~3,500 in 3 months |\n| Recurring inflow | 0 | ~Đ350k / month |",
  "navHideMobile": true
 },
 {
  "id": "6bb1db6f-0d9b-486e-b7fb-abd90899ee03",
  "type": "text",
  "anchor": "takeaways",
  "markdown": "## Takeaways\n\n- **Competitors show you screens, not strategy** — copying feature sets gave us density; asking what each app anchors on gave us direction.\n- **Black and white first saves weeks** — grey-box reviews moved the debate from styling to structure.\n- **Recurring products are won after setup** — the tracker, the ledger and the exit mattered as much as the buy page.\n- **Honesty is a growth feature** — not thanking people before charging them, and saying returns aren't guaranteed, built the trust a weekly mandate needs.\n- **Cutting scope is a design decision** — parking step-up and pause let us ship sooner, with fewer ways for the product to lie.\n\n### What I'd do differently\n\n- Settle the offer model with the PM *before* designing reward UI — we redesigned reward surfaces three times as the maths changed.\n- Put the dense decision screen in front of real users in week two, not week six.\n- Agree the leasing vocabulary once, across product, marketing and legal, and enforce it in the component library.\n\n### What's next\n\n- Turn on the parked levers: pause, skip, step-up and card change.\n- Ship the Gold SIP Album and the comeback reward once the central reward engine lands.\n- The same engine for silver, then equities."
 }
]$cs$::jsonb,
    updated_at = now()
where slug = 'gold-sip';
