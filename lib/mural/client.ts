"use client";
import { useChat } from "./store";
import type { MuralFeed, MuralMessage } from "./types";

export function visitorId(): string {
  try {
    let id = localStorage.getItem("mural:visitor") ?? "";
    if (!/^[a-z0-9]{8,40}$/i.test(id)) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("mural:visitor", id);
    }
    return id;
  } catch {
    return "anon" + Math.random().toString(36).slice(2, 10);
  }
}

export async function fetchFeed(room: string, presence: boolean, signal?: AbortSignal): Promise<MuralFeed> {
  const state = useChat.getState().rooms[room];
  const qs = new URLSearchParams({ v: visitorId() });
  if (presence) qs.set("p", "1");
  if (state?.cursor) qs.set("after", state.cursor);
  const res = await fetch(`/api/mural/${room}?${qs}`, { cache: "no-store", signal });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export type SendResult = { ok: true; message?: MuralMessage } | { ok: false; error: string; wait?: number };

export async function sendMessage(room: string, nickname: string, body: string, website = ""): Promise<SendResult> {
  try {
    const res = await fetch(`/api/mural/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, body, website }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error ?? "Não foi agora. Tenta de novo.", wait: data.wait };
    if (data.message) useChat.getState().addMessage(room, data.message);
    return { ok: true, message: data.message };
  } catch {
    return { ok: false, error: "Sem conexão. Tenta de novo." };
  }
}

export function react(room: string, emoji: string) {
  useChat.getState().burst(room, emoji, 1);
  try {
    navigator.vibrate?.(8);
  } catch {}
  fetch(`/api/mural/${room}/react`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emoji }),
  }).catch(() => {});
}

export async function report(room: string, id: number, reason: string) {
  useChat.getState().removeMessages(room, [id]);
  await fetch("/api/mural/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, reason }),
  }).catch(() => {});
}

export async function moderate(action: "hide" | "ban" | "clear", args: { id?: number; room: string; hours?: number }) {
  const res = await fetch("/api/mural/mod", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...args }),
  }).catch(() => null);
  if (!res?.ok) return false;
  const store = useChat.getState();
  if (action === "clear") store.clearRoom(args.room);
  else if (args.id) store.removeMessages(args.room, [args.id]);
  return true;
}
