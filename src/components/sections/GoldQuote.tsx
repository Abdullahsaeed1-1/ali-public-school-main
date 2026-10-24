"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

/**
 * P36 — Interactive quote canvas.
 *
 * The school's own phrase, rendered as a field of particles that scatter away
 * from the pointer and drift back. The words are the school's: "we 'mine for
 * gold' in each child" appears in their own copy on the About page, and the
 * treatment takes it literally — most of the field is navy so the sentence
 * stays legible, with roughly one particle in seven in gold, the flecks in the
 * ore the line is about.
 *
 * It sits on the site's own sand ground rather than a dark panel. A navy block
 * behind the type made the section read as a widget dropped onto the page
 * instead of part of it.
 *
 * How it works: the quote is drawn once to an offscreen canvas, that bitmap is
 * sampled on a grid, and every opaque pixel becomes a particle whose home is
 * that pixel. Each frame the particles are pushed out of a radius around the
 * pointer and pulled back toward home by a spring.
 *
 * Performance — this is the only continuously-animating canvas on the site, so
 * it is fenced in on every side:
 *
 *   - The loop runs only while the section is on screen AND the tab is
 *     visible. Scrolling past it stops the loop entirely, it does not idle.
 *   - Particle state lives in Float32Arrays, not objects, so a frame allocates
 *     nothing and there is no garbage to collect mid-animation.
 *   - Drawing is two `fillStyle` changes and N `fillRect`s, rather than N
 *     style changes; the sample step adapts to width and the count is capped.
 *   - Device pixel ratio is capped at 2 — a 3x phone would triple the fill
 *     cost for no visible gain.
 *   - Under `prefers-reduced-motion`, and on any touch device, no canvas is
 *     created at all: the quote renders as ordinary text and nothing animates.
 *
 * The canvas is `aria-hidden` and the quote is always in the DOM as real text
 * for screen readers, so the words never exist only as pixels.
 */

const LINES = ["We mine for gold", "in each child."];

const MAX_PARTICLES = 2600;
const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 900;
const SPRING = 0.055;
const FRICTION = 0.86;

