# GSC Growth Plan - DryGelWorld (Impressions -> Clicks -> Rankings -> International)

**Property:** `https://www.drygelworld.com/` (domain ~2 months old; GSC verified, under-used)
**Stack:** Next.js 16 App Router - 73 keyword-landing slugs (`src/lib/seo-landing-pages.ts`) + 20 export-market pages (`src/app/export/markets.ts`) + 6 industries + 3 compares + blog + ~18 static routes
**Provenance lock:** only **ISO 9001:2015 + DMF-free** are held. Nothing in this plan recommends claiming FDA / REACH / Halal / GMP / JEDEC / "food-grade." Compliance is always framed as a buyer-led discussion.
**Scope of this doc:** This is the **operating manual for the GSC instrument** at a 2-month-old site. It does **not** repeat the strategy already written. It deliberately **extends**:

- `SEO-CRO-FULL-AUDIT.md` -> "Google Search Console & GA4 Plan (Early-Stage Site - Month 1-3)" (lines 1673-1699) and "Google Search Console Monitoring Strategy" (1625-1628). That section reframes the metrics and lists the Week-1 pulls; **this doc turns each pull into a symptom?root-cause?fix decision tree tied to specific files, then sequences the fixes by week and attaches numeric targets.**
- `GSC-INDEXING-BATCHES.md` -> the 8-day Request-Indexing schedule. **This doc adds what to do *after* a batch (how to read the coverage buckets it produces) and how to re-batch once cannibalization is consolidated.**
- `COMPETITOR-STRATEGY.md`, `INTERNATIONAL-SEO.md`, `TOPICAL-AUTHORITY-MAP.md`, `CONTENT-PACK.md` are the *supply* of fixes; this doc is the *measurement + sequencing* layer that decides which fix to ship in which week based on what GSC actually reports.

> **How to use this with the audit:** When the audit says "fix H12" (thin templates) it tells you *how to write the page*. This doc tells you *which GSC bucket will shrink when you do, by how much, and in which week to expect it.* Read them together; do not duplicate the work.

---

## 0. The one-paragraph thesis

At 2 months old, DryGelWorld's GSC problem is **not rankings - it is a leaky funnel before rankings even begin.** The site ships ~110 URLs into the sitemap, but a large slice of them are (a) **near-duplicate templated bodies** (H12 - `keywordClusterPage()` injects identical `specsIntro`/`buyingIntro`/`buyingSteps` into ~55 of the landing pages), (b) **orphaned** (H13 - 22 slugs have zero internal links), and (c) **cannibalizing each other** (H10/H11 - ~10 clusters with 2-8 self-canonical URLs each, plus `/export/[country]` fighting `/silica-gel-exporter-[country]`). The result in GSC is predictable and measurable: most non-money URLs sit in **Discovered/Crawled - currently not indexed**, the indexed ones split impressions across competing URLs so **no single URL accumulates ranking authority**, and the few pages that do earn impressions have **compacted, keyword-stuffed meta descriptions** that suppress CTR. The growth job for the next ~90 days, in order: **(1) get the right URLs indexed, (2) consolidate so one URL per intent collects all the impressions, (3) lift CTR on the impression-earning pages with better titles/descriptions, (4) point the consolidated authority at the export/country queries that are the business goal.** GSC is the instrument that tells you which lever is binding *this week*.

---

## 1. Diagnostic Framework - symptom -> root cause IN THIS CODEBASE -> fix -> which doc owns the fix

Read each row as: *"If GSC shows X, the cause is almost certainly Y in this repo; ship Z; expect bucket/metric W to move."* This is the lookup table you run every week against the live reports.

### 1.1 Indexing symptoms

