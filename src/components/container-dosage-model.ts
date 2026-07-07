// Shared dosage model for the container desiccant calculator.
//
// The math is anchored on DryGelWorld's published guidance:
// - "Container rain prevention" article: ~1.5-2 kg (20ft, low-risk, ~20-day
//   route), ~3 kg (20ft high-risk), ~3-4 kg (40ft low-risk, 25-30 days),
//   ~5-6 kg (40ft high-risk, 30+ day tropical routes); silica gel adsorbs
//   up to one-third of its own weight in water vapor; a loaded 40ft box at
//   30C / 80% RH holds close to 1.5 kg of water vapor in its air.
// - "Desiccant units explained: DIN 55473" article: unit-based container
//   specs (~16-24 units per 20ft, ~24-40 units per 40ft general cargo) with
//   1 DIN unit ~ 33 g silica gel.
//
// The constants below are calibrated so the physics-based formula reproduces
// those published kg bands. This module stays a plain (non-client) module so
// the server page can render the same assumptions the client tool computes with.

export const CONTAINERS = [
  { id: "20ft", label: "20ft standard", volumeM3: 33.2 },
  { id: "40ft", label: "40ft standard", volumeM3: 67.7 },
  { id: "40hc", label: "40ft high-cube", volumeM3: 76.4 },
] as const;

export const CARGO_TYPES = [
  {
    id: "non-hygroscopic",
    label: "Non-hygroscopic (metal, plastic, glass)",
    factor: 1.0,
    note: "Cargo neither absorbs nor releases moisture; only the trapped and leaking air must be dried.",
  },
  {
    id: "mixed",
    label: "Mixed cargo",
    factor: 1.1,
    note: "Some components (pallets, corrugated, fillers) release moisture into the container air.",
  },
  {
    id: "hygroscopic",
    label: "Hygroscopic (textiles, leather, paper, wood, food)",
    factor: 1.2,
    note: "The cargo itself carries and releases moisture as temperature cycles, raising the load.",
  },
] as const;

export const PACKAGING_TYPES = [
  {
    id: "cartons",
    label: "Cartons on pallets",
    airFraction: 0.65,
    note: "Typical stow: roughly 65% of the container volume behaves as free, exchangeable air.",
  },
  {
    id: "shrink-wrapped",
    label: "Shrink-wrapped pallets",
    airFraction: 0.55,
    note: "Film reduces the air volume in direct exchange with the cargo surface.",
  },
  {
    id: "loose",
    label: "Loose / unpackaged",
    airFraction: 0.75,
    note: "More of the container volume is open air in contact with the cargo.",
  },
] as const;

export const CLIMATES = [
  {
    id: "dry-temperate",
    label: "Dry / temperate (e.g. Karachi → Gulf, Karachi → EU winter)",
    shortLabel: "Dry / temperate",
    rh: 60,
    tempC: 20,
  },
  {
    id: "mixed-seasonal",
    label: "Mixed / seasonal (e.g. Karachi → EU, cross-season)",
    shortLabel: "Mixed / seasonal",
    rh: 75,
    tempC: 26,
  },
  {
    id: "tropical-humid",
    label: "Tropical / humid (e.g. Karachi → SE Asia monsoon)",
    shortLabel: "Tropical / humid",
    rh: 85,
    tempC: 30,
  },
] as const;

export type ContainerId = (typeof CONTAINERS)[number]["id"];
export type CargoId = (typeof CARGO_TYPES)[number]["id"];
export type PackagingId = (typeof PACKAGING_TYPES)[number]["id"];
export type ClimateId = (typeof CLIMATES)[number]["id"];

/** Effective daily air exchange of a sound, sealed dry box (fraction of container volume per day). */
export const AIR_EXCHANGE_PER_DAY = 0.006;

/**
 * Design working capacity of container-grade silica gel in grams of water per kg.
 * The "up to one-third of its own weight" article figure is a maximum; 30% (300 g/kg)
 * is the design value used here so the recommendation retains a safety margin.
 */
export const WORKING_CAPACITY_G_PER_KG = 300;

export const MIN_DAYS = 7;
export const MAX_DAYS = 90;

/** Saturation water vapor density in g/m3 at temperature T (Celsius), Magnus formula. */
export function saturationVaporDensity(tempC: number): number {
  const esHpa = 6.112 * Math.exp((17.62 * tempC) / (243.12 + tempC));
  // density (g/m3) = e (Pa) / (Rv * T(K)) * 1000, Rv = 461.5 J/(kg K)
  return (esHpa * 100 * 1000) / (461.5 * (tempC + 273.15));
}

