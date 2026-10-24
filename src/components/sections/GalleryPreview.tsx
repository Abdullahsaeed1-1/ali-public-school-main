"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { alt, media } from "@/data/media";

// Landscape tiles, so landscape photographs. This rail used to be eight
// copies of the crest at 10% opacity behind a category label, which is the
// treatment the client called cheap - a watermark standing in for a picture.
const rowTopPhotos = [
  { src: media.classrooms.wide[0], label: "Classrooms" },
  { src: media.classrooms.wide[4], label: "Classrooms" },
  { src: media.classrooms.wide[1], label: "Classrooms" },
  { src: media.boysBuilding.wide[0], label: "The Veranda" },
];

const rowBottomPhotos = [
  { src: media.girlsBuilding.wide[0], label: "The Grounds" },
  { src: media.classrooms.wide[2], label: "Classrooms" },
  { src: media.boysBuilding.wide[2], label: "Boys & Senior" },
  { src: media.classrooms.wide[7], label: "Classrooms" },
];

function Tile({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-xl bg-navy/5">
      <Image
        src={src}
        alt={alt.campus}
        fill
        sizes="288px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-ink/70 to-transparent" />
      <span className="absolute bottom-3 left-4 font-sans text-xs font-semibold uppercase tracking-wider text-paper">
        {label}
      </span>
    </div>
  );
}

export function GalleryPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Sideways parallax while the page scrolls vertically is exactly the kind
  // of orthogonal motion prefers-reduced-motion is meant to suppress, unlike
  // the Straight Path line's vertical scaleY (which just tracks scroll
  // directly) — so this one gets fully disabled rather than just eased.
  // Only one row parallaxes — a second independently-moving row would put
  // two parallax effects in the same viewport, which the motion plan's own
  // restraint rule ("max one parallax element per viewport") rules out.
  const xTop = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-15%"]);

  const rowTop = [...rowTopPhotos, ...rowTopPhotos];
  const rowBottom = [...rowBottomPhotos, ...rowBottomPhotos].reverse();

  return (
    <section ref={ref} className="relative overflow-hidden bg-sand py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-navy-ink md:text-3xl">
          Campus life
        </h2>
      </div>

      <div className="mt-10 space-y-4">
        <m.div style={{ x: xTop }} className="flex gap-4 px-6">
          {rowTop.map((tile, i) => (
            <Tile key={`top-${i}`} src={tile.src} label={tile.label} />
          ))}
        </m.div>
        <div className="flex gap-4 px-6">
          {rowBottom.map((tile, i) => (
            <Tile key={`bottom-${i}`} src={tile.src} label={tile.label} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <Button href="/galleries/" variant="ghost-dark">
          View Full Gallery
        </Button>
      </div>
    </section>
  );
}
