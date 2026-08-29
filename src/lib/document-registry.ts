/*
 * Document registry, single source of truth for the downloadable
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

export type DocumentType =
  | "certificate"
  | "declaration"
  | "sds"
  | "coa"
  | "tds"
  | "spec"
  | "profile";

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
  {
    key: "declaration",
    label: "Supplier Declarations",
    blurb: "Statements issued and signed by the manufacturer. Not third-party certification.",
  },
  { key: "sds", label: "Safety Data Sheets (SDS)", blurb: "Handling, storage, and transport safety data." },
  { key: "coa", label: "Certificates of Analysis (COA)", blurb: "Batch/material test results against a published standard." },
  { key: "tds", label: "Technical Data Sheets (TDS)", blurb: "Adsorption performance and physical properties." },
  { key: "spec", label: "Product Specifications", blurb: "Format, size range, packing, and MOQ context per SKU." },
  { key: "profile", label: "Company Profile", blurb: "Overview of the company, facilities, and product range." },
];

/*
 * ── ISO 9001:2015 registration certificate ──────────────────────────────
 * Values transcribed EXACTLY from the physical certificate:
 *   Legal entity   Kamran Enterprises (trading as DryGelWorld)
 *   Certificate    BS EN ISO 9001:2015, no. 9101225
 *   Scope          Packaging and Supply of Silica Desiccant (NACE 8292)
 *   Approved       10-12-2025   Expiry 09-12-2028   (03-year validity)
 *   Registrar      QMEC Group Intl (Essex, UK)
 *   Accreditation  IAS-CB, Acc. no. 17240831   Verify: qmecgroup.org
 */
