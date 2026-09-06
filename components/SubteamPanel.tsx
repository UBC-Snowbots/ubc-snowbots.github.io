"use client";

import Link from "next/link";
import { useState } from "react";
import DecodeText from "./DecodeText";
import { SUBTEAMS } from "@/lib/content";

/**
 * The Explore grid's subteams panel.
 *
 * Unlike the other panels this one is NOT a single link, because there is no
 * subteams index page any more — the seven subteams are the destinations. So
 * the panel is a container and each name inside it is its own target, listed
 * between hairlines.
 *
 * Consequences of that, both deliberate:
 * - no arrow, since the panel as a whole does not go anywhere.
 *
 * The list is hidden until hover on hover-capable pointers and always visible
 * on touch, matching every other panel: there is no hover on a phone to reveal
 * it with, and seven links that cannot be reached are worse than a tall card.
 */
export default function SubteamPanel() {
  const [decoding, setDecoding] = useState(false);

  return (
    <div
      className="group bg-navy-900 relative isolate block overflow-hidden border border-white/10"
      onPointerEnter={(e) => e.pointerType === "mouse" && setDecoding(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setDecoding(false)}
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
        <img
          src="/media/team/software.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="from-navy-950/95 via-navy-950/70 to-navy-950/45 absolute inset-0 bg-gradient-to-t"
        />
      </div>

      {/* The list sits in the panel's right half, its left edge lined up with
          where the title's own measure ends, so the rules read as belonging to
          this card rather than cutting across the whole photo.

          Absolute, so it adds no height and the card measures the same as its
          neighbours whether the list is showing or not. */}
      <div className="label-on-hover absolute inset-y-5 right-5 left-[38%] sm:inset-y-7 sm:right-7">
        <ul className="flex h-full flex-col justify-center">
          {SUBTEAMS.map((team) => (
            <li key={team.slug}>
              <Link
                href={`/subteams/${team.slug}`}
                className="group/row flex items-center justify-between border-t border-white/15 py-[0.3rem] transition-colors hover:border-amber-500/60"
              >
                <span className="text-chalk-dim/85 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors group-hover/row:text-amber-500">
                  {team.name}
                </span>
                <span
                  aria-hidden
                  className="text-amber-500/0 transition-colors duration-200 group-hover/row:text-amber-500"
                >
                  &#8594;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 p-5 sm:p-7"
        style={{ "--label-lift": "1.4rem" } as React.CSSProperties}
      >
        <div className="label-lift">
          <h3 className="font-display text-chalk text-3xl leading-[0.95] font-semibold tracking-[-0.03em] sm:text-5xl">
            Subteams
          </h3>
        </div>

        {/* The same decoded label every other panel carries. The arrow is the
            only piece missing, because this panel is not itself a link. */}
        <div className="label-on-hover absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
          <DecodeText
            text="Seven teams, one rover"
            active={decoding}
            className="text-chalk-dim/85 mt-3 block font-mono text-[11px] tracking-[0.14em] uppercase"
          />
        </div>
      </div>
    </div>
  );
}
