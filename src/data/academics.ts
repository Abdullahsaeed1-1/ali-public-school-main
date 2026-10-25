/**
 * What the school teaches, and how the year is shaped.
 *
 * The legacy site had no single academics page — MASTERPROMPT §4 asks for one
 * built from what is scattered across it. Every item here comes from
 * `APSCONTENTREFERENCE.md`: the subject list from the homework timetables
 * (4.4), the selling points repeated across the 2020 admissions posts (9.3),
 * the exam rhythm from the term-dates calendar (4.8), and the boards and
 * registrations from Part 0.4.
 */

/** From the homework timetables, 4.4 — these are the subjects actually taught. */
export const subjects = [
  { name: "English", stage: "All classes" },
  { name: "Urdu", stage: "All classes" },
  { name: "Maths", stage: "All classes" },
  { name: "Science", stage: "Nursery to Class 8" },
  { name: "Islamiyat", stage: "Class 1 upward" },
  { name: "Social Studies / Geography", stage: "Class 4 upward" },
  { name: "Physics", stage: "Class 9 – 10" },
  { name: "Chemistry", stage: "Class 9 – 10" },
  { name: "Biology", stage: "Class 9 – 10" },
  { name: "Computing / IT", stage: "All classes" },
  { name: "Arabic", stage: "Offered as a language course" },
] as const;

/**
 * What the school itself lists when it advertises. Reference 9.3 — these exact
 * phrases repeat across the admissions posts of 2020.
 */
export const provision = [
  {
    title: "Oxford Syllabus",
    detail: "The syllabus the school teaches to, named in every admissions notice it publishes.",
  },
  {
    title: "Smart Boards in Every Class",
    detail:
      "Integrated connectivity and smart board facilities throughout — the school describes this as the first of its kind in Peshawar.",
  },
  {
    title: "Fully Equipped IT Lab",
    detail:
      "Twelve computers were added in September 2020 alone, eight to the boys' section and four to the girls'.",
  },
  {
    title: "Science Laboratories",
    detail: "Modern, well equipped and safe chemistry, biology and physics labs.",
  },
  {
    title: "Arabic Language Course",
    detail: "Offered alongside the core curriculum.",
  },
  {
    title: "Qualified Teaching Staff",
    detail:
      "Experienced, dedicated and well-qualified faculty — the phrase the school uses of itself.",
  },
  {
    title: "Own Transport Fleet",
    detail:
      "The school runs its own vans, with conductors aboard and qualified drivers. Economy and safety together.",
  },
  {
    title: "Separate Play Ground",
    detail:
      "Large playgrounds and a sports ground, plus a dedicated junior play area with slides and swings.",
  },
] as const;

/**
 * The shape of the academic year, taken from the structure of the 2019–2020
 * calendar (4.8). The dates on that calendar are six years out of date and are
 * deliberately NOT reproduced — only the rhythm, which has not changed.
 */
export const examRhythm = [
  {
    name: "First Bi-Monthly Exam",
    when: "Around May",
    detail: "Followed by a results day celebrated across the whole school.",
  },
  {
    name: "Mid-Term Exam",
    when: "Around October",
    detail: "The mid-point check before the second half of the session.",
  },
  {
    name: "Second Bi-Monthly Exam",
    when: "Around December",
    detail: "Sat before the winter vacation.",
  },
  {
    name: "Final Term Exam",
    when: "Around March",
    detail: "Closing the academic session, ahead of Annual Day.",
  },
] as const;

/** Reference 0.4 and 14. */
export const qualifications = [
  {
    name: "Middle Pass Certificate",
    body: "BISE Peshawar",
  },
  {
    name: "Secondary School Certificate (SSC)",
    body: "BISE Peshawar",
  },
  {
    name: "Higher Secondary School Certificate (HSSC)",
    body: "BISE Peshawar — the F.Sc. pathway, to age 18",
  },
  {
    name: "ACCA Trainee Programme",
    body: "Approved Employer — Trainee Development, Gold",
  },
] as const;

/** Reference Part 7, modernised. The legacy page's Word/Adobe download flow is
 *  replaced by the email route the school's own recruitment posts already use. */
export const careers = {
  intro:
    "Ali Public School is proud to be an investor in people. Ali Public School is committed to developing and supporting all members of its staff. We offer competitive salaries and an excellent benefits package. Whether you are just starting in your professional career or considering joining Ali Public School with more experience behind you, we are sure you will find working with us satisfying and enjoyable.",
  benefits: [
    "Competitive salaries and an excellent benefits package",
    "Free transportation for female staff",
    "A school that has been investing in its facilities every year since 2012",
  ],
  howToApply: [
    "Send your CV to the school by email, or bring it to the main office.",
    "Put the position you are applying for in the subject line.",
    "The HR Department will be in touch about next steps.",
  ],
  // TODO: the school has not published a list of current openings. Ask for one
  // — until then this page invites speculative applications, which is what the
  // school's own recruitment posts have always done.
  openRoles: null,
} as const;
