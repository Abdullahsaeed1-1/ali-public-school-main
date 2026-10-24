"use client";

import { useState } from "react";
import Image from "next/image";
import { media } from "@/data/media";

/**
 * P16 — Polaroid deck.
 *
 * A fanned stack of prints. Tapping the top one sends it to the back and the
 * next comes forward.
 *
 * `order` holds the current stacking, front first, and a tap rotates that
 * array. Keying each card by its own `src` rather than by position means React
 * moves the existing DOM node when the order changes instead of re-creating
 * it, so the CSS transition on `.polaroid` actually has something to animate —
 * and the photograph never reloads.
 *
 * The whole deck is a single button-per-card rather than one big click target,
 * so it is reachable and operable from the keyboard.
 */
const prints = [
  { src: media.students.writing, caption: "In a lesson" },
  { src: media.students.sport, caption: "On the field" },
  { src: media.classrooms.tall[0], caption: "A classroom" },
  { src: media.boysBuilding.tall[1], caption: "Boys & Senior Section" },
  { src: media.girlsBuilding.tall[3], caption: "Girls & Junior Section" },
];

// Hand-set so the fan looks dealt rather than computed.
const fan = [
  { x: 0, y: 0, r: -1 },
  { x: 26, y: 10, r: 3 },
  { x: 52, y: 20, r: -2 },
  { x: 78, y: 30, r: 4 },
  { x: 104, y: 40, r: -3 },
];

export function PolaroidDeck() {
  const [order, setOrder] = useState(prints.map((_, i) => i));

  function sendToBack() {
    setOrder(([first, ...rest]) => [...rest, first]);
  }

  return (
    <section className="overflow-hidden bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          A Day at the School
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
          Around the school
        </h2>

        <div className="relative mx-auto mt-12 h-[26rem] w-full max-w-lg md:h-[30rem]">
          {prints.map((print, printIndex) => {
            const position = order.indexOf(printIndex);
            const offset = fan[Math.min(position, fan.length - 1)];
            return (
              <button
                key={print.src}
                type="button"
                onClick={sendToBack}
                aria-label={`${print.caption} — show the next photograph`}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.r}deg)`,
                  zIndex: prints.length - position,
                }}
                className="polaroid absolute left-0 top-0 h-[22rem] w-64 cursor-pointer rounded-sm bg-paper p-3 pb-12 shadow-xl md:h-[26rem] md:w-72"
              >
                <span className="relative block h-full w-full overflow-hidden bg-sand">
                  <Image
                    src={print.src}
                    alt={print.caption}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </span>
                <span className="absolute inset-x-3 bottom-3 text-left font-sans text-xs font-medium text-navy-ink/70">
                  {print.caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
