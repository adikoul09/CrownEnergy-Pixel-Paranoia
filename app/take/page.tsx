import type { Metadata } from "next";
import { TakeDirector } from "@/components/hero/TakeDirector";

export const metadata: Metadata = {
  title: "The Unveiling — recording take",
  robots: { index: false },
};

/** /take — plays The Unveiling as a single scripted take for screen recording. */
export default async function TakePage({ searchParams }: PageProps<"/take">) {
  const { delay } = await searchParams;
  const parsed = typeof delay === "string" ? Number.parseFloat(delay) : NaN;
  const autoDelay = Number.isFinite(parsed) && parsed >= 0 ? Math.min(parsed, 30) : null;
  return <TakeDirector autoDelay={autoDelay} />;
}
