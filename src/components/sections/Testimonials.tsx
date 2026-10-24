import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/about";

/**
 * P37 — Stacked pull-quotes.
 *
 * Real parents and a past tutor, in their own words (reference 2.9). These are
 * among the strongest things the school owns — one of them says the quiet part
 * out loud: "All the other schools in the area are just working for business
 * and have no cause of educating the area's children."
 *
 * Deliberately typographic. A testimonial with a stock headshot beside it reads
 * as marketing; a testimonial set as a quotation reads as a quotation. We have
 * no photographs of these parents and will not borrow someone else's face.
 *
 * The reference maps testimonials to the homepage. They sit on About instead:
 * the homepage already runs to twelve screens on a phone, and these belong with
 * the story rather than above the admissions call to action.
 */
export function Testimonials() {
  return (
    <section className="bg-navy-ink px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-torch">
            Parents Say
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
            In their words
          </h2>
        </Reveal>

        <div className="mt-12 space-y-12">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 90}>
              <figure className="border-l-2 border-torch pl-6 md:pl-8">
                <blockquote>
                  <p className="font-display text-lg italic leading-relaxed text-paper md:text-xl">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-sand/60">
                  {testimonial.name} · {testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
