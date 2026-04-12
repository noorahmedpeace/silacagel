"use client";

import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./embla-carousel.module.css";

type PropType = {
  children: ReactNode[];
  options?: any;
};

export const EmblaCarousel: React.FC<PropType> = ({ children, options }) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 3000 })]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {children.map((child, index) => (
          <div className={styles.embla__slide} key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
