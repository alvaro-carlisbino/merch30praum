"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { cn } from "@/lib/utils/cn";

interface ArtistSwitcherProps {
  current?: string;
  className?: string;
}

/**
 * Dropdown alfabético estilo TDE Apparel — lista pura, sem fotos.
 * Hover ou focus abre; sai fora ou Escape fecha.
 */
export function ArtistSwitcher({ current, className }: ArtistSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const sorted = [...ARTIST_SLUGS]
    .map((slug) => ARTISTS[slug])
    .sort((a, b) => a.displayName.localeCompare(b.displayName, "pt-BR"));

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor="Roster"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] opacity-80 hover:opacity-100 transition-opacity"
      >
        Roster
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div role="menu" className="absolute left-0 top-full pt-1 min-w-[14rem] z-50">
          <div
            className="overflow-hidden"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            <ul className="py-1">
              {sorted.map((cfg) => {
                const isActive = cfg.slug === current;
                return (
                  <li key={cfg.slug}>
                    <Link
                      href={`/${cfg.slug}`}
                      data-cursor={cfg.displayName}
                      className={cn(
                        "flex items-baseline justify-between gap-3 px-4 py-2 text-sm transition-colors",
                        isActive
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100 hover:bg-fg/5",
                      )}
                      style={isActive ? { color: cfg.panelAccent } : undefined}
                    >
                      <span className="font-display" style={{ letterSpacing: "-0.01em" }}>
                        {cfg.displayName}
                      </span>
                      <span className="text-[10px] opacity-55 tabular-nums">
                        {cfg.origin.split(" · ")[1] ?? ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div
              className="border-t px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] opacity-55"
              style={{ borderColor: "var(--border)" }}
            >
              <Link href="/artistas" className="hover:opacity-100">
                Ver todos →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
