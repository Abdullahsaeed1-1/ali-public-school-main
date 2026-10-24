import Link from "next/link";
import { breadcrumbSchema, jsonLd, type Crumb } from "@/lib/schema";

/**
 * The legacy site's "Home / About Us / Overview" trail, kept on the inner
 * pages that carry the legacy content (migration report §7.0, §7.3).
 *
 * The visible trail and its BreadcrumbList structured data are rendered by
 * the same component from the same array, so the two can never disagree.
 * The last crumb is the current page and is not a link.
 */
export function Breadcrumbs({
  trail,
  tone = "dark",
}: {
  trail: Crumb[];
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-sand/70" : "text-navy-ink/50";
  const link = tone === "light" ? "hover:text-paper" : "hover:text-maroon";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs ${muted}`}>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="max-w-[16rem] truncate">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className={`underline-offset-4 hover:underline ${link}`}>
                      {crumb.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
