"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Block } from "@/components/content/Blocks";
import Link from "next/link";
import { policies, policyPaths } from "@/data/policies";
import { easeOut } from "@/lib/motion";

/**
 * The nine policies, in full, one accordion row each.
 *
 * The existing `Accordion` in components/ui only takes a question and an
 * answer string; these are long structured documents with headings, ordered
 * and unordered lists, and timetable tables. Rather than flatten them into
 * prose — MASTERPROMPT §4 says explicitly not to summarise them — this
 * renders the typed block list from `data/policies.ts`.
 *
 * Each row is a real `<h2>` wrapping a `<button>`, so the page still has a
 * proper document outline for a screen reader with everything collapsed.
 */
export function PolicyAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="divide-y divide-navy-ink/10 border-y border-navy-ink/10">
      {policies.map((policy) => {
        const open = openSlug === policy.slug;
        return (
          <div key={policy.slug} id={policy.slug} className="scroll-mt-28">
            <h2>
              <button
                type="button"
                onClick={() => setOpenSlug(open ? null : policy.slug)}
                aria-expanded={open}
                aria-controls={`${policy.slug}-panel`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span>
                  <span className="block font-display text-lg font-semibold text-navy-ink md:text-xl">
                    {policy.title}
                  </span>
                  <span className="mt-1 block text-sm text-navy-ink/60">
                    {policy.summary}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`mt-1 shrink-0 text-2xl leading-none text-maroon transition-transform duration-200 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h2>

            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={`${policy.slug}-panel`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-10 pr-2">
                    {policy.blocks.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}
                    {policyPaths[policy.slug] && (
                      <Link
                        href={policyPaths[policy.slug]}
                        className="mt-8 inline-block font-sans text-xs font-semibold uppercase tracking-wider text-maroon hover:underline"
                      >
                        Open this policy as its own page →
                      </Link>
                    )}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
