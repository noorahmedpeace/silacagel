# SilicaGelPK -> DryGelWorld - Authority-Flow / Interlinking Strategy
_Created 2026-05-29. Both sites are owned by the same company (Kamran Enterprises, since 1983). This is **owned-network interlinking** - treat it as a discovery/relevance tactic, not an authority pipe._

---

## Warning: Blocker #0 - Verify SilicaGelPK is not compromised (do this FIRST)
The `site:silicagelpk.com` index contains a cloaked spam page - **"Trouble with Windows? Call us c00dedf8d47"** at `/?p=<hash>&u=<hex>` - the signature of a hacked WordPress install serving tech-support-scam/pharma spam to Googlebot. There is also a legacy HTTP page `silica-gel-quality-control.html`.

**Do NOT build any links from SilicaGelPK until it is confirmed clean.** A link from a compromised domain can pass spam signals and harm DryGelWorld.
- GSC -> Security Issues (silicagelpk.com property)
- Sucuri SiteCheck (sitecheck.sucuri.net)
- Wordfence/MalCare scan -> remove injected pages, patch core/plugins, rotate credentials, force-reindex clean pages
Everything below is **conditional** on a clean bill of health.

---

## 1. Site audit (what actually exists)

### SilicaGelPK.com - small brochure WordPress site (~6 real pages)
| Page | URL | Role | Link-source value |
|---|---|---|---|
| Home | `/` | Brand/overview | Medium (high footprint if linked) |
| Services (Silica Gel) | `/silica-gel/` | Product/desiccant overview, ranks "Services - Silicagel Pakistan" | **High** (indexed, topical) |
| Applications | `/silicagel-applications/` | 9 industrial uses + export protection | **High** (topical, export-relevant) |
| Common Uses | `/silica-gel-common-use/` | Informational | Medium |
| About | `/about/` | Company/heritage (since 1983, ISO 9001:2015) | **High** (most natural place to name the export arm) |
| Contact | `/contact/` | NAP | Low (don't link from here) |

**Honest authority read:** SilicaGelPK is a thin, local brochure site. Exact DR/referring-domains require Ahrefs/Semrush (not available here), but by footprint it carries **modest** authority - mostly local "silica gel Pakistan" relevance. Expect a small indexing/relevance benefit, not a ranking surge.

### DryGelWorld.com - the link *targets* (deep, schema-rich, export-focused)
Best destinations by topical fit:
- `/` - brand home
- `/silica-gel-manufacturer-exporter` - manufacturer/exporter intent
- `/export` - export hub (+ 21 country pages)
- `/bulk-silica-gel-desiccant` - bulk intent
- `/silica-gel-packets`, `/container-desiccant-strips`, `/shipping-container-desiccant-supplier`, `/moisture-absorber-supplier`

---

## 2. Interlinking strategy (safe architecture)

**Principles (enforced):**
- **Direction:** SilicaGelPK -> DryGelWorld only (reverse already exists via `sameAs`).
- **Volume cap:** **one** contextual in-content link per source page. Total - **5 links** across the site + 2 in the blog post = **~7 total**. Never more than one link per page; no second pass later.
- **Placement:** in-body, inside genuinely relevant sentences only. **No** footer/sidebar/menu/sitewide links.
- **Anchors:** brand-led + semantic variety; **no anchor reused**, no exact-match commercial stuffing.
- **Disclosure-natural:** lean on the true relationship ("our export division") - the most defensible link of all.
- **Follow** links are fine at this low volume; if you ever scale owned-site links, switch the extras to `rel="nofollow"`.

### Anchor-text distribution (target mix)
| Anchor | Type | Times used | -> Target |
|---|---|---|---|
| DryGelWorld | Branded | 2 | `/` |
| export division | Natural-relationship | 1 | `/export` |
| global silica gel supplier | Semantic | 1 | `/silica-gel-manufacturer-exporter` |
| international desiccant supplier | Semantic | 1 | `/silica-gel-manufacturer-exporter` (alt: `/moisture-absorber-supplier`) |
| bulk silica gel exporter | Semantic | 1 | `/bulk-silica-gel-desiccant` |
| container desiccant supplier | Semantic (blog) | 1 | `/shipping-container-desiccant-supplier` |

~40% branded, 0% exact-match-money-keyword repetition - a clean, natural footprint.

---

## 3. Exact source pages -> anchors -> targets (prioritized by transfer value)

| # | Priority | Source page (SilicaGelPK) | Where in content | Anchor text | Target (DryGelWorld) | Why this works |
|---|---|---|---|---|---|---|
| 1 | **P1** | `/about/` | After the "since 1983 / Kamran Enterprises" heritage line: _"-and our **export division** serves international B2B buyers worldwide."_ | **export division** | `/export` | Truthful relationship disclosure on a brand page - the most natural, lowest-risk link possible |
| 2 | **P1** | `/silica-gel/` (Services) | In the applications sentence (food/pharma/electronics/leather): _"-for buyers needing a **global silica gel supplier** for export-grade moisture protection."_ | **global silica gel supplier** | `/silica-gel-manufacturer-exporter` | Indexed, topical page; semantic anchor; intent-matched target |
| 3 | **P2** | `/silicagel-applications/` | In the **Export Protection** application block: _"-long-haul shipments often source from a **bulk silica gel exporter** for container-scale volumes."_ | **bulk silica gel exporter** | `/bulk-silica-gel-desiccant` | Export-protection context maps perfectly to bulk export target |
| 4 | **P2** | `/silica-gel-common-use/` | Where it discusses larger/industrial needs: _"For commercial volumes, an **international desiccant supplier** can match format to application."_ | **international desiccant supplier** | `/silica-gel-manufacturer-exporter` | Informational page -> educational, non-promotional link |
| 5 | **P3 (optional)** | `/` (Home) | One brand line only: _"Part of the **DryGelWorld** group of moisture-control brands."_ | **DryGelWorld** | `/` | Homepage links carry footprint - keep purely branded, or skip |
| - | **P2** | Blog: container-rain article (the one already drafted) | **Trim from 6 -> 2 links** | **DryGelWorld** + **container desiccant supplier** | `/` + `/shipping-container-desiccant-supplier` | 6 owned links in one new post is too dense; 2 keeps it natural |

> **Net result:** ~6-7 follow, contextual, varied-anchor links - a footprint Google reads as normal cross-brand mentions, not a link scheme.

---

## 4. Expected SEO impact (honest, not inflated)

| Outcome | Likely effect | Why |
|---|---|---|
| **Indexing / discovery** | ?? Small-but-real positive | Fresh contextual links help Google find/recrawl DryGelWorld targets faster - useful for a 2-month-old site |
| **Topical relevance signal** | ?? Minor positive | Both sites are tightly silica-gel-topical; relevant anchors reinforce entity association |
| **Domain authority / DR** | ?? Negligible | Source is a thin, owned, local site - little PageRank to pass |
| **International keyword rankings** | ?? Marginal alone | Owned-site links won't move competitive export terms; **third-party links do** (see BACKLINK-STRATEGY.md) |
| **Risk** | ?? -> ?? only if cleaned | From a *hacked* SilicaGelPK = harmful; from a *clean* low-volume setup = safe |

**Bottom line:** this is a **supporting** tactic - good for indexing power and a small relevance nudge, worth doing once SilicaGelPK is clean, but it is **not** the lever for international authority. Your real authority gains come from the third-party targets in `BACKLINK-STRATEGY.md` (Europages, Kompass, Dubai Chamber, ThomasNet, TradeIndia, packaging/trade media, "best-supplier" listicles).

---

## 5. Priority order (do in this sequence)
1. **Blocker #0** - clean/secure SilicaGelPK (non-negotiable).
2. **Link #1** (`/about/` -> "export division" -> `/export`) - most natural, do first.
3. **Link #2** (`/silica-gel/` -> "global silica gel supplier" -> `/silica-gel-manufacturer-exporter`).
4. **Link #3** (`/silicagel-applications/` -> "bulk silica gel exporter" -> `/bulk-silica-gel-desiccant`).
5. **Link #4** (`/silica-gel-common-use/` -> "international desiccant supplier").
6. **Trim the blog post** to 2 links; publish.
7. **Skip or minimize** the homepage link (#5) unless you want a single branded mention.
8. Then shift effort to **third-party** link building - that's where the international rankings actually move.

> Re-check the anchor mix after placement: keep branded = ~40%, never repeat an exact commercial anchor to the same URL, and never add a second link to a page later. If you expand owned-site links beyond this set, mark the extras `rel="nofollow"`.
