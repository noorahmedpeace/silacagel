# DryGelWorld Deep SEO, GEO & AI Visibility Audit

**Date:** 2026-07-08  
**Site:** https://www.drygelworld.com  
**Codebase:** `D:\SilacaGEL` - Next.js 16.2.2 App Router  
**Evidence used:** live homepage, live `robots.txt`, live `sitemap.xml`, live `llms.txt`, local source tree, prior May 2026 audit pack, `npm run lint`, `npm run build`, and competitor SERP/source sampling.

This document is the current-state addendum to the existing audit pack. The older `SEO-CRO-FULL-AUDIT.md` and `MASTER-AUDIT.md` remain useful, but several high-priority items from May are now fixed: viewport metadata, AI crawler robots policy, homepage internal linking, export/navigation scaffolding, industries hub, case studies, pricing, and build health.

## 1. Executive Summary

| Area | Score /100 | Current read |
|---|---:|---|
| Overall SEO | 78 | Strong technical and content base; authority and conversion proof still lag global competitors. |
| Technical SEO | 86 | Build passes, 197 static/dynamic routes, clean robots, sitemap, security headers, RSC rendering. |
| Content SEO | 76 | Broad topical coverage, 42 blog URLs, comparison pages, glossary, calculators; some templated landing pages still need unique proof and depth. |
| Topical Authority | 80 | Strong silica gel/desiccant entity coverage; missing molecular sieve, activated alumina, calcium chloride, and regulatory deep hubs. |
| EEAT | 67 | Real factory history, ISO/DMF documentation, author page, media kit; needs named experts, third-party citations, customer/verifier proof. |
| GEO / AI Readiness | 84 | `llms.txt`, AI-friendly robots, digest tables, definitions, FAQs, comparison pages, schema foundation. |
| Conversion Optimization | 68 | Quote path is much improved, but RFQ backend/env proof and friction testing are still mandatory. |
| B2B Lead Generation | 70 | Good WhatsApp, pricing, documents, export support; add segmented RFQ paths, lead magnets, and CRM tracking. |

Biggest strengths: crawlable App Router implementation, rich route inventory, honest compliance positioning, calculator/tools, comparison pages, and a very strong `llms.txt` digest for AI-answer grounding.

Biggest weaknesses: low external authority versus established suppliers/directories, many pages share a similar commercial template, limited named human expertise, and incomplete proof of live lead delivery/CRM attribution.

Biggest growth opportunities: own "Pakistan/China alternative manufacturer" export searches, container desiccant and route-humidity calculators, cobalt-free indicating silica gel guidance, and AI-answer snippets for practical procurement questions.

Quick wins under 7 days:
- Submit updated sitemap in GSC/Bing Webmaster Tools and request indexing for the top 40 commercial URLs.
- Add a simple RFQ delivery smoke test and log one successful Resend/SMTP/CRM delivery.
- Add named reviewer blocks to buyer guides and high-risk compliance pages.
- Add 8-12 external citations to technical/regulatory guides where claims need support.
- Build a footer or hub module that links the top 20 commercial landing pages by intent.

## 2. Technical SEO Audit

