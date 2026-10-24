import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

/**
 * P17 — Ken Burns quote band.
 *
 * The one place on the site where the school's motto is given a full band to
 * itself. A single photograph under a slow, continuous push; no controls,
 * nothing to click. It exists to give the eye somewhere to rest between the
 * intro copy and the reasons that follow.
 *
 * This band previously set a Quranic verse in Arabic. The client asked for
 * that verse to come off the site, so it now carries the school's English
 * motto — the one their own About copy names as the motto they live by.
 *
 * The push is CSS (`.ken-burns` in globals.css) rather than Framer, so it runs
 * on the compositor without a main-thread tick, and stops dead under reduced
 * motion.
 *
 * The photograph is the front elevation carrying the school sign — the most
 * identifying image the school has, which is the right thing under its motto.
 * It is portrait, but `object-cover` on a 70vh band crops it to the building
 * rather than to sky.
 */
export function MottoBand() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="ken-burns relative h-full w-full">
          <Image
            src={media.schoolFront}
            alt=""
            aria-hidden
            fill
            // On a phone this band is close enough to the top to be the LCP.
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy-ink/75" />
      </div>

      <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-torch md:text-xs">
          Our Motto
        </p>

        <p className="mt-7 font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl md:text-6xl">
          {site.tagline}.
        </p>

        {/* A short rule rather than a second line of copy — the motto should
            be the last thing read in this band. */}
        <span
          aria-hidden
          className="mx-auto mt-9 block h-px w-16 bg-torch md:w-24"
        />

        <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-sand/75">
          Not a slogan on a wall. It is what we ask of the teaching, the care,
          and every child who walks through the gate.
        </p>
      </Reveal>
    </section>
  );
}
