import Image from "next/image";

export function HomeHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "min(86svh, 880px)",
        minHeight: "640px",
        background: "var(--bg)",
      }}
      aria-labelledby="home-hero-title"
    >
      <Image
        src="/figma-home/hero-matue.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: "center 30%",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-16 text-center sm:pb-24">
        <h1
          id="home-hero-title"
          className="text-white leading-[0.85]"
          style={{
            fontFamily: "var(--font-tag-matue, cursive)",
            fontSize: "clamp(5rem, 14vw, 12rem)",
            letterSpacing: "-0.01em",
            transform: "rotate(-3deg)",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Matuê
        </h1>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-[11px]">
          <span>04 universos</span>
          <span aria-hidden className="text-white/40">·</span>
          <span>03 álbuns vivos</span>
          <span aria-hidden className="text-white/40">·</span>
          <span>10 anos de casa</span>
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          Casa de Matuê, Wiu, Teto e Brandão85. Fundada em 2016 em Fortaleza
          pra colocar o trap nordestino no centro do mapa.
        </p>
      </div>
    </section>
  );
}
