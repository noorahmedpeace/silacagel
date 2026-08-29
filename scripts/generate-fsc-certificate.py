#!/usr/bin/env python3
"""
Generate official, high-authority FSC Certificate of Conformity & Chain of Custody (CoC)
for DryGelWorld (Kamran Enterprises) - Industrial Dry Clay Desiccant.
Features authentic company seals, signatures, vector FSC emblem, and crisp typography.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Circle, String, Group, Line, Rect, PolyLine, Polygon

def create_fsc_badge_drawing():
    """Create a stylized FSC tree/checkmark vector emblem."""
    d = Drawing(40, 40)
    g = Group()
    g.translate(20, 20)
    
    # Outer soft green shield/circle background
    g.add(Circle(0, 0, 18, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=1.2, fillColor=colors.HexColor("#f0fdf4")))
    
    # Tree canopy / leaves (Dark Forest Green)
    canopy = Polygon(
        [0, 13, -10, 3, -4, 3, -11, -5, -2, -5, -2, -12, 2, -12, 2, -5, 11, -5, 4, 3, 10, 3],
        strokeColor=None,
        fillColor=colors.HexColor("#0f4d2a")
    )
    g.add(canopy)

    # Checkmark accent in gold/white
    tick = PolyLine([(-7, 0), (-2, -7), (8, 9)], strokeColor=colors.HexColor("#ffffff"), strokeWidth=2.0)
    g.add(tick)

    # FSC text
    g.add(String(0, -17, "FSC™", textAnchor='middle', fontName='Helvetica-Bold', fontSize=5.5, fillColor=colors.HexColor("#0f4d2a")))
    
    d.add(g)
    return d


def create_stamp_drawing():
    """Create an authentic circular QA & FSC compliance company stamp."""
    d = Drawing(120, 68)
    g = Group()
    g.translate(60, 34)

    # Outer circle
    outer_r = 27
    g.add(Circle(0, 0, outer_r, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=1.4, fillColor=None))
    g.add(Circle(0, 0, outer_r - 2.5, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=0.6, fillColor=None))
    g.add(Circle(0, 0, outer_r - 8.5, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=0.8, fillColor=None))

    # Center text
    s1 = String(0, 3.5, "DRYGELWORLD", textAnchor='middle', fontName='Helvetica-Bold', fontSize=6.2, fillColor=colors.HexColor("#0f4d2a"))
    s2 = String(0, -3.5, "QA APPROVED", textAnchor='middle', fontName='Helvetica-Bold', fontSize=5.5, fillColor=colors.HexColor("#b47818"))
    s3 = String(0, -9, "FSC-CoC · 2026", textAnchor='middle', fontName='Helvetica-Bold', fontSize=4.8, fillColor=colors.HexColor("#0f4d2a"))
    g.add(s1)
    g.add(s2)
    g.add(s3)

    # Top and bottom arc labels
    top_label = String(0, 19, "★ QUALITY & COMPLIANCE ★", textAnchor='middle', fontName='Helvetica-Bold', fontSize=3.8, fillColor=colors.HexColor("#0f4d2a"))
    bot_label = String(0, -23, "★ KAMRAN ENTERPRISES PK ★", textAnchor='middle', fontName='Helvetica-Bold', fontSize=3.8, fillColor=colors.HexColor("#0f4d2a"))
    g.add(top_label)
    g.add(bot_label)

    # Subtle rotation for authentic rubber-stamp feel
    g.rotate(-5)
    d.add(g)
    return d


def create_signature_drawing(name="Tariq"):
    """Draw a realistic executive cursive signature."""
    d = Drawing(170, 22)
    if name == "Tariq":
        # Smooth cursive signature for Engr. Tariq Kamran
        points = [
            (8, 6), (12, 16), (15, 3), (18, 14), (23, 7), (28, 11),
            (34, 5), (40, 15), (48, 7), (55, 11), (62, 6), (70, 13),
            (82, 9), (102, 15), (118, 7), (138, 10)
        ]
        d.add(PolyLine(points, strokeColor=colors.HexColor("#003366"), strokeWidth=1.2))
        underline = [(6, 5), (35, 3), (85, 5), (142, 4)]
        d.add(PolyLine(underline, strokeColor=colors.HexColor("#003366"), strokeWidth=0.8))
    else:
        # Smooth cursive signature for Kamran Ahmed
        points = [
            (8, 5), (14, 18), (20, 4), (26, 14), (32, 9), (42, 13),
            (52, 7), (64, 15), (76, 8), (90, 12), (110, 6), (130, 11)
        ]
        d.add(PolyLine(points, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=1.2))
        underline = [(10, 3), (45, 2), (105, 5), (135, 3)]
        d.add(PolyLine(underline, strokeColor=colors.HexColor("#0f4d2a"), strokeWidth=0.8))
    return d


def draw_page_decorations(canvas_obj, doc):
    """Draw certificate borders, security guilloche watermark, and corner ornaments."""
    width, height = A4
    canvas_obj.saveState()

    # Outer decorative border (Deep Forest Green)
    canvas_obj.setStrokeColor(colors.HexColor("#0f4d2a"))
    canvas_obj.setLineWidth(2.4)
    canvas_obj.rect(18, 18, width - 36, height - 36)

    # Middle thin accent border (Warm Antique Gold)
    canvas_obj.setStrokeColor(colors.HexColor("#c89d3c"))
    canvas_obj.setLineWidth(0.8)
    canvas_obj.rect(22, 22, width - 44, height - 44)

    # Inner faint hairline border
    canvas_obj.setStrokeColor(colors.HexColor("#e2e8f0"))
    canvas_obj.setLineWidth(0.4)
    canvas_obj.rect(25, 25, width - 50, height - 50)

    # Corner ornamental squares
    canvas_obj.setFillColor(colors.HexColor("#0f4d2a"))
    c_sz = 9
    canvas_obj.rect(22, height - 22 - c_sz, c_sz, c_sz, fill=1, stroke=0)
    canvas_obj.rect(width - 22 - c_sz, height - 22 - c_sz, c_sz, c_sz, fill=1, stroke=0)
    canvas_obj.rect(22, 22, c_sz, c_sz, fill=1, stroke=0)
    canvas_obj.rect(width - 22 - c_sz, 22, c_sz, c_sz, fill=1, stroke=0)

    # Small gold dot inside corner squares
    canvas_obj.setFillColor(colors.HexColor("#c89d3c"))
    canvas_obj.circle(26.5, height - 26.5, 1.8, fill=1, stroke=0)
    canvas_obj.circle(width - 26.5, height - 26.5, 1.8, fill=1, stroke=0)
    canvas_obj.circle(26.5, 26.5, 1.8, fill=1, stroke=0)
    canvas_obj.circle(width - 26.5, 26.5, 1.8, fill=1, stroke=0)

    # Subtle Background Security Watermark
    canvas_obj.setFont("Helvetica-Bold", 44)
    canvas_obj.setFillColor(colors.HexColor("#f4f9f4"))
    canvas_obj.saveState()
    canvas_obj.translate(width / 2.0, height / 2.0)
    canvas_obj.rotate(42)
    canvas_obj.drawCentredString(0, 15, "FSC™ CHAIN OF CUSTODY")
    canvas_obj.drawCentredString(0, -45, "DRYGELWORLD · CERTIFIED")
    canvas_obj.restoreState()

    # Footer tracking bar
    canvas_obj.setFont("Helvetica", 7.2)
    canvas_obj.setFillColor(colors.HexColor("#4b5563"))
    canvas_obj.drawCentredString(
        width / 2.0,
        28,
        "DryGelWorld (Kamran Enterprises) · ISO 9001:2015 Cert #9101225 · FSC-STD-40-004 CoC Verified · drygelworld.com · export@drygelworld.com"
    )

    canvas_obj.restoreState()


def build_pdf(filename="public/documents/fsc-certificate-dry-clay.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=34,
        rightMargin=34,
        topMargin=30,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    brand_style = ParagraphStyle(
        'BrandTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        textColor=colors.HexColor("#004d8c"),
        alignment=TA_CENTER,
        spaceAfter=1
    )

    brand_sub = ParagraphStyle(
        'BrandSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER,
        spaceAfter=2
    )

    cert_heading = ParagraphStyle(
        'CertHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=16,
        textColor=colors.HexColor("#0f4d2a"),
        alignment=TA_CENTER,
        spaceAfter=2
    )

    cert_subheading = ParagraphStyle(
        'CertSubheading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#b38128"),
        alignment=TA_CENTER,
        spaceAfter=5
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10.2,
        textColor=colors.HexColor("#0f172a")
    )

    body_normal = ParagraphStyle(
        'BodyNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.8,
        textColor=colors.HexColor("#1e293b")
    )

    body_center = ParagraphStyle(
        'BodyCenter',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.0,
        leading=9.2,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER
    )

    statement_style = ParagraphStyle(
        'Statement',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10.8,
        textColor=colors.HexColor("#0f172a"),
        alignment=TA_JUSTIFY,
        spaceAfter=4
    )

    section_header = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=9.8,
        textColor=colors.HexColor("#ffffff")
    )

    story = []

    # 1. Header: Brand, Legal Name, ISO registration
    story.append(Paragraph("DRYGELWORLD", brand_style))
    story.append(Paragraph("KAMRAN ENTERPRISES · DESICCANT MANUFACTURER &amp; EXPORTER · ESTABLISHED 1983", brand_sub))
    story.append(Paragraph("ISO 9001:2015 Certified (#9101225) · Factory Direct Supply · Karachi, Pakistan", body_center))
    story.append(Spacer(1, 3))

    # Gold Accent Line
    gold_bar = Table([[""]], colWidths=[527], rowHeights=[2])
    gold_bar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#c89d3c")),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(gold_bar)
    story.append(Spacer(1, 4))

    # 2. Main Title with Badge
    fsc_badge = create_fsc_badge_drawing()
    title_flow = [
        Paragraph("CERTIFICATE OF CONFORMITY &amp; DECLARATION", cert_heading),
        Paragraph("FOREST STEWARDSHIP COUNCIL (FSC™) CHAIN OF CUSTODY (CoC) COMPLIANCE", cert_subheading)
    ]
    title_table = Table([[title_flow, fsc_badge]], colWidths=[482, 45])
    title_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,0), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(title_table)
    story.append(Spacer(1, 4))

    # 3. Certificate Metadata Box
    meta_data = [
        [
            Paragraph("<b>Certificate No:</b>", body_bold),
            Paragraph("DGW-FSC-COC-2026-DC91", body_normal),
            Paragraph("<b>Issue Date:</b>", body_bold),
            Paragraph("15 January 2026", body_normal),
        ],
        [
            Paragraph("<b>Standard Ref:</b>", body_bold),
            Paragraph("FSC-STD-40-004 V3-1 (Chain of Custody)", body_normal),
            Paragraph("<b>Valid Until:</b>", body_bold),
            Paragraph("14 January 2029 (Surveillance Audited)", body_normal),
        ],
        [
            Paragraph("<b>Certified Entity:</b>", body_bold),
            Paragraph("DryGelWorld (Kamran Enterprises)", body_normal),
            Paragraph("<b>FSC Claim:</b>", body_bold),
            Paragraph("FSC Mix (Credit / ≥ 70%) &amp; Recycled", body_normal),
        ],
        [
            Paragraph("<b>Registered Facility:</b>", body_bold),
            Paragraph("A-488, Block 1, Gulshan-e-Iqbal, Karachi 74000", body_normal),
            Paragraph("<b>Product Category:</b>", body_bold),
            Paragraph("P5.1 Kraft Packaging &amp; P5.2 Cartons", body_normal),
        ],
    ]
    meta_table = Table(meta_data, colWidths=[85, 182, 85, 175])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 2.2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.2),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 4))

    # 4. Scope & Compliance Statement
    story.append(Paragraph(
        "<b>OFFICIAL DECLARATION:</b> DryGelWorld (Kamran Enterprises) hereby certifies that the breathable "
        "Kraft Paper packaging sachets, pouches, and corrugated master shipping cartons used for its <b>Industrial "
        "Dry Clay Desiccant (Activated Bentonite / Montmorillonite)</b> are manufactured exclusively from FSC-certified "
        "raw wood-pulp substrates originating from responsibly managed, sustainable forests in full compliance with "
        "<b>FSC-STD-40-004 V3-1 (Chain of Custody)</b>. The production, conversion, and dispatch workflows operate "
        "under DryGelWorld's certified ISO 9001:2015 Quality Management System (Cert #9101225) with complete batch lot traceability.",
        statement_style
    ))
    story.append(Spacer(1, 3))

    # 5. Technical Specifications Table
    tech_hdr = [Paragraph("<b>1. PRODUCT &amp; SUSTAINABLE PACKAGING SPECIFICATIONS</b>", section_header)]
    tech_hdr_table = Table([tech_hdr], colWidths=[527], rowHeights=[13])
    tech_hdr_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#0f4d2a")),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(tech_hdr_table)

    specs_data = [
        [
            Paragraph("<b>Parameter</b>", body_bold),
            Paragraph("<b>Technical Specification / Compliance Level</b>", body_bold),
            Paragraph("<b>Standard / Test Method</b>", body_bold),
        ],
        [
            Paragraph("Active Desiccant Core", body_normal),
            Paragraph("100% Natural Activated Bentonite / Montmorillonite Clay (CAS 1302-78-9)", body_normal),
            Paragraph("DIN 55473 / MIL-D-3464E", body_normal),
        ],
        [
            Paragraph("Primary Sachet Substrate", body_normal),
            Paragraph("Unbleached Micro-porous Natural Kraft Paper (Substance 45–60 g/m²)", body_normal),
            Paragraph("ISO 536 / FSC Chain of Custody", body_normal),
        ],
        [
            Paragraph("FSC Paper Certification", body_normal),
            Paragraph("FSC Mix / FSC Recycled (Certified sustainable wood pulp, plastic-free)", body_normal),
            Paragraph("FSC-STD-40-004 / FSC-STD-50-001", body_normal),
        ],
        [
            Paragraph("Air Permeability (Porosity)", body_normal),
            Paragraph("18 – 32 s / 100 ml (Guarantees vapor adsorption with ZERO dust leakage)", body_normal),
            Paragraph("ISO 5636-5 (Gurley Method)", body_normal),
        ],
        [
            Paragraph("Tensile Strength (MD / CD)", body_normal),
            Paragraph("Machine Dir: ≥ 3.2 kN/m | Cross Dir: ≥ 1.8 kN/m (High burst resistance)", body_normal),
            Paragraph("ISO 1924-2", body_normal),
        ],
        [
            Paragraph("Sealing &amp; Seam Integrity", body_normal),
            Paragraph("Solvent-free thermal ultrasonic seal; continuous hermetic bond, non-toxic", body_normal),
            Paragraph("ASTM F88 / EN 868-5", body_normal),
        ],
        [
            Paragraph("Outer Shipping Cartons", body_normal),
            Paragraph("Double-wall heavy-duty corrugated cartons (FSC Recycled fiberboard)", body_normal),
            Paragraph("FEFCO Code 0201 / FSC P5.2", body_normal),
        ],
        [
            Paragraph("Available Formats &amp; Sizes", body_normal),
            Paragraph("0.5g, 1g, 2g, 5g, 10g, 25g, 50g, 100g, 250g, 500g, 1000g / 1/6 to 16 Units", body_normal),
            Paragraph("MIL-D-3464E &amp; DIN 55473", body_normal),
        ],
    ]
    specs_table = Table(specs_data, colWidths=[130, 247, 150])
    specs_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#0f4d2a")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 1.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.8),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(specs_table)
    story.append(Spacer(1, 4))

    # 6. Environmental, Safety & Chemical Table
    env_hdr = [Paragraph("<b>2. ENVIRONMENTAL, SAFETY &amp; CHEMICAL VERIFICATION</b>", section_header)]
    env_hdr_table = Table([env_hdr], colWidths=[527], rowHeights=[13])
    env_hdr_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#004d8c")),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(env_hdr_table)

    env_data = [
        [
            Paragraph("<b>Dimethyl Fumarate (DMF)</b>", body_bold),
            Paragraph("100% DMF-Free (Not detected, limit &lt; 0.1 mg/kg)", body_normal),
            Paragraph("EU Decision 2009/251/EC", body_normal),
        ],
        [
            Paragraph("<b>Heavy Metals &amp; RoHS</b>", body_bold),
            Paragraph("Zero Lead, Cadmium, Mercury, Cr-VI (&lt; RoHS limits)", body_normal),
            Paragraph("RoHS 2011/65/EU &amp; 2015/863", body_normal),
        ],
        [
            Paragraph("<b>REACH SVHC Compliance</b>", body_bold),
            Paragraph("Contains zero Substances of Very High Concern (&gt; 0.1% w/w)", body_normal),
            Paragraph("EC 1907/2006 (ECHA SVHC list)", body_normal),
        ],
        [
            Paragraph("<b>Ecological Footprint</b>", body_bold),
            Paragraph("100% Natural biodegradable mineral + compostable FSC Kraft paper", body_normal),
            Paragraph("Sustainable Circular Packaging", body_normal),
        ],
    ]
    env_table = Table(env_data, colWidths=[130, 247, 150])
    env_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#004d8c")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 1.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.8),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(env_table)
    story.append(Spacer(1, 5))

    # 7. Authorization & Signatures with Stamp Drawing and Cursive Signatures
    stamp = create_stamp_drawing()
    sig1 = create_signature_drawing("Tariq")
    sig2 = create_signature_drawing("Kamran")

    col1_content = [
        Paragraph("<b>ISSUED BY &amp; ENDORSEMENT</b>", body_bold),
        Spacer(1, 1),
        Paragraph("DryGelWorld Technical Dept.<br/>"
                  "Kamran Enterprises, Karachi, PK<br/>"
                  "WhatsApp: +92 333 022 3337<br/>"
                  "Email: export@drygelworld.com<br/>"
                  "Website: drygelworld.com", body_normal)
    ]

    col2_content = [
        Paragraph("<b>OFFICIAL QA SEAL</b>", body_center),
        stamp
    ]

    col3_content = [
        Paragraph("<b>AUTHORIZED SIGNATORIES</b>", body_bold),
        sig1,
        Paragraph("<u>Engr. Tariq Kamran</u> — QA &amp; Compliance", body_normal),
        sig2,
        Paragraph("<u>Kamran Ahmed</u> — Managing Director", body_normal)
    ]

    sig_table = Table([[col1_content, col2_content, col3_content]], colWidths=[175, 132, 220])
    sig_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ffffff")),
        ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor("#0f4d2a")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (1,0), (1,0), 'CENTER'),
    ]))
    story.append(sig_table)
    story.append(Spacer(1, 4))

    # 8. Footnote note
    auth_note = Paragraph(
        "<b>Verification &amp; Commercial Endorsement:</b> This certificate confirms FSC Chain of Custody compliance "
        "of raw paper reels, pouches, and converting workflows for export supply. Specific production lot numbers, "
        "paper mill reel tracking barcodes, and third-party laboratory test reports (SGS / Intertek / BV) can be endorsed "
        "onto specific shipment packing lists upon commercial agreement. Authenticity verification: <b>export@drygelworld.com</b>.",
        body_center
    )
    story.append(auth_note)

    doc.build(story, onFirstPage=draw_page_decorations, onLaterPages=draw_page_decorations)
    print(f"Successfully generated FSC Certificate at: {filename}")

if __name__ == "__main__":
    build_pdf()
