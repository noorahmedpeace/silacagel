#!/usr/bin/env python3
"""
Builds public/documents/packaging-materials-declaration.pdf.

WHY THIS DOCUMENT EXISTS, AND WHAT IT DELIBERATELY IS NOT

An earlier attempt at this produced an "FSC Chain of Custody Certificate"
carrying the FSC trademark, a self-assigned number (DGW-FSC-COC-2026-DC91),
an issue date, a validity window and the words "Surveillance Audited". FSC
CoC certificates are issued only by FSC-accredited certification bodies and
every real one resolves at info.fsc.org. That one would not, and a buyer who
checked it would then have had cause to doubt the ISO certificate, the SDS
and the COA sitting beside it - the documents that are real.

So this is a SUPPLIER DECLARATION: a statement the manufacturer signs in its
own name. Procurement accepts these routinely. It claims no third-party
issuance, and it says it is self-declared at the top of page one.

EVERY FACTUAL LINE TRACES TO A DOCUMENT ON FILE:

  ISO block      ISO 9001:2015 certificate scan - QMEC Group Intl, cert
                 9101225, IAS-CB accreditation 17240831, approved
                 10-12-2025, expires 09-12-2028. The scope string is quoted
                 verbatim: it reads "Packaging and Supply of Silica
                 Desiccant", so it is NOT stretched to cover the clay line.

  DMF row        SGS-CSTC Qingdao report TAOEC26007318501, 29 Jun 2026. One
                 analyte on one material: dimethyl fumarate in WHITE SILICA
                 GEL, ND at MDL 0.1 mg/kg, Pass against REACH Annex XVII
                 Entry 61. Issued to the material supplier, not to this
                 company, and the document says so rather than implying we
                 commissioned it.

  Clay COA row   Shenulon Chemicals COA, 21 Jan 2026, Activated Clay 2-4 mm,
                 Lot 034-4. Reported lot-specific on the owner's explicit
                 instruction: a "typical values" framing becomes a
                 contradiction the first time a consignment tests otherwise.

  Packaging      The three substrates the owner confirmed are supplied,
                 listed as formats available with no certification attached.

  "Not held"     The certifications this company does not have. That section
                 is the reason the rest of the document is worth anything.

Regenerate:  python scripts/generate-packaging-declaration.py
"""

from datetime import date

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

OUT = "public/documents/packaging-materials-declaration.pdf"

INK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#52606d")
NAVY = colors.HexColor("#0b3d6b")
RULE = colors.HexColor("#c8d1dc")
BAND = colors.HexColor("#eef2f7")
WARN = colors.HexColor("#8a4b12")

ISSUED = date(2026, 8, 29)
ISSUED_TEXT = ISSUED.strftime("%d %B %Y")

S = {
    "brand": ParagraphStyle("brand", fontName="Helvetica-Bold", fontSize=17, leading=19,
                            textColor=INK, alignment=TA_CENTER, spaceAfter=1),
    "brandsub": ParagraphStyle("brandsub", fontName="Helvetica", fontSize=7.6, leading=10,
                               textColor=MUTED, alignment=TA_CENTER),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=15.5, leading=19,
                         textColor=NAVY, alignment=TA_CENTER, spaceAfter=2),
    "sub": ParagraphStyle("sub", fontName="Helvetica", fontSize=8.6, leading=11.5,
                          textColor=WARN, alignment=TA_CENTER),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=9.4, leading=12,
                         textColor=NAVY, spaceBefore=9, spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8.4, leading=11.6,
                           textColor=INK, alignment=TA_LEFT),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=7.4, leading=10,
                            textColor=MUTED),
    "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=7.8, leading=10.2,
                           textColor=INK),
    "cellb": ParagraphStyle("cellb", fontName="Helvetica-Bold", fontSize=7.8, leading=10.2,
                            textColor=INK),
    "cellh": ParagraphStyle("cellh", fontName="Helvetica-Bold", fontSize=7.4, leading=9.6,
                            textColor=colors.white),
}


def P(text, style="body"):
    return Paragraph(text, S[style])


def table(rows, widths, header=True, zebra=True):
    t = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]
    if header:
        cmds.append(("BACKGROUND", (0, 0), (-1, 0), NAVY))
    if zebra:
        start = 1 if header else 0
        for i in range(start, len(rows)):
            if (i - start) % 2 == 1:
                cmds.append(("BACKGROUND", (0, i), (-1, i), BAND))
    t.setStyle(TableStyle(cmds))
    return t


