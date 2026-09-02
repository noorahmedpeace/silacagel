# Phase A, step 2 — Pakistani trade bodies

These are the citations that separate "a website" from "a company on record".
The five Pakistani competitors an AI names instead of DryGelWorld
(Desiccant Pak, National Chemicals, Chemical World, S.M. Jaffer & Co.,
Universal Chemicals) are almost certainly carried by exactly these listings.

Unlike the marketplaces currently in `READY-TO-SEND.md` section E, these are
government and institutional sources. They are slower and they cost money, but
they are what search engines and AI models treat as evidence a manufacturer is
real.

---

## The order matters — there is a dependency chain

This is the part that wastes time if you get it wrong. **TDAP registration
requires a Chamber of Commerce membership certificate.** So:

```
1. FBR — NTN + Sales Tax Registration      (probably already done)
        ↓  required for
2. KCCI — Karachi Chamber membership       (Rs 10,000 + proposer/seconder)
        ↓  membership certificate required for
3. TDAP — exporter registration            (unlocks the directories)
        ↓
4. TDAP Pakistan Exporters Directory + B2B portal listing   ← the actual citation
```

Do not apply to TDAP first. It will be rejected without the chamber
certificate.

---

## 1. KCCI — Karachi Chamber of Commerce & Industry

**Site:** kcci.com.pk

**Fee:** around **Rs 10,000** for new membership (verify the current figure —
this is from secondary sources, and chambers revise fees annually).

**Documents needed:**
- CNIC copy of the proprietor / partners / directors
- National Tax Number (NTN) certificate — of the business and of the
  proprietor/partners
- Sales Tax Registration certificate, if applicable
- **Original bank certificate** in the name of the business applying
- Photographs
- Proof the business is legally registered and Karachi-based

**The catch worth knowing before you start:** the application must be
**proposed and seconded by two existing KCCI members**. That is a real
practical hurdle, not a formality. If you do not already know two members, ask
suppliers, your bank, or your freight forwarder — most established Karachi
trading businesses are members and it is a routine favour.

**Why it is worth it:** it is the gateway to TDAP, and the chamber directory is
itself an independent listing.

## 2. TDAP — Trade Development Authority of Pakistan

**Site:** tdap.gov.pk

**What you get:**
- Registration as a recognised exporter
- Listing in the **Pakistan Exporters Directory** (`tdap.gov.pk/pakistan-exporters-directory/`)
- Listing in the **Pakistan Online Exporter Directory**
- Registration on the **TDAP B2B portal**
- Eligibility for TDAP trade fairs and delegations — which is how you end up
  mentioned in trade press, the thing that actually feeds AI models

**Documents needed:**
- Company profile — business name, address, nature of business
- **Chamber of Commerce membership certificate** (from step 1)
- NTN — FBR tax registration proof
- Certified copy of the business bank account statement

Apply online at tdap.gov.pk or in person at the Karachi regional office.

**When filling the company profile, reuse the exact description from the GBP
sheet.** Same wording everywhere is what builds a consistent entity — different
descriptions on different listings weaken the signal instead of adding to it.

## 3. FPCCI — Federation of Pakistan Chambers of Commerce & Industry

The national federation above the city chambers. Usually approached after KCCI
membership exists. Lower priority than 1 and 2 — do it once those are done.

## 4. PCDMA — Pakistan Chemicals & Dyes Merchants Association

The sector-specific body. A listing here is a *category-relevant* citation,
which is worth more per link than a generic business directory, because it
associates the brand with the chemicals/desiccants entity rather than just with
"a company in Karachi".

Verify current membership criteria directly — this one is the least documented
publicly of the four.

---

## What to reuse, so everything says the same thing

- **Business description:** the paragraph in `GBP-SETUP-SHEET.md` section 7
- **Name, address, phone:** the exact values in `GBP-SETUP-SHEET.md` sections
  1, 3 and 4 — these come from the site's own data
- **Certifications:** ISO 9001:2015, certificate no. 9101225, QMEC Group Intl,
  valid to 09 Dec 2028
- **Product list:** the services list in `GBP-SETUP-SHEET.md` section 8

Consistency across listings is the mechanism. Ten listings that agree are worth
far more than twenty that describe the business slightly differently.

---

## Honest expectations

- **Timeline:** KCCI a few weeks (the proposer/seconder step is the variable),
  TDAP a few weeks after that. This is a quarter, not a sprint.
- **Cost:** real but modest — chamber membership plus TDAP fees.
- **What it will not do:** none of this produces clicks next week. It changes
  what search engines and AI models believe about whether the company exists,
  which is the thing currently blocking commercial rankings. The fast lever is
  Google Business Profile (step 1) and paid search; this is the slow lever that
  makes those work better.

## Verify before acting

Fees, documents and processes above are from public sources as of July 2026 and
these bodies change requirements. Confirm current details on kcci.com.pk and
tdap.gov.pk, or with a local consultant, before paying anything.

## How you will know it worked

Re-run the AI test in `PHASE-A-OFFSITE-AUTHORITY.md` monthly, from outside the
project folder. When a model lists DryGelWorld among Pakistani silica gel
manufacturers, these listings are the most likely reason.
