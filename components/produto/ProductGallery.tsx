"use client";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { usePointerFine } from "@/lib/utils/use-pointer-fine";
import { blurFor } from "@/lib/images/blur-data";

interface Props {
  images: string[];
  alt: string;
}

const TILE = "#ffffff";

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const fine = usePointerFine();
  const main = images[active] ?? images[0];
  const hasThumbs = images.length > 1;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }

  return (
    <div className={hasThumbs ? "grid grid-cols-[1fr_88px] gap-4 sm:grid-cols-[1fr_120px] sm:gap-6" : "grid grid-cols-1"}>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "4 / 5", background: TILE, cursor: fine ? "zoom-in" : undefined }}
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
        data-cursor="Zoom"
      >
        <Image
          key={main}
          src={main}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          placeholder={blurFor(main) ? "blur" : "empty"}
          blurDataURL={blurFor(main)}
          className="object-cover transition-transform duration-300 ease-out"
          style={{
            transform: zoom ? "scale(1.9)" : "scale(1)",
            transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
          }}
        />
      </div>
      {hasThumbs && (
        <div className="flex flex-col gap-3 sm:gap-4">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
              aria-pressed={i === active}
              data-cursor={`Foto ${i + 1}`}
              className="relative overflow-hidden rounded-2xl transition-all"
              style={{
                aspectRatio: "4 / 5",
                background: TILE,
                boxShadow: i === active ? "0 0 0 2px var(--accent)" : "0 0 0 1px var(--border)",
                opacity: i === active ? 1 : 0.75,
              }}
            >
              <Image src={src} alt="" aria-hidden fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
