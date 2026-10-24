/**
 * The school's news and events archive, 2015–2022.
 *
 * Transcribed from `APSCONTENTREFERENCE.md` Part 9, which is itself a verbatim
 * capture of the legacy site. This is the most credible content the school
 * owns — it is the institution describing its own history, in its own words,
 * over seven years. Nothing here is written by us.
 *
 * Where the legacy site published a headline with no body text, `body` is an
 * empty array and the card shows the title and date alone rather than inventing
 * a summary.
 *
 * The legacy site filed some posts under both News and Events; `categories`
 * carries both, exactly as it did.
 *
 * Every post keeps its legacy URL in `path` (`/YYYY/MM/DD/slug/`). That is
 * the canonical address — Google has indexed these for years. Of the 94
 * dated URLs in the legacy sitemap, 79 are here. The other 15 are the
 * WordPress theme's Lorem-ipsum demo posts (14, retired with 410) and the
 * duplicate Principal profile (301 to /principals-message/); see
 * `src/data/legacy-routes.ts`.
 */

export type NewsCategory = "News" | "Events";

export interface NewsPost {
  /** Internal key only — never part of a URL. */
  slug: string;
  /**
   * The post's URL on the legacy WordPress site, kept byte-for-byte (date
   * segments, slug typos, the numeric `/2363/` slug and the percent-encoded
   * Urdu slug included). This is the canonical URL — see the SEO migration
   * report §6.2. Never change one of these.
   */
  path: string;
  /** ISO date, for sorting and <time dateTime>. */
  date: string;
  title: string;
  /** Verified against the live site's own category terms (October 2026 crawl). */
  categories: NewsCategory[];
  /** Legacy tag slugs, where the live site used any. Each has a /tag/ page. */
  tags?: string[];
  /**
   * The post's featured image on the legacy site, mirrored at the same
   * `/wp-content/uploads/` path so the old image URL keeps resolving.
   */
  image?: string;
  /** Paragraphs, verbatim. Empty when the legacy post had no body. */
  body: string[];
}

const N: NewsCategory[] = ["News"];
const E: NewsCategory[] = ["Events"];
const NE: NewsCategory[] = ["Events", "News"];

