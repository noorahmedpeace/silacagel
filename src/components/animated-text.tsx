"use client";

import { motion, Variants } from "framer-motion";
import styles from "./animated-text.module.css";

type AnimatedTextProps = {
  as?: "h1" | "h2" | "p";
  text: string;
  className?: string;
  mode?: "rise" | "bubble";
  delay?: number;
};

const containerVariants: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.045,
    },
  }),
};

const riseWordVariants: Variants = {
  hidden: {
    opacity: 0.55,
    y: 18,
    filter: "blur(3px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bubbleWordVariants: Variants = {
  hidden: {
    opacity: 0.55,
    y: 26,
    scale: 0.88,
    filter: "blur(3px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 21,
      mass: 0.8,
    },
  },
};

export function AnimatedText({
  as = "h2",
  text,
  className,
  mode = "rise",
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const wordVariants = mode === "bubble" ? bubbleWordVariants : riseWordVariants;
  const textClassName = [styles.text, mode === "bubble" ? styles.bubble : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {words.map((word, index) => (
        <span className={styles.line} key={`${word}-${index}`}>
          <motion.span className={styles.word} variants={wordVariants}>
            {word}
          </motion.span>
          {index < words.length - 1 ? <span className={styles.wordSpace}> </span> : null}
        </span>
      ))}
    </>
  );

  const animationProps = {
    className: textClassName,
    variants: containerVariants,
    custom: delay,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.48 },
  };

  if (as === "h1") {
    return <motion.h1 {...animationProps}>{content}</motion.h1>;
  }

  if (as === "p") {
    return <motion.p {...animationProps}>{content}</motion.p>;
  }

  return <motion.h2 {...animationProps}>{content}</motion.h2>;
}
