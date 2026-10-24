"use client";

import { m, useScroll, useSpring } from "framer-motion";

export function StraightPathLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-px md:block"
    >
      <div className="absolute inset-y-0 left-0 w-px bg-navy-ink/10" />
      <m.div
        className="absolute left-0 top-0 w-px origin-top bg-leaf"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

export function StraightPathNode() {
  return (
    <m.span
      aria-hidden
      initial={{ backgroundColor: "var(--color-navy-ink)", opacity: 0.2 }}
      whileInView={{ backgroundColor: "var(--color-torch)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="absolute -left-[calc(1.5rem+3px)] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full md:block"
    />
  );
}
