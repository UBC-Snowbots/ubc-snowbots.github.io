import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SUBTEAMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Rover",
  description:
    "How the UBC Rover is put together — chassis, arm, rover lab, electrical, software, science and business, sub-team by sub-team.",
};

export default function RoverPage() {
  return (
    <>
      <PageHero
        eyebrow="The machine"
        title="Built by seven sub-teams"
        lede="Chassis to end-effector, power rail to perception stack. Each sub-team owns a system, and every system has to survive a desert."
        image="/media/rover-mog.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="space-y-24 sm:space-y-36">
          {SUBTEAMS.map((team, i) => (
            <article
              key={team.slug}
              id={team.slug}
              // scroll-mt clears the fixed header when linked to by anchor.
              className="scroll-mt-28"
            >
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  // Alternating sides — the Formula Electric split-panel rhythm.
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                    <img
                      src={team.image}
                      alt={`${team.name} sub-team at work.`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="from-navy-950/70 absolute inset-0 bg-gradient-to-t to-transparent"
                    />
                  </div>
                </Reveal>

                <Reveal delay={110}>
                  <p className="text-eyebrow">
                    {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; {team.discipline}
                  </p>
                  <h2 className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
                    {team.name}
                  </h2>
                  <div className="stripe-rule mt-6 h-[26px] w-40" aria-hidden />
                  <p className="text-chalk-dim/85 mt-7 text-base leading-relaxed">
                    {team.blurb}
                  </p>

                  <ul className="mt-8 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                    {team.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="bg-navy-950 text-chalk-dim/75 px-5 py-4 font-mono text-[11px] tracking-[0.12em] uppercase"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
