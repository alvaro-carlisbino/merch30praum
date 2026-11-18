"use client";
import { create } from "zustand";
import type { MuralFeed, MuralMessage, MuralViewer } from "./types";

export interface Burst {
  id: string;
  emoji: string;
  delay: number;
  x: number;
}

export interface RoomState {
  messages: MuralMessage[];
  online: number;
  status: "loading" | "live" | "offline";
  cursor: string | null;
  pinned: MuralFeed["pinned"];
  enabled: boolean;
  slowModeSeconds: number;
  bursts: Burst[];
  lastReadId: number;
}

export interface ContextRoom {
  room: string;
  title: string;
}

interface ChatState {
  rooms: Record<string, RoomState>;
  watchers: Record<string, number>;
  focus: Record<string, number>;
  viewer: MuralViewer;
  nickname: string;
  open: boolean;
  activeRoom: string;
  context: ContextRoom | null;
  watch: (room: string, focused?: boolean) => () => void;
  applyFeed: (room: string, feed: MuralFeed) => void;
  setStatus: (room: string, status: RoomState["status"]) => void;
  addMessage: (room: string, msg: MuralMessage) => void;
  removeMessages: (room: string, ids: number[]) => void;
  clearRoom: (room: string) => void;
  burst: (room: string, emoji: string, count?: number) => void;
  dropBurst: (room: string, id: string) => void;
  markRead: (room: string) => void;
  setNickname: (n: string) => void;
  setOpen: (open: boolean) => void;
  setActiveRoom: (room: string) => void;
  setContext: (ctx: ContextRoom | null) => void;
}

export const emptyRoom = (): RoomState => ({
  messages: [],
  online: 0,
  status: "loading",
  cursor: null,
  pinned: null,
  enabled: true,
  slowModeSeconds: 3,
  bursts: [],
  lastReadId: 0,
});

let burstSeq = 0;

function patch(state: ChatState, room: string, fn: (r: RoomState) => Partial<RoomState>) {
  const current = state.rooms[room] ?? emptyRoom();
  return { rooms: { ...state.rooms, [room]: { ...current, ...fn(current) } } };
}

function mergeMessages(prev: MuralMessage[], incoming: MuralMessage[], removed: number[] = []) {
  const gone = new Set(removed);
  const byId = new Map(prev.filter((m) => !gone.has(m.id)).map((m) => [m.id, m]));
  for (const m of incoming) if (!gone.has(m.id)) byId.set(m.id, m);
  return [...byId.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id).slice(-200);
}

export const useChat = create<ChatState>((set, get) => ({
  rooms: {},
  watchers: {},
  focus: {},
  viewer: { name: null, badge: "fan", isMod: false },
  nickname: "",
  open: false,
  activeRoom: "geral",
  context: null,

  watch: (room, focused = false) => {
    set((s) => ({
      watchers: { ...s.watchers, [room]: (s.watchers[room] ?? 0) + 1 },
      focus: focused ? { ...s.focus, [room]: (s.focus[room] ?? 0) + 1 } : s.focus,
    }));
    return () =>
      set((s) => ({
        watchers: { ...s.watchers, [room]: Math.max(0, (s.watchers[room] ?? 1) - 1) },
        focus: focused ? { ...s.focus, [room]: Math.max(0, (s.focus[room] ?? 1) - 1) } : s.focus,
      }));
  },

  applyFeed: (room, feed) => {
    set((s) => {
      const next = patch(s, room, (r) => {
        const messages = mergeMessages(r.messages, feed.messages, feed.removed);
        const newest = feed.messages.at(-1)?.createdAt;
        let cursor = r.cursor ?? feed.serverTime;
        if (newest && newest > cursor) cursor = newest;
        // Primeira carga conta como lida, para o badge não começar em 60.
        const lastReadId = r.status === "loading" ? (messages.at(-1)?.id ?? 0) : r.lastReadId;
        return {
          messages,
          cursor,
          online: feed.online,
          status: "live",
          pinned: feed.pinned,
          enabled: feed.enabled,
          slowModeSeconds: feed.slowModeSeconds,
          lastReadId,
        };
      });
      return { ...next, viewer: feed.viewer };
    });
    for (const [emoji, count] of Object.entries(feed.reactions ?? {})) get().burst(room, emoji, count);
  },

  setStatus: (room, status) => set((s) => patch(s, room, () => ({ status }))),

  addMessage: (room, msg) =>
    set((s) =>
      patch(s, room, (r) => ({
        messages: mergeMessages(r.messages, [msg]),
        lastReadId: Math.max(r.lastReadId, msg.id),
      })),
    ),

  removeMessages: (room, ids) => set((s) => patch(s, room, (r) => ({ messages: mergeMessages(r.messages, [], ids) }))),

  clearRoom: (room) => set((s) => patch(s, room, () => ({ messages: [] }))),

  burst: (room, emoji, count = 1) => {
    const n = Math.min(count, 14);
    const items: Burst[] = Array.from({ length: n }, (_, i) => ({
      id: `b${++burstSeq}`,
      emoji,
      delay: n === 1 ? 0 : (i / n) * 1.8 + Math.random() * 0.2,
      x: 8 + Math.random() * 84,
    }));
    set((s) => patch(s, room, (r) => ({ bursts: [...r.bursts, ...items].slice(-40) })));
  },

  dropBurst: (room, id) => set((s) => patch(s, room, (r) => ({ bursts: r.bursts.filter((b) => b.id !== id) }))),

  markRead: (room) =>
    set((s) => patch(s, room, (r) => ({ lastReadId: r.messages.at(-1)?.id ?? r.lastReadId }))),

  setNickname: (nickname) => {
    try {
      localStorage.setItem("mural:nickname", nickname);
    } catch {}
    set({ nickname });
  },
  setOpen: (open) => set({ open }),
  setActiveRoom: (activeRoom) => set({ activeRoom }),
  setContext: (context) => set({ context }),
}));
