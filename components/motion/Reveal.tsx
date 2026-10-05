"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fade, spring } from "./springs";

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Where a masked line waits before it is revealed, as a share of its own height.
 * Cormorant's ascenders and italic swashes rise well above a tight line box
 * (line-height 0.95–1), and the mask reaches 0.18em below the line for
 * descenders, so the line must start clear of both: at 108% the tips of the
 * tallest letters showed through before the reveal. 150% leaves every glyph
 * below the mask's edge.
 */
export const MASK_HIDDEN = "150%";

/** Rises 24px into place as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ y: { ...spring.movement, delay }, opacity: { ...fade, delay } }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline lines unmasked from below, one after another — the way an engraved
 * line catches light as the case turns. Lines are authored, not auto-split,
 * so screen readers hear one continuous sentence.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  animateOnMount = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  // On scroll, the trigger sits on the whole headline, which is always in the
  // layout: the hidden lines themselves are clipped out of sight, so an observer
  // on them would never see them enter the viewport. On mount, each line plays
  // by itself.
  const onScroll = animateOnMount ? {} : { initial: "hidden", whileInView: "shown", viewport };
  const onMount = animateOnMount ? { initial: "hidden", animate: "shown" } : {};
  return (
    <m.span className={cn("block", className)} {...onScroll}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.18em] -mb-[0.18em]", lineClassName)}
        >
          <m.span
            className="block will-change-transform"
            variants={{ hidden: { y: MASK_HIDDEN }, shown: { y: "0%" } }}
            {...onMount}
            transition={{ ...spring.movement, delay: delay + i * stagger }}
          >
            {line}
          </m.span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </m.span>
  );
}

/** A 1px gold rule that draws itself from its origin. */
export function Hairline({
  className,
  origin = "left",
  delay = 0,
  animateOnMount = false,
}: {
  className?: string;
  origin?: "left" | "center" | "right";
  delay?: number;
  animateOnMount?: boolean;
}) {
  const target = { scaleX: 1 };
  return (
    <m.span
      aria-hidden
      className={cn("block h-px w-full bg-gold-hair", className)}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      {...(animateOnMount ? { animate: target } : { whileInView: target, viewport })}
      transition={{ ...spring.crown, delay }}
    />
  );
}
