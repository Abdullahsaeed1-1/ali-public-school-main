import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";

/**
 * P30 — Captioned side-scroll.
 *
 * The path through the Girls & Junior Section, one frame per stage, scrolled
 * sideways.
 *
 * Distinct from the results-day rail (P08) in the way that matters: there the
 * frames are deliberately mismatched crops with no words, read as a spread of
 * snapshots. Here every frame is the same size and carries a stage label and a
 * caption beside the picture, because the order is the information — a parent
 * is reading where their child starts and where they go next.
 *
 * The numbering is real sequence, not decoration.
 */
const stages = [
  {
    age: "Age 3",
    label: "Playgroup",
    caption: "The first year, where school is mostly about settling in.",
    image: media.classrooms.wide[1],
  },
  {
    age: "Ages 4–5",
    label: "Nursery & Prep",
    caption: "Letters, numbers, and the beginnings of a routine.",
    image: media.classrooms.wide[4],
  },
  {
    age: "Ages 5–8",
    label: "Class 1 to 3",
    caption: "Boys and girls co-educated, in classes small enough to be known.",
    image: media.classrooms.wide[7],
  },
  {
    age: "Ages 9–13",
    label: "Class 4 to 8",
    caption: "Girls continue here as the boys move to the Senior Section.",
    image: media.girlsBuilding.wide[2],
  },
];

export function StageScroll() {
  return (
    <section className="overflow-hidden bg-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Girls &amp; Junior Section
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Playgroup to Class 8
          </h2>
        </Reveal>
      </div>

      <Reveal
        delay={100}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden px-6 py-4"
      >
        {stages.map((stage, i) => (
          <article
            key={stage.label}
            className="w-72 shrink-0 snap-start sm:w-80"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-sand">
              <Image
                src={stage.image}
                alt={`${stage.label} at Ali Public School`}
                fill
                sizes="(max-width: 640px) 288px, 320px"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-sans text-xs font-semibold text-navy-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-torch">
              {stage.age}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-navy-ink">
              {stage.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">
              {stage.caption}
            </p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
