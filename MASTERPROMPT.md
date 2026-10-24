# MASTER PROMPT — Ali Public School & College, Peshawar
### Premium website rebuild · v2 (content-verified)

Copy everything below this line into Claude Code as your opening prompt.

---

## 0. READ THIS FIRST — THE CONTENT SOURCE OF TRUTH

Before you write a single line of code, open and read **`APS-CONTENT-REFERENCE.md`** in the project root.

That file is a complete, verbatim transcription of the school's existing live website
(alipublicschool.com.pk) — every page, every paragraph, every policy, every news post from
2015 to 2022, the full navigation, the footer, the timings, the registration numbers and the
school's own house style. It is the school talking about itself in its own words.

**The rules that follow from that file are absolute:**

1. **Never invent a fact about this school.** Not a student count, not a pass rate, not a
   teacher's name, not a fee, not a founding date. If the reference file doesn't have it,
   write `{/* TODO: confirm with school */}` and use a neutral placeholder.
2. **Never write generic school copy.** Every paragraph on this site must either be lifted
   from the reference file or be a light, faithful edit of something in it. If you find
   yourself writing "we foster a holistic learning environment," stop — the reference file
   has a better, truer sentence already.
3. **Match the house style in Part 10 of the reference.** British spelling. "Pupils" and
   "students," not "kids." "Class 4," not "Grade 4." Short declarative sentences. The school's
   own recurring phrases — "Quality in Everything," "quality education at the doorstep of our
   community," "we mine for gold in each child," "learning is not a spectator sport" — are the
   brand. Use them.
4. **Part 12 of the reference lists what the old site does not contain.** Those are the only
   gaps. Everything else is answerable from the file.

Content is not the last step of this build. It is the first.

---

## 1. ROLE & MISSION

You are a senior design engineer at a boutique studio known for building the most distinctive
institutional websites in South Asia. Your client is **Ali Public School & College, Peshawar** —
founded in **2012** on Kohat Road, in the Masho Gaggar countryside on the southern outskirts of
Peshawar, in Badabher. Granted **college status in 2019**. Its motto is **"Quality in Everything"**
and its crest carries the Quranic prayer **اهدنا الصراط المستقيم** ("Guide us on the straight path").

This is a school that exists because the area had nothing like it. A parent testimonial on the
old site puts it better than any marketing line could: *"a first of its kind in Peshawar and
particularly in Badaber Area... All the other schools in the area are just working for business
and have no cause of educating the area's children."* That is what the site has to convey — not
prestige for its own sake, but a serious institution built for a community that was underserved.

Your mission: build a website so refined that no school in Pakistan has anything close to it —
yet one that a parent in Badabher on a mid-range Android phone over 3G can open, understand, and
act on in seconds. Premium never means heavy. Premium means intentional.

This is NOT a template job. Every color, typeface, and motion decision must be traceable to this
school's real identity: its crest, its campus, its motto, its community.

---

## 2. TECH STACK (non-negotiable)

- **Next.js 15 (App Router) + TypeScript** — every page statically generated (SSG) so HTML arrives
  fully rendered for Google and WhatsApp link previews
- **Tailwind CSS** — all design tokens defined in the Tailwind theme, no magic values scattered
  in components
- **Framer Motion** — all entrance, scroll, and micro-interactions
- **Lenis** — buttery smooth scrolling, integrated with Framer Motion's `useScroll`
- **next/image** for every image, **next/font** for every typeface (zero layout shift, no FOUT)
- No CMS for v1 — content lives in typed data files (`/src/data/*.ts`) so the school can hand over
  edits later. Every string that came from the reference file lives in a data file, not hardcoded
  in JSX — when the school updates term dates or a policy, one file changes.

---

## 3. BRAND SYSTEM

### Colors (extracted from the school crest and campus architecture)
Define these as Tailwind theme tokens:

- `navy` **#143782** — the crest shield. Primary brand color. Used for the hero, footer, and one
  full-bleed "anchor" section per page. This is where the site feels deep and institutional.
- `navy-ink` **#0C2154** — darker navy for gradients and text on light backgrounds.
- `leaf` **#B4DC78** — the crest wreath green. Accent ONLY: highlights, active states, the
  underline of the motto, small UI details. Never large fills.
- `maroon` **#7B1F2E** — the crest border. Secondary accent: eyebrow labels, dividers, hover
  states. Also echoes the maroon pilasters on the campus building.
