"use client";

import { AnimatePresence, motion } from "motion/react";
import { useChat, emptyRoom } from "@/lib/mural/store";
import { ChatPanel, LiveDot } from "./ChatPanel";

function OnlineCounter() {
  const geral = useChat((s) => s.rooms.geral) ?? emptyRoom();
  const live = geral.status === "live";
  return (
    <div className="mt-8 flex items-end gap-4">
      <span className="relative block h-[clamp(4rem,10vw,7.5rem)] overflow-hidden font-display leading-none tabular-nums" style={{ fontSize: "clamp(4rem,10vw,7.5rem)" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={live ? geral.online : "x"}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="block"
          >
            {live ? geral.online : "·"}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mb-3 inline-flex items-center gap-2 text-sm text-white/70">
        <LiveDot live={live} />
        {geral.online === 1 ? "pessoa" : "pessoas"} no chat agora
      </span>
    </div>
  );
}

export function HomeLiveChat() {
  return (
    <section aria-labelledby="chat-home" className="border-y border-white/10 bg-[#070707]">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <h2
            id="chat-home"
            className="font-display uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
          >
            A casa
            <br />
            ao vivo
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/70">
            O chat oficial da 30praum. Lançamento, show, drop novo: a resenha acontece aqui, com a equipe e os
            artistas no meio.
          </p>
          <OnlineCounter />
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/40 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <ChatPanel room="geral" title="Chat da 30praum" listClassName="h-[28rem]" />
        </div>
      </div>
    </section>
  );
}
