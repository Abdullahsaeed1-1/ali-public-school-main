/**
 * Every photograph on the site, named by what it actually shows.
 *
 * Components import from here rather than hard-coding paths, so swapping a
 * photograph is a one-line change in this file instead of a hunt through the
 * component tree. The names describe the subject, not the slot — that is what
 * keeps a building photograph out of a slot that wants a classroom.
 *
 * Shape is in every filename (`-wide-` / `-tall-`), because the fit is the
 * whole problem: a 4:3 landscape dropped into a tall portrait frame crops to
 * someone's midriff, and a portrait stretched across a wide band shows mostly
 * sky. Pick from the list whose shape matches the slot.
 *
 * WHAT EXISTS TODAY (74 photographs, one film):
 *
 *   boys-building     9   the boys' section from outside — veranda, courtyard,
 *                         the front elevation with the school sign
 *   boys-pupils      10   boys results-day and staff photos — real faces
 *   classrooms       15   empty classrooms, painted walls, desks. No people.
 *   girls-building   13   the girls' section — a two-storey block and lawn
 *   girls-pupils     10   girls results-day and classroom-visit photos
 *   premier-building  1   a third, taller building — associated with the
 *                         APS Premier visit photos, unconfirmed which campus
 *   premier-visit     5   pupils and a teacher visiting APS Premier
 *   results-day        8   the "RESULT 2026" photo booth — group and solo
 *   students           3   the original three: hands up, writing, on the field
 *
 * `boys-pupils`, `girls-pupils`, `premier-visit` and `results-day` were an
 * earlier batch the school placed, then deleted along with the folders that
 * held them when replacing them with the four above. They were recovered from
 * the Recycle Bin and re-added — see PLAN.md §2 for how they are used.
 */

const BOYS = "/photos/boys-building";
const GIRLS = "/photos/girls-building";
const ROOMS = "/photos/classrooms";
const PUPILS = "/photos/students";
const BOYS_P = "/photos/boys-pupils";
const GIRLS_P = "/photos/girls-pupils";
const RESULTS = "/photos/results-day";
const PREMIER = "/photos/premier-visit";
const PBUILDING = "/photos/premier-building";

