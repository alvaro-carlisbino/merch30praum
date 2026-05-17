import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
      <div>
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
            {eyebrow}
          </p>
        )}
        <h1
          className="mt-3 font-display uppercase leading-[0.95]"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg/75 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
