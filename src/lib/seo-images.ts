export type SeoImage = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

const seoImageSize = {
  width: 1600,
  height: 900,
};

export const seoImages = {
  silicaGelSachets: {
    src: "/seo-images/silica-gel-desiccant-sachets-procurement.webp",
    alt: "White silica gel desiccant sachets with clear beads on an export procurement desk",
    title: "Silica gel desiccant sachets for export packaging",
    caption:
      "White silica gel desiccant sachets for electronics, cartons, pharma-style packaging, and repeat B2B procurement.",
    ...seoImageSize,
  },
  containerDesiccant: {
    src: "/seo-images/container-desiccant-strips-shipping-container.webp",
    alt: "Container desiccant strips hanging inside an export shipping container with palletized cargo",
    title: "Container desiccant strips for ocean freight moisture protection",
    caption:
      "Hanging container desiccant strips for 20ft and 40ft cargo routes where condensation and container rain risk are high.",
    ...seoImageSize,
  },
  industrialBulk: {
    src: "/seo-images/industrial-bulk-silica-gel-desiccant-warehouse.webp",
    alt: "Industrial bulk silica gel desiccant bags and pallets in a warehouse supply setting",
    title: "Industrial bulk silica gel desiccant warehouse supply",
    caption:
      "Bulk silica gel desiccant supply for distributors, warehouses, repackers, and high-volume export buyers.",
    ...seoImageSize,
  },
  pharmaDesiccant: {
    src: "/seo-images/pharma-desiccant-packaging-silica-gel.webp",
    alt: "Silica gel desiccant sachets with pharmaceutical bottles and clean lab packaging",
    title: "Pharma packaging silica gel desiccant visual",
    caption:
      "Clean desiccant packaging visual for pharma, healthcare, diagnostic kits, and regulated buyer discussions.",
    ...seoImageSize,
  },
  foodPackaging: {
    src: "/seo-images/food-packaging-silica-gel-desiccant.webp",
    alt: "Silica gel desiccant sachets arranged near dry food packaging and export cartons",
    title: "Food packaging silica gel desiccant visual",
    caption:
      "Moisture-control support for dry food packaging, cartons, snack packs, spices, and export shelf-stability discussions.",
    ...seoImageSize,
  },
  electronicsPackaging: {
    src: "/seo-images/electronics-packaging-silica-gel-desiccant.webp",
    alt: "Silica gel desiccant sachets beside circuit boards and anti-static electronics packaging",
    title: "Electronics packaging silica gel desiccant visual",
    caption:
      "Silica gel sachets for PCBs, batteries, precision assemblies, anti-static packs, and export electronics cartons.",
    ...seoImageSize,
  },
  desiccantSizing: {
    src: "/seo-images/desiccant-sizing-guide-infographic.webp",
    alt: "Desiccant sizing guide infographic showing sachet sizes for cartons, pallets, and export packaging",
    title: "Desiccant sizing guide infographic",
    caption:
      "Infographic-style desiccant sizing visual for packet selection, carton volume, pallet-level protection, and RFQ planning.",
    ...seoImageSize,
  },
  moistureProtection: {
    src: "/seo-images/moisture-damage-vs-desiccant-protection.webp",
    alt: "Moisture damaged packaging compared with clean desiccant protected export cartons",
    title: "Moisture damage versus desiccant protection comparison",
    caption:
      "Comparison visual showing the commercial risk of humid cargo versus properly protected packaging with desiccants.",
    ...seoImageSize,
  },
  exportLogistics: {
    src: "/seo-images/global-export-logistics-silica-gel-desiccant.webp",
    alt: "Global silica gel export logistics desk with desiccant sachets, documents, pallets, and port cargo",
    title: "Global export logistics for silica gel desiccant supply",
    caption:
      "Export logistics visual for silica gel RFQs, documents, destination markets, pallet planning, and FOB or CIF quote discussions.",
    ...seoImageSize,
  },
  silicaGelVsClay: {
    src: "/seo-images/silica-gel-vs-clay-desiccant-comparison.webp",
    alt: "Side by side comparison of clear silica gel sachets and kraft clay desiccant bags for industrial moisture control",
    title: "Silica gel vs clay desiccant comparison visual",
    caption:
      "Material comparison visual for buyers deciding between silica gel sachets and dry clay desiccant bags by cargo type, cost, and humidity risk.",
    ...seoImageSize,
  },
  silicaGelVsMolecularSieve: {
    src: "/seo-images/silica-gel-vs-molecular-sieve-comparison.webp",
    alt: "Side by side comparison of silica gel beads and molecular sieve pellets in an industrial lab setting",
    title: "Silica gel vs molecular sieve comparison visual",
    caption:
      "Technical comparison visual for buyers comparing general moisture protection with low-humidity molecular sieve applications.",
    ...seoImageSize,
  },
  silicaGelVsOxygenAbsorber: {
    src: "/seo-images/silica-gel-vs-oxygen-absorber-comparison.webp",
    alt: "Side by side comparison of silica gel sachets and oxygen absorber packets for packaging protection",
    title: "Silica gel vs oxygen absorber comparison visual",
    caption:
      "Packaging comparison visual for buyers separating moisture control from oxygen-control requirements.",
    ...seoImageSize,
  },
  buyerGuideProcess: {
    src: "/seo-images/industrial-silica-gel-buyer-guide-process.webp",
    alt: "Industrial silica gel buyer guide process showing packet selection, sizing, humidity check, documents, and pallet shipment",
    title: "Industrial silica gel buyer guide process visual",
    caption:
      "Buyer-guide process visual covering format selection, sizing, humidity exposure, document review, and export shipment planning.",
    ...seoImageSize,
  },
  containerHumidityDamage: {
    src: "/seo-images/shipping-container-humidity-damage-prevention.webp",
    alt: "Shipping container humidity damage prevention with damp cartons, protected pallets, and hanging desiccant strips",
    title: "Shipping container humidity damage prevention visual",
    caption:
      "Container humidity visual showing why desiccant strips and carton-level sachets matter for long-haul export cargo.",
    ...seoImageSize,
  },
  moistureAbsorberCloseup: {
    src: "/seo-images/moisture-absorber-silica-gel-product-closeup.webp",
    alt: "Moisture absorber silica gel sachet sizes, clear bead jar, and bulk desiccant bag on a technical surface",
    title: "Moisture absorber silica gel product closeup",
    caption:
      "Product closeup visual for moisture absorber buyers comparing sachet sizes, bulk bags, and carton insertion formats.",
    ...seoImageSize,
  },
  privateLabelPackaging: {
    src: "/seo-images/private-label-silica-gel-packaging-visual.webp",
    alt: "Private label silica gel sachets with blank white and kraft packets, cartons, and packaging proof sheets",
    title: "Private label silica gel packaging visual",
    caption:
      "OEM and private-label packaging visual for buyers planning sachet artwork, carton labeling, and repeat export packing.",
    ...seoImageSize,
  },
  exportRouteHumidity: {
    src: "/seo-images/export-route-humidity-silica-gel-logistics.webp",
    alt: "Export route humidity planning desk with world map, silica gel sachets, container desiccant samples, and port logistics",
    title: "Export route humidity planning for silica gel logistics",
    caption:
      "Export-route humidity visual for country pages, destination planning, Incoterms, samples, and shipment documentation.",
    ...seoImageSize,
  },
  defaultOg: {
    src: "/seo-images/drygelworld-industrial-silica-gel-og.webp",
    alt: "DryGelWorld industrial silica gel desiccant export supply with products and logistics",
    title: "DryGelWorld industrial silica gel export supply",
    caption:
      "DryGelWorld industrial silica gel and desiccant supply for packaging, bulk buyers, and export logistics.",
    width: 1200,
    height: 630,
  },
} satisfies Record<string, SeoImage>;

