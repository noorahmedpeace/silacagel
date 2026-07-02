import type { Metadata } from "next";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import styles from "./videos.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Videos | DryGelWorld Desiccant Manufacturer",
  description:
    "Watch DryGelWorld silica gel desiccant videos - manufacturer and product footage covering silica gel packets, container desiccants, and industrial moisture-control supply from Karachi, Pakistan.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Silica Gel Videos | DryGelWorld Desiccant Manufacturer",
    description:
      "DryGelWorld silica gel desiccant videos - manufacturer and product footage for export buyers.",
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
    title: "DryGelWorld - Silica Gel Desiccant Manufacturer & Exporter (Karachi, Pakistan)",
    description:
      "DryGelWorld is a silica gel desiccant manufacturer-exporter in Karachi, Pakistan, supplying silica gel packets, bulk beads, and container desiccants to international B2B buyers since 1983.",
    file: "/videos/drygelworld-silica-gel-manufacturer-karachi.mp4",
    tag: "Manufacturer",
  },
  {
    title: "DryGelWorld Silica Gel Packets & Container Desiccants",
    description:
      "Silica gel packets and container desiccant formats from DryGelWorld for moisture protection in export cartons and ocean-freight containers.",
    file: "/videos/drygelworld-silica-gel-packets-container-desiccant.mp4",
    tag: "Products",
  },
  {
    title: "DryGelWorld Silica Gel Desiccant - Product Showcase",
    description:
      "A look at DryGelWorld industrial silica gel desiccant products used for packaging, container, and warehouse moisture control.",
    file: "/videos/drygelworld-desiccant-production-packaging.mp4",
    tag: "Showcase",
  },
  {
    title: "DryGelWorld Industrial Silica Gel Desiccant Supply",
    description:
      "DryGelWorld industrial silica gel desiccant supply for exporters and packaging buyers - sachets, bulk beads, and cargo strips with SDS and COA support.",
    file: "/videos/drygelworld-industrial-desiccant-export-supply.mp4",
    tag: "B2B Supply",
  },
  {
    title: "Silica Gel Beads - Close-Up Visualization",
    description:
      "Close-up visualization of silica gel desiccant beads, the amorphous silicon dioxide material DryGelWorld supplies for industrial moisture control.",
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
          DryGelWorld silica gel desiccant videos - manufacturer and product footage for buyers
          evaluating silica gel packets, container desiccants, and industrial moisture-control
          supply. For more, follow{" "}
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