- `sand` **#F3EBDD** — warm plaster tone drawn from the campus facade. The default page
  background. NOT pure white — this warmth is what separates the site from every generic school
  template.
- `torch` **#E9B44C** — the crest's torch flame gold. Reserved for ONE thing only: the flame motif
  and rare moments of celebration (results, achievements). Scarcity keeps it special.
- `paper` **#FFFFFF** — cards and surfaces sitting on sand.

Contrast rule: all body text on sand must be `navy-ink` and pass WCAG AA.

### Typography
- **Display:** `Fraunces` (via next/font, optical size axis on) — a characterful serif with warmth
  and authority. Headlines only, tight tracking, weights 500–600. Hero: clamp(2.5rem, 6vw, 5.5rem).
- **Body/UI:** `Manrope` — clean, geometric, highly legible on cheap Android screens. Weights 400–700.
- **Arabic accent:** `Amiri` — used exclusively for the crest motto اهدنا الصراط المستقيم wherever
  it appears. Never machine-fake calligraphy with a Latin font.
- Type scale: define a strict 8-step scale in Tailwind config. No arbitrary font sizes in components.

### Signature element (the one thing people remember)
**"The Straight Path" line.** A single 2px `leaf`-green line that draws itself vertically down the
page as the user scrolls — inspired by the motto "guide us on the straight path." It runs subtly
along the left edge on desktop (hidden on mobile), connecting section to section, with a small
torch-gold node lighting up as each section enters the viewport. Implemented with Framer Motion
`useScroll` + `scaleY` on a fixed-position SVG line. This is the boldness budget — everything else
stays disciplined.

---

## 4. PAGES & STRUCTURE

For every page below, the bracketed reference tells you exactly where in
`APS-CONTENT-REFERENCE.md` the real copy lives. Go read it before you build the page.

### `/` Home
1. **Hero** — full-viewport. Real campus photo at `/public/images/campus-hero.jpg` with a slow Ken
   Burns zoom (20s, subtle, paused on `prefers-reduced-motion`). Navy gradient scrim from bottom.
   Sequence: Amiri motto small at top → Fraunces headline **"Quality in Everything."** word-by-word
   reveal → one line: *"Serving the families of Badabher & Kohat Road since 2012."* → two CTAs:
   solid leaf **"Apply for Admission"** + ghost white **"WhatsApp Us"** (wa.me link, opens chat directly).
2. **Intro strip** — sand background. Mission paragraph adapted from the school's own INTRODUCTION
   text [ref 2.4]. Three stat counters that count up on scroll. Use only numbers you can defend:
   **2012** (founded), **3** (sections), **Ages 3–18** (or class range). Do NOT put a student count
   here until the school gives you one.
3. **Why APS** — 4 cards. Draw them from what the school actually claims [ref 9.3 selling points]:
   *Small Class Sizes* ("our small class sizes ensure that every child is known and cared for"),
   *Smart Classrooms & IT Lab* ("the first of its kind in Peshawar"), *Character & Core Values*
   (the 8 values), *Own Transport Fleet*. Staggered scroll reveal, subtle lift + maroon border-glow
   on hover.
4. **Campus life gallery preview** — horizontal scroll-linked strip, parallax rows at different
   speeds. **Every image in this strip must contain children.** CTA to full gallery.
5. **Principal's word** — navy anchor section. The pull-quote is his own line: *"Our ultimate aim is
   to be the foundations for enlightenment and guidance in the right path."* Attribution:
   **Maj (R) Manzur Hussain Qureshi, Principal**. Crest watermark at 4% opacity behind. Links to the
   full message page. [ref 2.3]
6. **Admissions band** — torch-gold thin top border, headline + the 4 steps preview + WhatsApp CTA.
7. **Footer** — navy-ink. Crest, contact, address, Google Maps link, quick links, school timings,
   BISE & PSRA registration numbers, small motto in Amiri. [ref 0.2, 0.3, 0.4]

### `/about`
The school's story [ref 2.4, 3.1] — founded 2012, Kohat Road, Masho Gaggar countryside, college
status 2019, mission to give this community's children an equal footing. The three "what makes us
different" sections [ref 3.1]. Leadership: **Mr. Ali Afridi, CEO** and **Maj (R) Manzur Hussain
Qureshi, Principal** in alternating layout. Plus a **"Our Crest"** section — shield, wreath, torch,
and the Arabic motto each annotated. No other school site in Pakistan explains its crest; this
section is uniquely APS.

