import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";

/**
 * P05 — Infinite marquee.
 *
 * Real photographs of pupils and a teacher visiting the APS Premier campus —
 * recovered from an earlier photo batch (see PLAN.md §2), not the placeholder
 * treatment this section briefly carried in between.
 */
const photos = media.premierVisit;

// Duplicated so the marquee loops seamlessly — the track scrolls exactly one
// full set width (translateX(-50%)) before snapping back to an identical copy.
const track = [...photos, ...photos];

export function PremierVisit() {
  return (
    <section className="overflow-hidden bg-sand px-6 py-20">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          APS Premier
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-ink">
          A Visit From Our APS Family
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
          When APS Premier opened its doors, our students paid a visit to
          explore their new sister campus — a proud day for the whole APS
          family.
        </p>
      </Reveal>

      <div className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-6">
          {track.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl shadow-xl sm:h-96 sm:w-72"
            >
              <Image
                src={src}
                alt="APS students visiting the newly opened APS Premier campus"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 224px, 288px"
              />
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-12 text-center">
        <Button href="https://apspremier.com" variant="ghost-dark">
          Visit APS Premier
        </Button>
      </Reveal>
    </section>
  );
}
