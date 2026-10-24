import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { alt, media } from "@/data/media";

/**
 * P19 — Expanding slats.
 *
 * Narrow vertical panels that open when pointed at. All eight core values get
 * a slat — none are dropped to make the row fit, because a selection would be
 * arbitrary and the values are the school's own list.
 *
 * Eight panels across one row would leave each about 12% of the width, too
 * narrow for the photograph inside to read as anything. They run as two rows
 * of four instead, and stack to a plain grid on narrow screens where hover
 * does not exist at all.
 *
 * The open state is `flex-grow` on hover and focus-within, so a keyboard user
 * tabbing through opens the same panel a mouse user would.
 */
// Narrow panels crop hard, so every one of these is either a portrait
// photograph or a classroom - a room survives a tight crop, a face does not.
const slats = [
  { value: "Kindness", image: media.classrooms.wide[0] },
  { value: "Responsibility", image: media.classrooms.tall[0] },
  { value: "Integrity", image: media.classrooms.wide[3] },
  { value: "Selflessness", image: media.classrooms.wide[6] },
  { value: "Personal Industry", image: media.classrooms.tall[1] },
  { value: "Resilience", image: media.classrooms.wide[8] },
  { value: "Initiative", image: media.classrooms.wide[10] },
  { value: "Moral Courage", image: media.classrooms.wide[12] },
];

function SlatRow({ items, start }: { items: typeof slats; start: number }) {
  return (
    <div className="flex h-64 gap-2 md:h-80">
      {items.map((slat, i) => (
        <Reveal
          key={slat.value}
          delay={start + i * 70}
          className="group relative flex-1 overflow-hidden rounded-xl transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[2.5] focus-within:flex-[2.5]"
        >
          <Image
            src={slat.image}
            alt={alt.campus}
            fill
            sizes="(max-width: 768px) 50vw, 22vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-ink/85 via-navy-ink/20 to-transparent" />
          <p className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-paper md:text-base">
            {slat.value}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

export function ValueSlats() {
  return (
    <section className="bg-navy-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-torch">
            In Practice
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
            What the values look like
          </h2>
        </Reveal>

        <div className="mt-10 space-y-2">
          <SlatRow items={slats.slice(0, 4)} start={0} />
          <SlatRow items={slats.slice(4)} start={140} />
        </div>
      </div>
    </section>
  );
}
