# APS website — media-first rebuild plan

The single source of truth for this rebuild. Read this before touching the
site; it records both the intent and the state of the work.

Companion documents: `CLAUDE.md` (conventions), `AGENTS.md` (Next.js version
caveat), and **`public/README.md`** (which photograph belongs in which folder,
and where each one is currently used). This file does not repeat them.

---

## 0. Source of truth, and where we knowingly differ from it

Two documents govern this build:

- **`APSCONTENTREFERENCE.md`** — a verbatim transcription of the school's live
  legacy site. **Every paragraph on the new site must trace back to this file
  or carry a `TODO:` marker. Never invent a fact about this school.**
- **`MASTERPROMPT.md`** — the build brief: stack, brand system, page list,
  motion plan, quality bar.

### Deviations from MASTERPROMPT, decided by the client

These three were put to the client directly because the brief contradicted an
instruction they had already given. **Do not "fix" these back to the brief.**

| # | MASTERPROMPT says | We do | Why |
| --- | --- | --- | --- |
| 1 | Set the Quranic verse اهدنا الصراط المستقيم in Amiri wherever the crest appears (§3, §9) | **No Arabic anywhere.** Amiri removed from the font stack | The client instructed it be taken off the site. Their instruction outranks the brief. The verse remains on the crest *artwork* — changing that means re-drawing the logo, which is the school's call |
| 2 | "No preloader screens — these read as AI-generated demos" (§5) | **Splash screen stays** | The client asked for it specifically and then asked for it to be refined. Cost is a ~1.2s LCP delay on a cold first visit, once per session — documented in §6 |
| 3 | Display **Fraunces**, body **Manrope** (§3) | **Cinzel + Montserrat stay** | The client preferred the existing pairing. Cinzel reads more classical/institutional |

### Deviations decided on engineering grounds

| # | MASTERPROMPT says | We do | Why |
| --- | --- | --- | --- |
| 4 | Lenis `lerp: 0.1` (§5) | `lerp: 0.16`, and Lenis **off entirely on touch** | At 0.1 the page kept gliding after the finger stopped. The client reported the site "feeling slow"; this was the cause. See §4 |
| 5 | Gallery categories Campus / Classrooms / Sports / Students / Events (§4) | Campus / Classrooms / Students / Results Day | An empty category is worse than a missing one — there is one sports photo and no event photos. Restore the others when photos arrive |

### Open questions the school must answer

These block real content. **Do not guess any of them** — MASTERPROMPT §9 and
reference Part 12 both list them:

1. **Which email is live** — `info@` (old footer) or `admin@` (old contact &
   careers page). Site currently uses `info@` everywhere.
   ⚠️ The codebase also contained `hoc@alipublicschool.com.pk`, which appears
   **nowhere** in the reference. It has been removed as unverified.
2. **Is Saturday a school day?** The timings table says closed; every homework
   timetable lists Saturday work.
3. The **Headmistress's name**.
4. Real **staff list** — names, photos, roles. (Never reuse the old site's
   Martha Jackson / Tom Brown / Lucy Allen — they are WordPress template
   dummies.)
5. **Fee structure**, **current term & holiday dates**, **current prospectus**,
   **board results**, **student and staff numbers**.
6. **Exact class range now offered** — the old site variously says "playgroup
   to 7", "classes 4 to 7", "class 5 and above", "up to F.Sc. aged 18".

### Errors in the legacy site that must NOT be carried over

- Homepage says core value #2 is "Respect"; the Core Values page says
  **"Responsibility"**. Use **Responsibility**.
- Overview page says results are achieved by "boys from across a broad range
  of ability". The school is co-educational. Say **students**.
