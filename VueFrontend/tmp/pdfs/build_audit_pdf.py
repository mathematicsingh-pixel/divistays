from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path("/Users/anjugahlot/Desktop/CozyRooms/VueFrontend")
SHOTS = ROOT / "output/playwright"
OUT_PDF = ROOT / "output/pdf/cozyrooms-external-audit-brief.pdf"

WIDTH, HEIGHT = A4
MARGIN = 40
CONTENT_W = WIDTH - (MARGIN * 2)
COL_W = (CONTENT_W - 16) / 2


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="TitleLarge",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#07121a"),
        alignment=TA_LEFT,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#435766"),
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#07121a"),
        spaceBefore=4,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#20313d"),
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="Label",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#2ca18e"),
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Caption",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.3,
        leading=11,
        textColor=colors.HexColor("#566977"),
        alignment=TA_LEFT,
    )
)
styles.add(
    ParagraphStyle(
        name="Prompt",
        parent=styles["BodyText"],
        fontName="Courier",
        fontSize=8.2,
        leading=10.2,
        textColor=colors.HexColor("#10222f"),
    )
)


def img_flow(path: Path, max_width: float, max_height: float | None = None) -> Image:
    width, height = PILImage.open(path).size
    scale = min(max_width / width, (max_height / height) if max_height else 999)
    return Image(str(path), width=width * scale, height=height * scale)


def shot_card(path: Path, caption: str, max_width: float, max_height: float | None = None) -> Table:
    return Table(
        [[img_flow(path, max_width=max_width, max_height=max_height)], [Paragraph(caption, styles["Caption"])]],
        colWidths=[max_width],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )


def bullet(text: str) -> Paragraph:
    return Paragraph(f"• {escape(text)}", styles["Body"])


def add_box(story: list, title: str, lines: list[str], bg: str = "#f3f8fb", border: str = "#d8e5ec") -> None:
    body = [Paragraph(title, styles["Label"])]
    body.extend(Paragraph(escape(line), styles["Body"]) for line in lines)
    table = Table([[body]], colWidths=[CONTENT_W])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(bg)),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor(border)),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 10))


def pair_table(left: Table, right: Table) -> Table:
    return Table(
        [[left, right]],
        colWidths=[COL_W, COL_W],
        style=TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        ),
    )


