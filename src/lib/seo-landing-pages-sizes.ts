/*
 * Gram-size silica gel sachet landing pages (1 g / 2 g / 5 g / 10 g).
 *
 * Why these exist: buyers search by fill weight ("1g silica gel sachets",
 * "5g silica gel packets") and the site had no URL per size. Each page is a
 * real commercial page for one fill weight - dosage guidance, applications,
 * materials, MOQ/lead-time/export terms, and FAQs - not a keyword swap.
 *
 * HONESTY DISCIPLINE (same as product-spec.ts and /certifications): only
 * ISO 9001:2015 (cert. 9101225) and a DMF-free statement are claimed. FDA,
 * food-contact, pharma GMP, Halal and REACH are NOT held and must never be
 * implied. Commercial figures (MOQ, exact price, sachet dimensions, count per
 * carton) are quoted per order, so they read "confirmed at quote". The only
 * price figures cited are the indicative USD references already published on
 * /pricing (src/lib/product-data.ts priceGroups).
 *
 * Adsorption numbers are derived from the site's own published capacity
 * (~33% of own weight at 25 °C / 90% RH) and the DIN 55473 desiccant-unit
 * definition; they are stated as approximations.
 *
 * These entries are wrapped with keywordClusterPage() in seo-landing-pages.ts
 * so they inherit the standard RFQ specs, buying steps, metadata, and JSON-LD.
 */

import type { KeywordClusterInput, SeoLandingPage } from "./seo-landing-pages";

const SACHET_IMAGE = "/products/white-nonindicating-clean-sachets.webp";

const sachetMaterialsGuide: NonNullable<SeoLandingPage["buyerGuide"]>["sections"] = [
  {
    label: "Materials",
    title: "Breathable paper, technical fibre, or non-woven",
    text: "Small sachets are supplied in breathable paper as standard, with technical-fibre and non-woven outers for lower dust, higher tear strength, or automated insertion. The outer controls dust and print quality, not adsorption capacity: the silica gel inside is the same amorphous silicon dioxide (CAS 7631-86-9) in every material.",
  },
  {
    label: "Printing",
    title: "Warning text and private label",
    text: "Every sachet carries a 'Do not eat' / 'Throw away' warning as standard. Custom-printed sachets with buyer branding, multi-language warning text, or lot codes are available as a private-label run; printed orders add roughly 5-10 days to the standard lead time and are confirmed at artwork sign-off.",
  },
  {
    label: "Documents",
    title: "ISO 9001:2015, SDS, COA, DMF-free",
    text: "DryGelWorld holds ISO 9001:2015 (certificate 9101225) and issues an SDS, a batch-level COA, and a DMF-free product statement on request. FDA, food-contact, pharma GMP, Halal, and REACH certifications are not held; buyers in those regulated lanes should confirm the requirement before ordering.",
  },
];

const exportFaqs: SeoLandingPage["faqs"] = [
  {
    question: "Can you export silica gel sachets worldwide?",
    answer:
      "Yes. DryGelWorld manufactures in Karachi, Pakistan and exports sachets to importers, distributors, and packagers on EXW, FOB Karachi, CIF, and DAP terms. Country-specific routing, customs, and document notes are on the export pages for the UAE, Saudi Arabia, USA, UK, Germany, India, Australia, and other markets.",
  },
  {
    question: "What is the HS code for silica gel sachets?",
    answer:
      "Silica gel desiccant is classified under HS 2811.22 (silicon dioxide). National suffixes vary, so confirm the full code with your customs broker. The site's import and customs guide covers the common variations.",
  },
  {
    question: "How long do sealed silica gel sachets last before use?",
    answer:
      "Unopened sachets in the sealed factory pouch or liner typically keep their capacity for 24-36 months. Once the outer pouch is opened, sachets start adsorbing ambient moisture, so reseal unused sachets and use them within days, not weeks.",
  },
];

