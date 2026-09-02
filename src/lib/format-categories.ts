/**
 * The six product formats behind the homepage showcase selector.
 *
 * Every field here already existed somewhere in the project and has been moved,
 * not invented: images are files already in /public (the three bento shots plus
 * the catalogue kraft shot, the orange-gel page's own hero, and the dispenser
 * photo), hrefs are the exact destinations the old category links navigated to,
 * and the badges come from real published data - the sachet and paper ranges
 * from `priceGroups`, the strip and bead ranges from the bento cards they
 * replace, and the dispenser throughput from the DT-1200's own spec table.
 */
export type FormatCategory = {
  /** Tab label. Short, because six of these share one row on desktop. */
  category: string;
  /** Small mono label above the title, inside the card. */
  eyebrow: string;
  title: string;
  /** Range chip, top-right of the card. */
  badge: string;
  image: string;
  /** Alt text written for this image specifically, not templated. */
  imageAlt: string;
  description: string;
  /** Existing SEO destination. The card CTA still navigates here. */
  href: string;
  /** Written per category rather than "Explore" six times. */
  cta: string;
};

export const formatCategories: FormatCategory[] = [
  {
    category: "Silica gel packets",
    eyebrow: "Cartons & units",
    title: "Silica gel sachets",
    badge: "0.5g - 20g",
    image: "/products/format-sachets.webp",
    imageAlt: "Stacked white silica gel sachets with loose beads spilling from one packet",
    description:
      "Silica gel sachets for cartons, unit packs, electronics, and leather, with printed private-label options.",
    href: "/silica-gel-packets",
    cta: "View silica gel packets",
  },
  {
    category: "Paper sachets",
    eyebrow: "Kraft paper",
    title: "Paper sachets",
    badge: "1g - 20g",
    image: "/products/catalog-kraft-indicating.webp",
    imageAlt: "Kraft paper silica gel sachets laid out for a packaging line",
    description:
      "Breathable kraft paper sachets for food-adjacent, pharmaceutical, and general carton packing.",
    href: "/products/paper-sachets",
    cta: "Explore paper sachets",
  },
  {
    category: "Indicating gel",
    eyebrow: "Colour change",
    title: "Indicating silica gel",
    badge: "Orange & blue",
    // The project has no photograph of orange or blue indicating beads - every
    // candidate was measured and all are neutral or warm-grey, and the one
    // asset named for the colour change is a blog thumbnail with its title
    // baked into the pixels. So this uses the destination page's OWN hero
    // rather than dressing a different product up as indicating gel. The badge
    // states the colours sold, the way the other badges state size ranges; the
    // alt text describes only what is visible. A real orange/blue product shot
    // is the fix, and it needs a camera, not code.
    image: "/hero-macro-kraft.webp",
    imageAlt: "Macro photograph of silica gel beads, the hero image used on the indicating gel supplier page",
    description:
      "Beads that change colour as they saturate, so QC can read moisture state without instruments.",
    href: "/orange-silica-gel-supplier",
    cta: "View indicating gel",
  },
  {
    category: "Container strips",
    eyebrow: "Sea freight",
    title: "Container strips",
    badge: "1 - 5 kg",
    image: "/products/format-container-strips.webp",
    imageAlt: "Hanging desiccant strips suspended along a shipping container wall",
    description:
      "High-capacity hanging strips that control container rain and condensation on long sea-freight routes.",
    href: "/container-desiccant-strips",
    cta: "Explore container strips",
  },
  {
    category: "Bulk beads",
    eyebrow: "By the kg",
    title: "Bulk silica gel beads",
    badge: "1 - 25 kg",
    image: "/products/format-bulk-beads.webp",
    imageAlt: "Silica gel beads in a glass jar beside an open woven sack",
    description:
      "Loose silica gel by the kg in sacks, drums, and jumbo bags for repackers and volume buyers.",
    href: "/bulk-silica-gel-desiccant",
    cta: "View bulk silica gel",
  },
  {
    category: "Dispensers",
    eyebrow: "Line automation",
    title: "Desiccant dispensers",
    badge: "Up to 250/min",
    image: "/dispenser-dt1200.webp",
    imageAlt: "DT-1200 desiccant dispensing machine on a production line",
    description:
      "Machines that cut and place sachets on the packing line, for buyers running high-volume production.",
    href: "/dispensers",
    cta: "View dispensers",
  },
];
