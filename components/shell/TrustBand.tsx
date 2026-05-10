export function TrustBand() {
  return (
    <div
      role="note"
      className="w-full"
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        borderBottom: "1px solid var(--border)",
        color: "var(--muted)",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-2 flex items-center justify-center gap-4 sm:gap-8 text-[10px] uppercase tracking-[0.3em] flex-wrap">
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Loja oficial 30praum
        </span>
        <span className="hidden sm:inline" aria-hidden style={{ opacity: 0.4 }}>·</span>
        <span>Pedido em security bag lacrada</span>
        <span className="hidden md:inline" aria-hidden style={{ opacity: 0.4 }}>·</span>
        <span className="hidden md:inline">Pix · Cartão · Shop Pay</span>
      </div>
    </div>
  );
}
