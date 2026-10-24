"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

const SESSION_KEY = "aps-splash-shown";
/** Matches the 0.95s hold + 0.6s lift in the .splash keyframes, plus a beat. */
const TOTAL_MS = 1620;

/**
 * The arrival sequence: the crest starts as a drained outline and fills with
 * its own colour from the bottom up, then the whole panel lifts away to hand
 * over to the page underneath.
 *
 * The fill IS the loading indicator — there is no separate progress bar,
 * because two things filling at once read as a widget rather than an arrival.
 *
 * Three things keep it from becoming an obstacle:
 *
 *   - It mounts only after hydration, so the server-rendered page is already
 *     in the document and paints behind it.
 *   - It runs once per browser session, so navigating home again — or coming
 *     back from the admissions page — doesn't replay it.
 *   - It is skipped entirely under prefers-reduced-motion. Not shortened:
 *     skipped, because a full-screen panel sliding upward is the whole effect.
 *
 * Note that a ~1.2s opaque cover does push out a measured Largest Contentful
 * Paint on a cold first visit. That is the deliberate cost of the sequence,
 * traded for the arrival the school asked for, and it is paid only once per
 * session.
 */
export function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Private browsing and locked-down site-data settings can make
    // sessionStorage throw on access, not just return null.
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Treat an unreadable store as "not shown" — worst case the splash
      // plays again on a later navigation, which is far better than a crash.
    }
    if (alreadyShown) return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Non-fatal: the splash simply isn't remembered for this session.
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, TOTAL_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className="splash" aria-hidden>
      <div className="relative h-32 w-32 md:h-40 md:w-40">
        {/* The drained outline underneath… */}
        <Image
          src="/logo/crest.jpeg"
          alt=""
          fill
          loading="eager"
          sizes="160px"
          className="splash-crest-base object-contain"
        />
        {/* …and the same crest at full colour, revealed from the bottom up. */}
        <Image
          src="/logo/crest.jpeg"
          alt=""
          fill
          loading="eager"
          sizes="160px"
          className="splash-crest-fill object-contain"
        />
      </div>

      <div className="text-center">
        <p className="splash-word font-display text-sm font-semibold uppercase tracking-[0.3em] text-navy-ink md:text-base">
          {site.name}
        </p>
        <p className="splash-tag mt-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-maroon md:text-[0.7rem]">
          {site.tagline}
        </p>
      </div>
    </div>
  );
}
