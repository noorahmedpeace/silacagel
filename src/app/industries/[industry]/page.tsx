import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, brandName, breadcrumbJsonLd } from "@/lib/seo";
import { getIndustrySeoImage, withPageImageContext } from "@/lib/seo-images";
import styles from "../../strategy-pages.module.css";

type IndustryFormat = { label: string; text: string };
type IndustryBody = {
  heading: string;
  intro: string;
  formatsHeading: string;
  formats: IndustryFormat[];
  closingHeading: string;
  closing: string;
};
type IndustryFaq = { question: string; answer: string };
type IndustryPage = {
  title: string;
  h1: string;
  description: string;
  points: string[];
  // Optional on-page SEO content. When present, the rich body + FAQ render
  // instead of the generic "buyer requirement" scaffolding, and a FAQPage
  // node is added to the JSON-LD graph.
  metaTitle?: string;
  metaDescription?: string;
  body?: IndustryBody;
  faqHeading?: string;
  faqs?: IndustryFaq[];
  relatedLinks?: Array<{ label: string; href: string }>;
};

const industryPages: Record<string, IndustryPage> = {
  "electronics-packaging": {
    title: "Silica Gel for Electronics Packaging",
    metaTitle: "Silica Gel Desiccant for Electronics & PCB Packaging",
    metaDescription:
      "Anti-static & standard silica gel desiccant packets for PCBs, batteries & electronics export cartons. Prevent corrosion in ocean freight. Get an RFQ.",
    h1: "Moisture protection for electronics, PCBs, batteries, and precision assemblies.",
    description:
      "Silica gel desiccant packets for electronics packaging, circuit boards, batteries, precision assemblies, and export cartons.",
    points: [
      "Protect circuit boards, connectors, batteries, and device assemblies during storage and shipment.",
      "Use small sachets for unit packaging and larger formats for master cartons.",
      "Request SDS, COA, and RoHS/REACH support when electronics buyers require documentation.",
    ],
    body: {
      heading: "Moisture protection for electronics, PCBs, and batteries",
      intro:
        "Electronics and precision assemblies are highly sensitive to humidity during storage and ocean freight. DryGelWorld supplies anti-static and standard silica gel sachets sized for circuit boards, connectors, battery packs, and master export cartons — with the documentation electronics exporters require.",
      formatsHeading: "Product formats for electronics buyers",
      formats: [
        { label: "Unit-level sachets", text: "Small packets for individual PCBs and connectors." },
        { label: "Anti-static / ESD-safe options", text: "For sensitive electronic components." },
        { label: "Master-carton desiccants", text: "Larger formats for palletized export cartons." },
      ],
      closingHeading: "Why moisture control matters for electronics export",
      closing:
        "Condensation inside sealed cartons (“container rain”) causes corrosion on solder joints, contacts, and battery terminals. Correctly sized silica gel keeps relative humidity below the corrosion threshold.",
    },
    faqHeading: "Electronics desiccant — buyer FAQs",
    faqs: [
      {
        question: "What silica gel is best for packaging electronics and PCBs?",
        answer:
          "Standard or anti-static (ESD-safe) silica gel sachets are used for PCBs, connectors, and battery assemblies. Packet size is matched to sealed volume and transit duration.",
      },
      {
        question: "How much silica gel do I need per carton?",
        answer:
          "Dosage depends on enclosed air volume, barrier material, and transit time. Send carton dimensions and route details in an RFQ and we recommend packet size and quantity.",
      },
      {
        question: "Do you offer anti-static desiccant packets?",
        answer:
          "Yes. We supply ESD-safe desiccant packets for sensitive electronic components alongside standard sachets.",
      },
      {
        question: "Can silica gel prevent corrosion during ocean freight?",
        answer:
          "Yes. Correctly sized silica gel holds humidity below the corrosion threshold, preventing condensation damage during long-haul container shipping.",
      },
    ],
    relatedLinks: [
      { label: "Silica gel packets for electronics", href: "/silica-gel-packets" },
    ],
  },
  "pharma-packaging": {
    title: "Desiccant for Pharma Packaging",
    metaTitle: "Pharma Desiccant Packets | SDS/COA-Ready Healthcare Packaging",
    metaDescription:
      "Pharma-grade silica gel desiccant packets and canisters for pill bottles, blister cartons & diagnostic kits. SDS, COA, batch docs. Export RFQ in 24h.",
    h1: "Documentation-ready desiccant supply for pharma and healthcare packaging.",
    description:
      "Desiccant packets for pharma packaging, healthcare cartons, pill bottles, diagnostic kits, and regulated export requirements.",
    points: [
      "Align packet material, size, warning text, and document requirements before quoting.",
      "Route buyers to SDS, COA, food/pharma support, and batch documentation discussions.",
      "Use clean product photography and compliance proof to build trust with regulated buyers.",
    ],
    body: {
      heading: "Desiccant requirements for pharmaceutical & healthcare packaging",
      intro:
        "Pharmaceutical and nutraceutical packaging needs desiccants that protect moisture-sensitive products while matching strict documentation and labeling requirements. DryGelWorld supplies silica gel packets and canisters for pill bottles, blister cartons, diagnostic kits, and regulated export shipments — with SDS, COA, and batch documentation available for every order.",
      formatsHeading: "Product formats for pharma buyers",
      formats: [
        { label: "Pharma-grade silica gel packets", text: "Tyvek and printed sachets for pill bottles, vials, and unit cartons." },
        { label: "Canister desiccants", text: "Rigid canisters for tablet and capsule bottles." },
        { label: "Master-carton desiccants", text: "Larger packs for export cartons and pallets." },
      ],
      closingHeading: "Documentation we provide",
      closing:
        "Every quote can include Safety Data Sheets (SDS), Certificates of Analysis (COA), “DO NOT EAT” warning compliance, and batch-level documentation for regulated supply chains.",
    },
    faqHeading: "Pharma desiccant — buyer FAQs",
    faqs: [
      {
        question: "What grade of silica gel is used for pharmaceutical packaging?",
        answer:
          "Pharmaceutical packaging typically uses high-purity, food/pharma-grade silica gel in Tyvek or printed sachets and rigid canisters, supplied with SDS and COA documentation.",
      },
      {
        question: "Do your pharma desiccants come with SDS and COA documentation?",
        answer:
          "Yes. Every pharma order can include Safety Data Sheets, Certificates of Analysis, and batch documentation for regulated and audited buyers.",
      },
      {
        question: "Can you supply desiccants for pill bottles and diagnostic kits?",
        answer:
          "Yes. We supply canister desiccants for tablet bottles, small sachets for diagnostic kits, and master-carton packs for export healthcare shipments.",
      },
      {
        question: "What is the minimum order quantity for pharma desiccants?",
        answer:
          "MOQs depend on format. Send your product type, packet size, and annual volume in an RFQ and we confirm MOQ, lead time, and Incoterms within 24 hours.",
      },
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
  "automotive-parts": {
    title: "Silica Gel for Automotive Parts Export",
    h1: "Moisture and corrosion protection for exported automotive parts and components.",
    description:
      "Silica gel sachets and container desiccants for automotive parts exporters — protecting bearings, electronics, and metal components from rust and condensation during ocean freight and warehouse storage.",
    points: [
      "Metal automotive components rust when container condensation forms on long-haul routes — sachets at the carton level plus container strips protect the part and the packaging.",
      "Match sachet dosage to carton volume and route humidity; add bulk desiccant for high-value bearings and electronic control units.",
      "Request SDS, COA, and DMF-free documentation for buyers who audit packaging in incoming-quality checks.",
    ],
  },
  "defense-and-ammunition-packaging": {
    title: "Silica Gel for Defense and Ammunition Packaging",
    h1: "Moisture and corrosion control for defense components, ammunition, and military spare-parts packaging.",
    description:
      "Silica gel and clay desiccant for defense-sector packaging — protecting metal components, ammunition, optics, and spare parts from corrosion and condensation in sealed transit and long-term storage.",
    points: [
      "Defense and ammunition packaging fails through corrosion and condensation on metal parts, primers, and optics — desiccant holds the sealed-pack humidity below the point where that damage starts.",
      "Military specifications (such as MIL-D-3464) and desiccant 'unit' counts (DIN 55473) are buyer-supplied requirements: tell us the unit count and spec your contract calls for and we quote silica gel or clay to meet it. DryGelWorld holds ISO 9001:2015 + a DMF-free statement and does not claim a MIL-spec qualification itself.",
      "Pair carton-level sachets with container strips for sealed long-term storage; request SDS, COA, and unit-count documentation for incoming-quality audits.",
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

  const heroImage = withPageImageContext(getIndustrySeoImage(industry), page.title);
  const metaTitle = page.metaTitle ?? page.title;
  const metaDescription = page.metaDescription ?? page.description;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/industries/${industry}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/industries/${industry}`,
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [heroImage.src],
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

  const heroImage = withPageImageContext(getIndustrySeoImage(industry), page.title);
  const pageUrl = absoluteUrl(`/industries/${industry}`);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/electronics-packaging" },
    { name: page.title, href: `/industries/${industry}` },
  ]);
  const industryJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: pageUrl,
        image: absoluteUrl(heroImage.src),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteUrl()}#website`,
          name: brandName,
        },
      },
      {
        "@type": "Service",
        name: page.title,
        serviceType: "Industrial desiccant application support",
        description: page.description,
        image: absoluteUrl(heroImage.src),
        provider: {
          "@type": "Organization",
          "@id": `${absoluteUrl()}#organization`,
          name: brandName,
        },
      },
      {
        "@type": breadcrumb["@type"],
        itemListElement: breadcrumb.itemListElement,
      },
      ...(page.faqs
        ? [
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Industry Solution</span>
        <h1>{page.h1}</h1>
        <p>{page.description}</p>
        <Link href="/contact" className={styles.cta}>Request Industry Quote</Link>
      </section>

      <figure className={styles.articleVisual}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          title={heroImage.title}
          fill
          className={styles.articleVisualImage}
          sizes="(max-width: 900px) 100vw, 920px"
          priority
        />
        <figcaption>{heroImage.caption}</figcaption>
      </figure>

      {page.body ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.body.heading}</h2>
            <p>{page.body.intro}</p>
          </div>
          <div className={styles.sectionHead}>
            <h3>{page.body.formatsHeading}</h3>
          </div>
          <div className={styles.grid}>
            {page.body.formats.map((format) => (
              <article className={styles.card} key={format.label}>
                <h3>{format.label}</h3>
                <p>{format.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.sectionHead}>
            <h3>{page.body.closingHeading}</h3>
            <p>{page.body.closing}</p>
          </div>
        </section>
      ) : (
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
      )}

      {page.faqs ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>{page.faqHeading ?? "Buyer FAQs"}</h2>
          </div>
          <div className={styles.grid}>
            {page.faqs.map((faq) => (
              <article className={styles.card} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.relatedLinks ? (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Related products &amp; guides</h2>
          </div>
          <div className={styles.grid}>
            {page.relatedLinks.map((link) => (
              <article className={styles.card} key={link.href}>
                <h3>
                  <Link href={link.href}>{link.label}</Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industryJsonLd),
        }}
      />
    </main>
  );
}
