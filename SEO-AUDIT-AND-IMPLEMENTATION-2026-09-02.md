# DryGelWorld — Global SEO + AI Search Visibility: Audit and Implementation Report (2026-09-02)

**Scope.** Full-site audit of the Next.js 16 app (src/app), followed by implementation of the highest-value gaps, against the 20-step brief (entity, topical architecture, 1g page, country pages, top-10 content, trust, internal links, technical SEO, schema, AI-search, entity consistency, off-site, content, pricing, competitors, intent, prioritisation).

**Method.** Four parallel read-only audits (route/data inventory; metadata/schema/technical; prior-work status across 30+ planning docs and GSC exports; competitor link research done earlier today), then targeted implementation. Nothing was deleted. Every claim added to the site is traceable to a fact already in the codebase (product data, spec sheet, certifications page, document registry) or to the honesty rules those files enforce.

**Build status.** `tsc --noEmit` passes, `next build` passes, and `eslint` reports the same six pre-existing errors as the untouched tree (none introduced; one warning removed). Changes are committed on branch `seo/directory-kit-and-intel`.

---

## 1. Current strengths (preserve these)

- **Technically sound App Router site.** Every dynamic route has `generateStaticParams`; no content page is `force-dynamic`; no `"use client"` page files; all SEO copy is server-rendered; LCP hero uses an art-directed `<picture>` with preload; analytics deferred.
- **Complete sitemap and robots.** 182+ URLs, redirect sources excluded, noindexed permutations excluded, per-article `lastmod`, AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) explicitly allowed.
- **Entity schema already strong.** Site-wide `Organization` with `@id`, `legalName` Kamran Enterprises, `foundingDate` 1983, address, contact points, `hasCredential` for ISO 9001:2015 cert 9101225 with registrar, `sameAs` including Wikidata Q140185858, `WebSite`, `LocalBusiness` with geo and hours.
- **Honesty discipline enforced in code.** Only ISO 9001:2015, DMF-free statement, and FSC packaging for dry clay are claimed; FDA, food-contact, pharma GMP, Halal, REACH are listed as *not held* on /certifications, /about, and llms.txt. No fake reviews or ratings anywhere.
- **Deep content base.** 44 blog articles (now 45), 17 comparison pages, 8 industry pages, 8 case studies, 20 export pages (now 21), 65 landing pages (now 69), two calculators, a glossary, a 35 KB llms.txt.
- **Top-10 suppliers article is unusually credible.** It discloses the conflict of interest, excludes DryGelWorld from the global ten, and has an FAQ that answers "Is DryGelWorld the #1 silica gel supplier?" with "No."
- **Protected URLs that rank.** `/silica-gel-manufacturer-pakistan` (position ~5.9), `/silica-gel-supplier-karachi` (~7.0), the HS-code guide (9 clicks, ~5.8), homepage (~4.3). None were moved or renamed.

## 2. Problems found

### 2a. Content and architecture gaps (the real bottleneck)
| Problem | Evidence |
|---|---|
| **No page for any gram size.** "1g", "2g", "5g", "10g" appeared only inside prose and size lists; zero dedicated URLs. | Route inventory; grep across src. |
| **Sachet vocabulary thin.** "Sachet" appears in metadata but no page targets "silica gel sachet manufacturer"; packets hub did not link to per-size pages. | seo-landing-pages.ts |
| **Five thin landing pages** (~650-690 words, no buyer guide, size guide, or content block): `/silica-gel-manufacturer-pakistan`, `/silica-gel-supplier-karachi`, `/blue-silica-gel-manufacturer`, `/orange-silica-gel-supplier`, `/moisture-absorber-supplier`. | Word counts from data entries. |
| **15 of 20 export pages had no MOQ, lead time, currency, Incoterms, or FAQs**, including UK, Germany, Europe, India, Australia. France did not exist. | markets.ts field audit. |
| **Top-10 article had no `sources[]`**, so no visible References and no `citation` in Article JSON-LD. Only 9 of 44 articles cite sources. | articles.ts |
| **No visible breadcrumbs anywhere** while 26 route families emit BreadcrumbList JSON-LD. Two trails were wrong (authors page duplicated URL; glossary pointed "Guides" at the buyer guide). | Component search; seo.ts |
| **No testimonials, no named case-study attributions.** All 8 case studies are anonymised by design pending customer permission. | case-study-data.ts |