| GSC symptom (where to see it) | Root cause in this codebase | Fix | Owner doc / finding |
|---|---|---|---|
| Many URLs in **Indexing -> Pages -> "Discovered - currently not indexed"** | Sitemap lists ~110 URLs but 22 landing slugs are **orphans** with zero internal links (`src/lib/seo-landing-pages.ts` slugs reachable only via `sitemap.ts`). A sitemap entry alone is a weak crawl signal; Google defers crawl. | De-orphan: add internal links from home/export/industry hubs and from `SeoLandingPage` "related links" so every slug is depth =3. | Audit **H13**; `TOPICAL-AUTHORITY-MAP.md` interlink plan |
| Many URLs in **"Crawled - currently not indexed"** | **Thin/templated bodies** - `keywordClusterPage()` hard-codes identical `specsIntro`, `buyingIntro`, and 3 `buyingSteps` across ~55 of 73 slugs. Google crawls, perceives scaled near-duplicate, withholds the index slot. | De-template: give each surviving slug a unique `buyerGuide`, unique lead/use-cases, real specs. Prioritize money slugs first. | Audit **H12**; supply in `CONTENT-PACK.md` |
| **"Duplicate without user-selected canonical"** or **"Alternate page with proper canonical tag"** clusters | **Self-canonical cannibalization.** `landingPageMetadata()` sets `canonical: /${page.slug}` for every page, so 8 container/cargo URLs + the `food-grade` / `blue` / `orange` / `packets` clusters each declare themselves canonical -> Google picks one and buckets the rest as duplicates. | Consolidate each cluster to ONE canonical URL; 301 or `rel=canonical` the rest into it (do **not** delete - keep them as `rel=canonical` satellites so existing equity/links survive). | Audit **H10**; consolidation map in -2.4 below |
| **`/export/[country]` and `/silica-gel-exporter-[country]` both indexed, both ranking ~30-60, neither in top 20** | **Two parallel country systems** target the same query and are both self-canonical + both in sitemap (`export/markets.ts` has usa/uk/germany/canada/pakistan; registry has `silica-gel-exporter-usa/germany/canada`, `silica-gel-supplier-uk`). The site nominates two winners per country. | Pick one canonical per country (recommend `/export/[market]` - it carries the reciprocal hreflang cluster already). Canonicalize the geo-landing into it; repoint internal links. | Audit **H11**; `INTERNATIONAL-SEO.md` |
| **Sitemaps report shows "Couldn't fetch" or stale "Last read"** / lastmod distrusted | Historically the sitemap stamped `new Date()` per deploy - fixed to a stable `sitemapLastModified = "2026-05-08"` in `src/lib/seo.ts`. If content changes but that constant is **not bumped**, Google sees no freshness and slows recrawl of updated pages. | Bump `sitemapLastModified` whenever bodies materially change (after the H12 de-template push), then resubmit sitemap. | Audit **M1**; `src/lib/seo.ts:31`, `src/app/sitemap.ts:82` |
| AI/grounding bots or even Googlebot blocked at the edge | `src/app/robots.ts` allows `/`, but the in-code comment warns a **CDN "managed AI bots" toggle can inject an edge robots.txt that overrides this file**. | Verify `curl -A Googlebot https://www.drygelworld.com/robots.txt` returns the app's rules; disable the managed-AI-bots toggle in the CDN/Vercel dashboard. | Audit **M3**; `src/app/robots.ts:5-13` |
| `/preview/*` URLs appearing in coverage | They are `Disallow`-ed in robots and excluded from sitemap - correct. If they appear, something is linking to them. | Leave robots as-is; find/remove the stray internal link. | `src/app/robots.ts:24` |

### 1.2 CTR / impressions-without-clicks symptoms

| GSC symptom | Root cause in this codebase | Fix |
|---|---|---|
| Page earns impressions, **CTR < 1% at positions 5-15** (Performance -> Pages, add CTR + Position columns) | **Compacted, keyword-stacked meta descriptions.** `compactSeoDescription()` (`seo-landing-pages.ts:4098`) truncates at 158 chars and the source descriptions read as keyword lists, e.g. `silica-gel-supplier`: *"Silica gel supplier for packets, bulk desiccants, packaging moisture control, container desiccants, private-label sachets, SDS, COA, and worldwide export RFQs."* - six comma-separated nouns, zero benefit/hook. | Rewrite descriptions as one buyer-benefit sentence + one differentiator (since 1983 / manufacturer-direct Karachi / SDS+COA on request). Keep =155 chars so `compactSeoDescription` doesn't chop mid-word. |
| **Titles truncated in SERP** | `compactSeoTitle()` (`seo-landing-pages.ts:4089`) drops everything after the first `\|` once >60 chars, so `"Container Desiccant Supplier \| Cargo Moisture Control"` may render as just `"Container Desiccant Supplier"` - losing the qualifier that wins the click. | Author titles =60 chars so the qualifier survives, and front-load the query term + a trust token, e.g. `Container Desiccant Supplier - Export, Since 1983`. |
| Homepage ranks for brand + a few head terms but **CTR low vs position** | Root `title`/`description` in `src/app/layout.tsx:37` is generic ("Silica Gel Manufacturer & Exporter \| DryGelWorld"). Fine for brand, weak for the head term it actually shows for. | A/B the description toward export buyers; the audit's H18 (leaked editorial notes) and H17 (country-count conflict) also undermine SERP trust - fix those first. |
| **Sitelinks / rich-result eligibility lower than competitors expect** | Actually a **strength** - Organization/WebSite/Service/BreadcrumbList JSON-LD already ships in `layout.tsx`; **no verified competitor (Multisorb, IMPAK, Desiccant Pak, CILICANT) exposes structured data.** | Don't fix - exploit. Track "rich result" impressions in GSC -> Search Appearance; this is the CTR moat. |

