export type ProductType = "white" | "blue" | "orange";
export type PackagingType = "packets" | "canisters" | "bulk beads" | "labels" | "container strips";
export type ProductGrade = "pharma" | "food" | "industrial";
export type IndicatorType = "indicating" | "non-indicating";
export type PacketMaterial = "tyvek" | "paper" | "non-woven" | "pet" | "laminate";
export type ComplianceTagId = "fda-food" | "fda-paper" | "reach" | "rohs" | "iso-9001" | "iso-14001" | "dmf-free" | "cobalt-free";
export type DocumentType = "SDS" | "TDS" | "Certificate";
export type DocumentStatus = "available" | "request";

export interface ComplianceTag {
  id: ComplianceTagId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface ProductRecord {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  description: string;
  heroImage: string;
  type: ProductType;
  packaging: PackagingType[];
  grade: ProductGrade;
  indicatorType: IndicatorType;
  packetMaterial: PacketMaterial[];
  poreProfile: string;
  complianceTags: ComplianceTagId[];
  industryTags: string[];
  documentIds: string[];
  featuredApplications: string[];
  availableFormats: string[];
  regenerationNotes: string;
  leadTime: string;
  priceBand: string;
  technicalHighlights: Array<{
    label: string;
    value: string;
  }>;
}

export interface TechnicalDocument {
  id: string;
  title: string;
  docType: DocumentType;
  audience: string;
  relatedProducts: string[];
  relatedIndustries: string[];
  complianceTags: ComplianceTagId[];
  status: DocumentStatus;
  downloadUrl?: string;
  requestOnly: boolean;
  summary: string;
}

export interface IndustrySolution {
  slug: string;
  sector: string;
  heroTitle: string;
  summary: string;
  marketFocus: string;
  painPoints: string[];
  recommendedProducts: string[];
  requiredCertifications: ComplianceTagId[];
  technicalNotes: string[];
  cta: {
    title: string;
    description: string;
  };
}

export interface ProductFilterState {
  type: ProductType | "all";
  grade: ProductGrade | "all";
  packaging: PackagingType | "all";
  indicatorType: IndicatorType | "all";
  packetMaterial: PacketMaterial | "all";
}

export interface DesiccantCalculationInput {
  climate: "temperate" | "tropical";
  area: number;
  waterVaporTransmissionRate: number;
  months: number;
  dunnageFactor: number;
}

export interface DesiccantCalculationOutput {
  climateMultiplier: number;
  baseWeightGrams: number;
  nearestPacketGrams: number;
  recommendedPacketLabel: string;
  recommendedPacketCount: number;
}
