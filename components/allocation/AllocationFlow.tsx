"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import { requestAllocation, type AllocationState } from "@/app/allocation/actions";
import {
  steps,
  validateStep,
  type AllocationField,
  type AllocationInput,
  type FieldErrors,
} from "@/lib/allocation";
import {
  HONOURS,
  editionList,
  editions,
  honourToEdition,
  type EditionSlug,
  type Honour,
} from "@/lib/editions";
import { Can, CanSilhouette } from "@/components/edition/Can";
import { Arrow } from "@/components/brand/Arrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioCard, RadioGroup, RadioMark } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { fade, spring } from "@/components/motion/springs";
import { cn } from "@/lib/utils";
import { Certificate } from "./Certificate";

const NUMERALS = ["I", "II", "III"];
const MAX_CHARS = 280;
const honourCopy: Record<Honour, { label: string; meaning: string }> = {
  effort: { label: "Effort", meaning: "Work sustained over time" },
  milestone: { label: "Milestone", meaning: "A moment of arrival" },
  discipline: { label: "Discipline", meaning: "What you do when no one is watching" },
};

const editionHonour = Object.fromEntries(
  HONOURS.map((h) => [honourToEdition[h], h]),
) as Record<EditionSlug, Honour>;

/**
 * The Request. One question per screen, asked the way a private client
 * advisor would ask it. It ends not in a receipt but in a certificate.
 */
export function AllocationFlow({ preselected, today }: { preselected: EditionSlug | null; today: string }) {
  const reduce = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Partial<AllocationInput>>(() =>
    preselected ? { edition: preselected, honour: editionHonour[preselected] } : {},
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [state, dispatch, pending] = useActionState<AllocationState, AllocationInput>(requestAllocation, {
    status: "idle",
  });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const granted = state.status === "granted" ? state.certificate : null;
  const serverErrors = state.status === "error" ? state.errors : null;
  const shownErrors: FieldErrors = { ...serverErrors, ...errors };
  const edition = values.edition ? editions[values.edition] : null;
  // The live region's text is derived; screen readers announce it when it changes.
  const announcement = granted
    ? "Your achievement has been recorded. Your certificate is shown."
    : `Step ${step + 1} of 3. ${steps[step].title}`;

  // Server-side rejection: return to the first step with an error.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error") {
      const target = steps.findIndex((s) => (s.fields as readonly AllocationField[]).some((f) => state.errors[f]));
      if (target >= 0) setStep(target);
    }
  }

  // Move focus to each new question and announce it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [step, granted, reduce]);

  const set = <K extends AllocationField>(field: K, value: AllocationInput[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const chooseHonour = (h: Honour) => {
    setValues((v) => ({ ...v, honour: h, edition: overrideOpen && v.edition ? v.edition : honourToEdition[h] }));
    setErrors((e) => ({ ...e, honour: undefined, edition: undefined }));
  };

  const advance = () => {
    const found = validateStep(step, values);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = (steps[step].fields as readonly AllocationField[]).find((f) => found[f]);
      const el = first ? document.getElementById(`field-${first}`) : null;
      // Radio groups take focus on their first option, not the group container.
      (el?.matches("input, textarea") ? el : el?.querySelector<HTMLElement>("[role=radio]"))?.focus();
      return;
    }
    setErrors({});
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    startTransition(() => dispatch(values as AllocationInput));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const transition = { y: spring.movement, opacity: { ...fade, duration: 0.5 } };

  if (granted) {
    return (
      <div className="catalog pt-[calc(var(--nav-h)+4rem)] pb-(--section-y) md:pt-[calc(var(--nav-h)+6rem)]">
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>
        <div className="max-w-3xl">
          <p className="label text-gold">Allocation granted</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-6 text-display-l text-bone outline-none">
            Your achievement has been <span className="earned">recorded.</span>
          </h1>
          <p className="mt-6 max-w-(--container-prose) text-body-l text-bone-2">
            {editions[granted.edition].name} is reserved in your name. Price and delivery are disclosed privately, by
            letter.
          </p>
        </div>
        <div className="mt-16">
          <Certificate data={granted} />
        </div>
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <Button type="button" onClick={() => window.print()}>
            Print certificate
          </Button>
          <Button asChild variant="quiet" size="inline">
            <Link href="/editions">Return to the collection</Link>
          </Button>
        </div>
        <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-bone-3">
          A concept experience. Nothing you entered was stored or sent; the allocation number is derived from your email
          and edition, so it is the same each time you ask.
        </p>
      </div>
    );
  }

  return (
    <div className="catalog grid gap-12 pt-[calc(var(--nav-h)+3rem)] pb-(--section-y) md:grid-cols-12 md:gap-10 md:pt-[calc(var(--nav-h)+5rem)]">
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* The crown being requested */}
      <aside aria-label="Your selection" className="md:col-span-4">
        <div className="flex items-center gap-8 md:sticky md:top-[calc(var(--nav-h)+5rem)] md:flex-col md:items-start">
          <div className="relative w-20 shrink-0 md:w-[min(12rem,22svh)]">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={edition?.slug ?? "none"}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={transition}
              >
                {edition ? (
                  <Can edition={edition} decorative sizes="(max-width: 767px) 80px, 12rem" />
                ) : (
                  <CanSilhouette />
                )}
              </m.div>
            </AnimatePresence>
          </div>
          <div>
            <p className="label text-bone-3">Allocation request</p>
            <p className="mt-3 font-display text-title text-bone">{edition ? edition.name : "Not yet chosen"}</p>
            <p className="label tabular mt-2 text-gold">{edition ? `Ref. ${edition.ref}` : "Ref. —"}</p>
            <ol className="mt-8 hidden gap-3 md:grid" aria-label="Progress">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "label flex items-center gap-4 transition-colors duration-500",
                    i === step ? "text-bone" : i < step ? "text-bone-2" : "text-bone-3",
                  )}
                >
                  <span className="tabular w-6 text-gold">{NUMERALS[i]}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "w-8 transition-colors duration-500",
                      // Laurel marks progress: done (1px) and current (2px). Ahead stays gold-faint.
                      i < step ? "h-px bg-laurel" : i === step ? "h-0.5 bg-laurel" : "h-px bg-gold-faint",
                    )}
                  />
                  <span className="sr-only">
                    {i < step ? "Completed: " : i === step ? "Current: " : ""}
                  </span>
                  {s.short}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </aside>

      {/* The question */}
      <form
        className="md:col-span-7 md:col-start-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          advance();
        }}
        aria-describedby="flow-intro"
      >
        <p id="flow-intro" className="label text-gold">
          Request an allocation · <span className="tabular">{NUMERALS[step]}</span> of III
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <m.fieldset
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transition}
            className="mt-6"
          >
            <legend className="contents">
              <h1 ref={headingRef} tabIndex={-1} className="text-display-l text-bone outline-none">
                {steps[step].title}
              </h1>
            </legend>

            {step === 0 ? (
              <StepMarking
                values={values}
                errors={shownErrors}
                overrideOpen={overrideOpen}
                setOverrideOpen={setOverrideOpen}
                chooseHonour={chooseHonour}
                chooseEdition={(slug) => set("edition", slug)}
              />
            ) : null}
            {step === 1 ? <StepAchievement values={values} errors={shownErrors} set={set} today={today} /> : null}
            {step === 2 ? <StepIdentity values={values} errors={shownErrors} set={set} /> : null}
          </m.fieldset>
        </AnimatePresence>

        <div className="mt-14 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" size="inline" onClick={back} className="self-start">
              <Arrow direction="left" />
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" aria-busy={pending || undefined} disabled={pending}>
            {step < steps.length - 1 ? "Continue" : pending ? "Recording…" : "Submit for recognition"}
            <Arrow />
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ── Step I ──────────────────────────────────────────────────────── */

