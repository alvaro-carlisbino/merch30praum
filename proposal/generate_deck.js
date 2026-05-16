/**
 * Deck de pitch comercial pra 30praum.
 * 10 slides · 16:9 widescreen · estilo dark/red (Plantão) sandwich.
 *
 * Gerar:
 *   node generate_deck.js
 *
 * Output: 30praum-pitch-deck.pptx
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

// ─────────────────────────────────────────────────────────
// TOKENS DE DESIGN
// ─────────────────────────────────────────────────────────
const C = {
  ink: "0A0A0A",
  inkSoft: "3A3A3A",
  muted: "7A7A7A",
  rule: "DEDEDE",
  bg: "FFFFFF",
  bgSoft: "F5F4F1",
  bgDark: "0A0A0A",
  accent: "D12D3F", // vermelho Plantão dessaturado
  accentSoft: "F8E5E8",
  green: "2F7D4F",
  amber: "B8731A",
  white: "FFFFFF",
  ice: "C4C4C4",
};

const F = {
  display: "Arial Black",
  body: "Helvetica",
  mono: "Courier",
};

// Layout 16:9 (10" × 5.625")
const W = 10;
const H = 5.625;
const MARGIN = 0.5;

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────

function addChrome(slide, pageNum, total) {
  // Top rule line + brand strip
  slide.addText("30PRAUM · PITCH COMERCIAL", {
    x: MARGIN,
    y: 0.18,
    w: 4,
    h: 0.2,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    charSpacing: 1.5,
  });
  slide.addText(`${pageNum} / ${total}  ·  v1 · MAI 2026 · CONFIDENCIAL`, {
    x: W - MARGIN - 4,
    y: 0.18,
    w: 4,
    h: 0.2,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    align: "right",
    charSpacing: 1.5,
  });
  // Linha horizontal
  slide.addShape("line", {
    x: MARGIN,
    y: 0.45,
    w: W - 2 * MARGIN,
    h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  // Footer
  slide.addText("Software house · Alvaro Carlisbino · Documento confidencial", {
    x: MARGIN,
    y: H - 0.35,
    w: 6,
    h: 0.2,
    fontFace: F.body,
    fontSize: 7,
    bold: true,
    color: C.muted,
    charSpacing: 1.2,
  });
}

function addSectionTitle(slide, num, eyebrow, title) {
  slide.addText(`${num} · ${eyebrow}`, {
    x: MARGIN,
    y: 0.7,
    w: W - 2 * MARGIN,
    h: 0.25,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.accent,
    charSpacing: 2.5,
  });
  slide.addText(title, {
    x: MARGIN,
    y: 1.0,
    w: W - 2 * MARGIN,
    h: 0.9,
    fontFace: F.display,
    fontSize: 30,
    bold: true,
    color: C.ink,
    valign: "top",
  });
  slide.addShape("rect", {
    x: MARGIN,
    y: 1.95,
    w: W - 2 * MARGIN,
    h: 0.018,
    fill: { color: C.ink },
    line: { color: C.ink, width: 0 },
  });
}

// ─────────────────────────────────────────────────────────
// SLIDES
// ─────────────────────────────────────────────────────────

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 × 7.5 — vou redefinir pra 10x5.625
pres.defineLayout({ name: "16x9", width: W, height: H });
pres.layout = "16x9";
pres.title = "30praum — Pitch Comercial";
pres.author = "Alvaro Carlisbino";

// ═══════════════════════════════════════════════════════
// SLIDE 1 · CAPA (dark)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Faixa accent vertical à esquerda
  s.addShape("rect", {
    x: 0.5,
    y: 0,
    w: 0.06,
    h: H,
    fill: { color: C.accent },
    line: { color: C.accent, width: 0 },
  });

  // Eyebrow top
  s.addText("PROPOSTA COMERCIAL · PITCH", {
    x: 0.9,
    y: 0.4,
    w: 6,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.white,
    charSpacing: 3,
  });
  s.addText("v1 · MAIO 2026", {
    x: W - MARGIN - 3,
    y: 0.4,
    w: 3,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.ice,
    align: "right",
    charSpacing: 2,
  });

  // Brand massive
  s.addText("30PRAUM", {
    x: 0.9,
    y: 1.7,
    w: 8,
    h: 1.2,
    fontFace: F.display,
    fontSize: 72,
    bold: true,
    color: C.white,
    charSpacing: -1,
  });

  // Subtítulo
  s.addText("A plataforma digital pra próxima década da casa.", {
    x: 0.9,
    y: 2.9,
    w: 8,
    h: 0.5,
    fontFace: F.body,
    fontSize: 18,
    color: C.ice,
  });

  // Bottom dataline
  s.addShape("line", {
    x: 0.9,
    y: H - 1.4,
    w: 4,
    h: 0,
    line: { color: C.accent, width: 1.5 },
  });
  s.addText("APRESENTADO PARA", {
    x: 0.9,
    y: H - 1.2,
    w: 4,
    h: 0.2,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    charSpacing: 2,
  });
  s.addText("Clara Mendes · CEO 30praum  ·  Diretoria", {
    x: 0.9,
    y: H - 0.95,
    w: 6,
    h: 0.25,
    fontFace: F.body,
    fontSize: 11,
    color: C.white,
  });
  s.addText("APRESENTADO POR  ·  Alvaro Carlisbino · Founder", {
    x: 0.9,
    y: H - 0.55,
    w: 8,
    h: 0.2,
    fontFace: F.body,
    fontSize: 9,
    color: C.muted,
    charSpacing: 1,
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 2 · A DOR (quote grande)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 2, 10);

  s.addText("02 · O PROBLEMA", {
    x: MARGIN,
    y: 0.7,
    w: 8,
    h: 0.25,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.accent,
    charSpacing: 2.5,
  });

  // Stat gigante esquerda
  s.addText("4", {
    x: MARGIN,
    y: 1.4,
    w: 4.7,
    h: 1.6,
    fontFace: F.display,
    fontSize: 120,
    bold: true,
    color: C.accent,
    valign: "middle",
    charSpacing: -2,
  });
  s.addText("ferramentas desconectadas", {
    x: MARGIN,
    y: 3.1,
    w: 4.7,
    h: 0.4,
    fontFace: F.body,
    fontSize: 18,
    color: C.ink,
  });
  s.addText("pra rodar uma holding inteira.", {
    x: MARGIN,
    y: 3.55,
    w: 4.7,
    h: 0.4,
    fontFace: F.body,
    fontSize: 18,
    color: C.muted,
    italic: true,
  });

  // Quote direita
  s.addShape("rect", {
    x: 5.3,
    y: 1.4,
    w: 4.2,
    h: 3,
    fill: { color: C.bgSoft },
    line: { color: C.rule, width: 0.5 },
  });
  s.addShape("rect", {
    x: 5.3,
    y: 1.4,
    w: 0.06,
    h: 3,
    fill: { color: C.accent },
    line: { color: C.accent, width: 0 },
  });
  s.addText("Operação espalhada", {
    x: 5.55,
    y: 1.55,
    w: 3.85,
    h: 0.3,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    charSpacing: 2,
  });
  s.addText(
    [
      { text: "Shopify pra loja", options: { bold: true, color: C.ink, fontSize: 13, breakLine: true } },
      { text: "ST Ingressos pro Plantão (~8% taxa)", options: { bold: true, color: C.ink, fontSize: 13, breakLine: true } },
      { text: "Instagram DM pra SAC", options: { bold: true, color: C.ink, fontSize: 13, breakLine: true } },
      { text: "Planilha pra tudo o resto", options: { bold: true, color: C.ink, fontSize: 13, breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Nenhuma conversa entre si.", options: { italic: true, color: C.accent, fontSize: 13 } },
    ],
    {
      x: 5.55,
      y: 1.95,
      w: 3.85,
      h: 2.3,
      fontFace: F.body,
      paraSpaceAfter: 6,
    }
  );
}

// ═══════════════════════════════════════════════════════
// SLIDE 3 · O QUE A 30PRAUM JÁ É
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 3, 10);

  s.addText("03 · A 30PRAUM HOJE", {
    x: MARGIN,
    y: 0.7,
    w: 8,
    h: 0.25,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.accent,
    charSpacing: 2.5,
  });
  s.addText("A casa está pronta. A stack não.", {
    x: MARGIN,
    y: 1.0,
    w: W - 2 * MARGIN,
    h: 0.8,
    fontFace: F.display,
    fontSize: 28,
    bold: true,
    color: C.ink,
  });
  s.addShape("rect", {
    x: MARGIN,
    y: 1.95,
    w: W - 2 * MARGIN,
    h: 0.018,
    fill: { color: C.ink },
    line: { color: C.ink, width: 0 },
  });

  // 4 KPIs grandes
  const kpis = [
    { label: "STREAMS MATUÊ", value: "950M+", foot: "XTRANHO ainda subindo" },
    { label: "PÚBLICO PLANTÃO", value: "30 mil", foot: "Marina Park · Fortaleza" },
    { label: "ANOS DE OPERAÇÃO", value: "10", foot: "Fundada por Matuê + Clara" },
    { label: "ARTISTAS NO ROSTER", value: "4", foot: "Matuê · Wiu · Teto · Brandão85" },
  ];
  const kpiW = (W - 2 * MARGIN - 0.6) / 4;
  kpis.forEach((kpi, i) => {
    const x = MARGIN + i * (kpiW + 0.2);
    s.addShape("rect", {
      x,
      y: 2.4,
      w: kpiW,
      h: 2,
      fill: { color: C.bgSoft },
      line: { color: C.rule, width: 0.5 },
    });
    s.addText(kpi.label, {
      x: x + 0.2,
      y: 2.55,
      w: kpiW - 0.4,
      h: 0.25,
      fontFace: F.body,
      fontSize: 8,
      bold: true,
      color: C.muted,
      charSpacing: 1.5,
    });
    s.addText(kpi.value, {
      x: x + 0.15,
      y: 2.85,
      w: kpiW - 0.3,
      h: 0.85,
      fontFace: F.display,
      fontSize: 26,
      bold: true,
      color: C.ink,
      valign: "middle",
      charSpacing: -1,
    });
    s.addText(kpi.foot, {
      x: x + 0.2,
      y: 3.75,
      w: kpiW - 0.4,
      h: 0.55,
      fontFace: F.body,
      fontSize: 10,
      color: C.inkSoft,
    });
  });

  s.addText(
    "Vocês não precisam crescer. Vocês precisam de stack que aguente o tamanho que já têm.",
    {
      x: MARGIN,
      y: 4.7,
      w: W - 2 * MARGIN,
      h: 0.4,
      fontFace: F.body,
      fontSize: 13,
      italic: true,
      color: C.inkSoft,
      align: "center",
    }
  );
}

// ═══════════════════════════════════════════════════════
// SLIDE 4 · A PROPOSTA (4 frentes)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 4, 10);
  addSectionTitle(s, "04", "O QUE VAMOS CONSTRUIR", "Uma plataforma. Quatro frentes.");

  const frentes = [
    {
      n: "01",
      titulo: "Site 30praum.com",
      desc: "Vitrine, drops, álbuns, news — uma única superfície editorial sob domínio da casa.",
    },
    {
      n: "02",
      titulo: "Loja própria",
      desc: "Frontend e checkout sob controle. Shopify como ERP no backend.",
    },
    {
      n: "03",
      titulo: "Ingressos Plantão",
      desc: "Checkout próprio que substitui ST. Taxa cai de ~8% pra ~3%.",
    },
    {
      n: "04",
      titulo: "Painel + workflow",
      desc: "Admin pra time da 30praum operar drops, pedidos e news com aprovação multi-pessoa.",
    },
  ];
  const cardW = (W - 2 * MARGIN - 0.6) / 2;
  const cardH = 1.3;
  frentes.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * (cardW + 0.6);
    const y = 2.25 + row * (cardH + 0.4);
    s.addShape("rect", {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.bgSoft },
      line: { color: C.rule, width: 0.5 },
    });
    // Numero accent
    s.addText(f.n, {
      x: x + 0.2,
      y: y + 0.15,
      w: 0.6,
      h: 0.4,
      fontFace: F.display,
      fontSize: 18,
      bold: true,
      color: C.accent,
    });
    s.addText(f.titulo, {
      x: x + 0.85,
      y: y + 0.15,
      w: cardW - 1,
      h: 0.4,
      fontFace: F.display,
      fontSize: 14,
      bold: true,
      color: C.ink,
    });
    s.addText(f.desc, {
      x: x + 0.85,
      y: y + 0.6,
      w: cardW - 1,
      h: 0.6,
      fontFace: F.body,
      fontSize: 10,
      color: C.inkSoft,
    });
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 5 · COMO ENTREGAMOS (3 fases timeline)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 5, 10);
  addSectionTitle(s, "05", "COMO ENTREGAMOS", "Três fases. Cheques pequenos.");

  // Timeline visual horizontal — 3 fases
  const fases = [
    {
      n: "FASE 1",
      titulo: "Fundação",
      prazo: "60 dias",
      escopo: "Site + CMS + arquitetura drop",
      preco: "R$ 68.000",
    },
    {
      n: "FASE 2",
      titulo: "Plantão sem ST",
      prazo: "45 dias",
      escopo: "Checkout próprio + workflow",
      preco: "R$ 52.000",
    },
    {
      n: "FASE 3",
      titulo: "Blindagem",
      prazo: "30 dias",
      escopo: "LGPD + audit + segurança",
      preco: "R$ 28.000",
    },
  ];

  const faseW = (W - 2 * MARGIN - 0.6) / 3;
  fases.forEach((f, i) => {
    const x = MARGIN + i * (faseW + 0.3);
    const y = 2.3;
    // Numero gigante
    s.addText(f.n, {
      x,
      y,
      w: faseW,
      h: 0.3,
      fontFace: F.body,
      fontSize: 9,
      bold: true,
      color: C.accent,
      charSpacing: 2,
    });
    s.addText(f.titulo, {
      x,
      y: y + 0.3,
      w: faseW,
      h: 0.5,
      fontFace: F.display,
      fontSize: 22,
      bold: true,
      color: C.ink,
    });
    s.addShape("line", {
      x,
      y: y + 0.95,
      w: 1,
      h: 0,
      line: { color: C.accent, width: 1.5 },
    });
    s.addText(f.escopo, {
      x,
      y: y + 1.1,
      w: faseW,
      h: 0.6,
      fontFace: F.body,
      fontSize: 11,
      color: C.inkSoft,
    });
    s.addText(`Prazo: ${f.prazo}`, {
      x,
      y: y + 1.75,
      w: faseW,
      h: 0.3,
      fontFace: F.body,
      fontSize: 9,
      color: C.muted,
      charSpacing: 1,
    });
    s.addText(f.preco, {
      x,
      y: y + 2.1,
      w: faseW,
      h: 0.5,
      fontFace: F.display,
      fontSize: 24,
      bold: true,
      color: C.ink,
    });
  });

  // Total destacado
  s.addShape("rect", {
    x: MARGIN,
    y: 5.0,
    w: W - 2 * MARGIN,
    h: 0.5,
    fill: { color: C.ink },
    line: { color: C.ink, width: 0 },
  });
  s.addText("ENTREGA TOTAL", {
    x: MARGIN + 0.3,
    y: 5.05,
    w: 4,
    h: 0.4,
    fontFace: F.body,
    fontSize: 11,
    bold: true,
    color: C.white,
    charSpacing: 2,
    valign: "middle",
  });
  s.addText("R$ 148.000  ·  4 a 5 meses  ·  SLA R$ 28.000/mês (time fixo)", {
    x: MARGIN + 4,
    y: 5.05,
    w: W - 2 * MARGIN - 4.3,
    h: 0.4,
    fontFace: F.display,
    fontSize: 12,
    bold: true,
    color: C.white,
    valign: "middle",
    align: "right",
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 6 · TRÊS CAMINHOS DE PARCERIA
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 6, 10);
  addSectionTitle(s, "06", "TRÊS CAMINHOS", "Vocês escolhem o ritmo.");

  const cenarios = [
    ["P · Piloto pago", "90 dias · entrada pequena · perdem pouco", "R$ 48k", "R$ 7.5k"],
    ["G · Garantia — recomendado", "5 meses · money-back · time fixo no SLA", "R$ 148k", "R$ 28k"],
    ["E · Time embedded", "Sem entrega · Alvaro + Cauã fixos · escala", "—", "R$ 22-42k"],
  ];

  // Tabela
  const headers = ["PROPOSTA", "O QUE É", "ENTREGA", "MENSAL"];
  const colWidths = [2.8, 4.2, 1.2, 1.3];
  const startX = MARGIN;
  const startY = 2.3;
  const rowH = 0.7;

  // Header row
  let cx = startX;
  headers.forEach((h, i) => {
    s.addShape("rect", {
      x: cx,
      y: startY,
      w: colWidths[i],
      h: rowH,
      fill: { color: C.ink },
      line: { color: C.ink, width: 0 },
    });
    s.addText(h, {
      x: cx + 0.12,
      y: startY,
      w: colWidths[i] - 0.24,
      h: rowH,
      fontFace: F.body,
      fontSize: 9,
      bold: true,
      color: C.white,
      charSpacing: 1.5,
      valign: "middle",
    });
    cx += colWidths[i];
  });

  // Data rows
  cenarios.forEach((row, ri) => {
    const ry = startY + rowH + ri * rowH;
    const highlight = ri === 1; // Cenário B
    let rx = startX;
    row.forEach((cell, ci) => {
      s.addShape("rect", {
        x: rx,
        y: ry,
        w: colWidths[ci],
        h: rowH,
        fill: { color: highlight ? "FFEEC2" : ri % 2 === 0 ? C.bg : C.bgSoft },
        line: { color: C.rule, width: 0.3 },
      });
      s.addText(cell, {
        x: rx + 0.12,
        y: ry,
        w: colWidths[ci] - 0.24,
        h: rowH,
        fontFace: F.body,
        fontSize: 10,
        bold: ci === 0 || ci === 2 || ci === 3,
        color: C.ink,
        valign: "middle",
      });
      rx += colWidths[ci];
    });
  });

  s.addText(
    "SLA da Proposta G inclui salário fixo do time (Alvaro + Cauã) · não é hora de dev · é folha terceirizada.",
    {
      x: MARGIN,
      y: 4.85,
      w: W - 2 * MARGIN,
      h: 0.35,
      fontFace: F.body,
      fontSize: 10,
      italic: true,
      color: C.muted,
      align: "center",
    }
  );
}

// ═══════════════════════════════════════════════════════
// SLIDE 7 · O DINHEIRO (ROI)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 7, 10);
  addSectionTitle(s, "07", "O DINHEIRO", "Mais barato que contratar 2 internos.");

  // 2 colunas: stat grande esquerda + tabela direita
  // Esquerda · stat big
  s.addText("ECONOMIA VS CLT", {
    x: MARGIN,
    y: 2.4,
    w: 4,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.muted,
    charSpacing: 2,
  });
  s.addText("R$ 432k", {
    x: MARGIN,
    y: 2.7,
    w: 4.7,
    h: 1.3,
    fontFace: F.display,
    fontSize: 60,
    bold: true,
    color: C.accent,
    valign: "middle",
    charSpacing: -2,
  });
  s.addText("por ano vs 2 devs CLT", {
    x: MARGIN,
    y: 4.05,
    w: 4.7,
    h: 0.4,
    fontFace: F.body,
    fontSize: 18,
    color: C.ink,
  });
  s.addText("sem encargos, sem férias, sem rescisão", {
    x: MARGIN,
    y: 4.5,
    w: 4.7,
    h: 0.3,
    fontFace: F.body,
    fontSize: 12,
    color: C.muted,
    italic: true,
  });

  // Direita · mini tabela
  const tx = 5.4;
  const tw = W - MARGIN - tx;
  s.addText("CONTRATAR CLT vs SLA", {
    x: tx,
    y: 2.4,
    w: tw,
    h: 0.3,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.muted,
    charSpacing: 2,
  });

  const rows = [
    ["2 devs sêniores CLT/mês*", "R$ 64.000"],
    ["SLA Proposta G/mês", "R$ 28.000"],
    ["Diferença mensal", "–R$ 36.000"],
    ["Economia anual", "–R$ 432.000"],
  ];
  rows.forEach((r, i) => {
    const ry = 2.85 + i * 0.4;
    s.addText(r[0], {
      x: tx,
      y: ry,
      w: tw - 1.5,
      h: 0.35,
      fontFace: F.body,
      fontSize: 11,
      color: C.ink,
      valign: "middle",
    });
    s.addText(r[1], {
      x: tx + tw - 1.5,
      y: ry,
      w: 1.5,
      h: 0.35,
      fontFace: F.body,
      fontSize: 11,
      bold: true,
      color: r[1].startsWith("–") ? C.green : C.muted,
      valign: "middle",
      align: "right",
    });
    s.addShape("line", {
      x: tx,
      y: ry + 0.38,
      w: tw,
      h: 0,
      line: { color: C.rule, width: 0.3 },
    });
  });

  // Total destacado
  s.addShape("rect", {
    x: tx,
    y: 4.5,
    w: tw,
    h: 0.45,
    fill: { color: C.green },
    line: { color: C.green, width: 0 },
  });
  s.addText("ECONOMIA ANUAL EM EQUIPE", {
    x: tx + 0.15,
    y: 4.5,
    w: tw - 1.7,
    h: 0.45,
    fontFace: F.body,
    fontSize: 9,
    bold: true,
    color: C.white,
    charSpacing: 1.2,
    valign: "middle",
  });
  s.addText("R$ 432.000", {
    x: tx + tw - 1.7,
    y: 4.5,
    w: 1.6,
    h: 0.45,
    fontFace: F.display,
    fontSize: 14,
    bold: true,
    color: C.white,
    valign: "middle",
    align: "right",
  });

  // Footnote
  s.addText("* 2 devs sêniores em SP: R$ 18k salário + 80% encargos sociais = ~R$ 32k/mês cada. Soma R$ 64k/mês.", {
    x: MARGIN,
    y: H - 0.75,
    w: W - 2 * MARGIN,
    h: 0.25,
    fontFace: F.body,
    fontSize: 8,
    italic: true,
    color: C.muted,
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 8 · ROADMAP FUTURO
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 8, 10);
  addSectionTitle(s, "08", "O QUE VEM DEPOIS", "Não termina aqui. Começa.");

  s.addText(
    "Conforme a operação amadurecer, módulos entram em fases futuras — sem compromisso agora.",
    {
      x: MARGIN,
      y: 2.2,
      w: W - 2 * MARGIN,
      h: 0.4,
      fontFace: F.body,
      fontSize: 12,
      color: C.inkSoft,
    }
  );

  const modules = [
    { n: "01", t: "App mobile", d: "iOS + Android, push de drop, carteira de ingressos com QR offline." },
    { n: "02", t: "Clube de Fãs", d: "Programa de fidelidade, drops antecipados, conteúdo exclusivo." },
    { n: "03", t: "Incubadora", d: "Triagem de novos artistas, contrato digital, onboarding estruturado." },
    { n: "04", t: "Loja de digitais", d: "Beats, samples, kits, presets — receita sem custo logístico." },
  ];

  const cardW = (W - 2 * MARGIN - 0.6) / 2;
  const cardH = 0.9;
  modules.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * (cardW + 0.6);
    const y = 2.85 + row * (cardH + 0.3);
    // Numero accent
    s.addText(m.n, {
      x,
      y,
      w: 0.6,
      h: 0.4,
      fontFace: F.display,
      fontSize: 18,
      bold: true,
      color: C.accent,
    });
    s.addText(m.t, {
      x: x + 0.7,
      y,
      w: cardW - 0.7,
      h: 0.35,
      fontFace: F.display,
      fontSize: 16,
      bold: true,
      color: C.ink,
    });
    s.addText(m.d, {
      x: x + 0.7,
      y: y + 0.35,
      w: cardW - 0.7,
      h: 0.5,
      fontFace: F.body,
      fontSize: 10,
      color: C.inkSoft,
    });
  });

  s.addText("Cotação separada quando fizer sentido. A stack inicial já comporta.", {
    x: MARGIN,
    y: 4.85,
    w: W - 2 * MARGIN,
    h: 0.35,
    fontFace: F.body,
    fontSize: 10,
    italic: true,
    color: C.muted,
    align: "center",
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 9 · PRÓXIMOS PASSOS
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, 9, 10);
  addSectionTitle(s, "09", "PRÓXIMOS PASSOS", "Como entramos em execução.");

  const steps = [
    { n: "1", t: "Reunião de alinhamento", d: "60 minutos com Clara + financeiro. Decisão de cenário." },
    { n: "2", t: "Contrato", d: "Escopo detalhado em 5 dias úteis. DocuSign ou ClickSign." },
    { n: "3", t: "Kickoff", d: "Setup de infra + Slack compartilhado. Reunião de planejamento." },
    { n: "4", t: "Fase 1 em execução", d: "Demos quinzenais. Site novo + arquitetura drop em 60 dias." },
    { n: "5", t: "SLA inicia", d: "Sustentação contínua desde o mês 2. On-call em drops." },
  ];

  const stepH = 0.5;
  steps.forEach((step, i) => {
    const y = 2.3 + i * (stepH + 0.05);
    // Bullet round
    s.addShape("ellipse", {
      x: MARGIN,
      y: y + 0.05,
      w: 0.4,
      h: 0.4,
      fill: { color: C.accent },
      line: { color: C.accent, width: 0 },
    });
    s.addText(step.n, {
      x: MARGIN,
      y: y + 0.05,
      w: 0.4,
      h: 0.4,
      fontFace: F.display,
      fontSize: 14,
      bold: true,
      color: C.white,
      align: "center",
      valign: "middle",
    });
    s.addText(step.t, {
      x: MARGIN + 0.6,
      y: y + 0.05,
      w: 3.4,
      h: 0.4,
      fontFace: F.display,
      fontSize: 14,
      bold: true,
      color: C.ink,
      valign: "middle",
    });
    s.addText(step.d, {
      x: MARGIN + 4.1,
      y: y + 0.05,
      w: W - 2 * MARGIN - 4.1,
      h: 0.4,
      fontFace: F.body,
      fontSize: 11,
      color: C.inkSoft,
      valign: "middle",
    });
  });
}

// ═══════════════════════════════════════════════════════
// SLIDE 10 · FECHAMENTO (dark)
// ═══════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Faixa accent vertical
  s.addShape("rect", {
    x: 0.5,
    y: 0,
    w: 0.06,
    h: H,
    fill: { color: C.accent },
    line: { color: C.accent, width: 0 },
  });

  // Quote — em 2 blocos, fontSize reduzido pra caber em 1 linha cada
  s.addText("“Não é gravadora pra render mais.", {
    x: 0.9,
    y: 1.4,
    w: 8.5,
    h: 0.8,
    fontFace: F.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    italic: true,
    valign: "middle",
  });
  s.addText("É gravadora pra durar mais.”", {
    x: 0.9,
    y: 2.3,
    w: 8.5,
    h: 0.8,
    fontFace: F.display,
    fontSize: 30,
    bold: true,
    color: C.accent,
    italic: true,
    valign: "middle",
  });
  s.addText("— Clara Mendes, CEO 30praum", {
    x: 0.9,
    y: 3.3,
    w: 5,
    h: 0.3,
    fontFace: F.body,
    fontSize: 11,
    color: C.muted,
    charSpacing: 1,
  });

  // Bottom line
  s.addShape("line", {
    x: 0.9,
    y: 4.4,
    w: W - 1.4,
    h: 0,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText("CONTATO", {
    x: 0.9,
    y: 4.55,
    w: 3,
    h: 0.25,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    charSpacing: 2,
  });
  s.addText("Alvaro Carlisbino · Founder", {
    x: 0.9,
    y: 4.8,
    w: 5,
    h: 0.3,
    fontFace: F.body,
    fontSize: 13,
    bold: true,
    color: C.white,
  });
  s.addText("contato@[software-house].com.br  ·  +55 (XX) XXXXX-XXXX", {
    x: 0.9,
    y: 5.1,
    w: 6,
    h: 0.25,
    fontFace: F.body,
    fontSize: 10,
    color: C.ice,
  });

  s.addText("v1 · MAIO 2026 · DOCUMENTO CONFIDENCIAL", {
    x: W - MARGIN - 4,
    y: 5.1,
    w: 4,
    h: 0.25,
    fontFace: F.body,
    fontSize: 8,
    bold: true,
    color: C.muted,
    align: "right",
    charSpacing: 1.5,
  });
}

// ─────────────────────────────────────────────────────────
// SALVAR
// ─────────────────────────────────────────────────────────
const outPath = path.join(__dirname, "30praum-pitch-deck.pptx");
pres
  .writeFile({ fileName: outPath })
  .then((fn) => console.log(`✔ Deck gerado: ${fn}`))
  .catch((e) => {
    console.error("Erro:", e);
    process.exit(1);
  });