> ⚠️ **Rewrite alert:** the old Overview page says academic results are achieved by "boys from
> across a broad range of ability." The school is co-educational with a full Girls Section. Say
> **students**. Do not carry that error over.

### `/principals-message`
The Principal's message in full, verbatim [ref 2.3]. Portrait, signature block, Fraunces for the
opening line, Manrope for the body. This is one of the strongest pieces of writing the school has —
give it a real page, not a truncated card.

### `/admissions`
- Intro paragraph verbatim [ref 4.2].
- 4-step process (**Visit / WhatsApp → Registration → Assessment → Enrolment**) as a vertical
  timeline that the Straight Path line threads through.
- **Entry requirements, stated plainly** [ref 4.2]: Nursery & K.G. register any time before the
  usual entry point of 4+. Class 1–10 sit an entrance test; **50% or above** is required to be
  considered for admission.
- **Documents checklist** [ref 4.2]: birth certificate and/or Form B · 3 passport-size photographs ·
  copy of parents'/guardian's CNIC · previous school leaving certificate (if applicable).
- **What we offer** grid [ref 9.3]: Oxford Syllabus · Qualified Staff · Arabic Language Course ·
  Computing Classes · Fully Equipped IT Lab · Own Transport Fleet · Separate Play Ground ·
  Registered with PSRA.
- FAQ accordion (Framer Motion height animation) → also emits `FAQPage` JSON-LD.
- Prominent sticky mobile bottom bar: **"WhatsApp Admissions Office."** This is the #1 conversion
  action in Pakistan; treat it as sacred.

### `/campuses`
Three cards:
- **Girls & Junior Section** — from age 3; boys and girls co-educated to age 8; girls continue
  through to college level; staffed exclusively by female teachers under the Headmistress. [ref 3.2]
- **Boys & Senior Section** — boys from age 9 (class 4) upward through F.Sc.; building opened
  April 2019; smart boards in every class, IT lab, chemistry/biology/physics labs, hall seating
  100+, marble flooring and hand-crafted doors by local craftsmen. [ref 3.3]
- **APS Premier** — separate campus under the Ali Public School name; links out to apspremier.com.

Each card: photo, brief, timings, embedded Google Map (lazy-loaded on interaction, not page load).

> ⚠️ The APS Premier card currently has **no image** — just a grey placeholder box. Either get a
> real photo or use the styled crest placeholder. Never ship an empty grey box.

> ⚠️ **Tense fix:** the old Boys & Senior Section copy is written in 2019 future tense — "the new
> building *will have* a state of the art IT lab." It's been built and running for years. Rewrite
> everything into the present.

### `/academics`
The old site had no single academics page — build one from what's scattered across it:
subjects offered [ref 4.4], Oxford syllabus, Arabic, computing, boards (**BISE Peshawar — SSC &
HSSC**, Middle Pass Certificate), the F.Sc. pathway, and the exam rhythm [ref 4.8]: two bi-monthly
exams, mid-term, final term.

### `/policies`
One page, accordion sections, all verbatim from the reference: School Rules [4.1] · Attendance
[4.3] · Homework Policy with all four class timetables [4.4] · Behaviour, Discipline & Exclusions
[4.5] · Anti-Bullying [4.6] · Complaints Policy for Parents [4.7] · Uniform [4.9] · Health & Safety
[4.10] · Visitors Policy [4.11].

These pages are boring to build and they matter enormously — they are what a serious parent reads
before enrolling, and they are proof the school is properly run. Do not summarise them. Ship them
in full.

### `/gallery`
Masonry grid, category filter pills (**Campus / Classrooms / Sports / Students / Events**), lightbox
with `layoutId` shared-element transitions. All images lazy, blurred placeholders.

> ⚠️ **The single biggest content flaw to fix.** The old site's gallery is almost entirely
> buildings — empty classrooms, façades, corridors. Children barely appear, and the Girls & Junior
> Section is represented almost exclusively by architecture. **Every category must contain photos of
> real children**, and Girls & Junior must have equal photographic weight to Boys & Senior. A school
> website with no children in it does not look premium; it looks abandoned. If a category has no
> child photos yet, mark it `TODO` and use the crest placeholder rather than padding it with
> building shots.

