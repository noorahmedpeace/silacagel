import type { Metadata } from "next";
import Image from "next/image";
import styles from "./videos.module.css";

export const metadata: Metadata = {
  title: "Silica Gel Videos | Desiccant Product Education",
  description:
    "Watch silica gel desiccant education videos covering adsorption science, packet use, container strips, reactivation, and packaging-line moisture protection.",
  alternates: {
    canonical: "/videos",
  },
};

const videos = [
  { title: "Color-Change Saturation Guide", desc: "Planned demo for showing how indicating silica gel changes color as moisture exposure increases.", tag: "Materials Science" },
  { title: "Humidity Control in Sealed Containers", desc: "Planned test showing how packet size, enclosure volume, and starting humidity affect moisture-control results.", tag: "Electronics" },
  { title: "Desiccant Dispenser Line Overview", desc: "Planned walkthrough for buyers evaluating automated desiccant insertion on packaging lines.", tag: "Industrial" },
  { title: "Container Strip Deployment", desc: "Planned guide for hanging cargo desiccant strips in 20ft and 40ft shipping containers.", tag: "Maritime" },
  { title: "Packet Reactivation Guide", desc: "Planned safety guidance for compatible silica gel formats, packet materials, and oven temperature limits.", tag: "How-To" },
  { title: "Bulk Industrial Supply Overview", desc: "Planned buyer guide covering bulk silica gel beads, carton packs, private-label supply, and repeat export orders.", tag: "B2B Guide" },
  { title: "Moisture Protection Science Explained", desc: "Planned practical explanation of adsorption, sealed packaging, and why packet size matters for export cartons.", tag: "Packaging" },
  { title: "Pharma Packaging Desiccant Checks", desc: "Planned procurement guide for document requests, product-fit questions, and buyer-side pharma packaging review.", tag: "Pharma" },
  { title: "Indicating Silica Gel Storage Uses", desc: "Planned guide for using indicating silica gel in tools, storage boxes, components, and moisture-sensitive inventory.", tag: "Storage" },
];

export default function VideosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Product Education</span>
        <h1>See Dry Gel World in Action.</h1>
        <p>Use this education hub to plan the demos buyers most often need: adsorption science, packet sizing, container protection, and export packaging moisture control.</p>
      </section>

      <div className={styles.videosGrid}>
        {videos.map((v, i) => (
          <article key={i} className={styles.videoCard}>
            <div className={styles.videoThumb}>
              <Image src="/video-thumbnails.webp" alt="" fill style={{ objectFit: "cover" }} sizes="33vw" />
              <div className={styles.statusOverlay}>
                <span className={styles.statusBadge}>Planned</span>
              </div>
              <span className={styles.videoTag}>{v.tag}</span>
            </div>
            <div className={styles.videoCopy}>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
