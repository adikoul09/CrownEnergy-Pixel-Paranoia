import { Fragment } from "react";
import { calibre } from "@/lib/editions";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";

const figures = [
  { value: "351", label: "Formulations engineered" },
  { value: "1 ng", label: "Tolerance per compound" },
  { value: "4 h", label: "Sustained focus" },
];

export function Calibre() {
  return (
    <section id="calibre" aria-labelledby="calibre-title" className="surface-warm section-y scroll-mt-(--nav-h)">
      <div className="catalog grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+4rem)]">
            <SectionHead numeral="III" label="The Calibre" />
            <h2 id="calibre-title" className="mt-12 text-display-l text-bone">
              <MaskLines
                lines={[
                  "You don't need more energy.",
                  <Fragment key="line-1">
                    You need <span className="earned">control.</span>
                  </Fragment>,
                ]}
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-(--container-prose) text-body-l text-bone-2">
                {calibre.name}. Four components assembled like a movement, so that focus is released evenly for four
                hours — and nothing is paid back later.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ol className="border-t border-gold-hair">
            {calibre.components.map((c, i) => (
              <Reveal as="li" key={c.part} delay={i * 0.08} className="border-b border-gold-faint py-10">
                <div className="flex items-baseline justify-between gap-6">
                  <p className="label text-gold">{c.part}</p>
                  <p className="label tabular text-bone-3">{String(i + 1).padStart(2, "0")}</p>
                </div>
                <h3 className="mt-4 text-title text-bone">{c.compound}</h3>
                <p className="mt-3 text-body text-bone-2">{c.text}</p>
              </Reveal>
            ))}
          </ol>

          <dl className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1} className="flex h-full flex-col">
                <dt className="label text-bone-3">{f.label}</dt>
                {/* Labels wrap unevenly; the figures share one baseline. */}
                <dd className="figure mt-auto pt-3 text-display-m text-earned">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
