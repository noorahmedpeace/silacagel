"use client";

import { motion } from "framer-motion";

type FloatingBead = {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  driftX: number;
};

const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const seededRange = (seed: number, min: number, max: number) => min + seededUnit(seed) * (max - min);

const beads: FloatingBead[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: seededRange(i + 1, 10, 50),
  left: seededRange(i + 21, 0, 100),
  top: seededRange(i + 41, 0, 100),
  duration: seededRange(i + 61, 20, 40),
  delay: seededRange(i + 81, 0, 5),
  driftX: seededRange(i + 101, -50, 50),
}));

export const FloatingBeads = () => {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {beads.map((bead) => (
        <motion.div
          key={bead.id}
          initial={{ y: 0, x: 0, opacity: 0.1 }}
          animate={{
            y: [0, -200, 0],
            x: [0, bead.driftX, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: bead.duration,
            repeat: Infinity,
            delay: bead.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${bead.left}%`,
            top: `${bead.top}%`,
            width: bead.size,
            height: bead.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(6,182,212,0.2) 70%)",
            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
            backdropFilter: "blur(4px)",
          }}
        />
      ))}
    </div>
  );
};
