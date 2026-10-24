import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";

/**
 * P08 — Snap rail.
 *
 * The actual "RESULT 2026" photo booth — group shots, solo portraits, and a
 * couple of decoration close-ups, deliberately mismatched crops with no
 * per-photo caption. Recovered from an earlier photo batch (PLAN.md §2).
 */
const widths = ["w-64", "w-96", "w-72", "w-80", "w-64", "w-80", "w-64", "w-96"];
const aspects = [
  "aspect-3/4", "aspect-4/3", "aspect-3/4", "aspect-4/3",
  "aspect-3/4", "aspect-4/3", "aspect-3/4", "aspect-4/3",
];
// The resultsDay folder turned out to be decoration close-ups with no one
// in them — the actual smiling faces from results day live in girlsPupils
// and boysPupils (same event, same backdrop). Six real photographs, two
// decoration shots for texture.
const sources = [
  media.girlsPupils[0], media.boysPupils[0], media.girlsPupils[2],
  media.resultsDay[2], media.boysPupils[2], media.girlsPupils[3],
  media.boysPupils[6], media.resultsDay[1],
];
const photos = sources.map((src, i) => ({
  src,
  width: widths[i % widths.length],
  aspect: aspects[i % aspects.length],
}));

export function ResultsCelebration() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Results Day 2026
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            A Day Worth Celebrating
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-ink/70">
            Handmade badges, graduation caps, and no shortage of proud
            smiles — a glimpse of how the whole school marks results day,
            long before the individual scores are in.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden py-4"
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`relative ${photo.width} ${photo.aspect} shrink-0 snap-start overflow-hidden rounded-2xl border-t-2 border-torch bg-paper shadow-lg`}
            >
              <Image
                src={photo.src}
                alt="Results day celebrations at Ali Public School"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 60vw, 320px"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
