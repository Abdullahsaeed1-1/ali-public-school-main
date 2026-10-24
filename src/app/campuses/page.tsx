import type { Metadata } from "next";
import { CampusCard } from "@/components/sections/CampusCard";
import { CurvedBand } from "@/components/sections/CurvedBand";
import { StageScroll } from "@/components/sections/StageScroll";
import { ContactSheet } from "@/components/sections/ContactSheet";
import { CampusSchematic } from "@/components/sections/CampusSchematic";
import { campuses } from "@/data/campuses";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Campuses",
  description:
    "The three sections of Ali Public School & College, Badabher, Peshawar — Girls & Junior from age 3, Boys & Senior from class 4, and APS Premier campus.",
  path: "/campuses/",
});

export default function CampusesPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Campuses
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Our Sections
          </h1>
        </div>
      </section>

      <CurvedBand />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {campuses.map((campus) => (
            <CampusCard key={campus.slug} campus={campus} />
          ))}
        </div>
      </section>


      <StageScroll />

      <ContactSheet />


      <CampusSchematic />
    </>
  );
}
