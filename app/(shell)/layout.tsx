import type { Metadata, Viewport } from "next";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "../globals.css";
import { BrandHeader } from "@/components/shell/BrandHeader";
import { BrandFooter } from "@/components/shell/BrandFooter";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { ChatEngine } from "@/components/mural/ChatEngine";
import { ChatDock } from "@/components/mural/ChatDock";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://merch30praum.vercel.app";
const SITE_DESCRIPTION =
  "Site oficial da holding 30praum: gravadora, Plantão Festival, parcerias e incubadora. Casa de Matuê, Wiu, Teto e Brandão85.";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "30praum",
  appleWebApp: {
    capable: true,
    title: "30praum",
    statusBarStyle: "black",
  },
  formatDetection: { telephone: false },
  title: {
    default: "30praum · Site oficial",
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
    title: "30praum · Site oficial",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "30praum · Site oficial",
    description: SITE_DESCRIPTION,
    creator: "@30praum",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "music",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};
export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="house"
      className={`${houseBody.variable} ${houseDisplay.variable} ${brandSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <ServiceWorkerRegister />
        <BrandHeader />
        <main className="flex-1">{children}</main>
        <BrandFooter />
        <CartDrawer />
        <ChatEngine />
        <ChatDock />
      </body>
    </html>
  );
}
