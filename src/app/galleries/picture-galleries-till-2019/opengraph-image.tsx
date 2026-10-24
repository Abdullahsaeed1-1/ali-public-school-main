import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Gallery — Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Picture Galleries", "Ali Public School Peshawar");
}