function StepMarking({
  values,
  errors,
  overrideOpen,
  setOverrideOpen,
  chooseHonour,
  chooseEdition,
}: {
  values: Partial<AllocationInput>;
  errors: FieldErrors;
  overrideOpen: boolean;
  setOverrideOpen: (open: boolean) => void;
  chooseHonour: (h: Honour) => void;
  chooseEdition: (slug: EditionSlug) => void;
}) {
  const recommended = values.honour ? editions[honourToEdition[values.honour]] : null;
  const chosen = values.edition ? editions[values.edition] : null;
  return (
    <div className="mt-10">
      <p className="max-w-(--container-prose) text-body-l text-bone-2">
        Every crown honours a different kind of achievement. Choose the one you are marking; we will recommend its
        edition.
      </p>
      <FieldError id="error-honour" message={errors.honour} />
      <RadioGroup
        id="field-honour"
        aria-label="The achievement you are marking"
        aria-invalid={errors.honour ? true : undefined}
        aria-describedby={errors.honour ? "error-honour" : undefined}
        value={values.honour ?? ""}
        onValueChange={(v) => chooseHonour(v as Honour)}
        className="mt-10"
      >
        {HONOURS.map((h, i) => (
          <RadioCard key={h} value={h} className="px-1 md:px-4">
            <span className="label tabular w-6 pt-1.5 text-gold">{NUMERALS[i]}</span>
            <span className="flex-1">
              <span className="block font-display text-title text-bone">{honourCopy[h].label}</span>
              <span className="mt-1 block text-body text-bone-2">{honourCopy[h].meaning}</span>
              <span className="label mt-3 block text-bone-3">Crown · {editions[honourToEdition[h]].name}</span>
            </span>
            <RadioMark className="mt-2" />
          </RadioCard>
        ))}
      </RadioGroup>

      {recommended ? (
        <div className="mt-10 border-l border-gold-hair pl-6">
          <p className="label text-bone-3">Your crown</p>
          <p className="mt-2 font-display text-title text-bone">
            {chosen?.name}
            <span className="label tabular ml-4 align-middle text-gold">Ref. {chosen?.ref}</span>
          </p>
          <button
            type="button"
            aria-expanded={overrideOpen}
            aria-controls="edition-override"
            onClick={() => setOverrideOpen(!overrideOpen)}
            className="label mt-4 inline-flex h-11 items-center text-bone-2 underline decoration-gold-hair underline-offset-8 transition-colors hover:text-bone"
          >
            {overrideOpen ? "Keep the recommended crown" : "Choose a different edition"}
          </button>
          {overrideOpen ? (
            <RadioGroup
              id="edition-override"
              aria-label="Edition"
              value={values.edition ?? ""}
              onValueChange={(v) => chooseEdition(v as EditionSlug)}
              className="mt-4"
            >
              {editionList.map((e) => (
                <RadioCard key={e.slug} value={e.slug} className="items-center px-1 py-4 md:px-4">
                  <span className="w-7 shrink-0">
                    <Can edition={e} decorative floor={false} sizes="28px" fetchPriority="low" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-body text-bone">{e.name}</span>
                    <span className="label tabular block text-bone-3">
                      Ref. {e.ref} · {e.honourLabel}
                    </span>
                  </span>
                  <RadioMark />
                </RadioCard>
              ))}
            </RadioGroup>
          ) : null}
        </div>
      ) : null}
      <FieldError id="error-edition" message={errors.edition} />
    </div>
  );
}

