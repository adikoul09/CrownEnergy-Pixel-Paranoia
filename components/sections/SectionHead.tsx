import { cn } from "@/lib/utils";

/** Chapter mark: a roman numeral, a hairline, a name — the catalogue voice. */
export function SectionHead({
  numeral,
  label,
  className,
  id,
}: {
  numeral: string;
  label: string;
  className?: string;
  id?: string;
}) {
  return (
    <p id={id} className={cn("label flex items-center gap-4 text-gold", className)}>
      <span className="tabular min-w-[1.5em]">{numeral}</span>
      <span aria-hidden className="h-px w-10 bg-gold-hair" />
      <span>{label}</span>
    </p>
  );
}