def footer(canvas, _doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(17 * mm, 12 * mm, A4[0] - 17 * mm, 12 * mm)
    canvas.setFont("Helvetica", 6.6)
    canvas.setFillColor(MUTED)
    canvas.drawString(17 * mm, 8 * mm,
                      "DryGelWorld (Kamran Enterprises) - supplier declaration, self-issued. "
                      "Not a third-party certification.")
    canvas.drawRightString(A4[0] - 17 * mm, 8 * mm, "Page %d" % canvas.getPageNumber())
    canvas.restoreState()


def build():
    doc = BaseDocTemplate(
        OUT, pagesize=A4,
        leftMargin=17 * mm, rightMargin=17 * mm,
        topMargin=14 * mm, bottomMargin=16 * mm,
        title="Packaging & Materials Declaration - DryGelWorld",
        author="DryGelWorld (Kamran Enterprises)",
        subject="Supplier declaration: packaging substrates, desiccant materials, "
                "test evidence held, and certifications not held",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="body")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])

    F = []

    F.append(P("DRYGELWORLD", "brand"))
    F.append(P("KAMRAN ENTERPRISES &middot; DESICCANT MANUFACTURER &amp; EXPORTER "
               "&middot; KARACHI, PAKISTAN &middot; SINCE 1983", "brandsub"))
    F.append(Spacer(1, 9))
    F.append(P("PACKAGING &amp; MATERIALS DECLARATION", "h1"))
    F.append(P("Supplier declaration, issued and signed by the manufacturer. This is not a "
               "third-party certificate and is not issued by any certification body.", "sub"))
    F.append(Spacer(1, 9))

    F.append(table([
        [P("Issued by", "cellb"),
         P("DryGelWorld (Kamran Enterprises)", "cell"),
         P("Date of issue", "cellb"),
         P(ISSUED_TEXT, "cell")],
        [P("Head office", "cellb"),
         P("A-488, Block 1, Gulshan-e-Iqbal, Karachi, Sindh 74000, Pakistan", "cell"),
         P("Reference", "cellb"),
         P("DGW-PMD-2026-01", "cell")],
        [P("Manufacturing", "cellb"),
         P("Plot 59, ST 13/1, Sector 6B, North Karachi Industrial Area, Karachi", "cell"),
         P("Contact", "cellb"),
         P("sales@drygelworld.com<br/>+92 333 022 3337", "cell")],
    ], [26 * mm, 67 * mm, 21 * mm, 62 * mm], header=False, zebra=False))

    F.append(P("1. QUALITY MANAGEMENT SYSTEM", "h2"))
    F.append(P("The certificate below is held by this company and can be verified independently "
               "with the registrar. Its scope is quoted exactly as issued.", "body"))
    F.append(Spacer(1, 4))
    F.append(table([
        [P("Field", "cellh"), P("As stated on the certificate", "cellh")],
        [P("Standard", "cellb"), P("BS EN ISO 9001:2015", "cell")],
        [P("Certificate no.", "cellb"), P("9101225", "cell")],
        [P("Scope (verbatim)", "cellb"),
         P("&ldquo;Packaging and Supply of Silica Desiccant&rdquo; &mdash; NACE 8292", "cell")],
        [P("Certified entity", "cellb"),
         P("Kamran Enterprises, Plot 59, ST 13/1, Sector 6B, North Karachi Industrial Area, "
           "Karachi, Pakistan", "cell")],
        [P("Registrar", "cellb"),
         P("QMEC Group Intl, United Kingdom &mdash; accredited by IAS-CB, accreditation "
           "no. 17240831", "cell")],
        [P("Approved / expires", "cellb"),
         P("10 December 2025 &mdash; 09 December 2028, subject to surveillance audit", "cell")],
        [P("Verify at", "cellb"), P("www.qmecgroup.org", "cell")],
    ], [32 * mm, 144 * mm]))
    F.append(Spacer(1, 3))
    F.append(P("Note on scope: the registered scope names silica desiccant. It is reproduced here "
               "as issued and is not represented as covering the clay desiccant line.", "small"))

    F.append(P("2. PACKAGING FORMATS SUPPLIED", "h2"))
    F.append(P("Sachet substrate is selected per order and confirmed in writing on the proforma "
               "invoice before production. The following formats are supplied:", "body"))
    F.append(Spacer(1, 4))
    F.append(table([
        [P("Format", "cellh"), P("Description", "cellh"), P("Typical use", "cellh")],
        [P("Breathable kraft paper", "cellb"),
         P("Porous unbleached kraft paper sachet, heat-sealed", "cell"),
         P("General export cartons, apparel, footwear, hardware", "cell")],
        [P("Non-woven fabric", "cellb"),
         P("Spunbond non-woven sachet, heat-sealed", "cell"),
         P("Dust-sensitive goods, higher abrasion resistance", "cell")],
        [P("Tyvek / PE film", "cellb"),
         P("Spunbond polyethylene or laminated film sachet", "cell"),
         P("Electronics, optical and moisture-critical packing", "cell")],
        [P("Outer packing", "cellb"),
         P("Corrugated export cartons; master polybag on request", "cell"),
         P("All formats", "cell")],
    ], [34 * mm, 72 * mm, 70 * mm]))
    F.append(Spacer(1, 3))
    F.append(P("No forestry, chain-of-custody, recycled-content or environmental certification is "
               "claimed for any of these substrates. Where a buyer&rsquo;s programme requires one, "
               "it must be agreed before order confirmation.", "small"))

    F.append(P("3. DESICCANT MATERIALS", "h2"))
    F.append(table([
        [P("Material", "cellh"), P("Chemical identity", "cellh"), P("CAS no.", "cellh")],
        [P("Silica gel", "cellb"),
         P("Amorphous silicon dioxide (synthetic)", "cell"), P("7631-86-9", "cell")],
        [P("Clay desiccant", "cellb"),
         P("Activated bentonite / montmorillonite clay (natural mineral)", "cell"),
         P("1302-78-9", "cell")],
    ], [34 * mm, 108 * mm, 34 * mm]))

    F.append(P("4. TEST EVIDENCE ON FILE", "h2"))
    F.append(P("Copies of the reports below are released on request. Each covers the specific "
               "material, lot and analyte named &mdash; nothing beyond it.", "body"))
    F.append(Spacer(1, 4))
    F.append(table([
        [P("Document", "cellh"), P("Issued by / date", "cellh"),
         P("Scope tested", "cellh"), P("Result", "cellh")],
        [P("Test report<br/>TAOEC26007318501", "cellb"),
         P("SGS-CSTC Standards Technical Services (Qingdao) Co. Ltd<br/>29 June 2026", "cell"),
         P("Dimethyl fumarate (DMF) against REACH Annex XVII Entry 61 / EU 412/2012. "
           "Sample: white silica gel. Method: GC-MS.", "cell"),
         P("Not detected<br/>(MDL 0.1 mg/kg)<br/><b>Pass</b>", "cell")],
        [P("Certificate of Analysis<br/>Lot 034-4", "cellb"),
         P("Shenulon Chemicals Imp. &amp; Exp. Co. Ltd, Qingdao<br/>21 January 2026", "cell"),
         P("Activated clay 2&ndash;4 mm: adsorption at 90% RH / 25&deg;C, bulk density, "
           "loss on heating, pH, qualified size ratio.", "cell"),
         P("Adsorption 41.1<br/>(spec &ge; 26.0)<br/>Density 1.16 g/ml<br/>"
           "LOI 0.96 &middot; pH 7.5<br/>Size ratio 95.4%", "cell")],
    ], [30 * mm, 44 * mm, 66 * mm, 36 * mm]))
    F.append(Spacer(1, 3))
    F.append(P("Both reports originate in the material supply chain and were issued to the "
               "respective material suppliers, not to DryGelWorld. They are held on file as "
               "incoming-material evidence. The clay figures are those of one named lot and are "
               "not a guaranteed specification; a certificate of analysis for the buyer&rsquo;s "
               "own consignment is issued with shipment.", "small"))

    F.append(KeepTogether([
        P("5. CERTIFICATIONS NOT HELD", "h2"),
        P("Stated plainly so that a buyer&rsquo;s compliance review is not built on an assumption. "
          "None of the following is held by this company, and none is claimed:", "body"),
        Spacer(1, 4),
        table([
            [P("Not held", "cellh"), P("What a buyer who requires it should do", "cellh")],
            [P("FSC or PEFC chain of custody", "cellb"),
             P("Raise before order confirmation; substrate sourcing would have to be arranged "
               "specifically", "cell")],
            [P("FDA food-contact (FCN / GRAS), FSSC 22000, EU 1935/2004", "cellb"),
             P("Do not assume food-contact coverage for any format", "cell")],
            [P("Pharmaceutical GMP / FDA Drug Master File", "cellb"),
             P("A DMF-free statement is held; that is a different thing from a Drug Master "
               "File", "cell")],
            [P("REACH registration", "cellb"),
             P("DryGelWorld is not an EU registrant. The test in section 4 is a single-analyte "
               "restriction test, not a registration", "cell")],
            [P("RoHS / heavy-metal test report", "cellb"),
             P("No heavy-metal testing is held on file", "cell")],
            [P("Halal (PNAC / PHA)", "cellb"),
             P("Required by some GCC programmes; confirm before commercial terms", "cell")],
        ], [58 * mm, 118 * mm]),
    ]))

    F.append(KeepTogether([
        P("6. DECLARATION", "h2"),
        P("I declare that the statements in this document are accurate to the best of my knowledge "
          "on the date of issue, that the certificate and test reports referenced are held on file "
          "and are released to buyers on request, and that no certification beyond those named in "
          "section 1 is held or implied.", "body"),
        Spacer(1, 18),
        table([
            [P("_______________________________", "cell"),
             P("_______________________________", "cell")],
            [P("<b>Noor Ahmed Khan</b><br/>Owner &amp; Managing Director<br/>"
               "DryGelWorld (Kamran Enterprises)", "cell"),
             P("<b>Date</b><br/>" + ISSUED_TEXT + "<br/>Karachi, Pakistan", "cell")],
        ], [88 * mm, 88 * mm], header=False, zebra=False),
    ]))

    doc.build(F)
    print("  wrote " + OUT)


if __name__ == "__main__":
    build()
