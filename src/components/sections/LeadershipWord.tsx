import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function LeadershipWord() {
  return (
    <section className="relative overflow-hidden bg-sand px-6 py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 z-0 -translate-x-1/2 select-none font-display text-[16rem] leading-none text-navy-ink/4 md:text-[22rem]"
      >
        &ldquo;
      </span>

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center md:pl-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          A Word From Our Principal
        </p>
        <p className="mt-6 font-display text-2xl italic leading-snug text-navy-ink md:text-3xl">
          &ldquo;Our ultimate aim is to be the foundations for enlightenment
          and guidance in the right path.&rdquo;
        </p>
        <p className="mt-4 text-sm font-medium text-navy-ink/70">
          Maj (R) Manzur Hussain Qureshi, Principal
        </p>
        <Link
          href="/about-us/"
          className="mt-8 inline-block text-sm font-semibold text-maroon hover:underline"
        >
          Read the full message →
        </Link>
      </Reveal>
    </section>
  );
}
