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
  status: "loading" | "live" | "offline";
  pinned: MuralFeed["pinned"];
  enabled: boolean;
  slowModeSeconds: number;
  bursts: Burst[];
  lastReadId: number;
  lastReactionId: number;
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
  viewerLoaded: boolean;
  authError: boolean;
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
  noteOwnReaction: (emoji: string) => void;
  dropBurst: (room: string, id: string) => void;
  markRead: (room: string) => void;
  setOpen: (open: boolean) => void;
  setActiveRoom: (room: string) => void;
  setContext: (ctx: ContextRoom | null) => void;
}

export const emptyRoom = (): RoomState => ({
  messages: [],
  status: "loading",
  pinned: null,
  enabled: true,
  slowModeSeconds: 3,
  bursts: [],
  lastReadId: 0,
  lastReactionId: 0,
});

let burstSeq = 0;
// Reação própria já animou no toque: não repete quando volta pelo feed.
const ownReactions: Record<string, number> = {};

function patch(state: ChatState, room: string, fn: (r: RoomState) => Partial<RoomState>) {
  const current = state.rooms[room] ?? emptyRoom();
  return { rooms: { ...state.rooms, [room]: { ...current, ...fn(current) } } };
}

function mergeMessages(prev: MuralMessage[], incoming: MuralMessage[], removed: number[] = []) {
  const gone = new Set(removed);
  const byId = new Map(prev.filter((m) => !gone.has(m.id)).map((m) => [m.id, m]));
  for (const m of incoming) {
    if (gone.has(m.id)) continue;
    // O feed público não sabe quem escreveu: a marca "meu" fica do envio.
    byId.set(m.id, byId.get(m.id)?.mine ? { ...m, mine: true } : m);
  }
  return [...byId.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id).slice(-200);
}

export const useChat = create<ChatState>((set, get) => ({
  rooms: {},
  watchers: {},
  focus: {},
  viewer: { name: null, badge: "fan", isMod: false, fan: null },
  viewerLoaded: false,
  authError: false,
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
    const before = get().rooms[room];
    const newestReaction = feed.reactions.reduce((max, r) => Math.max(max, r.id), before?.lastReactionId ?? 0);
    const fresh = before && before.status !== "loading" ? feed.reactions.filter((r) => r.id > before.lastReactionId) : [];
    set((s) => {
      const next = patch(s, room, (r) => {
        const messages = mergeMessages(r.messages, feed.messages, feed.removed);
        // Primeira carga conta como lida, para o badge não começar em 60.
        const lastReadId = r.status === "loading" ? (messages.at(-1)?.id ?? 0) : r.lastReadId;
        return {
          messages,
          lastReactionId: newestReaction,
          status: "live",
          pinned: feed.pinned,
          enabled: feed.enabled,
          slowModeSeconds: feed.slowModeSeconds,
          lastReadId,
        };
      });
      return feed.viewer.isMod ? { ...next, viewer: { ...s.viewer, ...feed.viewer } } : next;
    });
    const counts: Record<string, number> = {};
    for (const { emoji } of fresh) {
      if (ownReactions[emoji] > 0) ownReactions[emoji] -= 1;
      else counts[emoji] = (counts[emoji] ?? 0) + 1;
    }
    for (const [emoji, count] of Object.entries(counts)) get().burst(room, emoji, count);
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

  noteOwnReaction: (emoji) => {
    ownReactions[emoji] = (ownReactions[emoji] ?? 0) + 1;
  },

  dropBurst: (room, id) => set((s) => patch(s, room, (r) => ({ bursts: r.bursts.filter((b) => b.id !== id) }))),

  markRead: (room) =>
    set((s) => patch(s, room, (r) => ({ lastReadId: r.messages.at(-1)?.id ?? r.lastReadId }))),

  setOpen: (open) => set({ open }),
  setActiveRoom: (activeRoom) => set({ activeRoom }),
  setContext: (context) => set({ context }),
}));
