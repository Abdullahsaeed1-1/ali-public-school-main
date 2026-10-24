import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pictureGalleries } from "@/data/legacy-galleries";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/galleries/picture-galleries-till-2019/";

export const metadata: Metadata = buildMetadata({
  title: "Picture Galleries",
  description:
    "Picture galleries from Ali Public School, Peshawar, up to 2019: Founders' Day, drawing, debate and speech competitions, sports and parents' days.",
  path: PATH,
});

/**
 * The legacy picture archive: 209 of the school's own photographs, 2016–2017,
 * at their original /wp-content/uploads/ URLs.
 *
 * P38 in the PLAN.md registry: an archive contact grid — small square
 * thumbnails, each opening the full photograph. next/image lazy-loads every
 * one and requests it at thumbnail size, so the page costs only what is
 * scrolled to (report §7.1: "don't ship 417 full-size images").
 */
export default function PictureGalleriesPage() {
  const total = pictureGalleries.reduce((n, g) => n + g.images.length, 0);

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Galleries", path: "/galleries/" },
              { name: "Picture Galleries", path: PATH },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Picture Galleries
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            {total} photographs from school events up to 2019.
          </p>
          <nav aria-label="Galleries on this page" className="mt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {pictureGalleries.map((gallery, i) => (
                <li key={gallery.title}>
                  <a
                    href={`#gallery-${i + 1}`}
                    className="font-sans text-xs font-medium text-navy-ink/60 underline-offset-4 hover:text-maroon hover:underline"
                  >
                    {gallery.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="bg-sand px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-16 pt-10">
          {pictureGalleries.map((gallery, i) => (
            <section key={gallery.title} id={`gallery-${i + 1}`} className="scroll-mt-28">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold text-navy-ink">{gallery.title}</h2>
                {gallery.post && (
                  <Link
                    href={gallery.post}
                    className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon hover:underline"
                  >
                    Read the news post →
                  </Link>
                )}
              </div>
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {gallery.images.map((src, j) => (
                  <li key={src}>
                    {/* A plain link to the original file: the full photograph,
                        at its legacy URL, with no lightbox script to load. */}
                    <a href={src} className="relative block aspect-square overflow-hidden rounded-lg bg-navy-ink/5">
                      <Image
                        src={src}
                        alt={`${gallery.title}, photograph ${j + 1}`}
                        fill
                        sizes="(min-width: 768px) 9rem, 33vw"
                        quality={60}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
