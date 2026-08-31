import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SUBSYSTEMS, SUBTEAMS, applyHref, getSubteam } from "@/lib/content";

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

  // Which parts of the rover this sub-team owns — links across to /rover.
  const owned = SUBSYSTEMS.filter((s) => s.ownedBy === team.slug);

  return (
    <>
      <PageHero
        eyebrow={`Sub-team / ${team.discipline}`}
        title={team.name}
        lede={team.blurb}
        image={team.image}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
        {/* Apply */}
        <Reveal>
          <div className="bg-navy-900 flex flex-col gap-6 border border-white/10 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-eyebrow">Join {team.name}</p>
              <p className="font-display text-chalk mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
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

        {/* What we do */}
        <Reveal>
          <h2 className="font-display text-chalk mt-20 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
            What we do
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {team.capabilities.map((cap, i) => (
            <Reveal key={cap} delay={i * 60} className="bg-navy-950">
              <div className="h-full p-7">
                <p className="font-mono text-[11px] tracking-[0.2em] text-amber-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-chalk mt-4 text-lg leading-snug font-bold tracking-[-0.01em]">
                  {cap}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Systems owned — the bridge to /rover */}
        {owned.length ? (
          <>
            <Reveal>
              <h2 className="font-display text-chalk mt-20 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                Systems we own
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {owned.map((sub, i) => (
                <Reveal key={sub.slug} delay={i * 50}>
                  <Link
                    href={`/rover#${sub.slug}`}
                    className="text-chalk-dim/85 inline-block border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                  >
                    {sub.name}
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        {/* Projects — same tile treatment as the home page Explore grid. */}
        <Reveal>
          <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-eyebrow">Our work</p>
              <h2 className="font-display text-chalk mt-4 text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                Projects
              </h2>
            </div>
            <p className="text-chalk-dim/70 max-w-sm text-sm leading-relaxed">
              What {team.name} has designed, built and taken to competition.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {team.projects.map((project, i) => (
            <Reveal
              key={project.index}
              delay={(i % 2) * 90}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              {/* Same visual language as SectionTile, but these are not links
                  yet — there is nowhere to click through to until the team
                  writes the project pages. */}
              <article className="group bg-navy-900 relative isolate block overflow-hidden border border-white/10">
                <div
                  className={`relative w-full ${
                    i === 0
                      ? "aspect-[16/10] sm:aspect-[2/1]"
                      : "aspect-[4/3] sm:aspect-[3/2]"
                  }`}
                >
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                  />
                  <div
                    aria-hidden
                    className="from-navy-950 via-navy-950/75 to-navy-950/45 absolute inset-0 bg-gradient-to-t transition-opacity duration-500 group-hover:opacity-90"
                  />
                </div>

                <span
                  aria-hidden
                  className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.2em] text-amber-500 sm:top-7 sm:left-7"
                >
                  {project.index}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="text-eyebrow mb-2">{project.eyebrow}</p>
                  <h3 className="font-display text-chalk text-2xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-4xl">
                    {project.title}
                  </h3>
                  <div className="reveal-on-hover">
                    <div>
                      <p className="text-chalk-dim/85 mt-3 max-w-xl text-sm leading-relaxed">
                        {project.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Other sub-teams */}
        <Reveal>
          <h2 className="font-display text-chalk mt-24 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
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
