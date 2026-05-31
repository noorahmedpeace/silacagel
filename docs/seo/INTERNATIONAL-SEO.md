# INTERNATIONAL-SEO.md - DryGelWorld Export Ranking Plan (USA - UK - UAE - KSA - Germany - India - Africa)

> **Scope.** Per-market international SEO plan for the seven priority regions, grounded in the actual Next 16 codebase at `C:\Users\HP Probook 650\Desktop\SilacaGEL`. PROPOSE-FIRST: nothing here edits source. Every code/copy block is for review and later application by the user.
>
> **Cross-references (do not duplicate - this doc extends them):**
> - `SEO-CRO-FULL-AUDIT.md` H2 (hreflang reciprocity), H3 (hero CTA), H8 (export JSON-LD Product?Service), and the 90-day roadmap.
> - `COMPETITOR-STRATEGY.md` (page-by-page outperform plan - Multisorb/IMPAK/Desiccant Pak/CILICANT).
> - `GSC-INDEXING-BATCHES.md` (submit the export cluster in the right batch order).
> - `TOPICAL-AUTHORITY-MAP.md`, `BACKLINKS-PLAYBOOK.md`, `OUTREACH-KIT.md` (local citation / directory work referenced in -2 and -6).
>
> **Provenance guardrail enforced throughout.** Held proof = ISO 9001:2015 + SDS + COA + DMF-free statement ONLY. This doc NEVER instructs copy claiming FDA, REACH, Halal, GMP, JEDEC, USP, EPA, or "food-grade" certification. REACH (UK/DE/EU), FDA (USA), SFDA/SASO (KSA), and Halal (UAE/KSA) are framed exclusively as **buyer-led discussions**, mirroring the language already shipping in `src/app/export/markets.ts` (e.g. UK/Germany `routeNote`) and `src/app/export/page.tsx` block 02.

---

## 0. Verified codebase state (what already exists vs. what's missing)

| Priority market | `/export/[market]` exists? | Slug | hreflang code (current) | Notes from source |
|---|---|---|---|---|
| USA | -> Yes | `usa` | `en-US` | `markets.ts:57-70`. Warning-text/CPSC language present in `routeNote`. |
| UK | -> Yes | `uk` | `en-GB` | `markets.ts:226-238`. REACH framed as buyer-led. Dry-clay format included. |
| UAE | -> Yes | `uae` | `en-AE` | `markets.ts:15-28`. Arabic/English carton labeling already mentioned in `rfqTip`. |
| Saudi Arabia | -> Yes | `saudi-arabia` | `en-SA` | `markets.ts:29-42`. |
| Germany | -> Yes | `germany` | `en-DE` | `markets.ts:240-252`. SDS-in-German + REACH buyer-led already present. |
| India | -> Yes | `india` | `en-IN` | `markets.ts:156-168`. |
| **Africa** | -> **No country page** | - | - | **GAP.** No Nigeria/Kenya/South Africa/Egypt market. "Africa" is a continent - see -3 + -6 for the country-targeting recommendation. |

**Key finding: 6 of 7 priority markets already ship as reciprocal-hreflang export pages. The only true content gap is Africa.** The hreflang plumbing is built and correct (verified below). The remaining international upside is (a) closing the Africa gap with 1-3 country pages, (b) layering geo-signals the code does not yet emit (areaServed enrichment, currency/Incoterm copy, GSC International Targeting, GBP/NAP), and (c) a deliberate keyword/intent split so the 21 `/export/[market]` pages do not cannibalize the `silica-gel-exporter-[country]` SEO landing pages (audit H6).

---

## 1. hreflang strategy - status + gaps

### 1.1 Status: IMPLEMENTED and CORRECT (verified in source)

Confirmed in `src/app/export/[market]/page.tsx:57-119`. The cluster is generated on **every** market page from a single source (`exportMarkets`), so it is reciprocal and self-consistent - exactly what audit H2 prescribed, and it is live in the code:

```ts
// src/app/export/[market]/page.tsx:77-80 - VERIFIED PRESENT
const languages: Record<string, string> = Object.fromEntries(
  exportMarkets.map((m) => [MARKET_HREFLANG[m.slug] ?? "en", `/export/${m.slug}`]),
);
languages["x-default"] = "/export";
```

