"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ArtistSlug } from "@/lib/artists/types";
import { useActiveArtist } from "@/lib/home/active-artist";

type HeroSlide = {
  key: ArtistSlug;
  photo: string;
  name: string;
  /** width visual do container do lettering (px) — todos próximos pra ficar uniforme */
  nameWidth: number;
  nameAspect: string;
  objectPosition: string;
  quote: string;
};

const SLIDES: HeroSlide[] = [
  {
    key: "matue",
    photo: "/figma-home/hero-matue.jpg",
    name: "/figma-home/name-matue.svg",
    // SVG 1:1; lettering brush ocupa ~60% horizontal e ~30% vertical da viewBox
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    quote: "“Todo mundo quer ser estrela, mas não tem lugar no Sol.” — Matuê",
  },
  {
    key: "wiu",
    photo: "/figma-home/hero-wiu.jpg",
    name: "/figma-home/name-wiu.svg",
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    quote: "“Se a saudade matasse, eu já tinha morrido bonito.” — Wiu",
  },
  {
    key: "teto",
    photo: "/figma-home/hero-teto.png",
    name: "/figma-home/name-teto.svg",
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 30%",
    quote: "“Não é fim. É trilha.” — Teto",
  },
  {
    key: "brandao",
    photo: "/figma-home/hero-brandao.jpg",
    name: "/figma-home/name-brandao.svg",
    // Brandão é wide 3:1, então usa largura maior pra manter altura visual similar
    nameWidth: 460,
    nameAspect: "1292 / 430",
    objectPosition: "center 25%",
    quote: "“Cresci copiando. Agora os outros copiam errado.” — Brandão85",
  },
];

const ROTATE_MS = 4500;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const setActive = useActiveArtist((s) => s.setActive);

  useEffect(() => {
    setActive(SLIDES[index].key);
  }, [index, setActive]);

  // auto-rotate; reseta sempre que index muda (incluindo cliques manuais)
  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearTimeout(id);
  }, [index]);

  const current = SLIDES[index];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "640px",
        background: "var(--bg)",
      }}
      aria-label="Universos 30praum"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={slide.photo}
            alt=""
            aria-hidden
            fill
            priority={i === 0}
            quality={95}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.objectPosition }}
          />
        </div>
      ))}

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-14 text-center sm:pb-20">
        <div className="relative flex items-center justify-center" style={{ minHeight: 230 }}>
          {SLIDES.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={slide.key}
                aria-hidden={!isActive}
                className="absolute transition-opacity duration-700"
                style={{
                  width: `min(${slide.nameWidth}px, 84vw)`,
                  aspectRatio: slide.nameAspect,
                  opacity: isActive ? 1 : 0,
                }}
              >
                <Image
                  src={slide.name}
                  alt={slide.key}
                  fill
                  sizes="500px"
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 4px 28px rgba(0,0,0,0.6))" }}
                />
              </div>
            );
          })}
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-white/75 sm:text-[11px]">
          <span>04 universos</span>
          <span aria-hidden className="text-white/40">·</span>
          <span>03 álbuns vivos</span>
          <span aria-hidden className="text-white/40">·</span>
          <span>10 anos de casa</span>
        </p>

        <div className="relative mt-5 w-full min-h-[4.5rem]">
          {SLIDES.map((slide, i) => (
            <p
              key={slide.key}
              aria-hidden={i !== index}
              className="absolute left-1/2 top-0 w-[min(640px,92vw)] -translate-x-1/2 transition-opacity duration-700 text-sm leading-relaxed text-white/85 sm:text-base"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              {slide.quote}
            </p>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar ${slide.key}`}
              className="h-1 w-8 rounded-full transition-colors"
              style={{
                background: i === index ? "#ffffff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* exporta o slide ativo via data attribute pra outros componentes se precisar */}
      <span hidden data-active-slide={current.key} />
    </section>
  );
}
