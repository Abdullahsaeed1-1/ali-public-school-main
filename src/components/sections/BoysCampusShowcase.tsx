import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { sections } from "@/data/about";
import { alt, media } from "@/data/media";

// Two shots of the block, then real boys — recovered from an earlier photo
// batch (PLAN.md §2) — for a section that is literally about growing up here.
const photos = [
  { src: media.boysBuilding.tall[4], tilt: "-rotate-2", alt: alt.boysBuilding },
  { src: media.boysPupils[1], tilt: "rotate-1", alt: alt.students },
  { src: media.boysBuilding.tall[0], tilt: "rotate-2", alt: alt.boysBuilding },
  { src: media.students.writing, tilt: "-rotate-1", alt: alt.students },
  { src: media.boysPupils[7], tilt: "rotate-1", alt: alt.students },
  { src: media.boysPupils[8], tilt: "-rotate-2", alt: alt.students },
];

export function BoysCampusShowcase() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Boys &amp; Senior Section
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Growing Up at APS
          </h2>
          {/* The school's own words (reference 3.3 / 6.1), with the 2019
              future tense rewritten to the present as MASTERPROMPT §4 asks. */}
          <p className="mt-4 text-sm leading-relaxed text-navy-ink/70">
            {sections.boysSenior.intro}
          </p>
        </Reveal>

        <div className="mt-10 columns-2 gap-4 sm:columns-3">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 80} className="mb-4">
              {/* Straighten-on-hover was a Framer `whileHover`; as a plain CSS
                  transition it behaves identically and costs no JavaScript. */}
              <div
                className={`relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-paper shadow-lg transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] ${photo.tilt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href="/campuses/" variant="ghost-dark">
            Explore the Boys &amp; Senior Section
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
