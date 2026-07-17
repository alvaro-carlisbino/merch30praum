"use client";
import { motion, useReducedMotion } from "motion/react";
interface RevealProps {
  children: React.ReactNode;
  /** Atraso em ms, pra escalonar cards de uma mesma fileira. */
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  distance?: number;
  className?: string;
}
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
