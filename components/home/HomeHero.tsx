"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ArtistSlug } from "@/lib/artists/types";
import { useActiveArtist } from "@/lib/home/active-artist";
import { blurFor } from "@/lib/images/blur-data";
type HeroSlide = {
  key: ArtistSlug;
  photo: string;
  name: string;
  nameHeight: string;
  nameAspect: string;
  objectPosition: string;
  caption: string;
};
const SLIDES: HeroSlide[] = [
  {
    key: "matue",
    photo: "/figma-home/hero-matue.jpg",
    name: "/figma-home/name-matue.svg",
    nameHeight: "clamp(96px, 22svh, 230px)",
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    caption: "Matuê · XTRANHO, 2025",
  },
  {
    key: "wiu",
    photo: "/figma-home/hero-wiu.jpg",
    name: "/figma-home/name-wiu.svg",
    nameHeight: "clamp(96px, 22svh, 230px)",
    nameAspect: "1000 / 1000",
    objectPosition: "center 25%",
    caption: "Wiu · Colapso Global, com Teto, 2026",
  },
  {
    key: "teto",
    photo: "/figma-home/hero-teto.jpg",
    name: "/figma-home/name-teto.svg",
    nameHeight: "clamp(96px, 22svh, 230px)",
    nameAspect: "1000 / 1000",
    objectPosition: "center 30%",
    caption: "Teto · Colapso Global, com Wiu, 2026",
  },
  {
    key: "brandao",
    photo: "/figma-home/hero-brandao.jpg",
    name: "/figma-home/name-brandao.svg",
    nameHeight: "clamp(56px, 10svh, 130px)",
    nameAspect: "1292 / 430",
    objectPosition: "center 25%",
    caption: "Brandão85 · Isso É Trap Vol. 2, 2026",
  },
];
const ROTATE_MS = 5200;
const SHOP_ROTATE_MS = 3800;

export type HeroProduct = {
  handle: string;
  image: string;
  title: string;
  price: string;
};

export function HomeHero({ products }: { products: HeroProduct[] }) {
  return (
    <section
      aria-label="Artistas e loja da 30praum"
      className="relative flex w-full flex-col overflow-hidden md:flex-row"
      style={{ height: "calc(100svh - 3.5rem)", minHeight: 600, background: "var(--bg)" }}
    >
      <ArtistHalf />
      {products.length > 0 && <ShopHalf products={products} />}
    </section>
  );
}

function ArtistHalf() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const setActive = useActiveArtist((s) => s.setActive);
  useEffect(() => {
    setActive(SLIDES[index].key);
  }, [index, setActive]);
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);
  const current = SLIDES[index];
  return (
    <div
      className="relative min-h-0 flex-[1.2] overflow-hidden md:flex-1"
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
              sizes="(min-width: 768px) 50vw, 100vw"
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
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <Link
        href={`/${current.key}`}
        data-cursor={current.caption.split(" · ")[0]}
        aria-label={`Ver ${current.caption.split(" · ")[0]}`}
        className="absolute inset-0 z-10"
      />
      <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-end px-4 pb-6 text-center md:pb-14">
        <div
          className="relative flex w-full items-center justify-center"
          style={{ height: "clamp(96px, 22svh, 230px)" }}
        >
          {SLIDES.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={slide.key}
                aria-hidden={!isActive}
                className={isActive ? "hero-name-in absolute bottom-0" : "absolute bottom-0"}
                style={{
                  height: slide.nameHeight,
                  aspectRatio: slide.nameAspect,
                  maxWidth: "82%",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 700ms",
                }}
              >
                <Image
                  src={slide.name}
                  alt={slide.caption.split(" · ")[0]}
                  fill
                  sizes="400px"
                  className="object-contain object-bottom"
                  style={{ filter: "drop-shadow(0 4px 28px rgba(0,0,0,0.6))" }}
                />
              </div>
            );
          })}
        </div>
        <div className="relative mt-3 min-h-[1.5rem] w-full md:mt-5">
          {SLIDES.map((slide, i) => (
            <p
              key={slide.key}
              aria-hidden={i !== index}
              className="absolute left-1/2 top-0 w-[92%] -translate-x-1/2 text-xs leading-relaxed text-white/85 transition-opacity duration-700 sm:text-sm"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              {slide.caption}
            </p>
          ))}
        </div>
        <div className="pointer-events-auto mt-4 flex items-center gap-2 md:mt-8">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar ${slide.caption.split(" · ")[0]}`}
              className="relative h-1 w-7 overflow-hidden rounded-full"
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
        .hero-kenburns { animation: hero-kenburns ${ROTATE_MS + 1200}ms linear both; }
        @keyframes hero-kenburns { from { transform: scale(1.045); } to { transform: scale(1); } }
        .hero-name-in { animation: hero-name-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes hero-name-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .hero-dot-fill { animation-name: hero-dot-fill; animation-timing-function: linear; animation-fill-mode: both; }
        @keyframes hero-dot-fill { from { width: 0%; } to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) { .hero-kenburns, .hero-name-in { animation: none; } }
      `}</style>
    </div>
  );
}

function ShopHalf({ products }: { products: HeroProduct[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || products.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % products.length), SHOP_ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, paused, products.length]);
  const current = products[index];
  return (
    <div
      className="relative flex min-h-0 flex-1 flex-row items-stretch overflow-hidden md:flex-col"
      style={{ background: "#ffffff", color: "#0f0f0e" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href={`/produto/${current.handle}`}
        data-cursor={current.title}
        aria-label={current.title}
        className="group relative block min-h-0 w-[52%] shrink-0 md:w-full md:flex-1"
      >
        {products.map((p, i) => (
          <div
            key={p.handle}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={p.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 50vw, 52vw"
              placeholder={blurFor(p.image) ? "blur" : "empty"}
              blurDataURL={blurFor(p.image)}
              className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] md:p-10"
            />
          </div>
        ))}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-5 pr-4 md:flex-none md:flex-row md:items-end md:justify-between md:gap-6 md:px-10 md:pb-14 md:pt-0">
        <div className="min-w-0">
          <p
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 4.2rem)", letterSpacing: "-0.02em" }}
          >
            Loja
          </p>
          <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-black/70 md:text-sm" aria-live="polite">
            {current.title}
          </p>
          <p className="mt-1 text-[13px] tabular-nums md:text-sm">{current.price}</p>
          <div className="mt-3 flex gap-1.5" aria-hidden>
            {products.map((p, i) => (
              <span
                key={p.handle}
                className="h-1 rounded-full transition-all duration-500"
                style={{ width: i === index ? 18 : 6, background: i === index ? "#0f0f0e" : "rgba(0,0,0,0.2)" }}
              />
            ))}
          </div>
        </div>
        <Link
          href="/loja"
          data-cursor="Loja"
          className="inline-flex shrink-0 items-center justify-center self-start rounded-full bg-black px-5 py-3 text-[13px] text-white transition-opacity hover:opacity-85 md:self-auto md:px-7 md:py-3.5 md:text-[14px]"
        >
          Ir pra loja →
        </Link>
      </div>
    </div>
  );
}
