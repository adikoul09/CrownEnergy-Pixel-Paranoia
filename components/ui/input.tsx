import * as React from "react"
import { cn } from "@/lib/utils"

/** A single engraved line to write on — no box. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 border-0 border-b border-input bg-transparent px-0 font-display text-title text-bone transition-colors duration-500 outline-none placeholder:text-bone-3 hover:border-bone-3 focus-visible:border-gold-hi focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-signal",
        className
      )}
      {...props}
    />
  )
}

export { Input }
