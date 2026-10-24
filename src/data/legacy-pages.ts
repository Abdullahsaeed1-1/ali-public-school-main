/**
 * The legacy WordPress pages that keep their URL and get a page of their own:
 * the About Us sub-pages, every Academics policy page, the two archived term
 * calendars and Careers → Vacancies.
 *
 * Content sources, in order of preference:
 *   1. data already on this site (`policies.ts`, `about.ts`) — itself a
 *      verbatim transcription of the legacy site
 *   2. `APSCONTENTREFERENCE.md`, verbatim
 *   3. the read-only crawl of the live site on 16 October 2026, for the few
 *      pages the reference did not transcribe (the 2017–2019 term dates and
 *      the organisational chart)
 *
 * The only edits are the ones PLAN.md §0 already rules on: obvious typos,
 * "boys" → "students" where the school meant all pupils, and the Boys &
 * Senior Section's 2019 future tense moved to the present.
 *
 * Titles keep the legacy page title word for word (migration report §3.1),
 * except "School Unifrom", which is spelt correctly in the title and heading
 * while the misspelt URL stays exactly as it was.
 */
import type { ContentBlock } from "@/components/content/Blocks";
import { coreValues, whatMakesUsDifferent } from "@/data/about";
import { policies, policyPaths } from "@/data/policies";
import { site } from "@/data/site";
import type { Crumb } from "@/lib/schema";

export interface LegacyPage {
  /** The legacy URL, unchanged. */
  path: string;
  /** Page title before " - Ali Public School"; also the h1 unless `h1` is set. */
  title: string;
  h1?: string;
  description: string;
  /** Short line under the heading. Ours, not the school's — keep it factual. */
  standfirst?: string;
  blocks: ContentBlock[];
}

const HOME: Crumb = { name: "Home", path: "/" };
export const ABOUT: Crumb = { name: "About Us", path: "/about-us/" };
export const ACADEMICS: Crumb = { name: "Academics", path: "/academics/" };
export const CAREERS: Crumb = { name: "Careers", path: "/careers/" };

export function trailFor(page: LegacyPage, parent: Crumb): Crumb[] {
  return [HOME, parent, { name: page.h1 ?? page.title, path: page.path }];
}

// ------------------------------------------------------------- About Us

