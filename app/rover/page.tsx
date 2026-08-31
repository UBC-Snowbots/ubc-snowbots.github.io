import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { CAD, SUBSYSTEMS, getSubteam } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Rover",
  description:
    "The subsystems that make up the UBC Rover — chassis, drivetrain, robotic arm, end effector, rover lab, power, communications and the control base.",
};

/**
 * Structured after NASA's Perseverance "Rover Components" page: an anchor list
 * that jumps to each subsystem, then one section per subsystem carrying body
 * copy, a labelled image and a Tech Specs table.
 *
 * This page is strictly about the MACHINE. Who builds each part lives on
 * /subteams — the only crossover is a single "owned by" link per subsystem.
 */
export default function RoverPage() {
  return (
    <>
      <PageHero
        eyebrow="The machine"
        title="Rover components"
        lede="Every subsystem on the vehicle, what its job is, and what it has to survive in the field."
        image="/media/rover-mog.jpg"
      />

      {/* ---------------------------------------------------------------
          Anchor navigation — the NASA device. Jumps to each subsystem.
          --------------------------------------------------------------- */}
      <nav
        aria-label="Rover subsystems"
        className="bg-navy-900 sticky top-[6.4rem] z-30 border-b border-white/10 sm:top-[7.4rem]"
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <ul className="flex gap-1 overflow-x-auto py-3">
            {SUBSYSTEMS.map((sub) => (
              <li key={sub.slug} className="shrink-0">
                <a
                  href={`#${sub.slug}`}
                  className="text-chalk-dim/75 hover:text-navy-950 inline-block px-4 py-2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors hover:bg-amber-500"
                >
                  {sub.name}
                </a>
              </li>
            ))}
            <li className="shrink-0">
              <a
                href="#cad"
                className="text-chalk-dim/75 hover:text-navy-950 inline-block px-4 py-2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors hover:bg-amber-500"
              >
                CAD
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ---------------------------------------------------------------
          One section per subsystem.
          --------------------------------------------------------------- */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {SUBSYSTEMS.map((sub, i) => {
          const owner = getSubteam(sub.ownedBy);
          return (
            <section
              key={sub.slug}
              id={sub.slug}
              aria-labelledby={`${sub.slug}-heading`}
              className="scroll-mt-44 border-b border-white/10 py-20 sm:py-28"
            >
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                {/* Copy column */}
                <Reveal>
                  <p className="text-eyebrow">
                    {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; Subsystem
                  </p>
                  <h2
                    id={`${sub.slug}-heading`}
                    className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl"
                  >
                    {sub.name}
                  </h2>

                  {/* The one-line "main job", the way NASA leads each part. */}
                  <p className="text-chalk font-display mt-5 text-lg leading-snug font-bold tracking-[-0.01em] sm:text-xl">
                    {sub.role}
                  </p>

                  <div className="stripe-rule mt-6 h-[26px] w-40" aria-hidden />

                  <p className="text-chalk-dim/85 mt-7 text-base leading-relaxed">
                    {sub.summary}
                  </p>

                  {sub.detail.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-chalk-dim/70 mt-5 text-base leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}

                  {owner ? (
                    <Link
                      href={`/subteams/${owner.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase"
                    >
                      <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
                        Built by {owner.name}
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &#8594;
                      </span>
                    </Link>
                  ) : null}
                </Reveal>

                {/* Media + Tech Specs column */}
                <Reveal delay={110}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                      <img
                        src={sub.image}
                        alt={`${sub.name} on the UBC Rover.`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        aria-hidden
                        className="from-navy-950/70 absolute inset-0 bg-gradient-to-t to-transparent"
                      />
                    </div>
                    <figcaption className="text-chalk-dim/60 mt-3 font-mono text-[11px] tracking-[0.1em]">
                      {sub.imageCaption}
                    </figcaption>
                  </figure>

                  {/* Tech Specs table */}
                  <div className="mt-8 border border-white/10">
                    <p className="text-chalk-dim/70 border-b border-white/10 px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase">
                      Tech Specs
                    </p>
                    <dl>
                      {sub.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="grid grid-cols-[10rem_1fr] gap-4 border-b border-white/10 px-5 py-3.5 last:border-b-0"
                        >
                          <dt className="text-chalk-dim/60 font-mono text-[11px] tracking-[0.12em] uppercase">
                            {spec.label}
                          </dt>
                          <dd
                            className={
                              spec.value.startsWith("PLACEHOLDER")
                                ? "font-mono text-xs text-amber-500/70"
                                : "text-chalk-dim/90 text-sm"
                            }
                          >
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}

        {/* -------------------------------------------------------------
            CAD viewer — placeholder frame until a model is dropped in.
            ------------------------------------------------------------- */}
        <section
          id="cad"
          aria-labelledby="cad-heading"
          className="scroll-mt-44 py-20 sm:py-28"
        >
          <Reveal>
            <p className="text-eyebrow">Interactive</p>
            <h2
              id="cad-heading"
              className="font-display text-chalk mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-6xl"
            >
              The full assembly
            </h2>
            <p className="text-chalk-dim/80 mt-6 max-w-2xl text-base leading-relaxed">
              An explorable model of the current rover, so you can see how the subsystems
              above fit together.
            </p>
          </Reveal>

          <Reveal delay={110}>
            {CAD.modelUrl ? (
              // Real viewer goes here once a model exists.
              <div className="mt-10 aspect-[16/9] w-full border border-white/10" />
            ) : (
              <div className="grid-wash bg-navy-900 mt-10 flex aspect-[16/9] w-full flex-col items-center justify-center border border-dashed border-amber-500/40 p-8 text-center">
                <p className="font-mono text-[11px] tracking-[0.22em] text-amber-500 uppercase">
                  Placeholder
                </p>
                <p className="font-display text-chalk mt-4 max-w-lg text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl">
                  Interactive CAD model
                </p>
                <p className="text-chalk-dim/70 mt-4 max-w-md text-sm leading-relaxed">
                  {CAD.note} Drop a GLB or GLTF export into{" "}
                  <code className="font-mono text-amber-500/80">public/media/cad/</code>{" "}
                  and set{" "}
                  <code className="font-mono text-amber-500/80">CAD.modelUrl</code> in{" "}
                  <code className="font-mono text-amber-500/80">lib/content.ts</code> to
                  replace this frame.
                </p>
              </div>
            )}
          </Reveal>
        </section>
      </div>

      {/* Keep exploring — NASA closes the same way. */}
      <section className="bg-navy-900 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-eyebrow">Keep exploring</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Sub-teams",
                  href: "/subteams",
                  blurb: "Who builds each of these systems.",
                },
                {
                  title: "Competition",
                  href: "/compete",
                  blurb: "Where the rover has to prove it works.",
                },
                {
                  title: "Join Us",
                  href: "/join",
                  blurb: "Open roles on every sub-team.",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-navy-950 flex flex-col border border-white/10 p-7 transition-colors duration-300 hover:border-amber-500/40"
                >
                  <h3 className="font-display text-chalk text-2xl font-bold tracking-[-0.02em] transition-colors group-hover:text-amber-500">
                    {card.title}
                  </h3>
                  <p className="text-chalk-dim/75 mt-3 text-sm leading-relaxed">
                    {card.blurb}
                  </p>
                  <span
                    aria-hidden
                    className="mt-6 text-lg text-amber-500 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
