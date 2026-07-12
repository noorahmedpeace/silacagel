# CRO Report — DryGelWorld Lead-Generation Funnel

_Date: 2026-07-12_

## Context & ground truth

- **Traffic mix:** ~50/50 mobile/desktop. Half of every fix's value lands on mobile, so mobile-specific leaks are double-weighted below.
- **Acquisition:** mostly **Pakistan + direct** traffic, **very little organic**. Buyers arriving are largely referral/direct and WhatsApp-first Gulf/South-Asia/Africa importers — not warm branded search.
- **Volume:** extremely low — instrumentation shows on the order of **~24 sessions / 3 days**. At this volume every single dropped lead is a meaningful share of total conversions, so trust and contact-path leaks matter more than micro-optimizations.
- **Domain profile:** new, low-authority silica-gel exporter with no brand equity. Credibility must be manufactured on-page (ISO badge, verifiable proof) because search/brand trust does not yet exist.

The funnel has solid bones — deferred DryBot, a low-friction 2-field RFQ, an ISO badge linking to a real certificate, and calculators that can feed RFQs. It is leaking at concrete points, most of which hit the mobile half of traffic hardest.

---

## Why visitors don't convert

### 1. The highest-intent contact path is missing entirely (mobile)
A persistent **WhatsApp float (`WhatsAppFloat`) is fully built but never mounted anywhere**. `DeferredChrome` mounts only `GlobalDiscountCampaign`, `ClarityBridge`, and `DryBot`; `sticky-quote-bar.tsx` even *claims* a WhatsApp float exists — it does not. For a Pakistan/Gulf/Africa, WhatsApp-first, 50%-mobile audience, this removes the single highest-converting CTA on every page. Click tracking for `whatsapp_click` is already wired, so the lift is measurable the moment it is mounted.
_Evidence: `src/components/whatsapp-float.tsx`, `src/components/deferred-chrome.tsx` L66-71, `src/components/sticky-quote-bar.tsx` L14-15, `src/app/layout.tsx` L245-249._

### 2. The mobile hero strips all credibility above the fold
On mobile the hero **hides the ISO 9001:2015 badge and all three hero trust signals via CSS** (`.heroXProof a { display:none }`, `.heroXSignals { display:none }`). The mobile hero collapses to headline + lead + one CTA. For a domain with zero brand authority, the ISO badge is the primary above-the-fold trust anchor for half of all sessions — and it is invisible exactly there.
_Evidence: `src/app/page.tsx` L300-319; `src/app/page.module.css` L6425-6427, L6443-6445._

### 3. Social proof reads as invented
The only testimonials are **generic, anonymized placeholders** — "Footwear exporter", "Electronics logistics team", "Warehouse operations partner" — with invented initials, no names, companies, countries, logos, ratings, or third-party review channel. There are **no client logos** anywhere, and all 10 case studies are anonymized even though `case-study-data.ts` ships an unused `attribution { name, title, company, quote }` field. For an unknown Pakistani exporter being vetted by first-time buyers, hollow quotes actively erode trust.
_Evidence: `src/app/page.tsx` L195-220; `src/lib/case-study-data.ts` (10 anonymized slugs, unused `attribution`); no logo-band component in `src/components`._

### 4. The most prominent tool dead-ends
The homepage **Price/Procurement Calculator submits only to WhatsApp** (`handleWhatsAppQuote` opens `wa.me` in a new tab) with no fallback to the on-page RFQ form or email, and the computed estimate is not carried into `QuoteForm`. Desktop importers without WhatsApp Web who complete the sizing work hit a dead end. The button label ("Submit Procurement Estimate") also hides that it opens WhatsApp.
_Evidence: `src/components/price-calculator.tsx` L136-172, L314-321._

### 5. No persistent CTA on the homepage during scroll
`StickyQuoteBar` is wired into landing and product pages **but not the homepage**, which is 8 long sections. Intent formed at the mid-page pricing/calculator sections has no nearby capture — the user must scroll back to the header. (Note: the component defaults to `href="#quote-form"`, which does not exist on the homepage; the RFQ section id is `#contact`.)
_Evidence: `StickyQuoteBar` used in `seo-landing-page.tsx` L298-299 and product pages, absent from `src/app/page.tsx`; RFQ section id at `page.tsx` L574._

