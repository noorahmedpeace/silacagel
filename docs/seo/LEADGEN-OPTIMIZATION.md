# LEADGEN-OPTIMIZATION.md - Turning DryGelWorld Into an Export Lead-Gen Machine

**Status:** Propose-first. Nothing in this document has been applied to source. Every code/copy block below is a *proposal* for you to review and apply later. No `.tsx/.ts/.css/.json` files were modified.

**Scope:** Conversion (CRO) optimization spec layered on top of the existing SEO infrastructure. This extends - does not duplicate - `SEO-CRO-FULL-AUDIT.md` (esp. H4, H15, H16), `COMPETITOR-STRATEGY.md`, `BACKLINKS-PLAYBOOK.md`, and `HOMEPAGE-WIREFRAME.md`. Cross-references to those docs are marked inline.

**Provenance guardrails honored throughout:** the manufacturer (Kamran Enterprises) holds **ISO 9001:2015 + a DMF-free product statement only**. No block below claims FDA, REACH, Halal, GMP, JEDEC, or "food-grade" certification. Compliance beyond ISO/DMF-free is always framed as a buyer-led discussion, mirroring the honest `status: "held" | "discussed"` model already shipped in `src/app/certifications/page.tsx:19-101`.

**What I verified in the actual codebase before writing this:**
- The RFQ form is **already rebuilt and strong** - `src/components/quote-form.tsx` has 16 fields (4 required core + 12 optional in a `<details>` collapse), a `useReducer` to protect mobile INP (see comment at `quote-form.tsx:51-58`), client + server validation, department routing, and a real success/fallback split.
- The server action `src/app/actions/submit-rfq.ts` posts to the Resend REST API and **degrades to mailto when `RESEND_API_KEY` / `RFQ_FROM` are absent** (`submit-rfq.ts:42`). **This is the single highest-leverage gap: the form ships, but with no env set it currently *never delivers email* - every lead falls to mailto.** Fixing env is step zero of this whole spec.
- Contact routing + all phone/email/WhatsApp constants live in `src/lib/product-data.ts:31-94` (env-overridable, with hardcoded fallbacks).
- WhatsApp float (`src/components/whatsapp-float.tsx`) uses a **static, generic prefill** - no page/product context, no tracking.
- MOQ has **no structured home** anywhere: `ProductItem` (`product-data.ts:3-17`) has `leadTime`/`priceBand` as vague prose, and `ExportMarket` (`export/markets.ts:1-12`) has **no `moq`/`leadTime`/`currency` fields at all** - this is audit **H15**, still open.
- Home page CTAs (`src/app/page.tsx`) are inconsistent: hero points to `#contact` (`page.tsx:482`) but the CTA banner and shipping block point to `/contact` (`page.tsx:993,1220`) - two different destinations for the same intent.

---

## 0. Go-Live Prerequisites (do these first - the form is dead without them)

The rebuilt form is production-quality but **inert** until email delivery works. Right now `submitRfq` returns `{ fallback: true }` whenever the key is missing (`src/app/actions/submit-rfq.ts:42`), so 100% of submissions silently route to the user's `mailto:` client. On mobile that frequently opens nothing. **This is a lead leak, not a feature.**

### 0.1 Required environment variables (Vercel -> Project -> Settings -> Environment Variables)

| Var | Value | Where read | Required? |
|---|---|---|---|
| `RESEND_API_KEY` | Resend API key | `submit-rfq.ts:37` | **Yes** - without it, no email sends |
| `RFQ_FROM` | `DryGelWorld RFQ <rfq@drygelworld.com>` (must be on a Resend-verified domain) | `submit-rfq.ts:38` | **Yes** |
| `RFQ_BCC` | Internal archive inbox, e.g. `leads@drygelworld.com` | `submit-rfq.ts:55` | Recommended - guarantees a copy even if reply-routing fails |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `923330223337` (verify - see -6.1) | `product-data.ts:31` | Confirm value |
| `NEXT_PUBLIC_SALES_PHONE_DISPLAY` / `_HREF` | `+92 333 022 3337` / `+923330223337` | `product-data.ts:32-33` | Confirm |