/** Newest first. */
export const newsPosts: NewsPost[] = [
  // ---------------------------------------------------------------- 2022
  {
    slug: "friday-activities-junior-girls-boys-campuses",
    path: "/2022/10/28/friday-activities-in-junior-girls-and-boys-campuses/",
    image: "/wp-content/uploads/2022/10/Friday-Activities-in-Junior-Girls-and-Boys-Campuses-2022-10-28-10.jpeg",
    date: "2022-10-28",
    title: "Friday Activities in Junior, Girls and Boys Campuses",
    categories: N,
    body: [
      "Friday Activities in Junior, Girls and Boys Campuses. Students did team-building games and recreational activities. They're a super way to give students the chance to get to know one another, build trust as a community, and, best of all, have fun!",
    ],
  },
  {
    slug: "first-bi-monthly-tests-results-day-celebrations",
    path: "/2022/10/22/1st-bi-monthly-tests-results-day-celebrations/",
    image: "/wp-content/uploads/2022/10/2022-10-22-1st-Bi-Monthly-Tests-Results-Day-Celebrations-01.jpg",
    date: "2022-10-22",
    title: "1st Bi Monthly Tests Results Day Celebrations",
    categories: N,
    body: [
      "1st Bi Monthly Tests Results Day Celebrations were held in spacious school ground of Ali Public School.",
    ],
  },
  {
    slug: "eid-al-adha-mubarak-2022",
    path: "/2022/07/08/eid-al-adha-mubarak/",
    image: "/wp-content/uploads/2022/07/2022-09-07-Eid-Al-Adha-Mubarak.jpeg",
    date: "2022-07-08",
    title: "Eid Al-Adha Mubarak",
    categories: N,
    body: ["Ali Public School & College wishes you Eid Al-Adha Mubarak."],
  },
  {
    slug: "final-exams-results-2022",
    path: "/2022/06/09/final-exams-results/",
    image: "/wp-content/uploads/2022/06/2022-06-final-exam-result-26.jpeg",
    date: "2022-06-09",
    title: "Final Exams Results",
    categories: N,
    body: [
      "Congratulations to all students for completing 2021-22 academic session. Thanks to all APSC team.",
    ],
  },
  {
    slug: "classter-school-management-system",
    path: "/2022/05/16/apsc-is-proud-to-partner-with-classter-for-a-cloud-based-school-management-system/",
    image: "/wp-content/uploads/2022/05/classter-logo-web.jpg",
    date: "2022-05-16",
    title:
      "APSC is proud to partner with Classter for a cloud based School Management System",
    categories: N,
    body: [
      "APSC is proud to partner with Classter for a cloud based School Management System that enables students and parents real time access to their data such as results cards, timetables, class assignments, home work, leave applications, attendance records, bills and much more.",
    ],
  },
  {
    slug: "ramadan-kareem-2022",
    path: "/2022/04/01/ramadan-kareem/",
    image: "/wp-content/uploads/2022/04/Ramadan-Kareem.jpeg",
    date: "2022-04-01",
    title: "Ramadan Kareem",
    categories: N,
    body: [
      "Happy Ramadan. Wishing you all a blessed Ramadan that will inspire you with courage and strength that will help you to win every challenge of life!",
    ],
  },

  // ---------------------------------------------------------------- 2021
  {
    slug: "3d-science-models-and-diagrams-by-students",
    path: "/2021/12/02/3d-science-models-diagrams-by-students/",
    image: "/wp-content/uploads/2021/12/Science-Project-Model.jpg",
    date: "2021-12-02",
    title: "3D Science Models & Diagrams by Students",
    categories: N,
    body: [
      "Students created 3D science models and diagrams of Neuron, Sodium Atom, Pollination in flowers, Human Heart, Digestive System, Human Respiratory System, Food Chain, Animal Cell.",
    ],
  },
  {
    slug: "junior-campus-activities",
    path: "/2021/12/02/junior-campus-activities/",
    image: "/wp-content/uploads/2021/12/Junior-Campur-Activities.jpg",
    date: "2021-12-02",
    title: "Junior Campus Activities",
    categories: N,
    body: [
      "Junior Section kids were involved in fun school activities, learning in school becomes an interesting and enjoyable exercise.",
    ],
  },
  {
    slug: "junior-campus-teachers-day-celebration",
    path: "/2021/10/05/junior-campus-teachers-day-celebration-activities/",
    image: "/wp-content/uploads/2021/10/happy-teachers-day-2021.jpg",
    date: "2021-10-05",
    title: "Junior Campus: Teachers' Day celebration activities",
    categories: NE,
    body: [
      "The duties of a teacher are neither few nor small, but they elevate the mind and give energy to the character. Teachers can change lives with just the right mix of love chalk and challenges. Students of Ali Public School & College celebrated the Teachers Day by giving tribute to their teachers.",
    ],
  },
  {
    slug: "parents-teacher-meeting-september-2021",
    path: "/2021/09/20/parents-teacher-meeting-20-september-2021/",
    image: "/wp-content/uploads/2021/09/2021-09-20-Parents-Teacher-Meeting.jpeg",
    date: "2021-09-20",
    title: "Parents Teacher Meeting (20 September 2021)",
    categories: NE,
    body: [
      "Parents Teacher Meeting was conducted on Friday 20 September, 2021. It was well attended with great two way interaction. The motive of the meeting was to update parents about the progress of their children.",
    ],
  },
  {
    slug: "happy-eid-al-adha-2021",
    path: "/2021/07/20/eid-al-adha-mubarik/",
    image: "/wp-content/uploads/2021/07/Eid-al-Adha-Mubarik-2021.jpg",
    date: "2021-07-20",
    title: "Happy Eid-al-Adha to All!",
    categories: NE,
    body: [],
  },
  {
    slug: "annual-founders-day-june-2021",
    path: "/2021/06/17/apsc-annual-founders-day-13-june-2021/",
    image: "/wp-content/uploads/2021/06/2021-06-13-APSC-annual-founders-day-18.jpeg",
    date: "2021-06-17",
    title: "APS&C Annual Founders Day (13 June 2021)",
    categories: NE,
    body: [
      "APS&C Annual Founders Day celebrated with traditional zeal and fervour.",
    ],
  },
  {
    slug: "nursery-counting-backward-activity",
    path: "/2021/02/20/junior-section-nursery-boys-and-girls-busy-with-counting-backward-activity/",
    image: "/wp-content/uploads/2021/02/counting-backward-activity-2021-02-21-2.jpeg",
    date: "2021-02-20",
    title:
      "Junior Section: Nursery boys and girls busy with counting backward activity",
    categories: N,
    body: ["Nursery boys and girls busy with counting backward activity."],
  },
  {
    slug: "new-building-tour-2021",
    path: "/2021/02/04/ali-public-school-college-new-building/",
    image: "/wp-content/uploads/2021/02/ali-public-school-and-college-2021-02-04-3.jpeg",
    date: "2021-02-04",
    title: "Ali Public School & College New Building",
    categories: N,
    body: ["A illustrative tour to Ali Public School & College new building."],
  },
  {
    slug: "junior-section-activities-2021",
    path: "/2021/02/04/junior-section-activities/",
    image: "/wp-content/uploads/2021/02/junior-section-activities-2021-02-04-5.jpeg",
    date: "2021-02-04",
    title: "Junior Section Activities",
    categories: N,
    body: [
      "Junior section had been involved in educational yet interesting activities. No doubt learning is a fun.",
    ],
  },

  // ---------------------------------------------------------------- 2020
  {
    slug: "sundry-pictures-october-2020",
    path: "/2020/10/02/apsc-sundry-pictures/",
    image: "/wp-content/uploads/2020/10/2020_10_sundry_pics-7.jpg",
    date: "2020-10-02",
    title: "APS&C – Sundry Pictures October 2020",
    categories: N,
    body: [],
  },
  {
    slug: "back-to-school-september-2020",
    path: "/2020/09/22/back-to-school-2020/",
    image: "/wp-content/uploads/2020/09/Back-To-School-Tomorrow-Sep-2020.jpg",
    date: "2020-09-22",
    title: "Back to School",
    categories: N,
    body: [
      "Classes 6 to 8 will resume full time studies from tomorrow, 23 September, and we welcome all our old and new students. We are committed to completing the entire course by March 2021.",
    ],
  },
  {
    slug: "new-computer-equipment-2020",
    path: "/2020/09/18/new-computer-equipment/",
    image: "/wp-content/uploads/2020/09/new-computer-equipment-01.jpg",
    date: "2020-09-18",
    title: "New Computer Equipment",
    categories: N,
    body: [
      "Today we installed 12 new computers; 8 in boys and 4 in girls section. When school fully reopens on 30 Sept, we will start to teach our students programming and IT skills of the future.",
    ],
  },
  {
    slug: "nursery-kg-admission-open-2020",
    path: "/2020/09/15/nursery-kg-section-admission-open/",
    image: "/wp-content/uploads/2020/09/Admissions-Autumn-2020-2021.jpg",
    date: "2020-09-15",
    title: "Nursery & KG Section – Admission Open",
    categories: N,
    body: [
      "Separate Brand New Building, Modern Activity Room, Separate Play Ground, Oxford Syllabus, Safe and Healthy Environment, International Standard Assesment.",
    ],
  },
  {
    // ⚠️ CLIENT DECISION PENDING. The legacy post's title and both images are
    // in Urdu (آپ کے خدشات اور ہمارے جوابات — "Your concerns and our
    // answers"). The client asked for no Arabic-script text on the site, so
    // the title is shown in English translation. The URL is the original,
    // percent-encoded Urdu slug, byte-for-byte as in the legacy sitemap, so
    // the address keeps resolving. Both images are the school's own Urdu
    // notices and are shown as published.
    slug: "your-concerns-and-our-answers-2020",
    path: "/2020/09/12/%d8%a2%d9%be-%da%a9%db%92-%d8%ae%d8%af%d8%b4%d8%a7%d8%aa-%d8%a7%d9%88%d8%b1-%db%81%d9%85%d8%a7%d8%b1%db%92-%d8%ac%d9%88%d8%a7%d8%a8%d8%a7%d8%aa/",
    image: "/wp-content/uploads/2020/09/آپ-کے-خدشات-اور-ہمارے-جوابات.jpg",
    date: "2020-09-12",
    title: "Your Concerns and Our Answers",
    categories: N,
    body: [],
  },
  {
    slug: "girls-section-admission-open-2020",
    path: "/2020/09/06/ali-public-school-girls-section-admission-open/",
    image: "/wp-content/uploads/2020/09/girls-section-admissions-open-2020-2021.jpg",
    date: "2020-09-06",
    title: "Ali Public School – Girls Section – Admission Open",
    categories: N,
    body: [
      "We offer Oxford Syllabus, Excellent & Qualified Staff, Arabic Language Course, Computing Classes, Fully Equipped IT Lab, Own Transport Fleet. Separate and safe building for girls, promises better future for your child!",
    ],
  },
  {
    slug: "admissions-open-session-2020-2021",
    path: "/2020/09/02/admissions-open-session-2020-2021/",
    image: "/wp-content/uploads/2020/09/Admissions-Autumn-2020-2021.jpg",
    date: "2020-09-02",
    title: "Admissions Open Session 2020-2021",
    categories: N,
    body: [
      "Experienced, dedicated and well-qualified faculty, Technology based education, Outdoor play area, school own transport facility, Registered with PSRA and much more.",
    ],
  },
  {
    slug: "schools-reopen-september-2020",
    path: "/2020/07/08/schools-are-scheduled-to-reopen-in-first-week-of-september-2020/",
    image: "/wp-content/uploads/2020/07/school-reopening-sep-2020.png",
    date: "2020-07-08",
    title: "Schools are scheduled to reopen in first week of September 2020",
    categories: N,
    body: [
      "Schools are scheduled to reopen in first week of September. APS had planned fully for this delay. We are pioneers in Pakistan for innovative and live online classes; which were a huge success.",
    ],
  },
  {
    slug: "coronavirus-nerve-centre-7th-update",
    path: "/2020/05/11/coronavirus-nerve-centre-organisation-7-th-update/",
    image: "/wp-content/uploads/2020/05/coronavirus.jpg",
    date: "2020-05-11",
    title: "Coronavirus Nerve Centre Organisation – 7th Update",
    categories: N,
    body: [
      "Further to our last memo, on 10th May APS leadership held the 7th meeting of Coronavirus Nerve Centre Organisation. The purpose of meeting was to assess the latest situation and determine the best course of action.",
    ],
  },
  {
    slug: "ramadan-2020",
    path: "/2020/04/22/ramadan-mubarik/",
    image: "/wp-content/uploads/2020/04/Happy-Ramadan-2020.jpeg",
    date: "2020-04-22",
    title: "APS wishes everyone a blessed, safe and joyous Ramadan!",
    categories: N,
    body: [],
  },
  {
    slug: "online-live-lessons-nursery-kg",
    path: "/2020/04/14/stills-from-online-live-lessons-for-nursery-and-kg/",
    image: "/wp-content/uploads/2020/04/Still-from-online-live-lessons-for-Nursery-and-KG.jpg",
    date: "2020-04-14",
    title: "Stills from online live lessons for Nursery and KG",
    categories: N,
    body: [
      "Stills from online live lessons for Nursery and KG. We in Ali Public School & College are proudly committed to bring quality education to our students even in Pandemic situation.",
    ],
  },
  {
    slug: "aps-online-live-classes",
    path: "/2020/04/12/aps-online-live-classes/",
    image: "/wp-content/uploads/2020/04/Onlne-Live-Classes-Ali-Public-School-Peshawar.jpg",
    date: "2020-04-12",
    title: "APS Online Live Classes",
    categories: N,
    body: [
      "On 6th April we launched live online classes and in the past 5 days we have had 24 students attending full day lessons in classes Nursery to 8. The results of live online classes have been fantastic. Kids are focused, interested and keen to learn using new technology. They are given live learning experience and given usual home work. Our tutors are well prepared and trained to make the best use of this time.",
    ],
  },
  {
    slug: "aps-launches-online-classes",
    path: "/2020/03/26/aps-launches-online-classes/",
    image: "/wp-content/uploads/2020/03/online-classes.jpg",
    date: "2020-03-26",
    title: "APS Launches Online Classes",
    categories: N,
    body: [
      "During these testing, and surreal, times everyone at APS is working extra hard to keep things running as normal as possible. We have a strong team and a solid strategy. One of the key pillars of our strategy is to enable digitization in the School at all levels. We see Coronavirus lockdown as an opportunity to execute on this strategy. To this end, we have set an ambitious target: to deliver online classes to all our students.",
    ],
  },
  {
    slug: "session-2020-2021",
    path: "/2020/03/15/ali-public-school-college-session-2020-2021/",
    image: "/wp-content/uploads/2020/03/pdfIcon-1.png",
    date: "2020-03-15",
    title: "Ali Public School & College Session 2020-2021",
    categories: N,
    body: [
      "Quality education at the doorstep of our community.",
      "Ali Public School was founded in 2012 and was granted College status in 2019. We offer a strong academic curriculum, broad co-curricular opportunities, excellent care and a clear sense of values. Our motto is 'Quality in Everything'.",
    ],
  },

  // ---------------------------------------------------------------- 2019
  {
    slug: "extended-winter-vacations-2019",
    path: "/2019/12/31/extended-winter-vacations/",
    image: "/wp-content/uploads/2020/01/winter-vacations-2019.png",
    date: "2019-12-31",
    title: "Extended Winter Vacations",
    categories: N,
    body: [
      "We are pleased to announce that the winter vacation has been extended till 5 January 2020. APS will reopen on Monday the 6 January. Parents/carers are requested to ensure regular attendance and punctuality of their children as we have a lot of course work to catch up on and so therefore cannot afford to lose time.",
    ],
  },
  {
    slug: "sports-events-november-2019",
    path: "/2019/11/30/sports-events-november-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_sports_day_nov_2019.jpg",
    date: "2019-11-30",
    title: "Sports Events – November 2019",
    categories: E,
    body: [],
  },
  {
    slug: "school-field-trips-2019",
    path: "/2019/11/20/school-field-trips/",
    image: "/wp-content/uploads/2019/11/2019-11-school-field-trip-00.jpeg",
    date: "2019-11-20",
    title: "School Field Trips",
    categories: N,
    body: [
      "Last week students from all classes went on school trips with senior section boys visiting Pakistan Aeronautical Complex (PAC) at Kamra on 13 Nov and Junior sections visiting Garrison Park on 15/16 Nov. Everyone appreciated and enjoyed these excisions.",
      "We would like to extend our sincere thanks to Chairman PAC, his team and to Mr Javed Afridi, for giving our students and staff this wonderful opportunity of witnessing, first hand, the construction of JF17 Thunder planes. Our visitors were provided the best welcome, briefing, tour of facilities and light refreshments. Thank you.",
    ],
  },
  {
    slug: "trip-to-pac-kamra-2019",
    path: "/2019/11/17/trip-to-pakistan-aeronautical-complex-pac-kamra-november-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_trip_to_pakistan_aeronautical_comples_kamra_nov_2019.jpg",
    date: "2019-11-17",
    title: "Trip to Pakistan Aeronautical Complex (PAC) Kamra – November 2019",
    categories: E,
    body: [],
  },
  {
    // Filed under Events on the legacy site as a separate photo post from the
    // News announcement below; linked from the old Media Gallery page. Its
    // photographs were hot-linked from Facebook's CDN and no longer load.
    slug: "result-day-november-2019",
    path: "/2019/11/05/result-day-november-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_result_day_nov_2019.jpg",
    date: "2019-11-05",
    title: "Result Day – November 2019",
    categories: E,
    body: [
      "Results day for first bi annual exams, conducted in October, was organised on the 5th November. Bravo to all our students for their hard work.",
    ],
  },
  {
    slug: "results-day-first-bi-annual-exams-2019",
    path: "/2019/11/05/results-day-for-first-bi-annual-exams/",
    image: "/wp-content/uploads/2019/11/First-Bi-Annual-Result-Day-Nov-2019.jpg",
    date: "2019-11-05",
    title: "Results Day for First Bi-Annual Exams",
    categories: N,
    body: [
      "Results day for first bi annual exams, conducted in October, was organised on the 5th November. Bravo to all our students for their hard work.",
    ],
  },
  {
    slug: "dental-hygiene-campaign-2019",
    path: "/2019/10/15/dental-hygiene-campaign/",
    image: "/wp-content/uploads/2019/10/dental-hygiene-campaign-02.jpg",
    date: "2019-10-15",
    title: "Dental Hygiene Campaign",
    categories: N,
    body: [
      "As part of our efforts to educate children in all aspects of matters that are important to day to day life, APS school staff conducted a compaign focused on dental hygiene. This campaign was carried out on Friday the 11th October, 2019. Some pictures of the event from the day. Look out for similar events in the future.",
    ],
  },
  {
    // The Events-category twin of the post above, as on the legacy site.
    slug: "dental-hygiene-campaign-october-2019",
    path: "/2019/10/11/dental-hygiene-campaign-october-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_dental-hygiene-campaign_oct_2019.jpg",
    date: "2019-10-11",
    title: "Dental Hygiene Campaign – October 2019",
    categories: E,
    body: [
      "As part of our efforts to educate children in all aspects of matters that are important to day to day life, APS school staff conducted a compaign focused on dental hygiene. This campaign was carried out on Friday the 11th October, 2019. Some pictures of the event from the day. Look out for similar events in the future.",
    ],
  },
  {
    slug: "back-to-school-2019",
    path: "/2019/08/24/back-to-school/",
    image: "/wp-content/uploads/2019/08/Back-to-School.jpg",
    date: "2019-08-24",
    title: "Back to School",
    categories: N,
    body: [
      "We hope all our students enjoyed the summer break and we look forward to welcoming them back on Monday morning. Attending school after a long break can seem daunting. Everyone at APS realises this.",
    ],
  },
  {
    slug: "eid-al-adha-greetings-2019",
    path: "/2019/08/11/best-eid-al-adha-greetings-to-all/",
    image: "/wp-content/uploads/2019/08/Eid-al-Adha-Mubarik-2019.jpg",
    date: "2019-08-11",
    title: "Best Eid al Adha Greetings to All",
    categories: N,
    body: [
      "On this auspicious event of Eid al Adha, Ali Public School wishes all of you a blessed and Happy Eid.",
    ],
  },
  {
    slug: "launch-of-ali-public-college-april-2019",
    path: "/2019/04/15/launch-of-ali-public-college-april-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_college_launce_april_2019.jpg",
    date: "2019-04-15",
    title: "Launch of Ali Public College – April 2019",
    categories: N,
    body: [],
  },
  {
    slug: "annual-founders-day-march-2019",
    path: "/2019/03/23/annual-founders-day-march-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_annual_founders_day_mar_2019.jpg",
    date: "2019-03-23",
    title: "Annual Founders' Day – March 2019",
    categories: E,
    body: [],
  },
  {
    slug: "new-campus-2019",
    path: "/2019/03/15/ali-public-school-and-college-new-campus/",
    tags: ["ali-public-shool-and-college","badaber","kohat","peshawar"],
    image: "/wp-content/uploads/2019/03/New-College-Campus-e1555737948593.jpg",
    date: "2019-03-15",
    title: "Ali Public School and College New Campus",
    categories: N,
    body: [
      "Ali Public School and College new campus has been raised with modern standards and all facilities that in order to provide better education to the students.",
    ],
  },
  {
    slug: "drawing-and-speech-competition-january-2019",
    path: "/2019/01/18/drawing-and-speech-competition-january-2019/",
    // The legacy post's own photos were hot-linked from Facebook and no
    // longer load; this is its cover image from the legacy Media Gallery.
    image: "/wp-content/uploads/2020/07/ali_public_school_drawing_and_speech_competition_jan_2019.jpg",
    date: "2019-01-18",
    title: "Drawing and Speech Competition – January 2019",
    categories: E,
    body: [],
  },
  {
    slug: "opening-of-ali-public-college",
    path: "/2019/01/05/opening-of-ali-public-college/",
    image: "/wp-content/uploads/2019/01/Ali-Public-College-News-Thumb.jpg",
    date: "2019-01-05",
    title: "Opening of Ali Public College",
    categories: N,
    body: [
      "We are proud to announce the grand opening of Ali Public College on April 2019. It is a big landmark milestone achieved indeed in the history of Ali Public School & College.",
    ],
  },

  // ---------------------------------------------------------- 2018 and earlier
  {
    slug: "positive-pakistan-photo-competition-2018",
    path: "/2018/09/01/appreciation-acknowledgement-from-ispr/",
    image: "/wp-content/uploads/2018/09/Cert.jpg",
    date: "2018-09-01",
    title: "Positive Pakistan Photo Competition Jun 2018",
    categories: N,
    body: [
      "Ali Public School receives appreciation & acknowledgement from Inter Services Public Relations Pakistan Army on participating in Twitter Picture Competition Positive Pakistan. This is indeed a great honour for the school.",
    ],
  },
  {
    slug: "final-sports-day-prize-distribution-2018",
    path: "/2018/11/30/final-sports-day-and-prize-distribution-ceremony-november-2018/",
    image: "/wp-content/uploads/2018/12/2018-11-Final-Sports-Day-and-Prize-Distribution-Ceremony-32.jpg",
    date: "2018-11-30",
    title: "Final Sports Day and Prize Distribution Ceremony 2018",
    categories: E,
    body: [
      "Today our senior section held its final sports day with football matches. Our honourable Principal distributed prizes amongst the winners. Everyone is a winner!",
    ],
  },
  {
    slug: "junior-section-sports-day-2018",
    path: "/2018/11/28/junior-section-sports-day-2018/",
    image: "/wp-content/uploads/2018/12/2018-11-Junior-Section-Sports-Day-15.jpg",
    date: "2018-11-28",
    title: "Junior Section Sports Day 2018",
    categories: E,
    body: [
      "Following on from Girls Section activities on 27 November, our Junior Section students held a fun packed sports and activities day.",
    ],
  },
  {
    slug: "girls-section-sports-day-2018",
    path: "/2018/11/27/girls-section-sports-day/",
    image: "/wp-content/uploads/2018/11/2018_11_girls_section_sports_day_09.jpg",
    date: "2018-11-27",
    title: "Girls Section Sports Day 2018",
    categories: E,
    body: [
      "Sports is an integral part of APS' students routine activities. We believe that a healthy body is essential for a healthy mind and sports is the best way of achieving this goal.",
    ],
  },
  {
    slug: "happy-eid-greetings-2018",
    path: "/2018/06/15/happy-eid-greetings/",
    image: "/wp-content/uploads/2018/06/eid-mubarak.png",
    date: "2018-06-15",
    title: "Happy Eid Greetings",
    categories: E,
    body: [
      "Wishing all Teachers, Students and Staff a very happy Eid day. With this special pray that your Eid be filled with pleasures, smiles, colours, love, sympathies, good feelings, joys and peace.",
    ],
  },
  {
    slug: "annual-founders-day-2018",
    path: "/2018/03/27/annual-founders-day-2018/",
    image: "/wp-content/uploads/2018/03/Founders-Day-2018.png",
    date: "2018-03-27",
    title: "Annual Founder's Day 2018",
    categories: E,
    body: [
      "We celebrated our annual founders' day in the school sports ground. All activities were performed by APS students; they were the true stars.",
    ],
  },
  {
    slug: "girls-section-announcement-2018",
    path: "/2018/02/23/girls-section/",
    image: "/wp-content/uploads/2018/02/girls-section-new.png",
    date: "2018-02-23",
    title: "Girls Section",
    categories: N,
    body: [
      "Ali Public School is entering the new phase of its evolution with the expansion of school facilities to now include a separate girls section. Work on that section has already started where we will be welcoming students in April 2018. This section will cater for the needs of girls in classes 4 to 7.",
    ],
  },
  {
    slug: "new-playground-equipment-2018",
    path: "/2018/01/20/new-playground-equipment-installed/",
    image: "/wp-content/uploads/2018/01/children-playground.jpg",
    date: "2018-01-20",
    title: "New Playground Equipment Installed",
    categories: N,
    body: [
      "New playground equipment is installed. This will help children to remain fitter, have more energy and greater affiliation with the school. Health is wealth!",
    ],
  },
  {
    slug: "toyota-dream-car-contest-2017",
    path: "/2017/12/13/toyota-dream-car-contest-dec-2017/",
    image: "/wp-content/uploads/2018/01/Toyoya-Dream-Car-Art-Contest.jpg",
    date: "2017-12-13",
    title: "Toyota Dream Car Contest – Dec 2017",
    categories: E,
    body: [
      "How will your dream car make the world a better place? Every year thousands of children share their dreams with Toyota. Join them and discover just how powerful dreaming can be.",
    ],
  },
  {
    slug: "debate-and-speech-competition-november-2017",
    path: "/2017/11/27/debate-speech-competition-nov-2017/",
    image: "/wp-content/uploads/2017/02/debate-and-speech-competition.jpg",
    date: "2017-11-27",
    title: "Debate & Speech Competition – Nov 2017",
    categories: E,
    body: [
      "A debate & speech competition was conducted at APS on Monday the 27th November. Students participated in the event to improve their intellectual and communication skills.",
    ],
  },
  {
    slug: "annual-sports-event-november-2017",
    path: "/2017/11/23/annual-sports-event-nov-2017/",
    image: "/wp-content/uploads/2018/01/Sports-Day-2017.jpg",
    date: "2017-11-23",
    title: "Annual Sports Event – Nov 2017",
    categories: E,
    body: [
      "APS conducted its annual sports event on 22 & 23 Nov, 2017 in the school sports ground. Every class of the school as well as APS staff actively participated in competitive sporting activities such as tug of war, football, badminton, volleyball, frog race, sack race etc.",
    ],
  },
  {
    slug: "drawing-competition-november-2017",
    path: "/2017/11/17/drawing-competition/",
    image: "/wp-content/uploads/2018/01/Drawing-Competition-Nov-2017.jpg",
    date: "2017-11-17",
    title: "Drawing Competition – Nov 2017",
    categories: E,
    body: [
      "A drawing competition was conducted at APS on Friday the 17th November. Students from Junior section participated in the competition to exhibit their creative skills.",
    ],
  },
  {
    slug: "hepatitis-camp-2017",
    path: "/2017/10/18/hepatitis-camp/",
    image: "/wp-content/uploads/2017/10/Hepaitits-Vaccination-Camp.jpg",
    date: "2017-10-18",
    title: "Hepatitis Camp",
    categories: N,
    body: [
      "APS and Gene-Care Welfare organisation jointly conducted a Hepatitis camp at Ali Public School on Wednesday the 11th October. The camp covered both the students and staff. All the results came back negative.",
      "Hepatitis is the term used to describe inflammation of the liver.",
    ],
  },
  {
    slug: "career-opportunities-september-2017",
    path: "/2017/09/03/career-opportunities-at-aps-2/",
    image: "/wp-content/uploads/2016/07/career2.jpg",
    date: "2017-09-03",
    title: "Career Opportunities at APS",
    categories: N,
    body: [
      "Ali Public School is looking for the new staff. We offer extremely attractive salaries, benefits and free transportation (female staff only). You can apply by sending your CV to the school while mentioning the position in the subject line.",
    ],
  },
  {
    slug: "school-reopening-august-2017",
    path: "/2017/08/15/school-reopening-15-aug-2017/",
    image: "/wp-content/uploads/2017/08/school-re-opening.jpg",
    date: "2017-08-15",
    title: "School Reopening – 15 Aug 2017",
    categories: N,
    body: [
      "We all know the feeling — it's that dreaded first day after the end of summer holidays. It's the worst day of the year! So here is something to cheer up our little friends. It's called 'Get out of bed':",
      "Get out of bed, you silly fool! Get up right now, it's time for school.",
    ],
  },
  {
    slug: "summer-vacation-2017",
    path: "/2017/06/08/summer-vacation-2017/",
    image: "/wp-content/uploads/2017/06/Summer-Vacations-2017.jpg",
    date: "2017-06-08",
    title: "Summer Vacation 2017",
    categories: N,
    body: [
      "Ali Public School will be closed for summer vacation till 14 August 2017. The school will reopen on Tuesday, the 15th August. Summer vacation homework is given to each child. We kindly request all parents to support their child's work at home. Happy summer break!",
    ],
  },
  {
    slug: "annual-founders-day-march-2017",
    path: "/2017/03/30/annual-founders-day-march-2017/",
    image: "/wp-content/uploads/2017/04/foundersday.jpg",
    date: "2017-03-30",
    title: "Annual Founders' Day – March 2017",
    categories: E,
    body: [
      "Today we celebrated our annual founders' day in the school sports ground. This year's event was a smashing success. It was our best ever event so far. All activities were performed by APS students; they were the true stars. The parents/guardians of our school were also present in number higher than we have ever witnessed in prior years.",
    ],
  },
  {
    slug: "final-exams-2017",
    path: "/2017/02/13/final-exams-2017/",
    image: "/wp-content/uploads/2017/02/Final-Exams-Announcement-Width.jpg",
    date: "2017-02-13",
    title: "Final Exams 2017",
    categories: N,
    body: [
      "Final exams are scheduled to start from 6th of March 2017. We wish good luck to everyone.",
    ],
  },
  {
    slug: "drawing-competition-february-2017",
    path: "/2017/02/17/drawing-competition-february-2017/",
    image: "/wp-content/uploads/2017/02/Drawing-competition-01.png",
    date: "2017-02-17",
    title: "Drawing Competition – February 2017",
    categories: E,
    body: [
      "To bring out the creativity and artistic talents among the APS students, a drawing competition was conducted at APS here on Friday the 17th Feb. Students participated in the competition to exhibit their creative skills in various topics like 'APS logo', 'founder of the nation' etc. Students proved that they not only excel in academics, but also shine in exhibiting their skills by their creative presentation. Well done guys — you've worked very hard.",
    ],
  },
  {
    slug: "debate-and-speech-competition-february-2017",
    path: "/2017/02/10/debate-speech-competition/",
    image: "/wp-content/uploads/2017/02/debate-and-speech-competition.jpg",
    date: "2017-02-10",
    title: "Debate & Speech Competition – February 2017",
    categories: E,
    body: [
      "Today, APS conducted its first ever debate and speech competition in the school playground. The focus was on content and substance over style, encouraging APS students to engage in an intelligent contest of ideas and holding up their ideas to critical scrutiny. Students from Grade 1 to 4 delivered speeches on multiple topics such as importance of education etc. whereas students from Grade 5 to 9 covered a range of speeches as well as engaging in a healthy debate competition.",
    ],
  },
  {
    slug: "winter-vacations-2016-17",
    path: "/2016/12/22/winter-vacations-academic-year-201617/",
    image: "/wp-content/uploads/2016/12/Winter-Vacations.jpg",
    date: "2016-12-22",
    title: "Winter Vacations Academic Year 2016/17",
    categories: N,
    body: [
      "As per the notification of the Government of KPK, dated 16 December, regarding winter vacation for the academic year 2016/2017, Ali Public School will be closed for winter vacation from 23rd December till 31st December 2016. The school will re-open on Monday, the 2nd Jan 2017. Please note that students will sit a test in the second week of Jan 2017. Parents are therefore kindly requested to support their child's work in home.",
    ],
  },
  {
    slug: "sports-event-december-2016",
    path: "/2016/12/02/sports-event-december-2016/",
    image: "/wp-content/uploads/2016/12/Sports-Day-2016.png",
    date: "2016-12-02",
    title: "Sports Event – December 2016",
    categories: E,
    body: [
      "APS conducted its long-awaited sports event on December the 1st and 2nd, 2016 in the school sports ground. The aim was to encourage APS students of all ages and abilities to participate in different sports. Every class of the school actively participated in competitive sporting activities such as tug of war, football, badminton, volleyball, 50 meter race, frog race, hobble race, sack race, spoon race etc.",
    ],
  },
  {
    slug: "acca-counsellor-symposium-2016",
    path: "/2016/11/24/acca-counsellor-symposium-2016/",
    image: "/wp-content/uploads/2016/11/ACCA-Symposium-2016.jpg",
    date: "2016-11-24",
    title: "ACCA Counsellor Symposium 2016",
    categories: N,
    body: [
      "Our honourable Principal, Maj (R) Manzur Hussain Qureshi, attended the ACCA Counsellor Symposium 2016 organised by ACCA Pakistan on Thursday the 24th November in Peshawar. It was a great platform to collectively brainstorm and answer some of the questions around emerging trends in education techniques and research, professional qualification and some new perspective regarding career options.",
    ],
  },
  {
    slug: "second-term-exams-results-2016",
    path: "/2016/11/18/second-term-exams-results-declaration/",
    image: "/wp-content/uploads/2016/11/Exam-Results.jpg",
    date: "2016-11-18",
    title: "Second Term Exams' Results Declaration",
    categories: N,
    body: [
      "Following on the declaration of the results of second term exams on 18th November, we are pleased to announce that the overall parents' response had been very positive. It was incredible to witness a smashing high turnout of parents for the results' declaration day. We noted a very positive feedback from students and parents about new exam style.",
    ],
  },
  {
    slug: "parents-day-october-2016",
    path: "/2016/10/21/2363/",
    image: "/wp-content/uploads/2016/10/Parents-Day.jpg",
    date: "2016-10-21",
    title: "Parents Day – October 2016",
    categories: N,
    body: [
      "APS on Friday the 21st October held a marvellous gathering on its playground to conduct the Parents' Day. In line with prior year's practice, this year's event of Parents' Day kicked off with a presentation from the CEO, Mr. Ali Afridi, and a brief address from the Principal, Maj (R) Manzur Hussain Qureshi, followed by interactive discussions with the parents.",
    ],
  },
  {
    slug: "career-opportunities-july-2016",
    path: "/2016/07/22/career-opportunities-at-aps/",
    image: "/wp-content/uploads/2016/07/career2.jpg",
    date: "2016-07-22",
    title: "Career Opportunities at APS",
    categories: N,
    body: [
      "Ali Public School is looking for the new staff. We offer extremely attractive salaries, benefits and free transportation (female staff only). You can apply by sending your CV to the school while mentioning the position in the subject line.",
    ],
  },
  {
    slug: "summer-vacation-2016",
    path: "/2016/06/04/summer-vacation-2016/",
    tags: ["summer-vacations-2016"],
    image: "/wp-content/uploads/2016/06/Summer-Vacation.jpg",
    date: "2016-06-04",
    title: "Summer Vacation – 2016",
    categories: N,
    body: [
      "Ali Public School will be closed for summer vacation from 5 June 2016 till 21 August 2016. The school will re-open on 22 August 2016. We hope that your summer break will be a time for family, friends, and festivities. Please note summer vacation homework is mentioned in students' diaries.",
    ],
  },
  {
    slug: "new-academic-session-2016-17",
    path: "/2016/04/22/new-academic-session-2016-17/",
    image: "/wp-content/uploads/2016/04/New-Academic-Session-2016-17.jpg",
    date: "2016-04-22",
    title: "New Academic Session 2016-17",
    categories: N,
    body: [
      "We are pleased to announce that our new academic session 2016-17 has started from Monday 11th April. Excitement and enthusiasm is high among old, returning, students who are eager to meet their friends. The beginning of a new session is always an auspicious time — a time for new hopes and renewed dreams.",
    ],
  },
  {
    slug: "annual-day-event-march-2016",
    path: "/2016/03/30/annual-day-event-march-2016/",
    image: "/wp-content/uploads/2016/03/APS-Annual-Day-2016-01.jpg",
    date: "2016-03-30",
    title: "Annual Day Event, March 2016",
    categories: N,
    body: [],
  },
  {
    slug: "final-exams-2016-march",
    path: "/2016/03/19/final-exams-2016/",
    image: "/wp-content/uploads/2016/03/Results-2016-B.jpg",
    date: "2016-03-19",
    title: "Final Exams 2016",
    categories: N,
    body: [],
  },
  {
    slug: "we-are-hiring-2016",
    path: "/2016/03/15/we-are-hiring/",
    image: "/wp-content/uploads/2016/03/teachers-wanted1.jpg",
    date: "2016-03-15",
    title: "We are hiring",
    categories: N,
    body: [],
  },
  {
    slug: "extension-junior-school-premises-2016",
    path: "/2016/02/24/extenstion-in-aps-junior-school-premises/",
    image: "/wp-content/uploads/2016/02/12523914_1642925142635554_5294347184999716256_n1.jpg",
    date: "2016-02-24",
    title: "Extension in Ali Public School Junior School Premises",
    categories: N,
    body: [],
  },
  {
    slug: "annual-sports-day-2015",
    path: "/2015/12/23/sporting-activities/",
    image: "/wp-content/uploads/2016/03/Sporting-Activities.jpg",
    date: "2015-12-23",
    title: "Annual Sports Day",
    categories: N,
    body: [],
  },
  {
    slug: "final-exams-2016-announcement",
    path: "/2015/12/22/announcement/",
    image: "/wp-content/uploads/2016/03/announcement-post-thumb.png",
    date: "2015-12-22",
    title: "Final Exams 2016",
    categories: N,
    body: [
      "Final exams are scheduled to start from 10th of March 2016. We wish good luck to everyone.",
      "Ali Public School continues to execute on its strategy of building the next generation school. We are pleased to announce the addition of 4 new vehicles bringing the total fleet size to 5.",
    ],
  },
  {
    slug: "we-welcome-our-new-principal",
    path: "/2015/11/07/we-welcome-our-new-principal/",
    image: "/wp-content/uploads/2015/11/principal-post-thumb.jpg",
    date: "2015-11-07",
    title: "We welcome our new principal",
    categories: N,
    body: [
      "We are pleased to welcome our new Principal Maj (R) Manzur Hussain Qureshi. Major (R) Qureshi has solid and distinguished credentials in the field of education with over 14 years of high exposure experience in the most prestigious academic institutions of Pakistan. Having served our country with honour and dignity, he retired from Pak Army.",
    ],
  },
];

