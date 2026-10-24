/**
 * Site-wide identity. Every value here is traceable to
 * `APSCONTENTREFERENCE.md` — the verbatim transcription of the school's live
 * legacy site. Nothing on this page is invented; where the school has not
 * published something, it carries a `TODO` and stays absent from the site
 * rather than being guessed at.
 *
 * Reference sections: Part 0 (identity), Part 9.5 (people), Part 14 (fact sheet).
 */
export const site = {
  name: "Ali Public School",
  fullName: "Ali Public School & College",
  shortName: "APS",

  /**
   * The canonical origin — apex, https, no www — exactly as every legacy
   * canonical tag had it (SEO migration report §2.3). Do not add `www.`:
   * www is redirected to this host. No trailing slash here; paths carry it.
   */
  url: "https://alipublicschool.com.pk",

  /**
   * The motto. A Quranic verse sat alongside this in Arabic on the legacy
   * site; the client asked for it to come off entirely, so it is gone from
   * the copy, the crest caption and the font stack — see PLAN.md §0.
   * The verse remains on the crest artwork itself, which is the school's own
   * logo file.
   */
  tagline: "Quality in Everything",

  foundingYear: 2012,
  /** Granted College status in 2019; Ali Public College launched April 2019. */
  collegeStatusYear: 2019,

  address:
    "Haji Ghaljai Kalai, Afridi Road, Mera Mashogaggar, Badabher, Peshawar, Pakistan",
  shortLocation: "Badabher, Peshawar",
  /** How the school describes where it is, in its own words (ref 2.4). */
  setting:
    "the southern outskirts of Peshawar, on Kohat Road, surrounded by the beautiful Masho Gaggar countryside",

  phone: "+92 (0) 91 2370412",
  phoneHref: "tel:+92912370412",

  /**
   * TODO — the school must pick ONE. The legacy site uses
   * info@alipublicschool.com.pk in the footer of every page but
   * admin@alipublicschool.com.pk on the Contact and Careers pages
   * (reference Part 8). Using the footer address site-wide until told
   * otherwise, because it appeared on every page rather than two.
   *
   * A third address, hoc@alipublicschool.com.pk, was previously in this file.
   * It appears nowhere in the reference and has been removed as unverified.
   */
  email: "info@alipublicschool.com.pk",

  /** Reference 0.5. All four were live in the legacy top bar. */
  social: {
    facebook: "https://www.facebook.com/alipublicschool.com.pk/",
    twitter: "https://twitter.com/alipublicschool",
    youtube: "https://www.youtube.com/channel/UCqa_STIGq2Y8QmsEE6H0c_g/videos",
    linkedin: "https://www.linkedin.com/in/alipublicschool/",
  },

  /**
   * The school's WhatsApp line, supplied by the school on 31 August 2026.
   *
   * Two forms, because they are read by different things. `whatsappNumber` is
   * what wa.me needs — digits only, country code first, no plus and no spaces
   * — and feeds every WhatsApp button on the site through `whatsappUrl()`.
   * `whatsapp` is the same number set the way a person reads it, and is the
   * only form that should ever be printed on the page.
   *
   * The environment override stays so the number can be pointed somewhere
   * else for a staging deploy without a code change.
   */
  whatsapp: "+92 345 9508293",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923459508293",

  /** Reference 0.4 / 2.12. */
  registrations: {
    bise: "1764",
    psra: "010385017612",
    /** Named on the legacy certifications strip alongside the two reg numbers. */
    acca: "ACCA Trainee Program",
  },

  /**
   * Reference 0.3. The school has confirmed the day starts at 8:00 AM, and
   * the legacy site's inconsistent punctuation ("8:00 am – 2.00 pm") is not
   * carried over.
   *
   * TODO — unresolved contradiction: this table says Saturday is closed, but
   * every homework timetable in reference 4.4 lists Saturday work. The school
   * must confirm which is current.
   */
  hours: [
    { days: "Monday – Thursday", time: "8:00 AM – 2:00 PM" },
    { days: "Friday", time: "8:00 AM – 12:30 PM" },
    { days: "Saturday & Sunday", time: "Closed" },
  ],

  // TODO: confirm the exact Google Maps pin for each section.
  mapsUrl: "https://maps.google.com/?q=Ali+Public+School+Kohat+Road+Peshawar",

  /**
   * The only people the school has actually named in public. The legacy site
   * also carried three "teachers" — Martha Jackson, Tom Brown and Lucy Allen —
   * who are WordPress template dummies sharing one identical bio. They are
   * never to appear on this site.
   */
  leadership: {
    ceo: { name: "Mr. Ali Afridi", role: "Chief Executive Officer" },
    principal: {
      name: "Maj (R) Manzur Hussain Qureshi",
      role: "Principal",
      // Reference 9.5, 7 Nov 2015.
      since: 2015,
      note: "A retired Pakistan Army officer with over 14 years' experience in the most prestigious academic institutions of Pakistan.",
    },
    // TODO: the Headmistress heads the Girls & Junior Section. The school has
    // never published her name.
    headmistress: { name: null, role: "Headmistress, Girls & Junior Section" },
  },

  /** Reference 9.1, 16 May 2022 — the school's parent/student portal. */
  portal: {
    name: "Classter",
    description:
      "a cloud school management system giving students and parents real-time access to result cards, timetables, class assignments, homework, leave applications, attendance records and bills",
    // TODO: the school must supply the login URL for its Classter tenant.
    url: null,
  },

  syllabus: "Oxford syllabus",
  boards: "BISE Peshawar — SSC & HSSC, and the Middle Pass Certificate",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * The legacy footer reads "Copyright © 2015-2002" — reversed years, a typo.
 * Run from the founding year to the current one instead.
 */
export function copyrightLine() {
  const year = new Date().getFullYear();
  return `© ${site.foundingYear}–${year} ${site.fullName}`;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

/**
 * Seven top-level items, same as before — the pages the brief adds are nested
 * rather than laid alongside, because a thirteen-item bar does not fit a
 * laptop, let alone a tablet.
 *
 * Every href is the page's legacy WordPress URL where one existed (with its
 * trailing slash), so internal links point straight at the canonical address
 * and never through a redirect. The welcome page and the media gallery both
 * rank today and must stay linked from the menu (migration report §7.3).
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-us/",
    children: [
      { label: "Our Story", href: "/about-us/" },
      { label: "Welcome", href: "/welcome-to-ali-public-school/" },
      { label: "Overview", href: "/about-us/overview/" },
      { label: "Principal's Message", href: "/principals-message/" },
      { label: "Our Sections", href: "/campuses/" },
      { label: "Careers", href: "/careers/" },
    ],
  },
  {
    label: "Academics",
    href: "/academics/",
    children: [
      { label: "Curriculum", href: "/academics/" },
      { label: "School Policies", href: "/policies/" },
      { label: "Results", href: "/results/" },
    ],
  },
  { label: "Admissions", href: "/academics/admission-policy/" },
  {
    label: "Gallery",
    href: "/galleries/",
    children: [
      { label: "Photo Gallery", href: "/galleries/" },
      { label: "Media Gallery", href: "/media-gallery/" },
      { label: "Picture Galleries", href: "/galleries/picture-galleries-till-2019/" },
      { label: "Video Galleries", href: "/galleries/video-galleries/" },
    ],
  },
  {
    label: "News & Events",
    href: "/blog/",
    children: [
      { label: "All News", href: "/blog/" },
      { label: "News", href: "/category/news/" },
      { label: "Events", href: "/category/events/" },
    ],
  },
  { label: "Contact", href: "/contact-us/" },
];

/** Flattened for the footer, which lists every page rather than nesting. */
export const footerLinks: { label: string; href: string }[] = navLinks.flatMap(
  (link) => (link.children ? link.children : [{ label: link.label, href: link.href }])
);

/** Normalises a pathname for comparison: trailing slash on, except root. */
export function samePath(a: string, b: string) {
  const norm = (p: string) => (p === "/" ? p : `${p.replace(/\/+$/, "")}/`);
  return norm(a) === norm(b);
}
