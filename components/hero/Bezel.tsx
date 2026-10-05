"use client";

import * as m from "motion/react-m";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const C = 200;
// Rounded so server (Node) and browser trigonometry serialise identically.
const r2 = (n: number) => Math.round(n * 100) / 100;
const marks = Array.from({ length: 60 }, (_, i) => {
  const a = (i * 6 * Math.PI) / 180;
  const hour = i % 5 === 0;
  const r1 = hour ? 176 : 184;
  const rOuter = 192;
  const at = (r: number, off = 0) => [
    r2(C + r * Math.sin(a) + off * Math.cos(a)),
    r2(C - r * Math.cos(a) + off * Math.sin(a)),
  ];
  if (i === 0) {
    // Twelve o'clock: the doubled index, echoing the mark.
    return [-2.6, 2.6].map((o) => {
      const [x1, y1] = at(170, o);
      const [x2, y2] = at(rOuter, o);
      return { x1, y1, x2, y2, w: 1.6 };
    });
  }
  const [x1, y1] = at(r1);
  const [x2, y2] = at(rOuter);
  return [{ x1, y1, x2, y2, w: hour ? 1.4 : 0.7 }];
}).flat();

/**
 * A 60-minute bezel. It turns with scroll, but in 6° clicks — ratcheted like a
 * diver's bezel — so the movement reads as mechanism, never as decoration.
 */
export function Bezel({ rotate, className }: { rotate?: MotionValue<number>; className?: string }) {
  return (
    <m.svg
      viewBox="0 0 400 400"
      aria-hidden
      focusable="false"
      className={cn("block h-full w-full text-gold", className)}
      style={{ rotate }}
    >
      <circle cx={C} cy={C} r={196} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.6} />
      <circle cx={C} cy={C} r={168} fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.6} />
      {marks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="currentColor"
          strokeOpacity={t.w > 1 ? 0.7 : 0.4}
          strokeWidth={t.w}
        />
      ))}
    </m.svg>
  );
}
