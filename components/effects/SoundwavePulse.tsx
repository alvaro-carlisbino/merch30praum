"use client";

import { motion, useReducedMotion } from "motion/react";

interface SoundwavePulseProps {
  bars?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  active?: boolean;
}

const SIZE_MAP = {
  sm: { width: 2, gap: 2, height: 12 },
  md: { width: 3, gap: 3, height: 22 },
  lg: { width: 4, gap: 4, height: 36 },
};

export function SoundwavePulse({
  bars = 5,
  size = "md",
  color = "currentColor",
  className,
  active = true,
}: SoundwavePulseProps) {
  const reduce = useReducedMotion();
  const dim = SIZE_MAP[size];
  const seq = Array.from({ length: bars });

  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${dim.gap}px`,
        height: `${dim.height}px`,
      }}
    >
      {seq.map((_, i) => {
        const baseHeights = [0.4, 0.85, 0.55, 1, 0.7, 0.9, 0.45, 0.8];
        const targetHeights = active && !reduce
          ? [
              `${30 + ((i * 13) % 60)}%`,
              `${20 + ((i * 31) % 80)}%`,
              `${50 + ((i * 17) % 50)}%`,
              `${15 + ((i * 23) % 75)}%`,
              `${60 + ((i * 11) % 40)}%`,
            ]
          : [`${baseHeights[i % baseHeights.length] * 100}%`];
        return (
          <motion.span
            key={i}
            style={{
              width: `${dim.width}px`,
              background: color,
              borderRadius: `${dim.width}px`,
              display: "block",
            }}
            animate={
              active && !reduce
                ? { height: targetHeights }
                : { height: targetHeights[0] }
            }
            transition={
              active && !reduce
                ? {
                    duration: 1.1 + (i % 3) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.07,
                  }
                : undefined
            }
          />
        );
      })}
    </span>
  );
}
