"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { FlightProvider } from "@/components/motion/Flight";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <FlightProvider>{children}</FlightProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
