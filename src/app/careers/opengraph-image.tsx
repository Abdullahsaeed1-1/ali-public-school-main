import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Careers at Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Careers", "Ali Public School Peshawar");
}