export function withPageImageContext(image: SeoImage, context: string): SeoImage {
  return {
    ...image,
    alt: `${context}: ${image.alt}`,
    title: `${context} | ${image.title}`,
  };
}

export function getBlogSeoImage(slug: string) {
  if (slug.includes("private-label") || slug.includes("oem")) {
    return seoImages.privateLabelPackaging;
  }

  if (slug.includes("container-rain") || slug.includes("container") || slug.includes("shipping") || slug.includes("cartons")) {
    return seoImages.containerHumidityDamage;
  }

  if (slug.includes("pharma") || slug.includes("sds") || slug.includes("coa")) {
    return seoImages.pharmaDesiccant;
  }

  if (slug.includes("food")) {
    return seoImages.foodPackaging;
  }

  if (slug.includes("electronics") || slug.includes("pcb")) {
    return seoImages.electronicsPackaging;
  }

  if (slug.includes("size") || slug.includes("sizing") || slug.includes("calculate")) {
    return seoImages.desiccantSizing;
  }

  if (slug.includes("moisture-absorber")) {
    return seoImages.moistureAbsorberCloseup;
  }

  if (slug.includes("moisture") || slug.includes("damage") || slug.includes("prevent")) {
    return seoImages.moistureProtection;
  }

  if (slug.includes("bulk") || slug.includes("wholesale")) {
    return seoImages.industrialBulk;
  }

  if (slug.includes("export") || slug.includes("supplier") || slug.includes("private-label")) {
    return seoImages.exportLogistics;
  }

  return seoImages.silicaGelSachets;
}