### 0.2 Resend domain setup (one-time)
1. Add `drygelworld.com` in Resend -> Domains.
2. Publish the SPF + DKIM (`resend._domainkey`) DNS records Resend generates.
3. Set a DMARC record (`v=DMARC1; p=none; rua=mailto:dmarc@drygelworld.com`) so B2B buyers' mail servers don't junk the replies.
4. Verify, then set `RFQ_FROM` to a `@drygelworld.com` address on that domain.

### 0.3 Confirmation email to the buyer (proposed addition - currently missing)
Today the form only emails the *internal* desk. A buyer who fills the form gets no receipt, which erodes trust on a first touch. Add a second Resend call so the buyer gets an instant branded acknowledgment. **Proposed** addition to `src/app/actions/submit-rfq.ts` after the successful internal send (around `submit-rfq.ts:65`):

```ts
// PROPOSED - buyer acknowledgment. Fire-and-forget; never block or fail the RFQ on it.
async function sendBuyerAck(toEmail: string, company: string, from: string, apiKey: string) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [toEmail],
        subject: "We received your DryGelWorld export inquiry",
        text:
          `Hello ${company || "there"},\n\n` +
          "Thank you - your silica gel / desiccant inquiry has reached the DryGelWorld export desk. " +
          "A specialist will reply within one business day (GMT+5, Mon-Sat). " +
          "For anything urgent, message us on WhatsApp: https://wa.me/923330223337\n\n" +
          "What happens next:\n" +
          "1. We confirm format, quantity, and destination.\n" +
          "2. We send an indicative FOB Karachi / CIF quote + ISO 9001:2015 and DMF-free statement.\n" +
          "3. We arrange a sample before any bulk commitment.\n\n" +
          "- DryGelWorld (Kamran Enterprises), serving exporters since 1983.",
      }),
    });
  } catch { /* non-fatal */ }
}
```
Call it inside the `if (res.ok)` branch with `void sendBuyerAck(data.email, data.company, from, apiKey);` so a failed ack never turns a delivered RFQ into a fallback.

### 0.4 Spam / bot hardening (proposed)
The form has zero bot protection - at lead-gen scale it will attract junk that pollutes the desk inbox. Add a **honeypot** (zero added friction, no third-party JS). Proposed in `src/components/quote-form.tsx`: add a visually-hidden field, and in `submit-rfq.ts` short-circuit to a fake-success if it's filled.

```tsx
{/* PROPOSED honeypot - hidden from humans, bots fill it. quote-form.tsx */}
<input
  type="text" name="company_website" tabIndex={-1} autoComplete="off"
  value={state.website} aria-hidden="true"
  onChange={(e) => dispatch({ type: "set", field: "website", value: e.target.value })}
  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
/>
```
```ts
// PROPOSED in submit-rfq.ts, top of submitRfq() - silently drop bots without erroring the UI.
if (data.website?.trim()) return { ok: true }; // honeypot tripped; pretend success, send nothing
```
(Add `website: string` to `RfqPayload` and to `FormFields`/`initialState`.) A timestamp check (reject submissions faster than ~2s) is an optional second layer.

---

## 1. Inquiry Forms - UX / Validation / Multi-Step Refinements

The form is already at "good." These are the deltas that move it to "high-converting export form." Listed by ROI.

### 1.1 Inline per-field validation (replaces single top error)
Currently `handleSubmit` validates only on submit and shows one error string at the top (`quote-form.tsx:111-113`). Buyers don't see which field is wrong until after they try. **Proposed:** validate the three core fields on blur and render the message *under the offending field*, keep the existing submit-time check as the backstop. This is the single biggest completion-rate lever on B2B forms.

