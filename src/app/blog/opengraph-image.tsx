import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "News and events from Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("News & Events", "Ali Public School Peshawar");
}
