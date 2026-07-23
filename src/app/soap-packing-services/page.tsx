import type { Metadata } from "next";
import Link from "next/link";
import { FaqBlock } from "@/components/faq-block";
import { MachineShowcase } from "@/components/machine-showcase";
import { PackagingPlanner } from "@/components/packaging-planner";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { whatsappNumber } from "@/lib/product-data";
import styles from "../contract-packaging-services/page.module.css";

// HONESTY RULES: ISO 9001:2015 only. PSQCA PS:13 / DRAP obligations are the
// BRAND's, stated as such. No invented MOQ or per-1000 rates, quote-only
// until the owner supplies a real rate card. No machine photos until real
// facility imagery exists.

export const metadata: Metadata = {
  title: "Soap Packing Services in Pakistan | Flow Wrap Soap Bars, Karachi",
  description:
    "Machine flow-wrapping for soap bars in Karachi: pearlized BOPP, printed film, date coding, 40g guest bars to 200g+ bars, in-line 3-bar multipacks. No machine to buy, send your bars, get retail-ready wrapped stock. ISO 9001:2015, since 1983.",
  alternates: { canonical: "/soap-packing-services" },
  keywords: [
    "soap packing services in Pakistan",
    "soap wrapping services Karachi",
    "soap packaging company Pakistan",
    "soap flow wrap",
    "pillow pack soap",
    "pearlized BOPP soap wrapper",
    "contract soap wrapping",
    "third party soap packing",
  ],
  openGraph: {
    title: "Soap Packing & Flow-Wrapping Services in Pakistan | DryGelWorld",
    description:
      "Machine-wrapped soap bars in pearlized BOPP, no machine to buy, no minimum factory. From Karachi, since 1983, ISO 9001:2015.",
    url: "/soap-packing-services",
    siteName,
    type: "website",
  },
};

const films = [
  {
    title: "Pearlized BOPP",
    text: "The classic retail soap overwrap, white pearl finish, premium shelf look, real moisture barrier, and it runs fast and seals cleanly on the flow-wrap line.",
  },
  {
    title: "Clear / gloss BOPP",
    text: "Shows the bar itself, the right choice for swirled, layered, or translucent artisan soaps where the product is the design.",
  },
  {
    title: "Matte & paper-touch BOPP",
    text: "The kraft/artisan look your hand-wrap gives today, but with an actual sealed barrier behind it instead of open paper.",
  },
  {
    title: "Metalized & premium laminates",
    text: "Foil-look film for gift and premium SKUs; PET/PE laminates where a stronger structure is needed.",
  },
  {
    title: "Printed film, your brand",
    text: "Your design printed on the reel, so the wrapper IS the label: brand, weight, ingredients, batch, and contact details, straight off the line.",
  },
  {
    title: "In-line date & batch coding",
    text: "Manufacturing/expiry date and batch number coded onto each wrapper during the run.",
  },
];

const segments = [
  "Handmade & artisan soap brands still hand-wrapping in kraft paper or cigar bands",
  "Beauty-soap SMEs scaling from hand-wrap into retail distribution",
  "Herbal, neem, and organic soap brands that need a sealed, hygienic wrap",
  "Hotel-amenity suppliers (guest bars, standardized presentation)",
  "Exporters needing retail-grade wrap with date/batch coding",
  "Brands whose contract manufacturer returns naked, unwrapped bars",
];

