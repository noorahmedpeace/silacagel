import Image from "next/image";
import styles from "./machine-showcase.module.css";

export type ShowcaseImage = { src: string; alt: string; caption: string };

type MachineShowcaseProps = {
  heading: string;
  intro: string;
  /** Optional line video (mp4 in /public). Rendered as the large feature. */
  video?: string;
  /** Poster/feature image shown before the video plays, or as the feature
   *  when no video is supplied. */
  feature: ShowcaseImage;
  /** Supporting images shown in the gallery grid below the feature. */
  gallery: ShowcaseImage[];
  /** Honest facts under the gallery (capacity/accuracy/etc.). */
  stats?: { label: string; value: string }[];
};

/**
 * Premium facility showcase, real machine footage + photos in a gold-framed
 * feature with a supporting gallery. Server component: native <video controls>
 * and next/image, no client JS. Only genuine imagery is passed in.
 */
export function MachineShowcase({ heading, intro, video, feature, gallery, stats }: MachineShowcaseProps) {
  return (
    <section className={styles.showcase} aria-label={heading}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Our Packaging Facility</span>
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>

      <figure className={styles.feature}>
        {video ? (
          <video
            className={styles.media}
            controls
            playsInline
            preload="metadata"
            poster={feature.src}
            aria-label={feature.alt}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image
            className={styles.media}
            src={feature.src}
            alt={feature.alt}
            width={1400}
            height={788}
            sizes="(max-width: 900px) 100vw, 900px"
            priority={false}
          />
        )}
        <figcaption>{video ? "Live footage from our packaging line" : feature.caption}</figcaption>
      </figure>

      <div className={styles.grid}>
        {gallery.map((img) => (
          <figure className={styles.tile} key={img.src}>
            <div className={styles.tileMedia}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 340px"
                className={styles.tileImg}
              />
            </div>
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {stats?.length ? (
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div className={styles.stat} key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
