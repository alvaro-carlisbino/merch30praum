#!/usr/bin/env python3
"""
Gera a proposta técnica + comercial completa pra 30praum em PDF.
Estilo: minimalista, tipografia forte, acento vermelho Plantão.
"""

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
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
# TOKENS DE DESIGN
# ─────────────────────────────────────────────────────────

ACCENT = colors.HexColor("#d12d3f")  # vermelho Plantão dessaturado pra impressão
INK = colors.HexColor("#0a0a0a")
INK_SOFT = colors.HexColor("#3a3a3a")
MUTED = colors.HexColor("#7a7a7a")
RULE = colors.HexColor("#dedede")
BG_SOFT = colors.HexColor("#f5f4f1")
BG_DARK = colors.HexColor("#0a0a0a")
GREEN = colors.HexColor("#2f7d4f")
AMBER = colors.HexColor("#b8731a")
RED = colors.HexColor("#a83232")

FONT = "Helvetica"
FONT_B = "Helvetica-Bold"

OUT = Path(__file__).parent / "30praum-proposta-tecnica.pdf"

# ─────────────────────────────────────────────────────────
# STYLES
# ─────────────────────────────────────────────────────────

base_styles = getSampleStyleSheet()


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
    "cover_eyebrow": S(
        "cover_eyebrow",
        fontName=FONT_B,
        fontSize=8,
        leading=10,
        textColor=ACCENT,
        spaceAfter=14,
    ),
    "cover_title": S(
        "cover_title",
        fontName=FONT_B,
        fontSize=42,
        leading=46,
        textColor=INK,
        spaceAfter=14,
    ),
    "cover_sub": S(
        "cover_sub",
        fontSize=12,
        leading=18,
        textColor=INK_SOFT,
        spaceAfter=20,
    ),
    "cover_caption": S(
        "cover_caption",
        fontName=FONT_B,
        fontSize=7,
        leading=9,
        textColor=MUTED,
    ),
    "h1": S(
        "h1",
        fontName=FONT_B,
        fontSize=22,
        leading=26,
        textColor=INK,
        spaceBefore=12,
        spaceAfter=10,
    ),
    "h1_eyebrow": S(
        "h1_eyebrow",
        fontName=FONT_B,
        fontSize=7,
        leading=9,
        textColor=ACCENT,
        spaceAfter=6,
    ),
    "h2": S(
        "h2",
        fontName=FONT_B,
        fontSize=14,
        leading=18,
        textColor=INK,
        spaceBefore=14,
        spaceAfter=6,
    ),
    "h3": S(
        "h3",
        fontName=FONT_B,
        fontSize=11,
        leading=14,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=3,
    ),
    "body": S(
        "body",
        fontSize=10,
        leading=15,
        textColor=INK_SOFT,
        spaceAfter=6,
    ),
    "body_tight": S(
        "body_tight",
        fontSize=9.5,
        leading=14,
        textColor=INK_SOFT,
    ),
    "body_small": S(
        "body_small",
        fontSize=8.5,
        leading=12,
        textColor=INK_SOFT,
    ),
    "li": S(
        "li",
        fontSize=10,
        leading=15,
        textColor=INK_SOFT,
        spaceAfter=3,
        leftIndent=10,
        bulletIndent=0,
    ),
    "li_tight": S(
        "li_tight",
        fontSize=9.5,
        leading=13,
        textColor=INK_SOFT,
        leftIndent=10,
        bulletIndent=0,
    ),
    "caption": S(
        "caption",
        fontSize=8,
        leading=10,
        textColor=MUTED,
        fontName=FONT_B,
    ),
    "quote": S(
        "quote",
        fontSize=12,
        leading=18,
        textColor=INK,
        fontName=FONT_B,
        leftIndent=12,
        spaceBefore=6,
        spaceAfter=10,
    ),
    "kpi_label": S(
        "kpi_label",
        fontName=FONT_B,
        fontSize=7,
        leading=9,
        textColor=MUTED,
    ),
    "kpi_value": S(
        "kpi_value",
        fontName=FONT_B,
        fontSize=20,
        leading=24,
        textColor=INK,
    ),
    "kpi_foot": S(
        "kpi_foot",
        fontSize=8,
        leading=10,
        textColor=INK_SOFT,
    ),
    "code": S(
        "code",
        fontName="Courier",
        fontSize=8.5,
        leading=11,
        textColor=INK,
    ),
}


# ─────────────────────────────────────────────────────────
# HELPERS DE LAYOUT
# ─────────────────────────────────────────────────────────

def hr(color=RULE, thickness=0.4, space_before=4, space_after=8):
    """Linha horizontal como tabela 1x1 com border bottom."""
    t = Table([[" "]], colWidths=["100%"], rowHeights=[thickness])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("LINEABOVE", (0, 0), (-1, -1), 0, colors.transparent),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return [Spacer(1, space_before), t, Spacer(1, space_after)]


def bullets(items, style_name="li"):
    return [
        Paragraph(f"<bullet>·</bullet>&nbsp;&nbsp;{item}", styles[style_name])
        for item in items
    ]


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
    """Linha de KPI boxes lado a lado."""
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


def two_col(left_flowables, right_flowables, col_widths=None):
    cw = col_widths or [9 * cm, 9 * cm]
    t = Table([[left_flowables, right_flowables]], colWidths=cw)
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("LEFTPADDING", (1, 0), (1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
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
    # KeepTogether garante que o callout não se parte em duas páginas (título
    # numa, body em outra). Se não couber na página atual, pula inteiro.
    return KeepTogether(inner)


def fmt_brl(n):
    s = f"{n:,.0f}".replace(",", ".")
    return f"R$ {s}"


def wrap_cells(rows, header_style=None, body_style=None):
    """Converte strings em Paragraph pra permitir wrap nativo nas células.

    rows[0] usa header_style (caption por padrão), demais usam body_style
    (body_small por padrão). Cells que já são Paragraph/Table passam direto.
    """
    hstyle = header_style or styles["caption"]
    bstyle = body_style or styles["body_small"]
    out = []
    for i, row in enumerate(rows):
        new_row = []
        for cell in row:
            if isinstance(cell, str):
                style = hstyle if i == 0 else bstyle
                new_row.append(Paragraph(cell, style))
            else:
                new_row.append(cell)
        out.append(new_row)
    return out


# ─────────────────────────────────────────────────────────
# PAGE TEMPLATE (header/footer)
# ─────────────────────────────────────────────────────────


def draw_chrome(canvas, doc):
    """Footer com numeração + identificação."""
    canvas.saveState()
    w, h = A4
    # Top rule (subtle, só nas páginas de conteúdo)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(2 * cm, h - 1.4 * cm, w - 2 * cm, h - 1.4 * cm)
    # Header label
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, h - 1.05 * cm, "30PRAUM · PROPOSTA TÉCNICA E COMERCIAL")
    canvas.drawRightString(w - 2 * cm, h - 1.05 * cm, "v1 · MAI 2026 · CONFIDENCIAL")
    # Footer numeração
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "Software house Alvaro Carlisbino · Documento confidencial")
    canvas.drawRightString(w - 2 * cm, 1.0 * cm, f"Pág. {doc.page:02d}")
    canvas.restoreState()


def draw_cover(canvas, doc):
    """Capa sem header/footer normal."""
    canvas.saveState()
    w, h = A4
    # Bloco de cor no topo
    canvas.setFillColor(BG_DARK)
    canvas.rect(0, h - 6 * cm, w, 6 * cm, stroke=0, fill=1)
    # Linha vertical accent à esquerda — recuada pra não cobrir o texto do frame
    canvas.setFillColor(ACCENT)
    canvas.rect(1.2 * cm, 0, 0.18 * cm, h - 6 * cm, stroke=0, fill=1)
    # Eyebrow / brand no topo
    canvas.setFillColor(colors.white)
    canvas.setFont(FONT_B, 8)
    canvas.drawString(2 * cm, h - 1.4 * cm, "PROPOSTA · TÉCNICA + COMERCIAL")
    canvas.drawRightString(w - 2 * cm, h - 1.4 * cm, "v1 · MAIO 2026")
    canvas.setFillColor(colors.white)
    canvas.setFont(FONT_B, 26)
    canvas.drawString(2 * cm, h - 3.8 * cm, "30PRAUM")
    canvas.setFillColor(colors.HexColor("#c4c4c4"))
    canvas.setFont(FONT, 11)
    canvas.drawString(2 * cm, h - 4.6 * cm, "Holding · Gravadora · Plantão Festival · 10 anos")
    # Footer simples
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, 1.0 * cm, "DOCUMENTO CONFIDENCIAL · DISTRIBUIÇÃO RESTRITA À DIRETORIA 30PRAUM")
    canvas.restoreState()


# ─────────────────────────────────────────────────────────
# CONTEÚDO
# ─────────────────────────────────────────────────────────


def cover_page():
    flow = []
    # Espaço pra área dark do topo (preenchida pelo onPage do template)
    flow.append(Spacer(1, 7 * cm))
    flow.append(Paragraph("PROPOSTA TÉCNICA + COMERCIAL", styles["cover_eyebrow"]))
    flow.append(
        Paragraph(
            "Plataforma proprietária<br/>pra 30praum.",
            styles["cover_title"],
        )
    )
    flow.append(
        Paragraph(
            "Site, e-commerce, ingressos, workflow operacional, infraestrutura "
            "de drop e suporte contínuo — em uma única stack desenhada pra "
            "aguentar 300 mil acessos em 3 minutos e o ritmo de uma gravadora "
            "que acabou de virar holding.",
            styles["cover_sub"],
        )
    )
    flow.append(Spacer(1, 1.4 * cm))
    flow.append(
        Paragraph("PREPARADO PARA", styles["cover_caption"]),
    )
    flow.append(Spacer(1, 3))
    flow.append(
        Paragraph(
            "Clara Mendes · CEO 30praum<br/>Matuê · Cofundador<br/>Diretoria comercial",
            styles["body_tight"],
        )
    )
    flow.append(Spacer(1, 14))
    flow.append(Paragraph("PREPARADO POR", styles["cover_caption"]))
    flow.append(Spacer(1, 3))
    flow.append(
        Paragraph(
            "Alvaro Carlisbino · Founder &amp; CTO terceirizado<br/>"
            f"Data de emissão · {date.today().strftime('%d/%m/%Y')}<br/>"
            "Validade da proposta · 30 dias corridos a contar da emissão",
            styles["body_tight"],
        )
    )
    # Trocar pro template "content" ANTES do PageBreak — senão a próxima página
    # ainda usa "cover" (o NextPageTemplate só tem efeito no próximo break)
    flow.append(NextPageTemplate("content"))
    flow.append(PageBreak())
    return flow


