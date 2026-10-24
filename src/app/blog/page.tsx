import type { Metadata } from "next";
import { NewsArchive } from "@/components/sections/NewsArchive";
import { newsPosts } from "@/data/news";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "News and announcements from Ali Public School & College, Badaber, Peshawar: every post from 2015 to 2022, from admissions to sports days.",
  path: "/blog/",
});

/**
 * The school's real archive, seven years of it. MASTERPROMPT §4 calls this
 * "the most credible content the school owns", and it is: nothing on this page
 * was written by us.
 */
export default function NewsPage() {
  const oldest = newsPosts[newsPosts.length - 1].date.slice(0, 4);
  const newest = newsPosts[0].date.slice(0, 4);

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            The School Year, Recorded
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            News &amp; Announcements
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            Every announcement, sports day, results day and founders&apos; day
            the school has published since {oldest} — {newsPosts.length} posts
            through to {newest}.
          </p>
        </div>
      </section>

      <section className="bg-sand px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Not Reveal-wrapped. The archive is the page; fading it in from
              opacity 0 made the largest text block wait for hydration and put
              LCP at 3s on a throttled phone. */}
          <NewsArchive />
        </div>
      </section>
    </>
  );
}
