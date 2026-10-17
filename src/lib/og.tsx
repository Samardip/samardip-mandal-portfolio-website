import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type Props = { eyebrow: string; title: string; footer: string };

export async function renderOgImage({ eyebrow, title, footer }: Props) {
  const serif = await readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f3ee",
          color: "#17160f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              background: "#17160f",
              color: "#f5f3ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontFamily: "monospace",
            }}
          >
            SM
          </div>
          <div style={{ fontSize: 24, fontFamily: "monospace", letterSpacing: 2, color: "#66625a" }}>
            {eyebrow.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 84, lineHeight: 1.04, maxWidth: 1040 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #17160f",
            paddingTop: 24,
            fontSize: 26,
            fontFamily: "sans-serif",
          }}
        >
          <span>{footer}</span>
          <span style={{ width: 18, height: 18, borderRadius: 9, background: "#c43d16" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    },
  );
}
