#!/usr/bin/env python3
"""
Versão ENXUTA da proposta pra 30praum — ~8 páginas.
Mostra o suficiente pra fechar a primeira reunião sem entregar
segredo de arquitetura, escopo detalhado ou cláusulas contratuais.

A versão completa (generate_proposal.py) fica como documento técnico
interno, entregue só após assinatura preliminar.
"""

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
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

# ─────────────────────────────────────────────────────────
# DESIGN TOKENS (mesmos da versão completa)
# ─────────────────────────────────────────────────────────

ACCENT = colors.HexColor("#d12d3f")
INK = colors.HexColor("#0a0a0a")
INK_SOFT = colors.HexColor("#3a3a3a")
MUTED = colors.HexColor("#7a7a7a")
RULE = colors.HexColor("#dedede")
BG_SOFT = colors.HexColor("#f5f4f1")
BG_DARK = colors.HexColor("#0a0a0a")
GREEN = colors.HexColor("#2f7d4f")

FONT = "Helvetica"
FONT_B = "Helvetica-Bold"

OUT = Path(__file__).parent / "30praum-proposta-comercial.pdf"

# ─────────────────────────────────────────────────────────
# STYLES
# ─────────────────────────────────────────────────────────


def S(name, **kw):
    defaults = dict(
        name=name,
        fontName=FONT,
        fontSize=10,
        leading=14,
        textColor=INK,
        spaceBefore=0,
        spaceAfter=0,
    )
    defaults.update(kw)
    return ParagraphStyle(**defaults)


styles = {
    "cover_eyebrow": S("cover_eyebrow", fontName=FONT_B, fontSize=8, leading=10, textColor=ACCENT, spaceAfter=14),
    "cover_title": S("cover_title", fontName=FONT_B, fontSize=42, leading=46, textColor=INK, spaceAfter=14),
    "cover_sub": S("cover_sub", fontSize=12, leading=18, textColor=INK_SOFT, spaceAfter=20),
    "cover_caption": S("cover_caption", fontName=FONT_B, fontSize=7, leading=9, textColor=MUTED),
    "h1": S("h1", fontName=FONT_B, fontSize=22, leading=26, textColor=INK, spaceBefore=12, spaceAfter=10),
    "h1_eyebrow": S("h1_eyebrow", fontName=FONT_B, fontSize=7, leading=9, textColor=ACCENT, spaceAfter=6),
    "h2": S("h2", fontName=FONT_B, fontSize=14, leading=18, textColor=INK, spaceBefore=14, spaceAfter=6),
    "h3": S("h3", fontName=FONT_B, fontSize=11, leading=14, textColor=INK, spaceBefore=10, spaceAfter=3),
    "body": S("body", fontSize=10, leading=15, textColor=INK_SOFT, spaceAfter=6),
    "body_tight": S("body_tight", fontSize=9.5, leading=14, textColor=INK_SOFT),
    "body_small": S("body_small", fontSize=8.5, leading=12, textColor=INK_SOFT),
    "li": S("li", fontSize=10, leading=15, textColor=INK_SOFT, spaceAfter=3, leftIndent=10, bulletIndent=0),
    "li_tight": S("li_tight", fontSize=9.5, leading=13, textColor=INK_SOFT, leftIndent=10, bulletIndent=0),
    "caption": S("caption", fontSize=8, leading=10, textColor=MUTED, fontName=FONT_B),
    "quote": S("quote", fontSize=12, leading=18, textColor=INK, fontName=FONT_B, leftIndent=12, spaceBefore=6, spaceAfter=10),
    "kpi_label": S("kpi_label", fontName=FONT_B, fontSize=7, leading=9, textColor=MUTED),
    "kpi_value": S("kpi_value", fontName=FONT_B, fontSize=22, leading=26, textColor=INK),
    "kpi_foot": S("kpi_foot", fontSize=8, leading=10, textColor=INK_SOFT),
}


# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────


def hr(color=RULE, thickness=0.4, space_before=4, space_after=8):
    t = Table([[" "]], colWidths=["100%"], rowHeights=[thickness])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return [Spacer(1, space_before), t, Spacer(1, space_after)]


def bullets(items, style_name="li"):
    return [Paragraph(f"<bullet>·</bullet>&nbsp;&nbsp;{item}", styles[style_name]) for item in items]


def section_header(eyebrow, title):
    return [
        Paragraph(eyebrow.upper(), styles["h1_eyebrow"]),
        Paragraph(title, styles["h1"]),
        *hr(color=INK, thickness=0.8, space_before=2, space_after=14),
    ]


