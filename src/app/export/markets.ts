export type ExportMarket = {
  slug: string;
  country: string;
  updatedAt?: string;
  title: string;
  description: string;
  buyerTypes: string[];
  ports: string[];
  products: string[];
  documents: string[];
  routeNote: string;
  rfqTip: string;
  // Optional commercial terms - populated for priority (GCC) markets so buyers
  // see MOQ, lead time, currency, and Incoterms before sending an RFQ.
  moq?: string;
  leadTime?: string;
  currency?: string;
  incoterms?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  procurementNotes?: Array<{ label: string; title: string; text: string }>;
  relatedLinks?: Array<{ label: string; description: string; href: string }>;
  // Customs and import essentials. Only verifiable facts belong here: the HS
  // classification, the destination's OFFICIAL tariff lookup (so buyers and AI
  // engines can verify duty themselves), standard shipping documents, and
  // regulatory notes. Never state a duty percentage we cannot source.
  customs?: {
    hsCode: string;
    dutyNote: string;
    tariffLookup: { label: string; href: string };
    requiredDocs: string[];
    regulatoryNotes: string[];
  };
};

export const exportMarkets: ExportMarket[] = [
  {
    slug: "uae",
    country: "UAE",
    title: "Silica gel supplier for UAE importers and packaging buyers.",
    description:
      "Factory-direct silica gel sachets, bulk beads, and container strips for UAE distributors, re-packers, warehouses, and export cargo teams.",
    buyerTypes: ["Dubai and Sharjah distributors", "Jebel Ali importers", "Warehouse and cargo teams", "Private-label packaging buyers"],
    ports: ["Jebel Ali", "Port Khalid", "Khalifa Port", "Dubai cargo consolidators"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg container strips", "Private-label cartons"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Karachi-to-UAE routing is one of the clearest export stories for Pakistan-based desiccant supply because buyers can compare FOB Karachi, CIF UAE, and DAP UAE options early.",
    rfqTip: "Send destination emirate, required format, quantity, and whether you need Arabic/English carton labeling.",
    moq: "Typically from 100 kg or 100,000 sachets per format; trial/sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Jebel Ali ~3-5 days.",
    currency: "Quoted in USD (AED on request)",
    incoterms: ["FOB Karachi", "CIF Jebel Ali", "DAP UAE"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "The UAE applies the GCC common external tariff; most industrial goods enter at the 5% standard rate. Confirm the live 2811.22 rate before costing:",
      tariffLookup: { label: "Dubai Customs", href: "https://www.dubaicustoms.gov.ae/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Food-contact applications should request the DMF-free statement with the order; food-grade certifications (FDA, FSSC 22000) are not currently held.",
        "Bilingual Arabic/English carton labeling can be arranged for retail-facing packs.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to the UAE?", answer: "Orders typically start from around 100 kg or 100,000 sachets per format, with smaller trial and sample quantities available before a bulk commitment. Exact MOQ depends on packet size and private-label requirements." },
      { question: "Which Incoterms do you offer for UAE shipments?", answer: "FOB Karachi, CIF Jebel Ali, and DAP UAE are all available, so buyers can choose factory handover, freight-included delivery to port, or delivered terms based on their logistics setup." },
      { question: "How long is the lead time to the UAE?", answer: "Production usually takes 7-15 days after artwork and specification sign-off, and Karachi to Jebel Ali sea transit is roughly 3-5 days. Recurring programs can be scheduled in advance." },
      { question: "Do you supply Arabic/English carton labeling for the UAE?", answer: "Yes - private-label and bilingual carton labeling can be arranged. Share your label artwork and destination emirate with the RFQ." },
    ],
  },
  {
    slug: "saudi-arabia",
    country: "Saudi Arabia",
    title: "Silica gel desiccant supply for Saudi importers.",
    description:
      "Bulk silica gel packets and cargo moisture control formats for Saudi packaging, warehousing, distribution, industrial, and export buyers.",
    buyerTypes: ["Dammam and Jeddah importers", "Industrial packaging buyers", "Pharma and consumer-goods packagers", "Logistics and warehouse operators"],
    ports: ["Jeddah Islamic Port", "King Abdulaziz Port Dammam", "Riyadh dry-port routing", "GCC forwarding partners"],
    products: ["1g-10g sachets", "50g-500g export carton packs", "1kg-5kg cargo strips", "Recurring distributor supply"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Saudi buyers usually need the product format, quantity, destination city or port, labeling requirements, and document set aligned before pricing is useful.",
    rfqTip: "Share target port, destination city, application, and whether the order is one-time or recurring monthly supply.",
    moq: "From 100 kg or 100,000 sachets per format; bulk beads from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Jeddah/Dammam ~6-9 days.",
    currency: "Quoted in USD (SAR on request)",
    incoterms: ["FOB Karachi", "CIF Jeddah", "CIF Dammam", "DAP Saudi Arabia"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "The GCC common tariff baseline is 5%, but Saudi Arabia has raised rates on several categories since 2020 — verify the live 2811.22 rate with ZATCA before costing:",
      tariffLookup: { label: "ZATCA (Saudi customs authority)", href: "https://zatca.gov.sa/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Some import routes require SABER platform conformity registration — confirm with your importer of record whether it applies to your desiccant shipment.",
        "Saudi clearing agents commonly request attested commercial documents; align the document set before dispatch.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Saudi Arabia?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces, and bulk silica gel beads from about 500 kg. Trial and sample quantities are available before a bulk order." },
      { question: "Which ports do you ship to in Saudi Arabia?", answer: "Common destinations are Jeddah Islamic Port and King Abdulaziz Port in Dammam, with onward routing to Riyadh and other cities via dry-port and forwarding partners." },
      { question: "What Incoterms are available for Saudi orders?", answer: "FOB Karachi, CIF Jeddah, CIF Dammam, and DAP Saudi Arabia, so buyers can match terms to their freight and customs arrangements." },
      { question: "Do you support recurring monthly supply to Saudi Arabia?", answer: "Yes - recurring distributor and industrial supply programs can be scheduled with a fixed spec, MOQ, and lead-time baseline so repeat orders only need volume and destination updates." },
    ],
  },
  {
    slug: "qatar",
    country: "Qatar",
    title: "Silica gel supplier for Qatar packaging and logistics buyers.",
    description:
      "Desiccant sachets, bulk packs, and shipment moisture control options for Qatar importers, distributors, storage teams, and project supply buyers.",
    buyerTypes: ["Doha importers", "Project supply buyers", "Warehouse teams", "Packaging distributors"],
    ports: ["Hamad Port", "Doha logistics hubs", "GCC consolidation routes", "Air-cargo sample shipments"],
    products: ["0.5g-10g sachets", "25g-500g bags", "Container strips", "Sample packs before bulk orders"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "For Qatar inquiries, sample shipment, carton labeling, and import-document expectations should be confirmed before bulk order planning.",
    rfqTip: "Send the project/application, target quantity, destination in Qatar, and sample requirement before asking for final price.",
    moq: "From 100 kg or 100,000 sachets per format; sample packs available before bulk commitment.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Hamad Port ~5-8 days.",
    currency: "Quoted in USD (QAR on request)",
    incoterms: ["FOB Karachi", "CIF Hamad Port", "DAP Qatar"],
    faqs: [
      { question: "What is the MOQ for silica gel to Qatar?", answer: "Orders generally start from around 100 kg or 100,000 sachets per format, with sample packs available before a bulk commitment - useful for project-supply buyers validating fit." },
      { question: "Which port serves Qatar shipments?", answer: "Hamad Port is the main sea-freight destination, with air-cargo available for samples and urgent project requirements." },
      { question: "Can I get samples before ordering for a Qatar project?", answer: "Yes - sample packs can ship ahead of a bulk order so project and packaging teams can validate format and quality before committing." },
      { question: "What Incoterms do you offer for Qatar?", answer: "FOB Karachi, CIF Hamad Port, and DAP Qatar, depending on whether you want factory handover, freight to port, or delivered terms." },
    ],
  },
  {
    slug: "usa",
    country: "USA",
    title: "Silica gel export supply for USA bulk and private-label buyers.",
    description:
      "Factory-direct silica gel desiccant packets, bulk beads, and cargo strips for US distributors, packaging companies, e-commerce packers, and industrial buyers.",
    buyerTypes: ["Packaging distributors", "Private-label buyers", "Electronics and storage brands", "Industrial procurement teams"],
    ports: ["US West Coast routing", "US East Coast routing", "Air sample shipments", "Buyer-nominated forwarders"],
    products: ["0.5g-10g sachets", "25g-500g bags", "25kg loose bulk", "Private-label sachet/carton programs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "US buyers should confirm product material, warning text, carton labeling, and required compliance documents before sample or bulk production.",
    rfqTip: "Share state, destination port or forwarder, pack count, warning-text requirement, and whether you need private label.",
    moq: "From 100 kg or 100,000 sachets per format; 25kg loose bulk from 500 kg; samples ship by air before bulk commitment.",
    leadTime:
      "Production 7-15 days after sign-off; typical sea transit Karachi → US East Coast ~30-40 days and West Coast ~28-38 days depending on carrier routing and transshipment.",
    currency: "Quoted in USD",
    incoterms: ["FOB Karachi", "CIF US port", "DAP with buyer's forwarder"],
    customs: {
      hsCode:
        "HTS 2811.22 (silicon dioxide); silica gel is commonly entered under 2811.22.10 — confirm the statistical suffix with your customs broker",
      dutyNote:
        "Confirm the live general rate and any active trade measures for 2811.22 in the official Harmonized Tariff Schedule:",
      tariffLookup: { label: "USITC HTS search", href: "https://hts.usitc.gov/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "ISF (10+2) filing is required before vessel loading for US-bound ocean freight — coordinate with your forwarder.",
        "For direct food-contact use, note that FDA food-contact certification (FCN/GRAS) is not currently held — confirm the requirement with the export desk before commercial terms.",
      ],
    },
    faqs: [
      { question: "What is the import duty on silica gel into the USA?", answer: "Silica gel is classified under HTS 2811.22 (commonly 2811.22.10). Duty rates and trade measures change, so confirm the live rate in the official USITC Harmonized Tariff Schedule or with your customs broker before costing a shipment." },
      { question: "How long does shipping from Pakistan to the USA take?", answer: "Typical sea transit from Karachi is roughly 30-40 days to East Coast ports and 28-38 days to the West Coast, depending on carrier routing and transshipment. Production adds 7-15 days after specification sign-off. Air freight is available for samples." },
      { question: "What documents come with a US-bound silica gel shipment?", answer: "Commercial invoice, packing list, bill of lading, and Certificate of Origin as standard, with SDS and COA available on request. FDA food-contact certification is not currently held. ISF (10+2) data is coordinated with your forwarder before vessel loading." },
    ],
  },
  {
    slug: "vietnam",
    updatedAt: "2026-09-02",
    country: "Vietnam",
    title: "Silica gel desiccant supply for Vietnam packaging and export buyers.",
    description:
      "Factory-direct silica gel sachets, bulk beads, and container moisture control formats for Vietnam garment, footwear, electronics, seafood, and logistics buyers.",
    buyerTypes: ["Garment and footwear exporters", "Electronics packaging teams", "Seafood and dry-goods packers", "Ho Chi Minh and Hanoi importers"],
    ports: ["Cat Lai", "Cai Mep-Thi Vai", "Hai Phong", "Da Nang logistics routing"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "1kg-5kg cargo strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Vietnam buyers often compare carton-level sachets with container-level strips for humid sea freight. Share the export industry, port, carton volume, and storage time before pricing.",
    rfqTip: "Send Vietnam port, industry, product format, monthly volume, and whether the order protects garments, footwear, electronics, or food packaging.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Ho Chi Minh (Cat Lai / Cai Mep) or Hai Phong roughly 14-20 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Ho Chi Minh", "CIF Hai Phong", "DAP Vietnam"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Vietnam import tariff for HS 2811.22 and any applicable preferential rate on the official customs tariff before costing:",
      tariffLookup: { label: "Vietnam Customs", href: "https://www.customs.gov.vn/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Footwear and leather programs shipping onward to the EU or UK should request the DMF-free statement with the order; it is issued on manufacturer letterhead.",
        "Specify cobalt-free orange indicating gel where the finished goods are re-exported to EU/UK markets, since cobalt-chloride blue gel is restricted there.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Vietnam?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to Vietnam?", answer: "Production is usually 7-15 days after artwork and specification sign-off. Sea transit from Karachi to Ho Chi Minh (Cat Lai or Cai Mep) or Hai Phong is roughly 14-20 days depending on the service and transhipment; confirm the sailing with your forwarder." },
      { question: "Which sachet sizes do Vietnamese footwear and garment exporters use?", answer: "Shoe boxes usually take 1g-5g sachets, garment polybags 0.5g-2g, and master cartons 10g-50g packs. Electronics packers often pair small sachets inside the retail box with 1kg-5kg container strips for the sea leg. Share carton volume and storage time and we will size the format." },
      { question: "Which Incoterms do you offer for Vietnam orders?", answer: "EXW Karachi, FOB Karachi, CIF Ho Chi Minh or Hai Phong, and DAP Vietnam. Most Vietnamese importers with their own forwarder take FOB Karachi; CIF is available where you want freight included to port." },
      { question: "Do you supply SDS and COA for Vietnam customs and factory audits?", answer: "Yes. Every shipment ships with an SDS, batch COA, ISO 9001:2015 reference, and a DMF-free statement on request. Food-contact, FDA, and pharma GMP certifications are not currently held, so state the end use in the RFQ." },
    ],
  },
  {
    slug: "russia",
    updatedAt: "2026-09-02",
    country: "Russia",
    title: "Silica gel export supply for Russian industrial and packaging buyers.",
    description:
      "Moisture-control supply for Russian distributors, warehouse teams, machinery packers, electronics importers, and industrial packaging buyers.",
    buyerTypes: ["Industrial distributors", "Machinery and spare-parts packers", "Electronics importers", "Warehouse procurement teams"],
    ports: ["Saint Petersburg", "Novorossiysk", "Vladivostok", "Buyer-nominated forwarders"],
    products: ["1g-10g sachets", "50g-500g industrial packs", "25kg loose bulk", "Container strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Russian inquiries should clarify target port, language requirements, importer documentation, and whether the application is storage, machinery export, or consumer packaging.",
    rfqTip: "Send destination city or port, shipment volume, required document language, Incoterms, and product sensitivity.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Novorossiysk or Saint Petersburg roughly 30-40 days (routing and sailing confirmed with your forwarder case by case).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Novorossiysk", "CIF Saint Petersburg", "DAP Russia"],
    faqs: [
      { question: "What is the MOQ for silica gel to Russia?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Industrial 50g-500g packs and 25kg loose bulk are quoted by weight." },
      { question: "How long does shipping take from Karachi to Russia?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Novorossiysk or Saint Petersburg is roughly 30-40 days depending on the service and transhipment. Routing is confirmed with the buyer's forwarder case by case." },
      { question: "Can you ship to Russia under current conditions?", answer: "Routing, carrier availability, and banking arrangements are confirmed case by case with the buyer's forwarder and bank before any order is accepted. Share the destination port, forwarder, and settlement method in the RFQ so feasibility can be checked early." },
      { question: "Which Incoterms do you offer for Russia?", answer: "EXW Karachi, FOB Karachi, CIF Novorossiysk or Saint Petersburg, and DAP Russia are quoted in principle; the workable term depends on the route and forwarder confirmed for the specific shipment." },
      { question: "Which documents accompany Russian shipments?", answer: "Commercial invoice, packing list, bill of lading, and Certificate of Origin, plus SDS, batch COA, ISO 9001:2015 reference, and a DMF-free statement on request. State the required document language in the RFQ." },
    ],
  },
  {
    slug: "bangladesh",
    updatedAt: "2026-09-02",
    country: "Bangladesh",
    title: "Silica gel supplier for Bangladesh garment, leather, and packaging exporters.",
    description:
      "Silica gel sachets, bulk packs, and cargo strips for Bangladesh garment factories, footwear exporters, packaging distributors, and warehouse buyers.",
    buyerTypes: ["Garment exporters", "Leather and footwear factories", "Packaging distributors", "Warehouse and cargo teams"],
    ports: ["Chittagong", "Mongla", "Dhaka inland routing", "Air sample shipments"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "Private-label sachets", "1kg-5kg cargo strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Bangladesh export buyers should match sachet size to carton volume and humidity risk, especially for garments, leather goods, footwear, and long-haul sea freight.",
    rfqTip: "Send carton type, monthly quantity, destination port, private-label needs, and whether container strips are also required.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Chittagong roughly 7-12 days (confirm the sailing with your forwarder). Air samples reach Dhaka faster.",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Chittagong", "DAP Bangladesh"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Bangladesh customs duty and supplementary charges for HS 2811.22 on the official National Board of Revenue tariff before costing:",
      tariffLookup: { label: "National Board of Revenue (NBR) Bangladesh", href: "https://nbr.gov.bd/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Garment, leather, and footwear exporters shipping onward to the EU or UK should request the DMF-free statement with the order and specify cobalt-free orange indicating gel, since cobalt-chloride blue gel is restricted in those markets.",
        "Bonded-warehouse or back-to-back LC buyers should state the import scheme in the RFQ so documents match the bank and customs file.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Bangladesh?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to Chittagong?", answer: "Production is usually 7-15 days after sign-off, and sea transit from Karachi to Chittagong is roughly 7-12 days depending on the sailing; confirm with your forwarder. Samples can go by air to Dhaka before the bulk order." },
      { question: "Which sachet sizes do Bangladesh garment and leather exporters use?", answer: "Garment polybags usually take 0.5g-2g sachets, shoe boxes 2g-5g, and master cartons 10g-50g packs. Long-haul sea freight to Europe or North America is often paired with 1kg-5kg container strips. Share carton volume and route and we will size the format." },
      { question: "Do you supply a DMF-free statement for leather and footwear exports?", answer: "Yes. A DMF-free statement on manufacturer letterhead ships with the order on request, alongside SDS, batch COA, and the ISO 9001:2015 reference. Specify cobalt-free orange indicating gel for goods re-exported to the EU or UK." },
      { question: "Which Incoterms do you offer for Bangladesh?", answer: "EXW Karachi, FOB Karachi, CIF Chittagong, and DAP Bangladesh. Most Bangladesh importers take CIF Chittagong and clear with their own C&F agent." },
    ],
  },
  {
    slug: "indonesia",
    updatedAt: "2026-09-02",
    country: "Indonesia",
    title: "Silica gel desiccant supplier for Indonesia importers and exporters.",
    description:
      "Desiccant sachets, bulk silica gel, and container moisture control support for Indonesian packaging, footwear, electronics, food, and logistics buyers.",
    buyerTypes: ["Jakarta and Surabaya importers", "Footwear and garment packers", "Electronics packaging teams", "Food and dry-goods exporters"],
    ports: ["Tanjung Priok", "Tanjung Perak", "Belawan", "Makassar logistics routing"],
    products: ["0.5g-10g sachets", "25g-500g packs", "25kg loose bulk", "Container desiccant strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Indonesia's humid logistics environment makes destination, storage time, and packaging material important quote inputs before selecting sachets or container strips.",
    rfqTip: "Send island or port, product application, order quantity, sample need, and whether the buyer requires carton or container-level moisture control.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Jakarta (Tanjung Priok) or Surabaya (Tanjung Perak) roughly 14-20 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Jakarta", "CIF Surabaya", "DAP Indonesia"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Indonesian import duty and any import-licensing requirement for HS 2811.22 on the official Indonesia National Single Window before costing:",
      tariffLookup: { label: "Indonesia National Single Window (INSW)", href: "https://www.insw.go.id/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Indonesian importers should confirm their importer identification and any product-specific import licensing with their customs broker before the first shipment; the supplier provides SDS, COA, and origin documents to support the file.",
        "Footwear and garment programs re-exported to the EU or UK should request the DMF-free statement and specify cobalt-free orange indicating gel.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Indonesia?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. 25kg loose bulk is quoted by weight." },
      { question: "How long does shipping take from Karachi to Indonesia?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Tanjung Priok (Jakarta) or Tanjung Perak (Surabaya) is roughly 14-20 days depending on the service and transhipment; confirm with your forwarder." },
      { question: "Which format works best for humid Indonesian warehouses and sea legs?", answer: "Carton-level sachets (2g-50g) protect the goods inside each box, while 1kg-5kg container strips manage headspace humidity on the sea leg. Many Indonesian footwear and electronics packers use both. Share storage time and packaging material and we will recommend a combination." },
      { question: "Which Incoterms do you offer for Indonesia?", answer: "EXW Karachi, FOB Karachi, CIF Jakarta or Surabaya, and DAP Indonesia. Buyers with their own forwarder usually take FOB Karachi; CIF is available where you want freight included to port." },
      { question: "Do you supply SDS and COA for Indonesian import clearance?", answer: "Yes. Every shipment ships with SDS, batch COA, ISO 9001:2015 reference, and a DMF-free statement on request. Food-contact, Halal, FDA, and pharma GMP certifications are not currently held, so state the end use in the RFQ." },
    ],
  },
  {
    slug: "mexico",
    country: "Mexico",
    updatedAt: "2026-07-09",
    title: "Silica gel supplier for Mexico packaging and industrial buyers.",
    description:
      "Factory-direct silica gel packets, bulk beads, private-label sachets, and cargo strips for Mexican packaging distributors, electronics and automotive suppliers, warehouses, and importers.",
    buyerTypes: ["Packaging distributors", "Electronics and automotive suppliers", "Warehouse and 3PL teams", "Private-label desiccant buyers"],
    ports: ["Manzanillo", "Veracruz", "Lazaro Cardenas", "Altamira"],
    products: ["0.5g-10g silica gel sachets", "25g-500g carton packs", "25kg loose bulk beads", "Container desiccant strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Mexico programs should separate Pacific routing through Manzanillo or Lazaro Cardenas from Gulf routing through Veracruz or Altamira. The destination port, inland delivery point, labeling language, and storage duration all affect pack format and freight planning.",
    rfqTip: "Send destination port and state, Spanish/English labeling needs, packet size, monthly quantity, Incoterms, and whether the material is for distributor stock or direct factory use.",
    moq: "Typically from 100 kg or 100,000 sachets per format; 25 kg loose-bulk orders are quoted from 500 kg. Samples can be reviewed before bulk production.",
    leadTime:
      "Production is normally planned 7-15 days after specification and artwork approval. Ocean transit and inland delivery are quoted against the selected Mexico port and current carrier schedule.",
    currency: "Export quotations issued in USD",
    incoterms: ["FOB Karachi", "CIF Manzanillo", "CIF Veracruz", "DAP Mexico by quotation"],
    procurementNotes: [
      {
        label: "Industrial demand",
        title: "Electronics and automotive packaging",
        text: "For components, spare parts, control modules, and metal assemblies, share the barrier-bag or carton dimensions, storage duration, and expected monthly volume so sachet size can be reviewed against the actual pack.",
      },
      {
        label: "Distributor programs",
        title: "Stock formats for Mexican resellers",
        text: "Distributors can combine standard small sachets, larger carton packs, and loose bulk beads under one documented supply program. Repeat orders should retain the approved specification and carton configuration.",
      },
      {
        label: "Label planning",
        title: "Spanish and English private labeling",
        text: "Private-label inquiries should include packet warning text, brand artwork, carton marks, barcode requirements, and preferred language before samples are approved. Final compliance remains subject to the buyer's local review.",
      },
      {
        label: "Port selection",
        title: "Pacific and Gulf routing",
        text: "Use Manzanillo or Lazaro Cardenas for Pacific-side planning and Veracruz or Altamira for Gulf-side planning. Share the final inland destination so freight comparisons reflect the complete route rather than port cost alone.",
      },
    ],
    relatedLinks: [
      {
        label: "Packet formats",
        description: "Compare small sachets and industrial packet sizes for cartons and component packaging.",
        href: "/silica-gel-packets",
      },
      {
        label: "Private label",
        description: "Review custom packet printing, artwork, and distributor packaging options.",
        href: "/private-label-desiccant-packets",
      },
      {
        label: "Container cargo",
        description: "Plan moisture control for long-haul containers and warehouse handover.",
        href: "/shipping-container-desiccant-supplier",
      },
    ],
    faqs: [
      {
        question: "What is the MOQ for silica gel exports to Mexico?",
        answer:
          "Orders typically start from 100 kg or 100,000 sachets per format. Loose bulk silica gel is normally quoted from 500 kg, while samples can be reviewed before a bulk order.",
      },
      {
        question: "Can sachets and cartons carry Spanish-language labeling?",
        answer:
          "Yes. Spanish or bilingual Spanish/English packet text and carton marks can be prepared from buyer-approved artwork. Share warning text, barcode, brand, and local labeling requirements before sample approval.",
      },
      {
        question: "Which Mexico ports can be quoted?",
        answer:
          "CIF planning can be prepared for Manzanillo, Lazaro Cardenas, Veracruz, or Altamira. The best route depends on the final state or inland delivery point, shipment volume, and current carrier schedule.",
      },
      {
        question: "Which documents are supplied with a Mexico shipment?",
        answer:
          "The standard documentation set can include the commercial invoice, packing list, SDS, Certificate of Analysis, ISO 9001:2015 certificate, and DMF-free statement. Confirm any additional broker or destination requirement before production.",
      },
      {
        question: "Can Mexican distributors order private-label silica gel packets?",
        answer:
          "Yes. Private-label programs can cover packet printing, approved artwork, carton marks, and repeat specifications for distributors. MOQ depends on packet size, material, and print configuration.",
      },
    ],
  },
  {
    slug: "turkey",
    updatedAt: "2026-09-02",
    country: "Turkey",
    title: "Silica gel desiccant supplier for Turkey importers and textile exporters.",
    description:
      "Moisture-control supply for Turkey textile, leather, machinery, packaging, and regional distribution buyers sourcing silica gel sachets and bulk desiccants.",
    buyerTypes: ["Textile and garment exporters", "Leather and footwear buyers", "Machinery packaging teams", "Istanbul and Izmir distributors"],
    ports: ["Istanbul / Ambarli", "Mersin", "Izmir", "Gemlik"],
    products: ["0.5g-10g sachets", "25g-500g packs", "Bulk beads", "Container strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Turkey inquiries should separate domestic distributor stock from export-carton protection because product format, carton text, and route assumptions change the quote.",
    rfqTip: "Send target city or port, application, carton or bulk format, monthly volume, and labeling language needs.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Mersin or Istanbul (Ambarli) roughly 18-25 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Mersin", "CIF Istanbul (Ambarli)", "DAP Turkey"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Turkish customs tariff for HS 2811.22 and any applicable preference or additional duty on the official Ministry of Trade resources before costing:",
      tariffLookup: { label: "Türkiye Ministry of Trade", href: "https://www.ticaret.gov.tr/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Textile, leather, and footwear programs re-exported to the EU should request the DMF-free statement with the order and specify cobalt-free orange indicating gel, since cobalt-chloride blue gel is restricted under EU REACH.",
        "Turkish carton-label wording (TR/EN) can be arranged for distributor stock; share artwork with the RFQ.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Turkey?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to Turkey?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Mersin or Istanbul (Ambarli) is roughly 18-25 days depending on the service and transhipment; confirm with your forwarder. Mersin usually suits southern and Anatolian textile hubs, Ambarli the Istanbul region." },
      { question: "Which sachet sizes do Turkish textile and leather exporters use?", answer: "Garment polybags usually take 0.5g-2g sachets, leather goods and shoe boxes 2g-5g, and master cartons 10g-50g packs. Machinery packers use 50g-500g industrial packs and 1kg-5kg container strips. Share carton volume and route and we will size the format." },
      { question: "Which Incoterms do you offer for Turkey?", answer: "EXW Karachi, FOB Karachi, CIF Mersin or Istanbul (Ambarli), and DAP Turkey. Most Turkish importers take CIF and clear with their own customs broker." },
      { question: "Do you supply a DMF-free statement and cobalt-free gel for EU re-export?", answer: "Yes. A DMF-free statement on manufacturer letterhead ships with the order on request, and cobalt-free orange indicating gel is standard for EU-bound programs. REACH registration is not currently held, so raise that with the first RFQ if your customer requires it." },
    ],
  },
  {
    slug: "india",
    updatedAt: "2026-09-02",
    country: "India",
    title: "Silica gel supplier for India packaging, pharma, electronics, and export buyers.",
    description:
      "Silica gel sachets, bulk beads, container strips, and private-label desiccant support for Indian distributors, exporters, pharma packaging, and electronics buyers.",
    buyerTypes: ["Packaging distributors", "Pharma and healthcare packagers", "Electronics packaging teams", "Leather and textile exporters"],
    ports: ["Nhava Sheva", "Mundra", "Chennai", "Kolkata"],
    products: ["0.5g-10g sachets", "25g-500g packs", "25kg loose bulk", "Private-label sachets"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Indian buyers usually compare local supply with import alternatives. Clear price discussion needs format, monthly volume, destination, documents, and whether private label is required.",
    rfqTip: "Send city or port, use case, volume, compliance expectations, and whether the inquiry is for resale, factory use, or export packaging.",
    moq: "Typically from 100 kg or 100,000 sachets per format; loose beads from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off. Transit is confirmed case by case because Pakistan-India cargo usually routes through a third-country hub; allow several weeks and confirm the practical route with your forwarder.",
    currency: "Quoted in USD",
    incoterms: ["FOB Karachi", "CIF (subject to routing)", "DAP (subject to routing)"],
    faqs: [
      { question: "Can DryGelWorld ship silica gel to India?", answer: "Yes, subject to the routing and documentation that apply to Pakistan-India trade at the time of order. Shipments usually move through a third-country hub, so the forwarder should confirm the practical route and paperwork before scheduling." },
      { question: "What is the MOQ for silica gel to India?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format and loose beads from about 500 kg. Trial quantities are available before a bulk commitment." },
      { question: "How is silica gel from Pakistan priced for Indian buyers?", answer: "Quotes are in USD on FOB Karachi terms by default; CIF or DAP can be quoted once the routing is confirmed. Indian buyers typically compare against domestic supply, so send format, monthly volume, and documents for a like-for-like comparison." },
      { question: "What documents ship with silica gel to India?", answer: "Commercial invoice, packing list, bill of lading, Certificate of Origin, and SDS on request, plus a batch COA and DMF-free statement where the application needs them. Check the live duty and IGST on ICEGATE before costing." },
    ],
    customs: {
      hsCode: "HS 2811 22 00 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "India applies basic customs duty plus IGST on this line; rates change with budget cycles — confirm the live rate on the official customs portal before costing:",
      tariffLookup: { label: "ICEGATE (Indian Customs)", href: "https://www.icegate.gov.in/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Pakistan-India trade routing may require third-country transshipment — confirm the practical route and documentation with your forwarder before committing to a schedule.",
      ],
    },
  },
  {
    slug: "brazil",
    updatedAt: "2026-09-02",
    country: "Brazil",
    title: "Silica gel export supply for Brazil importers and industrial packaging buyers.",
    description:
      "Industrial silica gel sachets, bulk desiccants, and cargo moisture control formats for Brazil distributors, packaging buyers, warehouses, and import teams.",
    buyerTypes: ["Brazilian distributors", "Industrial packaging buyers", "Warehouse and logistics teams", "Private-label importers"],
    ports: ["Santos", "Paranagua", "Rio de Janeiro", "Itajai"],
    products: ["1g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "1kg-5kg cargo strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Brazil inquiries should define port, import documentation expectations, labeling language, and whether the buyer is stocking distributors or protecting export cartons.",
    rfqTip: "Send port, Portuguese/English labeling needs, monthly volume, Incoterms, and required document list.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Santos roughly 35-45 days (confirm the sailing and transhipment with your forwarder).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Santos", "DAP Brazil"],
    customs: {
      hsCode: "NCM 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Brazil applies the Mercosur Common External Tariff (TEC). Check the live import duty and federal taxes for NCM 2811.22 through the official Siscomex resources before costing:",
      tariffLookup: { label: "Siscomex (Brazil foreign trade portal)", href: "https://www.gov.br/siscomex/pt-br" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Brazilian importers must hold RADAR/Siscomex registration and typically clear through a licensed customs broker (despachante); confirm any import licence requirement for the NCM with the broker before the first shipment.",
        "A Portuguese-language SDS (FISPQ) can be supplied on request alongside the English SDS; state the language requirement in the RFQ with any Portuguese carton-label wording.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Brazil?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Given the long sea leg, many Brazilian distributors consolidate to a full pallet program." },
      { question: "How long does shipping take from Karachi to Santos?", answer: "Production is usually 7-15 days after sign-off, and sea transit from Karachi to Santos is roughly 35-45 days depending on the service and transhipment; confirm with your forwarder. Samples can go by air ahead of the bulk order." },
      { question: "Can you supply the SDS in Portuguese?", answer: "Yes. A Portuguese-language SDS can be supplied on request alongside the English SDS, together with batch COA, ISO 9001:2015 reference, and a DMF-free statement. State the language requirement and any Portuguese carton-label wording in the RFQ." },
      { question: "Which Incoterms do you offer for Brazil?", answer: "EXW Karachi, FOB Karachi, CIF Santos, and DAP Brazil. Most Brazilian importers take FOB or CIF and clear with their own customs broker; confirm your RADAR registration and broker before ordering." },
      { question: "Which format suits long sea transit to Brazil?", answer: "For a 35-45 day voyage, pair carton-level sachets (5g-50g) with 1kg-5kg container strips to manage headspace humidity. Industrial packers protecting machinery or spare parts usually use 50g-500g packs and 25kg loose bulk." },
    ],
  },
  {
    slug: "malaysia",
    updatedAt: "2026-09-02",
    country: "Malaysia",
    title: "Silica gel supplier for Malaysia packaging buyers.",
    description:
      "Silica gel packets, bulk beads, private-label sachets, and container strips for Malaysian electronics packagers, food packaging, warehouses, and importers.",
    buyerTypes: ["Electronics and component packagers", "Food and dry-goods packaging teams", "Packaging distributors", "Port Klang importers"],
    ports: ["Port Klang", "Tanjung Pelepas", "Penang", "Pasir Gudang"],
    products: ["0.5g-10g sachets", "25g-500g bags", "25kg loose bulk", "Container strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Malaysia buyers should confirm whether the risk is electronics packaging humidity, food packaging shelf protection, warehouse stock, or container route exposure.",
    rfqTip: "Send destination port, industry, packet size or gram range, quantity, and whether SDS/COA are required before sample dispatch.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Port Klang or Penang roughly 10-14 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Port Klang", "CIF Penang", "DAP Malaysia"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Malaysian import duty and sales tax treatment for HS 2811.22 on the official Royal Malaysian Customs tariff before costing:",
      tariffLookup: { label: "Royal Malaysian Customs Department", href: "https://www.customs.gov.my/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Electronics packagers should specify sachet size and any ESD or non-dusting packaging film requirement in the RFQ so the sample matches the production line.",
        "Food-contact, Halal, FDA, and pharma GMP certifications are not currently held; the DMF-free statement, SDS, and batch COA are supplied with every order.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Malaysia?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to Port Klang?", answer: "Production is usually 7-15 days after sign-off, and sea transit from Karachi to Port Klang or Penang is roughly 10-14 days depending on the sailing; confirm with your forwarder. Samples can go by air first." },
      { question: "Which sachet sizes do Malaysian electronics packagers use?", answer: "Component and PCB packaging usually takes 0.5g-2g sachets inside the moisture-barrier bag, 5g-10g in the retail box, and 25g-50g packs in master cartons. Port Klang importers protecting sea freight often add 1kg-5kg container strips." },
      { question: "Which Incoterms do you offer for Malaysia?", answer: "EXW Karachi, FOB Karachi, CIF Port Klang or Penang, and DAP Malaysia. Most Malaysian importers with a forwarder take FOB Karachi; CIF is available where you want freight included to port." },
      { question: "Do you send SDS and COA before sample dispatch?", answer: "Yes. SDS, a representative batch COA, and the ISO 9001:2015 reference can be shared before samples ship so your QA team can review them. A DMF-free statement is issued with the order on request." },
    ],
  },
  {
    slug: "pakistan",
    updatedAt: "2026-09-02",
    country: "Pakistan",
    title: "Silica gel manufacturer in Pakistan for local and export packaging buyers.",
    description:
      "Karachi-origin silica gel sachets, bulk beads, cargo strips, and private-label desiccant support for Pakistan manufacturers, warehouses, exporters, and distributors.",
    buyerTypes: ["Karachi manufacturers", "Lahore and Faisalabad exporters", "Packaging distributors", "Warehouse and textile buyers"],
    ports: ["Karachi", "Port Qasim", "Lahore / Faisalabad inland routing", "Domestic courier samples"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "Bulk silica gel", "Private-label sachets"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Pakistan buyers should share city, application, packet size, quantity, and whether the goods are for domestic storage or export-carton moisture protection.",
    rfqTip: "Send city, required gram size, carton quantity, industry, and whether the order is sample, one-time bulk, or monthly repeat supply.",
    moq: "Quoted by carton or monthly volume; trial cartons available; factory pickup in Karachi or nationwide dispatch.",
    leadTime: "Production 7-15 days after artwork/spec sign-off (stock formats often sooner); road delivery within Pakistan roughly 1-5 days depending on city.",
    currency: "Quoted in PKR",
    incoterms: ["EXW Karachi", "Delivered within Pakistan"],
    faqs: [
      { question: "What is the minimum order for silica gel in Pakistan?", answer: "Domestic orders are quoted by carton or by monthly volume rather than a fixed export MOQ. Trial cartons are available so you can test the gram size on your line before committing to repeat supply." },
      { question: "How quickly can you deliver within Pakistan?", answer: "Stock formats can often ship within days; custom or printed sachets take 7-15 days after artwork and specification sign-off. Road delivery from Karachi to Lahore, Faisalabad, Sialkot, or Islamabad is roughly 1-5 days, and factory pickup in Karachi is available." },
      { question: "Do you supply Pakistan exporters with documents for their own shipments?", answer: "Yes. Exporters packing garments, leather, surgical goods, rice, or textiles receive SDS, batch COA, ISO 9001:2015 reference, and a DMF-free statement on request so the desiccant is covered in their buyer file. Cobalt-free orange indicating gel is standard for EU and UK-bound cartons." },
      { question: "Are prices quoted in PKR?", answer: "Yes, domestic supply is quoted in PKR on EXW Karachi or delivered-within-Pakistan terms. Exporters who prefer USD pricing for FOB Karachi programs can use the FOB Karachi page." },
      { question: "Which sachet sizes do Pakistan garment and leather exporters use?", answer: "Garment polybags usually take 0.5g-2g sachets, shoe and leather-goods boxes 2g-5g, and master cartons 10g-50g packs. Textile and rice exporters shipping long sea legs often add 1kg-5kg container strips." },
    ],
  },
  {
    slug: "fob-karachi",
    updatedAt: "2026-09-02",
    country: "FOB Karachi",
    title: "FOB Karachi silica gel quotes for global importers.",
    description:
      "A focused buying page for importers who already manage freight and need clear FOB Karachi pricing inputs for silica gel sachets, bulk beads, and cargo strips.",
    buyerTypes: ["Buyer-nominated freight forwarders", "Bulk importers", "Trading companies", "Recurring distributor programs"],
    ports: ["FOB Karachi", "Buyer forwarder handover", "CIF on request", "EXW on request"],
    products: ["Sachets by gram size", "Bulk 25kg bags", "1kg-5kg container strips", "Custom cartons and pallet plans"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "FOB Karachi works best when the buyer already knows freight routing and wants product, carton quantity, and handover details confirmed first.",
    rfqTip: "Send product size, monthly volume, carton or pallet quantity, forwarder details, and required document list.",
    moq: "Per format, with FOB Karachi as the default term: typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Cargo ready 7-15 days after artwork/spec sign-off; the buyer's forwarder collects at Karachi Port or Port Qasim on the agreed cargo-ready date.",
    currency: "Quoted in USD (local currency on request)",
    incoterms: ["FOB Karachi", "FOB Port Qasim", "EXW Karachi factory"],
    faqs: [
      { question: "What does an FOB Karachi price include?", answer: "FOB Karachi covers the product, export packing, inland transport to Karachi Port or Port Qasim, export clearance, and loading on board the vessel nominated by your forwarder. Ocean freight, insurance, and destination charges are for the buyer." },
      { question: "What is the MOQ on FOB Karachi terms?", answer: "MOQ is set per format: typically from 100 kg or 100,000 sachets per format, dry clay from about 500 kg, with trial and sample quantities available before bulk. Mixed-format orders can be consolidated on one pallet plan." },
      { question: "When is cargo ready for my forwarder?", answer: "Cargo is usually ready 7-15 days after artwork and specification sign-off. Share your forwarder's details and the target vessel cut-off in the RFQ so the cargo-ready date and booking align." },
      { question: "Can you quote EXW or CIF instead of FOB?", answer: "Yes. EXW Karachi factory is available where the forwarder collects at the plant, and CIF to a named port can be quoted on request if you would rather have freight included." },
      { question: "Which documents come with an FOB Karachi shipment?", answer: "Commercial invoice, packing list, bill of lading, and Certificate of Origin, plus SDS, batch COA, ISO 9001:2015 reference, and a DMF-free statement on request. State any destination-specific document needs in the RFQ." },
    ],
  },
  {
    slug: "uk",
    updatedAt: "2026-09-02",
    country: "United Kingdom",
    title: "Silica gel desiccant supplier for UK importers and packaging buyers.",
    description:
      "Factory-direct silica gel sachets, dry clay packs, bulk beads, and container strips for UK distributors, packaging companies, electronics OEMs, and footwear or leather importers.",
    buyerTypes: ["UK distributors and re-packers", "Electronics packagers and OEMs", "Footwear, leather and textile importers", "Pharma and healthcare procurement"],
    ports: ["Felixstowe", "Southampton", "London Gateway", "Liverpool"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg container strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "UK buyers should align REACH expectations and post-Brexit import documentation before commercial terms. REACH registration is not a certification currently held by DryGelWorld, so the conversation should start early.",
    rfqTip: "Send target port, monthly volume, Incoterms, REACH expectations, and whether you need silica gel, dry clay, or both formats in one program.",
    moq: "Typically from 100 kg or 100,000 sachets per format; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Felixstowe/Southampton roughly 25-30 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (GBP on request)",
    incoterms: ["FOB Karachi", "CIF Felixstowe", "CIF Southampton", "DAP UK"],
    faqs: [
      { question: "What is the MOQ for silica gel to the UK?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to the UK?", answer: "Production is usually 7-15 days after sign-off, and sea transit from Karachi to Felixstowe or Southampton is roughly 25-30 days depending on the sailing and transhipment. Air freight is possible for trial quantities." },
      { question: "Which Incoterms do you offer for UK orders?", answer: "FOB Karachi, CIF Felixstowe or Southampton, and DAP UK. Most UK distributors take CIF and clear with their own broker; DAP is available where the buyer wants delivered pricing." },
      { question: "Is DryGelWorld silica gel REACH registered for the UK?", answer: "REACH registration is not currently held by DryGelWorld and is confirmed against the buyer's compliance program before commercial terms. SDS, COA, ISO 9001:2015 reference, and a DMF-free statement are supplied. Specify cobalt-free orange indicating gel for UK-bound orders." },
      { question: "Can UK importers claim a reduced duty on silica gel from Pakistan?", answer: "Pakistan is covered by the UK Developing Countries Trading Scheme, which may reduce the rate on commodity code 2811 22 00. Check the live rate on the UK Integrated Online Tariff and ask for a Certificate of Origin with the shipment." },
    ],
    customs: {
      hsCode: "UK commodity code 2811 22 00 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live UK Global Tariff rate and any preferential scheme for imports from Pakistan (the UK Developing Countries Trading Scheme may reduce the rate) in the official tariff:",
      tariffLookup: { label: "UK Integrated Online Tariff", href: "https://www.trade-tariff.service.gov.uk/" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "UK REACH applies post-Brexit: cobalt-chloride blue indicating gel is restricted — specify cobalt-free orange indicating gel for UK-bound orders.",
      ],
    },
  },
  {
    slug: "germany",
    updatedAt: "2026-09-02",
    country: "Germany",
    title: "Silica gel and dry clay desiccant supply for German importers.",
    description:
      "Industrial moisture control supply for German automotive OEM packaging, electronics distribution, pharma procurement, and warehouse logistics buyers.",
    buyerTypes: ["Industrial packagers and OEM buyers", "Automotive supplier networks", "Electronics distributors", "Logistics and warehouse procurement"],
    ports: ["Hamburg", "Bremerhaven", "Wilhelmshaven (JadeWeserPort)", "Munich rail-port routing"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg cargo strips", "Dry clay desiccant for industrial parts"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "German procurement teams typically require SDS in German and align EU import documentation before pricing. REACH support is a buyer-led discussion - DryGelWorld supplies SDS, COA, and ISO 9001:2015, while REACH registration must be confirmed against the buyer's compliance program.",
    rfqTip: "Send REACH expectations, target port, language requirements (DE/EN), monthly volume, and whether silica gel or dry clay better fits the use case.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Hamburg/Bremerhaven roughly 24-30 days (confirm with your forwarder).",
    currency: "Quoted in USD (EUR on request)",
    incoterms: ["FOB Karachi", "CIF Hamburg", "CIF Bremerhaven", "DAP Germany"],
    faqs: [
      { question: "What is the MOQ for silica gel to Germany?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format and dry clay packs from about 500 kg. Trial and sample quantities are available before a bulk commitment." },
      { question: "How long does shipping take from Karachi to Hamburg?", answer: "Production is usually 7-15 days after artwork and specification sign-off; Karachi to Hamburg or Bremerhaven sea transit is roughly 24-30 days depending on the service and transhipment." },
      { question: "Can you supply the SDS in German?", answer: "Yes. A German-language safety data sheet (Sicherheitsdatenblatt) can be supplied alongside the English SDS on request; state the language requirement in the RFQ." },
      { question: "Do you quote in DIN 55473 desiccant units?", answer: "Yes. German packaging programs often specify desiccant units rather than gram weights; send the unit requirement and carton volume and the quote will state both units and grams per pack." },
      { question: "Does the EU GSP+ preference apply to silica gel from Pakistan?", answer: "Pakistan holds EU GSP+ status, which zero-rates many chemical lines including CN 2811 22 00 subject to the rules of origin. Check the live rate in TARIC and request a REX statement of origin with the shipment." },
    ],
    customs: {
      hsCode: "CN 2811 22 00 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live EU conventional rate and any GSP preference for imports from Pakistan (Pakistan holds EU GSP+ status, which zero-rates many chemical lines) in TARIC:",
      tariffLookup: {
        label: "EU TARIC consultation",
        href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp",
      },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (Form A / REX statement for GSP+ preference)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "EU REACH Annex XVII restricts cobalt-chloride blue indicating gel — specify cobalt-free orange indicating gel for EU-bound orders.",
        "German buyers often specify DIN 55473 desiccant units for packaging programs — state DIN unit requirements in the RFQ.",
      ],
    },
  },
  {
    slug: "canada",
    updatedAt: "2026-09-02",
    country: "Canada",
    title: "Silica gel desiccant export supply for Canadian buyers.",
    description:
      "Factory-direct silica gel sachets, dry clay packs, bulk beads, and container strips for Canadian distributors, packaging companies, electronics packers, and textile or leather importers.",
    buyerTypes: ["Canadian distributors and re-packers", "Electronics and consumer-goods packagers", "Textile and leather importers", "Industrial procurement teams"],
    ports: ["Vancouver", "Montreal", "Halifax", "Prince Rupert"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Canadian buyers can route through West Coast (Vancouver, Prince Rupert) or East Coast (Montreal, Halifax). Karachi-to-Vancouver is the most direct lane for Pakistani-origin desiccant supply; document expectations and bilingual labeling (EN/FR) should be confirmed early.",
    rfqTip: "Send province, port, monthly volume, Incoterms, and any French-language carton labeling needs alongside silica gel vs dry clay product preference.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after artwork/spec sign-off; sea transit Karachi → Vancouver roughly 30-40 days and → Montreal (serving Toronto by rail/road) roughly 30-38 days (confirm the sailing with your forwarder).",
    currency: "Quoted in USD (CAD on request)",
    incoterms: ["EXW Karachi", "FOB Karachi", "CIF Vancouver", "CIF Montreal", "DAP Canada"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Canadian Customs Tariff rate for 2811.22 and any preferential tariff treatment available to Pakistan-origin goods in the official CBSA tariff before costing:",
      tariffLookup: { label: "CBSA Canadian Customs Tariff", href: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "CUSMA/USMCA preference does not apply to Pakistan-origin goods; check the CBSA tariff for the treatment that does apply and ask for a Certificate of Origin with the shipment.",
        "Bilingual English/French carton and pack labeling can be arranged for retail-facing or Quebec-bound programs; share label artwork with the RFQ.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Canada?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, dry clay from about 500 kg, with trial and sample quantities available before a bulk order. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to Canada?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Vancouver is roughly 30-40 days and to Montreal roughly 30-38 days, with Toronto served onward by rail or road; confirm the sailing with your forwarder." },
      { question: "Does CUSMA apply to silica gel from Pakistan?", answer: "No. CUSMA/USMCA covers goods originating in Canada, the US, and Mexico, so it does not apply to Pakistan-origin desiccant. Check the CBSA Customs Tariff for the treatment that applies to Pakistan and request a Certificate of Origin with the shipment." },
      { question: "Can you supply bilingual English/French labels for Canada?", answer: "Yes. Bilingual EN/FR carton and pack labeling can be arranged for retail-facing or Quebec-bound programs. Share your label artwork and province with the RFQ." },
      { question: "Which Incoterms do you offer for Canadian orders?", answer: "EXW Karachi, FOB Karachi, CIF Vancouver or Montreal, and DAP Canada. Most Canadian distributors take CIF and clear with their own broker; DAP is available where you want delivered pricing." },
    ],
  },
  {
    slug: "australia",
    updatedAt: "2026-09-02",
    country: "Australia",
    title: "Silica gel and dry clay desiccant supplier for Australian importers.",
    description:
      "Moisture control supply for Australian distributors, packaging companies, OEM packagers, and import buyers across electronics, food packaging context, and industrial cargo.",
    buyerTypes: ["Australian distributors and importers", "Packaging companies and re-packers", "OEM packagers and electronics brands", "Logistics and freight teams"],
    ports: ["Sydney (Port Botany)", "Melbourne", "Brisbane", "Fremantle"],
    products: ["0.5g-10g sachets", "25g-500g packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Australian customs and biosecurity expectations should be aligned before dispatch - clean SDS, COA, and pallet/packaging documentation reduce hold risk at port. East Coast (Sydney, Melbourne, Brisbane) and West Coast (Fremantle) routing are both supported.",
    rfqTip: "Send destination port, monthly volume, biosecurity-document expectations, and whether you need silica gel, dry clay, or a combined supply program.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Sydney/Melbourne roughly 28-35 days and to Fremantle roughly 20-25 days (confirm with your forwarder).",
    currency: "Quoted in USD (AUD on request)",
    incoterms: ["FOB Karachi", "CIF Sydney", "CIF Melbourne", "CIF Fremantle", "DAP Australia"],
    customs: {
      hsCode: "HS 2811.22 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "Check the live Australian tariff rate for 2811.22 and any developing-country preference for Pakistan-origin goods on the official schedule before costing:",
      tariffLookup: { label: "Australian Border Force tariff", href: "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification" },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "Certificate of Origin (COO)",
        "SDS on request",
      ],
      regulatoryNotes: [
        "Australian biosecurity inspects packaging: use ISPM 15 treated pallets and clean cartons, and keep SDS and COA ready to reduce hold risk at port.",
      ],
    },
    faqs: [
      { question: "What is the MOQ for silica gel to Australia?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format and dry clay packs from about 500 kg. Trial and sample quantities are available before a bulk order." },
      { question: "How long does shipping take from Karachi to Australia?", answer: "Production is usually 7-15 days after sign-off. Sea transit is roughly 28-35 days to Sydney or Melbourne and about 20-25 days to Fremantle, depending on the service and transhipment." },
      { question: "Which Incoterms do you offer for Australian orders?", answer: "FOB Karachi, CIF Sydney, Melbourne, or Fremantle, and DAP Australia. Most importers take CIF and clear with their own broker." },
      { question: "What biosecurity requirements apply to silica gel packaging?", answer: "Silica gel itself is inert, but Australian biosecurity inspects the packaging: pallets must be ISPM 15 treated and cartons clean and dry. Clean documentation, SDS, and COA reduce the chance of a hold at port." },
    ],
  },
  {
    slug: "france",
    country: "France",
    updatedAt: "2026-09-02",
    title: "Silica gel desiccant supplier for French importers and packaging buyers.",
    description:
      "Factory-direct silica gel sachets, bulk beads, dry clay packs, and container strips for French leather-goods and luxury packagers, cosmetics and pharma secondary packaging, electronics distributors, and logistics buyers.",
    buyerTypes: ["Leather goods and luxury packaging houses", "Cosmetics and pharma secondary packagers", "Electronics and industrial distributors", "Logistics and freight consolidators"],
    ports: ["Le Havre", "Marseille-Fos", "Dunkirk", "Antwerp / Rotterdam transhipment"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg container strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS (FDS in French on request)", "COA", "DMF-free statement"],
    routeNote:
      "French buyers typically need a French-language safety data sheet (fiche de données de sécurité) and align REACH expectations before commercial terms. Le Havre serves Paris and the north; Marseille-Fos serves the south and Lyon. REACH registration is not currently held by DryGelWorld, so that conversation should start with the first RFQ.",
    rfqTip: "Send target port, monthly volume, Incoterms, language requirements (FR/EN) for SDS and carton labels, REACH expectations, and whether you need silica gel, dry clay, or both.",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Le Havre roughly 24-30 days and → Marseille-Fos roughly 18-24 days (confirm with your forwarder).",
    currency: "Quoted in USD (EUR on request)",
    incoterms: ["FOB Karachi", "CIF Le Havre", "CIF Marseille-Fos", "DAP France"],
    customs: {
      hsCode: "CN 2811 22 00 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "France applies the EU common tariff. Check the live conventional rate and the GSP+ preference for Pakistan-origin goods in TARIC before costing:",
      tariffLookup: {
        label: "EU TARIC consultation",
        href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp",
      },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "REX statement of origin (for GSP+ preference) or Certificate of Origin",
        "SDS / FDS on request",
      ],
      regulatoryNotes: [
        "EU REACH Annex XVII restricts cobalt-chloride blue indicating gel — specify cobalt-free orange indicating gel for France-bound orders.",
        "Leather and footwear programs shipping to France require the DMF-free statement (EU dimethyl fumarate ban); it is issued on manufacturer letterhead with the order.",
      ],
    },
    faqs: [
      { question: "Can you supply the SDS in French?", answer: "Yes. A French-language fiche de données de sécurité can be supplied with the English SDS on request; state the language requirement in the RFQ, along with any French carton-label wording." },
      { question: "What is the MOQ for silica gel to France?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format and dry clay from about 500 kg, with trial and sample quantities available first. Printed private-label sachets carry a higher minimum than plain sachets." },
      { question: "How long does shipping take from Karachi to France?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Le Havre is roughly 24-30 days and to Marseille-Fos roughly 18-24 days, depending on the service and transhipment." },
      { question: "Which silica gel sachet sizes do French leather-goods packagers use?", answer: "Small leather goods and boxed accessories usually take 1g or 2g sachets inside each box, with 5g packets in shoe boxes and 10g in master cartons. All ship with a DMF-free statement for EU leather programs." },
      { question: "Is silica gel from Pakistan duty-free in France?", answer: "Pakistan holds EU GSP+ status, which zero-rates many chemical lines including CN 2811 22 00 subject to origin rules. Verify in TARIC and request a REX statement of origin with the shipment." },
    ],
  },
  {
    slug: "africa",
    country: "Africa",
    updatedAt: "2026-09-02",
    title: "Silica gel and desiccant export supply for African importers.",
    description:
      "Karachi-origin silica gel sachets, bulk beads, dry clay packs, and container strips for importers, distributors, and packagers in East, West, Southern, and North Africa, routed through Mombasa, Dar es Salaam, Durban, Lagos, Tema, and Port Said.",
    buyerTypes: ["Packaging distributors and re-packers", "Pharma and consumer-goods packagers", "Agricultural and food exporters (seed, grain, spice, tea, coffee)", "Logistics and freight consolidators"],
    ports: ["Mombasa (Kenya)", "Dar es Salaam (Tanzania)", "Durban (South Africa)", "Lagos Apapa / Tin Can (Nigeria)", "Tema (Ghana)", "Port Said / Alexandria (Egypt)"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bead bags", "1kg-5kg container strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement", "Certificate of Origin"],
    routeNote:
      "Karachi to East Africa is one of the shortest sea routes DryGelWorld serves; West Africa and Egypt route via transhipment hubs. Import rules, pre-shipment inspection, and conformity programs differ by country (for example SONCAP in Nigeria, PVoC in Kenya, and country-specific rules elsewhere), so the importer of record should confirm the requirement for HS 2811.22 before dispatch. Each African country applies its own tariff; there is no single continental rate for Pakistan-origin goods.",
    rfqTip: "Send destination country and port, monthly volume, Incoterm, any conformity or inspection program your importer must satisfy, and whether you need silica gel, dry clay, container strips, or a combined program.",
    moq: "Typically from 100 kg or 100,000 sachets per format; loose beads and dry clay from 500 kg; trial and sample quantities available before bulk.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Mombasa / Dar es Salaam roughly 10-16 days, → Durban roughly 16-24 days, → Lagos / Tema roughly 30-40 days, → Port Said roughly 12-18 days (confirm with your forwarder).",
    currency: "Quoted in USD",
    incoterms: ["FOB Karachi", "CIF Mombasa", "CIF Durban", "CIF Lagos", "CIF Port Said", "DAP (selected destinations)"],
    faqs: [
      { question: "Which African countries does DryGelWorld ship silica gel to?", answer: "Any country reachable by sea from Karachi. The most common destinations are Kenya, Tanzania, South Africa, Nigeria, Ghana, and Egypt, routed through Mombasa, Dar es Salaam, Durban, Lagos, Tema, and Port Said. Inland delivery on DAP terms is quoted case by case." },
      { question: "What is the MOQ for silica gel to Africa?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format, and loose beads or dry clay from about 500 kg. Trial and sample quantities are available before a bulk order so a distributor can test the market first." },
      { question: "How long does shipping take from Karachi to East Africa?", answer: "Production is usually 7-15 days after sign-off. Sea transit from Karachi to Mombasa or Dar es Salaam is roughly 10-16 days, making East Africa one of the shortest export routes DryGelWorld serves. Durban is roughly 16-24 days and West Africa 30-40 days." },
      { question: "Do you handle SONCAP, PVoC, or other conformity programs?", answer: "DryGelWorld supplies the SDS, COA, ISO 9001:2015 reference, Certificate of Origin, and product specifications that inspection agencies request. Registration with the program itself is done by the importer of record; confirm whether HS 2811.22 desiccant falls under your country's program before dispatch." },
      { question: "Which silica gel format suits African agricultural exporters?", answer: "Seed, grain, spice, tea, and coffee exporters usually use 5g-10g sachets or 25g-100g packs inside cartons and 1-5kg strips in the container. The silica gel for rice, grain and spice export guide and the container desiccant calculator give a starting dosage." },
    ],
  },
  {
    slug: "europe",
    updatedAt: "2026-09-02",
    country: "Europe",
    title: "Silica gel and desiccant export supply for European buyers.",
    description:
      "Multi-port European supply for distributors, importers, OEM packagers, and regional networks across the EU and adjacent markets - silica gel, dry clay, container strips, and private-label programs.",
    buyerTypes: ["European distributors and importers", "OEM packagers and brand owners", "Regional supply network operators", "Logistics and freight consolidators"],
    ports: ["Hamburg", "Rotterdam", "Antwerp", "Le Havre", "Felixstowe"],
    products: ["0.5g-10g sachets", "25g-500g packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "EU-wide buyers should align REACH expectations early. REACH registration must be confirmed before commercial terms. Multi-port routing (Hamburg, Rotterdam, Antwerp, Le Havre, Felixstowe) keeps options open for distributor programs, and language or labeling requirements vary by country.",
    rfqTip: "Send target country, REACH expectations, language and labeling requirements, monthly volume, and product preference (silica gel, dry clay, or both).",
    moq: "Typically from 100 kg or 100,000 sachets per format; dry clay from 500 kg; samples available pre-order.",
    leadTime: "Production 7-15 days after sign-off; sea transit Karachi → Rotterdam/Antwerp/Hamburg/Le Havre roughly 24-32 days depending on port and service.",
    currency: "Quoted in USD (EUR on request)",
    incoterms: ["FOB Karachi", "CIF Rotterdam", "CIF Antwerp", "CIF Hamburg", "CIF Le Havre", "DAP EU"],
    customs: {
      hsCode: "CN 2811 22 00 (silicon dioxide) — silica gel desiccant",
      dutyNote:
        "One EU tariff applies at every member-state port. Check the live conventional rate and the GSP+ preference for Pakistan-origin goods in TARIC before costing:",
      tariffLookup: {
        label: "EU TARIC consultation",
        href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp",
      },
      requiredDocs: [
        "Commercial invoice",
        "Packing list",
        "Bill of lading",
        "REX statement of origin (for GSP+ preference) or Certificate of Origin",
        "SDS on request (local-language SDS where required)",
      ],
      regulatoryNotes: [
        "EU REACH Annex XVII restricts cobalt-chloride blue indicating gel — specify cobalt-free orange indicating gel for EU-bound orders.",
        "REACH registration is not currently held by DryGelWorld; confirm the buyer's compliance requirement before commercial terms.",
      ],
    },
    faqs: [
      { question: "Which European ports do you ship silica gel to?", answer: "Rotterdam, Antwerp, Hamburg, Bremerhaven, Le Havre, Marseille-Fos, and Felixstowe are the usual discharge ports; inland delivery on DAP terms can be quoted to any EU destination." },
      { question: "What is the MOQ for silica gel to Europe?", answer: "Sachet formats typically start from around 100 kg or 100,000 pieces per format and dry clay from about 500 kg, with trial and sample quantities available first. Distributor programs are quoted by monthly volume." },
      { question: "How long does shipping take from Karachi to Europe?", answer: "Production is usually 7-15 days after sign-off; sea transit from Karachi to the main North Sea and Channel ports is roughly 24-32 days depending on port and service." },
      { question: "Is silica gel from Pakistan duty-free in the EU?", answer: "Pakistan holds EU GSP+ status, which zero-rates many chemical lines including CN 2811 22 00 subject to origin rules. Verify in TARIC and request a REX statement of origin with the shipment." },
    ],
  },
];

export function getExportMarket(slug: string) {
  return exportMarkets.find((market) => market.slug === slug);
}
