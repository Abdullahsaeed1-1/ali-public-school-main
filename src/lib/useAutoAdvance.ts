"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A self-advancing index for the rotating hero headline and the girls' section
 * slideshow.
 *
 * Both used to hold a bare `setInterval` that ran for the lifetime of the page:
 * still firing — and still re-rendering — when the section had scrolled far out
 * of view, and when the tab was in the background. On the homepage that was two
 * permanent timers waking the main thread every few seconds for no visible
 * effect.
 *
 * The timer here exists only while the section is actually on screen and the
 * tab is actually visible.
 *
 * @param length   number of items to cycle through
 * @param delayMs  time to hold on each item
 * @param enabled  pass false to freeze on the first item (reduced motion)
 */
export function useAutoAdvance(length: number, delayMs: number, enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || length < 2) return;

    const el = ref.current;
    let onScreen = true;
    let timer: number | undefined;

    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const sync = () => {
      if (onScreen && !document.hidden) {
        if (timer === undefined) {
          timer = window.setInterval(
            () => setIndex((i) => (i + 1) % length),
            delayMs
          );
        }
      } else {
        stop();
      }
    };

    const observer = el
      ? new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
          },
          { threshold: 0 }
        )
      : null;

    if (el) observer?.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled, length, delayMs]);

  return { ref, index, setIndex };
}