**What is correct (do not "fix" these):**
- -> **Reciprocal.** Every member emits the full set, so each page references every other + itself. Google will not discard it.
- -> **x-default -> `/export`** (the hub), not the homepage. Correct - the homepage is a distinct single-English page.
- -> **No collisions.** `europe` uses `en-150` (UN M49 region), `fob-karachi` holds the single bare `en`. Every other code is a unique `en-XX`.
- -> **Homepage correctly does NOT participate** (`src/app/layout.tsx:69-78` declares only `canonical: siteUrl`, with an explicit comment explaining why). This resolves the old homepage-vs-export canonical conflict.
- -> JSON-LD `OfferCatalog` now models each format as a **Service** (`page.tsx:199-211`), not a bare Product - audit H8 is already applied. No "invalid item" warning will recur.

### 1.2 Gaps + critique (the remaining hreflang work)

**GAP A - Africa is absent from the cluster.** Because hreflang is generated from `exportMarkets`, the moment an Africa country page is added (-3), it is auto-included with zero manual hreflang edits. This is the single best argument for adding the page as `/export/[market]` data rather than a one-off route. Recommended codes when added: `en-NG` (Nigeria), `en-KE` (Kenya), `en-ZA` (South Africa).

**GAP B - `en-150` for Europe is technically valid but risky in practice.** Google supports UN M49 region codes, but its own documentation recommends ISO 3166-1 country codes and historically logs M49 region codes inconsistently in GSC's hreflang report. The `europe` page already overlaps geographically with `uk`/`germany`. **Critique:** keep `en-150` (it avoids the bare-`en` collision and the comment reasoning is sound), but treat `/export/europe` as a hub/category page, not a country-ranking page - point its internal links down to `uk`, `germany`, and (future) country pages, and do not target country-specific keywords on it. Monitor GSC -> Pages -> hreflang for "no return tags" on `en-150`; if it flags, the fallback is to drop `europe` from the language map (keep the page, keep it in the sitemap) and let `uk`/`germany`/`fob-karachi` carry the regional codes.

**GAP C - the homepage has no hreflang at all, which is fine, but it means the homepage cannot geo-route.** This is the correct design for a single-language site. The implication for strategy: the homepage will rank on **brand + global head terms**, while country SERP routing is delegated entirely to `/export/[market]`. Therefore homepage internal links into the export cluster matter (see -6.4) - they are how Google discovers and weights the geo-routed children.

**GAP D - `og:locale` derivation.** `page.tsx:110` sets `locale: hreflang.replace("-", "_")` -> e.g. `en_150` for Europe and `en` for fob-karachi. `en_150` is not a valid OG locale string (OG expects `language_TERRITORY`). Low severity (OG locale is a weak signal), but worth a guard so a malformed value isn't emitted:

```ts
// PROPOSED guard - src/app/export/[market]/page.tsx generateMetadata, replacing the inline locale
// Only emit og:locale for true language_TERRITORY codes; skip region (en-150) and bare en.
const ogLocale = /^[a-z]{2}-[A-Z]{2}$/.test(hreflang) -> hreflang.replace("-", "_") : "en_US";
// ...later in openGraph: locale: ogLocale,
```

**GAP E - no `hreflang` on the SEO landing pages that target countries.** `src/lib/seo-landing-pages.ts` contains country-keyword pages (e.g. `silica-gel-exporter-[country]` per audit H6). Those pages and `/export/[market]` both target the same country intent and currently do NOT cross-declare. **Do not add hreflang between them** - they are same-language same-region, so hreflang is the wrong tool. The correct fix is the de-cannibalization split in -4.5 (different intent per URL) + a `rel` internal link, not hreflang.

---

## 2. Geo-targeting signals (beyond hreflang)

These are signals the codebase does **not** yet emit. Ordered by leverage.

### 2.1 GSC International Targeting + property hygiene (no code; do first, free)
- **Do NOT set a country in GSC's legacy International Targeting** for the root property. A `.com` exporter wanting 7+ markets must stay geo-neutral; pinning to one country suppresses the rest. (The `.com` on a Vercel/global CDN already has no ccTLD signal - keep it that way.)
- Verify the **domain property** (DNS) so every subpath and protocol variant is covered, then submit the sitemap (`absoluteUrl("/sitemap.xml")`, emitted by `src/app/robots.ts:32`).
- Use **GSC -> Performance -> filter by Country** to validate that `/export/usa` wins US impressions, `/export/uk` wins GB, etc. This is the only true test that hreflang routing works; check it 4-6 weeks after the cluster is crawled. Wire this into `SEO-MONITORING-CHECKLIST.md`.

