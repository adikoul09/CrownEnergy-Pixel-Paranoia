"use server";

import {
  allocationSchema,
  issueCertificate,
  store,
  toFieldErrors,
  type AllocationInput,
  type Certificate,
  type FieldErrors,
} from "@/lib/allocation";

export type AllocationState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors }
  | { status: "granted"; certificate: Certificate };

export async function requestAllocation(
  _previous: AllocationState,
  input: AllocationInput,
): Promise<AllocationState> {
  const parsed = allocationSchema.safeParse(input);
  if (!parsed.success) return { status: "error", errors: toFieldErrors(parsed.error) };

  const certificate = issueCertificate(parsed.data);
  await store(certificate);
  return { status: "granted", certificate };
}
