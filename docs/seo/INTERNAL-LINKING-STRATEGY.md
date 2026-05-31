# Internal Linking Strategy & Spec - DryGelWorld

**Owner:** SEO/CRO
**Scope:** Internal link architecture for https://www.drygelworld.com/ (Next.js 16 App Router, source at `C:\Users\HP Probook 650\Desktop\SilacaGEL`)
**Status:** Propose-first. No source files changed by this document. Every code/copy block below is for human review and later application.
**Companion docs:** Extends `SEO-CRO-FULL-AUDIT.md` findings **H13** (22 orphans), **H14** (homepage + export dead-ends), **M31** (breadcrumb UI), **M30** (no `/industries` index). Cross-references `COMPETITOR-STRATEGY.md`, `TOPICAL-AUTHORITY-MAP.md`, `BACKLINKS-PLAYBOOK.md`, `GSC-INDEXING-BATCHES.md`.
**Provenance guardrail honored throughout:** anchors/labels reference only ISO 9001:2015 + DMF-free. No FDA / REACH / Halal / GMP / JEDEC / "food-grade certified" claims. "Food grade" appears ONLY where it already exists as a target keyword/URL (`/food-grade-silica-gel-supplier`) and is framed as a product page, never a held certification.

---

## 0. TL;DR - what is actually broken (verified against the codebase)

The site already has **three well-built internal-link engines** that the audit's H13/H14 wording undersells. Before recommending anything, this spec verified the real graph:

