import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { careers } from "@/data/academics";
import { site, whatsappUrl } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Careers at Ali Public School & College, Kohat Road, Peshawar: teaching and support roles, competitive salaries and free transport for female staff.",
  path: "/careers/",
});

/**
 * MASTERPROMPT §4: replace the legacy site's "download a Word doc, install
 * Adobe Reader" instructions with a simple modern flow.
 *
 * The email route below is not invented — it is exactly what the school's own
 * recruitment posts have said since 2016 (reference 9.5): send a CV, put the
 * position in the subject line.
 */
export default function CareersPage() {
  const subject = "Application — [position]";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Work With Us
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Careers
          </h1>
        </div>
      </section>

      <section className="bg-sand px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-ink/90">
              {careers.intro}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <ul className="space-y-3">
              {careers.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm text-navy-ink/80">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-torch" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Applying" title="How to apply" />

          <ol className="mt-10 space-y-6">
            {careers.howToApply.map((step, i) => (
              <Reveal key={step} as="li" delay={i * 70} className="flex gap-5">
                <span className="font-display text-2xl font-semibold text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-navy-ink/80">
                  {step}
                </span>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={220} className="mt-10 flex flex-wrap gap-4">
            <Button href={mailto} variant="solid">
              Email Your CV
            </Button>
            <Button
              href={whatsappUrl(
                "Assalam-o-Alaikum, I would like to ask about working at Ali Public School."
              )}
              variant="ghost-dark"
            >
              Ask on WhatsApp
            </Button>
          </Reveal>

          {/* TODO: the school has not published a list of current openings.
              Saying so is better than an empty "Current Vacancies" heading. */}
          {careers.openRoles === null && (
            <Reveal delay={280}>
              <p className="mt-10 rounded-2xl border border-navy-ink/10 bg-sand/60 p-6 text-sm leading-relaxed text-navy-ink/70">
                We do not keep a published list of open positions. Speculative
                applications are welcome at any time — send your CV with the
                position you are interested in, and the office will be in touch
                if something suitable comes up.
              </p>
            </Reveal>
          )}

          <Reveal delay={320}>
            <p className="mt-6 text-sm text-navy-ink/70">
              Prefer a form? The Word and PDF job application forms are on the{" "}
              <Link href="/careers/vacancies/" className="text-maroon hover:underline">
                Vacancies
              </Link>{" "}
              page.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
