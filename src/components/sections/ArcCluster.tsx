import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { sections } from "@/data/about";
import { alt, media } from "@/data/media";

/**
 * P15 — Arc cluster.
 *
 * Five photographs set along a gentle curve, each drifting on its own period
 * so the group never falls into a visible shared rhythm. The offsets below are
 * the arc: they are deliberately hand-set rather than computed, because a
 * mathematically even curve reads as a widget and an uneven one reads as
 * photographs someone laid out.
 *
 * On narrow screens the arc collapses to a plain scrolling row — a five-wide
 * curve at 360px would leave each frame the size of a thumbnail.
 */
// Real pupils, recovered from an earlier photo batch (PLAN.md §2) — this
// section was always meant to be about people, not the building.
const photos = [
  { src: media.girlsPupils[1], lift: "md:mt-16", period: "7s" },
  { src: media.boysPupils[3], lift: "md:mt-6", period: "9s" },
  { src: media.girlsPupils[5], lift: "md:mt-0", period: "11s" },
  { src: media.boysPupils[5], lift: "md:mt-6", period: "8s" },
  { src: media.girlsPupils[6], lift: "md:mt-16", period: "10s" },
];

export function ArcCluster() {
  return (
    <section className="overflow-hidden bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Our People
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            The faces behind the motto
          </h2>
          {/* Reference 3.2 — one of the warmest sentences the school has. */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-navy-ink/70">
            {sections.girlsJunior.welcome}
          </p>
        </Reveal>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden py-4 md:justify-center md:overflow-visible md:py-0">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 90}
              className={`shrink-0 snap-center ${photo.lift}`}
            >
              <div
                className="arc-drift relative h-64 w-44 overflow-hidden rounded-2xl shadow-xl md:h-72 md:w-52"
                style={{ animationDuration: photo.period }}
              >
                <Image
                  src={photo.src}
                  alt={alt.students}
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
