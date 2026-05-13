"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ArtistSlug } from "@/lib/artists/types";
import { useActiveArtist } from "@/lib/home/active-artist";

type HeroSlide = {
  slug: ArtistSlug;
  photo: string;
  name: string;
  nameWidth: number;
  nameHeight: number;
  objectPosition: string;
};

const SLIDES: HeroSlide[] = [
  {
    slug: "matue",
    photo: "/figma-home/hero-matue.jpg",
    name: "/figma-home/name-matue-big.png",
    nameWidth: 461,
    nameHeight: 461,
    objectPosition: "center 30%",
  },
  {
    slug: "wiu",
    photo: "/figma-home/hero-wiu.png",
    name: "/figma-home/name-wiu-medium.png",
    nameWidth: 362,
    nameHeight: 260,
    objectPosition: "center 25%",
  },
  {
    slug: "teto",
    photo: "/figma-home/hero-teto.png",
    name: "/figma-home/name-teto-big.png",
    nameWidth: 362,
    nameHeight: 116,
    objectPosition: "center 30%",
  },
  {
    slug: "brandao",
    photo: "/figma-home/hero-brandao.png",
    name: "/figma-home/name-brandao-big.png",
    nameWidth: 362,
    nameHeight: 122,
    objectPosition: "center 30%",
  },
];

const ROTATE_MS = 4500;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const setActive = useActiveArtist((s) => s.setActive);

  useEffect(() => {
    setActive(SLIDES[index].slug);
  }, [index, setActive]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "min(86svh, 880px)",
        minHeight: "640px",
        background: "var(--bg)",
      }}
      aria-label="Universos 30praum"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.slug}
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
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-16 text-center sm:pb-24">
        <div
          className="relative"
          style={{
            width: "min(60vw, 540px)",
            height: "min(28vw, 240px)",
          }}
        >
          {SLIDES.map((slide, i) => (
            <Image
              key={slide.slug}
              src={slide.name}
              alt={slide.slug}
              fill
              aria-hidden={i !== index}
              sizes="(min-width: 640px) 540px, 60vw"
              className="object-contain transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </div>

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

        <div className="mt-8 flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar ${slide.slug}`}
              className="h-1 w-8 rounded-full transition-colors"
              style={{
                background: i === index ? "#ffffff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
