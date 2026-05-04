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

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.fromTo(container.current, {
      opacity: 1,
      x: reduceMotion ? 0 : xDist * 0.22,
      y: reduceMotion ? 0 : yDist * 0.22,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      x: 0,
      y: 0,
      duration: reduceMotion ? 0.01 : 0.9,
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