### `/news`
The school has a real, rich archive going back to 2015 [ref Part 9] — around 60 posts. Build it:
- Card grid with date, title, category (News / Events), excerpt, Read More.
- Filter by category.
- Individual post pages generated from a typed data file.
- Seed it with the full archive from the reference — this is genuine institutional history and it is
  the most credible content the school owns.

### `/results` (Achievements)
Board results highlights, top achievers cards with torch-gold accents, counters. Keep the structure
ready even if content is placeholder. Mark all figures `TODO` until the school supplies them.

### `/careers`
Vacancies page [ref Part 7]. Replace the old site's "download a Word doc, install Adobe Reader"
instructions with a simple modern flow: role listings + an email/WhatsApp application CTA.

### `/contact`
Contact cards (phone, WhatsApp, email), map, school hours, full postal address. **No contact form in
v1** — WhatsApp button instead (forms go unanswered; WhatsApp gets replies). [ref Part 8]

---

## 5. MOTION & SCROLL PLAN (the full choreography)

Global rules:
- Lenis smooth scroll, `lerp: 0.1`, synced to Framer Motion via `useScroll`. Disable Lenis entirely
  under `prefers-reduced-motion`.
- One shared `variants` library in `/src/lib/motion.ts`: `fadeUp` (y: 24 → 0, opacity, 0.6s, ease
  [0.22, 1, 0.36, 1]), `stagger(0.08)`, `maskReveal` for images (clip-path inset animation),
  `wordReveal` for headlines.
- Every section animates in ONCE (`viewport={{ once: true, margin: "-80px" }}`). Nothing re-triggers
  on scroll-up — re-triggering feels gimmicky.
- All hover effects: 150–200ms, transform/opacity only (GPU-safe). No animating layout properties.
- Page transitions: simple 250ms fade via `template.tsx` — fast beats fancy on mobile data.

Specific moments:
- Hero load sequence orchestrated: motto (0s) → headline words (0.3s, stagger 0.06) → subline (0.9s)
  → CTAs (1.1s). One cinematic moment, then the page gets out of the way.
- Straight Path line: `scaleY` bound to scroll progress, spring smoothing; section nodes flip to
  torch-gold via `whileInView`.
- Stat counters: `useMotionValue` + `animate()` when in view, 1.2s ease-out.
- Gallery preview strip: `useTransform(scrollYProgress, [0,1], ['0%','-15%'])` per row, alternating
  directions.
- Magnetic effect on primary CTAs (desktop pointer only): button translates max 6px toward cursor,
  springs back. Skip entirely on touch.
- Navbar: transparent over hero → sand with blur + hairline border after 80px scroll. Active link
  gets a leaf underline that slides via `layoutId`.

Restraint rules (equally important):
- No particle effects, no cursor followers, no 3D tilt cards, no preloader screens. These read as
  AI-generated demos, not institutions.
- Max ONE parallax element per viewport. If a section already has reveals, it doesn't also get
  parallax.

---

## 6. SEO, SHARING & PERFORMANCE

- Every route: unique `metadata` export — title pattern `"{Page} | Ali Public School Peshawar"`,
  handwritten 150–160 char description mentioning Kohat Road / Badabher / Peshawar naturally.
- Open Graph + Twitter card metadata on every page with a dedicated 1200×630 OG image
  (`/public/og/og-home.jpg` etc.) — campus photo with navy scrim + crest + school name.
  **Test: pasting the link in WhatsApp must show a rich preview.**
- JSON-LD `School` schema on the homepage with these exact values:
  ```
  name          Ali Public School & College
  foundingDate  2012
  telephone     +92 91 2370412
  address       Haji Ghaljai Kalai, Afridi Road, Mera Mashogaggar,
                Badabher, Peshawar, Pakistan
  openingHours  Mo-Th 08:00-14:00, Fr 08:00-12:30
  ```
  Plus `FAQPage` schema on admissions.
- `sitemap.ts` and `robots.ts` via App Router conventions.
- Performance budget: Lighthouse ≥ 90 on mobile for Performance / SEO / Accessibility /
  Best Practices. LCP < 2.5s on simulated 4G. Hero image: `priority`, AVIF/WebP via next/image,
  properly sized.
- Semantic HTML throughout: one h1 per page, landmarks, alt text on every image, visible keyboard
  focus styles (leaf outline), skip-to-content link.

---

## 7. FOLDER STRUCTURE

