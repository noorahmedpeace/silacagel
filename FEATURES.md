# FEATURES.md — DryGelWorld Growth Backlog

A prioritized backlog of **new features** (interactive lead-gen tools) and **new content pages** that increase qualified B2B leads for a low-authority silica-gel exporter domain. Drawn from the content-gaps and competitor-trust-features audit lenses. Every item is checked against existing files to avoid duplication.

---

## 1. Features (interactive tools & lead-gen mechanics)

### F1. Desiccant Unit Calculator (DIN 55473 / MIL-D-3464) — **Priority: P0 (Critical)**
- **What:** New tool at `src/app/tools/desiccant-unit-calculator`. Inputs: package internal volume or barrier area, MVTR/moisture class, transit days → output: required desiccant units + nearest DryGelWorld pack format, with a "Get this quoted" CTA. Reuse `moisture-load-calculator/page.tsx` as the scaffold.
- **Why it converts:** DIN/MIL unit sizing ("how many desiccant units do I need", "DIN 55473 calculator") is the most-searched procurement calculation in the niche. The two explainer blog articles already exist (`articles.ts` `desiccant-units-explained-din-55473-and-unit-sizing`, `how-many-desiccant-packets-per-box-calculation-guide`) but serve the demand only as prose. An interactive tool earns AI citations/backlinks and routes every result screen into an RFQ.
- **Effort:** Medium. Only two tools exist today (`container-desiccant-calculator`, `moisture-load-calculator`).

### F2. Cost-of-Moisture-Damage / ROI Calculator — **Priority: P0 (High)**
- **What:** New tool at `src/app/tools/moisture-damage-roi-calculator`. Inputs: cargo value, route humidity, transit days, claim frequency, containers/month → output: annualized damage exposure vs desiccant spend, ending in a prefilled RFQ CTA. Reuse `container-dosage-model.ts` logic + `QuoteForm` `defaultMessage` prefill.
- **Why it converts:** The existing calculators only output grams/units — never the USD business case. A dollar-value ROI tool gives procurement a number to justify the purchase internally, is a strong lead magnet for "cost of moisture damage / container rain cost" queries, and hands sales a warm, self-qualified lead. Economic framing today exists only as prose (`reusable-vs-disposable-desiccants`, `silica-gel-bulk-pricing-factors`).
- **Effort:** Medium.

### F3. Guided Product Selector / "Which desiccant do I need?" Wizard — **Priority: P0 (High)**
- **What:** New tool at `src/app/tools/desiccant-selector`. 3-question branching flow (cargo/application → route/enclosure → volume) → recommended product slug + quantity, deep-linking to `quote-form.tsx` with `defaultProduct`/`defaultQuantity`/`defaultMessage` prefilled (props already exist). Drive branching from the existing `compare-data.ts` `decisions` matrices and `product-data.ts` fit fields so it stays a single source of truth.
- **Why it converts:** DryBot is free-form RAG chat, not a decision tree — buyers who don't know the product name have no guided path. A wizard compresses the funnel, converts non-expert buyers who bounce from a 12-product catalog, and pre-qualifies leads with structured data.
- **Effort:** Large.

### F4. Sample-Request Flow (`/samples`) — **Priority: P0 (High)**
- **What:** Dedicated `/samples` (or `/free-sample`) landing with a short 3-field form (email, product, destination) and a "sample before bulk order" promise. Link from hero, product pages, and DryBot. Keep the full RFQ for buy-ready leads.
- **Why it converts:** No dedicated sample path exists — sample intent is buried as one `sampleNeed` dropdown inside the collapsed "optional" section of `quote-form.tsx` (L89, L416-426), behind a company+email gate. A low-friction sample offer is the standard top-of-funnel entry for hesitant B2B buyers; global competitors (Clariant/Sorbead/Multisorb) lead with it.
- **Effort:** Medium.

### F5. Country / Compliance Finder — **Priority: P1 (Medium)**
- **What:** Interactive tool combining `export/markets.ts` per-country data (SABER, FDA FCN/GRAS, HTS codes) + `about` `honestScope` cert data. User picks destination + application → exact required document set (SDS/COA/DMF-free/ISO) with an honest "held vs confirm-at-RFQ" answer, ending in a prefilled RFQ. Reuses existing data, invents no new claims.
- **Why it converts:** Turns the site's genuine documentation depth into an interactive lead magnet, capturing high-intent buyers screening suppliers on regulatory fit. This compliance data is currently locked in static pages.
- **Effort:** Medium.

