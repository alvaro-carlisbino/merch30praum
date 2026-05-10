interface TrustItem {
  label: string;
  detail: string;
  icon: React.ReactNode;
}

const ITEMS: TrustItem[] = [
  {
    label: "Security bag",
    detail: "Pedido lacrado",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="8" width="16" height="13" rx="1" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
        <circle cx="12" cy="14" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Pix 5% off",
    detail: "Desconto na hora",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4 4 12l8 8 8-8z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "4× sem juros",
    detail: "No cartão",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
  {
    label: "Trocas grátis",
    detail: "30 dias",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12a9 9 0 0 1 15.5-6.4L21 8" />
        <path d="M21 4v4h-4" />
        <path d="M21 12a9 9 0 0 1-15.5 6.4L3 16" />
        <path d="M3 20v-4h4" />
      </svg>
    ),
  },
];

export function PdpTrustRow() {
  return (
    <ul
      className="grid grid-cols-2 sm:grid-cols-4 gap-px"
      style={{
        background: "var(--border)",
        border: "1px solid var(--border)",
      }}
    >
      {ITEMS.map((item) => (
        <li
          key={item.label}
          className="flex flex-col gap-1 p-3"
          style={{ background: "var(--bg)" }}
        >
          <span style={{ color: "var(--accent)" }}>{item.icon}</span>
          <span className="text-[10px] uppercase tracking-[0.25em] mt-1">
            {item.label}
          </span>
          <span className="text-[10px] text-muted">{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}
