"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export function PageTransition() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <Slide key={pathname} pathname={pathname} />
    </AnimatePresence>
  );
}

function Slide({ pathname }: { pathname: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  const label = deriveLabel(pathname);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997] flex items-end justify-start"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
      style={{ background: "#000" }}
    >
      <motion.span
        className="font-display uppercase text-white p-8 sm:p-14 leading-[0.85]"
        style={{
          fontSize: "clamp(3rem, 12vw, 12rem)",
          letterSpacing: "-0.04em",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

function deriveLabel(pathname: string): string {
  if (pathname === "/") return "30PRAUM";
  if (pathname.startsWith("/matue")) return "XTRANHO";
  if (pathname.startsWith("/wiu")) return "WIU";
  if (pathname.startsWith("/teto")) return "TETO";
  if (pathname.startsWith("/brandao")) return "BRANDÃO 85";
  if (pathname.startsWith("/album/xtranho")) return "XTRANHO";
  if (pathname.startsWith("/album/colapso")) return "COLAPSO GLOBAL";
  if (pathname.startsWith("/album/isso")) return "ISSO É TRAP VOL.02";
  if (pathname.startsWith("/parcerias")) return "PARCERIAS";
  if (pathname.startsWith("/loja")) return "LOJA OFICIAL";
  if (pathname.startsWith("/cart")) return "CARRINHO";
  if (pathname.startsWith("/about")) return "30PRAUM";
  return "30PRAUM";
}