```tsx
// PROPOSED sketch - quote-form.tsx. Add a fieldErrors map to local state.
const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
function validateField(field: keyof FormFields, value: string) {
  let msg = "";
  if (field === "company" && !value.trim()) msg = "Company name helps us route your quote.";
  if (field === "email" && !EMAIL_RE.test(value.trim())) msg = "Use a business email so we can reply.";
  if (field === "quantity" && !value.trim()) msg = "Even a rough volume lets us price.";
  setFieldErrors((prev) => ({ ...prev, [field]: msg }));
}
// on each core <input>: onBlur={(e) => validateField("email", e.target.value)}
// render under the field: {fieldErrors.email && <small className={styles.fieldError} role="alert">{fieldErrors.email}</small>}
```

### 1.2 Make "Country / Market" a core field (move out of the collapse)
For an export business, **destination country is the #1 routing/pricing signal** and it's currently buried in the optional `<details>` (`quote-form.tsx:294-304`). Promote it to the 5th core field. It costs ~3 seconds and dramatically improves quote quality. Keep the rest of the shipment block optional.

### 1.3 Free-text country -> datalist (data hygiene)
The country field is free text (`quote-form.tsx:296`), which produces "USA"/"U.S."/"united states" noise. **Proposed:** back it with a `<datalist>` of the 21 export markets (drawn from `export/markets.ts`) so buyers in served markets autocomplete, while still allowing free entry.

```tsx
{/* PROPOSED - quote-form.tsx */}
<input list="dgw-markets" ... />
<datalist id="dgw-markets">
  {exportMarkets.map((m) => <option key={m.slug} value={m.country} />)}
</datalist>
```

### 1.4 Auto-route department from application/country (reduce a decision)
The department selector (`quote-form.tsx:257-280`) asks the buyer to self-route, which most won't get right. **Proposed:** default to `export` whenever a non-empty Country is set, and to `sales` otherwise - keep the manual override. This silently improves routing without adding a field.

### 1.5 Progress + completion affordance
Add a slim "Step 1 of 2 - core details" label above the collapse and change the summary copy from "Add shipment & document details (optional)" (`quote-form.tsx:254`) to **"Add shipment details for a faster, more accurate quote (optional)"** - frames the optional fields as buyer benefit, not extra work.

### 1.6 Persist drafts (abandonment recovery)
Wire the reducer to `sessionStorage` so a buyer who navigates to `/documents` (via the existing sidebar link at `quote-form.tsx:465`) and returns doesn't lose input. Low effort, meaningful on multi-tab B2B research sessions.

### 1.7 Submit button: dynamic, benefit-led label
Current label is "Send Export RFQ" (`quote-form.tsx:421`). **Proposed:** "Get My Export Quote ?". "Get" + first-person outperforms "Send" in B2B because it states the buyer's payoff, not the buyer's chore. See -5 for full CTA copy system.

---

## 2. Trust Signals + Certifications Block (provenance-safe, quantified-honest)

The home `trustSignalsArray` (`src/app/page.tsx:103-119`) is vague ("Export quotes for global buyers"). Buyers comparing against Multisorb (60 yr), Desiccant Pak (quantified trust), and IMPAK (pricing) need **specific, honest, quantified** proof. Per `COMPETITOR-STRATEGY.md`, our structural edge is that none of them ship structured data - but on-page trust copy is where we currently lose.

### 2.1 Quantified trust strip (honest metrics only)
Replace the three generic items with metrics that are **true and verifiable** for a 1983-founded Karachi exporter. Use only numbers the business can stand behind:

```tsx
// PROPOSED - src/app/page.tsx, replace trustSignalsArray contents (page.tsx:103-119)
const trustSignalsArray = [
  { icon: Award,        title: "Operating since 1983",            label: "40+ yrs in desiccants" },
  { icon: Globe,        title: "Exporting to 21+ markets",        label: "MENA - Asia - EU - US" },
  { icon: ShieldCheck,  title: "ISO 9001:2015 + DMF-free",        label: "Docs on request" },
  { icon: PackageCheck, title: "0.5 g sachets to 1 kg cargo strips", label: "Full format range" },
];
```
**Do NOT** add "FDA-approved," "food-grade," or "REACH-registered" here - none are held. "DMF-free" and "ISO 9001:2015" are the only certification words allowed in trust copy.

