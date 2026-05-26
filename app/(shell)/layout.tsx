import type { Metadata } from "next";
import { tagMatue, tagTeto, tagWiu, tagBrandao } from "@/styles/fonts";
import { BrandHeader } from "@/components/shell/BrandHeader";
import { BrandFooter } from "@/components/shell/BrandFooter";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { getCart } from "@/lib/cart/actions";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohubdeumagravadoraai.vercel.app";
const SITE_DESCRIPTION =
  "Site oficial da holding 30praum — gravadora, Plantão Festival, parcerias e incubadora. Casa de Matuê, Wiu, Teto e Brandão85.";

/**
 * Metadata identificadora da marca vive aqui — só renderiza nas rotas gated
 * (dentro de (shell)). A tela /unlock fica fora deste segmento, então o root
 * layout entrega metadata neutra pra quem ainda não autenticou.
 */
export const metadata: Metadata = {
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
  robots: { index: true, follow: true },
};

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCart();
  const cartCount = cart?.totalQuantity ?? 0;

  /**
   * Variáveis de fonte dos artistas (--font-tag-*) ficam restritas a este
   * wrapper. display:contents preserva o fluxo flex do <body> definido no
   * root layout, então BrandHeader/main/BrandFooter continuam se comportando
   * como filhos diretos do body pra fins de layout.
   */
  const artistFontVars = `${tagMatue.variable} ${tagTeto.variable} ${tagWiu.variable} ${tagBrandao.variable}`;

  return (
    <div className={artistFontVars} style={{ display: "contents" }}>
      <BrandHeader cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <BrandFooter />
      <CartDrawer />
    </div>
  );
}
