"use client";

import * as m from "motion/react-m";
import {
  animate,
  cubicBezier,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ease } from "@/components/motion/springs";

const settle = cubicBezier(...ease.precision);
const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/**
 * A reference number that rolls into place like a date wheel: every digit
 * turns through a full revolution, staggered left to right, and stops dead.
 */
export function RefNumber({
  value,
  progress,
  className,
  prefix = "Ref.",
  delay = 0,
}: {
  value: string;
  /** Drive the roll externally (0–1). Otherwise it rolls once on view. */
  progress?: MotionValue<number>;
  className?: string;
  prefix?: string;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const internal = useMotionValue(progress ? 1 : 0);
  const p = progress ?? internal;

  useEffect(() => {
    if (progress) return;
    if (reduce) {
      internal.set(1);
      return;
    }
    if (!inView) return;
    const c = animate(internal, 1, { duration: 1.8, ease: ease.precision, delay });
    return () => c.stop();
  }, [progress, reduce, inView, internal, delay]);

  const chars = value.split("");
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn("tabular inline-flex items-start gap-[0.5em] align-top leading-[1.2em]", className)}>
      <span className="sr-only">{`${prefix} ${value}`.trim()}</span>
      {prefix ? (
        <span aria-hidden className="block h-[1.2em]">
          {prefix}
        </span>
      ) : null}
      <span aria-hidden className="inline-flex items-start">
        {chars.map((ch, i) => {
          if (!/\d/.test(ch))
            return (
              <span key={i} className="block h-[1.2em]">
                {ch}
              </span>
            );
          const index = digitIndex++;
          return <Wheel key={i} digit={Number(ch)} progress={p} index={index} count={digitCount} />;
        })}
      </span>
    </span>
  );
}

function Wheel({
  digit,
  progress,
  index,
  count,
}: {
  digit: number;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const start = (index / count) * 0.35;
  const y = useTransform(progress, [start, start + 0.65], ["0em", `${-(10 + digit) * 1.2}em`], {
    ease: settle,
  });
  return (
    <span className="relative block h-[1.2em] overflow-hidden">
      <span className="invisible">{digit}</span>
      <m.span className="absolute inset-x-0 top-0 flex flex-col" style={{ y }}>
        {DIGITS.map((d, i) => (
          <span key={i} className="block h-[1.2em]">
            {d}
          </span>
        ))}
      </m.span>
    </span>
  );
}
