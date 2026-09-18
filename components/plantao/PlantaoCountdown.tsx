"use client";
import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  targetDate: string;
  label?: string;
  tone?: "light" | "accent";
};

function diff(target: Date) {
  const ms = target.getTime() - new Date().getTime();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, passed: true };
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
    passed: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function PlantaoCountdown({ targetDate, label, tone = "light" }: CountdownProps) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const ink = tone === "accent" ? "var(--accent)" : "#ffffff";

  if (t.passed) {
    return (
      <p className="font-display uppercase leading-none" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: ink }}>
        Acontecendo agora
      </p>
    );
  }

  const cells = [
    { v: String(t.d), l: t.d === 1 ? "dia" : "dias" },
    { v: pad(t.h), l: "h" },
    { v: pad(t.m), l: "min" },
    { v: pad(t.s), l: "seg" },
  ];

  return (
    <div className="flex flex-col gap-2" aria-label={`Faltam ${t.d} dias para o evento`}>
      {label && <p className="text-[10px] uppercase tracking-[0.32em] text-white/55">{label}</p>}
      <div className="flex items-baseline gap-3 sm:gap-5">
        {cells.map((c, i) => (
          <div key={c.l} className="flex items-baseline gap-3 sm:gap-5">
            {i > 0 && (
              <span aria-hidden className="font-display leading-none text-white/25" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)" }}>
                /
              </span>
            )}
            <span className="flex items-baseline gap-1.5">
              <span
                className="font-display leading-[0.8] tabular-nums"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", color: i === 0 ? ink : "#ffffff", letterSpacing: "-0.02em" }}
                suppressHydrationWarning
              >
                {c.v}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">{c.l}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
