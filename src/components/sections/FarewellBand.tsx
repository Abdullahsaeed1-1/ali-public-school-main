import Image from "next/image";
import { media } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappUrl } from "@/data/site";

/**
 * P35 — Farewell band.
 *
 * One wide photograph and one invitation, sitting between the contact details
 * and the office hours. The last picture on the site.
 *
 * The heading is the only place the address is offered as a welcome rather
 * than as data — the same information appears as a plain line lower down the
 * page for anyone who just wants to copy it.
 */
export function FarewellBand() {
  return (
    <section className="relative isolate flex min-h-[55vh] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10">
        <Image
          src={media.girlsBuilding.wide[7]}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-ink/75" />
      </div>

      <Reveal className="mx-auto max-w-2xl py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-paper md:text-4xl">
          Come and see us.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sand/80">
          The gates are open {site.hours[0].days.toLowerCase()}. Message ahead
          and we will make time to show you round.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappUrl(
              "Assalam-o-Alaikum, I would like to arrange a visit to the campus."
            )}
            variant="solid"
          >
            Arrange a Visit
          </Button>
          <Button href={site.phoneHref} variant="ghost-light">
            {site.phone}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
