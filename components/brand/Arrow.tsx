import { cn } from "@/lib/utils";

/** Hairline arrow. The shaft extends on hover of the nearest `.group`. */
export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "left" }) {
  return (
    <svg
      viewBox="0 0 32 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
      focusable="false"
      className={cn(
        "h-3 w-8 shrink-0 transition-transform duration-500 ease-[var(--ease-precision)]",
        direction === "right"
          ? "group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
          : "rotate-180 group-hover:-translate-x-1.5 group-focus-visible:-translate-x-1.5",
        className,
      )}
    >
      <path d="M0 6 H31" />
      <path d="M26 1 L31 6 L26 11" />
    </svg>
  );
}
