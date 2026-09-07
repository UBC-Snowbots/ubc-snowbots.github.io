import Link from "next/link";
import Reveal from "@/components/Reveal";
import HoverPanel from "@/components/HoverPanel";
import SectionTile from "@/components/SectionTile";
import SubteamPanel from "@/components/SubteamPanel";
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
      {/* A touch past one screen. At exactly 100svh a hairline of the next band
          shows at the bottom on load, because svh rounds down against the real
          viewport; the extra 8px absorbs that without being a scroll step. */}
      <section className="relative isolate flex min-h-[calc(100svh+8px)] flex-col justify-end overflow-hidden">
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

        {/* pt clears the fixed header stack (bar 64/80px + 3px rule). The block
            is bottom-aligned, so without a top pad the eyebrow slides under the
            header on short viewports. */}
        <div className="mx-auto w-full max-w-[1800px] px-4 pt-24 pb-12 sm:px-5 sm:pt-28 sm:pb-20 [@media(max-height:820px)]:pt-20 [@media(max-height:820px)]:pb-10">
          <Reveal initiallyVisible>
            {/* White, not the amber .text-eyebrow: at 11px this needs 4.5:1, and
              amber over a photographic sky cannot reach that without darkening
              the hero so heavily the image is lost. */}
            <p className="text-chalk font-mono text-[11px] tracking-[0.18em] uppercase">
              University of British Columbia
            </p>
          </Reveal>

          <Reveal delay={80} initiallyVisible>
            <h1 className="font-display text-chalk mt-5 text-[clamp(2.75rem,min(13vw,17vh),12rem)] leading-[0.82] font-semibold tracking-[-0.045em]">
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
            <p className="font-display text-chalk mt-7 flex flex-wrap items-baseline gap-x-4 text-[clamp(1.9rem,min(6vw,7.5vh),4.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] uppercase sm:gap-x-7 [@media(max-height:820px)]:mt-5">
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
                className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <Link
                href="/compete"
                className="text-chalk border border-white/25 px-8 py-4 font-mono text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                See Where We Compete
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          MISSION — one bold statement, generous air (Relativity).
          ================================================================== */}
      {/* Raised band. It sits between the hero photo and the panel grid, both
          image-heavy, so a step up in the navy marks it as the page's one block
          of pure writing without turning it into a different-coloured page. */}
      <section className="section-raised flex min-h-[100svh] flex-col justify-center">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-16 sm:px-5 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal from="left">
              {/* Hero-scale. This is the page's one written statement, so it
                  carries the same weight as the wordmark rather than sitting a
                  step below it. The full stop is set in the body colour, not
                  amber: a single orange dot on an otherwise black-on-bone
                  section was the only warm mark in it and read as decoration. */}
              <h2 className="font-display text-chalk text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
                We build Mars rovers.
                <br />
                On campus. From scratch.
              </h2>
            </Reveal>

            <Reveal from="left" delay={140}>
              <div className="text-chalk-dim/85 space-y-6 text-base leading-relaxed sm:text-lg">
                <p>
                  UBC Rover is a multidisciplinary team of {SITE.memberCount} students
                  dedicated to designing and building the next generation of
                  semi-autonomous Mars rovers. We push the boundaries of robotics through{" "}
                  {SITE.subteamCount} specialised subteams - from machine-learning-driven
                  navigation to swappable end-effectors.
                </p>
                <p>
                  Since our inception we have strived to push the limits of student
                  robotics, earning top placements at the University Rover Challenge and
                  the Canadian International Rover Challenge.
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
                from="left"
                delay={200 + i * 70}
                // Five items do not tile into 2 or 3 columns, and the grid's
                // parent background shows through any uncovered cell as a pale
                // block. Letting the last item span the remainder closes it.
                // bg is inherited from the band (.section-raised remaps
                // bg-navy-950), so the same markup works on either ground.
                className={`bg-navy-950 ${
                  i === STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="p-7 sm:p-10">
                  <p
                    className={
                      stat.value === "PLACEHOLDER"
                        ? "font-mono text-sm leading-none tracking-[0.14em] text-amber-500/70"
                        : "font-display text-chalk text-4xl leading-none font-semibold tracking-[-0.04em] xl:text-6xl"
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
        </div>
      </section>

      {/* ==================================================================
          SECTION GRID — the core "click and enter" surface (Anduril).
          ================================================================== */}
      <section aria-labelledby="explore-heading" className="relative">
        <div className="relative mx-auto max-w-[1800px] px-4 py-14 sm:px-5 sm:py-16">
          <Reveal>
            {/* One word. The earlier version was a title plus an eyebrow plus
                a standfirst — three lines of scaffolding over a grid that
                explains itself. A single heading names the section without
                arguing for it. */}
            <h2
              id="explore-heading"
              className="font-display text-chalk mb-8 text-4xl leading-[0.95] font-semibold tracking-[-0.035em] sm:mb-10 sm:text-5xl"
            >
              Explore
            </h2>
          </Reveal>

          {/* Uneven mosaic: one wide tile, then two full rows of two. */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {/* Not a SectionTile: the subteams have no index page, so this
                panel lists the seven destinations instead of being one. */}
            <Reveal>
              <SubteamPanel />
            </Reveal>
            {SECTIONS.map((tile, i) => (
              <Reveal key={tile.href} delay={((i + 1) % 2) * 90}>
                <SectionTile tile={tile} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          COMPETITIONS — same panel as Explore, linking out to each organiser.
          ================================================================== */}
      {/* No rule between this and Explore, and the two share one vertical
          rhythm: they are one continuous surface of panels, and a border plus
          a full section pad was cutting them into two unrelated lists. */}
      <section className="section-raised">
        <div className="mx-auto max-w-[1800px] px-4 py-14 sm:px-5 sm:py-16">
          <Reveal>
            <h2 className="font-display text-chalk mb-8 text-4xl leading-[0.95] font-semibold tracking-[-0.035em] sm:mb-10 sm:text-5xl">
              Our Competitions
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {COMPETITIONS.map((comp, i) => (
              <Reveal key={comp.name} delay={(i % 2) * 90}>
                <HoverPanel
                  href={comp.url}
                  external
                  image={comp.image}
                  title={comp.name}
                  decode={comp.location}
                  // Two revealed lines here rather than Explore's one, so the
                  // title has further to travel to clear them.
                  lift="6.5rem"
                >
                  <p className="text-chalk-dim/80 mt-3 max-w-md text-sm leading-relaxed">
                    {comp.blurb}
                  </p>
                </HoverPanel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <Link
              href="/compete"
              className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-amber-500 uppercase"
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
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1800px] px-4 py-14 sm:px-5 sm:py-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-chalk mt-4 text-3xl leading-[0.95] font-semibold tracking-[-0.03em] sm:text-5xl">
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
            <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
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
      {/* CLOSING CALL - an inset box rather than a full-bleed band, with its
          edges on the same gutter as the Explore panels so the page closes on
          the grid it has been using throughout.

          The box inverts on hover: the raised navy becomes the deep navy. It is
          the one element on the page that is entirely a call to action, so the
          whole surface responding to the pointer is the point. */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-5 sm:py-20">
        <div className="group section-raised relative isolate overflow-hidden border border-white/10 transition-colors duration-500 hover:bg-[var(--color-navy-950)]">
          <div className="px-6 py-20 text-center sm:px-10 sm:py-28">
            <Reveal>
              <h2 className="font-display text-chalk mx-auto inline-block max-w-5xl text-[clamp(2.25rem,6vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
                Build a rover with us
                {/* Sweeps left to right on hover, easing at both ends. */}
                <span
                  aria-hidden
                  className="slogan-rule mt-3 block h-[3px] w-full bg-amber-500"
                />
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href={applyHref()}
                  className="text-navy-950 bg-amber-500 px-10 py-4 font-mono text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="text-chalk border border-white/25 px-10 py-4 font-mono text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                >
                  Get in Touch
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
