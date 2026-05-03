"use client";
import Image from "next/image";
import styles from "./videos.module.css";

const videos = [
  { title: "Color-Change Saturation Guide", desc: "Watch silica gel beads transition from indicating orange to clear, demonstrating real-time moisture absorption for lab and consumer use.", tag: "Materials Science", duration: "4:32" },
  { title: "Humidity Control in Sealed Containers", desc: "Live demonstration showing how a single 5g sachet drops relative humidity from 70% to below 10% inside a sealed electronics enclosure.", tag: "Electronics", duration: "6:18" },
  { title: "DT-1200 Line Speed Demonstration", desc: "Full machine run at 250 packets per minute on a pharmaceutical packaging line, with servo motor precision cutting highlighted.", tag: "Industrial", duration: "8:05" },
  { title: "Container Strip Deployment", desc: "Step-by-step installation guide for maritime container strips to eliminate container rain and prevent catastrophic cargo loss.", tag: "Maritime", duration: "5:47" },
  { title: "Packet Reactivation Guide", desc: "Safe oven reactivation guidance for compatible formats, with temperature limits reviewed against the exact packet material.", tag: "How-To", duration: "3:21" },
  { title: "Bulk Industrial Supply Overview", desc: "A complete walkthrough of bulk silica gel options from 1lb bags to 55-gallon drums with B2B subscription pricing explained.", tag: "B2B Guide", duration: "7:14" },
  { title: "Moisture Protection Science Explained", desc: "A practical look at adsorption, sealed packaging, and why the right packet size matters for export cartons.", tag: "Packaging", duration: "9:02" },
  { title: "Pharmaceutical Clean Room Insertion", desc: "Step-by-step guide for integrating DT-1200 dispensers into a pharmaceutical clean room packaging environment.", tag: "Pharma", duration: "11:30" },
  { title: "3D Filament Moisture Protection", desc: "How to prevent moisture absorption in PLA, ABS, and PETG filament spools using indicating silica gel for perfect print results.", tag: "3D Printing", duration: "5:55" },
];

export default function VideosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Product Education</span>
        <h1>See SilacaGEL in Action.</h1>
        <p>Watch our comprehensive industry demonstrations covering adsorption science, equipment operation, and real-world applications — from pharmaceutical labs to deep-sea freight containers.</p>
      </section>

      <div className={styles.videosGrid}>
        {videos.map((v, i) => (
          <article key={i} className={styles.videoCard}>
            <div className={styles.videoThumb}>
              <Image src="/video-thumbnails.png" alt={v.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
              <div className={styles.playOverlay}>
                <div className={styles.playBtn}>▶</div>
              </div>
              <span className={styles.videoTag}>{v.tag}</span>
              <span className={styles.videoDuration}>{v.duration}</span>
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
