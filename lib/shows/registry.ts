import type { ArtistSlug } from "@/lib/artists/types";

export type ShowStatus = "upcoming" | "soldout" | "past" | "tba";
export type Show = {
  id: string;
  artistSlug: ArtistSlug;
  date: string;
  city: string;
  state: string;
  venue: string;
  event?: string;
  ticketsUrl?: string;
  status: ShowStatus;
  note?: string;
};
// Agenda levantada em outubro de 2026 a partir de anúncios públicos (Billboard Brasil, Eventim, ST Ingressos).
// Datas sem link têm ingresso vendido pela produção local.
export const SHOWS: Show[] = [
  // Passados
  { id: "plantao-2026-matue", artistSlug: "matue", date: "2026-04-25T20:00:00-03:00", city: "Fortaleza", state: "CE", venue: "Marina Park", event: "Plantão 2026", status: "tba" },
  { id: "plantao-2026-teto", artistSlug: "teto", date: "2026-04-25T20:00:00-03:00", city: "Fortaleza", state: "CE", venue: "Marina Park", event: "Plantão 2026", note: "Colapso Global ao vivo, com Wiu", status: "tba" },
  { id: "plantao-2026-brandao", artistSlug: "brandao", date: "2026-04-25T20:00:00-03:00", city: "Fortaleza", state: "CE", venue: "Marina Park", event: "Plantão 2026", status: "tba" },
  { id: "rock-in-rio-lisboa-2026", artistSlug: "matue", date: "2026-06-28T21:00:00+01:00", city: "Lisboa", state: "PT", venue: "Parque Tejo", event: "Rock in Rio Lisboa", note: "Palco Mundo", status: "tba" },
  { id: "village-rio-2026", artistSlug: "teto", date: "2026-06-26T22:00:00-03:00", city: "Rio de Janeiro", state: "RJ", venue: "Jockey Club", note: "Com Wiu", status: "tba" },
  { id: "omni-2026-brandao", artistSlug: "brandao", date: "2026-04-04T20:00:00-03:00", city: "Rio de Janeiro", state: "RJ", venue: "Farmasi Arena", event: "Omni Festival", status: "tba" },
  // Próximos
  { id: "matue-2026-10-02-rio-de-janeiro", artistSlug: "matue", date: "2026-10-02T22:00:00-03:00", city: "Rio de Janeiro", state: "RJ", venue: "Arena Bangu", status: "tba" },
  { id: "matue-2026-10-03-campos-dos-goytacazes", artistSlug: "matue", date: "2026-10-03T22:00:00-03:00", city: "Campos dos Goytacazes", state: "RJ", venue: "Clube de Regatas Saldanha da Gama", status: "tba" },
  { id: "matue-2026-10-09-lages", artistSlug: "matue", date: "2026-10-09T22:00:00-03:00", city: "Lages", state: "SC", venue: "Arena Ziriguidum", status: "tba" },
  { id: "matue-2026-10-10-bauru", artistSlug: "matue", date: "2026-10-10T22:00:00-03:00", city: "Bauru", state: "SP", venue: "Cali Club", status: "tba" },
  { id: "matue-2026-10-16-sao-caetano-do-sul", artistSlug: "matue", date: "2026-10-16T22:00:00-03:00", city: "São Caetano do Sul", state: "SP", venue: "Espaço Liv", status: "tba" },
  { id: "matue-2026-10-17-lorena", artistSlug: "matue", date: "2026-10-17T22:00:00-03:00", city: "Lorena", state: "SP", venue: "CDG Beer Garden", status: "tba" },
  { id: "matue-2026-10-23-francisco-beltrao", artistSlug: "matue", date: "2026-10-23T22:00:00-03:00", city: "Francisco Beltrão", state: "PR", venue: "Marabá Centro de Eventos", status: "tba" },
  { id: "matue-2026-10-24-cascavel", artistSlug: "matue", date: "2026-10-24T22:00:00-03:00", city: "Cascavel", state: "PR", venue: "Tuiuti", status: "tba" },
  { id: "matue-2026-10-30-sao-jose", artistSlug: "matue", date: "2026-10-30T22:00:00-03:00", city: "São José", state: "SC", venue: "Arena Opus", status: "tba" },
  { id: "matue-2026-10-31-tubarao", artistSlug: "matue", date: "2026-10-31T22:00:00-03:00", city: "Tubarão", state: "SC", venue: "Hangar 737", status: "tba" },
  { id: "colapso-global-contagem", artistSlug: "teto", date: "2026-10-17T20:00:00-03:00", city: "Contagem", state: "MG", venue: "Rooftop Shopping do Avião", event: "Colapso Global BH", ticketsUrl: "https://www.flvrbeventos.com.br/eventos/colapso-global-BH", note: "Com Wiu e Brandão85", status: "upcoming" },
  { id: "matue-2026-11-19-foz", artistSlug: "matue", date: "2026-11-19T22:00:00-03:00", city: "Foz do Iguaçu", state: "PR", venue: "Centro de Convenções", ticketsUrl: "https://www.eventim.com.br/artist/matue/", status: "upcoming" },
  { id: "beat-fest-goiania-matue", artistSlug: "matue", date: "2026-12-18T20:00:00-03:00", city: "Goiânia", state: "GO", venue: "Arena Multiplace", event: "Beat Fest Goiânia", ticketsUrl: "https://www.stingressos.com.br/", status: "upcoming" },
  { id: "beat-fest-goiania-wiu", artistSlug: "wiu", date: "2026-12-18T20:00:00-03:00", city: "Goiânia", state: "GO", venue: "Arena Multiplace", event: "Beat Fest Goiânia", ticketsUrl: "https://www.stingressos.com.br/", status: "upcoming" },
  { id: "beat-fest-goiania-teto", artistSlug: "teto", date: "2026-12-18T20:00:00-03:00", city: "Goiânia", state: "GO", venue: "Arena Multiplace", event: "Beat Fest Goiânia", ticketsUrl: "https://www.stingressos.com.br/", status: "upcoming" },
  { id: "beat-fest-goiania-brandao", artistSlug: "brandao", date: "2026-12-18T20:00:00-03:00", city: "Goiânia", state: "GO", venue: "Arena Multiplace", event: "Beat Fest Goiânia", ticketsUrl: "https://www.stingressos.com.br/", status: "upcoming" },
];

function isPast(show: Show) {
  return new Date(show.date).getTime() < Date.now() - 6 * 60 * 60 * 1000;
}

export function getUpcomingShows(): Show[] {
  return SHOWS.filter((s) => !isPast(s)).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}
export function getPastShows(): Show[] {
  return SHOWS.filter(isPast).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
export function getShowsByArtist(slug: ArtistSlug): Show[] {
  return SHOWS.filter((s) => s.artistSlug === slug).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
