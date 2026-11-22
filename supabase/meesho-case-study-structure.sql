-- Meesho (multi-supplier checkout) case study: rebuilt as content blocks in the fixed case study format.
--  1 Overview · 2 Problem (with who the user is) · 3 User research · 4 Current state and analysis
--  5 Process · 6 How we arrived at the solution · 7 How we validated it (+ takeaways)
-- Adds a section menu with the same 7 parts. Copy and images come from the existing page. The old markdown
-- body is kept untouched as a backup.
-- Run once in Supabase → SQL Editor. If it warns about Row Level Security, choose "Run without RLS".

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
