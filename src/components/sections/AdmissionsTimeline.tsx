"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { admissionSteps } from "@/data/admissions";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function AdmissionsTimeline() {
  const ref = useRef<HTMLOListElement>(null);
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
    <ol ref={ref} className="relative space-y-12 pl-10">
      <span
        aria-hidden
        className="absolute inset-y-1 left-3 w-px bg-navy-ink/10"
      />
      <m.span
        aria-hidden
        style={{ scaleY }}
        className="absolute inset-y-1 left-3 w-px origin-top bg-leaf"
      />

      {admissionSteps.map((step, i) => (
        <m.li
          key={step.title}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative"
        >
          <m.span
            initial={{ backgroundColor: "var(--color-navy-ink)", opacity: 0.2 }}
            whileInView={{ backgroundColor: "var(--color-torch)", opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4 }}
            aria-hidden
            className="absolute -left-10 top-1 h-3 w-3 rounded-full"
          />
          <p className="font-display text-lg font-semibold text-navy-ink">
            {String(i + 1).padStart(2, "0")} — {step.title}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            {step.description}
          </p>
        </m.li>
      ))}
    </ol>
  );
}
