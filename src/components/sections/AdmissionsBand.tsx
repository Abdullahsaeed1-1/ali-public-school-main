import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { inspiredLearning } from "@/data/about";
import { whatsappUrl } from "@/data/site";

const steps = ["Visit / WhatsApp", "Registration", "Assessment", "Enrolment"];

export function AdmissionsBand() {
  return (
    <section className="border-t-2 border-torch bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Admissions
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-ink">
            Joining APS is simple.
          </h2>
          {/* The school's own "Inspired Learning" line (reference 2.8), which
              had not made it onto the new site at all. */}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
            {inspiredLearning.body[0]}
          </p>
          {/* Verbatim from the legacy home page (reference 2.8). Google shows
              this exact sentence as the homepage snippet for "Ali Public
              School and College Peshawar admission" (migration report §5.1).
              ⚠️ Confirm the class range with the school (PLAN.md §0, Q6). */}
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-navy-ink/80">
            {inspiredLearning.admissionsOpen}
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step} as="li" delay={80 + i * 80} className="rounded-xl bg-sand p-5">
              <span className="font-display text-2xl font-semibold text-navy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-sans text-sm font-medium text-navy-ink">
                {step}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={160} className="mt-10 flex flex-wrap gap-4">
          <Button href="/academics/admission-policy/" variant="solid">
            See Full Admissions Process
          </Button>
          <Button
            href={whatsappUrl(
              "Assalam-o-Alaikum, I would like to start the admissions process."
            )}
            variant="ghost-dark"
          >
            WhatsApp Admissions Office
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
