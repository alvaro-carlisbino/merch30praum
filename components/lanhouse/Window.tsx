import { cn } from "@/lib/utils/cn";

interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  /** quando true, a janela ocupa todo o espaço disponível do pai */
  fill?: boolean;
  /** mostra os 3 botões _ □ X */
  controls?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  /** menubar tipo "Arquivo  Editar  Exibir  Ajuda" */
  menubar?: string[];
  /** status bar no rodapé */
  statusBar?: React.ReactNode;
}

/**
 * Janela XP/2000 — title bar azul gradiente, body cinza claro, cantos quadrados,
 * borda outset 3D. Não tem animação. Não tem sombra suave moderna.
 */
export function Window({
  title,
  icon,
  fill,
  controls = true,
  className,
  bodyClassName,
  children,
  menubar,
  statusBar,
}: WindowProps) {
  return (
    <div
      className={cn(
        "win-shell flex flex-col text-black",
        fill && "h-full w-full",
        className,
      )}
    >
      <div className="win-titlebar flex items-center justify-between gap-2 px-1 py-[3px]">
        <div className="flex min-w-0 items-center gap-1.5">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <span className="win-title truncate">{title}</span>
        </div>
        {controls ? (
          <div className="flex items-center gap-[2px]">
            <button type="button" className="win-controlbtn" aria-label="Minimizar" tabIndex={-1}>
              <span className="block h-[2px] w-2 bg-black" />
            </button>
            <button type="button" className="win-controlbtn" aria-label="Maximizar" tabIndex={-1}>
              <span className="block h-2 w-2 border border-black" />
            </button>
            <button type="button" className="win-controlbtn win-close" aria-label="Fechar" tabIndex={-1}>
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
  );
}
