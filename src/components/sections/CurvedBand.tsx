import Image from "next/image";
import { alt, media } from "@/data/media";

/**
 * P28 — Curved-edge band.
 *
 * The establishing shot at the top of Campuses. Its lower edge is a wide,
 * shallow ellipse rather than a straight rule, so the photograph hands over to
 * the page below instead of stopping dead against it.
 *
 * TODO: this wants one wide shot with all three sections in frame. The campus
 * building is the closest thing currently in `/public`.
 */
export function CurvedBand() {
  return (
    <section className="bg-sand">
      {/* Deliberately not wrapped in a Reveal: this is the first thing on the
          page, and fading it in from opacity 0 delays the largest contentful
          paint by the length of the fade. */}
      <div className="curve-bottom relative h-[45vh] w-full overflow-hidden md:h-[60vh]">
          <Image
            src={media.campusEstablishing}
            alt={alt.campus}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        <div className="absolute inset-0 bg-navy-ink/25" />
      </div>
    </section>
  );
}
