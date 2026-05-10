"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSessionFlag } from "@/lib/utils/use-session-flag";

const SESSION_KEY = "30praum:intro:seen";

export function IntroLoader() {
  const seen = useSessionFlag(SESSION_KEY);
  const [forceHidden, setForceHidden] = useState(false);

  useEffect(() => {
    if (seen.isSet || forceHidden) return;
    const t = setTimeout(() => {
      seen.set();
      setForceHidden(true);
    }, 2200);
    return () => clearTimeout(t);
  }, [seen, forceHidden]);

  const show = !seen.isSet && !forceHidden;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#000" }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
            }}
            animate={{ opacity: [0.6, 0.3, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />

          <div className="relative w-full overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1], delay: 0.1 }}
              className="leading-[0.82] uppercase font-display text-white text-center"
              style={{
                fontSize: "clamp(5rem, 22vw, 22rem)",
                letterSpacing: "-0.04em",
              }}
            >
              30PRAUM
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-between px-6 sm:px-12 text-[10px] uppercase tracking-[0.4em] text-white/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span>BR · 2026</span>
            <span>SINAL ESTÁVEL</span>
            <span>QUEM MANDA É A 30PRAUM</span>
          </motion.div>

          <motion.div
            className="absolute top-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/55">
              Loja oficial · merch
            </span>
          </motion.div>

          <motion.div
            className="absolute left-0 right-0 bottom-0 h-[2px]"
            style={{ background: "#fff", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
