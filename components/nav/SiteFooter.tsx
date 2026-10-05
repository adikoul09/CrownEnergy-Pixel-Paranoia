import Link from "next/link";
import { CrownMark, Wordmark } from "@/components/brand/CrownMark";

/** The footer of the April build (index.html): brand and line, Explore, Company, then the legal bar. */
const explore = [
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/editions", label: "Collection" },
  { href: "/#calibre", label: "Formula" },
  { href: "/allocation", label: "Reserve" },
  { href: "/#register", label: "Crown Circle" },
];

/* April's Company and legal entries. Their pages don't exist yet, so they are set
   as text rather than links that lead nowhere; give each an href when it does. */
const company = ["About", "Boutiques", "Press", "Contact"];
const legal = ["Privacy", "Terms", "Legal"];

const item = "text-[0.8125rem] uppercase tracking-[0.12em] text-bone-3";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-gold-faint bg-ink-0">
      <div className="catalog grid grid-cols-2 gap-x-8 gap-y-14 py-20 md:grid-cols-[2fr_1fr_1fr] md:gap-20">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Rolex, home">
            <CrownMark className="h-6" sizes="32px" />
            <Wordmark className="text-[1.25rem] leading-none text-bone">Rolex</Wordmark>
          </Link>
          <p className="mt-6 max-w-sm text-body text-bone-3">
            The world&rsquo;s first ultra-premium energy drink.
            <br />
            Crafted with the same obsessive precision
            <br className="max-sm:hidden" /> that defines every Rolex calibre.
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <p id="footer-explore" className="label text-bone-2">
            Explore
          </p>
          <ul className="mt-6 grid gap-1">
            {explore.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${item} inline-flex min-h-8 items-center transition-colors duration-500 hover:text-gold`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-bone-2">Company</p>
          <ul className="mt-6 grid gap-1">
            {company.map((label) => (
              <li key={label} className={`${item} flex min-h-8 items-center`}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="catalog flex flex-col gap-6 border-t border-gold-faint py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className={item}>&copy; 2026 Crown Energy Division. All rights reserved.</p>
        <ul className="flex gap-8" aria-label="Legal">
          {legal.map((label) => (
            <li key={label} className={item}>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
