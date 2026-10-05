import { z } from "zod";
import { EDITION_SIZE, EDITION_SLUGS, HONOURS, editions, type EditionSlug, type Honour } from "./editions";

/**
 * Allocation requests — validation, numbering, and the persistence seam.
 * Shared by the client flow (per-step validation) and the server action.
 */

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const allocationSchema = z.object({
  honour: z.enum(HONOURS, "Choose what you are marking."),
  edition: z.enum(EDITION_SLUGS, "Choose an edition."),
  achievement: z
    .string()
    .trim()
    .min(12, "Describe it in a full sentence — at least 12 characters.")
    .max(280, "Keep it to a single sentence — 280 characters at most."),
  achievedOn: z
    .string()
    .regex(isoDate, "Enter the date it was achieved.")
    .refine((d) => d <= new Date().toISOString().slice(0, 10), "The date cannot be in the future."),
  name: z.string().trim().min(2, "Enter the name for the certificate.").max(80, "80 characters at most."),
  email: z.email("Enter a valid email address."),
});

export type AllocationInput = z.input<typeof allocationSchema>;
export type AllocationField = keyof AllocationInput;
export type FieldErrors = Partial<Record<AllocationField, string>>;

export const steps = [
  { title: "What are you marking?", short: "The honour", fields: ["honour", "edition"] },
  { title: "Describe the achievement.", short: "The achievement", fields: ["achievement", "achievedOn"] },
  { title: "In whose name shall it be recorded?", short: "The name", fields: ["name", "email"] },
] as const satisfies { title: string; short: string; fields: AllocationField[] }[];

/** Validate only the fields on one step. */
export function validateStep(index: number, values: Partial<AllocationInput>): FieldErrors {
  const fields = steps[index].fields as readonly AllocationField[];
  const mask = Object.fromEntries(fields.map((f) => [f, true])) as Record<AllocationField, true>;
  const result = allocationSchema.pick(mask).safeParse(values);
  return result.success ? {} : toFieldErrors(result.error);
}

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as AllocationField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export interface Certificate {
  allocationNo: string;
  edition: EditionSlug;
  ref: string;
  honour: Honour;
  name: string;
  achievement: string;
  achievedOn: string;
  issuedOn: string;
}

/**
 * The allocation number is deterministic — the same person requesting the
 * same edition is always given the same place. No counters, no invented scarcity.
 */
export function allocationNumber(email: string, edition: EditionSlug) {
  let h = 0x811c9dc5;
  for (const ch of `${email.trim().toLowerCase()}|${edition}`) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return String((h % EDITION_SIZE) + 1).padStart(4, "0");
}

export function issueCertificate(data: z.output<typeof allocationSchema>): Certificate {
  return {
    allocationNo: allocationNumber(data.email, data.edition),
    edition: data.edition,
    ref: editions[data.edition].ref,
    honour: data.honour,
    name: data.name,
    achievement: data.achievement,
    achievedOn: data.achievedOn,
    issuedOn: new Date().toISOString().slice(0, 10),
  };
}

/**
 * Persistence seam. Intentionally a no-op in this concept build: nothing is
 * stored and nothing is sent. Replace with a database write (and a mailer)
 * before using this anywhere real.
 */
export async function store(certificate: Certificate): Promise<void> {
  void certificate;
}