- Boys & Senior Section copy is in 2019 future tense ("the new building *will
  have* an IT lab"). It has been running for years. Present tense.
- Footer copyright reads `2015-2002`. Use `© 2012–<current year>`.
- Menu typos: `ACEDEMICS`, `Howework Policy`, `school-unifrom`.
- Campus card captions leak raw filenames (`20190401175317`).

---

## 1. The brief

The client wants the site carried by **photographs and film, not paragraphs**.

1. **Words come in short blocks.** No section runs longer than a screen of
   reading. Long prose gets cut down or moved into a caption.
2. **Every text block is followed by a media block.** Text, picture, text,
   film — the whole way down every page.
3. **No treatment is ever reused.** Each media block gets its own pattern from
   the registry in §7. Once a pattern is spent, it is spent for the entire
   site. This is a hard rule, not a preference.
   - **One exception: `PhotoDivider`.** The patterns are *sections* — things
     you stop and look at. A divider is a rule drawn in photograph: no
     heading, no caption, nothing to click. Punctuation that changed shape
     every time would be noise, not variety.
4. **The site opens with a splash.** A short, deliberate loading moment.
5. **No Arabic Quranic verse anywhere.** Client instruction — see §3.

---

## 2. Asset folders and `src/data/media.ts`

Nine folders under `public/photos/`: `boys-building`, `classrooms`,
`girls-building`, `students`, and — recovered, see below —
`boys-pupils`, `girls-pupils`, `premier-visit`, `premier-building`,
`results-day`. Filenames carry the shape (`-wide-` / `-tall-`). See
`public/README.md`.

**No component hard-codes a path.** Everything goes through
`src/data/media.ts`, which names each photograph by what it shows. Swapping an
image is one line there.

Two rules that came out of the client review:

- **Never stand a photograph in for a different subject.** If the right
  picture does not exist, the section comes off the page.
- **No crest watermark behind an empty tile.** That treatment is gone
  everywhere; a missing photo means no frame, not a ghosted logo.

### The recovered batch (74 photographs total, up from 40)

An earlier photo batch — real pupils, a results-day photo booth, and an APS
Premier visit — was deleted along with the folders it lived in when the
client replaced them with the four folders above. It was recovered from the
Windows Recycle Bin and re-added:

| Folder | Count | What it actually is |
| --- | --- | --- |
| `boys-pupils` | 10 | Real boys at the "RESULT 2026" photo booth, with staff |
| `girls-pupils` | 10 | Real girls at the same booth, and a classroom group visit |
| `premier-visit` | 5 | Pupils and a teacher visiting the APS Premier campus |
| `premier-building` | 1 | A third, taller building — assumed to be APS Premier's own; **unconfirmed**, correct on sight if wrong |
| `results-day` | 8 | **Decoration close-ups only — no people in any of them.** Balloons, the photo backdrop, paper-craft graduation caps, star trophies |

**Important — two of the `results-day` photos show real award ribbons with
children's handwritten names and class positions** (`results-day-wide-01.webp`,
`results-day-square-01.webp`). Neither is wired into the site at legible size
anywhere; both exist on disk. **This needs the client's decision, not mine**:
keep them (small, in a rail, as-is), remove them, or blur the names first.
Nothing here transcribes those names into `src/data/results.ts` — a photo of
handwritten ribbons is not the school publishing results, and inventing
`topAchievers` entries from it would break the "never invent a figure" rule
in §12.

Because `results-day` turned out to have no faces, sections captioned around
"proud smiles" or "celebrating our students" (`ResultsCelebration`,
`GridToSingle`, `CircularReel`) lead with `boysPupils` / `girlsPupils`
instead, and use `resultsDay` only for texture shots that don't claim a
face — see the comments in each component.

---

## 3. The Quranic verse — removed

The client asked for the Quranic verse to come off the site. It is gone from:

- `src/data/site.ts` — `motto` and `mottoTranslation` deleted
- `Hero`, `Footer`, `Splash`, `CampusSchematic` — replaced with the school
  name or the English motto, "Quality in Everything"
- `MottoBand` (P17) — rebuilt around the English motto
- `CrestExplained` — the crest's motto entry and the image alt text
- `src/lib/fonts.ts` — **Amiri removed entirely**, along with the
  `font-arabic` / `--font-arabic` token. It was a ~110 KB face serving one
  line, so this is also a real weight saving.

**Do not reintroduce Arabic copy anywhere.** Verified: no character in the
Arabic Unicode range renders on any page.

