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
    slug: "vietnam",
    country: "Vietnam",
    title: "Silica gel desiccant supply for Vietnam packaging and export buyers.",
    description:
      "Factory-direct silica gel sachets, bulk beads, and container moisture-control formats for Vietnam garment, footwear, electronics, seafood, and logistics buyers.",
    buyerTypes: ["Garment and footwear exporters", "Electronics packaging teams", "Seafood and dry-goods packers", "Ho Chi Minh and Hanoi importers"],
    ports: ["Cat Lai", "Cai Mep-Thi Vai", "Hai Phong", "Da Nang logistics routing"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "1kg-5kg cargo strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Vietnam buyers often compare carton-level sachets with container-level strips for humid sea freight. Share the export industry, port, carton volume, and storage time before pricing.",
    rfqTip: "Send Vietnam port, industry, product format, monthly volume, and whether the order protects garments, footwear, electronics, or food packaging.",
  },
  {
    slug: "russia",
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
  },
  {
    slug: "bangladesh",
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
  },
  {
    slug: "indonesia",
    country: "Indonesia",
    title: "Silica gel desiccant supplier for Indonesia importers and exporters.",
    description:
      "Desiccant sachets, bulk silica gel, and container moisture-control support for Indonesian packaging, footwear, electronics, food, and logistics buyers.",
    buyerTypes: ["Jakarta and Surabaya importers", "Footwear and garment packers", "Electronics packaging teams", "Food and dry-goods exporters"],
    ports: ["Tanjung Priok", "Tanjung Perak", "Belawan", "Makassar logistics routing"],
    products: ["0.5g-10g sachets", "25g-500g packs", "25kg loose bulk", "Container desiccant strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Indonesia's humid logistics environment makes destination, storage time, and packaging material important quote inputs before selecting sachets or container strips.",
    rfqTip: "Send island or port, product application, order quantity, sample need, and whether the buyer requires carton or container-level moisture control.",
  },
  {
    slug: "mexico",
    country: "Mexico",
    title: "Silica gel export supply for Mexico packaging and industrial buyers.",
    description:
      "Factory-direct silica gel packets, bulk beads, private-label sachets, and cargo strips for Mexican distributors, electronics packagers, warehouses, and importers.",
    buyerTypes: ["Packaging distributors", "Electronics and automotive suppliers", "Warehouse teams", "Private-label buyers"],
    ports: ["Manzanillo", "Veracruz", "Lazaro Cardenas", "Altamira"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "Private-label programs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Mexico buyers should clarify port, labeling language, private-label expectations, and whether the buying route is distributor stock or direct factory use.",
    rfqTip: "Send destination port, Spanish/English labeling needs, quantity, Incoterms, and target product format.",
  },
  {
    slug: "turkey",
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
  },
  {
    slug: "india",
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
  },
  {
    slug: "brazil",
    country: "Brazil",
    title: "Silica gel export supply for Brazil importers and industrial packaging buyers.",
    description:
      "Industrial silica gel sachets, bulk desiccants, and cargo moisture-control formats for Brazil distributors, packaging buyers, warehouses, and import teams.",
    buyerTypes: ["Brazilian distributors", "Industrial packaging buyers", "Warehouse and logistics teams", "Private-label importers"],
    ports: ["Santos", "Paranagua", "Rio de Janeiro", "Itajai"],
    products: ["1g-10g sachets", "25g-500g carton packs", "25kg loose bulk", "1kg-5kg cargo strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Brazil inquiries should define port, import documentation expectations, labeling language, and whether the buyer is stocking distributors or protecting export cartons.",
    rfqTip: "Send port, Portuguese/English labeling needs, monthly volume, Incoterms, and required document list.",
  },
  {
    slug: "malaysia",
    country: "Malaysia",
    title: "Silica gel desiccant supplier for Malaysia electronics, packaging, and logistics buyers.",
    description:
      "Silica gel packets, bulk beads, private-label sachets, and container strips for Malaysian electronics packagers, food packaging, warehouses, and importers.",
    buyerTypes: ["Electronics and component packagers", "Food and dry-goods packaging teams", "Packaging distributors", "Port Klang importers"],
    ports: ["Port Klang", "Tanjung Pelepas", "Penang", "Pasir Gudang"],
    products: ["0.5g-10g sachets", "25g-500g bags", "25kg loose bulk", "Container strips"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Malaysia buyers should confirm whether the risk is electronics packaging humidity, food packaging shelf protection, warehouse stock, or container route exposure.",
    rfqTip: "Send destination port, industry, packet size or gram range, quantity, and whether SDS/COA are required before sample dispatch.",
  },
  {
    slug: "pakistan",
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
  {
    slug: "uk",
    country: "United Kingdom",
    title: "Silica gel desiccant supplier for UK importers and packaging buyers.",
    description:
      "Factory-direct silica gel sachets, dry clay packs, bulk beads, and container strips for UK distributors, packaging companies, electronics OEMs, and footwear or leather importers.",
    buyerTypes: ["UK distributors and re-packers", "Electronics packagers and OEMs", "Footwear, leather and textile importers", "Pharma and healthcare procurement"],
    ports: ["Felixstowe", "Southampton", "London Gateway", "Liverpool"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg container strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "UK buyers should align REACH expectations and post-Brexit import documentation before commercial terms — REACH registration is a buyer-driven discussion, not a held certification, so the conversation should start early.",
    rfqTip: "Send target port, monthly volume, Incoterms, REACH expectations, and whether you need silica gel, dry clay, or both formats in one program.",
  },
  {
    slug: "germany",
    country: "Germany",
    title: "Silica gel and dry clay desiccant supply for German importers.",
    description:
      "Industrial moisture-control supply for German automotive OEM packaging, electronics distribution, pharma procurement, and warehouse logistics buyers.",
    buyerTypes: ["Industrial packagers and OEM buyers", "Automotive supplier networks", "Electronics distributors", "Logistics and warehouse procurement"],
    ports: ["Hamburg", "Bremerhaven", "Wilhelmshaven (JadeWeserPort)", "Munich rail-port routing"],
    products: ["0.5g-10g sachets", "25g-500g carton packs", "1kg-5kg cargo strips", "Dry clay desiccant for industrial parts"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "German procurement teams typically require SDS in German and align EU import documentation before pricing. REACH support is a buyer-led discussion — DryGelWorld supplies SDS, COA, and ISO 9001:2015, while REACH registration must be confirmed against the buyer's compliance program.",
    rfqTip: "Send REACH expectations, target port, language requirements (DE/EN), monthly volume, and whether silica gel or dry clay better fits the use case.",
  },
  {
    slug: "canada",
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
  },
  {
    slug: "australia",
    country: "Australia",
    title: "Silica gel and dry clay desiccant supplier for Australian importers.",
    description:
      "Moisture-control supply for Australian distributors, packaging companies, OEM packagers, and import buyers across electronics, food packaging context, and industrial cargo.",
    buyerTypes: ["Australian distributors and importers", "Packaging companies and re-packers", "OEM packagers and electronics brands", "Logistics and freight teams"],
    ports: ["Sydney (Port Botany)", "Melbourne", "Brisbane", "Fremantle"],
    products: ["0.5g-10g sachets", "25g-500g packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "Australian customs and biosecurity expectations should be aligned before dispatch — clean SDS, COA, and pallet/packaging documentation reduce hold risk at port. East Coast (Sydney, Melbourne, Brisbane) and West Coast (Fremantle) routing are both supported.",
    rfqTip: "Send destination port, monthly volume, biosecurity-document expectations, and whether you need silica gel, dry clay, or a combined supply program.",
  },
  {
    slug: "europe",
    country: "Europe (EU-wide)",
    title: "Silica gel and desiccant export supply for European buyers.",
    description:
      "Multi-port European supply for distributors, importers, OEM packagers, and regional networks across the EU and adjacent markets — silica gel, dry clay, container strips, and private-label programs.",
    buyerTypes: ["European distributors and importers", "OEM packagers and brand owners", "Regional supply network operators", "Logistics and freight consolidators"],
    ports: ["Hamburg", "Rotterdam", "Antwerp", "Le Havre", "Felixstowe"],
    products: ["0.5g-10g sachets", "25g-500g packs", "1kg-5kg cargo strips", "Dry clay desiccant packs"],
    documents: ["ISO 9001:2015", "SDS", "COA", "DMF-free statement"],
    routeNote:
      "EU-wide buyers should align REACH expectations early — REACH registration is buyer-driven and discussed before commercial terms. Multi-port routing (Hamburg, Rotterdam, Antwerp, Le Havre, Felixstowe) keeps options open for distributor programs and language/labeling requirements vary by country.",
    rfqTip: "Send target country, REACH expectations, language and labeling requirements, monthly volume, and product preference (silica gel, dry clay, or both).",
  },
];

export function getExportMarket(slug: string) {
  return exportMarkets.find((market) => market.slug === slug);
}
