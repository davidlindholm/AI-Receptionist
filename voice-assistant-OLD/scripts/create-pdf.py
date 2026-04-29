#!/usr/bin/env python3
"""Generate the Mexico partner response PDF from structured data."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)

OUTPUT = "/Users/ville/code/AI_receptionist/respuestas-socio-mexico.pdf"

# Colors
BLUE = HexColor("#1a56db")
DARK = HexColor("#1f2937")
GRAY = HexColor("#6b7280")
LIGHT_BG = HexColor("#f3f4f6")
WHITE = HexColor("#ffffff")
GREEN = HexColor("#059669")
RED = HexColor("#dc2626")
AMBER = HexColor("#d97706")

def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        topMargin=25*mm,
        bottomMargin=20*mm,
        leftMargin=20*mm,
        rightMargin=20*mm,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        "CustomTitle", parent=styles["Title"],
        fontSize=20, leading=26, textColor=BLUE,
        spaceAfter=4*mm,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle", parent=styles["Normal"],
        fontSize=10, leading=14, textColor=GRAY,
        spaceAfter=8*mm, alignment=TA_CENTER,
    )
    h1 = ParagraphStyle(
        "H1", parent=styles["Heading1"],
        fontSize=16, leading=22, textColor=BLUE,
        spaceBefore=10*mm, spaceAfter=4*mm,
    )
    h2 = ParagraphStyle(
        "H2", parent=styles["Heading2"],
        fontSize=13, leading=18, textColor=DARK,
        spaceBefore=6*mm, spaceAfter=3*mm,
    )
    h3 = ParagraphStyle(
        "H3", parent=styles["Heading3"],
        fontSize=11, leading=15, textColor=DARK,
        spaceBefore=4*mm, spaceAfter=2*mm,
    )
    body = ParagraphStyle(
        "Body", parent=styles["Normal"],
        fontSize=10, leading=14, textColor=DARK,
        spaceAfter=2*mm,
    )
    quote_style = ParagraphStyle(
        "Quote", parent=body,
        fontSize=10, leading=14, textColor=GRAY,
        leftIndent=10*mm, borderPadding=2*mm,
        fontName="Helvetica-Oblique",
    )
    bullet = ParagraphStyle(
        "Bullet", parent=body,
        leftIndent=8*mm, bulletIndent=3*mm,
        spaceAfter=1.5*mm,
    )
    check_green = ParagraphStyle("CheckGreen", parent=bullet, textColor=GREEN)
    check_red = ParagraphStyle("CheckRed", parent=bullet, textColor=RED)

    story = []
    sp = lambda n=3: Spacer(1, n*mm)
    hr = lambda: HRFlowable(width="100%", thickness=0.5, color=HexColor("#d1d5db"), spaceAfter=4*mm, spaceBefore=2*mm)

    def make_table(headers, rows, col_widths=None):
        data = [headers] + rows
        w = col_widths or [doc.width / len(headers)] * len(headers)
        t = Table(data, colWidths=w, repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), BLUE),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("LEADING", (0, 0), (-1, -1), 13),
            ("BACKGROUND", (0, 1), (-1, -1), WHITE),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
            ("GRID", (0, 0), (-1, -1), 0.4, HexColor("#d1d5db")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4*mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 3*mm),
            ("TOPPADDING", (0, 0), (-1, -1), 2*mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2*mm),
        ]))
        return t

    # ── Title page ──
    story.append(Spacer(1, 30*mm))
    story.append(Paragraph(
        "Respuestas para el Socio en Mexico",
        title_style
    ))
    story.append(Paragraph(
        "Basado en 30+ Llamadas Reales de Ventas en Suecia",
        subtitle_style
    ))
    story.append(hr())
    story.append(Paragraph(
        "<b>Fuente:</b> Transcripciones de llamadas en frio de Terry (vendedor) "
        "vendiendo la AI-receptionist de Josef AB a empresas de servicios "
        "(cerrajeros, electricistas, plomeros, control de plagas, etc.) en Suecia. Abril 2026.",
        body
    ))
    story.append(Spacer(1, 15*mm))

    # Resumen ejecutivo table
    story.append(Paragraph("Resumen Ejecutivo", h2))
    story.append(make_table(
        ["Pregunta", "Respuesta clave"],
        [
            ["Mejor gancho", "\"No pierdas trabajos por no contestar fuera de horario\""],
            ["Top objecion", "\"Somos muy pequenos\" - Filtrar mejor antes de llamar"],
            ["2da objecion", "\"La IA no entiende mi negocio\" - Demo en vivo lo resuelve"],
            ["Proceso de cierre", "Llamada fria - Demo Google Meet 30min - Trial 14 dias"],
            ["Tasa demo/contacto", "~13% (sube a ~50% con seguimiento)"],
            ["Onboarding", "Info web + servicios + reglas urgencia + calendario"],
            ["Dashboard", "Si, muestra llamadas/leads/transcripciones por empresa"],
            ["Pricing referencia", "Mercado sueco: 1,000-3,000 SEK/mes. Piso: ~500 SEK/mes"],
        ],
        col_widths=[doc.width * 0.3, doc.width * 0.7],
    ))

    story.append(PageBreak())

    # ── Section 1 ──
    story.append(Paragraph("1. El \"Hook\" y Proceso Comercial", h1))
    story.append(hr())

    story.append(Paragraph("El Gancho (Que angulo funciona mejor?)", h2))
    story.append(Paragraph(
        "<b>Gancho principal: \"No pierdas trabajos por no contestar el telefono.\"</b>",
        body
    ))
    story.append(sp())
    story.append(Paragraph(
        "Terry abre TODAS las llamadas con la misma pregunta:",
        body
    ))
    story.append(Paragraph(
        "\"Como manejan las llamadas telefonicas fuera del horario laboral "
        "-- noches, fines de semana, festivos?\"",
        quote_style
    ))
    story.append(sp())
    story.append(Paragraph(
        "Esto obliga al prospecto a reflexionar sobre su vulnerabilidad. "
        "Despues introduce la solucion:",
        body
    ))
    for item in [
        "La IA <b>siempre contesta</b> -- sin colas, sin esperas",
        "Puede <b>evaluar la urgencia</b> del problema",
        "Puede <b>agendar citas</b> en el calendario",
        "Puede <b>reenviar llamadas</b> si es urgente",
        "Envia un <b>resumen por email/SMS</b> al dueno",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))

    story.append(sp(4))
    story.append(Paragraph("<b>Ganchos secundarios que resonaron:</b>", body))
    for item in [
        "\"Todo el mundo va a tener algo asi en un par de anos\" -- posiciona como inevitable",
        "\"Liberar tu tiempo\" -- para duenos que contestan todo personalmente",
        "\"Ver como ha avanzado la tecnologia\" -- reduce presion, invita curiosidad",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))

    story.append(sp(4))
    story.append(Paragraph("<b>Lo que NO funciono como gancho:</b>", body))
    story.append(Paragraph(
        "\u2022  Hablar de \"AI\" muy pronto asusta. Varios prospectos reaccionaron negativamente.",
        bullet
    ))
    story.append(Paragraph(
        "\u2022  Mejor empezar por el problema (llamadas perdidas), no por la tecnologia.",
        bullet
    ))

    # ── Objections ──
    story.append(Paragraph("Manejo de Objeciones", h2))

    # Objection 1
    story.append(Paragraph(
        "<b>Objecion #1: \"Somos muy pequenos / no recibimos muchas llamadas\"</b> "
        "(MAS COMUN -- ~40%)", h3
    ))
    story.append(Paragraph("Ejemplos textuales de las llamadas:", body))
    for q in [
        "\"Jag skoter det mesta sjalv\" (Yo manejo casi todo solo) -- Erik, VVS-akuten",
        "\"Det ar inte pa den nivan an\" (No estamos a ese nivel todavia) -- Alexander",
        "\"Det ar en timme per manad\" (Es una hora al mes) -- Jelena",
    ]:
        story.append(Paragraph(f"\u2022  <i>{q}</i>", bullet))
    story.append(sp())
    story.append(Paragraph(
        "<b>Contraargumento:</b> \"Piensa en el futuro\", \"Quizas estas perdiendo trabajos sin saberlo\".",
        body
    ))
    story.append(Paragraph("<b>Efectividad: BAJA.</b> Los pequenos rara vez se convencen. Mejor calificar antes de llamar.", body))

    story.append(sp(4))

    # Objection 2
    story.append(Paragraph(
        "<b>Objecion #2: \"La IA no puede entender nuestro negocio\"</b> (~25%)", h3
    ))
    for q in [
        "\"Du maste vara valdigt sakkunnig\" (Necesitas ser muy especializado) -- Ali, Spoltjanst",
        "\"Jag hade inte uppskattat att prata med nagon som ar en AI\" (Odiaria hablar con AI) -- Sebastian",
    ]:
        story.append(Paragraph(f"\u2022  <i>{q}</i>", bullet))
    story.append(sp())
    story.append(Paragraph(
        "<b>Contraargumento:</b> \"La IA lee una base de datos con tu informacion\", "
        "\"Se configuran preguntas y requisitos especificos\".",
        body
    ))
    story.append(Paragraph(
        "<b>Efectividad: MEDIA.</b> Ali termino agendando demo. "
        "La clave: ofrecer demo para que VEAN como funciona.",
        body
    ))

    story.append(sp(4))

    # Objection 3
    story.append(Paragraph(
        "<b>Objecion #3: \"Ya tenemos una solucion\"</b> (~20%)", h3
    ))
    for q in [
        "\"Vi har en telefonvaxel som fungerar bra\" (Tenemos una centralita que funciona) -- Niklas",
        "\"Vi har ett vaxelsystem\" (Tenemos sistema de central) -- Kalle",
    ]:
        story.append(Paragraph(f"\u2022  <i>{q}</i>", bullet))
    story.append(sp())
    story.append(Paragraph(
        "<b>Oportunidad de mejora:</b> Deberia preguntar cuanto pagan y que limitaciones tiene su solucion actual.",
        body
    ))

    story.append(sp(4))

    # Objection 4
    story.append(Paragraph(
        "<b>Objecion #4 (bonus): Precio</b> (~10%)", h3
    ))
    story.append(Paragraph(
        "Andre (Lassmed Direkt) gana solo 500 SEK por trabajo. "
        "Competidores cobran 1,000-3,000 SEK/mes. El pagaria max 500 SEK/mes (~$50 USD). "
        "Terry ofrecio 14 dias gratis y cerro la cita.",
        body
    ))

    # ── El Cierre ──
    story.append(Paragraph("El Cierre", h2))
    story.append(Paragraph("<b>Proceso actual de Terry:</b>", body))
    for i, step in enumerate([
        "Pregunta sobre su problema (llamadas fuera de horario)",
        "Presenta la solucion brevemente",
        "Invita a una demo por Google Meet (30 min): \"Sin compromiso, tu decides\"",
        "Pide email para enviar invitacion",
        "Confirma fecha y hora en la misma llamada",
    ], 1):
        story.append(Paragraph(f"<b>{i}.</b>  {step}", bullet))

    story.append(sp(3))
    story.append(Paragraph("<b>Herramientas de cierre:</b>", body))
    story.append(Paragraph("\u2713  Demo en vivo por Google Meet (principal)", check_green))
    story.append(Paragraph("\u2713  14 dias gratis (mencionado a Andre)", check_green))
    story.append(Paragraph("\u2717  No usa \"reporte de ventas perdidas\" / auditoria", check_red))
    story.append(Paragraph("\u2717  No usa datos concretos (%, cifras de ROI)", check_red))

    story.append(sp(4))
    story.append(Paragraph("<b>Tasas observadas en las transcripciones:</b>", body))
    story.append(make_table(
        ["Resultado", "Cantidad", "%"],
        [
            ["Demo agendada", "4", "13%"],
            ["Referido a decisor", "6", "19%"],
            ["Seguimiento por email", "2", "6%"],
            ["Llamar despues", "4", "13%"],
            ["No interesado", "14", "44%"],
            ["Sin contacto (buzon/ocupado)", "10", "--"],
            ["Llamadas de prueba internas", "3", "--"],
        ],
        col_widths=[doc.width * 0.5, doc.width * 0.25, doc.width * 0.25],
    ))
    story.append(sp(2))
    story.append(Paragraph(
        "<b>Tasa de conversion a demo:</b> ~13% de las llamadas contestadas<br/>"
        "<b>Tasa de \"puerta abierta\"</b> (demo + referido + seguimiento + callback): <b>~50%</b>",
        body
    ))

    story.append(PageBreak())

    # ── Section 2 ──
    story.append(Paragraph("2. Implementacion (Onboarding)", h1))
    story.append(hr())

    story.append(Paragraph("Que necesita el cliente para arrancar?", h2))
    for i, item in enumerate([
        "<b>Informacion del negocio:</b> La IA \"lee todas sus paginas web\" para construir la base de conocimiento",
        "<b>Descripcion de servicios</b> que ofrece la empresa",
        "<b>Reglas de urgencia</b> (que se considera urgente vs. normal)",
        "<b>Acceso a calendario</b> (Google Calendar) para agendar citas",
        "<b>Numero de telefono</b> al cual redirigir si es urgente",
        "<b>Email/SMS</b> para recibir resumenes",
    ], 1):
        story.append(Paragraph(f"<b>{i}.</b>  {item}", bullet))

    story.append(Paragraph("Tiempo estimado", h2))
    story.append(Paragraph(
        "No se menciona explicitamente en las llamadas. Basado en la arquitectura del codigo:",
        body
    ))
    for item in [
        "El sistema usa un <b>company_slug</b> por cliente (multi-tenant)",
        "Cada empresa tiene su propia configuracion de asistente",
        "El dashboard muestra leads filtrados por empresa",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))
    story.append(sp())
    story.append(Paragraph("<b>Estimacion razonable: 1-3 dias</b> desde que el cliente entrega la informacion.", body))

    story.append(Paragraph("Esfuerzo tecnico por cliente", h2))
    for item in [
        "Configurar asistente con datos del negocio",
        "Crear landing page (ya existe template reutilizable)",
        "Configurar numero telefonico (Telnyx)",
        "Pruebas de llamada",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))
    story.append(sp())
    story.append(Paragraph("<b>Escala:</b> Medio-bajo esfuerzo por cliente una vez estandarizado.", body))

    # ── Section 3 ──
    story.append(Paragraph("3. Seguimiento y Post-Venta", h1))
    story.append(hr())

    story.append(Paragraph("Retencion", h2))
    story.append(Paragraph("<b>Hay dashboard? SI</b> -- el proyecto incluye:", body))
    for item in [
        "Dashboard por empresa (cada cliente ve sus propios datos)",
        "Panel admin centralizado",
        "Datos visibles: llamadas recibidas, resumenes, urgencia, transcripciones, grabaciones",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))

    story.append(Paragraph("Soporte y desfase horario (Mexico vs Suecia)", h2))
    story.append(Paragraph(
        "Suecia = UTC+1/+2, Mexico = UTC-6. <b>Diferencia: 7-8 horas.</b>",
        body
    ))
    story.append(sp())
    story.append(Paragraph("<b>Opciones:</b>", body))
    for item in [
        "Soporte asincrono por email/ticket",
        "Ventana de soporte compartida (manana en Mexico = tarde en Suecia)",
        "Dashboard de auto-servicio para cambios simples",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))

    # ── Section 4 ──
    story.append(Paragraph("4. Estructura de Revenue Share", h1))
    story.append(hr())

    story.append(Paragraph("Informacion de pricing de las transcripciones", h2))
    for item in [
        "<b>Andre (Lassmed):</b> Competidores cobran 1,000-3,000 SEK/mes (~$95-285 USD). El pagaria 500 SEK/mes (~$47 USD).",
        "<b>Terry menciona:</b> Prueba gratuita de 14 dias",
        "<b>No se menciona</b> un precio fijo de Josef en ninguna llamada",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))

    story.append(Paragraph("Lo que falta definir", h2))
    story.append(Paragraph(
        "Las transcripciones <b>no contienen</b> informacion sobre:",
        body
    ))
    for item in [
        "Precio de lista (MSRP) de Josef",
        "Costo por \"unidad\" o cliente para el socio",
        "Modelo de margen para resellers/partners",
    ]:
        story.append(Paragraph(f"\u2022  {item}", bullet))
    story.append(sp(3))
    story.append(Paragraph(
        "<b>Esto necesita discutirse directamente con Josef / la direccion.</b>",
        body
    ))

    doc.build(story)
    print(f"PDF created: {OUTPUT}")

if __name__ == "__main__":
    build_pdf()
