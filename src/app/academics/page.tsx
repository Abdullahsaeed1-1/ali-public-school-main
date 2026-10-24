import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { examRhythm, provision, qualifications, subjects } from "@/data/academics";
import { extracurricular } from "@/data/about";
import { annualEvents } from "@/data/news";
import { SectionLinks } from "@/components/content/SectionLinks";
import { policyFooterLinks } from "@/data/legacy-pages";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Academics",
  description:
    "Academics at Ali Public School, Peshawar: the Oxford syllabus, subjects to F.Sc., BISE exams, and every school policy, rule and term calendar.",
  path: "/academics/",
});

/**
 * The legacy site had no academics page; MASTERPROMPT §4 asks for one built
 * from what is scattered across it. Every fact here traces to the reference —
 * see the notes in `src/data/academics.ts`.
 */
export default function AcademicsPage() {
  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
            What We Teach
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-ink md:text-5xl">
            Academics
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-ink/70">
            The {site.syllabus}, from age 3 through to F.Sc. at 18 — examined
            by {site.boards}.
          </p>
        </div>
      </section>

      {/* Subjects — the honest list, taken from the actual homework timetables */}
      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Curriculum" title="Subjects" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-navy-ink/10 bg-navy-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, i) => (
              <Reveal key={subject.name} delay={i * 40} className="bg-paper p-5">
                <p className="font-display text-base font-semibold text-navy-ink">
                  {subject.name}
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-wider text-navy-ink/50">
                  {subject.stage}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs text-navy-ink/50">
            Taken from the school&apos;s own published homework timetables. The
            full timetables are on the{" "}
            <Link href="/academics/homework-policy/" className="text-maroon hover:underline">
              School Policies
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* What the school provides */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Provision" title="What we offer" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {provision.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-transparent bg-sand/60 p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-maroon/40">
                  <h3 className="font-display text-base font-semibold text-navy-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-ink/70">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The year's rhythm — structure only, because the published dates are
          six years old. See the note in data/academics.ts. */}
      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="The Year" title="How the session is shaped" />
          <ol className="mt-10 space-y-8">
            {examRhythm.map((exam, i) => (
              <Reveal key={exam.name} as="li" delay={i * 70} className="flex gap-5">
                <span className="font-display text-2xl font-semibold text-torch">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-navy-ink">
                    {exam.name}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                    {exam.when}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-navy-ink/70">
                    {exam.detail}
                  </span>
                </span>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 text-xs leading-relaxed text-navy-ink/50">
            {/* TODO: the school must supply the current session's dates. The
                2019–2020 and 2017–2019 calendars stay at their legacy URLs
                because Google has them indexed, but only as clearly marked
                archives — they are not presented as current. */}
            Exact dates for the current session are issued by the school office
            and are available on {site.phone}. Past calendars are kept in the{" "}
            <Link
              href="/academics/school-terms-and-holiday-dates-for-the-academic-year-2019-2020/"
              className="text-maroon hover:underline"
            >
              archive
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Life beyond lessons — the recurring calendar the archive proves,
          not a list of events we made up. */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Beyond Lessons"
            title="Co-curricular life"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-ink/80">
            {extracurricular.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {extracurricular.sports.map((sport) => (
              <span
                key={sport}
                className="rounded-full bg-sand px-4 py-1.5 font-sans text-xs font-medium text-navy-ink"
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-navy-ink/10 bg-navy-ink/10 sm:grid-cols-2">
            {annualEvents.map((event, i) => (
              <Reveal key={event.name} delay={i * 50} className="bg-sand/60 p-6">
                <p className="font-display text-base font-semibold text-navy-ink">
                  {event.name}
                </p>
                <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-torch">
                  {event.when}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-ink/70">
                  {event.detail}
                </p>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-xs text-navy-ink/50">
            Drawn from the school&apos;s own{" "}
            <Link href="/blog/" className="text-maroon hover:underline">
              news archive
            </Link>
            , 2015 to 2022.
          </p>
        </div>
      </section>

      {/* Every legacy /academics/… page, linked from its hub. The old
          /academics/ page was empty; these are the pages Google has indexed
          beneath it (migration report §6.2). */}
      <SectionLinks
        eyebrow="Policies & Information"
        title="Admissions, rules and school policies"
        items={policyFooterLinks}
      />

      {/* Boards and registrations */}
      <section className="bg-navy-ink px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-torch">
              Examinations
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
              Boards &amp; registrations
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {qualifications.map((q, i) => (
              <Reveal key={q.name} delay={i * 70}>
                <div className="h-full rounded-2xl border-t-2 border-torch bg-paper/5 p-6">
                  <p className="font-display text-base font-semibold text-paper">
                    {q.name}
                  </p>
                  <p className="mt-2 text-sm text-sand/70">{q.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
