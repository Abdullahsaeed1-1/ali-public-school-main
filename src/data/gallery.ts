import { alt, media } from "@/data/media";

/**
 * The gallery is built only from categories the school actually has
 * photographs of. There is no "Sports" filter on its own, because there is
 * one cricket photo and no more — an empty-feeling category is worse than a
 * missing one. "Results Day" earns its own category because the recovered
 * batch (PLAN.md §2) gave it eight photographs, enough to stand on its own.
 *
 * Every item has an image. The grid used to fall back to the crest at 10%
 * opacity for items without one, which read as a watermark over a blank tile.
 */
export type GalleryCategory = "Campus" | "Classrooms" | "Students" | "Results Day";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  caption: string;
  image: string;
  alt: string;
  aspect: "square" | "portrait" | "landscape";
}

export const galleryCategories: GalleryCategory[] = [
  "Campus",
  "Classrooms",
  "Students",
  "Results Day",
];

export const galleryItems: GalleryItem[] = [
  // ---- Campus ----
  {
    id: "campus-1",
    category: "Campus",
    caption: "The Girls & Junior Section and the lawn",
    image: media.girlsBuilding.wide[0],
    alt: alt.girlsBuilding,
    aspect: "landscape",
  },
  {
    id: "campus-2",
    category: "Campus",
    caption: "The front of the school",
    image: media.schoolFront,
    alt: alt.campus,
    aspect: "portrait",
  },
  {
    id: "campus-3",
    category: "Campus",
    caption: "The veranda along the boys' block",
    image: media.veranda,
    alt: alt.boysBuilding,
    aspect: "landscape",
  },
  {
    id: "campus-4",
    category: "Campus",
    caption: "The Boys & Senior Section",
    image: media.boysBuilding.tall[3],
    alt: alt.boysBuilding,
    aspect: "portrait",
  },
  {
    id: "campus-5",
    category: "Campus",
    caption: "Along the upper floor",
    image: media.girlsBuilding.wide[8],
    alt: alt.girlsBuilding,
    aspect: "landscape",
  },
  {
    id: "campus-6",
    category: "Campus",
    caption: "The block from the far end",
    image: media.girlsBuilding.wide[1],
    alt: alt.girlsBuilding,
    aspect: "landscape",
  },
  {
    id: "campus-7",
    category: "Campus",
    caption: "Looking across the ground",
    image: media.girlsBuilding.wide[3],
    alt: alt.girlsBuilding,
    aspect: "square",
  },
  {
    id: "campus-8",
    // TODO: `premierBuilding` is a guess — recovered alongside the visit
    // photos but never confirmed as APS Premier's own building. Correct the
    // caption if it turns out to be somewhere else.
    category: "Campus",
    caption: "The APS Premier building",
    image: media.premierBuilding,
    alt: alt.campus,
    aspect: "landscape",
  },

  // ---- Classrooms ----
  {
    id: "class-1",
    category: "Classrooms",
    caption: "A classroom with the striped wall",
    image: media.classroomSignature,
    alt: alt.classroom,
    aspect: "landscape",
  },
  {
    id: "class-2",
    category: "Classrooms",
    caption: "Desks and a painted corner",
    image: media.classrooms.tall[0],
    alt: alt.classroom,
    aspect: "portrait",
  },
  {
    id: "class-3",
    category: "Classrooms",
    caption: "Ready for the morning",
    image: media.classrooms.wide[1],
    alt: alt.classroom,
    aspect: "landscape",
  },
  {
    id: "class-4",
    category: "Classrooms",
    caption: "A senior classroom",
    image: media.classrooms.tall[1],
    alt: alt.classroom,
    aspect: "portrait",
  },
  {
    id: "class-5",
    category: "Classrooms",
    caption: "Light from the yard",
    image: media.classrooms.wide[2],
    alt: alt.classroom,
    aspect: "square",
  },
  {
    id: "class-6",
    category: "Classrooms",
    caption: "Colour on every wall",
    image: media.classrooms.wide[12],
    alt: alt.classroom,
    aspect: "landscape",
  },

  // ---- Students ----
  // The three original photographs, then the recovered batch (PLAN.md §2) —
  // real pupils, results day, and the APS Premier visit.
  {
    id: "students-1",
    category: "Students",
    caption: "Hands up in class",
    image: media.students.handsUp,
    alt: alt.students,
    aspect: "landscape",
  },
  {
    id: "students-2",
    category: "Students",
    caption: "Heads down, writing",
    image: media.students.writing,
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "students-3",
    category: "Students",
    caption: "On the field",
    image: media.students.sport,
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "students-4",
    category: "Students",
    caption: "Girls & Junior Section",
    image: media.girlsPupils[0],
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "students-5",
    category: "Students",
    caption: "Boys & Senior Section",
    image: media.boysPupils[3],
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "students-6",
    category: "Students",
    caption: "A visit to APS Premier",
    image: media.premierVisit[3],
    alt: alt.students,
    aspect: "landscape",
  },
  {
    id: "students-7",
    category: "Students",
    caption: "In the classroom together",
    image: media.premierVisit[1],
    alt: alt.students,
    aspect: "landscape",
  },
  {
    id: "students-8",
    category: "Students",
    caption: "Girls & Junior Section",
    image: media.girlsPupils[3],
    alt: alt.students,
    aspect: "square",
  },
  {
    id: "students-9",
    category: "Students",
    caption: "Boys & Senior Section",
    image: media.boysPupils[9],
    alt: alt.students,
    aspect: "landscape",
  },

  // ---- Results Day ----
  // The resultsDay photos themselves are all decoration close-ups with no one
  // in them — real faces from the same event are girlsPupils/boysPupils, used
  // here so "Results Day" doesn't read as an empty room. Two of the decoration
  // photos show award ribbons with real children's handwritten names; neither
  // is used here, and PLAN.md §2 flags them for a decision on whether to keep,
  // remove, or blur before they appear anywhere at legible size.
  {
    id: "results-1",
    category: "Results Day",
    caption: "Results Day 2026",
    image: media.resultsDay[0],
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "results-2",
    category: "Results Day",
    caption: "Proud smiles",
    image: media.girlsPupils[2],
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "results-3",
    category: "Results Day",
    caption: "Handmade graduation caps",
    image: media.resultsDay[5],
    alt: alt.students,
    aspect: "landscape",
  },
  {
    id: "results-4",
    category: "Results Day",
    caption: "The whole class",
    image: media.girlsPupils[5],
    alt: alt.students,
    aspect: "square",
  },
  {
    id: "results-5",
    category: "Results Day",
    caption: "Every star a position",
    image: media.resultsDay[2],
    alt: alt.students,
    aspect: "portrait",
  },
  {
    id: "results-6",
    category: "Results Day",
    caption: "A day worth celebrating",
    image: media.boysPupils[1],
    alt: alt.students,
    aspect: "portrait",
  },
];
