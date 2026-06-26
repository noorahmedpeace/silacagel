# DryGelWorld SEO & AI-Search Review — Final Report

*Prepared for the site owner. Plain-English, action-first. Site: DryGelWorld silica gel (Next.js).*

---

## 1. Executive Summary

**The good news first: this is a genuinely well-built site.** The technical foundation is stronger than most B2B sites of this size — clean canonical tags, a real (not faked) sitemap, correct www redirects, a rich and honest `llms.txt` file for AI assistants, modern image formats, deep structured data (Organization, FAQ, HowTo, BreadcrumbList), 41 in-depth blog articles, 9 excellent comparison pages, and an honest, disciplined approach to certification claims. You are not starting from zero — you are starting from a solid B+ and the work below is about closing specific, high-value gaps.

**The one finding that matters most:** Your stated #1 goal is to rank for "buy silica gel" type searches. **No page on the site is built for that intent.** You have ~70 pages targeting "manufacturer / supplier / exporter / wholesale," but every commercial page funnels visitors to "request a quote before price negotiation" — the exact opposite of buy-now intent. The site literally has no destination for the search you most want to win, so it cannot rank for it today.

### The 5 biggest opportunities

1. **Create the missing "buy" pages.** Ship `/buy-silica-gel` and `/silica-gel-price` (and reframe `/bulk-sales`). These are the money pages you don't currently have. This single gap is the biggest blocker to your #1 goal.
2. **Make the homepage commercial.** The homepage has no custom title/description metadata at all, and its main heading ("Worldwide silica gel desiccants for industrial moisture protection") contains zero buying intent. Rework the heading and add metadata.
3. **Verify AI bots are not blocked.** A Vercel edge setting can silently block ChatGPT, Claude, and Google's AI crawlers — which would waste your entire `llms.txt` investment and kill your #2 goal (AI citation). This is a 2-minute check that gates everything else.
4. **Fix the embarrassing live content leak.** 5 of your 8 industry pages are publicly showing internal editorial instructions (e.g. "Build landing-page copy around buyer losses…") as visible body text, on pages that are in your sitemap. This must be fixed immediately.
5. **Resolve factual contradictions across the site.** Strip sizes, indicating-gel availability, and certifications disagree between your data file, homepage, and `llms.txt`. Contradictions actively cause AI assistants to mis-cite you or skip you entirely.

---

## 2. Critical & High-Priority Issues

*Merged across all clusters and both strategy documents; deduplicated; sorted by severity.*