### 2.2 `areaServed` enrichment (code; medium leverage)
Today `Organization.areaServed` (`src/app/layout.tsx:290-302`) lists 11 areas but **omits the very markets being targeted**: no Saudi Arabia is listed as... (it is), but **India is missing**, **no African country**, and the per-page `Service.areaServed` is a bare string (`market.country`, `page.tsx:191`). Two upgrades:

**(a) Add the missing priority markets to the Organization graph** (`layout.tsx:290-302`):
```ts
// PROPOSED - add to Organization.areaServed array (keep existing entries)
"India",
"Nigeria",
"Kenya",
"South Africa",
```

**(b) Upgrade per-page `Service.areaServed` from a string to a `Country` node with ISO code** - a stronger, machine-readable geo signal than free text:
```ts
// PROPOSED - src/app/export/[market]/page.tsx, replace `areaServed: market.country` (3 sites: ~191, ~209)
// Requires adding an optional `isoCode` to ExportMarket in markets.ts (e.g. uae:"AE", usa:"US", india:"IN").
areaServed: market.isoCode
  -> { "@type": "Country", name: market.country, identifier: market.isoCode }
  : market.country,
```

### 2.3 Currency, Incoterms, ports, lead-time, MOQ as on-page copy (code/content; HIGH leverage for B2B intent)
The current `/export/[market]` pages render Incoterms generically (`page.tsx:269-284`) and never state **currency, MOQ, or lead-time** - the three things a procurement buyer actually searches and scans for. These are also strong entity/geo signals (a page naming "Jebel Ali", "AED quote on request", "FOB Karachi -> Jebel Ali ~5-7 days" is unmistakably UAE-intent). Per-market values are tabulated in -3. Implementation: extend the `ExportMarket` type with optional fields and render a "Commercial snapshot" block.

```ts
// PROPOSED additions to ExportMarket in src/app/export/markets.ts
  currencyNote?: string;   // e.g. "Quotes in USD; AED on request"
  moqNote?: string;        // e.g. "Sample carton to 1 pallet; container MOQ on bulk beads"
  leadTimeNote?: string;   // e.g. "FOB Karachi 7-12 days production + ~5-7 days transit to Jebel Ali"
  incotermsPreferred?: string[]; // e.g. ["FOB Karachi","CIF Jebel Ali","DAP Dubai"]
```
```tsx
// PROPOSED - new section in src/app/export/[market]/page.tsx (only renders if fields exist)
{(market.currencyNote || market.moqNote || market.leadTimeNote) && (
  <section className={styles.section}>
    <div className={styles.sectionHead}><h2>Commercial snapshot for {market.country}.</h2></div>
    <div className={styles.grid}>
      {market.incotermsPreferred?.length -> (
        <article className={styles.card}><span>Incoterms</span><h3>Preferred routes</h3>
          <p>{market.incotermsPreferred.join(" - ")}</p></article>) : null}
      {market.currencyNote -> (
        <article className={styles.card}><span>Currency</span><h3>Quote currency</h3>
          <p>{market.currencyNote}</p></article>) : null}
      {market.moqNote -> (
        <article className={styles.card}><span>MOQ</span><h3>Minimum order</h3>
          <p>{market.moqNote}</p></article>) : null}
      {market.leadTimeNote -> (
        <article className={styles.card}><span>Lead time</span><h3>Production + transit</h3>
          <p>{market.leadTimeNote}</p></article>) : null}
    </div>
  </section>
)}
```

> **Guardrail note on the snapshot copy:** lead times and MOQ are operational facts, safe to state. Do NOT phrase currency as a held capability beyond quoting (no "we invoice in EUR" unless the business confirms it). Keep "quotes in USD; [local] on request" phrasing - it is accurate and buyer-friendly.

### 2.4 NAP / Google Business Profile (local entity signals)
- The Organization NAP is correct and consistent (`layout.tsx:281-289`: North Karachi Industrial Area, `addressCountry: "PK"`). **Keep this single canonical NAP everywhere** - it must byte-match GBP, LinkedIn, and every directory citation (`BACKLINKS-PLAYBOOK.md`).
- **GBP recommendation:** maintain ONE GBP for the Karachi manufacturing entity (Kamran Enterprises / DryGelWorld). Do **not** create fake local listings in UAE/USA/etc - that violates GBP guidelines and risks suspension. For destination markets, geo-relevance comes from the export pages + directories (ThomasNet for USA, IndiaMART for India, Made-in-China/Alibaba for global), not from local GBPs the company has no premises for.
- Add `sameAs` to the verified GBP URL once live (`layout.tsx:323-326` currently lists silicagelpk.com + LinkedIn) to bind the GBP entity to the Organization node.

