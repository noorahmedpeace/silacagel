# DryGelWorld — SEO Audit & Growth Report

**Date:** 2026-07-12
**Domain profile:** New, low-authority B2B silica-gel / desiccant exporter. ~50/50 mobile/desktop. Very low current volume (~24 sessions / 3 days at time of audit).
**Scope:** Technical SEO, on-page/content SEO, cannibalization & keyword gaps, internal-linking & topical authority, and structured data (JSON-LD).

---

## 1. Executive Summary — Why Organic Customers Are Low

The single most important finding: **this site is not losing organic customers because of weak content — it is losing them because of low domain authority combined with a set of self-inflicted on-page dilution problems that stop its genuinely strong content from ranking.**

The evidence cuts in two directions:

**What is already strong (do not "fix" what works):**
- Deep topical coverage: 44+ blog articles, 18 buyer-comparison pages (`src/lib/compare-data.ts`), a ~50-term glossary, 8 industry pages, ~20-24 export-market country pages, 8 case studies, and two working calculators.
- Well-instrumented structured data: a clean `Organization` + `WebSite` + `LocalBusiness` `@graph` with `@id` cross-linking, `sameAs`/Wikidata, ISO `hasCredential`, `Product`+`Offer`, `FAQPage`, `BreadcrumbList`, `DefinedTermSet`, `HowTo`/`WebApplication` on tools (`src/app/layout.tsx`).
- Honest, verifiable trust infrastructure: a real third-party-verifiable ISO 9001:2015 certificate, downloadable SDS/COA/TDS library (`src/lib/document-registry.ts`), and an "honest scope" compliance disclosure on `/about`.

**Why organic demand still does not convert into customers:**

1. **Domain authority is the dominant off-site lever, and it is near zero.** As a new domain, internal links are the *only* PageRank source until backlinks arrive — and the internal-link graph is leaking badly (see Section 5). Scale claims are self-asserted from a sister site, and there are no external citations/backlinks feeding authority.
2. **On-page cannibalization splits thin link equity across near-duplicate pages.** The 66-page landing system in `src/lib/seo-landing-pages.ts` systematically ships both a bare-term page and a `-supplier`/`-manufacturer` twin for the same intent, so no single URL accumulates enough authority to rank (Section 4).
3. **Topical focus is diluted.** ~27% of landing pages (18 of 66) target hair nets / beard covers / PPE — unrelated to every desiccant target term — weakening the core "silica gel / desiccant" entity signal (Section 3).
4. **~48% of the money pages are orphaned or near-orphaned.** 15 landing pages have zero internal links; 16 more have a single sibling link. The homepage — the strongest URL — passes almost no equity (Section 5).
5. **Structured-data defects put the only Product rich-result surface at risk** (Section 6), and thin export/AI-answer coverage cedes AI-Overview/Perplexity citations to competitors.
6. **CRO leaks** (a built-but-unmounted WhatsApp float, hidden mobile trust signals, a calculator that dead-ends into WhatsApp) mean the little organic traffic that does arrive under-converts.

**Bottom line:** Concentrate the existing authority (consolidate cannibalizing twins, fix orphans, close two keyword gaps), fix the structured-data price mismatch, and then aggressively pursue backlinks — authority is what ultimately gates ranking on a new domain.

---

## 2. Technical SEO Findings