export const aboutPages: LegacyPage[] = [
  {
    path: "/about-us/overview/",
    title: "Overview",
    description:
      "What makes Ali Public School different: leadership on the curriculum, high academic expectations and values of kindness and integrity, in Badaber, Peshawar.",
    blocks: [
      {
        kind: "image",
        src: "/wp-content/uploads/2018/06/class-room-digital.jpg",
        alt: "A digital classroom at Ali Public School",
        width: 960,
        height: 640,
      },
      ...whatMakesUsDifferent.flatMap((section): ContentBlock[] => [
        { kind: "heading", text: section.heading },
        { kind: "para", text: section.body },
      ]),
    ],
  },
  {
    path: "/about-us/junior-section/",
    title: "Girls & Junior Section",
    description:
      "The Girls & Junior Section of Ali Public School, Badaber, Peshawar: children from age 3, and girls' education through to college, taught by female staff.",
    blocks: [
      {
        kind: "image",
        src: "/wp-content/uploads/2018/03/Annual-Founders-Day-March-2018-17.jpg",
        alt: "Pupils of the Girls & Junior Section at Annual Founders' Day, March 2018",
        width: 960,
        height: 720,
      },
      { kind: "heading", text: "Introduction" },
      { kind: "para", text: "Welcome to our Girls and Junior section where we take in students from the age of 3 and where girls have a chance to continue their education up to college level. This is a place of endeavour, teamwork, integrity and laughter. A place where each child is nurtured. We value education in its widest sense; making the most of today in order that we can make even more of tomorrow. This is 'Learning for Life.'" },
      { kind: "para", text: "Our education is about encouraging our children to be curious, to be creative and to be compassionate. At Ali Public School, Learning is not a spectator sport!" },
      { kind: "para", text: "We work closely with the community and our team of staff is talented and committed and we are proud to attract the best in class. The range of experiences our teaching team provide for our children is superb. Every person cares deeply about the children in their care." },
      { kind: "para", text: "Every morning, your child is welcomed by the Headmistress and two section coordinators; doing our best to ensure that the day begins as we want it to continue – with a smile." },
      { kind: "heading", text: "Junior Section" },
      { kind: "para", text: "We open our doors to toddlers from the age of 3 who are cared for by a team of highly trained dedicated female tutors, treating each child as their own with care and compassion. Children are given ample opportunities to learn while playing and to bond with others. At this formative age, it is essential to provide them with a well-balanced set of activities: playing, listening, being productive members of teams and providing avenues for expression of their intuitions and inherent talents." },
      { kind: "para", text: "Our vast playground has a dedicated play area for young children where they can run, play and do what every child loves most: being playful with his/her friends." },
      { kind: "para", text: "Our classrooms are large and airy with plenty of natural light. Junior section staff have decorated each room, giving it a warm feeling with personal touches to emphasise our belief in being unique in everything we do. Our curriculum is challenging and provides strong foundations with particular focus on literacy and numeracy skills." },
      { kind: "heading", text: "Girls Section" },
      { kind: "para", text: "Summer 2018 was a turning point in the short history of our School. We opened a separate section for girls in class 5 and above. Up to that point, with a heavy heart, we had to see girls leave after class 4; we simply didn't have enough space to offer any further classes. All of that changed in 2018." },
      { kind: "para", text: "Girls can now continue their studies uninterrupted up to and including college level. They have their own separate section, exclusively managed and run by female staff members. We feel confident these talented girls will set the bar very high for future generations to come." },
      { kind: "heading", text: "Facilities" },
      { kind: "para", text: "Facilities in our Girls Section are of the highest quality. With exclusive access to a large playground, they have ample opportunities for physical and extra-curricular activities to complement their routine academic studies." },
    ],
  },
  {
    path: "/about-us/senior-section/",
    title: "Boys & Senior Section",
    description:
      "The Boys & Senior Section of Ali Public School, Badaber, Peshawar: a building opened in 2019 with smart boards in every class, science labs and an IT lab.",
    blocks: [
      {
        kind: "image",
        src: "/wp-content/uploads/2018/01/Sports-Event-Nov-2017-14.jpg",
        alt: "Boys of the Senior Section at the annual sports event, November 2017",
        width: 960,
        height: 720,
      },
      { kind: "heading", text: "Introduction" },
      // 2019 future tense moved to the present (PLAN.md §0); otherwise verbatim.
      { kind: "para", text: "In April 2019, the School reached another milestone with the opening of a brand new building to accommodate boys from class 5 onwards, and the journey of growth continued with the induction of our first college students." },
      { kind: "para", text: "The building has a state of the art IT lab where our students shine in the technologies of the future. Our vision is to become the main IT hub in Peshawar. Expect our students to learn to code from an early age. No longer expect them to be the passive consumers of technology. Instead, envision them as the pioneering innovators of our future. All of this is possible and it is happening right now." },
      { kind: "para", text: "Success is only possible when there is a vision. At APS, our strategy provides the strong pillars for supporting the story of successful change. We are always changing with time and in today's fast paced world, the speed of change matters more than ever before. It is the speed with which we change to evolving circumstances that ultimately defines us. The secret is to be a disruptor rather than being the disrupted." },
      { kind: "heading", text: "Innovate, Innovate, Innovate" },
      { kind: "para", text: "Our message of change is a message of continuous innovation. In order to thrive, Schools of today can no longer rely on traditional methods. The golden rule for us is that we must continue to come up with new methods of delivering up to date knowledge." },
      { kind: "para", text: "Today, the pace of change is so fast that, in order to remain relevant, all sectors must continuously change and reinvent. We must never lose sight of this and welcome the opportunities that such challenges present." },
      { kind: "para", text: "Our aim is always to be the primary drivers of efficiency through innovation on all fronts." },
      { kind: "para", text: "Future belongs to those who are examining themselves right now. Who are challenging themselves and taking themselves out of their comfort zone. Those who are investing in innovation and using new technologies. Who are not afraid of change and not afraid of the future. We are the future." },
      { kind: "heading", text: "Our Facilities" },
      { kind: "para", text: "We place the highest importance on use of technology and all our classes have integrated connectivity and smart board facilities. The first of its kind in Peshawar." },
      { kind: "para", text: "Our chemistry, biology and physics labs are modern, well equipped and safe. There is also a large hall with seating capacity exceeding 100." },
      { kind: "para", text: "Students in Boys and Senior Section enjoy vast spaces for sports such as cricket, athletics, football and many more." },
      { kind: "para", text: "Throughout the building, marble flooring and hand-crafted doors reinforce our motto of quality in everything. Our building was constructed by local craftsmen, people from our community feeling proud to be part of this journey of growth and success." },
    ],
  },
  {
    path: "/about-us/core-values/",
    title: "Core Values",
    description:
      "Ali Public School's eight core values: kindness, responsibility, integrity, selflessness, personal industry, resilience, initiative and moral courage.",
    blocks: [
      { kind: "para", text: "Everyone at Ali Public School & College abides by 8 core values." },
      ...coreValues.flatMap((value): ContentBlock[] => [
        { kind: "heading", text: value.name },
        { kind: "para", text: value.definition },
      ]),
    ],
  },
  {
    path: "/about-us/extracurricular-activities/",
    title: "Extracurricular Activities",
    description:
      "Sports, debating and arts competitions at Ali Public School, Badaber, Peshawar: football, cricket, athletics, volleyball, basketball and more.",
    blocks: [
      {
        kind: "image",
        src: "/wp-content/uploads/2018/06/play-ground-equipment.jpg",
        alt: "Play equipment in the Ali Public School playground",
        width: 960,
        height: 720,
      },
      { kind: "para", text: "Good schooling is not just about studying. Extra-curricular activities are an essential part of a well-rounded educational journey and we are proud of offering unrivalled opportunities to our students in a wide range of activities. An APS student's diary is filled with a wide array of activities, the most important of which is around team and individual sports. The school holds competitive fixtures which take place both during and after school in sports such as football, cricket, athletics, volleyball and basketball. Our annual sports competition is a celebration of emphasis on this important area of development." },
      { kind: "para", text: "With large playgrounds, our pupils are able to take part in team and individual sports, whilst the very young ones can enjoy playing on various slides and swings. Students are also tested intellectually through debating as well as arts competitions." },
      { kind: "para", text: "All the activities are designed to supplement school curriculum and provide additional opportunities for our students to develop skills, character, and leadership." },
    ],
  },
  {
    path: "/about-us/organizational-chart/",
    title: "Organisational Structure",
    description:
      "The organisational structure of Ali Public School & College, Peshawar: the CEO, the Principal and section heads, finance, quality assurance and administration.",
    blocks: [
      { kind: "heading", text: "Ali Public School Organisational Structure" },
      {
        kind: "image",
        src: "/wp-content/uploads/2016/02/Organization-Chart-Visio-2.png",
        alt: "Organisational chart of Ali Public School: the CEO at the top, with the Principal, Finance Manager, QA & IA Manager and Admin Manager reporting to the CEO. The full structure is set out in text below.",
        width: 1016,
        height: 1206,
      },
      // A text equivalent of the chart, transcribed from the image itself, so
      // the structure is readable without it (report §3.1).
      { kind: "subheading", text: "Chief Executive Officer" },
      { kind: "para", text: "Four departments report to the CEO:" },
      { kind: "subheading", text: "Principal" },
      { kind: "list", items: ["Personal Assistant", "Senior Section Head — Tutors; Lab Manager", "Junior Section Head — Tutors", "Examinations Controller", "PTI"] },
      { kind: "subheading", text: "Finance Manager" },
      { kind: "list", items: ["Chief Accountant", "Assistant Accountant", "IT Manager", "Stock Control Supervisor"] },
      { kind: "subheading", text: "QA & IA Manager" },
      { kind: "list", items: ["Assistant QA & IA Manager"] },
      { kind: "subheading", text: "Admin Manager" },
      { kind: "list", items: ["Assistant Admin Manager", "HR Specialist", "WPR Administrator", "Legal Advisor"] },
    ],
  },
];

