import Reveal from "./Reveal";

/**
 * Shared masthead for every interior page.
 *
 * Keeping one component means the eyebrow / title / lede rhythm is identical
 * across /rover, /team, /compete, /join, /sponsors and /contact — which is what
 * makes a set of pages read as one site rather than six.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
}: {
  eyebrow: string;
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
            className="from-navy-950 via-navy-950/85 to-navy-950/70 absolute inset-0 -z-10 bg-gradient-to-t"
          />
        </>
      ) : (
        <div aria-hidden className="grid-wash absolute inset-0 -z-10 opacity-60" />
      )}

      <div className="mx-auto max-w-[1600px] px-5 pt-36 pb-16 sm:px-8 sm:pt-48 sm:pb-24">
        {/* initiallyVisible: this masthead is the first viewport on every
            interior page, so it must not wait for hydration to become opaque. */}
        <Reveal initiallyVisible>
          <p className="text-eyebrow">{eyebrow}</p>
          <h1 className="font-display text-chalk mt-4 max-w-4xl text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
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
