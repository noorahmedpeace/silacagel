"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./hero-film.module.css";

/**
 * The homepage hero's product film: a silent 29 s loop cut from the November
 * 2026 launch film (sachets, kraft sachets, container strips, bulk beads,
 * documents). Built from the plant's own photos and drawn illustrations; the
 * indicating-gel chapter is not in this cut.
 *
 * It plays only while it is on screen, never under reduced motion or Save-Data
 * (the poster stands in and the button starts it), and the button pauses it,
 * because looping motion longer than five seconds needs a stop (WCAG 2.2.2).
 * preload="none" keeps the 1 MB file off the critical path; the poster is the
 * paint.
 */
export function HeroFilm({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduceMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) video.play().catch(() => {});
        else if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <figure className={`${styles.frame} ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/film/drygelworld-range-loop.mp4"
        poster="/film/drygelworld-range-loop.webp"
        width={1280}
        height={720}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-label="Product film: silica gel sachets 0.5g to 20g, kraft paper sachets 1g to 20g, container strips 1 to 5 kg, loose beads 1 to 25 kg, and the SDS, COA and export documents that ship with every order."
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label={playing ? "Pause the product film" : "Play the product film"}
      >
        {playing ? (
          <Pause size={16} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <Play size={16} strokeWidth={2.2} aria-hidden="true" className={styles.playIcon} />
        )}
      </button>
    </figure>
  );
}
