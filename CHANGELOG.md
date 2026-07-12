# Changelog — DryGelWorld Growth Project

This log records autonomous audit and growth passes. Newest entries on top.
Each entry is dated and states exactly what changed, what did **not** change, and the headline finding.

---

## 2026-07-12 — Implementation pass 1 (shipped to production)

Applied and **deployed** the safe, high-confidence subset of PRIORITY.md. Each change was build-verified (`npm run build`, exit 0) before push. The owner's uncommitted WIP (calcium-chloride product work across 7 files) was left untouched — none of the edits below touch those files.

### Shipped — CRO / internal-linking (commit `289b7ea`)
- **StickyQuoteBar on the homepage** (`href="#contact"`) — persistent CTA during the long homepage scroll; auto-hides while the RFQ section is in view. (`src/app/page.tsx`)
- **Restored the ISO 9001:2015 badge on the mobile hero** — it was `display:none`, leaving 50% of sessions with zero above-the-fold trust cues. (`src/app/page.module.css`)
- **IndustryScrolly cards now deep-link to `/industries/[slug]`** (keyword-rich anchor text) while keeping the Request-Quote CTA. (`src/components/industry-scrolly.tsx`, `src/app/page.tsx`)
- **Footer de-orphaning** — added `/silica-gel-supplier-karachi` (HQ city, previously zero internal links), `/private-label`, `/bulk-sales`. (`src/components/site-footer.tsx`)

### Shipped — cannibalization 301s (commits `9c1b726`, `605551a`)
Data-driven (GSC 90-day impressions). 301'd the weaker twin in each cluster to the impression leader; excluded all internal 301 sources from the sitemap.
- `/silica-gel-packets-manufacturer` (1 impr), `/silica-gel-packets-wholesale` (3) → `/silica-gel-packets` (165)
- `/moisture-absorber-manufacturer` (29) → `/moisture-absorber-supplier` (66)
- `/shipping-container-moisture-control` (23), `/container-desiccant` (52), `/container-desiccant-supplier` (28) → `/shipping-container-desiccant-supplier` (185)
- `sitemap.ts`: added `REDIRECTED_SLUGS` filter so redirecting URLs are no longer submitted.

### Deliberately NOT done (needs owner input — see PRIORITY.md)
- Product-page schema/link items (18, 42, 19, 33) — those files are in the owner's uncommitted WIP; would collide.
- Named testimonials / Review schema (6, 25) — needs **real** permission-cleared references; will not fabricate.
- Head-term / export-geo consolidation (silica-gel-manufacturer family, /export vs /silica-gel-exporter-*) — ambiguous intent + `/silica-gel-manufacturer-pakistan` ranks pos 5; left for a supervised decision.
- New tools/content pages (10, 15, 20, 36) — larger builds better done supervised for design quality.

### Reminder
The dominant lead lever remains **off-site authority + paid ads**, not these on-site refinements. These reduce funnel leaks and stop authority-splitting; they raise the ceiling but do not substitute for links/citations.

---

## 2026-07-12 — Autonomous audit pass 1

### What this run did
Ran an 8-lens multi-agent audit of the DryGelWorld codebase and generated six review deliverables in the repo root:

- **SEO_REPORT.md** — Technical + Content/On-page SEO: keyword targeting, cannibalization, topical authority.
- **GEO_REPORT.md** — GEO / AI-search answerability (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews, Bing Copilot) and structured-data (JSON-LD / Schema.org) validity, graph integrity, richness.
- **CRO_REPORT.md** — CRO + UX of the B2B lead-generation funnel (homepage → hero/CTAs → RFQ form → DryBot → calculators → trust signals → mobile).
- **FEATURES.md** — B2B content-gap + lead-gen feature strategy (tools, troubleshooting content, selectors, sample flow) and trust/differentiation gaps vs global desiccant suppliers.
- **PRIORITY.md** — Cross-lens prioritization of the consolidated findings by impact/effort.
- **TODO.md** — Actionable, file-referenced task list derived from the prioritized findings.