| # | Finding | Evidence |
|---|---------|----------|
| T1 | **Sitemap dilutes crawl budget** — all 66 landing pages, including thin templated size/geo doorway variants and off-topic PPE, are pushed to the sitemap at priority 0.8. | `src/app/sitemap.ts` (`Object.keys(seoLandingPages)` loop) |
| T2 | **Duplicate URLs emitted in sitemap** — `/private-label` (and `/drygelworld`) appears twice: once in `STATIC_ROUTES` and again in the `seoLandingPages` loop. | `src/app/sitemap.ts` line ~46 (STATIC_ROUTES) and line ~109 (loop) |
| T3 | **Thin / templated doorway pages** — hair-net size variants (18/20/22-inch) share identical proofPoints, formats, buyerTypes, documents, quoteBasis, hero image and near-identical FAQs; ~40 cluster pages inject an identical `specsIntro`/`buyingIntro`/`buyingSteps` block byte-for-byte. Triggers helpful-content / doorway signals. | `src/lib/seo-landing-pages.ts:2145-2274`; shared boilerplate in `keywordClusterPage()` `:160-191` |
| T4 | **Hardcoded `priceValidUntil: "2026-12-31"`** on product Offers — lapses in under 6 months, silently dropping Product rich-result eligibility with no build-time guard. | `src/app/products/[slug]/page.tsx:1014` |
| T5 | **Hardcoded "Mexico" headings** in the export template — currently harmless (only `mexico` populates those sections) but a latent bug before extending to other markets. | `src/app/export/[market]/page.tsx:384,405` |
| T6 | **No visible breadcrumbs** anywhere — `BreadcrumbList` exists only in JSON-LD; deep pages give crawlers/users no visible upward link to hubs. | 17 pages emit `breadcrumbJsonLd`; no visible breadcrumb component in `src` |
| T7 | **Orphaned/dead CSS** — a large mobile media block styles a retired hero design (`.heroBgImage`, `.heroTrustBar`, `.whatsAppFloat`, etc.) no longer in markup, shipping dead CSS to every visitor. | `src/app/page.module.css:3062-3170` (live hero rules are at `:6360-6456`) |

---

## 3. On-Page / Content SEO Findings

| # | Finding | Severity | Evidence |
|---|---------|----------|----------|
| C1 | **Topical-authority dilution from PPE** — 18 of 66 landing pages (~27%) target hair nets / beard covers plus 3 PPE blog posts and nitrile-glove products, unrelated to every desiccant term. Splits the domain's entity signal across two unrelated categories. | High | `src/lib/seo-landing-pages.ts` slugs `:1749-2761`; `src/lib/product-data.ts:435,466,345,390`; `src/app/blog/articles.ts:1463,1694,1814` |
| C2 | **Weak / generic anchor text** — a default `View Product Range` → `/products` secondary CTA is injected on every cluster page; some `relatedLinks` use non-keyword anchors (e.g. "Hair net supplier (general)"). Site-wide repetition wastes keyword-context signal. | Low | `src/lib/seo-landing-pages.ts:148` (default secondaryCta), `:2180` |
| C3 | **No troubleshooting / problem-solution content** — all 43 articles are explainer/procurement guides; none target urgent failure-mode queries ("mold in container despite desiccant", "cargo arrived wet", "silica gel packet still wet"). These are low-competition, highly AI-answerable, high-intent re-order moments. | High | `src/app/blog/articles.ts:41-4656` (no "why is my / fixing" framing) |
| C4 | **Missing "best desiccant for [application]" commercial pages** — only `best-desiccant-for-shipping-containers` exists as a blog post; the exact-match "best desiccant for electronics/pharma/food/metal parts" decision query is uncaptured (industry pages target supplier intent, not material-choice intent). | Medium | `src/app/blog/articles.ts:1583`; `src/app/industries/[industry]/page.tsx` |
| C5 | **Only 2 calculators despite demand** — blog articles on DIN 55473 units and packets-per-box beg for a matching interactive tool; no product-selector or ROI/cost-of-damage tool exists. Interactive tools are the cheapest way a low-authority domain earns AI citations and backlinks. | High | `src/app/tools/` (2 dirs); `src/app/blog/articles.ts:3977,4081` |
| C6 | **Thin AI/GEO coverage on export pages** — only 5 of 20 country pages carry `faqs` (no `FAQPage` on the other 15) and only ~6 carry a customs table; "silica gel supplier in <country>" is the highest-intent B2B query class and prime AI-Overview real estate. | High | `src/app/export/markets.ts` (`faqs`×5, `customs`×6, `moq`×5); `src/app/export/[market]/page.tsx:204,296,336` |
| C7 | **Only 9 of 46 blog articles carry external citations**, and all editorial content is attributed to a single anonymous "Export Desk" org author whose stored `credentials` are never emitted into schema — weak E-E-A-T for a domain that needs every trust signal. | Medium | `src/app/blog/articles.ts` (`sources`×9); `src/lib/authors.ts`; `src/app/blog/[slug]/page.tsx:244,262` |

