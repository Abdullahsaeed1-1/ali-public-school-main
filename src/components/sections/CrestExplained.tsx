import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const crestParts = [
  {
    label: "The Shield",
    swatch: "bg-navy",
    description:
      "The navy shield is the base of our crest — a symbol of protection and a stable foundation for every child who studies here.",
  },
  {
    label: "The Wreath",
    swatch: "bg-leaf",
    description:
      "Two branches of green wrap around the shield like a wreath of achievement — growth, not just grades, is what we're building.",
  },
  {
    label: "The Torch",
    swatch: "bg-torch",
    description:
      "A single flame in gold sits at the top of the crest, standing for the light of knowledge that guides every student forward.",
  },
  {
    label: "The Motto",
    swatch: "bg-maroon",
    description: `"${site.tagline}" — the promise the whole school is measured against, and the line that sits at the heart of everything we do.`,
  },
];

export function CrestExplained() {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[280px_1fr] md:items-center">
        <Reveal className="mx-auto w-48 md:w-full">
          <Image
            src="/logo/crest.jpeg"
            alt={`${site.name} crest — a navy shield with a green wreath and a gold torch`}
            width={280}
            height={280}
            className="mx-auto h-auto w-auto rounded-2xl"
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our Crest"
            title="Every mark on it means something"
          />

          <div className="mt-8 space-y-6">
            {crestParts.map((part, i) => (
              <Reveal key={part.label} delay={i * 80} className="flex gap-4">
                <span
                  aria-hidden
                  className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${part.swatch}`}
                />
                <div>
                  <p className="font-display text-lg font-semibold text-navy-ink">
                    {part.label}
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-navy-ink/70">
                    {part.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
