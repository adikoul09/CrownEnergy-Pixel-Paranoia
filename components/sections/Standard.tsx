import { Fragment } from "react";
import { standard } from "@/lib/people";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { Portrait } from "./Portrait";
import { SectionHead } from "./SectionHead";

/**
 * The Standard — achievements the world already recognises, from the project's
 * Personalities folder. Five equal frames: one row on desktop, three and two on
 * tablets, two, two and one on phones, every short row centred.
 */
export function Standard() {
  return (
    <section id="standard" aria-labelledby="standard-title" className="surface-ivory section-y scroll-mt-(--nav-h)">
      <div className="catalog">
        <SectionHead numeral="V" label="The Standard" />
        <h2 id="standard-title" className="mt-12 text-display-l text-bone">
          <MaskLines
            lines={[
              "Some achievements need",
              <Fragment key="line-1">
                no <span className="earned">introduction.</span>
              </Fragment>,
            ]}
          />
        </h2>

        <ul className="mt-14 flex flex-wrap justify-center gap-x-5 gap-y-14 md:mt-16 md:gap-x-8 xl:flex-nowrap">
          {standard.map((person, i) => (
            <Reveal
              as="li"
              key={person.key}
              delay={i * 0.08}
              className="basis-[calc((100%-1.25rem)/2)] md:basis-[calc((100%-4rem)/3)] xl:basis-0 xl:grow"
            >
              <Portrait person={person} vw={{ mobile: 45, tablet: 29, desktop: 17 }} interactive />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
