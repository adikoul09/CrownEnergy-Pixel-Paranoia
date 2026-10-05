import type { EditionSlug, Honour } from "./editions";

/**
 * The Register — the circle, defined by what was done rather than who did it.
 * Entries are illustrative (declared in the site footer). No real people.
 */
export interface RegisterEntry {
  no: string;
  honour: Honour;
  achievement: string;
  /** One short line of the story behind it — revealed on hover, focus or tap. */
  story: string;
  edition: EditionSlug;
  city: string;
}

export const register: RegisterEntry[] = [
  {
    no: "0007",
    honour: "discipline",
    achievement: "Eleven years of five a.m. scales. A first chair with the orchestra.",
    story: "Four thousand mornings, for a nine-minute audition.",
    edition: "noir-kinetic",
    city: "Vienna",
  },
  {
    no: "0026",
    honour: "effort",
    achievement: "Four thousand hours of surgical training. A first solo cardiac repair.",
    story: "Twelve years between a first suture and this one.",
    edition: "verdant-chrona",
    city: "Mumbai",
  },
  {
    no: "0073",
    honour: "discipline",
    achievement: "A first novel, written before work, every morning for six years.",
    story: "Ninety minutes before work, six years, three hundred pages.",
    edition: "noir-kinetic",
    city: "Dublin",
  },
  {
    no: "0096",
    honour: "milestone",
    achievement: "Defended a doctoral thesis in theoretical physics.",
    story: "Seven years of work for nineteen lines of proof.",
    edition: "aurum-cycle",
    city: "Zürich",
  },
];
