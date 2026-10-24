import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Welcome to Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("Welcome to Ali Public School", "Ali Public School Peshawar");
}
