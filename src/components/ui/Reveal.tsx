"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant =
  | "up"
  | "fade"
  | "mask"
  | "curtain"
  | "left"
  | "right"
  | "scatter";

interface RevealProps {
  children: React.ReactNode;
  /** Milliseconds to hold before this element starts. Use for stagger. */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "section" | "li" | "figure" | "span";
  /**
   * Merged with the transition delay. The `scatter` variant reads its
   * starting offset from a `--scatter` custom property passed here, so each
   * tile in a mosaic can begin somewhere different without a class per tile.
   */
  style?: React.CSSProperties;
}

/**
 * The CSS-driven replacement for the `fadeUp` + `whileInView` pattern that
 * every section used to reach for.
 *
 * Framer Motion was being pulled into ~24 components purely to fade a heading
 * upward, which forced all of them to be client components and put the whole
 * animation engine in the initial bundle. An IntersectionObserver plus a class
 * toggle does the same job in a fraction of the code, and — because only this
 * wrapper is a client component — lets the sections around it go back to
 * rendering on the server.
 *
 * Framer Motion is still the right tool where motion is genuinely stateful:
 * crossfading slideshows (AnimatePresence), shared-element transitions
 * (layoutId), and scroll-linked parallax (useScroll). Those keep it.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or already past it) — show immediately rather
    // than leaving the content permanently at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Vertical-only margin, matching the old `viewportOnce` variant: a
      // symmetric inset also shrinks the left/right edges of the root, which
      // silently breaks the trigger for items near the sides of a row.
      { rootMargin: "-80px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal reveal-${variant}${shown ? " is-in" : ""} ${className}`}
      style={
        delay || style
          ? { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : null) }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers its children by cloning the delay down. Cheaper than nesting a
 * Reveal per child by hand, and keeps the stagger step in one place.
 */
export function RevealGroup({
  children,
  step = 80,
  start = 0,
  variant = "up",
  className = "",
}: {
  children: React.ReactNode;
  step?: number;
  start?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={i} delay={start + i * step} variant={variant}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
