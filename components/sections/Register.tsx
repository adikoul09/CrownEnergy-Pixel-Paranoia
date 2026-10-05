import { Fragment } from "react";
import { editions } from "@/lib/editions";
import { register } from "@/lib/register";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { RegisterRow } from "./RegisterRow";

const honourLabel = { effort: "Effort", milestone: "Milestone", discipline: "Discipline" } as const;

export function Register() {
  return (
    <section id="register" aria-labelledby="register-title" className="section-y scroll-mt-(--nav-h) bg-ink-0">
      <div className="catalog">
        <SectionHead numeral="VI" label="The Register" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <h2 id="register-title" className="text-display-l text-bone md:col-span-8">
            <MaskLines
              lines={[
                "The circle is not a list of names.",
                <Fragment key="line-1">
                  It is a list of <span className="earned">achievements.</span>
                </Fragment>,
              ]}
            />
          </h2>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={0.15}>
            <p className="text-body-l text-bone-2">
              Every allocation begins with an achievement, recorded here in the order it was granted.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28" role="table" aria-label="The Register, selected entries">
          <div
            role="row"
            className="label hidden grid-cols-[6rem_9rem_1fr_11rem_8rem] gap-8 border-b border-gold-hair pb-4 text-bone-3 md:grid"
          >
            <span role="columnheader">No.</span>
            <span role="columnheader">Honour</span>
            <span role="columnheader">Achievement</span>
            <span role="columnheader">Edition</span>
            <span role="columnheader" className="text-right">
              City
            </span>
          </div>
          <div role="rowgroup">
            {register.map((r, i) => (
              <Reveal key={r.no} delay={(i % 4) * 0.06}>
                <RegisterRow entry={r} honour={honourLabel[r.honour]} edition={editions[r.edition].name} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