### What this run did NOT do
- **No source code was modified.** Not a single file under `src/` (or any application code) was touched.
- This was a deliberate, conservative choice: to respect the owner's uncommitted work-in-progress and to avoid unattended production risk from applying changes without review.
- All prioritized fixes are documented and **await human review** before any implementation.

### Key finding (honest summary)
The codebase is **genuinely strong** — deep topical content (44 blog articles, 18 comparison pages, ~50-term glossary, calculators, ~24 export-market pages), a well-formed Organization/WebSite/LocalBusiness JSON-LD graph, FAQ/Product/Article schema, and honest, verifiable trust infrastructure (real ISO 9001:2015 cert, SDS/COA library, transparent "honest scope" compliance disclosure). The problems are **not coverage — they are fragmentation, orphaning, and unrealized conversion leverage**:

- **Keyword cannibalization & over-fragmentation** — the 66-page landing system ships bare-term + `-supplier`/`-manufacturer` twins for the same intent; 6 pages compete for the single highest-value container/shipping-container term family; ~27% of landing pages target off-topic PPE, diluting the desiccant entity signal (`src/lib/seo-landing-pages.ts`).
- **Orphaned money pages** — ~48% of the highest-commercial-intent landing pages are orphan or single-sibling-linked; 15 have **zero** internal links (sitemap-only), including the HQ-city page `silica-gel-supplier-karachi`. The homepage passes almost no internal equity.
- **AI-answerability gaps** — 15 of 20 export-country pages are thin (no FAQPage, no customs/supply-terms tables); 6 of ~10 products emit no Product entity; only 9 of 46 blog articles carry external citations; all editorial content is attributed to a single anonymous org author.
- **One high-severity structured-data defect** — product Offer emits a concrete price (e.g. `0.0035 USD`) that appears **nowhere** on the visible page, risking rich-result suppression / Merchant price-mismatch (`src/app/products/[slug]/page.tsx`).
- **CRO leaks, mostly mobile** — a fully-built `WhatsAppFloat` is **never mounted**; the mobile hero hides the ISO badge and all trust signals; testimonials are anonymous/unverifiable; the homepage calculator dead-ends into WhatsApp only.
- **Feature/lead-gen gaps** — only 2 calculators (no DIN 55473 unit calculator, no ROI/cost-of-damage tool, no product selector); no troubleshooting content; no `/samples` flow; no `/tools` hub.

Net: the highest-leverage work is **consolidation and wiring** (301s, canonical discipline, internal links, filling existing-but-empty data slots) rather than net-new content — most fixes are small and light up rendering/schema that already exists.

### ⚠️ Reviewer caveats (added after review — the audit agents lacked conversation context)
The 8 audit agents read only the codebase; they did **not** know recent owner decisions. Validate each recommendation against recent history before implementing. Two specific corrections:

1. **PRIORITY.md item #1 ("Mount the WhatsApp float globally") is a FALSE POSITIVE — do NOT implement.** The owner *intentionally removed* the standalone WhatsApp float earlier because it duplicated the WhatsApp action already inside the DryBot widget. The agent saw a built-but-unmounted component and assumed it was a mistake. Re-adding it would undo a deliberate change. If a persistent mobile tap-to-chat is still wanted, do it *inside* DryBot's launcher — not as a second floating button.

2. **PRIORITY.md item #3 ("Product Offer price mismatch") is partly already handled.** Earlier this session the product schema was changed from `AggregateOffer` (lowPrice/highPrice) to a single `Offer` with a concrete `price` + `priceValidUntil`, which **cleared the actual GSC "price should be specified" error** (verified via Rich Results Test). The agent's remaining point — that the emitted price (`0.0035`) is not shown as visible text on the page — is a valid *secondary* refinement (render a "From $X/unit" band on-page so schema byte-matches visible content), **not** a regression. Treat it as an enhancement, not a bug.

### Status
Prioritized fixes documented in PRIORITY.md and TODO.md; **pending owner review before implementation.** Apply the two caveats above first.

---

<!-- Add future dated entries above this line, newest first, using the same
     "## YYYY-MM-DD — <pass name>" heading and What did / What did NOT / Key finding / Status structure. -->
