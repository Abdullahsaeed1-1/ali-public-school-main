import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "School policies of Ali Public School, Peshawar";

export default async function Image() {
  return renderOgImage("School Policies", "Ali Public School Peshawar");
}