export const media = {
  crest: "/logo/crest.jpeg",

  /**
   * The only film the school has. It plays on the homepage hero through
   * `LazyVideo`, which paints `campusEstablishing` first and defers the 2.2 MB
   * fetch to the first idle callback - the film arrives a beat later without
   * holding up the page, and never loads at all under reduced motion.
   *
   * Nothing else on the site plays video, deliberately: a second autoplaying
   * file is the fastest way to make the site feel slow again.
   */
  heroFilm: "/videos/hero-campus-drone/drone-01.mp4",

  /**
   * The three photographs with children in them. Spend these carefully — they
   * are the only human faces the site has, and they should land where a person
   * is genuinely the subject rather than being scattered as texture.
   */
  students: {
    /** Boys at their desks with hands raised, grinning. 4032x2268, landscape.
     *  The strongest photograph on the site. */
    handsUp: `${PUPILS}/students-wide-01.jpg`,
    /** Boys writing, heads down, close in. 2268x4032, portrait. */
    writing: `${PUPILS}/students-tall-01.jpg`,
    /** A boy bowling on the field, goalposts and lawn behind. Portrait. */
    sport: `${PUPILS}/students-tall-02.jpg`,
  },

  /** The front elevation carrying the ALI PUBLIC SCHOOL sign. Portrait. */
  schoolFront: `${BOYS}/boys-building-tall-05.jpg`,
  /** The long girls' block with the lawn in front. Landscape, wide, the best
   *  establishing shot the school has. */
  campusEstablishing: `${GIRLS}/girls-building-wide-01.jpg`,
  /** The covered veranda along the boys' block. Landscape. */
  veranda: `${BOYS}/boys-building-wide-01.jpg`,
  /** A classroom with the rainbow-striped wall. Landscape. */
  classroomSignature: `${ROOMS}/classroom-wide-01.jpg`,

  boysBuilding: {
    wide: [
      `${BOYS}/boys-building-wide-01.jpg`,
      `${BOYS}/boys-building-wide-02.jpg`,
      `${BOYS}/boys-building-wide-03.jpg`,
      `${BOYS}/boys-building-wide-04.jpg`,
    ],
    tall: [
      `${BOYS}/boys-building-tall-01.jpg`,
      `${BOYS}/boys-building-tall-02.jpg`,
      `${BOYS}/boys-building-tall-03.jpg`,
      `${BOYS}/boys-building-tall-04.jpg`,
      `${BOYS}/boys-building-tall-05.jpg`,
    ],
  },

  girlsBuilding: {
    wide: [
      `${GIRLS}/girls-building-wide-01.jpg`,
      `${GIRLS}/girls-building-wide-02.jpg`,
      `${GIRLS}/girls-building-wide-03.jpg`,
      `${GIRLS}/girls-building-wide-04.jpg`,
      `${GIRLS}/girls-building-wide-05.jpg`,
      `${GIRLS}/girls-building-wide-06.jpg`,
      `${GIRLS}/girls-building-wide-07.jpg`,
      `${GIRLS}/girls-building-wide-08.jpg`,
      `${GIRLS}/girls-building-wide-09.jpg`,
    ],
    tall: [
      `${GIRLS}/girls-building-tall-01.jpg`,
      `${GIRLS}/girls-building-tall-02.jpg`,
      `${GIRLS}/girls-building-tall-03.jpg`,
      `${GIRLS}/girls-building-tall-04.jpg`,
    ],
  },

  /**
   * Real pupils in a results-day setting — the "RESULT 2026" photo booth,
   * boys and staff, or a teacher pinning a badge. Recovered from the batch
   * described above.
   */
  boysPupils: [
    `${BOYS_P}/boys-pupils-tall-01.webp`,
    `${BOYS_P}/boys-pupils-tall-02.webp`,
    `${BOYS_P}/boys-pupils-tall-03.webp`,
    `${BOYS_P}/boys-pupils-tall-04.webp`,
    `${BOYS_P}/boys-pupils-tall-05.webp`,
    `${BOYS_P}/boys-pupils-tall-06.webp`,
    `${BOYS_P}/boys-pupils-tall-07.webp`,
    `${BOYS_P}/boys-pupils-tall-08.webp`,
    `${BOYS_P}/boys-pupils-wide-01.webp`,
    `${BOYS_P}/boys-pupils-wide-02.webp`,
  ],

  /** Real pupils — girls at the same "RESULT 2026" booth, and a classroom
   *  group photo. Recovered from the batch described above. */
  girlsPupils: [
    `${GIRLS_P}/girls-pupils-tall-01.webp`,
    `${GIRLS_P}/girls-pupils-tall-02.webp`,
    `${GIRLS_P}/girls-pupils-tall-03.webp`,
    `${GIRLS_P}/girls-pupils-tall-04.webp`,
    `${GIRLS_P}/girls-pupils-tall-05.webp`,
    `${GIRLS_P}/girls-pupils-tall-06.webp`,
    `${GIRLS_P}/girls-pupils-tall-07.webp`,
    `${GIRLS_P}/girls-pupils-wide-01.webp`,
    `${GIRLS_P}/girls-pupils-square-01.webp`,
    `${GIRLS_P}/girls-pupils-square-02.webp`,
  ],

  /** The "RESULT 2026" photo booth itself — group shots, solo portraits, and
   *  a couple of close-up decoration/craft details with no faces in them. */
  resultsDay: [
    `${RESULTS}/results-day-tall-01.webp`,
    `${RESULTS}/results-day-tall-02.webp`,
    `${RESULTS}/results-day-tall-03.webp`,
    `${RESULTS}/results-day-tall-04.webp`,
    `${RESULTS}/results-day-wide-01.webp`,
    `${RESULTS}/results-day-wide-02.webp`,
    `${RESULTS}/results-day-wide-03.webp`,
    `${RESULTS}/results-day-square-01.webp`,
  ],

  /** Pupils and a teacher visiting the APS Premier campus. */
  premierVisit: [
    `${PREMIER}/premier-visit-tall-01.webp`,
    `${PREMIER}/premier-visit-tall-02.webp`,
    `${PREMIER}/premier-visit-wide-01.webp`,
    `${PREMIER}/premier-visit-wide-02.webp`,
    `${PREMIER}/premier-visit-wide-03.webp`,
  ],

  /** A taller, separately-designed building — recovered alongside the
   *  `premierVisit` photos, so used as the APS Premier building itself.
   *  Unconfirmed with the school; correct on sight if this is wrong. */
  premierBuilding: `${PBUILDING}/premier-building-wide-01.jpeg`,

  classrooms: {
    wide: [
      `${ROOMS}/classroom-wide-01.jpg`,
      `${ROOMS}/classroom-wide-02.jpg`,
      `${ROOMS}/classroom-wide-03.jpg`,
      `${ROOMS}/classroom-wide-04.jpg`,
      `${ROOMS}/classroom-wide-05.jpg`,
      `${ROOMS}/classroom-wide-06.jpg`,
      `${ROOMS}/classroom-wide-07.jpg`,
      `${ROOMS}/classroom-wide-08.jpg`,
      `${ROOMS}/classroom-wide-09.jpg`,
      `${ROOMS}/classroom-wide-10.jpg`,
      `${ROOMS}/classroom-wide-11.jpg`,
      `${ROOMS}/classroom-wide-12.jpg`,
      `${ROOMS}/classroom-wide-13.jpg`,
    ],
    tall: [
      `${ROOMS}/classroom-tall-01.jpg`,
      `${ROOMS}/classroom-tall-02.jpg`,
    ],
  },
} as const;

/** Alt text that describes the subject rather than repeating the school name. */
export const alt = {
  students: "Pupils at Ali Public School",
  classroom: "A classroom at Ali Public School",
  boysBuilding: "The Boys & Senior Section building at Ali Public School",
  girlsBuilding: "The Girls & Junior Section building at Ali Public School",
  campus: "The Ali Public School campus on Kohat Road, Peshawar",
} as const;
