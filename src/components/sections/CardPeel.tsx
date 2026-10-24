"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { alt, media } from "@/data/media";
import { whatsappUrl } from "@/data/site";

/**
 * P22 — Card peel.
 *
 * Four photo cards stacked on top of one another that fan apart as the section
 * is scrolled through, then the admissions call to action sits underneath.
 *
 * The section is deliberately taller than the viewport and the stack is
 * `sticky` inside it, so the peel is driven by scroll distance rather than by
 * a timer — the reader controls the pace, and it holds wherever they stop.
 *
 * Under reduced motion the cards are laid out in their final fanned position
 * immediately and nothing moves; the section still reads as a spread of
 * photographs rather than disappearing.
 */
const cards = [
  { src: media.classrooms.tall[0], to: -300, rot: -8 },
  { src: media.students.writing, to: -100, rot: -3 },
  { src: media.boysBuilding.tall[3], to: 100, rot: 3 },
  { src: media.girlsBuilding.tall[3], to: 300, rot: 8 },
];

export function CardPeel() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // The peel completes by the time the section is centred, so the fully
    // spread state is what the reader rests on rather than a moment in transit.
    offset: ["start end", "center center"],
  });

  return (
    <section ref={ref} className="relative h-[170vh] bg-sand">
      {/* pb-24 on mobile keeps the buttons clear of MobileStickyBar, which is
          fixed to the bottom of the viewport on this page. */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 md:pb-0">
        <div className="relative h-72 w-full max-w-4xl md:h-96">
          {cards.map((card, i) => (
            <Card
              key={card.src}
              src={card.src}
              to={card.to}
              rot={card.rot}
              index={i}
              progress={scrollYProgress}
              still={!!reduceMotion}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappUrl(
              "Assalam-o-Alaikum, I would like to start the admissions process."
            )}
            variant="solid"
          >
            WhatsApp Admissions Office
          </Button>
          <Button href="/contact-us/" variant="ghost-dark">
            Visit the Campus
          </Button>
        </div>
      </div>
    </section>
  );
}

function Card({
  src,
  to,
  rot,
  index,
  progress,
  still,
}: {
  src: string;
  to: number;
  rot: number;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  still: boolean;
}) {
  // Hooks cannot be called inside the map above, so each card is its own
  // component — useTransform must run unconditionally, once per card.
  const x = useTransform(progress, [0, 1], still ? [to, to] : [0, to]);
  const rotate = useTransform(progress, [0, 1], still ? [rot, rot] : [0, rot]);

  return (
    <m.div
      style={{ x, rotate, zIndex: index }}
      className="absolute left-1/2 top-0 h-full w-48 -translate-x-1/2 overflow-hidden rounded-2xl bg-paper shadow-2xl md:w-64"
    >
      <Image
        src={src}
        alt={alt.campus}
        fill
        sizes="(max-width: 768px) 192px, 256px"
        className="object-cover"
      />
    </m.div>
  );
}
