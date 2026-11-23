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

// Balão que aparece por alguns segundos quando chega recado novo.
function PreviewBubble({ onOpen }: { onOpen: () => void }) {
  const context = useChat((s) => s.context);
  const geral = useChat((s) => s.rooms.geral) ?? emptyRoom();
  const ctx = useChat((s) => (context ? s.rooms[context.room] : undefined));
  const [dismissed, setDismissed] = useState<number[]>([]);

  const unreadLatest = [geral, ctx]
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => r.messages.filter((m) => m.id > r.lastReadId && !m.mine).at(-1))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const show = unreadLatest && !dismissed.includes(unreadLatest.id) ? unreadLatest : null;

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setDismissed((d) => [...d.slice(-20), show.id]), 4500);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.button
          key={show.id}
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 12, scale: 0.9, originX: 1, originY: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="max-w-[min(18rem,calc(100vw-6rem))] rounded-2xl rounded-br-md border border-white/15 bg-black/85 px-3.5 py-2.5 text-left text-sm text-white shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <strong className="block truncate text-xs font-semibold text-white/70">{show.nickname}</strong>
          <span className="line-clamp-2">{show.body}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function ChatDock() {
  const open = useChat((s) => s.open);
  const setOpen = useChat((s) => s.setOpen);
  const geral = useChat((s) => s.rooms.geral) ?? emptyRoom();
  const desktop = useIsDesktop();
  const drag = useDragControls();

  const live = geral.status === "live";
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
      {/* Botão flutuante */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="fab"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-2 lg:bottom-6 lg:right-6"
          >
            <PreviewBubble onOpen={() => setOpen(true)} />
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative flex size-14 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_40px_rgba(0,0,0,0.55)] lg:size-16"
              aria-label={`Abrir chat ao vivo${unread ? `, ${unread} novos` : ""}`}
            >
              {live && (
                <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.4s]" aria-hidden />
              )}
              <MessageCircle aria-hidden size={26} strokeWidth={2} className="relative" />
              {unread > 0 && (
                <motion.span
                  key={unread}
                  initial={{ scale: 1.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 min-w-[22px] rounded-full border-2 border-black bg-[#ff3b30] px-1 text-center text-[11px] font-bold leading-[18px] tabular-nums text-white"
                >
                  {unread > 99 ? "99+" : unread}
                </motion.span>
              )}
              <span className="absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
                <LiveDot live={live} size={6} />
                {live ? "AO VIVO" : "..."}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <div className="pointer-events-none fixed bottom-0 right-0 z-40 h-96 w-28 lg:w-36">
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
