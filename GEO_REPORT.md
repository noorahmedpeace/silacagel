# DryGelWorld — Generative Engine Optimization (GEO) Report

**Scope:** How well DryGelWorld is answerable, extractable, and citable by AI search engines — ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews, and Bing Copilot.
**Basis:** GEO / AI-search answerability audit + Structured-data (JSON-LD / Schema.org) audit.
**Date:** 2026-07-12

---

## 1. Executive summary

DryGelWorld is a genuinely well-instrumented GEO codebase. Most page types already ship the extractable answer blocks and structured data that AI engines look for: a clean `Organization + WebSite + LocalBusiness` `@graph` with `@id` cross-linking, `sameAs` (including a Wikidata entity), ISO `hasCredential`, `knowsAbout`, and a `hasOfferCatalog`; Product+Offer with real published prices; FAQPage tied to visible FAQs; a real `DefinedTermSet` glossary; `WebApplication+HowTo+FAQPage` on both calculators; and `WebPage+Service+FAQPage` on all 70 SEO landing pages and 8 industry pages. An `llms.txt` route exists.

The GEO problem is therefore **not absence of scaffolding — it is uneven coverage and a few trust/correctness defects** that decide whether an AI engine cites DryGelWorld or a competitor on a low-authority domain:

1. **A correctness defect that can suppress the money pages' Product rich results** — Offer prices are emitted that appear nowhere on the visible page.
2. **A two-tier export cluster** where only 5 of 20 country pages carry the FAQ + customs + supply-terms data that AI engines preferentially quote; 15 are thin.
3. **Half the catalog has no product/offering entity at all** — quote-only products (PPE, clay, calcium chloride) emit no Product or Service node.
4. **Weak citable-author and entity-graph signals** — anonymous org byline, unused credentials, disconnected publisher Organization duplicates, and editorial content not linked to the product/term entities it discusses.
5. **Missing machine-readable lists** on the flagship `/products`, `/blog`, and `/export` hubs.

These are exactly the coverage and trust signals that separate a cited source from an ignored one.

---

## 2. Current AI-answerability state

### What already works (do not rebuild)

| Signal | Where | Status |
|---|---|---|
| Organization / WebSite / LocalBusiness `@graph` with `@id` cross-links, `sameAs` (+ Wikidata), ISO `hasCredential`, `knowsAbout`, `hasOfferCatalog` | `src/app/layout.tsx` | Strong |
| Product + Offer (real prices), FAQPage, BreadcrumbList, SKU/procurement tables | `src/app/products/[slug]/page.tsx` | Strong (but see §3.1 price defect) |
| Compare pages: spec table + scenario decision matrix + FAQPage | `src/lib/compare-data.ts`, `src/app/compare/[slug]/page.tsx` | Strong |
| Blog: Article + FAQPage + Breadcrumb, author + citations | `src/app/blog/[slug]/page.tsx` | Partial (citations only on 9/46) |
| Glossary: real `DefinedTermSet` / `DefinedTerm` with anchors + per-term source attribution | `src/lib/glossary-data.ts` | Strong |
| Calculators: WebApplication + HowTo + FAQPage | `src/app/tools/*` | Strong |
| SEO landing + industry pages: WebPage + Service + FAQPage | `src/lib/seo-landing-pages.ts`, `src/app/industries/[industry]/page.tsx` | Strong |
| `llms.txt` route | present | Strong |

### Where AI engines currently cannot get a clean answer

- **15 of 20 export-market pages** render no question-shaped Q&A and emit no FAQPage — the highest-intent `"silica gel supplier in <country>"` query class.
- **14–15 export pages** have no HS-code/duty customs table and no MOQ/lead-time/Incoterms block — the exact tabular facts AI engines quote.
- **6 of ~10 catalog products** (all PPE + dry clay) have no Product entity — invisible to AI product/knowledge extraction.
- **37 of 46 blog articles** emit no `citation` — no outbound trust anchors.
- **All editorial content** is attributed to one anonymous "Export Desk" org author; stored credentials never reach schema.
- **The flagship `/products` hub, `/blog`, and `/export` index** emit no ItemList — no machine-readable catalog for "what does DryGelWorld sell" brand-entity queries.

