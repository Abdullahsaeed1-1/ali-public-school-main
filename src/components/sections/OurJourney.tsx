"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useSpring } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alt, media } from "@/data/media";

// TODO: add more milestones as Ali Uncle provides real dates — e.g. when APS
// Premier opened, notable inspections or awards. Never invent a date here.
const milestones = [
  {
    year: "2012",
    title: "A New School on Kohat Road",
    body: "Ali Public School opens its doors in the Masho Gaggar countryside, on the southern outskirts of Peshawar.",
  },
  {
    year: "Since",
    title: "Two Sections, One School",
    body: "The Girls & Junior Section and Boys & Senior Section grow side by side, welcoming children from age 3 through to F.Sc.",
  },
  {
    year: "2026",
    title: "Classrooms Built Out",
    body: "Bright, painted classrooms across both sections — the room a child actually spends the day in.",
    image: media.classrooms.wide[4],
  },
];

export function OurJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Our Journey" title="A Timeline of Growth" />

        <div ref={ref} className="relative mt-14">
          {/* The road: an asphalt-grey bed with a dashed centre stripe,
              rather than a plain rule, so the timeline reads as a path
              being travelled rather than a static line. */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-3 w-3 -translate-x-1/2 rounded-full bg-navy-ink/15 md:left-1/2"
          >
            <div
              className="road-dashes absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-torch)_0,var(--color-torch)_10px,transparent_10px,transparent_20px)]"
            />
          </div>
          <m.div
            aria-hidden
            style={{ scaleY }}
            className="absolute inset-y-0 left-3 w-3 -translate-x-1/2 origin-top rounded-full bg-leaf md:left-1/2"
          />

          <div className="space-y-14">
            {milestones.map((milestone, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={milestone.year}
                  className="relative grid grid-cols-1 gap-2 pl-10 md:grid-cols-2 md:gap-10 md:pl-0"
                >
                  <m.span
                    aria-hidden
                    initial={{ backgroundColor: "var(--color-navy-ink)", opacity: 0.2 }}
                    whileInView={{ backgroundColor: "var(--color-torch)", opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2"
                  />

                  <m.div
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    variants={fadeUp}
                    className={reverse ? "md:col-start-2" : "md:col-start-1 md:text-right"}
                  >
                    <div
                      className={`inline-block rounded-2xl bg-paper p-6 shadow-md ${
                        reverse ? "md:mr-10" : "md:ml-10"
                      }`}
                    >
                      <p className="font-display text-2xl font-semibold text-navy">
                        {milestone.year}
                      </p>
                      <p className="mt-1 font-sans text-sm font-semibold text-navy-ink">
                        {milestone.title}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-ink/70">
                        {milestone.body}
                      </p>
                    </div>
                  </m.div>

                  {milestone.image && (
                    <m.div
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportOnce}
                      variants={fadeUp}
                      className={reverse ? "md:col-start-1" : "md:col-start-2"}
                    >
                      <div
                        className={`relative aspect-4/3 w-full max-w-xs overflow-hidden rounded-2xl shadow-md ${
                          reverse ? "md:ml-10" : "md:mr-10 md:ml-auto"
                        }`}
                      >
                        <Image
                          src={milestone.image}
                          alt={alt.classroom}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 320px"
                        />
                      </div>
                    </m.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
