"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Ícone na área de trabalho — duplo click vira link / handler.
 * Selecionado ao hover, label fica em azul XP com borda pontilhada.
 */
export function DesktopIcon({ icon, label, href, onClick, className }: DesktopIconProps) {
  const inner = (
    <span className="desktop-icon-cell flex flex-col items-center gap-1 select-none">
      <span className="desktop-icon-art">{icon}</span>
      <span className="desktop-icon-label">{label}</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn("desktop-icon block w-[88px] py-2 px-1 text-center", className)}
        draggable={false}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("desktop-icon block w-[88px] py-2 px-1 text-center", className)}
    >
      {inner}
    </button>
  );
}