### 2.5 Hosting / edge geo-signal
- `robots.ts:8-13` warns of a managed-AI-bots edge override. Confirm with `curl -A Googlebot https://www.drygelworld.com/robots.txt` that the app-generated robots (AI bots allowed) is actually served. An edge layer that rewrites robots can also strip/alter response headers - verify no edge geo-redirect (e.g. IP-based country redirect) is silently sending all non-PK traffic to a single locale, which would wreck per-market indexing.

---

## 3. Per-market export landing-page spec (the 7 priorities)

For the **6 existing pages**, this is an *enrichment* spec (add the -2.3 commercial fields + intent tightening). For **Africa**, this is a *create* spec. Currency/MOQ/lead-time values below are realistic Karachi-origin export defaults - **confirm against the business before publishing**; they are proposed copy, not quoted commitments.

### 3.1 USA - `/export/usa` (EXISTS - enrich)
- **Primary intent:** private-label + bulk distributor sourcing; "silica gel supplier USA", "bulk silica gel wholesale USA", "private label desiccant packets".
- **Unique angle to add:** CPSC small-parts/warning-text and child-safety labeling readiness (the `routeNote` already nods to "warning text"). Frame FDA as buyer-led (food/pharma contact applications), never as held.
- **Currency:** Quotes in USD. **MOQ:** sample pack -> 1 carton for trials; container MOQ on 25kg loose bulk. **Lead time:** 7-12 days production + ~22-30 days transit (Karachi -> LA/Long Beach or NY/NJ). **Incoterms:** FOB Karachi - CIF US West/East Coast - buyer-nominated forwarder (already in `ports`).

### 3.2 UK - `/export/uk` (EXISTS - enrich)
- **Primary intent:** post-Brexit import sourcing; "silica gel supplier UK", "desiccant suppliers UK", "container desiccant UK".
- **Unique angle:** REACH as **buyer-led discussion** (already correct in `markets.ts:236`); UK-specific customs/UKCA framing kept as a conversation, not a cert. Dry-clay format differentiator already present.
- **Currency:** USD; GBP indicative on request. **MOQ:** sample -> pallet for SMEs. **Lead time:** prod 7-12 days + ~18-24 days to Felixstowe/Southampton. **Incoterms:** FOB Karachi - CIF Felixstowe - DAP UK.

### 3.3 UAE - `/export/uae` (EXISTS - enrich)
- **Primary intent:** re-export hub + distributor sourcing; "silica gel supplier UAE/Dubai", "desiccant suppliers Dubai", "silica gel Jebel Ali".
- **Unique angle:** Jebel Ali as a **re-export consolidation hub for the wider GCC/Africa** - strong reason for African buyers to also route via UAE (link UAE -> future Africa page). Arabic/English carton labeling already in `rfqTip`.
- **Currency:** USD; AED on request. **MOQ:** sample carton -> 1 pallet; lowest-friction GCC market. **Lead time:** prod 7-10 days + ~5-7 days transit to Jebel Ali (the fastest priority lane - emphasize this). **Incoterms:** FOB Karachi - CIF Jebel Ali - DAP Dubai/Sharjah.

### 3.4 Saudi Arabia - `/export/saudi-arabia` (EXISTS - enrich)
- **Primary intent:** importer/distributor + industrial packaging sourcing; "silica gel supplier Saudi Arabia", "desiccant supplier Jeddah/Dammam".
- **Unique angle:** SASO/SABER conformity and SFDA (for pharma/consumer applications) framed strictly as **buyer-led** import-conformity discussions - DryGelWorld supplies ISO 9001:2015/SDS/COA/DMF-free to support the buyer's own SABER filing; it does NOT hold SASO/SFDA. Keep this wording.
- **Currency:** USD; SAR on request. **MOQ:** pallet -> container; recurring monthly supply emphasized (already in `products`). **Lead time:** prod 7-12 days + ~6-9 days to Jeddah, ~7-10 to Dammam. **Incoterms:** FOB Karachi - CIF Jeddah/Dammam.

### 3.5 Germany - `/export/germany` (EXISTS - enrich)
- **Primary intent:** OEM/automotive/electronics industrial packaging; "Trockenmittel Lieferant" (see -5), "silica gel supplier Germany", "container desiccant Germany".
- **Unique angle:** SDS-in-German + REACH **buyer-led** (already correct, `markets.ts:250`); dry-clay desiccant for heavy industrial parts (VCI-adjacent use). Highest technical-buyer bar of the 7.
- **Currency:** USD; EUR indicative on request. **MOQ:** pallet -> container; OEM contract supply. **Lead time:** prod 10-14 days + ~20-26 days to Hamburg/Bremerhaven. **Incoterms:** FOB Karachi - CIF Hamburg - DAP Germany.

