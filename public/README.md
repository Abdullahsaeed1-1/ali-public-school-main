# Where photos and videos go

Nine folders, named for what belongs in them. Drop files in and tell Claude —
the site is wired to these paths through `src/data/media.ts`.

**Filenames carry the shape** (`-wide-` or `-tall-`) because the fit is the
whole problem: a wide photo in a tall frame crops to a strip, and a tall photo
across a wide band shows mostly sky. Keep that convention when you add files.

| Folder | Have | What belongs here |
| --- | --- | --- |
| `photos/boys-building/` | 9 | The boys' block from outside — the front with the sign, the veranda, the courtyard |
| `photos/classrooms/` | 15 | Classrooms. All empty rooms, no children |
| `photos/girls-building/` | 13 | The girls' block and the lawn in front of it |
| `photos/students/` | 3 | The original three photographs with children in them |
| `photos/boys-pupils/` | 10 | **Recovered** — real boys at a "RESULT 2026" photo booth, with staff |
| `photos/girls-pupils/` | 10 | **Recovered** — real girls at the same booth, a classroom group visit |
| `photos/premier-visit/` | 5 | **Recovered** — pupils and a teacher visiting APS Premier |
| `photos/premier-building/` | 1 | **Recovered** — a third, taller building, assumed APS Premier's own (unconfirmed) |
| `photos/results-day/` | 8 | **Recovered** — decoration close-ups only, no people in any of them |
| `logo/` | 1 | The school crest |
| `videos/*` | 0 | Empty. Nothing on the site plays video right now |

---

## What "recovered" means

Five of the folders above were deleted, then restored from the Windows
Recycle Bin — see `PLAN.md` §2 for the full story. **Two photos in
`results-day/` show real award ribbons with children's handwritten names**
(`results-day-wide-01.webp`, `results-day-square-01.webp`). They exist on
disk but are not used anywhere on the site at a size where the names are
readable. This is your call, not something decided for you: keep them small
as they are, remove them, or blur the names first.

## What's still the biggest gap

1. **Children in classrooms** — all 15 classroom photos are empty rooms.
2. **Two portraits** — the Chairman and the Principal.
3. **More sport and assembly** — one cricket photo is all there is.
4. **Confirmation on `premier-building/`** — it was recovered alongside the
   Premier visit photos but never confirmed as that campus's own building.

## What's still taken off the site for want of photographs

Built and parked in `src/components/sections/`, not deleted:

| Section | Was on | Needs |
| --- | --- | --- |
| `PortraitStrip` | About | The Chairman and the Principal, named |
| `PhotoDivider` | Every page | Extra-wide, short strips |

Say the word when the photos land and they go straight back.
