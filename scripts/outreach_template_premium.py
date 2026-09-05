#!/usr/bin/env python3
"""
The designed letter for Pakistani buyers outside Karachi (September 2026).

The earlier campaign sent a plain-text note with a signature block under it.
This one is a laid-out letter: a bordered card, a fact strip carrying the four
documents that actually travel with a shipment, and two ways to answer that are
one tap apart. It exists because the domestic buyer is a different reader from
the export buyer - he wants PKR, road delivery and WhatsApp, not Incoterms.

WHAT THE COPY MAY AND MAY NOT SAY

Claimable: ISO 9001:2015 certificate 9101225, and the DMF-free statement.
Not claimable anywhere, in any wording: REACH registration or compliance, FDA,
food-grade or food-contact, FSC, CE or EN 455 for gloves, USP, GMP, Halal.
Blue indicating gel contains cobalt(II) chloride and is never called cobalt-free.
Gloves and hair nets are a bought-in line, not made in the factory.

No MOQ, lead-time, dispatch-time or price figure appears here. The site still
publishes several different answers to each of those, and until the owner
settles on one, a number in a cold letter is a promise nobody can keep. The
letter asks for the format and quantity instead, which is what a quotation needs
anyway.

Every letter is personal to its row: the city, what that company ships, and the
damage that specific cargo takes. Two recipients never receive the same text.
"""

import html as _html
import re

SITE = "https://www.drygelworld.com"
PHONE_DISPLAY = "+92 333 022 3337"
WHATSAPP = "923330223337"
LOGO = SITE + "/images/dgw-email-signature-20260713.png"
SENDER_NAME = "Noor Ahmed Khan"
REPLY_TO = "export@drygelworld.com"

INK = "#0f172a"
MUTED = "#5b6472"
LINE = "#e3e8ee"
NAVY = "#0b3d6b"
ACCENT = "#e5502a"
WASH = "#f4f6fb"

