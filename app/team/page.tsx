import type { Metadata } from "next";
import Link from "next/link";
import MemberGrid, { MemberCard } from "@/components/MemberCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamBanner from "@/components/TeamBanner";
import {
  CAPTAINS,
  SITE,
  SUBTEAMS,
  TEAM_INTRO,
  TEAM_PHOTO,
  leadTitleFor,
  leadsForSubteam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet UBC Rover — ${SITE.memberCount} students across engineering, science and business, organised into ${SITE.subteamCount} sub-teams.`,
};

/**
 * Structured after UBC Formula Electric's team page: captains, then leads, then
 * one band per sub-team. Each band is a full-bleed group photo with the section
 * name over it, followed by that group's member cards.
 *
 * Only the ten leads are known today, so each sub-team band shows its own
 * lead(s) and a labelled placeholder where the rest of the roster will go.
 * Inventing members to fill the grid would be worse than an honest gap.
 */
export default function TeamPage() {
  const captains = CAPTAINS();

  return (
    <>
      <PageHero
        eyebrow="Who builds it"
        title="Our Team"
        lede={`${SITE.memberCount} students across engineering, science and business, organised into ${SITE.subteamCount} sub-teams.`}
        image={TEAM_PHOTO}
      />

      {/* Intro band between the masthead and the first section, as on the
          reference page. */}
      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <p className="text-chalk-dim/85 mx-auto max-w-3xl text-center text-base leading-relaxed text-balance sm:text-lg">
            {TEAM_INTRO}
          </p>
        </Reveal>
      </section>

      {/* Captains */}
      <TeamBanner title="Our Captains" />
      <section className="mx-auto max-w-[1600px] px-5 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16">
        <MemberGrid people={captains} role="Captain" />
      </section>

      {/* Leads */}
      {/* One band per sub-team.

          A sub-team with a single lead gets the header and that lead side by
          side — a full-width band above one lonely card left most of the row
          empty. Two or more leads, or none, keep the full-width band. */}
      {SUBTEAMS.map((team) => {
        const leads = leadsForSubteam(team.slug);
        const role = leadTitleFor(team.slug);
        const solo = leads.length === 1;

        if (solo) {
          return (
            <section
              key={team.slug}
              className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10"
            >
              <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
                <TeamBanner
                  title={`${team.name} Team`}
                  eyebrow={team.discipline}
                  image={team.photo ?? TEAM_PHOTO}
                  inline
                />
                <MemberCard person={leads[0]} role={role} />
              </div>

              <Reveal>
                <Link
                  href={`/subteams/${team.slug}`}
                  className="group mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase"
                >
                  <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                    What {team.name} does
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </Link>
              </Reveal>
            </section>
          );
        }

        return (
          <div key={team.slug}>
            <TeamBanner
              title={`${team.name} Team`}
              eyebrow={team.discipline}
              image={team.photo ?? TEAM_PHOTO}
            />
            <section className="mx-auto max-w-[1600px] px-5 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16">
              <MemberGrid
                people={leads}
                role={role}
                emptyNote={`No ${team.name} lead on record yet.`}
              />

              <Reveal>
                <Link
                  href={`/subteams/${team.slug}`}
                  className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase"
                >
                  <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                    What {team.name} does
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </Link>
              </Reveal>
            </section>
          </div>
        );
      })}
    </>
  );
}