export function getIndustrySeoImage(slug: string) {
  if (slug.includes("electronics")) return seoImages.electronicsPackaging;
  if (slug.includes("pharma")) return seoImages.pharmaDesiccant;
  if (slug.includes("food")) return seoImages.foodPackaging;
  if (slug.includes("container")) return seoImages.containerHumidityDamage;
  if (slug.includes("textile") || slug.includes("leather")) return seoImages.moistureProtection;
  return seoImages.silicaGelSachets;
}

export function getCompareSeoImage(slug: string) {
  if (slug.includes("clay")) return seoImages.silicaGelVsClay;
  if (slug.includes("molecular-sieve")) return seoImages.silicaGelVsMolecularSieve;
  if (slug.includes("oxygen-absorber")) return seoImages.silicaGelVsOxygenAbsorber;
  return seoImages.desiccantSizing;
}

export function getExportMarketSeoImage(slug: string) {
  if (/(vietnam|bangladesh|indonesia|malaysia|india|pakistan|brazil|australia)/.test(slug)) {
    return seoImages.containerHumidityDamage;
  }

  if (/(usa|canada|uk|germany|europe|russia|mexico|turkey)/.test(slug)) {
    return seoImages.exportRouteHumidity;
  }

  return seoImages.exportLogistics;
}

export function getLandingSeoImage(page: {
  slug: string;
  kicker: string;
  heroImage?: { alt: string; caption: string };
}) {
  const value = `${page.slug} ${page.kicker}`.toLowerCase();
  let image: SeoImage = seoImages.silicaGelSachets;

  if (/(private-label|private label|oem)/.test(value)) {
    image = seoImages.privateLabelPackaging;
  } else if (/(moisture absorber|moisture-absorber)/.test(value)) {
    image = seoImages.moistureAbsorberCloseup;
  } else if (/(container|cargo|shipping|ocean|strip)/.test(value)) {
    image = seoImages.containerDesiccant;
  } else if (/(pharma|healthcare|sds|coa|document|compliance)/.test(value)) {
    image = seoImages.pharmaDesiccant;
  } else if (/(food|snack|spice)/.test(value)) {
    image = seoImages.foodPackaging;
  } else if (/(electronic|pcb|battery|precision)/.test(value)) {
    image = seoImages.electronicsPackaging;
  } else if (/(bulk|industrial|wholesale|bead|warehouse|distributor)/.test(value)) {
    image = seoImages.industrialBulk;
  } else if (/(size|sizing|calculator|requirement)/.test(value)) {
    image = seoImages.desiccantSizing;
  } else if (/(moisture|absorber|damage|leather|footwear|textile)/.test(value)) {
    image = seoImages.moistureProtection;
  } else if (/(export|supplier|manufacturer|pakistan|karachi|global)/.test(value)) {
    image = seoImages.exportRouteHumidity;
  }

  return {
    ...withPageImageContext(image, page.kicker),
    caption: page.heroImage?.caption || image.caption,
  };
}