# What each kind of cargo actually suffers, and the format that answers it.
# (keywords, one-line damage, format sentence, subject)
CARGO = [
    (("surgical", "dental", "instrument", "cutlery", "steel", "hardware"),
     "Ground and polished steel is the least forgiving cargo there is: a film of "
     "condensation inside a sealed case becomes a rust spot, and a rust spot on a "
     "finished instrument is a rejected consignment.",
     "Sachets sized to the instrument case and the master carton, dust-free so "
     "nothing settles on a polished surface.",
     "Rust on polished steel between {city} and the buyer"),
    (("textile", "garment", "apparel", "fabric", "home textile", "towel", "knitwear", "denim"),
     "Fabric damage is rarely dramatic. It is a musty smell when the carton is "
     "opened in Europe, a faint tide line on a white shirt, a batch accepted at a "
     "discount.",
     "Printed sachets sized per carton, and hanging strips for the container "
     "itself on the longer lanes.",
     "Musty cartons at the other end of the voyage"),
    (("leather", "footwear", "shoe", "glove", "tannery", "hide"),
     "Leather carries its own moisture. Seal it in a carton, put the carton in a "
     "container, cross the equator, and mould blooms on the surface before the "
     "shipment clears customs.",
     "One sachet per box and a larger pack per master carton - the cheapest "
     "insurance in the whole shipment.",
     "Mould on leather before the container is even opened"),
    (("rice", "grain", "basmati", "wheat", "pulses", "maize"),
     "Rice leaves the mill at around 12 to 13 percent moisture and gives it back "
     "to the container air over a 30-day passage. At night it condenses on the "
     "roof and rains onto the top bags.",
     "Hanging container strips for the box, sachets in the outer packing - the "
     "desiccant catches what leaves the bags before it can come back down.",
     "Container rain on rice, and what it costs when it lands"),
    (("mango", "citrus", "fruit", "date", "dry fruit", "vegetable"),
     "Fresh and dried produce breathes in the box. On a long lane that moisture "
     "ends up on the carton walls, and a softened carton is a collapsed pallet.",
     "Desiccant sized to the carton and the pallet load, kept out of contact with "
     "the produce itself.",
     "Softened cartons and condensation on a fruit lane"),
    (("spice", "food", "snack", "confection", "tea", "flour", "sauce"),
     "Ground product cakes. Whole spice loses its oils. Both start with humidity "
     "finding its way into the pack somewhere between the plant and the shelf.",
     "Sachets for the outer packaging and the master carton. Our gel is industrial "
     "grade and stays out of contact with the product itself.",
     "Caking and clumping between the plant and the shelf"),
    (("pharma", "medicine", "drug", "nutraceutical", "supplement", "capsule"),
     "Tablets and capsules pick up humidity through the shipper on a long road or "
     "sea leg, and the loss shows up as a stability result nobody can explain.",
     "Desiccant for the shipper and the outer carton, with the SDS, COA and ISO "
     "certificate your QA will ask for before the first delivery.",
     "Humidity in the shipper, before the pack is even opened"),
    (("electronic", "appliance", "fan", "motor", "pcb", "cable", "battery"),
     "Steel parts and boards take up moisture slowly through the packaging, and "
     "the damage appears as corrosion on a contact or a bearing long after "
     "dispatch.",
     "Dust-free sachets sized to the bag or carton volume, with humidity "
     "indicator cards so your line can see whether the protection held.",
     "Corrosion on parts that were dry when they left"),
    (("ceramic", "sanitary", "tile", "marble", "granite", "stone", "furniture", "handicraft"),
     "Stone and ceramic arrive stained rather than broken: trapped moisture in the "
     "crate leaves marks on a polished face that no one can wash out.",
     "Desiccant packs sized to the crate, placed away from the faces that show.",
     "Staining in the crate, not breakage"),
    (("sport", "ball", "musical", "toy"),
     "Stitched and laminated goods take moisture into the seams on a sea leg, and "
     "it shows as delamination or mildew on arrival.",
     "Sachets per inner box and a larger pack per carton.",
     "Mildew in the seams after a long sea leg"),
]

DEFAULT = (
    "Almost every complaint that reaches us starts the same way: the cargo was dry "
    "when it was loaded, nobody opened the doors, and it arrived damp anyway.",
    "Sachets inside the cartons, hanging strips inside the container. Two layers, "
    "two different jobs.",
    "The cargo was dry when it was loaded",
)


def _cargo_for(text):
    low = (text or "").lower()
    for keys, damage, fmt, subj in CARGO:
        if any(k in low for k in keys):
            return damage, fmt, subj
    return DEFAULT


def _first_clause(value):
    v = re.sub(r"\s*\([^)]*\)", "", (value or "")).strip()
    return v.split(";")[0].split(" - ")[0].strip().rstrip(".")


def _describe(sector):
    """The opening line has to read as a sentence for every row in the sheet.
    The sector column holds both singular trades ("Surgical instrument
    manufacturer") and plural ones ("Rice exporters"), so an unconditional
    "a %s" produced "a rice exporters". Plurals take "in", singulars an
    article."""
    s = (sector or "").strip()
    if not s:
        return ""
    low = s[0].lower() + s[1:]
    head = low.split()[-1]
    plural = head.endswith("s") and not head.endswith(("ss", "us", "is"))
    if plural:
        return ", working in %s" % low
    article = "an" if low[0] in "aeiou" else "a"
    return ", %s %s" % (article, low)


def subject_for(row):
    """A subject may carry {city}; the steel line named Sialkot for every
    recipient, including the cutlery works in Wazirabad and the spring plant in
    Lahore. The buyer's own city goes in, or the phrase drops out."""
    sector = row.get("Sector / Why they buy") or ""
    _, _, subj = _cargo_for(sector + " " + (row.get("Company") or ""))
    if "{city}" in subj:
        city = _city(row)
        subj = subj.format(city=city) if city else subj.replace(" between {city} and the buyer", " on the way to the buyer")
    return subj


