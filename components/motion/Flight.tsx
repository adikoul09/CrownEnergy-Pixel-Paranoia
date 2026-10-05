"use client";

import * as m from "motion/react-m";
import { animate, useMotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { EditionSlug } from "@/lib/editions";
import { Can } from "@/components/edition/Can";
import { cn } from "@/lib/utils";
import { ease, spring } from "./springs";

/**
 * Cross-route can flight.
 *
 * App Router swaps pages instantly, which would cut the take. Instead, the
 * chosen can is lifted into a fixed overlay at its exact on-screen rect, the
 * route changes underneath it, and the overlay springs to wherever the next
 * page's <CanLanding> sits. When it lands, the landing can takes over in the
 * same frame. One object, one continuous movement, no cut.
 */

type Rect = { left: number; top: number; width: number; height: number };
type FlightState = { slug: EditionSlug; from: Rect; id: number };

type FlightApi = {
  flying: EditionSlug | null;
  launch: (slug: EditionSlug, source: Element | null, href: string) => void;
  registerLanding: (slug: EditionSlug, el: HTMLElement | null) => void;
};

const FlightContext = createContext<FlightApi | null>(null);

export function useFlight() {
  const ctx = useContext(FlightContext);
  if (!ctx) throw new Error("useFlight must be used inside <FlightProvider>");
  return ctx;
}

export function FlightProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const [flight, setFlight] = useState<FlightState | null>(null);
  const landings = useRef(new Map<EditionSlug, HTMLElement>());
  const [landingVersion, setLandingVersion] = useState(0);

  const launch = useCallback<FlightApi["launch"]>(
    (slug, source, href) => {
      if (!reduce && source) {
        const r = source.getBoundingClientRect();
        setFlight({ slug, from: { left: r.left, top: r.top, width: r.width, height: r.height }, id: Date.now() });
      }
      router.push(href);
    },
    [reduce, router],
  );

  const registerLanding = useCallback<FlightApi["registerLanding"]>((slug, el) => {
    if (el) landings.current.set(slug, el);
    else landings.current.delete(slug);
    setLandingVersion((v) => v + 1);
  }, []);

  const land = useCallback(() => setFlight(null), []);
  const getTarget = useCallback((slug: EditionSlug) => landings.current.get(slug) ?? null, []);

  const api = useMemo(
    () => ({ flying: flight?.slug ?? null, launch, registerLanding }),
    [flight?.slug, launch, registerLanding],
  );

  return (
    <FlightContext.Provider value={api}>
      {children}
      {flight ? (
        <FlightCan
          key={flight.id}
          flight={flight}
          getTarget={getTarget}
          landingVersion={landingVersion}
          onLand={land}
        />
      ) : null}
    </FlightContext.Provider>
  );
}

function FlightCan({
  flight,
  getTarget,
  landingVersion,
  onLand,
}: {
  flight: FlightState;
  getTarget: (slug: EditionSlug) => HTMLElement | null;
  landingVersion: number;
  onLand: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const specular = useMotionValue(-0.4);
  const started = useRef(false);
  const frames = useRef<number[]>([]);

  useEffect(() => {
    if (started.current) return;
    const target = getTarget(flight.slug);
    if (!target) return;
    started.current = true;
    // Two frames: let the new route paint and reset its scroll before measuring.
    frames.current.push(
      requestAnimationFrame(() => {
        frames.current.push(
          requestAnimationFrame(() => {
            const to = target.getBoundingClientRect();
            Promise.all([
              animate(x, to.left - flight.from.left, spring.crown),
              animate(y, to.top - flight.from.top, spring.crown),
              animate(scale, to.width / flight.from.width, spring.crown),
              animate(specular, 1.35, { duration: 1.6, ease: ease.precision }),
            ]).then(onLand);
          }),
        );
      }),
    );
  }, [landingVersion, flight, getTarget, onLand, x, y, scale, specular]);

  useEffect(() => {
    const ids = frames.current;
    // If the destination never mounts a landing, dissolve rather than hang.
    const timeout = window.setTimeout(() => {
      if (!started.current) animate(opacity, 0, { duration: 0.4 }).then(onLand);
    }, 3000);
    return () => {
      window.clearTimeout(timeout);
      ids.forEach(cancelAnimationFrame);
    };
  }, [onLand, opacity]);

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed z-30"
      style={{
        left: flight.from.left,
        top: flight.from.top,
        width: flight.from.width,
        height: flight.from.height,
        x,
        y,
        scale,
        opacity,
        originX: 0,
        originY: 0,
      }}
    >
      <Can edition={flight.slug} specular={specular} decorative sizes="(max-width: 767px) 46vw, 17rem" />
    </m.div>
  );
}

/**
 * Where a flying can comes to rest. Invisible while the flight is airborne;
 * takes over in the frame the overlay lands. Preloaded: on a dossier it is
 * the largest element on the page.
 */
export function CanLanding({
  slug,
  className,
}: {
  slug: EditionSlug;
  className?: string;
}) {
  const { flying, registerLanding } = useFlight();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerLanding(slug, ref.current);
    return () => registerLanding(slug, null);
  }, [slug, registerLanding]);

  return (
    <div ref={ref} className={cn(flying === slug && "opacity-0", className)}>
      <Can edition={slug} preload sizes="(max-width: 767px) 46vw, 17rem" />
    </div>
  );
}
