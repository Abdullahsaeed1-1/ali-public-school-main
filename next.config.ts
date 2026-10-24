import type { NextConfig } from "next";
import {
  interimRedirects,
  legacyPaginationRedirects,
  legacyRedirects,
} from "./src/data/legacy-routes";
import { newsPosts } from "./src/data/news";

/**
 * The one host that may be indexed. Every legacy canonical was
 * https://alipublicschool.com.pk/… (apex, no www) — see the SEO migration
 * report §2.3. Anything else that serves this build (a *.vercel.app URL, a
 * preview, localhost) is sent `X-Robots-Tag: noindex` below, so a preview can
 * never compete with the real site in Google.
 */
const CANONICAL_HOST = "alipublicschool.com.pk";

const nextConfig: NextConfig = {
  // Lets a second build run without clobbering the .next directory a dev
  // server is already using. Two Next processes sharing one .next corrupt it
  // — the symptom is an unstyled 404 with a missing /_document module.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Every legacy URL ends in a slash, and so did every legacy canonical.
  // Requests without one get a single redirect to the slashed form.
  trailingSlash: true,

  images: {
    // AVIF first, WebP as the fallback for older Safari/Firefox. The source
    // photos are .webp and .jpeg; without this, next/image re-encodes to WebP
    // only and the hero poster stays ~228 KB on every device.
    formats: ["image/avif", "image/webp"],
    // Next 15 requires every non-default quality to be declared up front.
    // 60 for decorative strips, 68 for full-bleed photographs behind text,
    // 75 (the default) everywhere the photograph itself is the subject.
    qualities: [60, 68, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },

  async redirects() {
    // 301, not Next's default 308, to match the status the legacy WordPress
    // site returned for the same kind of move. Search engines treat the two
    // the same; 301 is understood by every crawler and link checker.
    const permanent = (source: string, destination: string) => ({
      source,
      destination,
      statusCode: 301 as const,
    });

    return [
      // www → apex, in one hop to the final slashed URL. Configure this at
      // the Vercel domain level as well; these rules are the fallback if the
      // www domain is ever attached directly. Three rules because the
      // captured path loses its trailing slash: files (anything with an
      // extension) go back as they came, pages get their slash restored.
      ...[
        { source: "/", destination: "/" },
        { source: "/:file(.+\\.[A-Za-z0-9]+)", destination: "/:file" },
        { source: "/:path+", destination: "/:path+/" },
      ].map(({ source, destination }) => ({
        source,
        has: [{ type: "host" as const, value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}${destination}`,
        statusCode: 301 as const,
      })),
      ...legacyRedirects.map((r) => permanent(r.source, r.destination)),
      ...legacyPaginationRedirects.map((r) => permanent(r.source, r.destination)),
      ...interimRedirects.map((r) => permanent(r.source, r.destination)),
      // The redesign's interim post URLs, one explicit rule each, straight
      // to the legacy address (no hop through /blog/).
      ...newsPosts.map((post) => permanent(`/news/${post.slug}/`, post.path)),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        missing: [{ type: "host" as const, value: CANONICAL_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
