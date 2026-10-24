import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { mediaGallery2019 } from "@/data/legacy-galleries";
import { legacySize } from "@/data/legacy-media";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/media-gallery/";

export const metadata: Metadata = buildMetadata({
  title: "Media Gallery",
  description:
    "Media gallery of 2019 events at Ali Public School, Peshawar: sports days, the PAC Kamra trip, results day, dental hygiene and the launch of the college.",
  path: PATH,
});

/**
 * The legacy Media Gallery — indexed, and a top-level item in the old menu.
 * One year (2019), seven events, each linking to its post. The covers are the
 * legacy page's own images, mirrored at their original paths.
 *
 * P37 in the PLAN.md registry: an archive index — one cover beside one
 * paragraph per event, read as a list rather than browsed as a wall.
 */
export default function MediaGalleryPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Media Gallery", path: PATH }]} />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Media Gallery
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            School events from 2019. For more recent photographs, see the{" "}
            <Link href="/galleries/" className="text-maroon hover:underline">
              photo gallery
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-sand px-6 pb-20 pt-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-navy-ink/30">Year 2019</h2>
          <ul className="mt-6 space-y-8">
            {mediaGallery2019.map((entry) => (
              <li key={entry.post}>
                <Link
                  href={entry.post}
                  className="group grid gap-5 rounded-2xl border border-navy-ink/10 bg-paper p-4 transition-colors duration-150 hover:border-maroon/40 sm:grid-cols-[11rem_1fr] sm:p-5"
                >
                  <Image
                    src={entry.cover}
                    alt={entry.title}
                    {...legacySize(entry.cover)}
                    sizes="(min-width: 640px) 11rem, 100vw"
                    className="aspect-[4/3] h-auto w-full rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-ink group-hover:text-maroon">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">{entry.text}</p>
                    <span className="mt-3 inline-block font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                      View gallery →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
