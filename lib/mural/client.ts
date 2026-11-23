"use client";
import { useChat } from "./store";
import type { MuralFeed, MuralMessage, MuralViewer } from "./types";

// Fã lê o feed público (cacheado no CDN). Só a equipe usa a rota sem cache.
export async function fetchFeed(room: string, signal?: AbortSignal): Promise<MuralFeed> {
  const path = useChat.getState().viewer.isMod ? `/api/mural/${room}` : `/api/mural/${room}/feed`;
  const res = await fetch(path, { signal });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export async function fetchViewer(signal?: AbortSignal): Promise<MuralViewer> {
  const res = await fetch("/api/mural/me", { cache: "no-store", signal });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export async function refreshViewer(signal?: AbortSignal) {
  const viewer = await fetchViewer(signal);
  useChat.setState({ viewer, viewerLoaded: true });
}

export function loginHref(): string {
  const next = `${window.location.pathname}${window.location.search}`;
  return `/api/auth/shopify/login?next=${encodeURIComponent(next)}`;
}

export interface FanProfileInput {
  nickname: string;
  fullName: string;
  birthDate: string;
  city: string;
  state: string;
  phone: string;
  accept: boolean;
}

export async function saveProfile(input: FanProfileInput): Promise<{ ok: true } | { ok: false; error: string; field?: string }> {
  try {
    const res = await fetch("/api/mural/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error ?? "Não deu para salvar agora.", field: data.field };
    await refreshViewer();
    return { ok: true };
  } catch {
    return { ok: false, error: "Sem conexão. Tenta de novo." };
  }
}

export type SendResult = { ok: true; message?: MuralMessage } | { ok: false; error: string; wait?: number };

export async function sendMessage(room: string, body: string, website = ""): Promise<SendResult> {
  try {
    const res = await fetch(`/api/mural/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, website }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (data.code === "login" || data.code === "profile") refreshViewer().catch(() => {});
      return { ok: false, error: data.error ?? "Não foi agora. Tenta de novo.", wait: data.wait };
    }
    if (data.message) useChat.getState().addMessage(room, data.message);
    return { ok: true, message: data.message };
  } catch {
    return { ok: false, error: "Sem conexão. Tenta de novo." };
  }
}

export function react(room: string, emoji: string) {
  useChat.getState().burst(room, emoji, 1);
  useChat.getState().noteOwnReaction(emoji);
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
