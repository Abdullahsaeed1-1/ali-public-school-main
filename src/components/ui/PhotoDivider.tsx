import Image from "next/image";

/**
 * A thin full-bleed photograph used as punctuation between sections.
 *
 * **On the no-repeat rule.** PLAN.md §1 rule 3 says no media treatment is ever
 * reused. This component is the one deliberate exception, and the distinction
 * matters: the 36 patterns are *sections* — each one is a thing you stop and
 * look at. A divider is a rule, drawn in photograph instead of a hairline. It
 * has no heading, no caption, nothing to click, and you are meant to pass over
 * it. Punctuation that changed shape every time it appeared would be noise,
 * not variety.
 *
 * Kept deliberately quiet so it never competes with the sections either side:
 * short, a single scrim to sit the following section against, and a hairline
 * of torch at the base as the only mark.
 *
 * TODO: every divider currently on the site points at a portrait photograph
 * from another section, cropped to a strip. `photos/dividers-extra-wide-thin/`
 * is empty; drop genuinely wide, short images there and swap the `src` values
 * in the page files — the crops will stop needing `position` at all.
 *
 * `position` tunes the crop. Most of the photographs on the site are portrait,
 * and a portrait photograph cropped to a 4:1 strip usually lands on someone's
 * midriff unless it is told where to look.
 */
export function PhotoDivider({
  src,
  alt,
  position = "center",
  tall = false,
}: {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center 30%" to favour faces. */
  position?: string;
  /** Slightly taller band, for a divider that opens or closes a page. */
  tall?: boolean;
}) {
  return (
    <div
      aria-hidden={alt === "" ? true : undefined}
      className={`relative w-full overflow-hidden bg-navy-ink ${
        tall ? "h-40 md:h-64" : "h-28 md:h-40"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectPosition: position }}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-ink/25" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-torch/60" />
    </div>
  );
}