export const gramSizeLandingInputs = {
  "1g-silica-gel-sachets": {
    slug: "1g-silica-gel-sachets",
    title: "1g Silica Gel Sachets | Manufacturer, Wholesale & Export",
    metaDescription:
      "1g silica gel sachets from a Karachi manufacturer: dosage per pack, paper and non-woven materials, custom printing, MOQ, indicative USD pricing, and worldwide export. ISO 9001:2015. Request a quote.",
    kicker: "1g silica gel sachets",
    h1: "1g silica gel sachets: manufacturer-direct supply for unit packaging, wholesale, and export.",
    lead:
      "DryGelWorld manufactures 1 gram silica gel sachets in Karachi, Pakistan and supplies them wholesale to packagers, distributors, and exporters worldwide. This page covers what a 1g sachet protects, how many to use, sachet materials, custom printing, MOQ, indicative pricing, and how to request a quote.",
    searchIntent:
      "Commercial and B2B: 1g silica gel, 1g silica gel sachet, 1 gram silica gel packet, 1g desiccant sachet, 1g silica gel wholesale / manufacturer / supplier / exporter, bulk and custom 1g sachets.",
    primaryCta: "Request 1g Sachet Quote",
    secondaryCta: "See all packet sizes",
    secondaryHref: "/silica-gel-packets",
    proofPoints: [
      "Manufacturer since 1983, Karachi",
      "ISO 9001:2015 (cert. 9101225)",
      "Paper, technical-fibre & non-woven",
      "Custom print & private label",
    ],
    image: SACHET_IMAGE,
    imageAlt: "1g white silica gel sachets in breathable paper, manufactured by DryGelWorld in Karachi",
    imageCaption:
      "1g silica gel sachets are the standard fill weight for pill bottles, electronics accessory packs, and small retail boxes.",
    chips: ["1 gram", "Unit packaging", "Wholesale", "Export"],
    fitTitle: "What a 1g silica gel sachet is for",
    useCases: [
      {
        label: "Pharma & nutraceutical",
        title: "Pill bottles and blister cartons",
        text: "One 1g sachet is the common insert for tablet and capsule bottles up to roughly 100-150 ml and for small secondary cartons. DryGelWorld supplies the sachet with SDS, COA, and a DMF-free statement; direct-contact pharma programs that need an FDA DMF should confirm that requirement first.",
      },
      {
        label: "Electronics",
        title: "Accessory packs, cables, small PCBs",
        text: "A 1g sachet inside a sealed accessory pouch, earphone box, or small component bag keeps relative humidity down during storage and shipment without adding bulk. Pair with a moisture-barrier bag for moisture-sensitive components.",
      },
      {
        label: "Retail & export cartons",
        title: "Shoe boxes, leather goods, small consumer packs",
        text: "For footwear, wallets, belts, watches, and small leather goods shipped from South Asia to the EU, UK, and Gulf, 1g sachets are placed inside each unit box; larger 5-10g packets go in the master carton. A DMF-free statement is issued for EU/UK-bound leather programs.",
      },
    ],
    targetKeywords:
      "1g silica gel, 1g silica gel sachet, 1 gram silica gel, 1g desiccant sachet, 1g silica gel wholesale, 1g silica gel manufacturer, 1g silica gel supplier, 1g silica gel exporter, bulk 1g silica gel, custom 1g silica gel sachets",
    formats:
      "1g sachets in breathable paper (standard), technical fibre, or non-woven; a 1g XL envelope variant; plain or custom printed; supplied in bulk cartons or sealed inner liners",
    buyerTypes: "Packagers, pharma and nutraceutical packers, electronics assemblers, footwear and leather exporters, distributors, repackers, private-label brands",
    documents: "ISO 9001:2015 certificate reference, SDS, batch COA, DMF-free statement; private-label artwork approval for printed sachets",
    buyerRisk:
      "Under-dosing: a single 1g sachet is sized for a small sealed pack (roughly 0.001-0.01 m³), not a master carton. For larger volumes step up to 2g, 5g, or 10g, or use several sachets.",
    quoteBasis: "Sachet material, plain or printed, quantity (pieces per month or per order), carton packing, destination country, Incoterm, and document set",
    buyerGuide: {
      title: "1g silica gel sachets explained for buyers",
      intro:
        "A 1g silica gel sachet holds about one gram of white, non-indicating amorphous silica gel beads in a breathable outer. It adsorbs water vapour from the air inside a sealed pack, holding relative humidity low enough to prevent condensation, corrosion, mould, and caking. It is the smallest sachet most B2B buyers use at scale; 0.5g exists for very small bottles.",
      sections: [
        {
          label: "Capacity",
          title: "How much moisture does 1g of silica gel hold?",
          text: "DryGelWorld silica gel adsorbs up to roughly 33% of its own weight in water vapour at 25 °C and 90% RH, so a 1g sachet can hold about 0.3g of water near saturation. At the 40% RH used in the DIN 55473 desiccant-unit test it holds around 0.1g. In practice a 1g sachet keeps a small sealed pack dry for the duration of storage and transit; it is not designed to dry a large or leaky enclosure.",
        },
        {
          label: "Dosage",
          title: "How many 1g sachets per pack?",
          text: "As a starting rule: one 1g sachet per sealed pack up to about 0.01 m³ (a 20 × 20 × 25 cm box) with a good moisture barrier. Use two sachets, or move to 2g, when the pack is larger, the product is hygroscopic, the barrier is porous card only, or the route is a humid sea lane of three weeks or more. The Silica Gel Calculator gives a per-pack figure from volume, target RH, and transit time.",
        },
        ...sachetMaterialsGuide,
        {
          label: "Safety",
          title: "Is 1g silica gel safe to ship inside consumer packs?",
          text: "White non-indicating silica gel is chemically inert, non-toxic, and non-flammable; the standard sachet is printed with a 'Do not eat' warning because the beads are a choking hazard and the outer is not food. DryGelWorld does not supply cobalt-chloride blue gel in 1g consumer sachets; where a colour indicator is needed, cobalt-free orange indicating gel is used instead.",
        },
      ],
    },
    sizeGuide: {
      title: "1g sachet versus the next sizes up",
      intro:
        "Pick the fill weight from the pack volume and route, not from habit. These are the starting points DryGelWorld's export desk uses before a quote.",
      rows: [
        {
          size: "0.5g",
          bestFor: "Very small bottles, vials, jewellery boxes, single-component bags",
          buyerNote: "Use when even a 1g sachet is physically too large for the pack.",
        },
        {
          size: "1g",
          bestFor: "Pill bottles to ~150 ml, electronics accessory packs, small retail and shoe boxes",
          buyerNote: "The default unit-pack sachet. Quoted by the thousand or by carton.",
        },
        {
          size: "2g-3g",
          bestFor: "Medium retail boxes, accessories, small leather goods, tools, consumer electronics",
          buyerNote: "Step up here when the pack is larger than a shoe box or the product is hygroscopic.",
        },
        {
          size: "5g-10g",
          bestFor: "Master cartons, footwear cases, garments, instruments, larger electronics packaging",
          buyerNote: "Carton-level protection; often combined with 1g sachets inside each unit pack.",
        },
      ],
    },
    comparison: {
      title: "1g silica gel sachet: paper vs technical fibre vs non-woven",
      intro:
        "The fill is the same; the outer changes dust, strength, print quality, and cost. Match it to how the sachet is inserted and what it sits next to.",
      columns: ["Breathable paper", "Technical fibre", "Non-woven"],
      rows: [
        { label: "Typical use", values: ["General unit packs, shoe boxes, retail cartons", "Electronics, precision parts, low-dust packs", "Automated insertion, higher tear strength"] },
        { label: "Dust control", values: ["Standard", "Low dust", "Low dust"] },
        { label: "Print quality", values: ["Good, one or two colours", "Good", "Good, best for fine text"] },
        { label: "Relative cost", values: ["Lowest", "Moderate", "Moderate"] },
      ],
    },
    quoteChecklist: {
      title: "Send these details for a 1g sachet quote",
      formTitle: "Quote for 1g silica gel sachets",
      intro:
        "A complete RFQ lets the export desk confirm material, print, packing, and destination terms in one reply instead of three.",
      defaultProduct: "1g silica gel sachets",
      items: [
        "Quantity: pieces per order and expected monthly or annual volume",
        "Sachet outer: breathable paper, technical fibre, or non-woven",
        "Plain sachets, or custom print (send artwork or exact text and languages)",
        "Application and pack volume so dosage can be sanity-checked",
        "Destination country, port or city, and preferred Incoterm (EXW, FOB Karachi, CIF, DAP)",
        "Documents needed: SDS, COA, ISO 9001:2015 reference, DMF-free statement, or buyer-specific paperwork",
      ],
    },
    contentBlock: {
      heading: "Indicative pricing, MOQ, and lead time for 1g sachets",
      parts: [
        { text: "DryGelWorld publishes indicative ex-factory USD references for every sachet size on the " },
        { href: "/pricing", label: "silica gel pricing page" },
        { text: "; the 1g reference there is a few tenths of a US cent per piece before freight, with the exact figure set by material, print, quantity, and Incoterm. MOQ is negotiable: trial orders are supported and volume pricing applies at recurring monthly quantities, with the figure confirmed at quote. Plain 1g sachets ship from stock in about 3-7 days; printed private-label runs add 5-10 days after artwork approval. Bulk buyers who fill their own sachets can compare against " },
        { href: "/silica-gel-beads", label: "loose silica gel beads" },
        { text: ", and distributors can review the " },
        { href: "/private-label-desiccant-packets", label: "private-label desiccant packet program" },
        { text: ". For import duty and paperwork by country, see the " },
        { href: "/blog/silica-gel-import-customs-hs-code-guide", label: "silica gel HS code and customs guide" },
        { text: "." },
      ],
    },
    relatedLinks: [
      { label: "2g silica gel sachets", href: "/2g-silica-gel-sachets" },
      { label: "5g silica gel sachets", href: "/5g-silica-gel-sachets" },
      { label: "10g silica gel sachets", href: "/10g-silica-gel-sachets" },
      { label: "All silica gel packet sizes", href: "/silica-gel-packets" },
      { label: "Unit-pack sachet product page", href: "/products/retail-sachets" },
      { label: "Silica gel calculator", href: "/tools/silica-gel-calculator" },
      { label: "Silica gel manufacturer in Pakistan", href: "/silica-gel-manufacturer-pakistan" },
      { label: "Export hub: country pages", href: "/export" },
    ],
    faqs: [
      {
        question: "What is a 1g silica gel sachet?",
        answer:
          "A 1g silica gel sachet is a small breathable packet containing about one gram of white amorphous silica gel beads. Placed inside a sealed product pack, it adsorbs water vapour and keeps relative humidity low, preventing condensation, corrosion, mould, and caking during storage and shipping.",
      },
      {
        question: "What is 1g silica gel used for?",
        answer:
          "Pill and capsule bottles, vitamin and supplement packs, electronics accessory pouches, small PCB and component bags, shoe boxes, watch and jewellery boxes, small leather goods, and any sealed retail pack up to roughly 0.01 m³. It is the standard unit-pack sachet in pharma, electronics, and footwear export packaging.",
      },
      {
        question: "How many 1g silica gel sachets do I need?",
        answer:
          "One per sealed pack up to about 0.01 m³ with a reasonable moisture barrier. Use two, or move to a 2g sachet, for larger packs, hygroscopic products, porous card-only packaging, or humid sea routes of three weeks or more. DryGelWorld's Silica Gel Calculator gives a figure from pack volume, target humidity, and transit time.",
      },
      {
        question: "Does DryGelWorld manufacture 1g silica gel sachets?",
        answer:
          "Yes. DryGelWorld is a silica gel manufacturer and exporter based in Karachi, Pakistan, producing since 1983. 1g sachets are filled and packed at its Karachi facility and supplied to packagers, distributors, and exporters worldwide.",
      },
      {
        question: "What is the MOQ for 1g silica gel sachets?",
        answer:
          "MOQ is negotiable and confirmed at quote. Trial orders are supported before a bulk commitment, and volume pricing applies at recurring monthly quantities. Printed private-label sachets carry a higher minimum than plain sachets because of print setup.",
      },
      {
        question: "What does a 1g silica gel sachet cost wholesale?",
        answer:
          "DryGelWorld publishes an indicative ex-factory USD reference for the 1g size on its pricing page, in the range of a few tenths of a US cent per piece before freight. The firm price depends on sachet material, plain or printed, order quantity, carton packing, and Incoterm. Request a quote for a binding figure.",
      },
      {
        question: "Can 1g sachets be custom printed with our brand?",
        answer:
          "Yes. Private-label printing with your logo, warning text in the languages you need, and lot or batch codes is available. Send artwork or exact text with the RFQ; printed runs add roughly 5-10 days after artwork approval.",
      },
      {
        question: "Which sachet material should I choose for 1g?",
        answer:
          "Breathable paper is the standard and lowest-cost outer for general unit packs. Technical-fibre and non-woven outers reduce dust and increase tear strength for electronics, precision parts, and automated insertion. The silica gel inside is identical in every material.",
      },
      {
        question: "Is 1g silica gel food-grade or FDA approved?",
        answer:
          "No such certification is claimed. DryGelWorld holds ISO 9001:2015 and issues an SDS, COA, and DMF-free statement. It does not hold FDA, food-contact, pharma GMP, Halal, or REACH certifications, so direct food-contact or FDA-DMF pharma applications should confirm their requirement before ordering.",
      },
      {
        question: "How should 1g sachets be stored before use?",
        answer:
          "Keep sachets in the sealed factory pouch or liner until the packing line needs them; unopened they hold capacity for 24-36 months. Once opened, reseal the pouch and use the sachets within days, because they begin adsorbing moisture from the workshop air immediately.",
      },
      ...exportFaqs.slice(0, 2),
    ],
  },

  "2g-silica-gel-sachets": {
    slug: "2g-silica-gel-sachets",
    title: "2g Silica Gel Sachets | Wholesale Manufacturer & Exporter",
    metaDescription:
      "2g silica gel sachets manufactured in Karachi for medium retail boxes, accessories, and small leather goods. Paper or non-woven, custom print, MOQ and indicative USD pricing, worldwide export.",
    kicker: "2g silica gel sachets",
    h1: "2g silica gel sachets for medium retail packs, accessories, and export cartons.",
    lead:
      "DryGelWorld manufactures 2 gram silica gel sachets in Karachi, Pakistan for packagers who need more capacity than a 1g sachet without stepping up to a 5g packet. Typical uses, dosage, materials, MOQ, and export terms are below.",
    searchIntent:
      "Commercial and B2B: 2g silica gel, 2g silica gel sachet, 2 gram silica gel packet, 2g desiccant sachet, 2g silica gel wholesale / manufacturer / supplier.",
    primaryCta: "Request 2g Sachet Quote",
    secondaryCta: "See all packet sizes",
    secondaryHref: "/silica-gel-packets",
    proofPoints: ["Manufacturer since 1983, Karachi", "ISO 9001:2015 (cert. 9101225)", "Paper & non-woven outers", "Custom print & private label"],
    image: SACHET_IMAGE,
    imageAlt: "2g white silica gel sachets in breathable paper from DryGelWorld",
    imageCaption: "2g sachets cover the medium retail box and accessory pack range between 1g unit sachets and 5g carton packets.",
    chips: ["2 gram", "Retail boxes", "Accessories", "Export"],
    fitTitle: "Where a 2g silica gel sachet fits",
    useCases: [
      {
        label: "Consumer goods",
        title: "Medium retail boxes and gift packs",
        text: "Boxed consumer electronics, cosmetics and toiletry gift sets, stationery, and household goods where the pack is larger than a shoe box but still sealed.",
      },
      {
        label: "Leather & accessories",
        title: "Bags, belts, wallets, small leather goods",
        text: "A 2g sachet inside each polybag or box protects finish and prevents mould on leather shipped through humid sea lanes. Issued with a DMF-free statement for EU and UK programs.",
      },
      {
        label: "Tools & parts",
        title: "Hand tools, hardware, and spare-parts packs",
        text: "Prevents surface rust on metal parts in individual blister or box packs during storage and distribution.",
      },
    ],
    targetKeywords: "2g silica gel, 2g silica gel sachet, 2 gram silica gel, 2g desiccant packet, 2g silica gel wholesale, 2g silica gel manufacturer",
    formats: "2g sachets in breathable paper (standard) or non-woven; plain or custom printed; bulk cartons or sealed inner liners",
    buyerTypes: "Consumer-goods packagers, leather and accessory exporters, tool and hardware distributors, private-label brands",
    documents: "ISO 9001:2015 reference, SDS, batch COA, DMF-free statement; artwork approval for printed sachets",
    buyerRisk: "Choosing 2g by habit for a pack that needs 5g. Check pack volume and route humidity; a 2g sachet is sized for roughly 0.01-0.02 m³ with a decent barrier.",
    quoteBasis: "Material, plain or printed, quantity, carton packing, destination, Incoterm, documents",
    buyerGuide: {
      title: "2g silica gel sachets explained for buyers",
      intro:
        "A 2g sachet holds twice the silica gel of a 1g sachet in a slightly larger outer. At DryGelWorld's published capacity of up to about 33% of own weight at 90% RH, it can hold roughly 0.6g of water vapour near saturation and about 0.2g at 40% RH.",
      sections: [
        {
          label: "Dosage",
          title: "How many 2g sachets per pack?",
          text: "One 2g sachet per sealed pack in the 0.01-0.02 m³ range with a reasonable barrier is the usual starting point. Larger packs, hygroscopic products, or humid routes of three weeks or more call for two sachets or a 5g packet. Use the Silica Gel Calculator for a per-pack figure.",
        },
        ...sachetMaterialsGuide,
      ],
    },
    quoteChecklist: {
      title: "Send these details for a 2g sachet quote",
      formTitle: "Quote for 2g silica gel sachets",
      intro: "Material, print, quantity, packing, and destination are the five inputs that set the price.",
      defaultProduct: "2g silica gel sachets",
      items: [
        "Quantity per order and expected monthly volume",
        "Breathable paper or non-woven outer",
        "Plain or custom printed (send artwork or exact text)",
        "Application and pack volume",
        "Destination, port, and Incoterm",
        "Documents: SDS, COA, ISO 9001:2015 reference, DMF-free statement",
      ],
    },
    contentBlock: {
      heading: "Pricing, MOQ, and lead time for 2g sachets",
      parts: [
        { text: "Indicative ex-factory USD references for the 2g size are published on the " },
        { href: "/pricing", label: "pricing page" },
        { text: ". MOQ is negotiable with trial orders supported; plain sachets ship in about 3-7 days from stock and printed runs add 5-10 days after artwork approval. If the pack is smaller, see " },
        { href: "/1g-silica-gel-sachets", label: "1g silica gel sachets" },
        { text: "; if it is a master carton, see " },
        { href: "/5g-silica-gel-sachets", label: "5g" },
        { text: " and " },
        { href: "/10g-silica-gel-sachets", label: "10g silica gel sachets" },
        { text: "." },
      ],
    },
    relatedLinks: [
      { label: "1g silica gel sachets", href: "/1g-silica-gel-sachets" },
      { label: "5g silica gel sachets", href: "/5g-silica-gel-sachets" },
      { label: "10g silica gel sachets", href: "/10g-silica-gel-sachets" },
      { label: "All silica gel packet sizes", href: "/silica-gel-packets" },
      { label: "Silica gel for leather and footwear export", href: "/blog/silica-gel-for-leather-and-footwear-export" },
      { label: "Silica gel calculator", href: "/tools/silica-gel-calculator" },
    ],
    faqs: [
      {
        question: "What is a 2g silica gel sachet used for?",
        answer:
          "Medium retail boxes, cosmetics and gift packs, bags, belts, wallets and other small leather goods, hand tools, and spare-parts packs. It suits sealed packs of roughly 0.01-0.02 m³ where a 1g sachet is too small and a 5g packet is more than the pack needs.",
      },
      {
        question: "How much moisture can a 2g sachet hold?",
        answer:
          "Around 0.6g of water vapour near saturation (up to about 33% of own weight at 25 °C and 90% RH) and roughly 0.2g at 40% RH. In practice it keeps a medium sealed pack dry through storage and normal transit.",
      },
      {
        question: "Does DryGelWorld manufacture 2g silica gel sachets?",
        answer:
          "Yes. 2g sachets are filled and packed at DryGelWorld's Karachi facility and supplied plain or custom printed, in breathable paper or non-woven outers, to buyers in Pakistan and export markets worldwide.",
      },
      {
        question: "What is the MOQ and lead time for 2g sachets?",
        answer:
          "MOQ is negotiable and confirmed at quote, with trial orders supported. Plain sachets typically ship from stock in 3-7 days; printed private-label runs add about 5-10 days after artwork approval.",
      },
      ...exportFaqs,
    ],
  },

  "5g-silica-gel-sachets": {
    slug: "5g-silica-gel-sachets",
    title: "5g Silica Gel Sachets | Carton Desiccant Manufacturer",
    metaDescription:
      "5g silica gel sachets from a Karachi manufacturer for shoe boxes, garment cartons, instruments, and electronics packaging. Low-dust outers, custom print, MOQ, USD pricing, worldwide export.",
    kicker: "5g silica gel sachets",
    h1: "5g silica gel sachets for footwear boxes, garment cartons, and larger product packs.",
    lead:
      "DryGelWorld manufactures 5 gram silica gel sachets in Karachi, Pakistan for carton-level protection: one packet per shoe box, garment carton, instrument case, or larger electronics pack. Dosage, materials, MOQ, and export terms are below.",
    searchIntent:
      "Commercial and B2B: 5g silica gel, 5g silica gel sachet, 5 gram silica gel packet, 5g desiccant packet, 5g silica gel wholesale / manufacturer / supplier.",
    primaryCta: "Request 5g Sachet Quote",
    secondaryCta: "See all packet sizes",
    secondaryHref: "/silica-gel-packets",
    proofPoints: ["Manufacturer since 1983, Karachi", "ISO 9001:2015 (cert. 9101225)", "Low-dust sachet formats", "DMF-free statement for EU/UK leather"],
    image: SACHET_IMAGE,
    imageAlt: "5g silica gel sachets for footwear and garment export cartons from DryGelWorld",
    imageCaption: "5g sachets are the workhorse packet for footwear, garment, and instrument cartons shipped by sea.",
    chips: ["5 gram", "Footwear", "Garments", "Export cartons"],
    fitTitle: "Where a 5g silica gel sachet fits",
    useCases: [
      {
        label: "Footwear & leather",
        title: "One packet per shoe box",
        text: "The standard sachet for footwear exporters shipping to the EU, UK, and Gulf: one 5g packet per box prevents mould and finish damage across a 3-5 week sea voyage. Supplied with a DMF-free statement.",
      },
      {
        label: "Garments & textiles",
        title: "Polybagged garments and carton packs",
        text: "Placed in garment cartons or larger polybags to stop mildew, odour, and yellowing during humid transit and warehouse storage.",
      },
      {
        label: "Electronics & instruments",
        title: "Boxed devices, instruments, and kits",
        text: "Protects boxed consumer electronics, measuring instruments, and tool kits where the pack volume is too large for a 1-2g sachet.",
      },
    ],
    targetKeywords: "5g silica gel, 5g silica gel sachet, 5 gram silica gel, 5g desiccant packet, 5g silica gel wholesale, 5g silica gel manufacturer, silica gel for shoe boxes",
    formats: "5g sachets in breathable paper or low-dust non-woven; plain or custom printed; bulk cartons or sealed inner liners",
    buyerTypes: "Footwear and leather exporters, garment and textile exporters, electronics packagers, instrument makers, distributors",
    documents: "ISO 9001:2015 reference, SDS, batch COA, DMF-free statement; artwork approval for printed sachets",
    buyerRisk: "Relying on one 5g sachet for a full master carton on a humid route. A 5g packet is sized for roughly 0.02-0.05 m³; master cartons usually need 10g or several 5g packets.",
    quoteBasis: "Material, plain or printed, quantity, carton packing, destination, Incoterm, documents",
    buyerGuide: {
      title: "5g silica gel sachets explained for buyers",
      intro:
        "A 5g sachet can hold roughly 1.5g of water vapour near saturation (up to about 33% of own weight at 25 °C and 90% RH) and about 0.5g at 40% RH. That is enough to keep a shoe box or similar sealed carton dry across a long sea voyage, provided the carton is closed and not soaked by container rain, which is a job for container desiccant strips.",
      sections: [
        {
          label: "Dosage",
          title: "How many 5g sachets per carton?",
          text: "One 5g sachet per sealed pack of roughly 0.02-0.05 m³ (a typical shoe box is about 0.01 m³, so 5g gives a comfortable margin for leather). For master cartons, use one 10g packet or two to three 5g sachets depending on volume and route. The Silica Gel Calculator sizes it from volume, target RH, and transit days.",
        },
        ...sachetMaterialsGuide,
      ],
    },
    quoteChecklist: {
      title: "Send these details for a 5g sachet quote",
      formTitle: "Quote for 5g silica gel sachets",
      intro: "Material, print, quantity, packing, and destination are the five inputs that set the price.",
      defaultProduct: "5g silica gel sachets",
      items: [
        "Quantity per order and expected monthly volume",
        "Breathable paper or low-dust non-woven outer",
        "Plain or custom printed (send artwork or exact text)",
        "Application, carton volume, and destination route",
        "Destination, port, and Incoterm",
        "Documents: SDS, COA, ISO 9001:2015 reference, DMF-free statement",
      ],
    },
    contentBlock: {
      heading: "Pricing, MOQ, and lead time for 5g sachets",
      parts: [
        { text: "Indicative ex-factory USD references for the 5g size are published on the " },
        { href: "/pricing", label: "pricing page" },
        { text: ". MOQ is negotiable with trial orders supported; plain sachets ship in about 3-7 days from stock and printed runs add 5-10 days after artwork approval. Footwear and leather buyers should read the " },
        { href: "/blog/silica-gel-for-leather-and-footwear-export", label: "leather and footwear export guide" },
        { text: " and the " },
        { href: "/industries/leather-footwear-export", label: "leather and footwear industry page" },
        { text: ". For the container itself, see " },
        { href: "/container-desiccant-strips", label: "container desiccant strips" },
        { text: "." },
      ],
    },
    relatedLinks: [
      { label: "1g silica gel sachets", href: "/1g-silica-gel-sachets" },
      { label: "2g silica gel sachets", href: "/2g-silica-gel-sachets" },
      { label: "10g silica gel sachets", href: "/10g-silica-gel-sachets" },
      { label: "All silica gel packet sizes", href: "/silica-gel-packets" },
      { label: "Leather and footwear export industry page", href: "/industries/leather-footwear-export" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
    ],
    faqs: [
      {
        question: "What is a 5g silica gel sachet used for?",
        answer:
          "Shoe boxes, garment cartons, boxed electronics, instrument cases, tool kits, and other sealed packs of roughly 0.02-0.05 m³. It is the standard packet for footwear and leather exporters shipping by sea to the EU, UK, and Gulf.",
      },
      {
        question: "How many 5g silica gel packets per shoe box?",
        answer:
          "One 5g sachet per shoe box is the usual dose for leather footwear on a sea route of three to five weeks. Synthetic footwear on short routes can use 2g; boots and large boxes may warrant 10g. Container-level moisture should be handled separately with hanging desiccant strips.",
      },
      {
        question: "Does DryGelWorld manufacture 5g silica gel sachets?",
        answer:
          "Yes. 5g sachets are filled and packed at DryGelWorld's Karachi facility in breathable paper or low-dust non-woven outers, plain or custom printed, and exported worldwide with SDS, COA, and a DMF-free statement.",
      },
      {
        question: "What is the MOQ and lead time for 5g sachets?",
        answer:
          "MOQ is negotiable and confirmed at quote, with trial orders supported. Plain sachets typically ship from stock in 3-7 days; printed private-label runs add about 5-10 days after artwork approval.",
      },
      ...exportFaqs,
    ],
  },

  "10g-silica-gel-sachets": {
    slug: "10g-silica-gel-sachets",
    title: "10g Silica Gel Sachets | Master Carton Desiccant Supplier",
    metaDescription:
      "10g silica gel sachets manufactured in Karachi for master cartons, instrument cases, and larger electronics and textile packs. Paper or non-woven, custom print, MOQ, USD pricing, worldwide export.",
    kicker: "10g silica gel sachets",
    h1: "10g silica gel sachets for master cartons, instrument cases, and larger export packs.",
    lead:
      "DryGelWorld manufactures 10 gram silica gel sachets in Karachi, Pakistan for carton-level moisture control where 5g is not enough: master cartons, instrument and equipment cases, textile bales, and larger electronics packs. Dosage, materials, MOQ, and export terms are below.",
    searchIntent:
      "Commercial and B2B: 10g silica gel, 10g silica gel sachet, 10 gram silica gel packet, 10g desiccant packet, 10g silica gel wholesale / manufacturer / supplier.",
    primaryCta: "Request 10g Sachet Quote",
    secondaryCta: "See all packet sizes",
    secondaryHref: "/silica-gel-packets",
    proofPoints: ["Manufacturer since 1983, Karachi", "ISO 9001:2015 (cert. 9101225)", "Paper & non-woven outers", "Custom print & private label"],
    image: SACHET_IMAGE,
    imageAlt: "10g silica gel sachets for master cartons and equipment cases from DryGelWorld",
    imageCaption: "10g sachets are the usual master-carton packet, often paired with 1g or 2g sachets inside each unit pack.",
    chips: ["10 gram", "Master cartons", "Equipment", "Export"],
    fitTitle: "Where a 10g silica gel sachet fits",
    useCases: [
      {
        label: "Master cartons",
        title: "Outer cartons for consumer goods and parts",
        text: "One or two 10g sachets in the master carton complement the 1-2g sachets inside each unit pack, protecting the whole carton during warehouse storage and sea transit.",
      },
      {
        label: "Equipment & instruments",
        title: "Cases, machinery parts, and medical devices",
        text: "Boxed equipment, spare-part kits, and instrument cases where corrosion on metal or optics is the main risk.",
      },
      {
        label: "Textiles & bales",
        title: "Garment cartons and fabric rolls",
        text: "Larger textile cartons and wrapped rolls shipped from South Asia to humid destinations, where mildew and odour are claim risks.",
      },
    ],
    targetKeywords: "10g silica gel, 10g silica gel sachet, 10 gram silica gel, 10g desiccant packet, 10g silica gel wholesale, 10g silica gel manufacturer, master carton desiccant",
    formats: "10g sachets in breathable paper or non-woven; plain or custom printed; bulk cartons or sealed inner liners",
    buyerTypes: "Consumer-goods exporters, equipment and instrument makers, textile exporters, electronics packagers, distributors",
    documents: "ISO 9001:2015 reference, SDS, batch COA, DMF-free statement; artwork approval for printed sachets",
    buyerRisk: "Using 10g sachets to solve a container-level problem. Sachets protect the carton they sit in; container rain needs hanging desiccant strips in the container.",
    quoteBasis: "Material, plain or printed, quantity, carton packing, destination, Incoterm, documents",
    buyerGuide: {
      title: "10g silica gel sachets explained for buyers",
      intro:
        "A 10g sachet can hold roughly 3g of water vapour near saturation (up to about 33% of own weight at 25 °C and 90% RH) and about 1g at 40% RH, which is close to one third of a DIN 55473 desiccant unit. It is the largest size most buyers use inside cartons; 25g to 500g packs cover crates and bulk storage.",
      sections: [
        {
          label: "Dosage",
          title: "How many 10g sachets per master carton?",
          text: "One 10g sachet per sealed carton of roughly 0.05-0.1 m³ with a reasonable barrier; two for larger cartons, hygroscopic contents, or routes over three weeks. For crates and pallets step up to 25g-100g packs. The Silica Gel Calculator sizes it from volume, target RH, and transit days.",
        },
        ...sachetMaterialsGuide,
      ],
    },
    quoteChecklist: {
      title: "Send these details for a 10g sachet quote",
      formTitle: "Quote for 10g silica gel sachets",
      intro: "Material, print, quantity, packing, and destination are the five inputs that set the price.",
      defaultProduct: "10g silica gel sachets",
      items: [
        "Quantity per order and expected monthly volume",
        "Breathable paper or non-woven outer",
        "Plain or custom printed (send artwork or exact text)",
        "Application, carton volume, and destination route",
        "Destination, port, and Incoterm",
        "Documents: SDS, COA, ISO 9001:2015 reference, DMF-free statement",
      ],
    },
    contentBlock: {
      heading: "Pricing, MOQ, and lead time for 10g sachets",
      parts: [
        { text: "Indicative ex-factory USD references for the 10g size are published on the " },
        { href: "/pricing", label: "pricing page" },
        { text: ". MOQ is negotiable with trial orders supported; plain sachets ship in about 3-7 days from stock and printed runs add 5-10 days after artwork approval. For larger packs see " },
        { href: "/bulk-silica-gel-desiccant", label: "25g-500g bulk silica gel packs" },
        { text: ", and for the container itself see " },
        { href: "/container-desiccant-strips", label: "container desiccant strips" },
        { text: ". The " },
        { href: "/blog/desiccant-units-explained-din-55473-and-unit-sizing", label: "DIN 55473 desiccant unit guide" },
        { text: " explains how sachet weight converts to desiccant units." },
      ],
    },
    relatedLinks: [
      { label: "1g silica gel sachets", href: "/1g-silica-gel-sachets" },
      { label: "2g silica gel sachets", href: "/2g-silica-gel-sachets" },
      { label: "5g silica gel sachets", href: "/5g-silica-gel-sachets" },
      { label: "All silica gel packet sizes", href: "/silica-gel-packets" },
      { label: "Bulk silica gel desiccant (25g-500g and kg)", href: "/bulk-silica-gel-desiccant" },
      { label: "Container desiccant strips", href: "/container-desiccant-strips" },
    ],
    faqs: [
      {
        question: "What is a 10g silica gel sachet used for?",
        answer:
          "Master cartons, equipment and instrument cases, spare-part kits, medical device boxes, textile cartons, and fabric rolls: sealed packs of roughly 0.05-0.1 m³. It is usually paired with 1g or 2g sachets inside each unit pack.",
      },
      {
        question: "How much moisture can a 10g sachet hold?",
        answer:
          "Around 3g of water vapour near saturation (up to about 33% of own weight at 25 °C and 90% RH) and roughly 1g at 40% RH, about one third of a DIN 55473 desiccant unit.",
      },
      {
        question: "Does DryGelWorld manufacture 10g silica gel sachets?",
        answer:
          "Yes. 10g sachets are filled and packed at DryGelWorld's Karachi facility in breathable paper or non-woven outers, plain or custom printed, and exported worldwide with SDS, COA, and a DMF-free statement.",
      },
      {
        question: "What is the MOQ and lead time for 10g sachets?",
        answer:
          "MOQ is negotiable and confirmed at quote, with trial orders supported. Plain sachets typically ship from stock in 3-7 days; printed private-label runs add about 5-10 days after artwork approval.",
      },
      ...exportFaqs,
    ],
  },
  // Kilogram formats. One page, not one per bag size: the 5 kg and 25 kg buyer
  // is the same person (repacker, warehouse, distributor) and the search
  // intent is the per-kg price basis, not the bag size.
  "silica-gel-per-kg": {
    slug: "silica-gel-per-kg",
    title: "Silica Gel per kg | Bags, Bulk Price Basis & Export Supply",
    metaDescription:
      "Buy silica gel by the kilogram from a Karachi manufacturer: 1, 5, 10, and 25 kg bags, drums and jumbo bags, indicative USD per kg, PKR quotes for Pakistan, MOQ, regeneration, and export terms.",
    kicker: "Silica gel per kg",
    h1: "Silica gel by the kilogram: bags, bulk price basis, and how to order.",
    lead:
      "DryGelWorld manufactures silica gel in Karachi and sells it by weight as well as in sachets: 1 kg, 5 kg, 10 kg, and 25 kg bags, drums, and jumbo bags of loose white beads. This page explains how per-kg pricing is built, what the indicative USD and PKR references are, who buys by the kilo, and what to send for a firm quote.",
    searchIntent:
      "Transactional and B2B: silica gel per kg, silica gel price per kg, silica gel price per kg in Pakistan, buy silica gel by kg, silica gel 25kg bag, bulk silica gel price, silica gel kg rate",
    primaryCta: "Request per-kg Quote",
    secondaryCta: "See indicative price list",
    secondaryHref: "/pricing",
    proofPoints: [
      "Manufacturer since 1983, Karachi",
      "1 / 5 / 10 / 25 kg bags, drums, jumbo bags",
      "Indicative USD per kg published",
      "PKR quotes for Pakistan buyers",
    ],
    image: "/macro_silica_beads_1775989669467.webp",
    imageAlt: "Loose white silica gel beads sold by the kilogram in 25 kg bags by DryGelWorld, Karachi",
    imageCaption:
      "Loose silica gel beads are quoted per kg; the 25 kg bag is the standard unit for repackers and warehouses.",
    chips: ["Per kg", "25 kg bags", "Bulk beads", "PKR & USD"],
    fitTitle: "Who buys silica gel by the kilogram",
    useCases: [
      {
        label: "Repackers & distributors",
        title: "Fill your own sachets or resell by the bag",
        text: "Packaging houses and distributors buy 25 kg bags of uniform 1-3 mm or 2-5 mm beads to fill their own sachets or to resell to local packers. Quoted per kg with a pallet or monthly volume.",
      },
      {
        label: "Industrial users",
        title: "Transformer breathers, dryers, compressed-air and lab use",
        text: "Utilities, workshops, and labs buy cobalt-free orange indicating or white beads by the kg to refill breathers, desiccant dryers, and drying cabinets. Regenerable, so a kg lasts many cycles.",
      },
      {
        label: "Warehouses & exporters",
        title: "Bulk moisture control in cartons, crates, and stores",
        text: "Warehouses and exporters use 1-5 kg bags and 25 g-500 g packs made from the same bulk material for crates, pallets, and stock rooms where sachets are too small.",
      },
    ],
    targetKeywords: "silica gel per kg, silica gel price per kg, silica gel price per kg in Pakistan, silica gel kg, silica gel 25kg bag, bulk silica gel price, silica gel rate",
    formats: "1 kg, 5 kg, 10 kg, and 25 kg bags of loose beads; drums; jumbo bags; 25 g-500 g packs and 1-5 kg container strips made from the same material",
    buyerTypes: "Repackers, distributors, warehouses, exporters, utilities (transformer breathers), workshops, labs, dryer and compressed-air maintenance teams",
    documents: "ISO 9001:2015 reference, SDS, batch COA, DMF-free statement; Certificate of Origin for export",
    buyerRisk: "Comparing a per-kg quote for loose beads against a per-kg figure derived from sachets. Sachet prices include filling, paper, and print; loose beads do not. Compare like with like.",
    quoteBasis: "Bead grade (white or indicating) and size (1-3 mm or 2-5 mm), bag size, total kg per order and per month, destination, Incoterm, and documents",
    buyerGuide: {
      title: "How silica gel is priced per kg",
      intro:
        "Per-kg pricing for loose silica gel is simpler than sachet pricing: there is no paper, no filling, and no print. The price moves with bead grade, bead size, bag size, order volume, and whether the buyer is in Pakistan (PKR, ex-factory or delivered) or abroad (USD, FOB Karachi, CIF, or DAP).",
      sections: [
        {
          label: "Indicative reference",
          title: "What the published USD per kg means",
          text: "The pricing page shows an indicative ex-factory USD range per kg for the bulk formats, derived from the same published references used for the 25 g to 500 g packs and the 1-5 kg strips. It is a planning band before freight, not a binding price; the firm figure depends on volume and Incoterm and is confirmed at quote.",
        },
        {
          label: "Pakistan buyers",
          title: "PKR per kg, factory pickup or delivered",
          text: "Buyers in Pakistan are quoted in PKR per kg or per 25 kg bag, ex-factory Karachi or delivered within Pakistan. Repackers in Karachi, Lahore, Faisalabad, and Sialkot are quoted by monthly volume. Send the bag size and monthly kg for a same-day WhatsApp quote.",
        },
        {
          label: "Grades",
          title: "White vs indicating, 1-3 mm vs 2-5 mm",
          text: "White non-indicating beads are the standard and the lowest cost per kg. Cobalt-free orange indicating beads cost more per kg because of the indicator. Bead size (1-3 mm for sachet filling, 2-5 mm for breathers and dryers) changes handling more than price; state it in the RFQ so the quote matches the line.",
        },
        {
          label: "MOQ",
          title: "Bags, pallets, and tonnes",
          text: "Loose beads are quoted by the 25 kg bag for smaller programs and by the pallet or tonne for distributors; the pricing page lists loose bulk from about one metric ton for the best per-kg rate. Trial bags are available before a bulk commitment.",
        },
        {
          label: "Reuse",
          title: "A kilogram is regenerable",
          text: "Loose silica gel can be dried and reused: sachet-grade and indicating beads at typically 110-130 °C, plain bulk beads higher (the site's regeneration guide covers limits). Industrial buyers replacing breather or dryer charges should factor reuse into the per-kg cost.",
        },
        {
          label: "Documents",
          title: "Same paperwork as sachets",
          text: "Every bulk shipment can carry an SDS, a batch COA, and the ISO 9001:2015 certificate reference (9101225); a DMF-free statement is issued for leather and footwear programs. FDA, food-contact, pharma GMP, Halal, and REACH certifications are not held.",
        },
      ],
    },
    sizeGuide: {
      title: "Which kilogram format fits the job",
      intro: "Bag size follows how the material is used, not the price; the per-kg rate improves with total volume, not with bag size.",
      rows: [
        {
          size: "1 kg & 5 kg bags",
          bestFor: "Breather refills, lab drying cabinets, small workshops, trial orders",
          buyerNote: "Handy sizes for maintenance teams; also the base for 1-5 kg container strips.",
        },
        {
          size: "10 kg bags",
          bestFor: "Small repackers, warehouses, seasonal moisture programs",
          buyerNote: "Middle ground when a 25 kg bag is more than a month's use.",
        },
        {
          size: "25 kg bags",
          bestFor: "Repackers filling sachets, distributors, factories with regular use",
          buyerNote: "The standard bulk unit; quoted per kg and per pallet.",
        },
        {
          size: "Drums & jumbo bags",
          bestFor: "Recurring distributor supply, industrial lines, regional hubs",
          buyerNote: "Quoted per tonne; confirm handling equipment at the destination.",
        },
      ],
    },
    quoteChecklist: {
      title: "Send these details for a per-kg quote",
      formTitle: "Quote for silica gel by the kg",
      intro: "Grade, bead size, bag size, volume, and destination set the per-kg rate.",
      defaultProduct: "Silica gel (per kg)",
      items: [
        "Grade: white non-indicating or cobalt-free orange indicating",
        "Bead size: 1-3 mm (sachet filling) or 2-5 mm (breathers, dryers)",
        "Bag size: 1, 5, 10, or 25 kg, drum, or jumbo bag",
        "Total kg per order and expected monthly volume",
        "Pakistan: city and pickup or delivery; export: destination port and Incoterm",
        "Documents: SDS, COA, ISO 9001:2015 reference, DMF-free statement, Certificate of Origin",
      ],
    },
    contentBlock: {
      heading: "Related bulk formats and pricing",
      parts: [
        { text: "The indicative USD per kg bands are on the " },
        { href: "/pricing", label: "silica gel pricing page" },
        { text: ". For bead specifications see " },
        { href: "/silica-gel-beads", label: "silica gel beads" },
        { text: "; for 25 g-500 g packs and warehouse programs see " },
        { href: "/bulk-silica-gel-desiccant", label: "bulk silica gel desiccant" },
        { text: "; for indicating beads by the kg see " },
        { href: "/orange-silica-gel-supplier", label: "orange indicating silica gel" },
        { text: " and " },
        { href: "/silica-gel-for-transformer-breather", label: "silica gel for transformer breathers" },
        { text: ". The " },
        { href: "/blog/how-to-regenerate-silica-gel-oven-temperature-guide", label: "regeneration guide" },
        { text: " explains how to dry and reuse a charge, and the " },
        { href: "/blog/silica-gel-bulk-pricing-factors-for-exporters", label: "bulk pricing factors article" },
        { text: " explains what moves the per-kg rate." },
      ],
    },
    relatedLinks: [
      { label: "Indicative pricing (USD per kg)", href: "/pricing" },
      { label: "Silica gel beads (25 kg bags)", href: "/silica-gel-beads" },
      { label: "Bulk silica gel desiccant", href: "/bulk-silica-gel-desiccant" },
      { label: "Bulk product page", href: "/products/bulk-industrial" },
      { label: "Silica gel in Pakistan (PKR)", href: "/silica-gel-manufacturer-pakistan" },
      { label: "Orange indicating silica gel", href: "/orange-silica-gel-supplier" },
      { label: "Silica gel sachets by size (1g-10g)", href: "/1g-silica-gel-sachets" },
      { label: "Export hub", href: "/export" },
    ],
    faqs: [
      {
        question: "What is the price of silica gel per kg?",
        answer:
          "DryGelWorld publishes an indicative ex-factory USD range per kg for bulk formats on its pricing page; the firm rate depends on grade (white or indicating), bead size, bag size, total volume, and Incoterm. Buyers in Pakistan are quoted in PKR per kg or per 25 kg bag. Request a quote for a binding figure.",
      },
      {
        question: "What is the silica gel price per kg in Pakistan?",
        answer:
          "Pakistan buyers receive a PKR per-kg or per-bag quote from the Karachi factory, ex-factory or delivered, usually the same day by WhatsApp. The rate improves with monthly volume; repackers and distributors are quoted by the pallet or tonne.",
      },
      {
        question: "Can I buy silica gel in 1 kg or 5 kg quantities?",
        answer:
          "Yes. 1 kg and 5 kg bags are stocked for breather refills, labs, workshops, and trial orders, alongside 10 kg and 25 kg bags, drums, and jumbo bags. Small quantities are priced per bag; the best per-kg rate applies from about one metric ton.",
      },
      {
        question: "What is the MOQ for silica gel by the kg?",
        answer:
          "There is no fixed minimum for bagged beads; trial bags are supported. Loose bulk pricing at the best per-kg rate starts from roughly one metric ton, and distributor programs are quoted by monthly tonnage. The figure is confirmed at quote.",
      },
      {
        question: "Which bead size should I order by the kg?",
        answer:
          "1-3 mm beads for filling sachets on a line; 2-5 mm for transformer breathers, desiccant dryers, and drying cabinets where airflow through the bed matters. White non-indicating is the standard; cobalt-free orange indicating is used where a visual saturation check is needed.",
      },
      {
        question: "Does DryGelWorld export silica gel by the kg?",
        answer:
          "Yes. 25 kg bags, drums, and jumbo bags ship from Karachi on EXW, FOB Karachi, CIF, or DAP terms in USD, with SDS, COA, ISO 9001:2015 reference, and Certificate of Origin. Country pages cover ports, customs codes, and lead times.",
      },
      {
        question: "How many times can bulk silica gel be reused?",
        answer:
          "Many cycles, as long as it is dried correctly and not contaminated. Sachet-grade and indicating beads regenerate at typically 110-130 °C; plain bulk beads tolerate higher temperatures. Capacity declines slowly with each cycle; replace when the regenerated charge no longer holds humidity down.",
      },
      ...exportFaqs.slice(1, 2),
    ],
  },
} satisfies Record<string, KeywordClusterInput>;

export type GramSizeLandingSlug = keyof typeof gramSizeLandingInputs;
