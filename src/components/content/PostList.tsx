import Link from "next/link";
import type { NewsPost } from "@/data/news";

/**
 * A plain, server-rendered list of posts for the legacy category and tag
 * archives. Same typography as the /blog/ archive, without its client-side
 * filter: these pages exist to be crawled and to carry their keywords, and
 * every link is in the first HTML response.
 */
export function PostList({ posts }: { posts: NewsPost[] }) {
  return (
    <ul className="divide-y divide-navy-ink/10 border-y border-navy-ink/10">
      {posts.map((post) => (
        <li key={post.path}>
          <Link
            href={post.path}
            className="group grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-8"
          >
            <time
              dateTime={post.date}
              className="font-sans text-xs font-semibold uppercase tracking-wider text-torch"
            >
              {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <div>
              <h2 className="font-display text-lg font-semibold text-navy-ink group-hover:text-maroon md:text-xl">
                {post.title}
              </h2>
              {post.body[0] && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
                  {post.body[0].length > 180 ? `${post.body[0].slice(0, 177).trimEnd()}…` : post.body[0]}
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
