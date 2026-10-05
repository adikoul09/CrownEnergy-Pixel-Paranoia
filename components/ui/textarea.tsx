import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full resize-none border-0 border-b border-input bg-transparent px-0 py-3 font-display text-title leading-snug text-bone transition-colors duration-500 outline-none placeholder:text-bone-3 hover:border-bone-3 focus-visible:border-gold-hi focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-signal",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
