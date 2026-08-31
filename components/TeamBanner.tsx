import { TEAM_PHOTO } from "@/lib/content";

/**
 * Full-bleed band with a group photo behind a centred title — the device UBC
 * Formula Electric uses to head each section of their team page.
 *
 * `full-bleed` escapes the padded container so the photo runs edge to edge even
 * though the surrounding page is width-constrained.
 */
export default function TeamBanner({
  title,
  image = TEAM_PHOTO,
  inline = false,
}: {
  title: string;
  image?: string;
  /**
   * `inline` puts the band inside the page container beside other content
   * instead of running edge to edge: it stretches to its grid row and gains a
   * full border rather than just top and bottom. Used where a sub-team has a
   * single lead, so the header and that one card sit side by side rather than
   * leaving a near-empty row under a full-width band.
   */
  inline?: boolean;
}) {
  return (
    /* No `full-bleed` here: this band's parent is already full width, and
       full-bleed's 100vw includes the scrollbar on browsers with classic
       (non-overlay) scrollbars, which would shift the photo sideways. */
    <section
      className={
        inline
          ? "relative isolate flex h-56 w-full items-center justify-center overflow-hidden border border-white/10 lg:h-full lg:min-h-[24rem]"
          : "relative isolate flex h-52 w-full items-center justify-center overflow-hidden border-y border-white/10 sm:h-64"
      }
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      {/* Two scrims: a flat wash for overall legibility, plus a vertical fade so
          the band reads as part of the dark page rather than a pasted-in photo. */}
      <div aria-hidden className="bg-navy-950/40 absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="from-navy-950/65 via-navy-950/12 to-navy-950/65 absolute inset-0 -z-10 bg-gradient-to-b"
      />

      <div className="px-5 text-center">
        <h2
          className={`font-display text-chalk leading-[0.95] font-extrabold tracking-[-0.035em] ${
            inline ? "text-3xl sm:text-5xl" : "text-4xl sm:text-6xl"
          }`}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}
