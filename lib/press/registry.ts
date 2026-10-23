import { CONTACT } from "@/lib/contact";
export type PressAssetType = "logo" | "photo" | "bio" | "document";
export type PressAsset = {
  slug: string;
  title: string;
  type: PressAssetType;
  description: string;
  format: string;
  downloadUrl: string;
  relatedArtist?: string;
  thumbnail: string;
};
export const PRESS_CONTACTS = {
  ar: { label: "A&R", email: "" },
  booking: { label: "Shows", email: "" },
  imprensa: { label: "Imprensa e entrevistas", email: CONTACT.imprensa },
  parcerias: { label: "Marcas e licenciamento", email: CONTACT.parcerias },
  geral: { label: "Outros assuntos", email: CONTACT.geral },
};

// Só entra aqui material com arquivo real hospedado. O CMS sobrescreve esta lista.
export const PRESS_KIT_ASSETS: PressAsset[] = [];

export function getPressAssetsByType(type: PressAssetType): PressAsset[] {
  return PRESS_KIT_ASSETS.filter((a) => a.type === type);
}
export function getPressAssetsByArtist(artistSlug: string): PressAsset[] {
  return PRESS_KIT_ASSETS.filter((a) => a.relatedArtist === artistSlug);
}
