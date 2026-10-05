# Crown Energy — Design System & Rationale

> *What if luxury wasn't just worn… but experienced?*
> **A Crown for Every Achievement.**

Crown Energy is a conceptual first entry by Rolex into consumables: three numbered editions of a
functional drink, presented the way a watch house presents a reference. This document defines the
system the site is built on. It also explains why each rule exists, in terms of the brand's one
idea: **energy is recognition**.

The aesthetic is **Editorial Luxury / Precision Minimalism**. Every rule below serves it.

---

## 1. The emotional brief, and where each beat lives

| Feeling | What the visitor sees | Where |
|---|---|---|
| **Prestige** | Black. A single gold floor line draws. The crown comes into light. *A Crown for Every Achievement* is unmasked line by line. Nothing else moves. | Unveiling, arrival |
| **Power** | Noir Kinetic rises out of the vault floor under a sweeping light. A 60‑minute bezel turns in mechanical 6° clicks. *Energy is recognition.* | Unveiling, p .18–.52 |
| **Curiosity** | Two more crowns rise beside it. *351 formulations. Eight selected. Three released.* Reference numbers roll like a date wheel. | Unveiling, p .46–.90 · Chronicle (closing line) |
| **"I want in"** | The vitrine becomes a selector. The visitor *chooses the crown that defines their achievement*. Nothing is ever "bought": an allocation is **requested** against an achievement and ends in a certificate in their name. | Vitrine → Dossier → Request → Certificate |

The visitor never sees a cart, a price-first card, a discount, a countdown or the words "energy
drink". The price is literally **disclosed on allocation**.

---

## 2. Colour

The palette is the April build's own (`index.html`): ink, ivory, Rolex green and gold. The site
is no longer a single black vault. **Sections alternate between the ink vault and ivory paper**,
under a **green navigation bar**, the way a watch catalogue alternates photography and printed
pages.

All values live in `app/globals.css`. Every text pairing on every surface is verified by
`npm run contrast`, which exits non-zero if any pairing drops below its minimum. `npm run check`
runs it together with the typecheck and lint.

### Roles, not colours
Token names are roles: `ink-*` is the **surface**, `bone-*` is the **text on it**, and `gold-*` is
the accent on it. A section opts into a surface with one class, and every token inside it is
re-pointed, so a component reads correctly wherever it is placed without carrying light and dark
variants of its own.

| Scope | Where | Surface |
|---|---|---|
| `:root` / `.surface-ink` | Unveiling, Chronicle, Certification, Register, allocation, footer | The vault (April `--ink`) |
| `.surface-ivory` | Philosophy, The Standard, Invitation, the Collection, the Dossier | Paper (April `--ivory`) |
| `.surface-warm` | Calibre, the Dossier's *other editions* | Paper, one shade deeper (April `--ivory-warm`) |
| `.surface-plate` + `.plate-{slug}` | Edition plates | The April card lacquers (165° gradients) |
| `.surface-green` | Navigation bar | Rolex green (April `--green`) |

On the home page the rhythm is ink, ivory, ink, warm, ink, ivory, ink, ivory, ink: no two
neighbouring sections share a surface.

### The vault (`:root`, `.surface-ink`)
| Token | Hex | Role | Contrast |
|---|---|---|---|
| `ink-0` | `#080704` | Page (April `--ink`). Never pure `#000` | — |
| `ink-1` | `#0F0D09` | Surfaces (Chronicle, Certification) | — |
| `ink-2` | `#15130E` | Raised / hover surfaces | — |
| `bone` | `#FAF8F3` | Primary text (April `--ivory`) | 19.0 : 1 on ink‑0 |
| `bone-2` | `#ACA698` | Secondary text | 8.3 : 1 |
| `bone-3` | `#8B8578` | Tertiary text, captions | 5.5 : 1 (5.1 on ink‑2) |
| `gold` | `#B8941F` | Reference numerals, labels, hairlines, CTA outline (April `--gold`) | 7.0 : 1 |
| `gold-hi` | `#D4AF37` | Hover text, focus ring (April `--gold-light`) | 9.6 : 1 |
| `earned` | `#D4AF37` | The one earned word per headline | 9.6 : 1 |
| `gold-hair` / `gold-faint` | `rgb(184 148 31 / .30)` / `/ .14` | 1px rules / row separators | — |
| `laurel` | `#00804D` | State indicator (April `--green-light`) | 4.0 : 1 (non-text, min 3 : 1) |
| `signal` | `#D98B76` | Form errors only, always with text | 7.6 : 1 |

