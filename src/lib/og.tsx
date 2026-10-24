import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let cachedCrest: string | null = null;

function crestDataUri() {
  if (!cachedCrest) {
    const buffer = readFileSync(join(process.cwd(), "public/logo/crest.jpeg"));
    cachedCrest = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }
  return cachedCrest;
}

export function renderOgImage(title: string, subtitle: string) {
  const crest = crestDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0C2154 0%, #143782 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={crest}
          alt=""
          width={168}
          height={168}
          style={{ borderRadius: "50%" }}
        />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            fontSize: 58,
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            fontSize: 30,
            color: "#B4DC78",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    ogSize
  );
}