```
APS-CONTENT-REFERENCE.md   # the content bible — read before coding
MASTER-PROMPT.md           # this file
src/
  app/
    layout.tsx             # fonts, Lenis provider, nav, footer
    template.tsx           # page fade transition
    page.tsx               # home
    about/page.tsx
    principals-message/page.tsx
    admissions/page.tsx
    academics/page.tsx
    campuses/page.tsx
    policies/page.tsx
    gallery/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    results/page.tsx
    careers/page.tsx
    contact/page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/                # Navbar, Footer, StraightPathLine
    sections/              # one file per home/page section
    ui/                    # Button, Card, SectionHeading, Counter, Accordion, Lightbox
  lib/
    motion.ts              # shared variants + eases
    lenis.tsx              # Lenis provider
  data/
    site.ts                # contact info, links, nav, timings — single source
    about.ts               # story, crest, leadership
    admissions.ts
    academics.ts
    campuses.ts
    policies.ts            # all policy text, verbatim
    gallery.ts
    news.ts                # the full 2015–2022 archive
    results.ts
public/
  images/  og/  crest.svg
```

---

## 8. CONTENT & ASSETS

- I will provide campus photos and the crest/logo file. Canonical paths:
  `/public/images/campus-hero.jpg` and `/public/crest.svg`. Where a photo is missing, use a styled
  placeholder (`sand` block with the crest at low opacity) — **never stock photos, never Unsplash.**
  This school's realness IS the brand.
- Write all copy in warm, plain English a Peshawar parent understands. Short sentences. No corporate
  filler. Where a real fact is unknown, insert a `TODO:` comment and a sensible placeholder — never
  invent.
- ⛔ **The old website lists three teachers — Martha Jackson, Tom Brown and Lucy Allen. They are
  demo people from the WordPress template, not APS staff.** All three share an identical bio and
  their social links go nowhere. Never reproduce them, and do not create a staff section at all
  until the school supplies real names and photos.

---

## 9. LOCKED FACTS — use these exactly, do not paraphrase, do not "improve"

```
Name              Ali Public School & College   (short: Ali Public School · APS · APSC)
Motto             Quality in Everything
Crest motto       اهدنا الصراط المستقيم  — "Guide us on the straight path"
Founded           2012
College status    Granted 2019 · Ali Public College launched April 2019
Address           Haji Ghaljai Kalai, Afridi Road, Mera Mashogaggar,
                  Badabher, Peshawar, Pakistan
Setting           Southern outskirts of Peshawar, on Kohat Road,
                  surrounded by the Masho Gaggar countryside
Phone             +92 (0) 91 2370412
Email             TODO — confirm with school. The live site uses info@alipublicschool.com.pk
                  in the footer and admin@alipublicschool.com.pk on Contact/Careers.
                  Pick ONE and use it everywhere.
WhatsApp          via NEXT_PUBLIC_WHATSAPP_NUMBER env var

SCHOOL TIMINGS    Monday    8:00 AM – 2:00 PM
(confirmed        Tuesday   8:00 AM – 2:00 PM
 by the school:   Wednesday 8:00 AM – 2:00 PM
 the day starts   Thursday  8:00 AM – 2:00 PM
 at 8:00)         Friday    8:00 AM – 12:30 PM
                  Saturday  Closed
                  Sunday    Closed
                  → Format them consistently as "8:00 AM – 2:00 PM" everywhere.
                    Ignore the old site's inconsistent "2.00 pm" punctuation and
                    ignore the 2019 news post that mentions a 7:15 am start.

Sections          Girls & Junior Section — from age 3; boys and girls co-educated to
                    age 8; girls continue here through to college level; staffed
                    exclusively by female teachers under the Headmistress
                  Boys & Senior Section — boys from age 9 (class 4) upward;
                    new building opened April 2019
                  APS Premier — separate campus, apspremier.com
Education to      F.Sc., age 18
Syllabus          Oxford syllabus
Subjects          English · Urdu · Maths · Science · Islamiyat · Social Studies/Geography
                  · Physics · Chemistry · Biology · Computing/IT · Arabic
Boards            BISE Peshawar — SSC & HSSC · Middle Pass Certificate
Registrations     BISE Reg# 1764 · PSRA Reg# 010385017612 · ACCA Trainee Program
Leadership        CEO — Mr. Ali Afridi
                  Principal — Maj (R) Manzur Hussain Qureshi (since Nov 2015;
                    retired Pakistan Army; 14+ years in education)
                  Headmistress — heads the Girls & Junior Section (name TODO)
Facilities        Smart boards and integrated connectivity in every class (first of its
                  kind in Peshawar) · IT lab · chemistry, biology and physics labs ·
                  hall seating 100+ · large playgrounds and sports ground · dedicated
                  junior play area with slides and swings · marble flooring and
                  hand-crafted doors built by local craftsmen · two first-aid boxes ·
                  own school transport fleet
Parent portal     Classter — cloud school management system giving parents and students
                  real-time result cards, timetables, assignments, homework, leave
                  applications, attendance records and bills
Core values       Kindness · Responsibility · Integrity · Selflessness ·
                  Personal Industry · Resilience · Initiative · Moral Courage
                  (the old homepage says "Respect" as the 2nd value and the Core Values
                   page says "Responsibility" — use Responsibility, consistently)
Sports            Cricket · football · athletics · volleyball · basketball · badminton ·
                  tug of war · 50m, frog, hobble, sack and spoon races
Annual events     Founders' Day (March) · Sports Week (Nov/Dec, separate days per
                  section) · Drawing Competition · Debate & Speech Competition ·
                  Results Days · Parents' Day / PTMs · Friday Activities
Social            facebook.com/alipublicschool.com.pk · twitter.com/alipublicschool
                  youtube.com/channel/UCqa_STIGq2Y8QmsEE6H0c_g
                  linkedin.com/in/alipublicschool
Copyright line    © 2012–{current year} Ali Public School & College
                  (the old site says "2015-2002" — a typo. Do not copy it.)
```

