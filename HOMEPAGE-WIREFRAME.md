# DryGelWorld — Ideal International-B2B Homepage Wireframe Spec

**Date:** 2026-05-29
**Site:** https://www.drygelworld.com/ (Next.js 16 App Router, Vercel)
**File this redesigns:** `src/app/page.tsx` (~1,265 lines) + `src/app/page.module.css` (~4,900 lines)
**Prepared by:** Technical SEO/CRO Agency — homepage wireframe deliverable
**Status:** PROPOSE-FIRST. No source file is modified by this document. Every copy block and section order below is a spec for the user to apply later. All code/copy appears inside fenced blocks for review.

**Provenance lock (binding):** The manufacturer holds **ISO 9001:2015 + a DMF-free statement only**. No copy in this spec claims FDA, REACH, Halal, GMP, JEDEC, or "food-grade" certification. Compliance beyond ISO/DMF-free is always framed as a **buyer-led, document-gated discussion**, never a held credential. None of the existing keyword landing pages are redirected or removed — the homepage links **into** them.

**Cross-references (do not duplicate — this extends them):**
- `SEO-CRO-FULL-AUDIT.md` — findings **H3** (dead `#contact` anchor), **H4** (RFQ backend), **CRO score 3**, **CTA score 4**, **B2B conversion flow score 3**, leaked editorial notes (HIGH).
- `COMPETITOR-STRATEGY.md` — §1 "Homepage — benchmark: Multisorb + Desiccant Pak"; the schema-gap edge (competitors expose no structured data).
- `BACKLINKS-PLAYBOOK.md` / `OUTREACH-KIT.md` — the trust assets this homepage should surface.

---

## 0. Why the current homepage under-converts (grounded diagnosis)

Read against `src/app/page.tsx` as it stands today:

