# Google Business Profile — paste-ready setup sheet

Phase A, step 1. About 20 minutes. Go to **business.google.com** and work down
this page.

Every value below was read out of the live site's own data
(`src/lib/product-data.ts`, the ISO certificate record in
`src/lib/document-registry.ts`), so the profile will match the website exactly.
**That exact match is the point** — Google cross-checks the name, address and
phone on the profile against the ones published on the site. If they differ,
even by formatting, the signal is weaker than having no profile discrepancy at
all. Do not "tidy" these values while pasting.

---

## 1. Business name

```
DryGelWorld
```

Google's guidelines want the real-world business name only — no keywords, no
city, no "silica gel manufacturer" suffix. Adding those risks suspension.

The legal entity is **Kamran Enterprises** (DryGelWorld is the trading name).
If the verification documents are in the legal name, use `DryGelWorld` as the
business name and give `Kamran Enterprises` when Google asks for the legal
entity during verification — that mismatch is expected and allowed.

## 2. Category

Primary:
```
Desiccant supplier
```
If that exact category is not offered, use `Chemical manufacturer`.

Additional categories to add:
```
Packaging supply store
Exporter
Chemical exporter
```

## 3. Address

```
A-488, Block 1, Gulshan-e-Iqbal
Karachi
Sindh
74000
Pakistan
```

Map pin, if it lands in the wrong place — drag it to:
```
24.9215, 67.0950
```

## 4. Phone

```
+92 333 022 3337
```

## 5. Website

```
https://www.drygelworld.com
```

## 6. Hours

Monday–Saturday, `08:00`–`17:00`. Sunday closed.

## 7. Description (paste as-is, 750 char limit)

```
DryGelWorld is an ISO 9001:2015 certified silica gel desiccant manufacturer and
exporter in Karachi, Pakistan, manufacturing since 1983. We supply silica gel
sachets from 0.5 g to 1 kg, bulk silica gel beads, shipping container
desiccants, dry clay desiccants, and private-label or OEM printed packets, with
SDS, COA and DMF-free documentation published for download. There is no minimum
order quantity, stock dispatches within 24 hours, and samples are free.
Worldwide B2B export with regular supply to the UAE, Saudi Arabia, Qatar, USA,
UK, Germany, Canada and Australia.
```

This is the description already drafted in `READY-TO-SEND.md` section D, updated
with the commercial terms that are now published on the site (no MOQ, 24-hour
dispatch, free samples, documents published rather than "on request"). Keep the
profile and the site saying the same thing.

## 8. Services to add

```
Silica gel sachets
Bulk silica gel beads
Container desiccants
Private label desiccant packets
Dry clay desiccants
Humidity indicator cards
Contract packaging
```

## 9. Photos — this is where most profiles are weakest

Upload real photographs, not renders or stock:

- The factory / production line
- Packing and sealing in progress
- 40 ft container being loaded
- Product close-ups: sachets, bulk beads, container strips
- The ISO 9001:2015 certificate
- The team

Both AI reviewers independently flagged missing proof-of-scale as the trust gap
for a Pakistani supplier competing against Clariant and Grace. Photographs are
the cheapest possible fix and this is the one place they can be published today
without touching the website.

## 10. Attributes worth ticking

`Online appointments` / `Onsite services` if applicable, plus anything about
identifying as a manufacturer or wholesaler that Google offers for the category.

---

## After the profile is live

1. **Request reviews.** The message is already written — `READY-TO-SEND.md`
   section A. Send it to past buyers over WhatsApp. Reviews on a verified
   profile are the strongest trust signal available at zero cost.
2. **Post the ISO certificate** as a Google Post, and post again whenever there
   is a real shipment or a new document.
3. **Check the profile matches the site** after verification lands — Google
   sometimes reformats the address. If it did, that is fine; do not change the
   website to match Google, keep the website as the source of truth.

## Verification

Google will verify by postcard, phone or video. Postcard to a Karachi address
can take 2–4 weeks — start it now rather than waiting, because nothing else in
Phase A depends on it and the clock runs in the background.

---

## Reference — where each value came from

| Field | Source in the repo |
|---|---|
| Phone | `product-data.ts` → `displayPhone` |
| Email | `product-data.ts` → `salesEmail` (`sales@drygelworld.com`) |
| Address | `product-data.ts` → `companyStreet` / `Locality` / `Region` / `PostalCode` |
| Geo | `product-data.ts` → `companyGeo` |
| Hours | `product-data.ts` → `openingHoursDays` / `Open` / `Close` |
| Legal entity, ISO number | `document-registry.ts` → `isoCertificate` (BS EN ISO 9001:2015, cert. 9101225, QMEC Group Intl, valid to 09 Dec 2028) |

If any of these are wrong in real life, fix them in `product-data.ts` first and
let the site redeploy, then create the profile — so the two never disagree.
