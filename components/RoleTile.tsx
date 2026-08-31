import Link from "next/link";
import { applyHref, type Subteam } from "@/lib/content";

/**
 * A sub-team's OPEN ROLES, as a tile in the /join mosaic.
 *
 * Deliberately distinct from the sub-team cards on /subteams: those answer
 * "what does this sub-team do", these answer "what would I be handed, and what
 * would I be doing". Nothing here links through to the sub-team overview —
 * this surface is about the job, not the org chart.
 *
 * FIXED HEIGHT is load-bearing. An earlier version let the tile grow on hover,
 * which resized the grid row and shoved every tile below it down by ~190px, so
 * hovering one card visibly jumped the page. Pinning the height means the
 * mosaic never moves; the detail expands into the space the card already owns
 * and the body scrolls if a sub-team lists a lot of roles.
 */
export default function RoleTile({ team }: { team: Subteam }) {
  const count = team.openRoles.length;

  return (
    <article className="group bg-navy-900 flex h-[24rem] flex-col overflow-hidden border border-white/10 transition-colors duration-500 focus-within:border-amber-500/40 hover:border-amber-500/40 sm:h-[26rem]">
      {/* Media band */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden sm:h-40">
        <img
          src={team.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden
          className="from-navy-900 via-navy-900/70 to-navy-900/30 absolute inset-0 bg-gradient-to-t"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <h3 className="font-display text-chalk text-2xl leading-none font-extrabold tracking-[-0.025em] sm:text-3xl">
            {team.name}
          </h3>
          <p className="text-eyebrow shrink-0 pb-1">
            {count} {count === 1 ? "role" : "roles"}
          </p>
        </div>
      </div>

      {/* Roles. Titles always show; the "what you'd be doing" detail expands on
          hover, and is simply always open on touch devices. */}
      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
          {team.openRoles.map((role) => (
            <li key={role.title} className="border-l-2 border-amber-500/40 pl-4">
              <p
                className={
                  role.title.startsWith("PLACEHOLDER")
                    ? "font-mono text-xs text-amber-500/75"
                    : "font-display text-chalk text-base font-bold tracking-[-0.01em]"
                }
              >
                {role.title}
              </p>

              <div className="reveal-on-hover">
                <div>
                  <p
                    className={
                      role.doing.startsWith("PLACEHOLDER")
                        ? "mt-2 font-mono text-xs leading-relaxed text-amber-500/60"
                        : "text-chalk-dim/85 mt-2 text-sm leading-relaxed"
                    }
                  >
                    {role.doing}
                  </p>
                  {role.skills.length ? (
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {role.skills.map((skill, s) => (
                        <li
                          key={`${skill}-${s}`}
                          className="text-chalk-dim/70 border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="shrink-0 pt-5">
          <Link
            href={applyHref()}
            className="text-navy-950 inline-block bg-amber-500 px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
          >
            Apply to {team.name}
          </Link>
        </div>
      </div>
    </article>
  );
}