def sumario_executivo():
    flow = section_header("01 · SUMÁRIO EXECUTIVO", "O que está nesta proposta, em uma página.")

    flow.append(
        Paragraph(
            "A 30praum chega aos 10 anos como a maior gravadora independente do Brasil "
            "operando com uma stack que foi desenhada quando vocês ainda eram um selo. "
            "<b>Matuê passou de 950 milhões de streams</b>, o Plantão chegou a 30 mil "
            "pessoas, e o último drop do XTRANHO levou <b>300 mil acessos em 3 minutos</b> "
            "— derrubando o site. Continuar dependendo de Shopify + ST Ingressos + "
            "planilhas é cobrar caro pelo problema errado.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 6))
    flow.append(
        Paragraph(
            "Esta proposta apresenta uma plataforma proprietária construída sob medida pra "
            "vocês, em <b>fases pequenas e sequenciais</b>, com <b>SLA contínuo desde o mês 1</b>, "
            "e <b>quatro modelos de engajamento</b> — do mais leve (Cenário A, mínimo viável) "
            "ao parceiro fixo (Cenário D, time embedded com PLR). A ideia é construir uma "
            "relação que dura, não um projeto que termina.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 14))

    # KPIs do projeto
    flow.append(
        kpi_row(
            [
                ("ENTREGA", "3 fases", "30 a 60 dias por fase"),
                ("EQUIPE FIXA", "Alvaro + Cauã", "+ pleno parcial · QA · PM"),
                ("SLA", "24 meses", "Mínimo contratual"),
                ("UPTIME", "99.95%", "Garantia em contrato"),
            ]
        )
    )

    flow.append(Spacer(1, 14))

    flow.append(Paragraph("Os quatro cenários, em uma linha cada", styles["h2"]))
    cenarios = [
        [
            Paragraph("<b>A · Mínimo viável</b>", styles["body_tight"]),
            Paragraph(
                "Site novo + Shopify headless + CMS + segurança básica. "
                "Mantém ST Ingressos. Modo cauteloso pra testar parceria.",
                styles["body_tight"],
            ),
            Paragraph(fmt_brl(95_000), styles["body_tight"]),
            Paragraph(fmt_brl(6_500) + "/mês", styles["body_tight"]),
        ],
        [
            Paragraph("<b>B · Híbrido — recomendado</b>", styles["body_tight"]),
            Paragraph(
                "Tudo do A + Plantão checkout próprio (substitui ST) + workflow + "
                "admin de pedidos. Equilibra controle, ROI e risco.",
                styles["body_tight"],
            ),
            Paragraph(fmt_brl(148_000), styles["body_tight"]),
            Paragraph(fmt_brl(9_500) + "/mês", styles["body_tight"]),
        ],
        [
            Paragraph("<b>C · Acelerado</b>", styles["body_tight"]),
            Paragraph(
                "Tudo do B + e-commerce próprio (sai do Shopify) + app mobile. "
                "Controle total, sem dependência de terceiro.",
                styles["body_tight"],
            ),
            Paragraph(fmt_brl(243_000), styles["body_tight"]),
            Paragraph(fmt_brl(13_000) + "/mês", styles["body_tight"]),
        ],
        [
            Paragraph("<b>D · Time Embedded + PLR</b>", styles["body_tight"]),
            Paragraph(
                "Alvaro + Cauã fixos no projeto eternamente, sem entrega upfront. "
                "Modelo de partnership: fixo mensal + PLR sobre economia gerada.",
                styles["body_tight"],
            ),
            Paragraph("—", styles["body_tight"]),
            Paragraph(fmt_brl(18_000) + "/mês<br/>+ 3% PLR", styles["body_tight"]),
        ],
    ]

    t = Table(
        [
            [
                Paragraph("CENÁRIO", styles["caption"]),
                Paragraph("ABORDAGEM", styles["caption"]),
                Paragraph("ENTREGA", styles["caption"]),
                Paragraph("SLA / MÊS", styles["caption"]),
            ]
        ]
        + cenarios,
        colWidths=[4.2 * cm, 7.8 * cm, 3.2 * cm, 3.3 * cm],
        repeatRows=1,
    )
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("LINEBELOW", (0, 0), (-1, 0), 0.6, INK),
                ("LINEBELOW", (0, 1), (-1, -2), 0.3, RULE),
                ("BACKGROUND", (0, 2), (-1, 2), BG_SOFT),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(
        callout(
            "Nossa recomendação",
            "<b>Cenário B (híbrido) pra entrega + Cenário D (embedded) pra continuidade.</b> "
            "Começa com escopo enxuto que paga sozinho em 1 edição do Plantão sem ST. "
            "Quando bater confiança, migra pra modelo de time fixo com PLR — "
            "vocês fidelizam o time, e nós ficamos alinhados com o sucesso de vocês.",
        )
    )

    flow.append(PageBreak())
    return flow


def diagnostico():
    flow = section_header("02 · DIAGNÓSTICO", "O que ouvimos de vocês e o que isso significa tecnicamente.")

    flow.append(
        Paragraph(
            "Estas são as dores levantadas em reunião, traduzidas pra requisitos "
            "concretos que essa plataforma precisa resolver:",
            styles["body"],
        )
    )

    dores = [
        (
            "Site cai em drops grandes",
            "300 mil acessos em 3 minutos derrubaram o site no XTRANHO. "
            "Isso é um problema de <b>arquitetura</b>, não de plano Shopify maior. "
            "Resolvemos com: cache no edge (Cloudflare global), páginas pré-renderizadas, "
            "fila de checkout sob pico, auto-scale dos workers, pré-aquecimento "
            "agendado antes de drop confirmado.",
        ),
        (
            "Processos organizacionais soltos",
            "Quem aprova post? Qual prazo de news? Como liberar drop? Hoje passa por "
            "WhatsApp. Vamos construir um <b>workflow engine</b> em cima do nosso CMS "
            "com responsável, aprovador, SLA e notificação automática quando estoura prazo.",
        ),
        (
            "Falta de controle sobre dados e jornada",
            "No Shopify atual, os dados do fã ficam no Shopify, a jornada é a do Shopify, "
            "e qualquer customização passa por app de terceiro. Resolvemos trazendo "
            "<b>checkout, dados de cliente e jornada</b> pra nossa plataforma, com Shopify "
            "ou outro ERP como backend de produto/fiscal.",
        ),
        (
            "Custo da ST Ingressos",
            "8 a 10% de taxa sobre cada ingresso. Numa edição de R$ 6 milhões bruto, "
            "isso é <b>R$ 480 mil pago pra um intermediário</b>. Vamos construir "
            "checkout próprio de ingressos com gateway próprio (taxa 2,5 a 3% só do "
            "gateway), QR seguro, validação na portaria via PWA e relatório de venda "
            "em tempo real.",
        ),
        (
            "App",
            "Confirmado o interesse. Vamos entregar como Fase 5 — PWA primeiro (rodando "
            "no navegador como app instalável) e React Native (iOS + Android) na "
            "sequência. Funcionalidades: notificação de drop, carteira de ingressos, "
            "perfil do fã, fila prioritária.",
        ),
        (
            "Segurança",
            "Vocês explicitaram que segurança é prioridade. Nessa proposta isso "
            "aparece em três camadas: <b>headers + WAF + rate limit</b> contra ataque, "
            "<b>criptografia at-rest</b> de PII (CPF, endereço), <b>2FA + audit log "
            "imutável</b> pro time admin. Mais auditoria de segurança terceirizada "
            "embutida na Fase 4.",
        ),
    ]

    for title, body in dores:
        flow.append(Paragraph(title, styles["h3"]))
        flow.append(Paragraph(body, styles["body_tight"]))
        flow.append(Spacer(1, 6))

    flow.append(Spacer(1, 8))
    flow.append(
        callout(
            "Tradução resumida",
            "Vocês não precisam de um site novo. Vocês precisam de um <b>sistema "
            "operacional pra gravadora</b> — site + checkout + ingressos + workflow + "
            "app + analytics — que aguente picos, proteja dados, e tire o time do "
            "WhatsApp como ferramenta de gestão.",
        )
    )

    flow.append(PageBreak())
    return flow


def visao_plataforma():
    flow = section_header("03 · VISÃO DA PLATAFORMA", "O que estamos construindo, em linguagem de produto.")

    flow.append(
        Paragraph(
            "Uma única plataforma, chamada internamente de <b>30praum.os</b>, com "
            "cinco superfícies que compartilham o mesmo backend, o mesmo banco de dados "
            "e o mesmo sistema de autenticação:",
            styles["body"],
        )
    )

    superficies = [
        (
            "30praum.com",
            "Site público — vitrine, drops, álbuns, news, shows, plantão, parcerias, "
            "incubadora e loja. Foco em performance e SEO. Páginas críticas pré-"
            "renderizadas em build time e servidas do edge.",
        ),
        (
            "shop.30praum.com",
            "Loja e-commerce — catálogo navegável, carrinho persistente, checkout "
            "próprio com Pix/cartão/boleto, programa fidelidade, cupom, frete em tempo "
            "real, área do cliente com histórico de pedidos e wishlist.",
        ),
        (
            "ingressos.30praum.com",
            "Checkout de ingressos do Plantão e shows individuais — sem ST. Lotes "
            "configuráveis, meia-entrada, anti-cambismo (1 CPF = limite), QR único "
            "criptograficamente assinado, PWA de validação na portaria.",
        ),
        (
            "admin.30praum.com",
            "Painel interno — CRUD de produto, gestão de pedido, ingresso, drop, news, "
            "show, parceria, fã. Workflow engine com aprovação multi-pessoa. Analytics "
            "consolidado. Auditoria de quem-fez-o-quê. 2FA obrigatório.",
        ),
        (
            "App (iOS + Android)",
            "App mobile — notificação de drop, fila prioritária, carteira de ingressos "
            "com QR offline, perfil do fã, conteúdo exclusivo, integração com Spotify, "
            "histórico de compras, suporte direto.",
        ),
    ]

    rows = []
    for nome, desc in superficies:
        rows.append(
            [
                Paragraph(f"<b>{nome}</b>", styles["body_tight"]),
                Paragraph(desc, styles["body_tight"]),
            ]
        )

    t = Table(rows, colWidths=[5.0 * cm, 13.5 * cm])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("BACKGROUND", (0, 0), (0, -1), BG_SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("Princípios de design da plataforma", styles["h2"]))
    principios = [
        "<b>Edge-first</b> · 90% do tráfego nunca chega ao servidor, vem do cache global.",
        "<b>Fail-soft</b> · se um serviço cair, o site não cai junto — degrada graciosamente.",
        "<b>Pre-warm</b> · drops anunciados aquecem cache 30 minutos antes da hora marcada.",
        "<b>Queue everything</b> · checkout sob pico não dá erro 503, entra em fila com posição visível.",
        "<b>Audit by default</b> · toda ação admin gera log imutável com IP, usuário, payload e timestamp.",
        "<b>LGPD by design</b> · PII separado, criptografia at-rest, retenção definida, direito de esquecimento implementado.",
        "<b>Zero trust admin</b> · 2FA obrigatório, IP allowlist opcional, sessions curtas, rotação de credenciais.",
        "<b>Token-based payments</b> · cartão nunca toca nossa aplicação — tokenização via gateway PCI Level 1.",
    ]
    flow.extend(bullets(principios))

    flow.append(PageBreak())
    return flow


def arquitetura():
    flow = section_header("04 · ARQUITETURA TÉCNICA", "Como o sistema é construído, camada por camada.")

    flow.append(Paragraph("Diagrama macro · camadas da plataforma", styles["h2"]))
    flow.append(
        Paragraph(
            "Da requisição do fã até o banco de dados, passando por edge, app, "
            "serviços externos e observabilidade. Cada caixa abaixo é uma camada "
            "isolada que pode ser substituída sem refazer o resto.",
            styles["body_tight"],
        )
    )
    flow.append(Spacer(1, 10))

    # Diagrama renderizado como tabelas nativas — cada camada vira uma faixa
    def layer(title, items, bg=BG_SOFT, accent=ACCENT, fg=INK):
        title_p = Paragraph(
            f'<font color="#{accent.hexval()[2:]}"><b>▸ {title}</b></font>',
            styles["body_tight"],
        )
        cells = [
            Paragraph(f"<b>{name}</b><br/><font size=7 color='#7a7a7a'>{desc}</font>", styles["body_small"])
            for name, desc in items
        ]
        n = len(cells)
        col_w = (18.5 * cm) / n
        body = Table([cells], colWidths=[col_w] * n)
        body.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                    ("BOX", (0, 0), (-1, -1), 0.3, RULE),
                    ("LINEBEFORE", (1, 0), (-1, -1), 0.3, RULE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ]
            )
        )
        wrap = Table([[title_p], [body]], colWidths=[18.5 * cm])
        wrap.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), bg),
                    ("LEFTPADDING", (0, 0), (-1, 0), 12),
                    ("RIGHTPADDING", (0, 0), (-1, 0), 12),
                    ("TOPPADDING", (0, 0), (-1, 0), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
                    ("LEFTPADDING", (0, 1), (-1, 1), 0),
                    ("RIGHTPADDING", (0, 1), (-1, 1), 0),
                    ("TOPPADDING", (0, 1), (-1, 1), 0),
                    ("BOTTOMPADDING", (0, 1), (-1, 1), 0),
                ]
            )
        )
        return wrap

    arrow = Paragraph(
        '<para align="center"><font size=8 color="#7a7a7a">▼</font></para>',
        styles["body_small"],
    )

    layers = [
        layer(
            "Cliente final",
            [
                ("Browser web", "Site público, loja, ingressos"),
                ("App mobile", "iOS + Android (Fase 5)"),
                ("PWA admin", "Validação portaria · scanner QR"),
            ],
        ),
        layer(
            "Edge · proteção e cache",
            [
                ("Cloudflare CDN", "Cache global em 285 cidades"),
                ("WAF + DDoS", "OWASP Top 10 · bot manager"),
                ("Rate limit", "IP · CPF · device fingerprint"),
            ],
        ),
        layer(
            "Aplicação Next.js",
            [
                ("Server Components", "Páginas dinâmicas · ISR 60s"),
                ("API routes", "Checkout · webhooks · auth"),
                ("Server Actions", "CSRF nativo · validação Zod"),
            ],
        ),
        layer(
            "Backend de dados e CMS",
            [
                ("Supabase Postgres", "PII cifrado · RLS · backup diário"),
                ("Payload CMS 3", "News · drops · workflow · roles"),
                ("Cloudflare R2", "Imagens · backups · WORM bucket"),
            ],
        ),
        layer(
            "Filas, jobs e async",
            [
                ("BullMQ", "Checkout sob pico · retries"),
                ("CF Workers cron", "Pré-aquecimento · agendados"),
                ("Webhooks", "Gateway · Shopify · fiscal"),
            ],
        ),
        layer(
            "Serviços externos plugáveis",
            [
                ("Gateway pagto", "Pagar.me · Stone · PCI Level 1"),
                ("Antifraude", "Clearsale · Konduto · score risk"),
                ("ERP + NFe", "Shopify (B) · Tiny/Bling (C)"),
            ],
        ),
        layer(
            "Observabilidade",
            [
                ("Sentry", "Erros · performance · breadcrumb"),
                ("Better Stack", "Uptime · status page público"),
                ("PostHog + GA4", "Funil · sessão · atribuição"),
            ],
        ),
    ]

    for i, l in enumerate(layers):
        flow.append(l)
        if i < len(layers) - 1:
            flow.append(arrow)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Stack consolidada", styles["h2"]))

    stack_rows = [
        ["CAMADA", "TECNOLOGIA", "POR QUÊ"],
        [
            "Frontend",
            "Next.js 16 + React 19 + Tailwind v4",
            "Edge runtime, ISR, RSC, performance native",
        ],
        [
            "Hosting / CDN",
            "Vercel Pro Team + Cloudflare Pro",
            "Edge global, deploy preview, WAF, bot manager",
        ],
        [
            "Banco de dados",
            "Supabase (Postgres 16)",
            "Postgres puro, RLS, auth integrado, backup",
        ],
        [
            "CMS",
            "Payload CMS 3 (self-hosted)",
            "Editor visual + API REST/GraphQL, roles, audit",
        ],
        [
            "Auth",
            "Supabase Auth + WebAuthn / TOTP",
            "Magic link + 2FA obrigatório no admin",
        ],
        [
            "Storage",
            "Cloudflare R2 (S3-compatível)",
            "Sem egress fee, versionado, lifecycle policy",
        ],
        [
            "Gateway pagamento",
            "Pagar.me ou Stone (PCI Level 1)",
            "Pix + cartão + boleto, tokenização obrigatória",
        ],
        [
            "Antifraude",
            "Clearsale ou Konduto",
            "Análise risco transação por transação",
        ],
        [
            "Fiscal (NFe)",
            "Tiny ERP ou Bling (terceirizado)",
            "Emissão automática, contingência, backup 5 anos",
        ],
        [
            "Email transacional",
            "Resend",
            "Pix confirmado, pedido enviado, drop disponível",
        ],
        [
            "Email marketing",
            "ActiveCampaign Plus",
            "Sync com pedido + ingresso pra segmentação",
        ],
        [
            "Filas + cron",
            "BullMQ + Cloudflare Workers cron",
            "Checkout sob pico, retries, agendamento",
        ],
        [
            "Search",
            "Meilisearch Cloud",
            "Busca de produto, news, lineup",
        ],
        [
            "Monitoring",
            "Sentry + Vercel Analytics + Better Stack",
            "Erro, performance, uptime, alerta Slack/SMS",
        ],
        [
            "Secrets",
            "Doppler Team",
            "Rotação de credenciais sem rebuild",
        ],
        [
            "Analytics",
            "PostHog + GA4 + Meta CAPI",
            "Funil, sessão, atribuição de ads",
        ],
        [
            "App mobile",
            "React Native 0.75 + Expo SDK 52",
            "iOS + Android com 90% de código compartilhado",
        ],
    ]

    t = Table(wrap_cells(stack_rows), colWidths=[3.6 * cm, 5.6 * cm, 9.3 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, 0), 8),
                ("FONTSIZE", (0, 1), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)
    flow.append(PageBreak())
    return flow