| Severity | Page / Area | Issue | Fix |
|---|---|---|---|
| **Critical** | Whole site (strategy) | **No page targets transactional "buy / price / for sale" intent.** Every commercial page funnels to "request a quote before price negotiation." The #1 ranking goal has no landing page. | Create `/buy-silica-gel`, `/silica-gel-price`, and (optionally) `/silica-gel-for-sale` via the `highIntentSeoLandingPages` factory so they auto-route, sitemap, and llms. Put exact keyword in slug/title/H1/first 100 words; dual CTA (Get Price + WhatsApp). |
| **Critical** | `robots.ts` + Vercel edge | **AI crawlers may be blocked at the CDN edge**, silently overriding your allow-all robots and defeating all AI-citation work. | Run `curl -A GPTBot https://www.drygelworld.com/robots.txt` and same for ClaudeBot. If Disallowed, turn OFF the Vercel "managed AI bots" toggle, then explicitly Allow GPTBot/ClaudeBot/Google-Extended/PerplexityBot/CCBot in `robots.ts`. |
| **Critical** | `industries/[industry]/page.tsx` | **5 of 8 industry pages leak internal editorial instructions as visible body copy** (e.g. "Route regulated inquiries into the RFQ form…") under a "What this page should prove to buyers" heading. Live, in sitemap (priority 0.7). | Author real `body` + `faqs` for leather-footwear, food-packaging, textile-garment, automotive-parts, defense (mirror the electronics/pharma template). Delete the fallback scaffold so missing content fails at build, not in public. |
| **Critical** | Homepage `page.tsx` | **No `export const metadata`** — the most important page can't set its own title/description/OG; it inherits the layout default. | Add metadata: commercial title ("Buy Silica Gel \| Manufacturer & Exporter — DryGelWorld"), 150–160-char description with CTA, `canonical: "/"`, homepage-specific OG/Twitter. |
| **Critical** | Homepage `page.tsx` H1 | **H1 has zero commercial intent**; the word "buy/purchase" appears nowhere in visible copy. | New H1: "Buy Silica Gel in Bulk — Manufacturer & Exporter Since 1983" (verify 1983). Add a transactional sub-line with "buy bulk / wholesale packets / request a quote" in the first 100 words. One H1 only. |
| **Critical** | `llms.txt` ↔ `product-data.ts` ↔ homepage | **Strip sizes contradict across 3 sources** (llms.txt: 1/2/3/5kg; product-data: 1kg only; homepage: 1/2/3/5kg). Guarantees AI mis-citation. | Pick the real SKU set, make `product-data.ts` the single source of truth, align llms.txt + homepage `skuRows`. |
| **High** | `seo-images.ts` `getLandingSeoImage` | **Every authored hero/OG image on ~60 landing pages is silently overridden** by a regex image picker; specific alt text is discarded. | Prefer `page.heroImage.src`/`.alt` when present; fall back to the picker only when absent. Restores per-page OG imagery (matters for AI/social cards). |
| **High** | Homepage schema | Homepage emits **only HowTo schema** — no WebSite (+SearchAction), no Organization, no LocalBusiness, no FAQPage on the site's most authoritative URL. | Add an `@graph`: WebSite + Organization (reuse `/about` `@id` to merge) + LocalBusiness (geo/hours/address already in data) + a 4–6 question FAQPage. |
| **High** | `products/[slug]/page.tsx` | **Product/Offer schema deliberately omitted** — no citable price/seller/availability anywhere, and rich `exportUsd`/`priceBand` data is never exposed. | Emit valid Product + Offer using PriceSpecification / AggregateOffer (`lowPrice` from `priceGroups`) + availability; omit only review/rating so it still validates. |
| **High** | Product page H1s | **Marketing-abstract H1s** ("Precision Grade Silica Gel," "Maritime Export Cargo Protection") match no buyer searches and risk cannibalization across the 4 near-identical SKUs. | Render keyword-first H1s ("Silica Gel Sachets (0.5g–20g)," "Container Desiccant Strips," "Bulk Silica Gel Beads") with the marketing name demoted to an eyebrow. |
| **High** | `products/page.tsx` | Products index H1 ("Choose the right moisture-control format…") has zero commercial keyword; **no ItemList schema**, no MOQ/price chips. | H1 → "Silica Gel Products & Desiccant Range — Buy by Format." Add ItemList JSON-LD; surface MOQ/lead-time/price-band chips per card. |
| **High** | ~50 factory landing pages | **Heavy boilerplate + cannibalization** — identical specsIntro, buyingSteps, CTA band, and 3-FAQ stubs across manufacturer/supplier/exporter/geo pages; Google can't pick a canonical. | Designate `/silica-gel-manufacturer` as canonical hub; give each sibling a distinct angle (production/QC vs stock/repeat vs Incoterms/ports vs local NAP); expand to 5–8 unique FAQs with concrete MOQ/lead-time. |
| **High** | `bulk-sales/page.tsx` | Title hard-codes "USA" with no US content (reads as stuffing); H1 ("Export quote planning…") has zero keyword; thin; no schema. | New H1: "Buy Bulk & Wholesale Silica Gel Desiccant." Drop "USA." Replace "Quote by requirement" cells with real tiers; add FaqBlock + WebPage/Breadcrumb JSON-LD; link to `/buy-silica-gel`, `/products`, `/export`. |
| **High** | `dispensers/page.tsx` | **Unverifiable claims** ("Replace 10 manual workers," "ROI in 6 months") contradict the site's careful claim-discipline and make the page AI-uncitable; both machine cards share one photo. | Remove/qualify the hard numbers; add distinct image for DT-1500; add schema + internal links, or noindex if off-topic. |
| **High** | `sitemap.ts` (blog loop) | **All 41 blog URLs share one global lastmod** — Google discounts freshness — even though real per-article dates already exist in data. | Wire `lastModified: new Date(getArticlePublication(slug).updatedAt)` per URL (also compare/case-study/product). |
| **High** | Blog template | **Zero in-prose internal links**; only CTA is "Request export quote." No bridge from informational content to commercial/money pages. | Add a typed inline-link mechanism so phrases like "silica gel sachets," "container desiccant strips" link into `/products/*` and `/buy-silica-gel`. Add a WhatsApp/sample CTA. |
| **High** | `layout.tsx` SearchAction | Sitelinks-searchbox advertises `/products?query=` but `/products` reads no query param — **non-functional structured data**. | Implement `searchParams.query` filtering on `/products`, or remove the `potentialAction` node. |
| **High** | `layout.tsx` hreflang | **No global x-default/en hreflang** despite targeting 19+ English export markets; geo-targeting left to chance. | Add `alternates.languages` with x-default + en self-reference on home; ensure `/export/[market]` cluster has x-default → `/export`. |
| **High** | `llms.txt` coverage & accuracy | Cites blog slugs that must exist verbatim (404 risk); REACH wording contradicts itself ("REACH-compliant in base form" vs "REACH not held"); omits case studies, 16 export markets, 4 industry pages, 21 of 41 articles. | Generate blog list programmatically from `blogArticles`; add case studies + per-market URLs + missing industries + new commercial pages; tighten REACH to one statement; add a build-time test that every cited URL is in the sitemap. |
| **High** | `industries/[industry]` breadcrumb | Breadcrumb "Industries" crumb points to `/industries/electronics-packaging` instead of `/industries` on **all 8 pages**. | Change to `{ name: "Industries", href: "/industries" }`. |
| **High** | Export market H1s/titles | No export page uses "Buy" — the commercial phrase sits only in the **dead `keywords` meta** Google ignores. | Work "Buy silica gel in <country>" into H1/title/first 100 words for priority markets (USA, UK, Germany, Canada, GCC). |
| **High** | `product-data.ts` (TODOs) | **Live `TODO: confirm real certifications` ships in production** for hair-nets/beard-covers; ISO 9001:2015 claim contradicts the "discuss compliance" stance on the same products. | Resolve the TODOs; make packingOptions and procurementDetails.documents agree; remove TODOs from shipped data. |
| **High** | Supporting pages FAQ schema | **Duplicate/near-identical FAQPage Q&A on 4+ pages** (SDS/COA, FDA/REACH/Halal, dosage, MOQ); `/documents` emits TWO FAQ schemas. Google deduplicates and may suppress all. | Own each topic on ONE page (compliance → `/certifications`; dosage → calculator); collapse `/documents` to a single FAQ source. |
| **High** | `bulk-sales` + `private-label` | Both are **thin money pages** — no real MOQ, lead time, pricing, proof, or schema. | Add FaqBlock (MOQ, lead time, samples, Incoterms), WebPage + Breadcrumb JSON-LD, concrete trust signals (ISO/SDS/COA, size range, volume tiers). |

