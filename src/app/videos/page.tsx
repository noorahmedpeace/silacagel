import type { Metadata } from "next";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import styles from "./videos.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Videos | DryGelWorld Desiccant Manufacturer",
  description:
    "Watch DryGelWorld silica gel videos showing packets, beads, container desiccants, and export supply from Karachi, Pakistan.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Silica Gel Videos | DryGelWorld Desiccant Manufacturer",
    description:
      "DryGelWorld product and factory footage for export buyers evaluating silica gel desiccants.",
    url: "/videos",
    type: "website",
  },
};

// Self-hosted video assets live in /public/videos. Titles and descriptions are
// brand/product-accurate; refine per-clip once exact content is confirmed, and
// add `embedUrl` here once the clips are live on the YouTube channel
// (https://www.youtube.com/@DryGelWorld) for the strongest video ranking.
const UPLOAD_DATE = "2026-06-24";

type SiteVideo = {
  title: string;
  description: string;
  file: string;
  tag: string;
};

const videos: SiteVideo[] = [
  {
    title: "DryGelWorld: Silica Gel Desiccant Manufacturer and Exporter in Karachi, Pakistan",
    description:
      "Company overview: who we are and what we make. DryGelWorld has manufactured and exported silica gel desiccant from Karachi, Pakistan since 1983, supplying packets, bulk beads, and container desiccants to B2B buyers worldwide.",
    file: "/videos/drygelworld-silica-gel-manufacturer-karachi.mp4",
    tag: "Manufacturer",
  },
  {
    title: "DryGelWorld Silica Gel Packets & Container Desiccants",
    description:
      "Product walkthrough: silica gel packets and container desiccant strips, and where each one fits in export cartons or ocean-freight containers.",
    file: "/videos/drygelworld-silica-gel-packets-container-desiccant.mp4",
    tag: "Products",
  },
  {
    title: "DryGelWorld Silica Gel Desiccant Product Showcase",
    description:
      "Inside the range: desiccant products used in packaging, container loading, and warehouse storage before they reach the buyer.",
    file: "/videos/drygelworld-desiccant-production-packaging.mp4",
    tag: "Showcase",
  },
  {
    title: "DryGelWorld Industrial Silica Gel Desiccant Supply",
    description:
      "What we ship: sachets, bulk beads, and cargo strips for exporters and packaging buyers, with SDS and COA documentation on request.",
    file: "/videos/drygelworld-industrial-desiccant-export-supply.mp4",
    tag: "B2B Supply",
  },
  {
    title: "Silica Gel Beads Close-Up Visualization",
    description:
      "A close-up look at silica gel beads, the amorphous silicon dioxide material that does the actual moisture absorption.",
    file: "/videos/silica-beads-glass-container-3d.mp4",
    tag: "Materials",
  },
];

const POSTER = "/video-thumbnails.webp";

export default function VideosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Product Education</span>
        <h1>See DryGelWorld in action.</h1>
        <p>
          A look at DryGelWorld&apos;s silica gel packets, beads, and container desiccants
          in production and in use, for buyers who want to see the product and plant before
          they send an RFQ. For more, follow{" "}
          <a href="https://www.youtube.com/@DryGelWorld" rel="me noopener noreferrer" target="_blank">
            @DryGelWorld on YouTube
          </a>
          .
        </p>
      </section>

      <div className={styles.videosGrid}>
        {videos.map((v) => (
          <article key={v.file} className={styles.videoCard}>
            <div className={styles.videoThumb}>
              <video
                controls
                preload="metadata"
                poster={POSTER}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={v.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className={styles.videoTag}>{v.tag}</span>
            </div>
            <div className={styles.videoCopy}>
              <h2>{v.title}</h2>
              <p>{v.description}</p>
            </div>
          </article>
        ))}
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              ...videos.map((v) => ({
                "@type": "VideoObject",
                "@id": `${absoluteUrl("/videos")}#${v.file.split("/").pop()?.replace(/\.mp4$/, "")}`,
                name: v.title,
                description: v.description,
                thumbnailUrl: absoluteUrl(POSTER),
                uploadDate: UPLOAD_DATE,
                contentUrl: absoluteUrl(v.file),
                inLanguage: "en",
                publisher: {
                  "@type": "Organization",
                  "@id": `${absoluteUrl()}#organization`,
                  name: siteName,
                  url: absoluteUrl(),
                },
              })),
              breadcrumbJsonLd([
                { name: "Home", href: "/" },
                { name: "Videos", href: "/videos" },
              ]),
            ],
          }),
        }}
      />
    </main>
  );
}
