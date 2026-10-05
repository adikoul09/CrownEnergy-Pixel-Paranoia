"use client";

import * as m from "motion/react-m";
import {
  animate,
  cubicBezier,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHydrated } from "@/hooks/useHydrated";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { editions, type EditionSlug } from "@/lib/editions";
import { Can } from "@/components/edition/Can";
import { RefNumber } from "@/components/edition/RefNumber";
import { CrownMark } from "@/components/brand/CrownMark";
import { useFlight } from "@/components/motion/Flight";
import { ease, fade, spring, springValue } from "@/components/motion/springs";
import { MASK_HIDDEN } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Bezel } from "./Bezel";

/**
 * THE UNVEILING — one continuous take, from first impression to selection.
 *
 *   Arrival    (time)      Black. The floor line draws; the crown comes into light; the line is spoken.
 *   Prestige   p 0 → .22   The headline holds, then withdraws upward.
 *   Power      p .18 → .52 Noir Kinetic rises out of the vault floor. The bezel ratchets. Light crosses the lacquer.
 *   Curiosity  p .46 → .74 Two more crowns rise beside it. 351 · Eight · Three.
 *   Selection  p .72 → 1   Reference numbers roll home. The vitrine becomes a selector.
 *
 * One MotionValue (`progress`) drives every beat: scroll on the landing page,
 * a scripted dolly in /take. No React re-renders on scroll.
 */

const ORDER: EditionSlug[] = ["verdant-chrona", "noir-kinetic", "aurum-cycle"];
const rise = cubicBezier(0.16, 1, 0.3, 1);
const SELECTABLE_AT = 0.74;

type Props = {
  /** External progress (0–1). When given, scroll is ignored and the section is one viewport tall. */
  progress?: MotionValue<number>;
  /** Gate the arrival beat (used by /take to wait for the operator). */
  started?: boolean;
  /** Programmatic focus — the director's "camera" resting on a can. */
  focusSlug?: EditionSlug | null;
  /** Programmatic selection — launches the flight to that edition. */
  selectSlug?: EditionSlug | null;
};

export function Unveiling(props: Props) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <UnveilingStill />;
  return <UnveilingTake {...props} />;
}

