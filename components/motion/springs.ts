import type { Transition } from "motion/react";

/**
 * Crown Energy motion tokens.
 *
 * Every spring is critically damped or overdamped: ζ = damping / (2·√(stiffness·mass)) ≥ 1.
 * Nothing overshoots, nothing bounces. A Rolex hand arrives; it does not wobble.
 * Settle times are measured to the 2% band (DESIGN.md §5).
 */
export const spring = {
  /** Reveals and entrances. ζ = 1.20, settles in 0.94s. */
  movement: { type: "spring", stiffness: 70, damping: 20, mass: 1 },
  /** UI state, hover, focus. ζ = 1.05, settles in 0.40s. */
  bezel: { type: "spring", stiffness: 260, damping: 34, mass: 1 },
  /** Hero choreography and the cross-route can flight. ζ = 1.15, settles in 1.30s. */
  crown: { type: "spring", stiffness: 40, damping: 16, mass: 1.2 },
} as const satisfies Record<string, Transition>;

/** Spring options for useSpring (no `type` key). */
export const springValue = {
  /** Smooths raw scroll progress into inertia. ζ = 1.37, settles in 0.87s. */
  scroll: { stiffness: 120, damping: 30, mass: 1 },
  /** Bezel ratchet: each 6° click lands crisply. ζ = 1.06, settles in 0.35s. */
  ratchet: { stiffness: 340, damping: 39, mass: 1 },
} as const;

export const ease = {
  /** Long, decelerating — the sweep of a seconds hand coming to rest. */
  precision: [0.22, 1, 0.36, 1],
} as const;

/** Opacity is tweened, never sprung: light does not have mass. */
export const fade: Transition = { duration: 0.9, ease: ease.precision };

/*
 * Reduced motion is handled once, globally: <MotionConfig reducedMotion="user">
 * makes every transform instant and keeps opacity. Components do not branch.
 */
