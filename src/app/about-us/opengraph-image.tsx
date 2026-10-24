import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("About Us", "Ali Public School Peshawar");
}
