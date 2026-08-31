import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  JOINING_PACKAGE,
  SITE,
  SOCIALS,
  SUBTEAMS,
  applyHref,
  leadsForSubteam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "UBC Rover recruits every Fall. See what each sub-team works on and apply to the one that fits.",
};

/**
 * Structured after UBC Formula Electric's Join Us page: a joining package at the
 * top, then one compact block per sub-team — what you would work on, who leads
 * it, and a direct apply button.
 *
 * The point of this layout is that everything is readable at a glance. An
 * earlier version hid the role detail behind hover, which defeats the whole
 * purpose: you cannot compare sub-teams if you have to hover each one in turn.
 * Nothing here is behind an interaction.
 */
export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Get on the team"
        title="Join Us!"
        lede="Hands-on experience in robotics, software and mechanical design. Find the sub-team that fits and apply to it directly."
        image="/media/team/electrical.jpg"
      />

      {/* Top actions — joining package first, the way Formula Electric leads
          with their hiring package. */}
      <section className="mx-auto max-w-[1600px] px-5 pt-14 sm:px-8 sm:pt-16">
        <Reveal>
          <div className="bg-navy-900 flex flex-col gap-5 border border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-eyebrow">Start here</p>
              <p className="font-display text-chalk mt-2 text-xl font-bold tracking-[-0.015em] sm:text-2xl">
                Everything you need to know before applying.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {JOINING_PACKAGE.url ? (
                <a
                  href={JOINING_PACKAGE.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-navy-950 inline-block bg-amber-500 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
                >
                  {JOINING_PACKAGE.label}
                </a>
              ) : (
                /* Disabled rather than a link to nowhere — see JOINING_PACKAGE
                   in lib/content.ts; set `url` and this becomes a real button. */
                <span
                  aria-disabled="true"
                  title="Not published yet"
                  className="inline-block cursor-not-allowed border border-dashed border-amber-500/50 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] text-amber-500/70 uppercase"
                >
                  {JOINING_PACKAGE.pending}
                </span>
              )}

              <Link
                href={applyHref()}
                className="text-chalk inline-block border border-white/25 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* One compact block per sub-team, alternating sides. */}
      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-14">
        <Reveal>
          <div className="border-b border-white/10 pb-6">
            <p className="text-eyebrow">The sub-teams</p>
            <h2 className="font-display text-chalk mt-3 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
              What you&rsquo;d be working on
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-12 sm:space-y-12">
          {SUBTEAMS.map((team, i) => {
            const leads = leadsForSubteam(team.slug);
            return (
              <Reveal key={team.slug} delay={(i % 2) * 70}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 ${
                    // Alternate which side the photo sits on.
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Media + leads, the way Formula pairs each team with its
                      directors. */}
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden border border-white/10">
                      <img
                        src={team.image}
                        alt={`${team.name} sub-team at work.`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        aria-hidden
                        className="from-navy-950/48 absolute inset-0 bg-gradient-to-t to-transparent"
                      />
                    </div>
                    {leads.length ? (
                      <p className="text-chalk-dim/70 mt-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                        {leads.length === 1 ? "Lead" : "Leads"}:{" "}
                        {/* Oxford-style join: "A", "A & B", "A, B & C". */}
                        {leads.length <= 2
                          ? leads.map((l) => l.name).join(" & ")
                          : leads
                              .slice(0, -1)
                              .map((l) => l.name)
                              .join(", ") + ` & ${leads[leads.length - 1].name}`}
                      </p>
                    ) : null}
                  </div>

                  {/* Copy */}
                  <div>
                    <p className="text-eyebrow">
                      {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; {team.discipline}
                    </p>
                    <h3 className="font-display text-chalk mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                      {team.name}
                    </h3>

                    <p className="text-chalk-dim/85 mt-4 max-w-2xl text-sm leading-relaxed">
                      {team.blurb}
                    </p>

                    {/* Open roles, always visible. */}
                    <ul className="mt-6 space-y-3">
                      {team.openRoles.map((role) => (
                        <li
                          key={role.title}
                          className="border-l-2 border-amber-500/40 pl-4"
                        >
                          <p
                            className={
                              role.title.startsWith("PLACEHOLDER")
                                ? "font-mono text-xs text-amber-500/75"
                                : "font-display text-chalk text-base font-bold tracking-[-0.01em]"
                            }
                          >
                            {role.title}
                          </p>
                          <p
                            className={
                              role.doing.startsWith("PLACEHOLDER")
                                ? "mt-1 font-mono text-xs leading-relaxed text-amber-500/60"
                                : "text-chalk-dim/80 mt-1 text-sm leading-relaxed"
                            }
                          >
                            {role.doing}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Link
                        href={applyHref()}
                        className="text-navy-950 inline-block bg-amber-500 px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
                      >
                        Apply to {team.name}
                      </Link>
                      <Link
                        href={`/subteams/${team.slug}`}
                        className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase"
                      >
                        <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                          More about {team.name}
                        </span>
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          &#8594;
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="to-navy-950 border border-white/10 bg-gradient-to-br from-indigo-600/40 p-10 text-center sm:p-14">
            <h2 className="font-display text-chalk mx-auto max-w-2xl text-3xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-5xl">
              Watch for the announcement
            </h2>
            <p className="text-chalk-dim/80 mx-auto mt-5 max-w-lg text-base leading-relaxed">
              Recruitment opens every Fall and we post it on our socials. Questions before
              then are welcome any time.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-navy-950 inline-block bg-amber-500 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Email the team
              </a>
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-chalk inline-block border border-white/25 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
