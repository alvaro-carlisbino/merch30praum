"use client";

import { motion } from "motion/react";

export function MatueSignals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-24 right-6 hidden md:block z-10"
      style={{ fontFamily: "ui-monospace, Menlo, monospace", color: "var(--accent)" }}
    >
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="px-3 py-2.5 backdrop-blur-sm space-y-1.5"
        style={{
          border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
          background: "color-mix(in srgb, var(--bg) 70%, transparent)",
          minWidth: "200px",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}>
          <span style={{ color: "var(--accent)" }}>SUBJ_333</span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <span style={{ color: "var(--accent)", fontSize: "8px" }}>●</span>
            ONLINE
          </motion.span>
        </div>

        <Row label="SIGNAL" value="STABLE" />
        <Row label="FREQ" value="432.000 Hz" />
        <Row label="LAT" value="-3.732" />
        <Row label="LON" value="-38.527" />
        <Row label="MODE" value={<motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4 }}>ALIEN</motion.span>} />

        <div className="pt-1.5 border-t" style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}>
          <FrequencyBar />
        </div>
      </motion.div>

      <motion.div
        className="mt-3 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--muted)" }}
      >
        TX 333.OS · CAP. FINAL
      </motion.div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between" style={{ fontSize: "10px" }}>
      <span style={{ color: "var(--muted)", letterSpacing: "0.2em" }}>{label}</span>
      <span style={{ color: "var(--fg)" }}>{value}</span>
    </div>
  );
}

function FrequencyBar() {
  const bars = Array.from({ length: 24 });
  return (
    <div className="flex items-end gap-[2px]" style={{ height: "12px" }}>
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="block w-[2px]"
          style={{ background: "var(--accent)" }}
          animate={{
            height: [
              `${20 + ((i * 13) % 70)}%`,
              `${50 + ((i * 31) % 50)}%`,
              `${30 + ((i * 17) % 70)}%`,
            ],
          }}
          transition={{
            duration: 0.6 + (i % 3) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}
