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

    let isVisible = false;
    let direction = 1;
    let frameId = 0;
    let lastTime = 0;
    let ready = false;

    const speed = 0.32;

    const stopLoop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      lastTime = 0;
    };

    const tick = (timestamp: number) => {
      if (!isVisible || !ready) {
        stopLoop();
        return;
      }

      if (!lastTime) {
        lastTime = timestamp;
      }

      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration <= 0.1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      let nextTime = video.currentTime + delta * speed * direction;

      if (nextTime >= duration) {
        nextTime = duration;
        direction = -1;
      } else if (nextTime <= 0) {
        nextTime = 0;
        direction = 1;
      }

      video.currentTime = nextTime;
      frameId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!ready || !isVisible || frameId) {
        return;
      }

      video.pause();
      frameId = requestAnimationFrame(tick);
    };

    const handleReady = () => {
      ready = true;
      video.pause();
      video.currentTime = 0;
      startLoop();
    };

    if (video.readyState >= 1) {
      handleReady();
    } else {
      video.addEventListener("loadedmetadata", handleReady);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);

    return () => {
      stopLoop();
      observer.disconnect();
      video.removeEventListener("loadedmetadata", handleReady);
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
        muted
        playsInline
        preload="auto"
        poster="/brand-logo.svg"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} />
    </div>
  );
}
