"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Touch devices already have momentum scrolling from the operating system,
    // tuned to the hardware. Layering Lenis on top of it means every swipe is
    // interpolated on the main thread instead — on a mid-range Android that
    // reads as the page struggling to keep up, which was most of what "the
    // site feels slow" actually described.
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)")
      .matches;
    if (isTouch) return;

    let lenis: Lenis | undefined;
    let frameId: number;
    let observer: ResizeObserver | undefined;
    let resizeTimer: number | undefined;

    // Deferred with requestIdleCallback: Lenis's continuous rAF loop was
    // competing with hydration for main-thread time during the exact window
    // Lighthouse measures for LCP. Smooth scroll isn't needed until the user
    // actually scrolls, so it's fine to start a beat after first paint.
    const supportsIdleCallback = "requestIdleCallback" in window;
    const idleId: number = supportsIdleCallback
      ? window.requestIdleCallback(startLenis)
      : window.setTimeout(startLenis, 1);

    function startLenis() {
      // 0.1 left the page still gliding well after the wheel stopped, which
      // reads as lag rather than smoothness. 0.16 keeps the easing but lets
      // the page settle roughly where the user expects it to.
      lenis = new Lenis({ lerp: 0.16 });
      function raf(time: number) {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      }
      frameId = requestAnimationFrame(raf);

      /**
       * Lenis clamps scrolling to a content height it caches, and refreshes
       * that cache from a ResizeObserver on its content element — <html>.
       * Our <html> carries `h-full`, so its own box is exactly one viewport
       * tall and never changes size however tall <body> grows inside it. That
       * observer can therefore never fire, and Lenis keeps whatever limit it
       * measured on start-up.
       *
       * Today that limit happens to be correct: every image on the site sits
       * in a box whose size is reserved before it loads, so the document does
       * not change height after first paint (which is also why CLS measures
       * 0). Observing <body>, which does grow, is insurance for the first
       * section that does change height — an accordion, a filter, a "load
       * more" — rather than a fix for a fault seen today.
       */
      observer = new ResizeObserver(scheduleResize);
      observer.observe(document.body);

      // A photograph that decodes into an already-correct box does not resize
      // <body>, but it can still settle layout around it; and fonts swapping
      // in reflows text. Both are cheap to catch here.
      window.addEventListener("load", scheduleResize);
      document.addEventListener("load", scheduleResize, true);
    }

    // Coalesced: fifty-odd images finishing within a second of each other
    // would otherwise each force a full re-measure of the document.
    function scheduleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => lenis?.resize(), 120);
    }

    return () => {
      if (supportsIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", scheduleResize);
      document.removeEventListener("load", scheduleResize, true);
      observer?.disconnect();
      cancelAnimationFrame(frameId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