### 3.6 India - `/export/india` (EXISTS - enrich)
- **Primary intent:** distributor + pharma/electronics packaging; "silica gel supplier India", "silica gel manufacturer India", "desiccant manufacturer India".
- **Critical positioning note:** India has strong **domestic** manufacturing (Desiccant Pak, CILICANT). DryGelWorld competes on **Karachi-origin export pricing + private label + cross-border supply**, NOT on "cheapest local". The page must lean into import-vs-local comparison (already nodded to in `markets.ts:166`) and private-label programs - do not try to outrank domestic players on bare "silica gel India".
- **Currency:** USD. **MOQ:** container-level for cost-competitiveness vs domestic. **Lead time:** prod 7-12 days + ~7-12 days to Nhava Sheva/Mundra. **Incoterms:** FOB Karachi - CIF Nhava Sheva.

### 3.7 AFRICA - **CREATE** (the only true gap)
**Recommendation: do NOT create a single `/export/africa` page.** "Africa" is a continent; a continent page cannot rank for buyer-intent country queries and would dilute hreflang (no valid single code). Instead add **the data records** to `exportMarkets` so they inherit the full template, hreflang cluster, sitemap entry, and JSON-LD automatically.

**Phase 1 (launch now): Nigeria + Kenya + South Africa** - the three highest-import, highest-English-search African economies for industrial/packaging desiccant. **Phase 2 (optional): Egypt** (`en-EG`, large manufacturing base, but more Arabic-search - see -5).

Proposed `markets.ts` records (guardrail-clean copy; confirm operational facts before publish):

```ts
// PROPOSED additions to exportMarkets in src/app/export/markets.ts
  {
    slug: "nigeria",
    country: "Nigeria",
    title: "Silica gel and desiccant supplier for Nigeria importers and packaging buyers.",
    description:
      "Factory-direct silica gel sachets, bulk beads, and container strips for Nigerian distributors, FMCG packagers, agro-export, and electronics importers routing through Lagos and Port Harcourt.",
    buyerTypes: ["Lagos importers and distributors", "FMCG and consumer-goods packagers", "Agro-export and dry-goods packers", "Electronics and spare-parts importers"],
    ports: ["Apapa (Lagos)", "Tin Can Island", "Onne / Port Harcourt", "Buyer-nominated forwarders"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "1kg-5kg container strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Nigerian buyers should confirm SONCAP/Form M import-conformity expectations early - SONCAP is a buyer-led import process, not a held certification. DryGelWorld supplies ISO 9001:2015, SDS, COA, and a DMF-free statement to support the buyer's conformity filing; product format, quantity, and Lagos vs Port Harcourt routing should be set before pricing.",
    rfqTip: "Send destination port (Lagos/Port Harcourt), Form M / SONCAP document needs, product format, monthly volume, and whether the order is one-time or recurring.",
  },
  {
    slug: "kenya",
    country: "Kenya",
    title: "Silica gel desiccant supplier for Kenya and East Africa import buyers.",
    description:
      "Silica gel sachets, bulk desiccant, and container moisture-control formats for Kenyan distributors, tea and agro-export packers, electronics importers, and East-Africa regional supply via Mombasa.",
    buyerTypes: ["Nairobi and Mombasa importers", "Tea, coffee and agro-export packers", "Packaging distributors", "Electronics and dry-goods importers"],
    ports: ["Mombasa", "Nairobi inland container depot (ICD)", "East-Africa transit (Uganda/Rwanda routing)", "Air sample shipments"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "Container desiccant strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Kenyan buyers should confirm KEBS / PVoC import-conformity expectations early - PVoC is a buyer-led import process, not a held certification. Mombasa is the East-Africa gateway, so transit buyers serving Uganda/Rwanda should state the final destination before routing and pricing.",
    rfqTip: "Send destination (Kenya or transit market), KEBS/PVoC document needs, product format, monthly volume, and whether agro-export or electronics protection is the priority.",
  },
  {
    slug: "south-africa",
    country: "South Africa",
    title: "Silica gel and dry clay desiccant supplier for South Africa importers.",
    description:
      "Industrial silica gel sachets, dry clay packs, bulk beads, and cargo strips for South African distributors, automotive and mining-equipment packagers, electronics importers, and logistics buyers via Durban and Cape Town.",
    buyerTypes: ["Durban and Johannesburg distributors", "Automotive and mining-equipment packagers", "Electronics and consumer-goods importers", "Logistics and warehouse procurement"],
    ports: ["Durban", "Cape Town", "Port Elizabeth (Gqeberha)", "City Deep inland terminal (Johannesburg)"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "South African buyers should align SABS/NRCS import expectations and document language early - these are buyer-led import processes, not held certifications. Durban is the primary gateway with inland routing to Johannesburg via City Deep; dry clay is offered alongside silica gel for heavy industrial and mining-equipment packaging.",
    rfqTip: "Send port (Durban/Cape Town), inland destination, SABS/NRCS document needs, monthly volume, and whether silica gel, dry clay, or both fit the application.",
  },
```
Then add to `MARKET_HREFLANG` in `page.tsx:19-40`:
```ts
  nigeria: "en-NG",
  kenya: "en-KE",
  "south-africa": "en-ZA",
```
**No sitemap edit needed** - `sitemap.ts:130-140` loops `exportMarkets`, so the three pages and their images auto-publish. After deploy, run them through `GSC-INDEXING-BATCHES.md` as a dedicated "Africa batch".