---

## 3. Entity & structured-data gaps (prioritized)

### 3.1 CRITICAL — Offer price with no matching visible price (can suppress the only Product rich results)

**File:** `src/app/products/[slug]/page.tsx` lines 1010–1017 (`offers: { price: offerPricing.lowPrice, availability InStock }`), `productOfferPricing` lines 526–531; visible price at line 709 renders `{product.priceBand}`; `src/lib/product-data.ts` priceBand values lines 184/211/238/265.

The Offer emits a concrete number (e.g. `0.0035 / 0.0045 / 0.078 / 4.2 USD`) that appears **nowhere** on the product detail page — the only visible price-like text is `priceBand` strings such as *"Tiered industrial reference rates available"* and *"Quoted by route, container volume, and dispatch schedule."* Google evaluates markup against the same page's visible content: a structured price with no visible match can get the Product rich result suppressed and triggers Merchant Center price-mismatch disapproval. These 4 silica-gel pages are the **only** ones carrying Product schema, so the entire Product rich-result surface for the money pages is at risk.

**Fix:** Either render the same indicative unit price on-page (`"From $0.0035/unit"`) so it byte-matches `Offer.price`, or replace the flat price with `offers.priceSpecification` using `UnitPriceSpecification` minPrice/maxPrice and show that band on-page. Never emit a price the buyer cannot see. (Related low-severity issue: `priceValidUntil` is hardcoded to `"2026-12-31"` at line 1014 — compute dynamically as today + 1 year so it cannot silently expire.)

### 3.2 HIGH — 15 export-market pages emit no FAQPage / extractable Q&A

**File:** `src/app/export/[market]/page.tsx` (FAQPage node lines 204–215, gated on `market.faqs`), `src/app/export/markets.ts` (`faqs:` present for only uae, saudi-arabia, qatar, usa, mexico — 5 of 20).

`"silica gel supplier in <country>"` is the highest-intent B2B query class and prime AI-Overview / Perplexity real estate. Germany, UK, Vietnam, India, Brazil, etc. give AI engines only generic bullet blocks — no question-shaped answers to quote.

**Fix:** Author 3–4 buyer FAQs per remaining market in `markets.ts` (MOQ, lead time to that port, Incoterms/duty, required docs). The render + FAQPage JSON-LD already exist and light up automatically once data is present.

### 3.3 HIGH — Missing customs tables & supply-terms blocks on 14–15 markets

**File:** `src/app/export/markets.ts` (`customs:` present for 6 markets, `moq`/`leadTime`/`incoterms` for 5); render gated at `src/app/export/[market]/page.tsx` line 336 (customs table) and line 296 (supply terms).

AI engines preferentially cite tabular facts (HS code 2811.22/3824, duty rate, MOQ, Incoterms). Fully-built pages can become the cited source for *"HS code for silica gel import to <country>"* / *"minimum order silica gel <country>"*; the thin markets answer none of these.

**Fix:** Populate `customs` (hsCode, dutyNote, tariffLookup, requiredDocs) and `moq`/`leadTime`/`incoterms` for remaining markets. Note: two headings are hardcoded to "Mexico" (`page.tsx` lines 384, 405) — interpolate `market.country` before extending those sections to other markets.

### 3.4 MEDIUM — 6 catalog products have no Product/Service entity at all

**File:** `src/app/products/[slug]/page.tsx` — Product node gated on `offerPricing` (line 998), which only exists for 4 priced silica-gel slugs (`productOfferPricing` lines 526–531). dry-clay-desiccant, both nitrile-glove SKUs, hair-nets, beard-covers, and the two calcium-chloride cargo products fall through with only FAQPage + BreadcrumbList.

