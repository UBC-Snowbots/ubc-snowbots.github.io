import Link from "next/link";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionTile from "@/components/SectionTile";
import { COMPETITIONS, SECTIONS, SITE, SPONSOR_TIERS, SUBTEAMS } from "@/lib/content";

const STATS = [
  { value: "64", label: "Students on the team" },
  { value: "07", label: "Specialised sub-teams" },
  { value: "02", label: "International competitions" },
  { value: "∞", label: "Iterations before it works" },
];

export default function Home() {
  return (
    <>
      {/* ==================================================================
          HERO — full-bleed cinematic plate (Relativity), oversized condensed
          wordmark locked over it (Formula Electric).
          ================================================================== */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <img
          src="/media/rover-mog.jpg"
          alt="The UBC Rover vehicle deployed on desert terrain with its robotic arm extended."
          // LCP element: never lazy, always first in the queue.
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="from-navy-950 via-navy-950/55 to-navy-950/20 absolute inset-0 -z-10 bg-gradient-to-t"
        />
        <div
          aria-hidden
          className="from-navy-950/85 via-navy-950/30 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
        />

        <div className="mx-auto w-full max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-24">
          <Reveal initiallyVisible>
            <p className="text-eyebrow">University of British Columbia</p>
          </Reveal>

          <Reveal delay={80} initiallyVisible>
            <h1 className="font-display text-chalk mt-5 text-[clamp(3.25rem,13vw,12rem)] leading-[0.82] font-extrabold tracking-[-0.045em]">
              UBC
              <br />
              <span className="text-amber-500">ROVER</span>
            </h1>
          </Reveal>

          <Reveal delay={160} initiallyVisible>
            <div className="stripe-rule mt-9 h-[26px] w-full max-w-lg" aria-hidden />
          </Reveal>

          <Reveal delay={220} initiallyVisible>
            <p className="font-display text-chalk mt-9 max-w-2xl text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-4xl">
              Engineering the future of autonomy.
            </p>
            <p className="text-chalk-dim/80 mt-5 max-w-xl text-base leading-relaxed">
              We design and build advanced semi-autonomous rovers for international
              competition — and we train the students who do it.
            </p>
          </Reveal>

          <Reveal delay={300} initiallyVisible>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/join"
                className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Join the Mission
              </Link>
              <Link
                href="/rover"
                className="text-chalk border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                See the Rover
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden
          className="animate-scroll-cue text-chalk-dim absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] uppercase lg:block"
        >
          Scroll
        </div>
      </section>

      {/* The flyer's own triad, as a ticker. */}
      <Marquee items={SITE.triad} duration={34} />

      {/* ==================================================================
          MISSION — one bold statement, generous air (Relativity).
          ================================================================== */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow">Who we are</p>
            <h2 className="font-display text-chalk mt-5 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              We build Mars rovers
              <span className="text-amber-500">.</span>
              <br />
              On campus. From scratch.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="text-chalk-dim/85 space-y-6 text-base leading-relaxed sm:text-lg">
              <p>
                UBC Rover is a multidisciplinary team of {SITE.memberCount} students
                dedicated to designing and building the next generation of semi-autonomous
                Mars rovers. We push the boundaries of robotics through{" "}
                {SITE.subteamCount} specialised sub-teams — from machine-learning-driven
                navigation to swappable end-effectors.
              </p>
              <p>
                Since our inception we have strived to push the limits of student
                robotics, earning top placements at the University Rover Challenge and the
                Canadian International Rover Challenge.
              </p>
              <p className="text-chalk">
                Alongside the engineering, we run community outreach to inspire the next
                wave of STEM leaders.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <div className="mt-20 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:mt-28 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} className="bg-navy-950">
              <div className="p-7 sm:p-10">
                <p className="font-display text-5xl leading-none font-extrabold tracking-[-0.04em] text-amber-500 sm:text-7xl">
                  {stat.value}
                </p>
                <p className="text-chalk-dim/60 mt-4 font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================================================================
          SECTION GRID — the core "click and enter" surface (Anduril).
          ================================================================== */}
      <section
        aria-labelledby="explore-heading"
        className="relative border-t border-white/10"
      >
        <div aria-hidden className="grid-wash absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-eyebrow">Explore</p>
                <h2
                  id="explore-heading"
                  className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl"
                >
                  Five ways in
                </h2>
              </div>
              <p className="text-chalk-dim/70 max-w-sm text-sm leading-relaxed">
                The machine, the competitions, the people who build it, and how to get on
                the team.
              </p>
            </div>
          </Reveal>

          {/* Uneven mosaic: wide tiles span both columns, narrow tiles pair up.
              This is what stops the grid reading as a generic card wall. */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {SECTIONS.map((tile, i) => (
              <Reveal
                key={tile.href}
                delay={(i % 2) * 90}
                className={tile.span === "wide" ? "lg:col-span-2" : ""}
              >
                <SectionTile tile={tile} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SUB-TEAMS — dense technical index (Anduril's product list register).
          ================================================================== */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-eyebrow">Disciplines</p>
            <h2 className="font-display text-chalk mt-4 max-w-3xl text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              Seven sub-teams, one vehicle
            </h2>
          </Reveal>

          <ul className="mt-14 border-t border-white/10">
            {SUBTEAMS.map((team, i) => (
              <Reveal key={team.slug} delay={i * 40} as="li">
                <Link
                  href={`/rover#${team.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/10 py-6 transition-colors duration-300 hover:bg-white/[0.03] sm:gap-8 sm:py-8"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-amber-500/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="font-display text-chalk block text-2xl font-bold tracking-[-0.02em] transition-colors duration-300 group-hover:text-amber-500 sm:text-4xl">
                      {team.name}
                    </span>
                    <span className="text-chalk-dim/70 mt-1 block font-mono text-[11px] tracking-[0.14em] uppercase">
                      {team.discipline}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="text-chalk-dim/60 text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500"
                  >
                    &#8594;
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================================================================
          COMPETITIONS — split panels (Formula Electric's alternating device).
          ================================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-eyebrow">Where we prove it</p>
            <h2 className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              Two deserts. One rover.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {COMPETITIONS.map((comp, i) => (
              <Reveal key={comp.abbr} delay={i * 110}>
                <article className="group bg-navy-900 relative isolate flex h-full flex-col overflow-hidden border border-white/10">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={comp.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="from-navy-900 via-navy-900/40 absolute inset-0 bg-gradient-to-t to-transparent"
                    />
                    <span className="font-display text-chalk/95 absolute bottom-4 left-5 text-6xl font-extrabold tracking-[-0.04em] sm:text-7xl">
                      {comp.abbr}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="font-display text-chalk text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                      {comp.name}
                    </h3>
                    <p className="text-eyebrow mt-2 normal-case">{comp.location}</p>
                    <p className="text-chalk-dim/80 mt-5 flex-1 text-sm leading-relaxed">
                      {comp.blurb}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <Link
              href="/compete"
              className="group mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-amber-500 uppercase"
            >
              <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                All competition detail
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

      {/* ==================================================================
          SPONSORS — quiet logo wall.
          ================================================================== */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-eyebrow">Backed by</p>
                <h2 className="font-display text-chalk mt-4 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                  Our sponsors
                </h2>
              </div>
              <Link
                href="/sponsors"
                className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-amber-500 uppercase"
              >
                <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                  Become a sponsor
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* Every sponsor, not a truncated subset — dropping the tail would
                quietly omit real supporters. 15 logos across a 5-column grid. */}
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {SPONSOR_TIERS.flatMap((t) => t.logos).map((logo) => (
                <li key={logo.src}>
                  <div className="bg-chalk/92 flex aspect-[3/2] items-center justify-center rounded-sm p-5 transition-transform duration-300 hover:scale-[1.03]">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          CTA
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div
          aria-hidden
          className="via-navy-850 to-navy-950 absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600"
        />
        <div aria-hidden className="grid-wash absolute inset-0 -z-10 opacity-30" />

        <div className="mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8 sm:py-36">
          <Reveal>
            <p className="text-eyebrow">Recruitment opens every September</p>
            <h2 className="font-display text-chalk mx-auto mt-5 max-w-4xl text-4xl leading-[0.92] font-extrabold tracking-[-0.04em] sm:text-7xl">
              Come build the thing that drives itself.
            </h2>
            <p className="text-chalk-dim/80 mx-auto mt-7 max-w-xl text-base leading-relaxed">
              Engineering, science and business students building a semi-autonomous rover
              for international competition.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/join"
                className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Join the Team
              </Link>
              <Link
                href="/contact"
                className="text-chalk border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
