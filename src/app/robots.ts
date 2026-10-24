import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Exactly the file the migration report specifies (§6.1 rule 9). The legacy
 * file blocked only /wp-admin/; nothing here needs blocking beyond /api/.
 *
 * Never add a blanket `Disallow: /` here to keep a preview out of Google —
 * that is done per host with an `X-Robots-Tag: noindex` header in
 * next.config.ts, which cannot leak onto the real domain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