### F6. Tools Hub Index (`/tools`) — **Priority: P1 (Medium)**
- **What:** Add `src/app/tools/page.tsx` as a hub listing all calculators/tools with descriptions and RFQ CTAs. Link from the header Resources group and footer.
- **Why it converts:** No `/tools` index exists — the calculators live as isolated subroutes. A hub concentrates internal-link equity, ranks for "silica gel calculator/tools" queries, and gives every new tool (F1-F5) a home that compounds as more are added.
- **Effort:** Trivial.

### F7. Verifiable Named Social Proof + Logo Strip — **Priority: P1 (Medium/High trust lever)**
- **What:** Populate the already-built `attribution: { name, title, company, quote }` field in `case-study-data.ts` (all 10 case studies currently use only `anonymizedRef`; `attribution` is documented but unused) with 2-3 permission-cleared named references, and render them instead of the placeholder homepage testimonials (`page.tsx` L195-220, e.g. "Footwear exporter"). Add a logo-band component above the footer near `GuaranteeStrip`, and embed one verifiable external proof channel (Google Business Profile, verified WhatsApp Business, or trade-platform badge). Do **not** add `aggregateRating` schema without real reviews.
- **Why it converts:** Generic anonymized quotes read as invented and are the single biggest trust deficit for an unknown exporter. Named/verifiable references are the top conversion driver for first-time B2B buyers and the fastest way to borrow credibility.
- **Effort:** Medium (mostly business/permissions, not code).

### F8. Response SLA + Quality Guarantee Block — **Priority: P2 (Medium)**
- **What:** Add one or two genuinely defensible commitments (e.g. "free replacement/credit for any batch that fails its published COA spec", "sample dispatched within X days") and surface them in `GuaranteeStrip` and on `/samples`. Keep them real and consistent with the site's honesty discipline (`guarantee-strip.tsx` currently makes no promise; `about` shows only a soft "24h response target").
- **Why it converts:** A concrete, ownable guarantee differentiates against faceless marketplace suppliers and lowers first-order perceived risk.
- **Effort:** Small.

### F9. Homepage "Honest-Scope" Differentiation Block — **Priority: P2 (Medium)**
- **What:** Promote a condensed "we tell you exactly what we do and don't hold" trust block onto the homepage and export landing pages, linking to the full `/certifications` matrix. The `honestScope` array (`about/page.tsx`) and held-vs-discussed cert rows are buried off the homepage today.
- **Why it converts:** "The exporter that tells you the truth about compliance" is a memorable, defensible wedge that converts skeptical procurement buyers burned by overclaiming marketplace suppliers.
- **Effort:** Small.

### F10. Verifiable Scale-Proof Anchors — **Priority: P3 (Low)**
- **What:** Add a sister-brand (SilicaGelPK) cross-link next to the self-asserted scale stats (10M+ packets, 10,000+ customers in `trust-band.tsx` L21-24) and, if available, publish a business/export registration document in `document-registry.ts` alongside the verifiable ISO cert.
- **Why it converts:** Links "trust me" numbers to a checkable anchor for cautious buyers.
- **Effort:** Small.

---

## 2. Content Pages to Create

### C1. Troubleshooting / Problem-Solution cluster — **Priority: P0 (High)**
- **Working titles:** "Mould in a shipping container even with desiccant: 6 causes and fixes"; "Condensation inside sealed packaging: diagnosis and fix"; "Cargo arrived wet — desiccant post-mortem checklist"; "Why silica gel packets are still wet/saturated on arrival". Location: `/guides/troubleshooting` cluster (or blog).
- **Target query:** failure-mode searches — "mold in container despite desiccant", "cargo arrived wet", "silica gel packet turned pink/wet", "condensation inside sealed packaging".
- **Intent:** Informational-urgent → high-conversion (buyer is ready to re-order/switch suppliers). Each ends with a sizing/selector CTA.
- **Similar page exists?** No. All 43 blog articles are explainer/procurement guides; zero troubleshooting/diagnostic content exists. Low competition, highly AI-answerable.

