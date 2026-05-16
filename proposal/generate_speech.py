#!/usr/bin/env python3
"""
ROTEIRO DE APRESENTAÇÃO ORAL · 30praum

Documento INTERNO pra Alvaro usar AO VIVO na reunião com Clara.
Não é pra enviar — é pra ler durante a apresentação.

Cobre:
- Abertura (o pitch de 60s · "não é pelo dinheiro")
- Diagnóstico operacional
- Por que ter hub (não é gasto, é infraestrutura)
- Demo ao vivo (checklist do que mostrar no site)
- 5 propostas (R$ 120k mínimo até time embedded)
- Q&A antecipado
- Fechamento
"""

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ACCENT = colors.HexColor("#d12d3f")
INK = colors.HexColor("#0a0a0a")
INK_SOFT = colors.HexColor("#3a3a3a")
MUTED = colors.HexColor("#7a7a7a")
RULE = colors.HexColor("#dedede")
BG = colors.HexColor("#FFFFFF")
BG_SOFT = colors.HexColor("#f5f4f1")
BG_DARK = colors.HexColor("#0a0a0a")
GREEN = colors.HexColor("#2f7d4f")
AMBER = colors.HexColor("#b8731a")
BLUE = colors.HexColor("#1f6bff")

FONT = "Helvetica"
FONT_B = "Helvetica-Bold"
FONT_I = "Helvetica-Oblique"
FONT_BI = "Helvetica-BoldOblique"

OUT = Path(__file__).parent / "30praum-roteiro-apresentacao.pdf"


def S(name, **kw):
    defaults = dict(
        name=name, fontName=FONT, fontSize=10, leading=14,
        textColor=INK, spaceBefore=0, spaceAfter=0,
    )
    defaults.update(kw)
    return ParagraphStyle(**defaults)


styles = {
    "cover_eyebrow": S("cover_eyebrow", fontName=FONT_B, fontSize=8, leading=10, textColor=ACCENT, spaceAfter=14),
    "cover_title": S("cover_title", fontName=FONT_B, fontSize=38, leading=42, textColor=INK, spaceAfter=14),
    "cover_sub": S("cover_sub", fontSize=12, leading=18, textColor=INK_SOFT, spaceAfter=20),
    "cover_caption": S("cover_caption", fontName=FONT_B, fontSize=7, leading=9, textColor=MUTED),
    "h1": S("h1", fontName=FONT_B, fontSize=20, leading=24, textColor=INK, spaceBefore=12, spaceAfter=10),
    "h1_eyebrow": S("h1_eyebrow", fontName=FONT_B, fontSize=7, leading=9, textColor=ACCENT, spaceAfter=6),
    "h2": S("h2", fontName=FONT_B, fontSize=13, leading=16, textColor=INK, spaceBefore=14, spaceAfter=6),
    "h3": S("h3", fontName=FONT_B, fontSize=11, leading=14, textColor=INK, spaceBefore=8, spaceAfter=3),
    "body": S("body", fontSize=10, leading=15, textColor=INK_SOFT, spaceAfter=6),
    "body_tight": S("body_tight", fontSize=9.5, leading=14, textColor=INK_SOFT),
    "body_small": S("body_small", fontSize=8.5, leading=12, textColor=INK_SOFT),
    "fala": S("fala", fontSize=11, leading=17, textColor=INK, fontName=FONT_I, leftIndent=12, spaceAfter=6),
    "fala_destaque": S("fala_destaque", fontSize=12, leading=18, textColor=INK, fontName=FONT_BI, leftIndent=12, spaceAfter=6),
    "li": S("li", fontSize=10, leading=15, textColor=INK_SOFT, spaceAfter=3, leftIndent=10, bulletIndent=0),
    "li_tight": S("li_tight", fontSize=9.5, leading=13, textColor=INK_SOFT, leftIndent=10, bulletIndent=0),
    "caption": S("caption", fontSize=8, leading=10, textColor=MUTED, fontName=FONT_B),
    "tag": S("tag", fontSize=8, leading=10, textColor=ACCENT, fontName=FONT_B),
}


def hr(color=RULE, thickness=0.4, space_before=4, space_after=8):
    t = Table([[" "]], colWidths=["100%"], rowHeights=[thickness])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, space_before), t, Spacer(1, space_after)]


def bullets(items, style_name="li"):
    return [Paragraph(f"<bullet>·</bullet>&nbsp;&nbsp;{item}", styles[style_name]) for item in items]


def section_header(eyebrow, title):
    return [
        Paragraph(eyebrow.upper(), styles["h1_eyebrow"]),
        Paragraph(title, styles["h1"]),
        *hr(color=INK, thickness=0.8, space_before=2, space_after=12),
    ]


def callout(title, body_html, bg=BG_SOFT, accent=ACCENT):
    inner = Table(
        [
            [Paragraph(title.upper(), styles["caption"])],
            [Paragraph(body_html, styles["body_tight"])],
        ],
        colWidths=[None],
    )
    inner.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LINEABOVE", (0, 0), (-1, 0), 2, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (0, 0), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 1), (-1, 1), 4),
    ]))
    return KeepTogether(inner)


def fala_box(label, body_html, accent=BLUE):
    """Box especial pra script de fala — visualmente distinto."""
    inner = Table(
        [
            [Paragraph(label.upper(), styles["caption"])],
            [Paragraph(body_html, styles["fala"])],
        ],
        colWidths=[None],
    )
    inner.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f0f4ff")),
        ("LINEABOVE", (0, 0), (-1, 0), 2.5, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (0, 0), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 1), (-1, 1), 4),
    ]))
    return KeepTogether(inner)


def wrap_cells(rows):
    out = []
    for i, row in enumerate(rows):
        new_row = []
        for cell in row:
            if isinstance(cell, str):
                style = styles["caption"] if i == 0 else styles["body_small"]
                new_row.append(Paragraph(cell, style))
            else:
                new_row.append(cell)
        out.append(new_row)
    return out