function UnveilingTake({ progress: external, started = true, focusSlug = null, selectSlug = null }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothed = useSpring(scrollYProgress, springValue.scroll);
  const p = external ?? smoothed;

  /* Prestige — the title withdraws */
  const titleOpacity = useTransform(p, [0.08, 0.22], [1, 0]);
  const titleY = useTransform(p, [0, 0.22], [0, -90]);
  const cueOpacity = useTransform(p, [0, 0.05], [1, 0]);

  /* Power — the bezel and the first crown */
  const bezelOpacity = useTransform(p, [0.2, 0.36, 0.8, 0.95], [0, 1, 1, 0.4]);
  const bezelScale = useTransform(p, [0.2, 0.44], [0.9, 1], { ease: rise });
  const rawTurn = useTransform(p, [0.2, 0.95], [0, -138]);
  const clicked = useTransform(rawTurn, (v) => Math.round(v / 6) * 6);
  const bezelRotate = useSpring(clicked, springValue.ratchet);

  const lineA = useTransform(p, [0.3, 0.36, 0.46, 0.52], [0, 1, 1, 0]);
  const lineAY = useTransform(p, [0.3, 0.52], [24, -24]);

  /* Curiosity */
  const lineB = useTransform(p, [0.5, 0.55, 0.68, 0.74], [0, 1, 1, 0]);
  const lineBY = useTransform(p, [0.5, 0.74], [24, -24]);
  const clause2 = useTransform(p, [0.55, 0.6], [0, 1]);
  const clause3 = useTransform(p, [0.6, 0.65], [0, 1]);

  /* Selection */
  const promptOpacity = useTransform(p, [0.76, 0.86], [0, 1]);
  const promptY = useTransform(p, [0.76, 0.9], [16, 0]);

  const [selectable, setSelectable] = useState(false);
  useMotionValueEvent(p, "change", (v) => setSelectable(v >= SELECTABLE_AT));
  const [hoverSlug, setHoverSlug] = useState<EditionSlug | null>(null);
  const activeSlug = selectable ? (hoverSlug ?? focusSlug) : null;

  const timeline: Record<EditionSlug, { rise: [number, number]; light: [number, number] }> = {
    "noir-kinetic": { rise: [0.18, 0.42], light: [0.24, 0.66] },
    "verdant-chrona": { rise: [0.46, 0.64], light: [0.58, 0.86] },
    "aurum-cycle": { rise: [0.5, 0.68], light: [0.62, 0.9] },
  };

  /** Move keyboard focus into the vitrine only once it exists on screen. */
  const ensureVisible = () => {
    if (external || p.get() >= SELECTABLE_AT) return;
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * 0.86, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="unveiling-title"
      data-unveiling
      className={cn("relative bg-ink-0", external ? "h-svh" : "h-[500svh] max-md:h-[380svh]")}
    >
      {/* Layout is pure CSS (no JS media queries) so the server render is already final: zero layout shift. */}
      <div className="sticky top-0 h-svh overflow-clip [--can-h:min(54svh,33rem)] [--can-w:calc(var(--can-h)*0.4012)] [--floor:21svh] [--spread:158] max-md:[--can-h:min(34svh,17rem)] max-md:[--floor:26svh] max-md:[--spread:112]">
        {/* Atmosphere: a single, static pool of light. Nothing pulses. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 62%, rgb(184 148 31 / 0.07), transparent 70%), radial-gradient(120% 80% at 50% 100%, #12100b, transparent 60%)",
          }}
        />

        {/* The bezel, centred on the central crown */}
        <m.div
          aria-hidden
          data-beat="bezel"
          className="pointer-events-none absolute left-1/2 aspect-square"
          style={{
            width: "calc(var(--can-h) * 1.22)",
            marginLeft: "calc(var(--can-h) * -0.61)",
            bottom: "calc(var(--floor) + var(--can-h) * 0.5 - var(--can-h) * 0.61)",
            opacity: bezelOpacity,
            scale: bezelScale,
          }}
        >
          <Bezel rotate={bezelRotate} />
        </m.div>

        {/* The floor of the vault — the first line drawn, the plinth the crowns stand on */}
        <m.span
          aria-hidden
          className="absolute inset-x-0 h-px bg-gold-hair"
          style={{ bottom: "var(--floor)", transformOrigin: "50% 50%" }}
          initial={{ scaleX: 0 }}
          animate={started ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ ...spring.crown, delay: 0.15 }}
        />

        {/* Title block */}
        <m.div
          className="absolute inset-x-0 top-[16svh] flex flex-col items-center px-(--gutter) text-center max-md:top-[18svh]"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <CrownArrival started={started} />
          <m.p
            className="label mt-8 text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: started ? 1 : 0 }}
            transition={{ ...fade, delay: 0.7 }}
          >
            {/* Syncopate runs wide: on a phone the city takes its own line rather than orphaning after the dot. */}
            From the house of Rolex<span className="max-md:hidden"> · </span>
            <span className="max-md:block"> Geneva</span>
          </m.p>
          <h1 id="unveiling-title" className="mt-7 text-display-xl text-bone">
            <ArrivalLine started={started} delay={0.85}>
              A Crown for Every
            </ArrivalLine>
            <ArrivalLine started={started} delay={0.99}>
              <span className="earned">Achievement.</span>
            </ArrivalLine>
          </h1>
        </m.div>

        {/* Scroll cue — drawn once, never pulses */}
        {!external ? (
          <m.div
            aria-hidden
            className="absolute inset-x-0 flex flex-col items-center gap-4"
            style={{ bottom: "calc(var(--floor) - 6.5rem)", opacity: cueOpacity }}
          >
            <m.span
              className="label text-bone-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ ...fade, delay: 1.9 }}
            >
              Scroll to unveil
            </m.span>
            <m.span
              className="block h-10 w-px origin-top bg-gold-hair"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: started ? 1 : 0 }}
              transition={{ ...spring.crown, delay: 2.1 }}
            />
          </m.div>
        ) : null}

        {/* Power — spoken line */}
        <m.p
          data-beat="power"
          className="absolute font-display text-display-m text-bone max-md:inset-x-0 max-md:top-[14svh] max-md:text-center md:top-[36svh] md:left-(--gutter) md:max-w-[24rem]"
          style={{ opacity: lineA, y: lineAY }}
        >
          Energy is <span className="earned">recognition.</span>
        </m.p>

        {/* Curiosity — spoken line, clause by clause */}
        <m.p
          data-beat="curiosity"
          className="absolute inset-x-0 px-(--gutter) text-center font-display text-display-m text-bone max-md:top-[12svh] md:top-[11svh]"
          style={{ opacity: lineB, y: lineBY }}
        >
          {/* One line, in the clear band above the crowns — never across them. */}
          <span className="tabular text-gold-hi">351</span> formulations.{" "}
          <m.span style={{ opacity: clause2 }}>Eight selected.</m.span>{" "}
          <m.span style={{ opacity: clause3 }}>Three released.</m.span>
        </m.p>

        {/* Selection — the prompt */}
        <m.p
          data-beat="prompt"
          className="label absolute inset-x-0 top-[15svh] text-center text-gold max-md:top-[13svh]"
          style={{ opacity: promptOpacity, y: promptY }}
        >
          Choose the crown that defines your achievement
        </m.p>

        {/* The vitrine */}
        <nav aria-label="The three editions" data-beat="vitrine" onFocus={ensureVisible}>
          <ul className="contents">
            {ORDER.map((slug, i) => (
              <VitrineSlot
                key={slug}
                slug={slug}
                index={i}
                progress={p}
                position={i - 1}
                timeline={timeline[slug]}
                selectable={selectable}
                activeSlug={activeSlug}
                onActivate={setHoverSlug}
                selectSlug={selectSlug}
              />
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function CrownArrival({ started }: { started: boolean }) {
  // Remount on start so the engraving plays from zero when /take begins.
  return started ? (
    <CrownMark className="h-14 md:h-16" sizes="80px" animateIn delay={0.35} />
  ) : (
    <span className="block aspect-[532/571] h-14 md:h-16" />
  );
}

function ArrivalLine({ children, started, delay }: { children: React.ReactNode; started: boolean; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
      <m.span
        className="block"
        initial={{ y: MASK_HIDDEN }}
        animate={{ y: started ? "0%" : MASK_HIDDEN }}
        transition={{ ...spring.movement, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}

function VitrineSlot({
  slug,
  index,
  progress: p,
  position,
  timeline,
  selectable,
  activeSlug,
  onActivate,
  selectSlug,
}: {
  slug: EditionSlug;
  index: number;
  progress: MotionValue<number>;
  /** −1, 0, 1: left, centre, right of the vitrine. Spacing comes from CSS (--spread). */
  position: number;
  timeline: { rise: [number, number]; light: [number, number] };
  selectable: boolean;
  activeSlug: EditionSlug | null;
  onActivate: (slug: EditionSlug | null) => void;
  selectSlug: EditionSlug | null;
}) {
  const edition = editions[slug];
  const { launch, flying } = useFlight();
  const canRef = useRef<HTMLDivElement>(null);
  // The crowns sit clipped below the floor in the first frame, so their ~600 SVG
  // nodes stay out of the server HTML and first layout; they mount right after
  // hydration, long before the rise begins. The box is reserved either way.
  const hydrated = useHydrated();
  const href = `/editions/${slug}`;

  const y = useTransform(p, timeline.rise, ["122%", "0%"], { ease: rise });
  const specularScroll = useTransform(p, timeline.light, [-0.4, 1.3]);
  const scale = useTransform(p, [0.36, 0.7], slug === "noir-kinetic" ? [1.12, 1] : [1, 1]);
  const captionOpacity = useTransform(p, [0.74 + index * 0.025, 0.86 + index * 0.025], [0, 1]);
  const refProgress = useTransform(p, [0.66 + index * 0.03, 0.84 + index * 0.03], [0, 1]);

  // Hover/focus: the chosen crown lifts off the plinth; light crosses it once.
  const active = activeSlug === slug;
  const dimmed = activeSlug !== null && !active;
  const lift = useMotionValue(0);
  const hoverLight = useMotionValue(-0.4);
  useEffect(() => {
    const a = animate(lift, active ? -14 : 0, spring.bezel);
    const b = active ? animate(hoverLight, [-0.4, 1.3], { duration: 1.4, ease: ease.precision }) : undefined;
    return () => {
      a.stop();
      b?.stop();
    };
  }, [active, lift, hoverLight]);
  const specular = useTransform([specularScroll, hoverLight], ([s, h]) =>
    (h as number) > -0.4 ? (h as number) : (s as number),
  );

  const go = () => launch(slug, canRef.current, href);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const links = Array.from(
      e.currentTarget.closest("nav")?.querySelectorAll<HTMLAnchorElement>("a[data-vitrine]") ?? [],
    );
    const next = links[(links.indexOf(e.currentTarget) + (e.key === "ArrowRight" ? 1 : -1) + links.length) % links.length];
    next?.focus();
  };

  // The director selects by name.
  const launched = useRef(false);
  useEffect(() => {
    if (selectSlug === slug && !launched.current) {
      launched.current = true;
      go();
    }
  });

  return (
    <li
      className="absolute left-1/2"
      style={{
        bottom: "var(--floor)",
        width: "var(--can-w)",
        marginLeft: "calc(var(--can-w) / -2)",
        transform: `translateX(calc(var(--spread) * ${position} * 1%))`,
        zIndex: slug === "noir-kinetic" ? 2 : 1,
      }}
    >
      <Link
        href={href}
        data-vitrine
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={() => onActivate(slug)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(slug)}
        onBlur={() => onActivate(null)}
        aria-label={`${edition.name}, reference ${edition.ref}. Honours ${edition.honourLabel.toLowerCase()}. Examine the edition.`}
        className={cn("group block outline-none", !selectable && "pointer-events-none")}
        tabIndex={0}
      >
        {/* Clip only below the floor: the crown rises out of the vault */}
        <div style={{ clipPath: "inset(-60% -60% 0 -60%)" }}>
          <m.div style={{ y }}>
            <m.div
              ref={canRef}
              className={cn(
                "aspect-[459/1144] transition-opacity duration-700 ease-[var(--ease-precision)]",
                dimmed && "opacity-45",
                flying === slug && "opacity-0",
              )}
              style={{ y: lift, scale, originY: 1 }}
            >
              {hydrated ? <Can edition={slug} specular={specular} decorative sizes="(max-width: 767px) 28vw, 14rem" /> : null}
            </m.div>
          </m.div>
        </div>

        <m.div
          className="absolute top-full left-1/2 mt-5 flex w-max max-w-[44vw] -translate-x-1/2 flex-col items-center gap-1.5 text-center md:mt-7 md:max-w-none"
          style={{ opacity: captionOpacity }}
        >
          <RefNumber value={edition.ref} progress={refProgress} className="label text-gold max-md:tracking-[0.06em]" />
          <span className="font-display text-[1.0625rem] leading-tight text-bone md:text-title">{edition.name}</span>
          <span className="label text-bone-3 transition-colors duration-500 group-hover:text-bone-2 group-focus-visible:text-bone-2">
            {edition.honourLabel}
          </span>
        </m.div>

        {/* Focus ring drawn around the crown, not the slot */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 -top-4 bottom-[-6rem] hidden border border-gold-hi group-focus-visible:block md:bottom-[-7.5rem]"
        />
      </Link>
    </li>
  );
}

/**
 * Reduced motion: the same story, composed as a still. Nothing pins, nothing
 * travels. Every beat is present, in reading order.
 */
function UnveilingStill() {
  return (
    <section aria-labelledby="unveiling-title" className="catalog pt-[calc(var(--nav-h)+6rem)] pb-24 text-center">
      <CrownMark className="mx-auto h-16" sizes="80px" />
      <p className="label mt-8 text-gold">From the house of Rolex · Geneva</p>
      <h1 id="unveiling-title" className="mt-7 text-display-xl text-bone">
        A Crown for Every <span className="earned">Achievement.</span>
      </h1>
      <p className="mx-auto mt-10 max-w-xl font-display text-title text-bone-2">
        Energy is recognition. <span className="tabular text-gold">351</span> formulations. Eight selected. Three
        released.
      </p>
      <p className="label mt-20 text-gold">Choose the crown that defines your achievement</p>
      <ul className="mt-12 grid grid-cols-3 gap-4 border-b border-gold-hair md:gap-16">
        {ORDER.map((slug) => {
          const e = editions[slug];
          return (
            <li key={slug}>
              <Link
                href={`/editions/${slug}`}
                className="group flex flex-col items-center"
                aria-label={`${e.name}, reference ${e.ref}. Honours ${e.honourLabel.toLowerCase()}. Examine the edition.`}
              >
                <span className="block w-full max-w-[12rem]">
                  <Can edition={slug} decorative sizes="(max-width: 767px) 30vw, 12rem" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-6 grid grid-cols-3 gap-4 md:gap-16" aria-hidden>
        {ORDER.map((slug) => {
          const e = editions[slug];
          return (
            <li key={slug} className="flex flex-col items-center gap-1.5">
              <span className="label tabular text-gold">Ref. {e.ref}</span>
              <span className="font-display text-title text-bone">{e.name}</span>
              <span className="label text-bone-3">{e.honourLabel}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
