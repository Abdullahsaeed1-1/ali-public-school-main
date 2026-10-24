import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { ACADEMICS, academicsPages, policyFooterLinks, trailFor } from "@/data/legacy-pages";
import { buildMetadata } from "@/lib/metadata";

/**
 * Every policy page and both archived term calendars, each at its legacy
 * URL — typos included (`school-unifrom`, `acamedic`), because those are the
 * addresses Google has indexed. `/academics/admission-policy/` is a static
 * sibling route and takes precedence over this one.
 */
export const dynamicParams = false;

const slugOf = (path: string) => path.split("/").filter(Boolean).pop()!;
const find = (slug: string) => academicsPages.find((page) => slugOf(page.path) === slug);

export function generateStaticParams() {
  return academicsPages.map((page) => ({ slug: slugOf(page.path) }));
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

export default async function AcademicsSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = find((await params).slug);
  if (!page) notFound();

  return (
    <LegacyContentPage
      page={page}
      trail={trailFor(page, ACADEMICS)}
      relatedHeading="School policies"
      related={policyFooterLinks.filter((link) => link.href !== page.path)}
    />
  );
}
