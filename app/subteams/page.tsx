import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE, SUBTEAMS, applyHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sub-teams",
  description:
    "The seven UBC Rover sub-teams — chassis, arm, rover lab, electrical, software, science and business — and what each one does.",
};

/**
 * Sub-team index. Strictly "what this sub-team does" — open roles and
 * responsibilities live on /join, and the hardware itself lives on /rover.
 *
 * Each row is a banner that clicks through to the sub-team's own page. The
 * banner is NOT a wrapping <Link>: the title carries a stretched pseudo-element
 * that covers the card, and the Apply button sits above it on its own z-index.
 * Nesting a real <a> inside another <a> is invalid HTML and browsers recover
 * from it unpredictably.
 */
export default function SubteamsPage() {
  return (
    <>
      <PageHero
        eyebrow="How we're organised"
        title="Seven sub-teams"
        lede={`Every one of our ${SITE.memberCount} members sits on one. Cross-team integration is where most of the engineering actually happens.`}
        image="/media/team/software.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="space-y-5">
          {SUBTEAMS.map((team, i) => (
            <Reveal key={team.slug} delay={(i % 3) * 70}>
              <article className="group bg-navy-900 relative isolate overflow-hidden border border-white/10 transition-colors duration-500 hover:border-amber-500/40">
                <div className="grid md:grid-cols-[minmax(0,32rem)_minmax(0,1fr)]">
                  {/* Media */}
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[22rem]">
                    <img
                      src={team.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden
                      className="from-navy-900/85 absolute inset-0 bg-gradient-to-r via-transparent to-transparent md:bg-gradient-to-l"
                    />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col p-6 sm:p-8">
                    <p className="text-eyebrow">{String(i + 1).padStart(2, "0")}</p>

                    <h2 className="mt-3">
                      {/* Stretched link: covers the whole card, one tab stop. */}
                      <Link
                        href={`/subteams/${team.slug}`}
                        className="font-display text-chalk text-3xl font-extrabold tracking-[-0.03em] transition-colors duration-300 group-hover:text-amber-500 after:absolute after:inset-0 sm:text-5xl"
                      >
                        {team.name}
                      </Link>
                    </h2>

                    <p className="text-chalk-dim/80 mt-4 max-w-xl text-sm leading-relaxed">
                      {team.blurb}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {team.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="text-chalk-dim/70 border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      {/* z-10 lifts this above the stretched link overlay so it
                          stays independently clickable. */}
                      <Link
                        href={applyHref()}
                        className="text-navy-950 relative z-10 bg-amber-500 px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
                      >
                        Apply to {team.name}
                      </Link>
                      <span
                        aria-hidden
                        className="text-chalk-dim/50 font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500"
                      >
                        What we do &#8594;
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
