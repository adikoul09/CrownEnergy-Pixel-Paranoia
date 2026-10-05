import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { photoshootImage } from "@/lib/people";
import { CrownMark } from "@/components/brand/CrownMark";
import { Arrow } from "@/components/brand/Arrow";
import { Button } from "@/components/ui/button";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";

export function Invitation() {
  return (
    <section aria-labelledby="invitation-title" className="surface-ivory section-y">
      <div className="catalog grid items-center gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionHead numeral="VII" label="Invitation" />
          <Reveal className="mt-14">
            <CrownMark className="h-12" sizes="64px" />
          </Reveal>
          <h2 id="invitation-title" className="mt-10 text-display-l text-bone">
            <MaskLines
              lines={[
                "The circle does not open.",
                <Fragment key="line-1">
                  It is <span className="earned">entered.</span>
                </Fragment>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-(--container-prose) text-body-l text-bone-2">
              Allocations are granted against achievements, not orders. Tell us what you are marking, and which crown it
              deserves.
            </p>
            <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Button asChild>
                <Link href="/allocation">
                  Request an allocation
                  <Arrow />
                </Link>
              </Button>
              <Button asChild variant="quiet" size="inline">
                <Link href="/editions">View the editions</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The project's photoshoot (Assets / Mockup 2), framed with the April gold corners.
            Six columns from column seven: a clear column separates it from the call to action. */}
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <figure className="relative">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={photoshootImage}
                alt="The three editions on a dark wooden desk beside a gold chronograph, lit by a table lamp"
                fill
                sizes="(max-width: 767px) 100vw, 46vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 -right-3 size-10 border-t border-r border-gold"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -left-3 size-10 border-b border-l border-gold"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
