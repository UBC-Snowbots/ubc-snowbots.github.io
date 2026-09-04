/**
 * A photo, or a labelled empty frame where one will go.
 *
 * The frame carries a slot id (e.g. `CHASSIS-02`) so a photo can be matched to
 * its position without ambiguity — label the file with the slot and it lands in
 * the right place. Until then the page keeps the same shape it will have with
 * the real image, so nothing reflows when photos arrive.
 */
export default function PhotoSlot({
  src,
  alt,
  slot,
  caption,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  src?: string;
  alt: string;
  slot: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden border border-white/10 ${aspect}`}>
        {src ? (
          <>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="from-navy-950/48 absolute inset-0 bg-gradient-to-t to-transparent"
            />
          </>
        ) : (
          <div className="grid-wash bg-navy-900 absolute inset-0 flex flex-col items-center justify-center border border-dashed border-amber-500/40 p-6 text-center">
            <p className="font-mono text-[11px] tracking-[0.22em] text-amber-500 uppercase">
              Photo slot
            </p>
            <p className="font-display text-chalk mt-3 text-2xl font-extrabold tracking-[-0.02em]">
              {slot}
            </p>
            <p className="text-chalk-dim/60 mt-3 max-w-xs text-xs leading-relaxed">
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="text-chalk-dim/60 mt-3 font-mono text-[11px] tracking-[0.1em]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