### 6. Trust path is forked and mislinked
Two near-duplicate destinations — **`/documents` (request page) and `/documentation` (real downloadable ISO cert + SDS/COA)** — split the compliance journey B2B procurement relies on. The hero "Documents" signal points at `/documents` (request), while `IsoBadge`, `TrustBand`, and `GuaranteeStrip` point at `/documentation` (where the PDF actually lives).
_Evidence: `src/app/documents/page.tsx` vs `src/app/documentation/page.tsx`; hero link `page.tsx` L86; `iso-badge.tsx` L20, `trust-band.tsx` L30-31, `guarantee-strip.tsx` L12._

### 7. Off-register consumer discount in a B2B RFQ
A **FLASH10 10%-off countdown** is injected into the RFQ and calculator (`GlobalDiscountCampaign` mounted site-wide; `quote-form.tsx` appends "Promotion: FLASH10 / Discount: 10%" into the RFQ body). For contract importers negotiating FOB/CIF this signals inflated list prices and erodes pricing integrity.
_Evidence: `src/components/price-calculator.tsx` L107-109, L261-294; `src/components/quote-form.tsx` L147-153._

### 8. RFQ + DryBot fallback paths silently drop leads
- **RFQ form:** on the fallback branch, `handleSubmit` navigates via `window.location.href` to a `mailto:` while the success copy claims "We opened your email client." On a desktop with no configured mail client, nothing opens and the lead is lost — despite a success message. At ~24 sessions/3 days this is a real share of volume.
- **DryBot:** `sendRfq` on failure only shows an inline error — it does not auto-fall-back to the prefilled WhatsApp/mailto links it already holds. Its "Get a quote" affordance is also never surfaced proactively (greeting never mentions it).
_Evidence: `src/components/quote-form.tsx` L180, L189, L462-472; `src/components/drybot.tsx` L107-122, L53, L177-181._

### 9. No indicative price / MOQ anchors, and the hero CTA is 2 clicks from a form
Homepage pricing is entirely "quoted by requirement" — no USD bands or MOQ figures to pre-qualify importers — and the hero primary CTA ("Get bulk pricing") links to `/buy-silica-gel` (a mid-funnel landing page), not a form. A dedicated `/pricing` page exists but is not surfaced on the homepage.
_Evidence: `src/app/page.tsx` pricingHighlights L156-160, hero CTA L291; `site-header` L109._

### 10. Missing top-of-funnel lead magnets (vs global competitors)
- **No ROI / cost-of-moisture-damage calculator.** Both existing tools only output grams/units — never the USD business case that converts problem-aware B2B buyers and gives sales an anchor number.
- **No dedicated sample-request flow.** Sample intent is buried as one dropdown inside the collapsed "optional" section of the full RFQ; there is no `/samples` route. Global suppliers (Clariant/Sorbead/Multisorb) lead top-of-funnel with a free-sample offer.
- **No guided product selector.** DryBot is free-form chat, not a decision tree; non-expert buyers who don't know the product name get no guided path to a quote.
- **No `/tools` hub, no binding response SLA / quality guarantee,** and the site's strongest differentiator — an honest "what we do and don't hold" compliance disclosure (`about` `honestScope`) — is buried off the homepage.
_Evidence: `src/app/tools/` (only 2 calculators, no index); `quote-form.tsx` L89, L416-426 (`sampleNeed` dropdown); `guarantee-strip.tsx` L8-9; `src/app/about/page.tsx` `honestScope`._

---

## The current funnel

