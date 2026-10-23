import type { Metadata, Viewport } from "next";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://merch30praum.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "30praum · Site oficial", template: "%s · 30praum" },
  description:
    "Site oficial da holding 30praum: gravadora, Plantão Festival, parcerias e incubadora. Casa de Matuê, Wiu, Teto e Brandão85.",
  robots: { index: false, follow: false },
  applicationName: "30praum",
  appleWebApp: {
    capable: true,
    title: "30praum",
    statusBarStyle: "black",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