⚠️ **The crest artwork itself still carries the verse.** `logo/crest.jpeg` is
the school's own logo file — changing that means re-drawing the logo, which is
the school's call, not a code change.

---

## 4. Performance

### Fixed

| Cost | Problem | Fix |
| --- | --- | --- |
| 2.2 MB | Hero drone film had `preload="auto"` and autoplayed | `LazyVideo` — poster first, fetch on first idle callback |
| 524 KB | The "Life at APS" clip preloaded despite being below the fold | `LazyVideo` with an IntersectionObserver, 600px rootMargin |
| 228 KB | `building-01.jpeg` unoptimised, doing three jobs | AVIF + WebP in `next.config.ts` |
| ~110 KB | Framer Motion imported into ~24 components, most only to fade a heading | CSS `Reveal`; Framer kept only where motion is stateful |
| ~110 KB | Amiri Arabic face | Removed with the verse (§3) |
| Feel | Lenis `lerp: 0.1` kept gliding after the finger stopped | `lerp: 0.16`, and Lenis disabled outright on touch |
| Jitter | Two `setInterval`s ran forever, off-screen and in background tabs | `useAutoAdvance` — timer exists only while visible |

Verified: **zero `<video>` elements on first paint on all seven pages.**
Client components went from 29 to 20.

### Rules going forward

- Never give a `<video>` `preload="auto"`. Use `LazyVideo`.
- Never reach for `motion.*`. Use `Reveal` for entrance animation and `m.*`
  when Framer is genuinely needed. `LazyMotion` runs in `strict` mode, so a
  stray `motion.div` throws at runtime by design.
- Always pass `sizes` to a `fill` image.
- Long unbreakable strings (emails, URLs) need `break-all`, and their grid
  item needs `min-w-0` — see §8.

---

## 5. Architecture

| File | Purpose |
| --- | --- |
| `src/components/ui/Reveal.tsx` | CSS scroll reveal. `variant`: `up` \| `fade` \| `mask` \| `curtain` \| `left` \| `right` \| `scatter`; `delay` in ms; `style` for per-instance custom properties. |
| `src/components/ui/LazyVideo.tsx` | Video that costs nothing until it is about to be watched. Supports `srcMobile`. |
| `src/components/ui/PhotoDivider.tsx` | The thin photographic rule between sections. |
| `src/lib/useAutoAdvance.ts` | Self-advancing index that stops off-screen and in background tabs. |
| `src/lib/MotionProvider.tsx` | `LazyMotion` + `MotionConfig`, `domMax`, `strict`. |
| `src/components/layout/Splash.tsx` | The arrival sequence (§6). |
| `src/app/template.tsx` | Page transition (§6). |

Reveal, splash, transition and pattern styles live at the bottom of
`src/app/globals.css`. Reveal styles are gated behind a `.js` class set by an
inline script in the root layout — without JavaScript, content is simply
visible rather than stuck at opacity 0.

**Still using Framer Motion, and why:** `Hero`, `GirlsCampusShowcase`
(`AnimatePresence`), `Navbar`, `GalleryGrid` (`layoutId`), `GalleryPreview`,
`OurJourney`, `AdmissionsTimeline`, `StraightPathLine`, `AboutBanner`,
`ZoomOutFrame`, `CardPeel`, `GridToSingle` (`useScroll`), `Accordion`
(animated height), `Magnetic` (spring), `Counter` (`animate`).

---

## 6. Splash and page transition

**Splash** — the crest starts as a drained grey outline and fills with its own
colour from the bottom up. The fill *is* the loading indicator; there is no
separate bar. Both crest layers composite with `mix-blend-mode: multiply`
against the sand ground, which is what removes the white box around the JPEG.
Runs once per browser session, skipped entirely under reduced motion.

**Page transition** — a navy panel with a gold leading edge sweeps across from
the left and off to the right, while the new page settles downward into place.
All CSS: `template.tsx` remounts on every route change, so it replays on its
own. The page content is deliberately **not** clipped during the reveal — a
`clip-path` on the wrapper would become the containing block for the fixed
mobile bar inside it and pin it to the wrapper instead of the viewport.