// ------------------------------------------------------------- Academics

/** policies.ts slug → meta description. URLs live in `policyPaths`. */
const policyDescriptions: Record<string, string> = {
  "school-rules":
    "School rules at Ali Public School & College, Badaber, Peshawar: respect for each other, for each other's property and for the School's facilities.",
  attendance:
    "Student attendance policy at Ali Public School, Peshawar: lateness, sickness, appointments and leave of absence, with the request form to download.",
  homework:
    "Homework policy at Ali Public School, Peshawar: daily homework timetables for Nursery & K.G., Classes 1–3, Classes 4–8 and Classes 9–10.",
  behaviour:
    "Behaviour, discipline and exclusions policy at Ali Public School, Peshawar: expectations, praise, support, responses to poor behaviour and parents' role.",
  "anti-bullying":
    "Anti-bullying policy at Ali Public School, Peshawar: aims, objectives, what bullying is, recognising bullies, silence and secrecy, and sanctions.",
  complaints:
    "How parents can raise a concern or complaint at Ali Public School, Badaber, Peshawar, and what will happen next.",
  uniform:
    "School uniform at Ali Public School, Peshawar: winter and summer uniform items and colours for boys and girls, and the adornments not allowed.",
  "health-and-safety":
    "Health and safety policy at Ali Public School, Peshawar: responsibilities, accidents, hazards, hygiene, school vans, security and contractors.",
  visitors:
    "Visitors policy at Ali Public School, Peshawar: how visitors register, rules for outsiders on school grounds, and behaviour that is not acceptable.",
};