const faqs = [
  {
    question: "What is the minimum order for soap wrapping?",
    answer:
      "We accept small trial runs so you can test the wrap on your actual bars before committing volume. For production runs, MOQ depends on the film: plain or pearlized stock film starts low; custom printed film carries the printer's reel minimum. State your monthly volume in the form and we quote the realistic minimum.",
  },
  {
    question: "How is soap wrapping priced, per bar or per thousand?",
    answer:
      "Per-1,000 bars is the industry norm, plus a one-time setup/changeover charge per run and the film cost (yours or ours). We state all three lines separately in the quotation, no hidden handling fees.",
  },
  {
    question: "Flow wrap vs pleat wrap vs shrink wrap, which does my soap need?",
    answer:
      "Pleat wrap is the folded-paper luxury/hotel look. Shrink wrap is a clear tight film that shows the bar but reads less premium and gives a weaker barrier. Flow wrap (pillow pack) is what mainstream retail bars use: a sealed film envelope with fin seal and crimped ends, a true moisture and fragrance barrier at machine speed. We run flow wrap.",
  },
  {
    question: "Will wrapping stop my glycerin soap from sweating?",
    answer:
      "Yes, glycerin dew forms because glycerin pulls moisture from humid air onto the bar's surface. Wrapping the bar in airtight film promptly after curing is the standard prevention, which is exactly what a sealed flow wrap provides.",
  },
  {
    question: "Can you print my brand on the wrapper?",
    answer:
      "Yes. Your artwork is printed on the BOPP reel, so the wrapper doubles as the label. Printed film has a reel MOQ from the printer; plain and pearlized films have no print minimum. Send your design with the quote form or ask us to arrange the layout.",
  },
  {
    question: "Do I need a DRAP licence to sell wrapped soap?",
    answer:
      "Plain toilet soap in Pakistan falls under the PSQCA PS:13 standard, and the conformity (CM) licence is the brand/manufacturer's obligation. DRAP enlistment applies only if the soap makes medicated/antibacterial claims, again, the brand's responsibility, not the packer's. As your packing partner we wrap under our ISO 9001:2015 system and print your required labeling on the film; product registration stays with you, and we say that plainly.",
  },
  {
    question: "What bar sizes and shapes can you wrap?",
    answer:
      "Pack length 60–200 mm, width up to 100 mm, bar height up to ~45 mm, which covers 40 g guest soaps through 200 g+ bars, in rectangular, oval, or round shapes. In-line 3-bar multipacks (bars end-to-end) fit within the 200 mm length; side-by-side bundles exceed the former, so for those we band individually wrapped bars instead, we'll tell you which honestly at the trial.",
  },
  {
    question: "Can you add an expiry or batch date on the wrapper?",
    answer:
      "Yes, an in-line coder marks manufacturing/expiry date and batch number on each wrapper during the run.",
  },
];

