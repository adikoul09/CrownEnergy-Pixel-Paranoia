import { Fragment } from "react";
import type { Metadata } from "next";
import { editionList } from "@/lib/editions";
import { EditionPlate } from "@/components/edition/EditionPlate";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Three expressions, one philosophy. Verdant Chrona, Aurum Cycle and Noir Kinetic.",
};

export default function EditionsPage() {
  return (
    <div className="surface-ivory min-h-svh">
      <div className="catalog pt-[calc(var(--nav-h)+5rem)] pb-(--section-y) md:pt-[calc(var(--nav-h)+7rem)]">
        <SectionHead numeral="—" label="The Collection" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <h1 className="text-display-l text-bone md:col-span-7">
            <MaskLines
              animateOnMount
              lines={[
                "Three expressions.",
                <Fragment key="line-1">
                  One <span className="earned">philosophy.</span>
                </Fragment>,
              ]}
            />
          </h1>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={0.2}>
            <p className="text-body-l text-bone-2">
              Each edition honours a different kind of achievement. Choose the one that is yours — it will be numbered,
              certified and allocated to you alone.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-5 md:mt-28 md:grid-cols-3 md:gap-6">
          {editionList.map((edition, i) => (
            <Reveal as="li" key={edition.slug} delay={0.1 + i * 0.12}>
              <EditionPlate edition={edition} />
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
