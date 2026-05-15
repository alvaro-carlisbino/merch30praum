"use client";

import { useState } from "react";

type Tier = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
  perks?: string[];
};

const TIERS: Tier[] = [
  {
    id: "front",
    name: "Front · Lote 6",
    description: "Acesso à pista principal, frente ao palco",
    price: 150,
    available: 755,
    perks: ["Pista única", "Acesso a partir das 17h", "Bilheteria + portões"],
  },
  {
    id: "boladao",
    name: "Front Boladão · Esgotado",
    description: "Pista frontal premium · Esgotado no Lote 6",
    price: 295,
    available: 0,
    perks: ["Sold out"],
  },
  {
    id: "vip",
    name: "VIP · Lote 6",
    description: "Camarote elevado com vista total, alimentação inclusa",
    price: 655,
    available: 388,
    perks: [
      "Camarote elevado",
      "Open food (16h–02h)",
      "Banheiros privativos",
      "Acesso priority pelo portão D",
    ],
  },
];

const PIX_DISCOUNT = 0.05;

function fmt(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

export function IngressosCheckout() {
  const [tierId, setTierId] = useState<string>("front");
  const [qty, setQty] = useState(1);
  const [meia, setMeia] = useState(false);
  const [step, setStep] = useState<"choose" | "data" | "payment" | "success">(
    "choose",
  );
  const [payment, setPayment] = useState<"pix" | "credito" | "boleto">("pix");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0];
  const base = tier.price * (meia ? 0.5 : 1) * qty;
  const total =
    payment === "pix" ? base * (1 - PIX_DISCOUNT) : base;

  function reset() {
    setStep("choose");
    setQty(1);
    setMeia(false);
    setEmail("");
    setName("");
    setCpf("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      {/* Coluna principal */}
      <section
        className="rounded-3xl border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <StepIndicator step={step} />

        {step === "choose" && (
          <div className="mt-8 flex flex-col gap-5">
            <h3
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              1. Escolha seu ingresso
            </h3>

            <ul className="grid gap-3">
              {TIERS.map((t) => {
                const sold = t.available === 0;
                const selected = t.id === tierId && !sold;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => !sold && setTierId(t.id)}
                      disabled={sold}
                      className="w-full rounded-2xl border p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/[0.04]"
                      style={{
                        borderColor: selected ? "var(--accent)" : "var(--border)",
                        background: selected
                          ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                          : "transparent",
                      }}
                      aria-pressed={selected}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p
                            className="font-display uppercase leading-tight"
                            style={{
                              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {t.name}
                          </p>
                          <p className="mt-1 text-sm text-fg/75">
                            {t.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-xl tabular-nums">
                            {fmt(t.price)}
                          </p>
                          {sold ? (
                            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-fg/55">
                              Esgotado
                            </p>
                          ) : (
                            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">
                              {t.available.toLocaleString("pt-BR")} disponíveis
                            </p>
                          )}
                        </div>
                      </div>
                      {t.perks && t.perks.length > 0 && !sold && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {t.perks.map((perk) => (
                            <li
                              key={perk}
                              className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-fg/75"
                              style={{ borderColor: "var(--border)" }}
                            >
                              {perk}
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-muted">
                  Quantidade
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
                    style={{ borderColor: "var(--border)" }}
                    aria-label="Diminuir"
                  >
                    −
                  </button>
                  <span className="font-display text-xl tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(8, q + 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
                    style={{ borderColor: "var(--border)" }}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                  <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted">
                    máx. 8
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-muted">
                  Meia-entrada?
                </p>
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors hover:bg-white/[0.04]"
                  style={{
                    borderColor: meia ? "var(--accent)" : "var(--border)",
                    background: meia
                      ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                      : "transparent",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={meia}
                    onChange={(e) => setMeia(e.target.checked)}
                    className="h-4 w-4 accent-current"
                  />
                  <span>Estudante / Solidária (2kg) / PCD / +60</span>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep("data")}
              disabled={tier.available === 0}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Continuar · {fmt(total)} →
            </button>
          </div>
        )}

        {step === "data" && (
          <div className="mt-8 flex flex-col gap-5">
            <h3
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              2. Seus dados
            </h3>

            <Field label="Nome completo" value={name} onChange={setName} placeholder="Como tá no RG/CNH" />
            <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" />
            <Field label="CPF" value={cpf} onChange={setCpf} placeholder="000.000.000-00" />

            <p className="text-xs text-muted">
              O ingresso vai pro seu e-mail em até 5min. O CPF é exigência pra
              meia-entrada e anti-cambismo (Lei do Cambista 2024).
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="inline-flex items-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                ← Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep("payment")}
                disabled={!name || !email || !cpf}
                className="inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                Continuar · pagamento →
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="mt-8 flex flex-col gap-5">
            <h3
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              3. Forma de pagamento
            </h3>

            <div className="grid gap-3">
              {(["pix", "credito", "boleto"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPayment(p)}
                  className="flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-colors hover:bg-white/[0.04]"
                  style={{
                    borderColor: payment === p ? "var(--accent)" : "var(--border)",
                    background:
                      payment === p
                        ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                        : "transparent",
                  }}
                  aria-pressed={payment === p}
                >
                  <div>
                    <p className="font-display uppercase text-sm tracking-wider">
                      {p === "pix" && "Pix"}
                      {p === "credito" && "Cartão de crédito"}
                      {p === "boleto" && "Boleto bancário"}
                    </p>
                    <p className="mt-1 text-xs text-fg/65">
                      {p === "pix" && "5% off · confirmação em 1 min"}
                      {p === "credito" && "Visa, Master, Elo · até 4× sem juros"}
                      {p === "boleto" && "Compensa em 2 dias úteis"}
                    </p>
                  </div>
                  {p === "pix" && (
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ background: "#37d18a22", color: "#37d18a" }}
                    >
                      −5%
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("data")}
                className="inline-flex items-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                ← Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep("success")}
                className="inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                Confirmar pagamento · {fmt(total)}
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="mt-8 flex flex-col gap-5 py-8 text-center">
            <div
              className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "#37d18a22", color: "#37d18a" }}
              aria-hidden
            >
              <span className="text-2xl">✓</span>
            </div>
            <h3
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Pedido confirmado.
            </h3>
            <p className="mx-auto max-w-md text-sm text-fg/85 sm:text-base">
              Seu ingresso vai pro e-mail{" "}
              <span style={{ color: "var(--accent)" }}>{email || "seu e-mail"}</span>{" "}
              em até 5 minutos. Confere o spam também — se não chegar, fala com a
              gente no @plantaofestival.
            </p>
            <p className="mx-auto max-w-md text-[10px] uppercase tracking-[0.3em] text-muted">
              #30P-2026-{Math.floor(Math.random() * 10000).toString().padStart(4, "0")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <a
                href="/plantao"
                className="inline-flex items-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                Voltar pro festival
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                Comprar mais
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Resumo */}
      <aside
        className="h-fit rounded-3xl border p-6 sm:p-8 lg:sticky lg:top-20"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Resumo da compra
        </p>
        <h4
          className="mt-3 font-display uppercase leading-tight"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
        >
          Plantão Festival 2026
        </h4>
        <p className="mt-1 text-xs text-fg/70">
          25 de Abril · Marina Park · Fortaleza/CE
        </p>

        <dl className="mt-6 space-y-3 border-t pt-5 text-sm" style={{ borderColor: "var(--border)" }}>
          <Row label="Setor" value={tier.name.split(" · ")[0]} />
          <Row label="Quantidade" value={`${qty} ingresso${qty > 1 ? "s" : ""}`} />
          <Row label="Preço unitário" value={fmt(tier.price * (meia ? 0.5 : 1))} />
          {meia && (
            <Row
              label="Meia-entrada"
              value="50% off"
              accent
            />
          )}
          {payment === "pix" && step !== "choose" && (
            <Row label="PIX" value="−5%" accent />
          )}
        </dl>

        <div
          className="mt-6 flex items-end justify-between gap-4 border-t pt-5"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Total
          </span>
          <span
            className="font-display tabular-nums"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "var(--accent)",
            }}
          >
            {fmt(total)}
          </span>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-muted">
          Ingresso emitido pela ST Ingressos · Não compre em revendedor não autorizado
        </p>
      </aside>
    </div>
  );
}

function StepIndicator({
  step,
}: {
  step: "choose" | "data" | "payment" | "success";
}) {
  const steps: { id: typeof step; label: string }[] = [
    { id: "choose", label: "Ingresso" },
    { id: "data", label: "Dados" },
    { id: "payment", label: "Pagamento" },
    { id: "success", label: "Confirmação" },
  ];
  const currentIdx = steps.findIndex((s) => s.id === step);
  return (
    <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
      {steps.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums"
              style={{
                background: active
                  ? "var(--accent)"
                  : done
                    ? "color-mix(in srgb, var(--accent) 25%, transparent)"
                    : "color-mix(in srgb, var(--fg) 12%, transparent)",
                color: active ? "var(--bg)" : "var(--fg)",
              }}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              style={{
                color: active ? "var(--accent)" : done ? "var(--fg)" : "var(--muted)",
                opacity: done && !active ? 0.7 : 1,
              }}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-muted">
                ›
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-[0.28em] text-muted">
        {label}
      </dt>
      <dd
        className="text-sm tabular-nums"
        style={{ color: accent ? "var(--accent)" : "var(--fg)" }}
      >
        {value}
      </dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-full border bg-transparent px-5 py-3 text-sm outline-none transition-colors focus:border-fg"
        style={{ borderColor: "var(--border)", color: "var(--fg)" }}
      />
    </label>
  );
}
