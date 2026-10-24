import type { Metadata } from "next";
import { AdmissionsTimeline } from "@/components/sections/AdmissionsTimeline";
import { DuoVideoSplit } from "@/components/sections/DuoVideoSplit";
import { EntryRequirements } from "@/components/sections/EntryRequirements";
import { DocumentsChecklist } from "@/components/sections/DocumentsChecklist";
import { PolaroidDeck } from "@/components/sections/PolaroidDeck";
import { TwinTicker } from "@/components/sections/TwinTicker";
import { CardPeel } from "@/components/sections/CardPeel";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blocks } from "@/components/content/Blocks";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { admissionFaqs, admissionsIntro } from "@/data/admissions";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Admission Policy",
  description:
    "Admission policy and how to apply at Ali Public School & College, Peshawar: entrance tests, eligibility, required documents and the 2020-21 brochure.",
  path: "/academics/admission-policy/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: admissionFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function AdmissionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Admissions
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Admission Policy
          </h1>
          {/* Verbatim, reference 4.2 — the school's own opening line. */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
            {admissionsIntro}
          </p>
        </div>
      </section>

      <DuoVideoSplit />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="The Process" title="Four steps to enrolment" />
          <div className="mt-10">
            <AdmissionsTimeline />
          </div>
        </div>
      </section>


      <PolaroidDeck />

      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Eligibility" title="Who we admit" />
          <div className="mt-10">
            <EntryRequirements />
          </div>
        </div>
      </section>

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Applying" title="How to apply for a place at Ali Public School" />
          <div className="mt-10">
            <DocumentsChecklist />
          </div>
          {/* The legacy page's brochure download, at its original URL. It is
              the 2020–2021 brochure — labelled as such, not as current.
              ⚠️ Replace it, or remove the link, when the school supplies a
              current prospectus (PLAN.md §12). */}
          <div className="mt-12 rounded-2xl border border-navy-ink/10 bg-paper p-6">
            <h3 className="font-display text-lg font-semibold text-navy-ink">
              Ali Public School &amp; College Brochure (2020-2021 Session)
            </h3>
            <Blocks
              blocks={[
                {
                  kind: "downloads",
                  items: [
                    {
                      label: "Download the brochure",
                      href: "/wp-content/uploads/2020/03/APS-Brochure-2020-2021-Session.pdf",
                      format: "PDF",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      <TwinTicker />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-10">
            <Accordion items={admissionFaqs} />
          </div>
        </div>
      </section>

      <CardPeel />

      <MobileStickyBar />
    </>
  );
}