| Engine | File | What it does | Health |
| --- | --- | --- | --- |
| Blog topical clusters | `src/lib/blog-clusters.ts` | Every blog -> 2-3 sibling guides + 2-3 products + optional compare + optional industry | **Strong.** 28 blogs fully mapped, rendered at `blog/[slug]/page.tsx`. |
| Product clusters | `src/app/products/[slug]/page.tsx` (`productClusters` + `procurementDetails[].related`) | Every product -> blogs + compare + industry + export/document pages | **Strong.** All 7 products wired out. |
| Homepage SEO clusters | `src/app/page.tsx` (`seoClusters`, `buyerGuideLinks`) | Homepage -> 7 landing/industry pages + guides | **Partial** (see -1; H14's "homepage links to zero keyword pages" is now **stale** - it links to ~7). |

The **genuinely broken** surfaces, confirmed by reading source:

1. **`export/[market]` (21 markets) are crawl dead-ends.** `src/app/export/[market]/page.tsx` emits exactly **one** outbound `<Link>` in the body: `href="/contact"` (line 224). No links to products, industries, sibling markets, the matching geo landing page, or blog. 21 high-authority international pages trap all their equity. **This is the single highest-leverage fix in this document.**
2. **22 orphan landing pages** (H13) - reachable only via `sitemap.xml`. The landing component only renders **3 `relatedLinks`** per page (`seo-landing-page.tsx:225-232`), and most point to 2 siblings + `/contact`, so the long tail (geo exporter pages, hair-net/beard-cover variants, `bentonite-clay`, `silica-gel-beads`, `cargo-desiccant-supplier`, etc.) is never linked.
3. **No `/industries` index** (M30). `src/app/industries/` contains only `[industry]/`. The header (`site-header.tsx:14`) deep-links to a single industry (`/industries/electronics-packaging`); there is no hub to consolidate the 6-industry cluster, and breadcrumbs have no valid parent node.
4. **No visible breadcrumb UI anywhere** (M31). `breadcrumbJsonLd()` is emitted on product/export/landing pages, but no clickable trail is rendered - zero crawlable upward links from leaf pages; landing pages have only a 2-level (Home > page) chain with no category.
5. **Anchor text is padded/generic.** Landing relatedLinks render as `<span>Open</span>{label}` (`seo-landing-page.tsx:228`); product "back" link is "Back to Homepage" (`products/[slug]/page.tsx:421`); footer uses some weak labels. Anchors should carry the target keyword, not "Open".
6. **Landing pages never link to the pillar/guide layer.** The `relatedLinks` arrays point landing?landing or landing?`/contact`. None point landing -> `/guides/silica-gel-buyer-guide`, landing -> relevant `/blog/*`, or landing -> `/industries/*`. The keyword pages are walled off from the editorial authority layer.

---

## 1. Current internal-link graph (as built)

### 1.1 Route inventory (verified)

| Cluster | Route pattern | Count | Source |
| --- | --- | --- | --- |
| Home | `/` | 1 | `src/app/page.tsx` |
| Keyword landing pages | 16 static dirs + `/[seoSlug]` catch-all | **73 slugs** | `src/lib/seo-landing-pages.ts` (`highIntentSeoLandingSlugs`) |
| Products | `/products`, `/products/[slug]` | 1 + 7 | `src/lib/product-data.ts` |
| Export hub + markets | `/export`, `/export/[market]` | 1 + **21** | `src/app/export/markets.ts` |
| Industries | `/industries/[industry]` (no index) | 6 | `industries/[industry]/page.tsx` |
| Compare | `/compare`, `/compare/[slug]` | 1 + 3 | `src/lib/compare-data.ts` |
| Blog | `/blog`, `/blog/[slug]` | 1 + 28 | `src/app/blog/articles.ts` |
| Guides | `/guides/silica-gel-buyer-guide` | 1 | folder |
| Authors | `/authors/[slug]` | n | `src/lib/authors.ts` |
| Utility | `/about`, `/contact`, `/faq`, `/documents`, `/certifications`, `/case-studies`, `/private-label`, `/bulk-sales`, `/dispensers`, `/media-kit`, `/videos`, `/drygelworld` | 12 | folders |

The 21 export markets: `uae, saudi-arabia, qatar, usa, vietnam, russia, bangladesh, indonesia, mexico, turkey, india, brazil, malaysia, pakistan, fob-karachi, uk, germany, canada, australia, europe` (+ markets file shows 21 entries).

The 6 industries: `electronics-packaging, pharma-packaging, leather-footwear-export, food-packaging, textile-garment-export, container-shipping`.

### 1.2 Sitewide chrome (every page)

- **Header** (`site-header.tsx:9-17`): Home, Products, Export, Private Label, **Industries -> `/industries/electronics-packaging`** (deep-link, no hub), Documents, Blog + calc CTA + `/contact`.
- **Footer** (`site-footer.tsx:12-71`): 4 columns - Products (9 links), Export/OEM (9), Industries (8), Buyer Resources (12, incl. 3 blog links). **Good sitewide backstop, but contains zero export-market links and zero geo-landing links.**

### 1.3 Inbound-link reachability by cluster (the real graph)

| Target cluster | Linked from header? | Footer? | Homepage body? | Contextual (blog/product/landing)? | Verdict |
| --- | --- | --- | --- | --- | --- |
| Products (`/products/*`) | Yes (`/products`) | Yes (via landing slugs) | Yes (`#products`) | Yes (blog clusters -> products) | **Healthy** |
| Blog (`/blog/*`) | Yes (`/blog`) | 3 articles | Yes (`buyerGuideLinks`) | Yes (blog?blog, product?blog) | **Healthy** |
| Industries (`/industries/*`) | 1 deep-link only | Yes (4 of 6) | Yes (3 of 6) | Yes (blog/product clusters) | **OK but no hub; `textile-garment-export` + `container-shipping` weak** |
| ~16 head-term landing pages | No | Yes (most) | Yes (7) | Yes (landing relatedLinks, products) | **Healthy** |
| **22 orphan landing pages** | No | No | No | **No** | **Orphaned (H13)** |
| **Export markets (21)** | No (only hub) | **No** | No | No | **Receive from hub only; emit only -> `/contact` (dead-end, H14)** |
| Guides pillar (`/guides/silica-gel-buyer-guide`) | No | No | Via `buyerGuideLinks`? | Rarely | **Under-linked pillar** |
| Compare (`/compare/*`) | No | No | No | Yes (blog/product clusters) | **OK via clusters** |

### 1.4 The 22 orphans (verified slug list - H13)

These appear in `highIntentSeoLandingSlugs` but in **no** `<Link href>`, footer group, `seoClusters`, `relatedLinks`, blog cluster, or product cluster:

```
silica-gel-exporter-germany      silica-gel-supplier-uk          silica-gel-exporter-canada
silica-gel-exporter-usa          hair-net-supplier-uae           hair-net-supplier-saudi-arabia
hair-net-supplier-usa            beard-cover-supplier-usa        beard-cover-supplier-uk
beard-cover-supplier-saudi-arabia  dry-clay-desiccant-supplier-saudi-arabia
dry-clay-desiccant-supplier-uae  dry-clay-exporter-europe        bentonite-clay
silica-gel-beads                 cargo-desiccant-supplier        moisture-absorber-for-shipping
silica-gel-for-leather-export    container-desiccant-supplier-worldwide
container-desiccants-for-exporters  desiccants-for-pharma-industry  hair-nets-for-food-industry
```
(plus the `*-inch-hair-nets`, `non-woven-*`, `disposable-*` variants which are deeper-tail and handled by the hub pattern in -2.4.)

**Highest commercial value** (fix first): the four geo exporter pages (`usa`, `germany`, `canada`, `uk`) - they map 1:1 to the export markets and to the primary export goal.

---

## 2. Contextual link plan (the core deliverable)

Rules used to build every row below:
- **Editorial / contextual** links (inside body copy or a "related" block) carry far more weight than chrome links - prioritize them for money pages.
- Each money/orphan page should sit at **crawl depth = 3** and have **= 2 inbound contextual links** from topically adjacent pages.
- Anchor text = the **target page's primary keyword**, varied across sources (see -5). No "Open", no "click here".
- Reciprocity where it makes sense (landing -> industry, market -> geo-landing), but avoid every-page-links-to-every-page (dilutes signal).

### 2.A Export market -> products / industries / geo-landing / siblings (FIX #1)

**Mechanism:** Add a per-market relationship map + a rendered "related supply pages" block in `src/app/export/[market]/page.tsx` before the `/contact` CTA. Add fields to `ExportMarket` (or a sibling lookup) in `markets.ts`. This single change de-dead-ends all 21 markets AND feeds 4 orphan geo pages.

Proposed data addition (review - `src/app/export/markets.ts`):

```ts
// Add to ExportMarket type:
//   relatedIndustry?: { label: string; href: string };
//   geoLanding?: { label: string; href: string }; // links the market to its matching keyword landing page
// Example values per market:
// usa:          geoLanding: { label: "Silica gel exporter to the USA",     href: "/silica-gel-exporter-usa" }
// germany:      geoLanding: { label: "Silica gel exporter to Germany",     href: "/silica-gel-exporter-germany" }
// canada:       geoLanding: { label: "Silica gel exporter to Canada",      href: "/silica-gel-exporter-canada" }
// uk:           geoLanding: { label: "Silica gel supplier in the UK",      href: "/silica-gel-supplier-uk" }
// uae:          geoLanding: { label: "Hair net & desiccant supplier UAE",  href: "/hair-net-supplier-uae" }       // if relevant to market
// saudi-arabia: geoLanding: { label: "Dry clay desiccant supplier Saudi Arabia", href: "/dry-clay-desiccant-supplier-saudi-arabia" }
// europe:       geoLanding: { label: "Dry clay desiccant exporter Europe", href: "/dry-clay-exporter-europe" }
```

Proposed render block (review - `src/app/export/[market]/page.tsx`, before line 224 `<Link href="/contact">` or as a new `<section>` before the closing `</main>`):

```tsx
import { exportMarkets } from "../markets";
// ...inside component, after `const market = ...`:
const siblingMarkets = exportMarkets.filter((m) => m.slug !== market.slug).slice(0, 4);

// ...in JSX, new <section> before the JSON-LD <script>:
<section className={styles.section} aria-label={`Related supply pages for ${market.country}`}>
  <div className={styles.sectionHead}>
    <h2>Products and supply pages for {market.country} buyers</h2>
  </div>
  <ul className={styles.relatedLinks}>
    <li><Link href="/silica-gel-packets">Silica gel packets for {market.country}</Link></li>
    <li><Link href="/bulk-silica-gel-desiccant">Bulk silica gel desiccant supply</Link></li>
    <li><Link href="/shipping-container-desiccant-supplier">Shipping container desiccant supplier</Link></li>
    <li><Link href="/silica-gel-manufacturer-exporter">Silica gel manufacturer and exporter</Link></li>
    <li><Link href="/private-label-desiccant-packets">Private label desiccant packets</Link></li>
    {market.relatedIndustry && (
      <li><Link href={market.relatedIndustry.href}>{market.relatedIndustry.label}</Link></li>
    )}
    {market.geoLanding && (
      <li><Link href={market.geoLanding.href}>{market.geoLanding.label}</Link></li>
    )}
  </ul>
  <h3>Other export markets</h3>
  <ul className={styles.relatedLinks}>
    {siblingMarkets.map((m) => (
      <li key={m.slug}><Link href={`/export/${m.slug}`}>Silica gel supplier for {m.country}</Link></li>
    ))}
  </ul>
</section>
```

Per-market specific contextual links (full table - apply via `relatedIndustry`/`geoLanding` + the static block above):

| Source page (file: `export/[market]`) | Target URL | Keyword-rich anchor text | Type |
| --- | --- | --- | --- |
| `/export/usa` | `/silica-gel-exporter-usa` | Silica gel exporter to the USA | geo-landing (de-orphans) |
| `/export/germany` | `/silica-gel-exporter-germany` | Silica gel exporter to Germany | geo-landing (de-orphans) |
| `/export/canada` | `/silica-gel-exporter-canada` | Silica gel exporter to Canada | geo-landing (de-orphans) |
| `/export/uk` | `/silica-gel-supplier-uk` | Silica gel supplier in the UK | geo-landing (de-orphans) |
| `/export/uae` | `/hair-net-supplier-uae` | Hair net supplier in the UAE | geo-landing (de-orphans) |
| `/export/saudi-arabia` | `/dry-clay-desiccant-supplier-saudi-arabia` | Dry clay desiccant supplier in Saudi Arabia | geo-landing (de-orphans) |
| `/export/uae` (2nd) | `/dry-clay-desiccant-supplier-uae` | Dry clay desiccant supplier in the UAE | geo-landing (de-orphans) |
| `/export/europe` | `/dry-clay-exporter-europe` | Dry clay desiccant exporter to Europe | geo-landing (de-orphans) |
| `/export/vietnam` | `/industries/leather-footwear-export` | Silica gel for leather and footwear export | industry |
| `/export/india`, `/export/bangladesh` | `/industries/textile-garment-export` | Desiccant for textile and garment export | industry (feeds weak industry) |
| `/export/usa`, `/export/germany` | `/industries/electronics-packaging` | Desiccant for electronics packaging | industry |
| All 21 markets | `/silica-gel-manufacturer-exporter` | Silica gel manufacturer and exporter | pillar/money |
| All 21 markets | `/shipping-container-desiccant-supplier` | Shipping container desiccant supplier | money |
| All 21 markets | 4 sibling `/export/*` | Silica gel supplier for {Country} | sibling (cluster cohesion) |

### 2.B Landing page -> pillar / blog / industry (FIX #2 + de-orphan)

**Mechanism:** Extend the `relatedLinks` arrays in `src/lib/seo-landing-pages.ts` from 3 -> 4-6 entries each. Already rendered at `seo-landing-page.tsx:225-232` (no component change needed except the anchor fix in -5). Each money landing page should add: (a) 1 pillar/guide link, (b) 1 contextual blog link, (c) 1 industry link, (d) any topically-adjacent orphan.

| Source landing page | Add target URL | Keyword-rich anchor text | Purpose |
| --- | --- | --- | --- |
| `silica-gel-manufacturer-exporter` | `/silica-gel-exporter-usa` | Silica gel exporter to the USA | de-orphan |
| `silica-gel-manufacturer-exporter` | `/silica-gel-exporter-germany` | Silica gel exporter to Germany | de-orphan |
| `silica-gel-manufacturer-exporter` | `/silica-gel-supplier-uk` | Silica gel supplier in the UK | de-orphan |
| `silica-gel-manufacturer-exporter` | `/silica-gel-exporter-canada` | Silica gel exporter to Canada | de-orphan |
| `silica-gel-manufacturer-exporter` | `/silica-gel-for-leather-export` | Silica gel for leather export packaging | de-orphan |
| `silica-gel-exporter` | `/guides/silica-gel-buyer-guide` | Silica gel buyer guide | pillar |
| `bulk-silica-gel-desiccant` | `/silica-gel-beads` | Bulk silica gel beads | de-orphan |
| `bulk-silica-gel-desiccant` | `/blog/silica-gel-bulk-pricing-factors-for-exporters` | What drives bulk silica gel pricing | blog (BOFU) |
| `bulk-silica-gel-desiccant` | `/blog/bulk-silica-gel-supplier-checklist` | Bulk silica gel supplier checklist | blog |
| `white-silica-gel` | `/silica-gel-beads` | Silica gel beads | de-orphan |
| `indicating-silica-gel` | `/silica-gel-beads` | Indicating silica gel beads | de-orphan |
| `indicating-silica-gel` | `/blog/indicating-silica-gel-orange-blue-color-change-guide` | Orange vs blue indicating silica gel guide | blog |
| `non-indicating-silica-gel` | `/silica-gel-beads` | Non-indicating silica gel beads | de-orphan |
| `shipping-container-desiccant-supplier` | `/cargo-desiccant-supplier` | Cargo desiccant supplier | de-orphan |
| `shipping-container-desiccant-supplier` | `/moisture-absorber-for-shipping` | Moisture absorber for shipping | de-orphan |
| `shipping-container-desiccant-supplier` | `/blog/best-desiccant-for-shipping-containers` | Best desiccant for shipping containers | blog |
| `shipping-container-desiccant-supplier` | `/industries/container-shipping` | Container shipping moisture control | industry (feeds weak industry) |
| `container-desiccant` | `/bentonite-clay` | Bentonite clay desiccant | de-orphan |
| `container-desiccant` | `/dry-clay-desiccant-supplier-uae` | Dry clay desiccant supplier UAE | de-orphan |
| `container-desiccant-supplier` | `/container-desiccant-supplier-worldwide` | Worldwide container desiccant supplier | de-orphan |
| `container-desiccant-supplier` | `/container-desiccants-for-exporters` | Container desiccants for exporters | de-orphan |
| `pharmaceutical-desiccant` | `/desiccants-for-pharma-industry` | Desiccants for the pharma industry | de-orphan |
| `pharmaceutical-desiccant` | `/blog/silica-gel-for-pharma-packaging-buyer-guide` | Silica gel for pharma packaging guide | blog |
| `pharmaceutical-desiccant` | `/industries/pharma-packaging` | Pharma packaging desiccant | industry |
| `food-grade-silica-gel-supplier` | `/hair-nets-for-food-industry` | Hair nets for the food industry | de-orphan |
| `food-grade-silica-gel-supplier` | `/blog/food-grade-silica-gel-procurement-guide` | Food grade silica gel procurement guide | blog |
| `food-grade-silica-gel-supplier` | `/industries/food-packaging` | Food packaging desiccant | industry |
| `silica-gel-packets` | `/silica-gel-packets-wholesale` | Silica gel packets wholesale | money sibling |
| `silica-gel-packets` | `/blog/how-to-choose-silica-gel-packet-size` | How to choose silica gel packet size | blog |
| `silica-gel-manufacturer-pakistan` | `/silica-gel-supplier-karachi` | Silica gel supplier in Karachi | money sibling |
| `silica-gel-manufacturer-pakistan` | `/export/fob-karachi` | FOB Karachi silica gel export | export |

> Guardrail note on `food-grade-silica-gel-supplier`: anchor and target stay at the **product/keyword** level. Body copy on that page must keep the existing "ISO 9001:2015 + DMF-free; FDA/food-contact not currently held" framing. The internal link does not assert a certification.

### 2.C Product -> money landing pages (currently products only link to blog/compare/industry)

Product pages already link out to blogs/compare/industry (`productClusters`) and to a few utility pages (`procurementDetails[].related`). They do **not** link to the high-value keyword landing pages. Add 1-2 contextual links per product into the money cluster via the existing `procurementDetails[].related` arrays (rendered at `products/[slug]/page.tsx:595-601`):

| Source product | Add target URL | Keyword-rich anchor text |
| --- | --- | --- |
| `/products/retail-sachets` | `/silica-gel-packets` | Silica gel packets supplier |
| `/products/paper-sachets` | `/silica-gel-packets-wholesale` | Wholesale silica gel packets |
| `/products/bulk-industrial` | `/bulk-silica-gel-desiccant` | Bulk silica gel desiccant |
| `/products/bulk-industrial` | `/silica-gel-beads` | Bulk silica gel beads | (de-orphan) |
| `/products/container-strips` | `/shipping-container-desiccant-supplier` | Shipping container desiccant supplier |
| `/products/container-strips` | `/cargo-desiccant-supplier` | Cargo desiccant supplier | (de-orphan) |
| `/products/dry-clay-desiccant` | `/bentonite-clay` | Bentonite clay desiccant | (de-orphan) |
| `/products/hair-nets` | `/hair-nets-for-food-industry` | Hair nets for the food industry | (de-orphan) |
| `/products/beard-covers` | `/food-grade-silica-gel-supplier` | Food grade silica gel supplier |

### 2.D Blog -> money landing pages (clusters currently link blog?product only)

`blog-clusters.ts` links blogs to **products**, not to keyword **landing** pages. Add an optional `landing?: ClusterLink` (or extend `guides`) so BOFU articles funnel into the commercial cluster:

| Source blog | Add target URL | Keyword-rich anchor text |
| --- | --- | --- |
| `/blog/bulk-silica-gel-supplier-checklist` | `/bulk-silica-gel-desiccant` | Bulk silica gel desiccant supplier |
| `/blog/silica-gel-bulk-pricing-factors-for-exporters` | `/silica-gel-manufacturer-exporter` | Silica gel manufacturer and exporter |
| `/blog/best-desiccant-for-shipping-containers` | `/shipping-container-desiccant-supplier` | Shipping container desiccant supplier |
| `/blog/container-rain-prevention` | `/container-desiccant-supplier` | Container desiccant supplier |
| `/blog/private-label-silica-gel-packets-guide` | `/private-label-desiccant-packets` | Private label desiccant packets |
| `/blog/silica-gel-for-pharma-packaging-buyer-guide` | `/pharmaceutical-desiccant` | Pharmaceutical desiccant supplier |
| `/blog/food-grade-silica-gel-procurement-guide` | `/food-grade-silica-gel-supplier` | Food grade silica gel supplier |
| `/blog/how-to-choose-silica-gel-packet-size` | `/silica-gel-packets` | Silica gel packets |
| `/blog/silica-gel-for-leather-and-footwear-export` | `/silica-gel-for-leather-export` | Silica gel for leather export | (de-orphan) |

Implementation: add `landing` to `BlogCluster` type in `src/lib/blog-clusters.ts:9-14`; render it in the "Buyer decision" / cluster column of `blog/[slug]/page.tsx`.

### 2.E Guides pillar -> cluster (the most under-linked pillar)

`/guides/silica-gel-buyer-guide` is the natural pillar but receives almost no inbound contextual links and points mostly to `/compare`, `/products`, `/contact`. Make it a true hub (see -3).

---

## 3. Authority / pillar-page hub linking

Designate **3 pillar hubs**; every supporting page links up to its pillar, and each pillar links down to its top supporting pages. This is what turns the flat keyword list into a topical authority graph (reinforces `TOPICAL-AUTHORITY-MAP.md`).

| Pillar (hub) | Supporting pages link UP with anchor | Hub links DOWN to |
| --- | --- | --- |
| **`/guides/silica-gel-buyer-guide`** (buyer-education pillar) | All keyword landing pages add `relatedLink` -> "Silica gel buyer guide"; all `/blog/*` add it to `guides[]` fallback | Top 10 landing pages + top 8 blogs + 3 compare + `/products` |
| **`/silica-gel-manufacturer-exporter`** (commercial/export pillar) | All 21 `/export/*` + all geo-landing pages link up: "Silica gel manufacturer and exporter" | The 4 geo exporter pages, `/export`, `/bulk-silica-gel-desiccant`, `/private-label-desiccant-packets` |
| **`/industries` (NEW index, see -4 + M30)** | Each `/industries/[industry]` breadcrumb parent + header point here | All 6 industries with keyword anchors |

Pillar-down block to add to `/guides/silica-gel-buyer-guide` (review - append a "Related buyer pages" section in `guides/silica-gel-buyer-guide/page.tsx`):

```tsx
<section aria-label="Related silica gel buyer resources">
  <h2>Silica gel supply pages referenced in this guide</h2>
  <ul>
    <li><Link href="/silica-gel-manufacturer-exporter">Silica gel manufacturer and exporter</Link></li>
    <li><Link href="/silica-gel-packets">Silica gel packets supplier</Link></li>
    <li><Link href="/bulk-silica-gel-desiccant">Bulk silica gel desiccant</Link></li>
    <li><Link href="/shipping-container-desiccant-supplier">Shipping container desiccant supplier</Link></li>
    <li><Link href="/private-label-desiccant-packets">Private label desiccant packets</Link></li>
    <li><Link href="/pharmaceutical-desiccant">Pharmaceutical desiccant supplier</Link></li>
    <li><Link href="/food-grade-silica-gel-supplier">Food grade silica gel supplier</Link></li>
    <li><Link href="/compare/silica-gel-vs-clay-desiccant">Silica gel vs clay desiccant</Link></li>
  </ul>
</section>
```

---

## 4. New `/industries` index page (M30) - required hub

There is **no** `src/app/industries/page.tsx` today. Create it to (a) give the header a real hub target, (b) give every industry page a valid breadcrumb parent, (c) consolidate the 6-industry cluster, (d) surface the two weak industries (`textile-garment-export`, `container-shipping`).

Proposed new file (review - `src/app/industries/page.tsx`):

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industries We Supply | Silica Gel & Desiccant Solutions by Sector | DryGelWorld",
  description:
    "Industry-specific silica gel and desiccant supply for electronics, pharma, leather and footwear, food, textile and garment export, and container shipping.",
  alternates: { canonical: "/industries" },
};