### 1.3 Ranking / authority symptoms

| GSC symptom | Root cause | Fix |
|---|---|---|
| **Impressions flat across a whole cluster, position stuck ~30-60** | Equity split across cannibalizing URLs (H10/H11) - PageRank divided 3-8 ways means no URL clears page 1. | Consolidation (-2.4) is the single highest-leverage ranking action; expect the surviving URL's position to jump once siblings canonicalize into it. |
| **Money-cluster queries appear at position 8-30 ("striking distance") but won't break top 5** | Page is indexed but under-linked (depth + few internal anchors) and/or thin (H12). | Add 3-5 internal links with the exact query as anchor text from high-authority pages (home, `/products`, relevant industry); enrich the body. |
| **Country queries (`silica gel supplier germany`, `container desiccant exporter usa`) get impressions in Performance -> Countries but not clicks** | hreflang/canonical contradiction (H11) means Google can't decide which DryGelWorld URL to serve to that country. | Resolve H11 canonical-per-country; the reciprocal hreflang cluster on `/export/[market]` then *reinforces* instead of fighting. |
| **Author/E-E-A-T queries absent** | `/authors/dry-gel-world-export-desk` is thin; blog lacks Person schema bylines. | Build the author entity (audit H19) - matters for the buyer-guide/blog cluster that earns top-funnel impressions. |

### 1.4 Mobile-UX & Core Web Vitals impact on GSC

| GSC symptom | Root cause | Fix |
|---|---|---|
| **Experience -> Core Web Vitals (Mobile)**: URLs in "Needs improvement / Poor"; or **engagement ~11s** in GA4 = SERP pogo-sticking that suppresses position over time | Missing `viewport` export (audit H5), `.announcementBar` 100vw horizontal overflow (H6), header-offset/scroll-padding bug (H7), hero double-fetch WebP preloads (H23). On mobile these read as layout shift + slow LCP + janky scroll -> users bounce -> Google demotes. | Ship the H5/H6/H7/H23 quick-wins (audit "Quick-Win Checklist"). These are the **fastest GSC-visible wins** because CWV is mobile-first indexed. |
| **Mobile Usability**: "Content wider than screen" / "Text too small" | H6 overflow + `--ds-text-faint` contrast (M27). | Same quick-wins + darken faint token to `#5b6675` (M27, AA). |
| **Low-authority pages dragging the whole property** | Helpful-Content systems assess site-wide quality; ~55 templated near-dupes (H12) can depress *even the good pages'* perceived quality. | De-template is therefore not just per-page - it lifts the **site-wide** quality signal. Prioritize it. |

---

## 2. Exact GSC reports to pull - and how to read them AT THIS STAGE (2-month site)

> The audit lists *which* reports to open in Week 1. This section is the **reading protocol**: what number is "good" for a 2-month site, what each anomaly means here, and the exact filter/sort to apply. Do this with the H12/H13/H10/H11 lens above.

### 2.1 Indexing -> Pages (the master health gauge right now)
- **Pull:** the "Not indexed" table; expand every reason row; export each list.
- **Read it like this at 2 months:**
  - **Discovered - currently not indexed** - *expected to be the biggest bucket.* These are mostly the **22 orphans (H13)** + long-tail landing slugs. Action: de-orphan (-3, Week 2) + Request-Indexing only the money ones (use `GSC-INDEXING-BATCHES.md`). Healthy trajectory: shrinking 10-20% week over week.
  - **Crawled - currently not indexed** - the **quality flag.** If a *money* slug sits here, it's the H12 thin-template signal. Action: de-template that exact slug first. Target: money slugs **out** of this bucket by Month 2; tolerate long-tail here through Month 3.
  - **Duplicate without user-selected canonical / Alternate page with proper canonical** - read the "Google-selected canonical" column. If it differs from the page's own URL, you've found a **live cannibalization pair** (H10/H11). Log the URL + Google's chosen canonical; feed it into -2.4.
  - **Page with redirect / Not found (404) / Soft 404** - should be ~0 for a new site; if present, a sitemap/link references a dead slug.
