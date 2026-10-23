export type NewsTag =
  | "lancamento"
  | "plantao"
  | "parceria"
  | "industria"
  | "bastidores"
  | "incubadora"
  | "holding";
export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  heroImage: string;
  publishedAt: string;
  author: string;
  tags: NewsTag[];
  relatedArtists?: string[];
  relatedReleases?: string[];
};
export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "brandao85-100-milhoes-isso-e-trap-vol-2",
    title: "Isso É Trap Vol. 2 passa de 100 milhões de plays",
    excerpt:
      "Menos de seis meses depois do lançamento, a mixtape do Brandão85 cruzou a marca no Spotify.",
    heroImage: "/assets/covers/japones_warzone.jpg",
    publishedAt: "2026-09-16T10:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    relatedReleases: ["isso-e-trap-vol-2"],
    body: [
      "Isso É Trap Vol. 2 saiu em 15 de abril e passou de 100 milhões de plays no Spotify antes de completar seis meses. É o primeiro projeto longo do Brandão85 desde que ele assinou com a 30praum, em setembro de 2024.",
      "São catorze faixas. JAPONÊS tem participação do Matuê e ROCKSTAR, da Desiree.",
    ],
  },
  {
    slug: "matue-palco-mundo-rock-in-rio-lisboa",
    title: "Matuê é o primeiro rapper brasileiro no Palco Mundo do Rock in Rio Lisboa",
    excerpt: "O show foi em 28 de junho, no palco principal do festival.",
    heroImage: "/figma-home/hero-matue.jpg",
    publishedAt: "2026-06-29T09:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["matue"],
    relatedReleases: ["xtranho"],
    body: [
      "Em 28 de junho de 2026, Matuê tocou no Palco Mundo do Rock in Rio Lisboa. Foi a primeira vez que um rapper brasileiro se apresentou no palco principal da edição portuguesa do festival.",
      "Um ano antes, em junho de 2025, ele já tinha levado a turnê do 333 para a MEO Arena, também em Lisboa.",
    ],
  },
  {
    slug: "plantao-2026-dez-anos",
    title: "Plantão 2026 marca os 10 anos da 30praum",
    excerpt:
      "A terceira edição do festival foi em 25 de abril, no Marina Park, em Fortaleza.",
    heroImage: "/figma-plantao/crowd-2026.jpg",
    publishedAt: "2026-04-26T09:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["plantao"],
    relatedArtists: ["matue", "teto", "wiu", "brandao"],
    body: [
      "O Plantão voltou ao Marina Park em 25 de abril para a terceira edição, a dos dez anos da gravadora. Matuê, Teto, Wiu e Brandão85 dividiram a programação com BK', Ajuliacosta, Alee, Ryu, The Runner, Recayd Mob e TZ da Coronel. Brandão convidou Jovem Dex e Leviano.",
      "Teto e Wiu levaram Colapso Global pro palco. As duas edições anteriores tinham reunido cerca de 20 mil pessoas cada, e a transmissão de 2025 passou de 500 mil espectadores únicos.",
    ],
  },
  {
    slug: "isso-e-trap-vol-2-lancamento",
    title: "Brandão85 lança Isso É Trap Vol. 2",
    excerpt: "Catorze faixas, com Matuê em JAPONÊS. Continuação da mixtape de 2022.",
    heroImage: "/assets/covers/japones_warzone.jpg",
    publishedAt: "2026-04-15T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    relatedReleases: ["isso-e-trap-vol-2"],
    body: [
      "Isso É Trap Vol. 2 está nas plataformas. É a continuação da mixtape que o Brandão85 lançou em 2022 e o primeiro projeto longo dele pela 30praum.",
      "O disco tem catorze faixas e 37 minutos. As participações são de Matuê, em JAPONÊS, e Desiree, em ROCKSTAR.",
    ],
  },
  {
    slug: "colapso-global-teto-wiu",
    title: "Teto e Wiu lançam Colapso Global",
    excerpt: "O disco a quatro mãos estreou no top 10 global do Spotify.",
    heroImage: "/assets/covers/colapso_global.jpg",
    publishedAt: "2026-01-27T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["teto", "wiu"],
    relatedReleases: ["colapso-global"],
    body: [
      "Colapso Global saiu em 27 de janeiro. São onze faixas e 33 minutos, com participações de Deekapz, Franco, The Sir!, Mirella Costa, Yuri Redicopa, Melissa Hartman, Don L e Lamar.",
      "O disco é trap na base, mas passa por house, jazz, bossa nova e funk carioca. Na semana de lançamento, entrou no top 10 global do Spotify.",
    ],
  },
  {
    slug: "xtranho-matue-lancamento",
    title: "Matuê lança XTRANHO com audição aberta no Anhangabaú",
    excerpt: "O terceiro álbum do Matuê saiu em 10 de dezembro, com treze faixas.",
    heroImage: "/assets/covers/xtranho.jpg",
    publishedAt: "2025-12-10T09:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["matue"],
    relatedReleases: ["xtranho"],
    body: [
      "XTRANHO chegou às plataformas em 10 de dezembro de 2025, com uma audição gratuita no Vale do Anhangabaú, em São Paulo. É o terceiro álbum do Matuê, depois de Máquina do Tempo (2020) e 333 (2024).",
      "O disco foi feito em cerca de quatro meses, num acampamento criativo com músicos, produtores e designers. Tem participações de kouth, Cashley, N.A.N.A., FAB GODAMN, okie, Phl Notunrboy, LPT Zlatan e Brandão85.",
    ],
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}
export function getLatestNews(count = 4): NewsPost[] {
  return [...NEWS_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
export function getNewsByTag(tag: NewsTag): NewsPost[] {
  return NEWS_POSTS.filter((p) => p.tags.includes(tag)).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