def build_story() -> list:
    story: list = []

    story.append(Paragraph("CozyRooms External Audit Brief", styles["TitleLarge"]))
    story.append(
        Paragraph(
            "Standalone context pack for an external model to critique UX, UI, branding, copy, and SEO without needing repo access or any other file.",
            styles["Subtitle"],
        )
    )
    story.append(Spacer(1, 4))

    add_box(
        story,
        "Use This Document",
        [
            "Project: mobile-first student-room landing page for Kakadeo, Kanpur, India.",
            "Brand: CozyRooms.",
            "Goal of this PDF: provide enough context, screenshots, current copy, and SEO setup for a stronger model to recommend concrete improvements.",
            "Capture date: March 13, 2026. Screenshot widths: 1440px desktop and 390px mobile.",
        ],
    )
    story.append(
        shot_card(
            SHOTS / "desktop-hero.png",
            "Current desktop hero. Strong typography and palette; copy is highly stylized and mood-led.",
            CONTENT_W,
            max_height=3.3 * inch,
        )
    )
    story.append(Spacer(1, 6))
    add_box(
        story,
        "What The External Model Should Solve",
        [
            "Make the product feel more trustworthy, useful, specific, and less like generic AI-written marketing.",
            "Improve the mobile-first decision flow for students who want to compare rooms fast and contact directly.",
            "Sharpen brand positioning, tone of voice, and visual identity so the site feels distinctive but still credible.",
            "Recommend SEO structure that can rank for local and room-specific intent, not just one generic home page.",
        ],
    )

    story.append(Paragraph("Product Snapshot", styles["Section"]))
    for text in [
        "Audience: co-ed students looking for furnished stays in Kakadeo, Kanpur, Uttar Pradesh.",
        "Current flow: browse hero -> trust cards -> room catalog with filters -> locality/process section -> FAQ -> CTA -> footer. Two overlay states: room detail dialog and mobile filter sheet.",
        "Conversion path: direct call or direct WhatsApp. No form funnel.",
        "Current route structure: one index page only. Room details open in a modal, not on standalone indexable pages.",
        "Brand promise in current copy: fast shortlist, room-first filters, direct enquiry.",
    ]:
        story.append(bullet(text))
    story.append(Spacer(1, 8))

    inventory_rows = [
        ["Room", "Rent", "Availability", "Setup"],
        ["Vibrant studio apartment", "₹7,999", "Available", "Double, private kitchen, attached washroom"],
        ["Garden-view studio apartment", "₹7,999", "Available", "Double or triple, private kitchen, attached washroom"],
        ["1 RK studio apartment", "₹7,999", "Occupied", "Double, private kitchen, private washroom"],
        ["Budget single room", "₹3,999", "Occupied", "Single, common kitchen, attached washroom"],
        ["Compact solo room", "₹3,499", "Occupied", "Single, common kitchen, common washroom"],
    ]
    inventory = Table(inventory_rows, colWidths=[2.0 * inch, 0.8 * inch, 1.0 * inch, 3.1 * inch])
    inventory.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#07121a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.8),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#f8fbfd"), colors.HexColor("#eff5f8")]),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#d6e3ea")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#d6e3ea")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(inventory)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Current Visual And Brand System", styles["Section"]))
    for text in [
        "Palette: deep navy background, white cards, orange primary CTA, teal accent, warm terracotta/gold brand mark.",
        "Typography: Syne for headlines, Manrope for body copy.",
        "Brand mark: rounded room/arch form with hanging lamp and glow rays.",
        "Current mood words implied by the site: late-night study, glow, shortlist, direct line, less chaos, after-hours.",
        "UI pattern language: rounded cards, pill chips, soft gradients, heavy use of badges, modal detail view, sticky mobile call/WhatsApp bar.",
    ]:
        story.append(bullet(text))
    story.append(Spacer(1, 6))

    copy_rows = [
        ["Area", "Current text"],
        ["Tagline", "Study mode. Sleep easy."],
        ["Hero H1", "Study-mode rooms with a little after-hours glow."],
        [
            "Hero summary",
            "Browse by layout, rent, kitchen, and washroom setup, then jump straight into WhatsApp without brochure noise or enquiry detours.",
        ],
        ["Trust heading", "Built for the 11 pm room hunt."],
        ["Catalog heading", "Shortlist by fit, not brochure fluff."],
        ["Location heading", "Kakadeo fit, minus the back-and-forth."],
        ["FAQ heading", "Real questions before the first call."],
        ["CTA heading", "Found the vibe? Check live availability."],
        ["Footer summary", "Characterful student stays in Kakadeo with faster shortlisting, clear rent bands, and direct mobile enquiry."],
    ]
    copy_table = Table(copy_rows, colWidths=[1.3 * inch, 5.7 * inch])
    copy_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#ffeddc")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#7a370b")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("LEADING", (0, 0), (-1, -1), 10.5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fbfdfe")]),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#f2c7a1")),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#f2c7a1")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(copy_table)
    story.append(Spacer(1, 10))
    add_box(
        story,
        "Early Copy / Brand Concerns",
        [
            "The tone is stylish but often abstract. It leans on metaphors and anti-brochure language instead of concrete decision help.",
            "Phrases like brochure haze, brochure fluff, after-hours glow, found the vibe, and direct line/no form maze risk sounding AI-generated or over-written.",
            "The page talks about fast shortlisting, but the copy does not foreground the practical details students and parents often care about first: exact locality proof, safety proof, utilities, deposit, food/laundry, visit process, or what is included vs extra.",
            "Brand distinctiveness exists visually, but the verbal identity still feels generic student-housing marketing rather than specific local expertise.",
        ],
    )

    story.append(Paragraph("Current SEO Snapshot", styles["Section"]))
    seo_rows = [
        ["Field", "Current value"],
        ["Title", "CozyRooms | Student rooms in Kakadeo, Kanpur"],
        ["Meta description", "CozyRooms helps students browse furnished stays in Kakadeo, Kanpur with clear pricing, layout-first filters, and direct mobile enquiry."],
        ["Canonical", "https://divyendra-gahlot.github.io/hostel-rooms/"],
        ["Robots", "Allow all"],
        ["Sitemap", "One URL only: home page"],
        ["Structured data", "Hostel schema + FAQPage + Offer items for rooms"],
        ["Open Graph / Twitter", "Uses first featured room image as share image"],
        ["Page architecture", "Single page only; room details live in modal"],
    ]
    seo_table = Table(seo_rows, colWidths=[1.55 * inch, 5.45 * inch])
    seo_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9f7f4")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#1f7e70")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.6),
                ("LEADING", (0, 0), (-1, -1), 10.8),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f9fcfc")]),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#cce6df")),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cce6df")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(seo_table)
    story.append(Spacer(1, 10))
    for text in [
        "Current deploy URL is a GitHub Pages URL, which weakens trust, CTR, and local business credibility if this is also the public domain.",
        "Because room details are trapped in a modal instead of dedicated pages, the site has almost no crawlable long-tail inventory content.",
        "The sitemap currently exposes only one page, so there is no indexable room-level or locality-level architecture.",
        "Schema is present, but the business/entity type and offer structure may need to align better with the exact accommodation model (student PG / rental / hostel / serviced stay).",
        "There is no obvious crawlable content strategy yet for queries like room for students in Kakadeo, PG near coaching, furnished single room in Kakadeo, or budget student room in Kanpur.",
    ]:
        story.append(bullet(text))
    story.append(Spacer(1, 10))
    add_box(
        story,
        "What The SEO Review Should Specifically Cover",
        [
            "Whether the site needs room detail pages, locality pages, FAQ clusters, and/or comparison pages.",
            "What title tags, meta descriptions, H1/H2 structure, schema, and internal links should exist.",
            "How to improve local trust signals: address, map, landmarks, reviews, availability freshness, original photography, and brand/domain credibility.",
            "How to prioritize low-effort wins vs structural changes that require new routes or content architecture.",
        ],
    )

    story.append(PageBreak())
    story.append(Paragraph("Screenshot Gallery: Full-Page Overviews", styles["Section"]))
    story.append(
        pair_table(
            shot_card(SHOTS / "desktop-fullpage.png", "Desktop full-page overview.", COL_W, max_height=8.6 * inch),
            shot_card(SHOTS / "mobile-fullpage.png", "Mobile full-page overview.", COL_W, max_height=8.6 * inch),
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("Screenshot Gallery: Desktop States", styles["Section"]))
    story.append(shot_card(SHOTS / "desktop-hero.png", "Desktop hero state.", CONTENT_W, max_height=3.5 * inch))
    story.append(Spacer(1, 8))
    story.append(
        shot_card(
            SHOTS / "desktop-catalog-all.png",
            "Desktop catalog after switching from Available now to Show all.",
            CONTENT_W,
            max_height=4.0 * inch,
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("Screenshot Gallery: Desktop Overlays", styles["Section"]))
    story.append(
        shot_card(
            SHOTS / "desktop-catalog-filters.png",
            "Desktop catalog with expanded room-setup filters.",
            CONTENT_W,
            max_height=4.05 * inch,
        )
    )
    story.append(Spacer(1, 8))
    story.append(shot_card(SHOTS / "desktop-room-dialog.png", "Desktop room-detail dialog.", CONTENT_W, max_height=4.0 * inch))

    story.append(PageBreak())
    story.append(Paragraph("Screenshot Gallery: Mobile States", styles["Section"]))
    story.append(
        pair_table(
            shot_card(SHOTS / "mobile-hero.png", "Mobile hero.", COL_W, max_height=4.55 * inch),
            shot_card(SHOTS / "mobile-catalog.png", "Mobile catalog in-scroll state.", COL_W, max_height=4.55 * inch),
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        pair_table(
            shot_card(SHOTS / "mobile-filter-sheet.png", "Mobile filter bottom sheet.", COL_W, max_height=4.55 * inch),
            shot_card(SHOTS / "mobile-room-dialog.png", "Mobile room-detail dialog.", COL_W, max_height=4.55 * inch),
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("Paste-Ready Prompt For A Stronger Model", styles["Section"]))
    prompt = """You are acting as a senior product designer, brand strategist, conversion copywriter, and technical SEO lead.

Use only the information inside this document. Treat this PDF as the complete source of truth. Do not ask for repo access, hidden files, or any other context.

Audit the current CozyRooms experience and tell me how to improve:
- UX: mobile-first flow, scannability, decision clarity, trust building, conversion path, filters, modal behavior, and CTA strategy.
- UI: layout hierarchy, typography, visual system, card design, information density, component consistency, image usage, whitespace, and overall polish.
- Branding: positioning, distinctiveness, tone of voice, tagline quality, trustworthiness, emotional promise, and whether the brand feels memorable instead of generic.
- Copy: identify exactly why the current text feels AI-generated or generic, then rewrite the key text so it sounds human, specific, local, and trustworthy.
- SEO: title/meta/H1-H3 structure, room-page strategy, local SEO, schema, sitemap, internal linking, domain/trust signals, content strategy, and what should be crawlable vs modal-only.

Please return your answer in this structure:
1. Top problems ranked by impact.
2. Recommended brand direction.
3. Specific UX/UI changes section by section.
4. Rewritten copy for the homepage and conversion path.
5. SEO architecture and implementation plan.
6. A prioritized roadmap: quick wins, medium lifts, and structural changes.

Be concrete. Avoid generic advice. Give example headlines, example subheads, CTA rewrites, metadata examples, schema recommendations, and wireframe notes where useful. If any assumptions in the current site are weak or wrong, say so directly."""
    prompt_box = Table([[Paragraph(escape(prompt).replace("\n", "<br/>"), styles["Prompt"])]], colWidths=[CONTENT_W])
    prompt_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f8fafc")),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#d9e3ea")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    story.append(prompt_box)
    story.append(Spacer(1, 10))
    add_box(
        story,
        "Extra Context The External Model Can Use",
        [
            "Current default CTA destinations are tel: link and WhatsApp deep links. The generic landing WhatsApp text is: Hi, I want room details for CozyRooms in Kakadeo, Kanpur.",
            "Room-specific WhatsApp text currently says: Hi, I want details about [room title] at CozyRooms in Kakadeo. Please share current availability, rent details, and next steps.",
            "The site currently prioritizes speed and direct enquiry over multi-step lead capture.",
        ],
    )

    return story


def add_page_number(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#5f7381"))
    canvas.drawRightString(WIDTH - MARGIN, 20, f"Page {doc.page}")
    canvas.drawString(MARGIN, 20, "CozyRooms external audit brief")
    canvas.restoreState()


def main() -> None:
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT_PDF),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=44,
        bottomMargin=32,
    )
    doc.build(build_story(), onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(OUT_PDF)


if __name__ == "__main__":
    main()
