"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface VHSPlayerProps {
  poster: string;
  alt?: string;
  /** texto piscando no canto, ex.: "MATUE_TAKE_04" */
  label?: string;
  /** track number, ex.: "01" */
  trackNo?: string;
  className?: string;
}

/**
 * Frame de VHS — fotograma do clipe com tracking distorcido,
 * color bleed RGB, timestamp piscando, REC piscando.
 * Não é vídeo (poster apenas). A degradação é toda visual via CSS.
 */
export function VHSPlayer({ poster, alt = "", label = "RAW_TAPE", trackNo = "01", className }: VHSPlayerProps) {
  const [time, setTime] = useState("00:00:00");
  const [rec, setRec] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - start;
      const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
      const m = String(Math.floor((ms / 60000) % 60)).padStart(2, "0");
      const s = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
      setRec((r) => !r);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("vhs-frame relative aspect-video w-full overflow-hidden", className)}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 90vw"
        className="object-cover"
        style={{
          filter: "saturate(1.05) contrast(1.08) brightness(0.92)",
        }}
        unoptimized
      />

      {/* color bleed RGB */}
      <div
        aria-hidden
        className="vhs-bleed pointer-events-none absolute inset-0"
      />

      {/* tracking distortion bars */}
      <div aria-hidden className="vhs-tracking pointer-events-none absolute inset-0" />

      {/* scanlines */}
      <div aria-hidden className="vhs-scan pointer-events-none absolute inset-0" />

      {/* top-left REC */}
      <div className="absolute left-3 top-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em]" style={{ color: "#ffe7e7", textShadow: "0 0 2px #ff0000" }}>
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: "#ff2a2a", opacity: rec ? 1 : 0.25 }}
        />
        <span>{rec ? "● REC" : "  REC"}</span>
        <span style={{ opacity: 0.8 }}>SP</span>
      </div>

      {/* top-right LABEL */}
      <div className="absolute right-3 top-2 font-mono text-[11px] uppercase" style={{ color: "#e2ffe2", textShadow: "0 0 2px #0aff0a" }}>
        {label}
      </div>

      {/* bottom-left TIME */}
      <div className="absolute bottom-3 left-3 font-mono text-[13px] tabular-nums" style={{ color: "#e2ffe2", textShadow: "0 0 3px #0aff0a" }}>
        {time}
      </div>

      {/* bottom-right TRACK */}
      <div className="absolute bottom-3 right-3 font-mono text-[11px] uppercase" style={{ color: "#fff9b3", textShadow: "0 0 3px #ffb800" }}>
        TRK {trackNo}
      </div>
    </div>
  );
}