> **Conformity-claim guardrail (Africa):** SONCAP (Nigeria), PVoC/KEBS (Kenya), and SABS/NRCS (South Africa) are **import-conformity processes the buyer initiates**, supported by the supplier's ISO/SDS/COA. The proposed `routeNote` copy says exactly this. NEVER let it drift into "DryGelWorld is SONCAP/SABS certified."

---

## 4. International keyword targeting (per market, with intent)

Volumes are directional (low-competition long-tail B2B; treat as intent priority, not absolute MSV). **C** = commercial/transactional, **N** = navigational/sourcing, **I** = informational. Map each cluster to the named URL to enforce the -4.5 de-cannibalization.

### 4.1 USA -> `/export/usa`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier USA | C | /export/usa |
| bulk silica gel wholesale USA | C | /export/usa |
| private label silica gel packets | C | /export/usa (+ /private-label) |
| desiccant manufacturer USA import | C | /export/usa |
| silica gel packets bulk buy | C | /products + /export/usa |
| container desiccant supplier USA | C | /export/usa |

### 4.2 UK -> `/export/uk`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier UK | C | /export/uk |
| desiccant suppliers UK | C | /export/uk |
| silica gel wholesale UK | C | /export/uk |
| container desiccant UK | C | /export/uk |
| silica gel sachets bulk UK | C | /export/uk |
| moisture absorber supplier UK | C | /export/uk |

### 4.3 UAE -> `/export/uae`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier UAE | C | /export/uae |
| silica gel suppliers in Dubai | C | /export/uae |
| desiccant supplier Dubai | C | /export/uae |
| silica gel Jebel Ali / bulk Dubai | C | /export/uae |
| container desiccant UAE | C | /export/uae |
| moisture absorber Dubai wholesale | C | /export/uae |

### 4.4 KSA -> `/export/saudi-arabia`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier Saudi Arabia | C | /export/saudi-arabia |
| desiccant supplier Jeddah | C | /export/saudi-arabia |
| silica gel Dammam / Riyadh | C | /export/saudi-arabia |
| bulk silica gel Saudi Arabia | C | /export/saudi-arabia |
| container desiccant KSA | C | /export/saudi-arabia |

### Germany -> `/export/germany`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier Germany | C | /export/germany |
| Trockenmittel Lieferant (DE) | C | /export/germany (see -5) |
| Silikagel Gro-handel (DE) | C | /export/germany (see -5) |
| container desiccant Germany | C | /export/germany |
| industrial desiccant Germany import | C | /export/germany |

### India -> `/export/india`
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier India (import) | C | /export/india |
| private label silica gel India | C | /export/india |
| bulk silica gel exporter to India | C | /export/india |
| pharma desiccant supplier (import) | C | /export/india + /industries/pharma-packaging |
| container desiccant India | C | /export/india |

> Lean to **import/private-label** modifiers - bare "silica gel India" is dominated by domestic manufacturers (see -3.6).

### Africa -> new pages
| Keyword | Intent | Target URL |
|---|---|---|
| silica gel supplier Nigeria / Lagos | C | /export/nigeria |
| desiccant supplier Nigeria import | C | /export/nigeria |
| silica gel supplier Kenya / Mombasa | C | /export/kenya |
| silica gel supplier South Africa | C | /export/south-africa |
| container desiccant South Africa / Durban | C | /export/south-africa |
| bulk silica gel East Africa | C | /export/kenya |

