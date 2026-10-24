import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Results & Achievements — Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Results & Achievements", "Ali Public School Peshawar");
}
