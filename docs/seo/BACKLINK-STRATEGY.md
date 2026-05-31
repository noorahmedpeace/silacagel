# BACKLINK-STRATEGY.md - DryGelWorld White-Hat Link Acquisition, Built for International Rankings

> **Scope.** A prioritized, named-target, white-hat backlink strategy engineered specifically to move `https://www.drygelworld.com/` up in **export/international SERPs** (USA, UK, UAE, KSA, Germany, India, plus the 21 `/export/[market]` corridors). PROPOSE-FIRST: this document does not edit any source file. The only code/copy it contains lives in fenced blocks for the user to review and apply later.
>
> **Provenance guardrail (non-negotiable, enforced in every template below).** Held proof = **ISO 9001:2015 + SDS + COA + DMF-free statement ONLY.** No listing, profile, anchor, or pitch in this document claims FDA, REACH, Halal, GMP, JEDEC, USP, EPA, or "food-grade" certification. Where a buyer market expects those (USA FDA, EU/UK REACH, GCC Halal/SASO), they are framed as a **buyer-led discussion**, mirroring the language already shipping in `src/app/export/markets.ts`.
>
> **This document does NOT recommend deleting or redirecting any existing keyword SEO landing page** (`src/lib/seo-landing-pages.ts`) or any `/export/[market]` page (`src/app/export/markets.ts`). Those are the link *destinations* this strategy feeds.

---

## 0. How this fits the existing docs - what is already covered vs. what this UPGRADES

This is the third document in a three-part link program. Read it **after** the other two; it does not repeat them.

| Existing doc | What it already covers (do not duplicate) | What THIS doc adds / upgrades |
|---|---|---|
| `BACKLINKS-PLAYBOOK.md` | 50 prioritized **submission** targets across 5 tiers (PK gov/trade, global B2B portals, niche directories, Wikipedia/Wikidata, regional portals); the asset crib sheet (NAP, descriptions, categories); anchor-rotation rule; "what NOT to do". | (a) **Re-prioritizes the same universe by INTERNATIONAL ranking value**, not just ease - a different ordering for an export-first goal. (b) Adds **new named target classes the playbook does not have**: "best supplier" listicles to be *included in* (desiccant-packs.com, Metoree, Sourcify, pharmadesiccants.com), packaging "write-for-us" blogs (PACKNODE, ThePackagingJournal), and the per-`/export/[market]` country-portal map. (c) Adds a **link-velocity / tiered 90-day sequence** and a **destination-URL routing table** (which link points to which page) the playbook leaves implicit. (d) Adds **anchor-text mix percentages** (the playbook only says "rotate"). |
| `OUTREACH-KIT.md` | Ready-to-send pitch emails (Packaging Digest, Inbound Logistics, Pharmaceutical Online, generic), 6 pre-cleared expert quotes, 3 guest-post outlines, the 6-step outreach process. | (a) **New pitch templates the kit lacks**: the *listicle-inclusion* email, the *broken-link / resource-page* email, the *unlinked-brand-mention reclamation* email, and the *supplier-of-record / customer-page* ask. (b) A **link-prospecting workflow** (how to FIND targets at scale, with search operators) the kit assumes you already have. (c) Maps each kit asset to the **specific destination page** it should link to. |
| `COMPETITOR-STRATEGY.md` | Page-by-page outperform plan vs Multisorb / IMPAK / Desiccant Pak / CILICANT; notes the structural-data edge. | This doc operationalizes one line of it: **competitors expose no schema and most run thin backlink profiles** - so a modest, clean, topically-relevant link profile can outrank them on long-tail export terms faster than in most niches. The listicle and link-intersect sections below are the mechanism. |
| `INTERNATIONAL-SEO.md` | hreflang status (implemented + correct), the Africa gap, geo-signal enrichment, GBP/NAP. | This doc supplies the **off-page half** of international ranking that INTERNATIONAL-SEO.md flags as "see BACKLINKS-PLAYBOOK / OUTREACH-KIT -2 and -6": the country-portal targets per corridor and the citation-consistency program. |

