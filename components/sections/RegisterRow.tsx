"use client";

import * as m from "motion/react-m";
import { useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import type { RegisterEntry } from "@/lib/register";
import { cn } from "@/lib/utils";
import { ease, spring } from "@/components/motion/springs";

/**
 * One line of the Register. The achievement is a disclosure: hover (mouse) or
 * keyboard focus lets one line of its story surface beneath it; a tap, click or
 * Enter keeps it there; Escape puts it away. On desktop the story's line is
 * reserved, so a passing pointer never moves another row; on touch, the row
 * opens to make room only when tapped.
 */
export function RegisterRow({
  entry,
  honour,
  edition,
}: {
  entry: RegisterEntry;
  honour: string;
  edition: string;
}) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const open = pinned || hovered || focused;
  const storyId = `register-story-${entry.no}`;

  // Touch never "hovers": only a real mouse pointer peeks.
  const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && setHovered(true);
  const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && setHovered(false);
  // Peek on keyboard focus only; a mouse click focuses too, but pins instead.
  const onFocus = (e: FocusEvent<HTMLButtonElement>) => setFocused(e.currentTarget.matches(":focus-visible"));
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "Escape" || !open) return;
    e.preventDefault();
    setPinned(false);
    setFocused(false);
    setHovered(false);
  };

  return (
    <div
      role="row"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-b border-gold-faint py-7 md:grid-cols-[6rem_9rem_1fr_11rem_8rem] md:items-baseline md:gap-8"
    >
      <span role="cell" className="label tabular text-gold">
        <span className="md:hidden">No. </span>
        {entry.no}
      </span>
      <span role="cell" className="label text-bone-3 md:text-bone-2">
        {honour}
      </span>

      <div role="cell" className="col-span-2 md:col-span-1">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={storyId}
          onClick={() => setPinned((p) => !p)}
          onFocus={onFocus}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          className="group flex w-full cursor-pointer items-baseline justify-between gap-6 text-left font-display text-title text-bone"
        >
          <span>{entry.achievement}</span>
          <Disclosure open={open} />
        </button>

        {/* Desktop reserves the story's line (hover must never move rows under the pointer).
            Touch opens on a deliberate tap, so there the row grows to make room instead. */}
        <div
          data-register-story
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-precision)] md:grid-rows-[1fr]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden md:overflow-visible">
            <m.p
              id={storyId}
              className="mt-3 flex items-baseline gap-4 text-body text-bone-2"
              initial={false}
              animate={open ? "shown" : "hidden"}
              variants={{
                shown: { opacity: 1, y: 0, visibility: "visible" },
                hidden: { opacity: 0, y: 6, transitionEnd: { visibility: "hidden" } },
              }}
              transition={
                open
                  ? { y: { ...spring.bezel, delay: 0.08 }, opacity: { duration: 0.45, ease: ease.precision, delay: 0.08 } }
                  : { y: { duration: 0.2 }, opacity: { duration: 0.2, ease: "linear" } }
              }
              style={{ visibility: "hidden", opacity: 0 }}
            >
              {/* The line is drawn first, then the words arrive. */}
              <m.span
                aria-hidden
                className="block h-px w-6 shrink-0 translate-y-[-0.3em] bg-gold-hair"
                style={{ transformOrigin: "left" }}
                initial={false}
                animate={{ scaleX: open ? 1 : 0 }}
                transition={open ? spring.bezel : { duration: 0.2 }}
              />
              <span>{entry.story}</span>
            </m.p>
          </div>
        </div>
      </div>

      <span role="cell" className="text-body text-bone-2">
        {edition}
      </span>
      <span role="cell" className="label text-bone-3 md:text-right">
        {entry.city}
      </span>
    </div>
  );
}

/** A hairline plus that settles into a minus when the story is open. */
function Disclosure({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative top-[-0.15em] block size-2.5 shrink-0 text-bone-3 transition-colors duration-500 group-hover:text-gold-hi group-focus-visible:text-gold-hi"
    >
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
      <span
        className={cn(
          "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[var(--ease-precision)]",
          open ? "scale-y-0" : "scale-y-100",
        )}
      />
    </span>
  );
}