### 4.5 De-cannibalization rule (resolves audit H6)
The 21 `/export/[market]` pages and any `silica-gel-exporter-[country]` SEO landing pages (`src/lib/seo-landing-pages.ts`) must NOT chase identical queries:
- **`/export/[market]`** owns **commercial sourcing/RFQ intent** ("supplier", "buy", "wholesale", "import", port/Incoterm queries). This is the canonical country URL.
- **`silica-gel-exporter-[country]` landing pages** (where they exist) should pivot to **informational/comparison intent** ("how to import silica gel to [country]", "silica gel import requirements [country]") and internal-link to the matching `/export/[market]` for the RFQ. If a landing page has no distinct intent, redirect it to its `/export/[market]` equivalent - but per the guardrail, **only redirect a true duplicate; never delete a uniquely-keyworded landing page.**

---

## 5. Multilingual opportunities - assessed (NOT assumed yes)

The entire site is English-only (`<html lang="en">`, `layout.tsx:143`; all `markets.ts` content English). The question: is Arabic (UAE/KSA) or German (DE) worth translating?

### 5.1 Arabic for UAE / KSA - **RECOMMENDATION: NO (not now). LOW priority.**
- **Buyer reality:** B2B import/procurement in UAE/KSA is conducted overwhelmingly in **English** (Jebel Ali, GCC trade, distributor communication, RFQs). The decision-makers DryGelWorld targets search and transact in English. Arabic search for "silica gel" exists but skews to **consumer/retail**, not the container/bulk B2B buyer.
- **Effort:** HIGH. Arabic is RTL - full bidirectional CSS audit across the ~4,900-line `page.module.css` and every component, a parallel `markets.ts`/content layer, a new `ar-AE`/`ar-SA` hreflang sub-cluster, and ongoing native-Arabic copy maintenance (machine translation here would damage the premium B2B credibility the site is built on).
- **ROI:** LOW relative to effort, on a site doing ~8 users/week. The English `en-AE`/`en-SA` pages already capture the real buyer.
- **Verdict:** Defer Arabic until the English export cluster is proven to rank and convert in GCC SERPs (validate via GSC country filter, -2.1). Cheap interim win: the UAE `rfqTip` already offers **Arabic/English carton labeling** - keep that operational capability in copy; it signals Arabic-market readiness without a translation project.

### 5.2 German for Germany - **RECOMMENDATION: CONDITIONAL / LOW-MEDIUM. Do the cheap part only.**
- **Buyer reality:** German *industrial procurement* searches in German more than GCC buyers do. "Trockenmittel" (desiccant), "Silikagel", "Trockenmittel Lieferant/Gro-handel" carry real B2B intent, and German OEM buyers prefer German-language vendor material (the page already promises **SDS in German**, `markets.ts:250`).
- **But:** full German site translation is HIGH effort for ONE market and would orphan a `de-DE` page from the all-English cluster.
- **Verdict - targeted, low-cost approach (do this, not a full translation):**
  1. Add 2-3 German keyword phrases into the **existing English** `/export/germany` page naturally (a short German-language paragraph + the German terms in `keywords`), which is fully legitimate and lets Google associate the page with German queries without a separate locale.
  2. Keep **SDS-in-German** as the concrete deliverable (operational, already promised).
  3. Only build a true `de-DE` translated page if GSC shows German-query impressions on `/export/germany` with poor CTR (i.e. demand proven, language is the gap). Sample injection:
```tsx
// PROPOSED - optional German intent paragraph appended to /export/germany body (English page, German terms)
<p lang="de">
  Trockenmittel-Lieferant f-r deutsche Importeure: Silikagel-Beutel, Sch-ttgut und
  Container-Trockenmittel ab Werk Karachi. SDS auf Deutsch, COA und ISO 9001:2015 verf-gbar.
</p>
```
   And add `"Trockenmittel Lieferant"`, `"Silikagel Gro-handel"`, `"Container Trockenmittel"` to the Germany branch of the `keywords` array (currently auto-generated English-only in `page.tsx:86-92` - this needs a per-market keyword override).

### 5.3 Summary table
| Language | Market | Effort | ROI now | Verdict |
|---|---|---|---|---|
| Arabic | UAE/KSA | High (RTL + maintenance) | Low | **No** - defer; keep Arabic labeling capability in copy |
| German | Germany | Full=High / targeted=Low | Medium (targeted) | **Targeted only** - German terms + SDS-in-German on the English page; full `de-DE` only if GSC proves demand |
| French | (Canada/Africa) | - | Low | Out of scope; Canada page already mentions EN/FR labeling |

