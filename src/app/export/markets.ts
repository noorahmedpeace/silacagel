export type ExportMarket = {
  slug: string;
  country: string;
  title: string;
  description: string;
  buyerTypes: string[];
  ports: string[];
  products: string[];
  documents: string[];
  routeNote: string;
  rfqTip: string;
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
  },
  {
    slug: "saudi-arabia",
    country: "Saudi Arabia",
    title: "Silica gel desiccant supply for Saudi importers.",
    description:
      "Bulk silica gel packets and cargo moisture-control formats for Saudi packaging, warehousing, distribution, industrial, and export buyers.",
    buyerTypes: ["Dammam and Jeddah importers", "Industrial packaging buyers", "Pharma and consumer-goods packagers", "Logistics and warehouse operators"],
    ports: ["Jeddah Islamic Port", "King Abdulaziz Port Dammam", "Riyadh dry-port routing", "GCC forwarding partners"],
    products: ["1g-10g sachets", "50g-500g export carton packs", "1kg-5kg cargo strips", "Recurring distributor supply"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Saudi buyers usually need the product format, quantity, destination city or port, labeling requirements, and document set aligned before pricing is useful.",
    rfqTip: "Share target port, destination city, application, and whether the order is one-time or recurring monthly supply.",
  },
  {
    slug: "qatar",
    country: "Qatar",
    title: "Silica gel supplier for Qatar packaging and logistics buyers.",
    description:
      "Desiccant sachets, bulk packs, and shipment moisture-control options for Qatar importers, distributors, storage teams, and project supply buyers.",
    buyerTypes: ["Doha importers", "Project supply buyers", "Warehouse teams", "Packaging distributors"],
    ports: ["Hamad Port", "Doha logistics hubs", "GCC consolidation routes", "Air-cargo sample shipments"],
    products: ["0.5g-10g sachets", "25g-500g bags", "Container strips", "Sample packs before bulk orders"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "For Qatar inquiries, sample shipment, carton labeling, and import-document expectations should be confirmed before bulk order planning.",
    rfqTip: "Send the project/application, target quantity, destination in Qatar, and sample requirement before asking for final price.",
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
  },
  {
    slug: "fob-karachi",
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
  },
];

export function getExportMarket(slug: string) {
  return exportMarkets.find((market) => market.slug === slug);
}
