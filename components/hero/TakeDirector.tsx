"use client";

import * as m from "motion/react-m";
import { animate, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import type { EditionSlug } from "@/lib/editions";
import { fade } from "@/components/motion/springs";
import { Unveiling } from "./Unveiling";

/**
 * Recording mode. Plays The Unveiling as one scripted take — the camera never
 * cuts — and ends by carrying Noir Kinetic into its dossier.
 *
 *   0.0s   operator presses any key (or ?delay=N elapses) against black
 *   0.0s   arrival: floor line, crown engraves, headline unmasks; nav settles at 2.4s
 *   3.4s   dolly, one budget per beat (14s):
 *            Prestige withdraws   p 0 → .22    2.5s
 *            Power                p .22 → .52  4.5s
 *            Curiosity            p .52 → .76  4.5s
 *            Selection            p .76 → .90  2.5s
 *  17.4s   hold on the vitrine
 *  18.4s   attention rests on Verdant, Aurum, then Noir
 *  21.8s   Noir is selected; the can flies into /editions/noir-kinetic
 *  ~25s    the dossier finishes revealing — cut here
 */
const SCRIPT = {
  arrival: 3400,
  dolly: {
    duration: 14,
    keyframes: [0, 0.22, 0.52, 0.76, 0.9],
    times: [0, 2.5 / 14, 7 / 14, 11.5 / 14, 1],
    ease: ["easeIn", "linear", "linear", "easeOut"] as const,
  },
  hold: 1000,
  rests: [
    ["verdant-chrona", 1000],
    ["aurum-cycle", 1000],
    ["noir-kinetic", 1400],
  ] as [EditionSlug, number][],
  select: "noir-kinetic" as EditionSlug,
};

export function TakeDirector({ autoDelay }: { autoDelay: number | null }) {
  const progress = useMotionValue(0);
  const [started, setStarted] = useState(false);
  const [focusSlug, setFocusSlug] = useState<EditionSlug | null>(null);
  const [selectSlug, setSelectSlug] = useState<EditionSlug | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.take = started ? "rolling" : "waiting";
    return () => {
      delete root.dataset.take;
    };
  }, [started]);

  useEffect(() => {
    if (started) return;
    const begin = () => setStarted(true);
    window.addEventListener("keydown", begin, { once: true });
    window.addEventListener("pointerdown", begin, { once: true });
    const timer = autoDelay !== null ? window.setTimeout(begin, autoDelay * 1000) : undefined;
    return () => {
      window.removeEventListener("keydown", begin);
      window.removeEventListener("pointerdown", begin);
      if (timer) window.clearTimeout(timer);
    };
  }, [started, autoDelay]);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
    (async () => {
      await wait(SCRIPT.arrival);
      if (cancelled) return;
      const { keyframes, duration, times, ease: segments } = SCRIPT.dolly;
      await animate(progress, keyframes, { duration, times, ease: [...segments] });
      await wait(SCRIPT.hold);
      for (const [slug, ms] of SCRIPT.rests) {
        if (cancelled) return;
        setFocusSlug(slug);
        await wait(ms);
      }
      if (!cancelled) setSelectSlug(SCRIPT.select);
    })();
    return () => {
      cancelled = true;
    };
  }, [started, progress]);

  return (
    <>
      {autoDelay === null ? (
        <m.p
          aria-live="polite"
          className="label pointer-events-none fixed inset-x-0 bottom-10 z-50 text-center text-bone-3"
          initial={{ opacity: 1 }}
          animate={{ opacity: started ? 0 : 1 }}
          transition={{ ...fade, duration: 0.4 }}
        >
          Press any key to begin the take
        </m.p>
      ) : null}
      <Unveiling progress={progress} started={started} focusSlug={focusSlug} selectSlug={selectSlug} />
    </>
  );
}
