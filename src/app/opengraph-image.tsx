import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Juliusggr — Desarrollo web y aplicaciones de escritorio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const badges = ["Web", "Desktop", "UI/UX"] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#fafafa",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -40,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(96,165,250,0.28)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: 40,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "rgba(244,114,182,0.22)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a1a1aa",
          }}
        >
          {site.brand}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 650,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Juliusggr
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#d4d4d8",
            }}
          >
            {site.headline}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {badges.map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 18,
                letterSpacing: 1,
                color: "#e4e4e7",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