### 2.2 Reusable certifications/trust block component (proposed new component)
The honest credential model already exists at `src/app/certifications/page.tsx:19-101` but lives only on that page. **Proposed:** extract a compact `<TrustBlock />` so the same honest framing appears on every high-intent page (export markets, product pages, RFQ section) without re-templating. Propose creating `src/components/trust-block.tsx`:

```tsx
// PROPOSED NEW FILE - src/components/trust-block.tsx
const held = [
  { name: "ISO 9001:2015", note: "Certified quality management system (Kamran Enterprises). Reference on request." },
  { name: "DMF-free statement", note: "Per-shipment statement - critical for EU-bound leather, footwear & consumer goods." },
];
const onRequest = ["SDS / MSDS", "Certificate of Analysis (COA)", "Commercial invoice & packing list", "Certificate of Origin"];
// Render: "Held" chips (green) for the two real certs; "Provided on request" chips for documents;
// a single honest line: "Need FDA, REACH, Halal, or food-grade coverage? We'll scope it with your
// compliance team before terms - see /certifications." Link to /certifications.
```
This mirrors - and links to - the existing honest `status` UI rather than inventing claims.

### 2.3 Trust elements to add near every form
- **Reply-time promise:** "We reply within 1 business day (Mon-Sat, GMT+5)." (Honest, sets expectation, reduces follow-up anxiety.)
- **Sample-first reassurance:** "Sample before any bulk commitment." (Already a form option at `quote-form.tsx:402`; surface it as copy.)
- **No-spam microcopy** under the email field: "We use your email only to send your quote. No lists, no spam."
- **Human routing proof:** the form already shows the routed inbox (`quote-form.tsx:274-279`) - keep it; it signals a real desk, not a black hole.

---

## 3. MOQ Visibility - Data Model + Surfacing (closes audit H15)

H15 is still open: MOQ/lead-time/currency exist nowhere structured. `ExportMarket` (`export/markets.ts:1-12`) has no fields for them, and `ProductItem.leadTime`/`priceBand` (`product-data.ts:15-16`) are prose. International buyers search these terms explicitly. Below is a concrete, **non-contractual ("indicative")** data model.

### 3.1 Extend `ProductItem` with structured commercial fields
```ts
// PROPOSED - src/lib/product-data.ts, extend the ProductItem type (product-data.ts:3-17)
export type ProductItem = {
  /* -existing- */
  moq: string;              // "From 50,000 printed sachets per size, or 100 kg bulk"
  moqValue?: number;        // 100  (machine-readable, for JSON-LD eligibleQuantity)
  moqUnit?: string;         // "kg"
  leadTimeDays: string;     // "7-12 working days production + transit"
  pricingBasis: string;     // "Indicative, USD, FOB Karachi - confirmed at RFQ"
};
```
Populate per-product (e.g. cargo strips MOQ differs from retail sachets). Keep every value clearly **indicative** - no contractual price commitment.

### 3.2 Add the missing fields to `ExportMarket` (the H15 core)
```ts
// PROPOSED - src/app/export/markets.ts, extend the type (markets.ts:1-12)
export type ExportMarket = {
  /* -existing- */
  moq: string;                // "From 100 kg bulk or 50,000 sachets per format"
  leadTime: string;           // "7-12 working days + sea freight to Jebel Ali (~3-5 days)"
  indicativeCurrency: string; // "Indicative pricing in USD - FOB Karachi or CIF UAE"
};
```
Per-market values let each of the 21 pages answer "silica gel MOQ to [country]" and "desiccant lead time [country]" - 21 new long-tail ranking surfaces, exactly as H15 projects.

