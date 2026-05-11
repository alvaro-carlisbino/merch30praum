"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("ok");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 3500);
  }

  return (
    <section
      aria-labelledby="newsletter"
      className="relative overflow-hidden"
      style={{
        background: "var(--accent)",
        color: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <h2
            id="newsletter"
            className="mt-3 font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Drops antes
            <br />
            de virem.
          </h2>
          <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed opacity-85">
            Anúncio antecipado de lançamento, prévias, peças numeradas e pré-venda
            só pra quem tá na lista. Sem spam — só drop.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          aria-describedby="newsletter-helper"
        >
          <label
            htmlFor="newsletter-email"
            className="text-[10px] uppercase tracking-[0.3em] opacity-75"
          >
            Seu email
          </label>
          <div
            className="flex flex-col sm:flex-row gap-2"
            style={{ borderTop: "1.5px solid currentColor" }}
          >
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              data-cursor="Email"
              className="flex-1 bg-transparent border-0 px-0 py-4 outline-none text-2xl font-display"
              style={{
                color: "var(--bg)",
                letterSpacing: "-0.01em",
              }}
            />
            <button
              type="submit"
              data-cursor="Entrar na lista"
              className="px-6 py-4 text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
              style={{
                background: "var(--bg)",
                color: "var(--accent)",
                fontWeight: 700,
              }}
            >
              Quero entrar →
            </button>
          </div>

          <AnimatePresence>
            {status === "ok" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] uppercase tracking-[0.3em] opacity-90"
              >
                ✓ entrou na lista · primeiro a saber
              </motion.p>
            )}
          </AnimatePresence>

          <p
            id="newsletter-helper"
            className="text-[10px] uppercase tracking-[0.3em] opacity-65"
          >
            Cancela quando quiser · zero spam
          </p>
        </form>
      </div>
    </section>
  );
}
