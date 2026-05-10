"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface PhysicalMediaProps {
  src: string;
  alt: string;
  className?: string;
}

export function PhysicalMedia({ src, alt, className }: PhysicalMediaProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative aspect-square overflow-hidden border border-white/10 shadow-2xl ${className}`}
      style={{ perspective: "1000px" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-30 transition-opacity group-hover:opacity-50"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-full z-30 opacity-0 group-hover:opacity-20"
        style={{
          background: "linear-gradient(45deg, transparent 45%, #fff 50%, transparent 55%)",
          filter: "blur(20px)",
        }}
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.div>
  );
}
