# DryGelWorld — Topical Authority Map

**Goal:** make `drygelworld.com` the global topical authority for *silica gel & desiccants for export packaging*, beating IMPAK's "All About Desiccants" hub and Multisorb on coverage, structure, and (the durable moat) machine-readable structure / E-E-A-T.

**Scope of this doc:** the *information architecture* layer — silos, pillars, clusters, internal-link topology, and the net-new content needed to close coverage gaps. It is **propose-first**: nothing here edits source. Exact slugs/anchors are given as fenced blocks for the user to apply later into `src/lib/seo-landing-pages.ts`, `src/app/blog/articles.ts`, `src/lib/blog-clusters.ts`, `src/lib/compare-data.ts`, and the route folders.

**Cross-references (do not duplicate — this doc extends them):**
- `SEO-CRO-FULL-AUDIT.md` → H10/H11 (cannibalization), H13/H14 (orphans + homepage link equity), M29 (`/industries` index), H19 (named-author E-E-A-T), and its 90-day roadmap. *This map assumes those fixes ship; it tells you **what topical structure** the link equity should flow through.*
- `COMPETITOR-STRATEGY.md` → page-by-page outperform plan. This doc supplies the **hub skeleton** that plan plugs into.
- `BACKLINKS-PLAYBOOK.md` / `OUTREACH-KIT.md` → which pillar each link target should point at.
- `GSC-INDEXING-BATCHES.md` → indexing order should follow the pillar priority below.

**Provenance guardrail honored throughout:** the only held certifications are **ISO 9001:2015 + DMF-free**. Every "compliance" topic below is framed as a **buyer-led documentation discussion (SDS/COA/spec on request)**, never as a held FDA / REACH / Halal / GMP / JEDEC / "food-grade certified" claim. See `silica-gel-sds-coa-requirements-for-buyers` (existing) as the canonical compliance-framing article — all compliance topics link to it.

---

## 0. What already exists (verified inventory)

Counted from the codebase so the map maps to *reality*, not guesses.

| Asset type | Source of truth | Count | Notes |
|---|---|---|---|
| Keyword/landing pages | `src/lib/seo-landing-pages.ts` (+ static folders under `src/app/*`) | ~80 entries | Mix of silica-gel, container, PPE (hair nets/beard covers), clay, and country pages. PPE is a **separate silo** (kept, not core to authority). |
| Blog articles | `src/app/blog/articles.ts` | 28 | Slugs listed in §3. |
| Blog cluster links | `src/lib/blog-clusters.ts` | 26 mapped | Per-article guides/products/compare/industry cross-links already wired. |
| Products | `src/lib/product-data.ts` → `/products/[slug]` | 7 | `retail-sachets`, `paper-sachets`, `bulk-industrial`, `container-strips`, `dry-clay-desiccant`, `hair-nets`, `beard-covers`. |
| Industries | `src/app/industries/[industry]/page.tsx` | 6 | `electronics-packaging`, `pharma-packaging`, `leather-footwear-export`, `food-packaging`, `textile-garment-export`, `container-shipping`. **No `/industries` index yet (audit M29).** |
| Comparisons | `src/lib/compare-data.ts` → `/compare/[slug]` | 3 | `silica-gel-vs-clay-desiccant`, `silica-gel-vs-molecular-sieve`, `silica-gel-vs-oxygen-absorber`. |
| Export markets | `src/app/export/markets.ts` → `/export/[market]` | 21 | UAE, Saudi, Qatar, USA, Vietnam, Russia, Bangladesh, Indonesia, Mexico, Turkey, India, Brazil, Malaysia, Pakistan, FOB-Karachi, UK, Germany, Canada, Australia, Europe (+ hub `/export`). Reciprocal hreflang already implemented. |
| Tools | components | 2 | `moisture-calculator`, `price-calculator` — link-magnet/CRO assets, slot them into clusters. |
| Guides | `src/app/guides/silica-gel-buyer-guide` | 1 | The de-facto current "pillar"; this map promotes it formally. |

