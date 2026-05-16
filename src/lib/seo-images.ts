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
  if (slug.includes("container") || slug.includes("shipping") || slug.includes("cartons")) {
    return seoImages.containerDesiccant;
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
  if (slug.includes("container")) return seoImages.containerDesiccant;
  if (slug.includes("textile") || slug.includes("leather")) return seoImages.moistureProtection;
  return seoImages.silicaGelSachets;
}

export function getLandingSeoImage(page: {
  slug: string;
  kicker: string;
  heroImage?: { alt: string; caption: string };
}) {
  const value = `${page.slug} ${page.kicker}`.toLowerCase();
  let image: SeoImage = seoImages.silicaGelSachets;

  if (/(container|cargo|shipping|ocean|strip)/.test(value)) {
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
  } else if (/(export|supplier|manufacturer|pakistan|karachi|global|private-label|oem)/.test(value)) {
    image = seoImages.exportLogistics;
  }

  return {
    ...withPageImageContext(image, page.kicker),
    caption: page.heroImage?.caption || image.caption,
  };
}
