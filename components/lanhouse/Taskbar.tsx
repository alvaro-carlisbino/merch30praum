"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/lanhouse/window-store";
import { renderIcon } from "./iconRegistry";
import {
  StartFlagIcon,
  FolderIcon,
  CalendarIcon,
  CartIcon,
  MyComputerIcon,
} from "./PixelIcons";

interface TaskbarProps {
  cartCount?: number;
}

/**
 * Barra inferior fixa. Botão Iniciar abre menu. Lista de tasks
 * abertas reflete o WindowStore — clica restaura/foca, segundo
 * click minimiza (igual Win XP).
 */
export function Taskbar({ cartCount = 0 }: TaskbarProps) {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");
  const windows = useWindowStore((s) => s.windows);
  const focused = useWindowStore((s) => s.focusedId);
  const focus = useWindowStore((s) => s.focus);
  const toggleMin = useWindowStore((s) => s.toggleMinimize);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const openWindows = Object.values(windows).filter((w) => !w.closed);

  function handleTaskClick(id: string) {
    const w = windows[id];
    if (!w) return;
    if (w.minimized) {
      focus(id);
    } else if (focused === id) {
      toggleMin(id);
    } else {
      focus(id);
    }
  }

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

        {openWindows.length === 0 ? (
          <span className="taskbar-task taskbar-task-active">
            <MyComputerIcon size={14} />
            <span className="truncate">área de trabalho</span>
          </span>
        ) : (
          openWindows.map((w) => {
            const isActive = focused === w.id && !w.minimized;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => handleTaskClick(w.id)}
                className={
                  isActive ? "taskbar-task taskbar-task-active" : "taskbar-task"
                }
              >
                {renderIcon(w.iconKey, 14)}
                <span className="truncate">{w.title}</span>
              </button>
            );
          })
        )}

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