def _city(row):
    return ((row.get("City/Country") or "").split(",")[0] or "").strip()


def text_body(row):
    company = (row.get("Company") or "").strip()
    city = _city(row)
    sector = _first_clause(row.get("Sector / Why they buy"))
    damage, fmt, _ = _cargo_for((row.get("Sector / Why they buy") or "") + " " + company)
    where = (" in " + city) if city else ""
    what = _describe(sector)

    return "\n".join([
        "Dear Sir or Madam,",
        "",
        "I looked up %s%s%s." % (company, where, what),
        "",
        damage,
        "",
        fmt,
        "",
        "We make silica gel and clay desiccant sachets, strips and bulk packs at our "
        "own plant in Karachi, using bead from named mills that comes with its "
        "certificate of analysis. Deliveries go by road to %s, quoted in rupees, and "
        "the paperwork your buyer asks for travels with the goods: safety data sheet, "
        "certificate of analysis, our ISO 9001:2015 certificate (no. 9101225) and a "
        "DMF-free statement." % (city or "your city"),
        "",
        "If it is useful, I will send free evaluation samples in the formats that fit "
        "your packing, so your team can test them on one consignment before anything "
        "is committed. Tell me the format and the quantity you would run and I will "
        "come back with a written quotation.",
        "",
        "WhatsApp is usually faster than email: %s" % PHONE_DISPLAY,
        "",
        "Thank you for your time.",
    ])


def _esc(s):
    return _html.escape(s or "", quote=False)


