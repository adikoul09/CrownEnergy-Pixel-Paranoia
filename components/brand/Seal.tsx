"use client";

import * as m from "motion/react-m";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { fade, spring } from "@/components/motion/springs";
import { getImageProps } from "next/image";
import { CROWN_ASPECT, crownImage } from "@/lib/assets";

const C = 120;
// The crown at the seal's heart: the project's own render, through the image optimiser.
const CROWN_H = 46;
const CROWN_W = CROWN_H * CROWN_ASPECT;
const crownSrc = getImageProps({ src: crownImage, alt: "", width: 96, height: Math.round(96 / CROWN_ASPECT) }).props.src;
const TEXT_R = 97;
const RING_TEXT = "Crown Certified · Geneva · MMXXVI · Precision, consumed · ";

// Rounded so server (Node) and browser trigonometry serialise identically.
const r2 = (n: number) => Math.round(n * 100) / 100;
const ticks = Array.from({ length: 60 }, (_, i) => {
  const a = (i * 6 * Math.PI) / 180;
  const long = i % 5 === 0;
  const r1 = long ? 77 : 80;
  const rOuter = 84;
  return {
    x1: r2(C + r1 * Math.sin(a)),
    y1: r2(C - r1 * Math.cos(a)),
    x2: r2(C + rOuter * Math.sin(a)),
    y2: r2(C - rOuter * Math.cos(a)),
    long,
  };
});

/**
 * The Crown Certification seal. Original artwork: a minute track, a ring of
 * engraved text and the crown, with the edition's reference at its heart.
 *
 * Two finishes. `hairline` (default) for the catalogue. `engraved` for the
 * certificate: heavier cuts, a weightier reference, and — on screen only — a
 * blind-pressed disc and a cut edge (dark lip above, catch-light below).
 */
const FINISH = {
  hairline: { rim: 1, minor: 0.5, major: 1, inner: 0.75, ringWeight: 500, ringSize: 10.5, refSize: 13, refWeight: 400, refTrack: 2.4, certSize: 8 },
  engraved: { rim: 1.6, minor: 0.8, major: 1.5, inner: 1.1, ringWeight: 600, ringSize: 11, refSize: 16, refWeight: 600, refTrack: 2.8, certSize: 8.5 },
} as const;
export function Seal({
  refNumber,
  className,
  mode = "reveal",
  label,
  delay = 0,
  finish = "hairline",
}: {
  refNumber?: string;
  className?: string;
  /** reveal: ring turns into place on view. stamp: pressed once on mount. */
  mode?: "reveal" | "stamp" | "static";
  label?: string;
  delay?: number;
  finish?: keyof typeof FINISH;
}) {
  const w = FINISH[finish];
  const engraved = finish === "engraved";
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const pathId = `seal-ring-${uid}`;
  const pressId = `seal-press-${uid}`;
  const circumference = 2 * Math.PI * TEXT_R;

  const ring =
    mode === "static"
      ? {}
      : mode === "stamp"
        ? {
            initial: { rotate: -18, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            transition: { rotate: { ...spring.crown, delay }, opacity: { ...fade, delay } },
          }
        : {
            initial: { rotate: -30, opacity: 0 },
            whileInView: { rotate: 0, opacity: 1 },
            viewport: { once: true, margin: "-10%" },
            transition: { rotate: spring.crown, opacity: fade },
          };

  const press =
    mode === "stamp"
      ? {
          initial: { scale: 1.14, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { scale: { ...spring.bezel, delay }, opacity: { duration: 0.35, delay } },
        }
      : {};

  return (
    <m.svg
      viewBox="0 0 240 240"
      fill="none"
      className={cn("block text-gold", engraved && "seal-engraved", className)}
      role="img"
      aria-label={label ?? `Crown Certification seal${refNumber ? `, reference ${refNumber}` : ""}`}
      data-print-gold
      {...press}
    >
      {engraved ? (
        // The blind press: the paper sinks very slightly where the die met it. Screen only.
        <g data-print-hide>
          <defs>
            <radialGradient id={pressId} cx="50%" cy="46%" r="52%">
              <stop offset="0" stopColor="#000" stopOpacity="0.32" />
              <stop offset="0.82" stopColor="#000" stopOpacity="0.18" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={C} cy={C} r={119} fill={`url(#${pressId})`} />
          <path d={`M ${C - 117} ${C + 4} A 117 117 0 0 0 ${C + 117} ${C + 4}`} stroke="#fff4d6" strokeOpacity={0.07} strokeWidth={1} />
        </g>
      ) : null}
      <circle cx={C} cy={C} r={116} stroke="currentColor" strokeWidth={w.rim} />
      {/* The one laurel line on the seal — a nod to the green certification tag, nothing more. */}
      <circle cx={C} cy={C} r={111} stroke="var(--color-laurel)" strokeWidth={0.75} />
      <m.g style={{ originX: "50%", originY: "50%" }} {...ring}>
        <path
          id={pathId}
          d={`M ${C - TEXT_R},${C} a ${TEXT_R},${TEXT_R} 0 1,1 ${TEXT_R * 2},0 a ${TEXT_R},${TEXT_R} 0 1,1 -${TEXT_R * 2},0`}
          stroke="none"
        />
        <text
          fill="currentColor"
          fontSize={w.ringSize}
          fontWeight={w.ringWeight}
          letterSpacing={2}
          style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}
        >
          <textPath href={`#${pathId}`} textLength={circumference - 6} lengthAdjust="spacing">
            {RING_TEXT.toUpperCase()}
          </textPath>
        </text>
      </m.g>
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="currentColor"
          strokeWidth={t.long ? w.major : w.minor}
        />
      ))}
      <circle cx={C} cy={C} r={72} stroke="currentColor" strokeWidth={w.inner} opacity={engraved ? 0.85 : 0.7} />
      <image
        href={crownSrc}
        x={C - CROWN_W / 2}
        y={C - 49}
        width={CROWN_W}
        height={CROWN_H}
        preserveAspectRatio="xMidYMid meet"
      />
      {refNumber ? (
        <text
          x={C}
          y={C + 30}
          textAnchor="middle"
          fill="currentColor"
          fontSize={w.refSize}
          fontWeight={w.refWeight}
          letterSpacing={w.refTrack}
          style={{ fontFamily: "var(--font-sans)", fontVariantNumeric: "tabular-nums" }}
        >
          {refNumber}
        </text>
      ) : null}
      <text
        x={C}
        y={C + (refNumber ? (engraved ? 48 : 46) : 34)}
        textAnchor="middle"
        fill="currentColor"
        fontSize={w.certSize}
        letterSpacing={2.6}
        opacity={0.8}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        CERTIFIED
      </text>
    </m.svg>
  );
}
