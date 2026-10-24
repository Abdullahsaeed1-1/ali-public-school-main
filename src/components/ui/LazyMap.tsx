"use client";

import { useState } from "react";

export function LazyMap({ query, title }: { query: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-navy-ink/10 bg-sand text-navy-ink transition-colors duration-150 hover:bg-sand/70"
      >
        <span className="font-display text-lg font-semibold">View on Google Maps</span>
        <span className="text-sm text-navy-ink/70">Tap to load the interactive map</span>
      </button>
    );
  }

  return (
    <iframe
      title={title}
      src={src}
      className="h-64 w-full rounded-2xl border border-navy-ink/10"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
