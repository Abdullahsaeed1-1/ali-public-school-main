"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/data/media";

/**
 * P29 — Grid to single.
 *
 * Eight result-day faces that converge into one as the section is scrolled,
 * heading the Results page. The movement carries the page's actual argument:
 * a result is one student's, and also the whole school's.
 *
 * Now built from the real "RESULT 2026" photo booth (recovered — PLAN.md §2)
 * rather than the classroom photographs it briefly stood in with.
 *
 * Each tile animates from its own place in the grid toward the centre while
 * fading out, leaving the ninth — the centre frame — alone and at full size.
 */
// The resultsDay folder is decoration close-ups with nobody in them — the
// converging faces come from girlsPupils and boysPupils, the same event.
const outer = [
  { src: media.girlsPupils[1], x: -220, y: -120 },
  { src: media.boysPupils[1], x: 0, y: -150 },
  { src: media.girlsPupils[4], x: 220, y: -120 },
  { src: media.boysPupils[4], x: -260, y: 0 },
  { src: media.girlsPupils[5], x: 260, y: 0 },
  { src: media.girlsPupils[0], x: -220, y: 120 },
  { src: media.boysPupils[0], x: 0, y: 150 },
  { src: media.girlsPupils[3], x: 220, y: 120 },
];

export function GridToSingle() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <section ref={ref} className="relative h-[150vh] bg-sand">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <div className="relative h-72 w-72 md:h-96 md:w-96">
          {outer.map((tile) => (
            <Tile
              key={tile.src}
              {...tile}
              progress={scrollYProgress}
              still={!!reduceMotion}
            />
          ))}

          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-navy/5 shadow-2xl">
            <Image
              src={media.boysPupils[6]}
              alt="Students celebrating results day at Ali Public School"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  x,
  y,
  progress,
  still,
}: {
  src: string;
  x: number;
  y: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  still: boolean;
}) {
  // One component per tile because useTransform cannot be called in a loop.
  const tx = useTransform(progress, [0, 1], still ? [0, 0] : [x, 0]);
  const ty = useTransform(progress, [0, 1], still ? [0, 0] : [y, 0]);
  const opacity = useTransform(progress, [0, 0.75], still ? [0, 0] : [1, 0]);
  const scale = useTransform(progress, [0, 1], still ? [0.4, 0.4] : [0.55, 0.4]);

  return (
    <m.div
      style={{ x: tx, y: ty, opacity, scale }}
      aria-hidden
      className="absolute inset-0 overflow-hidden rounded-xl bg-navy/5 shadow-lg"
    >
      <Image src={src} alt="" fill sizes="200px" className="object-cover" />
    </m.div>
  );
}
