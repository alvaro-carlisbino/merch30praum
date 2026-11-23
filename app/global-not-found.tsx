import type { Metadata } from "next";
import { NotFoundContent } from "@/components/shell/NotFoundContent";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A rota que você buscou não existe.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="pt-BR"
      data-theme="house"
      className={`${houseBody.variable} ${houseDisplay.variable} ${brandSerif.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <main className="flex flex-1 flex-col">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
