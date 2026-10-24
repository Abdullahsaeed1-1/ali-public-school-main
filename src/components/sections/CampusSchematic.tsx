import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

/**
 * P26 — Pinned callouts.
 *
 * The three sections hung off a single road, echoing the straight-path motif
 * that runs through the rest of the site.
 *
 * Deliberately a schematic and not a map. Drawing a stylised Kohat Road with
 * pins in particular places would be inventing geography the school has not
 * confirmed — the Google Maps pin is still an open question (see PLAN.md §8).
 * What this does show is true: three sections, one road, one school.
 */
const pins: {
  name: string;
  detail: string;
  photo?: string;
  href?: string;
}[] = [
  {
    name: "Girls & Junior Section",
    detail: "Age 3 to Class 8",
    photo: media.girlsBuilding.wide[5],
  },
  {
    name: "Boys & Senior Section",
    detail: "Class 4 to F.Sc",
    photo: media.boysBuilding.wide[3],
  },
  {
    name: "APS Premier",
    detail: "A separate campus",
    href: "https://apspremier.com",
  },
];

export function CampusSchematic() {
  return (
    <section className="bg-navy-ink px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-leaf">
            {site.tagline}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-paper md:text-3xl">
            Three sections, one road
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-sand/70">
            {site.shortLocation}
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* The road, echoing the dashed centre stripe on the About timeline. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-6 hidden h-1 w-[85%] -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_right,var(--color-torch)_0,var(--color-torch)_12px,transparent_12px,transparent_26px)] opacity-60 md:block"
          />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {pins.map((pin, i) => {
              const body = (
                <>
                  <span
                    aria-hidden
                    className="relative z-10 mx-auto hidden h-4 w-4 rounded-full border-4 border-navy-ink bg-torch md:block"
                  />
                  {/* APS Premier has no photograph, so its pin is the ring
                      alone rather than the crest dropped in as filler. An
                      empty ring reads as a place on the road; a watermark
                      reads as a missing image. */}
                  <span className="relative mx-auto mt-6 flex aspect-square w-36 items-center justify-center overflow-hidden rounded-full ring-2 ring-torch/40 md:w-40">
                    {pin.photo ? (
                      <Image
                        src={pin.photo}
                        alt={pin.name}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="font-display text-3xl font-semibold text-torch/50"
                      >
                        APS
                      </span>
                    )}
                  </span>
                  <span className="mt-5 block font-display text-lg font-semibold text-paper">
                    {pin.name}
                  </span>
                  <span className="mt-1 block font-sans text-xs uppercase tracking-wider text-sand/60">
                    {pin.detail}
                  </span>
                </>
              );

              return (
                <Reveal key={pin.name} delay={i * 110} className="group text-center">
                  {pin.href ? (
                    <Link
                      href={pin.href}
                      className="block rounded-2xl outline-offset-4"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
