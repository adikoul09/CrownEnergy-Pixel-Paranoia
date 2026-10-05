"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { useState } from "react";
import { CrownMark, Wordmark } from "@/components/brand/CrownMark";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { fade } from "@/components/motion/springs";

const primary = [
  { href: "/editions", label: "Editions" },
  { href: "/#philosophy", label: "Philosophy" },
];
const secondary = [
  { href: "/#register", label: "Register" },
  { href: "/allocation", label: "Request allocation" },
];
const all = [...primary, ...secondary];
const numerals = ["I", "II", "III", "IV"];

/**
 * The navigation bar: Rolex green, as in the April build. Fixed, quiet.
 * A 2px pale-gold rule marks the page you are on; hover draws a 1px one.
 * On the landing page it settles in after the opening beat has been seen;
 * it is in the DOM (and keyboard reachable) from the first frame.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLanding = pathname === "/";

  const isCurrent = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <m.header
      className="site-nav surface-green fixed inset-x-0 top-0 z-40 h-(--nav-h) border-b border-green-deep focus-within:!opacity-100 motion-reduce:!opacity-100"
      initial={isLanding ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ ...fade, duration: 1.2, delay: isLanding ? 2.2 : 0 }}
    >
      <nav aria-label="Primary" className="catalog grid h-full grid-cols-[1fr_auto_1fr] items-center">
        {/* Syncopate runs wide: the full row of links needs 1024px; below that, the menu. */}
        <ul className="hidden items-center gap-10 lg:flex">
          {primary.map((item) => (
            <NavLink key={item.href} {...item} current={isCurrent(item.href)} />
          ))}
        </ul>

        <Link
          href="/"
          className="col-start-1 flex items-center gap-3 justify-self-start lg:col-start-2 lg:justify-self-center"
          aria-label="Rolex, home"
          onClick={() => setOpen(false)}
        >
          <CrownMark className="h-7" sizes="40px" />
          <Wordmark className="text-[1.375rem] leading-none text-bone md:text-[1.625rem]">Rolex</Wordmark>
        </Link>

        <ul className="col-start-3 hidden items-center justify-end gap-10 lg:flex">
          {secondary.map((item) => (
            <NavLink key={item.href} {...item} current={isCurrent(item.href)} />
          ))}
        </ul>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="label col-start-3 flex h-11 items-center gap-3 justify-self-end text-bone lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-6">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-[var(--ease-precision)]",
                  open && "translate-y-[4.5px] rotate-[35deg]",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-[var(--ease-precision)]",
                  open && "-translate-y-[4.5px] -rotate-[35deg]",
                )}
              />
            </span>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Crown Energy site navigation</SheetDescription>
            <ol className="catalog flex flex-1 flex-col justify-center gap-2 py-16">
              {all.map((item, i) => (
                <li key={item.href} className="border-b border-gold-faint">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="flex items-baseline gap-6 py-5"
                  >
                    <span className="label tabular w-8 text-gold">{numerals[i]}</span>
                    <span className="relative font-display text-display-m text-bone">
                      {item.label}
                      {isCurrent(item.href) ? (
                        <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 bg-gold-hi" />
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="catalog label pb-10 text-bone-3">A Crown for Every Achievement</p>
          </SheetContent>
        </Sheet>
      </nav>
    </m.header>
  );
}

function NavLink({ href, label, current }: { href: string; label: string; current: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className="label group relative flex h-11 items-center text-bone transition-colors duration-500 hover:text-gold-hi"
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 origin-left transition-transform duration-700 ease-[var(--ease-precision)]",
            current
              ? "bottom-2 h-0.5 scale-x-100 bg-gold-hi"
              : "bottom-2.5 h-px scale-x-0 bg-gold-hi group-hover:scale-x-100",
          )}
        />
      </Link>
    </li>
  );
}