// The hand-kept order above drifts in places (2018 especially); everything
// that walks the list — the archive, prev/next links, the feed — wants it
// strictly newest first. Array#sort is stable, so same-day posts keep their
// written order.
newsPosts.sort((a, b) => b.date.localeCompare(a.date));

export const newsCategories: NewsCategory[] = ["News", "Events"];

export function getPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

/**
 * Decodes a URL segment without throwing on a stray `%`. Route params can
 * arrive encoded or decoded depending on how the request was written (the
 * legacy sitemap uses lowercase percent-encoding; browsers send uppercase),
 * so every comparison is done on the decoded form.
 */
export function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** `/2019/03/15/some-slug/` → `["2019", "03", "15", "some-slug"]`, decoded. */
export function postSegments(post: NewsPost) {
  return post.path.split("/").filter(Boolean).map(decodeSegment);
}

export function getPostByParams(year: string, month: string, day: string, slug: string) {
  const wanted = [year, month, day, slug].map(decodeSegment).join("/");
  return newsPosts.find((post) => postSegments(post).join("/") === wanted);
}

/**
 * The legacy site's category archives that had real posts in them. The
 * other seven categories (Academic, Advantage, Advantages, Collective,
 * Education, Facilities, Faculty) held only the WordPress theme's
 * Lorem-ipsum demo posts or the single Principal profile — see
 * `src/data/legacy-routes.ts` for how each is retired.
 */