---

## 4. Cannibalization & Keyword Gaps

The landing system repeatedly ships multiple URLs for one buyer intent, splitting authority on a domain that cannot afford it.

**Cannibalization clusters (consolidate via 301 + canonical):**

| Cluster | Competing URLs | Recommended action | Evidence |
|---------|---------------|--------------------|----------|
| Moisture absorber | `moisture-absorber-manufacturer`, `moisture-absorber-supplier`, `moisture-absorber-for-shipping`, `shipping-container-moisture-control` (near-identical H1s; manufacturer page even lists "moisture absorber supplier" in its own keywords) | Keep `/moisture-absorber-supplier` canonical; 301 the rest in | `seo-landing-pages.ts:1588-1624`, `:4137-4186` |
| Bare-term vs -supplier twins | `container-desiccant` / `-supplier`; `industrial-desiccant` / `-supplier`; `desiccant-bags` / `-supplier`; silica-gel-packets trio | Pick head term per pair, merge, 301 loser, update relatedLinks | `seo-landing-pages.ts:927/996, 732/771, 1078/1117` |
| Container / shipping-container desiccant | 6 landing pages + `/products/container-strips` + 3 blog posts for the highest-value B2B term | Designate `/shipping-container-desiccant-supplier` as hub; keep strips product page; 301 remaining 3 | `seo-landing-pages.ts:926,995,3369,4222,1627,2805` |
| Private-label / OEM | `private-label`, `private-label-desiccant-packets` (titles differ by one word), `oem-silica-gel-manufacturer`, `private-label-silica-gel-supplier` | Consolidate to `/private-label-desiccant-packets`, 301 the other three | `seo-landing-pages.ts:1284,3544,1165,1206` |
| Generic silica gel head | `silica-gel-manufacturer`, `silica-gel-supplier`, `desiccant-manufacturer`, `industrial-desiccant-supplier`, `silica-gel-manufacturer-china-alternative` | Keep 2 intent-distinct pillars; fold `desiccant-manufacturer` in; keep china-alternative only if unique copy | `seo-landing-pages.ts:449,572,693,732,1037` |
| Geo pages vs `/export/[market]` | `silica-gel-supplier-uk` vs `/export/uk`; `-manufacturer-pakistan` vs `/export/pakistan`; `-supplier-karachi` vs `/export/fob-karachi`; UAE variants | Make `/export/[market]` canonical (richer customs/Incoterm data), 301 standalone twins | `seo-landing-pages.ts:2014,3645,3730`; `markets.ts:429,401,415,39` |

**Keyword-to-URL mismatches & gaps:**

- **"Clay desiccant" mismatch** — the target term is served at `/bentonite-clay` (its own `searchIntent` lists "clay desiccant supplier"), but no `/clay-desiccant-supplier` URL exists. Rename slug (301 old), make it the hub for the 3 geo clay pages. `seo-landing-pages.ts:2320-2329`.
- **"Export packaging" gap** — a listed target term with **no dedicated landing page**; covered only in informational blog posts. Create `/export-packaging-desiccant` commercial hub. `articles.ts:979,2054`.
- **Comparison gap** — no standalone `/compare/silica-gel-vs-activated-alumina` (only a 3-way blog post); no brand-alternative pages (Sorbead/Clariant/Container Dri). `compare-data.ts:560` has the calcium-chloride variant but not this one.

> Note (do NOT do): all silica-vs-clay / molecular-sieve / oxygen-absorber / calcium-chloride / bentonite / VCI / activated-carbon comparisons already exist. New material-vs-material comparisons would create thin/duplicate content — invest in tools and troubleshooting instead.

---

## 5. Internal Linking & Topical Authority

Internal links are the only PageRank source on this domain today, and the graph is leaking at the highest-value tier.

