"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/data/media";
import { site } from "@/data/site";

/**
 * P32 — Layered depth.
 *
 * The photograph drifts as the page scrolls while the title stays put. That
 * difference in rate is the whole effect — it is what makes a flat photograph
 * read as having space behind it.
 *
 * There used to be a third plane: the crest at 10% opacity between the two.
 * A logo ghosted across a photograph reads as a watermark rather than as
 * depth, so it is gone and the parallax runs between photograph and type.
 *
 * This counts as the one parallax effect allowed in its viewport (see the
 * restraint rule in CLAUDE.md), so nothing else on the About page may
 * parallax until it has scrolled away.
 *
 * Under reduced motion every layer is pinned to zero travel rather than the
 * section being removed — the composition still reads, it simply holds still.
 */
export function AboutBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "22%"]
  );

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[75vh] items-end overflow-hidden"
    >
      <m.div style={{ y: photoY }} className="absolute inset-0 -z-20 scale-110">
        <Image
          src={media.boysBuilding.wide[3]}
          alt=""
          aria-hidden
          fill
          priority
          // Same reasoning as the homepage hero: a 65% navy overlay sits on
          // top of this, so the encoding can be far lighter than the default.
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-ink/65" />
      </m.div>

      {/* The middle plane used to be the crest at 10% opacity floating over
          the building. A logo ghosted across a photograph reads as a
          watermark, not as depth — so the parallax now runs between the
          photograph and the type alone, which is the difference that actually
          creates the depth. */}

      <div className="mx-auto w-full max-w-4xl px-6 pb-20 pt-40 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-torch">
          Our Story
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-paper md:text-6xl">
          About Us
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm text-sand/85">
          On Kohat Road since {site.foundingYear}.
        </p>
      </div>
    </section>
  );
}
