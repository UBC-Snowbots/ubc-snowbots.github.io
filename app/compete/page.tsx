import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StripeRule from "@/components/StripeRule";
import { COMPETITIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Competition",
  description:
    "UBC Rover competes at the University Rover Challenge in Utah and the Canadian International Rover Challenge in Drumheller, Alberta.",
};

export default function CompetePage() {
  return (
    <>
      <PageHero
        eyebrow="Where we prove it"
        title="Two Competitions."
        lede="A year of design and fabrication is judged in a few days of heat, dust and failure modes you did not plan for."
        image="/media/team/chassis.jpg"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="space-y-16 sm:space-y-20">
          {COMPETITIONS.map((comp, i) => (
            <article
              key={comp.abbr}
              className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
            >
              <Reveal>
                <p className="text-eyebrow">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-display mt-4 text-[clamp(3.5rem,9vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.045em] text-amber-500">
                  {comp.abbr}
                </h2>
                <h3 className="font-display text-chalk mt-5 text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl">
                  {comp.name}
                </h3>
                <p className="text-chalk-dim/60 mt-3 font-mono text-[11px] leading-relaxed tracking-[0.12em] uppercase">
                  {comp.location}
                </p>
                <p className="text-chalk-dim/85 mt-7 text-base leading-relaxed">
                  {comp.blurb}
                </p>

                <dl className="mt-9 border-t border-white/10">
                  {comp.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="grid grid-cols-[8rem_1fr] gap-4 border-b border-white/10 py-4"
                    >
                      <dt className="text-chalk-dim/70 font-mono text-[11px] tracking-[0.14em] uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-chalk-dim/90 text-sm">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Out to the organiser's own site — the same links the home
                    page carries, so /compete is not a dead end. */}
                <a
                  href={comp.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex w-fit items-center gap-2 border-b border-amber-500/40 pb-1 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase transition-colors hover:border-amber-500"
                >
                  {comp.abbr} official site &mdash; {comp.host}
                  <span aria-hidden>&#8599;</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>

              <Reveal delay={120}>
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                  <img
                    src={comp.image}
                    alt={`${comp.name} terrain.`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="from-navy-950/40 absolute inset-0 bg-gradient-to-t to-transparent"
                  />
                  <StripeRule className="absolute right-0 bottom-0 left-0 opacity-90" />
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