**One-line summary of the upgrade:** the playbook tells you *where to submit*; the kit tells you *what to say*; **this doc tells you what to acquire FIRST for international rank, in what order, pointing at which page, with which anchor, and how to find more targets yourself.**

---

## 1. Strategy thesis - why links matter *more than usual* here, and what to optimize for

Three facts from the audit set change the normal calculus:

1. **The site is 1-3 months old with near-zero authority** (`SEO-CRO-FULL-AUDIT.md`; GA4 ~8 users/wk). At this stage Google has almost no off-page trust signal to rank the export pages on. A small number of **topically-relevant, geographically-diverse, editorially-earned** links will move the needle disproportionately because the baseline is zero.
2. **Competitors run thin or no structured backlink profiles and zero schema** (`COMPETITOR-STRATEGY.md`). DryGelWorld already ships Organization/WebSite/Service/BreadcrumbList JSON-LD (`src/app/layout.tsx`). Schema does not directly raise rankings, but it improves how earned links and brand mentions are *interpreted* into the entity graph - so every link below compounds with an advantage competitors lack.
3. **Ranking is delegated to `/export/[market]` by design** (`INTERNATIONAL-SEO.md` -1.2 Gap C). The homepage carries brand + global head terms; the 21 corridor pages carry country SERPs. **Therefore international link-building must point a deliberate share of links at the corridor pages and the country landing pages - not all at the homepage.** This is the single most common mistake an export business makes, and -3 fixes it explicitly.

**Optimize for, in priority order:** (1) topical relevance (desiccant / packaging / moisture / logistics), (2) **geographic diversity** matching target corridors (a `.de`, `.ae`, `.co.uk` link is worth more for `/export/germany`, `/export/uae`, `/export/uk` than a generic global directory), (3) editorial earn over directory submission, (4) link to deep pages not just the homepage. **Do NOT optimize for raw DA or link count.**

---

## 2. Destination-URL routing map (decide this BEFORE acquiring any link)

Every link you pursue must have a pre-decided destination. Pasting everything at the homepage wastes the corridor architecture. Use this table; it is the connective tissue the playbook leaves implicit.

| Link source type | Point it at (destination) | Why |
|---|---|---|
| Global B2B marketplace profile (Alibaba, ThomasNet, Kompass, EC21, TradeKey, ExportHub) | `https://www.drygelworld.com/` (homepage) - it is the entity anchor | Marketplaces want the canonical brand URL; homepage holds Organization schema. |
| **Country/regional** directory (Europages, Dubai Chamber, IndustryStock-DE, TradeIndia) | The matching `/export/[market]` page (e.g. Europages -> `/export/europe` or `/export/germany`; Dubai Chamber -> `/export/uae`) | Concentrates the geo-relevant link equity on the page that ranks for that country. |
| Pakistan gov/trade (TDAP, FPCCI, KCCI, Pakistan Trade Portal) | `https://www.drygelworld.com/` + secondarily `/export/pakistan` and `/export/fob-karachi` | Reinforces the country-of-origin entity and the FOB-Karachi commercial story. |
| "Best supplier" **listicle** inclusion | The most specific landing page for the listicle's topic (silica gel packets list -> `/products/[slug]` or the matching `seoSlug`; container desiccant list -> the container-desiccant landing page) | Anchors the long-tail keyword the listicle ranks for to the page built for it. |
| Packaging/logistics **guest post / editorial** | The citable asset: `/guides/silica-gel-buyer-guide` (primary), `/compare`, or a specific `/blog/[slug]` | Deep editorial links should feed the asset that earns, not the homepage. |
| Unlinked brand-mention reclamation | Whatever page the mention is *about* (often homepage or a product page) | Match the link to the context of the mention. |

> **Apply-later note:** before this routing goes live, confirm the destination landing pages exist in `src/lib/seo-landing-pages.ts` (12 static + catch-all registry) and the corridor slugs match `src/app/export/markets.ts` (verified slugs: `uae, saudi-arabia, qatar, usa, vietnam, russia, bangladesh, indonesia, mexico, turkey, india, brazil, malaysia, pakistan, fob-karachi, uk, germany, canada, australia, europe`). Never point a link at a slug that does not resolve.

---

## 3. International ranking value - the re-prioritized target tables