**The structural problem this map solves (from audit H13/H14):** the assets exist but are *flat* — 22 orphans, homepage links to none of them, and there is no declared **pillar hierarchy**. Google can't infer a silo from a flat sitemap. This map declares the silos and the link topology that turns the existing flat set into ranked clusters.

---

## 1. Silo architecture (pillars → clusters)

Four silos. **Silo A (Silica Gel & Desiccants)** is the authority play. **Silo B (Export/Geo)** monetizes it. **Silo C (Industries)** is the application layer. **Silo D (PPE)** is a deliberately *firewalled* secondary line — kept and internally consistent, but **not** cross-linked into the desiccant silos (mixing PPE into the desiccant silo dilutes topical focus; this is a key correction vs the current flat structure where hair-net pages sit beside silica-gel pages).

```
drygelworld.com/
│
├── SILO A — SILICA GEL & DESICCANTS (core authority)
│   │
│   ├── PILLAR A1  /guides/silica-gel-buyer-guide        ← "What is a desiccant / how to buy" hub  [EXISTS]
│   │     ├─ cluster A1a  Desiccant fundamentals & science
│   │     ├─ cluster A1b  Selection & sizing
│   │     └─ cluster A1c  Reuse / lifespan / regeneration
│   │
│   ├── PILLAR A2  /silica-gel-manufacturer              ← "Silica gel types & supply" hub          [EXISTS, promote]
│   │     ├─ cluster A2a  Silica gel by indicator/color (white/blue/orange/indicating/non-indicating)
│   │     ├─ cluster A2b  Silica gel by format (packets/sachets/beads/bulk/strips)
│   │     └─ cluster A2c  Sourcing & procurement (bulk / OEM / private-label / China-alternative / pricing)
│   │
│   ├── PILLAR A3  /compare  (NEW index)                 ← "Desiccant comparisons" hub              [NET-NEW INDEX]
│   │     └─ cluster A3   desiccant-vs-desiccant decisions  (extend /compare/*)
│   │
│   └── PILLAR A4  /industries  (NEW index, audit M29)   ← "Desiccants by application" hub          [NET-NEW INDEX]
│         └─ cluster A4   industry application guides (ties to Silo C)
│
├── SILO B — EXPORT & GEOGRAPHY (commercial / international ranking)
│   │
│   └── PILLAR B1  /export                               ← Export hub (Incoterms/MOQ/lead-time/markets) [EXISTS]
│         ├─ cluster B1a  /export/[market]  × 21          [EXISTS — reciprocal hreflang done]
│         └─ cluster B1b  country keyword landings (silica-gel-exporter-usa, -germany, -canada, -uk …) [EXISTS]
│              (audit H11 — de-cannibalize: one canonical intent per country; cross-link the pair)
│
├── SILO C — INDUSTRIES (application authority, feeds A4)
│   └── PILLAR  /industries  (shared with A4)
│         └─ /industries/[industry] × 6                   [EXISTS]
│
└── SILO D — INDUSTRIAL PPE (firewalled secondary line — NOT linked into A/B/C)
      └── hub  /silica-gel  N/A → use  /hair-net-supplier as de-facto hub
            └─ hair nets / beard covers / sizes / materials / PPE country pages   [EXISTS]
```

**Why two desiccant pillars (A1 informational, A2 commercial) instead of one:** A1 captures *"what/how"* (top-funnel, link-attracting, E-E-A-T) and A2 captures *"buy/supplier/type"* (mid/bottom-funnel, money). Splitting prevents the buyer-guide from cannibalizing the commercial landings and gives each a clean internal-link basin. A1 links *down* into A2 (guide → product/type), A2 rarely links back up (keeps commercial equity in the money silo).

---

## 2. Category clusters (pillar URL + supporting URLs)

