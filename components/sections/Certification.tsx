import { Fragment } from "react";
import { Seal } from "@/components/brand/Seal";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";

const criteria = [
  { term: "Verified", text: "Every can is assayed against its reference formulation, to the nanogram." },
  { term: "Sealed in Geneva", text: "Filled and sealed under nitrogen, then rested for seventy-two hours before inspection." },
  { term: "Numbered", text: "Each can carries its reference and its place in an edition of 2,026." },
  { term: "Allocated", text: "Never placed on a shelf. Every can is allocated against a recorded achievement." },
];

export function Certification() {
  return (
    <section
      id="certification"
      aria-labelledby="certification-title"
      className="section-y scroll-mt-(--nav-h) border-y border-gold-faint bg-ink-1"
    >
      <div className="catalog grid items-center gap-16 md:grid-cols-12">
        <Reveal className="mx-auto w-full max-w-[22rem] md:col-span-5 md:max-w-[26rem]">
          <Seal label="The Crown Certification seal" />
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <SectionHead numeral="IV" label="Certification" />
          <h2 id="certification-title" className="mt-12 text-display-l text-bone">
            <MaskLines
              lines={[
                "Certified one can",
                <Fragment key="line-1">
                  at a <span className="earned">time.</span>
                </Fragment>,
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-(--container-prose) text-body-l text-bone-2">
              The Crown Certification is not a mark printed by the million. It is a record that this can — this one —
              met the standard.
            </p>
          </Reveal>
          <dl className="mt-14 border-t border-gold-hair">
            {criteria.map((c, i) => (
              <Reveal key={c.term} delay={i * 0.08} className="grid gap-2 border-b border-gold-faint py-6 md:grid-cols-[12rem_1fr] md:gap-8">
                <dt className="label text-gold">{c.term}</dt>
                <dd className="text-body text-bone-2">{c.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
