import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principalsMessage } from "@/data/about";
import { site } from "@/data/site";

/**
 * The two people the school has actually named in public.
 *
 * This section used to carry a dashed "Chairman — Coming soon" box. There is no
 * Chairman: the reference (Part 9.5, Parents' Day 2016) names **Mr. Ali Afridi
 * as CEO**, and the testimonials call him "the founder". That is a real fact we
 * simply did not have before.
 *
 * A third figure, the Headmistress who heads the Girls & Junior Section, is
 * referenced throughout the school's own policies but has never been named
 * publicly — so she is named as a role, not invented as a person.
 *
 * The legacy site also carried three "teachers" — Martha Jackson, Tom Brown and
 * Lucy Allen — sharing one identical bio. They are WordPress template dummies.
 * There is no staff section here and there will not be one until the school
 * supplies real names and photographs.
 */
export function LeadershipMessages() {
  const { ceo, principal, headmistress } = site.leadership;

  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Leadership" title="Who leads the school" />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[ceo, principal, { ...headmistress, note: undefined }].map((person) => (
            <Reveal key={person.role}>
              <div className="h-full rounded-2xl border-t-2 border-torch bg-paper p-6">
                <p className="font-display text-lg font-semibold text-navy-ink">
                  {/* The Headmistress's name is not published anywhere in the
                      school's own material. Saying so beats inventing one. */}
                  {person.name ?? "To be confirmed"}
                </p>
                <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                  {person.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mx-auto mt-16 max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            Principal&apos;s Message
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-navy-ink">
            {principal.name}
          </p>

          {/* An excerpt, then the full letter on its own page — the message is
              five long paragraphs and deserves better than being buried
              mid-scroll. */}
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-navy-ink/80">
            {principalsMessage.slice(0, 2).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/principals-message/"
            className="mt-6 inline-block text-sm font-semibold text-maroon hover:underline"
          >
            Read the full message →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
