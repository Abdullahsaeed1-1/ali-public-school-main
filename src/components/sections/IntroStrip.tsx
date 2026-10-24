import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { introduction } from "@/data/about";
import { site } from "@/data/site";

/**
 * Only numbers the school can defend.
 *
 * A "500+ Students" counter used to sit in the middle slot. The school has
 * never published a student count anywhere — MASTERPROMPT §4 is explicit:
 * "Do NOT put a student count here until the school gives you one." It has
 * been replaced with the year College status was granted, which is a fact the
 * school states itself.
 */
const stats = [
  {
    value: new Date().getFullYear() - site.foundingYear,
    suffix: "+",
    label: "Years Serving",
  },
  { value: site.collegeStatusYear, suffix: "", label: "College Status" },
  { value: 3, suffix: "", label: "Sections" },
];

export function IntroStrip() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          {/* The school's own sentence, from its INTRODUCTION section
              (reference 2.4), rather than our paraphrase of it. */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-navy-ink/90">
            We live by our motto in delivering quality education at the doorstep
            of the community we serve. We &lsquo;mine for gold&rsquo; in each
            child, encouraging them to succeed on the pathway that&rsquo;s right
            for them.
          </p>
          {/* The opening of the school's INTRODUCTION (reference 2.4),
              verbatim. Google builds the homepage's search snippet from this
              passage today; it must stay in the server-rendered homepage
              (migration report §6.1 rule 7). */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-navy-ink/70">
            {introduction[0].split(". ").slice(0, 3).join(". ")}.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-semibold text-navy">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-wider text-navy-ink/70">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
