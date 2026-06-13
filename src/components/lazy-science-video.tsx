"use client";

import { useEffect, useRef, useState } from "react";

type LazyScienceVideoProps = {
  className?: string;
};

export function LazyScienceVideo({ className }: LazyScienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? "/videos/silica-beads-glass-container-3d.mp4" : undefined}
      poster="/macro_silica_beads_1775989669467.webp"
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload="none"
      aria-label="3D animation of clear silica gel beads inside a premium glass container"
    />
  );
}
