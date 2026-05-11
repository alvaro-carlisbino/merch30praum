import type { Metadata } from "next";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { ScrollAtmosphere } from "@/components/effects/ScrollAtmosphere";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://30praum.store"),
  title: {
    default: "30praum — Merch oficial",
    template: "%s · 30praum",
  },
  description:
    "Merch oficial 30praum. Universos cinematográficos de Matuê, Wiu, Teto e Brandão85 — quem manda é a 30praum.",
  openGraph: {
    type: "website",
    siteName: "30praum",
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
        <ScrollProgress />
        <ScrollAtmosphere />
        {children}
      </body>
    </html>
  );
}
