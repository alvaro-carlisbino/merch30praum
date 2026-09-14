"use client";
import { useActionState, useId } from "react";
import { subscribe, type SubscribeSource, type SubscribeState } from "@/lib/newsletter/actions";

type Variant = "cream" | "dark";

interface Props {
  source?: SubscribeSource;
  variant?: Variant;
  title?: React.ReactNode;
  body?: string;
  buttonLabel?: string;
  id?: string;
}

const INITIAL: SubscribeState = { status: "idle" };

const PALETTE: Record<Variant, { bg: string; ink: string; inkSoft: string; border: string; button: string; buttonInk: string }> = {
  cream: {
    bg: "#ede4d6",
    ink: "#0f0f0e",
    inkSoft: "rgba(15,15,14,0.78)",
    border: "rgba(15,15,14,0.25)",
    button: "#0f0f0e",
    buttonInk: "#ede4d6",
  },
  dark: {
    bg: "#0a0204",
    ink: "#fff5ec",
    inkSoft: "rgba(255,245,236,0.8)",
    border: "rgba(255,45,90,0.5)",
    button: "#ff2d5a",
    buttonInk: "#ffffff",
  },
};

export function NewsletterCapture({
  source = "home",
  variant = "cream",
  title,
  body,
  buttonLabel = "Quero entrar",
  id,
}: Props) {
  const [state, formAction, pending] = useActionState(subscribe, INITIAL);
  const inputId = useId();
  const c = PALETTE[variant];
  const ok = state.status === "ok";

  return (
    <section id={id} aria-labelledby={`${inputId}-title`} style={{ background: c.bg, color: c.ink }}>
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <h2
            id={`${inputId}-title`}
            className="font-display uppercase leading-[0.88]"
            style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.6rem)", letterSpacing: "-0.02em" }}
          >
            {title ?? (
              <>
                Drops antes
                <br />
                de virem.
              </>
            )}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: c.inkSoft }}>
            {body ??
              "Anúncio antecipado de lançamento, prévias, peças numeradas e pré-venda só pra quem tá na lista. Sem spam, só drop."}
          </p>
        </div>
        <form action={formAction} className="flex flex-col gap-3">
          <input type="hidden" name="source" value={source} />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <input
              id={inputId}
              type="email"
              name="email"
              required
              disabled={ok || pending}
              placeholder="Email"
              data-cursor="Email"
              aria-label="Seu email"
              aria-invalid={state.status === "invalid" ? true : undefined}
              className="flex-1 rounded-full border bg-transparent px-6 py-3 text-sm outline-none transition-colors focus:border-current disabled:opacity-60"
              style={{ borderColor: c.border, color: c.ink }}
            />
            <button
              type="submit"
              disabled={ok || pending}
              data-cursor={ok ? "Na lista" : buttonLabel}
              className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-80"
              style={{ background: c.button, color: c.buttonInk }}
            >
              {ok ? "✓ Entrou na lista" : pending ? "Enviando..." : buttonLabel}
            </button>
          </div>
          <p className="min-h-[1.25rem] text-xs" style={{ color: c.inkSoft }} aria-live="polite">
            {state.status === "invalid" && "Confere o email e tenta de novo."}
            {state.status === "unavailable" && "Não deu pra salvar agora. Tenta de novo em instantes."}
            {ok && "Você recebe primeiro. Sem spam."}
          </p>
        </form>
      </div>
    </section>
  );
}