### 2b. Technical and schema defects
| Problem | Evidence |
|---|---|
| `Product.Offer.price` emitted on 4 product pages with **no visible price** on the page. | products/[slug]/page.tsx |
| Sitemap `lastmod` constant stale at 2026-06-24 for ~120 URLs. | seo.ts |
| `Organization` `@id` declared with **two different names** ("DryGelWorld" in layout, "Dry Gel World" on about, media-kit, videos, case studies). | 4 files |
| `sameAs` included `silicagelpk.com`, a sister brand's separate website, not the same entity. | layout.tsx |
| Production H2 on every product page with a gallery read **"Image gallery direction for this product"** followed by "Replace with real product photography". | products/[slug]/page.tsx |
| Product H1 for the sachet SKU was "Precision Grade Silica Gel", which does not say "sachet". | product-data.ts |
| Article JSON-LD without dates on compare and case-study pages; `/products` hub `hasPart` Products without offers; hardcoded slug mirrors in sitemap. | Schema audit (left as roadmap items, see §9). |

### 2c. Demand and cannibalisation (from GSC, 90 days to 2026-07-19)
- 135 clicks / 18,658 impressions; one informational query ("what is a silica gel packet") is 28% of impressions; buyer-intent queries produced 3 clicks from 616 impressions.
- **Zero measured queries containing "1g", "gram", or "sachet"** on this property. The gram-size pages are built for demand the site does not yet capture, not for demand it already sees; expect them to take one to three months to earn impressions.
- Systemic bare-term vs `-supplier`/`-manufacturer` twins remain (`/silica-gel`, `/silica-gel-supplier`, `/silica-gel-manufacturer`). Prior audits deliberately deferred consolidation because the Pakistan page ranks; this report keeps that decision.

## 3. Pages created

| URL | Purpose | Notes |
|---|---|---|
| `/1g-silica-gel-sachets` | The brief's priority page. ~1,900 words: what a 1g sachet is, capacity (~0.3 g water near saturation, ~0.1 g at 40% RH), dosage per pack volume, materials comparison (paper / technical fibre / non-woven), custom print, MOQ, indicative pricing, lead time, export, storage, safety, 12 FAQs, quote form. | Entry in `src/lib/seo-landing-pages-sizes.ts`, wrapped in `seo-landing-pages.ts`. Spec table via `product-spec.ts`. Sitemap, JSON-LD (WebPage, Service, FAQPage, BreadcrumbList), OG/Twitter, canonical all inherited. |
| `/2g-silica-gel-sachets` | Medium retail boxes, accessories, small leather goods. | Same framework; distinct dosage, use cases, FAQs. |
| `/5g-silica-gel-sachets` | Shoe boxes, garment cartons, instruments; footwear export angle with DMF-free. | Same. |
| `/10g-silica-gel-sachets` | Master cartons, equipment cases, textiles; DIN 55473 unit relation. | Same. |
| `/export/france` | New country page: Le Havre / Marseille-Fos, French SDS (FDS), TARIC + GSP+ REX, REACH note, DMF-free for leather, MOQ, lead time, Incoterms, 5 FAQs. | `markets.ts`; hreflang `en-FR` added to the reciprocal cluster. |
| `/blog/silica-gel-sachet-manufacturers-how-to-evaluate` | Supporting article for "silica gel sachet manufacturer" / "desiccant sachet manufacturer" intent: what a converter does, seven comparison points, sizing as dosage, where manufacturers cluster worldwide, DryGelWorld's honest fit. 5 FAQs, 7 sources. | `articles.ts`; publication date; blog cluster links. |

Why no 3g/20g/25g pages: 3g sits between 2g and 5g with no distinct application; 20g+ is already covered by `/bulk-silica-gel-desiccant`. Adding more size pages would be doorway-shaped.

Why no separate "top silica gel manufacturers" / "best silica gel suppliers" / "silica gel suppliers worldwide" articles: they are the same intent as the existing top-10 article and would cannibalise it. That article was strengthened instead (see §4) and its FAQ now answers the sachet-manufacturer variant.

