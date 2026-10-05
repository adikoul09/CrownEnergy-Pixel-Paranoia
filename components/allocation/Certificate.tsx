"use client";

import * as m from "motion/react-m";
import { EDITION_SIZE, editions } from "@/lib/editions";
import type { Certificate as CertificateData } from "@/lib/allocation";
import { CrownMark, Wordmark } from "@/components/brand/CrownMark";
import { Seal } from "@/components/brand/Seal";
import { fade, spring } from "@/components/motion/springs";

const longDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });
const formatDate = (iso: string) => longDate.format(new Date(`${iso}T00:00:00Z`));

/**
 * The certificate of recognition — the moment the experience exists for.
 * Lines are set one after another, then the seal is pressed.
 */
export function Certificate({ data }: { data: CertificateData }) {
  const edition = editions[data.edition];

  const line = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { y: { ...spring.movement, delay: 0.25 + i * 0.14 }, opacity: { ...fade, delay: 0.25 + i * 0.14 } },
  });

  return (
    <figure
      className="certificate relative border border-gold-hair bg-ink-1 p-7 sm:p-12 md:p-16 print:p-11!"
      aria-label={`Certificate of Recognition, allocation number ${data.allocationNo} of ${EDITION_SIZE}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-gold-faint" data-print-gold />
      <CornerMarks />

      <m.header {...line(0)} className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-bone" data-print-ink>
          <CrownMark className="h-7" sizes="40px" />
          <Wordmark className="text-[0.9375rem]" />
        </div>
        <p className="label tabular engraved text-gold-hi" data-print-gold>
          No. {data.allocationNo} / {EDITION_SIZE.toLocaleString("en-GB")}
        </p>
      </m.header>

      <m.p {...line(1)} className="label mt-14 text-gold md:mt-20 print:mt-10!" data-print-gold>
        Certificate of Recognition
      </m.p>
      <m.p {...line(2)} className="label mt-10 text-bone-3 print:mt-6!" data-print-ink>
        This certifies that
      </m.p>
      <m.p {...line(3)} className="mt-3 font-display text-display-m text-bone" data-print-ink>
        {data.name}
      </m.p>
      <m.p {...line(4)} className="label mt-8 text-bone-3" data-print-ink>
        has recorded the following achievement
      </m.p>
      <m.blockquote
        {...line(5)}
        className="mt-4 max-w-3xl font-display text-title italic leading-snug text-bone"
        data-print-ink
      >
        “{data.achievement}”
      </m.blockquote>
      <m.p {...line(6)} className="mt-4 text-body text-bone-2" data-print-ink>
        Achieved {formatDate(data.achievedOn)}
      </m.p>

      {/* On paper the record and the seal settle to the foot of the page. */}
      <m.div {...line(7)} className="mt-14 grid items-end gap-10 md:mt-20 md:grid-cols-[1fr_auto] print:mt-auto! print:grid-cols-[1fr_auto]! print:pt-6">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gold-hair pt-8 sm:grid-cols-4 print:grid-cols-[repeat(3,minmax(0,1fr))_max-content]!" data-print-gold>
          {[
            ["Edition", edition.name],
            ["Reference", edition.ref],
            ["Honours", edition.honourLabel],
            ["Issued", `Geneva, ${formatDate(data.issuedOn)}`],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="label text-bone-3" data-print-ink>
                {term}
              </dt>
              {term === "Reference" ? (
                // The reference is cut, not written: engraved gold numerals, as on a caseback.
                <dd className="tabular engraved mt-1.5 text-title font-medium tracking-[0.14em] text-gold-hi" data-print-gold>
                  {value}
                </dd>
              ) : (
                <dd className="mt-2 text-body text-bone" data-print-ink>
                  {value}
                </dd>
              )}
            </div>
          ))}
        </dl>
        <div className="w-40 justify-self-end md:w-48 print:w-36!">
          <Seal refNumber={edition.ref} mode="stamp" finish="engraved" delay={1.6} />
        </div>
      </m.div>
    </figure>
  );
}

function CornerMarks() {
  const c = "pointer-events-none absolute size-6 border-gold";
  return (
    <span aria-hidden data-print-gold>
      <span className={`${c} -top-px -left-px border-t border-l`} />
      <span className={`${c} -top-px -right-px border-t border-r`} />
      <span className={`${c} -bottom-px -left-px border-b border-l`} />
      <span className={`${c} -right-px -bottom-px border-r border-b`} />
    </span>
  );
}