---

## 3. Medium & Low Issues (grouped)

### Technical SEO
- **Per-entity sitemap freshness** also missing for compare/case-study/product loops (same fix as blog). Global `sitemapLastModified` is fine as a fallback only.
- **`/export/europe` invalid hreflang** `en-150` (and OG locale `en_150`) — drop non-country slugs from the hreflang map; guard OG locale to valid `xx_XX`, fall back to `en`.
- **Slug lists hand-mirrored in 3 places** (`INDUSTRY_SLUGS` in hub, sitemap, detail) — export from one `src/lib` module to prevent silent sitemap drift.
- **Missing OG/Twitter metadata** on 6 supporting pages (faq, documents, certifications, dispensers, private-label, bulk-sales) — add to match the calculator's pattern.
- **FAQ page missing breadcrumb JSON-LD** (every sibling has one) — add `breadcrumbJsonLd([Home, FAQ])`.
- **Contact page has no ContactPage/LocalBusiness JSON-LD** despite full NAP, maps, hours, geo — add it (best page for "silica gel supplier Karachi").
- **`compactSeoTitle` silently truncates** titles >60 chars, dropping secondary keywords — author titles ≤60 chars front-loaded so truncation never fires.
- **`companyGeo` is a placeholder** (24.9215, 67.095) — replace with the exact verified-GBP pin before emitting any LocalBusiness geo.
- **`/tools/container-desiccant-calculator`** is in sitemap — confirm it returns substantive indexable HTML and a self-canonical.
- **Entity image inconsistency** — Organization.image (bare .jpg string) vs LocalBusiness.image (OG webp). Standardize one ImageObject with width/height across nodes.
- **`isicV4: 8292`** is "Packaging activities" — use a chemical-manufacture code (e.g. 2029) if you actually manufacture the gel, to match the "manufacturer" positioning.
- **Dual static/dynamic landing-page systems** — add a build-time check that every `seoLandingPages` slug resolves to exactly one route and appears once in the sitemap.