**Known trade-off:** the splash covers the page for ~1.2s on a cold first
visit, which pushes out a measured LCP. That is the deliberate cost of the
arrival, paid once per session. To drop it: remove `<Splash />` from
`src/app/layout.tsx` and the `.splash*` block from `globals.css`.

---

## 7. Pattern registry — 39 treatments, all built

Each is claimed by exactly one slot. **Do not reuse a pattern.** A new media
block means a new pattern (P37 onward).

| ID | Pattern | Component | Notes |
| --- | --- | --- | --- |
| P01 | Cinematic video hero | `Hero` | Wants a 720p `srcMobile` cut |
| P02 | Tilted masonry | `BoysCampusShowcase` | |
| P03 | Bento mosaic | `CampusHighlights` | 4 tiles still crest placeholders |
| P04 | Parallax dual rail | `GalleryPreview` | **All placeholders — top priority** |
| P05 | Infinite marquee | `PremierVisit` | |
| P06 | Split crossfade | `GirlsCampusShowcase` | |
| P07 | Poster to lightbox | `LegacyFilm` | |
| P08 | Snap rail | `ResultsCelebration` | |
| P09 | Filterable grid | `GalleryGrid` | Wants far more than its 10 photos |
| P10 | Road timeline | `OurJourney` | Needs a photo per milestone |
| P11 | Crest hotspots | `CrestExplained` | |
| P12 | Sticky image swap | `DayAtAPS` | |
| P13 | Curtain reveal | `CurtainBand` | |
| P14 | Duo video split | `DuoVideoSplit` | Both clips are stand-ins |
| P15 | Arc cluster | `ArcCluster` | |
| P16 | Polaroid deck | `PolaroidDeck` | |
| P17 | Ken Burns motto band | `MottoBand` | Rebuilt after the verse removal |
| P18 | Twin vertical ticker | `TwinTicker` | |
| P19 | Expanding slats | `ValueSlats` | All 8 values, 2 rows of 4 |
| P20 | Photo-backed figures | `PhotoFigures` | Figures still placeholders |
| P21 | Scroll zoom-out | `ZoomOutFrame` | |
| P22 | Card peel | `CardPeel` | |
| P23 | Diagonal collage | `DiagonalCollage` | Cuts drop below 768px |
| P24 | Portrait strip | `PortraitStrip` | Both portraits are crest stand-ins |
| P25 | Mosaic assemble | `MosaicAssemble` | |
| P26 | Pinned callouts | `CampusSchematic` | A schematic, not a map |
| P27 | Circular reel | `CircularReel` | Names appear once `topAchievers` fills |
| P28 | Curved-edge band | `CurvedBand` | Wants the wide 3-section shot |
| P29 | Grid to single | `GridToSingle` | |
| P30 | Captioned side-scroll | `StageScroll` | |
| P31 | Video contact sheet | `ContactSheet` | Only 2 of 6 frames move |
| P32 | Layered depth | `AboutBanner` | |
| P33 | Spotlight reveal | `SpotlightReveal` | Drifts on touch |
| P34 | Ambient header loop | `AmbientHeader` | Stand-in clip; wants the gate |
| P35 | Farewell band | `FarewellBand` | |
| P36 | **Interactive quote canvas** | `GoldQuote` | See below |
| P37 | Archive index (cover + paragraph rows) | `/media-gallery/` | Legacy page, §13 |
| P38 | Archive contact grid (square thumbnails → original file) | `/galleries/picture-galleries-till-2019/` | 209 legacy photos, lazy, §13 |
| P39 | Lazy YouTube embed grid | `/galleries/video-galleries/` | Legacy page, §13 |
| — | Photo divider (punctuation, **repeats by design**) | `PhotoDivider` | Stand-in crops; wants real wide strips |

### P36 — the quote canvas

The school's own phrase, "we *mine for gold* in each child" (their words, from
the About copy), drawn as a field of particles that scatter from the pointer
and spring back.

