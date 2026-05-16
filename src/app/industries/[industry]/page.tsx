import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd } from "@/lib/seo";
import styles from "../../strategy-pages.module.css";

const industryPages = {
  "electronics-packaging": {
    title: "Silica Gel for Electronics Packaging",
    h1: "Moisture protection for electronics, PCBs, batteries, and precision assemblies.",
    description:
      "Silica gel desiccant packets for electronics packaging, circuit boards, batteries, precision assemblies, and export cartons.",
    points: [
      "Protect circuit boards, connectors, batteries, and device assemblies during storage and shipment.",
      "Use small sachets for unit packaging and larger formats for master cartons.",
      "Request SDS, COA, and RoHS/REACH support when electronics buyers require documentation.",
    ],
  },
  "pharma-packaging": {
    title: "Desiccant for Pharma Packaging",
    h1: "Documentation-ready desiccant supply for pharma and healthcare packaging.",
    description:
      "Desiccant packets for pharma packaging, healthcare cartons, pill bottles, diagnostic kits, and regulated export requirements.",
    points: [
      "Align packet material, size, warning text, and document requirements before quoting.",
      "Route buyers to SDS, COA, food/pharma support, and batch documentation discussions.",
      "Use clean product photography and compliance proof to build trust with regulated buyers.",
    ],
  },
  "leather-footwear-export": {
    title: "Silica Gel for Leather and Footwear Export",
    h1: "Reduce humidity risk in footwear, garments, leather goods, and export cartons.",
    description:
      "Silica gel sachets for leather export, footwear cartons, garments, textiles, mold prevention, and long-haul logistics.",
    points: [
      "Target mold, odor, finish damage, and warehouse humidity risks in export cartons.",
      "Offer printed sachets and carton-level packing guidance for footwear brands and exporters.",
      "Build landing-page copy around buyer losses: claims, returns, and damaged stock.",
    ],
  },
  "food-packaging": {
    title: "Desiccant for Food Packaging",
    h1: "Moisture-control support for food packaging and dry-goods exporters.",
    description:
      "Food packaging desiccant guidance for dry goods, snacks, spices, cartons, compliance support, and export moisture control.",
    points: [
      "Only show food-grade or FDA/FSSC claims where valid documentation exists.",
      "Focus copy on dry goods, carton protection, shelf stability, and buyer documentation.",
      "Route regulated inquiries into the RFQ form before commercial confirmation.",
    ],
  },
  "textile-garment-export": {
    title: "Silica Gel for Textile and Garment Export",
    h1: "Reduce mildew, dye-migration, and odor risk in textile and garment export cartons.",
    description:
      "Silica gel sachets and bulk desiccant for textile mills, garment exporters, fabric rolls, and long-haul humid routes from South Asia to USA, EU, and the Middle East.",
    points: [
      "Mildew, dye migration, and musty-odor claims are the failure modes garment buyers reject for. Size desiccant against humidity exposure, not unit volume alone.",
      "Use 10g-50g sachets per carton on long-haul routes; container-ceiling cargo strips on trans-equatorial passages.",
      "Combine desiccant with kiln-dried pallets and 24-48h pre-pack moisture conditioning of the fabric itself.",
    ],
  },
  "container-shipping": {
    title: "Container Desiccant for Ocean Freight",
    h1: "Container desiccant supply for sealed ocean freight, transit humidity, and condensation cycling.",
    description:
      "Container desiccant strips, pole desiccants, and bulk silica gel for 20ft and 40ft containers on transpacific, trans-Atlantic, and trans-equatorial routes.",
    points: [
      "Standard loading: 6-10 strips per 20ft container, 10-16 per 40ft. Long-haul tropical routes use the upper end.",
      "Container desiccant is single-voyage consumable. For reusable closed-loop applications, regenerable bulk silica gel beads are the right product.",
      "Match strip placement (ceiling, corrugations) to cargo geometry; even distribution beats concentrated placement.",
    ],
  },
};

type IndustrySlug = keyof typeof industryPages;
type IndustryPageProps = {
  params: Promise<{
    industry: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(industryPages).map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const page = industryPages[industry as IndustrySlug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/industries/${industry}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: IndustryPageProps) {
  const { industry } = await params;
  const page = industryPages[industry as IndustrySlug];

  if (!page) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industry Solution</span>
        <h1>{page.h1}</h1>
        <p>{page.description}</p>
        <Link href="/contact" className={styles.cta}>Request Industry Quote</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>What this page should prove to buyers.</h2>
          <p>
            Each industry page should become a focused landing page with use-case visuals,
            product sizing, compliance language, and export inquiry routing.
          </p>
        </div>
        <div className={styles.grid}>
          {page.points.map((point, index) => (
            <article className={styles.card} key={point}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>Buyer requirement</h3>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Industries", href: "/industries/electronics-packaging" },
              { name: page.title, href: `/industries/${industry}` },
            ]),
          ),
        }}
      />
    </main>
  );
}
