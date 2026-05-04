import { ImageResponse } from "next/og";

export const alt = "SilacaGEL industrial silica gel desiccant export supply";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background:
            "linear-gradient(135deg, #f8fbff 0%, #ffffff 44%, #dbeafe 100%)",
          color: "#0e1620",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: -130,
            width: 650,
            height: 420,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(0,103,197,0.28) 0%, rgba(0,103,197,0.08) 42%, rgba(0,103,197,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 92,
            top: 88,
            display: "flex",
            gap: 18,
            alignItems: "center",
          }}
        >
          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              style={{
                width: 54 - item * 5,
                height: 54 - item * 5,
                borderRadius: 999,
                background: "rgba(255,255,255,0.86)",
                border: "2px solid rgba(0,103,197,0.22)",
                boxShadow: "0 22px 42px rgba(0, 103, 197, 0.16)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(0,103,197,0.16)",
            borderRadius: 24,
            padding: 44,
            background: "rgba(255,255,255,0.78)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 74,
                height: 74,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background: "#0e1620",
                color: "#ffffff",
                fontSize: 30,
                fontWeight: 900,
              }}
            >
              SG
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ display: "flex", fontSize: 48, fontWeight: 900, letterSpacing: -3 }}>
                Silaca<span style={{ color: "#d80d2a" }}>GEL</span>
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#00539f",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                Industrial Desiccant Exporter
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                padding: "12px 16px",
                borderRadius: 8,
                background: "#d80d2a",
                color: "#ffffff",
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              Global Industrial Moisture Protection
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 60,
                fontWeight: 900,
                letterSpacing: -3.5,
                lineHeight: 0.96,
              }}
            >
              Export-ready silica gel packets, bulk packs, and cargo strips.
            </div>
            <div style={{ display: "flex", color: "#475569", fontSize: 26, lineHeight: 1.35 }}>
              Factory-direct desiccant supply with private-label support, SDS/COA
              documents, and worldwide delivery planning.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {["SDS / COA", "Bulk MOQ", "Private Label", "Worldwide Export"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  borderRadius: 999,
                  background: "#eff6ff",
                  color: "#064a91",
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
