import type { Metadata } from "next";
import Link from "next/link";
import LeadLinks from "@/components/LeadLinks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { LEADS, SITE, SUBTEAMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "Meet the leadership behind UBC Rover — 64 students across engineering, science and business.",
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
          <p className="text-chalk-dim/70 mt-6 max-w-2xl text-sm leading-relaxed">
            {/* TODO(team): role titles — taskmaster, systems lead and so on —
                still to be decided. Update LEADS[].role in lib/content.ts. */}
            Role titles are still being finalised.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {LEADS.map((lead, i) => (
            <Reveal key={lead.name} delay={(i % 5) * 60}>
              <figure>
                {/* Static by request: no grayscale filter, no hover zoom. */}
                <div className="bg-navy-900 relative aspect-[3/4] overflow-hidden border border-white/10">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: lead.focal ?? "50% 30%" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="from-navy-950/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display text-chalk text-lg leading-tight font-bold tracking-[-0.01em]">
                    {lead.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-amber-500/80 uppercase">
                    {lead.role}
                  </p>
                  <LeadLinks links={lead.links} name={lead.name} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pointer to the sub-teams page — the detail lives there now, not here. */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="text-eyebrow">Structure</p>
            <h2 className="font-display text-chalk mt-4 max-w-3xl text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              {SITE.subteamCount} sub-teams
            </h2>
            <p className="text-chalk-dim/80 mt-6 max-w-2xl text-base leading-relaxed">
              Every member sits on one. Each sub-team has its own page covering what it
              does and the projects it has delivered.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {SUBTEAMS.map((team, i) => (
              <Reveal key={team.slug} delay={i * 45}>
                <Link
                  href={`/subteams/${team.slug}`}
                  className="text-chalk-dim/85 inline-block border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                >
                  {team.name}
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link
              href="/subteams"
              className="group mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-amber-500 uppercase"
            >
              <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                All sub-teams
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &#8594;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
