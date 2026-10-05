import { Fragment } from "react";
import { chronicle } from "@/lib/editions";
import { RefNumber } from "@/components/edition/RefNumber";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { founder } from "@/lib/people";
import { FounderPortrait } from "./FounderPortrait";
import { SectionHead } from "./SectionHead";

export function Chronicle() {
  return (
    <section id="chronicle" aria-labelledby="chronicle-title" className="section-y scroll-mt-(--nav-h) bg-ink-1">
      <div className="catalog">
        <SectionHead numeral="II" label="The Chronicle" />
        <div className="mt-12 grid gap-14 md:grid-cols-12 md:items-end md:gap-10">
          <h2 id="chronicle-title" className="text-display-l text-bone md:col-span-6 xl:col-span-7">
            <MaskLines
              lines={[
                "Time was never chased.",
                <Fragment key="line-1">
                  It was <span className="earned">mastered.</span>
                </Fragment>,
              ]}
            />
          </h2>
          {/* The photograph's lower edge shares the headline's line. */}
          <FounderPortrait person={founder} className="md:col-span-6 md:col-start-7 xl:col-span-5 xl:col-start-8" />
        </div>

        <ol className="mt-24 border-t border-gold-hair md:mt-32">
          {chronicle.map((entry, i) => (
            <Reveal as="li" key={entry.year} delay={0.05 * i} className="border-b border-gold-faint">
              <div className="grid gap-6 py-12 md:grid-cols-12 md:gap-10 md:py-16">
                <p className="figure text-display-l leading-none text-gold md:col-span-3">
                  <RefNumber value={entry.year} prefix="" delay={0.15} />
                </p>
                <p className="label text-bone-3 md:col-span-2 md:pt-3">{entry.phase}</p>
                <div className="md:col-span-6 md:col-start-7">
                  <h3 className="text-title text-bone">{entry.title}</h3>
                  <p className="mt-4 text-body-l text-bone-2">{entry.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10">
          <p className="label text-gold">The selection</p>
          <p className="text-body text-bone-3">Eight formulations were selected. Three were released.</p>
        </Reveal>
      </div>
    </section>
  );
}
