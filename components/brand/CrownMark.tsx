"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";
import { crownImage } from "@/lib/assets";
import { fade, spring } from "@/components/motion/springs";

/**
 * The crown — the project's own render (Assets / Mockup 2), cropped to the mark.
 * Size it by height (e.g. `h-6`); width follows the crown's own proportion.
 */
export function CrownMark({
  className,
  title,
  sizes = "48px",
  animateIn = false,
  delay = 0,
}: {
  className?: string;
  /** Accessible name. Omit when decorative. */
  title?: string;
  sizes?: string;
  /** Arrive once on mount: the crown settles into place as it comes into light. */
  animateIn?: boolean;
  delay?: number;
}) {
  const image = (
    <Image
      src={crownImage}
      alt={title ?? ""}
      sizes={sizes}
      draggable={false}
      className="block h-full w-full select-none object-contain"
    />
  );
  const box = cn("relative block aspect-[532/571] shrink-0", className);

  if (!animateIn) return <span className={box}>{image}</span>;
  return (
    <m.span
      className={box}
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ y: { ...spring.crown, delay }, scale: { ...spring.crown, delay }, opacity: { ...fade, duration: 1.2, delay } }}
    >
      {image}
    </m.span>
  );
}

/** The wordmark typeface (Bodoni Moda, tracked capitals). Reads "Crown Energy" unless given other text. */
export function Wordmark({ className, children = "Crown Energy" }: { className?: string; children?: string }) {
  return <span className={cn("wordmark whitespace-nowrap", className)}>{children}</span>;
}
