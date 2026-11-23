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
    slug: "teto-cada-passo-deixa-o-sol-entrar",
    title: "Teto lança Cada Passo e Deixa o Sol Entrar",
    excerpt: "Dois lançamentos na mesma semana, com Kevn_Black, Alee e IZA.",
    heroImage: "/singles/cada-passo.webp",
    publishedAt: "2026-11-21T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["teto"],
    body: [
      "Deixa o Sol Entrar, com IZA, saiu em 19 de novembro. Dois dias depois veio Cada Passo, com Kevn_Black e Alee.",
    ],
  },
  {
    slug: "brandao85-qual-foi",
    title: "Brandão85 lança QUAL FOI?!",
    excerpt: "É o terceiro single dele em novembro.",
    heroImage: "/singles/qual-foi.webp",
    publishedAt: "2026-11-19T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    body: [
      "QUAL FOI?! saiu em 19 de novembro, depois de HIGH (5) e AINDA SOU O MESMO? (12).",
    ],
  },
  {
    slug: "wiu-odeio-te-amar-lou-garcia",
    title: "Wiu e Lou Garcia lançam ODEIO TE AMAR",
    excerpt: "A faixa chegou dez dias depois de Piranguera.",
    heroImage: "/singles/odeio-te-amar.webp",
    publishedAt: "2026-11-13T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["wiu"],
    body: [
      "ODEIO TE AMAR, de Lou Garcia e Wiu, saiu em 13 de novembro.",
    ],
  },
  {
    slug: "wiu-grammy-latino-tropicoqueta",
    title: "Wiu celebra Grammy Latino com Tropicoqueta, de Karol G",
    excerpt: "Wiu é coautor de Bandida Entrenada, faixa do álbum premiado.",
    heroImage: "/figma-home/hero-wiu-v2.jpg",
    publishedAt: "2026-11-12T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["industria"],
    relatedArtists: ["wiu"],
    body: [
      "Tropicoqueta, de Karol G, venceu Melhor Álbum de Música Urbana no Grammy Latino. Wiu assina a composição de Bandida Entrenada, uma das faixas do disco.",
    ],
  },
  {
    slug: "wiu-piranguera",
    title: "Wiu lança Piranguera",
    excerpt: "Primeiro single solo dele desde janeiro de 2025.",
    heroImage: "/figma-home/hero-wiu-v2.jpg",
    publishedAt: "2026-11-03T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["wiu"],
    body: [
      "Piranguera saiu em 3 de novembro. A faixa é inspirada na noite de Fortaleza e é o primeiro single solo do Wiu desde janeiro de 2025.",
    ],
  },
  {
    slug: "matue-mundo-fashion-tz-da-coronel",
    title: "Matuê participa de Mundo Fashion, com TZ da Coronel",
    excerpt: "A faixa antecipa o álbum Lado Mau.",
    heroImage: "/figma-home/hero-matue-v2.jpg",
    publishedAt: "2026-10-21T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["matue"],
    body: [
      "Mundo Fashion, de TZ da Coronel com participação do Matuê, saiu em 21 de outubro e antecipa o álbum Lado Mau.",
    ],
  },
  {
    slug: "matue-rabanne-1-million-black",
    title: "Matuê é o novo embaixador de 1 Million Black, da Rabanne",
    excerpt: "O anúncio veio com apresentação na semana de moda de Paris.",
    heroImage: "/figma-home/hero-matue-v2.jpg",
    publishedAt: "2026-10-06T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["parceria"],
    relatedArtists: ["matue"],
    body: [
      "A Rabanne anunciou Matuê como embaixador da fragrância 1 Million Black, com apresentação durante a semana de moda de Paris.",
    ],
  },
  {
    slug: "brandao85-100-milhoes-isso-e-trap-vol-2",
    title: "Isso É Trap Vol. 2 passa de 100 milhões de plays",
    excerpt:
      "Menos de seis meses depois do lançamento, a mixtape do Brandão85 cruzou a marca no Spotify Brasil.",
    heroImage: "/assets/covers/japones_warzone-v2.jpg",
    publishedAt: "2026-09-16T10:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    relatedReleases: ["isso-e-trap-vol-2"],
    body: [
      "Isso É Trap Vol. 2 saiu em 15 de abril e passou de 100 milhões de plays no Spotify Brasil antes de completar seis meses. Veio depois de CEO (2024) e de Isso É Trap (2025).",
      "São catorze faixas. JAPONÊS tem participação do Matuê e ROCKSTAR, da Desiree.",
    ],
  },
  {
    slug: "matue-palco-mundo-rock-in-rio-lisboa",
    title: "Matuê é o primeiro rapper brasileiro no Palco Mundo do Rock in Rio Lisboa",
    excerpt: "O show foi em 28 de junho, no palco principal do festival.",
    heroImage: "/figma-home/hero-matue-v2.jpg",
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
      "Teto e Wiu levaram Colapso Global pro palco. A edição de 2024 teve quase 500 mil espectadores únicos na transmissão.",
    ],
  },
  {
    slug: "isso-e-trap-vol-2-lancamento",
    title: "Brandão85 lança Isso É Trap Vol. 2",
    excerpt: "Catorze faixas, com Matuê em JAPONÊS. Continuação da mixtape de 2025.",
    heroImage: "/assets/covers/japones_warzone-v2.jpg",
    publishedAt: "2026-04-15T12:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    relatedReleases: ["isso-e-trap-vol-2"],
    body: [
      "Isso É Trap Vol. 2 está nas plataformas. É a continuação da mixtape que o Brandão85 lançou em 2025. Antes dela, ele já tinha lançado CEO pela 30praum, em 2024.",
      "O disco tem catorze faixas e 37 minutos. As participações são de Matuê, em JAPONÊS, e Desiree, em ROCKSTAR.",
    ],
  },
  {
    slug: "colapso-global-teto-wiu",
    title: "Teto e Wiu lançam Colapso Global",
    excerpt: "O disco a quatro mãos estreou no top 10 global do Spotify.",
    heroImage: "/assets/covers/colapso_global-v2.jpg",
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
    heroImage: "/assets/covers/xtranho-v2.jpg",
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
