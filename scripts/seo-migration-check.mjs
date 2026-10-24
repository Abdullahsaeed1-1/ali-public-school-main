/**
 * SEO migration check — run against a production build before launch.
 *
 *   npx next build && npx next start -p 3111
 *   node scripts/seo-migration-check.mjs                       # http://localhost:3111
 *   node scripts/seo-migration-check.mjs https://staging.example # any deployment
 *
 * Every request is sent with `Host: alipublicschool.com.pk` (override with
 * --host=…), so the server answers exactly as it will on the real domain —
 * including the rule that only that host is indexable.
 *
 * Checks, all over raw HTTP with redirects NOT followed:
 *   1. every row of scripts/seo-migration/legacy-url-contract.tsv:
 *        200 → served directly, self-canonical, indexable, one h1, unique
 *              title/description, OG + Twitter tags, valid JSON-LD
 *        301 → exactly one hop, 301, to the right place, which is itself 200
 *        410 → 410
 *   2. sitemap.xml: every URL is 200, self-canonical, https apex, slashed
 *   3. robots.txt content
 *   4. hosts: www → apex 301; a non-canonical host gets noindex; the
 *      canonical host does not
 *   5. every internal link and image on every page resolves without a
 *      redirect; every legacy document downloads
 *   6. unknown URLs return a real 404
 *
 * Exit code 1 if anything fails.
 */
import http from "node:http";
import https from "node:https";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const BASE = new URL(args.find((a) => !a.startsWith("--")) ?? "http://localhost:3111");
const HOST = args.find((a) => a.startsWith("--host="))?.slice(7) ?? "alipublicschool.com.pk";
const ORIGIN = `https://${HOST}`;
const here = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

const failures = [];
const notes = [];
const fail = (where, what) => failures.push(`${where}  —  ${what}`);

function request(path, { host = HOST, method = "GET" } = {}) {
  const lib = BASE.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      { hostname: BASE.hostname, port: BASE.port, path, method, headers: { host, "user-agent": "aps-seo-migration-check" } },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
      }
    );
    req.on("error", reject);
    req.setTimeout(60000, () => req.destroy(new Error("timeout")));
    req.end();
  });
}

/** Request path as a browser would send it: non-ASCII percent-encoded. */
const wire = (path) => (/^[\x21-\x7e]*$/.test(path) ? path : encodeURI(path));

/** Location header → path on this site, or the absolute URL if off-site. */
function locationPath(location) {
  const url = new URL(location, ORIGIN + "/");
  return url.origin === ORIGIN ? url.pathname + url.search : url.href;
}

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const decodeHtml = (s) =>
  s?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function parsePage(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const meta = (key, value) => decodeHtml(attr(metas.find((t) => attr(t, key) === value) ?? "", "content"));
  const head = html.slice(0, html.indexOf("</head>"));
  return {
    title: decodeHtml(head.match(/<title>([^<]*)<\/title>/)?.[1]),
    canonical: decodeHtml(attr(head.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0] ?? "", "href")),
    description: meta("name", "description"),
    robots: meta("name", "robots"),
    og: Object.fromEntries(["title", "description", "url", "image", "type", "site_name", "locale"].map((k) => [k, meta("property", `og:${k}`)])),
    twitter: Object.fromEntries(["card", "title", "description", "image"].map((k) => [k, meta("name", `twitter:${k}`)])),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim()),
    lang: html.match(/<html\b[^>]*\blang="([^"]*)"/)?.[1],
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return "INVALID";
      }
    }),
    imgsNoAlt: [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => !/\balt=/.test(m[0])).length,
    links: [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => decodeHtml(m[1])),
    images: [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map((m) => decodeHtml(m[1])),
  };
}

// ------------------------------------------------------------------ contract
const contract = readFileSync(join(here, "seo-migration/legacy-url-contract.tsv"), "utf8")
  .split(/\r?\n/)
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [path, expect, destination, note, canonicalOf] = l.split("\t");
    return { path, expect, destination, note, canonicalOf };
  });

// Pages the redesign adds that never existed on the legacy site.
const NEW_PAGES = ["/principals-message/", "/campuses/", "/results/", "/policies/"];
for (const path of NEW_PAGES) contract.push({ path, expect: "200", note: "new page" });

const pages = new Map(); // path → parsed page (for uniqueness + link crawl)
const counts = { 200: 0, 301: 0, 410: 0 };

