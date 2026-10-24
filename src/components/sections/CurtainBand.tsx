import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { alt, media } from "@/data/media";

/**
 * P13 — Curtain reveal.
 *
 * A single wide photograph that unmasks left-to-right as it enters the
 * viewport, closing the homepage. No overlay text and no controls: after the
 * admissions call to action, the last thing on the page should be the school
 * itself rather than another thing to read.
 *
 * The unmask is the shared `Reveal` component's `curtain` variant — a
 * clip-path transition, so it composites rather than repainting, and it is
 * disabled wholesale under reduced motion along with every other reveal.
 */
export function CurtainBand() {
  return (
    <section className="bg-paper pb-20">
      <Reveal variant="curtain">
        <div className="relative h-[45vh] w-full md:h-[65vh]">
          <Image
            src={media.girlsBuilding.wide[4]}
            alt={alt.campus}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
