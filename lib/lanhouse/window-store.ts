"use client";

import { create } from "zustand";

export type WindowId = string;

export interface WindowState {
  id: WindowId;
  title: string;
  iconKey?: string; // serializa pra não armazenar React node no store
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; width: number; height: number };
  z: number;
  /** se true, fechar redireciona pra /. Senão, só desmonta */
  rootOfRoute?: boolean;
  closed: boolean;
}

interface RegisterArgs {
  id: WindowId;
  title: string;
  iconKey?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rootOfRoute?: boolean;
}

interface WindowStore {
  windows: Record<WindowId, WindowState>;
  topZ: number;
  focusedId: WindowId | null;

  register: (args: RegisterArgs) => void;
  unregister: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  setPosition: (id: WindowId, x: number, y: number) => void;
  toggleMinimize: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  close: (id: WindowId) => void;
  restore: (id: WindowId) => void;
  setTitle: (id: WindowId, title: string) => void;
}

const STARTING_Z = 10;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  topZ: STARTING_Z,
  focusedId: null,

  register: (args) => {
    const state = get();
    const existing = state.windows[args.id];
    if (existing && !existing.closed) {
      // já registrado e ativo — só atualiza meta
      set((s) => ({
        windows: {
          ...s.windows,
          [args.id]: { ...existing, title: args.title, iconKey: args.iconKey },
        },
      }));
      return;
    }

    const newZ = state.topZ + 1;
    set((s) => ({
      topZ: newZ,
      focusedId: args.id,
      windows: {
        ...s.windows,
        [args.id]: {
          id: args.id,
          title: args.title,
          iconKey: args.iconKey,
          x: args.x ?? 80,
          y: args.y ?? 40,
          width: args.width ?? 760,
          height: args.height ?? 560,
          minimized: false,
          maximized: false,
          z: newZ,
          rootOfRoute: args.rootOfRoute,
          closed: false,
        },
      },
    }));
  },

  unregister: (id) => {
    set((s) => {
      const next = { ...s.windows };
      delete next[id];
      return { windows: next };
    });
  },

  focus: (id) => {
    const state = get();
    const w = state.windows[id];
    if (!w || w.closed) return;
    const newZ = state.topZ + 1;
    set((s) => ({
      topZ: newZ,
      focusedId: id,
      windows: {
        ...s.windows,
        [id]: { ...w, z: newZ, minimized: false },
      },
    }));
  },

  setPosition: (id, x, y) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return { windows: { ...s.windows, [id]: { ...w, x, y } } };
    });
  },

  toggleMinimize: (id) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return {
        windows: { ...s.windows, [id]: { ...w, minimized: !w.minimized } },
        focusedId: w.minimized ? id : null,
      };
    });
  },

  toggleMaximize: (id) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      if (w.maximized && w.prev) {
        return {
          windows: {
            ...s.windows,
            [id]: {
              ...w,
              maximized: false,
              x: w.prev.x,
              y: w.prev.y,
              width: w.prev.width,
              height: w.prev.height,
              prev: undefined,
            },
          },
        };
      }
      return {
        windows: {
          ...s.windows,
          [id]: {
            ...w,
            maximized: true,
            prev: { x: w.x, y: w.y, width: w.width, height: w.height },
          },
        },
      };
    });
  },

  close: (id) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return {
        windows: { ...s.windows, [id]: { ...w, closed: true, minimized: false } },
        focusedId: s.focusedId === id ? null : s.focusedId,
      };
    });
  },

  restore: (id) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return {
        windows: { ...s.windows, [id]: { ...w, closed: false, minimized: false } },
      };
    });
  },

  setTitle: (id, title) => {
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return { windows: { ...s.windows, [id]: { ...w, title } } };
    });
  },
}));
