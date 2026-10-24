import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

// Vertical-only margin: a symmetric "-80px" also shrinks the left/right edges
// of the intersection root, which silently breaks the trigger for elements
// positioned near the sides of a horizontal row (e.g. the rightmost item in a
// 3-column stat grid on a 360px viewport never intersects at all).
export const viewportOnce = { once: true, margin: "-80px 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};