export default function SoapPackingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl("/soap-packing-services")}#service`,
        name: "Soap Packing & Flow-Wrapping Services",
        serviceType: "Soap bar flow wrapping (contract packing)",
        provider: { "@id": `${absoluteUrl()}#organization` },
        areaServed: ["Pakistan", "Worldwide"],
        description:
          "Machine flow-wrapping of finished soap bars in pearlized, clear, matte, or printed BOPP film with date coding, from Karachi, Pakistan.",
        url: absoluteUrl("/soap-packing-services"),
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Contract Packaging Services", href: "/contract-packaging-services" },
        { name: "Soap Packing Services", href: "/soap-packing-services" },
      ]),
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <p className={styles.kicker}>Premium Soap Flow-Wrapping · ISO 9001:2015</p>
        <h1>Soap packing &amp; flow-wrapping services in Pakistan.</h1>
        <p className={styles.lead}>
          Machine-wrapped soap bars in pearlized BOPP, no machine to buy, no wrapping line to
          staff. Send us your finished bars; we return sealed, retail-ready wrapped stock with your
          brand printed on the film. Karachi facility, manufacturing since 1983, ISO 9001:2015.
        </p>
        <div className={styles.heroActions}>
          <a href="#packaging-quote" className={styles.primaryCta}>
            Request Soap Wrapping Quote
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I want a soap wrapping quote. Bar size, monthly volume, and film preference below:",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghostCta}
          >
            WhatsApp the packing desk
          </a>
        </div>
        <div className={styles.proofRow}>
          <span className={styles.proofChip}>ISO 9001:2015 · Cert #9101225</span>
          <span className={styles.proofChip}>Karachi · Lahore · Faisalabad brands served</span>
          <span className={styles.proofChip}>Free wrap trial on your sample bars</span>
        </div>
      </header>

      <section aria-label="Why flow wrap soap">
        <div className={styles.sectionHead}>
          <h2>Why machine flow wrap beats hand-wrapping</h2>
          <p>
            A sealed film wrap is not just presentation, it is a barrier that protects the bar and
            your declared weight.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.serviceCard}>
            <strong>Moisture &amp; fragrance barrier</strong>
            <p>
              BOPP film blocks moisture and slows fragrance loss, extending shelf life versus open
              paper wraps. Toilet soap loses moisture on keeping, a sealed wrap protects the weight
              printed on your label.
            </p>
          </article>
          <article className={styles.serviceCard}>
            <strong>Stops glycerin sweating</strong>
            <p>
              Glycerin-rich and melt-and-pour bars pull humidity from the air and form surface dew.
              Airtight wrapping promptly after curing is the standard prevention.
            </p>
          </article>
          <article className={styles.serviceCard}>
            <strong>Hygiene &amp; tamper evidence</strong>
            <p>
              Bars are wrapped by machine, untouched by hand, in a sealed envelope the customer
              opens first, with uniform, retail-grade presentation on every bar.
            </p>
          </article>
          <article className={styles.serviceCard}>
            <strong>Machine speed vs hand labour</strong>
            <p>
              Consistent per-bar cost at machine speed, instead of paying hand-wrapping labour that
              varies bar to bar and batch to batch.
            </p>
          </article>
        </div>
      </section>

      <section aria-label="Films we run">
        <div className={styles.sectionHead}>
          <h2>Films we run</h2>
        </div>
        <div className={styles.serviceGrid}>
          {films.map((f) => (
            <article className={styles.serviceCard} key={f.title}>
              <strong>{f.title}</strong>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.facility} aria-label="Bar size fit check">
        <h2>Fit check: your bar sizes</h2>
        <p>
          A standard 100&nbsp;g toilet bar (≈85–90 × 50–55 × 20–30&nbsp;mm) and a 125&nbsp;g bar
          (≈89 × 57 × 25&nbsp;mm) sit comfortably inside our line&apos;s envelope, pack length
          60–200&nbsp;mm, width up to 100&nbsp;mm, height up to ~45&nbsp;mm. That covers 40&nbsp;g
          hotel guest bars through 200&nbsp;g+ family bars, rectangular, oval, or round (round bars
          flow-wrap with fin-sealed ends).
        </p>
        <ul className={styles.facilityList}>
          <li>Single bars: 40&nbsp;g to 200&nbsp;g+, any regular shape</li>
          <li>In-line 3-bar multipacks (bars end-to-end, up to ~180&nbsp;mm total) within the pack length</li>
          <li>Side-by-side bundles exceed the former, we band individually wrapped bars instead</li>
          <li>Free wrap trial: send sample bars, get wrapped samples and a film recommendation back</li>
        </ul>
        <p className={styles.honesty}>
          We tell you at the trial, not after the invoice, if a format won&apos;t run well. Exact
          per-1,000 rates depend on film choice, print, and run size, and are stated line by line in
          the quotation.
        </p>
      </section>

      <section aria-label="Who this is for">
        <div className={styles.sectionHead}>
          <h2>Who this service is for</h2>
          <p>
            Pakistan&apos;s soap industry is thousands of mostly small and medium factories across
            Karachi, Lahore, Faisalabad, Gujranwala, and Peshawar, most without an in-house
            wrapping line.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          {segments.map((s) => (
            <article className={styles.serviceCard} key={s}>
              <p>{s}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.facility} aria-label="Compliance">
        <h2>Compliance, stated honestly</h2>
        <p>
          Plain toilet soap is governed by PSQCA&apos;s PS:13 standard, the conformity (CM) licence
          is the brand&apos;s obligation. DRAP enlistment applies only to medicated/antibacterial
          claims, again on the brand&apos;s side. As your packing partner, we wrap under our ISO
          9001:2015 quality system and print your required labeling on the film; we do not hold,
          and do not claim, food-safety or pharma certifications. If your product needs those, we
          will say so before quoting.
        </p>
      </section>

      <section className={styles.facility} aria-label="Buying a machine instead">
        <h2>Thinking of buying a wrapping machine instead?</h2>
        <p>
          A soap flow-wrapping machine costs thousands of dollars up front, then an operator, film
          wastage, changeover downtime, spares from China, and floor space. If you wrap under a few
          hundred thousand bars a month, outsourced wrapping usually costs less than owning the
          line. Send your volume and we&apos;ll quote both honestly: our per-1,000 rate vs what a
          machine would really cost you to run.
        </p>
      </section>

      <MachineShowcase
        heading="Your soap, wrapped on our line"
        intro="The flow-wrap machine on our Karachi floor, running soap bars in sealed film. Real photos and footage, send sample bars for a free wrap trial."
        video="/videos/packaging-line.mp4"
        feature={{
          src: "/images/packaging/soap-packing-machine-hero.webp",
          alt: "Soap bar flow-wrapping machine at DryGelWorld",
          caption: "Soap-bar flow wrapping in sealed film",
        }}
        gallery={[
          {
            src: "/images/packaging/soap-flow-wrap-closeup.webp",
            alt: "Close-up of a flow-wrapped soap bar",
            caption: "Sealed pillow-pack finish",
          },
          {
            src: "/images/packaging/new-packaging-machine-wide-shot.webp",
            alt: "Wide shot of the automatic flow-wrap line",
            caption: "The automatic flow-wrap line",
          },
        ]}
        stats={[
          { label: "Bar range", value: "40 g – 200 g+" },
          { label: "Films", value: "Pearlized / clear / printed BOPP" },
          { label: "Coding", value: "In-line date & batch" },
          { label: "Quality system", value: "ISO 9001:2015" },
        ]}
      />

      <PackagingPlanner />

      <FaqBlock title="Soap wrapping FAQs" faqs={faqs} />

      <section className={styles.sectionHead} aria-label="Related services">
        <p>
          Also see <Link href="/contract-packaging-services">all contract packaging services</Link>,{" "}
          <Link href="/private-label">private-label desiccant packets</Link>, or{" "}
          <Link href="/products">our own product range</Link>.
        </p>
      </section>
    </main>
  );
}
