import type { Metadata } from "next";
import { houseBody, houseDisplay } from "@/styles/fonts";
import { AtmosOverlay } from "@/components/effects/AtmosOverlay";
import { IntroLoader } from "@/components/effects/IntroLoader";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { PageTransition } from "@/components/effects/PageTransition";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { NowPlayingBar } from "@/components/effects/NowPlayingBar";
import { BrandWatermark } from "@/components/effects/BrandWatermark";
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
      className={`${houseBody.variable} ${houseDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IntroLoader />
        <CustomCursor />
        <PageTransition />
        <ScrollProgress />
        <NowPlayingBar />
        <BrandWatermark />
        <ScrollAtmosphere />
        <AtmosOverlay />
        {children}
      </body>
    </html>
  );
}