### 3.3 Render a "Commercial Basics" block on export market pages
```tsx
// PROPOSED - src/app/export/[market]/page.tsx, add to the existing blocks[] array
{ label: "Commercial Basics", title: "MOQ, lead time & currency",
  items: [market.moq, market.leadTime, market.indicativeCurrency] },
```

### 3.4 Surface MOQ on product pages and the home product lanes
Add an MOQ/lead-time line to each product card on `/products` and on `products/[slug]`, sourced from the new `ProductItem.moq` / `leadTimeDays`. This is what converts a browser into a qualified RFQ.

### 3.5 Optional JSON-LD enrichment (compounds our structured-data edge)
Competitors expose no schema (per brief). We can add quantitative offer data - **without** stating a price:
```ts
// PROPOSED - in the Service/Product JSON-LD
eligibleQuantity: { "@type": "QuantitativeValue", minValue: product.moqValue, unitText: product.moqUnit },
priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" } // currency only, no amount
```
Keep amounts out of schema to avoid implying a fixed contractual price.

---

## 4. Shipping / Export Info + Export-Process Explanation Section

The home `procurementFlow` (`page.tsx:128-153`) is a strong 3-step skeleton (Define pack -> Confirm documents -> Plan shipment). Buyers from new markets need the **full export journey** spelled out once, then linked everywhere.

### 4.1 Proposed "How export ordering works" 6-step section
A dedicated, indexable section (home + `/export` hub). Copy block:

```
How exporting silica gel from DryGelWorld works

1. Send your RFQ - format, quantity, destination port, and any documents you need.
2. Indicative quote - we reply within 1 business day with FOB Karachi / CIF pricing (USD) and the ISO 9001:2015 + DMF-free statement.
3. Sample - we ship a sample for your QC before any bulk commitment.
4. Order confirmation - we agree Incoterms (FOB / CIF / EXW / DAP), packaging, and labeling (private label available).
5. Production & documents - manufacture, then prepare SDS, COA, commercial invoice, packing list, and Certificate of Origin.
6. Dispatch from Karachi - booked via your nominated forwarder or ours, with tracking shared on departure.
```
Every step maps to a field the form already collects - reinforcing why the form asks what it asks.

### 4.2 Incoterms mini-explainer (capture "FOB vs CIF" intent)
A small table (FOB / CIF / EXW / DAP - "who pays what, who's responsible when") near the export-process section. The form already offers these (`quote-form.tsx:338-342`); explaining them helps undecided buyers pick. Pure educational copy, no claims.

### 4.3 Karachi -> market routing facts
Reuse the per-market `ports`/`routeNote` already in `markets.ts` (e.g. UAE at `markets.ts:22-27`) and add the new `leadTime` from -3.2 so each export page states realistic transit windows. Strengthens E-E-A-T and answers "shipping time" queries.

---

## 5. CTA Buttons - Copy, Hierarchy, Placement

Current CTAs are inconsistent in **both copy and destination**: hero -> `#contact` (`page.tsx:482`), CTA banner -> `/contact` (`page.tsx:1220`), shipping block -> `/contact` (`page.tsx:993`). The home RFQ form section lives at `#contact` (`page.tsx:1199`), so half the buttons scroll to the on-page form and half navigate away to a separate page. Pick one primary behavior.

### 5.1 Recommended hierarchy (one primary intent per screen)
| Tier | Action | Copy | Style | Destination |
|---|---|---|---|---|
| **Primary** | Get a quote | **"Get My Export Quote"** | Solid, brand color | Scroll to `#contact` form (on home) / `/contact` (elsewhere) |
| **Secondary** | Talk now | **"Chat on WhatsApp"** | Outline + WhatsApp icon | `wa.me` deep link (-6) |
| **Tertiary** | Browse | "View Products" / "See Export Markets" | Text/ghost | `/products`, `/export` |

