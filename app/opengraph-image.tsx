import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG/Twitter image. Statically optimized at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px circle at 20% 10%, #1e1b3a 0%, #09090b 55%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#22d3ee",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg, #a855f7, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 500,
            marginTop: 20,
            color: "#d4d4d8",
          }}
        >
          {siteConfig.jobTitle} · Full Stack & AI Systems
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 48,
            color: "#71717a",
          }}
        >
          Node.js · TypeScript · React · Next.js · Agentic AI
        </div>
      </div>
    ),
    { ...size }
  );
}
