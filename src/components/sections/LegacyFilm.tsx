"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

const VIDEO_ID = "WjvjoLcSjoU";
const THUMBNAIL_HD = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
// maxresdefault isn't guaranteed to exist for every upload — fall back to the
// always-available hqdefault rather than showing a broken image.
const THUMBNAIL_FALLBACK = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function LegacyFilm() {
  const [playing, setPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(THUMBNAIL_HD);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Our Legacy"
          title="Watch Our Story"
          className="text-center"
        />

        <Reveal className="relative mx-auto mt-10 aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title={`${site.name} — Our Legacy`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play the ${site.name} legacy video`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={thumbnail}
                onError={() => setThumbnail(THUMBNAIL_FALLBACK)}
                alt={`${site.name} — Our Legacy video thumbnail`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 960px"
              />

              <div className="absolute inset-0 bg-linear-to-t from-navy-ink/85 via-navy-ink/10 to-navy-ink/50 transition-colors duration-300 group-hover:from-navy-ink/75" />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-torch shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                  {!reduceMotion && (
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-torch/60"
                    />
                  )}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="relative ml-1 h-8 w-8 fill-navy-ink md:h-9 md:w-9"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-paper md:inset-x-6 md:bottom-6">
                <span>{site.name} — Legacy Film</span>
                <span className="hidden items-center gap-1.5 rounded-full border border-paper/30 px-3 py-1 text-[11px] font-medium normal-case tracking-wide text-paper/90 md:inline-flex">
                  Watch on YouTube
                </span>
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