### C2. "Best desiccant for [electronics / pharma / food / metal parts]" — **Priority: P1 (Medium)**
- **Working titles:** `/guides/best-desiccant-for-electronics`, `-pharma`, `-food-packaging`, `-metal-parts`.
- **Target query:** "best desiccant for electronics / pharma / food / metal parts" — a distinct recommendation-intent query.
- **Intent:** Commercial decision (buyers comparing materials, not yet suppliers).
- **Similar page exists?** Partial. Only `best-desiccant-for-shipping-containers` exists (blog). Industry pages (`electronics-packaging`, `pharma-packaging`, `food-packaging`, `automotive-parts`) target supplier intent, not "best desiccant for X." **Must differentiate** — lead with the material verdict + a mini decision table (from `compare-data.ts`) and internal-link to the industry page + product + selector tool; do NOT rehash the supplier pitch.

### C3. Silica Gel HS Code & Import-Duty-by-Country reference table — **Priority: P1 (Medium)**
- **Working title:** `/guides/silica-gel-hs-code-import-duty-by-country`.
- **Target query:** "HS 2811.22 import duty", "silica gel customs duty [country]", "silica gel import documents".
- **Intent:** Reference/pre-purchase (importers bookmark it; durable link/citation asset). Structured table: destination, HS code, typical duty band, required docs.
- **Similar page exists?** Concept only, as prose. Blog `silica-gel-import-customs-hs-code-guide` and glossary "HS code 2811.22" cover it; no structured filterable table exists. Frame as reference, cross-link from the blog explainer and each `export/[market]` page.

### C4. Export country pages — Africa + missing EU/Gulf markets — **Priority: P1 (Medium)**
- **Working titles (add 3-5 substantive first):** `/export/nigeria`, `/export/egypt`, `/export/south-africa` (leather/agri + humid ports), `/export/netherlands` (EU distribution gateway), `/export/oman` or `/export/kuwait` (extend the GCC set).
- **Target query:** "silica gel supplier [country]" — near-zero competition for these geos.
- **Intent:** Commercial/geo B2B.
- **Similar page exists?** No — Africa is entirely absent; no Netherlands/France/Spain/Italy/Poland, no Oman/Kuwait, no Sri Lanka/Philippines/Thailand. **Populate the optional commercial-terms block (`markets.ts` L13) so pages are not thin** — skip a blanket country rollout to avoid doorway-page risk on a low-authority domain.

### C5. Moisture-Control Pillar / Knowledge Hub — **Priority: P2 (Low)**
- **Working title:** `/guides` or `/resources` — a pillar hub linking all calculators, comparison pages, industry guides, and the glossary, grouped by buyer job.
- **Target query:** brand/topical "desiccant selection guide" + internal crawl consolidation.
- **Intent:** Navigational/authority consolidation; passes internal PageRank to deep tool/comparison pages and gives LLMs a canonical entry point.
- **Similar page exists?** Partially — `/guides` holds only `desiccant-glossary` and `silica-gel-buyer-guide`; no aggregating pillar exists. **Aggregation/linking only — create NO new content.**

### C6. New material-vs-material comparisons — **DO NOT BUILD (explicit non-recommendation)**
- The comparison niche is **saturated**: `compare-data.ts` already has silica vs clay, molecular sieve, oxygen absorber, calcium chloride, bentonite, activated alumina, charcoal, desiccant-bags, VCI, and activated carbon (18 pages total). Adding more risks thin-content/cannibalization. The only micro-gap is a consumer-leaning "silica gel vs bamboo-charcoal moisture absorber" (low B2B value) — not worth prioritizing. Invest the comparison budget in the tools (F1-F5) and troubleshooting (C1) gaps instead. If anything, improve the `/compare` index to group the 18 existing pages by buyer scenario.

---

### Suggested sequencing (highest leverage first)
1. **F4 Sample flow + F7 Named social proof** — widen top of funnel and fix the biggest trust deficit.
2. **F1 DIN unit calculator + F2 ROI calculator** — convert existing informational traffic into leads; strong AI-citation/backlink assets.
3. **C1 Troubleshooting cluster** — cheap featured-snippet/LLM wins at high buyer intent.
4. **F3 Product selector + F6 Tools hub** — compress the funnel and consolidate the tools tier.
5. **F5 Compliance finder, C2-C4 content pages, F8-F10 trust polish** — durable differentiation and geo expansion.
