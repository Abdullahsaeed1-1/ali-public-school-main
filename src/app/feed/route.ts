import { newsPosts } from "@/data/news";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/schema";

/**
 * /feed/ — the legacy WordPress RSS feed address, kept working for any
 * reader or aggregator still subscribed. Every post, newest first.
 */
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = newsPosts
    .map((post) => {
      const url = absoluteUrl(post.path);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.categories.map((c) => `      <category>${c}</category>`).join("\n")}
      <description>${escape(post.body[0] ?? post.title)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${absoluteUrl("/")}</link>
    <atom:link href="${absoluteUrl("/feed/")}" rel="self" type="application/rss+xml" />
    <description>News and announcements from ${escape(site.fullName)}, Badaber, Peshawar</description>
    <language>en-PK</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
