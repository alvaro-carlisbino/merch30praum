import { create } from "zustand";
import type { ArtistSlug } from "./artists/types";

export type ThemeKey = ArtistSlug | "house" | "plantao" | "incubadora";

export interface ThemeTokens {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  border: string;
  overlay: string;
  displayFont: string;
  tagFont: string;
  label: string;
}

export const HOUSE_THEME: ThemeTokens = {
  bg: "#0a0a0a",
  fg: "#f5f5f5",
  muted: "#8a8a8a",
  accent: "#ffffff",
  accent2: "#c9c9c9",
  border: "rgba(255,255,255,0.12)",
  overlay: "rgba(0,0,0,0.7)",
  displayFont: "BebasNeue-400",
  tagFont: "Cinzel-700",
  label: "30PRAUM",
};

export const PLANTAO_THEME: ThemeTokens = {
  bg: "#06030a",
  fg: "#fff5ec",
  muted: "#8a7080",
  accent: "#ff2d2d",
  accent2: "#ffd34d",
  border: "rgba(255,45,45,0.22)",
  overlay: "rgba(6,3,10,0.88)",
  displayFont: "BebasNeue-400",
  tagFont: "Cinzel-700",
  label: "PLANTÃO",
};

export const INCUBADORA_THEME: ThemeTokens = {
  bg: "#040705",
  fg: "#d7ffd9",
  muted: "#5a7d63",
  accent: "#2ef07c",
  accent2: "#fdfcd4",
  border: "rgba(46,240,124,0.22)",
  overlay: "rgba(4,7,5,0.88)",
  displayFont: "BebasNeue-400",
  tagFont: "Cinzel-700",
  label: "INCUBADORA",
};

export const ARTIST_THEMES: Record<ArtistSlug, ThemeTokens> = {
  matue: {
    bg: "#03050a",
    fg: "#e7f1ff",
    muted: "#6a7a92",
    accent: "#1f6bff",
    accent2: "#b8c8e6",
    border: "rgba(31,107,255,0.25)",
    overlay: "rgba(3,5,10,0.85)",
    displayFont: "SpaceGrotesk-500",
    tagFont: "PermanentMarker-400",
    label: "MATUÊ",
  },
  wiu: {
    bg: "#1a0a10",
    fg: "#f4e8e4",
    muted: "#a08680",
    accent: "#c8506a",
    accent2: "#e8a3a8",
    border: "rgba(244,232,228,0.18)",
    overlay: "rgba(26,10,16,0.78)",
    displayFont: "CormorantGaramond-500-Italic",
    tagFont: "UnifrakturCook-700",
    label: "WIU",
  },
  teto: {
    bg: "#14110d",
    fg: "#ede5d6",
    muted: "#8a7d65",
    accent: "#c89858",
    accent2: "#6e5a3a",
    border: "rgba(237,229,214,0.16)",
    overlay: "rgba(20,17,13,0.82)",
    displayFont: "Archivo-700",
    tagFont: "PermanentMarker-400",
    label: "TETO",
  },
  brandao: {
    bg: "#0c0c0c",
    fg: "#ededed",
    muted: "#6a6a6a",
    accent: "#ff3b1f",
    accent2: "#2a2a2a",
    border: "rgba(237,237,237,0.18)",
    overlay: "rgba(12,12,12,0.88)",
    displayFont: "Anton-400",
    tagFont: "Caveat-700",
    label: "BRANDÃO",
  },
};

interface ThemeStore {
  active: ThemeKey;
  tokens: ThemeTokens;
  setActive: (key: ThemeKey) => void;
}

function tokensFor(key: ThemeKey): ThemeTokens {
  if (key === "house") return HOUSE_THEME;
  if (key === "plantao") return PLANTAO_THEME;
  if (key === "incubadora") return INCUBADORA_THEME;
  return ARTIST_THEMES[key];
}

export const useTheme = create<ThemeStore>((set) => ({
  active: "house",
  tokens: HOUSE_THEME,
  setActive: (key) => set({ active: key, tokens: tokensFor(key) }),
}));

export function themeFor(key: ThemeKey): ThemeTokens {
  return tokensFor(key);
}
