"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AmbientGlow = () => {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {/* ── Cursor-tracking glow ── */}
      <div
        ref={cursorGlowRef}
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.12s ease, top 0.12s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Floating blue orb — top-left ── */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Floating orb — center-right ── */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Floating orb — bottom-left ── */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Small sharp accent orb ── */}
      <motion.div
        animate={{
          x: [0, -30, 60, 0],
          y: [0, 40, -20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Animated grid overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
    </div>
  );
};
