# /public/documents — real downloadable PDFs

Drop the real PDF files here using these EXACT filenames. The documentation
center (/documentation) already links to each path; a link goes live the
moment the file exists and its `available` flag is flipped to `true` in
`src/lib/document-registry.ts`.

| Filename | What it is | Status |
|---|---|---|
| `iso-9001-2015-drygelworld.pdf` | The ISO 9001:2015 registration certificate | ⬜ upload |
| `sds-silica-gel.pdf` | Silica gel Safety Data Sheet | ⬜ upload |
| `coa-white-silica-gel-2-4mm.pdf` | COA, white bead 2–4 mm (HG/T 2765.4-2005) | ⬜ upload |
| `tds-silica-gel.pdf` | Silica gel Technical Data Sheet | ⬜ upload |
| `spec-paper-sachets.pdf` | Product spec — paper sachets | ⬜ upload |
| `spec-container-strips.pdf` | Product spec — container strips | ⬜ upload |
| `dmf-free-statement.pdf` | DMF-free product statement | ⬜ upload |

After adding a file, open `src/lib/document-registry.ts` and set that
document's `available: true` (and `isoCertificate.fileAvailable: true` for the
certificate).

## ⚠️ Confirm before publishing the ISO certificate
- **Registrar / issuing body** — the certificate artwork is self-branded and
  does not name an accredited third-party registrar. Confirm the real body.
- **Certificate number / validity** — this cert shows `DGW-9101225` valid to
  02-07-2029; existing site data used `9101225` valid to 2028. Confirm which
  is current, then update `isoCertificate` in the registry.
- Publishing a **supplier's** COA (e.g. the Shenulon material COA) under your
  brand is a commercial decision — confirm you want it public, or replace it
  with your own batch COA.