export interface DosageInput {
  container: ContainerId;
  cargo: CargoId;
  packaging: PackagingId;
  days: number;
  rhPercent: number;
  tempC: number;
}

export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface DosageResult {
  containerLabel: string;
  volumeM3: number;
  airFraction: number;
  absoluteHumidityGm3: number;
  airWaterG: number;
  ingressWaterG: number;
  cargoFactor: number;
  totalWaterG: number;
  litres: number;
  exactKg: number;
  recommendedKg: number;
  stripFormat: string;
  stripCount: number;
  stripUnitKg: number;
  suppliedKg: number;
  dinUnits: number;
  risk: { level: RiskLevel; label: string; explanation: string };
  longVoyage: boolean;
}

const RISK_COPY: Record<RiskLevel, { label: string; explanation: string }> = {
  low: {
    label: "Low",
    explanation:
      "Short or dry-lane exposure - baseline strip dosing at the ceiling line covers the expected moisture load.",
  },
  moderate: {
    label: "Moderate",
    explanation:
      "Typical export exposure - dose to the recommendation and distribute strips evenly along the ceiling.",
  },
  high: {
    label: "High",
    explanation:
      "Long or humid exposure with repeated condensation cycles - dose fully and add carton-level sachets for sensitive goods.",
  },
  severe: {
    label: "Severe",
    explanation:
      "Sustained tropical humidity and/or moisture-releasing cargo - combine full strip dosing with sealed liners and carton-level sachets.",
  },
};

export function computeDosage(input: DosageInput): DosageResult {
  const container = CONTAINERS.find((c) => c.id === input.container) ?? CONTAINERS[1];
  const cargo = CARGO_TYPES.find((c) => c.id === input.cargo) ?? CARGO_TYPES[1];
  const packaging = PACKAGING_TYPES.find((p) => p.id === input.packaging) ?? PACKAGING_TYPES[0];

  const days = Math.min(Math.max(input.days, MIN_DAYS), MAX_DAYS);
  const rh = Math.min(Math.max(input.rhPercent, 30), 100);
  const tempC = Math.min(Math.max(input.tempC, 0), 45);

  const absoluteHumidityGm3 = saturationVaporDensity(tempC) * (rh / 100);
  const airWaterG = container.volumeM3 * packaging.airFraction * absoluteHumidityGm3;
  const ingressWaterG = AIR_EXCHANGE_PER_DAY * container.volumeM3 * absoluteHumidityGm3 * days;
  const totalWaterG = (airWaterG + ingressWaterG) * cargo.factor;

  const exactKg = totalWaterG / WORKING_CAPACITY_G_PER_KG;
  const recommendedKg = Math.max(1, Math.ceil(exactKg * 2) / 2);

  let stripFormat: string;
  let stripUnitKg: number;
  let stripCount: number;
  if (recommendedKg <= 10) {
    stripFormat = "1 kg container desiccant strips";
    stripUnitKg = 1;
    stripCount = Math.max(1, Math.ceil(exactKg));
  } else {
    stripFormat = "2 kg strips / bulk desiccant bags";
    stripUnitKg = 2;
    stripCount = Math.ceil(exactKg / 2);
  }
  const suppliedKg = stripCount * stripUnitKg;

  // DIN 55473 cross-reference: 1 unit ~ 33 g of silica gel (units article).
  const dinUnits = Math.round((recommendedKg * 1000) / 33);

  const density = totalWaterG / container.volumeM3; // g of water per m3 of container
  const level: RiskLevel = density < 10 ? "low" : density < 18 ? "moderate" : density < 28 ? "high" : "severe";

  return {
    containerLabel: container.label,
    volumeM3: container.volumeM3,
    airFraction: packaging.airFraction,
    absoluteHumidityGm3,
    airWaterG,
    ingressWaterG,
    cargoFactor: cargo.factor,
    totalWaterG,
    litres: totalWaterG / 1000,
    exactKg,
    recommendedKg,
    stripFormat,
    stripCount,
    stripUnitKg,
    suppliedKg,
    dinUnits,
    risk: { level, ...RISK_COPY[level] },
    longVoyage: days > 50,
  };
}
