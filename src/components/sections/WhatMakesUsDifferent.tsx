import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatMakesUsDifferent } from "@/data/about";

/**
 * The school's own three-part answer to "why here?" (reference 3.1), which the
 * legacy site published on its Overview page and which had not made it onto
 * the new site at all.
 *
 * Note the Teaching and learning paragraph: the legacy version says results are
 * achieved by "boys from across a broad range of ability". The school is
 * co-educational with a full Girls Section, so it reads **students** here —
 * MASTERPROMPT §4 calls this out explicitly as an error not to carry over.
 */
export function WhatMakesUsDifferent() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Our Approach" title="What makes us different" />

        <div className="mt-10 space-y-12">
          {whatMakesUsDifferent.map((item, i) => (
            <Reveal key={item.heading} delay={i * 80}>
              <h3 className="font-display text-xl font-semibold text-navy-ink">
                {item.heading}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-navy-ink/80">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
