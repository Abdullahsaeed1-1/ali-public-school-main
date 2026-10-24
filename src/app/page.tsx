import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { IntroStrip } from "@/components/sections/IntroStrip";
import { MottoBand } from "@/components/sections/MottoBand";
import { WhyAPS } from "@/components/sections/WhyAPS";
import { DayAtAPS } from "@/components/sections/DayAtAPS";
import { GoldQuote } from "@/components/sections/GoldQuote";
import { BoysCampusShowcase } from "@/components/sections/BoysCampusShowcase";
import { CampusHighlights } from "@/components/sections/CampusHighlights";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { PremierVisit } from "@/components/sections/PremierVisit";
import { GirlsCampusShowcase } from "@/components/sections/GirlsCampusShowcase";
import { ArcCluster } from "@/components/sections/ArcCluster";
import { LeadershipWord } from "@/components/sections/LeadershipWord";
import { AdmissionsBand } from "@/components/sections/AdmissionsBand";
import { CurtainBand } from "@/components/sections/CurtainBand";
import { buildMetadata } from "@/lib/metadata";
import { jsonLd, schoolSchema, websiteSchema } from "@/lib/schema";

/**
 * The legacy title was "Home - Ali Public School", but for the brand query
 * Google already displays "Ali Public School: Home - Peshawar". That form is
 * used as-is — the smallest change, and the one Google has chosen itself
 * (migration report §6.1 rule 4). Do not rewrite it.
 */
export const metadata: Metadata = buildMetadata({
  title: "Home",
  absoluteTitle: "Ali Public School: Home - Peshawar",
  description:
    "Ali Public School & College, Badaber, Peshawar: quality education from playgroup to college since 2012, in Girls & Junior and Boys & Senior sections.",
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* School + WebSite (migration report §7.0). The schema itself lives
          in src/lib/schema.ts, shared with the contact page. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schoolSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      <Hero />
      <IntroStrip />
      <MottoBand />
      <WhyAPS />
      <DayAtAPS />
      <GoldQuote />
      <BoysCampusShowcase />
      <CampusHighlights />
      <GalleryPreview />
      <PremierVisit />
      <GirlsCampusShowcase />
      <LeadershipWord />
      <ArcCluster />
      <AdmissionsBand />
      <CurtainBand />
    </>
  );
}
