import type { Metadata } from "next";
import { PolicyAccordion } from "@/components/sections/PolicyAccordion";
import { policies } from "@/data/policies";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "School Policies",
  description:
    "The nine published policies of Ali Public School, Peshawar in full: school rules, attendance, homework, behaviour, anti-bullying, uniform and safety.",
  path: "/policies/",
});

/**
 * All nine policies, in full, on one page.
 *
 * MASTERPROMPT §4: "These pages are boring to build and they matter
 * enormously — they are what a serious parent reads before enrolling, and they
 * are proof the school is properly run. Do not summarise them."
 */
export default function PoliciesPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Academics
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            School Policies
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            Every policy the school publishes, in full — not summarised. If you
            are deciding whether to enrol your child, this is the page to read.
          </p>
        </div>
      </section>

      {/* A plain index, so a parent looking for one policy does not have to
          scroll nine accordion rows to find it. */}
      <section className="bg-sand px-6 pb-10">
        <nav aria-label="Policies" className="mx-auto max-w-4xl">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {policies.map((policy) => (
              <li key={policy.slug}>
                <a
                  href={`#${policy.slug}`}
                  className="font-sans text-xs font-medium text-navy-ink/60 underline-offset-4 hover:text-maroon hover:underline"
                >
                  {policy.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="bg-sand px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Same reasoning as /news — see the note there. */}
          <PolicyAccordion />

          <p className="mt-10 text-center text-xs leading-relaxed text-navy-ink/50">
            {/* The legacy 2019–2020 and 2017–2019 calendars keep their URLs as
                marked archives (/academics/…), because Google has them
                indexed; they are not presented as current dates. */}
            Term and holiday dates for the current session are available from
            the school office on {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
