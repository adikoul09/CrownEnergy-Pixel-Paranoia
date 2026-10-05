import { calibre, EDITION_SIZE, type Edition } from "@/lib/editions";

/** The watch-catalogue specification sheet. */
export function SpecSheet({ edition }: { edition: Edition }) {
  const rows: [string, string][] = [
    ["Reference", edition.ref],
    ["Formulation", `No. ${edition.formulation} of 351`],
    ["Honours", edition.honourLabel],
    ["Case", `330 ml brushed aluminium, ${edition.lacquerName.toLowerCase()}`],
    ["Engraving", `${edition.engravingName}, hand-finished`],
    ["Calibre", `${calibre.name} — four components`],
    ["Profile", edition.profile],
    ["Notes", edition.notes],
    ["Certification", "Crown Certified, Geneva"],
    ["Edition", `First Edition, MMXXVI · ${EDITION_SIZE.toLocaleString("en-GB")} numbered allocations`],
    ["Price", "Disclosed on allocation"],
  ];
  return (
    <dl className="border-t border-gold-hair">
      {rows.map(([term, value]) => (
        <div key={term} className="grid gap-1 border-b border-gold-faint py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <dt className="label text-bone-3">{term}</dt>
          <dd className={term === "Reference" ? "label tabular text-gold" : "text-body text-bone"}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
