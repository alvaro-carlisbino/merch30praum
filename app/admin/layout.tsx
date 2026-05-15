import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/shell/BrandLogo";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin · 30praum",
  description: "Painel administrativo da 30praum",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg lg:flex-row">
      <aside
        className="flex shrink-0 flex-col gap-2 border-b lg:h-screen lg:w-64 lg:border-b-0 lg:border-r"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 3%, var(--bg))",
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 lg:flex-col lg:items-start lg:gap-6 lg:py-6">
          <Link href="/" data-cursor="Voltar ao site" className="text-lg">
            <BrandLogo />
          </Link>
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.28em]"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Painel admin
          </span>
        </div>
        <AdminNav />
        <div
          className="mt-auto hidden border-t px-5 py-5 text-[10px] uppercase tracking-[0.3em] text-muted lg:block"
          style={{ borderColor: "var(--border)" }}
        >
          <p>Logado como</p>
          <p className="mt-1.5 normal-case tracking-normal text-fg/85">
            Clara Mendes
          </p>
          <p className="text-fg/55 normal-case tracking-normal">CEO · 30praum</p>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
