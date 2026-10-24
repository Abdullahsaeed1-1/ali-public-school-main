import Image from "next/image";
import { alt, media } from "@/data/media";

/**
 * P34 — Ambient header loop.
 *
 * A near-still clip running quietly behind the Contact page title. Shorter and
 * calmer than the homepage hero: this page exists to be acted on, so the
 * picture stays in the background and the phone number stays the point.
 *
 * A photograph, not film: the school has no video yet. When a gate-at-arrival
 * clip arrives this is the right place for it, with this photograph as the
 * poster.
 */
export function AmbientHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="relative isolate flex min-h-[45vh] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={media.girlsBuilding.wide[6]}
          alt={alt.campus}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-ink/70" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 pb-14 pt-40 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-torch">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-paper md:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