def infraestrutura_drop():
    flow = section_header("05 · INFRAESTRUTURA DE DROP", "Como aguentamos 300 mil acessos em 3 minutos.")

    flow.append(
        Paragraph(
            "Esse é o problema técnico mais crítico que vocês trouxeram, e a maior "
            "fonte de prejuízo: <b>cada minuto fora do ar em drop quente é receita "
            "perdida pra sempre</b>. Cliente que não conseguiu comprar não volta — vai "
            "pro Mercado Livre comprar de cambista, ou desiste. Eis o protocolo "
            "completo que rodamos antes, durante e depois de cada drop:",
            styles["body"],
        )
    )

    fases = [
        (
            "D-7 · Preparação",
            [
                "Página do drop criada, em estado <b>oculto</b>, com URL travada por feature flag.",
                "Catálogo do drop populado, fotos otimizadas (WebP + AVIF + fallback), variantes definidas.",
                "Estoque reservado e isolado em SKU exclusivo do drop — não compartilha com loja normal.",
                "Load test sintético com k6: simulação de 500 mil sessões concorrentes contra ambiente de staging.",
                "Configuração de rate limit no Cloudflare: 60 req/min por IP em rotas públicas, 6 req/min em <code>/api/checkout</code>.",
                "Webhook do gateway pré-validado em sandbox.",
            ],
        ),
        (
            "D-1 · Pré-aquecimento",
            [
                "Cache do Cloudflare pré-populado em todas as 285 cidades de edge.",
                "Workers do gateway escalados manualmente pra capacidade 5x.",
                "Comunicação prévia agendada: SMS + push + email 1h antes do drop.",
                "On-call confirmado: 1 dev sênior + 1 SRE em standby 30 min antes da hora do drop.",
                "Status page pública (<code>status.30praum.com</code>) pré-publicada.",
            ],
        ),
        (
            "H-hora · Durante o drop",
            [
                "Feature flag aberta no segundo exato — propagação edge em &lt; 3 segundos globalmente.",
                "Fila de checkout ativa: cliente vê posição em tempo real, sem erro 503.",
                "Dashboard interno em tempo real: pedidos/segundo, latência p50/p95/p99, taxa de erro, fila.",
                "Auto-scale automático de workers se latência p95 ultrapassar 800ms.",
                "Anti-bot ativo: Turnstile invisível pra humano, captcha visível pra suspeito, bloqueio direto pra padrão de bot.",
                "Anti-cambismo: 1 CPF compra no máximo 4 itens, fingerprint do device, lista de bloqueio em tempo real.",
            ],
        ),
        (
            "D+1 · Pós-mortem",
            [
                "Relatório automático entregue em 12h: gráficos de tráfego, conversão, abandono, erros.",
                "Comparativo com drops anteriores: melhora/piora de métricas.",
                "Lista de incidentes (mesmo os pequenos) com causa raiz e remediação proposta.",
                "Apresentação pra time 30praum em call de 30 min — opcional.",
            ],
        ),
    ]

    for titulo, items in fases:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.extend(bullets(items, "li_tight"))
        flow.append(Spacer(1, 6))

    flow.append(Spacer(1, 8))
    flow.append(
        callout(
            "Garantia contratual",
            "Uptime de <b>99,95%</b> em janela mensal, <b>incluindo dias de drop anunciados "
            "com 7 dias de antecedência</b>. Cair em drop programado = devolução de 1 mês "
            "do SLA + crédito proporcional pro trimestre seguinte. Esta cláusula entra "
            "no contrato com peso real.",
        )
    )

    flow.append(PageBreak())
    return flow


