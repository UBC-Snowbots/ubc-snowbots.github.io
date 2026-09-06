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
 * There is no zoom on the photo, no amber rule drawing along the bottom edge,
 * and no darkening wash on hover. Each was a separate thing moving at once, and
 * four tiles firing three effects apiece reads as fidgeting. What is left is
 * the label arriving and the arrow rising — two movements, both of which mean
 * "there is more here", which is the only thing the hover has to say.
 *
 * At rest the tile shows only its title. The label fades in and decodes out of
 * noise on hover, the way Anduril's product cards do. Both the hiding and the
 * decode are gated on hover CAPABILITY rather than a breakpoint — on touch the
 * label is simply always visible, since there is no hover there to reveal it
 * with and hiding it would delete the copy from every phone.
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
      onFocus={() => setDecoding(true)}
      onBlur={() => setDecoding(false)}
      className="group bg-navy-900 relative isolate block overflow-hidden border border-white/10"
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
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Scrim: keeps the label legible over any photo. Static — it does not
            deepen on hover, so the photo never dims under the pointer. */}
        <div
          aria-hidden
          className="from-navy-950/95 via-navy-950/58 to-navy-950/22 absolute inset-0 bg-gradient-to-t"
        />
      </div>

      {/* Label block, bottom-left */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-chalk text-3xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl">
            {tile.title}
          </h3>

          {/* Arrow rises up into place on hover rather than sitting there
              permanently. Same capability gate as the label: on touch it is
              simply always visible, since there is no hover to raise it. */}
          <span
            aria-hidden
            className="arrow-on-hover mb-1 shrink-0 text-2xl text-amber-500"
          >
            &#8594;
          </span>
        </div>

        {/* min-h reserves the line whether or not the label is showing, so
            neither the reveal nor the decode can reflow the tile. */}
        <div className="label-on-hover mt-3 min-h-[1.25rem]">
          <DecodeText
            text={tile.blurb}
            active={decoding}
            className="text-chalk-dim/85 block font-mono text-[11px] tracking-[0.14em] uppercase"
          />
        </div>
      </div>
    </Link>
  );
}