These tables **re-sort the playbook's universe and add new classes**, scored for the export goal. Columns:
- **Intl value** = expected lift for *international/country* rankings (?1-5), not generic DA.
- **Difficulty** = effort/approval friction (Low / Med / High).
- **Acquire** = the exact path; full email copy lives in `OUTREACH-KIT.md` or -5 below.

### 3.1 TIER A - Country & regional directories (HIGHEST international value)
> These are the links INTERNATIONAL-SEO.md says to feed into `/export/[market]`. A ccTLD/regional link is the strongest geo-signal you can earn without a physical presence.

| Target | URL | Type | Why (intl) | Difficulty | Intl value | Acquire -> destination |
|---|---|---|---|---|---|---|
| **Europages** | https://www.europages.com | EU B2B directory (2.6M listings) | Ranks on `.de/.fr/.nl/.es` queries; feeds UK/DE/Europe corridors | Med (verification) | ????? | Create company profile -> link `/export/europe` (+ `/export/germany`, `/export/uk`) |
| **Kompass** | https://www.kompass.com | EU/global B2B (high trust) | Strong Europe authority; entity citation | Med | ????? | Free company entry -> homepage; secondary deep link to `/export/europe` |
| **Dubai Chamber business directory** | https://www.dubaichamber.com | UAE chamber | Direct geo-signal for the highest-intent GCC corridor | Med | ????? | Listing -> `/export/uae` |
| **TradeIndia** | https://www.tradeindia.com/free-signup.html | India B2B (ME/Africa buyer reach) | Feeds `/export/india` + Middle East/Africa corridors | Low | ????? | Free profile -> `/export/india` |
| **ExportersIndia** | https://www.exportersindia.com | India B2B | Same buyer pool as TradeIndia; both worth doing | Low | ????? | Free listing -> `/export/india` |
| **IndustryStock (Germany)** | https://www.industrystock.com | DE industrial directory | German-language industrial authority for `/export/germany` | Med | ????? | Listing -> `/export/germany` |
| **Saudi Export Development Authority / Saudi Exports** | https://saudiexports.sa | KSA trade portal | Geo-signal for `/export/saudi-arabia` | High (eligibility) | ????? | Supplier portal -> `/export/saudi-arabia` |
| **Made-in-China** | https://www.made-in-china.com | CN/global B2B | Where buyers comparison-shop PK vs CN; intl visibility | Low | ????? | Free supplier listing -> homepage |
| **Diytrade** | https://www.diytrade.com | HK/APAC B2B | APAC corridor reach (Vietnam/Indonesia/Malaysia) | Low | ????? | Listing -> `/export/vietnam` or hub |
| **Cylex / HotFrog** (multi-country) | https://www.cylex.us.com - https://www.hotfrog.com | Multi-country biz directories | NAP consistency across US/UK/DE/FR editions | Low | ????? | Listing -> homepage (entity consistency) |

### 3.2 TIER B - High-authority global B2B marketplaces (entity + inbound RFQs)
> These build the brand entity and generate *real RFQs* alongside link value. Point at the homepage (entity anchor).

| Target | URL | Type | Why (intl) | Difficulty | Intl value | Acquire -> destination |
|---|---|---|---|---|---|---|
| **ThomasNet** | https://www.thomasnet.com/register | US industrial procurement standard | Highest US-side authority; feeds `/export/usa` discovery | Med | ????? | Free supplier profile -> homepage |
| **Alibaba** (free first) | https://www.alibaba.com/membership | Global B2B | #1 non-Google inbound RFQ source for exporters | Low (free) | ????? | Free supplier profile -> homepage |
| **TradeKey** | https://www.tradekey.com/pakistan/ | Global B2B (PK-friendly) | Anchor-controlled link; PK-supplier visibility | Low | ????? | Profile -> homepage |
| **ExportHub** | https://www.exporthub.com/pakistan/ | PK B2B marketplace | Built around Pakistani manufacturer discovery | Low | ????? | Profile -> homepage |
| **TradeWheel** | https://www.tradewheel.com/pakistan/ | Global B2B (PK section) | Free PK supplier listing; global buyer reach | Low | ????? | Profile -> homepage |
| **TradeFord** | https://pakistan.tradeford.com | PK B2B directory | Free Made-in-Pakistan listing | Low | ????? | Profile -> homepage |
| **Global Sources** | https://www.globalsources.com | Electronics-packaging B2B | Electronics-desiccant buyer pool | Med | ????? | Registration -> product/electronics landing page |
| **EC21** | https://www.ec21.com | Korea/East-Asia B2B | APAC corridor reach | Low | ????? | Free tier -> hub |
| **EWorldTrade / EximNext / B2BMAP** | https://www.eworldtrade.com - https://eximnext.com - https://b2bmap.com/pakistan | Broad B2B | Volume + entity consistency; low effort | Low | ????? | Profile -> homepage |

