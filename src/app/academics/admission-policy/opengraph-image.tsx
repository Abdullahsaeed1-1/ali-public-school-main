import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Admissions at Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Admissions", "Ali Public School Peshawar");
}