### Paper (`.surface-ivory`, `.surface-warm`)
| Token | Ivory | Warm | Role | Worst contrast |
|---|---|---|---|---|
| `ink-0` | `#FAF8F3` | `#F5F0E6` | Section background (April `--ivory` / `--ivory-warm`) | — |
| `bone` | `#080704` | same | Primary text | 15.5 : 1 |
| `bone-2` | `#47423A` | same | Secondary text | 7.7 : 1 |
| `bone-3` | `#625C50` | same | Tertiary text | 5.1 : 1 |
| `gold` | `#735C20` | same | Labels and numerals: gold darkens on paper, as April's ivory-section tags did | 4.9 : 1 |
| `gold-hi` | `#5C4813` | same | Hover text, focus ring. On paper, emphasis goes *darker*. | 7.2 : 1 |
| `earned` | `#9A7B1A` | same | The earned word, **display sizes only** (≥ 24px, WCAG large text) | 3.3 : 1 (min 3) |
| `laurel` | `#006039` | same | State indicator (April `--green`) | 5.9 : 1 |
| `signal` | `#A4442C` | same | Form errors | 5.4 : 1 |

### Plates and the bar
- **Edition plates** use April's card gradients unchanged: `#005A30 → #002815 → #001A0D`
  (Verdant), `#6E5510 → #3D2E06 → #1F1803` (Aurum) and a near-black (Noir). Text sits at the top
  of each plate, its lightest point, so every tone is lifted: ivory, `#ECE6D8`, `#DAD3C2`, and
  pale gold `#E8D48B` (April `--gold-pale`). The worst case is `bone-3` on Aurum at 4.7 : 1.
- **The navigation bar** is `#006039` with ivory text (7.2 : 1). Hover text and the current-page
  rule are pale gold `#E8D48B` (5.2 : 1).
- **Print** keeps `print-gold #7A6224` on white (5.8 : 1).

**Rules**
- Gold is used like a watchmaker uses it: hairlines, numerals, and **one earned word per headline**
  (`.earned`). In the interface it is never a fill, a gradient or a glow.
