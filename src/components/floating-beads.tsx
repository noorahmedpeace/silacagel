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

const beads: FloatingBead[] = Array.from({ length: 20 }, (_, id) => ({
  id,
  size: 14 + (id % 5) * 7,
  left: 6 + (id * 11) % 88,
  top: 8 + (id * 17) % 84,
  duration: 20 + (id % 6) * 2.5,
  delay: (id % 7) * 0.45,
  driftX: ((id % 5) - 2) * 16,
}));

export const FloatingBeads = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
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
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(6,182,212,0.2) 70%)",
            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
            backdropFilter: "blur(4px)",
          }}
        />
      ))}
    </div>
  );
};
