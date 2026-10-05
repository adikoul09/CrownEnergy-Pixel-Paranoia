"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import type { Person } from "@/lib/people";
import { cn } from "@/lib/utils";
import { fade, spring } from "@/components/motion/springs";

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * The founder, set as the April build set him: the archival photograph whole and
 * in landscape, a gold hairline frame, the caption laid into its lower edge over
 * a soft shade, and two gold brackets standing off the frame (top right, bottom
 * left). The photograph eases in from 106% as it enters; the brackets settle
 * after it. Under reduced motion only the fades remain.
 */
export function FounderPortrait({ person, className }: { person: Person; className?: string }) {
  return (
    <m.figure
      className={cn("relative px-6 md:px-12", className)}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
    >
      <Bracket className="-top-3 right-0 border-t border-r md:-top-5 md:-right-5" from={{ x: 10, y: -10 }} />
      <Bracket className="-bottom-3 left-0 border-b border-l md:-bottom-5 md:-left-5" from={{ x: -10, y: 10 }} />

      <div className="relative overflow-hidden">
        <m.div
          variants={{ hidden: { opacity: 0, scale: 1.06 }, shown: { opacity: 1, scale: 1 } }}
          transition={{ scale: spring.crown, opacity: { ...fade, duration: 1.2 } }}
        >
          <Image
            src={person.image}
            alt={person.alt}
            sizes="(max-width: 767px) 80vw, 27rem"
            placeholder="blur"
            className="block h-auto w-full"
          />
        </m.div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(8_7_4/0.7)_100%)]"
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 border border-gold-hair" />
        {/* The shade beneath is always dark, whatever surface the section sits on. */}
        <figcaption className="surface-ink absolute bottom-5 left-5 md:bottom-6 md:left-6">
          <span className="block font-display text-[1.375rem] leading-tight italic text-bone">{person.name}</span>
          <span className="label mt-1.5 block text-gold-hi">{person.field}</span>
        </figcaption>
      </div>
    </m.figure>
  );
}

function Bracket({ className, from }: { className: string; from: { x: number; y: number } }) {
  return (
    <m.span
      aria-hidden
      className={cn("pointer-events-none absolute size-14 border-gold-hair md:size-20", className)}
      variants={{ hidden: { opacity: 0, ...from }, shown: { opacity: 1, x: 0, y: 0 } }}
      transition={{ x: { ...spring.movement, delay: 0.4 }, y: { ...spring.movement, delay: 0.4 }, opacity: { ...fade, delay: 0.4 } }}
    />
  );
}