> **Quality filter:** of the long tail of "free B2B portal" sites, do the ones above and **stop**. Beyond ~12 marketplace profiles you hit diminishing returns and start touching low-trust auto-generated directories. Quantity here is not the goal; NAP consistency is (see -6).

### 3.3 TIER C - "Best supplier" listicles to be INCLUDED IN (new - not in the playbook)
> These are *editorial ranking pages that already rank* for your money keywords. Getting added is a contextual link from a page Google trusts for the exact term. This is one of the highest-leverage moves available and the playbook does not cover it. **Approach:** polite inclusion request (template -5.1). Some are competitor-owned blogs - request inclusion as the "Pakistan manufacturer-exporter" entry; many listicles *want* geographic spread to look comprehensive.

| Target (page) | URL | Ranks for | Why pursue | Difficulty | Intl value | Acquire -> destination |
|---|---|---|---|---|---|---|
| **"2025 Best 10 Silica Gel Suppliers in the World"** (desiccant-packs.com blog) | https://www.desiccant-packs.com/blog/2025-best-10-silica-gel-suppliers-in-the-world-1677579.html | "best silica gel suppliers" | Ranks on the core head term; "in the world" framing invites a PK entry | Med | ????? | Inclusion email (-5.1) -> relevant product/landing page |
| **Metoree - Desiccant Manufacturers** | https://us.metoree.com/categories/100091/ | "desiccant manufacturers" | Aggregator that *adds* companies on request; ranks well | Low-Med | ????? | Supplier add form -> homepage |
| **Sourcify China - Top Silica Gel Packets Manufacturers** | https://www.sourcifychina.com/top-silica-gel-packets-manufacturer-compare/ | "silica gel packets manufacturer" | Comparison listicle; sourcing-blog inclusion possible | Med | ????? | Inclusion email -> silica-gel-packets landing page |
| **pharmadesiccants.com - Top desiccant companies** | https://www.pharmadesiccants.com/blog/top-manufacturer-and-supplier-companies-of-desiccants | "top desiccant companies" | Niche-topical; honest-scope inclusion (non-DMF, industrial) | Med | ????? | Inclusion email (state ISO-only scope) -> buyer guide |
| **favouritehub.com - Top Silica Gel Suppliers 2025** | https://favouritehub.com/top-silica-gel-packaging-material-suppliers-a-comparison-guide-for-2025/ | "top silica gel suppliers" | Comparison guide that accepts additions | Low | ????? | Inclusion email -> landing page |
| **DesiccantGlobal - manufacturers lists** | https://www.desiccantglobal.com/silica-gel-desiccant-manufacturers-usa/ | regional manufacturer lists | Has multiple regional list pages to be added to | Med | ????? | Inclusion email -> matching corridor page |

> **Provenance note for Tier C:** when pitching pharma-adjacent listicles (pharmadesiccants.com), state up front "ISO 9001:2015 + DMF-free, industrial/non-DMF scope" exactly as `OUTREACH-KIT.md` -3C does. Do not let a listicle list you under "FDA" or "pharma-grade" - request a correction if it does.

### 3.4 TIER D - Packaging / industrial / logistics blogs (guest post + resource links)
> Editorial relevance. The kit already has full pitches for **Packaging Digest, Inbound Logistics, Pharmaceutical Online**. These are the *additional* named targets (smaller, faster-yes blogs) to widen the funnel. Use the -5 templates.

