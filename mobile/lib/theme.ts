import { create } from "zustand";
import type { ArtistSlug } from "./artists/types";

export type ThemeKey = ArtistSlug | "house";

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
  fg: "#f5f0e8",
  muted: "#6a7a92",
  accent: "#c89858",
  accent2: "#e7d8b8",
  border: "rgba(245,240,232,0.12)",
  overlay: "rgba(10,10,10,0.85)",
  displayFont: "BebasNeue-400",
  tagFont: "Cinzel-700",
  label: "30PRAUM",
};

export const ARTIST_THEMES: Record<ArtistSlug, ThemeTokens> = {
  matue: {
    ...HOUSE_THEME,
    bg: "#03050a",
    fg: "#e7f1ff",
    accent: "#1f6bff",
    accent2: "#b8c8e6",
    border: "rgba(31,107,255,0.25)",
    overlay: "rgba(3,5,10,0.85)",
    displayFont: "SpaceGrotesk-500",
    tagFont: "PermanentMarker-400",
    label: "MATUÊ",
  },
  wiu: {
    ...HOUSE_THEME,
    bg: "#1a0a10",
    fg: "#fce8ee",
    accent: "#c8506a",
    accent2: "#e8b8c4",
    border: "rgba(200,80,106,0.25)",
    overlay: "rgba(26,10,16,0.85)",
    displayFont: "CormorantGaramond-500-Italic",
    tagFont: "UnifrakturCook-700",
    label: "WIU",
  },
  teto: {
    ...HOUSE_THEME,
    bg: "#14110d",
    fg: "#f5ecd8",
    accent: "#c89858",
    accent2: "#e7d8b8",
    border: "rgba(200,152,88,0.28)",
    overlay: "rgba(20,17,13,0.85)",
    displayFont: "Archivo-700",
    tagFont: "PermanentMarker-400",
    label: "TETO",
  },
  brandao: {
    ...HOUSE_THEME,
    bg: "#0c0c0c",
    fg: "#f8f8f8",
    accent: "#ff3b1f",
    accent2: "#ffd0c4",
    border: "rgba(255,59,31,0.28)",
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

export const useTheme = create<ThemeStore>((set) => ({
  active: "house",
  tokens: HOUSE_THEME,
  setActive: (key) =>
    set({
      active: key,
      tokens: key === "house" ? HOUSE_THEME : ARTIST_THEMES[key],
    }),
}));

export function themeFor(key: ThemeKey): ThemeTokens {
  return key === "house" ? HOUSE_THEME : ARTIST_THEMES[key];
}
