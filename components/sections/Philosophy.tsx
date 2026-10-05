import { Fragment } from "react";
import Link from "next/link";
import { editionList } from "@/lib/editions";
import { Can } from "@/components/edition/Can";
import { Arrow } from "@/components/brand/Arrow";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="surface-ivory section-y scroll-mt-(--nav-h)">
      <div className="catalog">
        <SectionHead numeral="I" label="Philosophy" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <h2 id="philosophy-title" className="text-display-l text-bone md:col-span-8">
            <MaskLines
              lines={[
                "Energy is not consumption.",
                <Fragment key="line-1">
                  It is <span className="earned">recognition.</span>
                </Fragment>,
              ]}
            />
          </h2>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={0.2}>
            <p className="max-w-(--container-prose) text-body-l text-bone-2">
              Every effort, every milestone, every moment of discipline deserves to be acknowledged. Crown Energy
              exists to mark that moment.
            </p>
          </Reveal>
        </div>

        <ol className="mt-24 grid border-t border-gold-hair md:mt-32 md:grid-cols-3">
          {editionList.map((e, i) => (
            <Reveal
              as="li"
              key={e.slug}
              delay={i * 0.12}
              className="border-b border-gold-faint md:border-b-0 md:border-l md:first:border-l-0"
            >
              <Link
                href={`/editions/${e.slug}`}
                className={`group grid grid-cols-[1fr_auto] gap-6 py-10 md:block md:px-10 md:py-14 ${i === 0 ? "md:pl-0" : ""}`}
              >
                <div>
                  <p className="label tabular text-gold">{e.numeral}</p>
                  <h3 className="mt-6 text-display-m text-bone">{e.honourLabel}</h3>
                  <p className="label mt-3 text-bone-3 md:min-h-[3.2em]">{e.honourMeaning}</p>
                  <p className="mt-8 font-display text-title italic text-bone-2">{e.dedication}</p>
                  <p className="label mt-8 flex items-center gap-4 text-bone transition-colors duration-500 group-hover:text-gold-hi">
                    {e.name}
                    <Arrow />
                  </p>
                </div>
                <div className="w-14 md:hidden">
                  <Can edition={e} decorative floor={false} sizes="56px" fetchPriority="low" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
