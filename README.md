# Crown Energy

**A Crown for Every Achievement.**

Crown Energy imagines Rolex launching its first consumable: an energy drink in three editions.
You don't buy a can. You ask for one by telling the brand what you achieved, and you receive a
numbered certificate in your name.

**Live site:** [crown-energy.vercel.app](https://crown-energy.vercel.app/)

---

## Where this project comes from

This is the second version of a project I first made in **April 2026** for **Design Paradox, the
UI & Product Design Challenge run by CSI VIT**. Our team won **first place** with that version.

This version was rebuilt for **Pixel Paranoia at DJSCE**. It keeps the April idea, story, cans
and colours, and changes how the site is built and how it behaves.

| | April version (CSI VIT) | This version (DJSCE) |
|---|---|---|
| Built as | One HTML file | A full website with separate pages |
| Pages | One long page | Home, the Collection, a page for each edition, and the request page |
| The cans | Shown on cards with a price | Each can has its own page with its story, details and certification seal |
| Getting a can | An email waitlist | A three-step request that ends in a printable certificate |
| Opening of the site | A loading screen, then the page | No loading screen: the crown, headline and cans appear in one continuous scroll |
| Animation | Constant looping (spinning rings, floating can) | Motion only when you scroll, hover or click |
| Readability | Labels as small as 7px; light grey text that was hard to read | Nothing smaller than 12px; every text colour passes accessibility contrast checks |
| Phones | Desktop layout squeezed down | Layouts designed for phone, tablet and desktop |

---

## The idea

Rolex has never made anything you consume. We asked what it would look like if it did, and
answered with a drink presented the way Rolex presents a watch:

- **Reference numbers** on every can, like a watch reference.
- **A certification seal** awarded to each can, like a chronometer certificate.
- **A green menu bar, gold detailing and the crown**, taken from Rolex's own visual language.
- **No prices on the shelf.** The price is "disclosed on allocation", and you are asked what you
  achieved before you are asked who you are.

---

## The three editions

| | Verdant Chrona | Aurum Cycle | Noir Kinetic |
|---|---|---|---|
| Reference | 351.087 | 351.212 | 351.304 |
| Honours | **Effort**: work sustained over time | **Milestone**: a moment of arrival | **Discipline**: what you do when no one is watching |
| Line on the can | "For the long work." | "For the moment it is recognised." | "For the hours no one sees." |
| Colour | Green | Gold | Black |
| Engraving | Chronometric orbit | Astrolabe | Compass star |
| Flavour notes | Green tea, yuzu peel, alpine herbs | Saffron, white peach, honeyed citrus | Black cherry, cacao husk, smoked vanilla |

All three: 330 ml, a first edition of 2,026 numbered cans.

---

## The story told on the site

- **2023: The Geneva Protocol.** A Rolex research team in Geneva asks one question: could
  precision be consumed?
- **2024: Testing the limit.** 351 formulations are made. Eight are selected. Trials confirm four
  hours of steady focus.
- **2025: The certification year.** Three editions are finalised, and each can receives the Crown
  Certification.
- **2026: The global unveiling.** Numbered first editions are released, and access is granted one
  achievement at a time.

---

## What you'll find on the site

**Home page**, from top to bottom:
1. **The opening.** The crown and the headline appear on black. As you scroll, Noir Kinetic rises
   under a rotating watch bezel, then the other two cans join it. Click any can to open its page.
2. **Philosophy.** "Energy is not consumption. It is recognition." The three kinds of achievement,
   each linked to its can.
3. **The Chronicle.** Hans Wilsdorf, Rolex's founder, and the 2023–2026 story.
4. **The Calibre.** The four ingredients, described like the parts of a watch movement.
5. **Certification.** The seal, and the four checks every can passes.
6. **The Standard.** Five people whose achievements need no introduction: Roger Federer, Lewis
   Hamilton, Tiger Woods, Leonardo DiCaprio and Coco Gauff.
7. **The Register.** Entries recording what people achieved, from Vienna, Mumbai, Dublin and
   Zürich. Hover over or tap an entry to read its story.
8. **The Invitation.** The photoshoot of the three cans, and the button to request one.

**The Collection.** The three editions side by side, each on its own coloured panel.

**Edition pages.** One per can: the can at full size, its story, a full specification table and
its certification seal.

**Requesting a can.** Three questions, one per screen:
1. What are you marking: effort, a milestone or discipline? (This suggests a can, which you can
   change.)
2. Describe the achievement in one sentence, and give its date.
3. Your name and email.

You then receive a **Certificate of Recognition** with your name, your achievement, your edition
and an allocation number out of 2,026. It prints on a single A4 page. Nothing you enter is saved
or sent anywhere.

---

## Run it on your own laptop

You need [Node.js](https://nodejs.org/) (version 20 or newer) and Git.

```bash
git clone https://github.com/adikoul09/Crown-Energy.git
cd Crown-Energy
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## More detail

The colours, fonts, spacing, animation rules and the reasoning behind each design decision are
written up in **[DESIGN.md](./DESIGN.md)**.

---

*Crown Energy is a student design concept. It is not affiliated with or endorsed by Rolex SA or
by any of the people pictured.*