### Structured Data / AEO
- **Service schema on landing pages not tied to a Product/Offer** — add Product+Offer to commercial landing pages; align breadcrumb name with the visible H1 (currently uses kicker).
- **Comparison-table renderer bug** — cells starting with `/` render "Open … page" inside the Protection-zone row of `container-desiccant-strips`; LLMs extract garbage. Keep cells descriptive; move cross-links to a dedicated row.
- **Duplicate FAQ entries** on `/compare/...calcium-chloride...` ("do strips replace packets" asked twice) — de-dup; replace with a distinct high-value question.
- **Case-studies hub has zero JSON-LD** and no breadcrumb — add CollectionPage + ItemList + BreadcrumbList (copy the `/compare` hub pattern). Add OG images to both hubs.
- **4 blog articles orphaned** from `blog-clusters.ts` (toxic, colors, rice-grain-spice, shelf-life) — add explicit cluster entries.
- **VideoObject schema** lacks embedUrl + duration; all 5 clips share one uploadDate and poster — add per-clip data; add YouTube embedUrl when live.
- **`llms.txt` discoverability** — it's a route handler with no inbound link and is absent from the sitemap. Add a footer link + `<link rel="alternate" type="text/plain" href="/llms.txt">`; consider `/llms-full.txt`.
- **Blog article bodies have no tables** even for clearly tabular topics — add an optional `table` field and render semantic `<table>` for vs-clay, vs-molecular-sieve, packets-per-box, HS-code, DIN-unit, regeneration articles. Add HowTo schema to the regeneration and packets-per-box guides.

### Content / E-E-A-T
- **Indicating (orange/blue) gel contradiction** — `llms.txt` says "NOT YET in catalog" but homepage bento + footer link to `/orange-silica-gel-supplier`, `/blue-silica-gel-manufacturer`. Decide: sell it or relabel as inquiry-only.
- **Headline stats lack provenance** — link ISO 9001:2015 to `/certifications` and "60+ countries" to `/export` with a "self-reported" qualifier across about/contact/header/llms; reconcile "since 1983" and "10+ million packets" everywhere.
- **Single org-only byline** on all 41 articles (author typed Organization) — add a named human reviewer (Person + LinkedIn `sameAs` + avatar ImageObject) and a visible "Reviewed by … on {date}." Biggest E-E-A-T upgrade available.
- **Author page Organization JSON-LD** has no `sameAs` and no logo — add company LinkedIn/GBP/trade-directory links and a logo ImageObject.
- **16 of 20 export markets** lack MOQ/lead-time/Incoterms/currency/FAQs — near-duplicate boilerplate. Populate at least USA/UK/Germany/Canada/Australia (restores FAQPage schema too).
- **`llms.txt` overstates the buyer guide** ("definitive 6000-word reference" / "30 min read" vs ~2,500–3,000 words) — expand the guide or correct the claim.
- **Buyer-guide / glossary breadcrumb** "Guides" node points at the page itself (two positions resolve to the same URL) — create a real `/guides` index hub.
- **Dispenser spec tables** mix concrete specs with vague placeholders ("Compliance: Buyer spec review") and soft claims ("cleanroom standards," "pharma-grade") with no named standard — replace or remove.
- **Case-studies hub duplicates full detail-page prose** under multiple H2s — show only teaser + link on the hub.

