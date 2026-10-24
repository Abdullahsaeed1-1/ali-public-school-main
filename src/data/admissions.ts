/**
 * Admissions, from the school's own published Admission Policy
 * (`APSCONTENTREFERENCE.md` 4.2) and the selling points it repeats across its
 * own admissions notices (9.3).
 *
 * ⚠️ What was here before: a seven-row "eligibility table" giving an age range
 * for every class from Playgroup to Class 10. **The school has never published
 * those age ranges.** They were invented. The school publishes exactly two
 * entry rules, both below — that is what this page now says.
 */

/** Verbatim, reference 4.2. */
export const admissionsIntro =
  "Ali Public School welcomes students from a broad spectrum of ability although standards and expectations are high. Our priority is to ensure that all pupils joining the school are able to benefit positively from the curriculum on offer and to enjoy academic and personal success in the future.";

export const admissionSteps = [
  {
    title: "Visit or WhatsApp",
    description:
      "Come and see the school, or message the office. Parents are advised to visit before registering, to satisfy themselves that the school is equipped to meet their child's needs.",
  },
  {
    title: "Registration",
    description:
      "Collect an application form directly from the school, complete it, and return it with the required documents.",
  },
  {
    title: "Entrance Test",
    description:
      "For class 1 to 10. A score of 50% or above means an applicant is eligible for consideration.",
  },
  {
    title: "Confirmation",
    description:
      "On receipt of an application form and fee, parents are provided with written confirmation of a place on an agreed date.",
  },
] as const;

/**
 * The school's two published entry rules, in its own words. Replaces the
 * invented age table described in the file header.
 */
export const entryRequirements = [
  {
    stage: "Nursery & K.G.",
    rule: "Parents may apply to register a child for entry at any time before the usual entry point of 4+. Pupils are taught in their academic year. If places are available, pupils may enter at other ages.",
  },
  {
    stage: "Class 1 – 10",
    rule: "Students are admitted on the basis of their ability as determined by their performance in an entrance test set and administered by Ali Public School. A score of 50% or above means that an applicant is eligible for consideration for admission.",
  },
] as const;

/** Verbatim checklist, reference 4.2. */
export const requiredDocuments = [
  "Your child's birth certificate and/or Form B",
  "Your child's 3 passport size photographs",
  "A copy of the CNIC of your child's parents or guardian",
  "Your child's previous school leaving certificate, if applicable",
] as const;

/**
 * How places are allocated — the school's own fairness statement, which is
 * worth showing because it answers the question parents actually worry about.
 */
export const allocationPolicy = [
  "Available places are offered to pupils strictly in registration order, irrespective of gender, class, disability and ability.",
  "The School will act reasonably when considering an application for entry by a parent or guardian of a prospective pupil with a disability.",
  "All applications received are considered on an 'equal preference' basis.",
] as const;

/** The provision the school lists in its own admissions notices (reference 9.3). */
export const whatWeOffer = [
  "Oxford Syllabus",
  "Excellent & Qualified Staff",
  "Arabic Language Course",
  "Computing Classes",
  "Fully Equipped IT Lab",
  "Own Transport Fleet",
  "Separate Play Ground",
  "Registered with PSRA",
] as const;

/**
 * Answers drawn from the published policy, not written by us. The fee answer
 * stays a pointer to the office because the school has never published fees —
 * see PLAN.md §0.
 */
export const admissionFaqs = [
  {
    question: "Is there an entrance test?",
    answer:
      "Yes, for class 1 to 10. Students are admitted on the basis of their performance in an entrance test set and administered by the school. A score of 50% or above means an applicant is eligible for consideration. Nursery and K.G. have no test — parents may register a child at any time before the usual entry point of 4+.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Your child's birth certificate and/or Form B, three passport size photographs, a copy of the CNIC of the parents or guardian, and the previous school leaving certificate if applicable.",
  },
  {
    question: "How are places allocated?",
    answer:
      "Available places are offered strictly in registration order, irrespective of gender, class, disability and ability. All applications are considered on an 'equal preference' basis.",
  },
  {
    question: "What are the school fees?",
    answer:
      // TODO: the school has never published a fee structure. Ask for one.
      "Please contact the school office for the current fee structure for your child's class.",
  },
  {
    question: "Can I visit before applying?",
    answer:
      "Yes, and the school encourages it. Parents are advised to visit prior to registration to satisfy themselves that the school is equipped to meet the needs of their child.",
  },
] as const;
