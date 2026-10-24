import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Magnetic } from "@/components/ui/Magnetic";
import { alt, media } from "@/data/media";
import { heroHeadlines } from "@/data/about";
import { site, whatsappUrl } from "@/data/site";

/**
 * One headline, revealed word by word — as MASTERPROMPT §4 specifies.
 *
 * ⚠️ Do not reintroduce the rotating headline. It cycled every five seconds,
 * and each swap painted a new text block, which the browser recorded as a new
 * largest contentful paint. LCP therefore never settled: measured on an
 * emulated mid-range Android over slow 4G it came in at **9.0 seconds**, against
 * a 2.5s budget. It is not a measurement artefact — Chrome reports the same
 * thing from real visitors, and this is a school whose parents are on 3G.
 *
 * The other two phrases it rotated through are still the school's own and are
 * used elsewhere: `heroHeadlines` keeps them together.
 *
 * This is now a server component. Nothing here needs the client any more,
 * which also removes Framer Motion from the critical path of the homepage.
 */
const headlineWords = heroHeadlines[0].split(" ");

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        {/*
          The drone film, but not the way it used to load. It previously
          carried `preload="auto"` and pulled all 2.2 MB before the page
          settled. LazyVideo paints the establishing photograph as the LCP,
          then fetches the film on the first idle callback and crossfades it
          in — so the hero is immediate and the film still plays.

          Under reduced motion the film never loads and the photograph stays.
          This is the only video on the site; a second autoplaying file is the
          quickest way to make it feel slow again.
        */}
        <LazyVideo
          src={media.heroFilm}
          poster={media.campusEstablishing}
          label={alt.campus}
          eager
          priority
          // The hero photograph sits under a navy gradient that covers most of
          // it. At full quality it was the LCP on a throttled phone; at 60 the
          // difference is invisible through the scrim.
          quality={60}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-navy-ink via-navy-ink/40 to-navy-ink/10" />

      {/*
        The reveal below is CSS-driven (see .hero-reveal in globals.css), not
        Framer Motion. It's the first content the browser paints, and a JS- or
        hydration-gated reveal here would push LCP past 4s on throttled mobile —
        CSS animations run on the compositor as soon as the stylesheet loads,
        independent of React hydration.
      */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:pl-16">
        {/* The page's one h1 names the school and the city — the brand and
            "Peshawar" queries are the rankings the homepage holds today
            (migration report §6.1 rule 6, §7.1). It keeps the eyebrow's
            styling exactly; only the element changed. The display line
            below is the visual headline, set as a paragraph. */}
        <h1 className="hero-reveal font-sans text-xs font-semibold uppercase tracking-[0.28em] text-leaf md:text-sm">
          {site.fullName}, Peshawar
        </h1>

        <p className="mt-4 max-w-3xl font-display text-hero font-semibold text-paper">
          {headlineWords.map((word, i) => (
            <span
              key={word + i}
              className="hero-reveal mr-[0.25em] inline-block"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* No reveal on this line, deliberately. It is the hero's largest
            text block and therefore the page's LCP, so any animation delay on
            it is added to the measurement directly. The headline above still
            carries the word-by-word choreography; one static line beneath it
            costs nothing to look at and 350ms to animate. */}
        <p className="mt-6 max-w-lg text-lg text-sand/90">
          Serving the families of Badabher &amp; Kohat Road since {site.foundingYear}.
        </p>

        <div
          className="hero-reveal mt-8 flex flex-wrap gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <Magnetic>
            <Button href="/academics/admission-policy/" variant="solid">
              Apply for Admission
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              href={whatsappUrl("Assalam-o-Alaikum, I'd like to know more about admissions.")}
              variant="ghost-light"
            >
              WhatsApp Us
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
