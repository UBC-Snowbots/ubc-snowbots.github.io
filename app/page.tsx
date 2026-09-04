import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTile from "@/components/SectionTile";
import StripeRule from "@/components/StripeRule";
import {
  COMPETITIONS,
  SECTIONS,
  SITE,
  SPONSOR_TIERS,
  STATS,
  applyHref,
} from "@/lib/content";

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
          className="from-navy-950/92 via-navy-950/38 to-navy-950/8 absolute inset-0 -z-10 bg-gradient-to-t"
        />
        <div
          aria-hidden
          className="from-navy-950/82 via-navy-950/28 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
        />

        {/* pt clears the fixed header stack (banner 36px + bar 64/80px + 3px
            rule). The block is bottom-aligned, so without a top pad the eyebrow
            slides under the header on short viewports. */}
        <div className="mx-auto w-full max-w-[1600px] px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-20 [@media(max-height:820px)]:pt-24 [@media(max-height:820px)]:pb-10">
          <Reveal initiallyVisible>
            {/* White, not the amber .text-eyebrow: at 11px this needs 4.5:1, and
              amber over a photographic sky cannot reach that without darkening
              the hero so heavily the image is lost. */}
            <p className="text-chalk font-mono text-[11px] tracking-[0.18em] uppercase">
              University of British Columbia
            </p>
          </Reveal>

          <Reveal delay={80} initiallyVisible>
            <h1 className="font-display text-chalk mt-5 text-[clamp(2.75rem,min(13vw,17vh),12rem)] leading-[0.82] font-extrabold tracking-[-0.045em]">
              UBC
              <br />
              <span className="text-amber-500">ROVER</span>
            </h1>
          </Reveal>

          <Reveal delay={160} initiallyVisible>
            <StripeRule className="mt-7 max-w-lg [@media(max-height:820px)]:mt-5" />
          </Reveal>

          {/* The slogan, set as three beats so it reads like the flyer's
              stamped triad rather than a sentence. */}
          <Reveal delay={220} initiallyVisible>
            <p className="font-display text-chalk mt-7 flex flex-wrap items-baseline gap-x-4 text-[clamp(1.9rem,min(6vw,7.5vh),4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase sm:gap-x-7 [@media(max-height:820px)]:mt-5">
              {SITE.slogan.map((word) => (
                <span key={word}>
                  {word}
                  <span aria-hidden className="text-amber-500">
                    .
                  </span>
                </span>
              ))}
            </p>
            <p className="text-chalk-dim/80 mt-5 max-w-xl text-base leading-relaxed [@media(max-height:720px)]:hidden [@media(max-height:820px)]:mt-3">
              We design and build advanced semi-autonomous rovers for international
              competition.
            </p>
          </Reveal>

          <Reveal delay={300} initiallyVisible>
            <div className="mt-8 flex flex-wrap items-center gap-4 [@media(max-height:820px)]:mt-5">
              <Link
                href={applyHref()}
                className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <Link
                href="/subteams"
                className="text-chalk border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                See What We Build
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

      {/* ==================================================================
          MISSION — one bold statement, generous air (Relativity).
          ================================================================== */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
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
        <div className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 70}
              // Five items do not tile into 2 or 3 columns, and the grid's
              // parent background shows through any uncovered cell as a pale
              // block. Letting the last item span the remainder closes it.
              className={`bg-navy-950 ${
                i === STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="p-7 sm:p-10">
                <p
                  className={
                    stat.value === "PLACEHOLDER"
                      ? "font-mono text-sm leading-none tracking-[0.14em] text-amber-500/70"
                      : "font-display text-4xl leading-none font-extrabold tracking-[-0.04em] text-amber-500 xl:text-6xl"
                  }
                >
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

        <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-eyebrow">Explore</p>
                <h2
                  id="explore-heading"
                  className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl"
                >
                  Start here
                </h2>
              </div>
              <p className="text-chalk-dim/70 max-w-sm text-sm leading-relaxed">
                The machine, the sub-teams that build it, the competitions it goes to, and
                how to get on the team.
              </p>
            </div>
          </Reveal>

          {/* Uneven mosaic: one wide tile, then two full rows of two. */}
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
          COMPETITIONS — split panels, each linking out to the organiser.
          ================================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-eyebrow">Where we prove it</p>
            <h2 className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl">
              Two Competitions.
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
                      className="from-navy-900/88 via-navy-900/22 absolute inset-0 bg-gradient-to-t to-transparent"
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

                    {/* Out to the organiser's own site. */}
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex w-fit items-center gap-2 border-b border-amber-500/40 pb-1 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase transition-colors hover:border-amber-500"
                    >
                      {comp.abbr} official site
                      <span aria-hidden>&#8599;</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
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
          SPONSORS — logo wall.
          ================================================================== */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16">
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
            <ul className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
              {SPONSOR_TIERS.flatMap((t) => t.logos).map((logo) => (
                <li key={logo.src}>
                  <div className="bg-chalk/92 flex aspect-[3/2] items-center justify-center rounded-sm p-3">
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
          CTA — deliberately compact. This section plus the footer must fit in
          one viewport so the final snap position shows the whole recruitment
          message AND the footer together, with nothing cut off.
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div
          aria-hidden
          className="via-navy-850 to-navy-950 absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600"
        />
        <div aria-hidden className="grid-wash absolute inset-0 -z-10 opacity-30" />

        <div className="mx-auto max-w-[1600px] px-5 py-8 text-center sm:px-8 sm:py-10 [@media(max-height:760px)]:py-5">
          <Reveal>
            <p className="text-eyebrow [@media(max-height:680px)]:hidden">
              Recruitment opens every September
            </p>
            <h2 className="font-display text-chalk mx-auto mt-3 max-w-4xl text-2xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-4xl [@media(max-height:760px)]:mt-0 [@media(max-height:760px)]:text-xl">
              Build a rover with us.
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3 [@media(max-height:760px)]:mt-4">
              <Link
                href={applyHref()}
                className="text-navy-950 bg-amber-500 px-8 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400 [@media(max-height:760px)]:py-2.5"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="text-chalk border border-white/25 px-8 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500 [@media(max-height:760px)]:py-2.5"
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
