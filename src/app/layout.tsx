import type { Metadata } from "next";
import "./globals.css";
import { cinzel, montserrat } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis";
import { MotionProvider } from "@/lib/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Splash } from "@/components/layout/Splash";
import { StraightPathLine } from "@/components/layout/StraightPathLine";
import { site } from "@/data/site";

/**
 * Site-wide defaults. Every page overrides title, description and canonical
 * through `buildMetadata()` in src/lib/metadata.ts; these only apply to a
 * route that forgets to (and to the 404 page).
 *
 * The title template is the legacy site's own pattern,
 * "{Page Title} - Ali Public School" (migration report §6.1 rule 4).
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description:
    "Ali Public School & College on Kohat Road, Badaber, Peshawar — serving the families of Badabher since 2012, with a promise of quality in everything we do.",
  openGraph: {
    siteName: site.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * The scroll-reveal styles hide their content until an IntersectionObserver
 * brings it back, which is wrong if scripting is unavailable. That used to be
 * handled by an inline script stamping a `js` class on <html> — but the script
 * runs before React hydrates, so the server HTML and the client DOM disagreed
 * about the <html> className and React reported a hydration mismatch on every
 * page load.
 *
 * A <noscript> stylesheet does the same job from the other direction, and
 * because the server emits it too there is nothing for hydration to disagree
 * about.
 */
const NOSCRIPT_REVEAL = `
  .reveal { opacity: 1 !important; transform: none !important; clip-path: none !important; }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PK"
      className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL }} />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-sand text-navy-ink">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <LenisProvider>
            <Splash />
            <StraightPathLine />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
