/*
 * Document registry — single source of truth for the downloadable
 * documentation center (/documentation) modelled on how industrial suppliers
 * (e.g. Trelleborg) publish verifiable proof: real, openable PDFs grouped by
 * type, each with concrete metadata.
 *
 * PRINCIPLE: nothing here is invented. Where a real value or file is not yet
 * confirmed, the field carries an explicit `[PLACEHOLDER: …]` string and the
 * document's `available` flag is false, so the UI renders an honest
 * "awaiting file" state instead of a dead download link. Fill the real files
 * into /public/documents/ (see /public/documents/README.md) and flip
 * `available` to true.
 */

export type DocumentType = "certificate" | "sds" | "coa" | "tds" | "spec";

export type DocEntry = {
  id: string;
  type: DocumentType;
  title: string;
  /** One-line, buyer-facing description of what the document proves. */
  description: string;
  /** Path under /public. Present even for placeholders so the link goes live
   *  the moment the real file is dropped in at this exact path. */
  fileHref: string;
  format: "PDF";
  /** false = file not yet uploaded → UI shows an "awaiting file" state. */
  available: boolean;
  /** Optional metadata surfaced on the card (registrar, doc no, dates, etc.). */
  meta?: { label: string; value: string }[];
  /** Optional: applies to a specific product family. */
  appliesTo?: string;
};

export type DocGroup = {
  key: DocumentType;
  label: string;
  blurb: string;
};

export const documentGroups: DocGroup[] = [
  { key: "certificate", label: "Certificates", blurb: "Third-party quality-management certification." },
  { key: "sds", label: "Safety Data Sheets (SDS)", blurb: "Handling, storage, and transport safety data." },
  { key: "coa", label: "Certificates of Analysis (COA)", blurb: "Batch/material test results against a published standard." },
  { key: "tds", label: "Technical Data Sheets (TDS)", blurb: "Adsorption performance and physical properties." },
  { key: "spec", label: "Product Specifications", blurb: "Format, size range, packing, and MOQ context per SKU." },
];

/*
 * ── ISO 9001:2015 registration certificate ──────────────────────────────
 * Values transcribed from the certificate you supplied. Two items are flagged
 * because they must be reconciled before publishing:
 *   1. REGISTRAR/ISSUING BODY — the certificate artwork is self-branded and
 *      does not clearly name an accredited third-party registrar. The site's
 *      existing JSON-LD names "QMEC Group Intl". Confirm the real issuing body.
 *   2. CERTIFICATE NUMBER / VALIDITY mismatch — this certificate shows
 *      "DGW-9101225" valid to 02-07-2029, while existing site data used
 *      "9101225" valid to 2028. Confirm which is current.
 */
export const isoCertificate = {
  standard: "BS EN ISO 9001:2015",
  scope: "Production, Packaging and Supply of Silica Desiccant",
  naceCode: "8292",
  certificateNumber: "DGW-9101225",
  registrar: "[PLACEHOLDER: confirm accredited registrar / issuing body]",
  verificationAccountNo: "17240831",
  approvalDate: "2026-07-03",
  expiryDate: "2029-07-02",
  validityYears: 3,
  awardedTo: "DryGelWorld",
  registeredAddress: "A-488, Block 1, Gulshan-e-Iqbal, Karachi 74000, Pakistan",
  /** Drop the real certificate PDF here to make Download go live. */
  fileHref: "/documents/iso-9001-2015-drygelworld.pdf",
  fileAvailable: false,
};

/*
 * ── Document library ─────────────────────────────────────────────────────
 * All `available:false` until the real files land in /public/documents/.
 * Filenames below are the exact paths the UI links to.
 */
export const documents: DocEntry[] = [
  {
    id: "iso-9001",
    type: "certificate",
    title: "ISO 9001:2015 Registration Certificate",
    description: "Quality-management-system certification covering production, packaging, and supply of silica desiccant.",
    fileHref: isoCertificate.fileHref,
    format: "PDF",
    available: isoCertificate.fileAvailable,
    meta: [
      { label: "Standard", value: isoCertificate.standard },
      { label: "Certificate no.", value: isoCertificate.certificateNumber },
      { label: "Valid to", value: "02 Jul 2029" },
    ],
  },
  {
    id: "sds-silica-gel",
    type: "sds",
    title: "Silica Gel — Safety Data Sheet",
    description: "Composition (silicon dioxide, CAS 7631-86-9), hazards, first-aid, handling, and transport classification. Not classified as dangerous goods (IMDG/IATA).",
    fileHref: "/documents/sds-silica-gel.pdf",
    format: "PDF",
    available: false,
    meta: [
      { label: "CAS", value: "7631-86-9" },
      { label: "HS code", value: "2811.2210" },
    ],
    appliesTo: "All silica gel formats",
  },
  {
    id: "coa-white-bead-2-4mm",
    type: "coa",
    title: "COA — White Silica Gel Bead, 2–4 mm",
    description: "Material certificate of analysis against HG/T 2765.4-2005: SiO₂ ≥ 98%, bulk density, RH adsorption at 20/50/90%, loss on heating, pH, and specific resistance.",
    fileHref: "/documents/coa-white-silica-gel-2-4mm.pdf",
    format: "PDF",
    available: false,
    meta: [
      { label: "Standard", value: "HG/T 2765.4-2005" },
      { label: "Size", value: "2–4 mm" },
    ],
    appliesTo: "White non-indicating bead",
  },
  {
    id: "tds-silica-gel",
    type: "tds",
    title: "Silica Gel — Technical Data Sheet",
    description: "Adsorption capacity by relative humidity, bulk density, pore structure, and regeneration guidance.",
    fileHref: "/documents/tds-silica-gel.pdf",
    format: "PDF",
    available: false,
    appliesTo: "All silica gel formats",
  },
  {
    id: "spec-paper-sachets",
    type: "spec",
    title: "Product Spec — Paper Sachets (0.5–10 g)",
    description: "Sizes, pouch material, fill weights, carton pack, and MOQ context for breathable paper sachets.",
    fileHref: "/documents/spec-paper-sachets.pdf",
    format: "PDF",
    available: false,
    appliesTo: "Paper sachets",
  },
  {
    id: "spec-container-strips",
    type: "spec",
    title: "Product Spec — Container Desiccant Strips (1–5 kg)",
    description: "Hanging-strip formats, capacity, chamber count, and container-dosage guidance for ocean freight.",
    fileHref: "/documents/spec-container-strips.pdf",
    format: "PDF",
    available: false,
    appliesTo: "Container strips",
  },
  {
    id: "dmf-free-statement",
    type: "spec",
    title: "DMF-free Product Statement",
    description: "Product-level statement for buyers who must avoid DMF-risk (dimethyl fumarate) materials.",
    fileHref: "/documents/dmf-free-statement.pdf",
    format: "PDF",
    available: false,
    appliesTo: "All silica gel formats",
  },
];

export const documentsByType = (type: DocumentType) =>
  documents.filter((d) => d.type === type);