```
Entry (mostly Pakistan / direct, ~50% mobile)
   │
   ▼
Homepage hero  ──►  Desktop: headline + CTAs + ISO badge + 3 trust signals
   │                Mobile:  headline + lead + ONE CTA   (badge + signals hidden)
   │                (no sticky quote bar; no WhatsApp float on any device)
   ▼
8 scroll sections: trust ▸ flow ▸ products ▸ pricing ("quoted by requirement")
   │              ▸ industries ▸ proof (anonymous testimonials) ▸ RFQ
   │
   ├─► Price calculator  ──►  WhatsApp only (dead-end for non-WhatsApp users)
   │
   ├─► DryBot (deferred)  ──►  RFQ capture; no WhatsApp/email fallback on failure
   │
   └─► RFQ form (#contact) ──►  submit
                                 ├─ success
                                 └─ fallback: mailto navigation → silent loss
                                    if no mail client
```

Persistent CTAs while scrolling: only the fixed-header "Request Quote" and the DryBot launcher. No WhatsApp float, no homepage sticky bar. No sample path, no ROI tool, no selector, no `/tools` hub.

---

## Prioritized conversion-fix list

Expected lift is directional (no A/B baseline at current volume); ordered by leverage-to-effort for a low-authority, mobile-heavy, WhatsApp-first audience.

