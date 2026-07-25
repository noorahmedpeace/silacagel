# Phase A — Off-site authority

Written 2026-07-25. This is the bottleneck. Everything on-site is in good shape;
what is missing is that **no one else on the internet mentions DryGelWorld.**

---

## The evidence (measured, not assumed)

**1. AI assistants do not know the brand exists.**

Asked from a clean environment (no project context — the first attempt was
contaminated by running inside the repo folder, and Gemini even said "within
this project's context", so that result was discarded):

| Question asked | Was DryGelWorld named? |
|---|---|
| "Best silica gel suppliers and manufacturers globally" | No — Grace, BASF, Evonik, Clariant, Fuji Silysia, Merck, Desiccare, Sorbead India, SiliCycle |
| "Container desiccant manufacturer for sea freight" | No — Absortech, Clariant, Super Dry, Desiccare, Interra Global |
| **"Silica gel manufacturers and exporters based in Pakistan"** | **No** — Desiccant Pak, National Chemicals, Chemical World, S.M. Jaffer & Co., Universal Chemicals |

The third row is the important one. Asked about its own home market — the
narrowest, easiest possible question — the model named five Pakistani
competitors and not DryGelWorld. Those five are not better manufacturers.
They are better *documented*.

**2. Web search finds no third-party mention.**

Searching `"DryGelWorld" OR "Dry Gel World" silica gel Karachi manufacturer`
returns drygelworld.com itself, silicagelpk.com (the owner's own sister brand),
and then competitors. No directory listing, no article, no citation, no
supplier roundup — nothing published by anyone else.

**3. The Wikidata entry is an unreferenced stub.**

[Q140185858](https://www.wikidata.org/wiki/Q140185858) exists with 8 statements,
no references, no Wikipedia sitelink, and one incorrect value ("product or
material produced: Environmental chemistry" — a field of study, not a product).
Without independent sources it is also vulnerable to a notability challenge.

**4. No Google Business Profile found.**

No Maps/GBP listing surfaced for the brand. (Absence from web search is not
absolute proof a profile does not exist — confirm at business.google.com — but
combined with points 1–3 it is very likely missing.)

---

## Why this explains the rankings

Commercial queries sit on page 3–6 while informational ones rank page 1:

| Query | Position | Impressions | Clicks |
|---|---|---|---|
| desiccant suppliers | 41.5 | 69 | 0 |
| desiccant supplier | 30.4 | 30 | 0 |
| container desiccant supplier | 35.7 | 29 | 0 |
| desiccant manufacturer | 36.6 | 27 | 0 |
| *(vs)* what is a silica gel packet | 10 | 7,562 | 0 |

Ranking for "silica gel supplier" is a trust question, not a content question.
The content is already there and already ranks — for the informational half.

---

## What already exists (do not rebuild)

The repo already contains outreach material, and it is good:

- `GCC-OUTREACH-KIT.md` — WhatsApp scripts, cold email sequence, LinkedIn
  approach, one-page company profile and product sheet, RFQ-magnet offers,
  objection handling, daily system, first-100-buyer categories
- `READY-TO-SEND.md` — Google review request, supplier-roundup outreach,
  backlink outreach, GBP field values, directory description
- `outreach-messages.md` — email and WhatsApp templates in English and Urdu

**The gap is not templates. It is the target list.** The directory list in
`READY-TO-SEND.md` section E is TradeKey, ExportHub, Go4WorldBusiness, Alibaba,
EC21, Tradewheel, businesslist.pk, pakbiz.com — those are B2B *marketplaces*.
They generate leads, which is fine, but they are mostly nofollow, low-trust, and
they will not move commercial rankings or AI visibility. That is why the brand
is still invisible despite the kit existing.

---

## What to actually do, in order

### 1. Google Business Profile — do this first
Free, same-day, and it is the single strongest entity signal available to a
manufacturer with a real address. It creates a Google-verified record of the
business that Knowledge Graph reads directly.

- business.google.com → create profile → category **Desiccant supplier** or
  **Chemical manufacturer**
- Field values are already written in `READY-TO-SEND.md` section D — use them
  verbatim so the name/address/phone match the site exactly
- Add the factory photos, the ISO certificate, product photos
- Then request reviews from existing customers (script already in
  `READY-TO-SEND.md` section A)

**Why first:** highest trust-per-effort, and it also unlocks local/map results
for "silica gel supplier Karachi" — a query the site should already own.

### 2. Pakistani trade bodies — these are what make an exporter "real"
These are the citations that distinguish a documented manufacturer from an
undocumented one, and they are exactly what the five competitors the AI named
almost certainly have. Verify current membership/listing requirements for each:

- **TDAP** (Trade Development Authority of Pakistan) — exporter directory
- **KCCI** (Karachi Chamber of Commerce & Industry) — membership + directory
- **FPCCI** (Federation of Pakistan Chambers of Commerce & Industry)
- **PCDMA** (Pakistan Chemicals & Dyes Merchants Association)
- The relevant packaging / chemical manufacturers association

Membership is a real cost and a real application — but it is the difference
between being a website and being a company on record.

### 3. Customer-side mentions — the highest-value link available
DryGelWorld supplies GSK, Lucky Textile Mills, Al Rahim Textile and IC Pharma,
with permission already confirmed to name them. One supplier listing, vendor
page, or joint case study on a customer or logistics partner's site outweighs
fifty marketplace profiles. Ask the existing contacts — this costs nothing but
a conversation.

### 4. Supplier roundups and industry publications
`READY-TO-SEND.md` section B already has the outreach message. Find targets by
searching `silica gel suppliers` / `desiccant suppliers` roundup articles and
"best container desiccant" listicles, and ask to be added. Slow, but these are
the pages AI assistants read when asked "who are the best suppliers".

### 5. Wikidata — after 2–4, not before
Fix the incorrect "product or material produced" statement, add references, and
add ISO certification and LinkedIn. Do this **after** independent sources exist,
because an unreferenced stub for a small company invites deletion. References
first, statements second.

---

## What NOT to do right now

The site is in a strong upward ramp — average position 54 → 11, impressions up
~50×, clicks 0–1/day → 5–12/day over eight weeks. Two independent reviewers both
recommended freezing URLs, redirects, canonicals and major titles for 30 days.
Disrupting a ramp is the largest available risk and none of the work above
requires touching the site.

## How to know it worked

Re-run the three AI questions in section 1 monthly, from a clean environment.
The day a model names DryGelWorld for "silica gel manufacturers in Pakistan",
Phase A has started working. Track the commercial queries in Search Console at
the same time — they should move before AI does.
