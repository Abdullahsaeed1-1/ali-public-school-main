import type { Metadata } from "next";
import { site } from "@/data/site";

export interface PageSeo {
  /**
   * The page's own title, without the site suffix — "Overview",
   * "Admission Policy". The `<title>` becomes `{title} - Ali Public School`,
   * the exact pattern every legacy page used (migration report §6.1 rule 4).
   * Pages that rank today keep their legacy title word for word.
   */
  title: string;
  /**
   * Unique, at most ~155 characters. The legacy site had no meta
   * descriptions at all, so every one of these is new (report §7.1).
   */
  description: string;
  /** Canonical path, legacy form: leading slash, trailing slash. */
  path: string;
  /** A full `<title>` for the rare page that does not follow the pattern (home). */
  absoluteTitle?: string;
  type?: "website" | "article";
  /** ISO date, for articles. */
  publishedTime?: string;
}

/** The suffix every legacy title carried. */
export const TITLE_SUFFIX = ` - ${site.name}`;

export function pageTitle(title: string) {
  return `${title}${TITLE_SUFFIX}`;
}

/**
 * Title, description, canonical, Open Graph and Twitter tags for one page.
 *
 * The canonical is always the page's own legacy-form URL, so every page is
 * self-canonical. `metadataBase` in the root layout turns the path into the
 * absolute https://alipublicschool.com.pk/… URL.
 *
 * Open Graph images are not set here: each route segment has a file-based
 * `opengraph-image`, which Next adds alongside these tags.
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ?? pageTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_PK",
      ...(type === "article"
        ? { type: "article", publishedTime, authors: [site.fullName] }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Trims body copy to a meta-description length on a word boundary. */
export function describe(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