| Target | URL | Type | Why (intl) | Difficulty | Intl value | Notes |
|---|---|---|---|---|---|---|
| **PACKNODE** | https://www.packnode.org/en/guest-posts | Global packaging publication | Free guest posts if accepted; topical relevance | Med | ????? | Pitch buyer-guide condensation; 1 dofollow link |
| **ThePackagingJournal** | https://thepackagingjournal.com/write-for-us/ | Packaging blog | 1,000-2,000 words, one backlink; **$50 fee** | Low | ????? | Acceptable paid-contribution (editorially reviewed, not a PBN). Use only if content is genuinely useful. |
| **Inbound Logistics** | https://www.inboundlogistics.com | US logistics editorial | Container-moisture cost angle (kit pitch B) | High | ????? | Already in kit - high authority, slow yes |
| **Packaging Digest** | https://www.packagingdigest.com | US packaging standard | Buyer-checklist angle (kit pitch A) | High | ????? | Already in kit |
| **AllThingsSupplyChain / ManufacturingTomorrow** | (search current submit form) | Supply-chain blogs | Logistics-side container desiccant audience | Med | ????? | Generic kit pitch D |
| **DesiccantPackaging.com / Adsorbents.com** | (cold pitch) | Niche desiccant blogs | Extremely topical; profile + technical sheet combo | Med | ????? | Already flagged in playbook Tier 3 #35-36 |

> **Caution on the "Write for Us" packaging-box farm cluster** (Royal Box Solutions, Speedy Pack Boxes, Box Ninja, PackBoxWorld, World Packaging Pro, etc. - all "My Blog" footprints, all ~$50/post). These share a template footprint and read as a low-quality guest-post network. **Skip all of them.** One PACKNODE or ThePackagingJournal placement is worth more than ten of these, and a cluster of footprint-identical links is a spam pattern (see -7).

### 3.5 TIER E - Pakistan trade / government & entity sources (country-of-origin trust)
> Already well-covered in `BACKLINKS-PLAYBOOK.md` Tier 1. Re-stated here only with the **destination routing** added (the new value). Do these first - they are the strongest origin-country signal and they are free.

| Target | URL | Destination (new) | Intl value |
|---|---|---|---|
| **TDAP - Pakistan Exporters Directory** | https://tdap.gov.pk/pakistan-exporters-directory/ | `/export/pakistan` + homepage | ????? |
| **TDAP Pakistan Trade Portal** | https://pakistantradeportal.gov.pk | `/export/fob-karachi` | ????? |
| **FPCCI / KCCI** | https://fpcci.org.pk - https://kcci.com.pk | homepage | ????? |
| **OpenCorporates (Kamran Enterprises)** | https://opencorporates.com | homepage | ????? |
| **Wikidata (DryGelWorld / Kamran Enterprises)** | https://www.wikidata.org | homepage (Knowledge-Graph foundation) | ????? |
| **Crunchbase / Owler** | https://www.crunchbase.com - https://www.owler.com | homepage | ????? |

---

## 4. The tiered 90-day acquisition sequence (link velocity matters)

A brand-new domain that suddenly gains 50 links in week one looks unnatural. Build a **gentle, rising velocity** weighted toward relevance early. Sequence below; track in the spreadsheet schema from `OUTREACH-KIT.md` -5.

### Phase 1 - Days 1-30 - Foundation (entity + origin-country trust)
*Goal: establish the entity and country-of-origin signal. ~12-15 links. All free, all low-difficulty.*
1. **Wikidata + OpenCorporates + Crunchbase** entity entries (week 1) - the entity backbone.
2. **TDAP exporters directory + Pakistan Trade Portal + FPCCI/KCCI** (weeks 1-2) - strongest origin signal; route to `/export/pakistan` + `/export/fob-karachi`.
3. **ThomasNet + Alibaba (free) + Kompass + Europages** core profiles (weeks 2-4) - the four anchor B2B/regional citations.
4. **NAP baseline lock:** decide the canonical name/address/phone string *once* (use the `BACKLINKS-PLAYBOOK.md` crib sheet verbatim) before any further submission. Every later listing must match it character-for-character.

