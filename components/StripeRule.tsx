/**
 * The flyer's signature: a stack of tilted chalk / amber / rust / indigo rules.
 *
 * WHY THIS IS SVG AND NOT A CSS GRADIENT.
 * The first version was `linear-gradient(179deg, <hard px stops>)`. Two things
 * went wrong:
 *
 *  1. GEOMETRY. A linear-gradient's gradient line is `|W·sinθ| + |H·cosθ|` long.
 *     At 179° on a 512×26 element that is ~35px, but the stops only described
 *     26px — so the last ~9px went unpainted, and because the line is slanted
 *     that shortfall showed up as a diagonal wedge. The top band visibly ran
 *     out partway across.
 *  2. RASTERISATION. Hard stops on a near-vertical gradient are resolved per
 *     column, so each band steps a whole pixel at a time across the width —
 *     the grainy, ragged look.
 *
 * As SVG the bands are explicit parallelograms: the drop is constant across the
 * width by construction, nothing can run out, and the renderer anti-aliases the
 * slanted edges. `preserveAspectRatio="none"` lets one shape stretch to any box
 * without touching the geometry.
 */

/** Band positions, in viewBox units — taken from the flyer's rule stack. */
const BANDS = [
  { top: 0, height: 2, color: "var(--color-chalk)" },
  { top: 5, height: 5, color: "var(--color-amber-500)" },
  { top: 13, height: 5, color: "var(--color-rust-500)" },
  { top: 21, height: 5, color: "var(--color-indigo-400)" },
];

const WIDTH = 1000;
/** Vertical rise from the right edge to the left. Also the viewBox headroom. */
const DROP = 8;
const HEIGHT = 26 + DROP;

export default function StripeRule({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={`block h-[30px] w-full ${className}`}
    >
      {BANDS.map((band) => {
        const { top, height } = band;
        // Parallelogram: left edge sits DROP lower than the right edge.
        const points = [
          `0,${top + DROP}`,
          `${WIDTH},${top}`,
          `${WIDTH},${top + height}`,
          `0,${top + height + DROP}`,
        ].join(" ");
        return <polygon key={band.color} points={points} fill={band.color} />;
      })}
    </svg>
  );
}
