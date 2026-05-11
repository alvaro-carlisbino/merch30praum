export type SaborFlavor = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accent: string;
  image: string;
  inspirationTrack?: string; // música que inspirou
  status: "coming-soon" | "available" | "limited";
};

export const SABOR_MATUE = {
  brandName: "Sabor Matuê",
  tagline: "Geladinho premium · primeira frente FMCG da holding 30praum",
  launchYear: 2027,
  origin: "Fortaleza · CE",
  manifesto: [
    "O nome veio do EP. 'Sabor Overdose no Yakisoba' — lançado em 2024, último trabalho do Matuê antes da independência total da 30praum. Virou meme. Virou estampa. Virou conceito.",
    "Agora vira produto. Sabor Matuê é a primeira frente FMCG da holding 30praum — uma linha de geladinhos premium fabricada em Fortaleza, com ingredientes selecionados e identidade visual desenhada faixa a faixa.",
    "Cada sabor é referência a uma música. Cada embalagem carrega o ID do drop. É comida-cultura. É underground saindo do freezer.",
  ],
  productLine: [
    {
      slug: "rei-tue",
      name: "REI TUÊ",
      tagline: "Coco com leite condensado e raspas de limão siciliano",
      description:
        "Cremoso. Régio. Inspirado na faixa de abertura do XTRANHO — a base é coco fresco do Ceará e o toque cítrico do siciliano corta o doce na hora certa.",
      color: "#f5e9c8",
      accent: "#1f6bff",
      image: "https://picsum.photos/seed/sabor-rei-tue/900/1200",
      inspirationTrack: "REI TUÊ — Matuê (XTRANHO, 2025)",
      status: "coming-soon" as const,
    },
    {
      slug: "vampiro",
      name: "VAMPIRO",
      tagline: "Frutas vermelhas, hibisco e gota de pimenta rosa",
      description:
        "Sangue na embalagem. Hibisco com framboesa, mirtilo e morango da serra cearense. Pimenta rosa pra dar o toque sombrio. Pra quem prefere noite.",
      color: "#5a0e1a",
      accent: "#b71c2c",
      image: "https://picsum.photos/seed/sabor-vampiro/900/1200",
      inspirationTrack: "Vampiro — Matuê (Máquina do Tempo, 2020)",
      status: "coming-soon" as const,
    },
    {
      slug: "333",
      name: "333",
      tagline: "Chocolate belga 70% com flor de sal",
      description:
        "Trilogia matuá em forma de chocolate. Cacau belga 70%, flor de sal e uma camada fina de caramelo salgado. O sabor que bateu 950 milhões em forma de geladinho.",
      color: "#1c0a05",
      accent: "#c9a36b",
      image: "https://picsum.photos/seed/sabor-333/900/1200",
      inspirationTrack: "333 — Matuê (333, 2024)",
      status: "coming-soon" as const,
    },
    {
      slug: "icone-fashion",
      name: "ÍCONE FASHION",
      tagline: "Pistache com manjericão e raspas de chocolate branco",
      description:
        "O sabor verde-claro do XTRANHO. Pistache iraniano, manjericão fresco do interior cearense e raspas finas de chocolate branco belga. Decadente sem ser óbvio.",
      color: "#d4e9c3",
      accent: "#7faa49",
      image: "https://picsum.photos/seed/sabor-icone/900/1200",
      inspirationTrack: "ÍCONE FASHION — Matuê (XTRANHO, 2025)",
      status: "coming-soon" as const,
    },
    {
      slug: "maquina-do-tempo",
      name: "MÁQUINA DO TEMPO",
      tagline: "Brigadeiro de paçoca com flor de sal e bourbon",
      description:
        "Edição limitada de aniversário — uma releitura do mais nordeste possível. Paçoca artesanal, brigadeiro pra mata o doce e bourbon americano pra fechar a fórmula.",
      color: "#a87246",
      accent: "#3d1f0e",
      image: "https://picsum.photos/seed/sabor-maquina/900/1200",
      inspirationTrack: "Máquina do Tempo — Matuê (2020)",
      status: "limited" as const,
    },
  ] satisfies SaborFlavor[],
  distribution: {
    phase1: { label: "Verão 26/27", region: "Norte/Nordeste", channels: ["Loja oficial 30praum", "Festivais", "Pop-up stores"] },
    phase2: { label: "Outono 27", region: "Brasil completo", channels: ["Mercados premium", "Delivery especializado", "E-commerce próprio"] },
    phase3: { label: "2028", region: "Internacional (LATAM + Lisboa)", channels: ["Distribuidores parceiros", "Eventos 30praum"] },
  },
  partnerNote:
    "Produzido em parceria com fábrica cearense de gelados premium. Sem aditivos. Sem corante artificial. Ingredientes da Serra de Baturité e do litoral do Ceará.",
};
