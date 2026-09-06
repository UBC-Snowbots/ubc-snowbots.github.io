"use client";

import Link from "next/link";
import { SUBTEAMS } from "@/lib/content";

/**
 * The Explore grid's sub-teams panel.
 *
 * Unlike the other panels this one is NOT a single link, because there is no
 * sub-teams index page any more — the seven sub-teams are the destinations. So
 * the panel is a container and each name inside it is its own target, listed
 * between hairlines.
 *
 * Consequences of that, both deliberate:
 *  - no arrow, since the panel as a whole does not go anywhere;
 *  - no decoding label, since the list is the label.
 *
 * The list is hidden until hover on hover-capable pointers and always visible
 * on touch, matching every other panel: there is no hover on a phone to reveal
 * it with, and seven links that cannot be reached are worse than a tall card.
 */
export default function SubteamPanel() {
  return (
    <div className="group bg-navy-900 relative isolate block overflow-hidden border border-white/10">
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

      {/* The list occupies the panel above the title. Absolute, so it adds no
          height and the card measures the same as its neighbours whether the
          list is showing or not. */}
      <div className="label-on-hover absolute inset-x-5 top-5 bottom-20 sm:inset-x-7 sm:top-6 sm:bottom-24">
        <ul className="flex h-full flex-col justify-end">
          {SUBTEAMS.map((team) => (
            <li key={team.slug}>
              <Link
                href={`/subteams/${team.slug}`}
                className="group/row flex items-center justify-between border-t border-white/15 py-[0.45rem] transition-colors hover:border-amber-500/60"
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

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="font-display text-chalk text-3xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl">
          Sub-teams
        </h3>
      </div>
    </div>
  );
}
