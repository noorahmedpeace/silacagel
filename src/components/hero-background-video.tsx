"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-background-video.module.css";

type HeroBackgroundVideoProps = {
  src: string;
  targetId: string;
};

export function HeroBackgroundVideo({
  src,
  targetId,
}: HeroBackgroundVideoProps) {
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

    video.defaultPlaybackRate = 0.72;
    video.playbackRate = 0.72;

    const tryPlay = () => {
      void video.play().catch(() => {
        // Keep the first frame visible if autoplay is blocked.
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      observer.disconnect();
      video.pause();
    };
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
        loop
        muted
        playsInline
        preload="auto"
        poster="/macro-hero.png"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} />
    </div>
  );
}
