import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RoleTile from "@/components/RoleTile";
import { RECRUITMENT, SITE, SOCIALS, SUBTEAMS, applyHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "UBC Rover recruits every Fall. Hands-on experience in robotics, software and mechanical design across seven sub-teams.",
};

/**
 * Every claim below is traceable to the source site or the recruitment flyer:
 *  - "Hands-on experience in robotics, software, and mechanical design" — flyer.
 *  - the multidisciplinary sub-team framing — index.html / team.html.
 *  - Fall recruitment and "watch our socials" — join.html.
 * Nothing here promises training, states a difficulty level, or sets an
 * experience requirement, because the source says nothing about any of those
 * and we should not commit the team to a recruitment policy it never wrote.
 */
const REASONS = [
  {
    title: "Hands-on from the start",
    body: "Robotics, software and mechanical design on a vehicle that has to survive a desert — not a coursework exercise.",
  },
  {
    title: "Seven disciplines",
    body: "Chassis, arm, rover lab, electrical, software, science and business. Multidisciplinary by design.",
  },
  {
    title: "Compete internationally",
    body: "The work goes to the University Rover Challenge in Utah and the Canadian International Rover Challenge in Alberta.",
  },
];

/** Column spans for the role mosaic — 6+6+6 over three rows for seven tiles. */
const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Get on the team"
        title="Join the mission"
        lede="Hands-on experience in robotics, software and mechanical design."
        image="/media/team/electrical.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        {/* Status */}
        <Reveal>
          <div className="bg-navy-900 flex flex-col gap-6 border border-white/10 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-chalk-dim/70 font-mono text-[11px] tracking-[0.18em] uppercase">
                Recruitment status
              </p>
              <p className="font-display text-chalk mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                <span
                  aria-hidden
                  className={`inline-block h-3 w-3 rounded-full ${
                    RECRUITMENT.open ? "bg-amber-500" : "bg-rust-400"
                  }`}
                />
                {RECRUITMENT.status}
              </p>
            </div>
            <p className="text-chalk-dim/75 max-w-md text-sm leading-relaxed">
              {RECRUITMENT.detail}
            </p>
          </div>
        </Reveal>

        {/* Why */}
        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 80} className="bg-navy-950">
              <div className="h-full p-8 sm:p-10">
                <p className="font-mono text-[11px] tracking-[0.2em] text-amber-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-chalk mt-5 text-2xl font-bold tracking-[-0.02em]">
                  {reason.title}
                </h2>
                <p className="text-chalk-dim/80 mt-4 text-sm leading-relaxed">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------------------------------
            Where you could land — an uneven Anduril-style mosaic.

            Spans are [3,3, 2,2,2, 3,3] on a 6-column grid: 6+6+6 across three
            full rows for exactly seven tiles, so the grid never leaves an
            orphaned cell the way an even 3- or 4-column layout would.

            This section is strictly about OPEN ROLES and what you would be
            doing. What each sub-team builds lives on /subteams.
            ------------------------------------------------------------ */}
        <Reveal>
          <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-eyebrow">Open roles</p>
              <h2 className="font-display text-chalk mt-4 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                Where you could land
              </h2>
            </div>
            <p className="text-chalk-dim/70 max-w-sm text-sm leading-relaxed">
              What each sub-team is recruiting for, and what you would actually be handed
              in your first term. Hover a tile for the detail.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-6">
          {SUBTEAMS.map((team, i) => (
            <Reveal
              key={team.slug}
              delay={(i % 3) * 80}
              className={SPANS[i] ?? "lg:col-span-2"}
            >
              <RoleTile team={team} />
            </Reveal>
          ))}
        </div>

        {/* CTA — the source tells people to watch the socials, so link them. */}
        <Reveal>
          <div className="to-navy-950 mt-24 border border-white/10 bg-gradient-to-br from-indigo-600/40 p-10 text-center sm:p-16">
            <h2 className="font-display text-chalk mx-auto max-w-2xl text-3xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-5xl">
              Watch for the announcement
            </h2>
            <p className="text-chalk-dim/80 mx-auto mt-6 max-w-lg text-base leading-relaxed">
              We post the opening on our socials. Questions before then are welcome any
              time.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href={applyHref()}
                className="text-navy-950 inline-block bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="text-chalk inline-block border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                Email the team
              </a>
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-chalk inline-block border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
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
