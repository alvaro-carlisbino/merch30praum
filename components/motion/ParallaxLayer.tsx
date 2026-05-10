"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ParallaxLayerProps {
  children: ReactNode;
  translateY?: number;
  scaleFrom?: number;
  scaleTo?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  translateY = -20,
  scaleFrom = 1,
  scaleTo = 1,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-translateY}%`, `${translateY}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
