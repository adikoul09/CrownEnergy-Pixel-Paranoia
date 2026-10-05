"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full", className)}
      {...props}
    />
  )
}

/** The selection mark: a hairline ring that turns laurel, with a laurel centre, when chosen. */
function RadioMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-4 shrink-0 items-center justify-center rounded-full border border-bone-3 transition-colors duration-500 group-data-checked:border-laurel",
        className
      )}
    >
      <span className="size-1.5 scale-0 rounded-full bg-laurel transition-transform duration-500 ease-[var(--ease-precision)] group-data-checked:scale-100" />
    </span>
  )
}

/**
 * A full-row choice. Radix supplies roving focus and arrow-key selection;
 * this supplies the catalogue presentation.
 */
function RadioCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-card"
      className={cn(
        "group relative flex w-full items-start gap-6 border-t border-gold-faint py-6 text-left transition-colors duration-500 outline-none last:border-b hover:bg-ink-1 data-checked:bg-ink-1 focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-gold-hi disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioCard, RadioMark }
