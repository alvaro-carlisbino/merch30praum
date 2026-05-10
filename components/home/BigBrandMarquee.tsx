"use client";

import { Marquee } from "@/components/motion/Marquee";

export function BigBrandMarquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden py-12 sm:py-16"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Marquee
        items={["30PRAUM", "QUEM MANDA", "30PRAUM", "FORTALEZA · CE", "30PRAUM", "EST. 2016"]}
        speed={70}
        direction="left"
        separatorColor="var(--accent)"
        className="font-display uppercase leading-none"
        itemClassName="px-3"
        renderItem={(item) => (
          <span
            style={{
              fontSize: "clamp(4rem, 13vw, 13rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
            }}
          >
            {item}
          </span>
        )}
      />

      <div className="mt-2 sm:mt-4">
        <Marquee
          items={[
            "MATUÊ",
            "WIU",
            "TETO",
            "BRANDÃO 85",
            "MATUÊ",
            "WIU",
            "TETO",
            "BRANDÃO 85",
          ]}
          speed={50}
          direction="right"
          separatorColor="var(--muted)"
          className="font-display uppercase leading-none"
          itemClassName="px-3"
          renderItem={(item) => (
            <span
              style={{
                fontSize: "clamp(2.5rem, 8vw, 8rem)",
                letterSpacing: "-0.03em",
                color: "var(--accent)",
                WebkitTextStroke: "1px var(--fg)",
                WebkitTextFillColor: "transparent",
              }}
            >
              {item}
            </span>
          )}
        />
      </div>
    </section>
  );
}
