"use client";

import { motion, useScroll, useTransform } from "motion/react";

const HOUSE = "#0a0a0a";
const MATUE = "#1f6bff";
const WIU = "#c8506a";
const TETO = "#c89858";
const BRANDAO = "#ff3b1f";

export function ScrollAtmosphere() {
  const { scrollYProgress } = useScroll();

  const tint = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [HOUSE, MATUE, WIU, TETO, BRANDAO, HOUSE],
  );

  const tintOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 0.07, 0.07, 0],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{
        backgroundColor: tint,
        opacity: tintOpacity,
        mixBlendMode: "screen",
      }}
    />
  );
}
