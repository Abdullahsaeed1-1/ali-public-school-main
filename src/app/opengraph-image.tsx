import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Ali Public School", "Quality in Everything · Est. 2012");
}