const industries = [
  { slug: "electronics-packaging", label: "Desiccant for electronics packaging" },
  { slug: "pharma-packaging", label: "Silica gel for pharma packaging" },
  { slug: "leather-footwear-export", label: "Silica gel for leather and footwear export" },
  { slug: "food-packaging", label: "Desiccant for food packaging" },
  { slug: "textile-garment-export", label: "Desiccant for textile and garment export" },
  { slug: "container-shipping", label: "Container shipping moisture control" },
];

export default function IndustriesIndexPage() {
  return (
    <main>
      {/* render a clickable Breadcrumbs trail here too (see -5/M31) */}
      <h1>Industries we supply silica gel and desiccants to</h1>
      <ul>
        {industries.map((i) => (
          <li key={i.slug}><Link href={`/industries/${i.slug}`}>{i.label}</Link></li>
        ))}
      </ul>
      {/* JSON-LD: breadcrumbJsonLd([{name:"Home",href:"/"},{name:"Industries",href:"/industries"}]) */}
    </main>
  );
}
```

Then (review):
- `src/components/site-header.tsx:14` -> change `href: "/industries/electronics-packaging"` to `href: "/industries"`.
- `src/app/industries/[industry]/page.tsx:138` (breadcrumb) -> insert `{ name: "Industries", href: "/industries" }` between Home and the industry.
- `src/app/sitemap.ts` -> add `/industries` to STATIC_ROUTES.

---

## 5. Breadcrumb UI (M31) + anchor-text best practices

### 5.1 Visible breadcrumbs (M31)

`breadcrumbJsonLd()` is emitted but no clickable trail is rendered - leaf pages have no crawlable upward link and landing pages have only a 2-level (Home > page) chain. Add a server-rendered component and feed it the SAME items already passed to `breadcrumbJsonLd()` so the visible trail and the structured data byte-match.

Proposed new file (review - `src/components/breadcrumbs.tsx`):

```tsx
import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={item.href} style={{ display: "flex", gap: 8 }}>
            {i < items.length - 1 -> (
              <><Link href={item.href}>{item.name}</Link><span aria-hidden>/</span></>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

Wire it on each leaf template using the existing breadcrumb item arrays:
- `products/[slug]/page.tsx` -> `Home / Products / {product.name}` (reuse the array at lines 717-721). Also lets you retire the weak "Back to Homepage" link (line 421).
- `export/[market]/page.tsx` -> `Home / Export / {market.country}` (reuse lines 151-155).
- `seo-landing-page.tsx` -> upgrade from 2-level to **3-level with a category**: `Home / {Products|Export|Industries} / {page.kicker}`. Pick the category from a small slug?category map so landing pages gain a crawlable category parent (also strengthens the JSON-LD at lines 259-263).
- `industries/[industry]/page.tsx` -> `Home / Industries / {industry}` (after -4 hub exists).
- `blog/[slug]`, `compare/[slug]` -> `Home / Blog|Compare / {title}`.

### 5.2 Anchor-text best practices

- **Replace the "Open" prefix.** `seo-landing-page.tsx:228` renders `<span>Open</span>{link.label}`. Drop the "Open" span (or make it visually-hidden, not part of the link text) so the anchor text is purely the keyword label. The `relatedLinks` `label` values in this spec are already written as the anchor text.
- **Exact-match sparingly, partial/branded mostly.** For each target, vary anchors across sources: ~30% exact ("silica gel exporter"), ~50% partial/long-tail ("silica gel exporter to the USA"), ~20% branded/contextual ("DryGelWorld export desk"). Never link the same anchor from 20 pages to the same target.
- **One link per target per page.** Avoid two links to `/contact` in the same section; consolidate.
- **Descriptive, not "click here" / "read more" / "learn more"** as the sole link text. Where a card UI needs a CTA verb, keep the keyword in the heading and make the heading the link (as product/blog cluster cards already do).
- **Keep anchors = ~6 words** and human-readable.

### 5.3 Anchor-text distribution targets (per money page)

| Money page | Exact-match | Partial/long-tail | Branded/generic |
| --- | --- | --- | --- |
| `/silica-gel-manufacturer-exporter` | "silica gel manufacturer and exporter" (=30% of inbound) | "silica gel exporter to {country}", "manufacturer-level silica gel supplier" | "DryGelWorld export supply" |
| `/shipping-container-desiccant-supplier` | "shipping container desiccant supplier" | "best desiccant for shipping containers", "container moisture control" | "container desiccant page" |
| `/bulk-silica-gel-desiccant` | "bulk silica gel desiccant" | "bulk silica gel beads", "wholesale silica gel" | "bulk supply page" |

---

## 6. Header / footer nav coverage recommendation

### 6.1 Header (`site-header.tsx:9-17`)
- Change Industries -> `/industries` (see -4).
- Optional: add a lightweight "Export Markets" dropdown or keep markets in footer only (header is already 7 items; do not overload). **Recommendation:** keep header lean; cover markets in footer.

### 6.2 Footer (`site-footer.tsx:12-71`) - add an **Export Markets** column (5th group)
The footer currently has **zero** export-market links and **zero** geo-landing links - it's the natural sitewide backstop for both (reinforces de-orphaning and gives every market a depth-1 inbound link). Proposed new group (review - add to `footerGroups`):

```ts
{
  title: "Export Markets",
  links: [
    { label: "Silica gel exporter to the USA", href: "/export/usa" },
    { label: "Silica gel supplier UK", href: "/export/uk" },
    { label: "Silica gel exporter Germany", href: "/export/germany" },
    { label: "Silica gel exporter Canada", href: "/export/canada" },
    { label: "Silica gel supplier UAE", href: "/export/uae" },
    { label: "Silica gel supplier Saudi Arabia", href: "/export/saudi-arabia" },
    { label: "FOB Karachi export", href: "/export/fob-karachi" },
    { label: "All export markets", href: "/export" },
  ],
},
```
Also: in the existing "Industries" footer group, swap `Case studies` placement to ensure `/industries` (the new hub) and the two weak industries (`textile-garment-export`, `container-shipping`) are present.

> Footer-link caution: do not dump all 73 landing slugs + 21 markets into the footer (sitewide low-value link bloat). Keep footer to the curated top ~40 links; rely on contextual links (-2) + the new index pages for the long tail.

---

## 7. Implementation order (ranked by leverage)

| # | Action | File(s) | Effort | Impact |
| --- | --- | --- | --- | --- |
| 1 | De-dead-end export markets (-2.A) | `export/[market]/page.tsx`, `export/markets.ts` | M | **Highest** - 21 authority pages + de-orphans 4 geo pages |
| 2 | Extend landing `relatedLinks` to de-orphan 22 (-2.B) | `seo-landing-pages.ts` | M | High - indexation of orphans |
| 3 | Create `/industries` index + repoint header/breadcrumb (-4) | new `industries/page.tsx`, `site-header.tsx`, `sitemap.ts`, `industries/[industry]/page.tsx` | S | High - hub + breadcrumb parent |
| 4 | Visible breadcrumbs component + wire 6 templates (-5.1) | new `breadcrumbs.tsx` + leaf templates | M | High - crawlable upward links sitewide |
| 5 | Fix "Open" anchor + anchor distribution (-5.2) | `seo-landing-page.tsx` | S | Medium |
| 6 | Add Export Markets footer column (-6.2) | `site-footer.tsx` | S | Medium - sitewide backstop |
| 7 | Pillar-down links on guide; blog?landing; product?landing (-2.C-E, -3) | `guides/.../page.tsx`, `blog-clusters.ts`, `products/[slug]/page.tsx` | M | Medium - funnels editorial equity to money pages |

### Verification after rollout
- Re-run the orphan check: every slug in `highIntentSeoLandingSlugs` and every `/export/*` slug must appear in =1 `<Link href>` outside its own definition.
- Screaming Frog / GSC: confirm crawl depth = 3 for all money pages; watch GSC Coverage move the 22 orphans from "Discovered/Crawled - not indexed" -> "Indexed" (1-2 crawl cycles).
- Confirm visible breadcrumb items byte-match the `breadcrumbJsonLd()` arrays on each template.

---

## 8. Append to SEO-CRO-FULL-AUDIT.md (extends H13/H14/M31)

> Add the following note under H14 (and a back-reference under H13 and M31):
>
> **Update / cross-ref (see `INTERNAL-LINKING-STRATEGY.md`):** Verification against source refines H14 - the homepage is **not** zero-linked into the cluster; `src/app/page.tsx` `seoClusters` already links to 7 landing/industry pages (`silica-gel-packets`, `bulk-silica-gel-desiccant`, `container-desiccant-strips`, `silica-gel-manufacturer-exporter`, `private-label-desiccant-packets`, `electronics-packaging`, `pharma-packaging`). The **confirmed** H14 defect is the **`export/[market]` dead-end** (single `/contact` link, `export/[market]/page.tsx:224`). The full contextual link plan, per-page anchor table, the new `/industries` hub (M30), the visible `Breadcrumbs` component (M31), and the "Export Markets" footer column live in `INTERNAL-LINKING-STRATEGY.md` -2--6.