def fmt_brl(n):
    s = f"{n:,.0f}".replace(",", ".")
    return f"R$ {s}"


def draw_chrome(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(2 * cm, h - 1.4 * cm, w - 2 * cm, h - 1.4 * cm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, h - 1.05 * cm, "30PRAUM · ROTEIRO DE APRESENTAÇÃO · USO INTERNO")
    canvas.drawRightString(w - 2 * cm, h - 1.05 * cm, "v1 · MAI 2026 · NÃO ENVIAR")
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "Material interno · não compartilhar")
    canvas.drawRightString(w - 2 * cm, 1.0 * cm, f"Pág. {doc.page:02d}")
    canvas.restoreState()


def draw_cover(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(BG_DARK)
    canvas.rect(0, h - 6 * cm, w, 6 * cm, stroke=0, fill=1)
    canvas.setFillColor(ACCENT)
    canvas.rect(1.2 * cm, 0, 0.18 * cm, h - 6 * cm, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont(FONT_B, 8)
    canvas.drawString(2 * cm, h - 1.4 * cm, "ROTEIRO DE APRESENTAÇÃO · USO INTERNO")
    canvas.drawRightString(w - 2 * cm, h - 1.4 * cm, "NÃO ENVIAR")
    canvas.setFillColor(colors.white)
    canvas.setFont(FONT_B, 26)
    canvas.drawString(2 * cm, h - 3.8 * cm, "30PRAUM")
    canvas.setFillColor(colors.HexColor("#c4c4c4"))
    canvas.setFont(FONT, 11)
    canvas.drawString(2 * cm, h - 4.6 * cm, "Roteiro pra reunião com Clara · falar, não enviar")
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "DOCUMENTO INTERNO LIMITLESS · USO EXCLUSIVO DO APRESENTADOR")
    canvas.restoreState()


# ═══════════════════════════════════════════════════════════
# PÁGINAS
# ═══════════════════════════════════════════════════════════


def cover_page():
    flow = []
    flow.append(Spacer(1, 7 * cm))
    flow.append(Paragraph("ROTEIRO INTERNO", styles["cover_eyebrow"]))
    flow.append(Paragraph(
        "Como apresentar<br/>a parceria pra Clara.",
        styles["cover_title"],
    ))
    flow.append(Paragraph(
        "Este documento é pra você ler antes da reunião e consultar durante. "
        "Tem falas prontas, ordem de apresentação, propostas detalhadas, "
        "e respostas pras perguntas que ela vai fazer.",
        styles["cover_sub"],
    ))
    flow.append(Spacer(1, 1.4 * cm))
    flow.append(Paragraph("USO INTERNO", styles["cover_caption"]))
    flow.append(Spacer(1, 3))
    flow.append(Paragraph(
        "Alvaro Carlisbino · Founder Limitless<br/>"
        "Cauã · Tech Lead<br/>"
        f"Emissão · {date.today().strftime('%d/%m/%Y')}",
        styles["body_tight"],
    ))
    flow.append(Spacer(1, 14))
    flow.append(Paragraph("LEMBRETE", styles["cover_caption"]))
    flow.append(Spacer(1, 3))
    flow.append(Paragraph(
        "<b>Não envie este PDF pra 30praum.</b> Os valores aqui têm a margem da "
        "Limitless explicitada. Pra envio externo, use o "
        "<i>30praum-proposta-comercial.pdf</i>.",
        styles["body_tight"],
    ))
    flow.append(NextPageTemplate("content"))
    flow.append(PageBreak())
    return flow


def pagina_abertura():
    flow = section_header(
        "01 · ABERTURA · 60 SEGUNDOS",
        "O tom pra começar a reunião.",
    )

    flow.append(Paragraph(
        "Antes de qualquer slide, antes de qualquer número, abre com isso. "
        "É o tom da reunião inteira. Sente, respira, e fala devagar.",
        styles["body"],
    ))

    flow.append(Spacer(1, 8))
    flow.append(fala_box(
        "Fala de abertura · decora",
        "Clara, antes da gente entrar em proposta e valor, eu queria te falar "
        "uma coisa que importa mais. <b>A gente não tá aqui pelo dinheiro.</b> "
        "Eu e o Cauã construímos a primeira versão do site da 30praum sem cobrar "
        "nada — está no ar, vocês podem clicar agora. <br/><br/>"
        "Fizemos isso porque acreditamos no que vocês construíram. 10 anos de "
        "casa, Matuê, Wiu, Teto, Brandão. O Plantão. A coisa toda. "
        "<b>A gente quer ver isso operando com a infraestrutura digital que "
        "merece</b> — não com 4 ferramentas desconectadas que prendem o tempo "
        "do time de vocês todo dia. <br/><br/>"
        "O que tá nesse documento são possibilidades de como a gente pode "
        "construir junto. Tem propostas mais leves, mais pesadas, com a gente "
        "fixo, com Shopify, sem Shopify. A gente tá aqui pra encontrar o "
        "formato que faz sentido pra vocês — não pra empurrar pacote.",
    ))

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("Linguagem corporal e ritmo", styles["h2"]))
    flow.extend(bullets([
        "Senta. Não fica em pé apresentando.",
        "Pausa antes de falar do dinheiro. Deixa a Clara processar.",
        "<b>Não defende preço. Defende o valor.</b> Preço é consequência.",
        "Quando ela perguntar quanto custa, devolve: <i>'antes de te falar, posso te mostrar o que tá incluso?'</i>",
        "Em silêncio depois de uma proposta. Quem fala primeiro perde.",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Aviso · não use a palavra eternamente",
        "Use sempre: <b>parceria de longa duração</b>, <b>relacionamento contínuo</b>, "
        "<b>time fixo dedicado</b>. A palavra <i>eternamente</i> assusta — soa como lock-in.",
        accent=AMBER,
    ))

    flow.append(PageBreak())
    return flow


def pagina_diagnostico():
    flow = section_header(
        "02 · DIAGNÓSTICO · 3 MINUTOS",
        "O que a 30praum é hoje · o que falta.",
    )

    flow.append(Paragraph(
        "Comece reconhecendo o tamanho que a 30praum já é. Depois mostre o "
        "gap operacional. Não fala de site caindo — fala de tempo perdido todo dia.",
        styles["body"],
    ))

    flow.append(Spacer(1, 8))
    flow.append(fala_box(
        "Fala · diagnóstico",
        "Vocês são a maior gravadora independente do Brasil. Matuê passou de "
        "950 milhões de streams. O Plantão chega a 30 mil pessoas. 10 anos de "
        "casa, 4 artistas no roster, time de 50 pessoas. <b>Vocês não precisam "
        "crescer — vocês precisam de infraestrutura à altura do que já são.</b><br/><br/>"
        "Hoje, todo dia, o time de vocês precisa cadastrar produto, marcar "
        "pedido como enviado, aprovar post, configurar lote do Plantão, "
        "responder reclamação que chega pelo Instagram. <b>Cada uma dessas "
        "tarefas vive em uma ferramenta diferente:</b> Shopify pra loja, ST "
        "Ingressos pro Plantão, Instagram pra SAC, planilha pra tudo o resto. "
        "Nada conversa entre si.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Onde o tempo do time se perde hoje", styles["h2"]))
    perdas = [
        ("Cadastrar 1 produto novo", "~45 min · 3 lugares (Shopify + planilha + Instagram)"),
        ("Marcar 20 pedidos como enviados", "~1h diário · clique a clique no Shopify"),
        ("Aprovar 1 post pra publicação", "WhatsApp Clara → marketing → artista → social"),
        ("Configurar 1 lote do Plantão", "Email pra ST + planilha interna + post pra divulgar"),
        ("Responder 1 reclamação de pedido", "DM Instagram → buscar pedido no Shopify → responder"),
        ("Lançar 1 drop completo", "Coordenação em 6+ pessoas · sem timeline visível"),
    ]
    rows = [["TAREFA DIÁRIA", "ESFORÇO ATUAL"]]
    for t, e in perdas:
        rows.append([t, e])
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[7.5 * cm, 11.0 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(fala_box(
        "Fechamento do diagnóstico",
        "Some isso tudo. <b>O tempo perdido em ferramenta desconectada custa "
        "mais que qualquer assinatura de SaaS.</b> Não é que o Shopify seja "
        "ruim ou que a ST Ingressos seja ruim — é que vocês são uma holding "
        "tentando rodar com ferramentas pensadas pra lojinhas individuais.",
    ))

    flow.append(PageBreak())
    return flow


def pagina_por_que_hub():
    flow = section_header(
        "03 · POR QUE TER UM HUB · 4 MINUTOS",
        "Não é gasto. É infraestrutura de marca.",
    )

    flow.append(fala_box(
        "Fala · o argumento central",
        "Eu sei que quando alguém vem falar de plataforma própria, parece "
        "<i>mais um custo</i>. Mas eu queria te convidar a olhar pelo outro "
        "lado. <b>Hub digital não é despesa. É infraestrutura — igual "
        "ter studio próprio em vez de alugar.</b><br/><br/>"
        "Vocês têm 4 universos artísticos potentes, festival próprio, "
        "merch que vende, base de fã ativa. A pergunta não é se vale a "
        "pena ter o próprio hub. A pergunta é: <b>quanto custa não ter?</b>",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("4 motivos pra ter o hub · use só os que fizerem sentido na conversa", styles["h2"]))

    motivos = [
        (
            "EFICIÊNCIA",
            "Tempo do time",
            "Time gasta menos hora administrativa, mais hora em criação. "
            "Cadastrar produto, aprovar post, configurar drop — tudo em um lugar, "
            "com fluxo claro. Estimativa: <b>~20-30h/mês economizadas só do "
            "Clara</b>, mais ~40h/mês do time de produção.",
        ),
        (
            "LOGÍSTICA",
            "Operação visível",
            "Pedidos com status em tempo real. Estoque consolidado. Drop com "
            "timeline aberto pra todo mundo ver. Plantão com dashboard de venda "
            "ao vivo. <b>Acabou planilha de 50 abas.</b>",
        ),
        (
            "DOMÍNIO DIGITAL",
            "Vocês são donos do fã",
            "Hoje os dados do fã estão espalhados em Shopify, ST Ingressos, "
            "Instagram. <b>Com hub próprio, vocês têm a base unificada</b>: "
            "histórico de compra + ingresso + interação. Vale ouro pra programa "
            "de fidelidade, lançamento de álbum, drop antecipado.",
        ),
        (
            "PRESENÇA",
            "Marca consolidada",
            "Cada link que vocês compartilham, cada checkout, cada email — tudo "
            "carregando o domínio 30praum.com. <b>Não é vitrine do Shopify "
            "personalizada</b>, é a marca de vocês de ponta a ponta.",
        ),
    ]

    for tag, titulo, corpo in motivos:
        block = Table(
            [
                [
                    Paragraph(f"<b>{tag}</b>", styles["tag"]),
                    Paragraph(titulo, styles["h3"]),
                ],
                ["", Paragraph(corpo, styles["body_tight"])],
            ],
            colWidths=[2.5 * cm, 16.0 * cm],
        )
        block.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
            ("TOPPADDING", (0, 0), (-1, 0), 4),
            ("LINEBELOW", (0, 1), (-1, 1), 0.3, RULE),
            ("BOTTOMPADDING", (0, 1), (-1, 1), 8),
        ]))
        flow.append(block)

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Argumento financeiro · use se ela perguntar de retorno",
        "Mensalidade Shopify Plus: ~<b>R$ 144k/ano</b>. Taxa ST Ingressos por "
        "edição: ~<b>R$ 480k</b>. Tempo do time perdido em planilha: difícil "
        "calcular, mas todo CEO sabe o quanto custa. <b>Não estamos falando "
        "de comprar uma ferramenta nova</b> — estamos falando de redistribuir "
        "esse dinheiro pra dentro de casa, com controle e domínio próprio.",
    ))

    flow.append(PageBreak())
    return flow


