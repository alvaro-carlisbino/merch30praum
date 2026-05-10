"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.5,
  });
  const height = useTransform(smoothed, [0, 1], ["0%", "100%"]);
  const percent = useTransform(smoothed, (v) =>
    `${Math.round(v * 100).toString().padStart(2, "0")}%`,
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-3 top-0 bottom-0 z-[40] hidden md:flex flex-col items-center justify-start py-32"
    >
      <span
        className="text-[9px] uppercase tracking-[0.3em] mb-3"
        style={{ color: "var(--muted)" }}
      >
        scroll
      </span>
      <div
        className="relative h-full w-px"
        style={{ background: "var(--border)" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-px"
          style={{ height, background: "var(--accent)" }}
        />
      </div>
      <motion.span
        className="text-[9px] uppercase tracking-[0.3em] mt-3 tabular-nums"
        style={{ color: "var(--accent)" }}
      >
        {percent}
      </motion.span>
    </div>
  );
}