---

## 6. Country-specific SEO page recommendations

### 6.1 Create the Africa pages (-3.7) - highest-priority gap
Nigeria + Kenya + South Africa as `exportMarkets` records. Auto-inherits hreflang, sitemap, JSON-LD. This is the single biggest international content gap and the cheapest to close (data-only, no new route file).

### 6.2 Enrich the 6 existing priority pages with the Commercial Snapshot (-2.3)
Currency / MOQ / lead-time / preferred Incoterms per -3. This is the highest-leverage CRO + intent upgrade - it gives each page unique, scannable, geo-specific substance that thin competitor pages lack, and reinforces the country entity signal.

### 6.3 Differentiate `/export/europe` as a hub, not a ranking page (-1.2 Gap B)
Convert internal links so `europe` funnels to `uk`, `germany`, and (future) country pages. Do not target country keywords on it. Watch its `en-150` return tags in GSC.

### 6.4 Strengthen homepage -> export internal linking
Because the homepage carries no hreflang (correctly), it must instead **discover and weight** the export children via links. Confirm the homepage and `src/components/site-footer.tsx` link to `/export` and ideally surface the priority 7 directly. This is how the geo-routed cluster inherits authority. (Cross-ref `SEO-CRO-FULL-AUDIT.md` internal-linking findings + the hero-CTA fix H3.)

### 6.5 Per-market directory citations (NAP-consistent), not fake local pages
Per -2.4 and `BACKLINKS-PLAYBOOK.md`: USA -> ThomasNet; India -> IndiaMART; global/Asia -> Made-in-China, Alibaba; UAE/KSA -> GCC trade directories. Each citation links the canonical `/export/[market]` and uses the single canonical Karachi NAP. This is the legitimate substitute for local GBPs in markets without premises.

### 6.6 Do NOT create
- A single `/export/africa` continent page (won't rank, breaks hreflang).
- Local GBP listings in destination countries (guideline violation).
- Translated `ar-*` pages now, or a full `de-DE` site (-5).
- Any country page claiming FDA/REACH/SASO/SFDA/SONCAP/KEBS/SABS/Halal/GMP/food-grade certification - all framed as buyer-led import processes only.

---

## 7. Sequenced action list (where it slots into the 90-day roadmap)

| # | Action | Type | Effort | File(s) | Cross-ref |
|---|---|---|---|---|---|
| 1 | Verify robots/edge + GSC domain property; do NOT set International Targeting country | Config | S | GSC, CDN | -2.1, `robots.ts` |
| 2 | Add Nigeria/Kenya/South Africa records + hreflang codes | Content | M | `markets.ts`, `export/[market]/page.tsx` | -3.7 |
| 3 | Add Commercial Snapshot fields + section (currency/MOQ/lead-time/Incoterms) | Content+Code | M | `markets.ts`, `export/[market]/page.tsx` | -2.3, -3 |
| 4 | Enrich `Organization.areaServed` (+India/Africa) and per-page `Country` node | Code | S | `layout.tsx`, `export/[market]/page.tsx`, `markets.ts` | -2.2 |
| 5 | Add `og:locale` guard for region/bare codes | Code | S | `export/[market]/page.tsx` | -1.2 Gap D |
| 6 | De-cannibalize `/export/[market]` vs landing pages (intent split, never delete) | Content | M | `seo-landing-pages.ts` | -4.5, audit H6 |
| 7 | German terms + SDS-in-German on English `/export/germany`; per-market keyword override | Content+Code | S-M | `export/[market]/page.tsx`, `markets.ts` | -5.2 |
| 8 | Convert `/export/europe` to hub; homepage?export internal links | Content | S | `export/page.tsx`, `site-footer.tsx`, home | -6.3, -6.4 |
| 9 | Submit Africa + enriched cluster via indexing batches; validate via GSC country filter in 4-6 wks | Monitor | S | GSC | -2.1, `GSC-INDEXING-BATCHES.md`, `SEO-MONITORING-CHECKLIST.md` |
| 10 | Defer Arabic; revisit full `de-DE` only if GSC proves German demand | Decision | - | - | -5 |

---
*End of INTERNATIONAL-SEO.md. All code/copy blocks are proposals for review - no source files were modified. Operational figures (lead time, MOQ, currency) are proposed defaults and must be confirmed with the business before publishing.*
