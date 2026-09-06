"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import DecodeText from "./DecodeText";

/**
 * The site's one "click and enter" panel: a photo, a title, and detail that is
 * only there when you point at it.
 *
 * Shared by the home Explore grid and the competition panels so the two
 * behave identically — the same lift, the same decode, the same arrow. Two
 * near-identical implementations is how the second one quietly drifts.
 *
 * At rest the panel is a photo and a title. On hover the title row lifts by
 * `lift` and the detail lands in the gap it opens. The detail is absolutely
 * positioned and therefore contributes no height, so the panel measures the
 * same hovered or not and nothing in the grid reflows.
 *
 * Both the hiding and the decode are gated on hover CAPABILITY rather than a
 * breakpoint: on touch there is no hover to reveal anything with, so the detail
 * is simply always visible. Focus mirrors hover for keyboard.
 */
export default function HoverPanel({
  href,
  external = false,
  image,
  title,
  /** Short line that decodes out of noise. Keep it to a few words. */
  decode,
  /** Anything further to show on hover. Fades in; does not decode. */
  children,
  aspect = "aspect-[4/3] sm:aspect-[3/2]",
  /** How far the title lifts. Must clear whatever is revealed beneath it. */
  lift = "1.4rem",
  priority = false,
  className = "",
}: {
  href: string;
  external?: boolean;
  image: string;
  title: string;
  decode: string;
  children?: ReactNode;
  aspect?: string;
  lift?: string;
  priority?: boolean;
  className?: string;
}) {
  const [decoding, setDecoding] = useState(false);

  const inner = (
    <>
      <div className={`relative w-full ${aspect}`}>
        <img
          src={image}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Static scrim — it does not deepen on hover, so the photo never dims
            under the pointer. */}
        <div
          aria-hidden
          className="from-navy-950/95 via-navy-950/58 to-navy-950/22 absolute inset-0 bg-gradient-to-t"
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 p-5 sm:p-7"
        style={{ "--label-lift": lift } as React.CSSProperties}
      >
        <div className="label-lift pr-10">
          <h3 className="font-display text-chalk text-3xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl">
            {title}
          </h3>
        </div>

        <div className="label-on-hover absolute inset-x-5 bottom-5 pr-10 sm:inset-x-7 sm:bottom-7">
          {/* mt clears the title's descenders. Without it the location line
              sat hard against the baseline above and read as part of it. */}
          <DecodeText
            text={decode}
            active={decoding}
            className="text-chalk-dim/85 mt-1.5 block font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase"
          />
          {children}
        </div>
      </div>

      {/* Anchored bottom-right and fades only. It marks the corner you are
          entering through, so it should stay put while the words move. */}
      <span
        aria-hidden
        className="arrow-on-hover absolute right-5 bottom-5 text-2xl text-amber-500 sm:right-7 sm:bottom-6"
      >
        &#8594;
      </span>
    </>
  );

  const shell =
    "group bg-navy-900 relative isolate block overflow-hidden border border-white/10 " +
    className;

  const handlers = {
    onPointerEnter: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && setDecoding(true),
    onPointerLeave: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && setDecoding(false),
    onFocus: () => setDecoding(true),
    onBlur: () => setDecoding(false),
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${title} - ${decode} (opens in a new tab)`}
        className={shell}
        {...handlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={`${title} - ${decode}`} className={shell} {...handlers}>
      {inner}
    </Link>
  );
}
