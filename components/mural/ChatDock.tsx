"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { ChevronDown, MessageCircle, X } from "lucide-react";
import { useChat, emptyRoom } from "@/lib/mural/store";
import { ChatPanel, LiveDot, BurstLayer } from "./ChatPanel";

const GERAL = { room: "geral", title: "Chat da 30praum" };

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function Tabs() {
  const context = useChat((s) => s.context);
  const active = useChat((s) => s.activeRoom);
  const setActive = useChat((s) => s.setActiveRoom);
  const rooms = useChat((s) => s.rooms);
  if (!context) return null;
  const tabs = [
    { room: GERAL.room, label: "Geral" },
    { room: context.room, label: context.title },
  ];
  return (
    <div className="flex gap-1 border-b border-white/10 px-3 pt-2" role="tablist">
      {tabs.map((t) => {
        const r = rooms[t.room] ?? emptyRoom();
        const unread = r.messages.filter((m) => m.id > r.lastReadId).length;
        const on = active === t.room;
        return (
          <button
            key={t.room}
            role="tab"
            aria-selected={on}
            onClick={() => setActive(t.room)}
            className={`relative max-w-[50%] truncate px-3 pb-2 pt-1 text-sm transition-colors ${on ? "text-white" : "text-white/45 hover:text-white/80"}`}
          >
            {t.label}
            {!on && unread > 0 && (
              <span className="ml-1.5 rounded-full bg-[#ff3b30] px-1.5 text-[10px] font-semibold tabular-nums text-white">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
            {on && <motion.span layoutId="chat-tab" className="absolute inset-x-2 -bottom-px h-0.5 bg-white" />}
          </button>
        );
      })}
    </div>
  );
}

function ActivePanel({ fill }: { fill?: boolean }) {
  const context = useChat((s) => s.context);
  const active = useChat((s) => s.activeRoom);
  const room = context && active === context.room ? context : GERAL;
  return (
    <ChatPanel
      key={room.room}
      room={room.room}
      title={room.title}
      fill={fill}
      listClassName={fill ? "" : "h-full"}
    />
  );
}

function Ticker() {
  const context = useChat((s) => s.context);
  const geral = useChat((s) => s.rooms.geral) ?? emptyRoom();
  const ctx = useChat((s) => (context ? s.rooms[context.room] : undefined));
  // Mostra o recado mais recente entre o geral e a sala da página.
  const candidates = [geral.messages.at(-1), ctx?.messages.at(-1)].filter(Boolean);
  const latest = candidates.sort((a, b) => b!.createdAt.localeCompare(a!.createdAt))[0];
  return (
    <span className="relative block h-5 min-w-0 flex-1 overflow-hidden text-left text-sm">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={latest?.id ?? "empty"}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute inset-0 truncate"
        >
          {latest ? (
            <>
              <strong className="font-semibold text-white">{latest.nickname}</strong>
              <span className="text-white/70"> {latest.body}</span>
            </>
          ) : (
            <span className="text-white/70">Entra no chat ao vivo</span>
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function ChatDock() {
  const open = useChat((s) => s.open);
  const setOpen = useChat((s) => s.setOpen);
  const geral = useChat((s) => s.rooms.geral) ?? emptyRoom();
  const context = useChat((s) => s.context);
  const ctxRoom = useChat((s) => (context ? s.rooms[context.room] : undefined));
  const desktop = useIsDesktop();
  const drag = useDragControls();

  const live = geral.status === "live";
  const online = geral.online + (ctxRoom?.online ?? 0);
  const unread = geral.messages.filter((m) => m.id > geral.lastReadId).length;

  // No celular o sheet trava a rolagem da página por baixo.
  useEffect(() => {
    if (!open || desktop) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, desktop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* Barra / pílula fechada */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-white shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[380px]"
            aria-label={`Abrir chat ao vivo, ${online} pessoas agora`}
          >
            <span className="relative">
              <MessageCircle aria-hidden size={22} strokeWidth={1.8} />
              {unread > 0 && (
                <motion.span
                  key={unread}
                  initial={{ scale: 1.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 min-w-[18px] rounded-full bg-[#ff3b30] px-1 text-center text-[10px] font-bold leading-[18px] tabular-nums"
                >
                  {unread > 99 ? "99+" : unread}
                </motion.span>
              )}
            </span>
            <Ticker />
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-xs tabular-nums">
              <LiveDot live={live} size={8} />
              {live ? online : "..."}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      {!open && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-80 lg:left-auto lg:right-6 lg:w-[380px]">
          <BurstLayer room="geral" />
        </div>
      )}

      {/* Aberto */}
      <AnimatePresence>
        {open && !desktop && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.section
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Chat ao vivo"
              className="fixed inset-x-0 bottom-0 z-50 flex h-[88dvh] flex-col overflow-hidden rounded-t-3xl border-t border-white/15 bg-[#0b0b0b] text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              drag="y"
              dragListener={false}
              dragControls={drag}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
              }}
            >
              <div
                className="flex touch-none items-center justify-between px-4 pb-1 pt-2"
                onPointerDown={(e) => drag.start(e)}
              >
                <span className="w-8" />
                <span className="h-1.5 w-12 rounded-full bg-white/25" aria-hidden />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-white/60 hover:bg-white/10"
                  aria-label="Fechar chat"
                >
                  <ChevronDown aria-hidden size={20} />
                </button>
              </div>
              <Tabs />
              <div className="min-h-0 flex-1">
                <ActivePanel fill />
              </div>
            </motion.section>
          </>
        )}

        {open && desktop && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label="Chat ao vivo"
            className="fixed bottom-6 right-6 z-50 flex h-[min(680px,calc(100dvh-7rem))] w-[400px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b]/95 text-white shadow-[0_20px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="flex items-center justify-between px-3 pt-2">
              <span />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-white/60 hover:bg-white/10"
                aria-label="Fechar chat"
              >
                <X aria-hidden size={18} />
              </button>
            </div>
            <Tabs />
            <div className="min-h-0 flex-1">
              <ActivePanel fill />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

/** Coloque numa página para o chat abrir com a sala dela como segunda aba. */
export function ChatRoomContext({ room, title }: { room: string; title: string }) {
  const setContext = useChat((s) => s.setContext);
  const watch = useChat((s) => s.watch);
  useEffect(() => {
    setContext({ room, title });
    const unwatch = watch(room);
    return () => {
      unwatch();
      useChat.setState((s) => ({
        context: s.context?.room === room ? null : s.context,
        activeRoom: s.activeRoom === room ? "geral" : s.activeRoom,
      }));
    };
  }, [room, title, setContext, watch]);
  return null;
}
