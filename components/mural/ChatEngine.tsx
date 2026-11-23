"use client";

import { useEffect } from "react";
import { fetchFeed, refreshViewer } from "@/lib/mural/client";
import { useChat } from "@/lib/mural/store";

// Um único laço de atualização para o site inteiro. Chat aberto busca a cada
// 3s, fechado a cada 30s (só para a prévia e o contador de novos) e aba
// escondida não busca nada até a pessoa voltar.
const FOCUSED_MS = 3000;
const BACKGROUND_MS = 30000;

export function ChatEngine() {
  useEffect(() => {
    // Volta do login da Shopify: reabre o chat e limpa a marca da URL.
    const hash = window.location.hash;
    if (hash === "#chat" || hash === "#chat-erro") {
      useChat.setState({ open: true, authError: hash === "#chat-erro" });
      // Depois do primeiro commit do roteador, senão ele devolve o hash para a URL.
      setTimeout(() => {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      }, 0);
    }

    const nextAt: Record<string, number> = {};
    let viewerLoaded = false;
    const inflight = new Set<string>();
    const controller = new AbortController();

    const tick = () => {
      const { watchers, focus, open, activeRoom } = useChat.getState();
      const rooms = new Set(["geral", ...Object.keys(watchers).filter((r) => watchers[r] > 0)]);
      if (document.hidden) return;
      // Identidade só importa com o chat em uso: visitante de passagem não gera essa chamada.
      if (!viewerLoaded && (open || Object.values(focus).some((n) => n > 0))) {
        viewerLoaded = true;
        refreshViewer(controller.signal).catch(() => {
          viewerLoaded = false;
        });
      }
      const now = Date.now();
      for (const room of rooms) {
        if (inflight.has(room)) continue;
        const focused = (focus[room] ?? 0) > 0 || (open && activeRoom === room);
        const interval = focused ? FOCUSED_MS : BACKGROUND_MS;
        // Abrir o chat não espera o resto do intervalo de 30s.
        if (focused && (nextAt[room] ?? 0) > now + FOCUSED_MS) nextAt[room] = now;
        if ((nextAt[room] ?? 0) > now) continue;
        inflight.add(room);
        fetchFeed(room, controller.signal)
          .then((feed) => {
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
