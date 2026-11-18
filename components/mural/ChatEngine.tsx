"use client";

import { useEffect } from "react";
import { fetchFeed } from "@/lib/mural/client";
import { useChat } from "@/lib/mural/store";

// Um único laço de atualização para o site inteiro. Cada sala é buscada
// no ritmo de quem está olhando: aberta e em foco 2s, de fundo 6s,
// aba escondida 25s. Presença ("online agora") a cada 15s.
const FOCUSED_MS = 2000;
const BACKGROUND_MS = 6000;
const HIDDEN_MS = 25000;
const PRESENCE_MS = 15000;

export function ChatEngine() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mural:nickname");
      if (saved) useChat.setState({ nickname: saved });
    } catch {}

    const nextAt: Record<string, number> = {};
    const presenceAt: Record<string, number> = {};
    const inflight = new Set<string>();
    const controller = new AbortController();

    const tick = () => {
      const { watchers, focus, open, activeRoom } = useChat.getState();
      const rooms = new Set(["geral", ...Object.keys(watchers).filter((r) => watchers[r] > 0)]);
      const now = Date.now();
      for (const room of rooms) {
        if (inflight.has(room) || (nextAt[room] ?? 0) > now) continue;
        const focused = (focus[room] ?? 0) > 0 || (open && activeRoom === room);
        const interval = document.hidden ? HIDDEN_MS : focused ? FOCUSED_MS : BACKGROUND_MS;
        const presence = !document.hidden && now - (presenceAt[room] ?? 0) > PRESENCE_MS;
        inflight.add(room);
        fetchFeed(room, presence, controller.signal)
          .then((feed) => {
            if (presence) presenceAt[room] = Date.now();
            useChat.getState().applyFeed(room, feed);
            nextAt[room] = Date.now() + interval;
          })
          .catch(() => {
            if (controller.signal.aborted) return;
            useChat.getState().setStatus(room, "offline");
            nextAt[room] = Date.now() + interval * 2;
          })
          .finally(() => inflight.delete(room));
      }
    };

    tick();
    const timer = setInterval(tick, 500);
    const onVisible = () => {
      if (!document.hidden) {
        for (const k of Object.keys(nextAt)) nextAt[k] = 0;
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