def kpi_box(label, value, foot):
    inner = Table(
        [
            [Paragraph(label.upper(), styles["kpi_label"])],
            [Paragraph(value, styles["kpi_value"])],
            [Paragraph(foot, styles["kpi_foot"])],
        ],
        colWidths=[None],
    )
    inner.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (0, 0), 16),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 18),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 4),
                ("TOPPADDING", (0, 1), (-1, 1), 0),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 4),
                ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
                ("BOX", (0, 0), (-1, -1), 0.4, RULE),
            ]
        )
    )
    return inner


def kpi_row(items):
    boxes = [kpi_box(*it) for it in items]
    n = len(boxes)
    t = Table([boxes], colWidths=[(18.5 * cm) / n] * n)
    t.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (1, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def callout(title, body_html, bg=BG_SOFT, accent=ACCENT):
    inner = Table(
        [
            [Paragraph(title.upper(), styles["caption"])],
            [Paragraph(body_html, styles["body_tight"])],
        ],
        colWidths=[None],
    )
    inner.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("LINEABOVE", (0, 0), (-1, 0), 2, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (0, 0), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 1), (-1, 1), 4),
            ]
        )
    )
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


# ─────────────────────────────────────────────────────────
# CHROME (header/footer + capa)
# ─────────────────────────────────────────────────────────


def draw_chrome(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(2 * cm, h - 1.4 * cm, w - 2 * cm, h - 1.4 * cm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, h - 1.05 * cm, "30PRAUM · PROPOSTA COMERCIAL")
    canvas.drawRightString(w - 2 * cm, h - 1.05 * cm, "v1 · MAI 2026 · CONFIDENCIAL")
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "Documento confidencial")
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
    canvas.drawString(2 * cm, h - 1.4 * cm, "PROPOSTA COMERCIAL")
    canvas.drawRightString(w - 2 * cm, h - 1.4 * cm, "v1 · MAIO 2026")
    canvas.setFillColor(colors.white)
    canvas.setFont(FONT_B, 26)
    canvas.drawString(2 * cm, h - 3.8 * cm, "30PRAUM")
    canvas.setFillColor(colors.HexColor("#c4c4c4"))
    canvas.setFont(FONT, 11)
    canvas.drawString(2 * cm, h - 4.6 * cm, "Holding · Gravadora · Plantão Festival · 10 anos")
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "DOCUMENTO CONFIDENCIAL · DISTRIBUIÇÃO RESTRITA À DIRETORIA 30PRAUM")
    canvas.restoreState()


# ─────────────────────────────────────────────────────────
# PÁGINAS
# ─────────────────────────────────────────────────────────


def cover_page():
    flow = []
    flow.append(Spacer(1, 7 * cm))
    flow.append(Paragraph("PROPOSTA COMERCIAL", styles["cover_eyebrow"]))
    flow.append(
        Paragraph(
            "Plataforma digital<br/>pra 30praum.",
            styles["cover_title"],
        )
    )
    flow.append(
        Paragraph(
            "Site, e-commerce, ingressos e sustentação contínua — uma única "
            "stack desenhada pra aguentar o ritmo de uma gravadora que virou "
            "holding em 10 anos.",
            styles["cover_sub"],
        )
    )
    flow.append(Spacer(1, 1.4 * cm))
    flow.append(Paragraph("PREPARADO PARA", styles["cover_caption"]))
    flow.append(Spacer(1, 3))
    flow.append(
        Paragraph(
            "Clara Mendes · CEO 30praum<br/>Diretoria 30praum",
            styles["body_tight"],
        )
    )
    flow.append(Spacer(1, 14))
    flow.append(Paragraph("PREPARADO POR", styles["cover_caption"]))
    flow.append(Spacer(1, 3))
    flow.append(
        Paragraph(
            "Alvaro Carlisbino · Founder<br/>"
            f"Emissão · {date.today().strftime('%d/%m/%Y')}  ·  Validade · 30 dias",
            styles["body_tight"],
        )
    )
    flow.append(NextPageTemplate("content"))
    flow.append(PageBreak())
    return flow


