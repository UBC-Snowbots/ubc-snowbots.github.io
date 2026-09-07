import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SponsorLogo from "@/components/SponsorLogo";
import { SPONSOR_OFFER, SPONSOR_TIERS, sponsorBlurbFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "External support is the engine behind UBC Rover's innovation. Partner with a student team competing on the world stage.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsor the build"
        lede="As a student-led team we rely on strategic sponsorship and community funding to design, build and deploy our rovers on the world stage."
        image="/media/team/arm.jpg"
      />

      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-5 sm:py-16">
        {/* What sponsorship gets you — one undifferentiated offer, quoted from
            the source site. The team does not tier its benefits, so neither do
            we; inventing a ladder would be promising things on their behalf. */}
        <Reveal>
          {/* w-fit so the box hugs its copy instead of ruling a line across the
              full 1800px, and mx-auto to centre what is left. */}
          <div className="bg-navy-900 mx-auto flex w-fit max-w-3xl flex-col gap-3 border border-white/10 p-6 text-center sm:p-7">
            <p className="text-eyebrow">The offer</p>
            <p className="text-chalk-dim/85 text-sm leading-relaxed text-balance">
              {SPONSOR_OFFER}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Tiers. Each is a full-width band alternating between the two navies,
          which is what separates them now that the horizontal rules are gone -
          a rule under every heading was reading as a divider between the
          heading and its OWN logos rather than between tiers. */}
      {SPONSOR_TIERS.map((tier, i) => {
        // The top tier shows its write-ups inline rather than behind a hover.
        // These are the sponsors who gave most, and what their money bought is
        // the argument to the next sponsor - it should not be something you
        // have to discover.
        const openTier = i === 0;
        return (
          <section key={tier.tier} className={i % 2 === 1 ? "section-raised" : undefined}>
            <div className="mx-auto max-w-[1800px] px-4 py-14 text-center sm:px-5 sm:py-16">
              <Reveal>
                <h2 className="font-display text-chalk text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {tier.tier}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <ul
                  className={
                    openTier
                      ? "mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2"
                      : "mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-4"
                  }
                >
                  {tier.logos.map((logo) => (
                    <li key={logo.src} className={openTier ? "" : "w-40 sm:w-44"}>
                      <SponsorLogo
                        logo={logo}
                        blurb={sponsorBlurbFor(logo.name)}
                        alwaysOpen={openTier}
                      />
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-[1800px] px-4 pb-14 sm:px-5 sm:pb-16">
        {/* Closing call, built the same way as the home page's: an inset box
            that inverts on hover, with a rule sweeping the slogan. Two pages
            ending on the same device is the point - it reads as one site. */}
        <Reveal>
          <div className="group section-raised relative isolate overflow-hidden border border-white/10 transition-colors duration-500 hover:bg-[var(--color-navy-950)]">
            <div className="px-6 py-20 text-center sm:px-10 sm:py-24">
              <h2 className="font-display text-chalk mx-auto inline-block max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[0.92] font-extrabold tracking-[-0.04em]">
                Put your name on our rover
                <span
                  aria-hidden
                  className="slogan-rule mt-3 block h-[3px] w-full bg-amber-500"
                />
              </h2>
              <p className="text-chalk-dim/80 mx-auto mt-8 max-w-lg text-base leading-relaxed">
                We would be glad to talk through what a partnership could look like.
              </p>
              {/* Into the contact form with the inquiry already set, rather than
                  a mailto: - a mailto only works if the reader has a desktop
                  mail client configured, and silently does nothing otherwise. */}
              <Link
                href="/contact?inquiry=Sponsorship#enquiry"
                className="text-navy-950 mt-9 inline-block bg-amber-500 px-8 py-4 font-mono text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Become a sponsor
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
