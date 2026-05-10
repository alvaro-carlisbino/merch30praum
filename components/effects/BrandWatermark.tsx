"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function BrandWatermark() {
  const pathname = usePathname();
  const meta = deriveMeta(pathname);

  return (
    <motion.div
      aria-hidden
      key={pathname}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: 0.3 }}
      className="pointer-events-none fixed top-20 right-3 z-[55] hidden lg:flex flex-col items-end gap-1"
    >
      <span
        className="text-[9px] uppercase tracking-[0.4em]"
        style={{ color: "var(--muted)" }}
      >
        {meta.label}
      </span>
      <span
        className="font-display tabular-nums leading-none"
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          color: "var(--accent)",
        }}
      >
        {meta.code}
      </span>
    </motion.div>
  );
}

function deriveMeta(pathname: string): { label: string; code: string } {
  const segs = pathname.split("/").filter(Boolean);

  if (segs[0] === "matue") return { label: "Universo", code: "01 / 04" };
  if (segs[0] === "wiu") return { label: "Universo", code: "02 / 04" };
  if (segs[0] === "teto") return { label: "Universo", code: "03 / 04" };
  if (segs[0] === "brandao") return { label: "Universo", code: "04 / 04" };
  if (segs[0] === "album") return { label: "Capítulo", code: "ÁLBUM" };
  if (segs[0] === "parcerias") return { label: "Expansões", code: "BR" };
  if (segs[0] === "cart") return { label: "Carrinho", code: "$ BRL" };
  if (segs[0] === "about") return { label: "Casa", code: "EST. 2016" };
  return { label: "30praum", code: "10 ANOS" };
}
