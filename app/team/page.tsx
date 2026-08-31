import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamSection from "@/components/TeamSection";
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
 * Structured after UBC Formula Electric's team page: captains, then one band
 * per sub-team. TeamSection decides each band's layout from how many people it
 * has, so no band leaves a mostly-empty row.
 */
export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Who builds it"
        title="Our Team"
        lede={`${SITE.memberCount} students across engineering, science and business, organised into ${SITE.subteamCount} sub-teams.`}
        image={TEAM_PHOTO}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <p className="text-chalk-dim/85 mx-auto max-w-3xl text-center text-base leading-relaxed text-balance sm:text-lg">
            {TEAM_INTRO}
          </p>
        </Reveal>
      </section>

      <TeamSection title="Our Captains" people={CAPTAINS()} role="Captain" />

      {SUBTEAMS.map((team) => (
        <TeamSection
          key={team.slug}
          title={`${team.name} Team`}
          eyebrow={team.discipline}
          image={team.photo ?? TEAM_PHOTO}
          people={leadsForSubteam(team.slug)}
          role={leadTitleFor(team.slug)}
          emptyNote={`No ${team.name} lead on record yet.`}
          footerHref={`/subteams/${team.slug}`}
          footerLabel={`What ${team.name} does`}
        />
      ))}
    </>
  );
}
