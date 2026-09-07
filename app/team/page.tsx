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
  description: `Meet UBC Rover - ${SITE.memberCount} students across engineering, science and business, organised into ${SITE.subteamCount} subteams.`,
};

/**
 * Structured after UBC Formula Electric's team page: captains, then one band
 * per subteam. TeamSection decides each band's layout from how many people it
 * has, so no band leaves a mostly-empty row.
 */
export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        lede={`${SITE.memberCount} students across engineering, science and business, organised into ${SITE.subteamCount} subteams.`}
        image={TEAM_PHOTO}
      />

      <section className="mx-auto max-w-[1800px] px-4 py-10 sm:px-5 sm:py-12">
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