- Green is the house colour: the navigation bar and the browser theme colour (`#006039`). Inside
  pages it appears only as `laurel` (progress, choice, the seal's ring) and in the Verdant plate's
  lacquer.
- `prefers-contrast: more` promotes `bone-3 → bone-2` and strengthens every hairline on both ink
  and paper.

### Laurel: green as a state
`laurel` means one thing everywhere: **this is where you are, this is what you chose.**

| Where | Form |
|---|---|
| **Allocation flow** (`AllocationFlow.tsx`, `ui/radio-group.tsx`) | Progress rules beside I · II · III (done 1px, current 2px). The ring and centre of the selected honour or edition. |
| **Certification seal** (`brand/Seal.tsx`) | One 0.75px ring just inside the seal's outer edge. |

Every state it marks is also carried by something other than colour: `aria-current="step"` or the
radio's checked state. The current page in navigation, which sits on the green bar, is marked by
a pale-gold rule (plus `aria-current="page"`).

---

## 3. Typography

The April build's four faces, self-hosted through `next/font` (no requests to Google at runtime),
each with one job. April's illegible sizes are not kept: Syncopate was set at 7–8px, and here
nothing is under 12px.

| Family | Use | Why |
|---|---|---|
| **Cormorant Garamond** (variable, roman + italic) | Headlines, titles, the wordmark, edition names, dedications | A Garamond cut for display: long, sharp serifs and a calligraphic italic. The earned word in italic reads as a signature. |
| **Syncopate** (400) | The `label` voice: chapter marks, navigation, buttons, specs, eyebrows | Wide, geometric capitals, like the lettering on a bezel or caseback. Tracked at 0.2em and set at 12px. |
| **Jost** (variable) | Body text, data values | The open-source Futura: clear and quiet beside the other three. |
| **Playfair Display** (variable) | Large figures (`.figure`): Chronicle years, Calibre figures | April's stat face. High-contrast lining numerals for the numbers that carry the story. Not preloaded, since it only appears below the fold. |

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `text-display-xl` | `clamp(3.25rem, 7vw, 7.5rem)` | 0.95 | −0.02em | Hero headline |
| `text-display-l` | `clamp(2.75rem, 5vw, 5rem)` | 1.0 | −0.015em | Section headlines, dossier title |
| `text-display-m` | `clamp(2rem, 3.2vw, 3.25rem)` | 1.08 | −0.01em | Spoken lines, honours, figures |
| `text-title` | 1.5rem | 1.3 | — | Edition names, list titles, inputs |
| `text-body-l` | 1.125rem | 1.7 | — | Lede paragraphs |
| `text-body` | 1rem | 1.7 | — | Body |
| `label` | 0.75rem (12px), uppercase, Syncopate 400 | 1.6 | 0.2em | The catalogue voice |

**Rules**
- **12px is the floor for any HTML text.** The only smaller type is graphic lettering printed on
  the can and seal artwork, which is `aria-hidden`.
- Syncopate runs wide. Where labels sit in columns, the values they head are aligned to a shared
  baseline (`mt-auto`), so a label that wraps to two lines never pushes its figure out of line.
  The hero's ref numbers tighten to 0.06em on phones.
- Reference numbers use `tabular` (tabular, lining figures), like a caseback engraving.
- **Engraved numerals** (`.engraved`, certificate only). The allocation and reference numbers are
  *cut*, not printed: `gold-hi`, tabular, with a 1px dark lip above and a faint catch-light below.
  This is a screen effect only; on paper they are plain `print-gold` ink.
- Headlines use `text-wrap: balance`, paragraphs use `pretty`.
- Exactly one italic gold word per headline. If everything is emphasised, nothing is earned.

---

## 4. Space & layout

- **Base unit** 4px. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256.
- **Grid** 12 columns, `max-width: 90rem`, side margins `clamp(1.25rem, 5vw, 6rem)` (`.catalog`).
- **Section rhythm** `clamp(8rem, 18vh, 14rem)` vertical padding (`.section-y`). This is
  watch-catalogue whitespace: each section is a page of the catalogue, never a scroll of cards.
- **Chapter marks** Every section opens with a numeral, a hairline and a name (`I — Philosophy`).
  Roman numerals echo a dial.
- **Hairlines, not boxes.** Structure comes from 1px gold rules and alignment, never from cards
  with radius and shadow. `--radius` is `0`.

---

## 5. Motion

Motion language: **still until it moves with purpose, then a single precise movement.** A Rolex
hand arrives; it does not wobble.

### Springs (`components/motion/springs.ts`)
Every spring is critically damped or overdamped, **ζ = c / (2√(k·m)) ≥ 1**, so nothing overshoots
and nothing bounces. Settle times are measured to the 2% band.

| Token | stiffness | damping | mass | ζ | Settles | Used for |
|---|---|---|---|---|---|---|
| `spring.movement` | 70 | 20 | 1 | 1.20 | 0.94s | Reveals, line unmasking, step changes |
| `spring.bezel` | 260 | 34 | 1 | 1.05 | 0.40s | Hover, focus, the crown lifting off the plinth |
| `spring.crown` | 40 | 16 | 1.2 | 1.15 | 1.30s | Hero choreography, hairlines, **the cross-route can flight** |
| `springValue.scroll` | 120 | 30 | 1 | 1.37 | 0.87s | Smooths raw scroll into inertia (no scroll-jacking library) |
| `springValue.ratchet` | 340 | 39 | 1 | 1.06 | 0.35s | Each 6° click of the bezel |

- **Opacity is tweened, never sprung:** 0.9s, `cubic-bezier(.22, 1, .36, 1)`. Light has no mass.
- **No loops.** Nothing pulses, spins, floats or shimmers on its own. Every movement is caused by
  the visitor (scroll, hover, focus, choice) or plays once.
- **Scroll is read, never hijacked.** Native scroll drives one `MotionValue`, smoothed by a spring.
  No React re-renders happen on scroll.
- **Mechanism over decoration.** The bezel turns in quantised 6° clicks, each landing on a
  ratchet spring. Reference digits roll through a full revolution and stop dead. Light crosses
  each can's lacquer once, bound to scroll or pointer.

### Micro-interaction: the Register reveal (`sections/RegisterRow.tsx`)
Each achievement in the Register holds one more line, its story. That line surfaces only for
someone who leans in.

| | |
|---|---|
| **Peek** | Mouse hover over the row (`pointerType === "mouse"`, so a touch never "hovers"), or keyboard focus on the achievement (`:focus-visible` only). |
| **Pin** | Click, tap, Enter or Space toggles it open and keeps it there after the pointer or focus leaves. |
| **Dismiss** | Escape closes it from the keyboard. |
| **Choreography** | A 24px gold hairline draws first (`scaleX`, `spring.bezel`). 0.08s later the words rise 6px into place (`spring.bezel`) while fading in (0.45s, precision ease). Leaving is faster and simpler: 0.2s, no stagger. |
| **Marker** | A hairline plus at the end of the achievement; its vertical stroke settles (`scaleY → 0`) into a minus. `bone-3` at rest, `gold-hi` on hover and focus. |
| **Layout** | Desktop reserves the story's line, so a passing pointer never moves a row beneath it. On touch the row opens only when tapped (`grid-template-rows: 0fr → 1fr`, 500ms precision ease). |

It is quiet because it is earned: no row reacts to the page scrolling past it, only to attention.

### Reduced motion
Handled **once, globally**: `<MotionConfig reducedMotion="user">` makes every transform instant
and keeps opacity crossfades. On top of that:
- The pinned hero is replaced by a **still composition** with every beat in reading order.
- The cross-route flight is skipped, so navigation is direct.
- Smooth scrolling is turned off.
- The crown's arrival keeps its fade; its small rise and scale become instant.

The hydration-safe hook `usePrefersReducedMotion` is used only where *structure* differs, so
server and client markup always match.

---

## 6. Marks, imagery & systems

**All imagery is the project's own** (`Assets/`), served through `next/image` (AVIF, then WebP,
at the size each slot needs):
- **Mockup 1** — the three can renders
- **Mockup 2** — the crown and the photoshoot
- **Personalities** — the portraits

The cans and the crown are concept artwork for a Rolex brand extension. They carry the Rolex
wordmark and coronet by the owner's direction. The site's concept status is stated in the
README; on the site itself the footer follows the April build (§7).

