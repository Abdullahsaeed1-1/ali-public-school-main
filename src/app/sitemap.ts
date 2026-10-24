import type { MetadataRoute } from "next";
import { aboutPages, academicsPages, vacanciesPage } from "@/data/legacy-pages";
import { legacyCategories, legacyTags, newsPosts } from "@/data/news";
import { footerLinks } from "@/data/site";
import { absoluteUrl } from "@/lib/schema";

/**
 * /sitemap.xml — every indexable, self-canonical URL and nothing else: no
 * redirect sources, no retired demo URLs, no feed. All absolute, https,
 * apex host, trailing slash (migration report §6.1 rule 10). The old Yoast
 * sitemap URLs (/sitemap_index.xml and the child sitemaps) 301 here.
 *
 * `lastModified` is given only where there is a real date — a post's
 * publication date. Stamping every page with the build time would tell
 * Google that 120 pages changed on every deploy, which is not true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pagePaths = new Set<string>([
    "/",
    ...footerLinks.map((link) => link.href),
    "/academics/admission-policy/",
    ...aboutPages.map((page) => page.path),
    ...academicsPages.map((page) => page.path),
    vacanciesPage.path,
    ...legacyCategories.map((category) => `/category/${category.slug}/`),
    ...legacyTags.map((tag) => `/tag/${tag.slug}/`),
  ]);

  const pages: MetadataRoute.Sitemap = [...pagePaths].map((path) => ({
    url: absoluteUrl(path),
  }));

  const posts: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: absoluteUrl(post.path),
    lastModified: post.date,
  }));

  return [...pages, ...posts];
}
