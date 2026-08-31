import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE, SPONSOR_IMPACT, SPONSOR_OFFER, SPONSOR_TIERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "External support is the engine behind UBC Rover's innovation. Partner with a student team competing on the world stage.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Who makes it possible"
        title="Sponsor the build"
        lede="As a student-led team we rely on strategic sponsorship and community funding to design, build and deploy our rovers on the world stage."
        image="/media/team/arm.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
        {/* What sponsorship gets you — one undifferentiated offer, quoted from
            the source site. The team does not tier its benefits, so neither do
            we; inventing a ladder would be promising things on their behalf. */}
        <Reveal>
          <div className="bg-navy-900 flex flex-col gap-4 border border-white/10 p-6 sm:flex-row sm:items-baseline sm:gap-8 sm:p-7">
            <p className="text-eyebrow shrink-0">The offer</p>
            <p className="text-chalk-dim/85 max-w-3xl text-sm leading-relaxed">
              {SPONSOR_OFFER}
            </p>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------
            What sponsorship actually bought. Every entry is a placeholder
            until the team supplies the real story — see SPONSOR_IMPACT in
            lib/content.ts. Concrete outcomes are what convince the next
            sponsor, so this section is worth filling in properly.
            ------------------------------------------------------------ */}
        <Reveal>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-eyebrow">Impact</p>
              <h2 className="font-display text-chalk mt-4 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                What your support built
              </h2>
            </div>
            <p className="text-chalk-dim/70 max-w-sm text-sm leading-relaxed">
              Sponsorship does not disappear into a budget line. Here is where it went.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {SPONSOR_IMPACT.map((item, i) => (
            <Reveal key={item.sponsor} delay={i * 90}>
              <article className="bg-navy-900 flex h-full flex-col border border-white/10 p-7 sm:p-8">
                <div className="bg-chalk/92 flex h-16 w-fit items-center justify-center rounded-sm px-5">
                  <img
                    src={item.logo}
                    alt={item.sponsor}
                    loading="lazy"
                    decoding="async"
                    className="max-h-10 max-w-[9rem] object-contain"
                  />
                </div>

                <h3 className="font-display text-chalk mt-6 text-xl font-bold tracking-[-0.015em]">
                  {item.sponsor}
                </h3>

                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="text-chalk-dim/60 font-mono text-[10px] tracking-[0.16em] uppercase">
                      Contributed
                    </dt>
                    <dd
                      className={
                        item.contribution.startsWith("PLACEHOLDER")
                          ? "mt-1.5 font-mono text-xs text-amber-500/70"
                          : "text-chalk-dim/85 mt-1.5"
                      }
                    >
                      {item.contribution}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-chalk-dim/60 font-mono text-[10px] tracking-[0.16em] uppercase">
                      What it made possible
                    </dt>
                    <dd
                      className={
                        item.outcome.startsWith("PLACEHOLDER")
                          ? "mt-1.5 font-mono text-xs text-amber-500/70"
                          : "text-chalk-dim/85 mt-1.5"
                      }
                    >
                      {item.outcome}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Tiers */}
        <div className="mt-16 space-y-12">
          {SPONSOR_TIERS.map((tier) => (
            <Reveal key={tier.tier}>
              <h2 className="font-display text-chalk border-b border-white/10 pb-6 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                {tier.tier}
              </h2>

              <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {tier.logos.map((logo) => (
                  <li key={logo.src}>
                    {/* Light chip. These marks are a mix of transparent PNGs
                        and opaque JPEGs drawn on white, so a knockout filter
                        cannot work across the set — it flattens the opaque ones
                        into solid slabs. Giving every logo the light ground it
                        was designed for is what keeps all fifteen legible. */}
                    <div className="bg-chalk/92 flex aspect-[3/2] items-center justify-center rounded-sm p-5">
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
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="to-navy-950 mt-18 border border-white/10 bg-gradient-to-br from-indigo-600/40 p-10 text-center sm:p-16">
            <p className="text-eyebrow">Partnership</p>
            <h2 className="font-display text-chalk mx-auto mt-5 max-w-3xl text-3xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-5xl">
              Put your name on a Mars rover.
            </h2>
            <p className="text-chalk-dim/80 mx-auto mt-6 max-w-lg text-base leading-relaxed">
              We would be glad to talk through what a partnership could look like.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Sponsorship%20enquiry`}
              className="text-navy-950 mt-9 inline-block bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
            >
              Become a sponsor
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