async function checkPage(path, canonicalPath = path) {
  const res = await request(wire(path));
  if (res.status !== 200) return fail(path, `expected 200, got ${res.status}${res.headers.location ? ` → ${res.headers.location}` : ""}`);
  const type = res.headers["content-type"] ?? "";
  if (!type.includes("text/html")) return; // the RSS feed
  if (res.headers["x-robots-tag"]) fail(path, `X-Robots-Tag "${res.headers["x-robots-tag"]}" on the canonical host`);

  const page = parsePage(res.body.toString("utf8"));
  const expected = ORIGIN + canonicalPath;
  if (page.canonical !== expected) fail(path, `canonical is ${page.canonical ?? "missing"}, expected ${expected}`);
  if (page.robots && /noindex|nofollow/i.test(page.robots)) fail(path, `meta robots "${page.robots}"`);
  if (!page.title) fail(path, "no <title>");
  else if (path !== "/" && !page.title.endsWith(" - Ali Public School")) fail(path, `title "${page.title}" breaks the "{Page} - Ali Public School" pattern`);
  if (!page.description) fail(path, "no meta description");
  else if (page.description.length > 160 || page.description.length < 50) fail(path, `description is ${page.description.length} chars`);
  if (page.h1.length !== 1) fail(path, `${page.h1.length} h1 elements: ${JSON.stringify(page.h1)}`);
  if (page.lang !== "en-PK") fail(path, `html lang="${page.lang}"`);
  if (page.og.url !== expected) fail(path, `og:url is ${page.og.url}`);
  if (page.og.title !== page.title) fail(path, `og:title "${page.og.title}" differs from <title>`);
  if (page.og.description !== page.description) fail(path, "og:description differs from meta description");
  if (!page.og.image?.startsWith(ORIGIN + "/")) fail(path, `og:image ${page.og.image ?? "missing"}`);
  if (page.og.site_name !== "Ali Public School") fail(path, `og:site_name ${page.og.site_name}`);
  if (page.twitter.card !== "summary_large_image" || !page.twitter.title || !page.twitter.image) fail(path, "Twitter card tags incomplete");
  if (page.jsonLd.includes("INVALID")) fail(path, "invalid JSON-LD");
  if (page.imgsNoAlt) fail(path, `${page.imgsNoAlt} <img> without alt`);
  if (/^\/20\d\d\//.test(canonicalPath) && !page.jsonLd.some((d) => d["@type"] === "NewsArticle")) fail(path, "post has no NewsArticle schema");
  if (canonicalPath !== "/" && canonicalPath !== path) return; // variants: canonical checked, nothing more
  pages.set(canonicalPath, page);
}

for (const row of contract) {
  if (row.expect === "200") {
    counts[200]++;
    await checkPage(row.path, row.canonicalOf || row.path);
  } else if (row.expect === "301") {
    counts[301]++;
    const res = await request(wire(row.path));
    if (res.status !== 301) { fail(row.path, `expected 301, got ${res.status}`); continue; }
    const to = locationPath(res.headers.location);
    if (to !== row.destination) { fail(row.path, `301 to ${to}, expected ${row.destination}`); continue; }
    const next = await request(wire(to));
    if (next.status !== 200) fail(row.path, `destination ${to} answers ${next.status} — a chain or a dead end`);
  } else if (row.expect === "410") {
    counts[410]++;
    const res = await request(wire(row.path));
    if (res.status !== 410) fail(row.path, `expected 410, got ${res.status}${res.headers.location ? ` → ${res.headers.location}` : ""}`);
  }
}

// ------------------------------------------------------- titles/descriptions
const dupes = (key) => {
  const seen = new Map();
  for (const [path, page] of pages) {
    const v = page[key];
    if (!v) continue;
    if (seen.has(v)) fail(path, `duplicate ${key} with ${seen.get(v)}: "${v}"`);
    else seen.set(v, path);
  }
};
dupes("title");
dupes("description");

// ------------------------------------------------------------------- sitemap
const sitemap = await request("/sitemap.xml");
const locs = [...sitemap.body.toString().matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (sitemap.status !== 200) fail("/sitemap.xml", `status ${sitemap.status}`);
if (new Set(locs).size !== locs.length) fail("/sitemap.xml", "duplicate URLs");
for (const loc of locs) {
  if (!loc.startsWith(ORIGIN + "/") || !loc.endsWith("/")) { fail("/sitemap.xml", `bad URL form ${loc}`); continue; }
  const path = loc.slice(ORIGIN.length);
  if (!pages.has(path)) await checkPage(path);
  if (!pages.has(path)) fail("/sitemap.xml", `lists ${path}, which is not a passing 200 page`);
}
for (const path of pages.keys()) if (!locs.includes(ORIGIN + path)) fail(path, "200 page missing from sitemap.xml");

// -------------------------------------------------------------------- robots
const robots = (await request("/robots.txt")).body.toString();
for (const line of ["User-Agent: *", "Allow: /", "Disallow: /api/", `Sitemap: ${ORIGIN}/sitemap.xml`])
  if (!robots.toLowerCase().includes(line.toLowerCase())) fail("/robots.txt", `missing "${line}"`);
if (/Disallow:\s*\/\s*$/m.test(robots)) fail("/robots.txt", "blanket Disallow: /");

// --------------------------------------------------------------------- hosts
const www = await request("/about-us/overview/", { host: `www.${HOST}` });
if (www.status !== 301 || www.headers.location !== `${ORIGIN}/about-us/overview/`)
  fail("www host", `got ${www.status} → ${www.headers.location}`);
const preview = await request("/", { host: "aps-preview.vercel.app" });
if (!/noindex/.test(preview.headers["x-robots-tag"] ?? "")) fail("preview host", "no X-Robots-Tag: noindex");
const canonicalHome = await request("/");
if (canonicalHome.headers["x-robots-tag"]) fail("canonical host", "X-Robots-Tag present");

// ----------------------------------------------------------- trailing slash
const noSlash = await request("/about-us/overview");
if (![301, 308].includes(noSlash.status) || locationPath(noSlash.headers.location) !== "/about-us/overview/")
  fail("/about-us/overview", `no-slash form gave ${noSlash.status} → ${noSlash.headers.location}`);
const chained = await request("/overview");
notes.push(`/overview (no slash, legacy short URL): ${chained.status} → ${chained.headers.location} (then 301 → /about-us/overview/)`);

// ---------------------------------------------------------------- not found
for (const path of ["/no-such-page/", "/2019/03/15/no-such-post/", "/category/no-such-category/", "/academics/no-such-policy/", "/wp-admin/"]) {
  const res = await request(path);
  if (res.status !== 404) fail(path, `expected 404, got ${res.status}`);
}

// ------------------------------------------------------- links and images
const internalLinks = new Set();
const imageUrls = new Set();
for (const page of pages.values()) {
  for (const href of page.links) {
    if (href.startsWith("/") && !href.startsWith("//")) internalLinks.add(href.split("#")[0]);
    else if (href.startsWith(ORIGIN)) internalLinks.add(href.slice(ORIGIN.length).split("#")[0]);
  }
  for (const src of page.images) if (src.startsWith("/")) imageUrls.add(src);
}
for (const href of internalLinks) {
  if (!href) continue;
  const res = await request(wire(href), { method: /\.(pdf|docx?)$/i.test(href) ? "HEAD" : "GET" });
  if (res.status !== 200) fail(`link ${href}`, `answers ${res.status}${res.headers.location ? ` → ${res.headers.location}` : ""} (internal links must not go through redirects)`);
}
for (const src of imageUrls) {
  const res = await request(src);
  if (res.status !== 200 || !String(res.headers["content-type"]).startsWith("image/")) fail(`image ${src.slice(0, 90)}`, `answers ${res.status} ${res.headers["content-type"]}`);
}

// ----------------------------------------------------------- legacy files
const manifest = readFileSync(join(here, "legacy-media/manifest.txt"), "utf8").split(/\r?\n/).filter((l) => l.startsWith("/"));
for (const path of manifest) {
  const res = await request(wire(path), { method: "HEAD" });
  if (res.status !== 200) fail(`file ${path}`, `answers ${res.status}`);
}

// -------------------------------------------------------------------- feed
const feed = await request("/feed/");
if (feed.status !== 200 || !String(feed.headers["content-type"]).includes("rss")) fail("/feed/", `answers ${feed.status} ${feed.headers["content-type"]}`);

// ------------------------------------------------------------------ report
console.log(`SEO migration check against ${BASE.origin} as Host: ${HOST}`);
console.log(`  contract rows: ${counts[200]} expected 200 · ${counts[301]} expected 301 · ${counts[410]} expected 410`);
console.log(`  pages verified: ${pages.size} · sitemap URLs: ${locs.length} · internal links: ${internalLinks.size} · images: ${imageUrls.size} · legacy files: ${manifest.length}`);
for (const note of notes) console.log(`  note: ${note}`);
if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exitCode = 1;
} else {
  console.log("\nAll checks passed.");
}
