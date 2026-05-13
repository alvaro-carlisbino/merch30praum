"use client";

import { useState, type FormEvent } from "react";

const CREAM = "#ede4d6";
const INK = "#0f0f0e";

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
      style={{ background: CREAM, color: INK }}
    >
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <h2
            id="newsletter"
            className="font-display uppercase leading-[0.88]"
            style={{
              fontSize: "clamp(2.2rem, 5.4vw, 4.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Drops antes
            <br />
            de virem.
          </h2>
          <p
            className="mt-6 max-w-md text-sm leading-relaxed sm:text-base"
            style={{ color: "rgba(15,15,14,0.78)" }}
          >
            Anúncio antecipado de lançamento, prévias, peças numeradas e
            pré-venda só pra quem tá na lista. Sem spam — só drop.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            data-cursor="Email"
            aria-label="Seu email"
            className="flex-1 rounded-full border px-6 py-3 text-sm outline-none transition-colors focus:border-black"
            style={{
              borderColor: "rgba(15,15,14,0.25)",
              background: "transparent",
              color: INK,
            }}
          />
          <button
            type="submit"
            data-cursor="Entrar na lista"
            className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              background: INK,
              color: CREAM,
            }}
          >
            {status === "ok" ? "✓ Entrou na lista" : "Quero entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}