### Phase 2 - Days 31-60 - Geographic + topical expansion
*Goal: feed the corridor pages and earn the first editorial/listicle links. ~15-20 links.*
5. **Country directories routed to corridors** (Tier A): Dubai Chamber -> `/export/uae`, TradeIndia/ExportersIndia -> `/export/india`, IndustryStock -> `/export/germany`, Made-in-China + Diytrade -> APAC corridors.
6. **Listicle inclusion outreach (Tier C)** - send the -5.1 email to the 6 listicle targets; ~2-3 typically convert. These are your first *editorial keyword-anchored* links.
7. **Begin guest-post pitches (Tier D)** - send kit pitches A/B/C (Packaging Digest, Inbound Logistics, Pharmaceutical Online) + PACKNODE. These are slow; start now so they land in Phase 3.
8. **HARO / Qwoted / SourceBottle** - answer 1 journalist query/week using the `OUTREACH-KIT.md` -2 pre-cleared quotes.

### Phase 3 - Days 61-90 - Editorial earn + reclamation + compounding
*Goal: convert pitches, reclaim mentions, and start the compounding flywheel. ~10-15 links + ongoing.*
9. **Land 1-2 guest posts** -> link from each to `/guides/silica-gel-buyer-guide` (primary) or a corridor page.
10. **Unlinked-mention reclamation** (-5.3) - search for "DryGelWorld" / "Kamran Enterprises" / "Dry Gel World" mentions that lack a link; ask for the link.
11. **Resource-page / broken-link outreach** (-5.2) - find packaging/logistics resource pages and dead competitor links; offer the buyer guide as a replacement.
12. **Trustpilot profile + first review requests** - branded-SERP CTR + entity signal.
13. **Regional long-tail directories** (Cylex/HotFrog editions, country B2B portals per remaining corridors) - top up NAP consistency.

> **Velocity guardrail:** never exceed ~1 new live link/day average in the first 90 days. If a listicle or marketplace approves a batch at once, that is fine (they are editorially gated); the rule targets *self-placed* links.

---

## 5. New outreach templates (the kit does NOT have these - add them)

> These complement `OUTREACH-KIT.md` -3 (which covers trade-press guest posts). All follow the kit's -5 6-step process and -6 "what not to do" rules. Provenance line is mandatory in each.

### 5.1 Listicle / "best supplier" inclusion request (for Tier C)
```
Subject: Addition for your "[exact listicle title]" - Pakistan manufacturer-exporter

Hi [Name],

Your piece "[exact title]" ([URL]) is a genuinely useful reference - I send buyers
to lists like it when they're scoping suppliers across regions.

I noticed it doesn't yet include a Pakistan-based manufacturer-exporter. We're
DryGelWorld (Kamran Enterprises), a Karachi silica gel desiccant maker shipping
container desiccants, industrial sachets, and bulk beads to importers in 60+
countries since 1983. ISO 9001:2015 certified; SDS, COA, and DMF-free statement
per shipment. (To be precise about scope: ISO 9001:2015 + DMF-free are the only
certifications we hold - we are not FDA/food-grade, and I'd ask we be listed as an
industrial manufacturer-exporter, not pharma-grade.)

If a Pakistan entry rounds out the geographic spread of your list, here's a clean
one-liner you can drop in:

  DryGelWorld (Kamran Enterprises) - Karachi, Pakistan. Silica gel desiccant
  manufacturer-exporter since 1983. Container desiccants, industrial sachets, bulk
  beads. ISO 9001:2015. https://www.drygelworld.com/[destination-page]

No pressure either way - thanks for keeping the list current.

[Sender], DryGelWorld Export Desk - press@drygelworld.com
```

### 5.2 Resource-page / broken-link replacement (for Tier D resource pages)
```
Subject: A working reference for your [topic] resources page

Hi [Name],

I was reading your [packaging/logistics] resources page ([URL]) and two things:

1) The link to [dead/old resource] appears to be returning a 404 / has moved.
2) We recently published a buyer-side reference that fits the same slot - "The
   Industrial Silica Gel Buyer Guide": selection, sizing math, container-desiccant
   deployment, route adjustments, packaging discipline, documentation scope.
   https://www.drygelworld.com/guides/silica-gel-buyer-guide

It's vendor-neutral in tone (buyer decision framework, not a product pitch). If it's
a fit as a replacement or addition, it's yours to link. Honest scope: we're an
ISO 9001:2015 manufacturer; the guide stays in non-DMF industrial moisture control.

Thanks either way.

[Sender], DryGelWorld Export Desk
```

