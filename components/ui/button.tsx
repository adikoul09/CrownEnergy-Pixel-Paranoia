import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * Crown Energy buttons. No fills, no gradients, no glow, no lift.
 * The primary action is a gold hairline; hover warms the field behind it.
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-4 whitespace-nowrap font-label text-label font-normal uppercase tracking-[0.2em] transition-[color,background-color,border-color] duration-500 ease-[var(--ease-precision)] outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border border-gold text-bone hover:border-gold-hi hover:bg-gold-faint hover:text-gold-hi aria-busy:cursor-progress",
        quiet:
          "text-bone hover:text-gold-hi after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold-hair after:transition-transform after:duration-700 after:ease-[var(--ease-precision)] hover:after:scale-x-100",
        ghost: "text-bone-2 hover:text-bone",
      },
      size: {
        default: "h-13 px-8",
        sm: "h-11 px-6",
        inline: "h-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), "group")}
      {...props}
    />
  )
}

export { Button, buttonVariants }