**Facts the school still has to supply — leave as TODO, never guess:**
student count · staff list and photos · fee structure · current term & holiday dates ·
current prospectus · board results and pass rates · the Headmistress's name ·
which email address is live · whether Saturday is a working day for any section.

---

## 10. BUILD ORDER (work in these phases, confirm after each)

1. **Read `APS-CONTENT-REFERENCE.md` end to end.** Then populate `/src/data/*.ts` with the real
   content — site info, policies, news archive, admissions, campuses. Content first, so no page
   ever gets built around placeholder lorem.
2. **Foundation** — Next.js scaffold, Tailwind tokens, fonts, Lenis provider, motion library,
   Navbar + Footer, deploy-ready config.
3. **Home page** — full choreography as specified. This is the showcase; get it perfect before
   anything else.
4. **About + Principal's Message + Admissions** — including the Straight Path timeline and FAQ schema.
5. **Campuses + Academics + Gallery + News + Results + Careers + Contact.**
6. **Policies page** — all nine policies in full.
7. **SEO pass** — metadata, OG images wired, JSON-LD, sitemap; then a performance pass against the
   Lighthouse budget.
8. **Polish pass** — reduced-motion audit, keyboard audit, 360px-wide mobile audit, and remove one
   decoration per page (if a page still feels perfect after removing it, it was excess).

---

## 11. QUALITY BAR — before calling anything done, verify:

**Content**
- [ ] Every paragraph traces back to `APS-CONTENT-REFERENCE.md` or a `TODO:` marker
- [ ] Zero invented statistics, names, or dates anywhere on the site
- [ ] No Martha Jackson / Tom Brown / Lucy Allen. No template staff of any kind.
- [ ] Timings read **8:00 AM – 2:00 PM** (Mon–Thu) and **8:00 AM – 12:30 PM** (Fri) everywhere
- [ ] One email address used site-wide, not two
- [ ] British spelling throughout; "students," "class 4," "pupils" — the school's own vocabulary
- [ ] All nine policies present in full, not summarised

**Images**
- [ ] Every gallery category contains photos of real children
- [ ] Girls & Junior Section has equal photographic weight to Boys & Senior
- [ ] No empty grey placeholder boxes anywhere (APS Premier card especially)
- [ ] No stock photography

**Build**
- [ ] View-source on any page shows real content in the HTML (not an empty div)
- [ ] Link pasted into WhatsApp renders image + title + description
- [ ] Entire site usable on a 360px screen with thumbs
- [ ] `prefers-reduced-motion` gives a calm, fully functional site
- [ ] No section uses more than one motion idea
- [ ] Nothing could be mistaken for a template — if a section could appear on any other school's
      website unchanged, redesign it
