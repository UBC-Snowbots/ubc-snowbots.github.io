"use client";

import Link from "next/link";
import { useState } from "react";
import DecodeText from "./DecodeText";
import type { SectionTile as Tile } from "@/lib/content";

/**
 * The home page's "click and enter" panel — the Anduril product-grid device.
 *
 * The whole tile is a single <Link>, so there is exactly one tab stop and one
 * hit target; the hover treatment is mirrored on :focus-visible so keyboard
 * users get the same affordance.
 *
 * Deliberately bare: no eyebrow, no index number, and a five-word label. Four
 * of these sit in a grid, and every extra line of chrome multiplies by four.
 * The title and the photo say where the link goes; the page behind it explains.
 *
 * The label decodes out of noise on hover — hover being a capability here, not
 * a breakpoint. Touch and keyboard users get the settled text immediately
 * rather than a state they cannot reach.
 *
 * CLS: the media sits in a fixed-aspect box with the image absolutely filling
 * it, so the tile occupies its final height before the photo arrives.
 */
export default function SectionTile({
  tile,
  priority = false,
}: {
  tile: Tile;
  priority?: boolean;
}) {
  const [decoding, setDecoding] = useState(false);

  return (
    <Link
      href={tile.href}
      aria-label={`${tile.title} — ${tile.blurb}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setDecoding(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setDecoding(false)}
      className="group bg-navy-900 relative isolate block overflow-hidden border border-white/10 transition-colors duration-500 hover:border-amber-500/40 focus-visible:border-amber-500/40"
    >
      {/* Media */}
      <div
        className={`relative w-full ${
          tile.span === "wide"
            ? "aspect-[16/10] sm:aspect-[2/1]"
            : "aspect-[4/3] sm:aspect-[3/2]"
        }`}
      >
        <img
          src={tile.image}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
        />

        {/* Scrim: keeps the label legible over any photo, and deepens on hover
            so the copy gains contrast exactly when it's being read. */}
        <div
          aria-hidden
          className="from-navy-950/95 via-navy-950/58 to-navy-950/22 absolute inset-0 bg-gradient-to-t transition-opacity duration-500 group-hover:opacity-90"
        />
        <div
          aria-hidden
          className="bg-navy-950/12 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Label block, bottom-left */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-chalk text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
            {tile.title}
          </h3>

          {/* Arrow: slides on hover to signal "enter". */}
          <span
            aria-hidden
            className="mb-1 shrink-0 text-2xl text-amber-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
          >
            &#8594;
          </span>
        </div>

        {/* The label is always present — it is five words, and hiding it until
            hover would keep it from touch users entirely. Hover only changes
            HOW it arrives. min-h reserves the line so the decode cannot reflow
            the tile. */}
        <DecodeText
          text={tile.blurb}
          active={decoding}
          className="text-chalk-dim/80 mt-3 block min-h-[1.25rem] font-mono text-[11px] tracking-[0.14em] uppercase"
        />
      </div>

      {/* Amber rule that draws in along the bottom edge on hover. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-amber-500 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-focus-visible:w-full"
      />
    </Link>
  );
}
