"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { easeOut } from "@/lib/motion";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-navy-ink/10 rounded-2xl border border-navy-ink/10 bg-paper">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-sans text-base font-medium text-navy-ink">
                {item.question}
              </span>
              <m.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden
                className="shrink-0 text-2xl leading-none text-maroon"
              >
                +
              </m.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-navy-ink/70">
                    {item.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
