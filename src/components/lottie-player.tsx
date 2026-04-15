"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottiePlayerProps {
  url: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export const LottiePlayer = ({ url, loop = true, autoplay = true, className }: LottiePlayerProps) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie Load Error:", err));
  }, [url]);

  if (!animationData) return <div className={className} />;

  return (
    <Lottie 
      animationData={animationData} 
      loop={loop} 
      autoplay={autoplay} 
      className={className}
    />
  );
};