def html_body(row):
    company = (row.get("Company") or "").strip()
    city = _city(row)
    sector = _first_clause(row.get("Sector / Why they buy"))
    damage, fmt, _ = _cargo_for((row.get("Sector / Why they buy") or "") + " " + company)
    where = (" in " + city) if city else ""
    what = _describe(sector)
    wa_text = ("Hello, this is %s. We received your note about desiccant for our packing."
               % company).replace(" ", "%20")

    facts = [
        ("ISO 9001:2015", "Certificate 9101225, verifiable with the registrar"),
        ("SDS &amp; COA", "With every consignment, no request needed"),
        ("DMF-free statement", "Issued for silica gel"),
        ("Free samples", "Tested on one consignment before you commit"),
    ]
    fact_rows = "".join(
        '<tr>'
        '<td style="padding:7px 12px 7px 0;vertical-align:top;white-space:nowrap;">'
        '<span style="display:inline-block;width:6px;height:6px;border-radius:6px;'
        'background:%s;vertical-align:middle;margin-right:9px;"></span>'
        '<span style="font-size:13px;font-weight:bold;color:%s;">%s</span></td>'
        '<td style="padding:7px 0;font-size:12.5px;color:%s;vertical-align:top;">%s</td>'
        '</tr>' % (ACCENT, INK, k, MUTED, v)
        for k, v in facts
    )

    return """\
<div style="background:%(wash)s;margin:0;padding:22px 12px;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="border-collapse:collapse;">
<tr><td align="center">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;max-width:600px;background:#ffffff;border:1px solid %(line)s;border-radius:12px;overflow:hidden;">

  <tr><td style="height:4px;background:%(accent)s;line-height:4px;font-size:0;">&nbsp;</td></tr>

  <tr><td style="padding:22px 28px 16px;border-bottom:1px solid %(line)s;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="border-collapse:collapse;">
      <tr>
        <td style="vertical-align:middle;">
          <div style="font-size:17px;font-weight:bold;color:%(navy)s;letter-spacing:-0.2px;">DryGelWorld</div>
          <div style="font-size:11px;color:%(muted)s;padding-top:3px;">Kamran Enterprises &middot; Silica gel &amp; clay desiccant &middot; Karachi</div>
        </td>
        <td align="right" style="vertical-align:middle;width:56px;">
          <img src="%(logo)s" alt="DryGelWorld" width="46" height="46" style="display:block;border:0;width:46px;height:46px;">
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:26px 28px 6px;font-size:14px;line-height:1.62;color:%(ink)s;">
    <p style="margin:0 0 16px;">Dear Sir or Madam,</p>
    <p style="margin:0 0 16px;">I looked up <strong>%(company)s</strong>%(where)s%(what)s.</p>
    <p style="margin:0 0 16px;">%(damage)s</p>
    <p style="margin:0 0 16px;">%(fmt)s</p>
    <p style="margin:0 0 18px;">We make the sachets, strips and bulk packs at our own plant in Karachi, from bead supplied by named mills with its certificate of analysis. Deliveries run by road to %(city)s and are quoted in rupees.</p>
  </td></tr>

  <tr><td style="padding:0 28px 20px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="border-collapse:collapse;background:%(wash)s;border:1px solid %(line)s;border-radius:9px;">
      <tr><td style="padding:14px 18px 6px;">
        <div style="font-size:10.5px;font-weight:bold;letter-spacing:0.09em;text-transform:uppercase;color:%(muted)s;padding-bottom:4px;">What travels with the goods</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="border-collapse:collapse;">%(facts)s</table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 28px 22px;font-size:14px;line-height:1.62;color:%(ink)s;">
    <p style="margin:0 0 18px;">If it helps, I will send free evaluation samples in the formats that suit your packing, so your team can test them on one consignment before anything is committed. Tell me the format and the quantity you would run, and a written quotation follows.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td style="border-radius:7px;background:%(accent)s;">
          <a href="https://wa.me/%(wa)s?text=%(watext)s" style="display:inline-block;padding:11px 20px;font-size:13.5px;font-weight:bold;color:#ffffff;text-decoration:none;">WhatsApp %(phone)s</a>
        </td>
        <td style="width:10px;">&nbsp;</td>
        <td style="border-radius:7px;border:1px solid %(line)s;">
          <a href="%(site)s/documentation" style="display:inline-block;padding:10px 18px;font-size:13.5px;font-weight:bold;color:%(navy)s;text-decoration:none;">See the documents</a>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 28px 24px;">
    <div style="border-top:1px solid %(line)s;padding-top:16px;">
      <div style="font-size:14px;font-weight:bold;color:%(ink)s;">%(sender)s</div>
      <div style="font-size:12px;color:%(navy)s;padding:2px 0 6px;">Owner &amp; Managing Director</div>
      <div style="font-size:11.5px;color:%(muted)s;line-height:1.6;">
        Kamran Enterprises, trading as DryGelWorld<br>
        Plot 59, Street 13/1, Sector 6-B, North Karachi Industrial Area, Karachi<br>
        <a href="mailto:%(reply)s" style="color:%(navy)s;text-decoration:none;">%(reply)s</a>
        &nbsp;&middot;&nbsp;
        <a href="%(site)s" style="color:%(navy)s;text-decoration:none;">www.drygelworld.com</a>
        &nbsp;&middot;&nbsp;%(phone)s
      </div>
    </div>
  </td></tr>

  <tr><td style="padding:12px 28px 18px;background:%(wash)s;border-top:1px solid %(line)s;">
    <div style="font-size:10.5px;color:#9aa3af;line-height:1.55;">
      Sent once to your published business address because your cargo is the kind that moisture damages.
      If you would rather not hear from me again, reply with &ldquo;no&rdquo; and I will not write a second time.
    </div>
  </td></tr>

</table>
</td></tr></table>
</div>""" % {
        "wash": WASH, "line": LINE, "accent": ACCENT, "navy": NAVY, "ink": INK,
        "muted": MUTED, "logo": LOGO, "site": SITE, "sender": SENDER_NAME,
        "reply": REPLY_TO, "phone": PHONE_DISPLAY, "wa": WHATSAPP, "watext": wa_text,
        "company": _esc(company), "where": _esc(where), "what": _esc(what),
        "damage": _esc(damage), "fmt": _esc(fmt), "city": _esc(city or "your city"),
        "facts": fact_rows,
    }