Legend: **[E]** exists today · **[N]** net-new · `→` route in codebase. PPE silo intentionally omitted from authority clusters (it's complete and self-contained).

### Cluster A1a — Desiccant fundamentals & science
**Pillar:** `/guides/silica-gel-buyer-guide` **[E]**
Supporting (8–15):
1. `/blog/what-is-silica-gel-and-how-does-it-work` **[E]**
2. `/blog/indicating-silica-gel-orange-blue-color-change-guide` **[E]**
3. `/blog/how-long-does-silica-gel-last` **[E]**
4. `/blog/can-you-reuse-silica-gel` **[E]**
5. `/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina` **[E]**
6. `/silica-gel-beads` **[E]** (registry)
7. `/blog/how-silica-gel-is-made-manufacturing-process` **[N]** — *gap vs IMPAK*
8. `/blog/is-silica-gel-safe-toxicity-and-handling` **[N]** — high-volume "do not eat" query, B2B safety/SDS angle
9. `/blog/relative-humidity-and-adsorption-isotherms-explained` **[N]** — technical depth competitors lack
10. `/blog/desiccant-units-explained-din-55473-and-unit-sizing` **[N]** — links to moisture-calculator

### Cluster A1b — Selection & sizing
**Pillar:** `/guides/silica-gel-buyer-guide` **[E]**
1. `/blog/how-to-choose-silica-gel-packet-size` **[E]**
2. `/blog/how-to-prevent-moisture-in-export-cartons` **[E]**
3. `/blog/desiccant-for-electronics-packaging` **[E]**
4. `/blog/best-desiccant-for-shipping-containers` **[E]**
5. `/blog/industrial-packaging-protection-solutions` **[E]**
6. Tool: **moisture-calculator** (embed + dedicated landing `/tools/desiccant-calculator` **[N]**)
7. `/blog/how-many-desiccant-packets-per-box-calculation-guide` **[N]**
8. `/blog/desiccant-placement-best-practices-in-packaging` **[N]**

### Cluster A1c — Reuse / lifespan / regeneration
**Pillar:** `/guides/silica-gel-buyer-guide` **[E]**
1. `/blog/can-you-reuse-silica-gel` **[E]**
2. `/blog/how-long-does-silica-gel-last` **[E]**
3. `/blog/reusable-vs-disposable-desiccants` **[E]**
4. `/blog/how-to-regenerate-silica-gel-oven-temperature-guide` **[N]**
5. `/compare/reusable-vs-disposable-desiccants` (already a blog; **leave as blog**, link to `/compare`)

### Cluster A2a — Silica gel by indicator / color
**Pillar:** `/silica-gel-manufacturer` **[E]**
1. `/indicating-silica-gel` **[E]**
2. `/non-indicating-silica-gel` **[E]**
3. `/white-silica-gel` **[E]**
4. `/blue-silica-gel` **[E]** + static `/blue-silica-gel-manufacturer` **[E]** (de-cannibalize per H10 — pick one canonical, cross-link)
5. `/orange-silica-gel` **[E]** + static `/orange-silica-gel-supplier` **[E]**
6. `/blog/indicating-silica-gel-orange-blue-color-change-guide` **[E]**
7. `/blog/cobalt-free-orange-vs-blue-indicating-silica-gel-safety` **[N]** — REACH-adjacent buyer question, framed as buyer-led doc discussion

### Cluster A2b — Silica gel by format
**Pillar:** `/silica-gel-manufacturer` **[E]**
1. `/silica-gel-packets` **[E]** + `/silica-gel-packets-manufacturer` **[E]** (de-cannibalize)
2. `/silica-gel-packets-wholesale` **[E]**
3. `/silica-gel-beads` **[E]**
4. `/bulk-silica-gel-desiccant` **[E]**
5. `/container-desiccant-strips` **[E]** + `/container-desiccant` / `/container-desiccant-supplier` **[E]**
6. `/desiccant-bags` / `/desiccant-bags-supplier` **[E]**
7. `/products/retail-sachets`, `/products/paper-sachets`, `/products/bulk-industrial`, `/products/container-strips` **[E]**
8. `/blog/paper-vs-tyvek-vs-film-desiccant-sachet-materials` **[N]** — packaging-format depth gap

### Cluster A2c — Sourcing & procurement
**Pillar:** `/silica-gel-manufacturer` **[E]**
1. `/silica-gel-supplier` **[E]**
2. `/silica-gel-exporter` **[E]**
3. `/bulk-silica-gel-desiccant` **[E]**
4. `/oem-silica-gel-manufacturer` **[E]** + `/private-label-silica-gel-supplier` / `/private-label-desiccant-packets` **[E]**
5. `/silica-gel-manufacturer-china-alternative` **[E]**
6. `/silica-gel-manufacturer-pakistan` / `/silica-gel-supplier-karachi` **[E]**
7. `/blog/bulk-silica-gel-supplier-checklist` **[E]**
8. `/blog/silica-gel-bulk-pricing-factors-for-exporters` **[E]**
9. `/blog/private-label-silica-gel-packets-guide` **[E]**
10. `/blog/silica-gel-sds-coa-requirements-for-buyers` **[E]** (canonical compliance-framing node)
11. Tool: **price-calculator** → landing `/tools/silica-gel-price-estimator` **[N]**
12. `/blog/silica-gel-import-customs-hs-code-guide` **[N]** — HS 2811.22, import-buyer gap, big export-intent magnet

### Cluster A3 — Desiccant comparisons
**Pillar:** `/compare` **[N — needs index page; today `/compare` may be thin]**
1. `/compare/silica-gel-vs-clay-desiccant` **[E]**
2. `/compare/silica-gel-vs-molecular-sieve` **[E]**
3. `/compare/silica-gel-vs-oxygen-absorber` **[E]**
4. `/compare/silica-gel-vs-calcium-chloride-container-desiccant` **[N]** — the #1 container-desiccant buyer decision
5. `/compare/desiccant-vs-vci-corrosion-protection` **[N]** — metals/electronics buyers
6. `/compare/silica-gel-vs-activated-carbon` **[N]**
7. Supporting blogs: `/blog/silica-gel-vs-clay-desiccant`, `/blog/container-desiccant-vs-silica-gel`, `/blog/oxygen-absorber-vs-silica-gel-when-to-use-each`, `/blog/silica-gel-vs-molecular-sieve-vs-activated-alumina` **[all E]**

### Cluster A4 — Desiccants by application (industries)
**Pillar:** `/industries` **[N — audit M29]**
1. `/industries/electronics-packaging` **[E]** ↔ `/electronic-packaging-desiccant` / `/electronics-packaging` **[E]**
2. `/industries/pharma-packaging` **[E]** ↔ `/pharmaceutical-desiccant` / `/desiccants-for-pharma-industry` **[E]**
3. `/industries/food-packaging` **[E]** ↔ `/food-grade-silica-gel` / `/food-grade-silica-gel-supplier` **[E]** (food-grade framed as buyer-led spec, never "certified")
4. `/industries/leather-footwear-export` **[E]** ↔ `/silica-gel-for-leather-export` **[E]**
5. `/industries/textile-garment-export` **[E]**
6. `/industries/container-shipping` **[E]** ↔ `/shipping-container-moisture-control` / `/shipping-container-desiccant-supplier` **[E]**
7. `/industries/automotive-parts-export` **[N]** — corrosion/VCI cross-sell, named competitor gap
8. `/industries/defense-and-ammunition-packaging` **[N]** — military-spec desiccant query (frame mil-spec as buyer-supplied requirement, not held cert)

### Cluster B1 — Export & geography
**Pillar:** `/export` **[E]**
- `/export/[market]` × 21 **[E]** + country keyword landings **[E]** (de-cannibalize per H11; cross-link each `/export/<country>` ↔ `/silica-gel-exporter-<country>`)
- Supporting blogs: `/blog/how-exporters-protect-cargo-from-humidity`, `/blog/moisture-protection-for-international-shipping`, `/blog/container-rain-prevention` **[all E]**
- `/blog/silica-gel-export-documentation-coo-coa-packing-list` **[N]** — export-ops depth, links to compliance node

---

## 3. Supporting blog topics per cluster (existing vs NEW)

All 28 existing slugs from `src/app/blog/articles.ts` are mapped below; every **[N]** is net-new. PPE blogs (`why-hair-nets-matter-in-food-export`, `ppe-products-for-factories`, `importance-of-beard-covers-in-manufacturing`) stay in Silo D and are **not** counted here.

| Cluster | Existing blogs (in articles.ts) | NEW blogs to add |
|---|---|---|
| A1a Fundamentals | what-is-silica-gel-and-how-does-it-work · indicating-silica-gel-orange-blue-color-change-guide · how-long-does-silica-gel-last · silica-gel-vs-molecular-sieve-vs-activated-alumina | how-silica-gel-is-made-manufacturing-process · is-silica-gel-safe-toxicity-and-handling · relative-humidity-and-adsorption-isotherms-explained · desiccant-units-explained-din-55473-and-unit-sizing |
| A1b Selection/sizing | how-to-choose-silica-gel-packet-size · how-to-prevent-moisture-in-export-cartons · desiccant-for-electronics-packaging · best-desiccant-for-shipping-containers · industrial-packaging-protection-solutions | how-many-desiccant-packets-per-box-calculation-guide · desiccant-placement-best-practices-in-packaging |
| A1c Reuse/lifespan | can-you-reuse-silica-gel · reusable-vs-disposable-desiccants · how-long-does-silica-gel-last | how-to-regenerate-silica-gel-oven-temperature-guide |
| A2a Indicator/color | indicating-silica-gel-orange-blue-color-change-guide | cobalt-free-orange-vs-blue-indicating-silica-gel-safety |
| A2b Format | (covered by landing pages + products) | paper-vs-tyvek-vs-film-desiccant-sachet-materials |
| A2c Sourcing | bulk-silica-gel-supplier-checklist · silica-gel-bulk-pricing-factors-for-exporters · private-label-silica-gel-packets-guide · silica-gel-sds-coa-requirements-for-buyers | silica-gel-import-customs-hs-code-guide |
| A3 Compare | silica-gel-vs-clay-desiccant · container-desiccant-vs-silica-gel · oxygen-absorber-vs-silica-gel-when-to-use-each · silica-gel-vs-molecular-sieve-vs-activated-alumina | (new compare *pages* in §5, not blogs) |
| A4 Industries | silica-gel-for-pharma-packaging-buyer-guide · food-grade-silica-gel-procurement-guide · silica-gel-for-leather-and-footwear-export · desiccant-for-electronics-packaging | (industry depth lives on /industries/* pages) |
| B1 Export | how-exporters-protect-cargo-from-humidity · moisture-protection-for-international-shipping · container-rain-prevention | silica-gel-export-documentation-coo-coa-packing-list |

**Net-new blog total: 12.** Sequencing for `GSC-INDEXING-BATCHES.md`: ship A1a science + A2c HS-code + A3 calcium-chloride compare first (highest authority + commercial intent), then the rest.

**`articles.ts` shape to follow for each NEW blog** (mirror existing entries — `slug`, `label`, `title`, `description`, body, and remember to add an `articlePublication` date and a `blogClusters` entry):
```ts
{
  slug: "how-silica-gel-is-made-manufacturing-process",
  label: "Technical Basics",
  title: "How silica gel is made: the manufacturing process explained",
  description:
    "From sodium silicate to graded beads — how silica gel desiccant is produced, why pore structure controls adsorption, and what buyers should ask a manufacturer about quality control.",
  // ...body sections...
}
```

---

## 4. Buyer-intent (commercial / transactional) pages

These already exist in `seo-landing-pages.ts` and the static `src/app/*` folders — the action is **structural** (assign each to its A2 cluster, de-orphan, de-cannibalize), not creation. Plus a few net-new BOFU pages.

| Intent | Existing pages | New |
|---|---|---|
| Supplier/manufacturer | silica-gel-manufacturer · silica-gel-supplier · desiccant-manufacturer · moisture-absorber-manufacturer · moisture-absorber-supplier | — |
| Exporter (head) | silica-gel-exporter · silica-gel-manufacturer-exporter | — |
| Bulk/wholesale | silica-gel-packets-wholesale · bulk-silica-gel-desiccant · industrial-desiccant-supplier · industrial-desiccant | request-a-quote BOFU page `/request-quote` **[N]** (anchors all "get pricing" CTAs; ties to RFQ action `src/app/actions/submit-rfq.ts`) |
| OEM/private-label | oem-silica-gel-manufacturer · private-label-silica-gel-supplier · private-label-desiccant-packets | — |
| China-alternative | silica-gel-manufacturer-china-alternative | desiccant-supplier-india-alternative **[N]** (mirrors China-alt page; targets buyers diversifying off IndiaMART suppliers) |
| Container | container-desiccant · container-desiccant-supplier · container-desiccant-strips · shipping-container-moisture-control · shipping-container-desiccant-supplier · cargo-desiccant-supplier · moisture-absorber-for-shipping · container-desiccant-supplier-worldwide | — |
| Sample/MOQ | (none) | `/free-sample-silica-gel` **[N]** — high-converting B2B sample-request intent IMPAK/Multisorb don't target |

**De-orphan rule (audit H13):** every page in this table must receive ≥2 contextual inbound links — one from its A2 cluster pillar (`/silica-gel-manufacturer`) and one from a topically adjacent landing or blog. The `/request-quote`, `/free-sample-silica-gel` BOFU pages should be linked from *every* product and landing CTA.

---

## 5. Comparison pages (extend `/compare/*`)

Existing in `src/lib/compare-data.ts`: `silica-gel-vs-clay-desiccant`, `silica-gel-vs-molecular-sieve`, `silica-gel-vs-oxygen-absorber`.

**Add to `compare-data.ts` (net-new):**
```ts
// append to the comparisons array — mirror existing object shape
{ slug: "silica-gel-vs-calcium-chloride-container-desiccant", title: "Silica gel vs calcium chloride container desiccant", /* ... */ },
{ slug: "desiccant-vs-vci-corrosion-protection",             title: "Desiccant vs VCI for corrosion protection",        /* ... */ },
{ slug: "silica-gel-vs-activated-carbon",                    title: "Silica gel vs activated carbon",                    /* ... */ },
```
And **create the missing hub** `/compare` index page (`src/app/compare/page.tsx` exists — ensure it lists all 6 with keyword anchors, `ItemList` JSON-LD, and links up to both A1a and A2 pillars). The calcium-chloride comparison is the single highest-value gap: it's the question every container-desiccant buyer asks and the term competitors (Desiccant Pak, AbsorbKing) rank for with weak content.

**Cross-link rule:** each `/compare/*` page links to (a) both product types it compares (`/products/*`), (b) the relevant A2 format/type landing, and (c) the A1a fundamentals pillar. Each comparison *blog* (`container-desiccant-vs-silica-gel` etc.) links to its `/compare/*` sibling (already partially wired in `blog-clusters.ts` via `COMPARE_*`).

---

## 6. Informational content (top-funnel, E-E-A-T & link magnets)

- **Pillar guide** `/guides/silica-gel-buyer-guide` **[E]** — formally the A1 pillar; should link down to every A1a/A1b/A1c blog and across to A2 type pages. Add a visible table of contents (entity coverage signal).
- **Glossary** `/guides/desiccant-glossary` **[N]** — adsorption, RH, DIN 55473 unit, COA, SDS, isotherm, bound vs free moisture, MVTR. Directly answers IMPAK's "All About Desiccants" hub with a denser, schema-marked (`DefinedTermSet`) page. Strong internal-link distributor.
- **Tools as content:** `moisture-calculator` and `price-calculator` get dedicated landing wrappers (`/tools/desiccant-calculator`, `/tools/silica-gel-price-estimator` **[N]**) so they're indexable, link-attracting, and feed the A1b/A2c clusters. Mark up with `SoftwareApplication`/`HowTo` where honest.
- **FAQ** `/faq` **[E]** — ensure every question deep-links to the owning cluster article (FAQ as a hub spoke, not a dead end).
- **Case studies** `/case-studies` **[E]** — real export references = E-E-A-T; link each case to the relevant `/industries/*` and `/export/[market]` page.

---

## 7. Export pages (tie to existing `export/[market]`)

`/export` (B1 pillar) → 21 `/export/[market]` pages with reciprocal hreflang **already implemented** (per project notes & audit H2 fix). The topical actions:

1. **Pair every country `/export/<slug>` with its country keyword landing** (`silica-gel-exporter-usa`, `-germany`, `-canada`, `silica-gel-supplier-uk`) — reciprocal cross-link, distinct intent per H11 (export page = logistics/Incoterms/MOQ; landing = keyword/supplier). One canonical per country in the hreflang cluster.
2. **Inject A2/A2c links into each market page** so the 21 leaf pages stop being dead-ends (audit H14): each `/export/[market]` body links to `/silica-gel-manufacturer`, `/bulk-silica-gel-desiccant`, `/container-desiccant-supplier`, and the relevant `/industries/*` for that market's dominant export.
3. **`europe` = `en-150`, `fob-karachi` = bare `en`** per audit M5/L2 — already noted; keep.
4. New export-ops blog `silica-gel-export-documentation-coo-coa-packing-list` **[N]** sits in B1 and links to the compliance node + every market page's "documents" reference.

---

## 8. Pillar → cluster internal-linking diagram (with example anchors)

**Topology rule:** Pillar ⇄ supporting (bidirectional). Supporting ⇄ sibling (1–3, contextual). A1 (info) → A2 (commercial) *downward only*. PPE silo isolated.

```
                         /guides/silica-gel-buyer-guide  (PILLAR A1)
        ┌──────────────────────┬───────────────────────┬────────────────────┐
        ▼                      ▼                       ▼                    ▼
  what-is-silica-gel   how-to-choose-packet-size   can-you-reuse      how-silica-gel-is-made [N]
   (A1a)                 (A1b)                       (A1c)               (A1a)
     │  ▲                  │  ▲                       │                    │
     │  └── "back to the buyer guide" ───────────────┴────────────────────┘
     │
     └──► /silica-gel-manufacturer  (PILLAR A2 — downward link only)
                 ├──► /indicating-silica-gel        anchor: "indicating (color-change) silica gel"
                 ├──► /silica-gel-packets-wholesale  anchor: "bulk silica gel packets"
                 ├──► /bulk-silica-gel-desiccant     anchor: "bulk silica gel for export"
                 ├──► /container-desiccant-supplier  anchor: "container desiccant for ocean freight"
                 └──► /compare (PILLAR A3) ──► /compare/silica-gel-vs-clay-desiccant
                                              anchor: "silica gel vs clay desiccant: which to ship"

  /industries (PILLAR A4)
       ├──► /industries/electronics-packaging  ◄──► /electronic-packaging-desiccant
       ├──► /industries/pharma-packaging        ◄──► /pharmaceutical-desiccant
       └──► /industries/container-shipping      ◄──► /shipping-container-moisture-control

  /export (PILLAR B1)
       ├──► /export/germany  ◄──► /silica-gel-exporter-germany   anchor: "silica gel exporter for Germany"
       └──► /export/usa      ◄──► /silica-gel-exporter-usa       (each market → A2 money pages)
```

**Example anchor-text bank (varied, exact-match-light to avoid over-optimization):**

| From → To | Anchor |
|---|---|
| what-is-silica-gel → /silica-gel-manufacturer | "industrial silica gel from an ISO 9001:2015 manufacturer" |
| how-to-choose-packet-size → moisture-calculator | "size it with the desiccant calculator" |
| /silica-gel-manufacturer → /compare/...-vs-clay | "see how silica gel compares to clay desiccant" |
| /export/germany → /container-desiccant-supplier | "container desiccants shipped FOB Karachi to Hamburg" |
| /blog/...-pharma-packaging → /industries/pharma-packaging | "desiccants for pharma packaging" |
| /industries/container-shipping → /export | "request export pricing and Incoterms" |
| any A2c page → /blog/silica-gel-sds-coa-requirements | "SDS and COA documentation on request" (compliance framing) |

**Wiring location:** extend `src/lib/blog-clusters.ts` (add the 12 new blog entries + add A2 landing links to each `products`/`guides` array), add the A2 downward links in `src/lib/seo-landing-pages.ts` `relatedLinks`, and the homepage/export equity injection per audit H14 (`src/app/page.tsx`, `src/app/export/[market]/page.tsx`).

---

## 9. Coverage-gap list vs competitors

Benchmarked against IMPAK "All About Desiccants" hub, Multisorb, Desiccant Pak, AbsorbKing/Kobso, and the directories. **DryGelWorld's durable moat = structured data** (Organization/WebSite/Service/BreadcrumbList/Article already live; competitors expose none). The gaps below are *content* gaps to close while keeping that moat.

| Topic / page | IMPAK | Multisorb | Desiccant Pak | DryGelWorld today | Action |
|---|---|---|---|---|---|
| "How silica gel is made" / science depth | ✔ deep | ✔ | partial | ✖ | **[N]** A1a blog + glossary |
| Desiccant glossary / defined terms | ✔ | partial | ✖ | ✖ | **[N]** `/guides/desiccant-glossary` (DefinedTermSet) |
| Silica gel vs calcium chloride (container) | partial | ✖ | ✔ | ✖ | **[N]** `/compare/silica-gel-vs-calcium-chloride-container-desiccant` |
| Desiccant unit / DIN 55473 sizing math | ✔ | ✔ | ✖ | calculator only | **[N]** A1b blog + tool landing |
| Regeneration / oven temps | ✔ | partial | ✖ | ✖ | **[N]** A1c blog |
| HS code / import-customs guidance | ✖ | ✖ | ✖ | ✖ | **[N]** A2c blog — *uncontested, export-intent* |
| Free-sample / quote BOFU funnel | ✔ (ecommerce) | partial | ✔ | ✖ | **[N]** `/free-sample-silica-gel`, `/request-quote` |
| Cobalt-free indicating safety (REACH-adjacent) | partial | ✔ | ✖ | ✖ | **[N]** A2a blog (buyer-led framing) |
| Per-country export pages w/ hreflang | ✖ | ✖ | partial | ✔ **(lead)** | maintain — *this is a DGW advantage* |
| Structured data across all routes | ✖ | ✖ | ✖ | ✔ **(lead)** | maintain + add ItemList to new hubs |
| Industries index hub | partial | ✔ | ✔ | ✖ (M29) | **[N]** `/industries` index |
| Compare hub index | ✖ | ✖ | ✖ | thin | strengthen `/compare` index |
| VCI / corrosion alternative | partial | ✔ | ✖ | ✖ | **[N]** `/compare/desiccant-vs-vci-corrosion-protection` + `/industries/automotive-parts-export` |
| Pricing transparency | ✔ (ecommerce) | ✖ | ✔ | calculator | tool landing `/tools/silica-gel-price-estimator` |

**Strategic read:** IMPAK wins on *informational breadth* (the "All About Desiccants" hub) but has **no schema and no export/geo layer**. The fastest path to parity-then-lead is: (1) ship the A1a science + glossary cluster to neutralize IMPAK's breadth advantage, (2) keep the export/hreflang + structured-data moat they can't quickly copy, (3) own the *uncontested* export-ops gaps (HS code, COO/COA docs, calcium-chloride compare) that pull qualified international RFQ traffic. Net-new to fully close the gap: **12 blogs + 3 compare pages + 2 hub indexes + 1 glossary + 2 tool landings + ~4 BOFU/industry pages ≈ 24 URLs**, all hung off existing pillars — no redesign, no deletions, no provenance overreach.