- **15 landing pages have ZERO internal links** (sitemap-only, near-zero crawl priority): including `silica-gel-supplier-karachi` (the HQ city), `silica-gel-manufacturer-china-alternative`, the `hair-net-supplier-*` and `beard-cover-supplier-*` geo pages, `dry-clay-desiccant-supplier-uae/-saudi-arabia`, `21-inch-hair-nets`, `non-woven-beard-covers`, `desiccants-for-pharma-industry`, `hair-nets-for-food-industry`, `moisture-absorber-for-shipping`. **(Critical.)**
- **16 more receive only a single sibling link** — combined, **~48% (31 of 64) of the money pages are orphaned or near-orphaned**.
- **No HTML hub for the landing-page tier** — nothing in `src/app`/`src/components` imports `seoLandingPages` to render a listing (only `sitemap.ts` and the `[seoSlug]` renderer do). Compare/industries hubs already do this dynamically and should be the template.
- **Homepage passes almost no equity** — only ~5 body links, none to `/export`, `/industries`, `/compare`, product categories, or top landing pages. `IndustryScrolly` cards link to `/contact` instead of the `/industries/[slug]` pages they showcase — a wasted hub-link opportunity. `src/app/page.tsx`, `src/components/industry-scrolly.tsx`.
- **43 blog articles carry no in-body contextual links** — equity flows only through a generic 3-column footer cluster widget; body sections render as plain `<p>{section.body}</p>`. `src/app/blog/[slug]/page.tsx`.
- **Head-term under-linking** — `/silica-gel` (widest intent) has just 1 inbound link (footer); `/buy-silica-gel` has 2.
- **Export & compare spokes buried** — 11 of 20 export markets and 7 calcium-chloride comparison pages are reachable only from their hub index (one buried link each).

**Highest-leverage fixes:** add the 15 zero-link pages to footer columns + contextual sources; build a `/desiccant-solutions` hub mapping all landing pages by theme; make `IndustryScrolly` and homepage link out to hubs and categories; add a visible breadcrumb component; seed 3-5 contextual in-body links per blog article.

---

## 6. Structured Data (JSON-LD) Findings

| # | Finding | Severity | Evidence |
|---|---------|----------|----------|
| S1 | **Product Offer price mismatch (highest structured-data risk)** — the Offer emits a concrete price (e.g. 0.0035 USD) that appears NOWHERE on the product page (visible text is only "Tiered industrial reference rates available"). Violates Google's price policy; can suppress the Product rich result and trigger Merchant disapproval. These 4 silica-gel pages are the ONLY ones with Product schema. | High | `src/app/products/[slug]/page.tsx:1010-1017`, `:709`; `product-data.ts:184,211,238,265` |
| S2 | **`/products` hub emits no JSON-LD** — no `ItemList`/`CollectionPage`, no `BreadcrumbList`, while `/compare` and `/industries` hubs have both. `/blog` and `/export` indexes also emit none. | Medium | `src/app/products/page.tsx`; contrast `compare/page.tsx:132-155`, `industries/page.tsx:92-108` |
| S3 | **Quote-only products have no offering entity** — 6-8 catalog items (both nitrile gloves, hair-nets, beard-covers, dry-clay, calcium-chloride) get FAQPage+Breadcrumb but no `Product` or `Service` node, because Product schema is gated behind published pricing. AI/Google cannot resolve them as entities. | Medium | `src/app/products/[slug]/page.tsx:998,526-531`; export pages use the `Service` pattern to avoid this |
| S4 | **Disconnected publisher/Organization duplicates** — blog, compare, guide, and author pages inline a fresh publisher `Organization` with no `@id` instead of referencing `#organization` (case-studies does it correctly). Weakens entity consolidation / E-E-A-T reinforcement. | Medium | `blog/[slug]/page.tsx:251-259`, `compare/[slug]/page.tsx:229-237`; contrast `case-studies/[slug]/page.tsx:195-200` |
| S5 | **No Review / aggregateRating despite real case-study attributions** — star ratings are the highest-CTR SERP enhancement and are omitted everywhere. Model only genuine, attributable case-study reviews (do NOT synthesize ratings for anonymous testimonials). | Medium | `products/[slug]/page.tsx:993-996`; `case-studies/[slug]/page.tsx:120-131` |
| S6 | **Editorial nodes lack `about`/`mentions`** linking to product/org/glossary `@id`s — the strong `@id` scaffolding is under-exploited; the knowledge graph stays disconnected between content and entities. | Low | `compare/[slug]/page.tsx:210-240`, `blog/[slug]/page.tsx:227-265` |
| S7 | **Reliance on deprecated HowTo/FAQPage rich results** — no correctness harm and still valuable for AI/GEO, but do not expect SERP accordions/carousels; reprioritize toward ItemList/Offer/Review work that still yields visible enhancements. | Low | `page.tsx:590-615`; `faq-block.tsx`; `seo-landing-pages.ts:4557-4566` |
| S8 | **LocalBusiness missing `priceRange`** (validator recommendation) — minor completeness gap. | Low | `src/app/layout.tsx:457-487` |