def pagina_demo():
    flow = section_header(
        "04 · DEMO AO VIVO · 5 MINUTOS",
        "Site v1 já está no ar — abre o celular dela.",
    )

    flow.append(Paragraph(
        "Esse é o momento mais importante da reunião. Vocês não vão vender "
        "promessa — vão mostrar trabalho real. Tira o celular do bolso. Pede "
        "o dela. Navega junto.",
        styles["body"],
    ))

    flow.append(Spacer(1, 8))
    flow.append(fala_box(
        "Fala · antes de abrir o site",
        "Clara, antes da gente falar de preço e de modelo, deixa eu te mostrar "
        "uma coisa. <b>Esse é o site v1 da 30praum. Tá no ar. Funciona.</b> "
        "Eu e o Cauã construímos nas últimas semanas, sem cobrar nada — "
        "porque a gente queria que vocês visualizassem antes de qualquer "
        "decisão. Pega o celular, abre o link, e me acompanha.",
    ))

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Checklist · o que mostrar (nesta ordem)", styles["h2"]))

    demos = [
        ("01 · Home",
         "Mostra a vibe — Brandão hero, escolha de artista, navegação. "
         "<b>Diz:</b> 'Reparou que cada universo tem identidade própria? "
         "Isso é controle de marca que vocês não têm hoje.'"),
        ("02 · Página do artista (Matuê)",
         "Scroll até o final. Mostra discografia, manifesto, links. "
         "<b>Diz:</b> 'Cada artista tem CMS próprio. Quem opera é o "
         "manager dele — não precisa passar por dev.'"),
        ("03 · Loja",
         "Navega catálogo, abre um produto, mostra o checkout. "
         "<b>Diz:</b> 'Aqui é o Shopify atrás, mas o cliente nunca sabe. "
         "Frontend é nosso, dados ficam com vocês.'"),
        ("04 · Plantão · ingressos",
         "Mostra o checkout em 4 passos: escolher → dados → pagamento → sucesso. "
         "<b>Diz:</b> 'Substitui ST Ingressos. Taxa cai de ~8% pra ~3%.'"),
        ("05 · Painel admin",
         "Acessa /admin/dashboard. Mostra Dashboard → Produtos → Pedidos → Plantão → Artistas. "
         "<b>Diz:</b> 'Isso é onde Clara, financeiro, social — cada um — opera "
         "o dia a dia. Sem WhatsApp, sem planilha.'"),
        ("06 · Página Sobre",
         "Mostra a parte com você (Clara), histórico dos 10 anos, timeline. "
         "<b>Diz:</b> 'O cuidado que a gente teve aqui é o cuidado que vamos ter "
         "com a infraestrutura inteira.'"),
    ]
    for titulo, desc in demos:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.append(Paragraph(desc, styles["body_tight"]))
        flow.append(Spacer(1, 4))

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Não esqueça",
        "Após a demo, <b>pausa de 5 segundos antes de continuar.</b> Deixa "
        "ela falar primeiro. Se ela ficar em silêncio, pergunta: <i>'O que "
        "te chamou mais atenção?'</i> A resposta dela vai te dizer qual "
        "proposta apresentar primeiro.",
    ))

    flow.append(PageBreak())
    return flow


