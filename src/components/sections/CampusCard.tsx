import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LazyMap } from "@/components/ui/LazyMap";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import type { Campus } from "@/data/campuses";

export function CampusCard({ campus }: { campus: Campus }) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-navy-ink/10 bg-paper">
      <article>
        {/* A campus without a photograph gets a plain tinted panel with its
            initials, not the crest at low opacity. The watermark treatment
            read as a broken image. */}
        <div className="relative flex h-56 w-full items-center justify-center bg-navy-ink/5">
          {campus.photo ? (
            <Image
              src={campus.photo}
              alt={`The ${campus.name} at Ali Public School`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <span
              aria-hidden
              className="font-display text-4xl font-semibold tracking-[0.2em] text-navy-ink/25"
            >
              APS
            </span>
          )}
        </div>

        <div className="p-6">
          <h2 className="font-display text-xl font-semibold text-navy-ink">
            {campus.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-ink/70">
            {campus.brief}
          </p>
          <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-navy-ink/70">
            {campus.timings}
          </p>

          <div className="mt-6">
            {campus.external && campus.href ? (
              <Button href={campus.href} variant="ghost-dark">
                Visit {campus.name}
              </Button>
            ) : (
              <LazyMap query={site.address} title={`Map to ${campus.name}`} />
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
