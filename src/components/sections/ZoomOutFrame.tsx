"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { alt, media } from "@/data/media";

/**
 * P21 — Scroll zoom-out.
 *
 * The photograph starts edge to edge and pulls back into a framed card as the
 * section crosses the viewport. It sits directly after the founding story, so
 * the movement is doing something rather than decorating: the building fills
 * the screen while you are reading about it, then settles into a photograph on
 * a page once you have.
 *
 * Width and radius are animated rather than `scale`, because scaling a
 * full-bleed image blurs it on the way down and leaves the rounded corners
 * scaling too — the frame would grow as the picture shrank.
 */
export function ZoomOutFrame() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The picture is full-bleed while the section is entering, and settles to a
  // contained card by the time it is centred — the second half of the range is
  // deliberately flat so it does not start growing again on the way out.
  const width = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? ["72%", "72%", "72%"] : ["100%", "72%", "72%"]
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? ["1rem", "1rem", "1rem"] : ["0rem", "1rem", "1rem"]
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-sand py-20">
      <m.div
        style={{ width, borderRadius: radius }}
        className="relative mx-auto h-[55vh] overflow-hidden bg-navy/5 shadow-xl md:h-[70vh]"
      >
        <Image
          src={media.girlsBuilding.wide[6]}
          alt={alt.campus}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-ink/80 to-transparent p-6 md:p-10">
          <p className="font-display text-lg text-paper md:text-2xl">
            The building that started it, on the southern edge of Peshawar.
          </p>
        </div>
      </m.div>
    </section>
  );
}