The quote is drawn once to an offscreen canvas, sampled on a grid, and every
opaque pixel becomes a particle. Fenced in on every side: the loop runs only
while on screen and the tab is visible; state lives in `Float32Array`s so a
frame allocates nothing; drawing is two `fillStyle` changes and N `fillRect`s;
DPR capped at 2; particle count capped and the sample step widens if needed.
Under reduced motion no canvas is created at all.

Most particles are navy so the sentence stays legible, with roughly one in
seven in gold — the flecks in the ore. It sits on the site's own sand ground:
the navy panel it originally had read as a cheap block dropped onto the page.

Every new pattern must degrade correctly under `prefers-reduced-motion`, keep
to **max one parallax effect per viewport**, use `LazyVideo` for any video,
and pass `sizes` on `fill` images.

---

## 8. Responsive

Verified with a real headless Chrome across **8 widths** (360, 390, 430, 768,
820, 1024, 1280, 1440) × all 7 routes: **no horizontal overflow anywhere**.

Two genuine bugs were found and fixed by that audit:

1. **The navbar switched to its desktop layout at `md` (768px).** The crest
   block, seven links and the WhatsApp button measure ~834px, so every page
   scrolled sideways on a tablet. The switch is now at `lg`, and tablets get
   the menu.
2. **`info@alipublicschool.com.pk` was widening the whole site by 27px.** In a
   four-column footer at 768px each column gets ~150px; the address is 201px
   with nowhere to break. Fixed with `break-all` on the link and
   `sm:grid-cols-2 lg:grid-cols-4` on the footer. The same hazard on the
   contact cards needed `min-w-0` on the grid item as well — a grid item's
   default `min-width: auto` is sized by min-content, which `break-words`
   alone does not shrink.

Note that a horizontal scroller's children legitimately extend past the right
edge; only elements **not** inside a scrollable ancestor count as leaks.

---

## 9. How to verify

Two zero-dependency Chrome DevTools Protocol drivers live in `scripts/`. They
need a production build (`next build && next start -p 3111`) and a
headless Chrome on `--remote-debugging-port=9333`.

- **`overflow.mjs`** — every route at every width, reporting exactly which
  element leaks, ignoring anything inside a legitimate horizontal scroller.
- **`drive.mjs`** — walks the site clicking the nav (real client-side
  navigation, not reloads), capturing every exception, console error and
  browser log along the way.

A build passing is not sufficient evidence: the navbar and email overflow bugs,
and a broken `md:slant-l` class, all passed `tsc`, `eslint` and `next build`.
**Check the port belongs to the browser you launched** — an unrelated Edge
process was holding 9222 and the first run silently verified the wrong page.

---

## 10. Status

| Phase | Work | Status |
| --- | --- | --- |
| 1 | Speed (§4) | ✅ |
| 2 | Splash screen (§6) | ✅ |
| 3 | Homepage media blocks — P17, P12, P15, P13 | ✅ |
| 4 | About & Admissions — P32, P21, P19, P24, P23, P14, P16, P18, P22 | ✅ |
| 5 | Campuses, Gallery, Results, Contact — P28, P30, P31, P26, P25, P33, P29, P20, P27, P34, P35 | ✅ |
| A | Asset folder restructure (§2) | ✅ |
| B | Quranic verse removed (§3) | ✅ |
| C | Splash redesign — crest outline fill (§6) | ✅ |
| D | Page transition — side sweep + downward settle (§6) | ✅ |
| E | Quote canvas retuned — P36 (§7) | ✅ |
| F | Photo dividers site-wide (§7) | ✅ |
| G | Responsive audit, 8 widths (§8) | ✅ |
| — | **Fill in the facts (§12)** | ⬜ Blocked on the school |

### Content build against MASTERPROMPT / APSCONTENTREFERENCE

