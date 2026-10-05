"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Hydration-safe reduced-motion preference. Returns `false` on the server and
 * during hydration, then the real value — so server and client trees match.
 *
 * Use this only where the *structure* differs (the pinned hero vs its still),
 * or for imperative behaviour (skipping the can flight, smooth scrolling).
 * Spatial motion is already handled globally by <MotionConfig reducedMotion="user">,
 * which makes every transform instant while keeping opacity crossfades.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
