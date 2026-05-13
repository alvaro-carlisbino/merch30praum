import type { Metadata } from "next";
import { houseBody, houseDisplay, brandSerif, graffitiTag } from "@/styles/fonts";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { ScrollAtmosphere } from "@/components/effects/ScrollAtmosphere";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://30praum.com";
const SITE_DESCRIPTION =
  "Site oficial da holding 30praum — gravadora, Plantão Festival, Sabor Matuê, parcerias e incubadora. Casa de Matuê, Wiu, Teto e Brandão85.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "30praum — Site oficial",
    template: "%s · 30praum",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "30praum",
    "Matuê",
    "Wiu",
    "Teto",
    "Brandão85",
    "trap brasileiro",
    "Plantão Festival",
    "Fortaleza",
    "gravadora",
    "hip-hop nordeste",
  ],
  authors: [{ name: "30praum" }],
  openGraph: {
    type: "website",
    siteName: "30praum",
    locale: "pt_BR",
    title: "30praum — Site oficial",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "30praum — Site oficial",
    description: SITE_DESCRIPTION,
    creator: "@30praum",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "music",
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
      className={`${houseBody.variable} ${houseDisplay.variable} ${brandSerif.variable} ${graffitiTag.variable} h-full antialiased`}
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
