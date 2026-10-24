"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { media } from "@/data/media";

/**
 * P12 — Sticky image swap.
 *
 * The photograph is pinned while four short captions scroll past it, and each
 * caption hands the frame its own image. Almost all of the section's height is
 * picture; the words are captions, not paragraphs.
 *
 * Crossfading is done by stacking all four images and animating opacity, so no
 * image is ever mounted or unmounted mid-scroll — swapping the `src` of a
 * single element would show a blank frame on every change while the next file
 * decodes.
 */
// This is the one section built around the three student photographs, because
// it is the one place where a person is genuinely the subject: a day is made of
// people doing things. Each caption is written to the photograph that carries
// it, rather than a photograph being found to fit a caption.
const moments = [
  {
    time: "8:00 AM",
    caption: "The gates open and the day begins.",
    image: media.schoolFront,
  },
  {
    time: "Morning",
    caption: "Hands up — small classes, where every child gets asked.",
    image: media.students.handsUp,
  },
  {
    time: "Midday",
    caption: "Out on the field, the loudest part of the day.",
    image: media.students.sport,
  },
  {
    time: "2:00 PM",
    caption: "Heads down, and something new learnt.",
    image: media.students.writing,
  },
];

export function DayAtAPS() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Several captions can be in the band at once mid-scroll; take the one
        // closest to the middle of the viewport rather than whichever entry
        // happened to fire last.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2)
          );
        if (visible.length === 0) return;
        const index = stepRefs.current.indexOf(visible[0].target as HTMLDivElement);
        if (index !== -1) setActive(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          A Day at APS
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative h-[60vh] md:sticky md:top-24 md:h-[70vh]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-sand shadow-xl">
              {moments.map((moment, i) => (
                <Image
                  key={moment.image}
                  src={moment.image}
                  alt={moment.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-10 py-2 md:gap-[40vh] md:py-[10vh]">
            {moments.map((moment, i) => (
              <div
                key={moment.time}
                ref={(node) => {
                  stepRefs.current[i] = node;
                }}
                // Dimming the inactive captions only makes sense while the photograph
                // is pinned beside them. Stacked on a phone, greyed-out text just
                // looks broken.
                className={`transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "md:opacity-35"
                }`}
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-torch">
                  {moment.time}
                </p>
                <p className="mt-3 font-display text-2xl leading-snug text-navy-ink md:text-3xl">
                  {moment.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
