import type { Metadata } from "next";
import { AllocationFlow } from "@/components/allocation/AllocationFlow";
import { isEditionSlug } from "@/lib/editions";

export const metadata: Metadata = {
  title: "Request an Allocation",
  description: "Allocations are granted against achievements, not orders.",
};

export default async function AllocationPage({ searchParams }: PageProps<"/allocation">) {
  const { edition } = await searchParams;
  const preselected = isEditionSlug(edition) ? edition : null;
  const today = new Date().toISOString().slice(0, 10);
  return <AllocationFlow preselected={preselected} today={today} />;
}