| # | Fix | Area | Effort | Expected lift | File(s) |
|---|-----|------|--------|---------------|---------|
| 1 | **Mount `<WhatsAppFloat />` globally** (inside `DeferredChrome`, bottom-right, non-overlapping with DryBot launcher) | Contact path / mobile | Trivial | **Very high** — restores the single highest-intent mobile CTA for Gulf/S-Asia/Africa buyers; largest absolute lift | `deferred-chrome.tsx`, `whatsapp-float.tsx` |
| 2 | **Show a compact ISO 9001 + "Since 1983 / 190+ markets" trust chip on mobile** instead of hiding badge + signals | Trust / mobile | Small | High — restores above-the-fold credibility for 50% of sessions | `page.tsx` L300-319, `page.module.css` L6425-6445 |
| 3 | **Replace anonymous testimonials with 2-3 verifiable named references** (wire `case-study-data.ts` `attribution`) + one external proof channel (Google/verified WhatsApp Business/trade badge); no fake `aggregateRating` | Social proof | Medium | High — top conversion driver for first-time buyers vetting an unknown exporter | `page.tsx` L195-220, `case-study-data.ts` |
| 4 | **Add a "trusted by" logo strip / named case study** above the footer (permission-cleared logos or distributor-region strip); wire into `attribution` | Social proof | Medium | High — fastest way for a low-authority domain to borrow credibility | `case-study-data.ts`, new logo-band near `guarantee-strip.tsx` |
| 5 | **Give the price calculator a non-WhatsApp path** — prefill on-page RFQ / route to `/contact` with the estimate (`QuoteForm` already accepts `defaultProduct/Quantity/Message`); relabel button "Get quote on WhatsApp" | Calculator → RFQ | Medium | High — recovers desktop importers who currently dead-end after sizing; raises lead quality | `price-calculator.tsx` L136-172, L314-321 |
| 6 | **Render `<StickyQuoteBar href="#contact" />` on the homepage** (override the `#quote-form` default) | Homepage CTA | Small | Medium-high — captures mid-page intent without scroll-back | `page.tsx` (RFQ id L574) |
| 7 | **Add a `/samples` (3-field) landing** — email, product, destination; link from hero, product pages, DryBot; keep full RFQ for buy-ready leads | Lead-gen | Medium | High — widens top of funnel for hesitant buyers not ready to disclose full detail | new `src/app/samples/`, `quote-form.tsx` L89 |
| 8 | **Add ROI / cost-of-moisture-damage calculator** (`/tools/moisture-damage-roi-calculator`) — cargo value + route + transit → USD exposure vs desiccant spend, prefilled RFQ CTA | Lead-gen | Medium | High — converts problem-aware buyers with a USD business case; SEO magnet | new tool, reuse `container-dosage-model.ts`, `QuoteForm` prefill |
| 9 | **Make the RFQ fallback resilient** — POST to a capture endpoint or show copyable WhatsApp/email instead of bare `mailto` navigation; only claim "email client opened" after confirming a handler | RFQ robustness | Medium | Medium — prevents silent lead loss (meaningful at ~24 sessions/3 days) | `quote-form.tsx` L180, L189, L462-472 |
| 10 | **DryBot fallback + proactive quote chip** — on `sendRfq` failure auto-offer prefilled WhatsApp/mailto (`waHref`/`emHref`); surface a persistent "Get a quote" chip; consider requiring company + product | DryBot | Small | Medium — recovers chat-sourced leads on API failure | `drybot.tsx` L107-122, L53, L177-181 |
| 11 | **Consolidate the documents fork** — pick `/documentation` as canonical (has the ISO PDF), 301/repurpose `/documents`, repoint hero "Documents" signal | Trust path | Small | Medium — removes a confusing fork in the compliance journey; consolidates link equity | `page.tsx` L86, `documents/page.tsx`, `documentation/page.tsx` |
| 12 | **Replace FLASH10 flash-sale with a volume-tier / trade-terms incentive** ("ask about tier pricing above X MOQ") | Offer register | Small | Medium — protects perceived pricing integrity with professional buyers | `price-calculator.tsx` L107-109, L261-294, `quote-form.tsx` L147-153 |
| 13 | **Surface indicative USD price bands + headline MOQ** on the homepage pricing section (or link chips to `/pricing`); point hero CTA closer to RFQ/pricing | Pricing messaging | Medium | Medium — pre-qualifies importers, fewer wasted RFQs | `page.tsx` L156-160, L291; `/pricing` |
| 14 | **Add a guided product selector** (application → format → destination → recommended SKU + qty → prefilled `QuoteForm`) | Lead-gen | Medium | Medium — converts non-expert buyers who bounce from a 10-product catalog | new tool, `quote-form.tsx` prefill props |
| 15 | **Add a concrete, honorable guarantee** (e.g. free replacement/credit for any batch failing its published COA; sample dispatch SLA) surfaced in `GuaranteeStrip` + `/samples` | Trust | Small | Medium — lowers first-order risk vs faceless marketplace suppliers | `guarantee-strip.tsx`, `about/page.tsx` |
| 16 | **Promote the "honest scope" compliance differentiator to the homepage** (condensed block linking `/certifications`) | Differentiation | Small | Medium — memorable wedge for skeptical procurement buyers | `about/page.tsx` `honestScope`, `certifications/page.tsx` |
| 17 | **Add a `/tools` hub** listing all calculators/tools with RFQ CTAs; link from header Resources + footer | Discoverability | Trivial | Low-medium — concentrates internal-link equity; home for future tools | new `src/app/tools/page.tsx` |
| 18 | **Anchor scale claims to verifiable proof** — cross-link sister brand (SilicaGelPK), publish export/business registration doc alongside the ISO cert | Trust | Small | Low-medium — converts self-asserted "10M+/10,000+" numbers into checkable proof | `trust-band.tsx` L21-24, `document-registry.ts` |
| 19 | **Delete orphaned mobile hero CSS** (`.hero`, `.heroTrustBar`, `.whatsAppFloat`, etc. — classes no longer in markup) | Perf / CSS hygiene | Small | Low — smaller mobile payload, less regression risk | `page.module.css` L3062-3170 |

---

## Summary of leverage

The three fixes most likely to move conversions on this specific domain, in order:

1. **Mount the WhatsApp float (#1)** — a trivial one-line mount that restores the highest-intent CTA for a WhatsApp-first, mobile-heavy, Pakistan/Gulf audience.
2. **Fix mobile trust above the fold (#2) + replace anonymous social proof with verifiable references (#3, #4)** — the credibility a new, low-authority exporter cannot borrow from brand or organic search must be manufactured on-page.
3. **Give the calculator and RFQ resilient, non-dead-end paths (#5, #9, #10)** — at ~24 sessions/3 days, plugging silent lead loss protects a large share of total volume.

Most fixes are trivial-to-small effort and high leverage precisely because current session volume is so low — the priority is to stop leaking the few high-intent leads that arrive, not to chase marginal optimization.
