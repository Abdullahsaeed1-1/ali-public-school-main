import type { Metadata } from "next";
import { GridToSingle } from "@/components/sections/GridToSingle";
import { PhotoFigures } from "@/components/sections/PhotoFigures";
import { ResultsCelebration } from "@/components/sections/ResultsCelebration";
import { CircularReel } from "@/components/sections/CircularReel";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Results & Achievements",
  description:
    "Board results and achievements at Ali Public School & College, Badabher, Peshawar — a growing record from our Kohat Road and Girls & Junior sections.",
  path: "/results/",
});

/**
 * Rebuilt once the school's original results-day photographs (the "RESULT
 * 2026" photo booth) were recovered — see PLAN.md §2. Board figures and
 * named achievers are still placeholders (`src/data/results.ts`) and stay
 * that way until the school publishes them; nothing here invents a number
 * or a name.
 */
export default function ResultsPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Achievements
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Results &amp; Achievements
          </h1>
        </div>
      </section>

      {/* P29 — the many converging into the one. */}
      <GridToSingle />

      {/* P08 */}
      <ResultsCelebration />

      {/*
        P20 — the figures themselves are still placeholders in
        src/data/results.ts and must stay that way until the school
        publishes them — see PLAN.md §12.
      */}
      <PhotoFigures />

      {/* P27 — closes the page; names appear once topAchievers is populated. */}
      <CircularReel />
    </>
  );
}
