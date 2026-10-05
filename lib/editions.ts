/**
 * The three editions — single source of truth for every surface that names a can.
 *
 * Reference numbers are original: each is the formulation's index among the 351
 * engineered in Geneva (see the Chronicle). Eight formulations were selected;
 * three were released.
 */

export const EDITION_SLUGS = ["verdant-chrona", "aurum-cycle", "noir-kinetic"] as const;
export type EditionSlug = (typeof EDITION_SLUGS)[number];

export const HONOURS = ["effort", "milestone", "discipline"] as const;
export type Honour = (typeof HONOURS)[number];


export interface Edition {
  slug: EditionSlug;
  numeral: "I" | "II" | "III";
  name: string;
  nameLines: [string, string];
  ref: string;
  formulation: string;
  honour: Honour;
  honourLabel: string;
  honourMeaning: string;
  dedication: string;
  lacquerName: string;
  engravingName: string;
  profile: string;
  notes: string;
  story: [string, string];
  canDescription: string;
}

export const EDITION_SIZE = 2026;

export const editions: Record<EditionSlug, Edition> = {
  "verdant-chrona": {
    slug: "verdant-chrona",
    numeral: "I",
    name: "Verdant Chrona",
    nameLines: ["Verdant", "Chrona"],
    ref: "351.087",
    formulation: "087",
    honour: "effort",
    honourLabel: "Effort",
    honourMeaning: "Work sustained over time",
    dedication: "For the long work.",
    lacquerName: "Green lacquer",
    engravingName: "Chronometric orbit",
    profile: "Long-form focus, released evenly over four hours",
    notes: "Green tea, yuzu peel, alpine herbs",
    story: [
      "Some achievements arrive in a single moment. Most are assembled hour by hour, long before anyone notices. Verdant Chrona was formulated for that work — the training block, the manuscript, the decade of practice.",
      "Its engraving traces a chronometric orbit: a path that returns to where it began, a little further along each time.",
    ],
    canDescription:
      "Verdant Chrona can in deep green, with the gold crown, the edition name and a chronometric orbit engraving",
  },
  "aurum-cycle": {
    slug: "aurum-cycle",
    numeral: "II",
    name: "Aurum Cycle",
    nameLines: ["Aurum", "Cycle"],
    ref: "351.212",
    formulation: "212",
    honour: "milestone",
    honourLabel: "Milestone",
    honourMeaning: "A moment of arrival",
    dedication: "For the moment it is recognised.",
    lacquerName: "Gold lacquer",
    engravingName: "Astrolabe",
    profile: "Clear onset, then a steady four-hour plateau",
    notes: "Saffron, white peach, honeyed citrus",
    story: [
      "There is a moment when the work is finished and the world finally sees it. A summit reached. A company founded. A title earned. Aurum Cycle exists for that moment, and only that moment.",
      "Its engraving is an astrolabe — the instrument navigators used to confirm, beyond doubt, where they had arrived.",
    ],
    canDescription:
      "Aurum Cycle can in polished gold, with the crown, the edition name and an astrolabe engraving",
  },
  "noir-kinetic": {
    slug: "noir-kinetic",
    numeral: "III",
    name: "Noir Kinetic",
    nameLines: ["Noir", "Kinetic"],
    ref: "351.304",
    formulation: "304",
    honour: "discipline",
    honourLabel: "Discipline",
    honourMeaning: "What you do when no one is watching",
    dedication: "For the hours no one sees.",
    lacquerName: "Black lacquer",
    engravingName: "Compass star",
    profile: "Quiet clarity for early and late hours, without edge",
    notes: "Black cherry, cacao husk, smoked vanilla",
    story: [
      "Discipline happens where no one is watching: the four a.m. start, the repetition nobody applauds. Noir Kinetic was calibrated for those hours — clear, quiet, without edge.",
      "Its engraving is a compass star set against the night: the reference you hold to when there is nothing else to steer by.",
    ],
    canDescription:
      "Noir Kinetic can in black, with the gold crown, the edition name and a compass-star engraving",
  },
};

export const editionList: Edition[] = EDITION_SLUGS.map((slug) => editions[slug]);

export const honourToEdition: Record<Honour, EditionSlug> = {
  effort: "verdant-chrona",
  milestone: "aurum-cycle",
  discipline: "noir-kinetic",
};

export function isEditionSlug(value: unknown): value is EditionSlug {
  return typeof value === "string" && (EDITION_SLUGS as readonly string[]).includes(value);
}

/** The shared calibre — the formula, presented as a movement. */
export const calibre = {
  name: "Calibre CE-351",
  components: [
    {
      part: "Mainspring",
      compound: "Alpine rhodiola",
      text: "An adaptogenic root grown above 3,000 metres. It stores the reserve the other components draw on.",
    },
    {
      part: "Escapement",
      compound: "Siberian ginseng",
      text: "Releases that reserve in measured intervals, so focus arrives evenly rather than all at once.",
    },
    {
      part: "Balance wheel",
      compound: "Mineral balance",
      text: "Sodium, potassium and magnesium calibrated to cellular hydration. It keeps the rate regular.",
    },
    {
      part: "Jewels",
      compound: "Methylated B-complex",
      text: "Reduces friction in energy metabolism, so there is no spike to pay for later.",
    },
  ],
} as const;

/** The Chronicle — 2023 to 2026, from the project report. */
export const chronicle = [
  {
    year: "2023",
    phase: "Genesis",
    title: "The Geneva Protocol",
    text: "Inside a Rolex research initiative in Geneva, biochemists and watchmakers were given a single question: could precision be consumed?",
  },
  {
    year: "2024",
    phase: "Validation",
    title: "Testing the limit",
    text: "Three hundred and fifty-one formulations were engineered, each compound measured to the nanogram. Eight were selected. Trials confirmed four hours of sustained focus.",
  },
  {
    year: "2025",
    phase: "Certification",
    title: "The certification year",
    text: "Three editions were finalised: Verdant Chrona, Aurum Cycle, Noir Kinetic. Each received the Crown Certification — awarded can by can, never by batch.",
  },
  {
    year: "2026",
    phase: "Unveiling",
    title: "The global unveiling",
    text: "Crown Energy was introduced in numbered first editions. Access was not opened to all. It was granted, one achievement at a time.",
  },
] as const;
