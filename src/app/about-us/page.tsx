import type { Metadata } from "next";
import { AboutBanner } from "@/components/sections/AboutBanner";
import { AboutStory } from "@/components/sections/AboutStory";
import { WhatMakesUsDifferent } from "@/components/sections/WhatMakesUsDifferent";
import { Testimonials } from "@/components/sections/Testimonials";
import { ZoomOutFrame } from "@/components/sections/ZoomOutFrame";
import { ValueSlats } from "@/components/sections/ValueSlats";
import { DiagonalCollage } from "@/components/sections/DiagonalCollage";
import { OurJourney } from "@/components/sections/OurJourney";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { LeadershipMessages } from "@/components/sections/LeadershipMessages";
import { CrestExplained } from "@/components/sections/CrestExplained";
import { LegacyFilm } from "@/components/sections/LegacyFilm";
import { SectionLinks } from "@/components/content/SectionLinks";
import { aboutPages } from "@/data/legacy-pages";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "About Ali Public School & College, Badaber, Peshawar: founded in 2012, granted College status in 2019, with two sections and eight core values.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <>
      <AboutBanner />

      <AboutStory />

      <ZoomOutFrame />

      <WhatMakesUsDifferent />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-navy-ink/10 bg-paper px-6 py-4 text-center text-xs text-navy-ink/70">
          Registered with BISE Peshawar (#{site.registrations.bise}), the
          Private Schools Regulatory Authority (#{site.registrations.psra}), and
          approved for the {site.registrations.acca}.
        </div>
      </section>


      <LegacyFilm />

      <OurJourney />

      <ValuesGrid />
      <ValueSlats />
      <LeadershipMessages />
      <Testimonials />
      <CrestExplained />
      <DiagonalCollage />

      <SectionLinks
        eyebrow="About Us"
        title="In this section"
        items={[
          { label: "Welcome to Ali Public School", href: "/welcome-to-ali-public-school/" },
          ...aboutPages.map((page) => ({ label: page.title, href: page.path })),
          { label: "Principal’s Message", href: "/principals-message/" },
          { label: "Our Sections", href: "/campuses/" },
        ]}
      />
    </>
  );
}
