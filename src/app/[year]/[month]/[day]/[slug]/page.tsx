import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import {
  getPostByParams,
  legacyTags,
  newsPosts,
  postDescriptionText,
  postSegments,
  postSeoTitle,
  type NewsPost,
} from "@/data/news";
import { legacySize } from "@/data/legacy-media";
import { buildMetadata, describe } from "@/lib/metadata";
import { articleSchema, jsonLd } from "@/lib/schema";

/**
 * A news post at its legacy WordPress address, `/YYYY/MM/DD/slug/` — the
 * scheme Google has indexed for every one of these since 2015. Do not move
 * posts to a /news/[slug] scheme (migration report §6.5).
 *
 * Only the posts in `newsPosts` exist; any other four-segment path is a 404.
 */
export const dynamicParams = false;

type Params = { year: string; month: string; day: string; slug: string };

export function generateStaticParams(): Params[] {
  return newsPosts.map((post) => {
    const [year, month, day, slug] = postSegments(post);
    return { year, month, day, slug };
  });
}

function postDescription(post: NewsPost) {
  // The school's own opening sentence makes a better description than
  // anything we could write about the post (see postDescriptionText).
  return describe(postDescriptionText(post));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = getPostByParams(year, month, day, slug);
  if (!post) return {};
  return buildMetadata({
    title: postSeoTitle(post),
    description: postDescription(post),
    path: post.path,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function NewsPostPage({ params }: { params: Promise<Params> }) {
  const { year, month, day, slug } = await params;
  const post = getPostByParams(year, month, day, slug);
  if (!post) notFound();

  const index = newsPosts.indexOf(post);
  const newer = index > 0 ? newsPosts[index - 1] : null;
  const older = index < newsPosts.length - 1 ? newsPosts[index + 1] : null;

  // The legacy breadcrumb read "Home / News / <title>" (or Events).
  const primary = post.categories.includes("News") ? "News" : "Events";
  const trail = [
    { name: "Home", path: "/" },
    { name: primary, path: `/category/${primary.toLowerCase()}/` },
    { name: post.title, path: post.path },
  ];
  const tags = legacyTags.filter((tag) => post.tags?.includes(tag.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema(post, postDescription(post)))}
      />
      <article className="bg-sand px-6 pb-20 pt-40">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs trail={trail} />

          <Reveal>
            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <time
                dateTime={post.date}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-torch"
              >
                {formatDate(post.date)}
              </time>
              <span className="font-sans text-[0.65rem] uppercase tracking-wider text-navy-ink/40">
                {post.categories.map((category, i) => (
                  <span key={category}>
                    {i > 0 && " · "}
                    <Link href={`/category/${category.toLowerCase()}/`} className="hover:text-maroon">
                      {category}
                    </Link>
                  </span>
                ))}
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-ink md:text-4xl">
              {post.title}
            </h1>

            {/* The post's own featured image from the legacy site, served
                from its original /wp-content/uploads/ path. */}
            {post.image && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-navy-ink/10 bg-paper">
                <Image
                  src={post.image}
                  alt={post.title}
                  {...legacySize(post.image)}
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
            )}

            {post.body.length > 0 ? (
              <div className="mt-8 space-y-5 text-base leading-relaxed text-navy-ink/85">
                {post.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              /* The school published some posts as a headline and a photograph
                 with no body text. Saying so is better than inventing one. */
              <p className="mt-8 text-sm italic leading-relaxed text-navy-ink/50">
                This announcement was published as a headline and photographs,
                with no accompanying text.
              </p>
            )}

            {tags.length > 0 && (
              <p className="mt-10 font-sans text-xs text-navy-ink/50">
                Tagged{" "}
                {tags.map((tag, i) => (
                  <span key={tag.slug}>
                    {i > 0 && ", "}
                    <Link href={`/tag/${tag.slug}/`} className="text-maroon hover:underline">
                      {tag.name}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            <Link
              href="/blog/"
              className="mt-10 inline-block font-sans text-xs font-semibold uppercase tracking-wider text-maroon hover:underline"
            >
              ← All news &amp; events
            </Link>
          </Reveal>
        </div>
      </article>

      <nav aria-label="More news" className="border-t border-navy-ink/10 bg-paper px-6 py-10">
        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {older && (
            <Link href={older.path} className="group">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-navy-ink/50">
                Earlier
              </span>
              <p className="mt-1 font-display text-sm font-semibold text-navy-ink group-hover:text-maroon">
                {older.title}
              </p>
            </Link>
          )}
          {newer && (
            <Link href={newer.path} className="group sm:col-start-2 sm:text-right">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-navy-ink/50">
                Later
              </span>
              <p className="mt-1 font-display text-sm font-semibold text-navy-ink group-hover:text-maroon">
                {newer.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
