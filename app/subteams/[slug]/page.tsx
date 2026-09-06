import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import Reveal from "@/components/Reveal";
import { SUBTEAMS, applyHref, getSubteam, subsystemsForSubteam } from "@/lib/content";

/** Static export needs every route enumerated at build time. */
export function generateStaticParams() {
  return SUBTEAMS.map((team) => ({ slug: team.slug }));
}

/* Params are typed explicitly rather than via the generated `PageProps` helper:
   that helper is emitted from .next/types during a build, so a brand-new dynamic
   route cannot typecheck before its first successful build. */
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const team = getSubteam(slug);
  if (!team) return { title: "Sub-team" };
  return {
    title: `${team.name} Sub-team`,
    description: team.blurb.slice(0, 155),
  };
}

export default async function SubteamPage({ params }: Params) {
  const { slug } = await params;
  const team = getSubteam(slug);
  if (!team) notFound();

  // The rover subsystems this sub-team owns. These used to live on a separate
  // /rover page; they belong here, next to the people who actually build them.
  const owned = subsystemsForSubteam(team.slug);

  return (
    <>
      <PageHero title={team.name} lede={team.blurb} image={team.image} />

      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-5 sm:py-16">
        {/* Apply */}
        <Reveal>
          <div className="bg-navy-900 flex flex-col gap-6 border border-white/10 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="font-display text-chalk mt-3 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                Applications open every Fall.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={applyHref()}
                className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <Link
                href="/join"
                className="text-chalk border border-white/25 px-8 py-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                See open roles
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------
            What we do.

            For sub-teams that own hardware this is the full subsystem
            breakdown — main job, description and a Tech Specs table each,
            in the style of NASA's Perseverance components page. Science and
            Business own no subsystem, so they fall back to their capability
            list rather than rendering an empty section.
            ------------------------------------------------------------ */}
        <Reveal>
          <div className="mt-14 border-b border-white/10 pb-6">
            <h2 className="font-display text-chalk mt-3 text-3xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl">
              {owned.length ? "The systems we build" : "What we handle"}
            </h2>
          </div>
        </Reveal>

        {owned.length ? (
          <div className="mt-12 space-y-14 sm:space-y-18">
            {owned.map((sub, i) => (
              <article key={sub.slug} id={sub.slug} className="scroll-mt-32">
                <div
                  className={`grid gap-10 lg:grid-cols-2 lg:gap-14 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <PhotoSlot
                      photos={sub.photos}
                      alt={`${sub.name} on the UBC Rover.`}
                      slot={sub.photoSlot}
                      caption={sub.imageCaption}
                      expects={sub.expects}
                    />
                  </Reveal>

                  <Reveal delay={110}>
                    <h3 className="font-display text-chalk mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                      {sub.name}
                    </h3>
                    <p className="font-display text-chalk mt-4 text-lg leading-snug font-semibold tracking-[-0.01em]">
                      {sub.role}
                    </p>
                    <p className="text-chalk-dim/85 mt-5 text-base leading-relaxed">
                      {sub.summary}
                    </p>
                    {/* A line the lead marked for emphasis in the content doc. */}
                    {sub.callout ? (
                      <p className="text-chalk mt-4 text-base leading-relaxed font-semibold">
                        {sub.callout}
                      </p>
                    ) : null}
                    {sub.detail.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className={
                          para.startsWith("PLACEHOLDER")
                            ? "mt-4 font-mono text-xs leading-relaxed text-amber-500/60"
                            : "text-chalk-dim/70 mt-4 text-base leading-relaxed"
                        }
                      >
                        {para}
                      </p>
                    ))}

                    {/* Datasheet block. A <dl> rather than a <table>: these are
                        name/value pairs, not a grid of related records, and a
                        table would announce phantom rows and columns to a
                        screen reader. The two columns come from the grid, and
                        collapse to stacked rows under 400px where a 50/50 split
                        would leave three words per line. */}
                    {sub.specs?.length ? (
                      <div className="mt-7 border border-white/10">
                        <p className="text-chalk-dim/70 border-b border-white/10 px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase">
                          Tech Specs
                        </p>
                        <dl className="divide-y divide-white/[0.07]">
                          {sub.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="grid grid-cols-1 gap-x-4 gap-y-1 px-5 py-3 min-[400px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                            >
                              <dt className="text-chalk-dim/60 font-mono text-[11px] tracking-[0.1em] uppercase">
                                {spec.label}
                              </dt>
                              <dd className="text-chalk font-mono text-[13px] leading-snug">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ) : null}
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {team.capabilities.map((cap, i) => (
              <Reveal key={cap} delay={i * 60} className="bg-navy-950">
                <div className="h-full p-7">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-amber-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display text-chalk mt-4 text-lg leading-snug font-semibold tracking-[-0.01em]">
                    {cap}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Other sub-teams */}
        <Reveal>
          <h2 className="font-display text-chalk mt-16 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
            Other sub-teams
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {SUBTEAMS.filter((t) => t.slug !== team.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/subteams/${other.slug}`}
                className="text-chalk-dim/85 inline-block border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
