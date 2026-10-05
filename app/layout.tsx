import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display, Syncopate } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/nav/SiteFooter";
import "./globals.css";

/* The April build's four faces, self-hosted through next/font:
   Cormorant Garamond for headlines, Syncopate for labels and navigation,
   Jost for text, Playfair Display for figures. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-syncopate",
  display: "swap",
});

/* Figures sit below the fold; no need to compete with the hero for bandwidth. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const jost = Jost({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Crown Energy — A Crown for Every Achievement",
    template: "%s — Crown Energy",
  },
  description:
    "Three numbered editions, allocated against achievement. Verdant Chrona, Aurum Cycle, Noir Kinetic. From the house of Rolex, Geneva — a design concept.",
};

export const viewport: Viewport = {
  themeColor: "#006039",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syncopate.variable} ${jost.variable} ${playfair.variable}`}>
      <head>
        {/* Without JavaScript, nothing waits for an entrance: every hidden first frame is shown as its last. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important}[style*="translateY(150%)"],[style*="translateY(24px)"],[style*="translateY(122%)"],[style*="translateY(20px)"],[style*="translateY(14px)"]{transform:none!important}[style*="scaleX(0)"]{transform:none!important}[stroke-dasharray]{stroke-dasharray:none!important}[data-unveiling]{height:100svh!important}[data-beat]{display:none!important}[id^="register-story-"]{visibility:visible!important}[data-register-story]{grid-template-rows:1fr!important}',
            }}
          />
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link label">
          Skip to content
        </a>
        <Providers>
          <SiteNav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
