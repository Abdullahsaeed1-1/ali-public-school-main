import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Academics at Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Academics", "Ali Public School Peshawar");
}
