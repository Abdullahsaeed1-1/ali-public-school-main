@AGENTS.md

# Ali Public School website — project conventions

> **Read `PLAN.md` in the repository root first.** It holds the media-first
> rebuild plan: the performance rules, the 35-pattern registry (no treatment is
> ever reused — this is a hard rule), the page-by-page composition, build
> status, and the list of facts the school has not supplied yet. This file
> covers conventions only.

## Fonts
- Display/headings (`font-display`, `--font-cinzel`): **Cinzel**. No italic face exists on Google Fonts — italic treatments (pull-quotes) rely on the browser's synthetic oblique, which is acceptable here.
- Body/UI (`font-sans`, `--font-montserrat`): **Montserrat**.
- Defined in `src/lib/fonts.ts`, wired into the theme via `--font-display` / `--font-sans` in `src/app/globals.css`.
- **No Arabic face.** Amiri and the `font-arabic` token were removed along with the Quranic verse they set — the client asked for that verse to come off the site. Do not reintroduce Arabic copy anywhere. (The crest artwork itself still carries the verse; changing that means re-drawing the logo file.)

## Language
All user-facing copy is **British English**, per the client's preference. Common swaps to watch for when adding copy: enrolment/enrol (not enrollment/enroll), fulfilment (not fulfillment), organise/realise/recognise (not -ize), colour/favour/honour when it's prose (never touch `backgroundColor`, `border-color`, etc. — those are CSS/JS property names, not copy), towards (not toward), practise (verb) vs practice (noun) if it ever comes up. Don't blanket-replace "color" — only English prose words, never code identifiers or Tailwind classes.

## Design direction
- Prefer image-forward sections over dense paragraphs — the client wants more visual variety and will keep adding real photos to `/public`. When a new section needs a photo that doesn't exist yet, use the existing placeholder pattern (crest at low opacity on a tinted background — see `CampusHighlights.tsx`, `GalleryPreview.tsx`) rather than leaving a broken image or inventing a stock photo.
- Motion/animation should run throughout the site (Framer Motion is the standard tool — see `src/lib/motion.ts` for shared variants), but stay within the existing restraint rules: max one parallax effect per viewport, everything must degrade correctly under `prefers-reduced-motion` (see `MotionConfig reducedMotion="user"` in `src/app/layout.tsx`, plus the manually-gated raw motion values in `Counter.tsx` and `GalleryPreview.tsx` that `MotionConfig` doesn't cover).
- The homepage hero headline rotates through a few short taglines (`src/components/sections/Hero.tsx`) — the Quranic motto above it stays fixed; only the headline cycles, with a smooth crossfade, and pauses entirely under reduced motion.