### CRO / Conversion
- **Hero CTAs jump to in-page anchors** (`#contact`/`#products`) instead of `/contact` and `/products` — point them to real pages for crawlable links + better conversion.
- **No WhatsApp/tel links** on export, compare, case-study pages despite WhatsApp being a primary channel — add `https://wa.me/923330223337` with prefilled message + a `tel:` link.
- **Quote form falls back to `mailto`** which often silently fails on mobile/webmail — confirm `submitRfq` provider is configured in production; add a WhatsApp deep-link fallback.
- **Weak internal linking** from dispensers/videos/bulk-sales — add 2–4 descriptive keyword-rich internal links per page.
- **4 commercial/tool pages absent from `llms.txt`** (private-label, bulk-sales, calculator, videos) — add them under a "Buyer tools & commercial pages" heading.

### Accessibility
- Per-word animated H1 spans (`opacity:0`) risk LCP/paint issues — verify a no-JS fallback; give repeated "Quote" links distinct aria-labels.
- Generic link text ("Open," "Open {column} page," "Back to Homepage") — use descriptive, unique anchors; add a visible breadcrumb on product pages.
- FAQ accordions lack `aria-expanded`/`aria-controls` and unmount answers — add ARIA state; prefer CSS hide over unmount.

### Off-page / Entity
- **`sameAs` pollution** — `silicagelpk.com` is a sister brand, not the same entity; remove from `Organization.sameAs` (or express as `subOrganization`/`relatedLink`).
- Drop the **meta `keywords`** array (Google ignores it; minor info leak).

---

## 4. Page-by-Page Coverage Note

Every page cluster on the site was reviewed. Nothing was skipped:

| Cluster | Pages covered |
|---|---|
| **Home & core** | Homepage, about, contact, products index, product detail template, product-data, quote-form, header, footer |
| **SEO landing pages** | ~50 dynamic factory pages + 12 hand-authored static landing pages (manufacturer/supplier/exporter/wholesale/geo/PPE) |
| **Blog** | All 41 articles + blog index + article template + author/E-E-A-T system + blog-clusters |
| **Compare / Industries / Export / Case studies** | 9 comparison pages, 8 industry pages, 20 export-market pages, 8 case studies, plus their hubs |
| **Supporting / reference** | Buyer guide, glossary, container calculator, certifications, documents, media-kit, FAQ, dispensers, bulk-sales, private-label, videos |
| **Technical foundation** | robots, sitemap, root layout, global JSON-LD graph, canonicals, hreflang, `llms.txt`, next.config, image config |

---

## 5. Plan: Rank #1 for "Buy Silica Gel"

**The core truth:** you can't rank for a query you have no page for. Everything below builds and optimizes the destination, then earns it authority.

