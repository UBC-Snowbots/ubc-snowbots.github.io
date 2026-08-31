import type { Metadata } from "next";
import Link from "next/link";
import MemberGrid from "@/components/MemberCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamBanner from "@/components/TeamBanner";
import {
  CAPTAINS,
  SITE,
  SUBTEAMS,
  SUBTEAM_LEADS,
  TEAM_INTRO,
  TEAM_PHOTO,
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
  const leads = SUBTEAM_LEADS();

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
        <MemberGrid people={captains} />
      </section>

      {/* Leads */}
      <TeamBanner title="Our Leads" />
      <section className="mx-auto max-w-[1600px] px-5 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16">
        <Reveal>
          <p className="text-chalk-dim/70 mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed">
            {/* TODO(team): role titles — taskmaster, systems lead and so on —
                still to be decided. Update LEADS[].role in lib/content.ts. */}
            Role titles are still being finalised.
          </p>
        </Reveal>
        <MemberGrid people={leads} />
      </section>

      {/* One band per sub-team */}
      {SUBTEAMS.map((team) => (
        <div key={team.slug}>
          <TeamBanner
            title={`${team.name} Team`}
            eyebrow={team.discipline}
            image={team.photo ?? TEAM_PHOTO}
          />
          <section className="mx-auto max-w-[1600px] px-5 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16">
            <MemberGrid
              people={leadsForSubteam(team.slug)}
              emptyNote={`The ${team.name} roster has not been added yet.`}
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
      ))}
    </>
  );
}
