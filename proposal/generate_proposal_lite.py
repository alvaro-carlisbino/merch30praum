#!/usr/bin/env python3
"""
PDF comercial enxuto · 30praum.

Versão v2: pivot operacional.
- Foco em FLUXO OPERACIONAL (não em infra)
- 3 propostas de trust-building (Piloto · Garantia · Embedded Light)
- SLA explicitamente = salário fixo do time (Alvaro + Cauã)
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

FONT = "Helvetica"
FONT_B = "Helvetica-Bold"

OUT = Path(__file__).parent / "30praum-proposta-comercial.pdf"


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
    "kpi_label": S("kpi_label", fontName=FONT_B, fontSize=7, leading=9, textColor=MUTED),
    "kpi_value": S("kpi_value", fontName=FONT_B, fontSize=18, leading=22, textColor=INK),
    "kpi_foot": S("kpi_foot", fontSize=8, leading=10, textColor=INK_SOFT),
}


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


def draw_chrome(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(2 * cm, h - 1.4 * cm, w - 2 * cm, h - 1.4 * cm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_B, 7)
    canvas.drawString(2 * cm, h - 1.05 * cm, "30PRAUM · PROPOSTA COMERCIAL")
    canvas.drawRightString(w - 2 * cm, h - 1.05 * cm, "v2 · MAI 2026 · CONFIDENCIAL")
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
    canvas.drawRightString(w - 2 * cm, h - 1.4 * cm, "v2 · MAIO 2026")
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


# ═══════════════════════════════════════════════════════════
# PÁGINAS
# ═══════════════════════════════════════════════════════════


def cover_page():
    flow = []
    flow.append(Spacer(1, 7 * cm))
    flow.append(Paragraph("PROPOSTA COMERCIAL · v2", styles["cover_eyebrow"]))
    flow.append(
        Paragraph(
            "Um sistema operacional<br/>pra rodar a 30praum.",
            styles["cover_title"],
        )
    )
    flow.append(
        Paragraph(
            "Não é só site. É o painel onde Clara, o time de loja, o time de "
            "Plantão e o SAC operam a casa todo dia. Construído por time fixo "
            "dedicado e demonstrável agora — o site v1 já está no ar.",
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
            "Alvaro Carlisbino · Founder Limitless<br/>"
            f"Emissão · {date.today().strftime('%d/%m/%Y')}  ·  Validade · 30 dias",
            styles["body_tight"],
        )
    )
    flow.append(NextPageTemplate("content"))
    flow.append(PageBreak())
    return flow


def pagina_diagnostico():
    flow = section_header("01 · O VERDADEIRO PROBLEMA", "Não é tráfego. É operação.")

    flow.append(
        Paragraph(
            "Site caindo no drop é um problema — mas ele volta. Drop dura horas. "
            "O <b>problema permanente</b> da 30praum é diferente: <b>todo dia</b>, "
            "o time precisa cadastrar produto, marcar pedido como enviado, aprovar "
            "post, configurar lote do Plantão, responder reclamação. Hoje isso vive "
            "espalhado entre Shopify, ST Ingressos, WhatsApp e planilhas.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 14))
    flow.append(
        kpi_row(
            [
                ("TELAS DE ADMIN", "32+", "uma pra cada fluxo crítico"),
                ("FLUXOS COBERTOS", "8", "Pedido · drop · ingresso · SAC"),
                ("STACK ATUAL", "4", "Shopify · ST · IG · WhatsApp"),
                ("DEMO VIVA", "v1", "site no ar pra clicar agora"),
            ]
        )
    )

    flow.append(Spacer(1, 16))
    flow.append(Paragraph("O que estamos construindo", styles["h2"]))
    flow.append(
        Paragraph(
            "Um <b>painel admin</b> onde cada papel da 30praum opera o que precisa. "
            "Quatro frentes integradas:",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 8))
    frentes = [
        ("Loja & Pedidos", "Cadastro de produto, lista de pedidos, status workflow (pago → separação → enviado → entregue), fila de envio, refunds, NFe automática."),
        ("Drops", "Agendamento, checklist pré-drop, monitor em tempo real durante venda, relatório automático pós-drop."),
        ("Plantão Festival", "Configuração de lotes, dashboard de venda, PWA scanner de portaria com QR offline, relatório pós-evento."),
        ("SAC & Workflow", "Caixa de tickets, métricas de atendimento, aprovação multi-pessoa (RACI), trilha de auditoria de quem fez o quê."),
    ]
    rows = [["MÓDULO", "TELAS PRINCIPAIS"]]
    for nome, desc in frentes:
        rows.append([nome, desc])
    rows_w = wrap_cells(rows)
    t = Table(rows_w, colWidths=[3.6 * cm, 14.9 * cm], repeatRows=1)
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


def pagina_fluxo_operacional():
    flow = section_header("02 · COMO VAI OPERAR", "O caminho de um pedido · do click ao entregue.")

    flow.append(
        Paragraph(
            "Exemplo concreto: <b>um fã compra um moletom às 22h.</b> Mostramos abaixo "
            "todas as telas que entram em ação e quem da 30praum opera cada uma.",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 10))

    # Fluxo em 4 estágios horizontais
    estagios = [
        ("FÃ NO SITE", "22h00", "Adiciona moletom no carrinho · checkout Pix · recebe confirmação", ACCENT),
        ("PEDIDO PAGO", "22h00·02", "Cai no admin · status 'Pago' · NFe gerada · email enviado", INK),
        ("PREPARAÇÃO", "09h00 D+1", "Operador da loja vê na fila 'A separar' · marca pronto · etiqueta", INK),
        ("ENTREGA", "D+3 a D+5", "Status atualiza sozinho · fã recebe push · NPS pós-entrega", GREEN),
    ]

    # Render como timeline horizontal
    cells = []
    for nome, hora, desc, cor in estagios:
        inner = Table(
            [
                [Paragraph(f"<b>{nome}</b>", styles["body_tight"])],
                [Paragraph(hora, styles["body_small"])],
                [Spacer(1, 4)],
                [Paragraph(desc, styles["body_small"])],
            ],
            colWidths=[None],
        )
        inner.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
                    ("LINEABOVE", (0, 0), (-1, 0), 2, cor),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (0, 0), 10),
                ]
            )
        )
        cells.append(inner)

    timeline = Table([cells], colWidths=[(18.5 * cm) / 4] * 4)
    timeline.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("LEFTPADDING", (1, 0), (-1, -1), 6),
            ]
        )
    )
    flow.append(timeline)

    flow.append(Spacer(1, 16))
    flow.append(Paragraph("Quem opera o quê", styles["h2"]))
    flow.append(
        Paragraph(
            "Linha clara de responsabilidade entre Limitless (nós) e 30praum (vocês):",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 8))
    raci_rows = [
        ["ÁREA", "LIMITLESS · NÓS", "30PRAUM · VOCÊS"],
        ["Cadastrar produto novo", "Treina o time · documenta", "Faz · E-commerce Manager"],
        ["Marcar pedido enviado · gerar etiqueta", "Constrói a tela", "Faz · operador da loja"],
        ["Aprovar refund", "Constrói o workflow", "Faz · financeiro"],
        ["Configurar lote do Plantão", "Constrói a tela", "Faz · produção do evento"],
        ["Validar QR na portaria", "Construímos PWA · treinamos guardas", "Faz · segurança do evento"],
        ["Responder SAC", "Construímos · podemos integrar terceiros", "Faz · SAC interno ou terceirizado"],
        ["Monitorar uptime 24/7", "Faz · alerta em Slack/SMS", "—"],
        ["Investigar bug · deploy correção", "Faz · time fixo (Alvaro + Cauã)", "—"],
        ["Evoluir features mensalmente", "Faz · roadmap junto com Clara", "Prioriza demandas"],
        ["Treinar time interno", "Faz · 40h embutidas na entrega", "Participa das sessões"],
    ]
    rows_w = wrap_cells(raci_rows)
    t = Table(rows_w, colWidths=[6.0 * cm, 6.5 * cm, 6.0 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    # Destaque verde nas 4 últimas linhas (responsabilidades da Limitless)
    for i in range(7, 11):
        style.append(("TEXTCOLOR", (1, i), (1, i), GREEN))
        style.append(("FONTNAME", (1, i), (1, i), FONT_B))
    t.setStyle(TableStyle(style))
    flow.append(t)

    flow.append(PageBreak())
    return flow


def pagina_propostas():
    flow = section_header("03 · TRÊS CAMINHOS DE PARCERIA", "Vocês escolhem o nível de comprometimento inicial.")

    flow.append(
        Paragraph(
            "A Limitless é nova pra 30praum — então construímos 3 propostas que "
            "<b>reduzem o risco de errar com a gente</b>. Vocês começam pequeno se "
            "quiserem, ou direto no modelo de time fixo se já tiverem segurança.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 12))

    # PROPOSTA P · PILOTO
    flow.append(Paragraph("PROPOSTA P · PILOTO PAGO", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>Entrada pequena · 90 dias · perdem pouco se não rolar.</b> Entregamos "
            "site + admin básico (pedidos, drops, CMS). Time deles testa o trabalho real.",
            styles["body_tight"],
        )
    )
    p_rows = [
        ["LINHA", "VALOR"],
        ["Entrega 60 dias · site + admin básico + treinamento (16h)", fmt_brl(48_000)],
        ["Pagamento", "50% sign · 50% entrega"],
        ["SLA piloto · mês 2 e 3 (suporte + ajustes)", fmt_brl(7_500) + "/mês"],
        ["Total piloto (90 dias)", fmt_brl(63_000)],
    ]
    rows_w = wrap_cells(p_rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("ALIGN", (1, 1), (1, -1), "RIGHT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, -1), (-1, -1), BG_SOFT),
                ("FONTNAME", (0, -1), (-1, -1), FONT_B),
                ("LINEABOVE", (0, -1), (-1, -1), 0.6, INK),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)
    flow.append(Spacer(1, 4))
    flow.append(
        Paragraph(
            "<i>Gatilho de fidelização: se evoluírem pra Proposta G ou E após o piloto, R$ 48k vira crédito integral da próxima fase.</i>",
            styles["body_small"],
        )
    )

    flow.append(Spacer(1, 16))

    # PROPOSTA G · GARANTIA
    flow.append(Paragraph("PROPOSTA G · CONTRATO COM GARANTIA", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>Plataforma completa em 5 meses · garantia de devolução.</b> Cobre "
            "site + loja + Plantão checkout + workflow + LGPD. SLA mensal com time "
            "fixo dedicado (Alvaro + Cauã).",
            styles["body_tight"],
        )
    )
    g_rows = [
        ["LINHA", "VALOR"],
        ["Entrega total (3 fases · 4-5 meses)", fmt_brl(148_000)],
        ["Pagamento", "30% sign · 35% mid · 35% entrega"],
        ["<b>SLA mensal · time fixo Alvaro + Cauã (gestão + dev contínuo)</b>", fmt_brl(28_000) + "/mês"],
        ["Total ano 1 (entrega + 12 meses SLA)", fmt_brl(484_000)],
        ["Total 24 meses", fmt_brl(820_000)],
    ]
    rows_w = wrap_cells(g_rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), FONT_B),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("ALIGN", (1, 1), (1, -1), "RIGHT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -3), [colors.white, BG_SOFT]),
                ("BACKGROUND", (0, -2), (-1, -1), BG_SOFT),
                ("FONTNAME", (0, -2), (-1, -1), FONT_B),
                ("LINEABOVE", (0, -2), (-1, -2), 0.6, INK),
                ("BACKGROUND", (0, -1), (-1, -1), AMBER),
                ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 6))
    flow.append(Paragraph("3 garantias que entram no contrato:", styles["caption"]))
    flow.extend(
        bullets(
            [
                "<b>Money-back 30 dias</b> após Fase 1: insatisfação formal = devolução de 70% do pago até então.",
                "<b>Uptime 99,95% no 1º Plantão pós-launch</b>: se cair em drop programado, 1 mês de SLA grátis + R$ 5.000 de crédito.",
                "<b>Sem multa de saída a partir do 6º mês</b>: aviso de 60 dias e sai sem fricção.",
            ],
            "li_tight",
        )
    )

    flow.append(PageBreak())
    return flow


def pagina_proposta_E():
    flow = section_header("PROPOSTA E · TIME EMBEDDED LIGHT", "Alvaro e Cauã como time fixo dedicado · parceria longa.")

    flow.append(
        Paragraph(
            "<b>Modelo de partnership · sem entrega upfront separada.</b> Vocês "
            "contratam o <b>time</b>, não o produto. Alvaro e Cauã viram CTO + Tech "
            "Lead terceirizados da 30praum — fazem produto contínuo, sustentação 24/7 "
            "prioritária e estratégia técnica. Sem rotatividade, sem onboarding novo "
            "a cada 6 meses.",
            styles["body"],
        )
    )

    flow.append(Spacer(1, 10))
    flow.append(Paragraph("O modelo · escada de comprometimento", styles["h2"]))

    e_rows = [
        ["FASE", "ALOCAÇÃO DO TIME", "MENSALIDADE", "ENTREGA"],
        ["Mês 1-6", "Alvaro 70% + Cauã 50%", fmt_brl(22_000) + "/mês", "Site + admin de pedidos + Plantão checkout"],
        ["Mês 7-12", "Alvaro 80% + Cauã 70%", fmt_brl(32_000) + "/mês", "Workflow completo + LGPD + analytics integrado"],
        ["Mês 13-24", "Alvaro 100% + Cauã 100%", fmt_brl(42_000) + "/mês", "Suporte 24/7 prioritário · evolução contínua · roadmap conjunto"],
    ]
    rows_w = wrap_cells(e_rows)
    t = Table(rows_w, colWidths=[3.0 * cm, 4.5 * cm, 3.5 * cm, 7.5 * cm], repeatRows=1)
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
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 10))
    flow.append(
        callout(
            "O QUE A MENSALIDADE COBRE",
            "<b>Salário Alvaro + Salário Cauã + encargos PJ + benefícios + infra dedicada "
            "(Vercel + Cloudflare + Supabase + Sentry) + ferramentas (Linear + Figma + "
            "Doppler).</b> Não é hora de dev. É <b>folha de pagamento de time interno</b> — "
            "só que terceirizada via Limitless, sem o custo de CLT + encargos sociais "
            "(que somariam ~80% sobre salário).",
        )
    )

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Total contratado em 24 meses", styles["h2"]))
    total_rows = [
        ["PERÍODO", "VALOR"],
        ["6 meses iniciais × R$ 22.000", fmt_brl(132_000)],
        ["6 meses seguintes × R$ 32.000", fmt_brl(192_000)],
        ["12 meses finais × R$ 42.000", fmt_brl(504_000)],
        ["TOTAL CONTRATADO · 24 MESES", fmt_brl(828_000)],
    ]
    rows_w = wrap_cells(total_rows)
    t = Table(rows_w, colWidths=[13.0 * cm, 5.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
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
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    flow.append(t)

    flow.append(Spacer(1, 8))
    flow.append(
        callout(
            "Comparativo com contratar interno",
            "1 dev sênior CLT em São Paulo custa <b>~R$ 32.000/mês com encargos</b> "
            "(salário R$ 18k + 80% encargos sociais). Pra ter 2 caras sêniores "
            "internos, vocês pagariam <b>~R$ 64.000/mês</b>. A Proposta E entrega "
            "<b>os mesmos 2 caras + infra dedicada + ferramentas + responsabilidade "
            "técnica</b> por R$ 22-42k/mês conforme escala. Sem holerite, sem férias, "
            "sem rescisão.",
        )
    )

    flow.append(PageBreak())
    return flow


def pagina_comparativo_proximos():
    flow = section_header("04 · COMPARATIVO + PRÓXIMOS PASSOS", "Os 3 caminhos lado a lado · qual escolher.")

    comp_rows = [
        ["", "P · PILOTO", "G · GARANTIA", "E · EMBEDDED"],
        ["Compromisso inicial", "90 dias", "5 meses construção + 24m SLA", "24 meses time fixo"],
        ["Entrega upfront", fmt_brl(48_000), fmt_brl(148_000), "—"],
        ["Mensal", fmt_brl(7_500), fmt_brl(28_000), "R$ 22k → 42k"],
        ["Time alocado", "Parcial · 60% cada", "Parcial → cresce", "Fixo dedicado"],
        ["Risco pro cliente", "Mínimo", "Baixo (garantias)", "Médio (compromisso)"],
        ["Fidelização", "Porta de entrada", "Confiança construída", "Parceria longa"],
        ["Total 24 meses", "~R$ 250k (se evoluir)", fmt_brl(820_000), fmt_brl(828_000)],
    ]
    rows_w = wrap_cells(comp_rows)
    t = Table(rows_w, colWidths=[4.6 * cm, 4.6 * cm, 4.6 * cm, 4.6 * cm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_SOFT]),
        # Destaque coluna G (recomendada pra começar)
        ("BACKGROUND", (2, 1), (2, -1), colors.HexColor("#ffeec2")),
        ("FONTNAME", (0, 1), (0, -1), FONT_B),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]
    t.setStyle(TableStyle(style))
    flow.append(t)

    flow.append(Spacer(1, 12))
    flow.append(
        callout(
            "Nossa recomendação · caminho de fidelização",
            "<b>Começar pela Proposta P (Piloto)</b> pra validar trabalho real em 90 "
            "dias. <b>Ao fim do piloto, evoluir pra Proposta G ou E</b> com R$ 48k já "
            "creditado. Em 18-24 meses, migrar pro modelo embedded pleno (E final). "
            "Esse caminho transforma uma relação cliente-fornecedor em sociedade "
            "operacional — vocês têm CTO + Tech Lead com cara e nome.",
        )
    )

    flow.append(Spacer(1, 16))
    flow.append(Paragraph("Próximos passos", styles["h2"]))

    steps = [
        ("1 · Demo ao vivo", "Acessar site v1 no ar (URL enviada por separado) · navegar 15 min · sentir o trabalho real."),
        ("2 · Reunião de alinhamento", "60 minutos com Clara + (idealmente) financeiro · decisão de cenário (P, G ou E)."),
        ("3 · Contrato", "Escopo detalhado em 5 dias úteis · assinatura via DocuSign ou ClickSign."),
        ("4 · Kickoff", "Slack compartilhado · setup de infra · primeira reunião de planejamento."),
        ("5 · Execução", "Mês 1 começa · demos quinzenais · ritmo definido."),
    ]
    for t_, b in steps:
        flow.append(Paragraph(t_, styles["h3"]))
        flow.append(Paragraph(b, styles["body_tight"]))
        flow.append(Spacer(1, 4))

    flow.append(Spacer(1, 14))
    flow.append(Paragraph("Contato", styles["h2"]))
    flow.append(
        Paragraph(
            "<b>Alvaro Carlisbino</b> · Founder Limitless<br/>"
            "Email · contato@limitless.com.br<br/>"
            "WhatsApp · +55 (XX) XXXXX-XXXX",
            styles["body_tight"],
        )
    )

    flow.append(Spacer(1, 24))

    sign_rows = [
        ["", ""],
        ["___________________________________", "___________________________________"],
        ["Pela 30praum · Clara Mendes (CEO)", "Pela LIMITLESS · Alvaro Carlisbino"],
        [f"Data: ___ / ___ / {date.today().year}", f"Data: {date.today().strftime('%d / %m / %Y')}"],
    ]
    t = Table(sign_rows, colWidths=[9 * cm, 9 * cm])
    t.setStyle(
        TableStyle(
            [
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, 0), 22),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 4),
                ("BOTTOMPADDING", (0, 2), (-1, 2), 4),
            ]
        )
    )
    flow.append(t)

    return flow


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="30praum — Proposta Comercial v2",
        author="Alvaro Carlisbino · Limitless",
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
    story.extend(pagina_diagnostico())
    story.extend(pagina_fluxo_operacional())
    story.extend(pagina_propostas())
    story.extend(pagina_proposta_E())
    story.extend(pagina_comparativo_proximos())

    doc.build(story)
    print(f"✔ PDF comercial v2 gerado: {OUT}")
    print(f"  Tamanho: {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    build()