### 5.2 Consistency fix (proposed)
Make **every** primary CTA on the home page resolve to the same `#contact` form anchor (it's already a strong, fielded form), and reserve `/contact` for off-home pages. Update `page.tsx:993` and `page.tsx:1220` from `/contact` to `#contact` for on-home consistency. Keep `/contact` as the canonical destination from header/footer and non-home pages.

### 5.3 Copy upgrades (replace current strings)
- "Request Export Quote" (`page.tsx:483,1220`) -> **"Get My Export Quote"**
- "Send MOQ Requirement" (the RFQ title, `page.tsx:1208`) -> **"Get Your Export Quote"** (buyer-benefit; "Send - Requirement" reads as a chore)
- "Request Delivery Quote" (`page.tsx:993`) -> **"Quote My Shipment"**
- Add a persistent **sticky mobile CTA bar** (Get Quote | WhatsApp) - see A/B backlog -9.

### 5.4 Microcopy under primary CTAs
"Indicative FOB/CIF quote in 1 business day - Sample before bulk - ISO 9001:2015 + DMF-free docs." Sets expectation and stacks trust at the click moment.

---

## 6. WhatsApp Integration - Verify, Deep-Link with Context, Hours, Tracking

WhatsApp is the dominant B2B channel across DryGelWorld's core MENA/Asia export markets - this is arguably the highest-converting channel and is currently under-built. `whatsapp-float.tsx` uses one static generic message with no context and no tracking.

### 6.1 Verify the number (action item)
Number resolves from `NEXT_PUBLIC_WHATSAPP_NUMBER` with fallback `923330223337` (`product-data.ts:31`). **Confirm this is a live WhatsApp Business account** before pushing traffic to it: open `https://wa.me/923330223337` and confirm it opens a real, staffed business profile (ideally with a business name, logo, catalog, and hours). If it's a personal line, migrate to WhatsApp Business so buyers see verified info.

### 6.2 Context-aware deep links (replace the static prefill)
`whatsapp-float.tsx:4-6` hardcodes one message. **Proposed:** make the float accept page/product context and prefill it, so the chat opens already knowing what the buyer was viewing.

```tsx
// PROPOSED - src/components/whatsapp-float.tsx (make it context-aware)
export function WhatsAppFloat({ context }: { context?: string }) {
  const base = "Hello DryGelWorld - I'd like a silica gel / desiccant quote.";
  const ctx = context -> `\nI'm interested in: ${context}.` : "";
  const ask = "\nMy details: format, quantity, destination port, documents.";
  const text = encodeURIComponent(base + ctx + ask + "\nSource: website");
  return (
    <a href={`https://wa.me/${whatsappNumber}?text=${text}`} target="_blank" rel="noopener noreferrer"
       className={styles.float} aria-label="Open WhatsApp quote chat"
       onClick={() => window.gtag?.("event", "whatsapp_click", { context: context ?? "global" })}>
      {/* -existing icon + label- */}
    </a>
  );
}
```
Pass `context` from product pages (e.g. `context={product.name}`) and export pages (`context={`silica gel to ${market.country}`}`). The inline WhatsApp link already in the home page (`page.tsx:716`) can use the same pattern.

### 6.3 Business hours + expectation
Add to the float tooltip / nearby copy: **"WhatsApp replies Mon-Sat, 9am-7pm GMT+5. Off-hours? Drop your RFQ - we reply next business day."** Honest availability prevents the "ghosted" feeling that kills WhatsApp leads.

### 6.4 Tracking (so you can prove WhatsApp ROI)
- Fire a GA4 event `whatsapp_click` on every WhatsApp tap (sketch above), with a `context` param so you can see which products/markets drive chats.
- Append `?text=-Source: website` (shown above) and consider per-placement tags (`Source: product-page` / `Source: floating-button`) so the desk can see where chats originate even without GA.
- Mark `whatsapp_click` and `rfq_submit` (add the latter on form `status === "sent"`) as **GA4 Key Events / conversions** - ties into the GA4 plan in `SEO-CRO-FULL-AUDIT.md`.

---

## 7. Email Capture - Lead Magnet + Placement

The site has no email capture beyond the RFQ. A lead magnet captures the ~95% of B2B researchers who aren't ready to RFQ on visit one - the exact "8 users/wk, 11s engagement" cohort GA4 shows.

### 7.1 Lead magnet (proposed): "Desiccant Buyer's Export Kit" (PDF)
A single gated PDF combining things the site already half-contains, so production cost is low and provenance stays clean:
- One-page **format selector** (sachet vs strip vs bulk by carton size & humidity) - derived from `moisture-calculator` logic.
- **MOQ / lead-time / Incoterms cheat-sheet** - straight from the -3 data model.
- **Document checklist** (SDS, COA, ISO 9001:2015, DMF-free statement, COO) - honest, matches `/documents` and `/certifications`.
- **5-question RFQ template** buyers can copy into email/WhatsApp.

This doubles as link-bait (cross-reference `BACKLINKS-PLAYBOOK.md` / `OUTREACH-KIT.md`) and as a sales-desk leave-behind.

### 7.2 Capture mechanics (reuse existing infra)
Reuse the Resend pipeline - a minimal email-only capture posts to a new lightweight server action mirroring `submit-rfq.ts`, emails the desk, BCCs `RFQ_BCC`, and triggers a Resend email delivering the PDF link. No new vendor needed.

```ts
// PROPOSED NEW FILE - src/app/actions/capture-lead.ts (mirrors submit-rfq.ts structure)
export async function captureLead(email: string, source: string): Promise<RfqResult> {
  if (!EMAIL_RE.test(email?.trim() || "")) return { ok: false, error: "Enter a valid email." };
  // -same Resend fetch pattern as submit-rfq.ts: email PDF link to buyer, BCC the desk-
}
```

### 7.3 Placement (low-friction, no intrusive popup on first paint)
- **Inline** in the buyer guide (`guides/silica-gel-buyer-guide`) and blog articles - "Get the free Export Kit (PDF)" - highest-intent context.
- **Exit-intent** on desktop only (never on mobile - INP/UX cost), single dismiss-remembered.
- **Footer** slim capture in `site-footer.tsx`.
- **Inside the form's optional collapse** as a fallback: "Not ready to RFQ? Get the Export Kit instead." Captures abandoners.

---

## 8. Conversion Funnel Map

```
DISCOVERY (organic / directories / backlinks)
   -  Target queries: "silica gel supplier", "container desiccant", "silica gel MOQ [country]"
   ?
