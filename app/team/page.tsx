import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { LEADS, SITE, SUBTEAMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "Meet the leadership and the seven sub-teams behind UBC Rover — 64 students across engineering, science and business.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Who builds it"
        title="64 students. One rover."
        lede="Engineering, science and business students who chose to spend their evenings in a lab on East Mall."
        image="/media/team/software.jpg"
      />

      {/* Leadership */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="text-eyebrow">Leadership</p>
          <h2 className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
            The leads
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {LEADS.map((lead, i) => (
            <Reveal key={lead.name} delay={(i % 5) * 60}>
              <figure className="group">
                <div className="bg-navy-900 relative aspect-[3/4] overflow-hidden border border-white/10">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: lead.focal ?? "50% 30%" }}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div
                    aria-hidden
                    className="from-navy-950/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display text-chalk text-lg leading-tight font-bold tracking-[-0.01em]">
                    {lead.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-amber-500/80 uppercase">
                    {lead.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sub-teams */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="text-eyebrow">Structure</p>
            <h2 className="font-display text-chalk mt-4 max-w-3xl text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              {SITE.subteamCount} sub-teams
            </h2>
            <p className="text-chalk-dim/80 mt-6 max-w-2xl text-base leading-relaxed">
              Every member sits on one. Cross-team integration is where most of the
              engineering actually happens.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SUBTEAMS.map((team, i) => (
              <Reveal key={team.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/rover#${team.slug}`}
                  className="group bg-navy-950 flex h-full flex-col border border-white/10 p-7 transition-colors duration-300 hover:border-amber-500/40"
                >
                  <p className="text-eyebrow">{team.discipline}</p>
                  <h3 className="font-display text-chalk mt-3 text-2xl font-bold tracking-[-0.02em] transition-colors duration-300 group-hover:text-amber-500 sm:text-3xl">
                    {team.name}
                  </h3>
                  <p className="text-chalk-dim/75 mt-4 flex-1 text-sm leading-relaxed">
                    {team.blurb}
                  </p>
                  <span
                    aria-hidden
                    className="mt-6 inline-block text-lg text-amber-500 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
