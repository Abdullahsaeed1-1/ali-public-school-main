import sizes from "./legacy-media-sizes.json";

/**
 * Intrinsic [width, height] of a mirrored legacy image, recorded by
 * `scripts/mirror-legacy-media.mjs`. Lets next/image reserve the right box,
 * so a legacy photograph never shifts the page when it loads.
 */
export function legacySize(path: string): { width: number; height: number } {
  const size = (sizes as Record<string, number[]>)[path];
  return size ? { width: size[0], height: size[1] } : { width: 1200, height: 800 };
}
