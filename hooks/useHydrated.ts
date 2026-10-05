"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `false` on the server and during hydration, `true` immediately after. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
