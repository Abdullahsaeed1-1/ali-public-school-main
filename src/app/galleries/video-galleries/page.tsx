import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { videoGallery } from "@/data/legacy-galleries";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/galleries/video-galleries/";

export const metadata: Metadata = buildMetadata({
  title: "Video Galleries",
  description:
    "Videos from Ali Public School, Badaber, Peshawar: an introduction to the school, the playground, and Annual Day 2016, from the school's YouTube channel.",
  path: PATH,
});

/**
 * The legacy Video Galleries page, indexed by Google. Six of its ten YouTube
 * videos still exist and are embedded here; see `videoGallery` for the four
 * that do not.
 *
 * P39 in the PLAN.md registry: a plain embed grid. Each iframe is
 * `loading="lazy"` on YouTube's privacy-enhanced domain, so nothing loads
 * from YouTube until a video is scrolled near.
 */
export default function VideoGalleriesPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Galleries", path: "/galleries/" },
              { name: "Video Galleries", path: PATH },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Video Galleries
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            From the school&apos;s{" "}
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon hover:underline"
            >
              YouTube channel
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-sand px-6 pb-20 pt-10">
        <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {videoGallery.map((video) => (
            <li key={video.id}>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <h2 className="mt-3 font-display text-base font-semibold text-navy-ink">
                {video.title}
              </h2>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
