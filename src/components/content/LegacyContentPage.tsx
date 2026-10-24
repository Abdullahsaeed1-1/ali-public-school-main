import { Blocks } from "@/components/content/Blocks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { LegacyPage } from "@/data/legacy-pages";
import type { Crumb } from "@/lib/schema";

/**
 * One legacy content page: a policy, an About Us sub-page, a term calendar.
 *
 * Set like the site's other text pages (/careers/, /policies/) — sand
 * ground, display heading, one reading column — so these read as part of
 * the redesign rather than a WordPress leftover. These pages are documents,
 * not media sections, so they draw on no pattern from the PLAN.md registry.
 *
 * Server-rendered throughout, and deliberately not Reveal-wrapped: every
 * word is in the first HTML response and visible without JavaScript.
 */
export function LegacyContentPage({
  page,
  trail,
  related,
  relatedHeading,
}: {
  page: LegacyPage;
  trail: Crumb[];
  related?: { label: string; href: string; note?: string }[];
  relatedHeading?: string;
}) {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-navy-ink md:text-5xl">
            {page.h1 ?? page.title}
          </h1>
          {page.standfirst && (
            <p className="mt-5 max-w-xl rounded-2xl border border-navy-ink/10 bg-paper/70 px-5 py-4 text-sm leading-relaxed text-navy-ink/70">
              {page.standfirst}
            </p>
          )}
        </div>
      </section>

      <article className="bg-sand px-6 pb-20 pt-6">
        <div className="mx-auto max-w-3xl">
          <Blocks blocks={page.blocks} headingLevel={2} />
        </div>
      </article>

      {related && related.length > 0 && (
        <nav
          aria-label={relatedHeading ?? "Related pages"}
          className="border-t border-navy-ink/10 bg-paper px-6 py-14"
        >
          <div className="mx-auto max-w-3xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
              {relatedHeading ?? "Related pages"}
            </p>
            <Blocks blocks={[{ kind: "links", items: related }]} />
          </div>
        </nav>
      )}
    </>
  );
}
