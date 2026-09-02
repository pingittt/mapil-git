import { ImageResponse } from "next/og";

export const alt = "Crypto Legal Community — Law, Digital Economy & Crypto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080b10",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 14,
              border: "1.5px solid #a88b5a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e8e5de",
              fontSize: 26,
            }}
          >
            §
          </div>
          <span
            style={{
              fontSize: 20,
              color: "#89919d",
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Crypto Legal Community
          </span>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 68, color: "#e8e5de", fontWeight: 600, letterSpacing: -1.5 }}>
              Law. Digital Economy.
            </span>
            <span style={{ fontSize: 68, color: "#e8e5de", fontWeight: 600, letterSpacing: -1.5 }}>
              Crypto.
            </span>
          </div>
          <span style={{ fontSize: 24, color: "#89919d", maxWidth: 760 }}>
            An educational community exploring law, cryptocurrency, and the
            digital economy in Indonesia.
          </span>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ width: 120, height: 1, backgroundColor: "#a88b5a" }} />
          <span
            style={{
              fontSize: 16,
              color: "#89919d",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Legal × Digital × Community
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