/** The attendance policy promised its leave form "from the links given below". */
const attendanceDownloads: ContentBlock = {
  kind: "downloads",
  items: [
    { label: "Leave of Absence Request Form", href: "/downloads/Leave%20of%20Absence%20Request%20Form.doc", format: "Word" },
    { label: "Leave of Absence Request Form", href: "/downloads/Leave%20of%20Absence%20Request%20Form.pdf", format: "PDF" },
  ],
};

export const policyPages: LegacyPage[] = policies.map((policy) => {
  const path = policyPaths[policy.slug];
  const description = policyDescriptions[policy.slug];
  if (!path || !description) throw new Error(`No legacy URL or description for policy "${policy.slug}"`);
  return {
    path,
    title: policy.title,
    description,
    blocks:
      policy.slug === "attendance"
        ? [...policy.blocks, { kind: "heading", text: "Download the form" }, attendanceDownloads]
        : [...policy.blocks],
  };
});

const ARCHIVE_NOTE =
  `This is an archived calendar, kept for reference. Dates for the current session are issued by the school office — call ${site.phone}.`;

export const termDatePages: LegacyPage[] = [
  {
    path: "/academics/school-terms-and-holiday-dates-for-the-academic-year-2019-2020/",
    title: "School Term & Holiday Dates for the Academic Year 2019-2020",
    description:
      "Archived term and holiday dates for the 2019–2020 academic year at Ali Public School, Peshawar: exams, vacations, sports week and annual day.",
    standfirst: ARCHIVE_NOTE,
    blocks: [
      { kind: "heading", text: "Examinations / Activities / Holidays" },
      {
        kind: "table",
        head: ["Date", "Event"],
        rows: [
          ["01 May 2019", "Labour Day"],
          ["20 May 2019", "1st Bi-Monthly Exam"],
          ["04 Jun 2019", "Summer Vacations"],
          ["02 Sep 2019", "School Reopening"],
          ["09 & 10 Sep 2019", "Yom-e-Ashur"],
          ["21 Oct 2019", "Mid Term Exam"],
          ["26 Nov 2019", "Sports Week"],
          ["09 Dec 2019", "2nd Bi-Monthly Exam"],
          ["23 Dec 2019", "Winter Vacations"],
          ["10 Jan 2020", "Speech Competition"],
          ["05 Feb 2020", "Kashmir Day"],
          ["04 Mar 2020", "Final Term Exam"],
          ["23 Mar 2020", "Annual Day"],
        ],
      },
    ],
  },
  {
    path: "/academics/school-term-holiday-dates-for-the-acamedic-year-2017-2019/",
    title: "School Term & Holiday Dates for the Academic Year 2017-2019",
    description:
      "Archived term and holiday dates for the 2017–2019 academic years at Ali Public School, Peshawar: six terms with summer and winter holidays.",
    standfirst: ARCHIVE_NOTE,
    blocks: [
      { kind: "para", text: "These agreed term dates provide a guide. Sometimes a school may adjust the dates slightly due to specific circumstances, and we recommend that you check with the school if a specific date is key to your plans." },
      {
        kind: "table",
        head: ["Term", "Starts", "Ends", "Holiday after"],
        rows: [
          ["Term 1", "Monday 10 April 2017", "Saturday 10 June 2017", "Summer: 11 June – 20 August 2017"],
          ["Term 2", "Monday 21 August 2017", "Friday 22 December 2017", "Winter: 23 December 2017 – 7 January 2018"],
          ["Term 3", "Monday 8 January 2018", "Thursday 22 March 2018", "—"],
          ["Term 4", "Monday 2 April 2018", "Saturday 2 June 2018", "Summer: 3 June – 19 August 2018"],
          ["Term 5", "Monday 20 August 2018", "Friday 21 December 2018", "Winter: 22 December 2018 – 6 January 2019"],
          ["Term 6", "Monday 7 January 2019", "Friday 22 March 2019", "—"],
        ],
      },
      { kind: "para", text: "Public holidays in every term: as per Government announcements." },
    ],
  },
];

