import type { Metadata } from "next";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: { absolute: "Acesso restrito" },
  description: "Acesso restrito.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { title: "Acesso restrito", description: "Acesso restrito.", siteName: "", url: undefined, images: [] },
  twitter: { card: "summary", title: "Acesso restrito", description: "Acesso restrito.", creator: undefined },
  authors: [],
  keywords: [],
  alternates: { canonical: undefined },
  category: undefined,
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const safeFrom = typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/";

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 bg-black text-white">
      <div className="w-full max-w-sm flex flex-col gap-10">
        <header className="flex flex-col items-center gap-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-12 w-12 text-white/80"
          >
            <rect x="4" y="8" width="16" height="12" rx="2" />
            <path d="M12 4v4" />
            <circle cx="12" cy="3" r="1" />
            <circle cx="9" cy="13" r="1" />
            <circle cx="15" cy="13" r="1" />
            <path d="M9 17h6" />
            <path d="M2 14v2" />
            <path d="M22 14v2" />
          </svg>
          <h1
            className="text-2xl sm:text-3xl font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            Computando o futuro
          </h1>
        </header>

        <UnlockForm from={safeFrom} />
      </div>
    </div>
  );
}
