import Image from "next/image";
import { alt, media } from "@/data/media";

/**
 * P14 — Duo split.
 *
 * Two frames side by side at the top of Admissions, so the first thing a
 * parent deciding whether to visit sees is the place itself rather than a
 * process. Pointing at one widens it and pushes the other back.
 *
 * Photographs, not film: the school has no video yet. When an edited lesson
 * clip and a gate-at-arrival clip arrive, `LazyVideo` can take these two slots
 * back with these photographs as its posters — the layout does not change.
 *
 * Both are portrait, because the panels are tall. A landscape photograph here
 * would crop to a band across the middle of the room.
 */
const panels = [
  {
    src: media.classrooms.tall[1],
    label: alt.classroom,
    caption: "A classroom",
  },
  {
    src: media.boysBuilding.tall[0],
    label: alt.boysBuilding,
    caption: "The way in",
  },
];

export function DuoVideoSplit() {
  return (
    <section className="bg-sand px-6 pb-20 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex h-[55vh] flex-col gap-3 md:h-[70vh] md:flex-row">
          {panels.map((panel, i) => (
            /* Deliberately not wrapped in a Reveal: this pair is the first
               thing on the page, and Reveal's opacity-0 start meant the LCP
               waited for hydration rather than for the image. */
            <div
              key={panel.caption}
              className="group relative flex-1 overflow-hidden rounded-2xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[1.8] focus-within:flex-[1.8]"
            >
              <Image
                src={panel.src}
                alt={panel.label}
                fill
                // This pair sits at the top of Admissions, so on a phone the
                // first one is the page's largest contentful paint.
                priority={i === 0}
                // 68 rather than the default 75: this is a full-bleed
                // photograph behind a caption, not a detail shot, and it is
                // the page's LCP on a phone.
                quality={68}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-ink/80 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-5 left-5 font-display text-lg font-semibold text-paper md:text-xl">
                {panel.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
