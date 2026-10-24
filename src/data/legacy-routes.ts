/**
 * What happens to every legacy WordPress URL that does NOT keep serving a
 * page of its own.
 *
 * Source of truth: the SEO migration report (§6.3) plus a read-only crawl of
 * the live site on 16 October 2026, which settled the report's open items:
 *   - the 14 posts in the theme's demo categories are verified Lorem ipsum
 *   - /category/facilities/ holds only one of those Lorem posts
 *   - /2015/11/07/principal/ and /category/faculty/ carry only the
 *     Principal's message, which has its own page here
 *   - /core-values-2/, /project/new-comfortable-building/, /vacancies-archive/
 *     and /faculty/ are genuine school content that duplicates or is covered
 *     by a page on this site; /policy-procedures/ is empty; the
 *     /terms-and-conditions/ page is the theme's placeholder text
 *
 * Every destination is a final URL (trailing slash, a page that returns
 * 200), so nothing here chains into another redirect.
 *
 * Read by `next.config.ts` (redirects) and `src/middleware.ts` (410s). Pages
 * that keep their legacy URL are not listed here at all — they are routes.
 */

export interface LegacyRedirect {
  source: string;
  destination: string;
  /** Why — kept next to the rule so nobody "tidies" it away. */
  reason: string;
}

export const legacyRedirects: LegacyRedirect[] = [
  // ---- verified behaviour of the old site, reproduced as explicit 301s
  { source: "/overview/", destination: "/about-us/overview/", reason: "Old top-bar 'About Us' link; WordPress 301 verified" },
  { source: "/admission-policy/", destination: "/academics/admission-policy/", reason: "Old top-bar 'Admissions' link; WordPress 301 verified" },

  // ---- duplicates and demo pages with a genuine equivalent
  { source: "/admission/", destination: "/academics/admission-policy/", reason: "Lorem-ipsum template page; admission intent, real policy lives at the target" },
  { source: "/front-page/", destination: "/", reason: "Indexed '@Front Page' with raw shortcodes" },
  { source: "/contact-us-2/", destination: "/contact-us/", reason: "Duplicate contact page" },
  { source: "/about-us-1/", destination: "/about-us/overview/", reason: "Lorem-ipsum duplicate 'About Us'" },
  { source: "/about-us-2/", destination: "/about-us/overview/", reason: "Theme demo 'Brownstone' text" },
  { source: "/vision-and-mission/", destination: "/about-us/overview/", reason: "Theme demo text; move if a real vision page is written" },
  { source: "/core-values-2/", destination: "/about-us/core-values/", reason: "Verified duplicate of the core values" },
  { source: "/project/girls-section/", destination: "/about-us/junior-section/", reason: "Indexed duplicate of Girls & Junior Section" },
  { source: "/project/new-comfortable-building/", destination: "/about-us/senior-section/", reason: "Verified: the new Boys & Senior Section building" },
  { source: "/project/", destination: "/campuses/", reason: "Project archive listing only the two sections" },
  { source: "/pj-categs/aps-projects/", destination: "/campuses/", reason: "Same two section projects" },
  { source: "/picture-galleries-old/", destination: "/galleries/picture-galleries-till-2019/", reason: "Duplicate title, near-empty page" },
  { source: "/gallery/", destination: "/galleries/", reason: "Theme demo gallery archive; gallery intent" },
  { source: "/author/admin/", destination: "/blog/", reason: "Author archive of every post" },
  { source: "/category/faculty/", destination: "/principals-message/", reason: "Only post is the Principal's message" },
  { source: "/2015/11/07/principal/", destination: "/principals-message/", reason: "Verified: the Principal's message, duplicated" },
  { source: "/faculty/", destination: "/about-us/", reason: "Verified: short staff intro plus the Principal's message excerpt" },
  { source: "/policy-procedures/", destination: "/academics/", reason: "Verified empty; the policies are indexed from /academics/" },
  { source: "/vacancies-archive/", destination: "/careers/vacancies/", reason: "Verified: 2016 vacancies, long closed" },

  // ---- old sitemap URLs (Search Console may still hold them)
  ...[
    "sitemap_index", "post-sitemap", "page-sitemap", "category-sitemap", "post_tag-sitemap",
    "teachers-sitemap", "gallery-sitemap", "project-sitemap", "profile-sitemap",
    "gallery_category-sitemap", "pj-categs-sitemap", "pl-categs-sitemap", "author-sitemap",
  ].map((name) => ({
    source: `/${name}.xml`,
    destination: "/sitemap.xml",
    reason: "Legacy Yoast sitemap",
  })),
];

