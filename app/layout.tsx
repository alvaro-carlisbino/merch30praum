import type { Metadata } from "next";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";
import { CustomCursor } from "@/components/effects/CustomCursor";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohubdeumagravadoraai.vercel.app";

/**
 * Metadata neutra no root: /unlock e qualquer rota fora de (shell) herda só
 * isto. A identidade da marca vive em app/(shell)/layout.tsx, acessivel
 * apenas apos autenticacao no gate.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Acesso restrito", template: "%s" },
  description: "Acesso restrito.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-theme="house"
      className={`${houseBody.variable} ${houseDisplay.variable} ${brandSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
