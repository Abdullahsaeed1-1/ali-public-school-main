import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { alt, media } from "@/data/media";

/**
 * P18 — Twin vertical ticker.
 *
 * Two columns creeping past each other in opposite directions, framed so only
 * a window of each is visible. It sits after the age-and-class table, where a
 * parent has just read a grid of numbers and the useful next thing is faces
 * from across those year groups.
 *
 * Each track holds its photographs twice; translating by exactly half the
 * track height lands on an identical copy, so the loop has no seam. The
 * animation is CSS (`.ticker-up` / `.ticker-down`) and pauses on hover.
 */
// The tracks are 3:4, so both columns are portrait photographs. Real
// pupils — recovered from an earlier photo batch (PLAN.md §2) — fit this slot
// exactly, since nothing here claims a specific age or class per photo.
const columnA = [
  media.boysPupils[0],
  media.girlsPupils[0],
  media.boysPupils[2],
  media.girlsPupils[2],
];

const columnB = [
  media.girlsPupils[4],
  media.boysPupils[4],
  media.girlsPupils[6],
  media.boysPupils[6],
];

function Track({ photos, direction }: { photos: string[]; direction: "up" | "down" }) {
  const doubled = [...photos, ...photos];
  return (
    <div className={`flex flex-col gap-4 ${direction === "up" ? "ticker-up" : "ticker-down"}`}>
      {doubled.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-3/4 w-full shrink-0 overflow-hidden rounded-xl bg-sand"
        >
          <Image
            src={src}
            alt={alt.students}
            fill
            sizes="(max-width: 768px) 45vw, 240px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function TwinTicker() {
  return (
    <section className="bg-navy-ink px-6 py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-torch">
            Every Year Group
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
            Playgroup through F.Sc, under one motto.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sand/70">
            Children join us at three and can stay until eighteen.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="relative mx-auto grid h-[26rem] w-full max-w-sm grid-cols-2 gap-4 overflow-hidden md:h-[32rem] md:w-[26rem]"
        >
          <Track photos={columnA} direction="up" />
          <Track photos={columnB} direction="down" />
          {/* Feathered top and bottom so the photographs enter and leave the
              window rather than being cut off by a hard edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy-ink via-transparent to-navy-ink"
          />
        </Reveal>
      </div>
    </section>
  );
}