export const legacyCategories = [
  { slug: "news", name: "News" as NewsCategory },
  { slug: "events", name: "Events" as NewsCategory },
] as const;

/**
 * The legacy tag archives, named exactly as WordPress named them (including
 * the school's own "shool" typo in the slug). Membership is verified from the
 * live site: the four place tags carry only the March 2019 new-campus post.
 */
export const legacyTags = [
  { slug: "badaber", name: "badaber" },
  { slug: "kohat", name: "kohat" },
  { slug: "peshawar", name: "peshawar" },
  { slug: "ali-public-shool-and-college", name: "ali public shool and college" },
  { slug: "summer-vacations-2016", name: "Summer Vacations 2016" },
] as const;

function monthYear(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const titleCount = new Map<string, number>();
const openingCount = new Map<string, number>();
for (const post of newsPosts) {
  const t = post.title.toLowerCase();
  titleCount.set(t, (titleCount.get(t) ?? 0) + 1);
  // Compared on what survives the cut to description length, not the whole
  // paragraph: two openings that differ only after ~150 characters still
  // produce the same description.
  const key = post.body[0]?.slice(0, 150);
  if (key) openingCount.set(key, (openingCount.get(key) ?? 0) + 1);
}

/**
 * The `<title>` text for a post. The legacy site published a few posts under
 * the same headline ("Final Exams 2016", "Career Opportunities at APS",
 * "Back to School"); identical titles make the pair compete with each other,
 * so only those get the month added. The visible h1 is always `post.title`.
 */
export function postSeoTitle(post: NewsPost) {
  return (titleCount.get(post.title.toLowerCase()) ?? 0) > 1
    ? `${post.title} (${monthYear(post.date)})`
    : post.title;
}

/**
 * Text for the meta description. The school's own opening sentence where
 * there is one — except where two posts open with the same sentence (the
 * News and Events twins of the same 2019 event), which get their title and
 * date in front so the two descriptions differ.
 */
export function postDescriptionText(post: NewsPost) {
  const opening = post.body[0];
  if (!opening) return `${post.title}: news from Ali Public School & College, Badaber, Peshawar, ${monthYear(post.date)}.`;
  return (openingCount.get(opening.slice(0, 150)) ?? 0) > 1 ? `${post.title}, ${monthYear(post.date)}: ${opening}` : opening;
}

export function postsInCategory(category: NewsCategory) {
  return newsPosts.filter((post) => post.categories.includes(category));
}

export function postsWithTag(tag: string) {
  return newsPosts.filter((post) => post.tags?.includes(tag));
}

/**
 * The recurring calendar the archive proves, rather than a list of dates we
 * made up. Reference Part 9.6.
 */
export const annualEvents = [
  {
    name: "Annual Founders' Day",
    when: "March",
    detail:
      "Held in the school sports ground, with every item performed by APS students.",
  },
  {
    name: "Sports Week",
    when: "November – December",
    detail:
      "Separate days for the Junior, Girls and Senior Sections. Tug of war, football, badminton, volleyball, cricket, and the 50 metre, frog, hobble, sack and spoon races. Prizes distributed by the Principal.",
  },
  {
    name: "Drawing Competition",
    when: "November, January or February",
    detail:
      "Students exhibit their creative skills on set topics — past subjects have included the APS logo and the founder of the nation.",
  },
  {
    name: "Debate & Speech Competition",
    when: "February and November",
    detail:
      "First held in February 2017. Classes 1–4 deliver speeches; classes 5–9 debate.",
  },
  {
    name: "Results Days",
    when: "After each bi-monthly and term exam",
    detail: "Celebrated in the school ground with the whole school present.",
  },
  {
    name: "Parents' Day and Parent-Teacher Meetings",
    when: "Through the year",
    detail:
      "Opened by the CEO and the Principal, followed by interactive discussion with parents.",
  },
  {
    name: "Friday Activities",
    when: "Weekly",
    detail:
      "Team-building games and recreational activities across all three campuses.",
  },
  {
    name: "School Trips",
    when: "Through the year",
    detail:
      "Past destinations include Pakistan Aeronautical Complex at Kamra, Garrison Park and Murree.",
  },
] as const;
