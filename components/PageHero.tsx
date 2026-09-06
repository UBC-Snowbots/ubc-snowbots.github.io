import Reveal from "./Reveal";

/**
 * Shared masthead for every interior page.
 *
 * Keeping one component means the title / lede rhythm is identical across
 * /team, /compete, /join, /sponsors and /contact — which is what makes a set of
 * pages read as one site rather than six.
 *
 * There is deliberately no eyebrow above the title. A small amber label over
 * every H1 on every page is a tic, not information — it restated the title six
 * different ways. The only one left on the site is the hero's, where it names
 * the university.
 */
export default function PageHero({
  title,
  lede,
  image,
}: {
  title: string;
  lede?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            // This is the LCP element on interior pages, so it must not be lazy.
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="from-navy-950/95 via-navy-950/65 to-navy-950/40 absolute inset-0 -z-10 bg-gradient-to-t"
          />
        </>
      ) : (
        <div aria-hidden className="grid-wash absolute inset-0 -z-10 opacity-60" />
      )}

      <div /* pt clears the fixed header stack: 67px below sm, 83px above.
             Both values leave the same 24px gap. */
        className="mx-auto max-w-[1800px] px-4 pt-24 pb-10 sm:px-5 sm:pt-28 sm:pb-14"
      >
        {/* initiallyVisible: this masthead is the first viewport on every
            interior page, so it must not wait for hydration to become opaque. */}
        <Reveal initiallyVisible>
          <h1 className="font-display text-chalk max-w-4xl text-5xl leading-[0.9] font-medium tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {lede ? (
            <p className="text-chalk-dim/80 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg">
              {lede}
            </p>
          ) : null}
        </Reveal>
      </div>

      <div className="stripe-rule-thin h-[3px] w-full" aria-hidden />
    </section>
  );
}
