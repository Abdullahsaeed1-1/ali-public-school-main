"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LazyVideoProps {
  src: string;
  /** Optional smaller cut served to narrow screens. Falls back to `src`. */
  srcMobile?: string;
  poster: string;
  /** Describes the footage for screen readers. */
  label: string;
  /**
   * Set only for a video that is already on screen at first paint (the hero).
   * Eager videos skip the intersection wait and start loading on the first
   * idle callback instead — after the page has painted, never before.
   */
  eager?: boolean;
  /** Marks the poster as the LCP image. Use on the hero only. */
  priority?: boolean;
  className?: string;
  posterClassName?: string;
  sizes?: string;
  /** Poster encoding quality. Lower it when a scrim sits over the image. */
  quality?: number;
}

/**
 * A video that costs nothing until it is about to be watched.
 *
 * The two videos on the site used to carry `preload="auto"`, so every visitor
 * downloaded 2.7 MB — the 2.2 MB hero film and the 524 KB "Life at APS" clip —
 * before the page settled, on connections that are frequently 3G. The clip
 * isn't even on screen at that point.
 *
 * Here the poster paints first and the <video> element is not mounted at all
 * until it is either idle-time (eager) or close to the viewport, so nothing is
 * requested until then. Under `prefers-reduced-motion` the video never mounts:
 * an autoplaying loop is exactly the motion that preference exists to stop.
 */
export function LazyVideo({
  src,
  srcMobile,
  poster,
  label,
  eager = false,
  priority = false,
  className = "",
  posterClassName = "",
  sizes,
  quality,
}: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const pick = () =>
      srcMobile && window.matchMedia("(max-width: 767px)").matches
        ? srcMobile
        : src;

    if (eager) {
      // Above the fold already — the only thing worth waiting for is the
      // first paint, so hand the fetch to the idle queue rather than racing
      // hydration for bandwidth.
      const start = () => setSource(pick());
      // Held in a plain boolean rather than re-testing with `in`: the second
      // test narrows `window` to `never` and the fallback branch stops
      // type-checking, even though Safari genuinely lacks the API.
      const idle = typeof window.requestIdleCallback === "function";
      const id = idle
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 300);

      return () => {
        if (idle) window.cancelIdleCallback(id);
        else window.clearTimeout(id);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSource(pick());
          observer.disconnect();
        }
      },
      // Start the fetch a screen early so the clip is usually ready by the
      // time it scrolls into view.
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, src, srcMobile]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={label}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`object-cover transition-opacity duration-700 ${
          playing ? "opacity-0" : "opacity-100"
        } ${posterClassName}`}
      />

      {source && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={label}
          // Reveal on `playing`, not `canplay`: iOS Low Power Mode blocks
          // autoplay yet still fires canplay, which used to fade in a paused
          // video with Safari's play button over it. If playback never
          // starts, the poster simply stays.
          onPlaying={() => setPlaying(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={source} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
