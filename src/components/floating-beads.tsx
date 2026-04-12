"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingBeads = () => {
  const [beads, setBeads] = useState<any[]>([]);

  useEffect(() => {
    // Generate random positions only on the client to avoid hydration mismatch
    const generatedBeads = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
    }));
    setBeads(generatedBeads);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {beads.map((bead) => (
        <motion.div
          key={bead.id}
          initial={{ y: 0, x: 0, opacity: 0.1 }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
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