---

## 7. Prioritized Fix List

Ordered by leverage for a low-authority domain (impact ÷ effort). Expected impact is directional, not a guarantee — authority (Section 9) still gates ranking.

| # | Issue | Severity | Effort | Expected Impact | File(s) |
|---|-------|----------|--------|-----------------|---------|
| 1 | Mount the built-but-unrendered WhatsApp float globally (highest-intent mobile CTA, never shown) | Critical | Trivial | Largest absolute conversion lift for Gulf/S-Asia/Africa importers | `src/components/whatsapp-float.tsx`, `deferred-chrome.tsx` |
| 2 | Link the 15 zero-link landing pages from footer + contextual sources | Critical | Small | Immediate indexation + ranking lift, no new content | `site-footer.tsx`, `export/[market]/page.tsx`, `products/[slug]/page.tsx` |
| 3 | Fix Product Offer price mismatch — show indicative price on page OR use `priceSpecification` band | High | Small | Protects the ONLY Product rich-result surface (money pages) | `products/[slug]/page.tsx:1010-1017`, `:709` |
| 4 | Stop hiding the ISO badge + hero trust signals on mobile | High | Small | Above-the-fold credibility for 50% of sessions | `page.tsx:300-319`, `page.module.css:6425-6445` |
| 5 | Consolidate cannibalizing twins (container, moisture-absorber, private-label, bare/-supplier) via 301 + canonical | High | Medium | Concentrates authority on one URL per money term | `src/lib/seo-landing-pages.ts` (see Section 4) |
| 6 | Build a `/desiccant-solutions` landing-page hub (mirror compare/industries pattern) | High | Medium | Single crawl fan-out; ends near-orphaning of ~31 pages | new `src/app/desiccant-solutions/page.tsx` |
| 7 | Add homepage equity distribution: IndustryScrolly → `/industries/[slug]`, "explore by format" block, hub links | High | Small | Passes the domain's strongest page's authority downward | `page.tsx`, `industry-scrolly.tsx` |
| 8 | Author 3-4 FAQs + customs/supply-terms per remaining export market (rendering/schema already exist) | High | Medium | Wins "silica gel supplier in <country>" AI-Overview citations | `src/app/export/markets.ts` |
| 9 | De-emphasize PPE: drop size/geo doorways from sitemap, collapse 18 pages → 2-3 (or subdomain) | High | Large | Restores desiccant entity focus | `seo-landing-pages.ts`, `sitemap.ts` |
| 10 | Add the DIN 55473 / MIL-D-3464 desiccant-unit calculator (+ selector, ROI tools) | High | Medium | Backlink/AI-citation magnet + RFQ funnel | new `src/app/tools/*` |
| 11 | Replace generic anonymous testimonials with named/verifiable references + one external proof channel | High | Medium | Top B2B conversion lever for an unknown exporter | `page.tsx:195-220`, `case-study-data.ts` |
| 12 | Close keyword gaps: rename `/bentonite-clay`→`/clay-desiccant-supplier`; create `/export-packaging-desiccant` | Medium | Small/Medium | Captures two explicit target terms currently forfeited | `seo-landing-pages.ts:2320-2329` |
| 13 | Add `ItemList`+`BreadcrumbList` to `/products`, `/blog`, `/export` hubs | Medium | Small | Machine-readable catalog + breadcrumb SERP presentation | `products/page.tsx` (mirror `compare/page.tsx`) |
| 14 | Emit `Service` node for quote-only products (no `offers`) | Medium | Medium | Entity coverage for half the catalog | `products/[slug]/page.tsx:998` |
| 15 | Reference `#organization` `@id` instead of inlining publisher on blog/compare/guide/author | Medium | Small | Cheap E-E-A-T consolidation | `blog/[slug]/page.tsx:251`, `compare/[slug]/page.tsx:229` |
| 16 | Add a visible Breadcrumb component (reuse existing breadcrumbJsonLd arrays) | Medium | Medium | Real anchor-text links up to hubs on every deep page | shared component + product/blog/landing pages |
| 17 | Add contextual in-body links to 43 blog articles (3-5 each) | Medium | Large | Strongest internal-link signal; money-page anchor relevance | `articles.ts`, `blog/[slug]/page.tsx` |
| 18 | Add external citations (2-3) to the 37 uncited articles; surface author credentials into schema | Medium | Medium | GEO trust signal; better AI grounding | `articles.ts`, `authors.ts` |
| 19 | Route homepage price calculator to on-page RFQ (not WhatsApp-only); relabel button | High | Medium | Recovers desktop/no-WhatsApp importers who dead-end | `price-calculator.tsx:136-172` |
| 20 | Dynamic `priceValidUntil` (today+1yr); dedupe `/private-label` in sitemap; remove dead hero CSS | Low | Trivial | Removes silent-expiry cliff and crawl/render waste | `products/[slug]/page.tsx:1014`, `sitemap.ts`, `page.module.css:3062-3170` |

