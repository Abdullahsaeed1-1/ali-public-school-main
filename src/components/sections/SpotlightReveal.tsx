"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { alt, media } from "@/data/media";

/**
 * P33 — Spotlight reveal.
 *
 * One photograph held under a dark veil, lit only where the pointer falls.
 * The closing image of the Gallery: after a wall of thumbnails, a single
 * picture you have to look around to see.
 *
 * The veil is a separate layer above the photograph with a radial mask punched
 * through it, so only one copy of the image is ever loaded. The lit position
 * rides in as `--mx` / `--my` custom properties set from the pointer, written
 * straight to the element in a rAF rather than through React state — moving
 * the mouse should not re-render a component tree sixty times a second.
 *
 * On touch, where there is no pointer to follow, the spotlight drifts slowly on
 * its own so the section is not simply a dark rectangle. Under reduced motion
 * the veil is dropped entirely and the photograph is shown plainly.
 */
export function SpotlightReveal() {
  const veilRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const [bare, setBare] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBare(true);
      return;
    }

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;

    // No pointer to follow — trace a slow lissajous so the spotlight keeps
    // moving over the photograph rather than sitting in the middle.
    let start: number | undefined;
    const drift = (t: number) => {
      start ??= t;
      const e = (t - start) / 1000;
      const el = veilRef.current;
      if (el) {
        el.style.setProperty("--mx", `${50 + 28 * Math.sin(e * 0.35)}%`);
        el.style.setProperty("--my", `${50 + 22 * Math.sin(e * 0.24)}%`);
      }
      frameRef.current = requestAnimationFrame(drift);
    };
    frameRef.current = requestAnimationFrame(drift);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = veilRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    });
  }, []);

  return (
    <section className="bg-sand px-6 pb-20">
      <div
        onMouseMove={bare ? undefined : handleMove}
        className="relative mx-auto h-[50vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-navy-ink md:h-[65vh]"
      >
        <Image
          src={media.students.handsUp}
          alt={alt.students}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
        />

        {!bare && (
          <div
            ref={veilRef}
            aria-hidden
            className="spotlight-veil absolute inset-0 bg-navy-ink/90"
          />
        )}

        {/* No caption telling the reader to move their cursor. If an
            interaction needs instructions it is the interaction that is
            wrong, and a hint like that on every page reads as a demo. */}
      </div>
    </section>
  );
}
