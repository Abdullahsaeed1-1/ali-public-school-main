import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";

/**
 * P31 — Video contact sheet.
 *
 * Six frames laid out like a photographer's proof sheet, for the Boys & Senior
 * Section.
 *
 * All six are stills. The school has no film yet; when clips arrive this is
 * the natural place for them, and LazyVideo can replace any frame in turn.
 */
interface Frame {
  poster: string;
  label: string;
}

// Six landscape frames, all photographs. The sheet previously mixed two
// looping clips with four stills; there is no film yet, so it is six stills.
const frames: Frame[] = [
  { poster: media.veranda, label: "The veranda" },
  { poster: media.boysBuilding.wide[1], label: "The courtyard" },
  { poster: media.boysBuilding.wide[2], label: "The block" },
  { poster: media.classrooms.wide[0], label: "A classroom" },
  { poster: media.classrooms.wide[1], label: "Ready for the morning" },
  { poster: media.students.handsUp, label: "In a lesson" },
];

export function ContactSheet() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Boys &amp; Senior Section
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Six frames from the section
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {frames.map((frame, i) => (
            <Reveal
              key={frame.label}
              delay={i * 70}
              className="group relative aspect-4/3 overflow-hidden rounded-xl bg-navy/5"
            >
              <Image
                src={frame.poster}
                alt={frame.label}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-ink/70 to-transparent" />
              <span className="pointer-events-none absolute bottom-2 left-3 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-paper md:text-xs">
                {frame.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
