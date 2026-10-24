# SEO migration — decisions still needed and pre-launch checklist

Companion to `APS_SEO_Migration_Report.md` and `PLAN.md` §13. Nothing here has
been deployed. DNS, Cloudflare and the live domain are untouched.

## Verified during implementation (live site crawl, 16 Oct 2026, read-only)

- **HTTP is not redirected to HTTPS on the old site.** `curl http://alipublicschool.com.pk/`
  returns **200** with `<link rel="canonical" href="http://…">`. The report's
  "http→https verified" came from the browser upgrading the request itself. This
  explains why Google shows `http://` URLs. Vercel redirects HTTP to HTTPS itself (308).
- www→apex, `/overview/`, `/admission-policy/` and missing trailing slashes are
  **301** on the old site (now verified, previously unknown).
- No page has a meta description; posts do carry Yoast OG/Twitter tags.
- The 14 posts in the demo categories are Lorem ipsum. `/category/facilities/`
  contains only one of them.
- The four place tags (`badaber`, `kohat`, `peshawar`, `ali-public-shool-and-college`)
  contain only the 2019 new-campus post; `summer-vacations-2016` only the 2016 summer post.
- Downloads live at `/downloads/…` (not `/wp-content/uploads/`). All 311 needed files
  were mirrored into `public/` at their original paths.
- 4 of the 10 Video Gallery YouTube videos (Founders' Day 2017, parts 1–4) no
  longer exist on YouTube.
- Photos in the 2019 "Events" gallery posts were hot-linked from Facebook's CDN
  and no longer load anywhere.

## Needs a decision (client or someone with WordPress / Search Console access)

| # | Item | Current behaviour | Decide |
|---|---|---|---|
| 1 | Urdu post `/2020/09/12/%d8%a2…/` | 200, **English** title "Your Concerns and Our Answers", the two original Urdu notice images | Client's "no Arabic script" rule vs the original Urdu title. Keep, restore Urdu, or retire |
| 2 | 14 Lorem demo posts, demo pages and demo post types | 410 Gone | Check Search Console → Links. Any with real backlinks → 301 to closest page instead (`src/data/legacy-routes.ts`) |
| 3 | `/category/facilities/` (indexed) | 410 (only held a Lorem post) | Confirm |
| 4 | `/faculty/` | 301 → `/about-us/` | Verified genuine but thin (staff intro + principal). Confirm target |
| 5 | `/terms-and-conditions/` | 410 (theme placeholder text) | Write real terms if the school wants a page |
| 6 | `/project/`, `/pj-categs/aps-projects/` | 301 → `/campuses/` (report suggested `/about-us/overview/`) | Confirm |
| 7 | Head of Communications (M. Humuyan, +92 333 855 7587, hoc@…) from `/contact-us-2/` | **Not published** | Is this person and number still current? |
| 8 | Email: `info@` vs `admin@` | `info@` everywhere, including Vacancies | PLAN.md §0 Q1 |
| 9 | "Admissions are open … playgroup to 7, Middle, High School & College" | Restored on the homepage (Google uses it as the snippet) | Confirm the class range (PLAN.md §0 Q6) |
| 10 | 2020–21 brochure on `/academics/admission-policy/` | Linked, labelled "2020-2021 Session" | Replace with current prospectus or remove |
| 11 | Archived term dates 2019–20 and 2017–19 | 200, marked as archives | Add current dates when supplied |
| 12 | `addressRegion: "Khyber Pakhtunkhwa"` in School schema | Present | Confirm; add `geo` only with a verified map pin |
| 13 | Relationship with apspremier.com | Linked as "APS Premier Campus" | Confirm so the two sites don't compete for the brand |
| 14 | Remaining `/wp-content/uploads/` files (≈650 originals + thumbnails not used by any kept page) | 404 | Export the WP media library and add to `scripts/legacy-media/manifest.txt` if Search Console shows image traffic |
| 15 | Yoast per-page SEO titles / `.htaccess` / Redirection plugin rules | Unknown | Export from WP admin and compare with `legacy-routes.ts` |

## Pre-launch checklist

**Before DNS changes**
1. Get **Search Console** access (Owner/Full) for `sc-domain:alipublicschool.com.pk`,
   or verify the Domain property by DNS TXT. Export 16 months of Performance data
   (queries, pages) as the baseline. Get GA access or an export if it exists.
2. Check Search Console → Links for the URLs retired with 410 (item 2).
3. Run `node scripts/mirror-legacy-media.mjs --check` (should report 0 missing).
   Mirroring must happen **before** the old server stops answering for the domain.
4. Back up the full WordPress site (files + DB); keep it reachable privately.
5. Deploy to a Vercel preview, then run
   `node scripts/seo-migration-check.mjs https://<preview-url>`. The script sends
   `Host: alipublicschool.com.pk`; against Vercel you may need `--host=<preview host>`,
   and then expect the noindex host checks to fail by design.
6. In Vercel: add `alipublicschool.com.pk` as the production domain and
   `www.alipublicschool.com.pk` as a **301 redirect to the apex**.
7. Lower the DNS TTL a day ahead. If Cloudflare stays in front, use SSL mode
   **Full (strict)** to avoid redirect loops, and make sure no Cloudflare rule
   adds `noindex` or caches redirects wrongly.

**At launch (only with explicit approval)**
8. Switch DNS. Re-run `seo-migration-check.mjs https://alipublicschool.com.pk`.
9. `curl -I http://alipublicschool.com.pk/` → expect a redirect to https.
   `curl -I https://www.alipublicschool.com.pk/about-us/overview/` → one 301 to apex.
10. Confirm production responses have **no** `X-Robots-Tag` and no `noindex`.
11. Search Console: submit `https://alipublicschool.com.pk/sitemap.xml`; request
    indexing for `/`, `/academics/admission-policy/`, `/welcome-to-ali-public-school/`,
    `/about-us/overview/`, `/contact-us/`. No Change of Address (same domain).
12. Rich Results Test on `/` (School) and one post (NewsArticle).

**Monitoring (weekly for 8 weeks, then monthly to 90 days)**
- Search Console → Pages: "Not found (404)", "Soft 404", "Page with redirect",
  "Duplicate, Google chose different canonical"; watch demo URLs drop out.
- Performance vs baseline for: Ali Public School / … Peshawar / … Badaber,
  "Ali Public School and College Peshawar admission", "schools in Badaber Peshawar";
  pages `/`, `/academics/admission-policy/`, `/welcome-to-ali-public-school/`.
- Vercel 404 logs for old URLs not in the map (especially `/wp-content/uploads/…`).
- Core Web Vitals (field data lags ~28 days).

Rankings are not guaranteed to hold through a migration. Expect some fluctuation
for several weeks even when every URL is preserved.