- **Cross-check:** counts here should reconcile against the 8-batch list. After Batch 8, anything *still* "Discovered" past 30 days is a crawl-budget/quality problem, not a patience problem.

### 2.2 Sitemaps
- **Pull:** confirm `sitemap.xml` = **Success**, "Discovered URLs" - 110 (18 static + products + 73 landing + 6 industries + 20 export + blog + 3 compare + author).
- **Read:** if Discovered < ~110, the sitemap didn't regenerate - check the deploy. After any H12 de-template push, **bump `sitemapLastModified`** then **resubmit** (don't just wait).

### 2.3 Performance -> Queries - striking-distance protocol (positions 8-30)
- **Pull:** date range = **last 28 days** (not 3 months - at this age 3 months dilutes the recent trend); enable **Impressions, Clicks, CTR, Position**; sort by **Impressions desc**.
- **Build the striking-distance list:** filter **Position between 8 and 30**. These are the queries Google *already associates with the site* and that are one push from page 1. For each:
  - Map the query to the **single best canonical URL** (after -2.4 consolidation - before that, the query may be split across siblings; that itself is the diagnosis).
  - If CTR is low relative to position -> **metadata rewrite** (-1.2).
  - If position is stuck -> **internal links with exact-match anchor** + body enrichment (-1.3).
- **Stage-appropriate reading:** at 2 months, having *any* queries at 8-30 is a win; most will be long-tail (`silica gel packets wholesale`, `container desiccant exporter`). Head terms (`silica gel supplier`) will sit 40-90 - that's normal; don't chase them yet.

### 2.4 The cannibalization audit (Queries - Pages cross-tab) - DO THIS BEFORE consolidating
- **Method:** in Performance, click a striking-distance **query** -> switch to the **Pages** tab. **If two or more of your URLs appear for the same query, that query is cannibalized.** This is the live, data-backed version of H10/H11 (the audit found the clusters structurally; GSC confirms which are actually competing in the wild).
- **Known structural clusters to verify in the data (cite from `seo-landing-pages.ts` / `export/markets.ts`):**

  | Intent | Competing URLs (consolidate into the **bold** one) | Source |
  |---|---|---|
  | container/cargo desiccant | **`/container-desiccant-supplier`**, `/container-desiccant`, `/container-desiccant-supplier-worldwide`, `/container-desiccant-strips`, `/shipping-container-desiccant-supplier`, `/shipping-container-moisture-control`, `/cargo-desiccant-supplier`, `/moisture-absorber-for-shipping` | H10 |
  | food-grade silica gel | **`/food-grade-silica-gel-supplier`**, `/food-grade-silica-gel` | H10 |
  | blue silica gel | **`/blue-silica-gel-manufacturer`**, `/blue-silica-gel` | H10 |
  | orange silica gel | **`/orange-silica-gel-supplier`**, `/orange-silica-gel` | H10 |
  | silica gel packets | **`/silica-gel-packets`**, `/silica-gel-packets-manufacturer`, `/silica-gel-packets-wholesale` | H10 |
  | Germany | **`/export/germany`**, `/silica-gel-exporter-germany` | H11 |
  | USA | **`/export/usa`**, `/silica-gel-exporter-usa` | H11 |
  | Canada | **`/export/canada`**, `/silica-gel-exporter-canada` | H11 |
  | UK | **`/export/uk`**, `/silica-gel-supplier-uk` | H11 |

  > **Guardrail:** do **not delete** the satellite slugs. Keep them live and set their `canonical` to the chosen winner (a content/`landingPageMetadata` change the user applies later), so existing impressions/links flow to one URL instead of being lost. The registry stays intact.

### 2.5 Performance -> Pages
- **Pull:** sort by Impressions. **Zero-impression indexed pages** = de-orphaning targets (H13). **High-impression / low-CTR pages** = metadata-rewrite targets (-1.2).

### 2.6 Performance -> Countries (the international scorecard)
- **Pull:** sort by Impressions; watch the 21-market target set (`export/markets.ts`: UAE, Saudi, Qatar, USA, UK, Germany, Canada, Australia, India, Pakistan, etc.).
- **Read:** at 2 months, expect Pakistan/India/UAE to lead (proximity + brand). The *goal* markets (USA/UK/Germany/Canada/Australia) appearing at all = leading indicator. If a goal country shows impressions but the wrong URL (geo-landing vs `/export/*`) -> that's H11 live; consolidate.

