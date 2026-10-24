"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only margin — see the comment on viewportOnce in lib/motion.ts:
  // a symmetric margin clips the trigger zone for elements near the left/
  // right edges of a horizontal row (this counter can be the rightmost item
  // in a 3-column grid).
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, motionValue, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
