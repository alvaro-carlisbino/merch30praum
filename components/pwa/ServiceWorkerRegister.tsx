"use client";

import { useEffect } from "react";

// Só em produção: em dev o cache atrapalharia o hot reload.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {});
  }, []);
  return null;
}
