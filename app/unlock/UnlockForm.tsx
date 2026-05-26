"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function UnlockForm({ from }: { from: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError("Credenciais inválidas.");
      setPassword("");
      return;
    }
    startTransition(() => {
      router.replace(from);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" autoComplete="off" noValidate>
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">e‑mail</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          inputMode="email"
          autoComplete="off"
          spellCheck={false}
          className="bg-transparent border-b border-white/20 px-0 py-2 text-base text-white placeholder:text-white/25 focus:border-white focus:outline-none transition"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">senha</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
          className="bg-transparent border-b border-white/20 px-0 py-2 text-base text-white placeholder:text-white/25 focus:border-white focus:outline-none transition"
        />
      </label>

      <div className="min-h-5 text-xs text-red-400" aria-live="polite">
        {error}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs tracking-[0.3em] uppercase font-semibold text-black transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90"
      >
        {pending ? "entrando…" : "entrar"}
      </button>
    </form>
  );
}