def pagina_propostas_intro():
    flow = section_header(
        "05 · AS 5 PROPOSTAS",
        "Diferentes níveis de comprometimento — qual faz sentido pra vocês.",
    )

    flow.append(fala_box(
        "Fala · introdução das propostas",
        "A gente desenhou 5 formatos. Eles cobrem desde uma <b>parceria mais "
        "enxuta</b> até a gente como <b>time fixo dedicado da 30praum</b>. "
        "Não tem certo ou errado — depende de como você quer que essa "
        "relação aconteça. Eu vou passar pelos 5, e a gente conversa sobre "
        "qual encaixa.",
    ))

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Visão geral · as 5 propostas em 1 tabela", styles["h2"]))

    comp_rows = [
        ["", "1 · BASE", "2 · CONFIANÇA", "3 · CONTROLE", "4 · EMBEDDED", "5 · TIME +"],
        ["Subtítulo",
         "Mínimo viável",
         "+ time fixo",
         "Sai do Shopify",
         "Sem entrega",
         "Equipe ampliada"],
        ["Entrega",
         fmt_brl(120_000),
         fmt_brl(165_000),
         fmt_brl(240_000),
         "—",
         fmt_brl(200_000)],
        ["Mensal",
         fmt_brl(12_000),
         fmt_brl(28_000),
         fmt_brl(32_000),
         fmt_brl(32_000) + " → 50k",
         fmt_brl(45_000)],
        ["Time",
         "Parcial",
         "Alvaro + Cauã",
         "Alvaro + Cauã",
         "Alvaro + Cauã",
         "+ 1 pleno dedicado"],
        ["Shopify",
         "Mantém",
         "Mantém",
         "Sai",
         "Decisão conjunta",
         "Sai"],
        ["Total 24m",
         fmt_brl(408_000),
         fmt_brl(837_000),
         fmt_brl(1_008_000),
         fmt_brl(984_000),
         fmt_brl(1_280_000)],
    ]
    rows_w = wrap_cells(comp_rows)
    t = Table(rows_w, colWidths=[2.8 * cm, 3.1 * cm, 3.1 * cm, 3.2 * cm, 3.2 * cm, 3.1 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        ("FONTNAME", (0, 1), (0, -1), FONT_B),
        # Destaca coluna 2 (Confiança - recomendada)
        ("BACKGROUND", (2, 1), (2, -1), colors.HexColor("#ffeec2")),
        # Destaca linha do total
        ("BACKGROUND", (0, -1), (-1, -1), GREEN),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("FONTNAME", (0, -1), (-1, -1), FONT_B),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    t.setStyle(TableStyle(style))
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(callout(
        "Recomendação interna · entre nós",
        "A proposta <b>2 · Confiança</b> é a mais natural pra começar. R$ 165k "
        "entrega + R$ 28k/mês com você e Cauã fixos = R$ 837k em 24 meses. "
        "Cobre tudo do hub + parceria longa. <b>Se a Clara hesitar em "
        "R$ 165k, oferece a Proposta 1 · Base (R$ 120k)</b> como entrada — "
        "ela pode evoluir pra 2 depois.",
        accent=GREEN,
    ))

    flow.append(PageBreak())
    return flow


def pagina_proposta_1():
    flow = section_header(
        "PROPOSTA 1 · BASE",
        "Mínimo viável · entrada de R$ 120k.",
    )

    flow.append(fala_box(
        "Fala · proposta base",
        "Essa é a proposta mais leve. <b>R$ 120 mil de entrega</b>, em 3 fases "
        "de 60 dias cada. SLA mensal de R$ 12k, com suporte limitado. "
        "Funciona se vocês quiserem começar pequeno, sem comprometer caixa "
        "com SLA grande de cara.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("O que cobre", styles["h2"]))
    flow.extend(bullets([
        "Site institucional + lojinha (mantém Shopify atrás)",
        "CMS Payload pra news, álbuns, drops",
        "Admin de pedidos básico (consulta · sem CRUD pesado)",
        "Plantão checkout próprio (substitui ST)",
        "Treinamento do time interno: 16h em sessões",
        "Documentação operacional inicial",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Pricing detalhado", styles["h2"]))
    rows = [
        ["LINHA", "VALOR"],
        ["Fase 1 · Site + CMS + auth (60 dias)", fmt_brl(58_000)],
        ["Fase 2 · Plantão checkout + admin básico (45 dias)", fmt_brl(42_000)],
        ["Fase 3 · LGPD + treinamento + handover (30 dias)", fmt_brl(20_000)],
        ["ENTREGA TOTAL", fmt_brl(120_000)],
        ["SLA mensal · suporte limitado · 30h/mês", fmt_brl(12_000) + "/mês"],
        ["Total ano 1 (entrega + 12 meses SLA)", fmt_brl(264_000)],
        ["Total 24 meses", fmt_brl(408_000)],
    ]
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("ALIGN", (1, 1), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -5), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -4), (-1, -4), BG_SOFT),
        ("FONTNAME", (0, -4), (-1, -1), FONT_B),
        ("LINEABOVE", (0, -4), (-1, -4), 0.6, INK),
        ("BACKGROUND", (0, -1), (-1, -1), AMBER),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Margem interna · entre nós", styles["h3"]))
    flow.append(Paragraph(
        "Custo seu durante entrega: ~R$ 75k (4 meses de Cauã part-time + você a "
        "60%). Margem na entrega: ~R$ 45k. <b>SLA R$ 12k/mês não cobre você + "
        "Cauã fixos</b> — é modelo de suporte limitado, sem dedicação exclusiva. "
        "Quem quiser dedicação total escolhe Proposta 2.",
        styles["body_small"],
    ))

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Quando oferecer",
        "Clara hesita no preço. Quer começar pequeno. Vocês só ofereceram a "
        "Proposta 1 se a 2 (recomendada) for muito agressiva pro orçamento dela.",
    ))

    flow.append(PageBreak())
    return flow


def pagina_proposta_2():
    flow = section_header(
        "PROPOSTA 2 · CONFIANÇA · RECOMENDADA",
        "Time fixo Alvaro + Cauã · parceria estruturada.",
    )

    flow.append(fala_box(
        "Fala · a proposta principal",
        "Essa é a proposta que a gente acredita que faz mais sentido. "
        "<b>R$ 165 mil de entrega em 4-5 meses + R$ 28 mil mensais</b> com "
        "eu e o Cauã como time fixo dedicado da 30praum. Eu como CTO "
        "terceirizado, ele como Tech Lead. Vocês não contratam dev — vocês "
        "têm time pronto, sem encargo CLT, sem rotatividade.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("O que cobre · entrega completa", styles["h2"]))
    flow.extend(bullets([
        "Tudo da Proposta 1",
        "+ Admin completo (CRUD de pedido, produto, ingresso, refund)",
        "+ Workflow engine (aprovação multi-pessoa, RACI digital, audit log)",
        "+ Integração analytics consolidado",
        "+ LGPD audit + 2FA + criptografia at-rest",
        "+ Auditoria de segurança externa incluída",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("O que cobre · SLA mensal · R$ 28k", styles["h2"]))
    flow.extend(bullets([
        "<b>Alvaro fixo 70% do tempo</b> · CTO terceirizado · estratégia + arquitetura",
        "<b>Cauã fixo 50% do tempo</b> · Tech Lead · execução técnica + code review",
        "Monitoramento ativo 24/7 com alerta Slack",
        "Até 4 deploys por semana com staging",
        "Evolução contínua · ~40h/mês de dev novo",
        "Reunião semanal de alinhamento com Clara",
        "Relatório mensal de uptime + features + roadmap",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Pricing detalhado", styles["h2"]))
    rows = [
        ["LINHA", "VALOR"],
        ["Fase 1 · Site + CMS + arquitetura (60 dias)", fmt_brl(68_000)],
        ["Fase 2 · Plantão + workflow + admin (45 dias)", fmt_brl(62_000)],
        ["Fase 3 · LGPD + sec + analytics (30 dias)", fmt_brl(35_000)],
        ["ENTREGA TOTAL", fmt_brl(165_000)],
        ["SLA mensal · time fixo Alvaro + Cauã", fmt_brl(28_000) + "/mês"],
        ["Total ano 1", fmt_brl(501_000)],
        ["Total 24 meses", fmt_brl(837_000)],
    ]
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("ALIGN", (1, 1), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -5), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -4), (-1, -4), BG_SOFT),
        ("FONTNAME", (0, -4), (-1, -1), FONT_B),
        ("LINEABOVE", (0, -4), (-1, -4), 0.6, INK),
        ("BACKGROUND", (0, -1), (-1, -1), GREEN),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Margem interna · entre nós", styles["h3"]))
    flow.append(Paragraph(
        "Custo mensal de manter Alvaro 70% + Cauã 50% + benefícios + infra "
        "dedicada: ~R$ 21.500/mês. Margem mensal sobre SLA: <b>~R$ 6.500/mês "
        "líquido</b> (~23%). Em 24 meses: ~R$ 156k de margem só de SLA + "
        "R$ 65k margem da entrega = <b>~R$ 220k total em 24m</b>. <br/><br/>"
        "Pra ela compensar contratar 1 sênior CLT (R$ 32k/mês com encargos), "
        "Proposta 2 paga sozinha — e ainda vem com Cauã + infra.",
        styles["body_small"],
    ))

    flow.append(PageBreak())
    return flow


def pagina_proposta_3():
    flow = section_header(
        "PROPOSTA 3 · CONTROLE TOTAL",
        "Sai do Shopify · plataforma 100% própria.",
    )

    flow.append(fala_box(
        "Fala · controle total",
        "Se vocês quiserem ir mais fundo, essa proposta tira completamente "
        "o Shopify. <b>R$ 240k de entrega + R$ 32k mensais.</b> A gente "
        "constrói e-commerce próprio, migra todo o catálogo, integra fiscal "
        "via Tiny ou Bling. Controle absoluto — vocês não pagam mais Shopify, "
        "não dependem de plano deles, customizam o que quiserem.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("O que cobre", styles["h2"]))
    flow.extend(bullets([
        "Tudo da Proposta 2",
        "+ E-commerce próprio: catálogo + carrinho + checkout + estoque",
        "+ Integração com gateway próprio (Pagar.me ou Stone) com antifraude",
        "+ Migração de catálogo Shopify (~1000+ SKUs) com período de paralelismo",
        "+ Integração fiscal NFe via Tiny ou Bling",
        "+ Time aumentado: Alvaro 100% + Cauã 80%",
        "+ Suporte 24/7 prioritário (gateway pode dar problema em qualquer hora)",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Pricing detalhado", styles["h2"]))
    rows = [
        ["LINHA", "VALOR"],
        ["Tudo da Proposta 2 (Fases 1, 2, 3)", fmt_brl(165_000)],
        ["Fase 4 · E-commerce próprio + gateway + antifraude (60 dias)", fmt_brl(55_000)],
        ["Fase 5 · Migração Shopify + fiscal NFe + paralelismo (30 dias)", fmt_brl(20_000)],
        ["ENTREGA TOTAL", fmt_brl(240_000)],
        ["SLA mensal · time ampliado · 24/7 prioritário", fmt_brl(32_000) + "/mês"],
        ["Total ano 1", fmt_brl(624_000)],
        ["Total 24 meses", fmt_brl(1_008_000)],
    ]
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("ALIGN", (1, 1), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -5), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -4), (-1, -4), BG_SOFT),
        ("FONTNAME", (0, -4), (-1, -1), FONT_B),
        ("LINEABOVE", (0, -4), (-1, -4), 0.6, INK),
        ("BACKGROUND", (0, -1), (-1, -1), GREEN),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Quando oferecer",
        "Clara já demonstrou que quer controle absoluto. Mencionou Shopify como "
        "limitação. Tem orçamento. Aceita compromisso de longo prazo. "
        "<b>Não ofereça se ela tiver hesitação no preço — vai assustar.</b>",
        accent=AMBER,
    ))

    flow.append(PageBreak())
    return flow


def pagina_proposta_4():
    flow = section_header(
        "PROPOSTA 4 · EMBEDDED",
        "Sem entrega · vocês contratam o time, não o produto.",
    )

    flow.append(fala_box(
        "Fala · embedded",
        "Essa é diferente das outras. <b>Não tem entrega cobrada separada.</b> "
        "Vocês contratam a gente como time fixo. <b>R$ 32 mil/mês nos primeiros "
        "6 meses</b>, com a gente fazendo a primeira entrega já dentro disso. "
        "Conforme cresce, escala — mês 7 vai pra R$ 38k, mês 13 vai pra R$ 50k. "
        "<b>É o modelo mais parecido com ter time interno</b> — mas sem encargo "
        "CLT, sem holerite, sem rescisão. <i>Saída amigável com 60 dias de aviso</i>.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Escada de comprometimento", styles["h2"]))
    rows = [
        ["PERÍODO", "ALOCAÇÃO", "MENSAL", "ENTREGA EMBUTIDA"],
        ["Mês 1-6", "Alvaro 80% + Cauã 60%", fmt_brl(32_000) + "/mês", "Site + admin + Plantão checkout"],
        ["Mês 7-12", "Alvaro 90% + Cauã 80%", fmt_brl(38_000) + "/mês", "Workflow + LGPD + analytics"],
        ["Mês 13-24", "Alvaro 100% + Cauã 100%", fmt_brl(50_000) + "/mês", "Suporte 24/7 + evolução contínua + roadmap conjunto"],
    ]
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[3.0 * cm, 4.5 * cm, 3.5 * cm, 7.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Total contratado em 24 meses", styles["h2"]))
    total_rows = [
        ["PERÍODO", "VALOR"],
        ["6 meses × R$ 32.000", fmt_brl(192_000)],
        ["6 meses × R$ 38.000", fmt_brl(228_000)],
        ["12 meses × R$ 47.000 (média 42-50k)", fmt_brl(564_000)],
        ["TOTAL CONTRATADO · 24 MESES", fmt_brl(984_000)],
    ]
    rows_w = wrap_cells(total_rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (1, 1), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -1), (-1, -1), GREEN),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("FONTNAME", (0, -1), (-1, -1), FONT_B),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(callout(
        "Diferencial dessa proposta",
        "<b>Não tem cheque grande de R$ 165k ou R$ 240k de entrega.</b> Tudo "
        "vai pro mensal. Pra Clara, é mais fácil aprovar R$ 32k/mês recorrente "
        "do que assinar uma nota fiscal de R$ 165k. Pra nós, garante receita "
        "previsível desde o mês 1.",
    ))

    flow.append(PageBreak())
    return flow


def pagina_proposta_5():
    flow = section_header(
        "PROPOSTA 5 · TIME AMPLIADO",
        "Limitless contrata mais 1 dev fixo dedicado à 30praum.",
    )

    flow.append(fala_box(
        "Fala · time ampliado",
        "Essa é pra quando vocês querem <b>velocidade</b>. Mesma estrutura "
        "da Proposta 3 — sai do Shopify, controle total — mas a gente contrata "
        "<b>mais 1 dev pleno fixo dedicado à 30praum</b>. Não é freelance, "
        "não compartilha com outro cliente. <b>R$ 200k de entrega + "
        "R$ 45k/mês.</b> Time grande, evoluções mais rápidas, suporta o "
        "Plantão sem suar.",
    ))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Como o time fica", styles["h2"]))
    flow.extend(bullets([
        "<b>Alvaro · CTO</b> · 100% dedicado · estratégia + arquitetura",
        "<b>Cauã · Tech Lead</b> · 100% dedicado · execução + code review",
        "<b>+ 1 Dev Pleno</b> · 100% dedicado · contratado pela Limitless exclusivamente pro projeto 30praum",
        "Total: <b>3 caras fixos</b> · suporte 24/7 prioritário",
    ]))

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Pricing", styles["h2"]))
    rows = [
        ["LINHA", "VALOR"],
        ["Entrega total (compromisso aumentado · ritmo de 3 caras)", fmt_brl(200_000)],
        ["SLA mensal · 3 dedicados · 24/7 prioritário", fmt_brl(45_000) + "/mês"],
        ["Total ano 1", fmt_brl(740_000)],
        ["Total 24 meses", fmt_brl(1_280_000)],
    ]
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("ALIGN", (1, 1), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -3), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -2), (-1, -2), BG_SOFT),
        ("FONTNAME", (0, -2), (-1, -1), FONT_B),
        ("LINEABOVE", (0, -2), (-1, -2), 0.6, INK),
        ("BACKGROUND", (0, -1), (-1, -1), GREEN),
        ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    flow.append(t)

    flow.append(Spacer(1, 8))
    flow.append(callout(
        "Quando oferecer",
        "<b>Provavelmente não oferece nessa primeira reunião.</b> Essa proposta "
        "é pra quando vocês já estiverem rodando há alguns meses e a 30praum "
        "pedir mais velocidade. Mantém ela como <i>upgrade futuro</i> da "
        "Proposta 3 ou 4.",
        accent=AMBER,
    ))

    flow.append(PageBreak())
    return flow


def pagina_qa():
    flow = section_header(
        "06 · Q&A ANTECIPADO",
        "As 8 perguntas que a Clara vai fazer.",
    )

    flow.append(Paragraph(
        "Leia antes da reunião. Não decora, mas internaliza a lógica de cada "
        "resposta — quando ela perguntar, a resposta vem natural.",
        styles["body"],
    ))

    perguntas = [
        ("Por que tão caro? Shopify Plus custa menos.",
         "Shopify Plus custa R$ 12k/mês <b>só pela ferramenta</b>. Não inclui dev, "
         "não inclui customização, não inclui SAC. Aqui você tem <b>2 caras fixos + "
         "infra + ferramentas + responsabilidade técnica</b>. Compare maçã com maçã: "
         "Shopify Plus + 1 dev sênior CLT = R$ 12k + R$ 32k = R$ 44k/mês. "
         "Proposta 2 entrega o equivalente por R$ 28k."),
        ("E se a gente quiser sair depois? Tem multa?",
         "Sem multa a partir do 6º mês de SLA. <b>Aviso de 60 dias e a gente faz "
         "handover documentado pra equipe que vier depois.</b> O código é seu, a "
         "infra é sua, as credenciais são suas. Sem reféns."),
        ("E o Shopify? Perdemos tudo lá?",
         "Depende da proposta. Na 2 (recomendada), <b>Shopify continua sendo o ERP "
         "de produto</b> — vocês ganham frontend novo + checkout próprio + admin "
         "próprio, mas o cadastro de produto e fiscal continuam onde estão. Sem "
         "migração dolorosa. Se um dia quiserem sair, evoluímos pra Proposta 3."),
        ("Vocês vão sumir depois de 3 meses?",
         "Pelo contrário. O contrato é de <b>12 meses mínimo de SLA</b>, "
         "renovável. Nosso modelo de receita são esses contratos longos — se a "
         "gente sumir, a gente quebra. <b>Eu pessoalmente estarei na call semanal "
         "todo mês.</b> Não tem account manager que terceiriza o contato — sou eu "
         "e o Cauã direto."),
        ("E se vocês ficarem ocupados com outros clientes?",
         "No SLA da Proposta 2 ou superior, <b>nossa dedicação fica garantida em "
         "contrato</b> (70% Alvaro + 50% Cauã = ~95h mensais combinadas). Se a "
         "gente não entregar, vocês têm direito a 1 mês de SLA grátis. <b>Nosso "
         "incentivo é fazer dar certo, não vender hora.</b>"),
        ("Mas vocês são novos. Como sei que vai funcionar?",
         "Por isso a gente <b>construiu o site v1 sem cobrar</b>. Tá no ar. Vocês "
         "clicam, sentem, testam. Não é apresentação — é trabalho real. "
         "Adicionalmente, se quiserem reduzir ainda mais o risco, a "
         "<b>Proposta 1 (R$ 120k)</b> é entrada menor pra validar."),
        ("Quanto tempo até estar no ar produção?",
         "<b>Fase 1: 60 dias.</b> Você vai ver site novo + admin básico no ar em "
         "2 meses, com demos quinzenais durante. <b>Fase 2: +45 dias.</b> Plantão "
         "checkout próprio funcionando. <b>Fase 3: +30 dias.</b> Tudo blindado, "
         "LGPD ok, auditoria externa. <b>Total: 4-5 meses pra ter operação "
         "completa.</b>"),
        ("E se eu quiser começar pequeno?",
         "Proposta 1 · R$ 120k entrega + R$ 12k/mês. <b>Mantém Shopify, suporte "
         "limitado, mas vocês já têm site novo + admin + Plantão checkout próprio "
         "em 4-5 meses.</b> Se rolar bem, evoluímos pra Proposta 2 com você e Cauã "
         "fixos — sem perder nada do que foi construído."),
    ]

    for i, (p, r) in enumerate(perguntas, 1):
        flow.append(Paragraph(f"{i:02d} · {p}", styles["h3"]))
        flow.append(fala_box("Resposta", r, accent=BLUE))
        flow.append(Spacer(1, 6))

    flow.append(PageBreak())
    return flow


def pagina_fechamento():
    flow = section_header(
        "07 · FECHAMENTO",
        "Como sair da reunião com um próximo passo concreto.",
    )

    flow.append(fala_box(
        "Fala · fechamento da reunião",
        "Clara, eu queria fechar com isso: <b>independente de qual proposta "
        "fizer mais sentido</b>, a única coisa que a gente pede é que essa "
        "decisão não dependa só do preço. Pensa se o caminho que a gente "
        "desenhou junto faz sentido pra próxima década da 30praum. <br/><br/>"
        "A gente tá disponível pra qualquer formato. Se quiser começar pelo "
        "Piloto, ótimo. Se quiser ir direto pra time fixo, ótimo. Se "
        "quiser pensar mais um pouco e voltar a conversar daqui 2 semanas, "
        "também ótimo. <b>O que a gente não quer é construir junto sem que "
        "isso faça sentido pro time de vocês.</b>",
    ))

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("3 cenários de saída da reunião · prepare-se", styles["h2"]))

    cenarios = [
        ("CENÁRIO A · Ela diz SIM agora",
         "Confirma escolha de proposta. <b>Próximo passo:</b> envia contrato em 5 dias "
         "úteis · agenda kickoff pra semana seguinte. Encerra a reunião sem comemorar "
         "muito — postura profissional, não eufórica."),
        ("CENÁRIO B · Ela quer pensar",
         "Mais comum. <b>Resposta:</b> 'Entendo, é decisão importante. Posso te enviar "
         "o PDF comercial com os números resumidos pra você compartilhar internamente? "
         "Marca a gente pra continuar essa conversa em 7-10 dias.' <b>Não pressiona.</b> "
         "Marca data concreta de followup."),
        ("CENÁRIO C · Ela traz objeção forte",
         "Ex: 'achei caro', 'queremos contratar interno'. <b>Não rebate na hora.</b> "
         "Ouve. Devolve com pergunta: 'O que faria você sentir confortável?' Use as "
         "respostas do Q&A. Se persistir objeção de preço, oferece Proposta 1 (R$ 120k) "
         "como entrada com gatilho de upgrade."),
    ]
    for titulo, body in cenarios:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.append(Paragraph(body, styles["body_tight"]))
        flow.append(Spacer(1, 6))

    flow.append(Spacer(1, 14))
    flow.append(callout(
        "Lembrete final · antes de sair",
        "Independente do cenário, <b>termine a reunião com 1 ação concreta e data</b>: "
        "envio de contrato em X dias, próximo call em Y dias, decisão em Z dias. "
        "Sem isso, a conversa morre. Pega o celular dela ali na mesa e marca a "
        "próxima data junto.",
    ))

    flow.append(Spacer(1, 20))

    # Linha visual de quote final
    flow.append(Paragraph(
        '"A gente não tá aqui pelo dinheiro.<br/>'
        'A gente tá aqui porque acredita no que vocês construíram."',
        ParagraphStyle(
            "quote_final",
            fontName=FONT_BI,
            fontSize=14,
            leading=20,
            textColor=ACCENT,
            alignment=1,  # center
            spaceBefore=10,
            spaceAfter=10,
        ),
    ))

    flow.append(Paragraph(
        "<i>Repete isso pra você mesmo antes de entrar.</i>",
        ParagraphStyle(
            "quote_sub",
            fontName=FONT_I,
            fontSize=10,
            leading=14,
            textColor=MUTED,
            alignment=1,
        ),
    ))

    return flow


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="30praum — Roteiro de Apresentação · Interno",
        author="Alvaro Carlisbino · Limitless",
    )

    frame_cover = Frame(0, 0, A4[0], A4[1], leftPadding=2 * cm, rightPadding=2 * cm,
                        topPadding=0, bottomPadding=2 * cm, showBoundary=0)
    frame_content = Frame(2 * cm, 2 * cm, A4[0] - 4 * cm, A4[1] - 4 * cm,
                          leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
                          showBoundary=0)

    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame_cover], onPage=draw_cover),
        PageTemplate(id="content", frames=[frame_content], onPage=draw_chrome),
    ])

    story = []
    story.extend(cover_page())
    story.extend(pagina_abertura())
    story.extend(pagina_diagnostico())
    story.extend(pagina_por_que_hub())
    story.extend(pagina_demo())
    story.extend(pagina_propostas_intro())
    story.extend(pagina_proposta_1())
    story.extend(pagina_proposta_2())
    story.extend(pagina_proposta_3())
    story.extend(pagina_proposta_4())
    story.extend(pagina_proposta_5())
    story.extend(pagina_qa())
    story.extend(pagina_fechamento())

    doc.build(story)
    print(f"✔ Roteiro de apresentação gerado: {OUT}")
    print(f"  Tamanho: {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    build()