### 5.3 Unlinked brand-mention reclamation
```
Subject: Thanks for the mention - quick link request

Hi [Name],

Thanks for referencing [DryGelWorld / Kamran Enterprises] in "[article title]"
([URL]). Would you be open to linking the mention to our site so readers can reach
us directly? https://www.drygelworld.com/[relevant page]

Small ask - appreciate the coverage regardless.

[Sender], DryGelWorld Export Desk
```

### 5.4 Supplier-of-record / customer "our suppliers" page ask (for existing buyers)
```
Subject: Quick favour - supplier listing on your site

Hi [Name],

We've supplied [your company] with [container desiccants / silica gel sachets]
since [year]. If you maintain a "suppliers" or "partners" page, we'd be grateful
for a listing - happy to send logo and a one-line description. It helps other
buyers in your market find a vetted source.

Logo + boilerplate attached. Link target: https://www.drygelworld.com/

Thanks for the partnership.

[Sender], DryGelWorld Export Desk
```

> **Prospecting operators** (run in Google to find -5.2/5.3 targets - the workflow the kit assumes):
> - `"silica gel" OR "desiccant" inurl:resources` - `"container desiccant" intitle:"resources"`
> - `"moisture control" "useful links" -drygelworld`
> - `"DryGelWorld" OR "Kamran Enterprises" -site:drygelworld.com` (find unlinked mentions)
> - `intitle:"best" "silica gel" supplier 2025..2026` (find new listicles to be added to)
> - `"packaging" "write for us" -"$" ` (guest-post pages without obvious paid footprint)

---

## 6. Anchor-text mix guidance (upgrades the playbook's "just rotate" rule)

A new domain with a high share of exact-match commercial anchors ("silica gel manufacturer") looks paid and risks an over-optimization filter. Skew **heavily branded** early, and let exact-match anchors come only from editorial links you do not control. Target distribution across the *whole* profile:

| Anchor type | Example | Target share | Source it should come from |
|---|---|---|---|
| **Branded** | "DryGelWorld", "Dry Gel World", "Kamran Enterprises" | **~45-55%** | Directories, marketplaces, entity profiles |
| **Naked URL** | drygelworld.com, https://www.drygelworld.com | **~15-20%** | B2B portals, citations |
| **Generic / CTA** | "visit website", "supplier profile", "read the guide", "learn more" | **~10-15%** | Resource pages, listicles |
| **Branded + keyword** | "DryGelWorld silica gel exporter", "DryGelWorld Karachi" | **~10-15%** | Listicles, country directories |
| **Partial-match** | "industrial desiccant supplier", "container desiccant supplier" | **~5-10%** | Editorial / guest posts only |
| **Exact-match commercial** | "silica gel manufacturer", "container desiccant" | **=5%** | Only natural editorial; never self-placed |

