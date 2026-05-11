"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

interface WordRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  wordClassName?: string;
}

export function WordReveal({
  text,
  className,
  stagger = 0.06,
  amount = 0.4,
  once = true,
  as: Component = "h2",
  wordClassName,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = motion[Component] as typeof motion.h2;

  return (
    <MotionTag
      className={cn(className)}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: stagger } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            className={cn(
              "inline-block overflow-hidden align-baseline",
              !isLast && "mr-[0.25em]",
              wordClassName,
            )}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
