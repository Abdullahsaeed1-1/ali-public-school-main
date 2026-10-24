import { Reveal } from "@/components/ui/Reveal";
import { whyAps } from "@/data/about";

const pillars = whyAps;

export function WhyAPS() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-navy-ink md:text-3xl">
            Why families choose APS
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-transparent bg-paper p-6 shadow-sm transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-maroon/40">
                <h3 className="font-display text-lg font-semibold text-navy-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-ink/70">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
