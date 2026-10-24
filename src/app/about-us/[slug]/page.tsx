import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { ABOUT, aboutPages, trailFor } from "@/data/legacy-pages";
import { buildMetadata } from "@/lib/metadata";

/**
 * The six About Us sub-pages, each at its legacy URL. `/about-us/overview/`
 * is a Google sitelink today; every one of these is in the old sitemap.
 */
export const dynamicParams = false;

const slugOf = (path: string) => path.split("/").filter(Boolean).pop()!;
const find = (slug: string) => aboutPages.find((page) => slugOf(page.path) === slug);

export function generateStaticParams() {
  return aboutPages.map((page) => ({ slug: slugOf(page.path) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = find((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: page.path });
}

export default async function AboutSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = find((await params).slug);
  if (!page) notFound();

  return (
    <LegacyContentPage
      page={page}
      trail={trailFor(page, ABOUT)}
      relatedHeading="More about the school"
      related={[
        ...aboutPages
          .filter((other) => other.path !== page.path)
          .map((other) => ({ label: other.title, href: other.path })),
        { label: "Welcome to Ali Public School", href: "/welcome-to-ali-public-school/" },
        { label: "Principal's Message", href: "/principals-message/" },
      ]}
    />
  );
}
