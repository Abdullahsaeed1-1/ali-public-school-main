import { media } from "@/data/media";
import { site } from "@/data/site";

const timings = `${site.hours[0].days} ${site.hours[0].time} · ${site.hours[1].days} ${site.hours[1].time}`;

export interface Campus {
  slug: string;
  name: string;
  brief: string;
  timings: string;
  photo?: string;
  href?: string;
  external?: boolean;
}

export const campuses: Campus[] = [
  {
    slug: "girls-junior",
    name: "Girls & Junior Section",
    // Reference 3.2 and 6.2 — the school's own description.
    brief:
      "We take in students from the age of 3, and girls have a chance to continue their education up to college level. The section is staffed exclusively by female teachers under the supervision of the Headmistress.",
    timings,
    photo: media.girlsBuilding.wide[2],
  },
  {
    slug: "boys-senior",
    name: "Boys & Senior Section",
    // Reference 3.3 and 6.1, with the 2019 future tense moved to the present.
    brief:
      "Boys from class 4 upward learn in the new College building, opened April 2019. Smart boards in every class, an IT lab, chemistry, biology and physics labs, and a hall seating over 100.",
    timings,
    photo: media.boysBuilding.wide[1],
  },
  {
    slug: "aps-premier",
    name: "APS Premier Campus",
    brief:
      "A separate campus under the Ali Public School name. Visit the dedicated APS Premier website for full details.",
    timings,
    href: "https://apspremier.com",
    external: true,
  },
];
