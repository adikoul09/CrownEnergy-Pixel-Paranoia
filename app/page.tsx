import type { ReactNode } from "react";
import { Unveiling } from "@/components/hero/Unveiling";
import { Philosophy } from "@/components/sections/Philosophy";
import { Chronicle } from "@/components/sections/Chronicle";
import { Calibre } from "@/components/sections/Calibre";
import { Certification } from "@/components/sections/Certification";
import { Standard } from "@/components/sections/Standard";
import { Register } from "@/components/sections/Register";
import { Invitation } from "@/components/sections/Invitation";

/**
 * Below-the-fold chapters skip style, layout and paint until they approach the
 * viewport. They remain in the DOM and the accessibility tree; the first frame
 * only has to lay out the hero, so it paints sooner.
 * Sizes are the chapters' measured desktop heights; `auto` remembers the real
 * size once rendered, so the scrollbar settles without shifting content.
 */
function Deferred({ size, children }: { size: number; children: ReactNode }) {
  return <div style={{ contentVisibility: "auto", containIntrinsicSize: `auto ${size}px` }}>{children}</div>;
}

export default function Home() {
  return (
    <>
      <Unveiling />
      <Deferred size={1100}>
        <Philosophy />
      </Deferred>
      <Deferred size={1718}>
        <Chronicle />
      </Deferred>
      <Deferred size={1283}>
        <Calibre />
      </Deferred>
      <Deferred size={1100}>
        <Certification />
      </Deferred>
      <Deferred size={1250}>
        <Standard />
      </Deferred>
      <Deferred size={1100}>
        <Register />
      </Deferred>
      <Deferred size={820}>
        <Invitation />
      </Deferred>
    </>
  );
}