### 2.7 Experience -> Core Web Vitals + Mobile Usability
- **Pull (Mobile first):** after shipping H5/H6/H7, use **"Validate Fix"** to force re-evaluation rather than waiting 28 days.

---

## 3. Prioritized action plan - sequenced by week (impressions -> clicks -> rankings -> international)

> Sequencing logic: **crawl/index plumbing first** (nothing ranks if it's not indexed) -> **consolidation** (so impressions concentrate) -> **CTR** (convert impressions to clicks) -> **international** (point concentrated authority at country queries). This is the *ordering and measurement* layer over the fixes the audit/CONTENT-PACK already specify - it does not redefine them.

### Week 1 - Instrument + unblock the crawler (no ranking work yet)
1. **Verify the edge isn't blocking Google:** `curl -A Googlebot https://www.drygelworld.com/robots.txt` -> must show the app's rules from `src/app/robots.ts`; disable the CDN managed-AI-bots toggle if it overrides (M3).
2. **Confirm Sitemaps = Success -110 URLs** (-2.2). Resubmit if stale.
3. **Pull the Week-1 baseline** (the audit lists this; record the numbers into the -4 scorecard): indexed vs not-indexed count + each reason; full Queries export; Pages export; Countries; CWV mobile status.
4. **Ship the mobile/CWV quick-wins** (H5 viewport, H6 overflow, H7 header offset, H23 hero double-fetch) - fastest GSC-visible win and directly attacks the 11s engagement (audit GA4 note). Use GSC "Validate Fix."
5. **Run `GSC-INDEXING-BATCHES.md` Batch 1-2** (money pages + authority assets).

### Week 2 - De-orphan + start de-templating the money slugs
1. **De-orphan the 22 orphans (H13)** via internal links (home/export/industry hubs + `SeoLandingPage` related-links). Prioritize export terms: `silica-gel-exporter-usa/germany/canada`, `silica-gel-supplier-uk`, `cargo-desiccant-supplier`, `silica-gel-for-leather-export`. -> shrinks **Discovered - not indexed**.
2. **De-template the top ~10 money slugs (H12)** with unique `buyerGuide`/specs from `CONTENT-PACK.md`. -> moves them out of **Crawled - not indexed**.
3. **Run Batch 3-4** (export markets + industries).
4. **Bump `sitemapLastModified`** and resubmit after the content push.

### Week 3 - Consolidate cannibalization (the ranking unlock)
1. **Run the -2.4 cross-tab** on live data; confirm which structural clusters actually compete.
2. **Canonicalize each cluster into its winner** (container/cargo 8?1, food-grade 2?1, blue 2?1, orange 2?1, packets 3?1) - content change to `canonical` only; keep slugs live.
3. **Resolve H11 per country:** canonical `/silica-gel-exporter-[country]` -> `/export/[country]`; repoint internal links so the reciprocal hreflang cluster reinforces. -> unlocks the international goal.
4. **Run Batch 5-6** (commercial-intent blogs).

### Week 4 - CTR harvest on impression-earning pages
1. From **Pages (high-impression / low-CTR)** and **striking-distance Queries (-2.3)**, rewrite the worst **titles =60 chars** (so `compactSeoTitle` keeps the qualifier) and **descriptions =155 chars** as benefit+differentiator (replace the comma-list pattern cited in -1.2).
2. Add **exact-match internal anchors** to the 8-30 queries' canonical URLs.
3. **Run Batch 7-8**; for Batch 8's free slot, pick the highest-impression query from the Week-3 export.

### Weeks 5-8 - Compound: content + international depth
1. **De-template the remaining ~45 landing slugs** in priority order (export > industry > color/format > PPE).
2. **Build the author entity** (H19) + Person-schema bylines on `/blog/*` (top-funnel impression driver + E-E-A-T).
3. **Publish the striking-distance content** from `TOPICAL-AUTHORITY-MAP.md`/`CONTENT-PACK.md` targeting queries that surfaced at 20-50.
4. **International push:** ensure every target country in `export/markets.ts` has a de-orphaned, consolidated, hreflang-reinforced `/export/[market]` page; begin the `BACKLINKS-PLAYBOOK.md`/`OUTREACH-KIT.md` Tier-1/2 citations that build off-site entity authority for export queries.
5. **Post-Batch-8 discipline:** stop manual Request-Indexing; let sitemap + IndexNow (`npm run indexnow`) + internal links carry the long tail. Anything still "Discovered" past 30 days -> treat as quality/crawl-budget, not patience.

### Weeks 9-12 - Convert striking-distance to page 1
- Re-run -2.3 weekly; for every query now at 8-15, add one more authoritative internal link + one body enrichment; pursue 1-2 editorial backlinks to its canonical URL.
- Re-batch a *fresh* indexing list (per `GSC-INDEXING-BATCHES.md` closing note) reflecting the **consolidated** URL set.

---

## 4. Metrics scorecard - realistic month-by-month targets

> Baseline = Week-1 pull (-3). Targets assume the Week-1?Week-8 fixes ship on cadence. At this age **impressions and indexed-count are the real KPIs; clicks lag.** These extend (with numbers) the qualitative "what working looks like" in the audit (lines 1694-1698).

| Metric (GSC unless noted) | Baseline (Wk 1) | Month 1 | Month 2 | Month 3 | How to pull |
|---|---|---|---|---|---|
| **Indexed pages** (Indexing -> Pages, "Indexed") | record | +30-50% | money + export + industry all indexed | =85% of ~110 URLs | -2.1 |
| **Discovered - not indexed** | record (expect high) | -20% | -50% | <10 (mostly long-tail PPE) | -2.1 |
| **Crawled - not indexed** | record | money slugs out | <10 | <5 | -2.1 |
| **Duplicate/alternate-canonical** | record | falling | -0 after -2.4 | 0 | -2.1 |
| **Total impressions / 28 days** | record | 2-4- | 5-10- | 10-20- (hundreds?low-thousands) | Performance |
| **Queries at position 8-30** | record (few) | grows | 10-25 | 25-50 | -2.3 |
| **Total clicks / 28 days** | likely <10 | low double digits | 20-60 | 50-150 (begins to trend) | Performance |
| **Avg CTR on pages w/ impressions** | record | rising post-rewrite | >1.5% | >2.5% | -2.5 |
| **Target-country impressions** (USA/UK/DE/CA/AU) | record | each =1 appears | rising; right URL serves | striking-distance entries | -2.6 |
| **Mobile CWV "Good" URLs** | record | money pages Good | all primary Good | all Good | -2.7 |
| **Referring domains** (Links report) | record | +2-5 | +5-12 | +10-20 (Tier1/2 + editorial) | Links |
| **GA4 engagement time** (context only) | ~11s | >20s | >30s | >40s | GA4 (set industry = Manufacturing, audit note) |

**Day-90 definition of success (numeric):** =85% of sitemap URLs indexed; Crawled/Discovered-not-indexed each <10; zero live duplicate-canonical pairs; 25-50 queries in striking distance; impressions 10-20- baseline; every target export country showing impressions on its **single** canonical URL; mobile CWV "Good" on all primary pages.

---

## 5. Cross-reference index (so this doc stays a measurement layer, not a duplicate)

- **What to fix & how:** `SEO-CRO-FULL-AUDIT.md` (H5/H6/H7/H10/H11/H12/H13/H17/H18/H19/H23, M1/M3/M27; Quick-Win Checklist).
- **Request-Indexing schedule:** `GSC-INDEXING-BATCHES.md` (Batches 1-8 + coverage-bucket triage).
- **Content supply for de-templating:** `CONTENT-PACK.md`, `TOPICAL-AUTHORITY-MAP.md`.
- **International canonical/hreflang:** `INTERNATIONAL-SEO.md`.
- **Authority/links:** `BACKLINKS-PLAYBOOK.md`, `OUTREACH-KIT.md`.
- **Page-level outperform plan:** `COMPETITOR-STRATEGY.md` (recall: the verified competitors expose **no** structured data - DryGelWorld's existing Organization/WebSite/Service/BreadcrumbList JSON-LD in `src/app/layout.tsx` is the CTR/rich-result moat to defend).
- **Key code touchpoints cited here:** `src/lib/seo-landing-pages.ts` (registry, `landingPageMetadata` canonical line 4119, `compactSeoTitle` 4089, `compactSeoDescription` 4098), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts` (`sitemapLastModified` line 31), `src/app/export/markets.ts`, `src/app/layout.tsx` (root metadata line 37).

*Provenance reminder for every metadata/copy rewrite triggered by this plan: assert only ISO 9001:2015 + DMF-free; frame FDA/REACH/Halal/GMP/JEDEC/food-grade as buyer-led discussion, never a held certification.*

*Created 2026-05-29. Re-baseline the scorecard against a fresh GSC pull at Day 90 and regenerate the indexing batch list from the consolidated sitemap.*
