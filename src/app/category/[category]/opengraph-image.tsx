import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { legacyCategories } from "@/data/news";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "News and events from Ali Public School, Peshawar";

export function generateStaticParams() {
  return legacyCategories.map((category) => ({ category: category.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = legacyCategories.find((c) => c.slug === category)?.name ?? "News";
  return renderOgImage(name, "Ali Public School Peshawar");
}
