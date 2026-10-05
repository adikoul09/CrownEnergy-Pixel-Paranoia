# Crown Energy

**A Crown for Every Achievement.** This is a conceptual luxury brand experience: Rolex's first
entry into consumables, presented as three numbered, certified editions that are allocated
against achievement rather than sold.

Built for **Pixel Paranoia · DJSCE**. It is a concept and is not affiliated with or endorsed by
Rolex SA.

The design system, motion specification, rationale, take storyboard and the audit of the April
build are all in **[DESIGN.md](./DESIGN.md)**.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node 20.9+.

## Routes

| Route | What it is |
|---|---|
| `/` | **The Unveiling** (scroll-driven hero), then Philosophy, Chronicle, Calibre, Certification, The Standard, the Register and the Invitation |
| `/editions` | The Collection: three collectible plates |
| `/editions/[slug]` | The Dossier for one edition (`verdant-chrona`, `aurum-cycle`, `noir-kinetic`) |
| `/allocation` | Request an allocation, ending in a printable certificate. `?edition=<slug>` preselects an edition |
| `/take` | Recording mode: the Unveiling as one scripted, continuous take |

## Recording the single take

1. `npm run build && npm start`.
2. Open Chrome fullscreen at 1920×1080 (or 1440×900) with zoom at 100%.
3. Go to **`/take?delay=3`**. It starts after 3s of black with no on-screen prompt.
   Plain `/take` waits for any key instead.
4. Start recording during the black frame, at 60 fps.
5. Stop about 2s after the Noir Kinetic dossier settles. The run is about 25s.

The full timeline and shot list are in DESIGN.md §10.

## Checks

```bash
npm run check      # contrast (every text/background token pairing ≥ WCAG AA) + typecheck + lint
```

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack) and React 19.
- **Styling:** Tailwind CSS v4, with tokens in `app/globals.css`.
- **Components:** shadcn/ui on Radix, restyled. The primitives used are Button, RadioGroup,
  Input, Textarea, Label and Sheet.
- **Motion:** Motion (`motion/react`) with `LazyMotion`.
- **Validation:** zod.

## Structure

```
app/                 routes, layout, globals.css (tokens), allocation server action
components/
  brand/             CrownMark (the crown render), Seal, Arrow
  edition/           Can (the can renders), RefNumber, EditionPlate, SpecSheet
  hero/              Unveiling, Bezel, TakeDirector
  motion/            springs (tokens), Reveal / MaskLines / Hairline, Flight (cross-route can)
  sections/          landing chapters I–VII, Portrait, RegisterRow
  allocation/        AllocationFlow, Certificate
  nav/               SiteNav (green bar, pale-gold active rule), SiteFooter
  ui/                shadcn primitives, restyled
assets/              the project's imagery: cans/ and brand/ (cropped renders), people/, photography/
lib/                 editions (single source of truth), assets (cans, crown), people (photographs),
                     register, allocation (schema, numbering)
scripts/contrast.mjs
```

## What is stubbed

The allocation flow validates on the server, but **stores and sends nothing**. `store()` in
`lib/allocation.ts` is an intentional no-op, and the UI tells visitors so.

Allocation numbers are deterministic, derived from email and edition, so there are no invented
counters. Connect a database and a mailer at `store()` before any real use. The entries in the
Register are illustrative.
