"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SIZES = [
  { size: "P", chest: "100", length: "68", sleeve: "21" },
  { size: "M", chest: "106", length: "71", sleeve: "22" },
  { size: "G", chest: "112", length: "73", sleeve: "23" },
  { size: "GG", chest: "118", length: "75", sleeve: "24" },
  { size: "EGG", chest: "124", length: "77", sleeve: "25" },
];

export function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="Tabela de medidas"
        className="text-[10px] uppercase tracking-[0.3em] underline-offset-4 hover:underline"
        style={{ color: "var(--muted)" }}
      >
        Tabela de medidas →
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "var(--overlay)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Tabela de medidas"
              className="relative w-full max-w-lg p-6"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
            >
              <header className="flex items-baseline justify-between mb-6">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Padrão · 30praum
                  </p>
                  <h3
                    className="mt-2 font-display uppercase leading-[0.9]"
                    style={{ fontSize: "1.6rem", letterSpacing: "-0.02em" }}
                  >
                    Tabela de medidas
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[10px] uppercase tracking-[0.3em] hover:text-accent"
                  aria-label="Fechar"
                >
                  Fechar ✕
                </button>
              </header>

              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: "var(--muted)" }}
                  >
                    <th className="text-left py-2">Tamanho</th>
                    <th className="text-right py-2">Peito (cm)</th>
                    <th className="text-right py-2">Comprimento (cm)</th>
                    <th className="text-right py-2">Manga (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((s) => (
                    <tr
                      key={s.size}
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <td className="py-3 font-display text-lg">{s.size}</td>
                      <td className="py-3 text-right tabular-nums">{s.chest}</td>
                      <td className="py-3 text-right tabular-nums">{s.length}</td>
                      <td className="py-3 text-right tabular-nums">{s.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted leading-relaxed">
                Medidas em centímetros · variação de até 2 cm · em caso de
                dúvida sobre o caimento, peça uma numeração acima.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
