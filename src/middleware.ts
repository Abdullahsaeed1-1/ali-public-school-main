import { NextResponse, type NextRequest } from "next/server";
import { isGone } from "@/data/legacy-routes";

/**
 * Answers retired WordPress demo URLs with 410 Gone.
 *
 * Next can redirect from config but cannot return a 410 from it, and these
 * must not 404-with-a-200 or redirect to the homepage (Google reads a mass
 * redirect to home as a soft 404). The list itself lives in
 * `src/data/legacy-routes.ts`; this file only answers it.
 *
 * The matcher is narrowed to the shapes those URLs take so that ordinary
 * pages never pass through middleware at all. Anything matched here that is
 * not on the list (a real 2017 post, say) falls straight through.
 */
export function middleware(request: NextRequest) {
  if (!isGone(request.nextUrl.pathname)) return NextResponse.next();

  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

const GONE_HTML = `<!doctype html>
<html lang="en-PK">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Page removed - Ali Public School</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F5EFE3;color:#0C2154;font-family:system-ui,sans-serif;text-align:center;padding:24px}
  a{color:#7A1F2B}
</style>
</head>
<body>
<main>
<h1>This page has been removed</h1>
<p>It was part of the previous website and is no longer available.</p>
<p><a href="/">Ali Public School home page</a> · <a href="/blog/">News</a> · <a href="/contact-us/">Contact us</a></p>
</main>
</body>
</html>`;

export const config = {
  matcher: [
    "/teachers/:path*",
    "/profile/:path*",
    "/gallery/:path+",
    "/gallery_category/:path*",
    "/pl-categs/:path*",
    "/category/:path*",
    "/comments/:path*",
    "/2017/:path*",
    "/2018/:path*",
    // The flat demo pages. A named parameter, so the trailing slash the
    // site adds to every path still matches.
    "/:page(sample-page|shop|shop-2|cart|cart-2|cart-3|checkout|checkout-2|checkout-3|checkout-2-2|my-account|my-account-2|my-account-3|courses|courses-2|course|become-a-teacher|all-instructors|pricing-plans|main-page-slide-show-test|front-page-static-header|custom-shortcodes|typography|toggle-elements|alerts-and-stuff|gallery-one|test|test-unite-gallery-wrapper|test-a1ss-unite-gallery-wrapper|terms-and-conditions)",
  ],
};
