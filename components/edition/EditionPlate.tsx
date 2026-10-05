"use client";

import Link from "next/link";
import { animate, useMotionValue } from "motion/react";
import { useRef, type MouseEvent } from "react";
import type { Edition } from "@/lib/editions";
import { Arrow } from "@/components/brand/Arrow";
import { useFlight } from "@/components/motion/Flight";
import { ease } from "@/components/motion/springs";
import { cn } from "@/lib/utils";
import { Can } from "./Can";

/**
 * A collectible plate: one edition, framed like a piece in a vitrine.
 * The lacquer gradients and gold corners are the April build's card motifs,
 * kept and refined; the plate carries its own surface tokens (.surface-plate).
 */
export function EditionPlate({ edition, size = "large" }: { edition: Edition; size?: "large" | "small" }) {
  const { launch, flying } = useFlight();
  const canRef = useRef<HTMLDivElement>(null);
  const specular = useMotionValue(-0.4);
  const href = `/editions/${edition.slug}`;

  const catchLight = () => {
    animate(specular, [-0.4, 1.3], { duration: 1.4, ease: ease.precision });
  };
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    launch(edition.slug, canRef.current, href);
  };

  const large = size === "large";

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={catchLight}
      onFocus={catchLight}
      className={cn(
        "surface-plate group relative flex h-full flex-col outline-none",
        `plate-${edition.slug}`,
        large ? "p-8 md:p-10" : "p-6",
      )}
      aria-label={`${edition.name}, reference ${edition.ref}. Honours ${edition.honourLabel.toLowerCase()}. Examine the edition.`}
    >
      <Corners />
      <div className="flex items-baseline justify-between">
        <span className="label tabular text-gold">Ref. {edition.ref}</span>
        <span className="label tabular text-bone-3">{edition.numeral}</span>
      </div>

      <div className={cn("relative mx-auto", large ? "my-12 w-[38%] md:my-14 md:w-[36%]" : "my-8 w-[22%]")}>
        <div
          ref={canRef}
          className={cn(
            "transition-transform duration-700 ease-[var(--ease-precision)] group-hover:-translate-y-2.5 group-focus-visible:-translate-y-2.5",
            flying === edition.slug && "opacity-0",
          )}
        >
          <Can
            edition={edition}
            specular={specular}
            decorative
            fetchPriority="low"
            sizes={large ? "(max-width: 767px) 38vw, 10rem" : "(max-width: 767px) 22vw, 6rem"}
          />
        </div>
      </div>

      <div className="mt-auto">
        <h2 className={cn("text-bone", large ? "text-display-m" : "text-title")}>{edition.name}</h2>
        <p className="label mt-3 text-bone-3">Honours {edition.honourLabel}</p>
        {large ? <p className="mt-6 font-display text-title italic text-bone-2">{edition.dedication}</p> : null}
        <p className="label mt-8 flex items-center gap-4 text-bone transition-colors duration-500 group-hover:text-gold-hi group-focus-visible:text-gold-hi">
          Examine
          <Arrow />
        </p>
      </div>
    </Link>
  );
}

function Corners() {
  const base =
    "pointer-events-none absolute size-5 border-gold transition-[width,height,border-color] duration-700 ease-[var(--ease-precision)] group-hover:size-9 group-focus-visible:size-9 group-focus-visible:border-gold-hi";
  return (
    <span aria-hidden>
      <span className={cn(base, "top-3 left-3 border-t border-l")} />
      <span className={cn(base, "top-3 right-3 border-t border-r")} />
      <span className={cn(base, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(base, "right-3 bottom-3 border-r border-b")} />
    </span>
  );
}
