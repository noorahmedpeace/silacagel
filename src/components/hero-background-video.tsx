"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-background-video.module.css";

type HeroBackgroundVideoProps = {
  src: string;
  targetId: string;
};

export function HeroBackgroundVideo({ src, targetId }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const target = document.getElementById(targetId);
    if (!video || !target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.playbackRate = 0.7;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        void video.play();
      } else {
        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        if (duration > 0.1) {
          video.currentTime = Math.max(0, duration - 0.08);
        }
        video.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  if (!src) {
    return null;
  }

  return (
    <div className={styles.heroMedia} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/brand-logo.svg"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} />
    </div>
  );
}
