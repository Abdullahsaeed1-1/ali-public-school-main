import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/content/PostList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { legacyTags, postsWithTag } from "@/data/news";
import { buildMetadata } from "@/lib/metadata";

/**
 * The five legacy tag archives. /tag/badaber/ and /tag/kohat/ are indexed
 * and carry the local terms the school ranks on; all four place tags point
 * at the March 2019 new-campus post, exactly as they did on the old site.
 */
export const dynamicParams = false;

const DESCRIPTIONS: Record<string, string> = {
  badaber: "News from Ali Public School & College in Badaber, Peshawar, tagged badaber: the school's new college campus, opened in 2019.",
  kohat: "News from Ali Public School & College on Kohat Road, Peshawar, tagged kohat: the new college campus, opened in 2019.",
  peshawar: "News from Ali Public School & College, Peshawar, tagged peshawar: the new campus built to modern standards in Badaber, opened in 2019.",
  "ali-public-shool-and-college": "Posts tagged Ali Public School and College: the new college campus of the school in Badaber, Peshawar, opened in March 2019.",
  "summer-vacations-2016": "Summer vacations 2016 at Ali Public School, Peshawar: closing and reopening dates for the 2016 summer break.",
};

export function generateStaticParams() {
  return legacyTags.map((tag) => ({ tag: tag.slug }));
}

const find = (slug: string) => legacyTags.find((t) => t.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const tag = find((await params).tag);
  if (!tag) return {};
  return buildMetadata({
    title: `${tag.name} Archives`,
    description: DESCRIPTIONS[tag.slug],
    path: `/tag/${tag.slug}/`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const tag = find((await params).tag);
  if (!tag) notFound();
  const path = `/tag/${tag.slug}/`;

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "News", path: "/blog/" },
              { name: tag.name, path },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Tag: {tag.name}
          </h1>
        </div>
      </section>
      <section className="bg-sand px-6 pb-20 pt-10">
        <div className="mx-auto max-w-4xl">
          <PostList posts={postsWithTag(tag.slug)} />
        </div>
      </section>
    </>
  );
}