| Phase | Work | Status |
| --- | --- | --- |
| C0 | Read both documents; record deviations and open questions (§0) | ✅ |
| C1 | `site.ts` rebuilt from the reference — CEO named, College status 2019, all four social accounts, ACCA, corrected copyright, unverified `hoc@` address removed | ✅ |
| C2 | Nav restructured — 7 top-level items, About and Academics nesting the six new pages; footer lists all; sitemap covers nested pages **and** every news post | ✅ |
| C3 | `news.ts` — the full 2015–2022 archive, **76 posts**, plus the recurring annual calendar | ✅ |
| C4 | `/news` (filterable, grouped by year) + `/news/[slug]` (76 static routes, prev/next) | ✅ |
| C5 | `policies.ts` — all **nine** policies in full, not summarised, incl. four homework timetables | ✅ |
| C6 | `/policies` — accordion, jump index, structured blocks (headings / lists / tables) | ✅ |
| C7 | `about.ts` — core values with the school's own definitions, Principal's message, introduction, "what makes us different", real testimonials | ✅ |
| C8 | `academics.ts` + `/academics` — subjects, provision, exam rhythm, boards | ✅ |
| C9 | `/principals-message` — the full letter, verbatim, as its own page | ✅ |
| C10 | `/careers` — legacy Word/Adobe flow replaced with email + WhatsApp | ✅ |
| C11 | Legacy errors corrected: **Respect → Responsibility**, "boys" → "students", Chairman placeholder → **CEO Mr. Ali Afridi**, copyright `2015-2002` | ✅ |
| C12 | Testimonials + "What makes us different" added to About | ✅ |
| C13 | Content pass — homepage, sections and admissions now carry the school's own words | ✅ |
| C13a | **Two invented facts removed**: a "500+ Students" counter (the school has never published a student count) and a "Islamic Values" pillar (the school never describes itself that way). Replaced with College status 2019 and the school's own four selling points | ✅ |
| C13b | **An invented table removed**: the admissions "Age & class guide" gave an age range for every class from Playgroup to Class 10. None of it is published anywhere. Replaced with the school's two real entry rules — Nursery/K.G. register before 4+; class 1–10 entrance test, 50% to be considered | ✅ |
| C13c | Documents checklist, allocation policy and "what we offer" added to Admissions — all were missing from the site entirely | ✅ |
| C13d | Hero taglines, intro paragraph, section descriptions and campus briefs replaced with the school's own phrasing; "Inspired Learning" band (ref 2.8) folded into the admissions band; co-curricular calendar built from the news archive | ✅ |
| C14 | OG images per route, `FAQPage` JSON-LD on admissions, Lighthouse pass | ✅ |
| C14a | **Broken JSON-LD image fixed** — the `School` schema pointed at `/photos/campus-building-wide-landscape/…`, a path that stopped existing when the photo folders were reorganised. Now derived from `media` so it cannot rot again. Added `openingHoursSpecification` (Mon–Thu 08:00–14:00, Fri 08:00–12:30) | ✅ |
| C14b | `opengraph-image.tsx` added for `/academics`, `/policies`, `/news`, `/careers`, `/principals-message`, plus one dynamic route covering all 76 news posts. All 13 endpoints verified as valid 1200×630 PNGs | ✅ |
| C14c | All 12 route descriptions retuned to 146–155 characters, each naming Kohat Road / Badabher / Peshawar so the local-search terms are in the snippet | ✅ |
| C14d | Audit `scripts/seo.mjs` — one `h1` per page, OG + Twitter tags, `School` and `FAQPage` JSON-LD, no image without `alt`, skip link, one `<main>`, `lang="en"`. **Clean across all 13 routes** | ✅ |
| C14e | Performance budget met. `scripts/perf.mjs` on an emulated 390px Android over Slow 4G with 4× CPU throttle: `/` 900–2508ms · `/about` 2120ms · `/admissions` 948ms · `/news` 2024ms · `/policies` 1540ms · `/gallery` 896ms. CLS 0 on every route. Five real LCP regressions were found and fixed on the way — the worst was the rotating hero headline, which created a fresh LCP candidate every five seconds so LCP never settled (9.0s) | ✅ |

---

## 11. Shot list — what the school still needs to supply

Drop these into the folders named in `public/README.md`.

1. **Campus life — the big gap.** Classrooms, sports, assembly, library.
   Currently four crest placeholders in `CampusHighlights` and the whole of
   `GalleryPreview`.
2. **Divider strips** — genuinely wide, short images for
   `photos/dividers-extra-wide-thin/`. Every divider on the site is currently
   a portrait photograph cropped to a strip.
