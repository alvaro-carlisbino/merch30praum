"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="grid grid-cols-[1fr_88px] gap-4 sm:grid-cols-[1fr_120px] sm:gap-6">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "3 / 4",
          background: "color-mix(in srgb, var(--fg) 6%, var(--bg))",
        }}
      >
        <Image
          src={main}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Foto ${i + 1}`}
            data-cursor={`Foto ${i + 1}`}
            className="relative overflow-hidden rounded-2xl transition-all"
            style={{
              aspectRatio: "1 / 1",
              background: "color-mix(in srgb, var(--fg) 6%, var(--bg))",
              boxShadow:
                i === active
                  ? "0 0 0 2px var(--accent)"
                  : "0 0 0 1px var(--border)",
            }}
          >
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