/**
 * Old paginated archives. The new archives are single pages that list every
 * post, so each old page number lands on its archive's first (only) page.
 * `:page(\\d+)` keeps these from matching anything that isn't a number.
 */
export const legacyPaginationRedirects: LegacyRedirect[] = [
  { source: "/blog/page/:page(\\d+)/", destination: "/blog/", reason: "Old pagination, 10 pages" },
  { source: "/category/news/page/:page(\\d+)/", destination: "/category/news/", reason: "Old pagination, 6 pages" },
  { source: "/category/events/page/:page(\\d+)/", destination: "/category/events/", reason: "Old pagination, 3 pages" },
];

/**
 * The redesign's interim URLs, from before the legacy paths were restored.
 * Nothing external should link to these (the new site has never been live
 * on the real domain), but they cost nothing to keep and they protect any
 * preview link that was shared around.
 */
export const interimRedirects: LegacyRedirect[] = [
  { source: "/about/", destination: "/about-us/", reason: "Interim redesign URL" },
  { source: "/admissions/", destination: "/academics/admission-policy/", reason: "Interim redesign URL" },
  { source: "/contact/", destination: "/contact-us/", reason: "Interim redesign URL" },
  { source: "/news/", destination: "/blog/", reason: "Interim redesign URL" },
];

/**
 * Retired with 410 Gone: WordPress theme demo content with no equivalent on
 * this site. Mass-redirecting these to the homepage would read to Google as
 * soft 404s. If Search Console's Links report shows real inbound links to
 * any of them before launch, move that one into `legacyRedirects` instead.
 */
export const goneExact = new Set([
  // demo pages
  "/sample-page/", "/shop/", "/shop-2/", "/cart/", "/cart-2/", "/cart-3/",
  "/checkout/", "/checkout-2/", "/checkout-3/", "/checkout-2-2/",
  "/my-account/", "/my-account-2/", "/my-account-3/",
  "/courses/", "/courses-2/", "/course/", "/become-a-teacher/", "/all-instructors/",
  "/pricing-plans/", "/main-page-slide-show-test/", "/front-page-static-header/",
  "/custom-shortcodes/", "/typography/", "/toggle-elements/", "/alerts-and-stuff/",
  "/gallery-one/", "/test/", "/test-unite-gallery-wrapper/",
  "/test-a1ss-unite-gallery-wrapper/", "/terms-and-conditions/",
  "/comments/feed/",
  // the theme's Lorem-ipsum demo posts (verified)
  "/2017/01/23/tips-to-prepare-for-final-exams/",
  "/2017/03/05/interesting-practice-for-our-graduates/",
  "/2017/04/26/use-our-school-high-speed-internet/",
  "/2017/06/12/preparation-for-control/",
  "/2017/08/18/interesting-individual-tasks/",
  "/2017/09/27/studing-with-good-mood/",
  "/2017/10/04/new-school-transport/",
  "/2017/11/26/friendship-and-entertainment/",
  "/2018/02/02/spend-time-with-pleasure/",
  "/2018/07/13/spend-school-time-with-pleasure/",
  "/2018/07/13/use-school-high-speed-internet/",
  "/2018/07/13/interesting-practice-for-graduates/",
  "/2018/07/13/many-interesting-individual-tasks/",
  "/2018/07/13/friendship-and-entertainments/",
  // categories that held only those demo posts
  "/category/academic/", "/category/advantage/", "/category/advantages/",
  "/category/collective/", "/category/education/", "/category/facilities/",
]);

/** Whole demo post types: the archive and every entry under it. */
export const gonePrefixes = [
  "/teachers/", "/profile/", "/gallery_category/", "/pl-categs/",
];

/** `/gallery/` itself redirects (above); its 17 demo entries are gone. */
export function isGone(pathname: string) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (goneExact.has(path)) return true;
  if (path.startsWith("/gallery/") && path !== "/gallery/") return true;
  return gonePrefixes.some((prefix) => path.startsWith(prefix));
}
