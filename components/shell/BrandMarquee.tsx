import { Marquee } from "@/components/motion/Marquee";

const ITEMS = [
  "QUEM MANDA É A 30PRAUM",
  "DROP ATIVO",
  "XTRANHO · MATUÊ",
  "COLAPSO GLOBAL · WIU × TETO",
  "ISSO É TRAP VOL.02 · BRANDÃO85",
  "PARCERIA RAW · RENNER · KENNER",
  "SECURITY BAG LACRADA",
];

export function BrandMarquee() {
  return (
    <div
      className="w-full"
      style={{
        background: "var(--accent)",
        color: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Marquee
        items={ITEMS}
        speed={75}
        className="font-display tracking-[0.18em] text-base sm:text-xl py-3"
        itemClassName="px-2"
        separatorColor="var(--bg)"
      />
    </div>
  );
}
