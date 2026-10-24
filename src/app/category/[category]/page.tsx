import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/content/PostList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { legacyCategories, postsInCategory } from "@/data/news";
import { buildMetadata } from "@/lib/metadata";

/**
 * /category/news/ and /category/events/ — both indexed, both linked from the
 * old "Notices" menu. Titles are the legacy "News Archives" form, headings
 * the legacy "Category: News". The other legacy categories held only theme
 * demo posts and are retired in `src/data/legacy-routes.ts`.
 */
export const dynamicParams = false;

const DESCRIPTIONS: Record<string, string> = {
  news: "News archive of Ali Public School & College, Badaber, Peshawar: announcements, admissions, results, vacations and school updates since 2015.",
  events: "Events archive of Ali Public School & College, Badaber, Peshawar: founders' days, sports events, competitions, school trips and celebrations.",
};

export function generateStaticParams() {
  return legacyCategories.map((category) => ({ category: category.slug }));
}

const find = (slug: string) => legacyCategories.find((c) => c.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const category = find((await params).category);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} Archives`,
    description: DESCRIPTIONS[category.slug],
    path: `/category/${category.slug}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = find((await params).category);
  if (!category) notFound();
  const posts = postsInCategory(category.name);
  const path = `/category/${category.slug}/`;

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: category.name, path }]} />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Category: {category.name}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            {posts.length} posts from Ali Public School &amp; College, filed under{" "}
            {category.name}.
          </p>
        </div>
      </section>
      <section className="bg-sand px-6 pb-20 pt-10">
        <div className="mx-auto max-w-4xl">
          <PostList posts={posts} />
        </div>
      </section>
    </>
  );
}
