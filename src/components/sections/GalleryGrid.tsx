"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/gallery";
import { easeOut } from "@/lib/motion";

const aspectClass: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
};

function TileMedia({ item }: { item: (typeof galleryItems)[number] }) {
  // No fallback branch: every gallery item carries a real photograph now.
  // The old one drew the crest at 10% opacity over an empty tile, which read
  // as a watermark rather than as a picture.
  return (
    <Image
      src={item.image}
      alt={item.alt}
      fill
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0VCREQiLz48L3N2Zz4="
      className="object-cover"
      sizes="(max-width: 768px) 50vw, 33vw"
    />
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filtered =
    filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter);
  const selected = galleryItems.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selected) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {(["All", ...galleryCategories] as const).map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "border-leaf bg-leaf text-navy-ink"
                  : "border-navy-ink/15 text-navy-ink/70 hover:border-navy-ink/30"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-2 gap-4 sm:columns-3">
        {filtered.map((item) => (
          <m.button
            key={item.id}
            type="button"
            aria-label={`Open photo: ${item.caption}`}
            layoutId={`gallery-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl ${
              aspectClass[item.aspect]
            } ${selectedId === item.id ? "invisible" : ""}`}
          >
            <TileMedia item={item} />
          </m.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-ink/90 p-6"
            onClick={() => setSelectedId(null)}
          >
            <m.div
              layoutId={`gallery-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-4/3 w-full max-w-2xl overflow-hidden rounded-2xl bg-sand"
            >
              <TileMedia item={selected} />
              <p className="absolute inset-x-0 bottom-0 bg-navy-ink/70 px-4 py-3 text-sm text-paper">
                {selected.caption}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-ink/70 text-paper"
              >
                ×
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
