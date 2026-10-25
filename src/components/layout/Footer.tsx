import Image from "next/image";
import Link from "next/link";
import { policyFooterLinks } from "@/data/legacy-pages";
import { copyrightLine, footerLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy-ink text-sand/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/crest.jpeg"
              alt={`${site.name} crest`}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full"
            />
            <span className="font-display text-xl font-semibold text-paper">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/70">
            {site.address}
          </p>
          <p className="mt-4 font-display text-lg italic text-leaf">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-sand/70">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.label + link.href}>
                <Link href={link.href} className="text-sm text-sand/80 hover:text-leaf">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The legacy footer listed every policy page on every page. Kept,
            so those pages keep the internal links Google has crawled them
            through for years (migration report §7.0). */}
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-sand/70">
            School Policies
          </h2>
          <ul className="mt-4 space-y-2">
            {policyFooterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-sand/80 hover:text-leaf">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-sand/70">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-sand/80">
            <li>
              <a href={site.phoneHref} className="hover:text-leaf">
                {site.phone}
              </a>
            </li>
            <li>
              {/* break-all: the address has no space or hyphen to wrap at,
                  so without this it sets its own minimum column width. */}
              <a
                href={`mailto:${site.email}`}
                className="break-all hover:text-leaf"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-leaf"
              >
                View on Google Maps
              </a>
            </li>
            {/* All four accounts the school runs — reference 0.5. The old
                site linked them from a utility bar; here they sit with the
                rest of the contact detail. */}
            {(
              [
                ["Facebook", site.social.facebook],
                ["Twitter", site.social.twitter],
                ["YouTube", site.social.youtube],
                ["LinkedIn", site.social.linkedin],
              ] as const
            ).map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-leaf"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/10 px-6 py-6 text-center text-xs text-sand/70">
        <p>
          {/* The legacy footer read "Copyright © 2015-2002" — reversed
              years. copyrightLine() runs founding year → current year. */}
          {copyrightLine()}. Granted College status in {site.collegeStatusYear}.
        </p>
      </div>
    </footer>
  );
}
