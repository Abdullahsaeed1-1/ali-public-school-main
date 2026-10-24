import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { academicsPages } from "@/data/legacy-pages";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "School policies — Ali Public School, Peshawar";

const slugOf = (path: string) => path.split("/").filter(Boolean).pop()!;

export function generateStaticParams() {
  return academicsPages.map((page) => ({ slug: slugOf(page.path) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = academicsPages.find((p) => slugOf(p.path) === slug);
  const title = page?.title ?? "School Policies";
  return renderOgImage(title.length > 60 ? `${title.slice(0, 57)}…` : title, "Ali Public School Peshawar");
}