Rules:
- **Where you control the anchor (directories), default to branded or naked URL.** Save partial-match for places that ask "what do you do" (categories handle the keyword signal - see playbook rule #5).
- **Never repeat the same exact-match phrase across multiple self-placed links** - that is the paid-link pattern Google flags.
- **Vary the destination too**, not just the anchor - a profile that links the homepage with branded anchor, while a guest post links the buyer guide with a generic anchor, while a country directory links `/export/uae` with "DryGelWorld" reads as natural.
- **Localize anchors for corridor links** where the platform allows: a German directory linking `/export/germany` can use "DryGelWorld - Silica Gel Lieferant" if natural; keep =5% and never machine-translate spam.

---

## 7. What NOT to do (international-export-specific additions)

The playbook (#274-280) and kit (-6) already cover the universals - PBNs, identical anchors, Fiverr guest posts, reciprocal exchanges, false certifications. **Do not repeat those mistakes.** This section adds the failure modes *specific to an export/B2B link program*:

- **Do NOT buy the "$5 submit to 500 directories" gigs.** They drop you on hundreds of auto-generated, footprint-identical directory shells. For an export domain this is worse than useless - it associates the brand with a spam neighborhood right when Google is forming its first impression of a new site.
- **Do NOT do the packaging "Write for Us / My Blog / $50 backlink" box-supplier cluster** (-3.4 caution). Footprint-identical guest-post farms are a recognizable pattern; a handful of these can outweigh your legitimate links.
- **Do NOT let a listicle or directory mis-state your certifications.** If `pharmadesiccants.com` or any pharma listicle lists DryGelWorld as "FDA" or "pharma-grade", **email a correction the same week.** A wrong cert claim you didn't write still damages E-E-A-T and buyer trust, and it violates the provenance guardrail.
- **Do NOT machine-translate the same listing into 10 languages and spray it across ccTLD directories.** Auto-translated duplicate listings are a thin-content/duplicate signal. One clean English listing per legitimate regional directory beats ten translated shells.
- **Do NOT chase DA at the cost of relevance.** A DA-30 desiccant/packaging blog link is worth more for these rankings than a DA-70 unrelated general-business directory. Relevance and geography first, authority third.
- **Do NOT over-optimize velocity.** No link "blasts." Keep ~1 self-placed live link/day average for 90 days (-4 guardrail). Editorial/marketplace approvals arriving in batches are fine.
- **Do NOT point everything at the homepage.** That collapses the corridor architecture (`INTERNATIONAL-SEO.md`). Use the -2 routing map.
- **Do NOT use the personal LinkedIn profile as the brand link.** Stand up the Company Page (`/company/drygelworld`) per playbook "after the 50 listings" - company pages feed the entity graph; personal profiles do not.

---

## 8. Measurement - tie links to the existing monitoring cadence

Fold link tracking into the rhythm already defined in `SEO-MONITORING-CHECKLIST.md` and `SEO-WEEKLY-REPORT.md` (do not create a parallel system):

- **Weekly:** new live links count (target: =7/wk), new referring domains, and which destination page each pointed at. Log in the `OUTREACH-KIT.md` -5 spreadsheet.
- **Monthly:** referring-domain count by **country TLD** (the export KPI - are `.de/.ae/.co.uk/.in` links growing?), branded-search impressions in GSC (entity strength), and impressions on `/export/[market]` pages vs the SEO landing pages (cannibalization watch, per `INTERNATIONAL-SEO.md`).
- **90-day review:** re-audit listing live-status (playbook close-out), prune any listing that mis-states certifications, and re-confirm NAP consistency across all live profiles.
- **Leading indicator that it's working:** corridor pages (`/export/uae`, `/export/germany`, etc.) start surfacing in GSC for country-qualified queries before the homepage moves on head terms - that is the corridor architecture earning its keep.

---

## 9. One-screen quick-start (hand this to a VA)

1. Lock the canonical NAP string (playbook crib sheet). Never deviate.
2. Week 1: Wikidata, OpenCorporates, Crunchbase, TDAP exporters directory.
3. Weeks 2-4: ThomasNet, Alibaba (free), Kompass, Europages -> route per -2.
4. Weeks 5-8: country directories -> corridor pages; send the 6 listicle-inclusion emails (-5.1); start kit guest-post pitches.
5. Weeks 9-12: land guest posts -> buyer guide; reclaim unlinked mentions (-5.3); resource-page outreach (-5.2).
6. Anchors: ~50% branded, =5% exact-match commercial (-6). Where you choose the link text, default to "DryGelWorld".
7. Never: directory blasts, $50 box-blog farms, false certs, homepage-only links.

---

*Created 2026-05-29. Companion to `BACKLINKS-PLAYBOOK.md` (where to submit), `OUTREACH-KIT.md` (what to say), `INTERNATIONAL-SEO.md` (on-page corridor strategy), `COMPETITOR-STRATEGY.md` (outperform plan), and `SEO-MONITORING-CHECKLIST.md` (cadence). Re-prioritize targets after the first 90-day review based on which referring-domain TLDs actually moved corridor rankings.*
