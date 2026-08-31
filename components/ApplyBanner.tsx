import Link from "next/link";
import { Fragment } from "react";
import { APPLY, applyHref } from "@/lib/content";

/**
 * Slim, always-visible "Apply Now" bar pinned above the nav — the UBC Formula
 * Electric device, where a scrolling recruitment ticker sits at the very top of
 * every page and is itself the link to the application.
 *
 * The whole bar is one <Link>, so it is a single tab stop and a single large
 * hit target rather than a strip of repeated links.
 *
 * The scroll uses the same geometry as any seamless marquee: a `w-max` track of
 * two identical `min-w-[100vw]` halves translating to -50%, so half B lands
 * exactly where half A began. See components/Marquee notes in git history for
 * why `min-w-full` cannot be used here.
 */
export default function ApplyBanner() {
  const run = Array.from({ length: 6 }, (_, i) => (
    <Fragment key={i}>
      <span className="px-6 font-mono text-[11px] font-semibold tracking-[0.22em] whitespace-nowrap uppercase">
        {APPLY.cta}
      </span>
      <span aria-hidden className="text-navy-950/45">
        &#9670;
      </span>
      <span className="px-6 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap uppercase opacity-75">
        {APPLY.bannerText}
      </span>
      <span aria-hidden className="text-navy-950/45">
        &#9670;
      </span>
    </Fragment>
  ));

  const half = "flex min-w-[100vw] shrink-0 items-center justify-around";

  return (
    <Link
      href={applyHref()}
      aria-label={`${APPLY.cta} — ${APPLY.bannerText}`}
      className="group text-navy-950 relative flex h-9 items-center overflow-hidden bg-amber-500 transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-offset-[-3px]"
    >
      {/* aria-hidden on the moving text: the accessible name comes from the
          link's aria-label, so the repeated phrases are not announced. */}
      <div
        aria-hidden
        className="animate-marquee flex w-max"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        <div className={half}>{run}</div>
        <div className={half}>{run}</div>
      </div>
    </Link>
  );
}
