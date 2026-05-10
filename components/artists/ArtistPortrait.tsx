"use client";

import Image from "next/image";
import { useState } from "react";
import type { ArtistConfig } from "@/lib/artists/types";

interface ArtistPortraitProps {
  artist: ArtistConfig;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
}

export function ArtistPortrait({
  artist,
  fill = true,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  objectPosition,
}: ArtistPortraitProps) {
  const initial = artist.realPhotoUrl ?? artist.portraitImage;
  const [src, setSrc] = useState(initial);
  const isPhoto = src === artist.realPhotoUrl;

  const finalPosition = objectPosition ?? artist.photoObjectPosition ?? "center";
  const filter = isPhoto ? artist.photoFilter : undefined;

  return (
    <Image
      src={src}
      alt={`Retrato — ${artist.displayName}`}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
      style={{
        objectPosition: isPhoto ? finalPosition : "center",
        filter,
      }}
      onError={() => {
        if (src !== artist.portraitImage) setSrc(artist.portraitImage);
      }}
      unoptimized={!isPhoto}
    />
  );
}