Live checks:
- `robots.txt` allows all crawlers plus GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, and CCBot, while blocking `/preview`.
- `sitemap.xml` contains 185 URLs: 42 blog, 20 export, 9 product, 10 comparison, and 8 case-study URLs.
- Homepage response includes HSTS, `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, Vercel cache HIT, and a 233 KB HTML payload.
- Local `npm run build` succeeds and prerenders 197 pages.
- Local `npm run lint` now passes after replacing an internal `<a href="/contact">` with `next/link` and cleaning stale warnings.

Implementation recommendations:
- Keep `robots.ts` as the version-controlled crawler source of truth. Recheck after every Cloudflare/Vercel dashboard change.
- Add automated sitemap validation: URL count, no preview URLs, no 404 URLs, canonical equality, and `lastmod` sanity.
- Add a weekly route-vs-sitemap diff script so new App Router pages cannot ship orphaned from the XML sitemap.
- Add Playwright/Lighthouse CI for homepage, `/products`, `/pricing`, `/contact`, one blog, one comparison, and one export page.
- Add a production RFQ smoke endpoint or admin-only script that verifies mail/CRM delivery without sending test spam to buyers.
- Watch homepage HTML weight. 233 KB is acceptable for a rich B2B homepage, but page modules and JSON-LD can keep growing.
- Add cache headers for large self-hosted media where safe, especially videos and static proof images.

## 3. Page-Type Content Audit

| Page type | Primary intent | Current status | Next implementation |
|---|---|---|---|
| Homepage | buy silica gel in bulk | Strong H1, proof, product navigation, quote CTA | Add stronger client/category proof and reduce generic claims like "190+ countries" unless backed by source. |
| About | manufacturer legitimacy | Good history and location | Add founder/person schema, named leadership, factory photos with captions, QA process. |
| Products | product discovery | 9 product URLs indexed | Add downloadable spec table per product, MOQ, packing, lead time, shelf life, absorption data. |
| Industries | application matching | Hub plus 8 verticals | Expand each vertical to include damage modes, recommended format, sizing table, compliance caveats. |
| Resources/blog | informational authority | 42 blog URLs | Add citations, expert reviewer, updated dates, internal "next procurement step" blocks. |
| Calculators | tools/link magnets | 2 calculators | Add shareable results, downloadable PDF/email capture, methodology schema/FAQ. |
| Comparisons | decision support | 10 comparison URLs | Add competitor-neutral decision matrices, "when not to use us" sections, citations. |
| Export pages | country procurement | 20 market URLs | Add route humidity, Incoterms, lead time, documents, port/destination examples, local terminology. |
| Documentation | trust/compliance | Good document center | Add document version table, certificate expiry alerts, request workflow. |
| Case studies | proof | 8 URLs | Replace anonymous stories with permissioned details where possible; add before/after metrics. |

Recommended baseline by page:
- Commercial landing pages: 1,200-1,800 words, Product/Service schema, FAQPage, 1 comparison table, 1 downloadable spec or RFQ checklist.
- Export pages: 1,000-1,600 words, Service schema, Breadcrumb, FAQ, route table, Incoterms block, country-specific buyer FAQ.
- Blog guides: 1,500-3,500 words, Article schema, author/reviewer, 5-10 citations, internal links to product, pricing, calculator, contact.
- Comparison pages: 1,200-2,000 words, ItemList/FAQ/Breadcrumb, clear "best for" matrix, no unsupported competitor claims.

## 4. Commercial Keyword Research Framework

The 1,000+ keyword universe should be generated by combining the following roots, modifiers, intents, and geos. Prioritize bottom-funnel combinations first.

Core roots:
- silica gel, silica gel packets, silica gel sachets, desiccant packets, bulk silica gel, white silica gel, orange silica gel, blue silica gel, indicating silica gel, non-indicating silica gel
- container desiccant, cargo desiccant, shipping container desiccant, moisture absorber, industrial desiccant, packaging desiccant
- clay desiccant, calcium chloride desiccant, molecular sieve, activated alumina, oxygen absorber, VCI corrosion protection
- hair nets, beard covers, PPE for food factories

Commercial modifiers:
- manufacturer, supplier, exporter, wholesaler, distributor, factory, OEM, private label, bulk, wholesale, by kg, metric ton, price, MOQ, quote, near me, import, buy, B2B, industrial, food packaging, pharma packaging, electronics packaging

Geo modifiers:
- Pakistan, Karachi, UAE, Dubai, Saudi Arabia, Qatar, UK, Germany, EU, USA, Canada, Australia, India, Bangladesh, Vietnam, Malaysia, Indonesia, Turkey, Mexico, Brazil, Russia, South Africa, Kenya, Nigeria

Priority clusters:
1. Silica gel manufacturer/exporter: highest commercial value; map to `/silica-gel-manufacturer`, `/silica-gel-manufacturer-pakistan`, `/drygelworld`.
2. Silica gel packets/bulk: high conversion; map to `/silica-gel-packets`, `/products/paper-sachets`, `/bulk-silica-gel-desiccant`.
3. Container/cargo desiccant: high order value; map to `/container-desiccant-strips`, `/shipping-container-desiccant-supplier`, calculator.
4. Private label/OEM: strong B2B fit; map to `/private-label`, `/private-label-desiccant-packets`.
5. Export country pages: map to `/export/[market]`, not generic landing pages.
6. Comparison intent: map to `/compare/*` and blog support pages.
7. Compliance intent: map to `/documents`, `/certifications`, and guide pages with careful claims.

## 5. Content Gap Analysis

Competitor patterns observed:
- AGM has clear bulk desiccant category depth and product-family navigation.
- DryCon-style competitors lean on technical specs, FAQ blocks, logos, and certification badges.
- Baltimore Innovations uses deep explanatory copy, phone-driven expert advice, dosage guidance, and proprietary tool positioning.
- Thomasnet and IndustryStock win directory intent and supplier-list discovery.

Missing or underbuilt assets:
- Molecular sieve supplier guide, activated alumina guide, calcium chloride container desiccant guide, oxygen absorber procurement guide.
- "Silica gel manufacturer in Pakistan vs China/India/Turkey" comparison pages.
- Route-specific humidity guides: Karachi to Hamburg, Karachi to Dubai, Karachi to Jeddah, Karachi to New York, Karachi to Toronto.
- Spec-download landing pages for each product format.
- Glossary expansion into DefinedTerm schema pages for adsorption, RH, desiccant unit, DMF, COA, SDS, Incoterms, HS 2811.22.
- Third-party directory profiles and citations: Thomasnet-style directories, packaging directories, chemical directories, export councils.

## 6. GEO / Generative Engine Optimization

Current state is above average because the site has `llms.txt`, explicit AI crawler allowance, factual digest tables, comparison pages, FAQs, and honest "not held" compliance statements.

Next AI-readiness work:
- Add source citations to high-value factual claims on every guide, not only `llms.txt`.
- Add short answer boxes under H2s: 40-70 word direct answers for AI extraction.
- Add unique tables per topic: sizing, route multipliers, material comparison, certification requirements, shelf life, MOQ.
- Add expert quote blocks from a named export/technical reviewer.
- Add `DefinedTerm` and `FAQPage` schema to glossary and FAQ-heavy pages.
- Create a public "AI citation policy" page linking `llms.txt`, sitemap, media kit, and factual correction contact.

## 7. EEAT Audit

Strong:
- Manufacturing since 1983, ISO 9001:2015, DMF-free statement, physical addresses, document center, media kit, author profile.

Weak:
- Author is still organizational, not a named technical person.
- Case studies are not yet independently verifiable.
- Few outbound citations on regulatory/scientific claims.
- No visible editorial policy, correction policy, or reviewer workflow on articles.

Implementation:
- Add `Person` pages for founder/export lead/technical reviewer with sameAs where available.
- Add an editorial policy and "claims we do not make" policy.
- Add reviewer and last-reviewed date to all compliance-sensitive content.
- Add proof media: certificate screenshots, factory QC images, packing-line captions, shipment/document examples.

## 8. Schema Audit

Keep:
- Organization, LocalBusiness, WebSite, ContactPoint, Breadcrumb, Article, Product/Service where applicable.

Add or expand:
- `FAQPage` on FAQ blocks where Q&A is visible.
- `DefinedTerm` / `DefinedTermSet` for glossary.
- `Dataset` only if calculator methodology tables are published as data.
- `VideoObject` for product/manufacturing videos with thumbnail, duration, upload date.
- `ImageObject` on factory/proof images where captions carry factual proof.
- `Person` for named founders/reviewers.
- `ItemList` for product/category/comparison hubs.
- Avoid `AggregateRating` or `Review` until real, policy-compliant review data exists.

## 9. Internal Linking Architecture

Recommended hub model:
- Homepage -> Product hub, Pricing, Documents, Export hub, Calculator, Top 10 commercial pages.
- Product hub -> each product -> related industry -> related guide -> contact.
- Export hub -> country pages -> route guides -> calculator -> RFQ.
- Guide hub -> comparison pages -> commercial landing pages.
- Glossary -> guides and products using exact entity anchors.

Anchor text rules:
- Use exact descriptive anchors sparingly: "bulk silica gel desiccant", "container desiccant strips", "silica gel packets".
- Use buyer-stage anchors: "compare desiccant options", "calculate container requirement", "request FOB quote".
- Avoid repeated "Open", "Explore", or image-only links without descriptive accessible labels.

## 10. Backlink Strategy

12-month roadmap:
- Months 1-2: claim and complete supplier profiles on B2B/export/chemical/packaging directories.
- Months 2-3: publish 4 linkable calculators/templates: container desiccant sizing, carton sizing, COA/SDS checklist, route humidity map.
- Months 3-5: guest posts in packaging, export logistics, leather/footwear, electronics packaging, and food export publications.
- Months 5-7: digital PR around "container rain prevention" and "Pakistan desiccant export alternative".
- Months 7-9: association pages, chambers of commerce, export council profiles, university/materials references.
- Months 9-12: competitor backlink gap outreach and broken-link replacement for obsolete desiccant guides.

## 11. Local & International SEO

Local:
- Audit Google Business Profile categories, NAP, photos, services, products, and weekly posts.
- Build citation consistency for Karachi factory and office. Use one canonical NAP.
- Add factory page with LocalBusiness/ManufacturingBusiness-like signals without unsupported claims.

International:
- Keep `/export/[market]` as country landing pages, not language alternatives unless translated.
- Add market-specific copy, documents, Incoterms, ports, and local buyer terminology.
- Add Africa export pages next: South Africa, Kenya, Nigeria, Egypt, Morocco.
- Do not add hreflang unless pages are true language/region alternates with reciprocal annotations.

## 12. CRO & Lead Generation

Highest-impact work:
- Verify contact/RFQ backend delivery in production and log every submission to analytics/CRM.
- Split RFQ into paths: bulk beads, sachets, container strips, private label, PPE.
- Add progressive disclosure: 4 fields first, optional technical details second.
- Add trust beside forms: ISO certificate, SDS/COA, response target, WhatsApp, Incoterms.
- Add lead magnets: MOQ sheet, spec sheet pack, export document checklist, container sizing worksheet.
- Track micro-conversions: WhatsApp click, email click, document download, calculator result, quote submit, failed validation.

## 13. AI Content Strategy

Highest ROI content backlog:
- 25 buyer guides: sizing, shelf life, regeneration, HS code, SDS/COA, Incoterms, route humidity, storage.
- 25 comparison pages: silica vs clay, calcium chloride, molecular sieve, activated alumina, oxygen absorber, VCI, Tyvek vs paper.
- 25 FAQ pages: safety, toxicity, food contact, pharma, orange vs blue, reuse, disposal, import rules.
- 25 commercial pages: country + product + intent combinations with unique route/procurement proof.
- 25 glossary pages: adsorption, absorption, RH, water vapor transmission, desiccant unit, DMF, cobalt chloride, COA.
- 25 industry pages: electronics, pharma, leather, footwear, rice/grain/spices, textiles, automotive, defense, archives, museums.

## 14. Competitor Gap Matrix

| Competitor type | They win on | DryGelWorld response |
|---|---|---|
| Global specialists | Brand age, certifications, distributor networks | Win narrower export/manufacturer-direct and Pakistan alternative intents. |
| Regional Indian/Pakistan suppliers | Local pricing, aggressive certification badges | Win with honest compliance, cleaner docs, better calculators, better UX. |
| UK/US advisors | Deep technical explanations and phone consultation | Add expert-review content and route/tool methodology. |
| Directories | Authority and supplier-list rankings | Build profiles and earn citations rather than trying to outrank every directory. |
| Marketplaces | Low-friction small orders | Avoid retail packet intent; focus bulk, FOB/CIF, repeat procurement. |

## 15. Roadmap

30 days:
- Production RFQ delivery proof, sitemap/GSC submission, top 40 URL indexing, add author/reviewer blocks, add citations to 10 guides, add CRM analytics events.

60 days:
- De-template top 20 landing pages, expand 10 export pages, add 5 route humidity pages, publish editorial policy, create spec-download PDFs.

90 days:
- Launch 10 glossary DefinedTerm pages, 5 comparison pages, 5 buyer guides, and 3 directory/backlink campaigns. Add Lighthouse CI.

6 months:
- Build Africa export cluster, add full review/person schema, publish 8 verified case studies, add calculator lead capture, earn 30-50 relevant referring domains.

12 months:
- Own the Pakistan/export silica gel topical cluster, expand into adjacent desiccants, build a citation moat for AI answers, and raise conversion attribution from click tracking to CRM-sourced pipeline reporting.

## 16. Immediate Code Work Completed During This Audit

- Replaced the internal contact `<a>` in `src/components/moisture-calculator.tsx` with `next/link`.
- Removed an unused `documents` import in `src/app/documentation/page.tsx`.
- Removed an obsolete `@next/next/no-img-element` disable comment in `src/app/page.tsx`.
- Verified `npm run lint` passes.
- Verified `npm run build` passes on Next.js 16.2.2 and generates 197 pages.
