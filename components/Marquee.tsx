import { Fragment } from "react";

/**
 * Infinite horizontal ticker — the Formula Electric "We're Hiring" device,
 * carrying the flyer's own DESIGN. CODE. COMPETE. triad.
 *
 * How the seam is avoided, and why the classes are exactly these:
 *
 * The track holds two identical halves and animates to `translate3d(-50%,0,0)`.
 * A percentage in `transform` resolves against the element's OWN border box —
 * not its content — so the track must be `w-max`. Without it the track is a
 * flex item sized to the wrapper (viewport width) while its children overflow
 * to twice that, and `-50%` then shifts by half a viewport instead of by one
 * full half: the content visibly snaps sideways on every loop.
 *
 * Each half is floored at `min-w-[100vw]` rather than `min-w-full`. `min-w-full`
 * would resolve against the `w-max` track, whose width depends on the children
 * — circular, and it re-introduces the mismatch. Viewport units break the cycle
 * while still guaranteeing a half is never narrower than the screen, which is
 * what stops a short phrase list from leaving a gap on wide monitors.
 *
 * Only `transform` animates, so this never repaints or triggers layout.
 */
export default function Marquee({
  items,
  duration = 40,
}: {
  items: readonly string[];
  duration?: number;
}) {
  const run = items.map((item, i) => (
    <Fragment key={i}>
      <span className="font-display text-chalk px-8 text-2xl font-extrabold tracking-[-0.01em] whitespace-nowrap sm:px-12 sm:text-4xl">
        {item}
      </span>
      <span aria-hidden className="self-center text-amber-500">
        &#9670;
      </span>
    </Fragment>
  ));

  const halfClass = "flex min-w-[100vw] shrink-0 items-center justify-around";

  return (
    <div className="bg-navy-900 relative flex overflow-hidden border-y border-white/10 py-5 select-none">
      <div
        className="animate-marquee flex w-max"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className={halfClass}>{run}</div>
        {/* Duplicate half: hidden from assistive tech so the phrases aren't
            announced twice. */}
        <div className={halfClass} aria-hidden>
          {run}
        </div>
      </div>

      {/* Soft edge fades so text dissolves rather than clipping at the bounds. */}
      <div
        aria-hidden
        className="from-navy-900 pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="from-navy-900 pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent sm:w-32"
      />
    </div>
  );
}
