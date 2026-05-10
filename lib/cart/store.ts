"use client";

import { create } from "zustand";

interface CartUIState {
  isDrawerOpen: boolean;
  optimisticCount: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setOptimisticCount: (n: number) => void;
  bumpOptimisticCount: (delta: number) => void;
}

export const useCartUI = create<CartUIState>((set) => ({
  isDrawerOpen: false,
  optimisticCount: 0,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
  setOptimisticCount: (n) => set({ optimisticCount: Math.max(0, n) }),
  bumpOptimisticCount: (delta) =>
    set((s) => ({ optimisticCount: Math.max(0, s.optimisticCount + delta) })),
}));
