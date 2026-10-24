import { Reveal } from "@/components/ui/Reveal";
import { allocationPolicy, entryRequirements } from "@/data/admissions";

/**
 * The school's two published entry rules.
 *
 * This replaces an "Age & class guide" table that gave an age range for every
 * class from Playgroup to Class 10. The school has never published those
 * ranges — they were invented, which MASTERPROMPT §0 rule 1 forbids outright.
 * What the school does publish is below, in its own words.
 */
export function EntryRequirements() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {entryRequirements.map((item, i) => (
          <Reveal key={item.stage} delay={i * 90}>
            <div className="h-full rounded-2xl border-t-2 border-torch bg-paper p-6">
              <p className="font-display text-lg font-semibold text-navy-ink">
                {item.stage}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-ink/75">
                {item.rule}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={180} className="mt-8">
        <ul className="space-y-3">
          {allocationPolicy.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-navy-ink/70">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
              {line}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
