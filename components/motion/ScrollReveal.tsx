"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  stagger?: number;
  offset?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  amount?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "header" | "h1" | "h2" | "p";
}

const directions = {
  up: { y: 30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export function ScrollReveal({
  children,
  stagger = 0.08,
  offset = 30,
  direction = "up",
  className,
  amount = 0.25,
  duration = 0.7,
  once = true,
  as = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const dir = directions[direction];
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: stagger } },
      }}
    >
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              x: dir.x * (offset / 30),
              y: dir.y * (offset / 30),
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration, ease: [0.4, 0, 0.2, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </Component>
  );
}
