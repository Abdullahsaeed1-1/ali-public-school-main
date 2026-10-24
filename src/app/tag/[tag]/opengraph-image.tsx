import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { legacyTags } from "@/data/news";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "News from Ali Public School, Peshawar";

export function generateStaticParams() {
  return legacyTags.map((tag) => ({ tag: tag.slug }));
}

export default async function Image() {
  return renderOgImage("News & Events", "Ali Public School Peshawar");
}
