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
  body: string[]; // parágrafos
  heroImage: string;
  publishedAt: string; // ISO
  author: string;
  tags: NewsTag[];
  relatedArtists?: string[]; // slugs
  relatedReleases?: string[]; // slugs
};

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "30praum-lanca-site-oficial",
    title: "30praum estreia plataforma oficial — gravadora, festival e holding em um só endereço",
    excerpt:
      "Depois de 10 anos operando com loja de merch isolada, a gravadora cearense estreia hub digital que reúne roster, Plantão Festival, parcerias e incubadora.",
    heroImage: "https://picsum.photos/seed/news-site-launch/2400/1200",
    publishedAt: "2026-05-11T09:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["holding", "industria"],
    body: [
      "Há uma década a 30praum opera nas sombras — descentralizada, autoral, sem porta de entrada digital. Tinha merch. Tinha festival. Tinha parceria com Renner, Raw, Kenner, Ed Hardy. Tinha um canal no YouTube com meio milhão de espectadores. Não tinha um endereço.",
      "Agora tem. 30praum.com é a plataforma oficial da holding — onde a gravadora, o Plantão Festival, os negócios e a incubadora se encontram pela primeira vez no mesmo lugar. Aqui dentro: o roster (Matuê, Teto, Wiu, Brandão85), o catálogo de releases, a agenda de shows, os cases de parceria, o press kit aberto pra imprensa, e o canal de submissão de demos da incubadora.",
      "Não é um portfólio. É uma cena se organizando.",
    ],
  },
  {
    slug: "plantao-2026-lineup-completo",
    title: "Plantão 2026 anuncia lineup completo — Matuê, Teto, Wiu, Brandão85, BK', Recayd Mob e mais",
    excerpt:
      "A 3ª edição marca os 10 anos da 30praum. Sábado 25 de abril, Marina Park, Fortaleza. Ingressos a partir de R$150.",
    heroImage: "https://picsum.photos/seed/news-plantao-lineup/2400/1200",
    publishedAt: "2026-03-04T10:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["plantao"],
    relatedArtists: ["matue", "teto", "wiu", "brandao"],
    body: [
      "O Plantão volta. Pelo terceiro ano. Agora marcando os 10 anos da 30praum. Sábado, 25 de abril, na Marina Park, Fortaleza — sob a Beira-Mar.",
      "Lineup confirmado: Matuê (XTRANHO ao vivo na íntegra), Teto e Wiu (show especial Colapso Global), Brandão85 (Isso é Trap Vol.02), BK' como convidado especial, Recayd Mob, TZ da Coronel, Ajulliacosta, Alee, Ryu The Runner e DJ Thales na abertura.",
      "Setores: Front Boladão (esgotado), Front (R$150–300), VIP (R$350–655 com banheiro e alimentação inclusos) e Camarote 30praum em breve. Transmissão oficial no YouTube da 30praum — a última edição reuniu quase 500 mil espectadores únicos.",
    ],
  },
  {
    slug: "30praum-anuncia-distribuidora-propria-2026",
    title: "30praum confirma distribuidora própria em 2026 — independência total da cadeia",
    excerpt:
      "Depois de anos de operação independente, a gravadora fundada por Matuê e Clara Mendes verticaliza distribuição e fecha o ciclo de autonomia.",
    heroImage: "https://picsum.photos/seed/news-distribuidora/2400/1200",
    publishedAt: "2026-02-10T11:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["industria", "holding"],
    body: [
      "A 30praum opera de forma 100% independente desde 2024. O EP Sabor Overdose no Yakisoba e o álbum 333 do Matuê (950 milhões de streams) já saíram nesse novo modelo — sem licenciamento, sem intermediário.",
      "Agora vem o próximo capítulo. A gravadora cearense confirma o lançamento da própria distribuidora em 2026 — fechando a cadeia: descoberta, gravação, lançamento, mercado.",
      "É a primeira vez que uma label independente do Nordeste verticaliza toda a operação. 'A 30praum foi de 30 pra um. Agora controla cada link da rede', resumiu Matuê em comunicado interno.",
    ],
  },
  {
    slug: "sabor-matue-geladinho-em-breve",
    title: "Sabor Matuê: a aposta da 30praum em food & beverage começa em 2026",
    excerpt:
      "O que começou como referência cultural no EP do Matuê vira a primeira frente FMCG da holding. Linha de geladinhos premium chega ao verão.",
    heroImage: "https://picsum.photos/seed/news-sabor/2400/1200",
    publishedAt: "2026-01-22T14:30:00-03:00",
    author: "Editorial 30praum",
    tags: ["holding", "parceria"],
    body: [
      "Em agosto de 2024 Matuê soltou o EP Sabor Overdose no Yakisoba. Um título que virou meme, virou estampa, virou conceito. Agora vira produto.",
      "A holding 30praum confirma Sabor Matuê como sua primeira frente FMCG — uma linha de geladinhos premium em parceria com uma indústria food alimentar com sede em Fortaleza. Lançamento previsto pro verão 2026/27, distribuição inicial Norte/Nordeste, expansão Brasil no ano seguinte.",
      "É o primeiro spin-off da holding fora do entretenimento. Não é o último.",
    ],
  },
  {
    slug: "30praum-incubadora-aberta",
    title: "Incubadora 30praum abre submissões públicas pela primeira vez",
    excerpt:
      "Programa busca artistas de trap, rap e hip-hop com identidade própria. Submissão é via Spotify/SoundCloud no novo formulário oficial.",
    heroImage: "https://picsum.photos/seed/news-incubadora/2400/1200",
    publishedAt: "2026-05-11T08:00:00-03:00",
    author: "A&R 30praum",
    tags: ["incubadora"],
    body: [
      "Brandão85 entrou em 2024 e em dois anos tava na capa do Plantão. Antes dele, Wiu (que era beatmaker) virou voz. Teto chegou de Jacobina-BA gravando no quarto.",
      "A 30praum sempre foi incubadora — só não tinha porta. A partir de hoje tem. O programa abre submissões públicas no site oficial: artista entra em /incubadora/submeter, manda Spotify/SoundCloud, conta uma história curta — e o A&R da casa recebe na hora.",
      "Não é talent show. Não é prova. Não tem inscrição. É um canal honesto pra quem tem som e quer ser ouvido pelo selo que escolhe artista por visão artística, não por hype.",
    ],
  },
  {
    slug: "matue-333-950-milhoes-streams",
    title: "333 ultrapassa 950 milhões de reproduções — Matuê quebra recorde do rap nacional",
    excerpt:
      "Lançado de forma independente em 2024, o terceiro álbum do Matuê coloca a 30praum entre os selos mais ouvidos do Spotify Brasil.",
    heroImage: "https://picsum.photos/seed/news-333/2400/1200",
    publishedAt: "2025-11-08T16:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento", "industria"],
    relatedArtists: ["matue"],
    body: [
      "Quando Matuê lançou 333 em julho de 2024 — primeiro álbum totalmente independente — ninguém apostava 950 milhões. Apostavam meio bilhão, talvez. O número estourou.",
      "O álbum integra agora a lista seleta de discos de rap brasileiros com maior volume de streaming na história do Spotify BR. E sustenta seis das maiores estreias do rap nacional na plataforma — todas de Matuê.",
      "É o disco que provou que independência não é teto. É chão.",
    ],
  },
  {
    slug: "renner-30praum-colecao-confirmada",
    title: "Renner × 30praum: colaboração permanente é confirmada após sucesso da primeira coleção",
    excerpt:
      "Drop com Matuê, Teto e Wiu esgotou em 48h. Varejista assina parceria estendida com a gravadora — peças desenhadas em cocriação com os artistas.",
    heroImage: "https://picsum.photos/seed/news-renner/2400/1200",
    publishedAt: "2025-08-15T10:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["parceria", "holding"],
    body: [
      "A primeira cápsula Renner × 30praum chegou em 2024 — peças desenhadas em conjunto com Matuê, Teto e Wiu, refletindo o DNA de cada um. Esgotou em 48 horas em todas as lojas físicas e e-commerce.",
      "Agora vira parceria permanente. A Renner confirma colaboração estendida com a 30praum por dois anos, com drops sazonais a cada coleção (verão, outono, inverno, primavera) e edições especiais ligadas a momentos como o Plantão Festival e lançamentos de álbum.",
      "É a segunda parceria estratégica da holding com varejistas de moda — depois da Ed Hardy by Matuê. Próximas em pipeline: Raw e Kenner.",
    ],
  },
  {
    slug: "brandao85-isso-e-trap-vol2-warzone",
    title: "Brandão85 solta WARZONE — primeiro single oficial de Isso é Trap Vol.02",
    excerpt:
      "Após cocriar faixas de 333 com Matuê, Brandão85 estreia em formato álbum solo no selo. Single chega antes do disco.",
    heroImage: "https://picsum.photos/seed/news-warzone/2400/1200",
    publishedAt: "2025-12-12T19:00:00-03:00",
    author: "Editorial 30praum",
    tags: ["lancamento"],
    relatedArtists: ["brandao"],
    body: [
      "Quando Brandão85 saiu da Hash em 2024 e foi anunciado oficialmente como artista 30praum, todo mundo esperou o álbum. Demorou um ano e meio.",
      "Vale a espera: WARZONE é o primeiro single oficial de Isso é Trap Vol.02 — segundo álbum solo do cearense desde a estreia com CEO em 2024.",
      "Co-produção do próprio Brandão e Drakoz. Estreia no Spotify Brasil entre os 10 mais ouvidos do dia. Vol.02 sai completo em 2026.",
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