3. **Six short clips** for the contact sheet: a lesson, the playground,
   assembly, a science or computer room, the gate at arrival, a sports moment.
4. **Two portraits** — the Chairman and the Principal.
5. **A 720p cut of the drone film**, passed to `LazyVideo` as `srcMobile`.
6. **Poster frames** pulled from both existing videos.
7. **Milestone photographs** — one per entry on the `OurJourney` timeline.
8. **One wide establishing shot** with all three sections in frame.

---

## 12. Facts still missing

> **Supplied 31 August 2026 — WhatsApp: `+92 345 9508293`.** Wired into
> `site.whatsappNumber` (`923459508293`, the digits-only form wa.me needs) and
> `site.whatsapp` (the readable form, the only one printed on a page). It
> reaches all nine WhatsApp buttons through `whatsappUrl()`, is shown on the
> contact page, and is carried in the `School` schema as an Admissions
> contact point. Verified live on all twelve routes.
>
> The "real enrolled student count" row is gone from the table below: there is
> no student count anywhere on the site to replace. The invented "500+
> Students" counter was removed outright (see C13a) and only the comment
> recording that survives in `IntroStrip.tsx`.

All marked `TODO` in the code. **Do not invent any of these values.**

| What | Where |
| --- | --- |
| Fee structure | `src/data/admissions.ts` |
| Board results — pass rate, distinctions, position holders | `src/data/results.ts` |
| Top achiever names | `src/data/results.ts` |
| Chairman's name and message | `LeadershipMessages`, `PortraitStrip` |
| Google Maps pin for both campuses | `src/data/site.ts` |
| Per-section school timings | `src/data/site.ts` |
| Age cut-offs and class names | `src/data/admissions.ts` |
| Additional journey milestones and dates | `src/components/sections/OurJourney.tsx` |
| Confirmation of the live domain | `src/data/site.ts` |

---

## 13. SEO migration (legacy URLs) — October 2026

The site now answers on the **legacy WordPress URL tree**, because the same
domain (`https://alipublicschool.com.pk`, apex, no www, trailing slash) will
move to Vercel. Spec: `APS_SEO_Migration_Report.md` plus a read-only crawl of
the live site on 16 October 2026. Full list of decisions still needed:
`SEO-MIGRATION-REVIEW.md` in the repo root.

**Rules that must not be "tidied" away**
- `trailingSlash: true`. Every canonical, sitemap URL and internal link ends in `/`.
- Posts live at `/YYYY/MM/DD/slug/` (`news.ts` → `path`), typos and the
  percent-encoded Urdu slug included. Never move them to `/news/[slug]`.
- Typo URLs stay: `/academics/school-unifrom/`, `…-acamedic-year-2017-2019/`,
  `/tag/ali-public-shool-and-college/`, `/2016/02/24/extenstion-…/`.
- Titles follow `{Page Title} - Ali Public School` (`buildMetadata()`); the
  homepage title is `Ali Public School: Home - Peshawar`.
- Redirects and 410s live in `src/data/legacy-routes.ts` only (read by
  `next.config.ts` and `src/middleware.ts`). Every destination is a final 200.
- Only the canonical host is indexable; any other host gets
  `X-Robots-Tag: noindex` (`next.config.ts` headers). Never put
  `Disallow: /` in robots.ts.
- `/public/wp-content/uploads/` and `/public/downloads/` are mirrored legacy
  files at their original URLs (`scripts/mirror-legacy-media.mjs`, manifest
  in `scripts/legacy-media/`). Do not rename or move them.

**Route map (old interim path → legacy path):** `/about` → `/about-us/`,
`/admissions` → `/academics/admission-policy/`, `/contact` → `/contact-us/`,
`/gallery` → `/galleries/`, `/news` → `/blog/`, `/news/[slug]` → the post's
legacy path. All 301.

**Verify:** `next build && next start -p 3111`, then
`node scripts/seo-migration-check.mjs` — checks all 269 rows of
`scripts/seo-migration/legacy-url-contract.tsv`, the sitemap, robots, hosts,
every internal link, image and legacy file.
