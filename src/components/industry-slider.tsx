"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./industry-slider.module.css";

export interface IndustryData {
  name: string;
  image: string;
  description: string;
}

interface IndustrySliderProps {
  industries: IndustryData[];
}

export const IndustrySlider = ({ industries }: IndustrySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % industries.length);
    }, 5000); // 5 seconds
    
    return () => clearInterval(timer);
  }, [industries.length]);

  const activeIndustry = industries[currentIndex];

  return (
    <div className={styles.container}>
      {/* LEFT: Image Section */}
      <div className={styles.imageSection}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={activeIndustry.image}
            alt={activeIndustry.name}
            className={styles.slideImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* RIGHT: Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.metaWrap}>
          <span className={styles.metaText}>Preservation Systems</span>
          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${currentIndex}`}
              className={styles.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {activeIndustry.name}
            </motion.h3>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIndex}`}
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {activeIndustry.description}
            </motion.p>
          </AnimatePresence>

          <a href="#quote" className={styles.viewAllBtn}>
            Request Quote
          </a>
        </div>

        {/* BOTTOM: Numbered Pagination */}
        <div className={styles.pagination}>
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${
                currentIndex === index ? styles.dotActive : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
