"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useWindowStore } from "@/lib/lanhouse/window-store";
import { renderIcon } from "./iconRegistry";
import { cn } from "@/lib/utils/cn";

interface WindowProps {
  /** id estável da janela (ex.: "home-wmp", "loja-explorer") */
  id: string;
  title: string;
  iconKey?: string;
  /** posição inicial (px, fixed) */
  x?: number;
  y?: number;
  /** tamanho inicial */
  width?: number;
  height?: number;
  /** true = é a janela principal da rota (fechar volta pra /) */
  rootOfRoute?: boolean;
  /** rota pra navegar quando close. Se omitido e rootOfRoute, vai pra "/" */
  closeHref?: string;
  /** mostrar 3 botões _ □ × no titlebar */
  controls?: boolean;
  /** menubar items "Arquivo  Editar..." */
  menubar?: string[];
  /** status bar no rodapé */
  statusBar?: React.ReactNode;
  /** variante visual (cinza padrão | escuro tipo WMP) */
  variant?: "default" | "wmp";
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export function Window({
  id,
  title,
  iconKey,
  x,
  y,
  width = 760,
  height,
  rootOfRoute,
  closeHref,
  controls = true,
  menubar,
  statusBar,
  variant = "default",
  className,
  bodyClassName,
  children,
}: WindowProps) {
  const router = useRouter();
  const w = useWindowStore((s) => s.windows[id]);
  const focus = useWindowStore((s) => s.focus);
  const register = useWindowStore((s) => s.register);
  const unregister = useWindowStore((s) => s.unregister);
  const setPosition = useWindowStore((s) => s.setPosition);
  const toggleMin = useWindowStore((s) => s.toggleMinimize);
  const toggleMax = useWindowStore((s) => s.toggleMaximize);
  const closeWin = useWindowStore((s) => s.close);
  const focusedId = useWindowStore((s) => s.focusedId);

  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);

  useEffect(() => {
    register({
      id,
      title,
      iconKey,
      x,
      y,
      width,
      height,
      rootOfRoute,
    });
    return () => unregister(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!w || w.closed || w.minimized) return null;

  const isFocused = focusedId === id;

  function onTitleMouseDown(e: React.MouseEvent) {
    if (!w || w.maximized) return;
    e.preventDefault();
    focus(id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: w.x,
      baseY: w.y,
    };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      const nx = Math.max(0, dragRef.current.baseX + dx);
      const ny = Math.max(0, dragRef.current.baseY + dy);
      setPosition(id, nx, ny);
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function handleClose() {
    closeWin(id);
    if (rootOfRoute) {
      router.push(closeHref ?? "/");
    }
  }

  const style: React.CSSProperties = w.maximized
    ? {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 34px)",
        zIndex: w.z,
      }
    : {
        position: "fixed",
        left: w.x,
        top: w.y,
        width: `${w.width}px`,
        height: w.height ? `${w.height}px` : "auto",
        zIndex: w.z,
      };

  return (
    <div
      style={style}
      onMouseDown={() => focus(id)}
      className={cn("win-root flex flex-col", className)}
    >
      <div
        className={cn(
          "win-shell flex h-full flex-col text-black",
          variant === "wmp" && "win-wmp",
        )}
      >
        <div
          className={cn("win-titlebar flex items-center justify-between gap-2 px-1 py-[3px]", !isFocused && "win-titlebar-blur")}
          onMouseDown={onTitleMouseDown}
          onDoubleClick={() => toggleMax(id)}
        >
          <div className="flex min-w-0 items-center gap-1.5">
            {iconKey ? <span className="shrink-0">{renderIcon(iconKey, 14)}</span> : null}
            <span className="win-title truncate">{title}</span>
          </div>
          {controls ? (
            <div className="flex items-center gap-[2px]">
              <button
                type="button"
                className="win-controlbtn"
                aria-label="Minimizar"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMin(id);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <span className="block h-[2px] w-2 bg-black" />
              </button>
              <button
                type="button"
                className="win-controlbtn"
                aria-label="Maximizar"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMax(id);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <span className="block h-2 w-2 border border-black" />
              </button>
              <button
                type="button"
                className="win-controlbtn win-close"
                aria-label="Fechar"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <span className="leading-none">×</span>
              </button>
            </div>
          ) : null}
        </div>

        {menubar && menubar.length > 0 ? (
          <div className="win-menubar flex items-center gap-3 px-2 py-0.5">
            {menubar.map((item) => (
              <span key={item} className="win-menu-item">
                {item.charAt(0)}
                <u>{item.slice(1, 2)}</u>
                {item.slice(2)}
              </span>
            ))}
          </div>
        ) : null}

        <div className={cn("win-body flex-1 overflow-auto", bodyClassName)}>{children}</div>

        {statusBar ? <div className="win-statusbar">{statusBar}</div> : null}
      </div>
    </div>
  );
}
