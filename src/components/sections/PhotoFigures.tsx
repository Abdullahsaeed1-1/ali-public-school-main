import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { resultHighlights } from "@/data/results";

/**
 * P20 — Photo-backed figures.
 *
 * The board result headline numbers, set over dimmed photographs instead of on
 * flat cards.
 *
 * Every figure is still a placeholder em-dash — see PLAN.md §8. That is
 * deliberate: the school has not published these numbers and they must not be
 * invented. The treatment is built so that the moment real figures land in
 * `src/data/results.ts` they appear here with no further change.
 */
const backdrops = [
  media.classrooms.wide[9],
  media.classrooms.wide[10],
  media.classrooms.wide[11],
];

export function PhotoFigures() {
  return (
    <section className="bg-navy-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-torch">
            Board Results
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
            Recent highlights
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {resultHighlights.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="relative aspect-4/3 overflow-hidden rounded-2xl"
            >
              <Image
                src={backdrops[i % backdrops.length]}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-ink/75" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="font-display text-4xl font-semibold text-torch md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wider text-sand/80">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mt-6 text-sm text-sand/60">
            Board result figures will be published here as soon as they are
            announced.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
