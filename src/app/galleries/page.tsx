import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { MosaicAssemble } from "@/components/sections/MosaicAssemble";
import { SpotlightReveal } from "@/components/sections/SpotlightReveal";
import { SectionLinks } from "@/components/content/SectionLinks";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Galleries",
  description:
    "Photo and video galleries of Ali Public School & College, Badaber, Peshawar: the campus, classrooms, pupils, events and results day.",
  path: "/galleries/",
});

export default function GalleryPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Campus Life
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Galleries
          </h1>
        </div>
      </section>

      <MosaicAssemble />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <GalleryGrid />
        </div>
      </section>


      <SpotlightReveal />

      <SectionLinks
        eyebrow="The Archive"
        title="Earlier galleries"
        items={[
          { label: "Media Gallery", href: "/media-gallery/", note: "2019 events" },
          { label: "Picture Galleries", href: "/galleries/picture-galleries-till-2019/", note: "Up to 2019" },
          { label: "Video Galleries", href: "/galleries/video-galleries/", note: "From the school’s YouTube channel" },
        ]}
      />
    </>
  );
}
