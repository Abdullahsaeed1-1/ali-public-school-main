"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { newsCategories, newsPosts, type NewsCategory } from "@/data/news";

/**
 * The 2015–2022 archive, filterable.
 *
 * Deliberately typographic rather than photographic. The school published a
 * featured image with each of these posts, but we do not have those files —
 * and a grid of seventy-six cards all showing the same borrowed classroom
 * photograph would be worse than no photograph at all. Date, category and the
 * school's own words carry it; when the real featured images arrive they drop
 * into the space above the date.
 *
 * Grouped by year because that is what the content is: an institutional
 * history. A flat list of seventy-six items reads as a database dump.
 */
export function NewsArchive() {
  const [filter, setFilter] = useState<NewsCategory | "All">("All");

  const grouped = useMemo(() => {
    const visible =
      filter === "All"
        ? newsPosts
        : newsPosts.filter((post) => post.categories.includes(filter));

    const byYear = new Map<string, typeof newsPosts>();
    for (const post of visible) {
      const year = post.date.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), post]);
    }
    return [...byYear.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filter]);

  const total = grouped.reduce((n, [, posts]) => n + posts.length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...newsCategories] as const).map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                active
                  ? "bg-navy-ink text-paper"
                  : "bg-paper text-navy-ink/70 hover:text-navy-ink"
              }`}
            >
              {category}
            </button>
          );
        })}
        <span className="ml-auto font-sans text-xs text-navy-ink/50">
          {total} {total === 1 ? "post" : "posts"}
        </span>
      </div>

      <div className="mt-12 space-y-16">
        {grouped.map(([year, posts]) => (
          <section key={year}>
            <h2 className="font-display text-2xl font-semibold text-navy-ink/30">
              {year}
            </h2>
            <ul className="mt-4 divide-y divide-navy-ink/10 border-t border-navy-ink/10">
              {/* No per-item layout animation. Seventy-six rows each running
                  a FLIP measurement made even the plain-text paint on this
                  page take 3.5s on a throttled phone. Filtering is instant
                  instead, which is what a filter should be. */}
              {posts.map((post) => (
                  <li key={post.path}>
                    <Link
                      href={post.path}
                      className="group grid gap-2 py-6 transition-colors duration-150 md:grid-cols-[9rem_1fr] md:gap-8"
                    >
                      <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                        <time
                          dateTime={post.date}
                          className="font-sans text-xs font-semibold uppercase tracking-wider text-torch"
                        >
                          {formatDate(post.date)}
                        </time>
                        <span className="font-sans text-[0.65rem] uppercase tracking-wider text-navy-ink/40">
                          {post.categories.join(" · ")}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-semibold text-navy-ink group-hover:text-maroon md:text-xl">
                          {post.title}
                        </h3>
                        {post.body[0] && (
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
                            {truncate(post.body[0])}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function truncate(text: string, max = 180) {
  if (text.length <= max) return text;
  // Cut at a word boundary rather than mid-word.
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}