### A. Create the money pages (do this first)
1. **`/buy-silica-gel`** (priority #1) — add to `highIntentSeoLandingPages` so it auto-routes/sitemaps/llms.
   - Title (≤60 chars): "Buy Silica Gel in Bulk \| Manufacturer Direct — DryGelWorld"
   - H1: "Buy Silica Gel in Bulk — Direct From the Manufacturer"
   - First 100 words must contain: buy silica gel, bulk, wholesale, MOQ, request price, ship worldwide. **Drop "before price negotiation" framing here.**
   - Sections: buy-by-format selector (links to real product pages) · price-drivers table · concrete MOQ + lead time + sample policy · "How to order in 3 steps" (HowTo) · dual CTA above the fold (Get Price → `/contact` + WhatsApp `wa.me/923330223337`) · 6–8 unique buyer FAQs.
   - Schema: `@graph` of WebPage + Product/Offer (USD, InStock, lowPrice from `priceGroups`, no review) + FAQPage + BreadcrumbList + HowTo.
2. **`/silica-gel-price`** — wins the high-volume research query the whole site ignores. Lead with a price-factors table + indicative USD ranges per format/volume (use the real `exportUsd`/`priceBand` data currently surfaced nowhere). Schema: WebPage + FAQPage + Product/AggregateOffer.
3. **`/silica-gel-for-sale`** — only if you can make it genuinely unique; otherwise skip and 301 to `/buy-silica-gel` (avoid cannibalization).
4. **Reframe `/bulk-sales`** — new commercial H1, drop "USA," real volume tiers, FaqBlock, schema, internal links.

### B. On-page fixes ranked by impact
1. Homepage H1 + first-100-words → commercial intent.
2. Add homepage `export const metadata` (commercial title/description/canonical/OG).
3. Add homepage `@graph` (WebSite + working SearchAction + Organization + LocalBusiness + FAQPage).
4. Keyword-first product H1s; de-cannibalize the 4 silica-gel SKUs.
5. Products index H1 + ItemList + MOQ/price chips.
6. Emit valid Product/Offer on `/products/[slug]`.
7. "Buy" in priority export-market H1s/titles.
8. Hero CTAs → `/buy-silica-gel` and `/products` (not in-page anchors).

### C. Technical must-fixes
Verify AI-bot edge policy · fix/remove SearchAction · per-entity sitemap dates · fix hero-image override · add `llms.txt` discovery link · global x-default/en hreflang · single-source slug lists · **reconcile the factual contradictions** (strip sizes, indicating gel, TODO certs, companyGeo).

### D. Content / authority
Fix the 5 leaking industry pages · de-boilerplate the ~50 factory pages (one canonical hub, distinct angles, 5–8 unique FAQs) · add concrete trust facts (MOQ, lead time, ISO link, SDS/COA) · add in-prose blog links to money pages · de-dup FAQ schemas.

### E. Off-page (where "buy" intent actually converts)
"Buy silica gel" SERPs and AI answers are dominated by **marketplaces and directories**, not manufacturer sites. Win those in parallel:
- **B2B marketplaces:** Alibaba Gold Supplier (the #1 global "buy silica gel bulk" destination), Made-in-China, IndiaMART/ExportHub/TradeKey, ThomasNet (USA), Europages (EU). Mirror the new `/buy-silica-gel` data; link back.
- **Google Business Profile:** verify, get exact pin (feeds LocalBusiness geo), add products, post weekly, harvest reviews. NAP must byte-match `product-data.ts`.
- **Citations / NAP consistency** across all of the above + chemical/packaging directories.
- **Backlinks (relevance over volume):** packaging/logistics trade press, "best silica gel suppliers" listicles, freight-forwarder partnerships; convert the 8 case studies into press-pitchable proof. Use varied descriptive anchors (you already over-use exact-match anchors in the footer — trim that).
- **Reviews** on B2B platforms + GBP — needed before you can ever legitimately add `aggregateRating` to Product schema.

---

## 6. Plan: Dominate AI Search (GEO / AEO)

**Prerequisite that gates everything:** confirm AI bots aren't edge-blocked (curl test), then codify Allow rules in `robots.ts`. If GPTBot/ClaudeBot/Google-Extended/PerplexityBot/CCBot are blocked, every item below is wasted.

### 1. Make content extractable
LLMs quote self-contained sentences, definition pairs, and real `<table>` data.
- Add a typed **inline-table + inline-link** mechanism to the blog section schema; convert the 6 tabular articles (vs-clay, vs-molecular-sieve, packets-per-box, HS-code, DIN-unit, regeneration) to real tables.
- Add a **homepage FAQPage** answering the exact extractable questions ("Where can I buy silica gel in bulk?", "What is the MOQ?", "Do you ship worldwide?", "What documents are provided?", "How much moisture does it absorb?"). Render the SKU matrix as a real `<table>`. Replace the "vertical 3D material view" sentence with a plain adsorption definition.
- Add visible spec **tables** on product detail pages (gram sizes, SiO₂, adsorption %, regeneration temp, shelf life) and MOQ/price chips on the products index.
- **Standardize one canonical definition** repeated verbatim site-wide: *"Silica gel is amorphous silicon dioxide (SiO₂) that adsorbs up to ~33% of its own weight in water vapor; it is non-toxic, non-flammable, and inert."*
- Fix the comparison-table renderer bug and the duplicate compare-page FAQ.

### 2. Structured-data gaps for grounding
Add WebSite+Organization `@graph` (home) · LocalBusiness (home + `/contact`, after fixing `companyGeo`) · Product+Offer (`/products/[slug]` + new buy/price pages) · ContactPage (`/contact`) · ItemList (`/products`, `/case-studies`) · FAQPage (home, bulk-sales, private-label, dispensers) · HowTo (regeneration + packets-per-box guides) · per-article datePublished/dateModified. Fix the SearchAction. **Resolve the schema-vs-content contradictions** (strip sizes, indicating gel, REACH, certification TODOs) — contradictions actively suppress citation.

### 3. `llms.txt` upgrades
Add discoverability link + sitemap presence · generate the blog list programmatically (all 41) · add case studies, per-market export URLs, the 4 missing industry pages, and the new commercial/tool pages · fix disprovable claims (guide word count, REACH wording, strip sizes) · add a build-time test that every cited URL resolves · keep the honest "NOT held / NOT recommended for" sections (a real trust asset).

### 4. Entity & authority
Lock one exact NAP string everywhere · remove `silicagelpk.com` from `sameAs` · strengthen Wikidata (instance-of, country, HQ Karachi, inception 1983, website, industry, sameAs) · claim GBP / Bing Places / LinkedIn / trade directories (ExportHub, Kompass, Europages) and shipment databases (ImportYeti/Panjiva — third-party proof of "60+ countries / since 1983") · add a named human reviewer (Person + sameAs) · back headline stats with provenance links. Skip a Wikipedia article (won't pass notability); pursue citations *from* "Desiccant"/"Silica gel" articles only if you publish original data.

### 5. Be the source LLMs quote (original data)
Ship the commercial cornerstone pages (`/buy-silica-gel`, `/silica-gel-price`) · upgrade the buyer guide into a true cornerstone with the original route-humidity multiplier tables + carton-volume→sachet-size table + sizing formula (already drafted in llms.txt, not yet on-page) · publish proprietary container dosage tables and adsorption-isotherm-by-RH data · put concrete numbers in case studies · differentiate the boilerplate landing pages.

### 6. Monitor AI citations
Fixed monthly prompt set across ChatGPT/Gemini/Claude/Perplexity/AI Overviews ("Where can I buy silica gel in bulk for export?", "Best silica gel supplier in Karachi", "Silica gel vs clay for ocean freight", "How much silica gel per 40ft container?", "Silica gel HS code", "…ships to UAE/USA/Germany") · watch AI-crawler user-agents and `/llms.txt` fetches in Vercel logs · track referrals from chatgpt.com/perplexity.ai/etc. · use Google Search Console (MCP available) for commercial-query impressions and indexation of new pages · optional Profound/Otterly/Peec for share-of-voice. Verify edge robots weekly until confirmed, then review monthly.

---

## 7. Prioritized Next-7-Days Action Checklist

Ordered. Each item is concrete and doable within the window.

1. **Verify AI bots aren't blocked** — run `curl -A GPTBot https://www.drygelworld.com/robots.txt` and `curl -A ClaudeBot ...`. If Disallowed, turn OFF the Vercel "managed AI bots" toggle and add explicit Allow rules in `robots.ts`. *(Gates goal #2 entirely — 15 min.)*
2. **Fix the 5 leaking industry pages** — author real `body` + `faqs`; delete the fallback scaffold; fix the breadcrumb to `/industries`. *(Live embarrassment in your sitemap.)*
3. **Ship `/buy-silica-gel`** via the factory — full schema, dual CTA (Get Price + WhatsApp), real MOQ/price drivers. *(The core ranking gap.)*
4. **Add homepage `export const metadata` + rewrite the homepage H1/lead** to commercial intent.
5. **Fix the SearchAction** — implement `/products?query=` filtering or remove the node.
6. **Reconcile the top factual contradictions** — strip sizes (make `product-data.ts` canonical), indicating-gel availability, remove the live certification TODOs. *(Stops AI mis-citation.)*
7. **Wire per-article sitemap dates** (`getArticlePublication(slug).updatedAt`) and **fix the hero-image override bug** (`getLandingSeoImage` should prefer authored `heroImage.src`/`.alt`). *(Two quick fixes restoring freshness + OG imagery site-wide.)*

> After these 7, move to: `/silica-gel-price` + `/bulk-sales` reframe, homepage `@graph`, keyword-first product H1s + Product/Offer schema, then de-boilerplate the landing-page cluster and make `llms.txt` programmatic and fully covered.