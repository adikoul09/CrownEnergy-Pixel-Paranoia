import Image from "next/image";
import type { Frame, Person } from "@/lib/people";
import { cn } from "@/lib/utils";

/** Every portrait frame is 3:4 (width : height). */
const FRAME_RATIO = 3 / 4;
/** Every face's eyes sit on the same line: 22% down the frame. */
const EYE_LINE = 0.22;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const pct = (v: number) => `${v.toFixed(2)}%`;

/**
 * Where the photograph sits inside the frame, in percentages of the frame, so
 * the face is centred, the eyes land on the shared eye line and the frame is
 * always covered (the offsets are clamped to the photograph's edges).
 */
function place(aspect: number, { x, eyes, zoom }: Frame) {
  const width = ((zoom * aspect) / FRAME_RATIO) * 100;
  const height = zoom * 100;
  return {
    width,
    style: {
      width: pct(width),
      height: pct(height),
      left: pct(clamp(50 - x * width, 100 - width, 0)),
      top: pct(clamp(EYE_LINE * 100 - eyes * height, 100 - height, 0)),
      // Hover zooms toward the face, not toward the middle of the photograph.
      transformOrigin: `${x * 100}% ${eyes * 100}%`,
    },
  };
}

/**
 * A portrait from the project's Personalities folder, set like a catalogue plate:
 * a 3:4 frame, the photograph's own colour, a gold hairline ring and a factual
 * caption. No quotes are attributed. Each photograph is placed by its measured
 * `frame`, so across the row every face is the same size on the same eye line.
 *
 * `vw` is the frame's width in viewport units on phones, tablets and desktop. The
 * photograph is wider than its frame, so the requested image size is scaled to
 * match and the browser never stretches a small file.
 *
 * `interactive` adds a quiet hover: the plate lifts 4px, the photograph eases 4%
 * closer around the face and the ring warms to gold (transforms only when the
 * visitor allows motion).
 */
export function Portrait({
  person,
  vw,
  className,
  interactive = false,
}: {
  person: Person;
  vw: { mobile: number; tablet: number; desktop: number };
  className?: string;
  interactive?: boolean;
}) {
  const frame = person.frame ?? { x: 0.5, eyes: EYE_LINE, zoom: 1 };
  const { width, style } = place(person.image.width / person.image.height, frame);
  const k = width / 100;
  const sizes = [
    `(max-width: 767px) ${Math.ceil(vw.mobile * k)}vw`,
    `(max-width: 1279px) ${Math.ceil(vw.tablet * k)}vw`,
    `${Math.ceil(vw.desktop * k)}vw`,
  ].join(", ");

  return (
    <figure className={cn("group relative flex flex-col", className)}>
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-ink-2",
          interactive &&
            "transition-transform duration-700 ease-[var(--ease-precision)] motion-safe:group-hover:-translate-y-1",
        )}
      >
        <Image
          src={person.image}
          alt={person.alt}
          sizes={sizes}
          placeholder="blur"
          draggable={false}
          className={cn(
            "absolute max-w-none select-none",
            interactive &&
              "transition-transform duration-700 ease-[var(--ease-precision)] motion-safe:group-hover:scale-[1.04]",
          )}
          style={style}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 ring-1 ring-gold-faint ring-inset",
            interactive && "transition-colors duration-700 group-hover:ring-gold-hair",
          )}
        />
      </div>
      <figcaption className="mt-5">
        {/* One line at every width, so the fields below line up across the row. */}
        <span className="block font-display text-[1.25rem] leading-tight whitespace-nowrap text-bone md:text-title">
          {person.name}
        </span>
        <span className="label mt-2 block text-gold">{person.field}</span>
        <span className="mt-2 block text-body text-bone-2">{person.achievement}</span>
      </figcaption>
    </figure>
  );
}
