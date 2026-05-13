import {
  Inter,
  Bebas_Neue,
  Cinzel,
  Permanent_Marker,
  UnifrakturCook,
  Caveat,
  Space_Grotesk,
  Cormorant_Garamond,
  Archivo,
  Anton,
} from "next/font/google";

export const houseBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const houseDisplay = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * Wordmark oficial 30praum — "30" serifado bold + "PRAUM" letterspacing aberto.
 * Cinzel é a fonte mais próxima do logo real visto no LinkedIn/YouTube oficial.
 */
export const brandSerif = Cinzel({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * Lettering tag por artista — cada universo do Figma usa uma fonte distinta.
 * matue/teto: marker brush · wiu: blackletter gothic · brandao: cursive flow.
 */
export const tagMatue = Permanent_Marker({
  variable: "--font-tag-matue",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const tagTeto = Permanent_Marker({
  variable: "--font-tag-teto",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const tagWiu = UnifrakturCook({
  variable: "--font-tag-wiu",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const tagBrandao = Caveat({
  variable: "--font-tag-brandao",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const matueDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const wiuDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const tetoDisplay = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export const brandaoDisplay = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
