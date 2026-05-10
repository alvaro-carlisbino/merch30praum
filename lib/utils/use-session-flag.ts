"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function makeGetSnapshot(key: string) {
  return function getSnapshot(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(key) !== null;
  };
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSessionFlag(key: string): {
  isSet: boolean;
  set: () => void;
} {
  const isSet = useSyncExternalStore(
    subscribe,
    makeGetSnapshot(key),
    getServerSnapshot,
  );
  return {
    isSet,
    set: () => {
      if (typeof window === "undefined") return;
      sessionStorage.setItem(key, "1");
      notify();
    },
  };
}
