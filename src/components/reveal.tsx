"use client";

import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  width?: "fit-content" | "100%";
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  width = "100%",
}: RevealProps) {
  return (
    <div
      data-reveal-direction={direction}
      style={{ animationDelay: `${delay}s`, position: "relative", width, overflow: "visible" }}
    >
      {children}
    </div>
  );
}
