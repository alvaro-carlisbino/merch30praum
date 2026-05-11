"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string; // ISO
  label?: string;
};

function diff(target: Date) {
  const now = new Date();
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, passed: true };
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const m = Math.floor((ms / (1000 * 60)) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s, passed: false };
}

export function PlantaoCountdown({ targetDate, label = "Para o Plantão" }: CountdownProps) {
  const target = new Date(targetDate);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const cell = "flex flex-col items-center justify-center min-w-[5rem] px-3 py-3 sm:min-w-[7rem] sm:px-5 sm:py-4 border";
  const num = "font-display text-3xl sm:text-5xl leading-none tabular-nums";
  const lbl = "mt-2 text-[9px] uppercase tracking-[0.3em] opacity-70";

  if (t.passed) {
    return (
      <div className="inline-flex flex-col items-start gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">{label}</p>
        <p className="font-display text-3xl plantao-neon-text" style={{ color: "var(--accent)" }}>
          Acontecendo agora
        </p>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-3">
      <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">{label}</p>
      <div
        className="flex flex-wrap gap-1.5"
        aria-live="polite"
        aria-label={`${t.d} dias ${t.h} horas ${t.m} minutos ${t.s} segundos`}
      >
        <div className={cell} style={{ borderColor: "var(--border)" }}>
          <span className={num}>{String(t.d).padStart(2, "0")}</span>
          <span className={lbl}>dias</span>
        </div>
        <div className={cell} style={{ borderColor: "var(--border)" }}>
          <span className={num}>{String(t.h).padStart(2, "0")}</span>
          <span className={lbl}>horas</span>
        </div>
        <div className={cell} style={{ borderColor: "var(--border)" }}>
          <span className={num}>{String(t.m).padStart(2, "0")}</span>
          <span className={lbl}>min</span>
        </div>
        <div className={cell} style={{ borderColor: "var(--border)" }}>
          <span className={num} style={{ color: "var(--accent)" }}>
            {String(t.s).padStart(2, "0")}
          </span>
          <span className={lbl}>seg</span>
        </div>
      </div>
    </div>
  );
}