def diagnostico_e_visao():
    flow = section_header("01 · DIAGNÓSTICO", "Por que faz sentido começar agora.")

    flow.append(
        Paragraph(
            "A 30praum acumulou 10 anos de operação enxuta. Matuê passou de 950 milhões "
            "de streams. O Plantão chegou a 30 mil pessoas. O último drop levou <b>300 mil "
            "acessos em 3 minutos</b> e derrubou o site. A stack atual — Shopify + ST "
            "Ingressos + Instagram — foi desenhada pra um selo, não pra uma holding.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 14))
    flow.append(
        kpi_row(
            [
                ("DROP DE PICO", "300 mil", "Acessos em 3 minutos"),
                ("PÚBLICO PLANTÃO", "30 mil", "Marina Park · Fortaleza"),
                ("TAXA ST/EDIÇÃO", "~R$ 480k", "Pago a intermediário"),
                ("SHOPIFY PLUS", "~R$ 144k", "Custo anual atual"),
            ]
        )
    )

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("O que estamos propondo", styles["h2"]))
    flow.append(
        Paragraph(
            "Uma plataforma digital própria — construída em fases pequenas, sem "
            "comprometer caixa, e operada por time fixo dedicado ao projeto. "
            "Cobre <b>quatro frentes essenciais</b>:",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 8))
    frentes = [
        ("Site 30praum.com", "Vitrine, drops, álbuns, news — arquitetado pra aguentar pico de drop sem cair."),
        ("Loja própria", "Frontend e checkout sob controle da 30praum, com Shopify como ERP de produto no backend."),
        ("Ingressos Plantão", "Checkout próprio que substitui ST Ingressos — taxa cai de ~8% pra ~3% (gateway)."),
        ("Painel + workflow", "Admin interno pra time da 30praum operar drops, pedidos, news e ingressos com aprovação multi-pessoa."),
    ]
    rows = [["FRENTE", "O QUE ENTREGA"]]
    for nome, desc in frentes:
        rows.append([nome, desc])
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[5.0 * cm, 13.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    flow.append(t)

    flow.append(PageBreak())
    return flow


def cenarios():
    flow = section_header("02 · OS QUATRO CENÁRIOS", "Quatro modelos de engajamento — do mais leve ao parceiro fixo.")

    flow.append(
        Paragraph(
            "Quatro opções pra começar — vocês escolhem o ritmo. Recomendamos "
            "<b>iniciar pelo Cenário B</b> e evoluir conforme a confiança bater. "
            "Detalhamento técnico e cronograma fechado por fase entram em "
            "documento técnico após assinatura preliminar.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    cen_rows = [
        ["MODELO", "DESCRIÇÃO", "ENTREGA", "MENSAL"],
        [
            "A · Mínimo viável",
            "Site novo + Shopify headless + CMS. Mantém ST Ingressos. Modo cauteloso pra testar parceria.",
            fmt_brl(95_000),
            fmt_brl(6_500),
        ],
        [
            "B · Híbrido (RECOMENDADO)",
            "Tudo do A + Plantão checkout próprio (substitui ST) + workflow + admin. Paga sozinho na 1ª edição do Plantão pós-launch.",
            fmt_brl(148_000),
            fmt_brl(9_500),
        ],
        [
            "C · Acelerado",
            "Tudo do B + e-commerce próprio (sai do Shopify). Controle total da operação.",
            fmt_brl(208_000),
            fmt_brl(13_000),
        ],
        [
            "D · Time Embedded",
            "Sem entrega upfront. Modelo de parceria contínua de longa duração — fixo mensal + PLR sobre economia gerada.",
            "—",
            fmt_brl(18_000) + " + PLR*",
        ],
    ]
    rows_w = wrap_cells(cen_rows)
    t = Table(rows_w, colWidths=[3.6 * cm, 9.4 * cm, 2.7 * cm, 2.8 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, 2), (-1, 2), colors.HexColor("#ffeec2")),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]
    t.setStyle(TableStyle(style))
    flow.append(t)
    flow.append(Spacer(1, 4))
    flow.append(
        Paragraph(
            "<i>* PLR (Participação nos Lucros e Resultados) calculada sobre economia "
            "mensurada anual. Percentual definido em contrato — ponto de partida "
            "referencial: 3% com top-cap anual, ajustável conforme volume de operação.</i>",
            styles["body_small"],
        )
    )

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("O que cabe nos cenários B e C", styles["h2"]))
    flow.append(
        Paragraph(
            "Sem detalhar escopo fase a fase nessa versão da proposta, em alto nível "
            "os cenários cobrem:",
            styles["body_tight"],
        )
    )
    flow.extend(
        bullets(
            [
                "Site institucional + de artistas com performance edge (Cloudflare CDN), arquitetado pra picos de drop.",
                "CMS pra time da 30praum operar news, drops e álbuns sem depender de dev.",
                "Painel admin com workflow de aprovação (quem cria, quem aprova, quem publica).",
                "Checkout próprio de ingresso do Plantão substituindo ST — taxa cai pra a do gateway (~3% no cartão / ~1% Pix).",
                "Loja com Shopify headless (B) ou e-commerce próprio (C), checkout sob domínio 30praum.",
                "Segurança em camadas (CSP, WAF, 2FA, audit log, LGPD).",
                "SLA mensal incluso desde o mês 1 com SLA de uptime contratual em drop.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())
    return flow


def investimento_e_retorno():
    flow = section_header("03 · INVESTIMENTO E RETORNO", "Os números do Cenário B (recomendado).")

    flow.append(
        Paragraph(
            "Cenário B em três fases pequenas — maior cheque é R$ 34.000 (Fase 1 "
            "dividida 50/50). Investimento total cabe na alçada operacional, sem "
            "necessidade de aprovação de board.",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 14))
    flow.append(
        kpi_row(
            [
                ("ENTREGA", fmt_brl(148_000), "Em 3 fases pequenas"),
                ("MENSAL", fmt_brl(9_500), "SLA + sustentação"),
                ("PAYBACK", "1 edição", "Plantão sem ST"),
                ("ECONOMIA ANO 2", "+R$ 326k", "Recorrente, líquida"),
            ]
        )
    )

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("Comparativo ano 1 vs hoje", styles["h2"]))
    roi_rows = [
        ["LINHA", "HOJE", "COM PLATAFORMA", "DELTA"],
        ["Shopify Plus → Basic", fmt_brl(144_000), fmt_brl(4_200), fmt_brl(-139_800)],
        ["Taxa ST Ingressos (1 edição)", fmt_brl(480_000), fmt_brl(180_000), fmt_brl(-300_000)],
        ["Entrega da plataforma", "—", fmt_brl(148_000), fmt_brl(148_000)],
        ["SLA mensal × 12m", "—", fmt_brl(114_000), fmt_brl(114_000)],
        ["", "ECONOMIA LÍQUIDA NO ANO 1", "", fmt_brl(177_800)],
    ]
    rows_w = wrap_cells(roi_rows)
    t = Table(rows_w, colWidths=[6.0 * cm, 4.0 * cm, 4.5 * cm, 4.0 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("ALIGN", (1, 1), (-1, -2), "RIGHT"),
                ("ALIGN", (-1, -1), (-1, -1), "RIGHT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, -1), (-1, -1), GREEN),
                ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
                ("FONTNAME", (0, -1), (-1, -1), FONT_B),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 16))
    flow.append(
        callout(
            "Por que paga sozinho",
            "Cada edição do Plantão sem a taxa da ST economiza ~R$ 300.000. "
            "A entrega da plataforma é absorvida em uma única edição. A "
            "economia recorrente do Shopify Plus (~R$ 140.000/ano) cobre 12 "
            "meses de SLA com folga.",
        )
    )

    flow.append(PageBreak())
    return flow


def roadmap_futuro():
    flow = section_header("04 · ROADMAP DE EVOLUÇÃO", "Por onde a plataforma cresce depois do go-live.")

    flow.append(
        Paragraph(
            "Esta proposta cobre o essencial pra colocar a 30praum em pé com "
            "plataforma própria. Conforme a operação amadurecer, módulos "
            "adicionais entram em fases futuras — sem custo embutido no escopo "
            "atual, e sem decisão tomada agora.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    roadmap_rows = [
        ["MÓDULO", "QUANDO FAZ SENTIDO", "VALOR DE REFERÊNCIA"],
        [
            "App mobile (iOS + Android)",
            "Após 6 a 12 meses operando o site novo e medindo engajamento do fã. Usa a stack já construída.",
            "Sob consulta",
        ],
        [
            "Clube de Fãs",
            "Quando a base de email/telefone próprio passar de 30k. Programa de fidelidade, drops antecipados, conteúdo exclusivo.",
            "Sob consulta",
        ],
        [
            "Plataforma de incubadora",
            "Quando a 30praum estruturar a captação de novos artistas de forma escalável. Triagem, contrato digital, onboarding.",
            "Sob consulta",
        ],
        [
            "Loja de produtos digitais",
            "Beats, kits, samples, presets — receita adicional sem custo logístico.",
            "Sob consulta",
        ],
        [
            "Sabor / linha gastronômica",
            "Quando a vertical gastronômica do Plantão crescer a ponto de justificar canal próprio.",
            "Sob consulta",
        ],
    ]
    rows_w = wrap_cells(roadmap_rows)
    t = Table(rows_w, colWidths=[4.5 * cm, 10.0 * cm, 4.0 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(
        callout(
            "Lógica de evolução",
            "Cada módulo do roadmap entra como projeto autônomo, com escopo, prazo e "
            "valor cotados separadamente no momento que fizer sentido. Vocês não "
            "comprometem nada agora — apenas garantem que <b>a stack inicial já "
            "comporta esses módulos</b> sem reescrita.",
        )
    )

    flow.append(PageBreak())
    return flow


def proximos_passos():
    flow = section_header("05 · PRÓXIMOS PASSOS", "Como saímos do PDF e entramos em execução.")

    steps = [
        (
            "1 · Reunião de alinhamento",
            "60 minutos com Clara + financeiro pra tirar dúvidas, ajustar detalhes "
            "e decidir o cenário inicial (A, B, C ou D).",
        ),
        (
            "2 · Contrato e onboarding",
            "Recebida a decisão, geramos contrato com escopo detalhado em 5 dias úteis. "
            "Assinatura via DocuSign ou ClickSign.",
        ),
        (
            "3 · Kickoff técnico",
            "Setup de infraestrutura em nome da 30praum, Slack compartilhado ativado, "
            "primeira reunião de planejamento.",
        ),
        (
            "4 · Execução da Fase 1",
            "Desenvolvimento iterativo com demos quinzenais. Site novo + arquitetura "
            "de drop entregues em 60 dias úteis.",
        ),
        (
            "5 · SLA inicia",
            "A partir do mês 2 da Fase 1, sustentação contínua com SLA contratual de "
            "uptime e on-call em drops.",
        ),
    ]
    for titulo, body in steps:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.append(Paragraph(body, styles["body_tight"]))
        flow.append(Spacer(1, 6))

    flow.append(Spacer(1, 14))
    flow.append(
        callout(
            "Decisão concreta pedida",
            "Confirmação por escrito (email ou WhatsApp) do <b>cenário escolhido</b> "
            "até <b>30 dias da emissão desta proposta</b>. Após esse prazo, valores "
            "podem precisar de revalidação com a equipe alocada na data.",
        )
    )

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("Contato", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>Alvaro Carlisbino</b> · Founder<br/>"
            "Email · contato@[software-house].com.br<br/>"
            "WhatsApp · +55 (XX) XXXXX-XXXX",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 30))

    sign_rows = [
        ["", ""],
        ["___________________________________", "___________________________________"],
        ["Pela 30praum · Clara Mendes (CEO)", "Pela CONTRATADA · Alvaro Carlisbino"],
        [f"Data: ___ / ___ / {date.today().year}", f"Data: {date.today().strftime('%d / %m / %Y')}"],
    ]
    t = Table(sign_rows, colWidths=[9 * cm, 9 * cm])
    t.setStyle(
        TableStyle(
            [
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, 0), 28),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 4),
                ("BOTTOMPADDING", (0, 2), (-1, 2), 4),
            ]
        )
    )
    flow.append(t)

    return flow


# ─────────────────────────────────────────────────────────
# BUILD
# ─────────────────────────────────────────────────────────


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="30praum — Proposta Comercial",
        author="Alvaro Carlisbino",
        subject="Proposta comercial 30praum",
    )

    frame_cover = Frame(0, 0, A4[0], A4[1], leftPadding=2 * cm, rightPadding=2 * cm, topPadding=0, bottomPadding=2 * cm, showBoundary=0)
    frame_content = Frame(2 * cm, 2 * cm, A4[0] - 4 * cm, A4[1] - 4 * cm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, showBoundary=0)

    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[frame_cover], onPage=draw_cover),
            PageTemplate(id="content", frames=[frame_content], onPage=draw_chrome),
        ]
    )

    story = []
    story.extend(cover_page())
    story.extend(diagnostico_e_visao())
    story.extend(cenarios())
    story.extend(investimento_e_retorno())
    story.extend(roadmap_futuro())
    story.extend(proximos_passos())

    doc.build(story)
    print(f"✔ PDF comercial gerado: {OUT}")
    print(f"  Tamanho: {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    build()
