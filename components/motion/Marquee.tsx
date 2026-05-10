"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  separatorColor?: string;
  className?: string;
  itemClassName?: string;
  renderItem?: (item: string, index: number) => React.ReactNode;
}

export function Marquee({
  items,
  speed = 60,
  direction = "left",
  separatorColor,
  className,
  itemClassName,
  renderItem,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const duration = (items.length * 260) / speed;

  return (
    <div
      className={cn("relative overflow-hidden whitespace-nowrap", className)}
      aria-hidden
    >
      <motion.div
        className="inline-flex items-center"
        animate={
          reduce
            ? undefined
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={cn("inline-flex items-center", itemClassName)}>
            {renderItem ? renderItem(item, i) : item}
            <span
              className="inline-block mx-6 h-[6px] w-[6px] rounded-full"
              style={{ background: separatorColor ?? "currentColor", opacity: 0.5 }}
              aria-hidden
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