export function GoldQuote() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }

    // The entire point of this treatment is that the words move away from the
    // pointer. A touch device has no pointer to move away from, so the effect
    // never fires — and the phone pays for it twice: a couple of thousand
    // springs run for nothing, and the quote is rasterised at around 30px,
    // where Cinzel's strokes are thinner than the particle grid and the words
    // come out visibly ragged. Plain type is both faster and better looking
    // here, so touch devices get the quote set as type, exactly as reduced
    // motion already does. (Lenis is skipped on touch for the same reason.)
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setStill(true);
      return;
    }

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      setStill(true);
      return;
    }

    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let accent = new Uint8Array(0);
    let count = 0;
    let dot = 2;

    let frame: number | undefined;
    let onScreen = false;
    let disposed = false;

    // Kept off-screen so the pointer has no effect until it actually enters.
    const pointer = { x: -9999, y: -9999 };

    function displayFont() {
      // next/font generates a hashed family name, so the CSS variable cannot be
      // used in a canvas font string. Read the family the browser actually
      // resolved for the heading font instead.
      const probe = document.createElement("span");
      probe.className = "font-display";
      probe.style.cssText = "position:absolute;visibility:hidden";
      wrap!.appendChild(probe);
      const family = getComputedStyle(probe).fontFamily || "serif";
      probe.remove();
      return family;
    }

    function build() {
      if (disposed) return;
      const rect = wrap!.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = Math.floor(cssW * dpr);
      canvas!.height = Math.floor(cssH * dpr);
      canvas!.style.width = `${cssW}px`;
      canvas!.style.height = `${cssH}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw the quote once into a scratch canvas at CSS pixel scale, then
      // read it back as a bitmap to sample.
      const scratch = document.createElement("canvas");
      // Rasterise the quote at device scale, not at one CSS pixel per pixel.
      // At 1x a 36px Cinzel stroke is about three pixels wide and most of that
      // width is antialiasing, so an `alpha > 128` test threw nearly all of it
      // away and the sampler found no particles down the middle of thin
      // letters — which is what made the words look chopped on a phone.
      const S = Math.min(2, Math.max(1, dpr));
      scratch.width = Math.floor(cssW * S);
      scratch.height = Math.floor(cssH * S);
      const sctx = scratch.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      // Draw in CSS coordinates regardless of the scale we rasterise at.
      sctx.scale(S, S);

      const family = displayFont();
      sctx.fillStyle = "#fff";
      sctx.textAlign = "center";
      sctx.textBaseline = "middle";

      // Fit the longest line to the box rather than trusting a ratio. At a
      // ratio alone the quote overran a narrow phone and the ends of "We mine
      // for gold" were simply cut off by the canvas edge.
      const maxTextWidth = cssW * 0.92;
      let size = Math.min(132, Math.max(30, cssW * 0.105));
      sctx.font = `600 ${size}px ${family}`;
      const widest = Math.max(...LINES.map((l) => sctx.measureText(l).width));
      if (widest > maxTextWidth) {
        size = Math.floor(size * (maxTextWidth / widest));
        sctx.font = `600 ${size}px ${family}`;
      }
      const lineHeight = size * 1.18;

      const top = cssH / 2 - ((LINES.length - 1) * lineHeight) / 2;
      LINES.forEach((line, i) => {
        sctx.fillText(line, cssW / 2, top + i * lineHeight);
      });

      const sw = scratch.width;
      const data = sctx.getImageData(0, 0, scratch.width, scratch.height).data;

      // Always start fine and let the cap below widen the step. Sampling used
      // to start at 4 on screens under 640px, which was exactly backwards: a
      // phone renders this quote at around 36px, where Cinzel's strokes are
      // only three or four pixels wide, so a 4px grid missed whole segments of
      // them and the letters came out visibly chopped. The small screen is the
      // one that needs the finest grid; the big screen is where the particle
      // cap has to pull the step back out, and the loop below does that on its
      // own.
      let step = 2;
      let sampled: number[] = [];
      for (let attempt = 0; attempt < 4; attempt++) {
        sampled = [];
        for (let y = 0; y < cssH; y += step) {
          for (let x = 0; x < cssW; x += step) {
            // Sample in CSS space but read the higher-resolution bitmap.
            // The threshold is deliberately low: everything but the ground is
            // text, so partial coverage still means "this is part of a letter",
            // and demanding near-opacity is what dropped the thin strokes.
            const sx = Math.floor(x * S);
            const sy = Math.floor(y * S);
            if (data[(sy * sw + sx) * 4 + 3] > 64) sampled.push(x, y);
          }
        }
        if (sampled.length / 2 <= MAX_PARTICLES) break;
        step += 1;
      }

      count = sampled.length / 2;
      // Slightly wider than the grid it sits on, so neighbouring particles
      // touch and a stroke reads as a stroke rather than a dotted line.
      dot = Math.max(2, step * 1.12);

      // How much of the field is gold. One in seven reads as flecks of ore at
      // desktop size, where a stroke is a dozen pixels across — but the same
      // ratio on a phone, where the quote sets at about 36px and Cinzel's
      // strokes are three pixels wide, punches a hole clean through nearly
      // every letter and the words look broken. Thin type gets fewer flecks.
      const accentEvery = size < 56 ? 15 : size < 90 ? 11 : 7;

      px = new Float32Array(count);
      py = new Float32Array(count);
      hx = new Float32Array(count);
      hy = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      accent = new Uint8Array(count);

      for (let i = 0; i < count; i++) {
        const x = sampled[i * 2];
        const y = sampled[i * 2 + 1];
        hx[i] = x;
        hy[i] = y;
        px[i] = x;
        py[i] = y;
        // Most of the field is navy so the words stay legible; a scattered
        // minority is gold — the flecks in the ore the line is about, at the
        // rate chosen above for this text size. Deterministic, so the pattern
        // doesn't reshuffle on resize.
        accent[i] = i % accentEvery === 0 ? 1 : 0;
      }
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.clearRect(0, 0, w / dpr, h / dpr);

      // Two passes so fillStyle is set twice per frame rather than per particle.
      for (let pass = 0; pass < 2; pass++) {
        ctx!.fillStyle = pass === 0 ? "#0c2154" : "#e9b44c";
        for (let i = 0; i < count; i++) {
          if (accent[i] !== pass) continue;
          ctx!.fillRect(px[i], py[i], dot, dot);
        }
      }
    }

    function tick() {
      for (let i = 0; i < count; i++) {
        const dx = px[i] - pointer.x;
        const dy = py[i] - pointer.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / REPEL_RADIUS) * (REPEL_STRENGTH / dist);
          vx[i] += (dx / dist) * force * 0.016;
          vy[i] += (dy / dist) * force * 0.016;
        }

        vx[i] = (vx[i] + (hx[i] - px[i]) * SPRING) * FRICTION;
        vy[i] = (vy[i] + (hy[i] - py[i]) * SPRING) * FRICTION;
        px[i] += vx[i];
        py[i] += vy[i];
      }
      draw();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
        frame = undefined;
      }
    }

    function sync() {
      if (onScreen && !document.hidden && !disposed) {
        if (frame === undefined) frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    }

    function handlePointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function handleLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    let resizeTimer: number | undefined;
    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (frame === undefined) draw();
      }, 200);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );

    // The sampled bitmap is only correct once the display face has actually
    // loaded — sampling against the fallback would freeze the fallback's
    // letterforms into the particle field.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (disposed) return;
      build();
      draw();
      observer.observe(wrap!);
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("resize", handleResize);
      canvas!.addEventListener("pointermove", handlePointer);
      canvas!.addEventListener("pointerleave", handleLeave);
      sync();
    });

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section className="border-y border-navy-ink/10 bg-sand px-6 py-24 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div
          ref={wrapRef}
          className="relative h-64 w-full sm:h-72 md:h-[26rem]"
        >
          {still ? (
            <p className="flex h-full items-center justify-center text-center font-display text-3xl font-semibold leading-tight text-navy-ink md:text-5xl">
              {LINES.join(" ")}
            </p>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                aria-hidden
                // No touch-action override: this canvas only follows the pointer, it never
                // owns a gesture, and `touch-action: none` here swallowed
                // any swipe that started on the words.
                className="absolute inset-0 h-full w-full"
              />
              {/* The words must exist as text, not only as pixels. */}
              <p className="sr-only">{LINES.join(" ")}</p>
            </>
          )}
        </div>

        <p className="mt-6 text-center font-sans text-xs font-semibold uppercase tracking-[0.24em] text-navy-ink/40">
          {site.fullName}
        </p>
      </div>
    </section>
  );
}