Half the catalog — including real revenue items — has no machine-readable product node (name, material, brand, manufacturer), so queries like *"powder-free nitrile gloves supplier"* or *"clay desiccant manufacturer"* cannot resolve DryGelWorld as a structured source even where the page ranks.

**Fix:** For quote-only slugs, emit either (a) a **Product node without an `offers` block** (brand + manufacturer + material is valid for AI extraction), or (b) a **Service node using the provider `@id` pattern already proven** on `export/[market]/page.tsx` lines 169–201 and industries pages, which avoids the "Product without offers" warning. Stop dropping the entity entirely.

### 3.5 MEDIUM — Only 9 of 46 blog articles carry external citations

**File:** `src/app/blog/articles.ts` (`sources:` on 9 of 46 slugs); `citation` emitted only when present at `src/app/blog/[slug]/page.tsx` lines 262–264.

Outbound citations to authoritative standards (DIN 55473, ISO 9001, REACH/ECHA, HS 2811.22, ASTM) are a primary GEO trust signal — they raise the odds an AI engine treats a low-authority domain as citable rather than promotional, and improve retrieval of the article itself as grounded content.

**Fix:** Add 2–3 authoritative `sources` to the remaining articles (standards bodies, customs tariff DBs, the site's own glossary `DefinedTerm` anchors). The References render + `Article.citation` wiring already exist.

### 3.6 MEDIUM — Weak citable-author / E-E-A-T entity

**File:** `src/lib/authors.ts` (single author `dry-gel-world-export-desk`, `@type Organization`, rich `credentials[]` present but unused); blog author node `src/app/blog/[slug]/page.tsx` line 244 emits only `knowsAbout`; compare author node `src/app/compare/[slug]/page.tsx` lines 217–223 emits just name+url.

All blog AND compare content is attributed to one anonymous org author. An anonymous org byline is the weakest citable-author signal — hurting a new domain's chance of being the trusted source cited in AI answers about desiccant selection.

**Fix:** Add a real named `Person` author (jobTitle, credentials as `hasCredential`/`knowsAbout`, `sameAs` to LinkedIn), or at minimum surface the existing `authors.ts` `credentials` into the author node schema on both blog and compare pages so expertise is machine-readable.

### 3.7 MEDIUM — Disconnected publisher / parent-Organization duplicates

**File:** `src/app/blog/[slug]/page.tsx` lines 251–259; `src/app/compare/[slug]/page.tsx` lines 229–237; `src/app/guides/silica-gel-buyer-guide` lines 753–761; `src/app/authors/[slug]/page.tsx` lines 118–122. Correct pattern already exists in `src/app/case-studies/[slug]/page.tsx` lines 195–200 (`@id ${absoluteUrl()}#organization`).

Article `publisher` / author `parentOrganization` are inlined as fresh Organization objects with no `@id`, creating duplicate unlinked entities instead of reinforcing the single canonical `#organization` node that carries `sameAs`, credentials, and the Wikidata link.

**Fix:** Replace inlined objects with a reference `{ "@id": "${absoluteUrl()}#organization" }` (or add that `@id` to the inlined object) across blog, compare, guide, and author pages, matching the case-studies pattern. This is one of the cheapest E-E-A-T reinforcement moves available.

### 3.8 MEDIUM — Real testimonials/case studies not modeled as Review/aggregateRating

**File:** review/aggregateRating intentionally omitted at `src/app/products/[slug]/page.tsx` lines 993–996; homepage testimonials `src/app/page.tsx` lines 195–220; named/anonymized case-study attributions `src/app/case-studies/[slug]/page.tsx` lines 120–131.

Star ratings are the highest-CTR SERP enhancement and a strong AI-answer trust signal. Real, attributable case-study quotes are Review candidates currently invisible to structured data.

**Fix:** Model **only genuine, attributable, permission-cleared** case-study references as `Review` on the Organization or relevant Product, rolling up into `aggregateRating`. **Do NOT synthesize ratings** for the anonymous homepage testimonials. Start with the named case-study attributions.

---

## 4. Missing answer blocks / definitions / comparisons / tables / FAQ

| Gap | Where it should live | Why AI needs it |
|---|---|---|
| **Per-country buyer FAQ** (MOQ, lead time, Incoterms, docs) | `src/app/export/markets.ts` — 15 missing markets | Question-shaped answers for `"silica gel supplier in <country>"`; FAQPage render already wired |
| **HS-code / duty customs table** | `markets.ts` `customs` field — 14 missing | AI quotes tabular customs facts verbatim |
| **MOQ / lead-time / Incoterms supply-terms block** | `markets.ts` — 15 missing | `"minimum order silica gel <country>"` answers |
| **Product ItemList on the flagship catalog hub** | `src/app/products/page.tsx` (emits no JSON-LD) | "What does DryGelWorld sell" resolves to only 3 generic Services today (`layout.tsx` `hasOfferCatalog` lines 403–441) |
| **Homepage product ItemList / CollectionPage** | `src/app/page.tsx` (emits one HowTo only, lines 586–617) | Root URL hands AI no linked product list; Product `@id`s gain no inbound entity links |
| **ItemList on `/blog` and `/export` index** | `src/app/blog/page.tsx`, `src/app/export/page.tsx` | Machine-readable content/catalog enumeration |
| **`about` / `mentions` entity links on editorial nodes** | `src/app/compare/[slug]/page.tsx` lines 210–240; `src/app/blog/[slug]/page.tsx` lines 227–265 | Connect editorial → `/products/<slug>#product` and `DefinedTerm` `@id`s so the knowledge graph is traversable |

**Note on deprecated rich results:** The stack leans heavily on HowTo (`page.tsx` 590–615; container-desiccant-calculator 134–147) and FAQPage (products, blog, compare, industries, export, tools, `/faq`, every landing page). Google removed HowTo rich results (2023) and restricted FAQPage rich results to gov/health sites — so these will not render SERP accordions/carousels. **Keep them anyway: they retain full GEO/AI-Overview value.** Just reset expectations and prioritize the price-match, ItemList, and entity-linking work over adding more HowTo/FAQPage nodes.

---

## 5. Concrete "restructure so AI cites us" examples

**A. Export market page — `/export/germany` (thin → citable).**
Add to `markets.ts` for the germany entry: a `customs` block (`hsCode: "2811.22"`, EU duty note, TARIC lookup link, required docs), a `moq`/`leadTime`/`incoterms` block, and 3–4 `faqs`. Result: the page renders a customs table (`page.tsx:336`), a supply-terms section (`page.tsx:296`), and a FAQPage node (`page.tsx:204`) — turning a generic bullet page into the extractable, tabular source AI Overviews quote for "HS code for silica gel import to Germany" and "MOQ silica gel Germany."

**B. Product page — `/products/dry-clay-desiccant` (invisible → entity).**
Emit a `Service` node (provider `@id → #organization`, `name`, `serviceType`, `material`, `areaServed`) mirroring the warning-free pattern at `export/[market]/page.tsx:169–201`. The page already has FAQPage + BreadcrumbList; adding the offering entity lets AI resolve DryGelWorld as a structured "clay desiccant manufacturer" source.

**C. Product page — priced silica-gel slugs (suppressed → safe).**
Render `"From $0.0035/unit"` next to `{product.priceBand}` (`page.tsx:709`) so the visible price byte-matches `Offer.price`, removing the price-mismatch risk that currently threatens all 4 Product rich results.

**D. Homepage — `/` (no catalog → linked graph).**
Add an `ItemList` (or `CollectionPage` with `hasPart`) referencing each `/products/<slug>#product` `@id`. The brand-entity query "what does DryGelWorld sell" then recovers the concrete catalog (retail sachets, container strips, calcium chloride, clay, PPE) instead of 3 generic services.

**E. Compare page — `/compare/silica-gel-vs-calcium-chloride...` (disconnected → grounded).**
Add `about`/`mentions` to the Article node (`compare/[slug]/page.tsx:210`) referencing `/products/*#product` `@id`s, `#organization`, and the relevant glossary `DefinedTerm` `@id`s — plus 2–3 authoritative `sources`. This grounds the decision content in the entity graph and gives AI citation-worthy references.

**F. Author node — sitewide (anonymous → expert).**
Surface `authors.ts` `credentials`/`role` into a named `Person` author node with `hasCredential`, `knowsAbout`, and `sameAs`, and point every article's `publisher` at `#organization` via `@id`. Consolidates E-E-A-T on one trusted, machine-readable expert + org identity.

---

## 6. Prioritized GEO action list

| # | Priority | Action | File(s) | Effort |
|---|---|---|---|---|
| 1 | **Critical** | Make visible price byte-match `Offer.price` (or switch to `priceSpecification` band shown on-page); stop emitting an unseen price | `products/[slug]/page.tsx` 1010–1017, 709; `product-data.ts` | Small |
| 2 | **High** | Author 3–4 buyer FAQs for the 15 remaining export markets (FAQPage auto-lights) | `export/markets.ts` | Medium |
| 3 | **High** | Populate `customs` + `moq`/`leadTime`/`incoterms` for 14–15 markets; interpolate `market.country` in hardcoded "Mexico" headings | `export/markets.ts`; `export/[market]/page.tsx` 336/296/384/405 | Medium |
| 4 | **Medium** | Emit a Product-without-offers or Service node for the 6 quote-only products | `products/[slug]/page.tsx` 998 | Small–Med |
| 5 | **Medium** | Add 2–3 authoritative `sources` to the 37 uncited articles | `blog/articles.ts` | Medium |
| 6 | **Medium** | Named `Person` author (or surface existing credentials) on blog + compare | `authors.ts`; `blog/[slug]/page.tsx` 244; `compare/[slug]/page.tsx` 217 | Small |
| 7 | **Medium** | Reference `#organization` `@id` for publisher/parentOrganization across blog, compare, guide, author pages | 4 page types (case-studies pattern) | Small |
| 8 | **Medium** | Add `CollectionPage + ItemList + BreadcrumbList` to `/products`; ItemList to `/blog`, `/export` | `products/page.tsx`, `blog/page.tsx`, `export/page.tsx` | Small |
| 9 | **Medium** | Model genuine, attributable case-study quotes as `Review` → `aggregateRating` (no synthetic ratings) | `case-studies/[slug]/page.tsx`; product/org schema | Medium |
| 10 | **Low** | Homepage `ItemList`/`CollectionPage` referencing `/products/<slug>#product` `@id`s | `page.tsx` 586–617 | Small |
| 11 | **Low** | Add `about`/`mentions` to compare + blog Article nodes linking product & term `@id`s | `compare/[slug]/page.tsx`, `blog/[slug]/page.tsx` | Small |
| 12 | **Low** | Compute `priceValidUntil` dynamically (today + 1 year) | `products/[slug]/page.tsx` 1014 | Trivial |
| 13 | **Low** | Add `priceRange` to LocalBusiness (clears validator notice) | `layout.tsx` 457–487 | Trivial |
| 14 | **Low** | Keep HowTo/FAQPage for GEO value; reset SERP-rich-result expectations | sitewide | Trivial |

---

## 7. Bottom line

DryGelWorld's GEO foundation is above-average for a new exporter — the schema scaffolding, `@id` graph, glossary, and answer blocks are already in place. The citation gap is closed not by adding more schema types but by **(1) fixing the price-mismatch defect that endangers the money pages, (2) filling the 15 thin export pages with the FAQ + customs + supply-terms data AI engines quote, (3) giving every product an entity, and (4) tightening author, citation, and entity-graph trust signals.** Actions 1–4 alone convert the pages most likely to win B2B AI citations from "present but un-citable" to "the source the engine quotes."
