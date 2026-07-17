"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ArtistSlug } from "@/lib/artists/types";
import { useActiveArtist } from "@/lib/home/active-artist";
import { blurFor } from "@/lib/images/blur-data";
type HeroSlide = {
  key: ArtistSlug;
  photo: string;
  name: string;
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
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    quote: "“Todo mundo quer ser estrela, mas não tem lugar no Sol.” · Matuê",
  },
  {
    key: "wiu",
    photo: "/figma-home/hero-wiu.jpg",
    name: "/figma-home/name-wiu.svg",
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    quote: "“Se a saudade matasse, eu já tinha morrido bonito.” · Wiu",
  },
  {
    key: "teto",
    photo: "/figma-home/hero-teto.png",
    name: "/figma-home/name-teto.svg",
    nameWidth: 320,
    nameAspect: "1000 / 1000",
    objectPosition: "center 30%",
    quote: "“Não é fim. É trilha.” · Teto",
  },
  {
    key: "brandao",
    photo: "/figma-home/hero-brandao.jpg",
    name: "/figma-home/name-brandao.svg",
    nameWidth: 460,
    nameAspect: "1292 / 430",
    objectPosition: "center 25%",
    quote: "“Cresci copiando. Agora os outros copiam errado.” · Brandão85",
  },
];
const ROTATE_MS = 5200;
export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const setActive = useActiveArtist((s) => s.setActive);
  useEffect(() => {
    setActive(SLIDES[index].key);
  }, [index, setActive]);
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <div
            className={i === index ? "hero-kenburns absolute inset-0" : "absolute inset-0"}
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            <Image
              src={slide.photo}
              alt=""
              aria-hidden
              fill
              priority={i === 0}
              quality={80}
              sizes="100vw"
              placeholder={blurFor(slide.photo) ? "blur" : "empty"}
              blurDataURL={blurFor(slide.photo)}
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />
          </div>
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
                className={isActive ? "hero-name-in absolute" : "absolute"}
                style={{
                  width: `min(${slide.nameWidth}px, 84vw)`,
                  aspectRatio: slide.nameAspect,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 700ms",
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
              className="relative h-1 w-8 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.3)" }}
            >
              {i === index && (
                <span
                  key={`fill-${index}`}
                  aria-hidden
                  className="hero-dot-fill absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{
                    animationDuration: `${ROTATE_MS}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .hero-kenburns {
          animation: hero-kenburns ${ROTATE_MS + 1200}ms linear both;
        }
        @keyframes hero-kenburns {
          from { transform: scale(1.045); }
          to { transform: scale(1); }
        }
        .hero-name-in {
          animation: hero-name-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes hero-name-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-dot-fill {
          animation-name: hero-dot-fill;
          animation-timing-function: linear;
          animation-fill-mode: both;
        }
        @keyframes hero-dot-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns, .hero-name-in { animation: none; }
        }
      `}</style>
      <span hidden data-active-slide={current.key} />
    </section>
  );
}
