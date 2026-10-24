import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Campuses of Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Our Sections", "Ali Public School Peshawar");
}
