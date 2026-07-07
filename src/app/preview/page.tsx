import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Preview Index | DryGelWorld",
  robots: { index: false, follow: false },
};

const items = [
  {
    href: "/preview/home",
    title: "Home redesign",
    text: "Hero · product line · manufacturer-proof stats · industries grid · world reach · format comparison table · certifications + trusted-by band · dark CTA.",
  },
  {
    href: "/preview/landing",
    title: "SEO landing redesign",
    text: "/silica-gel-manufacturer restyled: hero with quiet-glass proof panel, fit grid, specs table, buying steps, related chips, FAQs, CTA band.",
  },
  {
    href: "/preview/product",
    title: "Product detail redesign",
    text: "/products/retail-sachets restyled: hero with image card + glass size strip, three-panel sizes/uses/packing, document chips, related products, CTA band.",
  },
  {
    href: "/preview/blog",
    title: "Blog post redesign",
    text: "/blog/how-to-choose-silica-gel-packet-size restyled: centered hero with meta strip, sticky table-of-contents sidebar on desktop, FAQ band, CTA.",
  },
  {
    href: "/preview/export",
    title: "Export market redesign",
    text: "/export/uae restyled: pin-badge hero, 4-card procurement context grid, route-note + RFQ-tip callouts, CTA band.",
  },
];

export default function PreviewIndex() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "120px 24px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            alignSelf: "flex-start",
            padding: "6px 12px",
            background: "var(--p-accent)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: 999,
          }}
        >
          Internal preview
        </span>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--p-text)",
          }}
        >
          Design mood-board for review.
        </h1>
        <p style={{ color: "var(--p-text-muted)", lineHeight: 1.6, margin: 0 }}>
          Two preview routes with the proposed visual system (white + brand blue
          + accent red, quiet glass, CSS-only animations). All pages emit
          <code style={{ padding: "1px 6px", marginLeft: 6, background: "var(--p-brand-soft)", borderRadius: 6 }}>
            robots: noindex
          </code>
          so search engines never see them.
        </p>
      </header>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{
                display: "block",
                padding: 24,
                background: "var(--p-surface)",
                border: "1px solid var(--p-hairline)",
                borderRadius: 14,
                textDecoration: "none",
                color: "inherit",
                boxShadow: "var(--p-shadow-soft)",
              }}
            >
              <strong style={{ display: "block", fontSize: "1.18rem", color: "var(--p-text)" }}>
                {item.title}
              </strong>
              <span style={{ display: "block", marginTop: 6, color: "var(--p-text-muted)", lineHeight: 1.55 }}>
                {item.text}
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--p-accent)",
                }}
              >
                Open {item.href} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
