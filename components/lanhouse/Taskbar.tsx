"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  StartFlagIcon,
  MyComputerIcon,
  FolderIcon,
  CalendarIcon,
  CartIcon,
} from "./PixelIcons";

interface TaskbarProps {
  cartCount?: number;
}

/**
 * Barra inferior fixa estilo Windows. Botão "Iniciar" abre/fecha menu
 * com links pras outras seções. Relógio à direita. Botões abertos no meio.
 * Sem emoji — ícones em pixel art SVG.
 */
export function Taskbar({ cartCount = 0 }: TaskbarProps) {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {open ? (
        <div
          className="start-menu fixed bottom-[34px] left-0 z-[60]"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="start-menu-strip" />
          <div className="start-menu-body">
            <Link href="/" className="start-item" onClick={() => setOpen(false)}>
              <MyComputerIcon size={20} />
              <span>30praum</span>
            </Link>
            <Link href="/loja" className="start-item" onClick={() => setOpen(false)}>
              <FolderIcon size={20} />
              <span>loja</span>
            </Link>
            <Link href="/plantao" className="start-item" onClick={() => setOpen(false)}>
              <CalendarIcon size={20} />
              <span>plantão</span>
            </Link>
            <Link href="/incubadora" className="start-item" onClick={() => setOpen(false)}>
              <FolderIcon size={20} />
              <span>incubadora</span>
            </Link>
            <Link href="/parcerias" className="start-item" onClick={() => setOpen(false)}>
              <FolderIcon size={20} />
              <span>parcerias</span>
            </Link>
            <div className="start-divider" />
            <Link href="/about" className="start-item" onClick={() => setOpen(false)}>
              <FolderIcon size={20} />
              <span>sobre.txt</span>
            </Link>
            <a href="mailto:contato@30praum.com" className="start-item" onClick={() => setOpen(false)}>
              <FolderIcon size={20} />
              <span>contato</span>
            </a>
          </div>
        </div>
      ) : null}

      <div className="taskbar fixed bottom-0 left-0 right-0 z-50 flex items-stretch gap-1 px-1 py-1">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="start-button inline-flex items-center gap-1 px-2"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <StartFlagIcon size={14} />
          <span className="font-bold italic">iniciar</span>
        </button>

        <div className="taskbar-divider" />

        <Link href="/" className="taskbar-task taskbar-task-active">
          <MyComputerIcon size={14} />
          <span className="truncate">30praum</span>
        </Link>

        <div className="ml-auto flex items-stretch gap-1 px-2">
          {cartCount > 0 ? (
            <Link href="/cart" className="tray-item flex items-center gap-1">
              <CartIcon size={14} />
              <span className="font-bold tabular-nums">{cartCount}</span>
            </Link>
          ) : null}
          <span className="tray-clock flex items-center px-2 font-mono tabular-nums">{clock}</span>
        </div>
      </div>
    </>
  );
}
