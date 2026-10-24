import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { principalsMessage } from "@/data/about";
import { alt, media } from "@/data/media";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Principal's Message",
  description:
    "A message from Maj (R) Manzur Hussain Qureshi, Principal of Ali Public School & College on Kohat Road, Peshawar, on quality, character and community.",
  path: "/principals-message/",
});

/**
 * The Principal's message in full, verbatim.
 *
 * MASTERPROMPT §4 asks for this as its own page rather than a truncated card,
 * and it is right to: it is the single strongest piece of writing the school
 * owns. The page is therefore set as a letter — one column, generous measure,
 * nothing competing with the words.
 *
 * TODO: the legacy site carried a portrait of the Principal. We do not have
 * that file. Rather than put a stranger's face or a crest watermark in its
 * place, the page opens on the school itself.
 */
export default function PrincipalsMessagePage() {
  const { principal } = site.leadership;

  return (
    <>
      <section className="relative isolate flex min-h-[45vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={media.schoolFront}
            alt={alt.campus}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-ink/75" />
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 pb-14 pt-40">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-torch">
            Leadership
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-paper md:text-5xl">
            Principal&apos;s Message
          </h1>
        </div>
      </section>

      <article className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            {/* The opening paragraph set larger — it is the thesis of the
                whole letter, and the school's own first sentence. */}
            <p className="font-display text-xl leading-relaxed text-navy-ink md:text-2xl">
              {principalsMessage[0]}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-navy-ink/85">
              {principalsMessage.slice(1).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <footer className="mt-12 border-t border-navy-ink/15 pt-6">
              <p className="font-display text-lg font-semibold text-navy-ink">
                {principal.name}
              </p>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                {principal.role}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-ink/60">
                {principal.note} He has led Ali Public School since{" "}
                {principal.since}.
              </p>
            </footer>
          </Reveal>
        </div>
      </article>
    </>
  );
}