| System | Design | Rationale |
|---|---|---|
| **The crown** (`brand/CrownMark.tsx`, `Assets/Mockup 2/crown.png`) | The gold crown render, cropped to its mark (532 × 571). It appears in the nav, the footer, the hero arrival, the Invitation, the certificate header, the heart of the seal (through the image optimiser), and the favicon (64px). | One mark everywhere: the same object the visitor will later see on every can. |
| **Reference system** | `Ref. 351.087 / 351.212 / 351.304`: each edition's index among the 351 formulations in the story. Of the 351, eight were selected and three released; the Chronicle closes on that line. | It replaces the real Rolex references (16700, 116595, 126710) the April build reused. The numbers *are* the story: 351 → 8 → 3 is the curiosity beat. |
| **Crown Certification seal** (`brand/Seal.tsx`) | Minute track, engraved ring text, the crown render, the edition reference at its heart, and one laurel ring. Two finishes: `hairline` for the catalogue, and `engraved` for the certificate (see §7). | It replaces "Superlative Chronometer". It is pressed onto every certificate. |
| **The can** (`edition/Can.tsx`, `Assets/Mockup 1/*.png`) | The project's renders, already transparent. Each is cropped to the can and placed on one shared 459 × 1144 canvas, bottom-aligned, so all three stand identically on the hero's floor line. Over it, a soft light band clipped to the can body follows a 0–1 value (scroll, pointer or a scripted move); beneath it, a floor shadow. | The real product, exactly as designed, with chronometric orbit, astrolabe and compass-star engravings. Served at 25–30 KB (AVIF) instead of 2.3 MB. |
| **Photography** (`lib/people.ts`) | The photoshoot sits in the Invitation inside the April gold corners: six columns from column seven, so a full empty column separates it from the call to action. The Personalities appear as portraits: Hans Wilsdorf in the Chronicle, five public figures in *The Standard*. Every photograph keeps its original colour; the black page and gold rings frame them. Captions are factual (name, field, achievement); **no quotes are attributed**. | Achievement, shown rather than claimed, without putting words in real people's mouths. |

### The three editions
Mapped to the report's own sentence: *"every effort, every milestone, every moment of discipline."*

| | Verdant Chrona | Aurum Cycle | Noir Kinetic |
|---|---|---|---|
| Ref. | 351.087 | 351.212 | 351.304 |
| Honours | **Effort**: work sustained over time | **Milestone**: a moment of arrival | **Discipline**: what you do when no one is watching |
| Dedication | *For the long work.* | *For the moment it is recognised.* | *For the hours no one sees.* |
| Engraving | Chronometric orbit | Astrolabe | Compass star |
| Notes | Green tea, yuzu peel, alpine herbs | Saffron, white peach, honeyed citrus | Black cherry, cacao husk, smoked vanilla |

All three are a First Edition (MMXXVI) of **2,026 numbered allocations**, 330 ml, Crown Certified,
with price disclosed on allocation.

---

## 7. Component rules

