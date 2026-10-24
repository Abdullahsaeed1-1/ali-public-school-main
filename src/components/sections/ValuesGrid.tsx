import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreValues } from "@/data/about";

export function ValuesGrid() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What We Stand For" title="Our core values" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {coreValues.map((value, i) => (
            <Reveal key={value.name} delay={i * 60}>
              {/* The school defines each of these itself (reference 3.4).
                  Eight bare words say nothing; the definitions are what make
                  the values read as the school's rather than a poster. */}
              <div className="h-full rounded-xl border border-navy-ink/10 bg-sand/50 p-6">
                <p className="font-display text-lg font-semibold text-navy-ink">
                  {value.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-ink/70">
                  {value.definition}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
