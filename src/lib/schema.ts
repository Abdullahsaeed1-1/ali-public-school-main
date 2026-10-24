import { media } from "@/data/media";
import type { NewsPost } from "@/data/news";
import { site } from "@/data/site";

/** Absolute URL on the canonical host. Paths are passed in legacy form. */
export function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}

const SCHOOL_ID = absoluteUrl("/#school");

/**
 * The school as an organisation (migration report §7.0). Every value is one
 * the school publishes itself. Deliberately absent: `geo` coordinates (no
 * verified map pin yet), ratings of any kind, and the Head of Communications
 * contact from the old /contact-us-2/ page (unconfirmed whether current).
 */
export function schoolSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": SCHOOL_ID,
    name: site.name,
    alternateName: [site.fullName, "Ali Public School and College", "APSC"],
    url: absoluteUrl("/"),
    logo: absoluteUrl(media.crest),
    image: absoluteUrl(media.campusEstablishing),
    telephone: "+92 91 2370412",
    email: site.email,
    foundingDate: String(site.foundingYear),
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Haji Ghaljai Kalai, Afridi Road, Mera Mashogaggar, Badabher",
      addressLocality: "Peshawar",
      // General knowledge about Peshawar, not a value the school published —
      // confirm with the school (report §7.0).
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "12:30",
      },
    ],
    // The WhatsApp line as a contact point of its own — the number most
    // parents actually use; supplied by the school on 31 August 2026.
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Admissions",
        telephone: site.whatsapp,
        areaServed: "PK",
        availableLanguage: ["en", "ur", "ps"],
      },
    ],
    // Without the /videos tab suffix: sameAs names the channel itself.
    sameAs: [
      site.social.facebook,
      site.social.twitter,
      "https://www.youtube.com/channel/UCqa_STIGq2Y8QmsEE6H0c_g",
      site.social.linkedin,
    ],
  };
}

/**
 * The legacy home page carried a WebSite block with a SearchAction pointing
 * at /?s=… . This site has no search, so the SearchAction is dropped rather
 * than advertising a search box that does nothing (report §7.0).
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: site.name,
    alternateName: site.fullName,
    inLanguage: "en-PK",
    publisher: { "@id": SCHOOL_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleSchema(post: NewsPost, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title.length > 110 ? `${post.title.slice(0, 107)}…` : post.title,
    description,
    datePublished: post.date,
    mainEntityOfPage: absoluteUrl(post.path),
    image: post.image ? [absoluteUrl(encodeURI(post.image))] : [absoluteUrl(media.crest)],
    articleSection: post.categories,
    inLanguage: "en-PK",
    author: { "@type": "Organization", name: site.fullName, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      "@id": SCHOOL_ID,
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(media.crest) },
    },
  };
}

/** Serialises for a `<script type="application/ld+json">`, safely. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
