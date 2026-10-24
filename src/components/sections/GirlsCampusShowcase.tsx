"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { sections } from "@/data/about";
import { alt, media } from "@/data/media";
import { easeOut } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

// The frame is 4:3, so these are the landscape shots of the girls' block —
// a portrait photograph in a 4:3 frame would show a strip of wall and sky.
const photos = media.girlsBuilding.wide.slice(0, 6);

export function GirlsCampusShowcase() {
  const reduceMotion = useReducedMotion();
  const {
    ref: frameRef,
    index,
    setIndex,
  } = useAutoAdvance(photos.length, 4000, !reduceMotion);

  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Girls &amp; Junior Section
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Moments to Remember
          </h2>
          {/* Reference 3.2 — the school's own welcome. */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-ink/70">
            {sections.girlsJunior.intro}
          </p>
          <div className="mt-8">
            <Button href="/campuses/" variant="ghost-dark">
              Explore the Girls &amp; Junior Section
            </Button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            ref={frameRef as React.Ref<HTMLDivElement>}
            className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-sand shadow-xl"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="absolute inset-0"
              >
                <Image
                  src={photos[index]}
                  alt={alt.girlsBuilding}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${photos.length}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-maroon" : "w-2 bg-navy-ink/20"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
