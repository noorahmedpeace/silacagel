"use client";

import Lottie, { type LottieOptions } from "lottie-react";
import { useEffect, useState } from "react";

interface LottiePlayerProps {
  url: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export const LottiePlayer = ({
  url,
  loop = true,
  autoplay = true,
  className,
}: LottiePlayerProps) => {
  const [animationData, setAnimationData] =
    useState<LottieOptions["animationData"] | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => {
        const contentType = res.headers.get("content-type") ?? "";
        if (!res.ok || !contentType.includes("application/json")) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          setAnimationData(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAnimationData(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (!animationData) {
    return <div className={className} />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
};
