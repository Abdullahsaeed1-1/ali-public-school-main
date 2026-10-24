"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";

/**
 * Framer Motion's feature set, loaded once for the whole tree.
 *
 * Importing `motion` pulls the entire animation engine into any component that
 * touches it — which used to be about two dozen of them, most only to fade a
 * heading upward. Those now use the CSS `Reveal` wrapper instead, and what is
 * left imports `m`: the same component API without the bundled features. The
 * features arrive once, here.
 *
 * `domMax` rather than the lighter `domAnimation` because the navbar underline
 * and the gallery lightbox are shared-element (`layoutId`) transitions, which
 * live in the layout-animation feature set.
 *
 * `strict` makes a stray `motion.div` throw rather than silently reintroducing
 * the full bundle — the mistake this file exists to prevent.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
