"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { media } from "@/data/media";
import { topAchievers } from "@/data/results";

/**
 * P27 — Circular reel.
 *
 * Photographs inside a round mask, advancing on their own, with a ring of
 * ticks turning slowly around the outside.
 *
 * It closes the Results page, where the top achievers will eventually be
 * named. Until the school publishes them, `topAchievers` is empty and the reel
 * carries results-day photographs with no names attached — no student is
 * captioned as an achiever without the school having said so. When names
 * arrive in `src/data/results.ts` they appear beneath the reel automatically.
 *
 * Crossfading is a stack of images at differing opacity, not a swapped `src`,
 * so no frame goes blank while the next file decodes.
 */
// The resultsDay folder is decoration close-ups with nobody in them; a reel
// captioned "celebrating our students" needs actual students in it.
const photos = [
  media.girlsPupils[6],
  media.boysPupils[5],
  media.girlsPupils[3],
  media.boysPupils[9],
  media.girlsPupils[4],
];

export function CircularReel() {
  const reduceMotion = useReducedMotion();
  const { ref, index } = useAutoAdvance(photos.length, 3500, !reduceMotion);
  const named = topAchievers[index % Math.max(topAchievers.length, 1)];

  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          Top Achievers
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
          Celebrating our students
        </h2>

        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className="relative mx-auto mt-12 h-64 w-64 md:h-80 md:w-80"
        >
          <div
            aria-hidden
            className="reel-turn absolute -inset-4 rounded-full border-2 border-dashed border-torch/50"
          />

          <div className="relative h-full w-full overflow-hidden rounded-full bg-sand ring-4 ring-paper">
            {photos.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                aria-hidden
                fill
                sizes="320px"
                className={`object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {topAchievers.length === 0 ? (
          <p className="mx-auto mt-10 max-w-md text-sm text-navy-ink/70">
            This year&apos;s top achievers will be named here once results are
            announced.
          </p>
        ) : (
          <div className="mt-10">
            <p className="font-display text-lg font-semibold text-navy-ink">
              {named.name}
            </p>
            <p className="mt-1 text-sm text-navy-ink/70">{named.achievement}</p>
            <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-wider text-navy-ink/60">
              {named.year}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
