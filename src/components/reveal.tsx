"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  width?: "fit-content" | "100%";
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  width = "100%",
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xDist = direction === "left" ? 50 : direction === "right" ? -50 : 0;
    const yDist = direction === "up" ? 50 : direction === "down" ? -50 : 0;

    gsap.from(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: xDist,
      y: yDist,
      duration: 1,
      delay: delay,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ position: "relative", width, overflow: "visible" }}>
      {children}
    </div>
  );
}
