import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITION_SLUGS, editionList, editions, isEditionSlug } from "@/lib/editions";
import { CanLanding } from "@/components/motion/Flight";
import { RefNumber } from "@/components/edition/RefNumber";
import { SpecSheet } from "@/components/edition/SpecSheet";
import { EditionPlate } from "@/components/edition/EditionPlate";
import { Seal } from "@/components/brand/Seal";
import { Arrow } from "@/components/brand/Arrow";
import { Button } from "@/components/ui/button";
import { Hairline, MaskLines, Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return EDITION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/editions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isEditionSlug(slug)) return {};
  const e = editions[slug];
  return {
    title: `${e.name} · Ref. ${e.ref}`,
    description: `${e.dedication} ${e.name} honours ${e.honourLabel.toLowerCase()}. ${e.engravingName} engraving, ${e.lacquerName.toLowerCase()}.`,
  };
}

export default async function DossierPage({ params }: PageProps<"/editions/[slug]">) {
  const { slug } = await params;
  if (!isEditionSlug(slug)) notFound();
  const e = editions[slug];
  const others = editionList.filter((o) => o.slug !== slug);

  return (
    <article aria-labelledby="dossier-title" className="surface-ivory">
      <div className="catalog grid gap-12 pt-[calc(var(--nav-h)+3rem)] md:grid-cols-12 md:gap-10 md:pt-[calc(var(--nav-h)+4rem)]">
        {/* The object */}
        <div className="md:col-span-5">
          <div className="flex flex-col items-center md:sticky md:top-[calc(var(--nav-h)+4rem)]">
            <CanLanding slug={slug} className="w-[min(46vw,13rem)] md:w-[min(17rem,26svh)]" />
            <Hairline origin="center" animateOnMount delay={0.4} className="mt-1 w-[min(80vw,24rem)]" />
            <p className="label mt-5 text-bone-3">Shown actual proportion · 330 ml</p>
          </div>
        </div>

        {/* The dossier */}
        <div className="pb-24 md:col-span-6 md:col-start-7 md:pb-40">
          <nav aria-label="Breadcrumb">
            <ol className="label flex items-center gap-3 text-bone-3">
              <li>
                <Link href="/editions" className="transition-colors duration-500 hover:text-bone">
                  The Collection
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-bone-2">
                {e.numeral}
              </li>
            </ol>
          </nav>

          <p className="label mt-14 text-gold">
            <RefNumber value={e.ref} delay={0.5} />
          </p>
          <h1 id="dossier-title" className="mt-5 text-display-l text-bone">
            <MaskLines animateOnMount delay={0.35} lines={[e.name]} />
          </h1>
          <Reveal delay={0.55}>
            <p className="mt-6 font-display text-title italic text-earned">{e.dedication}</p>
            <p className="label mt-8 text-bone-2">
              Honours {e.honourLabel} <span className="text-bone-3">· {e.honourMeaning}</span>
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-14 space-y-6">
            {e.story.map((para, i) => (
              <p key={i} className="max-w-(--container-prose) text-body-l text-bone-2 first:text-bone">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.8} className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Button asChild>
              <Link href={`/allocation?edition=${slug}`}>
                Request allocation
                <Arrow />
              </Link>
            </Button>
            <p className="text-body text-bone-3">Price is disclosed on allocation.</p>
          </Reveal>

          <section aria-labelledby="spec-title" className="mt-24">
            <h2 id="spec-title" className="label mb-6 text-gold">
              Specification
            </h2>
            <Reveal>
              <SpecSheet edition={e} />
            </Reveal>
          </section>

          <section aria-labelledby="cert-title" className="mt-24 grid items-center gap-10 sm:grid-cols-[12rem_1fr]">
            <Reveal className="w-48">
              <Seal refNumber={e.ref} />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="cert-title" className="text-title text-bone">
                Crown Certified
              </h2>
              <p className="mt-3 text-body text-bone-2">
                This edition is assayed, sealed and numbered in Geneva. Its certificate is issued in your name when an
                allocation is granted.
              </p>
            </Reveal>
          </section>
        </div>
      </div>

      <section aria-labelledby="others-title" className="surface-warm">
        <div className="catalog py-24 md:py-32">
          <h2 id="others-title" className="label text-gold">
            The other editions
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6">
            {others.map((o) => (
              <li key={o.slug}>
                <EditionPlate edition={o} size="small" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
