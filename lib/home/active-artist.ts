import { create } from "zustand";
import type { ArtistSlug } from "@/lib/artists/types";

interface ActiveArtistState {
  active: ArtistSlug | null;
  setActive: (slug: ArtistSlug) => void;
}

export const useActiveArtist = create<ActiveArtistState>((set) => ({
  active: null,
  setActive: (slug) => set({ active: slug }),
}));