| Problem in current `page.tsx` | Evidence (line) | Conversion cost |
|---|---|---|
| Hero primary CTA links to `#contact`, but the RFQ `<section id="contact">` is the **second-to-last** section on the page (~line 1199). The button technically scrolls ~24 screens down. | line 482 `<a href="#contact">` vs line 1199 | The #1 CTA forces a 20+ section scroll; most export buyers bounce first. (Audit H3 confirms the anchor was historically missing entirely.) |
| Hero H1 is `"Worldwide silica gel desiccants for industrial moisture protection."` — no heritage, weak exact-match intent keyword, no "manufacturer/exporter/since 1983". | line 475 | Loses the strongest differentiator vs Multisorb/Desiccant Pak (60yr / 25yr claims) and the primary export keyword. |
| Hero has **no WhatsApp CTA** despite WhatsApp being the fastest B2B channel for this market and `WhatsAppFloat` existing globally. | lines 481-488 | Forces every fast buyer to the floating button only; no above-fold WhatsApp intent capture. |
| Hero trust row is generic (`"Serving since 1983", "COA / SDS Available", "Worldwide Delivery", "Bulk Supply"`) — the two **held** credentials (ISO 9001:2015, DMF-free) are not in the above-fold trust row. | lines 121-126 | The strongest provenance-safe proof sits 14 sections down in `certStrip`/`proofVaultSection`. |
| ~26 sections, many overlapping (separate `exportSection`, `shippingBanner`, `certStrip`, `proofVaultSection`, `skuSection`, `seoRoadmapSection`, `ctaBanner`). Decision fatigue; the page reads like a stacked redesign log, not a funnel. | lines 514-1228 | Audit UX score 6 / CTA score 4: "competing CTAs create decision fatigue." |
| `seoRoadmapSection` ("Global SEO Architecture", lines 1164-1190) and the SKU "matrix" intros contain **strategy/editorial language aimed at the site owner**, not buyers ("Build landing pages around buyer intent", "Give procurement the table they came for"). | lines 1059, 1168 | Reads as internal notes leaking to buyers (same class of issue as Audit's leaked-editorial-note HIGH finding). |
| RFQ form (`DeferredQuoteForm`) only appears once, at the very bottom. No mid-page quote capture. | line 1208 | The funnel has one exit, at the end. |

**Design thesis:** Cut ~26 sections to **13**, put the conversion path **above the fold and again at 3 anchored points**, lead with the two held credentials, and rewrite owner-facing strategy copy into buyer-facing copy. Keep every existing component — re-order and re-label, do not rebuild.

---

## 1. Section order, top to bottom (the 13-section funnel)

```
┌──────────────────────────────────────────────────────────────┐
│  STICKY HEADER (SiteHeader) — unchanged, persistent           │
├──────────────────────────────────────────────────────────────┤
│  01  HERO  — H1 + dual CTA + held-cert trust row              │  ABOVE FOLD
├──────────────────────────────────────────────────────────────┤
│  02  TRUST BAR — ISO 9001:2015 · DMF-free · since 1983 · scale │
├──────────────────────────────────────────────────────────────┤
│  03  PRODUCT FORMATS (bento) + category rail → landing pages   │
├──────────────────────────────────────────────────────────────┤
│  04  PROCUREMENT FLOW (3-step) + HowTo JSON-LD                 │
├──────────────────────────────────────────────────────────────┤
│  05  INLINE RFQ #1  (compact QuoteForm)  ◄── ANCHOR #contact   │  CONVERSION
├──────────────────────────────────────────────────────────────┤
│  06  EXPORT CREDIBILITY (terms + capability + global lanes)    │
├──────────────────────────────────────────────────────────────┤
│  07  INDUSTRIES served (slider)                                │
├──────────────────────────────────────────────────────────────┤
│  08  SKU + DOCUMENT MATRIX (the table procurement wants)       │
├──────────────────────────────────────────────────────────────┤
│  09  VOLUME / PRICE PLANNING + PriceCalculator                 │
├──────────────────────────────────────────────────────────────┤
│  10  PROOF — case studies + testimonials + metric strip        │
├──────────────────────────────────────────────────────────────┤
│  11  MOISTURE CALCULATOR (engagement / dwell tool)            │
├──────────────────────────────────────────────────────────────┤
│  12  RESOURCES + BUYER GUIDES (internal-link / SEO hub)        │
├──────────────────────────────────────────────────────────────┤
│  13  FINAL RFQ #2  (full QuoteForm) + CTA banner               │  CONVERSION
├──────────────────────────────────────────────────────────────┤
│  FOOTER (SiteFooter) + WhatsAppFloat (fixed) + MoistureFloat   │
└──────────────────────────────────────────────────────────────┘
```

Net change vs current: the standalone `scienceSection`, `whySection`, `applicationSection`, `shippingBanner`, `globalPresencePanel` (as its own section), `seoRoadmapSection`, and one of the duplicate cert blocks are **merged or removed as standalone sections** (their content folds into 02/03/06/07). The funnel keeps the two highest-intent sections (Product, RFQ) closest to the top.

---

## 2. Section-by-section spec

Each section lists: **Purpose · Audience · Heading + body copy (provenance-safe) · Repo components/data it maps to · Conversion job.**

---

### 01 — HERO (`<section id="hero">`, maps to `styles.hero`, lines 457-512)

```
┌──────────────────────────────────────────────────────────────┐
│ [ bg image: /hero-macro-kraft.webp · priority · shade overlay]│
│                                                                │
│  EYEBROW: Silica gel manufacturer & exporter · since 1983     │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  H1                                                    │    │
│  │  Silica Gel Desiccant Manufacturer & Exporter         │    │
│  │  — Supplying Bulk Moisture Protection Worldwide        │    │
│  │  Since 1983                                            │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                                │
│  LEAD: Export-ready sachets, container desiccant strips,      │
│  and bulk silica gel beads for pharma, electronics, leather,  │
│  food, and container-shipping buyers in 190+ destinations.    │
│                                                                │
│  ┌─────────────────────────┐  ┌──────────────────────────┐   │
│  │ ► Request Export Quote  │  │ ◯ WhatsApp the Export Desk│   │  DUAL CTA
│  │   (#rfq-primary)        │  │   (wa.me/<whatsappNumber>)│   │
│  └─────────────────────────┘  └──────────────────────────┘   │
│                                                                │
│  TRUST ROW (held credentials FIRST):                          │
│  [✓ ISO 9001:2015]  [✓ DMF-free silica]  [✓ Since 1983]      │
│  [✓ COA / SDS on request]  [✓ Worldwide delivery]            │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Establish category, intent keyword, heritage, and the two held credentials in the first viewport; offer two conversion paths (form + WhatsApp).
- **Audience:** All — export buyers, wholesalers, pharma, industrial, container-shipping. The H1 names manufacturer + exporter + bulk + worldwide so every segment self-identifies.
- **Heading + body (provenance-safe):**

```text
EYEBROW:  Silica gel manufacturer & exporter · since 1983

H1:       Silica Gel Desiccant Manufacturer & Exporter — Bulk Moisture
          Protection Shipped Worldwide Since 1983

LEAD:     Export-ready silica gel sachets, container desiccant strips, and
          bulk beads for pharma, electronics, leather, food, and container-
          shipping buyers. ISO 9001:2015 quality system, DMF-free silica,
          COA and SDS available on request.

PRIMARY CTA:    Request Export Quote        → #rfq-primary (Section 05)
SECONDARY CTA:  WhatsApp the Export Desk    → https://wa.me/<whatsappNumber>?text=...
TERTIARY (text link, under CTAs):  View product range → #products

TRUST ROW (replace heroCerts array, order = held first):
  ISO 9001:2015 · DMF-free silica · Serving since 1983 · COA / SDS on request · Worldwide delivery
```

- **Components / data mapped:**
  - `styles.hero`, `styles.heroCopy`, `styles.ctaRow`, `styles.primaryCta`, `styles.secondaryCta`, `styles.heroProofLine`, `styles.trustSignals` — all already exist in `page.module.css`.
  - `whatsappNumber` from `@/lib/product-data` (already imported at line 53).
  - Replace the `heroCerts` array (lines 121-126) so **ISO 9001:2015 + DMF-free lead**.
  - `splitTextToSpans` (line 16) keeps the existing word-stagger animation on the new H1.
- **Conversion job:** Capture the two fastest intents above the fold — "I want a quote" (form) and "I want to chat now" (WhatsApp) — and de-risk with held credentials before the buyer scrolls.

**Critical fix (Audit H3):** the primary CTA must point at a section that exists high on the page. This spec moves the inline RFQ to Section **05** and anchors it `id="rfq-primary"` AND keeps `id="contact"` as an alias so existing internal links (header "Request Quote" → `/contact` is a separate route; on-page `#contact` references) still resolve.

**Proposed hero CTA + trust-row copy block (for the user to paste into `page.tsx`):**

```tsx
{/* heroCerts — held credentials lead */}
const heroCerts = [
  "ISO 9001:2015",
  "DMF-free silica",
  "Serving since 1983",
  "COA / SDS on request",
  "Worldwide delivery",
];

{/* CTA row inside styles.heroCopy */}
<div className={`${styles.ctaRow} gsap-hero-fade`}>
  <a href="#rfq-primary" className={styles.primaryCta}>
    Request Export Quote
  </a>
  <a
    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hello, I'm requesting a Dry Gel World export quote. Product format, quantity, destination port, and required documents are below.",
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.secondaryCta}
  >
    WhatsApp the Export Desk
  </a>
</div>
<a href="#products" className={styles.heroTextLink}>View product range →</a>
```

---

### 02 — TRUST BAR (new standalone strip; merges `certStrip` lines 1011-1030 + `verifiedProof` data lines 319-350)

```
┌──────────────────────────────────────────────────────────────┐
│  [ISO 9001:2015]  [DMF-free]  [Since 1983]  [10M+ packets]    │
│  [10,000+ buyers]  [40+ custom categories]                    │
│  Karachi-based manufacturer-exporter · operating entity:       │
│  Kamran Enterprises                                            │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** A single, dense, scannable proof strip immediately below the fold — the "why trust this supplier" answer before any product detail. Replaces the two scattered cert blocks (`certStrip` + `proofVaultSection`) with one.
- **Audience:** Procurement / sourcing managers who score suppliers on credentials and scale before reading copy.
- **Heading + body (provenance-safe):**

```text
EYEBROW:  Verified manufacturer proof
HEADING:  A real factory, not a trading desk.

PILLS (use verifiedProof values, held-claim wording only):
  ISO 9001:2015 — verified quality management system
  DMF-free silica — product-level safety statement
  Since 1983 — 40+ years of Karachi silica gel manufacturing (Kamran Enterprises)
  10M+ packets distributed
  10,000+ customers supported
  40+ custom categories / sizes

CAPTION (small):  COA and SDS available on request. Additional destination-
  market compliance (e.g. FDA, REACH, Halal) is discussed per shipment and
  confirmed against valid documents — we publish only what we hold.
```

- **Components / data mapped:** reuse `styles.certStrip` + `styles.certPill` (lines 1012-1029); pull values from `verifiedProof` (lines 319-350) **but strip the owner-facing `text` field** ("Use as the anchor compliance proof", "Reusable for…") — those are editorial notes and must not render. Show only `value` + `label`.
- **Conversion job:** Convert skepticism to confidence in <5 seconds; the held-credential framing pre-empts the "are you certified?" objection and the compliance caption sets honest expectations (provenance lock).

**Provenance fix:** the current `verifiedProof` objects embed strategy notes (e.g. line 329 `"Use as the anchor compliance proof. Additional certifications should only be shown when documents exist."`). The wireframe renders only `value` and `label`, never `text`. Same for `documentationMatrix` row "FDA / REACH / Halal / GMP" — keep status **"Buyer-driven"** wording exactly as line 364 already frames it.

---

### 03 — PRODUCT FORMATS (`<section id="products">`, maps to `styles.productSection`, lines 581-638)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Product line                                        │
│  H2: Pick your format. We build the export quote around it.   │
│                                                                │
│  ┌─────────────────────┐ ┌──────────┐ ┌──────────┐           │
│  │ White Non-Indicating│ │ Indicating│ │ Container│           │
│  │ (large bento)       │ │ Orange/Blue│ │ Strips   │           │
│  │ 0.5g–20g            │ │ RH signal │ │ FOB/CIF  │           │
│  └─────────────────────┘ └──────────┘ └──────────┘           │
│                                                                │
│  CATEGORY RAIL (→ keyword landing pages):                     │
│  [Silica gel packets][Paper sachets][Indicating gel]          │
│  [Container strips][Bulk beads][Dispensers]                   │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Let buyers self-route to a format fast, and push internal link equity into the keyword landing pages (Audit finding: 22 orphaned landing pages).
- **Audience:** All product-intent buyers; the rail serves wholesalers/distributors who shop by SKU.
- **Heading + body:**

```text
EYEBROW:  Product line
H2:       Pick your format. We build the export quote around it.
BODY:     Three core ranges cover most export programs — clean white sachets
          for cartons and electronics, indicating gel for RH monitoring, and
          high-capacity container strips for ocean freight. Every format ships
          in bulk and supports private-label printing.
```

- **Components / data mapped:** `industrialBentoCards` (lines 259-284), `styles.industrialBentoGrid`, `categoryLanes` (lines 155-162) → links into `/silica-gel-packets`, `/products/paper-sachets`, `/orange-silica-gel-supplier`, `/container-desiccant-strips`, `/bulk-silica-gel-desiccant`, `/dispensers` (all real registry routes per `src/lib/seo-landing-pages.ts`). Keep the `styles.categoryRail`.
- **Conversion job:** Move buyers from "what do you sell" to a specific format choice, and feed internal-link equity to ranking assets (supports `COMPETITOR-STRATEGY.md` §2, benchmark IMPAK product depth).

---

### 04 — PROCUREMENT FLOW (`styles.procurementFlowSection`, lines 514-547; keep HowTo JSON-LD lines 1230-1261)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: How to order                                        │
│  H2: From format to quote in three steps.                     │
│                                                                │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│  │ 01 Define │ → │ 02 Confirm│ → │ 03 Plan  │                  │
│  │ the pack  │   │ documents │   │ shipment │                  │
│  └──────────┘   └──────────┘   └──────────┘                  │
│         [ Request Export Quote → #rfq-primary ]               │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Reduce perceived friction by showing the buying process is short and standard; the only `HowTo` JSON-LD on the page (a competitor schema-gap edge per `COMPETITOR-STRATEGY.md` §17).
- **Audience:** First-time export buyers unsure how a Pakistan-based RFQ works.
- **Heading + body:** keep `procurementFlow` step copy (lines 128-153) verbatim — it is provenance-safe and accurate. Change the section intro only:

```text
EYEBROW:  How to order
H2:       From format to quote in three steps — no guesswork.
```

- **Components / data mapped:** `procurementFlow` array + `styles.procurementFlowGrid`; **keep** the `HowTo` JSON-LD block (lines 1234-1259) — it references `procurementFlow` and is valid. Add a single CTA button below the grid → `#rfq-primary`.
- **Conversion job:** Lower commitment anxiety, then hand off directly to the inline RFQ that follows.

---

### 05 — INLINE RFQ #1 (`<section id="rfq-primary">` + alias `id="contact"`; maps to `DeferredQuoteForm`, currently line 1208)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Request export quote        ◄── HERO CTA LANDS HERE  │
│  H2: Send four details. Get an export quote back.             │
│                                                                │
│  ┌───────────────────────────┐  ┌─────────────────────────┐  │
│  │ COMPACT QuoteForm          │  │ Quote checklist sidebar │  │
│  │ • Company Name *           │  │ • Format & size         │  │
│  │ • Business Email *         │  │ • Quantity / MOQ        │  │
│  │ • Product Type / Format    │  │ • Destination + Incoterm│  │
│  │ • Quantity / Volume *      │  │ • SDS / COA / ISO needs │  │
│  │ ▸ Add shipment details ▾   │  │ [Review documents →]    │  │
│  │ [ Send Export RFQ ]        │  └─────────────────────────┘  │
│  └───────────────────────────┘                                │
│  Prefer to chat?  [ WhatsApp the Export Desk → ]              │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** The primary conversion target, placed high (~screen 4-5, not screen 24) so the hero CTA scrolls to a real, near form. This is the fix for Audit **H3** (dead anchor) and **B2B-conversion-flow score 3**.
- **Audience:** Serious export buyers ready to request pricing; the progressive disclosure (`<details>` "Add shipment & document details") keeps the first ask to 4 fields for casual buyers.
- **Heading + body:**

```text
EYEBROW:  Request export quote
H2:       Send four details. Get an export quote back.
BODY:     Company, email, format, and quantity are all we need to start. Add
          destination, Incoterms, and document requirements only if you have
          them — our export desk fills the rest on the reply.
UNDER FORM:  Prefer to chat? WhatsApp the export desk for an instant reply.
```

- **Components / data mapped:** `DeferredQuoteForm` (imported line 13) rendered with `compact` prop (the `QuoteForm` component already supports `compact` and a 4-core-field + collapsible-details design per `src/components/quote-form.tsx` lines 88-93, 251-418). Reuse `styles.homeRfqSection` + `styles.sectionHead`. The form already calls the Resend server action `src/app/actions/submit-rfq.ts` with a mailto fallback.
- **Conversion job:** Capture the lead at peak intent with minimum friction; the WhatsApp line under the form gives the alternative channel without competing with the submit button.

**Anchor + alias spec (paste guidance):**

```tsx
{/* Section 05 — high-placed inline RFQ. Carries BOTH ids so the hero
    CTA (#rfq-primary) and any legacy #contact links resolve to it. */}
<section id="rfq-primary" className={styles.homeRfqSection} aria-label="Request export quote">
  <span id="contact" aria-hidden="true" />
  {/* sectionHead + DeferredQuoteForm compact ... */}
  <DeferredQuoteForm title="Request Export Quote" compact />
</section>
```

> Env reminder (from Audit H4): the form only **delivers** when `RESEND_API_KEY` and `RFQ_FROM` are set in Vercel; otherwise it correctly falls back to `mailto:` (see `submit-rfq.ts` lines 37-42). Set these before promoting this CTA.

---

### 06 — EXPORT CREDIBILITY (merges `exportSection` lines 948-981 + `globalPresencePanel` lines 640-673)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Built for export                                    │
│  H2: Commercial terms, documents, and logistics — sorted.     │
│                                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                │
│  │Documentation│ │Commercial   │ │Packaging /  │                │
│  │COA·SDS·ISO  │ │MOQ·Incoterms│ │private label│                │
│  └────────────┘ └────────────┘ └────────────┘                │
│                                                                │
│  CAPABILITY ROW: factory-direct · QC desk · OEM/label · RFQ   │
│                                                                │
│  GLOBAL LANES (flag marquee): USD·EUR·GBP·PKR·INR·CNY         │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Answer the export-readiness questions (Incoterms, MOQ, currency, documents) that Audit flagged as missing across export pages (**export lead-gen score 3**). Combines what were three separate sections.
- **Audience:** International procurement teams, wholesalers, distributors evaluating whether a Karachi supplier can transact in their terms.
- **Heading + body:**

```text
EYEBROW:  Built for export
H2:       Commercial terms, documents, and logistics — sorted before you ask.
BODY:     Quotes can be aligned to FOB, CIF, EXW, or DAP, in USD, EUR, GBP,
          PKR, INR, or CNY, with COA, SDS, and the ISO 9001:2015 certificate
          available on request. Private-label sachet printing and distributor
          supply programs are standard.
```

- **Components / data mapped:** `exportDetails` (lines 301-317), `capabilityBlocks` (lines 164-185) — note the QC-desk card copy (line 173) is already provenance-correct ("additional claims require valid documents before display"); `globalPresenceFlags` (lines 292-299) + `styles.globalFlagTrack` marquee. Reuse `styles.exportGrid`, `styles.capabilityGrid`, `styles.globalPresencePanel`.
- **Conversion job:** Remove the "can they actually export to me on my terms?" objection, immediately after the buyer has seen the form.

---

### 07 — INDUSTRIES SERVED (`styles.partnerSection`, lines 788-812; `DeferredIndustrySlider`)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Industries we protect                              │
│  H2: Wherever humidity turns into damage, claims, or waste.   │
│  [◄ slider: Pharma · Textiles · Electronics · Food · Maritime ►]│
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Let segment buyers (pharma, electronics, leather, food, maritime) see themselves and route to `/industries/[industry]`.
- **Audience:** Vertical buyers — especially pharma and electronics, the highest-value segments.
- **Heading + body:** keep `trustedIndustries` slider data (lines 367-393) **but audit the Food card copy**: line 386 currently says *"Food-grade desiccant solutions engineered to keep…"*. Under the provenance lock, "food-grade" must not read as a held standard. Reword:

```text
FOOD CARD (replace line 386 description):
  "Desiccant support for snacks, spices, and dried export goods, helping keep
   moisture-sensitive food products dry in transit. Food-contact suitability is
   confirmed per buyer requirement and destination market."
```

```text
SECTION INTRO:
EYEBROW:  Industries we protect
H2:       Wherever humidity turns into damage, claims, or wasted stock.
```

- **Components / data mapped:** `DeferredIndustrySlider` (line 810) with `trustedIndustries`; `styles.partnerSection`. Each card should deep-link to the matching `/industries/[industry]` route (electronics-packaging, pharma-packaging, leather-footwear-export, etc.).
- **Conversion job:** Vertical self-identification + internal links to industry landing pages (supports `COMPETITOR-STRATEGY.md` §4, benchmark Desiccant Pak sector pages).

---

### 08 — SKU + DOCUMENT MATRIX (`styles.skuSection`, lines 1054-1114)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Specs & documents                                   │
│  H2: The size, material, and document table procurement needs.│
│  ┌─────────────────────────┐  ┌────────────────────────────┐ │
│  │ FORMAT TABLE             │  │ DOCUMENT STATUS TABLE      │ │
│  │ Family·Sizes·Material·Fit│  │ ISO 9001:2015 — Held       │ │
│  │ ...                      │  │ SDS / COA — Request        │ │
│  │                          │  │ DMF-free — Supported       │ │
│  │                          │  │ FDA/REACH/Halal/GMP —      │ │
│  │                          │  │   Buyer-driven             │ │
│  └─────────────────────────┘  └────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Give serious buyers the hard data (sizes, materials, document availability) that competitors hide behind contact forms — a direct outperform vs Multisorb/Desiccant Pak (`COMPETITOR-STRATEGY.md` §8).
- **Audience:** Technical procurement, QA, regulatory buyers (especially pharma/food who must verify document availability).
- **Heading + body:** rewrite the owner-facing intro (line 1059 "Give procurement the table they came for." is internal voice) to buyer voice:

```text
EYEBROW:  Specs & documents
H2:       Sizes, materials, and document availability — on the page, not behind a form.
BODY:     Compare sachet, large-pack, container-strip, and custom formats, then
          see exactly which documents we hold, which we issue on request, and
          which are confirmed per destination market.
```

- **Components / data mapped:** `skuRows` (lines 352-357) and `documentationMatrix` (lines 359-365) + `styles.skuTable`. **Keep the document matrix wording exactly**: ISO = "Held", SDS/COA = "Request", DMF-free = "Supported", FDA/REACH/Halal/GMP = "Buyer-driven" (lines 360-364). This is the provenance-safe centerpiece.
- **Conversion job:** Win the technical/regulatory shortlist before the price conversation; the honest document matrix builds trust precisely because it does not over-claim.

---

### 09 — VOLUME / PRICE PLANNING (`<section id="pricing">`, lines 675-753; `DeferredPriceCalculator`)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Quote planning                                      │
│  H2: Plan volume first. Request the quote with context.       │
│  [MOQ guidance][FOB/CIF/EXW][bulk contracts by requirement]   │
│  ┌──────────────┐  ┌──────────────────────────────────────┐  │
│  │ PRICE GROUPS │  │ PriceCalculator (#purchase-calculator)│  │
│  │ size→[Quote] │  │ weight + export quote estimator       │  │
│  │ (WhatsApp)   │  │                                       │  │
│  └──────────────┘  └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Set price expectations without publishing a fixed price list, and let buyers self-estimate volume — the calculator is the header's "Requirement Calculator" CTA target (`site-header.tsx` line 72 → `/#purchase-calculator`).
- **Audience:** Bulk buyers, wholesalers, distributors sizing an order.
- **Heading + body:** keep `pricingHighlights` (lines 286-290) and the section copy (lines 679-683) — provenance-safe. Keep the per-size **WhatsApp "Quote"** links (lines 715-729) — they are a strong micro-conversion.
- **Components / data mapped:** `priceGroups` from `@/lib/product-data`, `styles.priceGrid`, `styles.priceCard`, `DeferredPriceCalculator` (line 748) inside `#purchase-calculator` anchor (preserves the header CTA target).
- **Conversion job:** Convert "how much?" into a quantified RFQ; every price row is a one-tap WhatsApp quote request.

---

### 10 — PROOF (`<section id="proof">`, lines 859-946)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Buyer confidence                                    │
│  H2: Real procurement stories, anonymised.                    │
│  ┌────────┐ ┌────────┐ ┌────────┐   case studies              │
│  ┌────────────── testimonial carousel ──────────────┐         │
│  industry badge strip                                          │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Social proof via anonymised case studies + testimonials (named logos are not yet available — keep anonymised per honest-trust principle).
- **Audience:** Risk-averse buyers comparing suppliers.
- **Heading + body:** rewrite the owner-facing intro (lines 864-867 "Until named logos are available, use buyer-safe case studies…" — internal note) to buyer voice:

```text
EYEBROW:  Buyer confidence
H2:       Real procurement outcomes, shared anonymously.
BODY:     Client names are withheld by request, but the challenge, the document
          path, and the buying outcome are exactly as they happened across
          leather, electronics, and container-shipping programs.
```

- **Components / data mapped:** `caseStudies` (lines 422-450) + `styles.caseStudyGrid`; `DeferredEmblaCarousel` with `testimonials` (lines 395-420); `styles.logoStrip` industry badge chips. Keep "View Case Studies" → `/case-studies` (line 906).
- **Conversion job:** Final trust nudge before the buyer commits to the bottom-of-page full RFQ.

---

### 11 — MOISTURE CALCULATOR (`<section id="moisture-calculator">`, lines 1192-1196)

```
┌──────────────────────────────────────────────────────────────┐
│  MoistureCalculator (interactive) — dwell + engagement tool   │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** A genuine engagement tool that lifts the ~11s engagement time GA4 shows; also a long-tail SEO/dwell asset.
- **Audience:** Hands-on packaging engineers who want to size desiccant per carton.
- **Components / data mapped:** `DeferredMoistureCalculator` (line 1194). Also surfaced as a floating widget via `moisture-calc-float.tsx` (exists in `src/components`).
- **Conversion job:** Increase dwell/engagement and produce a quantified moisture requirement the buyer can paste into the RFQ.

---

### 12 — RESOURCES + BUYER GUIDES (merges `resourceSection` lines 1116-1139 + `buyerGuideSection` lines 1141-1162; **drop** `seoRoadmapSection`)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Resources & guides                                  │
│  H2: Documents, tools, and buyer guides.                      │
│  [ BentoGrid: documents · calculators · video · compliance ]  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ guide  │ │ guide  │ │ guide  │ │ guide  │ │ guide  │  →blog│
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** Internal-link hub feeding blog/guide ranking assets and the documents page; supports the buyer-research stage.
- **Audience:** Researchers early in the buying cycle; SEO crawlers.
- **Heading + body:** keep `buyerGuideLinks` (lines 226-257) verbatim — provenance-safe and useful. **Remove the entire `seoRoadmapSection`** (lines 1164-1190): its heading "Build landing pages around buyer intent, not just products." is owner-facing strategy copy that should never render to buyers. Its internal links (the `seoClusters` data, lines 187-224) are better served by the footer and the category rail (Section 03), which already link the same routes.

```text
EYEBROW:  Resources & guides
H2:       Documents, calculators, and buyer guides for faster decisions.
BODY:     Specs, the moisture and volume calculators, technical videos, and
          step-by-step guides on sizing, documents, carton moisture, private
          label, and bulk buying — everything to scope a quote before you send it.
```

- **Components / data mapped:** `BentoGrid` (line 1137), `buyerGuideLinks` + `styles.buyerGuideGrid`. Drop `seoClusters`/`styles.seoClusterGrid` from the homepage render (the data file can stay; just don't render the section).
- **Conversion job:** Keep researchers on-site and crawlers fed; not a hard conversion point.

---

### 13 — FINAL RFQ #2 + CTA BANNER (full `QuoteForm` + `ctaBanner`, lines 1198-1228)

```
┌──────────────────────────────────────────────────────────────┐
│  EYEBROW: Serious buyer RFQ                                   │
│  H2: Ready for an export quote? Send your requirement.        │
│  [ FULL QuoteForm (all fields available) ]                    │
│                                                                │
│  CTA BANNER:  Request Export Quote  ·  Browse Products        │
└──────────────────────────────────────────────────────────────┘
```

- **Purpose:** The full-detail conversion point for buyers who scrolled the entire page and are ready to give complete shipment specs.
- **Audience:** High-intent, late-stage buyers who want to submit a complete RFQ in one pass.
- **Heading + body:** rewrite the owner-facing intro (lines 1202 "Make the form the primary conversion path for bulk orders." — internal note):

```text
EYEBROW:  Serious buyer RFQ
H2:       Ready for an export quote? Send your full requirement.
BODY:     Add product format, quantity, destination, Incoterms, and document
          needs and our export desk will reply with MOQ, lead time, and pricing.
          WhatsApp stays open for urgent follow-up.
```

- **Components / data mapped:** `DeferredQuoteForm title="Send MOQ Requirement"` (line 1208) — **not** `compact` here (full form). `styles.ctaBanner` (lines 1212-1228): keep the dual CTA but point primary at `#rfq-primary` (Section 05) OR keep `/contact` route — be consistent; recommend primary → `/contact` (full page) here since the buyer is at the bottom. Keep secondary → `/products`.
- **Conversion job:** Catch the late-stage, fully-informed buyer with a complete form and a last dual CTA.

---

## 3. Hero redesign (consolidated)

| Element | Current (`page.tsx`) | Proposed |
|---|---|---|
| Eyebrow | "Global industrial desiccant supply" (line 472) | "Silica gel manufacturer & exporter · since 1983" |
| H1 | "Worldwide silica gel desiccants for industrial moisture protection." (line 475) | "Silica Gel Desiccant Manufacturer & Exporter — Bulk Moisture Protection Shipped Worldwide Since 1983" |
| Lead | line 478 (generic) | ISO 9001:2015 + DMF-free + COA/SDS framing (see Section 01) |
| Primary CTA | `#contact` → dead/far (line 482) | "Request Export Quote" → `#rfq-primary` (Section 05, ~screen 4) |
| Secondary CTA | "View Product Range" → `#products` (line 485) | "WhatsApp the Export Desk" → `wa.me/<whatsappNumber>` (NEW) |
| Tertiary | none | text link "View product range →" → `#products` |
| Trust row | generic, ISO/DMF-free absent (lines 121-126) | ISO 9001:2015 · DMF-free · since 1983 · COA/SDS · worldwide |

**Keyword coverage in the new H1/lead:** "silica gel", "desiccant", "manufacturer", "exporter", "bulk", "worldwide", "since 1983", + lead adds "sachets", "container desiccant strips", "beads", "pharma", "electronics", "leather", "food", "container-shipping". This covers the bulk of the target-keyword set in the highest-weight on-page elements without keyword stuffing.

---

## 4. CTA placement map & hierarchy

```
HIERARCHY  (P = primary / hardest intent, S = secondary, M = micro)

LAYER          LOCATION                          CTA                          TARGET
────────────────────────────────────────────────────────────────────────────────────
P1  Hero       Section 01                        Request Export Quote         #rfq-primary
S1  Hero       Section 01                        WhatsApp the Export Desk     wa.me/<num>
M1  Hero       Section 01                        View product range →         #products
P2  Flow       Section 04                        Request Export Quote         #rfq-primary
★   RFQ #1     Section 05                        Send Export RFQ (submit)     server action
S2  RFQ #1     Section 05                        WhatsApp the export desk     wa.me/<num>
M2  Pricing    Section 09 (per size row)         Quote                        wa.me/<num> (prefilled)
M3  Pricing    Section 09                        (price calculator)           in-page
M4  Calc       Section 11                        (moisture calculator)        in-page
★   RFQ #2     Section 13                        Send MOQ Requirement (submit)server action
P3  Banner     Section 13                        Request Export Quote         /contact
S3  Banner     Section 13                        Browse Products              /products
────────────────────────────────────────────────────────────────────────────────────
PERSISTENT  Header  Request Quote → /contact · Requirement Calculator → /#purchase-calculator
PERSISTENT  Fixed   WhatsAppFloat (wa.me, prefilled) · MoistureCalcFloat
```

**Rules:**
1. **One primary action per viewport.** The hero shows exactly one filled primary button (Request Export Quote) + one outlined secondary (WhatsApp). Never two filled buttons competing.
2. **Form submit is the only ★ "hard" conversion** and appears twice (compact at Section 05, full at Section 13).
3. **WhatsApp is always secondary**, never primary, so it complements rather than cannibalises the tracked form lead. It is reachable from: hero, RFQ #1, every price row, and the persistent float — i.e. always one tap away.
4. **The header "Request Quote" routes to `/contact` (full page)**; on-page CTAs route to `#rfq-primary` (Section 05). Keep these distinct and consistent — do not mix `/contact` and `#contact` randomly as today.
5. **Remove redundant CTAs:** the current `shippingBanner` "Request Delivery Quote" / "Plan Bulk Supply" (lines 992-995) duplicates the banner and RFQ; fold into the export-credibility Section 06 or drop.

---

## 5. Trust-signal & certification block design

Two coordinated surfaces — above-fold row (Section 01) and the dense bar (Section 02):

```
ABOVE FOLD (hero row — fast credibility):
  ┌────────────┬────────────┬───────────┬──────────────────┬───────────────────┐
  │ISO 9001:2015│ DMF-free   │ Since 1983│ COA / SDS request│ Worldwide delivery│
  └────────────┴────────────┴───────────┴──────────────────┴───────────────────┘

BELOW FOLD (Section 02 — dense proof + honesty caption):
  [ISO 9001:2015]  [DMF-free silica]  [Since 1983]  [10M+ packets]
  [10,000+ buyers] [40+ custom categories]
  ── caption ──────────────────────────────────────────────────────────────────
  COA and SDS available on request. Additional destination-market compliance
  (e.g. FDA, REACH, Halal) is discussed per shipment and confirmed against valid
  documents — we publish only what we hold.
```

**Provenance-safe rules for both surfaces:**
- **Held / assertable as fact:** ISO 9001:2015, DMF-free silica, "since 1983 / 40+ years", Kamran Enterprises as operating entity, scale metrics (10M+, 10,000+, 40+).
- **"On request" (availability claim, not a held cert):** COA, SDS.
- **"Buyer-driven / per shipment" (never a held cert):** FDA, REACH, Halal, GMP, JEDEC, food-grade. Use the exact "Buyer-driven" status already in `documentationMatrix` (line 364).
- **Never render** the `verifiedProof[].text` strings or the `documentationMatrix` strategy notes — they are owner-facing editorial.
- Link the cert bar to `/certifications` and `/documents` so the claim is verifiable (E-E-A-T).

---

## 6. RFQ / inquiry flow + WhatsApp + quote-request visibility

```
                          ┌─────────────────────────┐
   Hero P1 "Request ──────►│  Section 05 — RFQ #1     │
   Export Quote"          │  compact QuoteForm        │──► submitRfq() server action
   Flow P2 ───────────────►│  (4 core fields)          │     ├─ ok        → "RFQ received"
                          └─────────────────────────┘     └─ fallback  → mailto: prefill
                                    │
   Hero S1 "WhatsApp" ──┐          │ "Prefer to chat?" link
   Price-row "Quote" ───┼──────────┴────► wa.me/<whatsappNumber>?text=<prefilled RFQ>
   WhatsAppFloat ───────┘
                          ┌─────────────────────────┐
   Banner P3 /contact ───►│  Section 13 — RFQ #2     │──► same server action, full fields
                          └─────────────────────────┘
```

- **Form backend:** `QuoteForm` → `submitRfq` (`src/app/actions/submit-rfq.ts`). Delivers via Resend when `RESEND_API_KEY` + `RFQ_FROM` are set; otherwise returns `{ fallback: true }` and the client opens a prefilled `mailto:` (lines 152-170 of `quote-form.tsx`). **Action item:** set both env vars in Vercel so Section 05/13 deliver real email, not just mailto (Audit H4).
- **Progressive disclosure:** the compact form (Section 05) shows 4 required-ish fields (Company*, Email*, Product, Quantity*) with shipment/document specifics collapsed under `<details>` — already built (`quote-form.tsx` lines 251-418). This is the single biggest CRO lift vs the old 16-field single-step form (Audit B2B-flow score 3).
- **WhatsApp visibility:** reachable from hero (S1), under RFQ #1 (S2), every price row (M2), and the persistent `WhatsAppFloat`. All use a prefilled message asking for format/quantity/destination/documents so the chat starts as a structured RFQ, not "hi".
- **Quote-request visibility everywhere:** by placing RFQ #1 at ~screen 4, no buyer scrolls more than ~2 viewports without seeing a way to request a quote (hero → flow CTA → RFQ #1 → price-row quotes → RFQ #2/banner).

---

## 7. Export-credibility & product-positioning blocks

- **Export credibility (Section 06):** the only place that names FOB/CIF/EXW/DAP, the six currencies, MOQ/lead-time language, COA/SDS/ISO availability, and private-label capability together — directly closing the "export lead-gen score 3" gap. Uses `exportDetails`, `capabilityBlocks`, `globalPresenceFlags`.
- **Product positioning (Section 03 + 08):** Section 03 positions the **three core formats** for fast self-routing; Section 08 backs them with a **hard spec + document table** that competitors hide. Positioning line: *"A real factory since 1983 — not a trading desk"* (Section 02 heading) is the spine that differentiates DryGelWorld from China trading exporters (AbsorbKing/Kobso/WiseSorbent) and small resellers, per `COMPETITOR-STRATEGY.md` §28 ("Where DryGelWorld can WIN").
- **Schema edge:** keep the `HowTo` JSON-LD (Section 04) — competitors expose no structured data (`COMPETITOR-STRATEGY.md` §17), so this is a free SERP/AI-answer advantage.

---

## 8. Mobile section order & behavior

Mobile keeps the **same 13-section order** (intent funnel is identical), with these behaviors. Note Audit **Mobile score 4** flagged: no `viewport` meta, a 100vw horizontal-scroll source, brittle fixed-header offset — those are layout fixes tracked in the audit; below is the homepage-specific mobile spec.

```
MOBILE STACK (single column)
─────────────────────────────────────────────
01 HERO         H1 clamps via --ds-h1 token; bg image keeps priority;
                CTAs stack full-width: [Request Export Quote] then
                [WhatsApp the Export Desk]; trust row wraps to 2 rows,
                ISO 9001:2015 + DMF-free on the FIRST row.
02 TRUST BAR    pills wrap; horizontal scroll allowed for the pill row only
                (contained, never the page).
03 PRODUCTS     bento collapses to 1-col stack; category rail = horizontal
                chip scroll (touch-friendly).
04 FLOW         3 steps stack vertically; CTA full-width.
05 RFQ #1       compact form single column; <details> stays COLLAPSED by
                default (4 fields only on first paint — protects INP, which
                Speed Insights flagged at 304ms; the reducer in quote-form.tsx
                lines 55-58 already addresses per-keystroke cost).
06 EXPORT       cards stack; flag marquee continues (CSS animation).
07 INDUSTRIES   slider = native swipe.
08 SKU TABLES   wrap in horizontal-scroll container (styles.skuTableWrap);
                never force the page to scroll horizontally.
09 PRICING      price cards stack; calculator full-width; per-row [Quote]
                buttons are large tap targets (≥44px).
10 PROOF        case studies stack; testimonials = swipe carousel.
11 MOISTURE     calculator full-width; MoistureCalcFloat available.
12 RESOURCES    BentoGrid 1-col; guide cards stack.
13 RFQ #2       full form single column.
─────────────────────────────────────────────
PERSISTENT  WhatsAppFloat bottom-right (fixed) — primary mobile fast path.
            Header collapses to hamburger; "Request Quote" stays visible.
```

**Mobile CTA priority (different from desktop):** on mobile, **WhatsApp is effectively co-primary** because tap-to-chat is the dominant B2B behavior in export markets. Keep the hero order Request-Quote-then-WhatsApp, but the persistent `WhatsAppFloat` guarantees one-tap chat at every scroll position. Do not add a second sticky bar that competes with the float.

**Above-fold on mobile must contain:** H1 (heritage + intent keyword), one primary CTA, the WhatsApp CTA, and at minimum the ISO 9001:2015 + DMF-free pills. Everything else can fall below the fold.

---

## 9. Section-order summary table

| # | Section | Anchor / id | Primary component(s) | Audience | Conversion job |
|---|---------|-------------|----------------------|----------|----------------|
| 01 | Hero | `#hero` | `styles.hero`, `WhatsAppFloat` link | All | Capture quote + chat intent above fold |
| 02 | Trust bar | — | `styles.certStrip`, `verifiedProof` | Procurement | Credibility in <5s (ISO/DMF-free) |
| 03 | Product formats | `#products` | `industrialBentoCards`, `categoryLanes` | Product buyers | Self-route + feed landing-page links |
| 04 | Procurement flow | — | `procurementFlow`, HowTo JSON-LD | First-time export buyers | Lower friction → RFQ #1 |
| 05 | **RFQ #1 (inline)** | `#rfq-primary` (+`#contact`) | `QuoteForm` (compact) | Serious buyers | **★ Primary lead capture** |
| 06 | Export credibility | — | `exportDetails`, `capabilityBlocks`, `globalPresenceFlags` | Intl procurement | Remove export-terms objection |
| 07 | Industries | — | `DeferredIndustrySlider` | Vertical buyers | Segment self-ID + industry links |
| 08 | SKU + doc matrix | — | `skuRows`, `documentationMatrix` | Technical / QA / regulatory | Win the spec shortlist |
| 09 | Volume / price | `#pricing`, `#purchase-calculator` | `priceGroups`, `PriceCalculator` | Bulk buyers | Quantify the RFQ; per-row WhatsApp |
| 10 | Proof | `#proof` | `caseStudies`, `EmblaCarousel` | Risk-averse buyers | Social proof before final RFQ |
| 11 | Moisture calculator | `#moisture-calculator` | `MoistureCalculator` | Packaging engineers | Dwell + quantified requirement |
| 12 | Resources + guides | `#resources` | `BentoGrid`, `buyerGuideLinks` | Researchers / crawlers | Internal-link hub, on-site dwell |
| 13 | **RFQ #2 + banner** | — | `QuoteForm` (full), `styles.ctaBanner` | Late-stage buyers | **★ Full-detail lead capture** |

**Removed/merged vs current `page.tsx`:** standalone `scienceSection` (fold visual into 03), `whySection` (fold into 03/08), `applicationSection` (fold into 07), `shippingBanner` (fold into 06 / drop duplicate CTA), `proofVaultSection` (merge into 02), `seoRoadmapSection` (**drop** — owner-facing copy). Net: ~26 → 13 sections.

---

## 10. Implementation note (re: `src/app/page.tsx`)

This is a **re-order + re-label + copy-rewrite** of the existing homepage — **not a rebuild**. Every component, every data array, and the `HowTo` JSON-LD block already exist in `src/app/page.tsx` and `src/app/page.module.css`; nothing new needs to be built.

**Apply in this order (proposal only — user applies):**

1. **Hero (lines 457-512):** swap `heroCerts` (lines 121-126) to lead with ISO 9001:2015 + DMF-free; rewrite eyebrow/H1/lead (lines 472-479); replace the secondary CTA with the WhatsApp anchor; point primary CTA at `#rfq-primary`.
2. **Add the anchor fix (Audit H3):** give the inline RFQ section `id="rfq-primary"` and an `id="contact"` alias span so no CTA scrolls nowhere.
3. **Re-sequence the JSX sections** inside `<main>` to the 13-section order in §1. This is cut/paste of existing `<Reveal><section>…</section></Reveal>` blocks — no markup rewrite.
4. **Move `DeferredQuoteForm`** to Section 05 with `compact` (it already accepts the prop), keep a second full instance at Section 13.
5. **Delete the `seoRoadmapSection` render** (lines 1164-1190) and the standalone `scienceSection`/`whySection`/`applicationSection`/`shippingBanner` renders (merge their visuals/copy into 03/06/07 as noted). The data arrays can remain in the file unused, or be removed in a follow-up cleanup.
6. **Scrub owner-facing copy** in section intros (lines 864-867, 1037-1040, 1059, 1168, 1202) — rewrite to buyer voice per §2. Render only `value`/`label` from `verifiedProof`, never `text`.
7. **Reword the Food industry card** (`trustedIndustries`, line 386) to drop the "food-grade … engineered" phrasing per the provenance lock (see Section 07).
8. **Env (Audit H4):** set `RESEND_API_KEY` and `RFQ_FROM` in Vercel so both RFQ instances deliver real email; the mailto fallback in `submit-rfq.ts` (lines 37-42) covers the gap until then.

**Cross-doc consistency:** the dead-anchor and RFQ-backend fixes here are the homepage-level realisation of `SEO-CRO-FULL-AUDIT.md` findings H3/H4; the spec/doc-table and schema-edge plays realise `COMPETITOR-STRATEGY.md` §1 and §8. No keyword landing page is redirected or removed — Section 03's category rail and Section 12's guide grid push equity **into** them.
```