def workflow_engine():
    flow = section_header("06 · WORKFLOW ENGINE", "Como tiramos a operação do WhatsApp e botamos em sistema.")

    flow.append(
        Paragraph(
            "Em uma gravadora a tarefa quase nunca é simples — quase tudo precisa "
            "passar por aprovação de uma ou mais pessoas, dentro de um prazo, com "
            "documentação. Hoje isso acontece em chat e email; vamos botar em sistema.",
            styles["body"],
        )
    )

    flow.append(Paragraph("Processos modelados na entrega", styles["h2"]))

    proc_rows = [
        ["PROCESSO", "CRIA", "APROVA", "SLA", "PUBLICAÇÃO"],
        ["Post Instagram artista", "Time social", "Manager + Clara", "4h", "Agendada"],
        ["News no site", "Editor", "Clara", "2h", "Imediata"],
        ["Drop de produto", "Marketing", "Clara + Financeiro", "24h", "Manual"],
        ["Agendar show", "Booking", "Artista + Clara", "48h", "Manual"],
        ["Press release", "PR", "Clara + Jurídico", "12h", "Manual"],
        ["Aprovar parceria", "Comercial", "Clara + Jurídico", "5d úteis", "Manual"],
        ["Liberar refund", "SAC", "Financeiro", "24h", "Automática"],
        ["Publicar lineup Plantão", "Marketing", "Clara + 4 artistas", "72h", "Agendada"],
    ]
    t = Table(wrap_cells(proc_rows), colWidths=[4.4 * cm, 3.0 * cm, 3.6 * cm, 2.0 * cm, 2.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Como cada item se comporta no sistema", styles["h2"]))
    features = [
        "Cada processo tem <b>responsável (R), aprovador (A), consultado (C), informado (I)</b> — matriz RACI digital.",
        "Cada etapa tem <b>SLA em horas/dias</b>. Sistema conta sozinho e notifica quando estoura.",
        "Notificação <b>multi-canal</b>: Slack, email, push no app, WhatsApp via API oficial.",
        "<b>Trilha de auditoria</b>: quem aprovou, quando, em qual IP, com qual comentário. Imutável.",
        "<b>Versionamento</b>: cada draft de post/news fica salvo. Pode-se reverter ou comparar.",
        "<b>Escalonamento automático</b>: se SLA estourar, notifica chefe direto. Estoura segunda vez, notifica Clara.",
        "<b>Bypass com 2 assinaturas</b>: em emergência (drop antecipado, crise PR), 2 admins podem aprovar sem o fluxo normal — mas fica marcado como bypass no log.",
        "<b>Métricas operacionais</b>: tempo médio de aprovação por área, gargalos, pessoas sobrecarregadas.",
    ]
    flow.extend(bullets(features))

    flow.append(PageBreak())
    return flow


def seguranca_compliance():
    flow = section_header("07 · SEGURANÇA E COMPLIANCE", "Camada por camada, sem economia.")

    flow.append(
        Paragraph(
            "Vocês foram explícitos: <b>segurança é prioridade</b>. Esta seção lista, "
            "vírgula por vírgula, o que está dentro do escopo de qualquer um dos três "
            "cenários — não é upsell.",
            styles["body"],
        )
    )

    sec_blocks = [
        (
            "Camada 1 · Rede e edge",
            [
                "TLS 1.3 obrigatório, com HSTS preload e renovação automática (Let's Encrypt + Cloudflare).",
                "HTTP/3 + QUIC ativos pra reduzir latência em mobile.",
                "WAF Cloudflare com ruleset OWASP Top 10 + regras customizadas pra padrões de ataque conhecidos.",
                "Bot manager — distingue humano, bot bom (Google, Bing) e bot ruim (scraper, cambista).",
                "Rate limit por IP, por sessão e por CPF nas rotas críticas.",
                "DDoS protection L3/L4/L7 incluso no plano Cloudflare Pro.",
                "Bloqueio geográfico opcional (por exemplo, recusar tráfego de geografias sem operação ativa).",
            ],
        ),
        (
            "Camada 2 · Aplicação",
            [
                "Headers HTTP completos: CSP estrito, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin, Permissions-Policy travando câmera/microfone/geolocation/cohort, Cross-Origin-Opener-Policy same-origin.",
                "<b>poweredByHeader</b> desligado — não revelamos versão do stack pra atacante.",
                "Validação de input com Zod em <b>toda</b> rota pública e webhook.",
                "Webhooks verificados por assinatura HMAC-SHA256 — não confiamos só na origem.",
                "CSRF tokens em rotas mutativas via Server Actions do Next.js.",
                "Server-side errors nunca vazam stack trace pro cliente.",
                "Console.log proibido em prod via ESLint + CI.",
            ],
        ),
        (
            "Camada 3 · Dados",
            [
                "PII sensível (CPF, RG, endereço) cifrado <b>at-rest</b> via pgcrypto com chave AES-256 armazenada fora do banco.",
                "Cartão de crédito <b>nunca</b> toca a aplicação — tokenização exclusiva no gateway PCI Level 1.",
                "Row-Level Security do Postgres ativo: usuário só lê o que sua role permite.",
                "Audit log <b>imutável</b> em tabela append-only + cópia em bucket WORM no R2.",
                "Backup diário automático do Postgres + restore testado mensalmente em ambiente isolado.",
                "Retenção por classe de dado: pedido 5 anos (fiscal), ingresso 5 anos, sessão 30 dias, log 90 dias.",
                "Direito de esquecimento (LGPD): endpoint <code>/api/me/delete</code> que efetivamente apaga (não soft-delete).",
            ],
        ),
        (
            "Camada 4 · Identidade e acesso",
            [
                "Magic link via Resend pra login do fã — sem senha pra vazar.",
                "2FA obrigatório (TOTP ou WebAuthn) pra qualquer admin.",
                "Sessions JWT curtas (15 min) + refresh token rotacionado.",
                "RBAC granular: superadmin (Clara), editor (time), gerente artista (vê só o universo dele), financeiro (vê só pedidos), SAC (vê só tickets).",
                "IP allowlist opcional pra superadmin acessar de fora do escritório.",
                "Quebra de sessão automática em mudança de IP suspeita.",
            ],
        ),
        (
            "Camada 5 · Anti-fraude e anti-cambismo",
            [
                "Antifraude do gateway (Clearsale ou Konduto) avalia risco transação por transação.",
                "Limite de 4 ingressos por CPF + 4 por cartão + 4 por device fingerprint.",
                "Bloqueio de transferência de ingresso (anti-cambismo nativo do Plantão).",
                "Lista negra de CPF/email/cartão alimentada por incidentes anteriores.",
                "Captcha invisible (Cloudflare Turnstile) no checkout.",
                "Análise de velocity: 10 pedidos do mesmo IP em 1 min = bloqueio temporário.",
            ],
        ),
        (
            "Camada 6 · Operação e auditoria externa",
            [
                "Auditoria de segurança terceirizada na Fase 4 — incluímos no preço (R$ 8.000 internos).",
                "Pentest opcional anual (recomendado, fora do escopo da Fase 4, ~R$ 22.000 separado).",
                "Plano de resposta a incidente escrito e testado.",
                "Runbook de recuperação de desastre com RTO &lt; 1h e RPO &lt; 5min.",
                "Dependabot ativo + npm audit em CI — bloqueia merge com vulnerabilidade crítica.",
                "Rotação de secrets a cada 90 dias.",
                "Compliance LGPD documentada com DPO terceirizado opcional.",
            ],
        ),
    ]

    for titulo, items in sec_blocks:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.extend(bullets(items, "li_tight"))
        flow.append(Spacer(1, 6))

    flow.append(PageBreak())
    return flow


def estrutura_equipe():
    flow = section_header("08 · ESTRUTURA DE EQUIPE", "Quem entrega e quem sustenta — todos os papéis declarados.")

    flow.append(
        Paragraph(
            "Esta proposta envolve um time dedicado da nossa software house, com "
            "papéis explicitamente definidos. Vocês não falam com 8 freelancers "
            "diferentes — vocês têm um <b>tech lead único</b> como ponto de entrada.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Time de entrega (durante as fases)", styles["h2"]))

    team_rows = [
        ["PAPEL", "RESPONSABILIDADE", "ALOCAÇÃO"],
        [
            "Tech Lead / CTO terceirizado",
            "Arquitetura, decisões técnicas, ponto único de contato com a Clara, "
            "code review, on-call principal em drops.",
            "100% durante Fases 1-2, 60% Fases 3-5, 30% no SLA",
        ],
        [
            "Senior Full-stack",
            "Implementação de frontend + backend, integrações, testes E2E.",
            "100% durante todas as fases",
        ],
        [
            "Pleno Full-stack",
            "Features menores, sustentação durante fases, suporte ao sênior.",
            "60% durante todas as fases",
        ],
        [
            "Designer (já contratado pela 30praum)",
            "Sistema de design, screens, ilustração, manutenção visual.",
            "Conforme contrato externo (R$ 20k acertado)",
        ],
        [
            "QA / Tester",
            "Testes E2E (Playwright), testes de carga (k6), regressão antes de cada drop.",
            "40% nas Fases 2-5",
        ],
        [
            "PM / Coordenação",
            "Reuniões com a 30praum, plano de fase, milestones, gestão de risco.",
            "30% durante todas as fases",
        ],
        [
            "Mobile Developer (Fase 5)",
            "App React Native, integração nativa (push, biometria, carteira).",
            "100% durante Fase 5",
        ],
    ]
    t = Table(wrap_cells(team_rows), colWidths=[4.6 * cm, 9.0 * cm, 4.9 * cm], repeatRows=1)
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
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Time de sustentação (durante o SLA)", styles["h2"]))
    sla_rows = [
        ["PAPEL", "RESPONSABILIDADE", "DISPONIBILIDADE"],
        [
            "Tech Lead",
            "Decisão técnica, escalonamento, ponto único de contato.",
            "Horário comercial + on-call drop",
        ],
        [
            "Senior Full-stack (rotativo)",
            "Manutenção, ajustes, evoluções pequenas, deploys.",
            "Horário comercial",
        ],
        [
            "SRE / DevOps (parcial)",
            "Monitoramento ativo, response a alertas, otimização.",
            "On-call 24/7 com SLA",
        ],
        [
            "PM (parcial)",
            "Reuniões semanais, roadmap de evolução, planejamento de releases.",
            "Sessão semanal de 60min + ad-hoc",
        ],
    ]
    t = Table(wrap_cells(sla_rows), colWidths=[4.6 * cm, 9.0 * cm, 4.9 * cm], repeatRows=1)
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
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 12))
    flow.append(
        callout(
            "Como vocês se relacionam com o time",
            "Vocês têm <b>um único Slack compartilhado</b> com nossa equipe, um "
            "<b>WhatsApp do Tech Lead</b> pra emergência, e uma <b>call semanal</b> "
            "de 60 minutos pra alinhar prioridades. Não há limite de chamados — "
            "apenas SLA de resposta por severidade (ver seção 10).",
        )
    )

    flow.append(PageBreak())
    return flow


def fases():
    flow = section_header("09 · FASES DE ENTREGA", "Três fases principais sequenciais + duas opcionais.")

    flow.append(
        Paragraph(
            "Cada fase é um contrato autônomo. Vocês aprovam fase a fase, com gate "
            "de pagamento em milestones, sem comprometer capital com tudo de uma vez. "
            "Os preços abaixo são do <b>Cenário B (híbrido, recomendado)</b>. As "
            "Fases 4 e 5 são opcionais — entram conforme demanda. Para preços dos "
            "cenários A, C e D (embedded), ver seção 11.",
            styles["body"],
        )
    )

    fases_data = [
        {
            "n": "FASE 1",
            "titulo": "Site novo + CMS + Arquitetura de drop",
            "prazo": "60 dias úteis",
            "preco": 68_000,
            "milestones": "50% sign · 50% entrega",
            "entrega": [
                "Site público completo (30praum.com) — todas as páginas existentes redesenhadas, integradas e responsivas (desktop, tablet, mobile).",
                "Sistema de design documentado (paleta, tipografia, componentes, animações).",
                "CMS Payload instalado e populado: news, álbuns, shows, parcerias, incubadora.",
                "Roles iniciais do CMS: superadmin, editor, gerente de artista, leitor.",
                "Auth admin com magic link + 2FA TOTP obrigatório.",
                "Arquitetura de drop: Cloudflare + ISR + cache edge + WAF + rate limit.",
                "Load test sintético validado (500 mil sessões em staging).",
                "Status page pública configurada (status.30praum.com).",
                "Monitoramento ativo: Sentry + Better Stack + alerta Slack.",
                "Compliance LGPD básica: banner consent, política de privacidade, endpoint de remoção.",
                "Documentação técnica: README, ADRs, runbook de drop.",
            ],
        },
        {
            "n": "FASE 2",
            "titulo": "Plantão checkout próprio + Workflow + Admin",
            "prazo": "45 dias úteis",
            "preco": 52_000,
            "milestones": "50% sign · 50% entrega",
            "entrega": [
                "Catálogo navegável (loja.30praum.com) sincronizado com Shopify via Storefront API.",
                "Carrinho persistente entre sessões e dispositivos (login).",
                "Checkout próprio: dados de entrega, cupom, frete em tempo real, parcelamento.",
                "Integração com gateway (Pagar.me ou Stone): Pix, cartão, boleto, antifraude.",
                "Sync bidirecional com Shopify Admin API: pedido pago no nosso checkout vira pedido no Shopify pra emissão de NFe.",
                "Área do cliente: histórico de pedidos, wishlist, dados de entrega, pagamentos.",
                "Admin de pedidos: ver, filtrar, exportar, estornar, anotar.",
                "Admin de cliente: ver perfil, LTV, pedidos, ingressos, anotações internas.",
                "Email transacional: confirmação, envio, entrega — design e copy custom.",
                "Cupons: percentual, valor fixo, frete grátis, limite por cliente.",
            ],
        },
        {
            "n": "FASE 3",
            "titulo": "LGPD + 2FA + Audit log + Auditoria externa",
            "prazo": "30 dias úteis",
            "preco": 28_000,
            "milestones": "100% entrega",
            "entrega": [
                "Checkout próprio de ingressos (ingressos.30praum.com) substituindo ST Ingressos.",
                "Lotes configuráveis com data de virada, anti-cambismo nativo, meia-entrada validada.",
                "QR único por ingresso, assinado com HMAC-SHA256, válido offline.",
                "PWA de validação na portaria: scanner de QR, marca ingresso como usado, funciona sem internet.",
                "Workflow engine completo (todos os processos da seção 06).",
                "Notificação multi-canal: Slack, email, push, WhatsApp via API oficial.",
                "Calendário editorial visual integrado: arrasta e solta posts, drops, news.",
                "Admin de ingresso: dashboard em tempo real durante venda, exportações, relatórios.",
                "Refund automatizado de ingresso até 7 dias antes do evento (regra fiscal cumprida).",
            ],
        },
        {
            "n": "FASE 4 (opcional)",
            "titulo": "E-commerce 100% próprio (sai do Shopify)",
            "prazo": "60 dias úteis",
            "preco": 95_000,
            "milestones": "40% sign · 30% mid · 30% entrega",
            "entrega": [
                "Auditoria de segurança terceirizada (incluída no preço, ~R$ 8k internos).",
                "Audit log imutável: todas as ações admin em tabela append-only + cópia WORM em R2.",
                "Criptografia at-rest de PII via pgcrypto com chave fora do banco.",
                "RBAC granular: papéis por área (financeiro, social, gerente artista, SAC).",
                "Compliance LGPD completa: mapeamento de dados, retenção, DPO documentado.",
                "Plano de resposta a incidente escrito e testado em tabletop exercise.",
                "Runbook de recuperação de desastre com RTO &lt; 1h, RPO &lt; 5min.",
                "Pentest opcional (fora do escopo, ~R$ 22k separados).",
                "Treinamento de segurança pro time admin (1 sessão de 90 min).",
                "Hardening final: rotação de credenciais, revisão de permissões, scan de vulnerabilidades.",
            ],
        },
        {
            "n": "FASE 5 (opcional)",
            "titulo": "App mobile iOS + Android",
            "prazo": "60 dias úteis",
            "preco": 65_000,
            "milestones": "50% sign · 50% entrega",
            "entrega": [
                "App React Native + Expo, publicado nas duas lojas (iOS e Android).",
                "Onboarding com login via Apple/Google + magic link como fallback.",
                "Notificação push de drop, com pré-agendamento e segmentação.",
                "Carteira de ingressos com QR offline, brilho automático e bloqueio de screenshot.",
                "Fila prioritária no drop pra usuário do app.",
                "Perfil do fã: histórico de compras, ingressos passados, gostos musicais.",
                "Integração com Spotify (login OAuth) pra exibir top tracks do fã.",
                "Conteúdo exclusivo do app: bastidores, prévias, drops antecipados.",
                "Suporte direto integrado.",
                "Submissão e gestão de aprovação nas lojas Apple e Google (~10-14 dias).",
            ],
        },
    ]

    for f in fases_data:
        # Cabeçalho da fase
        header_tbl = Table(
            [
                [
                    Paragraph(f["n"], styles["caption"]),
                    Paragraph(fmt_brl(f["preco"]), styles["caption"]),
                ],
                [
                    Paragraph(f"<b>{f['titulo']}</b>", styles["h3"]),
                    "",
                ],
                [
                    Paragraph(
                        f"Prazo: <b>{f['prazo']}</b>  ·  Pagamento: <b>{f['milestones']}</b>",
                        styles["body_small"],
                    ),
                    "",
                ],
            ],
            colWidths=[14 * cm, 4.5 * cm],
        )
        header_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
                    ("LINEABOVE", (0, 0), (-1, 0), 2, ACCENT),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, 0), 12),
                    ("BOTTOMPADDING", (0, -1), (-1, -1), 10),
                    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                    ("SPAN", (0, 1), (-1, 1)),
                    ("SPAN", (0, 2), (-1, 2)),
                ]
            )
        )
        flow.append(KeepTogether([header_tbl, Spacer(1, 6)]))

        flow.append(Paragraph("ESCOPO DA FASE", styles["caption"]))
        flow.extend(bullets(f["entrega"], "li_tight"))
        flow.append(Spacer(1, 16))

    flow.append(PageBreak())
    return flow