## 4. Pages modified

| File / URL | Change |
|---|---|
| `/blog/top-10-silica-gel-suppliers-world-pakistan` | Added two sections ("Sachet manufacturers vs raw silica producers", "Five checks that work for any supplier worldwide"), one FAQ ("Who are the top silica gel sachet manufacturers?"), and **15 sources** (each listed company's official site, two market-research reports, the ISO registrar, and the certifications page). `updatedAt` → 2026-09-02; read time 11 min. |
| `/silica-gel-manufacturer-pakistan` | Kept URL, title, H1, meta, lead (it ranks ~5.9). Added a six-part buyer guide (factory vs trading desk, documents, scope, local PKR buying, export terms, how to spot a reseller), the commercial size guide, a content block linking size/format pages, 8 related links, 6 FAQs with verifiable facts (legal entity, cert number, registrar, validity). |
| `/export/uk`, `/export/germany`, `/export/europe`, `/export/india`, `/export/australia` | Added MOQ, lead time with approximate sea-transit ranges, currency, Incoterms, and 4-5 market-specific FAQs each. Europe and Australia also gained customs blocks (TARIC / ABF tariff, required docs, regulatory notes). `updatedAt` set so sitemap `lastmod` is real. |
| `/silica-gel-packets` | Related links now lead with the 1g/2g/5g/10g pages; FAQ states packet = sachet and points to the size pages. |
| `/products/retail-sachets` | Product name (H1 and `Product.name`) → "Silica Gel Sachets 0.5g-20g (Precision Grade)". Related links include 1g and 5g pages. |
| All product pages | **Visible indicative price**: an "Indicative export reference: USD low - high per unit, ex-factory" stat with a link to /pricing, rendered only for the four SKUs whose Offer schema already carried those numbers. Placeholder gallery heading replaced with "{product} in use: formats and packing." |
| Landing template, product, export, blog templates | **Visible breadcrumb navigation** (`src/components/breadcrumbs.tsx`) rendering the same items as the JSON-LD. |
| `/authors/[slug]`, `/guides/desiccant-glossary` | Breadcrumb trails corrected. |
| `layout.tsx` | Removed `silicagelpk.com` from `Organization.sameAs`. |
| about, media-kit, videos, case-studies | `Organization` node name unified to "DryGelWorld" (matches `@id` in layout). |
| `llms.txt` | Added per-size sachet pages and the packets hub to Core resources and Product lines. |
| Footer | "1g silica gel sachets" link in the Products column. |
| Sitemap | `sitemapLastModified` → 2026-09-02 (content materially changed today). |

## 5. Keywords targeted (by intent)

| Intent | Keywords | URL |
|---|---|---|
| B2B / transactional | 1g silica gel, 1g silica gel sachet, 1 gram silica gel, 1g desiccant sachet, 1g silica gel wholesale / manufacturer / supplier / exporter, bulk 1g silica gel, custom 1g silica gel sachets | `/1g-silica-gel-sachets` |
| B2B | 2g / 5g / 10g silica gel sachet, silica gel for shoe boxes, master carton desiccant | `/2g-…`, `/5g-…`, `/10g-silica-gel-sachets` |
| Commercial | silica gel sachet manufacturer, desiccant sachet manufacturer, silica gel packets manufacturer/wholesale | `/silica-gel-packets` (hub) + new article |
| Commercial / informational | top silica gel suppliers, top 10 silica gel manufacturers, best silica gel suppliers, silica gel suppliers worldwide, silica gel manufacturers in Pakistan | `/blog/top-10-silica-gel-suppliers-world-pakistan` |
| Export | silica gel supplier France; strengthened UK, Germany, Europe, India, Australia | `/export/*` |
| Entity / local | silica gel manufacturer Pakistan, silica gel company Karachi | `/silica-gel-manufacturer-pakistan` (strengthened, URL unchanged) |
| Existing head terms (unchanged) | silica gel manufacturer, silica gel supplier, silica gel, buy silica gel, wholesale/bulk silica gel, desiccant manufacturer | existing landing pages |

## 6. Internal-linking changes

- New hub → size layer: packets hub → 1g/2g/5g/10g; each size page → the other three, the hub, the product page, calculators, Pakistan page, export hub, pricing, beads, private label, industry pages.
- Pakistan page → 1g page, packets, beads, strips, pricing, certifications, FOB Karachi export page, top-10 article.
- Product page (retail sachets) → 1g and 5g pages.
- Footer → 1g page. llms.txt → size pages and hub.
- New article ↔ top-10 article, sachet materials guide, packet-size guide, private-label guide, leather industry page.
- Visible breadcrumbs add a descriptive link to /products, /export, /blog from every leaf.

## 7. Schema implemented or corrected

- New pages emit WebPage, Service (provider `#organization`), FAQPage, BreadcrumbList, and an ItemList spec table via the existing helpers; France emits the export Service/OfferCatalog/FAQPage graph.
- Article JSON-LD for the top-10 piece and the new article now carries `citation` (from `sources`).
- `Organization` name conflict resolved across four documents; `sameAs` cleaned.
- Product `Offer.price` is now backed by visible on-page text.
- BreadcrumbList now matches a rendered `<nav aria-label="Breadcrumb">` on landing, product, export, and blog pages; two broken trails fixed.
- Validate after deploy: Rich Results Test on `/1g-silica-gel-sachets`, `/products/retail-sachets`, `/export/france`, `/blog/top-10-silica-gel-suppliers-world-pakistan`.

## 8. AI-search (GEO) improvements

- Plain-HTML declarative sentences on every new page ("DryGelWorld manufactures 1 gram silica gel sachets in Karachi, Pakistan…"), with FAQ answers written as standalone facts.
- Capacity and dosage figures stated with their basis (33% at 25 °C/90% RH; DIN 55473 unit) so they can be quoted safely.
- Sources on the two supplier guides make them citable; llms.txt now points AI crawlers at the size pages.
- Entity consistency: one name, one legal entity, one head-office NAP, one sister-brand relationship stated in prose rather than asserted as `sameAs`.

## 9. Priority roadmap (remaining work)

Status key: DONE today · OPEN · OWNER (needs information only the company can supply).

### Priority A — Critical
| # | Problem | Solution | Where | Benefit | Status |
|---|---|---|---|---|---|
| A1 | Sitemap lastmod stale | Bumped constant; export `updatedAt` for edited markets | seo.ts, markets.ts | Trustworthy freshness signal | DONE |
| A2 | Offer price not visible | Visible indicative reference on 4 SKUs | products/[slug]/page.tsx | Removes schema mismatch risk | DONE |
| A3 | Entity name conflict in schema | Unified to "DryGelWorld" | 4 files | Clean entity for AI/knowledge graph | DONE |
| A4 | **Scale-claim inconsistency**: "190+ countries" (homepage, llms.txt) vs "60+ countries" (outreach docs) | Owner to confirm the true number of countries shipped to; then align homepage `trackRecord`, llms.txt line ~327, and outreach kits | page.tsx, llms.txt/route.ts | Avoids AI mis-citation and procurement distrust | OWNER |
| A5 | Placeholder gallery copy in production | Replaced | products/[slug]/page.tsx | Credibility | DONE |
| A6 | Deploy and re-index | Deploy; submit the 6 new URLs plus edited ones via GSC and IndexNow (`npm run indexnow`) | scripts/ | Faster pickup | OPEN |

### Priority B — High impact
| # | Problem | Solution | Where | Status |
|---|---|---|---|---|
| B1 | No gram-size pages | 1g (deep), 2g, 5g, 10g | seo-landing-pages-sizes.ts | DONE |
| B2 | Thin Pakistan manufacturer page | Expanded without touching URL/H1/meta | seo-landing-pages.ts | DONE |
| B3 | Export pages without commercial blocks | All 21 markets now carry MOQ, lead time, currency, Incoterms, FAQs; France created; customs blocks added for EU, AU, VN, BD, ID, TR, BR, MY, CA | markets.ts | DONE |
| B4 | Top-10 article unsourced | 15 sources + 2 sections + FAQ | articles.ts | DONE |
| B5 | Remaining thin landing pages | Karachi, blue, orange, and moisture-absorber pages each gained a 6-part buyer guide, content block, 8 related links, 8 FAQs (~1,000 words each); URLs, titles, H1s unchanged | seo-landing-pages.ts | DONE |
| B6 | Only 10 of 45 articles cite sources | 20 highest-impression articles now cite 4-6 verified primary sources each (PubChem, ATSDR, DIN 55473/55474, IPC/JEDEC J-STD-033, IMO CTU Code, P&I club bulletins, ICH Q1A, USP <671>, ICC Incoterms, WCO HS, NWS). 30 of 45 articles now sourced | articles.ts | DONE |
| B7 | Breadcrumbs not on compare, industry, case-study, guide pages | Wired into compare, industry, case-study, buyer-guide, and glossary templates | respective page.tsx | DONE |
| B8 | Article JSON-LD without dates on compare/case-study pages; hub `hasPart` Products without offers | Dates added (published 2026-06-24, modified = site content date); case-study Article gained an author; hub `hasPart` items are now WebPage nodes | compare/[slug], case-studies/[slug], products/page.tsx | DONE |
| B9 | Homepage does not link the size layer | "1g sachets" lane added to the homepage category row | page.tsx | DONE |
| B10 | Bare-term / -supplier / -manufacturer twins | Decide (owner) whether `/silica-gel-supplier` and `/silica-gel-manufacturer` stay separate; if merging, 301 the weaker | next.config.ts | OWNER |

### Priority C — Authority building
| # | Item | Where | Status |
|---|---|---|---|
| C1 | Dofollow-only link cadence (10 pitches, 3 journalist replies per week) | BACKLINKS-EXECUTION-PLAN.md | Plan DONE; execution OPEN |
| C2 | 35 verified pages already linking to competitors, tiered by confirmed dofollow | COMPETITOR-LINK-INTERSECT-2026-09-02.md | List DONE; pitching OPEN |
| C3 | 30 editorial targets + journalist platforms | OUTREACH-HITLIST-2026-07.md | OPEN |
| C4 | Fix wrong website on the businessbook.pk "Kamran Enterprises" listing; Google Alerts for brand | Off-site | OWNER |
| C5 | Google Business Profile: confirm verified, categories, photos; Bing Places import | Off-site | OWNER (docs conflict on whether GBP is done) |
| C6 | Named testimonials and case-study attributions (`attribution` field exists, never populated) | case-study-data.ts | OWNER (needs written customer permission) |
| C7 | Original-data asset per quarter (trade-lane humidity study first) | Plan §4 | OPEN |
| C8 | Get DryGelWorld onto third-party "top supplier" lists (GISuser, Sourcify China, Packaging South Asia identified) | Intersect file Tier 1 | OPEN |

### Priority D — Long-term
| # | Item | Status |
|---|---|---|
| D1 | Fill commercial blocks on the remaining 10 export pages (DONE); consider Africa (Nigeria, Kenya, South Africa) only with real shipments | OPEN (Africa only) |
| D2 | Named factory photography to replace concept gallery images | OWNER |
| D3 | Container/maritime positioning | DONE. Also corrected a factual error: the comparison page, an FAQ, and llms.txt said calcium chloride was not in the catalog, but two calcium chloride products exist. Now accurate, with silica gel's advantages stated first |
| D4 | Exact GBP map pin to replace approximate `companyGeo` | OWNER |
| D5 | Reconsider `isicV4` 8292 (packaging) vs a chemical-manufacture code | OWNER |
| D6 | Enforce CSP (currently report-only) | OPEN |

## 10. Competitor gaps (from the 2026-07-18 intelligence pass and today's link research)

- Competitors win on third-party presence (Metoree, iDesiccant, market-report lists) and on dofollow links from packaging trade press; DryGelWorld has ~27 dofollow domains and DR 19. This is the binding constraint; on-page is already ahead of most Tier-2 specialists.
- Competitors rarely publish per-size sachet pages with dosage; the new 1g/2g/5g/10g pages are a differentiator if they earn links.
- Every competitor "top 10" list is self-published; DryGelWorld's transparent version, now sourced, is the most citable page in the category.

## 11. International SEO strategy

- Keep the single English site with `en-XX` hreflang on export pages (now 21 members, reciprocal, x-default → /export). Do not create translated doorway pages.
- Country pages exist only where shipments are realistic; each carries ports, customs code with an official tariff link, document set, MOQ, lead time, Incoterms, and market-specific FAQs.
- Next markets to deepen: Canada, Turkey, Bangladesh (real South Asian demand), then Africa only with evidence of shipments.

## 12. Content strategy (next 90 days)

1. Add sources to the 20 highest-impression articles (B6).
2. Publish the "container humidity by trade lane" data study (C7) and pitch it to the Tier-1 link-intersect targets.
3. One guest post per month on DR 40+ packaging/logistics press using the drafted pitches.
4. Keep the top-10 article refreshed quarterly (dates, company changes).
5. Do not add more comparison pages or PPE permutations (explicit non-recommendations from prior audits still stand).

## 13. What was deliberately not done, and why

- **No consolidation of ranking URLs** (Pakistan, Karachi, manufacturer/supplier twins): prior audits flagged position-5 rankings; a wrong merge loses more than it gains. Owner decision (B10).
- **No testimonials, reviews, ratings, or named customers**: none exist with permission. The schema and data fields are ready when they do.
- **No change to the "190+ countries" claim**: it may be true, but it conflicts with "60+" elsewhere and could not be verified from the repo. Flagged as A4 for the owner.
- **No new "best/top manufacturers" articles**: cannibalisation risk with the existing pillar.
- **No sachet dimensions or exact MOQ figures on the size pages**: not in the data; stated as "confirmed at quote".

## 13b. Second pass (same day)

After the first report, every remaining in-repo roadmap item was implemented: all 21 export pages carry commercial blocks and most carry customs blocks; the four remaining thin landing pages were expanded; 20 more articles cite verified primary sources; breadcrumbs cover every content template; compare and case-study Article schema carry dates; the products hub no longer emits offer-less Product nodes; the homepage links the size layer; and a live factual error about calcium chloride availability was corrected on the comparison page and in llms.txt. Still open and owner-dependent: A4 (country count), B10 (twin consolidation), C4-C6 (listing fix, GBP, testimonials), C7 (data study needs real logger data), D2, D4, D5, D6 (CSP enforcement deliberately not flipped blind).

## 14. Files touched

New: `src/lib/seo-landing-pages-sizes.ts`, `src/components/breadcrumbs.tsx`, `src/components/breadcrumbs.module.css`, this report, `COMPETITOR-LINK-INTERSECT-2026-09-02.md`.

Modified: `src/lib/seo-landing-pages.ts`, `src/lib/compare-data.ts`, `src/app/page.tsx`, `src/app/products/page.tsx`, `src/app/compare/[slug]/page.tsx`, `src/app/industries/[industry]/page.tsx`, `src/app/guides/silica-gel-buyer-guide/page.tsx`, `src/lib/product-spec.ts`, `src/lib/product-data.ts`, `src/lib/seo.ts`, `src/lib/blog-clusters.ts`, `src/app/blog/articles.ts`, `src/app/blog/[slug]/page.tsx`, `src/app/export/markets.ts`, `src/app/export/[market]/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/components/seo-landing-page.tsx`, `src/components/site-footer.tsx`, `src/app/layout.tsx`, `src/app/llms.txt/route.ts`, `src/app/about/page.tsx`, `src/app/media-kit/page.tsx`, `src/app/videos/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `src/app/authors/[slug]/page.tsx`, `src/app/guides/desiccant-glossary/page.tsx`, `BACKLINKS-EXECUTION-PLAN.md`, `OUTREACH-HITLIST-2026-07.md`.

## 15. Recommended next steps (in order)

1. Review the diff, then commit and deploy.
2. Run `npm run indexnow` and request indexing in GSC for the six new URLs and the Pakistan, packets, retail-sachets, and top-10 pages.
3. Validate schema on the four URLs listed in §7.
4. Owner: settle A4 (country count), C5 (GBP status), C6 (any customer willing to be named).
5. Start the Monday link-intersect pitches from `COMPETITOR-LINK-INTERSECT-2026-09-02.md`. Nothing on-page will move DR; only this will.
6. In 30 days, check GSC for the first impressions on "1g silica gel" queries and adjust the size-page titles if the query wording differs.