/** Every page under /academics/ served by the [slug] route. */
export const academicsPages: LegacyPage[] = [...policyPages, ...termDatePages];

/**
 * The old site's footer "Quick Links" — every policy, from every page. The
 * admission policy has its own designed page; the rest are listed in the
 * legacy order.
 */
export const policyFooterLinks: { label: string; href: string }[] = [
  { label: "Admission Policy", href: "/academics/admission-policy/" },
  ...policyPages.map((page) => ({ label: page.title, href: page.path })),
  { label: "Term & Holiday Dates", href: termDatePages[0].path },
];

// ------------------------------------------------------------- Careers

export const vacanciesPage: LegacyPage = {
  path: "/careers/vacancies/",
  title: "Vacancies",
  description:
    "Vacancies at Ali Public School & College, Peshawar: competitive salaries, benefits and free transport for female staff, and how to apply by email or post.",
  blocks: [
    { kind: "para", text: "Ali Public School is proud to be an investor in people. Ali Public School is committed to developing and supporting all members of its staff. We offer competitive salaries and an excellent benefits package. Whether you are just starting in your professional career or considering joining Ali Public School with more experience behind you, we are sure you will find working with us satisfying and enjoyable." },
    { kind: "heading", text: "Apply for a job" },
    { kind: "para", text: `If you wish to apply for a job at Ali Public School please complete the application form below and email it to ${site.email}, or post it to the HR Department at our main office address: ${site.address}.` },
    { kind: "para", text: "You can also apply by sending your CV, mentioning the position in the subject line." },
    {
      kind: "downloads",
      items: [
        { label: "Job Application Form", href: "/downloads/Job%20Application%20Form.doc", format: "Word" },
        { label: "Job Application Form", href: "/downloads/Job%20Application%20Form.pdf", format: "PDF" },
      ],
    },
    { kind: "heading", text: "Current openings" },
    { kind: "para", text: "We do not keep a published list of open positions. Speculative applications are welcome at any time — send your CV with the position you are interested in, and the office will be in touch if something suitable comes up." },
  ],
};
