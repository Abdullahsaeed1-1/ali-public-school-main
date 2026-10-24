import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { alt, media } from "@/data/media";

/**
 * P03 — Bento mosaic.
 *
 * Every tile now carries a real photograph. It previously had four tiles
 * showing the crest at 10% opacity behind a label, which read as a watermark
 * over an empty box rather than as a photograph — the placeholder convention
 * had outlived the moment it was useful. Where a subject has no photograph
 * yet, the tile is not shown at all; five real tiles beat seven with two
 * empties.
 *
 * The video tile is gone with it. The school has no film yet, and the best
 * student photograph earns that space far better than a placeholder would.
 */
interface Tile {
  label: string;
  image: string;
  alt: string;
  /** Explicit placement so the large tiles land where intended rather than
   *  wherever grid auto-placement finds room. */
  position: string;
  span?: string;
  /** Nudges the crop when the subject is not in the middle of the frame. */
  objectPosition?: string;
}

const tiles: Tile[] = [
  {
    label: "Our Campus",
    image: media.campusEstablishing,
    alt: alt.campus,
    position: "md:col-start-1 md:row-start-1",
    span: "col-span-2 row-span-2",
  },
  {
    label: "Classrooms",
    image: media.classroomSignature,
    alt: alt.classroom,
    position: "md:col-start-3 md:row-start-1",
  },
  {
    label: "The Veranda",
    image: media.veranda,
    alt: alt.boysBuilding,
    position: "md:col-start-4 md:row-start-1",
  },
  {
    label: "Sports & Play",
    image: media.students.sport,
    alt: alt.students,
    position: "md:col-start-3 md:row-start-2",
    objectPosition: "center 35%",
  },
  {
    label: "Girls & Junior Section",
    image: media.girlsBuilding.wide[2],
    alt: alt.girlsBuilding,
    position: "md:col-start-4 md:row-start-2",
  },
  {
    label: "In Class",
    image: media.students.handsUp,
    alt: alt.students,
    position: "md:col-start-5 md:row-start-1",
    span: "col-span-2 row-span-2",
  },
];

function MediaOverlay({ label }: { label: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-ink/70 via-navy-ink/0 to-transparent" />
      <span className="absolute bottom-3 left-4 font-sans text-xs font-semibold uppercase tracking-wider text-paper">
        {label}
      </span>
    </>
  );
}

export function CampusHighlights() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Life at APS
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 grid-rows-[repeat(6,140px)] gap-4 md:grid-cols-6 md:grid-rows-[repeat(2,180px)]">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.label}
              delay={i * 80}
              className={`group relative overflow-hidden rounded-2xl bg-navy/5 ${
                tile.span ?? ""
              } ${tile.position}`}
            >
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={
                  tile.objectPosition
                    ? { objectPosition: tile.objectPosition }
                    : undefined
                }
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <MediaOverlay label={tile.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
