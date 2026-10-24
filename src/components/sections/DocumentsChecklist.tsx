import { Reveal } from "@/components/ui/Reveal";
import { requiredDocuments, whatWeOffer } from "@/data/admissions";

/**
 * The documents checklist (reference 4.2, verbatim) and the provision list the
 * school repeats across its own admissions notices (reference 9.3).
 *
 * Both were missing from the site entirely — a parent could not find out what
 * to bring.
 */
export function DocumentsChecklist() {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <Reveal>
        <h3 className="font-display text-xl font-semibold text-navy-ink">
          What to bring
        </h3>
        <p className="mt-2 text-sm text-navy-ink/60">
          Collect an application form directly from the school, complete it, and
          return it with the following:
        </p>
        <ul className="mt-6 space-y-4">
          {requiredDocuments.map((doc, i) => (
            <li key={doc} className="flex gap-4 text-sm text-navy-ink/80">
              <span className="font-display text-sm font-semibold text-torch">
                {String(i + 1).padStart(2, "0")}
              </span>
              {doc}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={100}>
        <h3 className="font-display text-xl font-semibold text-navy-ink">
          What we offer
        </h3>
        <p className="mt-2 text-sm text-navy-ink/60">
          The provision the school lists in its own admissions notices.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {whatWeOffer.map((item) => (
            <li
              key={item}
              className="rounded-full bg-sand px-4 py-1.5 font-sans text-xs font-medium text-navy-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