def sla_section():
    flow = section_header("10 · SLA E SUSTENTAÇÃO CONTÍNUA", "O que vocês têm depois (e durante) da entrega.")

    flow.append(
        Paragraph(
            "O SLA <b>inicia no mês 1 da Fase 1</b> e segue por <b>24 meses mínimos</b> "
            "depois da última fase entregue. Não é manutenção passiva — é <b>evolução "
            "contínua + sustentação 24/7 dos serviços críticos</b>.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("O que está incluído no SLA mensal", styles["h2"]))
    inclusos = [
        "Até <b>45 horas de desenvolvimento</b> por mês — features novas, evoluções, ajustes (acumula até 90h).",
        "<b>Monitoramento ativo 24/7</b> com alerta no Slack/SMS pra eventos críticos.",
        "<b>On-call em drops</b> (até 4 drops por mês com agendamento de 7 dias).",
        "<b>Deploy contínuo</b>: até 2 releases semanais, com staging + smoke test.",
        "<b>Backup + restore testado</b> mensalmente.",
        "<b>Atualizações de dependência</b> (npm, Postgres, Node) com janela mensal.",
        "<b>Reunião semanal de 60 min</b> com PM + Tech Lead pra alinhamento.",
        "<b>Relatório mensal</b>: uptime, perfomance, incidentes, evoluções, próximos passos.",
        "<b>Resposta a incidente</b> com SLA de severidade (ver tabela abaixo).",
        "<b>Auditoria de segurança</b> semestral interna.",
    ]
    flow.extend(bullets(inclusos))

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("SLA de resposta por severidade", styles["h2"]))
    sla_rows = [
        ["SEVERIDADE", "EXEMPLO", "RESP. INICIAL", "MITIGAÇÃO", "RESOLUÇÃO"],
        ["S0 — Crítico", "Site fora do ar; checkout quebrado", "15 min · 24/7", "1h", "4h"],
        ["S1 — Alto", "Erro recorrente em fluxo crítico", "1h · 24/7", "4h", "1 dia útil"],
        ["S2 — Médio", "Bug em fluxo secundário, sem workaround", "4h · horário comercial", "1 dia útil", "3 dias úteis"],
        ["S3 — Baixo", "Pedido de evolução pequena, bug cosmético", "1 dia útil", "—", "Backlog semanal"],
    ]
    t = Table(wrap_cells(sla_rows), colWidths=[2.6 * cm, 5.4 * cm, 3.4 * cm, 2.4 * cm, 4.7 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Garantia contratual de uptime", styles["h2"]))
    uptime_rows = [
        ["MEDIÇÃO", "ALVO", "BÔNUS / PENALIDADE"],
        ["Uptime mensal global", "≥ 99,95%", "—"],
        ["Uptime em drop programado (7d aviso)", "100%", "Cai = 1 mês SLA grátis + crédito 25% próximo trimestre"],
        ["Tempo médio de resposta p95", "< 800 ms", "—"],
        ["MTTR (tempo médio de resolução S0)", "< 4 horas", "Excedeu 2× no trimestre = revisão de SLA"],
    ]
    t = Table(wrap_cells(uptime_rows), colWidths=[6.0 * cm, 3.2 * cm, 9.3 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("O que NÃO está no SLA", styles["h2"]))
    nao_sla = [
        "Mudanças de escopo que ampliam superfície do produto (vão pra adendo separado a R$ 350/h).",
        "Custo de infra (Vercel, Supabase, Cloudflare, Sentry) — pago direto pela 30praum.",
        "Custo de gateway, antifraude, fiscal, email marketing — pago direto pela 30praum.",
        "Submissão a lojas Apple/Google da renovação anual do app.",
        "Pentest, certificação ISO, DPO terceirizado — opcionais, cotados separadamente.",
        "Migração de plataforma futura (de cenário B pra cenário C, por exemplo).",
    ]
    flow.extend(bullets(nao_sla))

    flow.append(PageBreak())
    return flow


def cenarios_completos():
    flow = section_header("11 · CENÁRIOS COMPLETOS", "A, B, C e D — quatro modelos de engajamento, do mais leve ao parceiro fixo.")

    flow.append(
        Paragraph(
            "Esta seção apresenta os quatro cenários lado a lado, com escopo, riscos, "
            "investimento e ROI projetado de cada um. <b>Recomendamos começar pelo B</b> "
            "e evoluir pro D quando bater confiança mútua — modelo onde o time "
            "(Alvaro + Cauã) fica fixo, alinhado por PLR.",
            styles["body"],
        )
    )

    # Cenário A
    flow.append(Spacer(1, 10))
    flow.append(Paragraph("CENÁRIO A · MÍNIMO VIÁVEL", styles["h2"]))
    flow.append(
        Paragraph(
            "Site novo + Shopify headless + CMS + segurança básica. Mantém ST Ingressos. "
            "Modo cauteloso pra vocês testarem a parceria sem comprometer caixa grande.",
            styles["body_tight"],
        )
    )

    a_rows = [
        ["FASE", "ESCOPO", "PRAZO", "PREÇO"],
        ["Fase 1", "Site + Shopify headless + CMS + auth + arquitetura drop", "60 dias", fmt_brl(68_000)],
        ["Fase 2 (opc.)", "Workflow básico + admin pedidos (mirror Shopify)", "30 dias", fmt_brl(27_000)],
        ["", "ENTREGA TOTAL", "", fmt_brl(95_000)],
        ["", "SLA mensal × 24m", "", fmt_brl(6_500) + " × 24 = " + fmt_brl(156_000)],
        ["", "TOTAL 24 MESES", "", fmt_brl(251_000)],
    ]
    flow.append(_pricing_table(a_rows))

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Quando o A faz sentido", styles["h3"]))
    flow.extend(
        bullets(
            [
                "Querem começar pequeno pra <b>testar parceria</b> antes de cheque maior.",
                "Estão satisfeitos com Shopify atual, dor principal é só o site.",
                "Aceitam continuar pagando ST Ingressos no próximo Plantão.",
                "<b>Limitação:</b> não cobre o pedido de controle total que vocês fizeram em reunião.",
            ],
            "li_tight",
        )
    )

    flow.append(Spacer(1, 14))
    # Cenário B
    flow.append(Paragraph("CENÁRIO B · HÍBRIDO (RECOMENDADO PRA COMEÇAR)", styles["h2"]))
    flow.append(
        Paragraph(
            "Shopify só como ERP de produto. Plantão checkout próprio (sem ST). "
            "Workflow + admin + LGPD. <b>Paga sozinho na 1ª edição do Plantão pós-launch.</b>",
            styles["body_tight"],
        )
    )
    b_rows = [
        ["FASE", "ESCOPO", "PRAZO", "PREÇO"],
        ["Fase 1", "Site + Shopify headless + CMS + arquitetura drop", "60 dias", fmt_brl(68_000)],
        ["Fase 2", "Plantão checkout próprio + workflow + admin pedidos", "45 dias", fmt_brl(52_000)],
        ["Fase 3", "LGPD + 2FA + audit log + auditoria externa", "30 dias", fmt_brl(28_000)],
        ["", "ENTREGA TOTAL", "", fmt_brl(148_000)],
        ["", "SLA mensal × 24m", "", fmt_brl(9_500) + " × 24 = " + fmt_brl(228_000)],
        ["", "TOTAL 24 MESES", "", fmt_brl(376_000)],
    ]
    flow.append(_pricing_table(b_rows, highlight=True))

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Por que recomendamos o B", styles["h3"]))
    flow.extend(
        bullets(
            [
                "<b>Paga sozinho na 1ª edição do Plantão</b>: ST cobra R$ 480k/edição, gateway próprio cobra R$ 180k. Economia de R$ 300k cobre toda a entrega + 12 meses de SLA.",
                "Maior cheque é R$ 34k (Fase 1 dividida 50/50) — dentro da alçada operacional da Clara.",
                "Shopify continua sendo o ERP de produto: time familiarizado, NFe automatizada, sem migração.",
                "Dados do fã, checkout e jornada todos sob domínio próprio.",
                "Porta aberta pra evoluir pro C (sai Shopify) ou pro D (embedded) quando bater confiança.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())

    # Cenário C
    flow.append(Paragraph("CENÁRIO C · ACELERADO", styles["h2"]))
    flow.append(
        Paragraph(
            "Tudo do B + e-commerce próprio (sai do Shopify) + app mobile iOS/Android. "
            "Controle total, sem dependência de plataforma terceira.",
            styles["body_tight"],
        )
    )
    c_rows = [
        ["FASE", "ESCOPO", "PRAZO", "PREÇO"],
        ["Fase 1", "Site + Shopify headless + CMS + arquitetura drop", "60 dias", fmt_brl(68_000)],
        ["Fase 2", "Plantão checkout + workflow + admin", "45 dias", fmt_brl(52_000)],
        ["Fase 3", "LGPD + 2FA + audit + sec audit externa", "30 dias", fmt_brl(28_000)],
        ["Fase 4", "E-commerce 100% próprio (sai Shopify, fiscal via Tiny)", "60 dias", fmt_brl(60_000)],
        ["Fase 5", "App mobile iOS + Android", "60 dias", fmt_brl(35_000)],
        ["", "ENTREGA TOTAL", "", fmt_brl(243_000)],
        ["", "SLA mensal × 24m", "", fmt_brl(13_000) + " × 24 = " + fmt_brl(312_000)],
        ["", "TOTAL 24 MESES", "", fmt_brl(555_000)],
    ]
    flow.append(_pricing_table(c_rows))

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Riscos do cenário C", styles["h3"]))
    flow.extend(
        bullets(
            [
                "<b>Compliance fiscal</b>: errar CFOP/CST/NCM = autuação SEFAZ. Mitigamos com Tiny/Bling.",
                "<b>Migração de catálogo</b>: ~1000 SKUs do Shopify pra base nova. Vai junto na Fase 4.",
                "<b>Período de paralelismo</b>: 60 dias rodando Shopify + próprio em paralelo antes do cutover.",
                "<b>Suporte fiscal contínuo</b>: SLA sobe pra R$ 13k/mês por causa do escopo expandido.",
            ],
            "li_tight",
        )
    )

    flow.append(Spacer(1, 16))
    # Cenário D - NOVO
    flow.append(Paragraph("CENÁRIO D · TIME EMBEDDED + PLR", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>O modelo de partnership.</b> Alvaro + Cauã fixos no projeto eternamente, "
            "sem prazo de entrega — trabalho contínuo, sem fim, alinhado por PLR. "
            "Vocês têm time dedicado real, com nome e cara, sem rotatividade.",
            styles["body_tight"],
        )
    )
    flow.append(Spacer(1, 6))
    d_rows = [
        ["LINHA", "DESCRIÇÃO", "VALOR"],
        ["Fixo mensal", "Alvaro + Cauã dedicados ao projeto (sem outros clientes)", fmt_brl(18_000) + "/mês"],
        ["Setup inicial", "Onboarding + handover de eventual cenário anterior", fmt_brl(8_000)],
        ["PLR sobre economia", "3% da economia anual mensurada (ST evitada + Shopify economizado + receita do checkout próprio)", "Variável"],
        ["Bônus de marco", "1 mês fixo grátis pra vocês a cada 12 meses cumpridos", "Crédito"],
        ["", "ESTIMATIVA ANO 1 (fixo + PLR estimado)", fmt_brl(240_000)],
        ["", "ESTIMATIVA ANO 2 (sem setup, com PLR maior)", fmt_brl(252_000)],
        ["", "TOTAL ESTIMADO 24 MESES", fmt_brl(492_000)],
    ]
    # Tabela com 3 colunas
    rows_w = wrap_cells(d_rows)
    td = Table(rows_w, colWidths=[3.5 * cm, 10.0 * cm, 5.0 * cm], repeatRows=1)
    td.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -4), 0.3, RULE),
                ("LINEABOVE", (0, -3), (-1, -3), 0.6, INK),
                ("FONTNAME", (0, -3), (-1, -1), FONT_B),
                ("BACKGROUND", (0, -3), (-1, -2), BG_SOFT),
                ("BACKGROUND", (0, -1), (-1, -1), GREEN),
                ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(td)

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("Como o PLR funciona na prática", styles["h3"]))
    flow.extend(
        bullets(
            [
                "<b>Base de cálculo</b>: economia mensurável documentada em relatório anual fechado em janeiro.",
                "<b>Linhas que contam</b>: (a) taxa ST evitada nas edições do Plantão pelo checkout próprio; "
                "(b) economia de Shopify Plus → Basic (~R$ 140k/ano); "
                "(c) receita líquida das vendas que rodam no checkout próprio.",
                "<b>Não conta</b>: receita orgânica de streaming, royalties, sell-out de show externo, parcerias de marca.",
                "<b>Percentual</b>: 3% sobre o total (dividido entre Alvaro e Cauã). Em ano excepcional, top-cap de R$ 90k de PLR.",
                "<b>Pagamento</b>: anual, em fevereiro, após fechamento contábil auditado por contador da 30praum.",
            ],
            "li_tight",
        )
    )

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("Por que esse modelo fideliza", styles["h3"]))
    flow.extend(
        bullets(
            [
                "<b>Vocês não contratam dev sênior interno</b> (custo ~R$ 32k/mês com encargos). Pagam R$ 18k de PJ pra time pronto.",
                "<b>Não há rotatividade</b>: o time é o mesmo do começo ao fim. Sem onboarding novo a cada 6 meses.",
                "<b>Incentivos alinhados</b>: nossa receita aumenta se a 30praum cresce. Não temos motivo pra empurrar o desnecessário.",
                "<b>Conhecimento acumulado</b>: ao longo dos anos, o time vira parte cultural da 30praum, sem ser empregado.",
                "<b>Saída amigável a qualquer momento</b> com aviso de 90 dias e handover documentado.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())

    flow.append(Paragraph("Comparativo final dos quatro cenários", styles["h2"]))
    comp_rows = [
        ["MODELO", "ENTREGA", "RECORRENTE/MÊS", "TOTAL 24M", "CONTROLE", "FIDELIZAÇÃO"],
        ["A · Mínimo", fmt_brl(95_000), fmt_brl(6_500), fmt_brl(251_000), "Baixo", "Média"],
        ["B · Híbrido (rec.)", fmt_brl(148_000), fmt_brl(9_500), fmt_brl(376_000), "Alto", "Alta"],
        ["C · Acelerado", fmt_brl(243_000), fmt_brl(13_000), fmt_brl(555_000), "Total", "Alta"],
        ["D · Embedded + PLR", "—", fmt_brl(18_000) + " + PLR", fmt_brl(492_000) + "*", "Total", "Máxima"],
    ]
    rows_w = wrap_cells(comp_rows)
    tc = Table(rows_w, colWidths=[3.8 * cm, 2.6 * cm, 3.2 * cm, 2.8 * cm, 2.0 * cm, 2.6 * cm], repeatRows=1)
    tc.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, 2), (-1, 2), colors.HexColor("#ffeec2")),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(tc)
    flow.append(Spacer(1, 6))
    flow.append(
        Paragraph(
            "<i>* Estimativa baseada em economia projetada e PLR médio. Valor variável conforme performance real.</i>",
            styles["body_small"],
        )
    )

    flow.append(PageBreak())
    return flow


def _pricing_table(rows, highlight=False):
    n = len(rows)
    rows = wrap_cells(rows)
    t = Table(rows, colWidths=[2.6 * cm, 8.7 * cm, 2.4 * cm, 4.8 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (3, 1), (3, -1), "RIGHT"),
        ("LINEBELOW", (0, 0), (-1, -4), 0.3, RULE),
        ("LINEABOVE", (0, -3), (-1, -3), 0.6, INK),
        ("FONTNAME", (0, -3), (-1, -1), FONT_B),
        ("BACKGROUND", (0, -3), (-1, -1), BG_SOFT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    if highlight:
        style.append(("BACKGROUND", (0, -1), (-1, -1), ACCENT))
        style.append(("TEXTCOLOR", (0, -1), (-1, -1), colors.white))
    t.setStyle(TableStyle(style))
    return t


def fidelizacao():
    flow = section_header(
        "12 · MODELO DE FIDELIZAÇÃO",
        "Como o relacionamento evolui — e o que vocês ganham por ficar.",
    )

    flow.append(
        Paragraph(
            "Esta proposta é construída pra durar. Não é projeto pontual de 4 meses e "
            "tchau. Os 4 cenários acima podem ser combinados e evoluídos ao longo do "
            "tempo — começa com B, sobe pra C quando bater confiança, migra pra D "
            "quando o time virar família. Pra incentivar essa evolução, oferecemos "
            "<b>bonificações de fidelidade</b> por marco de tempo cumprido.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 12))
    flow.append(Paragraph("Bonificações por marco contínuo", styles["h2"]))
    fid_rows = [
        ["MARCO", "QUANDO ATIVA", "BÔNUS"],
        ["12 meses", "Aniversário do início do SLA", "10% off no SLA por 3 meses · 1 dia de workshop estratégico"],
        ["24 meses", "2 anos cumpridos", "1 mês de SLA grátis · prioridade absoluta em on-call"],
        ["36 meses", "3 anos cumpridos", "Migração de tier sem custo (A→B, B→C, C→D, conforme escolha)"],
        ["48 meses", "4 anos cumpridos", "1 mês de SLA grátis + bonificação fim de ano (PLR adiantado se Cenário D)"],
        ["60 meses", "5 anos cumpridos", "Reset contratual com novos termos · novo workshop estratégico · cofre simbólico"],
    ]
    rows_w = wrap_cells(fid_rows)
    t = Table(rows_w, colWidths=[2.4 * cm, 4.4 * cm, 11.7 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 16))
    flow.append(Paragraph("Caminhos de evolução entre cenários", styles["h2"]))
    flow.append(
        Paragraph(
            "Não há lock-in. Em qualquer momento (com aviso de 60 dias) vocês podem "
            "migrar entre cenários conforme o relacionamento e o negócio evoluírem:",
            styles["body_tight"],
        )
    )
    flow.append(Spacer(1, 8))

    paths = [
        (
            "A → B",
            "Aceleração após confiança",
            "Quando o site novo (Cenário A) bate bem e vocês querem cortar a ST no próximo Plantão. "
            "Pagamento da diferença (R$ 53k) acelerado em 2 milestones. Sem custo de retrabalho — Fase 1 do A é a mesma do B.",
        ),
        (
            "B → C",
            "Saída total do Shopify",
            "Quando vocês perceberem que mesmo Shopify Basic é peso desnecessário. Migração de catálogo + e-commerce próprio + app. "
            "Investimento adicional R$ 95k (Fase 4 do C) + R$ 35k (Fase 5 app). SLA sobe pra R$ 13k/mês.",
        ),
        (
            "C → D",
            "Vira partnership",
            "Quando o time virou família e vocês querem fixar o relacionamento sem se preocupar com escopo a cada nova feature. "
            "Migra pro modelo embedded + PLR. SLA do C é trocado pelo fixo do D + PLR sobre economia.",
        ),
        (
            "B → D direto",
            "Pulando o C",
            "Mais comum na prática: ao final dos 24 meses do B, vocês querem manter o time mas sem precisar de novas grandes entregas. "
            "Vira embedded continuando sobre a stack do B (Shopify ainda como ERP). Migração sem custo adicional.",
        ),
    ]

    for titulo, label, body in paths:
        head = Table(
            [[Paragraph(f"<b>{titulo}</b>", styles["body_tight"]), Paragraph(f"<i>{label}</i>", styles["body_small"])]],
            colWidths=[3.0 * cm, 15.5 * cm],
        )
        head.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (0, 0), ACCENT),
                    ("TEXTCOLOR", (0, 0), (0, 0), colors.white),
                    ("BACKGROUND", (1, 0), (1, 0), BG_SOFT),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )
        flow.append(head)
        flow.append(Spacer(1, 4))
        flow.append(Paragraph(body, styles["body_tight"]))
        flow.append(Spacer(1, 10))

    flow.append(Spacer(1, 6))
    flow.append(
        callout(
            "O modelo ideal pra 30praum (na nossa leitura)",
            "Começar pelo <b>Cenário B em maio/junho de 2026</b>. Cumprir os 12 meses de SLA. "
            "Receber o primeiro bônus de aniversário em maio/2027 (10% off + workshop). "
            "Avaliar evolução pra C ou D em julho/2027. <b>Em 2028, migrar pro D</b> com o "
            "time já maduro e o ROI das edições do Plantão sem ST documentado em relatório. "
            "Esse caminho transforma uma relação cliente-fornecedor em sociedade operacional.",
        )
    )

    flow.append(PageBreak())
    return flow


def cronograma():
    flow = section_header("13 · CRONOGRAMA AGREGADO", "Como as fases se distribuem no tempo (Cenário B).")

    flow.append(
        Paragraph(
            "Considerando início imediato após assinatura, o cronograma agregado do "
            "cenário B (recomendado) fica assim:",
            styles["body"],
        )
    )

    def _p(text, header=False):
        style = styles["caption"] if header else styles["body_small"]
        return Paragraph(text, style)

    cron_rows = [
        [_p("TRIMESTRE", True), _p("EVENTO", True), _p("MARCO", True)],
        [_p("T1 · Jun-Ago"), _p("Fase 1 em execução"), _p("Site novo + CMS + arquitetura de drop entregues no dia 60")],
        [_p("T2 · Set-Nov"), _p("Fase 2 em execução · SLA ativo"), _p("Loja própria + checkout entregues no dia 120")],
        [_p("T2-T3 · Dez-Jan"), _p("Fase 3 em execução · 1º Plantão pós-launch"), _p("Plantão checkout próprio operando · ROI da Fase 2 confirmado")],
        [_p("T3 · Fev-Mar"), _p("Fase 4 em execução"), _p("Segurança auditada · LGPD certificada")],
        [_p("T4 · Abr-Mai"), _p("Fase 5 em execução"), _p("App publicado nas duas lojas")],
        [_p("T4-T5 · Jun-Mai/27"), _p("SLA contínuo"), _p("Operação estável, evoluções mensais, próximas edições do Plantão sem ST")],
    ]
    t = Table(cron_rows, colWidths=[3.4 * cm, 5.6 * cm, 9.5 * cm], repeatRows=1)
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
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Dependências e gargalos conhecidos", styles["h2"]))
    flow.extend(
        bullets(
            [
                "Decisão sobre cenário (A, B ou C) precisa ser tomada antes da assinatura. Fase 1 é igual nos três.",
                "Cadastro de gateway (Pagar.me ou Stone) requer documentação societária da 30praum — ~5 dias úteis.",
                "Acesso à Storefront API do Shopify atual (cenário B) requer permissão do time interno — ~2 dias.",
                "Submissão a App Store / Play Store leva ~10-14 dias adicionais ao prazo da Fase 5 (não controlamos).",
                "Reuniões semanais de 60 min são <b>obrigatórias</b> pra manter o cronograma — se a 30praum cancelar mais de duas no mês, prazo escorrega proporcionalmente.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())
    return flow


def custos_infra():
    flow = section_header("14 · CUSTOS DE INFRAESTRUTURA", "O que vocês pagam direto pra fornecedores, fora do nosso contrato.")

    flow.append(
        Paragraph(
            "Pra evitar lock-in e dar transparência total, <b>toda a infraestrutura "
            "é contratada em nome da 30praum, não em nome da nossa software house</b>. "
            "Vocês têm o root account de cada serviço. Esses custos não passam por nós.",
            styles["body"],
        )
    )

    infra_rows = [
        ["SERVIÇO", "USO", "MENSALIDADE ESTIMADA"],
        ["Vercel Pro Team", "Hospedagem Next.js + deploy preview", "R$ 600 a R$ 1.200"],
        ["Cloudflare Pro", "CDN + WAF + bot manager", "R$ 200"],
        ["Supabase Pro", "Postgres + Auth + Storage", "R$ 700"],
        ["Cloudflare R2", "Object storage (imagens, backups)", "R$ 100 a R$ 400"],
        ["Sentry Team", "Error tracking", "R$ 270"],
        ["Better Stack", "Uptime monitoring + status page", "R$ 150"],
        ["Resend", "Email transacional (~50k/mês incluído)", "R$ 100"],
        ["ActiveCampaign Plus", "Email marketing", "R$ 700"],
        ["Meilisearch Cloud", "Search engine", "R$ 300 a R$ 500"],
        ["Doppler Team", "Secrets management", "R$ 100"],
        ["Pagar.me / Stone", "Gateway pagamento (taxa por transação)", "—"],
        ["Clearsale ou Konduto", "Antifraude (~R$ 0,50 por pedido)", "Variável"],
        ["Tiny ERP ou Bling (cenário C)", "Emissão NFe", "R$ 300 a R$ 800"],
        ["Shopify Basic (cenário B)", "ERP de produto + fiscal", "R$ 350"],
        ["Shopify Plus (cenário A)", "Plataforma completa", "R$ 12.000"],
        ["", "TOTAL ESTIMADO MENSAL (cenário B)", "R$ 3.470 a R$ 4.770"],
    ]
    t = Table(wrap_cells(infra_rows), colWidths=[6.0 * cm, 7.5 * cm, 5.0 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
        ("BACKGROUND", (0, -1), (-1, -1), BG_SOFT),
        ("FONTNAME", (0, -1), (-1, -1), FONT_B),
        ("LINEABOVE", (0, -1), (-1, -1), 0.6, INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    t.setStyle(TableStyle(style))
    flow.append(t)

    flow.append(Spacer(1, 12))
    flow.append(
        callout(
            "Custo de gateway por transação (importante)",
            "O gateway cobra <b>~2,99% no cartão de crédito e 0,99% no Pix</b>. Para "
            "uma edição do Plantão de R$ 6 milhões bruto, isso equivale a <b>R$ 180 mil a "
            "R$ 240 mil</b> em taxas, contra os <b>R$ 480 mil</b> que a ST cobra hoje. "
            "Economia projetada na primeira edição: R$ 240 mil a R$ 300 mil.",
        )
    )

    flow.append(PageBreak())
    return flow


def roi_projecao():
    flow = section_header("15 · ROI E PROJEÇÃO FINANCEIRA", "O número que paga a conta.")

    flow.append(
        Paragraph(
            "Esta é a defesa do investimento em uma página. Tomamos como base o "
            "<b>Cenário B (R$ 148k entrega + R$ 9.5k/mês SLA)</b> e a economia direta "
            "em 1 edição do Plantão Festival como retorno mensurável principal.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    flow.append(Paragraph("Comparativo ano 1 vs hoje (Cenário B)", styles["h2"]))
    roi_rows = [
        ["LINHA", "HOJE", "COM PLATAFORMA", "DELTA"],
        ["Mensalidade Shopify Plus → Basic", fmt_brl(144_000), fmt_brl(4_200), fmt_brl(-139_800)],
        ["Taxa ST Ingressos (1 edição)", fmt_brl(480_000), fmt_brl(180_000), fmt_brl(-300_000)],
        ["Investimento na plataforma (entrega)", "—", fmt_brl(148_000), fmt_brl(148_000)],
        ["SLA mensal × 12m", "—", fmt_brl(114_000), fmt_brl(114_000)],
        ["Infraestrutura (R$ 4.5k × 12m)", fmt_brl(54_000), fmt_brl(54_000), "R$ 0"],
        ["", "TOTAL ANO 1", "", fmt_brl(177_800) + " a favor de vocês"],
    ]
    t = Table(wrap_cells(roi_rows), colWidths=[6.0 * cm, 4.0 * cm, 4.5 * cm, 4.0 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, -1), (-1, -1), GREEN),
                ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
                ("FONTNAME", (0, -1), (-1, -1), FONT_B),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Ano 2 — só ganho", styles["h2"]))
    flow.append(
        Paragraph(
            "No ano 2, a entrega já foi paga e a economia recorrente se acumula:",
            styles["body_tight"],
        )
    )
    ano2_rows = [
        ["LINHA", "HOJE", "COM PLATAFORMA", "DELTA"],
        ["Mensalidade Shopify Plus → Basic", fmt_brl(144_000), fmt_brl(4_200), fmt_brl(-139_800)],
        ["Taxa ST Ingressos (1 edição)", fmt_brl(480_000), fmt_brl(180_000), fmt_brl(-300_000)],
        ["SLA mensal × 12m", "—", fmt_brl(114_000), fmt_brl(114_000)],
        ["Infraestrutura", fmt_brl(54_000), fmt_brl(54_000), "R$ 0"],
        ["", "ECONOMIA ANO 2", "", fmt_brl(325_800)],
    ]
    t = Table(wrap_cells(ano2_rows), colWidths=[6.0 * cm, 4.0 * cm, 4.5 * cm, 4.0 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, -1), (-1, -1), GREEN),
                ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
                ("FONTNAME", (0, -1), (-1, -1), FONT_B),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Ganhos não-financeiros (mas reais)", styles["h2"]))
    flow.extend(
        bullets(
            [
                "Site não cai em drop → <b>receita destravada</b> que hoje é perdida pra cambista.",
                "Workflow engine → time deixa de gastar 3 a 5 horas/semana em WhatsApp aprovando coisa.",
                "Dados próprios do fã → segmentação real, retargeting próprio, programa fidelidade próprio.",
                "Anti-cambismo → fortalece a marca, fãs sabem que <b>ingresso da 30praum vem da 30praum</b>.",
                "App próprio → canal direto, sem depender de algoritmo do Instagram pra divulgar drop.",
                "Stack moderna → atrai talento técnico melhor se a 30praum quiser internalizar no futuro.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())
    return flow


def clausulas_contratuais():
    flow = section_header("16 · CLÁUSULAS CONTRATUAIS ESSENCIAIS", "Vamos contratar como adultos.")

    flow.append(
        Paragraph(
            "Todas estas cláusulas entram no contrato final. São fruto de experiência "
            "em projetos similares — existem pra proteger ambos os lados de "
            "expectativas mal alinhadas.",
            styles["body"],
        )
    )

    clauses = [
        (
            "Escopo e adendo",
            "O escopo de cada fase está descrito nos Anexos A1 a A5. Mudanças "
            "solicitadas pela CONTRATANTE que ampliem o escopo serão precificadas em "
            "adendo separado a R$ 350,00/hora, com aprovação prévia formal antes do "
            "início do trabalho. Sem aprovação formal, não há cobrança nem execução.",
        ),
        (
            "Pagamento e atraso",
            "Cada fase tem pagamento dividido em milestones (ver seção 09). O atraso "
            "no pagamento de qualquer milestone superior a 5 dias úteis suspende o "
            "trabalho automaticamente, sem rescisão, e o prazo da fase é estendido "
            "proporcionalmente. Atraso superior a 30 dias confere à CONTRATADA o "
            "direito de rescindir mantendo todos os valores já pagos.",
        ),
        (
            "Aprovação de milestone",
            "A CONTRATANTE tem 5 dias úteis pra aprovar ou listar pendências em cada "
            "milestone. Após 5 dias sem manifestação, o milestone é tacitamente "
            "aprovado. Pendências precisam ser específicas (não 'eu não gostei') e "
            "vinculadas a item do escopo.",
        ),
        (
            "SLA mínimo",
            "O SLA tem prazo mínimo contratual de 12 meses. Rescisão antes disso "
            "exige pagamento dos meses restantes ou negociação de saída amigável "
            "(em geral 50% dos meses remanescentes).",
        ),
        (
            "Propriedade intelectual",
            "O código-fonte de cada fase é transferido pra CONTRATANTE <b>após "
            "pagamento integral da fase</b>. Antes disso, o código fica em "
            "repositório privado da CONTRATADA. Após pagamento, a CONTRATANTE "
            "tem direitos perpétuos, irrevogáveis e exclusivos sobre o código "
            "produzido especificamente para ela.",
        ),
        (
            "Frameworks open-source e bibliotecas",
            "A plataforma é construída sobre frameworks open-source (Next.js, "
            "Postgres, Cloudflare Workers etc.). Esses não fazem parte da "
            "transferência de IP, mantêm suas licenças originais (MIT, Apache, "
            "BSD). A CONTRATANTE pode operar a plataforma sem depender da "
            "CONTRATADA, se desejar contratar outra equipe.",
        ),
        (
            "Confidencialidade (NDA mútuo)",
            "Ambas as partes mantêm confidencial qualquer informação proprietária "
            "trocada durante o projeto. Vale: dados de fã, dados financeiros, "
            "estratégia de produto, designs, código. Vigor: durante o contrato + "
            "5 anos após encerramento.",
        ),
        (
            "Subcontratação",
            "A CONTRATADA pode subcontratar partes específicas (designer, "
            "auditor de segurança, mobile dev) mediante NDA equivalente. A "
            "CONTRATADA permanece como ponto único de responsabilidade.",
        ),
        (
            "Reajuste anual",
            "O valor do SLA é reajustado anualmente pelo IPCA acumulado dos 12 "
            "meses anteriores, com correção máxima de 8% ao ano (cap pra proteger "
            "a CONTRATANTE em cenário de alta inflação).",
        ),
        (
            "Garantia de bug",
            "Bugs identificados na CONTRATADA após entrega de fase, vinculados a "
            "item do escopo entregue, são corrigidos sem custo adicional dentro "
            "do SLA mensal contratado. Defeitos de design ou mudança de requisito "
            "não se enquadram como bug — viram adendo.",
        ),
        (
            "Saída de plataforma",
            "Se a CONTRATANTE decidir migrar pra outra equipe técnica no futuro, "
            "a CONTRATADA compromete-se a fornecer: documentação completa, "
            "credenciais (rotacionadas), training session de 8 horas com a equipe "
            "que assumirá, e período de overlap de 30 dias pra transição. Custo "
            "do overlap: R$ 18.000 (fora do SLA).",
        ),
        (
            "Foro e mediação",
            "Foro de São Paulo, capital. Antes de qualquer ação judicial, as "
            "partes comprometem-se a tentar mediação por 30 dias com câmara "
            "neutra (CAM-CCBC ou similar).",
        ),
        (
            "Limitação de responsabilidade",
            "A responsabilidade da CONTRATADA é limitada ao valor total pago no "
            "trimestre em que o evento gerador da disputa ocorreu, exceto em casos "
            "de dolo, fraude ou má-fé comprovada. Esta cláusula é padrão de mercado "
            "e protege ambas as partes.",
        ),
        (
            "Cláusula de drop catastrófico",
            "Em caso de drop com queda do site causada por falha da CONTRATADA "
            "(arquitetura, código, deploy errado), a penalidade é a definida no "
            "SLA da seção 10. Para drops com queda por causa externa (gateway "
            "fora do ar, AWS outage global, ataque DDoS além da capacidade "
            "contratada), aplica-se cláusula de força maior — sem penalidade, mas "
            "com obrigação de pós-mortem e medidas preventivas pra próximo evento.",
        ),
    ]

    for titulo, body in clauses:
        flow.append(Paragraph(titulo, styles["h3"]))
        flow.append(Paragraph(body, styles["body_tight"]))
        flow.append(Spacer(1, 6))

    flow.append(PageBreak())
    return flow


def proximos_passos():
    flow = section_header("17 · PRÓXIMOS PASSOS", "Como saímos do PDF e entramos em execução.")

    flow.append(
        Paragraph(
            "Pra esta proposta sair do papel e virar contrato assinado, os passos "
            "concretos são:",
            styles["body"],
        )
    )

    steps = [
        (
            "Passo 1 · Reunião de alinhamento (60 min)",
            "Apresentamos a proposta pra Clara + financeiro + (idealmente) Matuê. "
            "Tiramos dúvidas, ajustamos detalhes de escopo se necessário, decidimos "
            "preliminarmente qual cenário (A, B ou C).",
        ),
        (
            "Passo 2 · Contrato (5 dias úteis)",
            "Recebida a decisão de cenário, geramos o contrato final em 5 dias úteis "
            "com todos os anexos (escopo das fases, plano de SLA, cláusulas). "
            "Revisão jurídica conjunta. Assinatura via DocuSign ou ClickSign.",
        ),
        (
            "Passo 3 · Kickoff (semana 1)",
            "Onboarding técnico: criação dos repositórios, contratação das infras "
            "em nome da 30praum, setup dos acessos. Reunião de kickoff com toda a "
            "equipe das duas partes. Slack compartilhado ativado.",
        ),
        (
            "Passo 4 · Execução da Fase 1 (semanas 2-9)",
            "Desenvolvimento iterativo com demos quinzenais. Ao final do dia 60, "
            "entregamos site novo + CMS + arquitetura de drop em produção, com "
            "load test sintético validado.",
        ),
        (
            "Passo 5 · SLA inicia (mês 2)",
            "A partir do mês 2 da Fase 1, o SLA mensal começa a ser cobrado. Vocês "
            "passam a ter monitoramento 24/7 e direito às horas de evolução mensais.",
        ),
        (
            "Passo 6 · Fases seguintes (sequencial)",
            "Cada fase tem sua aprovação independente. Vocês podem pausar entre "
            "fases se quiserem absorver primeiro o que já foi entregue. Recomendamos "
            "intervalo máximo de 30 dias entre fases pra manter o time alocado.",
        ),
    ]

    for t, b in steps:
        flow.append(Paragraph(t, styles["h3"]))
        flow.append(Paragraph(b, styles["body_tight"]))
        flow.append(Spacer(1, 6))

    flow.append(Spacer(1, 14))
    flow.append(
        callout(
            "Decisão concreta pedida",
            "<b>Confirmação por escrito (email ou WhatsApp) do cenário escolhido</b> — "
            "A, B ou C — até <b>30 dias da emissão desta proposta</b>. Após esse prazo, "
            "preços e prazos precisam ser revalidados (não significa que mudam, "
            "apenas que precisam ser confirmados com a equipe alocada na data).",
        )
    )

    flow.append(Spacer(1, 18))
    flow.append(Paragraph("Quem contatar", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>Alvaro Carlisbino</b><br/>"
            "Founder &amp; CTO terceirizado<br/>"
            "Email · contato@[software-house].com.br<br/>"
            "WhatsApp · +55 (XX) XXXXX-XXXX<br/>"
            "LinkedIn · linkedin.com/in/alvaro-carlisbino",
            styles["body_tight"],
        )
    )

    flow.append(PageBreak())
    return flow


def anexos_capa():
    flow = section_header("ANEXOS", "Material complementar referenciado nas seções anteriores.")

    flow.append(
        Paragraph(
            "Os anexos a seguir compõem o documento técnico-comercial final e "
            "passam a fazer parte integrante do contrato após assinatura.",
            styles["body"],
        )
    )
    flow.append(Spacer(1, 8))
    anex_rows = [
        ["ANEXO", "CONTEÚDO"],
        ["A1", "Escopo detalhado da Fase 1 (entregáveis, critérios de aceite)"],
        ["A2", "Escopo detalhado da Fase 2"],
        ["A3", "Escopo detalhado da Fase 3"],
        ["A4", "Escopo detalhado da Fase 4"],
        ["A5", "Escopo detalhado da Fase 5"],
        ["B", "Plano completo de SLA com SLAs de severidade e penalidades"],
        ["C", "Inventário de infraestrutura (serviços + custos estimados)"],
        ["D", "Modelo de DPA (Data Processing Agreement) pra LGPD"],
        ["E", "Runbook de drop (procedimento operacional de evento crítico)"],
        ["F", "Matriz RACI completa do workflow engine (todos os processos)"],
        ["G", "Modelo de contrato mestre (será gerado após decisão de cenário)"],
    ]
    t = Table(wrap_cells(anex_rows), colWidths=[2.0 * cm, 16.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("FONTNAME", (0, 1), (0, -1), FONT_B),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 14))
    flow.append(
        Paragraph(
            "Anexos detalhados são entregues em documento separado após decisão "
            "preliminar de cenário, na fase de elaboração contratual (Passo 2 da "
            "seção 16).",
            styles["body_tight"],
        )
    )

    flow.append(PageBreak())
    return flow


def encerramento():
    flow = section_header("18 · ENCERRAMENTO", "Por que dar esse passo agora.")

    flow.append(
        Paragraph(
            "Esta proposta foi escrita em maio de 2026, momento em que a 30praum "
            "completa 10 anos como gravadora e acumula:",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 8))
    flow.append(
        kpi_row(
            [
                ("STREAMS MATUÊ", "950M+", "XTRANHO ainda subindo"),
                ("PÚBLICO PLANTÃO", "30 mil", "Marina Park · Fortaleza"),
                ("ARTISTAS NO ROSTER", "4", "Matuê · Wiu · Teto · Brandão85"),
                ("ANOS DE OPERAÇÃO", "10", "Cofundada por Matuê + Clara"),
            ]
        )
    )

    flow.append(Spacer(1, 16))
    flow.append(
        Paragraph(
            "A stack atual de vocês foi desenhada pra um selo. Não pra uma holding "
            "de música, festival e merch que opera com 50 pessoas, atende 30 mil em "
            "Fortaleza, e leva 300 mil acessos em 3 minutos no dia de drop.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 6))
    flow.append(
        Paragraph(
            "Esta proposta existe pra mudar isso — com fases pequenas o suficiente "
            "pra não comprometer o caixa, com SLA que paga vocês desde o mês 1 em "
            "tranquilidade operacional, e com uma garantia de uptime que <b>nenhuma "
            "agência tradicional vai assinar com vocês</b>, porque exige uma "
            "arquitetura pensada pra isso desde o primeiro dia.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 14))
    flow.append(
        Paragraph(
            "&ldquo;Não é gravadora pra render mais.<br/>É gravadora pra durar mais.&rdquo;",
            styles["quote"],
        )
    )
    flow.append(
        Paragraph(
            "Esse é o lema de vocês, e é também o jeito que pensamos a plataforma. "
            "Não é stack pra resolver os próximos 6 meses. É stack pra atravessar "
            "os próximos 10 anos da 30praum.",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 24))
    flow.append(Paragraph("Assinatura · proposta", styles["h2"]))
    flow.append(
        Paragraph(
            "Ao confirmar por escrito a aceitação desta proposta (e a escolha de "
            "cenário) dentro do prazo de validade, a CONTRATANTE inicia o Passo 2 "
            "da seção 16. Esta confirmação não substitui o contrato, mas serve como "
            "<i>letter of intent</i> e congela preços e prazos.",
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
# BUILD DO PDF
# ─────────────────────────────────────────────────────────


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="30praum — Proposta Técnica e Comercial",
        author="Alvaro Carlisbino",
        subject="Plataforma proprietária pra 30praum",
        keywords="30praum, proposta, plataforma, e-commerce, plantão",
    )

    frame_cover = Frame(
        0,
        0,
        A4[0],
        A4[1],
        leftPadding=2 * cm,
        rightPadding=2 * cm,
        topPadding=0,
        bottomPadding=2 * cm,
        showBoundary=0,
    )
    frame_content = Frame(
        2 * cm,
        2 * cm,
        A4[0] - 4 * cm,
        A4[1] - 4 * cm,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        showBoundary=0,
    )

    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[frame_cover], onPage=draw_cover),
            PageTemplate(id="content", frames=[frame_content], onPage=draw_chrome),
        ]
    )

    story = []
    # Capa (já inclui NextPageTemplate("content") + PageBreak no final)
    story.extend(cover_page())
    # Conteúdo
    story.extend(sumario_executivo())
    story.extend(diagnostico())
    story.extend(visao_plataforma())
    story.extend(arquitetura())
    story.extend(infraestrutura_drop())
    story.extend(workflow_engine())
    story.extend(seguranca_compliance())
    story.extend(estrutura_equipe())
    story.extend(fases())
    story.extend(sla_section())
    story.extend(cenarios_completos())
    story.extend(fidelizacao())
    story.extend(cronograma())
    story.extend(custos_infra())
    story.extend(roi_projecao())
    story.extend(clausulas_contratuais())
    story.extend(proximos_passos())
    story.extend(anexos_capa())
    story.extend(encerramento())

    doc.build(story)
    print(f"✔ PDF gerado: {OUT}")
    print(f"  Tamanho: {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    build()
