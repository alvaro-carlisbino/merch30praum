"use client";

import { Marquee } from "@/components/motion/Marquee";

export function FreeShippingBar() {
  return (
    <div
      role="note"
      style={{
        background: "var(--accent)",
        color: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Marquee
        items={[
          "PIX · 5% OFF",
          "FRETE GRÁTIS ACIMA DE R$ 299",
          "PARCELE EM ATÉ 4× SEM JUROS",
          "TROCAS GRÁTIS EM 30 DIAS",
          "SECURITY BAG LACRADA",
          "LOJA OFICIAL 30PRAUM",
        ]}
        speed={50}
        separatorColor="var(--bg)"
        className="font-display tracking-[0.18em] text-xs sm:text-sm py-1.5"
      />
    </div>
  );
}