export const isoCertificate = {
  standard: "BS EN ISO 9001:2015",
  scope: "Packaging and Supply of Silica Desiccant",
  naceCode: "8292",
  certificateNumber: "9101225",
  registrar: "QMEC Group Intl (Essex, UK)",
  accreditationBody: "IAS-CB",
  verificationAccountNo: "17240831",
  verificationUrl: "qmecgroup.org",
  approvalDate: "2025-12-10",
  expiryDate: "2028-12-09",
  validityYears: 3,
  legalEntity: "Kamran Enterprises",
  tradingAs: "DryGelWorld",
  awardedTo: "Kamran Enterprises (trading as DryGelWorld)",
  tradingBrandNote: "DryGelWorld is the trading brand of Kamran Enterprises.",
  registeredAddress: "A-488, Block 1, Gulshan-e-Iqbal, Karachi 74000, Pakistan",
  /** Real certificate PDF, committed to /public/documents/. */
  fileHref: "/documents/iso-9001-2015-drygelworld.pdf",
  fileAvailable: true,
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
    description: "Quality-management-system certification covering the packaging and supply of silica desiccant. DryGelWorld is the trading brand of Kamran Enterprises.",
    fileHref: isoCertificate.fileHref,
    format: "PDF",
    available: isoCertificate.fileAvailable,
    meta: [
      { label: "Standard", value: isoCertificate.standard },
      { label: "Certificate no.", value: isoCertificate.certificateNumber },
      { label: "Valid to", value: "09 Dec 2028" },
    ],
  },
  {
    id: "iso-9001-scan",
    type: "certificate",
    title: "ISO 9001:2015 Certificate (scanned copy)",
    description: "Scanned copy of the ISO 9001:2015 registration certificate issued to Kamran Enterprises (trading as DryGelWorld).",
    fileHref: "/documents/iso-9001-2015-certificate-scan.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "Standard", value: "ISO 9001:2015" },
      { label: "Certificate no.", value: "9101225" },
    ],
  },
  {
    id: "packaging-materials-declaration",
    type: "declaration",
    title: "Packaging & Materials Declaration",
    description:
      "Signed supplier declaration: sachet substrates supplied, desiccant material identities, the test reports held on file, and - stated plainly - the certifications this company does not hold.",
    fileHref: "/documents/packaging-materials-declaration.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "Reference", value: "DGW-PMD-2026-01" },
      { label: "Issued", value: "29 Aug 2026" },
      { label: "Issued by", value: "DryGelWorld (self-declared)" },
    ],
    appliesTo: "Silica gel and clay desiccant",
  },
  {
    id: "sds-silica-gel",
    type: "sds",
    title: "Silica Gel: Safety Data Sheet",
    description: "Composition (silicon dioxide, CAS 7631-86-9), hazards, first-aid, handling, and transport classification. Not classified as dangerous goods (IMDG/IATA).",
    fileHref: "/documents/sds-silica-gel.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "CAS", value: "7631-86-9" },
      { label: "HS code", value: "2811.2210" },
    ],
    appliesTo: "All silica gel formats",
  },
  // ── Material COAs ────────────────────────────────────────────────────────
  // These are the SOURCE MILL's certificates, on the mill's letterhead, and the
  // titles say so. That is the normal and correct document in this trade: the
  // buyer wants the batch that was actually tested, not a re-typed copy. What
  // would not be correct is letting a buyer download a Chinese mill's stamped
  // certificate under a title implying we ran the tests ourselves. Bead stock is
  // bought in and converted here; the About page already says so, and these
  // titles keep the documentation page telling the same story.
  {
    id: "coa-white-bead-2-4mm",
    type: "coa",
    title: "COA: White Silica Gel Bead, 2–4 mm (origin mill certificate)",
    description: "Batch certificate of analysis from the source mill, against HG/T 2765.4-2005: SiO₂ ≥ 98%, bulk density, RH adsorption at 20/50/90%, loss on heating, pH, and specific resistance. Conversion, sachet filling, and packing are done at our Karachi facility.",
    fileHref: "/documents/coa-white-silica-gel-2-4mm.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "Standard", value: "HG/T 2765.4-2005" },
      { label: "Size", value: "2–4 mm" },
      { label: "Valid to", value: "Jul 2027" },
    ],
    appliesTo: "White non-indicating bead",
  },
  {
    id: "coa-blue-bead-2-4mm",
    type: "coa",
    title: "COA: Blue Indicating Silica Gel Bead, 2–4 mm (origin mill certificate)",
    description: "Batch certificate of analysis from the source mill, against HG/T 2765.4-2005: bulk density, RH adsorption at 20/35/50%, colour change point, and loss on heating. Blue indicating gel contains cobalt chloride and is not cobalt-free; the cobalt-free indicating option is the orange grade.",
    fileHref: "/documents/coa-blue-indicating-silica-gel-2-4mm.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "Standard", value: "HG/T 2765.4-2005" },
      { label: "Size", value: "2–4 mm" },
      { label: "Valid to", value: "Jan 2027" },
    ],
    appliesTo: "Blue indicating bead",
  },
  {
    id: "coa-activated-clay-2-4mm",
    type: "coa",
    title: "COA: Activated Clay Desiccant, 2–4 mm (origin mill certificate)",
    description: "Batch certificate of analysis from the source mill: qualified size ratio, bulk density, adsorption at 90% RH, loss on heating, and pH.",
    fileHref: "/documents/coa-activated-clay-2-4mm.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "Size", value: "2–4 mm" },
      { label: "HS code", value: "3824.9999" },
    ],
    appliesTo: "Activated clay desiccant",
  },
  {
    id: "sds-activated-clay",
    type: "sds",
    title: "Activated Clay Desiccant: Safety Data Sheet",
    description: "Composition (attapulgite clay ≥ 90%, CAS 12174-11-7; calcium chloride ≤ 10%, CAS 10043-52-4), hazards, first-aid, handling, and transport. Not classified as dangerous cargo. Notes that the material may contain trace crystalline silica.",
    fileHref: "/documents/sds-activated-clay.pdf",
    format: "PDF",
    available: true,
    meta: [
      { label: "CAS", value: "12174-11-7" },
      { label: "HS code", value: "3824.9999" },
    ],
    appliesTo: "Activated clay desiccant",
  },
  {
    id: "tds-silica-gel",
    type: "tds",
    title: "Silica Gel: Technical Data Sheet",
    description: "Adsorption capacity by relative humidity, bulk density, pore structure, and regeneration guidance.",
    fileHref: "/documents/tds-silica-gel.pdf",
    format: "PDF",
    available: true,
    appliesTo: "All silica gel formats",
  },
  {
    id: "spec-paper-sachets",
    type: "spec",
    title: "Product Spec: Paper Sachets (0.5–10 g)",
    description: "Sizes, pouch material, fill weights, carton pack, and MOQ context for breathable paper sachets.",
    fileHref: "/documents/spec-paper-sachets.pdf",
    format: "PDF",
    available: true,
    appliesTo: "Paper sachets",
  },
  {
    id: "spec-container-strips",
    type: "spec",
    title: "Product Spec: Container Desiccant Strips (1–5 kg)",
    description: "Hanging-strip formats, capacity, chamber count, and container-dosage guidance for ocean freight.",
    fileHref: "/documents/spec-container-strips.pdf",
    format: "PDF",
    available: true,
    appliesTo: "Container strips",
  },
  {
    id: "dmf-free-statement",
    type: "spec",
    title: "DMF-free Product Statement",
    description: "Product-level statement for buyers who must avoid DMF-risk (dimethyl fumarate) materials.",
    fileHref: "/documents/dmf-free-statement.pdf",
    format: "PDF",
    available: true,
    appliesTo: "All silica gel formats",
  },
  {
    id: "company-profile",
    type: "profile",
    title: "DryGelWorld Company Profile & Product Catalogue",
    description: "Company overview, manufacturing background since 1983, product range, and the industries served, with ISO 9001:2015, SDS, COA, and DMF-free documentation referenced throughout.",
    fileHref: "/documents/company-profile.pdf",
    format: "PDF",
    available: true,
  },
];

export const documentsByType = (type: DocumentType) =>
  documents.filter((d) => d.type === type);
