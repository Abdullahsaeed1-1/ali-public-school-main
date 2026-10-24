// PARKED — not rendered anywhere right now.
//
// This section is about the Chairman and the Principal — needs their two portraits.
// Rather than fill it with whatever photograph happened to be to hand, it
// has been taken off the page until the real ones arrive. Re-import it into
// the page listed in PLAN.md when they do; the component still works.

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * P24 — Portrait strip.
 *
 * The two people who lead the school, side by side, with the name lifting into
 * view on hover.
 *
 * TODO: both portraits are the crest at low opacity, following the placeholder
 * convention. The moment real photographs arrive, drop them in `/public` and
 * set `photo` — the caption treatment and the hover already work.
 *
 * Only two entries is a short strip. That is the honest count: these are the
 * two leadership figures the school has named. It should not be padded out
 * with students standing in as staff.
 */
const people: { name: string; role: string; photo?: string }[] = [
  // TODO: the Chairman's name is still to be supplied.
  { name: "Chairman", role: "Chairman, Ali Public School & College" },
  {
    name: "Maj (R) Manzur Hussain Qureshi",
    role: "Principal",
  },
];

export function PortraitStrip() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Leadership
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {people.map((person, i) => (
            <Reveal key={person.role} delay={i * 100}>
              <figure className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-sand">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src="/logo/crest.jpeg"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-16 opacity-15"
                  />
                )}

                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-ink/90 to-transparent p-5 pt-16">
                  <p className="font-display text-lg font-semibold text-paper">
                    {person.name}
                  </p>
                  {/* Held back until hover on pointer devices, always visible
                      where hover does not exist. */}
                  <p className="mt-1 text-xs text-sand/80 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    {person.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
