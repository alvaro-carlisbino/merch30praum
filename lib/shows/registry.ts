import type { ArtistSlug } from "@/lib/artists/types";

export type ShowStatus = "upcoming" | "soldout" | "past" | "tba";

export type Show = {
  id: string;
  artistSlug: ArtistSlug;
  date: string; // ISO
  city: string;
  state: string;
  venue: string;
  event?: string; // ex: "Plantão Festival", "Rock in Rio", "Festival X"
  ticketsUrl?: string;
  status: ShowStatus;
  note?: string; // ex: "set especial", "convidado de X"
};

export const SHOWS: Show[] = [
  // Plantão 2026 — 25 abril (todos juntos)
  {
    id: "plantao-2026-matue",
    artistSlug: "matue",
    date: "2026-04-25T20:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2026",
    ticketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    status: "upcoming",
    note: "Headliner · XTRANHO ao vivo",
  },
  {
    id: "plantao-2026-teto-wiu",
    artistSlug: "teto",
    date: "2026-04-25T19:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2026",
    ticketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    status: "upcoming",
    note: "Colapso Global · com Wiu",
  },
  {
    id: "plantao-2026-wiu",
    artistSlug: "wiu",
    date: "2026-04-25T19:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2026",
    ticketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    status: "upcoming",
    note: "Colapso Global · com Teto",
  },
  {
    id: "plantao-2026-brandao",
    artistSlug: "brandao",
    date: "2026-04-25T18:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2026",
    ticketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    status: "upcoming",
    note: "Isso é Trap Vol.02",
  },

  // Outros shows próximos
  {
    id: "matue-rio-2026-05",
    artistSlug: "matue",
    date: "2026-05-17T22:00:00-03:00",
    city: "Rio de Janeiro",
    state: "RJ",
    venue: "Jeunesse Arena",
    event: "XTRANHO Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "matue-sp-2026-05",
    artistSlug: "matue",
    date: "2026-05-24T22:00:00-03:00",
    city: "São Paulo",
    state: "SP",
    venue: "Allianz Parque",
    event: "XTRANHO Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "soldout",
  },
  {
    id: "matue-bh-2026-06",
    artistSlug: "matue",
    date: "2026-06-07T21:00:00-03:00",
    city: "Belo Horizonte",
    state: "MG",
    venue: "Mineirão",
    event: "XTRANHO Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "matue-bsb-2026-06",
    artistSlug: "matue",
    date: "2026-06-21T21:00:00-03:00",
    city: "Brasília",
    state: "DF",
    venue: "Arena BRB",
    event: "XTRANHO Tour",
    status: "upcoming",
  },

  // Teto + Wiu (Colapso Global tour)
  {
    id: "teto-wiu-sp-2026-06",
    artistSlug: "teto",
    date: "2026-06-14T21:00:00-03:00",
    city: "São Paulo",
    state: "SP",
    venue: "Vibra São Paulo",
    event: "Colapso Global Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "wiu-teto-sp-2026-06",
    artistSlug: "wiu",
    date: "2026-06-14T21:00:00-03:00",
    city: "São Paulo",
    state: "SP",
    venue: "Vibra São Paulo",
    event: "Colapso Global Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "teto-wiu-poa-2026-07",
    artistSlug: "teto",
    date: "2026-07-12T21:00:00-03:00",
    city: "Porto Alegre",
    state: "RS",
    venue: "Pepsi On Stage",
    event: "Colapso Global Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "wiu-teto-poa-2026-07",
    artistSlug: "wiu",
    date: "2026-07-12T21:00:00-03:00",
    city: "Porto Alegre",
    state: "RS",
    venue: "Pepsi On Stage",
    event: "Colapso Global Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },

  // Brandão85 — primeiro tour
  {
    id: "brandao-sp-2026-05",
    artistSlug: "brandao",
    date: "2026-05-30T22:00:00-03:00",
    city: "São Paulo",
    state: "SP",
    venue: "Audio",
    event: "Isso é Trap Vol.02 Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "brandao-rio-2026-06",
    artistSlug: "brandao",
    date: "2026-06-13T22:00:00-03:00",
    city: "Rio de Janeiro",
    state: "RJ",
    venue: "Qualistage",
    event: "Isso é Trap Vol.02 Tour",
    ticketsUrl: "https://eventim.com.br",
    status: "upcoming",
  },
  {
    id: "brandao-rec-2026-07",
    artistSlug: "brandao",
    date: "2026-07-19T21:00:00-03:00",
    city: "Recife",
    state: "PE",
    venue: "Classic Hall",
    event: "Isso é Trap Vol.02 Tour",
    status: "tba",
  },

  // Internacional
  {
    id: "matue-lisboa-2026-09",
    artistSlug: "matue",
    date: "2026-09-12T21:00:00+01:00",
    city: "Lisboa",
    state: "PT",
    venue: "Sagres Campo Pequeno",
    event: "XTRANHO Tour · Europa",
    status: "upcoming",
  },

  // Shows passados (selecionados — pra mostrar histórico)
  {
    id: "matue-rir-2024",
    artistSlug: "matue",
    date: "2024-09-15T22:30:00-03:00",
    city: "Brasília",
    state: "DF",
    venue: "Parque Granja do Torto",
    event: "Rock in Rio Brasília 2024",
    status: "past",
  },
  {
    id: "plantao-2024-all",
    artistSlug: "matue",
    date: "2024-04-20T20:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2024",
    status: "past",
    note: "30 mil pessoas presenciais",
  },
  {
    id: "plantao-2025-all",
    artistSlug: "matue",
    date: "2025-04-26T20:00:00-03:00",
    city: "Fortaleza",
    state: "CE",
    venue: "Marina Park",
    event: "Plantão Festival 2025",
    status: "past",
    note: "500 mil online no YouTube",
  },
];

export function getUpcomingShows(): Show[] {
  return SHOWS.filter((s) => s.status !== "past").sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getPastShows(): Show[] {
  return SHOWS.filter((s) => s.status === "past").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getShowsByArtist(slug: ArtistSlug): Show[] {
  return SHOWS.filter((s) => s.artistSlug === slug).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
