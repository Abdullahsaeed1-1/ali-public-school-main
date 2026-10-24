import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Get In Touch", "Ali Public School Peshawar");
}
