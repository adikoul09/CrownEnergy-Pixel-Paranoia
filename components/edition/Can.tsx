"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useMotionValue, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { editions, type Edition, type EditionSlug } from "@/lib/editions";
import { canImages, crownImage } from "@/lib/assets";

/**
 * A Crown Energy can — the project's own render (Assets / Mockup 1).
 *
 * The image is served through next/image (resized, modern formats). Over it, a
 * soft band of light can travel across the lacquer, driven by a 0–1 `specular`
 * value (scroll, pointer or a scripted move); beneath it, a floor shadow.
 * Every can shares one canvas (459 × 1144), so all three stand identically.
 */

type CanProps = {
  edition: Edition | EditionSlug;
  className?: string;
  /** Light band position across the can, roughly −0.4 to 1.3. */
  specular?: MotionValue<number>;
  /** Hide from assistive tech when a parent already names the can. */
  decorative?: boolean;
  /** Show the floor shadow. */
  floor?: boolean;
  /** Responsive `sizes` for the rendered width. */
  sizes?: string;
  /** Preload when the can is the page's largest element (the dossier). */
  preload?: boolean;
  /** `low` where the can supports the page rather than leads it (plates, thumbnails). */
  fetchPriority?: "high" | "low" | "auto";
};

export function Can({
  edition: editionProp,
  className,
  specular,
  decorative = false,
  floor = true,
  sizes = "(max-width: 767px) 40vw, 18rem",
  preload = false,
  fetchPriority,
}: CanProps) {
  const edition = typeof editionProp === "string" ? editions[editionProp] : editionProp;
  const fallback = useMotionValue(-1);
  const sweep = specular ?? fallback;
  // The band is 40% of the can's width; its centre follows the sweep value.
  const bandX = useTransform(sweep, (v) => `${(v - 0.2) * 250}%`);

  return (
    <div className={cn("relative aspect-[459/1144] w-full", className)}>
      {floor ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-[-10%] -bottom-[2.5%] h-[5%] rounded-[50%] bg-[radial-gradient(closest-side,var(--can-floor),transparent)]"
        />
      ) : null}
      <Image
        src={canImages[edition.slug]}
        alt={decorative ? "" : edition.canDescription}
        sizes={sizes}
        preload={preload}
        fetchPriority={fetchPriority}
        draggable={false}
        className="relative block h-full w-full select-none object-contain"
      />
      {/* Light across the lacquer — clipped to the can body, never outside it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: "inset(2.5% 1% 2% 1% round 9% / 3.5%)" }}
      >
        <m.span
          className="absolute inset-y-0 left-0 w-[40%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.16),transparent)]"
          style={{ x: bandX }}
        />
      </span>
    </div>
  );
}

/** The outline of a can, before a crown has been chosen. */
export function CanSilhouette({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[459/1144] w-full items-start justify-center rounded-[14%/5%] border border-gold-hair pt-[18%]",
        className,
      )}
    >
      <Image src={crownImage} alt="" sizes="48px" className="w-[22%] opacity-25 grayscale" draggable={false} />
    </div>
  );
}
