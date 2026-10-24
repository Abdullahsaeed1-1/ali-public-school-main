import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { alt, media } from "@/data/media";

/**
 * P23 — Diagonal collage.
 *
 * Three panels sharing one horizon, cut on the slant. The closing image of the
 * About page: no heading, no caption, no link — the story has been told by the
 * time you reach it.
 *
 * The cuts are clip-path polygons (`.slant-*` in globals.css) with negative
 * margins pulling the panels together, so they interlock along the diagonal
 * instead of leaving triangles of background between them. The classes carry
 * their own `min-width: 768px` guard — a `md:` prefix would not work here,
 * since Tailwind only generates variants for its own utilities.
 */
// The middle panel is media.girlsPupils[7] — the one wide-shaped real pupil
// photo recovered from the earlier batch (PLAN.md §2) — so the page's closing
// image is a person, not a third empty room.
const panels = [
  { src: media.classrooms.wide[5], slant: "slant-l", z: "z-30", alt: alt.classroom },
  { src: media.girlsPupils[7], slant: "slant-m", z: "z-20", alt: alt.students },
  { src: media.classrooms.wide[7], slant: "slant-r", z: "z-10", alt: alt.classroom },
];

export function DiagonalCollage() {
  return (
    <section className="bg-sand pb-20">
      <Reveal variant="fade">
        <div className="flex h-64 flex-col gap-1 md:h-[26rem] md:flex-row md:gap-0">
          {panels.map((panel, i) => (
            <div
              key={panel.src}
              className={`relative flex-1 overflow-hidden ${panel.slant} ${panel.z} ${
                i > 0 ? "md:-ml-10" : ""
              }`}
            >
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                sizes="(max-width: 768px) 100vw, 34vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