LANDING  -- 12 keyword pages - [seoSlug] catch-all - export/[market] (21) - industries (6) - products
   -  Trust strip (-2.1) + quantified proof visible above the fold
   ?
EDUCATION / EVALUATION
   -  Export-process section (-4) - MOQ/lead-time/currency (-3) - Incoterms explainer
   -  moisture-calculator - price-calculator - /documents - /certifications (honest)
   -  -- soft conversion -> Email Capture / Export Kit (-7)  ?-- recovers not-ready buyers
   ?
INTENT (CTA click - -5 hierarchy)
   -   +- Primary -> #contact RFQ form
   -   +- Secondary -> WhatsApp deep link (-6, context-prefilled)
   ?
CONVERSION
   -  RFQ form (4 core + optional) -> submitRfq -> Resend -> desk + buyer ack (-0.3)
   -  OR WhatsApp chat (Mon-Sat GMT+5)
   -  Measured: rfq_submit + whatsapp_click = GA4 Key Events
   ?
QUALIFICATION & CLOSE (offline)
   1-day reply -> indicative quote -> sample -> order -> docs -> dispatch from Karachi (-4.1)
```
**Leak points addressed by this spec:** (a) no email delivery without env -> -0; (b) no buyer receipt -> -0.3; (c) MOQ/price withheld -> -3; (d) not-ready buyers lost -> -7; (e) inconsistent/weak CTAs -> -5; (f) context-free WhatsApp -> -6; (g) generic trust -> -2.

---

## 9. A/B Test Backlog (prioritized - ICE: Impact / Confidence / Ease)

| # | Test | Variant A (control) | Variant B | Primary metric | ICE |
|---|---|---|---|---|---|
| 1 | **Primary CTA copy** | "Request Export Quote" | "Get My Export Quote" | CTA CTR -> form starts | High / High / High |
| 2 | **Country as core field** | Country in optional collapse | Country as 5th required-ish core | RFQ completion + quote quality | High / Med / High |
| 3 | **Sticky mobile CTA bar** | None | Persistent "Get Quote - WhatsApp" bar | Mobile conversion rate | High / Med / Med |
| 4 | **Inline vs top error** | Single top error | Per-field on-blur validation | Form completion rate | High / High / Med |
| 5 | **WhatsApp prominence** | Float only | Float + inline secondary CTA on product/export pages | whatsapp_click rate | Med / Med / High |
| 6 | **MOQ visibility** | No commercial block | "Commercial Basics" block (-3.3) on export pages | RFQ rate + bounce on export pages | High / Med / Med |
| 7 | **Trust strip content** | Generic 3-item | Quantified 4-item (since 1983 / 21 markets / ISO+DMF / format range) | Scroll-to-form + form starts | Med / Med / High |
| 8 | **Lead magnet placement** | No capture | Inline Export Kit in guide/blog | Email capture rate | Med / Med / Med |
| 9 | **Form title** | "Send MOQ Requirement" | "Get Your Export Quote" | Form start rate | Med / High / High |
| 10 | **Buyer ack email** | Internal-only | Internal + instant buyer acknowledgment | Reply/engagement rate, repeat contact | Med / High / Med |
| 11 | **Submit microcopy** | None | "Indicative quote in 1 business day - sample before bulk" under button | Completion rate | Low / Med / High |

**Testing notes:** weekly traffic is tiny (~8 users/wk per GA4) - classic A/B significance is months away. Until volume grows, treat #1, #4, #7, #9 as **best-practice "just ship B"** changes (high confidence, low risk) and reserve true split-testing for after the indexing/backlog work in `SEO-CRO-FULL-AUDIT.md` lifts traffic. Track directional movement in GA4 Key Events, not p-values, for now.

---

## 10. Implementation Order (fastest payback first)

1. **-0 - set `RESEND_API_KEY` / `RFQ_FROM` / `RFQ_BCC` + verify Resend domain.** Without this, nothing else matters; the form can't deliver.
2. **-0.4 honeypot** + **-0.3 buyer ack** - protect and professionalize the pipeline.
3. **-5 CTA copy + destination consistency** (`page.tsx` string edits) - zero-risk conversion lift.
4. **-6 WhatsApp context + tracking + verify number** - highest-value channel for these markets.
5. **-2 quantified trust strip** + reusable `TrustBlock` - provenance-safe proof on every page.
6. **-3 MOQ data model (H15)** - extend `ProductItem` + `ExportMarket`, render Commercial Basics. Larger effort, big ranking+CRO surface.
7. **-4 export-process section** + Incoterms explainer.
8. **-1 inline validation, core Country, datalist, draft persistence.**
9. **-7 lead magnet + capture action** - build the Export Kit PDF, reuse Resend.

---

*Cross-references: extends `SEO-CRO-FULL-AUDIT.md` (H4 RFQ backend, H15 MOQ model, H16 provenance), `COMPETITOR-STRATEGY.md` (structured-data edge), `HOMEPAGE-WIREFRAME.md` (CTA placement), `BACKLINKS-PLAYBOOK.md` / `OUTREACH-KIT.md` (lead magnet as link-bait). No source files were modified by this document.*