| Component | Rule |
|---|---|
| **Button** (`ui/button.tsx`) | `primary` = gold hairline outline, bone text; hover warms the field to `gold-faint`. **No fill, gradient, glow or lift.** `quiet` = text with a hairline that draws on hover. Height ≥ 44px. |
| **SectionHead** | Numeral · hairline · name. Every chapter opens with one. |
| **MaskLines** | Headlines are authored as lines, never auto-split, so screen readers hear one sentence. Lines unmask from below on `spring.movement` at 0.12s stagger. Each line waits at `MASK_HIDDEN` (150% of its height) so that not even Cormorant's tallest ascenders or italic swashes show above the mask's edge before the reveal begins. |
| **Hairline** | 1px `gold-hair`, drawn by `scaleX` on `spring.crown`. |
| **EditionPlate** | A collectible in a vitrine: reference top-left, numeral top-right, the can, name, honour, dedication, "Examine". Each plate wears its edition's April lacquer gradient (`.surface-plate .plate-{slug}`) and stands apart from its neighbours on the ivory page. Pale-gold corners, inset 12px like a frame inside a case, extend on hover and focus. The whole plate is one link. |
| **Can** | The Mockup 1 render. Its light follows scroll or pointer. It has a full `alt` description unless a parent already names it (then `alt=""`). It is preloaded where it is the page's largest element (the Dossier) and fetched at low priority where it supports the page (plates, thumbnails). |
| **Portrait** (`sections/Portrait.tsx`) | A catalogue plate for a photograph: a 3:4 frame, the photograph's original colour, a hairline gold inner ring and a factual caption (the name on one line at every width, so the fields line up across the row). **Framing:** the sources are landscape and their faces sit at very different sizes and heights, so each person carries a measured `frame` in `lib/people.ts` (face centre, eye line, zoom). Every face is centred, about the same size (head ≈ 36% of the frame) and on one eye line 22% down; the offsets are clamped so the frame is always covered. **Sharpness:** `sizes` is scaled by how much wider than its frame the photograph is drawn, so the browser fetches a file at least as large as it displays (before, a 244px file was stretched to ~470px). **Hover** (The Standard): the plate lifts 4px, the photograph eases to 104% toward the face, and the ring warms from 12% to 28% gold, over 700ms on the precision ease. Transforms apply only when the visitor allows motion. |
| **FounderPortrait** (`sections/FounderPortrait.tsx`) | Hans Wilsdorf in the Chronicle, set as the April build set him. The archival photograph is shown whole, in landscape (1024 × 641), 420px wide at 1440 (April's width), with a gold hairline frame. The caption (*Hans Wilsdorf* in Cormorant italic, *Founder · 1905* in Syncopate) sits in its lower-left corner over a shade to 70% ink. Two 80px gold brackets stand off the frame, top right and bottom left. The photograph eases in from 106% and the brackets settle 0.4s after it. Its lower edge shares the headline's line at every width; below 1280px it takes one more column so the caption has room. |
| **The Standard** (`sections/Standard.tsx`) | Chapter V: the headline, then five portraits from the Personalities folder, close beneath it. One row of five from 1280px; three and two on tablets; two, two and one on phones, every short row centred. It sets up the Register's counterpoint: the world records their names; the Register records only what was done. |
| **RefNumber** | Digits roll as wheels in a shared 1.2em box (baseline-safe). The accessible text is the plain reference. |
| **Flight** (`motion/Flight.tsx`) | The chosen can is lifted into a fixed overlay at its exact rect. The route changes beneath it, the overlay springs (`spring.crown`) to the destination's `<CanLanding>`, and the landing takes over in the same frame. One object, one movement, no cut. |
| **SpecSheet** | A watch-catalogue spec table. Reference in gold numerals; the price row reads *Disclosed on allocation*. |
| **Register** | A ledger, not a carousel: four entries (Vienna, Mumbai, Dublin, Zürich) covering all three editions. The columns are No., Honour, Achievement, Edition and City. It holds no names, no faces and no quotes. Each achievement is a disclosure holding one line of its story (§5, *the Register reveal*). |
| **Certificate** (`allocation/Certificate.tsx`) | The allocation number and reference are engraved numerals (§3). The seal uses its `engraved` finish at 192px: about 50% heavier strokes, the reference at 16px weight 600, and on screen only a blind-pressed disc and a cut edge (`.seal-engraved`: dark lip above, catch-light below). It stamps in at 1.6s (`spring.bezel`). **Print:** the page turns white and the text black ink. Labels, numerals, frame and seal turn `print-gold`, and the laurel ring stays laurel (5.9 : 1 on white). Every screen-only effect is stripped (text-shadows, filters, the pressed disc), so the paper version is clean, flat ink. **Always exactly one A4 landscape page:** everything that is not the certificate or one of its containers is removed from print layout (`display: none` via `:has()`), so nothing else can claim a page. The certificate is a fixed 184mm tall, inside 12mm of white. The page margin is 0, so the browser prints no date, URL or page-number header. The print layout is set with `print:` utilities, not breakpoints (a printed page doesn't trigger the screen ones). The details and the seal (144px) sit side by side at the foot, and the longest permitted achievement (280 characters) still fits. |
| **Allocation flow** | One question per screen, in an advisor's voice. The honour chosen recommends the crown, which can be overridden. It ends in a certificate, never a receipt. Progress and the selected choice are marked in `laurel`. |
| **Navigation** | The April green bar (`#006039`, `.surface-green`), fixed, 64px, closed by a 1px deep-green edge. Links in Syncopate. Centre: the crown with **ROLEX** in the wordmark face (Cormorant Garamond, tracked capitals, as April's nav). The certificate keeps *Crown Energy*. The current page carries a 2px pale-gold rule; hover draws a 1px one and warms the text to pale gold. Below 1024px (where Syncopate's links no longer fit beside the wordmark), a full-height Radix Dialog on ink with roman-numeral links (the current one ruled in gold); focus is trapped and Escape closes it. |
| **Footer** (`nav/SiteFooter.tsx`) | The April build's footer: the crown and **ROLEX**, April's line (*The world's first ultra-premium energy drink. Crafted with the same obsessive precision that defines every Rolex calibre.*), an *Explore* column (Philosophy, Collection, Formula, Reserve, Crown Circle, linked to their sections) and a *Company* column (About, Boutiques, Press, Contact), then *© 2026 Crown Energy Division. All rights reserved.* with Privacy, Terms and Legal. Company and legal entries have no pages yet, so they are set as text rather than links that lead nowhere. Columns sit side by side from phones up. |

---

## 8. Accessibility

Target: **WCAG 2.2 AA**.

**Measured**
- Lighthouse accessibility **100** on every audited route, desktop and mobile.
- axe-core 4: **0 violations** on `/`, `/editions`, `/editions/[slug]` and `/allocation`. The only
  "incomplete" items are text over layered or image backgrounds that axe cannot measure.

**Built in**
- **Contrast** Every text token pairing is proven by `scripts/contrast.mjs`: 16 pairings, all ≥ AA.
- **Structure** Skip link, landmarks (`header/nav`, `main`, `footer`), one `h1` per page,
  breadcrumb, `aria-current` on nav and steps.
- **The hero is fully in the DOM** in reading order; scroll only reveals it. The vitrine is a
  `<nav>` of three links:
  - Each has a descriptive name, e.g. *"Noir Kinetic, reference 351.304. Honours discipline.
    Examine the edition."*
  - Tabbing into it scrolls the stage to the selection beat.
  - Arrow keys move between crowns.
  - A visible gold ring surrounds the focused crown.
- **The Register disclosure**
  - Each achievement is a real `<button>` with `aria-expanded` and `aria-controls` pointing at
    its story.
  - A closed story is `visibility: hidden`, so assistive tech never reads text that sighted
    users can't see, and `aria-expanded` changes with it.
  - The revealed line never covers other content, and Escape closes it (WCAG 1.4.13).
  - Without JavaScript, every story is simply shown.
- **Forms**
  - Radix RadioGroups give roving focus and arrow keys.
  - Every field has a real `<label>`; errors use `aria-invalid` and `aria-describedby`, plus a
    text prefix "Error:".
  - Focus moves to the first invalid field, or to the new question's heading on each step.
  - A polite live region announces "Step 2 of 3 …".
- **Targets ≥ 44px** for all interactive controls. **Focus ring**: 1px `gold-hi`, 4px offset,
  everywhere.
- **Motion**: see §5. **Reduced transparency/contrast**: `prefers-contrast: more` is honoured.
- **No JavaScript** The site remains readable. Every hidden first frame is shown as its last, and
  the hero shows its title frame.
- **No custom cursor**, and the native cursor is never hidden. (The April build set `cursor: none`.)

---

## 9. Performance

**Measured** (production build, Lighthouse 12)

| Route | Desktop P / A / BP / SEO | Desktop LCP · CLS · TBT | Mobile P / A / BP / SEO | Images (mobile) |
|---|---|---|---|---|
| `/` | **100 / 100 / 100 / 100** | 0.5s · 0 · 0ms | 90 / 100 / 100 / 100 | 13 KB |
| `/editions` | **99 / 100 / 100 / 100** | 0.8s · 0 · 0ms | 88 / 100 / 100 / 100 | 82 KB |
| `/editions/verdant-chrona` | **100 / 100 / 100 / 100** | 0.7s · 0 · 0ms | 91 / 100 / 96 / 100 | 68 KB |
| `/allocation` | **100 / 100 / 100 / 100** | 0.7s · 0 · 0ms | 93 / 100 / 100 / 100 | 7 KB |

*Honest notes*
- **Mobile LCP misses the 1.8s target under simulated throttling.** Lighthouse's simulated slow 4G
  and 4× CPU report LCP of 3.0–3.8s, because the simulation attributes the JS download to the
  paint. With real DevTools throttling, LCP equals FCP on every route (1.6s home, 2.7s elsewhere):
  the largest element is the first paint, and nothing waits on JavaScript.
- **The dossier's mobile best-practices score is 96.** The "legible font sizes" heuristic counts
  the fine lettering around the certification seal, which is graphic and named as one image.
- **`/editions` on mobile scores 88** (90 before the renders). The three can images are real
  bytes, but at low fetch priority they do not compete with the page's text.

**Techniques**
- Every catalogue route is statically generated. `/allocation` is dynamic only to read
  `?edition=`.
- **Images** go through `next/image`: AVIF first, then WebP, sized per slot.
  - A 2.3 MB can render arrives as about 25 KB.
  - The hero cans mount only after hydration, out of the first frame.
  - Plate and thumbnail cans load at low fetch priority; the Dossier can is preloaded.
  - Portraits use blur placeholders and lazy loading.
  - The favicon is a 6 KB crown at 64px.
- The client bundle imports only the cans and crown (`lib/assets.ts`). Photographs live in
  `lib/people.ts`, used only by server components.
- `next/font` self-hosts and subsets two variable families (about 125 KB of WOFF2 on first load).
- `LazyMotion` + `m` components with `domAnimation` (strict).
- Scroll-linked values are MotionValues: zero React renders per scroll frame.
- No fixed full-screen overlays (the April noise layer is gone) and no `backdrop-filter`.
- The hero's responsive layout is pure CSS custom properties, so the server render is final:
  **CLS 0**.
- Trigonometry is rounded so server and browser markup match exactly (no hydration repaint).

---

## 10. The Unveiling: one continuous take

Built to be recorded as a **single shot**, from first impression to product selection to the
product page, with no hard cut. The whole sequence is driven by one value, `progress` (0–1).

### Storyboard
| # | Beat | Progress | Picture | Sound of it |
|---|---|---|---|---|
| 1 | **Arrival** | time, 0–2.2s | Black. The floor line draws from centre. The crown comes into light. *From the house of Rolex · Geneva.* The headline unmasks. The navigation bar settles last. | Silence, then a watch being wound |
| 2 | **Prestige** | 0 → .22 | The headline holds, then withdraws upward. | — |
| 3 | **Power** | .18 → .52 | Noir Kinetic rises out of the vault floor, scaled 1.12 then settling to 1. The bezel fades in and ratchets in 6° clicks. Light crosses the lacquer. *Energy is recognition.* | The click of a bezel |
| 4 | **Curiosity** | .46 → .76 | Verdant rises left, then Aurum rises right, light crossing each in turn. Above them, on one line: *351 formulations.* … *Eight selected.* … *Three released.* | — |
| 5 | **Selection** | .72 → 1 | References roll home under each crown. *Choose the crown that defines your achievement.* Hover or focus lifts a crown 14px off the plinth; the others dim. | — |
| 6 | **The flight** | on choice | The chosen can leaves the vitrine and springs into the Dossier's left column. The Dossier's title, reference and story assemble around it. | — |

### Recording it (`/take`)
`/take` plays the sequence as a scripted dolly. No scrolling or hand movement is needed.

| t | Event |
|---|---|
| 0.0s | Operator presses any key (or `?delay=N` elapses) against a black frame |
| 0.0–3.4s | Arrival |
| 3.4–5.9s | Prestige withdraws (p 0 → .22) |
| 5.9–10.4s | Power (p .22 → .52) |
| 10.4–14.9s | Curiosity (p .52 → .76) |
| 14.9–17.4s | Selection (p .76 → .90) |
| 17.4–18.4s | Hold on the vitrine |
| 18.4–21.8s | Attention rests on Verdant (1.0s), Aurum (1.0s), Noir (1.4s) |
| 21.8s | Noir Kinetic is chosen. **The flight.** |
| ~25s | The Dossier has fully assembled. Cut. |

**Shot list**
1. Open Chrome at **1920×1080** (or 1440×900), fullscreen, with zoom at 100%.
2. Visit `/take?delay=3`. The prompt is hidden and the take begins after 3s of black.
3. Start the screen recorder (60 fps) during the black frame.
4. Let it run to the Dossier and stop about 2s after the text settles.
5. Keep the cursor off-screen. The take needs no input.

---

## 11. Voice

Short. Declarative. Never excited. Rolex never uses an exclamation mark, so neither do we.

| Use | Never |
|---|---|
| allocation, reference, edition, certified, recorded, granted, request, register, calibre, dossier, the circle, honours | buy, shop, cart, deal, sale, boost, fuel, rush, buzz, crash, extreme, "energy drink" (in UI) |

**CTA ladder**: *Scroll to unveil* → *Examine* → *Request allocation* → *Submit for recognition*
→ *Allocation granted*.

---

## 12. Banned patterns

The following patterns are banned outright:
- **Gradients and effects:** gradient buttons, glow shadows, hover-lift on buttons, glassmorphism,
  backdrop blur, noise overlays.
- **Perpetual motion:** infinite loops (orbits, floats, pulses, shimmer sweeps) and marquee tickers.
- **Gimmicks:** custom cursors and `cursor: none`; preloaders that block content.
- **Off-brand styling:** Inter; purple; emoji; icon-library glyphs (every icon is a hand-drawn
  hairline); rounded cards with drop shadows.
- **Green beyond its places:** the navigation bar, the Verdant lacquer and `laurel` states. Never
  green buttons, text, headlines or decoration.
- **Commerce and its tactics:**
  - price-first product cards
  - countdowns, "only N left", fake counters and random queue positions
  - celebrity endorsements with invented quotes
  - sentences that describe the product as an energy drink

---

## 13. Rationale: the major decisions

1. **The project's own artwork, throughout.** The cans, crown, photoshoot and portraits are the
   team's Assets, swapped in for the earlier code-drawn placeholders.
2. **The real product, presented as a collectible.** Each render is cropped onto one shared
   canvas so the three stand as a matched set. A single band of light crosses each can as it rises:
   the object is revealed, not decorated.
3. **Price disclosed on allocation.** *"The user must never feel they are buying."* Removing
   price from every pre-allocation surface makes the flow an application, not a checkout.
4. **Public figures set the standard; the Register keeps the circle.** *The Standard* shows
   achievements the world already recognises, with factual captions and no invented quotes. The
   anonymous Register that follows says the circle itself is defined by *what was done*, not by
   who is famous.
5. **Achievement first, then the crown.** The request asks *what are you marking?* before *which
   edition?*. That is the report's line, *"choosing the crown that defines their achievement"*,
   made literal.
6. **A certificate, not a receipt.** Recognition is the product. The final screen is a numbered,
   sealed, printable certificate in the visitor's name.
7. **Ink and paper, in turn.** An all-black site proved monotonous over eight chapters, so the
   April palette returns. Ivory pages carry the objects and people (the editions, the Standard,
   the Invitation); the ink vault carries time, proof and record (the Unveiling, the Chronicle,
   Certification, the Register). The alternation gives each chapter its own page.
8. **Mechanical motion.** The bezel ratchets and the numbers roll like a date wheel. These read as
   a mechanism being operated, not as an advertisement playing.
9. **Scarcity stated once, as fact.** *"Edition of 2,026."* There is no countdown and no pressure.
   Rolex doesn't hurry you.
10. **Green where Rolex puts it.** The navigation bar is the house green, exactly as April had
    it, and it is the one fixed element on every page. Inside the pages green stays a signal
    (`laurel`: your progress, your choice, one ring on the seal), so it keeps its meaning.
11. **Stories are earned by attention.** The Register keeps its names private, but it rewards
    leaning in: one line of each story surfaces on hover, focus or tap. The circle reveals itself
    to the curious, quietly and never all at once.
12. **A certificate that feels cut, not printed.** Numerals and seal carry the weight of
    engraving on screen. On paper they become honest flat ink, because a printed shadow would be
    a fake engraving.

---

## 14. Why this wins

**The interface behaves like a watch house's private salon.**
- **It withholds.** First load gives the visitor black, a line and a crown. It does not sell.
  Prestige is the restraint.
- **It operates.** Scrolling turns a bezel, and that rotation raises the crowns out of the vault.
  The visitor feels they are working a precision instrument, not watching an ad. That is the
  Power beat, and it is theirs.
- **It hints at more.** *351 formulations. Eight selected. Three released.* The Chronicle closes
  on the same line. Curiosity is engineered into the numbers themselves.
- **It never sells.** No price, cart or "buy" exists before allocation. The visitor *requests* a
  crown by declaring what they did.
- **It recognises.** The last screen is not an order confirmation but **a certificate of
  recognition with their name, their achievement and a seal pressed in.** That is the whole
  philosophy, *energy is recognition*, delivered as an interaction.
- **It is one continuous object.** The can the visitor chose is the can they arrive with. From the
  first line to the dossier there is no cut. That is what "experienced, not worn" looks like on a
  screen.

And it is real: accessible to WCAG AA (axe 0 violations, Lighthouse a11y 100), 100 performance
on desktop, CLS 0, imagery at a few dozen kilobytes a page, every route static, readable without
JavaScript.

> *Achievement is personal. Recognition should be earned. And for every achievement, there is a
> crown.*

---

## Appendix A — Audit of the April build

The April build is `github.com/Divyaprabha357/Rolex`, a single 2,131-line `index.html`.

### Brand integrity
1. **Rolex is the master brand.** The nav, footer and title use the Rolex wordmark, `crown.png`
   replicates the coronet, and the cans print ROLEX. This is direct logo copy, which the report
   itself rules out.
2. **Real Rolex references are reused:** REF‑16700 (GMT‑Master), 116595 (Daytona), 126710
   (GMT‑Master II). Rolex-owned terms appear too: "Oyster Green", "Superlative Chronometer",
   "every Rolex calibre".
3. **Invented endorsements.** Hans Wilsdorf is captioned as Crown Energy's founder, and five real
   celebrities carry invented quotes. This contradicts "silent achievement".

### Reads as "energy drink"
4. The first paragraph says *"ultra-premium energy drink"*. The cans say *"Opulent Energy
   Drink"*, and a marquee of supplement claims runs across the page.
5. The Formula section comes before the Collection, which is how energy drinks sell.
6. Cards lead with price ($849 ×3, identical), and "Reserve Your Crown" sits in the first fold.
7. Perpetual decoration: orbit rings spin, the can bobs, glows pulse, shimmer sweeps loop.
8. The waitlist is a newsletter with fake counters (347 / 153 / 12) and a random queue position.
9. Gradient gold buttons with glow and lift, in "casino gold" #D4AF37 / #E8C84A.
10. Ivory sections repeatedly break the black vault. *(Revisited: the ink/ivory rhythm is now kept on purpose; see §2 and §13.7. What changed is that gold darkens on paper so it passes contrast, and the cards no longer read as a shop grid.)*
11. The story contradicts itself: 6h vs four hours, and "4 formulations" vs "4 compounds".

### Craft
12. Four font families, with Syncopate set at 7–8px and 0.45em tracking. *(Revisited: the four faces are kept, each with one job, and Syncopate is set at 12px, 0.2em; see §3.)*
13. Body text at 15–40% white (~1.5–4:1 contrast), footer at 12–20% (~1.3:1).
14. Bugs: `position: stick`, `clamp(28px, 3.5vw, 15px)`, 2 dots for 5 cards, dead CSS, inline
    `onclick`.
15. `cursor: none`, no focus styles, an unlabeled email input and dots, no reduced motion, and a
    2.2s blocking preloader.
16. About 25 MB of PNGs, a full-screen fixed noise layer, and 4 font families from the Google CSS
    API.
17. No product pages, no seal, no per-edition story, and no unlock flow. Cards link nowhere.

### Kept and refined
- **Copy and story:** the tagline, the 2023–2026 Chronicle, *"Time was never chased. It was
  mastered."*, *"You don't need more energy. You need control."*
- **Ideas:** the green navigation bar, the ink/ivory section rhythm, the four typefaces (at
  legible sizes) and the reference-number idea.
- **Visual details:** gold corner frames, the lacquer card gradients, the three engraving
  motifs, and the three-edition structure.

## Appendix B — Stubbed, by design

- **Allocation persistence.** `lib/allocation.ts → store()` is a deliberate no-op: nothing is stored
  or sent, and the UI says so. Allocation numbers are deterministic (FNV‑1a of email + edition, mod
  2,026), so there are no invented counters. Replace `store()` with a database write and a mailer
  before any real use.
- **The five unreleased selections** (eight selected, three released) are a story beat, not products.