---

## 8. KPIs to Track

Track monthly (with a 90-day baseline captured now, since volume is currently tiny and noisy):

- **Organic sessions** — the headline demand metric (segment mobile vs desktop given ~50/50 split).
- **Indexed pages** (Search Console Coverage) — should rise as orphan links (fix #2) and the hub (#6) land; watch that consolidated/301'd twins drop out cleanly.
- **Average position for target terms** — track a fixed basket: `silica gel supplier`, `silica gel manufacturer`, `shipping container desiccant supplier`, `container desiccant`, `moisture absorber supplier`, `clay desiccant supplier`, `private label desiccant packets`, and `silica gel supplier <country>` for the priority export markets.
- **Impressions & CTR** per money page (validates cannibalization consolidation — the surviving URL should absorb the pair's combined impressions).
- **Crawl stats** — crawl requests to money pages vs PPE/doorway pages (validates #9).
- **RFQ conversions & source** — organic-attributed RFQs, WhatsApp clicks, sample requests (validates CRO fixes #1, #4, #11, #19).
- **AI-answer citations** — manual spot-checks in ChatGPT / Perplexity / Google AI Overviews for "silica gel supplier in <country>" and "which desiccant for <cargo>" (validates #8, #10).

---

## 9. Honest Note on Off-Site Authority

Every recommendation above is real and worth doing, **but on-page work alone will not close the gap.** For a new domain, **backlinks and domain authority are the dominant lever** — they are what ultimately decide whether even a perfectly-optimized page ranks. The on-page fixes here *concentrate and make usable* whatever authority the site earns; they do not create it.

The site's own scale claims (10M+ packets, 10,000+ customers) are currently self-asserted from a sister brand with no independent anchor. A parallel off-site program should run alongside these fixes: earn citations from trade directories, standards/customs references, and the sister brand (`silicagelpk.com`); pursue the interactive tools (fix #10) specifically because calculators attract the backlinks a promotional page cannot; and publish verifiable business/export registration alongside the ISO certificate. Without that authority work, expect the on-page fixes to produce incremental long-tail and geo-query wins, not head-term dominance.