/* ── Step II ─────────────────────────────────────────────────────── */

function StepAchievement({
  values,
  errors,
  set,
  today,
}: {
  values: Partial<AllocationInput>;
  errors: FieldErrors;
  set: <K extends AllocationField>(field: K, value: AllocationInput[K]) => void;
  today: string;
}) {
  const hintId = useId();
  const length = values.achievement?.length ?? 0;
  return (
    <div className="mt-10 grid gap-12">
      <div>
        <Label htmlFor="field-achievement">In one sentence</Label>
        <Textarea
          id="field-achievement"
          name="achievement"
          rows={3}
          maxLength={MAX_CHARS}
          value={values.achievement ?? ""}
          onChange={(e) => set("achievement", e.target.value)}
          placeholder="Four thousand hours of training. A first solo performance."
          aria-invalid={errors.achievement ? true : undefined}
          aria-describedby={cn(hintId, errors.achievement && "error-achievement")}
          className="mt-3"
        />
        <div className="mt-3 flex justify-between gap-6">
          <p id={hintId} className="text-[0.8125rem] text-bone-3">
            It will be engraved on your certificate exactly as written.
          </p>
          <p className="label tabular text-bone-3" aria-hidden>
            {length} / {MAX_CHARS}
          </p>
        </div>
        <FieldError id="error-achievement" message={errors.achievement} />
      </div>
      <div className="max-w-xs">
        <Label htmlFor="field-achievedOn">When was it achieved?</Label>
        <Input
          id="field-achievedOn"
          name="achievedOn"
          type="date"
          max={today}
          value={values.achievedOn ?? ""}
          onChange={(e) => set("achievedOn", e.target.value)}
          aria-invalid={errors.achievedOn ? true : undefined}
          aria-describedby={errors.achievedOn ? "error-achievedOn" : undefined}
          className="mt-3 tabular"
        />
        <FieldError id="error-achievedOn" message={errors.achievedOn} />
      </div>
    </div>
  );
}

/* ── Step III ────────────────────────────────────────────────────── */

function StepIdentity({
  values,
  errors,
  set,
}: {
  values: Partial<AllocationInput>;
  errors: FieldErrors;
  set: <K extends AllocationField>(field: K, value: AllocationInput[K]) => void;
}) {
  return (
    <div className="mt-10 grid gap-12">
      <div>
        <Label htmlFor="field-name">Name, as it should appear on the certificate</Label>
        <Input
          id="field-name"
          name="name"
          autoComplete="name"
          value={values.name ?? ""}
          onChange={(e) => set("name", e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "error-name" : undefined}
          className="mt-3"
        />
        <FieldError id="error-name" message={errors.name} />
      </div>
      <div>
        <Label htmlFor="field-email">Email, for a single letter when your allocation is ready</Label>
        <Input
          id="field-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email ?? ""}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={cn("email-note", errors.email && "error-email")}
          className="mt-3"
        />
        <FieldError id="error-email" message={errors.email} />
      </div>
      <p id="email-note" className="max-w-(--container-prose) text-[0.8125rem] leading-relaxed text-bone-3">
        This is a concept experience. Nothing you enter is stored or sent.
      </p>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-3 text-[0.875rem] text-signal">
      <span className="sr-only">Error: </span>
      {message}
    </p>
  );
}
