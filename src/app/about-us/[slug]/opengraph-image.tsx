import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { aboutPages } from "@/data/legacy-pages";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Ali Public School, Peshawar";

const slugOf = (path: string) => path.split("/").filter(Boolean).pop()!;

export function generateStaticParams() {
  return aboutPages.map((page) => ({ slug: slugOf(page.path) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = aboutPages.find((p) => slugOf(p.path) === slug);
  return renderOgImage(page?.title ?? "About Us", "Ali Public School Peshawar");
}
