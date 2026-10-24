import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";

/**
 * P25 — Mosaic assemble.
 *
 * Nine tiles that arrive from scattered positions and settle into a grid as
 * the page opens. It heads the Gallery, where the subject genuinely is "a lot
 * of photographs" — the assembling is the page introducing itself.
 *
 * Each tile's starting offset rides in as a `--scatter` custom property rather
 * than a class per tile, so the scatter is authored as data. The offsets are
 * hand-set: an evenly computed spread settles too tidily and reads as a
 * loading animation instead of photographs being laid out.
 */
// Square tiles. Classrooms sit in a square crop without losing their subject,
// which is why the whole grid is rooms rather than a mixture.
const tiles = [
  { src: media.classrooms.wide[3], scatter: "translate(-40px, -30px) rotate(-6deg)" },
  { src: media.classrooms.wide[4], scatter: "translate(0, -50px) rotate(4deg)" },
  { src: media.classrooms.wide[5], scatter: "translate(45px, -25px) rotate(7deg)" },
  { src: media.classrooms.wide[6], scatter: "translate(-50px, 10px) rotate(5deg)" },
  { src: media.classrooms.wide[7], scatter: "translate(0, 45px) rotate(-3deg)" },
  { src: media.classrooms.wide[8], scatter: "translate(50px, 15px) rotate(-7deg)" },
  { src: media.classrooms.wide[9], scatter: "translate(-35px, 40px) rotate(6deg)" },
  { src: media.classrooms.wide[10], scatter: "translate(10px, 55px) rotate(-5deg)" },
  { src: media.classrooms.wide[11], scatter: "translate(40px, 35px) rotate(3deg)" },
];

export function MosaicAssemble() {
  return (
    <section className="overflow-hidden bg-sand px-6 pb-4 pt-8">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 md:gap-3">
        {tiles.map((tile, i) => (
          <Reveal
            key={tile.src}
            variant="scatter"
            delay={i * 60}
            style={{ "--scatter": tile.scatter } as React.CSSProperties}
            className={`relative aspect-square overflow-hidden rounded-lg bg-navy/5 ${
              // Three of the nine are hidden on a phone. Nine squares at 390px
              // is three full rows of decoration before any real content.
              i >= 6 ? "hidden sm:block" : ""
            }`}
          >
            <Image
              src={tile.src}
              alt=""
              aria-hidden
              fill
              // No priority. This strip is decorative and aria-hidden; the
              // gallery grid beneath it is the actual content, and giving the
              // decoration a head start made it the LCP on a 1.1 MB page.
              loading="lazy"
              quality={60}
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 300px"
              className="object-cover"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
