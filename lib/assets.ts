import type { StaticImageData } from "next/image";
import type { EditionSlug } from "./editions";

import verdantCan from "@/assets/cans/verdant-chrona.png";
import aurumCan from "@/assets/cans/aurum-cycle.png";
import noirCan from "@/assets/cans/noir-kinetic.png";
import crown from "@/assets/brand/crown.png";

/**
 * The cans and crown — the project's own renders (Assets / Mockup 1 and 2).
 * Imported by client components, so it holds nothing else; the photographs
 * live in `lib/people.ts`, used only on the server.
 *
 * The can renders are cropped to a shared 459 × 1144 canvas, bottom-aligned, so
 * all three stand identically on a line; the crown is cropped to its mark.
 * Nothing else is altered.
 */

export const canImages: Record<EditionSlug, StaticImageData> = {
  "verdant-chrona": verdantCan,
  "aurum-cycle": aurumCan,
  "noir-kinetic": noirCan,
};

/** Width ÷ height of every can image. */
export const CAN_ASPECT = 459 / 1144;

export const crownImage = crown;
export const CROWN_ASPECT = 532 / 571;
