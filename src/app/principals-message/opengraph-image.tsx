import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A message from the Principal of Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Principal's Message", "Ali Public School Peshawar");
}
