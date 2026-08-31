import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE, SPONSOR_OFFER, SPONSOR_TIERS } from "@/lib/content";

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

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        {/* What sponsorship gets you — one undifferentiated offer, quoted from
            the source site. The team does not tier its benefits, so neither do
            we; inventing a ladder would be promising things on their behalf. */}
        <Reveal>
          <div className="bg-navy-900 border border-white/10 p-8 sm:p-12">
            <p className="text-eyebrow">The offer</p>
            <p className="font-display text-chalk mt-6 max-w-3xl text-xl leading-snug font-bold tracking-[-0.015em] sm:text-3xl">
              {SPONSOR_OFFER}
            </p>
          </div>
        </Reveal>

        {/* Tiers */}
        <div className="mt-24 space-y-16">
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
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="to-navy-950 mt-28 border border-white/10 bg-gradient-to-br from-indigo-600/40 p-10 text-center sm:p-16">
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
